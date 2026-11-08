import os
import sys
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
    subprocess.run(["git", "config", "user.email", "kaci.abdelkhalek.95@gmail.com"], cwd=CLONE_DIR, check=True)

    print("Copying updated public/ and scripts/ files and cleaning root duplicates...")
    # Copy public/ to public/ in the repository
    subprocess.run(["cp", "-r", "public/.", f"{CLONE_DIR}/public/"], check=True)
    # Keep index.html at root for Vite/AI Studio entry point compatibility
    shutil.copy2("public/index.html", os.path.join(CLONE_DIR, "index.html"))

    # Clean duplicate HTML and static files from repository root that already exist in public/
    pub_entries = set(os.listdir(os.path.join(CLONE_DIR, "public")))
    for fname in os.listdir(CLONE_DIR):
        if fname in (".git", "index.html", "generateur.html"):
            continue
        root_path = os.path.join(CLONE_DIR, fname)
        if fname in pub_entries:
            if os.path.isfile(root_path) and (fname.endswith(".html") or fname in (
                "sitemap.xml", "robots.txt", "ads.txt", ".htaccess", "llms.txt",
                "llms-full.txt", "manifest.json", "profeps-cmp.js", "profeps-communaute.js"
            )):
                os.remove(root_path)
            elif os.path.isdir(root_path) and fname in ("css", "images", "pdf"):
                shutil.rmtree(root_path)

    # Remove old generalist athletics regulation article if present in remote
    old_athle = os.path.join(CLONE_DIR, "public", "reglement-athletisme-world-athletics-jury-eps.html")
    if os.path.exists(old_athle):
        os.remove(old_athle)
    # Remove temporary chat screenshot image attachments if present, while preserving PDF documents
    for sub in [os.path.join(CLONE_DIR, "public", "assets", "aistudio"), os.path.join(CLONE_DIR, "assets", "aistudio")]:
        if os.path.exists(sub):
            for f in os.listdir(sub):
                if f.lower().endswith((".png", ".jpg", ".jpeg", ".webp")):
                    os.remove(os.path.join(sub, f))
    # Copy scripts/, docs/, and src/
    subprocess.run(["cp", "-r", "scripts/.", f"{CLONE_DIR}/scripts/"], check=True)
    if os.path.exists("docs"):
        os.makedirs(f"{CLONE_DIR}/docs", exist_ok=True)
        subprocess.run(["cp", "-r", "docs/.", f"{CLONE_DIR}/docs/"], check=True)
    if os.path.exists("src"):
        subprocess.run(["cp", "-r", "src/.", f"{CLONE_DIR}/src/"], check=True)
    # Copy server.js, server.ts, and root configs
    for cfg in ["server.js", "server.ts", "vercel.json", "package.json", "vite.config.ts", "tsconfig.json", "metadata.json"]:
        if os.path.exists(cfg):
            subprocess.run(["cp", cfg, f"{CLONE_DIR}/{cfg}"], check=True)

    print("Checking git status...")
    status = subprocess.run(["git", "status", "--porcelain"], cwd=CLONE_DIR, capture_output=True, text=True, check=True)
    print("Changed files:\n" + status.stdout)

    subprocess.run(["git", "add", "-A"], cwd=CLONE_DIR, check=True)
    commit_msg = sys.argv[1] if len(sys.argv) > 1 else "feat(deploy): trigger production Vercel deployment with verified GitHub owner email"
    subprocess.run(["git", "commit", "--allow-empty", "-m", commit_msg], cwd=CLONE_DIR, check=True)
    print("Pushing to main branch...")
    subprocess.run(["git", "push", "origin", "main"], cwd=CLONE_DIR, check=True)
    rev = subprocess.run(["git", "rev-parse", "--short", "HEAD"], cwd=CLONE_DIR, capture_output=True, text=True, check=True)
    print("Push succeeded! Commit:", rev.stdout.strip())

finally:
    if os.path.exists(CLONE_DIR):
        shutil.rmtree(CLONE_DIR)
        print("Cleaned up /tmp/profeps_push safely.")
