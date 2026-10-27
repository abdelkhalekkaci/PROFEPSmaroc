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

    print("Copying updated public/ and scripts/ files...")
    # Copy public/
    subprocess.run(["cp", "-r", "public/.", f"{CLONE_DIR}/public/"], check=True)
    # Copy scripts/
    subprocess.run(["cp", "-r", "scripts/.", f"{CLONE_DIR}/scripts/"], check=True)

    print("Checking git status...")
    status = subprocess.run(["git", "status", "--porcelain"], cwd=CLONE_DIR, capture_output=True, text=True, check=True)
    print("Changed files:\n" + status.stdout)

    if status.stdout.strip():
        subprocess.run(["git", "add", "-A"], cwd=CLONE_DIR, check=True)
        commit_msg = "Refonte EPS : Cadre référentiel CNEE, sous-navigation moderne 13 disciplines et harmonisation des CTA ProfEPS"
        subprocess.run(["git", "commit", "-m", commit_msg], cwd=CLONE_DIR, check=True)
        print("Pushing to main branch...")
        subprocess.run(["git", "push", "origin", "main"], cwd=CLONE_DIR, check=True)
        print("Push succeeded!")
    else:
        print("No changes detected to commit.")

finally:
    if os.path.exists(CLONE_DIR):
        shutil.rmtree(CLONE_DIR)
        print("Cleaned up /tmp/profeps_push safely.")
