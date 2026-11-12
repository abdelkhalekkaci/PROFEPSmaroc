#!/usr/bin/env python3
"""
generate_brand_assets.py
Pure-Python supersampled RGBA vector rasterizer + ImageMagick/FFmpeg converter
to generate /public/images/prof_eps.png, /public/images/prof_eps.webp,
/public/favicon.ico, /public/favicon-32x32.png, and /public/apple-touch-icon.png
matching the Modern Atlas SVG logo (/public/favicon.svg).
"""
import math
import struct
import subprocess
import zlib
import pathlib

ROOT = pathlib.Path("public")


def write_png(path: pathlib.Path, width: int, height: int, rgba_bytes: bytes):
    def chunk(tag: bytes, data: bytes) -> bytes:
        return (
            struct.pack("!I", len(data))
            + tag
            + data
            + struct.pack("!I", zlib.crc32(tag + data) & 0xFFFFFFFF)
        )

    raw = bytearray()
    stride = width * 4
    for y in range(height):
        raw.append(0)  # Filter type 0 (None)
        raw.extend(rgba_bytes[y * stride : (y + 1) * stride])

    ihdr = struct.pack("!IIBBBBB", width, height, 8, 6, 0, 0, 0)
    png = (
        b"\x89PNG\r\n\x1a\n"
        + chunk(b"IHDR", ihdr)
        + chunk(b"IDAT", zlib.compress(bytes(raw), 9))
        + chunk(b"IEND", b"")
    )
    path.write_bytes(png)


def dist_to_segment(px, py, x1, y1, x2, y2):
    dx, dy = x2 - x1, y2 - y1
    if dx == 0 and dy == 0:
        return math.hypot(px - x1, py - y1)
    t = ((px - x1) * dx + (py - y1) * dy) / (dx * dx + dy * dy)
    t = max(0.0, min(1.0, t))
    return math.hypot(px - (x1 + t * dx), py - (y1 + t * dy))


def sd_rounded_box(px, py, cx, cy, half_w, half_h, r):
    qx = abs(px - cx) - (half_w - r)
    qy = abs(py - cy) - (half_h - r)
    return math.hypot(max(qx, 0.0), max(qy, 0.0)) + min(max(qx, qy), 0.0) - r


def point_in_poly(x, y, poly):
    inside = False
    n = len(poly)
    j = n - 1
    for i in range(n):
        xi, yi = poly[i]
        xj, yj = poly[j]
        if ((yi > y) != (yj > y)) and (x < (xj - xi) * (y - yi) / (yj - yi + 1e-12) + xi):
            inside = not inside
        j = i
    return inside


def cubic_bezier(p0, p1, p2, p3, steps=40):
    pts = []
    for i in range(steps + 1):
        t = i / steps
        mt = 1.0 - t
        x = (mt ** 3) * p0[0] + 3 * (mt ** 2) * t * p1[0] + 3 * mt * (t ** 2) * p2[0] + (t ** 3) * p3[0]
        y = (mt ** 3) * p0[1] + 3 * (mt ** 2) * t * p1[1] + 3 * mt * (t ** 2) * p2[1] + (t ** 3) * p3[1]
        pts.append((x, y))
    return pts


def render_512() -> bytes:
    W = 512
    S = W / 128.0
    buf = bytearray(W * W * 4)

    def blend(idx, r, g, b, a):
        if a <= 0.0:
            return
        if a >= 1.0:
            buf[idx] = r
            buf[idx + 1] = g
            buf[idx + 2] = b
            buf[idx + 3] = 255
            return
        da = buf[idx + 3] / 255.0
        out_a = a + da * (1.0 - a)
        if out_a > 0:
            buf[idx] = int((r * a + buf[idx] * da * (1.0 - a)) / out_a)
            buf[idx + 1] = int((g * a + buf[idx + 1] * da * (1.0 - a)) / out_a)
            buf[idx + 2] = int((b * a + buf[idx + 2] * da * (1.0 - a)) / out_a)
            buf[idx + 3] = int(out_a * 255)

    # Precompute polygons in 128x128 space
    swoosh_poly = (
        cubic_bezier((22, 78), (36, 46), (68, 32), (104, 38), 40)
        + cubic_bezier((104, 38), (80, 46), (56, 60), (42, 82), 40)
    )
    book_back_poly = (
        cubic_bezier((22, 86), (36, 81), (52, 84), (64, 92), 32)
        + cubic_bezier((64, 92), (76, 84), (92, 81), (106, 86), 32)
        + cubic_bezier((106, 102), (92, 97), (76, 100), (64, 108), 32)
        + cubic_bezier((64, 108), (52, 100), (36, 97), (22, 102), 32)
    )
    book_front_poly = (
        cubic_bezier((26, 80), (39, 75), (53, 78), (64, 86), 32)
        + cubic_bezier((64, 86), (75, 78), (89, 75), (102, 80), 32)
        + cubic_bezier((102, 95), (89, 90), (75, 93), (64, 101), 32)
        + cubic_bezier((64, 101), (53, 93), (39, 90), (26, 95), 32)
    )
    ribbon_poly = [(61, 98), (64, 108.5), (67, 98)]

    capsules_white = [
        ((69, 41), (58, 63), 5.2),   # Torso
        ((69, 42), (83, 45), 2.8),   # Front arm 1
        ((83, 45), (94, 37), 2.5),   # Front arm 2
        ((67, 42), (53, 44), 2.8),   # Back arm 1
        ((53, 44), (45, 52), 2.5),   # Back arm 2
        ((60, 62), (78, 66), 3.3),   # Front thigh
        ((78, 66), (73, 79), 2.8),   # Front shin
        ((58, 63), (44, 78), 3.1),   # Back leg
    ]

    for py_i in range(W):
        y = (py_i + 0.5) / S
        for px_i in range(W):
            x = (px_i + 0.5) / S
            idx = (py_i * W + px_i) * 4

            # 1. Rounded shield background
            d_shield = sd_rounded_box(x, y, 64.0, 64.0, 58.0, 58.0, 30.0)
            if d_shield >= 0.5:
                continue
            alpha_shield = max(0.0, min(1.0, 0.5 - d_shield))
            t = max(0.0, min(1.0, (x + y - 12.0) / 208.0))
            r = int(51 + (109 - 51) * t)
            g = int(71 + (74 - 71) * t)
            b = int(214 + (255 - 214) * t)
            blend(idx, r, g, b, alpha_shield)

            # Inner thin border
            d_inner = abs(sd_rounded_box(x, y, 64.0, 64.0, 55.0, 55.0, 27.0))
            if d_inner < 1.0:
                blend(idx, 255, 255, 255, (1.0 - d_inner) * 0.18)

            # 2. Sunrise Amber Victory Swoosh
            if 20 <= x <= 106 and 30 <= y <= 84:
                if point_in_poly(x, y, swoosh_poly):
                    blend(idx, 255, 179, 0, 1.0)

            # 3. Athlete Head (White ring + Amber fill)
            dh = math.hypot(x - 74.0, y - 27.0)
            if dh < 10.2:
                a_ring = max(0.0, min(1.0, 10.2 - dh))
                blend(idx, 255, 255, 255, a_ring)
            if dh < 8.2:
                a_head = max(0.0, min(1.0, 8.2 - dh))
                blend(idx, 255, 179, 0, a_head)

            # 4. Athlete body capsules
            if 40 <= x <= 99 and 33 <= y <= 84:
                min_dc = 999.0
                for (x1, y1), (x2, y2), rad in capsules_white:
                    d = dist_to_segment(x, y, x1, y1, x2, y2) - rad
                    if d < min_dc:
                        min_dc = d
                if min_dc < 0.5:
                    blend(idx, 255, 255, 255, max(0.0, min(1.0, 0.5 - min_dc)))

            # 5. Open Book of Education (Back pages + Front pages + Spine + Amber ribbon)
            if 20 <= x <= 108 and 74 <= y <= 110:
                if point_in_poly(x, y, book_back_poly):
                    blend(idx, 199, 215, 254, 1.0)
                if point_in_poly(x, y, book_front_poly):
                    blend(idx, 255, 255, 255, 1.0)
                d_spine = dist_to_segment(x, y, 64.0, 84.0, 64.0, 102.0) - 1.5
                if d_spine < 0.5:
                    blend(idx, 51, 71, 214, max(0.0, min(1.0, 0.5 - d_spine)))
                if point_in_poly(x, y, ribbon_poly):
                    blend(idx, 255, 179, 0, 1.0)

    return bytes(buf)


def main():
    (ROOT / "images").mkdir(parents=True, exist_ok=True)
    png_path = ROOT / "images/prof_eps.png"
    rgba = render_512()
    write_png(png_path, 512, 512, rgba)

    # Convert to WebP, ICO, 32x32, and 180x180 using ImageMagick/FFmpeg
    subprocess.run(["ffmpeg", "-y", "-i", str(png_path), "-quality", "95", str(ROOT / "images/prof_eps.webp")], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    subprocess.run(["convert", str(png_path), "-define", "icon:auto-resize=48,32,16", str(ROOT / "favicon.ico")], check=True)
    subprocess.run(["convert", str(png_path), "-resize", "32x32", str(ROOT / "favicon-32x32.png")], check=True)
    subprocess.run(["convert", str(png_path), "-resize", "180x180", str(ROOT / "apple-touch-icon.png")], check=True)

    print("Brand assets generated successfully:")
    for p in ["images/prof_eps.png", "images/prof_eps.webp", "favicon.svg", "favicon.ico", "favicon-32x32.png", "apple-touch-icon.png"]:
        fp = ROOT / p
        print(f" - {fp}: {fp.stat().st_size} bytes")


if __name__ == "__main__":
    main()
