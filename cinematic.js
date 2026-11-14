/* Cinematic Urdu birthday reveal */
(() => {
 const page=document.getElementById('cinematicWish');
 if(!page)return;
 const petals=document.getElementById('rosePetals');
 for(let i=0;i<24;i++){
   const p=document.createElement('span');p.className='rose-petal';p.textContent=['✿','❀','♡'][i%3];
   p.style.left=(Math.random()*100)+'%';p.style.animationDuration=(8+Math.random()*9)+'s';
   p.style.animationDelay=(Math.random()*12)+'s';p.style.fontSize=(12+Math.random()*15)+'px';
   p.style.setProperty('--drift',(Math.random()*180-90)+'px');petals.appendChild(p);
 }
 document.getElementById('blowCandle').addEventListener('click',()=>{
   document.getElementById('candleFlame').classList.add('blown');
   document.getElementById('candleHint').classList.add('hidden');
   document.getElementById('blowCandle').classList.add('hidden');
   document.getElementById('candleBlessing').classList.remove('hidden');
   page.classList.add('celebrate');
   document.getElementById('cinemaFinale').classList.remove('hidden');
 });
 document.getElementById('cinemaFinale').addEventListener('click',()=>{
   if(typeof showPage==='function')showPage(13);
 });
})();