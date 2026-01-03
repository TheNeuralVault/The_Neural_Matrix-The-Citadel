import http.server
import socketserver
import os
import json
from datetime import datetime

PORT = 9091
CODEX_FILE = "neural_codex.md"
LOG_FILE = "engrams_log.json"

class MagnusBridge(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Route root to dashboard
        if self.path == "/":
            self.path = "dashboard.html"
        return http.server.SimpleHTTPRequestHandler.do_GET(self)

    def do_POST(self):
        # This handles the 'Logging Page' requirement
        # It allows the Dashboard to save memories back to the phone
        if self.path == "/log_engram":
            content_length = int(self.headers['Content-Length'])
            post_data = json.loads(self.rfile.read(content_length))
            
            self.save_engram(post_data)
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"status": "Engram Sealed"}).encode())

    def save_engram(self, data):
        # Maintain the timeline
        engrams = []
        if os.path.exists(LOG_FILE):
            with open(LOG_FILE, 'r') as f:
                try: engrams = json.load(f)
                except: engrams = []
        
        data['timestamp'] = str(datetime.now())
        engrams.append(data)
        
        with open(LOG_FILE, 'w') as f:
            json.dump(engrams, f, indent=4)
        print(f"💾 [MEMORY] Engram #{len(engrams)} saved to {LOG_FILE}")

# Initializing System
print(f"🔱 MAGNUS BRIDGE V3.0: SOVEREIGNTY MODE")

if os.path.exists(CODEX_FILE):
    with open(CODEX_FILE, 'r') as f:
        codex_content = f.read()
    print(f"   > [STATUS] Neural Codex V3.0 Loaded.")
    print(f"   > [SENSORS] Repos: Erebus, Sandbox, Galaxies, Citadel.")
else:
    print(f"   > [CRITICAL] Codex V3.0 Missing. Infrastructure at risk.")

print(f"   > [GOAL] Capital Accumulation: Kickstarter/GoFundMe Hooks Ready.")
print(f"   > Serving on http://localhost:{PORT}")

with socketserver.TCPServer(("", PORT), MagnusBridge) as httpd:
    httpd.serve_forever()

