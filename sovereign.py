import sys
import os

# Add the current directory to the path explicitly
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

from engine.aether import AetherEngine

if __name__ == "__main__":
    print(":: INITIATING SOVEREIGN ASCENSION ::")
    Aether = AetherEngine()
    Aether.run()
