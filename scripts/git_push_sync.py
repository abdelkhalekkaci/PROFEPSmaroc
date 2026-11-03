import os
import shutil
import subprocess

TOKEN = "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"
REPO_URL = f"https://{TOKEN}@github.com/abdelkhalekkaci/PROFEPSmaroc.git"
CLONE_DIR = "/tmp/profeps_push"

try:
    if os.path.exists(CLONE_DIR):
        shutil.rmtree(CLONE_DIR)

    print("Cloning repository...")
    subprocess.run(["git", "clone", "--depth", "1", "-b", "main", REPO_URL, CLONE_DIR], check=True)

    print("Configuring git user...")
    subprocess.run(["git", "config", "user.name", "abdelkhalekkaci"], cwd=CLONE_DIR, check=True)
    subprocess.run(["git", "config", "user.email", "profepsma@gmail.com"], cwd=CLONE_DIR, check=True)

    print("Copying updated public/, root HTML, and scripts/ files...")
    # Copy public/ to both public/ and root of the repository (for Vite / static hosting compatibility)
    subprocess.run(["cp", "-r", "public/.", f"{CLONE_DIR}/public/"], check=True)
    subprocess.run(["cp", "-r", "public/.", f"{CLONE_DIR}/"], check=True)
    # Remove old generalist athletics regulation article if present in remote
    old_athle = os.path.join(CLONE_DIR, "public", "reglement-athletisme-world-athletics-jury-eps.html")
    if os.path.exists(old_athle):
        os.remove(old_athle)
    old_athle_root = os.path.join(CLONE_DIR, "reglement-athletisme-world-athletics-jury-eps.html")
    if os.path.exists(old_athle_root):
        os.remove(old_athle_root)
    # Remove temporary chat screenshot attachments if present
    for sub in [os.path.join(CLONE_DIR, "public", "assets", "aistudio"), os.path.join(CLONE_DIR, "assets", "aistudio")]:
        if os.path.exists(sub):
            shutil.rmtree(sub)
    # Copy scripts/ and src/
    subprocess.run(["cp", "-r", "scripts/.", f"{CLONE_DIR}/scripts/"], check=True)
    if os.path.exists("src"):
        subprocess.run(["cp", "-r", "src/.", f"{CLONE_DIR}/src/"], check=True)
    # Copy server.js, server.ts, and root configs
    for cfg in ["server.js", "server.ts", "package.json", "vite.config.ts", "tsconfig.json", "metadata.json"]:
        if os.path.exists(cfg):
            subprocess.run(["cp", cfg, f"{CLONE_DIR}/{cfg}"], check=True)

    print("Checking git status...")
    status = subprocess.run(["git", "status", "--porcelain"], cwd=CLONE_DIR, capture_output=True, text=True, check=True)
    print("Changed files:\n" + status.stdout)

    if status.stdout.strip():
        subprocess.run(["git", "add", "-A"], cwd=CLONE_DIR, check=True)
        commit_msg = "fix(seo-production-root): sync updated index.html, blog.html, sitemap.xml, and all 163 static HTML pages to repository root for production build"
        subprocess.run(["git", "commit", "-m", commit_msg], cwd=CLONE_DIR, check=True)
        print("Pushing to main branch...")
        subprocess.run(["git", "push", "origin", "main"], cwd=CLONE_DIR, check=True)
        rev = subprocess.run(["git", "rev-parse", "--short", "HEAD"], cwd=CLONE_DIR, capture_output=True, text=True, check=True)
        print("Push succeeded! Commit:", rev.stdout.strip())
    else:
        print("No changes detected to commit.")

finally:
    if os.path.exists(CLONE_DIR):
        shutil.rmtree(CLONE_DIR)
        print("Cleaned up /tmp/profeps_push safely.")
