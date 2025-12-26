import sys
import os
import time
import logging

# SOVEREIGN PATH INJECTION
# This ensures agents/ is visible even when running from engine/
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

try:
    from agents.warden import Warden
    from agents.chronicler import Chronicler
except ImportError as e:
    print(f":: ERROR: AGENTS NOT FOUND :: {e}")
    print(f"Current Path: {sys.path}")
    sys.exit(1)

# INITIALIZE SOVEREIGN LOGS
os.makedirs('logs', exist_ok=True)
logging.basicConfig(filename='logs/engine.log', level=logging.INFO, 
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')

class AetherEngine:
    def __init__(self):
        self.warden = Warden()
        self.chronicler = Chronicler()
        self.is_active = True

    def pulse(self):
        print(":: ENGINE PULSE :: Analyzing Realms...")
        if self.warden.scan_integrity():
            print("   >> Warden: Integrity Verified.")
            if self.chronicler.check_pending_updates():
                self.chronicler.manifest_to_public()
            else:
                print("   >> Chronicler: No pending manifestations.")
        else:
            print("   >> Warden: ALERT! Integrity Breach.")

    def run(self):
        print(":: AETHER ENGINE ONLINE :: Sovereign Governance Active.")
        while self.is_active:
            self.pulse()
            print(":: ENGINE SLEEPING :: Next pulse in 1 hour.")
            time.sleep(3600) 

if __name__ == "__main__":
    Aether = AetherEngine()
    Aether.run()
