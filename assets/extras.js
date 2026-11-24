/* Lumiera extras: White Friday countdown, box builder, share button, stock badge. */
(function(){
"use strict";
var P=[
[1,149,"قطعة مساج التوت الأحمر","Red Berry Massage Bar"],[2,139,"قطعة مساج الحرير الوردي","Pink Silk Massage Bar"],
[3,159,"قطعة مساج الليل الذهبي","Golden Night Massage Bar"],[4,149,"قطعة مساج الزمرد","Emerald Massage Bar"],
[5,159,"قطعة مساج السماء المرصعة","Starry Sky Massage Bar"],[6,129,"قطعة مساج اللؤلؤ الأبيض","White Pearl Massage Bar"],
[7,149,"قطعة مساج الفضة","Silver Massage Bar"],[8,139,"قطعة مساج اللؤلؤ","Pearl Massage Bar"],
[9,139,"قطعة مساج الورد الفاتح","Soft Pink Massage Bar"],[10,169,"قطعة مساج الذهب الأسود","Black Gold Massage Bar"],
[11,129,"القرص الأخضر الملكي","Royal Green Round"],[12,139,"القرص الفضي","Silver Round"],
[13,149,"قرص الزمرد","Emerald Round"],[14,149,"القرص الفيروزي","Turquoise Round"],
[15,139,"قرص الماندالا الليلي","Night Mandala Round"],[16,129,"القرص الرمادي المنقوش","Engraved Grey Round"],
[17,119,"القرص الأزرق الفاتح","Light Blue Round"],[18,129,"القرص الأزرق","Blue Oval"],
[19,119,"بيضة الفراشة اللؤلؤية","Pearl Butterfly Oval"],[20,129,"وردة اللؤلؤ الأبيض","White Pearl Rose"],
[21,139,"الفراشة الفضية","Silver Butterfly"],[22,139,"الفراشة الزرقاء","Blue Butterfly"],
[23,149,"الوردة الزرقاء","Blue Rose"],[24,159,"القلبان الأزرقان","Twin Blue Hearts"],
[25,169,"الوردة الذهبية","Golden Rose"],[26,179,"قرص النحلة الذهبي","Golden Bee Oval"],
[27,139,"الوردة الوردية اللؤلؤية","Pink Pearl Rose"],[28,129,"المربع الأزرق","Blue Square"]
];
var END=new Date("2026-11-28T00:00:00+02:00").getTime(); /* offer ends Nov 27, Cairo time */
var BOX=5,LOW=10,AD="٠١٢٣٤٥٦٧٨٩";
var T={
 ar:{
  cdTitle:"الجمعة البيضاء بتخلص بعد",d:"يوم",h:"ساعة",m:"دقيقة",s:"ثانية",cdEnd:"عرض الجمعة البيضاء خلص. شكرًا لكل اللي اشترى 🤍",
  cdSub:"خصم ١٠٪ على أي صابونة، و٢٠٪ لما تاخد ٥ قطع أو أكتر",
  bxTitle:"ركّب بوكسك 🎁",bxText:"اختار ٥ صابونات بنفسك وشوف خصم ٢٠٪ بيتحسب قدامك",bxBtn:"ابدأ التركيب",
  bxHead:"ركّب بوكسك",bxEmpty:"فاضي",bxSub:"الإجمالي قبل الخصم",bxDisc:"خصم الكمية ٢٠٪",bxTot:"إجمالي البوكس",
  bxAdd:"أضف البوكس للسلة",bxLeft:"باقي {n} من {t}",bxFull:"البوكس اكتمل ✅",bxClose:"إغلاق",bxToast:"البوكس اتضاف للسلة ✅",bxNoDisc:"(العرض خلص)",
  share:"ابعتها لصاحبك على واتساب",shareMsg:"شوف صابونة لوميرا دي 🧼",
  low:"باقي {n} قطع بس",one:"باقي قطعة واحدة بس",two:"باقي قطعتين بس",out:"خلصت الكمية",egp:"جنيه"
 },
 en:{
  cdTitle:"White Friday ends in",d:"days",h:"hours",m:"min",s:"sec",cdEnd:"The White Friday offer has ended. Thank you 🤍",
  cdSub:"10% off any soap, and 20% off when you take 5 or more",
  bxTitle:"Build your box 🎁",bxText:"Pick 5 soaps yourself and watch the 20% discount add up",bxBtn:"Start building",
  bxHead:"Build your box",bxEmpty:"Empty",bxSub:"Subtotal",bxDisc:"Bulk discount 20%",bxTot:"Box total",
  bxAdd:"Add box to cart",bxLeft:"{n} of {t} left",bxFull:"Box complete ✅",bxClose:"Close",bxToast:"Box added to your cart ✅",bxNoDisc:"(offer ended)",
  share:"Send to a friend on WhatsApp",shareMsg:"Look at this LUMIERA soap 🧼",
  low:"Only {n} left",one:"Only 1 left",two:"Only 2 left",out:"Sold out",egp:"EGP"
 }
};
var stock={},picks=[],modal=null;
function lang(){try{return localStorage.getItem("lum-lang")==="en"?"en":"ar";}catch(e){return "ar";}}
function dg(x,ln){var s=String(x);if(ln==="ar")s=s.replace(/[0-9]/g,function(d){return AD[+d];});return s;}
function fill(s,o,ln){return s.replace(/\{(\w+)\}/g,function(m,k){return dg(o[k],ln);});}
function shown(p){return Math.round(p[1]*0.9);}
function money(x,ln){return dg(x,ln)+" "+T[ln].egp;}
function on(){return Date.now()<END;}
function el(tag,cls,txt){var e=document.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e;}
function P_(n){return P[n-1];}
function stockOf(n){var v=stock[String(n)];return typeof v==="number"?v:null;}
function stockText(n,ln){
 var v=stockOf(n);if(v===null||v>LOW)return "";
 if(v<=0)return T[ln].out;if(v===1)return T[ln].one;if(v===2)return T[ln].two;
 return fill(T[ln].low,{n:v},ln);
}

var css=".lx{margin:12px 0 16px;display:flex;flex-direction:column;gap:12px}"
+".lx-cd,.lx-bx{border:2px solid #c9a64c;border-radius:16px;background:#fff;padding:14px 12px;text-align:center}"
+".lum-dark .lx-cd,.lum-dark .lx-bx{background:#241f14}"
+".lx-t{font-size:17px;font-weight:700;color:#a8832e;margin:0 0 8px}"
+".lx-sub{font-size:12.5px;color:#585254;line-height:1.8;margin-top:8px}.lum-dark .lx-sub{color:#c9b68a}"
+".lx-boxes{display:flex;justify-content:center;gap:8px;direction:ltr}"
+".lx-b{min-width:56px;background:#a8832e;color:#fff;border-radius:10px;padding:8px 4px}"
+".lx-b b{display:block;font-size:22px;line-height:1.2;font-variant-numeric:tabular-nums}.lx-b span{font-size:11px;opacity:.9}"
+".lx-btn{display:inline-block;background:#a8832e;color:#fff;border:none;border-radius:8px;padding:10px 26px;margin-top:8px;font-weight:600;font-size:15px;font-family:inherit;cursor:pointer}"
+".lx-btn[disabled]{opacity:.45;cursor:not-allowed}"
+".lx-ov{position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:100000;display:flex;align-items:flex-end;justify-content:center}"
+".lx-md{background:#f6f7f1;width:100%;max-width:640px;max-height:92vh;border-radius:18px 18px 0 0;display:flex;flex-direction:column;overflow:hidden;color:#2c2620}"
+".lx-md.dk{background:#1b160e;color:#f2ece1}"
+".lx-mh{display:flex;justify-content:space-between;align-items:center;padding:12px 14px;border-bottom:1px solid #c9a64c}"
+".lx-mh b{color:#a8832e;font-size:17px}.lx-x{background:none;border:none;font-size:26px;line-height:1;color:#a8832e;cursor:pointer}"
+".lx-slots{display:flex;gap:6px;padding:10px 12px 4px;justify-content:center}"
+".lx-slot{width:56px;height:56px;border:2px dashed #c9a64c;border-radius:10px;overflow:hidden;position:relative;background:#fff;display:flex;align-items:center;justify-content:center;color:#c9a64c;font-size:12px;padding:0;font-family:inherit}"
+".lx-slot.f{border-style:solid}.lx-slot img{width:100%;height:100%;object-fit:cover}"
+".lx-slot i{position:absolute;top:0;inset-inline-end:0;background:#a8832e;color:#fff;font-style:normal;font-size:13px;width:18px;height:18px;line-height:18px;border-radius:0 0 0 8px}"
+".lx-hint{text-align:center;font-size:13px;color:#585254;padding:2px 12px 6px}.lx-md.dk .lx-hint{color:#c9b68a}"
+".lx-grid{display:grid;grid-auto-rows:max-content;align-content:start;grid-template-columns:repeat(3,1fr);gap:8px;padding:6px 12px;overflow-y:auto;flex:1}"
+".lx-it{border:1px solid #c9a64c;border-radius:10px;background:#fff;padding:0;overflow:hidden;cursor:pointer;font-family:inherit;color:inherit;text-align:center;position:relative}"
+".lx-md.dk .lx-it{background:#241f14}"
+".lx-it img{width:100%;aspect-ratio:1/1;object-fit:cover;display:block}"
+".lx-it .nm{font-size:11.5px;line-height:1.35;padding:4px 4px 0;min-height:30px}.lx-it .pr{font-size:12px;font-weight:700;color:#a8832e;padding:0 4px 5px}"
+".lx-it[disabled]{opacity:.4}.lx-it .cnt{position:absolute;top:4px;inset-inline-start:4px;background:#a8832e;color:#fff;border-radius:999px;font-size:12px;min-width:20px;height:20px;line-height:20px;padding:0 4px}"
+".lx-foot{border-top:1px solid #c9a64c;padding:10px 14px 14px}"
+".lx-row{display:flex;justify-content:space-between;font-size:14px;padding:2px 0}.lx-row.d{color:#2f7d4a}.lx-row.t{font-weight:700;font-size:16px;color:#a8832e}"
+".lx-foot .lx-btn{width:100%;margin-top:8px}"
+".lx-share{display:block;width:100%;margin:0 0 14px;background:#25a244;color:#fff;border:none;border-radius:10px;padding:10px 18px;font-size:15px;font-weight:700;cursor:pointer;font-family:inherit}"
+".lx-badge{position:absolute;top:8px;inset-inline-end:8px;background:#b3261e;color:#fff;font-size:11.5px;font-weight:700;border-radius:999px;padding:3px 9px;z-index:2;box-shadow:0 1px 4px rgba(0,0,0,.3)}"
+".lx-badge.out{background:#555}"
+".lx-stk{display:block;text-align:center;color:#b3261e;font-weight:700;font-size:14px;margin:0 0 10px}";
function addStyle(){if(document.getElementById("lx-style"))return;var s=document.createElement("style");s.id="lx-style";s.textContent=css;document.head.appendChild(s);}

function two(n){return n<10?"0"+n:String(n);}
function tick(){
 var box=document.getElementById("lx-cd-body");if(!box)return;
 var ln=lang(),t=T[ln],left=END-Date.now();
 if(left<=0){box.innerHTML="";box.textContent=t.cdEnd;return;}
 var s=Math.floor(left/1000),d=Math.floor(s/86400);s-=d*86400;var h=Math.floor(s/3600);s-=h*3600;var m=Math.floor(s/60);s-=m*60;
 var vals=[[d,t.d],[two(h),t.h],[two(m),t.m],[two(s),t.s]];
 var html="";
 vals.forEach(function(v){html+='<div class="lx-b"><b>'+dg(v[0],ln)+'</b><span>'+v[1]+'</span></div>';});
 box.innerHTML=html;
}

function calc(){
 var sub=0;picks.forEach(function(n){sub+=shown(P_(n));});
 var disc=on()&&picks.length>=BOX?Math.round(sub*0.2):0;
 return {sub:sub,disc:disc,tot:sub-disc};
}
function closeModal(){if(modal){modal.remove();modal=null;}document.documentElement.style.overflow="";}
function imgSrc(n){return "./assets/ai-"+(n<10?"0":"")+n+"-1.jpg";}
function renderModal(){
 if(!modal)return;
 var ln=lang(),t=T[ln],c=calc();
 modal.setAttribute("dir",ln==="ar"?"rtl":"ltr");
 var md=modal.querySelector(".lx-md");md.classList.toggle("dk",!!document.querySelector(".lum-dark"));
 var keep=md.querySelector(".lx-grid"),sc=keep?keep.scrollTop:0;
 md.innerHTML="";
 var h=el("div","lx-mh");h.appendChild(el("b","",t.bxHead));var x=el("button","lx-x","×");x.type="button";x.setAttribute("aria-label",t.bxClose);x.onclick=closeModal;h.appendChild(x);md.appendChild(h);
 var sl=el("div","lx-slots");
 for(var i=0;i<BOX;i++){
  var n=picks[i],b=el("button","lx-slot"+(n?" f":""),n?"":dg(i+1,ln));b.type="button";
  if(n){var im=el("img");im.src=imgSrc(n);im.alt="";b.appendChild(im);b.appendChild(el("i","","×"));(function(k){b.onclick=function(){picks.splice(k,1);renderModal();};})(i);}
  sl.appendChild(b);
 }
 md.appendChild(sl);
 md.appendChild(el("div","lx-hint",picks.length>=BOX?t.bxFull:fill(t.bxLeft,{n:BOX-picks.length,t:BOX},ln)));
 var g=el("div","lx-grid");
 P.forEach(function(p){
  var n=p[0],cnt=picks.filter(function(q){return q===n;}).length,full=picks.length>=BOX,so=stockOf(n)!==null&&stockOf(n)<=0;
  var b=el("button","lx-it");b.type="button";b.disabled=full||so;
  var im=el("img");im.src=imgSrc(n);im.alt="";im.loading="lazy";b.appendChild(im);
  b.appendChild(el("div","nm",ln==="ar"?p[2]:p[3]));b.appendChild(el("div","pr",money(shown(p),ln)));
  if(cnt)b.appendChild(el("span","cnt",dg(cnt,ln)));
  b.onclick=function(){if(picks.length<BOX){picks.push(n);renderModal();}};
  g.appendChild(b);
 });
 md.appendChild(g);g.scrollTop=sc;
 var f=el("div","lx-foot");
 function row(cls,a,b2){var r=el("div","lx-row "+cls);r.appendChild(el("span","",a));r.appendChild(el("span","",b2));f.appendChild(r);}
 row("",t.bxSub,money(c.sub,ln));
 if(c.disc>0)row("d",t.bxDisc,"-"+money(c.disc,ln));
 else if(picks.length>=BOX&&!on())row("d",t.bxDisc,t.bxNoDisc);
 row("t",t.bxTot,money(c.tot,ln));
 var add=el("button","lx-btn",t.bxAdd);add.type="button";add.disabled=picks.length<BOX;
 add.onclick=function(){
  if(picks.length<BOX)return;
  var list=picks.slice();closeModal();picks=[];
  if(window.lumCart&&window.lumCart.addMany)window.lumCart.addMany(list,T[lang()].bxToast);
 };
 f.appendChild(add);md.appendChild(f);
 g.scrollTop=sc;
}
function openModal(){
 if(modal)return;
 modal=el("div","lx-ov");
 modal.onclick=function(e){if(e.target===modal)closeModal();};
 modal.appendChild(el("div","lx-md"));
 document.body.appendChild(modal);document.documentElement.style.overflow="hidden";
 renderModal();
}

function ensureHome(){
 var grid=document.querySelector(".lum-grid");
 var blk=document.getElementById("lx");
 if(!grid){if(blk)blk.remove();return;}
 var ln=lang(),t=T[ln];
 if(blk&&blk.getAttribute("data-lang")!==ln){blk.remove();blk=null;}
 if(blk)return;
 var anchor=document.getElementById("quiz-promo")||document.querySelector(".lum-hero");
 if(!anchor||!anchor.parentNode)return;
 blk=el("div","lx");blk.id="lx";blk.setAttribute("data-lang",ln);blk.dir=ln==="ar"?"rtl":"ltr";
 if(on()){
  var cd=el("div","lx-cd");cd.appendChild(el("div","lx-t",t.cdTitle));
  var body=el("div","lx-boxes");body.id="lx-cd-body";cd.appendChild(body);
  cd.appendChild(el("div","lx-sub",t.cdSub));
  blk.appendChild(cd);
 }
 var bx=el("div","lx-bx");bx.appendChild(el("div","lx-t",t.bxTitle));bx.appendChild(el("div","lx-sub",t.bxText));
 var btn=el("button","lx-btn",t.bxBtn);btn.type="button";btn.onclick=openModal;bx.appendChild(btn);
 blk.appendChild(bx);
 anchor.parentNode.insertBefore(blk,anchor.nextSibling);
 tick();
}

function ensureBadges(){
 var ln=lang();
 document.querySelectorAll(".lum-cardlink").forEach(function(a){
  var m=(a.getAttribute("href")||"").match(/#\/p\/(\d+)/);if(!m)return;
  var card=a.querySelector(".lum-card");if(!card)return;
  var txt=stockText(+m[1],ln),b=card.querySelector(".lx-badge");
  if(!txt){if(b)b.remove();return;}
  if(!b){b=el("span","lx-badge");card.appendChild(b);}
  b.textContent=txt;b.classList.toggle("out",stockOf(+m[1])<=0);
 });
}

function ensureProduct(){
 var m=location.hash.match(/^#\/p\/(\d+)/);
 var sh=document.getElementById("lx-share"),sk=document.getElementById("lx-stk");
 var add=document.querySelector(".lum-add-cart[data-pn]");
 if(!m||!add||!add.parentNode||!P_(+m[1])){if(sh)sh.remove();if(sk)sk.remove();return;}
 var n=+m[1],ln=lang(),t=T[ln];
 var anchor=document.getElementById("lum-heart-pp")||document.querySelector(".lum-buy-now")||add;
 if(!sh){sh=el("button","lx-share","");sh.id="lx-share";sh.type="button";anchor.parentNode.insertBefore(sh,anchor.nextSibling);}
 else if(anchor.nextSibling!==sh){anchor.parentNode.insertBefore(sh,anchor.nextSibling);}
 sh.setAttribute("data-n",String(n));sh.textContent="📲 "+t.share;
 sh.onclick=function(){
  var q=+sh.getAttribute("data-n"),pp=P_(q),l=lang();
  var link=location.origin+location.pathname+"#/p/"+q;
  var txt=T[l].shareMsg+"\n"+(l==="ar"?pp[2]:pp[3])+" - "+money(shown(pp),l)+(l==="ar"?" (خصم الجمعة البيضاء ١٠٪)":" (White Friday -10%)")+"\n"+link;
  window.open("https://wa.me/?text="+encodeURIComponent(txt),"_blank");
 };
 var st=stockText(n,ln);
 if(!st){if(sk)sk.remove();}
 else{if(!sk){sk=el("span","lx-stk");sk.id="lx-stk";add.parentNode.insertBefore(sk,add);}sk.textContent="🔥 "+st;}
}

function ensure(){addStyle();ensureHome();ensureBadges();ensureProduct();}
var sched=false;
function onMut(){if(sched)return;sched=true;setTimeout(function(){sched=false;ensure();},90);}
function loadStock(){
 try{fetch("./stock.json?t="+Math.floor(Date.now()/300000),{cache:"no-cache"}).then(function(r){return r.ok?r.json():{};}).then(function(j){
  if(j&&typeof j==="object"){stock=j;}ensure();
 }).catch(function(){});}catch(e){}
}
function start(){
 ensure();loadStock();
 new MutationObserver(onMut).observe(document.body,{childList:true,subtree:true});
 window.addEventListener("hashchange",onMut);
 setInterval(tick,1000);
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start);else start();
})();
