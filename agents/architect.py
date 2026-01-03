import json, uuid, os, sys
REG="config/registry.json"; DL="public/downloads"; VS={"CITADEL","FOUNDRY","DOMINION","ARCHITECTURE","VANGUARD","SYNDICATE","ALCHEMY","ORIGIN"}
def forge():
    print("\n:: ARCHITECT INTERFACE ::")
    n=input("NAME: ").strip(); 
    if not n: return
    d=input("MANIFESTO: ").strip()
    try: p=float(input("PRICE: ").strip())
    except: p=0.0
    s=input("SECTOR: ").upper().strip()
    if s not in VS: print("!! INVALID SECTOR. DEFAULTING TO CITADEL."); s="CITADEL"
    
    pid=f"PROD-{str(uuid.uuid4())[:8].upper()}"; fn=n.lower().replace(" ","_")+".zip"
    dat=json.load(open(REG)) if os.path.exists(REG) else {"routes":{},"products":[]}
    dat.setdefault("products",[]).append({"id":pid,"name":n,"description":d,"price":p,"sector":s,"file":fn,"stripe_link":"#PENDING"})
    
    with open(REG,'w') as f: json.dump(dat,f,indent=4)
    os.makedirs(DL,exist_ok=True)
    with open(os.path.join(DL,fn),"w") as f: f.write(f"ASSET: {n}\nCREATOR: Jonathan Battles")
    print(f":: FORGED {pid} ::")
    # Auto-Rank
    os.system(f"{sys.executable} agents/intel.py")

if __name__=="__main__": forge()
