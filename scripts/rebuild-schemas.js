/**
 * rebuild-schemas.js
 * Rewrites the SCHEMAS block in api/data/references.js
 * - All descriptive text moved OUTSIDE SVG (title div + legend div + description p)
 * - SVG contains ONLY: terrain shapes, player circles with letter, movement arrows
 * - Consistent structure for all 16 sports + default
 */

const fs = require('fs');
const path = require('path');

// ─── Helper: wrap SVG + text into schema div ────────────────────────────────
function S(bgLight, fgDark, emoji, sport, sit, svgContent, legend, desc) {
  return (
    '<div style="font-family:Arial,sans-serif;margin:5px 0;">' +
    '<div style="background:' + bgLight + ';text-align:center;font-size:10px;font-weight:bold;color:' + fgDark + ';padding:3px 8px;border-radius:4px;margin-bottom:3px;">' +
    emoji + ' ' + sport + ' \u2014 ' + sit +
    '</div>' +
    '<svg viewBox="0 0 360 180" style="width:100%;max-width:420px;height:auto;display:block;margin:0 auto;border-radius:5px;overflow:hidden;">' +
    svgContent +
    '</svg>' +
    '<div style="display:flex;justify-content:center;gap:8px;font-size:9px;color:#444;margin:3px 0;flex-wrap:wrap;">' +
    legend +
    '</div>' +
    '<p style="text-align:center;font-size:9px;color:#555;margin:1px 0;font-style:italic;">' +
    desc +
    '</p>' +
    '</div>'
  );
}

// ─── SVG element helpers ──────────────────────────────────────────────────────
function defs2(id1, c1, id2, c2) {
  return '<defs>' +
    '<marker id="' + id1 + '" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="' + c1 + '"/></marker>' +
    '<marker id="' + id2 + '" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="' + c2 + '"/></marker>' +
    '</defs>';
}
function defs1(id, c) {
  return '<defs><marker id="' + id + '" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="' + c + '"/></marker></defs>';
}
function P(cx, cy, color, letter) {
  return '<circle cx="' + cx + '" cy="' + cy + '" r="11" fill="' + color + '" stroke="#fff" stroke-width="2"/>' +
    '<text x="' + cx + '" y="' + (cy + 4) + '" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">' + letter + '</text>';
}
function line(x1, y1, x2, y2, mid, color, dash) {
  var d = dash ? ' stroke-dasharray="5,3"' : '';
  return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + color + '" stroke-width="2"' + d + ' marker-end="url(#' + mid + ')"/>';
}

// ─── Reusable terrain parts ───────────────────────────────────────────────────
const GREEN_BG = '<rect width="360" height="180" fill="#C8E6C9"/>' +
  '<rect x="10" y="15" width="340" height="150" fill="#4CAF50" stroke="#2E7D32" stroke-width="2.5" rx="3"/>' +
  '<line x1="185" y1="15" x2="185" y2="165" stroke="#fff" stroke-width="1.5" stroke-dasharray="7,4" opacity="0.6"/>';

const HB_GOALS = '<rect x="10" y="75" width="7" height="30" fill="#fff" stroke="#bbb" stroke-width="1.5"/>' +
  '<rect x="343" y="75" width="7" height="30" fill="#fff" stroke="#bbb" stroke-width="1.5"/>';

const HB_ZONES = '<ellipse cx="17" cy="90" rx="60" ry="60" fill="rgba(255,255,255,0.1)" stroke="#fff" stroke-width="1.5" stroke-dasharray="5,3"/>' +
  '<ellipse cx="343" cy="90" rx="60" ry="60" fill="rgba(255,255,255,0.1)" stroke="#fff" stroke-width="1.5" stroke-dasharray="5,3"/>';

const FB_FIELD = '<rect width="360" height="180" fill="#C8E6C9"/>' +
  '<rect x="10" y="15" width="340" height="150" fill="#4CAF50" stroke="#2E7D32" stroke-width="2.5" rx="3"/>' +
  '<line x1="185" y1="15" x2="185" y2="165" stroke="#fff" stroke-width="1.5" stroke-dasharray="7,4" opacity="0.5"/>' +
  '<circle cx="185" cy="90" r="20" fill="none" stroke="#fff" stroke-width="1.5" opacity="0.5"/>' +
  '<rect x="10" y="62" width="42" height="56" fill="rgba(255,255,255,0.12)" stroke="#fff" stroke-width="1.5"/>' +
  '<rect x="308" y="62" width="42" height="56" fill="rgba(255,255,255,0.12)" stroke="#fff" stroke-width="1.5"/>' +
  '<rect x="10" y="76" width="18" height="28" fill="#fff" stroke="#bbb" stroke-width="1.5"/>' +
  '<rect x="332" y="76" width="18" height="28" fill="#fff" stroke="#bbb" stroke-width="1.5"/>';

const BK_FIELD = '<rect width="360" height="180" fill="#FFE0B2"/>' +
  '<rect x="10" y="15" width="340" height="150" fill="#F5CBA7" stroke="#D35400" stroke-width="2" rx="3"/>' +
  '<line x1="185" y1="15" x2="185" y2="165" stroke="#D35400" stroke-width="1.5" stroke-dasharray="7,4" opacity="0.6"/>' +
  '<circle cx="185" cy="90" r="22" fill="none" stroke="#D35400" stroke-width="1.5" opacity="0.6"/>' +
  '<rect x="10" y="55" width="60" height="70" fill="rgba(211,84,0,0.12)" stroke="#D35400" stroke-width="1.5"/>' +
  '<rect x="290" y="55" width="60" height="70" fill="rgba(211,84,0,0.12)" stroke="#D35400" stroke-width="1.5"/>' +
  '<circle cx="34" cy="90" r="9" fill="none" stroke="#D35400" stroke-width="2"/>' +
  '<circle cx="326" cy="90" r="9" fill="none" stroke="#D35400" stroke-width="2"/>';

const VB_FIELD = '<rect width="360" height="180" fill="#C5CAE9"/>' +
  '<rect x="10" y="15" width="160" height="150" fill="#E8EAF6" stroke="#3949AB" stroke-width="2" rx="2"/>' +
  '<rect x="190" y="15" width="160" height="150" fill="#FFEBEE" stroke="#3949AB" stroke-width="2" rx="2"/>' +
  '<rect x="167" y="8" width="6" height="169" fill="#3949AB" rx="2"/>' +
  '<line x1="10" y1="65" x2="170" y2="65" stroke="#3949AB" stroke-width="1" stroke-dasharray="5,3" opacity="0.5"/>' +
  '<line x1="190" y1="65" x2="350" y2="65" stroke="#3949AB" stroke-width="1" stroke-dasharray="5,3" opacity="0.5"/>';

const RG_FIELD = '<rect width="360" height="180" fill="#C8E6C9"/>' +
  '<rect x="10" y="15" width="340" height="150" fill="#4CAF50" stroke="#2E7D32" stroke-width="2.5" rx="3"/>' +
  '<line x1="50" y1="15" x2="50" y2="165" stroke="#fff" stroke-width="2" opacity="0.7"/>' +
  '<line x1="310" y1="15" x2="310" y2="165" stroke="#fff" stroke-width="2" opacity="0.7"/>' +
  '<line x1="185" y1="15" x2="185" y2="165" stroke="#fff" stroke-width="1.5" stroke-dasharray="7,4" opacity="0.4"/>' +
  '<rect x="10" y="15" width="40" height="150" fill="rgba(255,255,100,0.15)"/>' +
  '<rect x="310" y="15" width="40" height="150" fill="rgba(255,255,100,0.15)"/>';

const TRACK = '<rect width="360" height="180" fill="#E8D5B7"/>' +
  '<rect x="10" y="20" width="340" height="140" fill="#D4A857" stroke="#8D6E27" stroke-width="2" rx="3"/>' +
  '<line x1="10" y1="60" x2="350" y2="60" stroke="#fff" stroke-width="1.5" opacity="0.7"/>' +
  '<line x1="10" y1="100" x2="350" y2="100" stroke="#fff" stroke-width="1.5" opacity="0.7"/>' +
  '<line x1="10" y1="140" x2="350" y2="140" stroke="#fff" stroke-width="1" opacity="0.5"/>';

const OVAL_TRACK = '<rect width="360" height="180" fill="#E8D5B7"/>' +
  '<ellipse cx="180" cy="90" rx="160" ry="72" fill="#D4A857" stroke="#8D6E27" stroke-width="2"/>' +
  '<ellipse cx="180" cy="90" rx="125" ry="42" fill="#C8E6C9" stroke="#2E7D32" stroke-width="1.5"/>';

const LJ_FIELD = '<rect width="360" height="180" fill="#E8D5B7"/>' +
  '<rect x="10" y="65" width="265" height="50" fill="#D4A857" stroke="#8D6E27" stroke-width="1.5" rx="2"/>' +
  '<rect x="270" y="25" width="9" height="40" fill="#E53935" stroke="#333" stroke-width="1.5"/>' +
  '<rect x="279" y="30" width="81" height="120" fill="#C4A882" stroke="#8D6E27" stroke-width="1.5" rx="4"/>';

const HJ_FIELD = '<rect width="360" height="180" fill="#E8D5B7"/>' +
  '<rect x="80" y="20" width="200" height="140" fill="#D4A857" stroke="#8D6E27" stroke-width="1.5" rx="3"/>' +
  '<line x1="155" y1="65" x2="285" y2="65" stroke="#888" stroke-width="2.5"/>' +
  '<line x1="150" y1="35" x2="150" y2="130" stroke="#555" stroke-width="3"/>' +
  '<line x1="290" y1="35" x2="290" y2="130" stroke="#555" stroke-width="3"/>' +
  '<rect x="120" y="75" width="185" height="75" fill="#E3F2FD" stroke="#1565C0" stroke-width="1.5" rx="5"/>';

const SP_FIELD = '<rect width="360" height="180" fill="#E8D5B7"/>' +
  '<circle cx="90" cy="115" r="48" fill="#D4A857" stroke="#8D6E27" stroke-width="2"/>' +
  '<circle cx="90" cy="115" r="3" fill="#333"/>' +
  '<line x1="90" y1="67" x2="90" y2="115" stroke="#333" stroke-width="2"/>' +
  '<path d="M 138,115 L 355,35 M 138,115 L 355,195" stroke="#aaa" stroke-width="1.5" stroke-dasharray="6,3"/>' +
  '<path d="M 200,75 A 150,85 0 0,1 200,155" stroke="#aaa" stroke-width="1.5" stroke-dasharray="5,3" fill="none"/>' +
  '<path d="M 255,58 A 205,115 0 0,1 255,172" stroke="#aaa" stroke-width="1.5" stroke-dasharray="5,3" fill="none"/>';

const GYM_MAT = '<rect width="360" height="180" fill="#E3F2FD"/>' +
  '<rect x="20" y="20" width="320" height="140" fill="#BBDEFB" stroke="#1565C0" stroke-width="2" rx="8"/>';

const TT_TABLE = '<rect width="360" height="180" fill="#37474F"/>' +
  '<rect x="30" y="40" width="300" height="100" fill="#1B5E20" stroke="#fff" stroke-width="2" rx="3"/>' +
  '<line x1="180" y1="40" x2="180" y2="140" stroke="#fff" stroke-width="3"/>' +
  '<line x1="30" y1="90" x2="330" y2="90" stroke="#fff" stroke-width="1" stroke-dasharray="5,3" opacity="0.5"/>';

const BD_COURT = '<rect width="360" height="180" fill="#FFF9C4"/>' +
  '<rect x="20" y="10" width="320" height="160" fill="#F5F5F5" stroke="#795548" stroke-width="2" rx="3"/>' +
  '<line x1="180" y1="10" x2="180" y2="170" stroke="#795548" stroke-width="3"/>' +
  '<line x1="20" y1="40" x2="340" y2="40" stroke="#795548" stroke-width="1.5"/>' +
  '<line x1="20" y1="140" x2="340" y2="140" stroke="#795548" stroke-width="1.5"/>' +
  '<line x1="80" y1="40" x2="80" y2="170" stroke="#795548" stroke-width="1" stroke-dasharray="4,3"/>' +
  '<line x1="280" y1="40" x2="280" y2="170" stroke="#795548" stroke-width="1" stroke-dasharray="4,3"/>';

const BK3_FIELD = '<rect width="360" height="180" fill="#FFE0B2"/>' +
  '<rect x="10" y="15" width="340" height="150" fill="#F5CBA7" stroke="#D35400" stroke-width="2" rx="3"/>' +
  '<line x1="185" y1="15" x2="185" y2="165" stroke="#D35400" stroke-width="2" stroke-dasharray="6,3" opacity="0.7"/>' +
  '<rect x="290" y="55" width="60" height="70" fill="rgba(211,84,0,0.12)" stroke="#D35400" stroke-width="1.5"/>' +
  '<circle cx="326" cy="90" r="9" fill="none" stroke="#D35400" stroke-width="2.5"/>' +
  '<path d="M 185,38 A 82,82 0 0,1 185,142" fill="none" stroke="#D35400" stroke-width="1.5" stroke-dasharray="5,3" opacity="0.7"/>';

// ─── SVG contents ─────────────────────────────────────────────────────────────

// HANDBALL
const hb1svg = GREEN_BG + HB_GOALS + HB_ZONES +
  defs2('hb1p','#FFD600','hb1t','#E53935') +
  line(100,90,148,74,'hb1p','#FFD600',true) +
  line(159,72,208,82,'hb1p','#FFD600',true) +
  line(220,83,297,88,'hb1t','#E53935',false) +
  P(100,90,'#E53935','A') + P(150,72,'#E53935','B') + P(210,83,'#E53935','C') +
  P(265,72,'#1565C0','D') + P(265,112,'#1565C0','D') +
  P(344,90,'#FF8F00','G');

const hb2svg = GREEN_BG + HB_GOALS + HB_ZONES +
  P(28,90,'#FF8F00','G') +
  P(80,50,'#E53935','A') + P(80,90,'#E53935','B') + P(80,130,'#E53935','C') + P(130,90,'#E53935','D') +
  P(332,90,'#FF8F00','G') +
  P(280,50,'#1565C0','E') + P(280,90,'#1565C0','F') + P(280,130,'#1565C0','G') + P(230,90,'#1565C0','H');

// FOOTBALL
const fb1svg = FB_FIELD +
  defs2('fb1p','#FFD600','fb1m','#E53935') +
  line(90,90,148,70,'fb1p','#FFD600',true) +
  line(148,70,200,88,'fb1p','#FFD600',true) +
  line(200,88,300,86,'fb1m','#E53935',false) +
  '<line x1="90" y1="90" x2="130" y2="115" stroke="#E53935" stroke-width="2" marker-end="url(#fb1m)"/>' +
  P(90,90,'#E53935','A') + P(150,70,'#E53935','B') + P(200,88,'#E53935','C') +
  P(200,128,'#1565C0','D') + P(310,86,'#FF8F00','G');

const fb2svg = FB_FIELD +
  P(28,90,'#FF8F00','G') +
  P(80,50,'#E53935','A') + P(80,90,'#E53935','B') + P(80,130,'#E53935','C') +
  P(130,65,'#E53935','D') + P(130,115,'#E53935','E') +
  P(332,90,'#FF8F00','G') +
  P(280,50,'#1565C0','F') + P(280,90,'#1565C0','G') + P(280,130,'#1565C0','H') +
  P(230,65,'#1565C0','I') + P(230,115,'#1565C0','J');

// BASKETBALL
const bk1svg = BK_FIELD +
  defs2('bk1p','#FFD600','bk1d','#E53935') +
  line(110,90,188,73,'bk1p','#FFD600',true) +
  line(200,72,258,83,'bk1d','#E53935',false) +
  P(110,90,'#E53935','A') + P(190,73,'#E53935','B') +
  P(190,120,'#1565C0','D');

const bk2svg = BK_FIELD +
  P(80,55,'#E53935','A') + P(80,90,'#E53935','B') + P(80,125,'#E53935','C') +
  P(280,55,'#1565C0','D') + P(280,90,'#1565C0','E') + P(280,125,'#1565C0','F');

// VOLLEYBALL
const vb1svg = VB_FIELD +
  defs2('vb1a','#E53935','vb1b','#FFD600') +
  '<path d="M 45,145 Q 88,50 128,68" stroke="#E53935" stroke-width="2" fill="none" stroke-dasharray="5,3" marker-end="url(#vb1a)"/>' +
  '<path d="M 128,68 Q 118,28 78,32" stroke="#FFD600" stroke-width="2" fill="none" stroke-dasharray="5,3" marker-end="url(#vb1b)"/>' +
  '<path d="M 78,32 Q 115,10 205,55" stroke="#E53935" stroke-width="2" fill="none" marker-end="url(#vb1a)"/>' +
  P(45,145,'#E53935','R') + P(128,68,'#FF8F00','P') + P(78,32,'#E53935','A') +
  P(230,90,'#1565C0','X') + P(290,62,'#1565C0','Y') + P(290,120,'#1565C0','Z');

const vb2svg = VB_FIELD +
  P(45,50,'#E53935','A') + P(100,50,'#E53935','B') +
  P(45,130,'#E53935','C') + P(100,130,'#E53935','D') +
  P(215,50,'#1565C0','E') + P(270,50,'#1565C0','F') +
  P(215,130,'#1565C0','G') + P(270,130,'#1565C0','H');

// BASKETBALL 3x3
const bk31svg = BK3_FIELD +
  defs2('bk31p','#FFD600','bk31d','#E53935') +
  '<line x1="185" y1="90" x2="235" y2="73" stroke="#E53935" stroke-width="2" stroke-dasharray="5,3" marker-end="url(#bk31p)"/>' +
  line(245,72,290,82,'bk31d','#E53935',false) +
  P(100,65,'#E53935','A') + P(100,115,'#E53935','B') + P(185,90,'#E53935','C') +
  P(145,50,'#1565C0','D') + P(145,130,'#1565C0','E') + P(215,90,'#1565C0','F');

const bk32svg = BK3_FIELD +
  P(90,55,'#E53935','A') + P(90,90,'#E53935','B') + P(90,125,'#E53935','C') +
  P(245,55,'#1565C0','D') + P(245,90,'#1565C0','E') + P(245,125,'#1565C0','F') +
  '<circle cx="326" cy="90" r="8" fill="#FF8F00" stroke="#fff" stroke-width="2"/>' +
  '<text x="326" y="94" text-anchor="middle" fill="#fff" font-size="9" font-weight="bold">P</text>';

// RUGBY
const rg1svg = RG_FIELD +
  defs2('rg1p','#FFD600','rg1e','#E53935') +
  line(85,90,138,78,'rg1p','#FFD600',true) +
  line(150,76,203,84,'rg1p','#FFD600',true) +
  line(215,82,268,88,'rg1p','#FFD600',true) +
  line(280,88,310,88,'rg1e','#E53935',false) +
  P(85,90,'#E53935','A') + P(150,76,'#E53935','B') + P(215,82,'#E53935','C') + P(280,88,'#E53935','D');

const rg2svg = RG_FIELD +
  P(80,45,'#E53935','A') + P(80,75,'#E53935','B') + P(80,105,'#E53935','C') +
  P(80,135,'#E53935','D') + P(130,90,'#E53935','E') +
  P(270,45,'#1565C0','F') + P(270,75,'#1565C0','G') + P(270,105,'#1565C0','H') +
  P(270,135,'#1565C0','I') + P(230,90,'#1565C0','J');

// COURSE DE VITESSE
const cv1svg = TRACK +
  '<line x1="30" y1="20" x2="30" y2="160" stroke="#fff" stroke-width="2.5"/>' +
  defs1('cv1d','#E53935') +
  '<line x1="30" y1="40" x2="200" y2="40" stroke="#E53935" stroke-width="2" marker-end="url(#cv1d)"/>' +
  '<line x1="30" y1="80" x2="200" y2="80" stroke="#E53935" stroke-width="2" marker-end="url(#cv1d)"/>' +
  '<line x1="30" y1="120" x2="200" y2="120" stroke="#E53935" stroke-width="2" marker-end="url(#cv1d)"/>' +
  P(30,40,'#E53935','1') + P(30,80,'#E53935','2') + P(30,120,'#E53935','3');

const cv2svg = TRACK +
  '<line x1="30" y1="20" x2="30" y2="160" stroke="#fff" stroke-width="2.5"/>' +
  '<line x1="325" y1="20" x2="325" y2="160" stroke="#E53935" stroke-width="3" opacity="0.8"/>' +
  defs1('cv2d','#E53935') +
  '<line x1="30" y1="40" x2="315" y2="40" stroke="#E53935" stroke-width="2" marker-end="url(#cv2d)"/>' +
  '<line x1="30" y1="80" x2="295" y2="80" stroke="#E53935" stroke-width="2" marker-end="url(#cv2d)"/>' +
  '<line x1="30" y1="120" x2="320" y2="120" stroke="#E53935" stroke-width="2" marker-end="url(#cv2d)"/>' +
  P(30,40,'#E53935','1') + P(30,80,'#E53935','2') + P(30,120,'#E53935','3');

// COURSE DE HAIES - hurdle helper
function hurdle(x, y) {
  return '<rect x="' + (x-12) + '" y="' + (y-16) + '" width="24" height="3" fill="#FF5722"/>' +
    '<rect x="' + (x-2) + '" y="' + (y-13) + '" width="4" height="13" fill="#FF5722"/>';
}
const ch1svg = TRACK +
  '<line x1="30" y1="20" x2="30" y2="160" stroke="#fff" stroke-width="2.5"/>' +
  hurdle(110,60) + hurdle(190,60) + hurdle(270,60) +
  defs1('ch1d','#E53935') +
  '<path d="M 50,78 Q 80,38 110,60" stroke="#E53935" stroke-width="2" fill="none" marker-end="url(#ch1d)"/>' +
  '<path d="M 112,60 Q 150,30 190,60" stroke="#E53935" stroke-width="2" fill="none" marker-end="url(#ch1d)"/>' +
  '<path d="M 192,60 Q 230,30 270,60" stroke="#E53935" stroke-width="2" fill="none" marker-end="url(#ch1d)"/>' +
  P(50,80,'#E53935','A');

const ch2svg = TRACK +
  '<line x1="30" y1="20" x2="30" y2="160" stroke="#fff" stroke-width="2.5"/>' +
  '<line x1="315" y1="20" x2="315" y2="160" stroke="#E53935" stroke-width="3" opacity="0.7"/>' +
  hurdle(85,60) + hurdle(145,60) + hurdle(205,60) + hurdle(265,60) + hurdle(310,60) +
  hurdle(85,100) + hurdle(145,100) + hurdle(205,100) + hurdle(265,100) + hurdle(310,100) +
  defs1('ch2d','#E53935') +
  '<path d="M 30,78 Q 57,38 85,60" stroke="#E53935" stroke-width="2" fill="none" marker-end="url(#ch2d)"/>' +
  '<path d="M 30,118 Q 57,78 85,100" stroke="#1565C0" stroke-width="2" fill="none" marker-end="url(#ch2d)"/>' +
  P(30,80,'#E53935','A') + P(30,120,'#1565C0','B');

// COURSE DE RELAIS
const cr1svg = TRACK +
  '<rect x="160" y="20" width="50" height="140" fill="rgba(255,255,0,0.18)" stroke="#FFD600" stroke-width="2" stroke-dasharray="4,2"/>' +
  defs2('cr1p','#E53935','cr1r','#FFD600') +
  '<line x1="130" y1="90" x2="158" y2="90" stroke="#E53935" stroke-width="2.5" marker-end="url(#cr1p)"/>' +
  '<line x1="212" y1="90" x2="250" y2="90" stroke="#FFD600" stroke-width="2.5" stroke-dasharray="5,3" marker-end="url(#cr1r)"/>' +
  P(130,90,'#E53935','1') + P(212,90,'#1565C0','2');

const cr2svg = TRACK +
  '<rect x="88" y="20" width="42" height="140" fill="rgba(255,255,0,0.12)" stroke="#FFD600" stroke-width="1.5" stroke-dasharray="4,2"/>' +
  '<rect x="183" y="20" width="42" height="140" fill="rgba(255,255,0,0.12)" stroke="#FFD600" stroke-width="1.5" stroke-dasharray="4,2"/>' +
  '<rect x="278" y="20" width="42" height="140" fill="rgba(255,255,0,0.12)" stroke="#FFD600" stroke-width="1.5" stroke-dasharray="4,2"/>' +
  defs1('cr2d','#E53935') +
  '<line x1="30" y1="75" x2="85" y2="75" stroke="#E53935" stroke-width="2.5" marker-end="url(#cr2d)"/>' +
  P(30,75,'#E53935','1') + P(110,75,'#1565C0','2') + P(205,75,'#E53935','3') + P(300,75,'#1565C0','4');

// COURSE DE DUREE
const cd1svg = OVAL_TRACK +
  defs1('cd1d','#E53935') +
  '<path d="M 215,22 A 125,43 0 1 1 145,22" stroke="#E53935" stroke-width="2.5" fill="none" marker-end="url(#cd1d)"/>' +
  P(215,22,'#E53935','A') +
  '<rect x="168" y="78" width="24" height="24" rx="4" fill="#FF8F00" opacity="0.85"/>' +
  '<text x="180" y="94" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">km</text>';

const cd2svg = OVAL_TRACK +
  defs1('cd2d','#1565C0') +
  '<path d="M 215,22 A 125,43 0 1 1 145,22" stroke="#1565C0" stroke-width="2.5" fill="none" marker-end="url(#cd2d)"/>' +
  P(215,22,'#E53935','A') + P(145,22,'#1565C0','B') + P(320,90,'#FF8F00','C');

// SAUT EN LONGUEUR
const sl1svg = LJ_FIELD +
  defs2('sl1r','#E53935','sl1a','#FFD600') +
  '<line x1="30" y1="90" x2="262" y2="90" stroke="#E53935" stroke-width="2.5" marker-end="url(#sl1r)"/>' +
  '<path d="M 278,50 Q 305,10 338,55" stroke="#FFD600" stroke-width="3" fill="none" marker-end="url(#sl1a)"/>' +
  P(30,90,'#E53935','A');

const sl2svg = LJ_FIELD +
  defs2('sl2r','#E53935','sl2a','#FFD600') +
  '<line x1="30" y1="90" x2="262" y2="90" stroke="#E53935" stroke-width="2.5" marker-end="url(#sl2r)"/>' +
  '<path d="M 278,48 Q 308,5 345,62" stroke="#FFD600" stroke-width="3" fill="none" marker-end="url(#sl2a)"/>' +
  P(30,90,'#E53935','1') + P(30,108,'#1565C0','2') + P(30,72,'#FF8F00','3');

// SAUT EN HAUTEUR
const sh1svg = HJ_FIELD +
  defs1('sh1m','#E53935') +
  '<path d="M 90,165 Q 130,168 150,130 Q 175,88 200,58 Q 232,28 275,72 Q 284,90 278,66" stroke="#E53935" stroke-width="2.5" fill="none" marker-end="url(#sh1m)"/>' +
  P(90,165,'#E53935','A');

const sh2svg = HJ_FIELD +
  '<line x1="155" y1="52" x2="285" y2="52" stroke="#E53935" stroke-width="2.5" stroke-dasharray="6,3"/>' +
  defs1('sh2m','#E53935') +
  '<path d="M 90,165 Q 130,168 150,130 Q 175,88 200,48 Q 232,18 278,62 Q 286,82 280,58" stroke="#E53935" stroke-width="2.5" fill="none" marker-end="url(#sh2m)"/>' +
  P(90,165,'#E53935','1') + P(90,145,'#1565C0','2') + P(90,125,'#FF8F00','3');

// LANCER DE POIDS
const lp1svg = SP_FIELD +
  defs2('lp1m','#E53935','lp1a','#FFD600') +
  '<path d="M 90,115 L 65,82 L 90,67" stroke="#E53935" stroke-width="2.5" fill="none" marker-end="url(#lp1m)"/>' +
  '<line x1="90" y1="67" x2="205" y2="40" stroke="#FFD600" stroke-width="2.5" marker-end="url(#lp1a)"/>' +
  P(90,115,'#E53935','A');

const lp2svg = SP_FIELD +
  defs1('lp2a','#FFD600') +
  '<path d="M 90,100 Q 200,28 315,62" stroke="#FFD600" stroke-width="3" fill="none" marker-end="url(#lp2a)"/>' +
  '<circle cx="315" cy="62" r="6" fill="#FF8F00"/>' +
  P(90,115,'#E53935','A') + P(90,138,'#1565C0','B') + P(90,82,'#FF8F00','C');

// GYMNASTIQUE
const gym1svg = GYM_MAT +
  defs1('gym1m','#1565C0') +
  '<rect x="50" y="70" width="55" height="40" rx="5" fill="rgba(21,101,192,0.12)" stroke="#1565C0" stroke-width="1.5"/>' +
  '<rect x="155" y="70" width="55" height="40" rx="5" fill="rgba(21,101,192,0.12)" stroke="#1565C0" stroke-width="1.5"/>' +
  '<rect x="260" y="70" width="55" height="40" rx="5" fill="rgba(21,101,192,0.12)" stroke="#1565C0" stroke-width="1.5"/>' +
  '<line x1="112" y1="90" x2="150" y2="90" stroke="#1565C0" stroke-width="2.5" marker-end="url(#gym1m)"/>' +
  '<line x1="217" y1="90" x2="255" y2="90" stroke="#1565C0" stroke-width="2.5" marker-end="url(#gym1m)"/>' +
  P(77,90,'#E53935','A') + P(182,90,'#E53935','B') + P(287,90,'#E53935','C') +
  '<text x="77" y="135" text-anchor="middle" fill="#1565C0" font-size="8" font-weight="bold">roulade</text>' +
  '<text x="182" y="135" text-anchor="middle" fill="#1565C0" font-size="8" font-weight="bold">ATR</text>' +
  '<text x="287" y="135" text-anchor="middle" fill="#1565C0" font-size="8" font-weight="bold">saut</text>';

const gym2svg = GYM_MAT +
  defs1('gym2m','#1565C0') +
  '<path d="M 40,155 L 88,82 L 150,132 L 210,52 L 272,122 L 330,72" stroke="#1565C0" stroke-width="2.5" fill="none" stroke-dasharray="6,3" marker-end="url(#gym2m)"/>' +
  P(40,155,'#E53935','1') + P(88,82,'#E53935','2') + P(150,132,'#E53935','3') +
  P(210,52,'#E53935','4') + P(272,122,'#E53935','5') + P(330,72,'#E53935','6');

// TENNIS DE TABLE
const tt1svg = TT_TABLE +
  defs1('tt1p','#FFD600') +
  '<path d="M 82,90 Q 118,52 165,75 Q 195,90 228,68 Q 262,48 290,72" stroke="#FFD600" stroke-width="2.5" fill="none" marker-end="url(#tt1p)"/>' +
  P(82,90,'#E53935','A') + P(290,90,'#1565C0','B');

const tt2svg = TT_TABLE +
  defs1('tt2p','#FFD600') +
  '<path d="M 82,82 Q 125,42 168,72 Q 188,85 212,58 Q 252,32 290,65" stroke="#FFD600" stroke-width="2" fill="none" marker-end="url(#tt2p)"/>' +
  '<path d="M 288,95 Q 250,130 215,105 Q 195,92 172,118 Q 135,145 82,118" stroke="#FFD600" stroke-width="2" fill="none" marker-end="url(#tt2p)"/>' +
  P(82,90,'#E53935','A') + P(290,90,'#1565C0','B');

// BADMINTON
const bd1svg = BD_COURT +
  defs2('bd1h','#1565C0','bd1d','#E53935') +
  '<path d="M 92,145 Q 112,18 172,48" stroke="#1565C0" stroke-width="2.5" fill="none" marker-end="url(#bd1h)"/>' +
  '<path d="M 268,45 Q 248,130 208,148" stroke="#E53935" stroke-width="2.5" fill="none" stroke-dasharray="6,3" marker-end="url(#bd1d)"/>' +
  P(92,148,'#E53935','A') + P(268,148,'#1565C0','B');

const bd2svg = BD_COURT +
  defs1('bd2m','#FFD600') +
  '<path d="M 92,145 Q 130,22 268,32 Q 298,62 268,145" stroke="#FFD600" stroke-width="2" fill="none" stroke-dasharray="5,3" marker-end="url(#bd2m)"/>' +
  P(92,148,'#E53935','A') + P(268,148,'#1565C0','B');

// DEFAULT
const defSvg = GREEN_BG +
  P(100,90,'#E53935','A') + P(260,90,'#1565C0','B');

// ─── Build full SCHEMAS JS string ─────────────────────────────────────────────
const L = '<span>';
const R = '</span>';
const sp = '</span><span>';

function schema(bgL, fgD, em, sport, sit, svg, legend, desc) {
  return JSON.stringify(S(bgL, fgD, em, sport, sit, svg, legend, desc));
}

const GN = '#E8F5E9'; const GD = '#1B5E20'; // green
const OR = '#FFF3E0'; const OD = '#E65100'; // orange (basketball)
const BL = '#E8EAF6'; const BD_C = '#1A237E'; // blue (volleyball)
const TN = '#F3E5AB'; const TD = '#5D4037'; // tan (athletics)
const GY = '#E3F2FD'; const GYD = '#0D47A1'; // gymnastics
const TT = '#E0F2F1'; const TTD = '#004D40'; // table tennis
const BD = '#FFFDE7'; const BDD = '#5D4037'; // badminton

const output = `var SCHEMAS = {
    'Handball': {
        1: ${schema(GN,GD,'🤾','Handball','S1 \u2014 3 contre 2 sur demi-terrain',hb1svg,
          L+'🔴 Attaquants A·B·C'+R+L+'🔵 Défenseurs D'+R+L+'🟠 Gardien G'+R+L+'<span style="color:#B8960C">- -→ Passe</span>'+R+L+'<span style="color:#C62828">→ Tir</span>'+R,
          '3c2 demi-terrain \xb7 créer et exploiter la supériorité numérique pour tirer')},
        2: ${schema(GN,GD,'🤾','Handball','S2 \u2014 Match 4v4 + gardiens',hb2svg,
          L+'🔴 Équipe 1 (A·B·C·D)'+R+L+'🔵 Équipe 2 (E·F·G·H)'+R+L+'🟠 Gardiens'+R,
          'Match 4c4 terrain complet \xb7 organisation attaque/défense avec gardiens')}
    },
    'Football': {
        1: ${schema(GN,GD,'⚽','Football','S1 \u2014 Passe et va 3v1',fb1svg,
          L+'🔴 Attaquants A·B·C'+R+L+'🔵 Défenseur D'+R+L+'🟠 Gardien G'+R+L+'<span style="color:#B8960C">- -→ Passe</span>'+R+L+'<span style="color:#C62828">→ Déplacement</span>'+R,
          '3v1 demi-terrain \xb7 démarquage, passe et va, conduite de balle, finition au but')},
        2: ${schema(GN,GD,'⚽','Football','S2 \u2014 Match 5v5 + gardiens',fb2svg,
          L+'🔴 Équipe 1 (A-E)'+R+L+'🔵 Équipe 2 (F-J)'+R+L+'🟠 Gardiens'+R,
          'Match 5v5 terrain complet \xb7 organisation collective, transitions et finition')}
    },
    'Basketball': {
        1: ${schema(OR,OD,'🏀','Basketball','S1 \u2014 Contre-attaque 2v1',bk1svg,
          L+'🔴 Attaquants A·B'+R+L+'🔵 Défenseur D'+R+L+'<span style="color:#B8960C">- -→ Passe</span>'+R+L+'<span style="color:#C62828">→ Dribble/Drive</span>'+R,
          '2c1 demi-terrain \xb7 exploiter la supériorité : passe, dribble, tir au panier')},
        2: ${schema(OR,OD,'🏀','Basketball','S2 \u2014 Match 3v3',bk2svg,
          L+'🔴 Équipe 1 (A·B·C)'+R+L+'🔵 Équipe 2 (D·E·F)'+R,
          'Match 3v3 terrain complet \xb7 démarquage, circulation de balle, tir en situation réelle')}
    },
    'Volleyball': {
        1: ${schema(BL,BD_C,'🏐','Volleyball','S1 \u2014 Réception–Passe–Attaque',vb1svg,
          L+'🔴 Réceptionneur R'+R+L+'🟠 Passeur P'+R+L+'🔴 Attaquant A'+R+L+'🔵 Camp adverse'+R+L+'<span style="color:#C62828">→ Trajectoire ballon</span>'+R,
          'Construction en 3 touches : manchette (R) → passe haute (P) → smash/attaque (A)')},
        2: ${schema(BL,BD_C,'🏐','Volleyball','S2 \u2014 Match 4v4',vb2svg,
          L+'🔴 Équipe 1 (A·B·C·D)'+R+L+'🔵 Équipe 2 (E·F·G·H)'+R,
          'Match 4v4 terrain complet \xb7 3 touches max, rotation, construction du point')}
    },
    'Course de vitesse': {
        1: ${schema(TN,TD,'🏃','Course de vitesse','S1 \u2014 Départ réactif sur 40m',cv1svg,
          L+'🔴 Coureurs (1·2·3)'+R+L+'<span style="color:#C62828">→ Sens de course</span>'+R+L+'| Ligne départ'+R,
          '3 couloirs / 40m \xb7 travail du départ au signal et de la phase d\'accélération initiale')},
        2: ${schema(TN,TD,'🏃','Course de vitesse','S2 \u2014 Course chronométrée 60m',cv2svg,
          L+'🔴 Coureurs (1·2·3)'+R+L+'<span style="color:#C62828">→ Course complète</span>'+R+L+'<span style="color:#E53935">| Ligne arrivée</span>'+R,
          'Course officielle chronométrée sur 60m \xb7 départ bas, maintien vitesse, finish engagé')}
    },
    'Course de haies': {
        1: ${schema(TN,TD,'🏃‍♂️','Course de haies','S1 \u2014 Franchissement 3 haies rythmé',ch1svg,
          L+'🔴 Coureur A'+R+L+'🟠 Haies ×3'+R+L+'<span style="color:#C62828">→ Trajectoire</span>'+R,
          '3 haies / rythme 3 appuis entre chaque \xb7 jambe d\'attaque tendue, reprise d\'appui active')},
        2: ${schema(TN,TD,'🏃‍♂️','Course de haies','S2 \u2014 Course officielle 5 haies',ch2svg,
          L+'🔴 Coureur A'+R+L+'🔵 Coureur B'+R+L+'🟠 Haies ×5'+R+L+'<span style="color:#E53935">| Ligne arrivée</span>'+R,
          'Course complète 5 haies \xb7 maintien de la vitesse et rythme régulier sur tout le parcours')}
    },
    'Course de relais': {
        1: ${schema(TN,TD,'🏃‍♂️','Course de relais','S1 \u2014 Transmission du témoin',cr1svg,
          L+'🔴 Passeur 1'+R+L+'🔵 Receveur 2'+R+L+'<span style="color:#D4B800">Zone jaune = zone de passage</span>'+R,
          'Transmission dans la zone (20m) \xb7 accélération avant réception, bras tendu, sans regarder')},
        2: ${schema(TN,TD,'🏃‍♂️','Course de relais','S2 \u2014 Course 4×60m complète',cr2svg,
          L+'🔴 Coureurs impairs (1·3)'+R+L+'🔵 Coureurs pairs (2·4)'+R+L+'<span style="color:#D4B800">Zones de passage</span>'+R,
          'Course complète 4×60m \xb7 synchronisation des 3 passages de témoin dans chaque zone')}
    },
    'Course de durée': {
        1: ${schema(TN,TD,'⏱️','Course de durée','S1 \u2014 Allure régulière balisée',cd1svg,
          L+'🔴 Coureur A'+R+L+'🟠 Repère km'+R+L+'<span style="color:#C62828">→ Sens de rotation</span>'+R,
          'Piste balisée \xb7 gérer son allure constante sur 8-10 min, repères de distance et cardio')},
        2: ${schema(TN,TD,'⏱️','Course de durée','S2 \u2014 Course 12-15 min chronométrée',cd2svg,
          L+'🔴 Coureur A'+R+L+'🔵 Coureur B'+R+L+'🟠 Coureur C'+R,
          'Course individuelle 12-15 min \xb7 allure personnalisée, comptage des tours, bilan distance')}
    },
    'Saut en longueur': {
        1: ${schema(TN,TD,'🦘','Saut en longueur','S1 \u2014 Course d\'élan + impulsion',sl1svg,
          L+'🔴 Sauteur A'+R+L+'<span style="color:#C62828">→ Course d\'élan</span>'+R+L+'<span style="color:#D4B800">⌒ Trajectoire vol</span>'+R,
          'Course d\'élan accélérée → impulsion planche d\'appel → vol → réception fosse sable')},
        2: ${schema(TN,TD,'🦘','Saut en longueur','S2 \u2014 Saut complet 3 essais',sl2svg,
          L+'🔴🔵🟠 3 Sauteurs'+R+L+'<span style="color:#C62828">→ Élan</span>'+R+L+'<span style="color:#D4B800">⌒ Vol</span>'+R,
          'Rotation des 3 sauteurs \xb7 3 essais officiels chacun, mesure de la meilleure performance')}
    },
    'Saut en hauteur': {
        1: ${schema(TN,TD,'⬆️','Saut en hauteur','S1 \u2014 Franchissement dorsal fosbury',sh1svg,
          L+'🔴 Sauteur A'+R+L+'<span style="color:#C62828">→ Trajectoire fosbury-flop</span>'+R+L+'Barre + tapis'+R,
          'Approche courbe 5-7 foulées \xb7 impulsion pied extérieur \xb7 rotation dorsale \xb7 réception tapis')},
        2: ${schema(TN,TD,'⬆️','Saut en hauteur','S2 \u2014 Compétition progressive',sh2svg,
          L+'🔴🔵🟠 3 Sauteurs'+R+L+'<span style="color:#E53935">- - Barre haute</span>'+R+L+'Tapis de réception'+R,
          'Compétition 3 essais par hauteur \xb7 progression des barres \xb7 appliquer la technique complète')}
    },
    'Lancer de poids': {
        1: ${schema(TN,TD,'💪','Lancer de poids','S1 \u2014 Technique de translation',lp1svg,
          L+'🔴 Lanceur A'+R+L+'<span style="color:#C62828">→ Translation dans cercle</span>'+R+L+'<span style="color:#D4B800">→ Trajectoire poids</span>'+R,
          'Translation dos→face dans cercle \xb7 poussée jambes + extension bras \xb7 lancer dans secteur autorisé')},
        2: ${schema(TN,TD,'💪','Lancer de poids','S2 \u2014 Lancer compétition',lp2svg,
          L+'🔴🔵🟠 3 Lanceurs'+R+L+'<span style="color:#D4B800">⌒ Trajectoire poids</span>'+R+L+'Secteur autorisé'+R,
          'Rotation des 3 lanceurs \xb7 3 essais officiels chacun \xb7 mesure distance dans secteur')}
    },
    'Gymnastique': {
        1: ${schema(GY,GYD,'🤸','Gymnastique','S1 \u2014 Ateliers techniques',gym1svg,
          L+'🔴 Élèves A·B·C'+R+L+'<span style="color:#1565C0">→ Rotation ateliers</span>'+R,
          '3 ateliers en rotation : roulade avant/arrière \xb7 ATR (appui tendu renversé) \xb7 saut extension')},
        2: ${schema(GY,GYD,'🤸','Gymnastique','S2 \u2014 Enchaînement 6 éléments',gym2svg,
          L+'🔴 Positions 1→6'+R+L+'<span style="color:#1565C0">→ Liaison/déplacement</span>'+R,
          'Enchaînement complet sur tapis \xb7 6 éléments liés avec fluidité, tenue et présentation')}
    },
    'Tennis de table': {
        1: ${schema(TT,TTD,'🏓','Tennis de table','S1 \u2014 Échange coup droit régulier',tt1svg,
          L+'🔴 Joueur A'+R+L+'🔵 Joueur B'+R+L+'<span style="color:#D4B800">→ Trajectoire balle</span>'+R,
          'Échange régulier coup droit \xb7 10 coups consécutifs sans faute \xb7 bras détendu, replacement centre')},
        2: ${schema(TT,TTD,'🏓','Tennis de table','S2 \u2014 Match simple 11 points',tt2svg,
          L+'🔴 Joueur A'+R+L+'🔵 Joueur B'+R+L+'<span style="color:#D4B800">→ Échanges aller-retour</span>'+R,
          'Match officiel meilleur des 3 sets de 11 points \xb7 service alternant toutes les 2 balles')}
    },
    'Basketball 3x3': {
        1: ${schema(OR,OD,'🏀','Basketball 3x3','S1 \u2014 Check-ball + Sortie d\'arc',bk31svg,
          L+'🔴 Équipe attaque (A·B·C)'+R+L+'🔵 Équipe défense (D·E·F)'+R+L+'<span style="color:#B8960C">- -→ Check-ball</span>'+R,
          'Check-ball obligatoire \xb7 sortie de l\'arc avant chaque attaque \xb7 possession max 12 secondes')},
        2: ${schema(OR,OD,'🏀','Basketball 3x3','S2 \u2014 Match 3x3 officiel FIBA',bk32svg,
          L+'🔴 Équipe 1 (A·B·C)'+R+L+'🔵 Équipe 2 (D·E·F)'+R+L+'🟠 Panier P'+R,
          'Match officiel 3x3 demi-terrain \xb7 1pt intérieur / 2pts extérieur \xb7 check-ball obligatoire')}
    },
    'Rugby': {
        1: ${schema(GN,GD,'🏉','Rugby','S1 \u2014 Passe arrière en ligne',rg1svg,
          L+'🔴 Porteurs A·B·C·D'+R+L+'<span style="color:#B8960C">- -→ Passe arrière</span>'+R+L+'<span style="color:#C62828">→ Avancer en-but</span>'+R,
          'Ligne de 4 joueurs en mouvement \xb7 passes strictement arrière \xb7 progression vers l\'en-but')},
        2: ${schema(GN,GD,'🏉','Rugby','S2 \u2014 Match à toucher 5v5',rg2svg,
          L+'🔴 Équipe 1 (A-E)'+R+L+'🔵 Équipe 2 (F-J)'+R+L+'<span style="color:#D4B800">En-but (jaune)</span>'+R,
          'Match 5v5 à toucher \xb7 passes arrière obligatoires \xb7 aplatir dans la zone jaune pour marquer')}
    },
    'Badminton': {
        1: ${schema(BD,BDD,'🏸','Badminton','S1 \u2014 Dégagé haut + Amorti',bd1svg,
          L+'🔴 Joueur A'+R+L+'🔵 Joueur B'+R+L+'<span style="color:#1565C0">⌒ Dégagé (long haut)</span>'+R+L+'<span style="color:#C62828">⌒ Amorti (court)</span>'+R,
          'Échange 2 coups : dégagé vers fond de court (A→B) puis amorti près du filet (B→A)')},
        2: ${schema(BD,BDD,'🏸','Badminton','S2 \u2014 Match simple 21 points',bd2svg,
          L+'🔴 Joueur A'+R+L+'🔵 Joueur B'+R+L+'<span style="color:#D4B800">→ Trajectoire volant</span>'+R,
          'Match officiel 21 points / 2 sets gagnants \xb7 service court obligatoire, lignes de fond actives')}
    },
    'default': {
        1: ${schema(GN,GD,'📐','Organisation','Schéma général',defSvg,
          L+'🔴 Acteur A'+R+L+'🔵 Acteur B'+R,
          'Disposition générale sur l\'espace de pratique \xb7 adapter selon l\'activité et l\'objectif de séance')}
    }
};`;

// ─── Splice into references.js ────────────────────────────────────────────────
const filepath = path.join(__dirname, '..', 'api', 'data', 'references.js');
const content = fs.readFileSync(filepath, 'utf8');
const lines = content.split('\n');

// Lines 445-531 (1-indexed) → indices 444-530
const before = lines.slice(0, 444);
const after  = lines.slice(531);

fs.writeFileSync(filepath, [...before, output, ...after].join('\n'), 'utf8');
console.log('✅ SCHEMAS replaced successfully.');
console.log('New total lines:', (before.length + 1 + after.length));
