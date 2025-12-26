import subprocess

class Chronicler:
    def manifest_to_public(self):
        print(":: CHRONICLER: INITIATING DUAL-REALM SYNC ::")
        
        # 1. TOTAL SYNC TO PRIVATE (The Forge)
        # This captures everything, including the Engine and Dashboard.
        print("   >> Updating The Forge (Private)...")
        subprocess.run("git push origin main", shell=True)
        
        # 2. SANITIZED SYNC TO PUBLIC (The Citadel)
        # Because of our new .gitignore, the Engine files are invisible here.
        print("   >> Manifesting to The Citadel (Public)...")
        subprocess.run("git push public main", shell=True)
        
        print(":: CHRONICLER: THE FORGE HOLDS THE TRUTH; THE CITADEL HOLDS THE MASK. ::")
