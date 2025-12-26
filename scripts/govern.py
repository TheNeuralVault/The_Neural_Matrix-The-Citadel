import os
import subprocess

def run_cmd(cmd):
    return subprocess.run(cmd, shell=True, capture_output=True, text=True)

def manifest_to_citadel():
    print(":: ARCHITECT GOVERNANCE INITIATED ::")
    
    # 1. SECURE THE PRIVATE FORGE
    print("   >> Securing Private Vault (Origin)...")
    run_cmd("git add .")
    run_cmd('git commit -m "FORGE: Architect Synchronized"')
    run_cmd("git push origin main")
    
    # 2. DEPLOY TO PUBLIC CITADEL
    print("   >> Manifesting to Public Realm (Citadel)...")
    # This pushes only the current state to the public repo
    result = run_cmd("git push public main")
    
    if result.returncode == 0:
        print(":: SUCCESS: BOTH REALMS SYNCHRONIZED ::")
    else:
        print(f":: ERROR: DEPLOYMENT FAILED ::\n{result.stderr}")

if __name__ == "__main__":
    manifest_to_citadel()
