const CONFIG={registry:'config/registry.json'};
document.addEventListener('DOMContentLoaded',()=>{initParticles();initRegistry();initHunterKiller();});
async function initRegistry(){
 const grid=document.getElementById('product-grid');if(!grid)return;
 try{const r=await fetch(CONFIG.registry);if(!r.ok)throw new Error("OFFLINE");const d=await r.json();
 const cat=document.body.getAttribute('data-category');render(d.products,grid,cat);
 if(window.location.hash)setTimeout(()=>{const t=document.querySelector(window.location.hash);if(t)t.scrollIntoView({behavior:"smooth",block:"center"});},500);
 }catch(e){grid.innerHTML=`<div style="color:red;text-align:center;">// ERROR: ${e.message}</div>`;}
}
function render(prods,con,filt){
 con.innerHTML='';let c=0;
 prods.forEach(p=>{
  if(filt&&filt!==""&&p.category!==filt)return;if(p.status!=='active')return;
  const d=document.createElement('div');d.className='glass-panel product-card';d.id=p.slug;d.setAttribute('data-search',(p.title+" "+p.tags.join(" ")).toLowerCase());
  d.innerHTML=`<div style="display:flex;justify-content:space-between;margin-bottom:1rem;"><span style="color:#bc13fe;border:1px solid #bc13fe;padding:2px 6px;font-size:0.7rem;">${p.category}</span></div><h3 style="color:#fff;">${p.title}</h3><p style="color:#888;font-size:0.9rem;min-height:60px;">${p.description}</p><div style="margin-top:auto;"><div style="font-size:1.5rem;font-weight:bold;color:#fff;margin:1.5rem 0;">$${p.price.toFixed(2)}</div><a href="${p.stripe_link}" class="btn-acquire" target="_blank">INITIATE TRANSFER</a></div>`;
  con.appendChild(d);c++;
 });
 if(c===0)con.innerHTML='<div style="text-align:center;padding:4rem;color:#666;">// SECTOR EMPTY</div>';
}
function initHunterKiller(){
 const g=document.getElementById('product-grid');if(!g)return;
 const i=document.createElement('input');i.className='hunter-killer-bar';i.type='text';i.placeholder='>> SEARCH_ARMORY...';
 i.addEventListener('keyup',e=>{const t=e.target.value.toLowerCase();document.querySelectorAll('.product-card').forEach(c=>{c.style.display=c.getAttribute('data-search').includes(t)?'block':'none';});});
 g.parentNode.insertBefore(i,g);
}
function initParticles(){
 const c=document.getElementById('neural-canvas');if(!c)return;const x=c.getContext('2d');let w,h;
 const r=()=>{w=c.width=window.innerWidth;h=c.height=window.innerHeight;};window.addEventListener('resize',r);r();
 const p=Array.from({length:60},()=>({x:Math.random()*w,y:Math.random()*h,v:Math.random()*1.5+0.5,c:Math.random()>0.9?'#00f3ff':'#111'}));
 const l=()=>{x.fillStyle='rgba(5,5,5,0.2)';x.fillRect(0,0,w,h);p.forEach(k=>{x.fillStyle=k.c;x.fillRect(k.x,k.y,2,2);k.y+=k.v;if(k.y>h){k.y=0;k.x=Math.random()*w;}});requestAnimationFrame(l);};l();
}
