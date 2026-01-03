import os
import time
import subprocess
from datetime import datetime

# CONFIG
# Colors for Titanium Aesthetic
GREEN = '\033[92m'
CYAN = '\033[96m'
RED = '\033[91m'
RESET = '\033[0m'
BOLD = '\033[1m'

def clear_screen():
    os.system('clear')

def check_file_status(filename):
    if os.path.exists(filename):
        size = os.path.getsize(filename)
        return f"{GREEN}ONLINE ({size} bytes){RESET}"
    else:
        return f"{RED}PENDING...{RESET}"

def get_inventory_count():
    try:
        if os.path.exists("INVENTORY_REPORT.md"):
            with open("INVENTORY_REPORT.md", "r") as f:
                lines = f.readlines()
                # Count lines that look like product entries
                count = sum(1 for line in lines if "Product:" in line)
            return f"{GREEN}{count} Artifacts Ready{RESET}"
        return f"{CYAN}Initializing Factory...{RESET}"
    except:
        return "Error reading inventory"

def main():
    while True:
        clear_screen()
        now = datetime.now().strftime("%H:%M:%S")
        
        print(f"{GREEN}{BOLD}")
        print("🔱 CITADEL OPERATIONS CENTER (OVERWATCH)")
        print(f"   TIME: {now} | STATUS: ACTIVE")
        print("="*50)
        print(f"{RESET}")

        # SECTION 1: CAMPAIGN ASSETS
        print(f"{BOLD}1. FUNDING TRIAD ASSETS:{RESET}")
        print(f"   [ ] Kickstarter Campaign:   {check_file_status('kickstarter_campaign.txt')}")
        print(f"   [ ] GoFundMe Updates:       {check_file_status('gofundme_updates.txt')}")
        print("")

        # SECTION 2: FACTORY OUTPUT
        print(f"{BOLD}2. INFINITE FACTORY (GROQ):{RESET}")
        print(f"   [ ] Inventory Report:       {check_file_status('INVENTORY_REPORT.md')}")
        print(f"   [ ] Product Count:          {get_inventory_count()}")
        print("")

        # SECTION 3: SYSTEM HEARTBEAT
        print(f"{BOLD}3. LAST KNOWN ENGRAM:{RESET}")
        try:
            # Show last line of log
            if os.path.exists("engrams_log.json"):
                 result = subprocess.check_output("tail -n 1 engrams_log.json", shell=True).decode('utf-8')
                 print(f"   {CYAN}{result.strip()[:60]}...{RESET}")
            else:
                print("   No neural activity detected.")
        except:
            print("   Log unreadable.")

        print(f"\n{GREEN}="*50)
        print(f"   MONITORING... (Press CTRL+C to Exit){RESET}")
        
        # Refresh every 3 seconds
        time.sleep(3)

if __name__ == "__main__":
    main()
