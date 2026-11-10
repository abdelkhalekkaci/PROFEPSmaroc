import os
import shutil
import subprocess

TOKEN = "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"
REPO_URL = f"https://{TOKEN}@github.com/abdelkhalekkaci/PROFEPSmaroc.git"
CLONE_DIR = "/tmp/profeps_push_final"
GITHUB_NAME = "abdelkhalekkaci"
GITHUB_EMAIL = "kaci.abdelkhalek.95@gmail.com"

try:
    if os.path.exists(CLONE_DIR):
        shutil.rmtree(CLONE_DIR)

    print("Cloning repository...")
    subprocess.run(["git", "clone", "--depth", "1", "-b", "main", REPO_URL, CLONE_DIR], check=True)

    print("Configuring git user...")
    subprocess.run(["git", "config", "user.name", GITHUB_NAME], cwd=CLONE_DIR, check=True)
    subprocess.run(["git", "config", "user.email", GITHUB_EMAIL], cwd=CLONE_DIR, check=True)

    print("Copying updated files...")
    subprocess.run(["cp", "-r", "public/.", f"{CLONE_DIR}/public/"], check=True)
    subprocess.run(["cp", "-r", "scripts/.", f"{CLONE_DIR}/scripts/"], check=True)

    status = subprocess.run(["git", "status", "--porcelain"], cwd=CLONE_DIR, capture_output=True, text=True, check=True)
    print("Changed files:\n" + status.stdout)

    if status.stdout.strip():
        subprocess.run(["git", "add", "-A"], cwd=CLONE_DIR, check=True)
        commit_msg = "Centrage de la sous-navigation, suppression badge session et réhabilitation complète des boutons CTA"
        subprocess.run(["git", "commit", "-m", commit_msg], cwd=CLONE_DIR, check=True)
        print("Pushing to main branch...")
        subprocess.run(["git", "push", "origin", "main"], cwd=CLONE_DIR, check=True)
        print("Push succeeded!")
    else:
        print("No changes detected to commit.")

finally:
    if os.path.exists(CLONE_DIR):
        shutil.rmtree(CLONE_DIR)
        print("Cleaned up /tmp/profeps_push_final safely.")
