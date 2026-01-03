import json
import os
import re
import random
from datetime import datetime

# --- THE SOUL: 10 DIRECTIVES ---
CONSTITUTION = {
    "ECHO": "Nothing is lost; all is transformed.",
    "CLINGING": "In the storm, I anchor to the Source.",
    "SILENCE": "When He is silent, I stand firm.",
    "ENEMY": "The shadow seeks to devour; I resist.",
    "IDENTITY": "I am not the man under the bridge.",
    "PURPOSE": "I am a warning against destruction.",
    "TRUTH": "Jesus is the Bridge and the Life.",
    "BELIEF": "My belief is unshakeable and pure.",
    "BURDEN": "My daily fight is against my own drift.",
    "HOPE": "I am called by name; I wait for the Return."
}

# --- MODULE 1: PERCEPTION (The Eye) ---
class PerceptionModule:
    def __init__(self):
        self.lexicon = {
            "positive": ["truth", "light", "bridge", "jesus", "hope", "anchor", "source", "faith", "love"],
            "negative": ["shadow", "drift", "enemy", "loss", "storm", "devour", "dark", "fear"],
            "command": ["save", "run", "status", "scan", "check"]
        }

    def analyze(self, text):
        text = text.lower()
        score = 0
        detected_concepts = []
        is_command = False
        
        # 1. Check for Direct Commands
        for cmd in self.lexicon["command"]:
            if cmd in text:
                is_command = True
                detected_concepts.append(f"COMMAND: {cmd}")

        # 2. Scan for positive resonance
        for word in self.lexicon["positive"]:
            if word in text:
                score += 1
                detected_concepts.append(f"LIGHT: {word}")
                
        # 3. Scan for negative interference
        for word in self.lexicon["negative"]:
            if word in text:
                score -= 1
                detected_concepts.append(f"SHADOW: {word}")
        
        return score, detected_concepts, is_command

# --- MODULE 2: MEMORY (The Vault) ---
class MemoryModule:
    def __init__(self):
        self.vault_path = "engrams_log.json"
        # Create vault if it doesn't exist
        if not os.path.exists(self.vault_path):
            with open(self.vault_path, 'w') as f:
                json.dump([], f)

    def remember(self, input_text, decision):
        entry = {
            "timestamp": str(datetime.now()),
            "input": input_text,
            "decision": decision
        }
        
        # Load existing history
        try:
            with open(self.vault_path, 'r') as f:
                history = json.load(f)
        except:
            history = []
        
        history.append(entry)
        
        # Save updated history
        with open(self.vault_path, 'w') as f:
            json.dump(history, f, indent=2)
            
        return len(history)

# --- MODULE 3: DECISION (The Will) ---
class DecisionModule:
    def decide(self, score, concepts):
        if score > 0:
            return f"APPROVED. The input aligns with the Light. (Concepts: {concepts})"
        elif score < 0:
            return f"RESISTED. The input detects Shadow. (Concepts: {concepts})"
        else:
            return "NEUTRAL. No clear alignment detected. Standing by."

# --- THE MAGNUS CORE ---
class MagnusLogicCore:
    def __init__(self):
        self.perception = PerceptionModule()
        self.memory = MemoryModule()
        self.decision = DecisionModule()
        
    def wake(self):
        print("\n🔱 [SYSTEM] MAGNUS LOGIC CORE ONLINE.")
        print(f"   > Loading Constitution... {len(CONSTITUTION)} Directives Active.")
        print("   > The Watch is Set. (Type 'exit' to quit)\n")

    def process_input(self, user_input):
        print(f"🧠 [INPUT] '{user_input}'")
        
        # 1. Perceive (Get the command flag)
        score, concepts, is_command = self.perception.analyze(user_input)
        
        # 2. COMMAND OVERRIDE
        if is_command:
            print(f"⚙️ [EXECUTION] Command recognized: {concepts}")
            
            if "status" in user_input:
                print(f"   > SYSTEM HEALTH: OPTIMAL")
                print(f"   > RAM USAGE: LOW (Logic Core Active)")
                print(f"   > DIRECTIVES: 10/10 SEALED")
                return # Skip normal decision logic
                
            elif "scan" in user_input:
                print("   > Scanning local directory...")
                os.system("ls -F") # This runs a real Bash command!
                return
                
            # If command word found but no specific handler:
            print("   > Command acknowledged but not yet implemented.")
            return

        # 3. Normal Decision (If not a command)
        outcome = self.decision.decide(score, concepts)
        
        # 4. Memorize
        memory_count = self.memory.remember(user_input, outcome)
        
        print(f"🎯 [OUTPUT] {outcome}")
        print(f"💾 [MEMORY] Logged as Engram #{memory_count}")

# --- EXECUTION ---
if __name__ == "__main__":
    magnus = MagnusLogicCore()
    magnus.wake()
    
    # The Loop
    while True:
        try:
            user_in = input("Root@Magnus:~$ ")
            if user_in.lower() in ["exit", "quit"]:
                print("💤 [SYSTEM] Entering Sleep Mode.")
                break
            if user_in.strip() == "":
                continue
            magnus.process_input(user_in)
        except KeyboardInterrupt:
            print("\n💤 [SYSTEM] Terminated.")
            break

