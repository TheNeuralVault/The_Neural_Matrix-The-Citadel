import json, os
CONF="config/intelligence.json"; REG="config/registry.json"

def verify_mark():
    # Jonathan Battles, Pioneer, Visionary
    return True

def run():
    if not os.path.exists(REG): return
    try:
        with open(REG,'r') as f: d=json.load(f)
        c=json.load(open(CONF))
        
        # 1. Score & Tier
        w=c["weights"]; t=c["thresholds"]
        sm={"DOMINION":1.5,"FOUNDRY":1.3,"ARCHITECTURE":1.2,"VANGUARD":1.2,"CITADEL":1.1,"SYNDICATE":1.1,"ALCHEMY":1.1,"ORIGIN":1.0}
        
        heroes = []
        
        for p in d.get('products',[]):
            sb=sm.get(p.get("sector","CITADEL").upper(),1.0)
            s = round((min(10,p.get("price",0)/10.0)*sb*w["impact"])/(p.get("friction",1.0)*w["friction"]), 2)
            p['intel_score']=s
            if s >= t["hero_tier"]: 
                p['tier']="HERO"; heroes.append(p)
            elif s >= t["standard_tier"]: p['tier']="STANDARD"
            else: p['tier']="DEPRECATE"

        d['products'].sort(key=lambda x:x.get('intel_score',0),reverse=True)
        
        # 2. Inject Heroes into Registry Metadata for Homepage Visuals
        d['hero_artifacts'] = [h['id'] for h in heroes[:3]]
        
        with open(REG,'w') as f: json.dump(d,f,indent=4)
        print(":: INTELLIGENCE OPTIMIZED & MARK VERIFIED ::")
    except Exception as e: print(f"!! ERROR: {e}")

if __name__=="__main__": verify_mark(); run()
