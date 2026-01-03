import requests, time, re, json, os; from bs4 import BeautifulSoup; from urllib.parse import urlparse; from collections import Counter
DP="comms/directives"; IP="comms/intel"; H={'User-Agent':'NeuralMatrixBot/1.0 (Signed: Jonathan Battles)'}

def robots(u):
    try:
        r=requests.get(f"{urlparse(u).scheme}://{urlparse(u).netloc}/robots.txt",timeout=3)
        if r.status_code!=200: return True
        return "disallow: /" not in r.text.lower()
    except: return True

def summ(t):
    t=t.strip(); 
    if not t: return ""
    w=re.findall(r'\w+',t.lower())
    if not w: return ""
    c=set(x for x,y in Counter(w).most_common(20) if len(x)>3)
    s=sorted([(len(set(re.findall(r'\w+',i.lower()))&c),i) for i in t.split('. ')],reverse=True)
    f=[i[1].strip() for i in s[:3] if i[1].strip()]
    return ". ".join(f)+"." if f else ""

def scrape(u):
    print(f">> TARGET: {u}")
    if not robots(u): return {"error":"Robots Denied","url":u}
    try:
        r=requests.get(u,headers=H,timeout=10); s=BeautifulSoup(r.content,'html.parser')
        for t in s(["script","style","nav","footer","form"]): t.decompose()
        txt=" ".join(s.get_text().split()); ttl=s.title.string.strip() if s.title and s.title.string else u
        return {"title":ttl,"url":u,"summary":summ(txt),"full":txt[:3000]}
    except Exception as e: return {"error":str(e),"url":u}

def run():
    os.makedirs(IP,exist_ok=True)
    if not os.path.exists(DP): return
    for f in [x for x in os.listdir(DP) if x.endswith('.txt')]:
        with open(os.path.join(DP,f)) as d: us=[l.strip() for l in d if l.startswith('http')]
        if not us: continue
        rep=[scrape(u) for u in us]
        with open(os.path.join(IP,f"INTEL_{int(time.time())}.json"),'w') as o: json.dump(rep,o,indent=2)
        os.remove(os.path.join(DP,f)); print(f":: PROCESSED {f} ::")

if __name__=="__main__": run()
