/* Lumiera: compare two soaps + voice search (AR/EN) */
(function(){
"use strict";
var P=[[1, "massage", 149, "قطعة مساج التوت الأحمر", "Red Berry Massage Bar", 110], [2, "massage", 139, "قطعة مساج الحرير الوردي", "Pink Silk Massage Bar", 100], [3, "massage", 159, "قطعة مساج الليل الذهبي", "Golden Night Massage Bar", 120], [4, "massage", 149, "قطعة مساج الزمرد", "Emerald Massage Bar", 110], [5, "massage", 159, "قطعة مساج السماء المرصعة", "Starry Sky Massage Bar", 120], [6, "massage", 129, "قطعة مساج اللؤلؤ الأبيض", "White Pearl Massage Bar", 100], [7, "massage", 149, "قطعة مساج الفضة", "Silver Massage Bar", 110], [8, "massage", 139, "قطعة مساج اللؤلؤ", "Pearl Massage Bar", 100], [9, "massage", 139, "قطعة مساج الورد الفاتح", "Soft Pink Massage Bar", 100], [10, "massage", 169, "قطعة مساج الذهب الأسود", "Black Gold Massage Bar", 120], [11, "round", 129, "القرص الأخضر الملكي", "Royal Green Round", 90], [12, "round", 139, "القرص الفضي", "Silver Round", 85], [13, "round", 149, "قرص الزمرد", "Emerald Round", 90], [14, "round", 149, "القرص الفيروزي", "Turquoise Round", 90], [15, "round", 139, "قرص الماندالا الليلي", "Night Mandala Round", 95], [16, "round", 129, "القرص الرمادي المنقوش", "Engraved Grey Round", 95], [17, "round", 119, "القرص الأزرق الفاتح", "Light Blue Round", 80], [18, "oval", 129, "القرص الأزرق", "Blue Oval", 85], [19, "oval butterfly", 119, "بيضة الفراشة اللؤلؤية", "Pearl Butterfly Oval", 75], [20, "rose", 129, "وردة اللؤلؤ الأبيض", "White Pearl Rose", 80], [21, "butterfly", 139, "الفراشة الفضية", "Silver Butterfly", 70], [22, "butterfly", 139, "الفراشة الزرقاء", "Blue Butterfly", 70], [23, "rose", 149, "الوردة الزرقاء", "Blue Rose", 85], [24, "heart", 159, "القلبان الأزرقان", "Twin Blue Hearts", 90], [25, "rose", 169, "الوردة الذهبية", "Golden Rose", 85], [26, "oval", 179, "قرص النحلة الذهبي", "Golden Bee Oval", 95], [27, "rose", 139, "الوردة الوردية اللؤلؤية", "Pink Pearl Rose", 80], [28, "square", 129, "المربع الأزرق", "Blue Square", 75]];
var SH={massage:["مساج","Massage bar"],round:["دائري","Round"],oval:["بيضاوي","Oval"],rose:["وردة","Rose"],butterfly:["فراشة","Butterfly"],heart:["قلب","Heart"],square:["مربع","Square"]};
var AD="\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669";
function lang(){try{return localStorage.getItem("lum-lang")==="en"?"en":"ar";}catch(e){return "ar";}}
function dg(x,l){var s=String(x);return l==="ar"?s.replace(/[0-9]/g,function(d){return AD[+d];}):s;}
function shown(p){return Math.round(p[2]*0.9);}
function money(x,l){return l==="ar"?dg(x,l)+" \u062c\u0646\u064a\u0647":"EGP "+x;}
function prod(n){return P[n-1]||null;}
function shapeOf(p,l){return SH[p[1].split(" ")[0]][l==="ar"?0:1];}
function img(n){return "./assets/ai-"+String(n).padStart(2,"0")+"-1.jpg";}
function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;}
var T={ar:{cmp:"\u2696 \u0642\u0627\u0631\u0646",cmpOn:"\u2713 \u0641\u064a \u0627\u0644\u0645\u0642\u0627\u0631\u0646\u0629",tray:"\u0642\u0627\u0631\u0646",pick:"\u0627\u062e\u062a\u0627\u0631 \u0635\u0627\u0628\u0648\u0646\u0629 \u062a\u0627\u0646\u064a\u0629 \u0639\u0634\u0627\u0646 \u062a\u0642\u0627\u0631\u0646",title:"\u0645\u0642\u0627\u0631\u0646\u0629 \u0628\u064a\u0646 \u0635\u0627\u0628\u0648\u0646\u062a\u064a\u0646",shape:"\u0627\u0644\u0634\u0643\u0644",weight:"\u0627\u0644\u0648\u0632\u0646",price:"\u0627\u0644\u0633\u0639\u0631",gram:"\u062c\u0631\u0627\u0645",add:"\u0623\u0636\u0641 \u0644\u0644\u0633\u0644\u0629 \u{1F9FA}",close:"\u0625\u063a\u0644\u0627\u0642",clear:"\u0645\u0633\u062d",toast:"\u0627\u062a\u0636\u0627\u0641\u062a \u0644\u0644\u0633\u0644\u0629 \u2705",lower:"\u0627\u0644\u0623\u0642\u0644 \u0633\u0639\u0631\u0627\u064b",remove:"\u0634\u064a\u0644",
 mic:"\u0627\u0628\u062d\u062b \u0628\u0635\u0648\u062a\u0643",listen:"\u0628\u0633\u0645\u0639\u0643\u2026 \u0642\u0648\u0644 \u0645\u062b\u0644\u0627\u064b: \u00ab\u0639\u0627\u064a\u0632 \u0635\u0627\u0628\u0648\u0646\u0629 \u0648\u0631\u062f\u00bb",heard:"\u0633\u0645\u0639\u062a:",noSpeech:"\u0645\u0633\u0645\u0639\u062a\u0634 \u0635\u0648\u062a. \u062c\u0631\u0651\u0628 \u062a\u0627\u0646\u064a.",denied:"\u0627\u0644\u0645\u064a\u0643\u0631\u0648\u0641\u0648\u0646 \u0645\u0634 \u0645\u0633\u0645\u0648\u062d. \u0627\u0641\u062a\u062d \u0627\u0644\u0645\u0648\u0642\u0639 \u0641\u064a Chrome \u0623\u0648 Safari \u0648\u0627\u0633\u0645\u062d \u0628\u0627\u0644\u0645\u064a\u0643\u0631\u0648\u0641\u0648\u0646.",err:"\u0627\u0644\u0628\u062d\u062b \u0628\u0627\u0644\u0635\u0648\u062a \u0645\u0634 \u0634\u063a\u0627\u0644 \u062f\u0644\u0648\u0642\u062a\u064a. \u0627\u0643\u062a\u0628 \u0627\u0633\u0645 \u0627\u0644\u0635\u0627\u0628\u0648\u0646\u0629 \u0628\u062f\u0644\u0647."},
 en:{cmp:"\u2696 Compare",cmpOn:"\u2713 Comparing",tray:"Compare",pick:"Pick one more soap to compare",title:"Compare two soaps",shape:"Shape",weight:"Weight",price:"Price",gram:"g",add:"Add to cart \u{1F9FA}",close:"Close",clear:"Clear",toast:"Added to cart \u2705",lower:"Lower price",remove:"Remove",
 mic:"Search by voice",listen:"Listening\u2026 say e.g. \u201ca rose soap\u201d",heard:"Heard:",noSpeech:"No speech heard. Try again.",denied:"Microphone blocked. Open the site in Chrome or Safari and allow the microphone.",err:"Voice search isn't working right now. Type the soap name instead."}};
var sel=[];
function css(){
 if(document.getElementById("lcmp-css"))return;
 var s=document.createElement("style");s.id="lcmp-css";
 s.textContent=".lcmp-btn{position:absolute;top:8px;inset-inline-end:8px;z-index:3;background:rgba(255,255,255,.92);color:#a8832e;border:1px solid #c9a64c;border-radius:999px;padding:5px 11px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit}"
 +".lcmp-btn.on{background:#a8832e;color:#fff}"
 +".lcmp-tray{position:fixed;bottom:20px;inset-inline-end:14px;z-index:9998;background:#241f14;color:#f3e9d0;border:1.5px solid #c9a64c;border-radius:16px;padding:8px 10px;display:flex;align-items:center;gap:8px;max-width:calc(100vw - 100px);box-shadow:0 4px 16px rgba(0,0,0,.3);font-family:inherit}"
 +".lcmp-tray img{width:38px;height:38px;border-radius:8px;object-fit:cover;border:1px solid #c9a64c}"
 +".lcmp-tray .ph{width:38px;height:38px;border-radius:8px;border:1px dashed #c9a64c;display:flex;align-items:center;justify-content:center;color:#c9a64c;font-size:18px}"
 +".lcmp-go{background:linear-gradient(180deg,#e9cf8b,#a8832e);color:#241f14;border:0;border-radius:10px;padding:9px 12px;font-weight:700;font-size:13px;cursor:pointer;font-family:inherit}"
 +".lcmp-go[disabled]{opacity:.45;cursor:default}"
 +".lcmp-x{background:none;border:0;color:#c9a64c;font-size:18px;cursor:pointer;padding:0 2px}"
 +".lcmp-ov{position:fixed;inset:0;background:rgba(20,16,8,.65);z-index:100001;display:flex;align-items:center;justify-content:center;padding:10px;font-family:inherit}"
 +".lcmp-box{background:#fbf7ec;color:#241f1c;border:1px solid #c9a64c;border-radius:18px;width:100%;max-width:460px;max-height:94vh;overflow:auto;padding:14px;position:relative}"
 +".lum-dark .lcmp-box,.lcmp-dark .lcmp-box{background:#241f14;color:#f3e9d0}"
 +".lcmp-h{font-size:17px;font-weight:700;color:#a8832e;text-align:center;margin:2px 28px 12px}"
 +".lcmp-close{position:absolute;top:8px;inset-inline-end:10px;background:rgba(255,255,255,.9);border:1px solid #c9a64c;color:#a8832e;border-radius:999px;width:30px;height:30px;font-size:19px;cursor:pointer;line-height:1}"
 +".lcmp-g{display:grid;grid-template-columns:58px 1fr 1fr;gap:6px;align-items:stretch}"
 +".lcmp-g>div{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:8px 4px;border-radius:10px;font-size:13px;line-height:1.5}"
 +".lcmp-lab{color:#8a7a52;font-weight:700;font-size:12px}"
 +".lcmp-v{background:#fff;border:1px solid #e6d9b3}"
 +".lum-dark .lcmp-v,.lcmp-dark .lcmp-v{background:#2c2618;border-color:#4a3f22}"
 +".lcmp-v.best{border-color:#a8832e;box-shadow:inset 0 0 0 1px #a8832e}"
 +".lcmp-img{width:100%;aspect-ratio:4/5;object-fit:cover;border-radius:10px;display:block}"
 +".lcmp-nm{font-weight:700;font-size:13px}"
 +".lcmp-pr{color:#a8832e;font-weight:700;font-size:15px}.lcmp-pr s{color:#999;font-weight:400;font-size:11px;display:block}"
 +".lcmp-tag{font-size:10px;color:#a8832e;font-weight:700}"
 +".lcmp-add{width:100%;background:#a8832e;color:#fff;border:0;border-radius:10px;padding:10px 4px;font-weight:700;font-size:13px;cursor:pointer;font-family:inherit}"
 +".lcmp-rm{background:none;border:0;color:#a8832e;font-size:12px;text-decoration:underline;cursor:pointer;font-family:inherit}"
 /* voice */
 +".lum-f-search.lvc-pad{padding-inline-end:48px;box-sizing:border-box}"
 +".lvc-mic{position:absolute;inset-inline-end:16px;width:34px;height:34px;border-radius:50%;border:1px solid #c9a64c;background:#fff;color:#a8832e;font-size:17px;line-height:1;cursor:pointer;padding:0;z-index:2;font-family:inherit}"
 +".lvc-mic.on{background:#a8832e;color:#fff;animation:lvcp 1s infinite}"
 +"@keyframes lvcp{0%{box-shadow:0 0 0 0 rgba(168,131,46,.6)}100%{box-shadow:0 0 0 12px rgba(168,131,46,0)}}"
 +".lvc-st{font-size:12px;color:#8a6d1f;margin:6px 2px 0;min-height:0}.lvc-st.err{color:#b03a2e}";
 document.head.appendChild(s);
}
/* ---------- compare ---------- */
var tray=null,ov=null;
function closeOv(){if(ov){ov.remove();ov=null;}document.body.style.overflow="";}
function toggle(n){var i=sel.indexOf(n);if(i>=0)sel.splice(i,1);else{if(sel.length>=2)sel.shift();sel.push(n);}refresh();}
function addCart(n){if(window.lumCart&&window.lumCart.addMany)window.lumCart.addMany([n],T[lang()].toast);}
function openCmp(){
 if(sel.length<2)return;closeOv();
 ov=el("div","lcmp-ov");if(document.querySelector(".lum-dark"))ov.classList.add("lcmp-dark");
 ov.onclick=function(e){if(e.target===ov)closeOv();};
 document.body.appendChild(ov);document.body.style.overflow="hidden";renderCmp();
}
function renderCmp(){
 if(!ov)return;var l=lang(),t=T[l];ov.innerHTML="";ov.setAttribute("data-lg",l);
 var a=prod(sel[0]),b=prod(sel[1]);if(!a||!b){closeOv();return;}
 var box=el("div","lcmp-box");box.dir=l==="ar"?"rtl":"ltr";
 var x=el("button","lcmp-close","\u00d7");x.type="button";x.setAttribute("aria-label",t.close);x.onclick=closeOv;box.appendChild(x);
 box.appendChild(el("div","lcmp-h",t.title));
 var g=el("div","lcmp-g");
 var ps=[a,b];
 function row(label,fn,best){g.appendChild(el("div","lcmp-lab",label));ps.forEach(function(p,i){var c=el("div","lcmp-v"+(best&&best[i]?" best":""));fn(c,p);g.appendChild(c);});}
 row("",function(c,p){var im=el("img","lcmp-img");im.src=img(p[0]);im.alt=l==="ar"?p[3]:p[4];c.appendChild(im);});
 row("",function(c,p){c.appendChild(el("div","lcmp-nm",l==="ar"?p[3]:p[4]));});
 row(t.shape,function(c,p){c.textContent=shapeOf(p,l);});
 var lw=a[5]===b[5]?null:[a[5]<b[5],b[5]<a[5]];
 row(t.weight,function(c,p){c.textContent=dg(p[5],l)+" "+t.gram;});
 var lp=shown(a)===shown(b)?null:[shown(a)<shown(b),shown(b)<shown(a)];
 row(t.price,function(c,p){var pr=el("div","lcmp-pr");var o=el("s","",money(p[2],l));pr.appendChild(o);pr.appendChild(document.createTextNode(money(shown(p),l)));c.appendChild(pr);},lp);
 if(lp){g.appendChild(el("div","lcmp-lab",""));ps.forEach(function(p,i){g.appendChild(el("div","lcmp-tag",lp[i]?t.lower:""));});}
 g.appendChild(el("div","",""));
 ps.forEach(function(p){var c=el("div","");var bt=el("button","lcmp-add",t.add);bt.type="button";bt.onclick=function(){addCart(p[0]);};c.appendChild(bt);var r=el("button","lcmp-rm",t.remove);r.type="button";r.onclick=function(){var i=sel.indexOf(p[0]);if(i>=0)sel.splice(i,1);closeOv();refresh();};c.appendChild(r);g.appendChild(c);});
 box.appendChild(g);ov.appendChild(box);
}
function renderTray(){
 var l=lang(),t=T[l];
 if(!sel.length){if(tray){tray.remove();tray=null;}return;}
 if(!tray){tray=el("div","lcmp-tray");document.body.appendChild(tray);}
 tray.dir=l==="ar"?"rtl":"ltr";tray.setAttribute("data-k",sel.join(",")+l);tray.innerHTML="";
 for(var i=0;i<2;i++){
  if(sel[i]){var im=el("img");im.src=img(sel[i]);im.alt="";tray.appendChild(im);}
  else{tray.appendChild(el("div","ph","+"));}
 }
 var go=el("button","lcmp-go",sel.length<2?t.pick:t.tray);go.type="button";if(sel.length<2){go.disabled=true;go.style.maxWidth="110px";go.style.fontSize="11px";}go.onclick=openCmp;tray.appendChild(go);
 var c=el("button","lcmp-x","\u00d7");c.type="button";c.setAttribute("aria-label",t.clear);c.onclick=function(){sel=[];closeOv();refresh();};tray.appendChild(c);lift();
}
function ensureBtns(){
 var l=lang(),t=T[l];
 document.querySelectorAll(".lum-cardlink").forEach(function(a){
  var m=(a.getAttribute("href")||"").match(/\/p\/(\d+)/);if(!m)return;
  var card=a.querySelector(".lum-card");if(!card)return;
  var n=+m[1],on=sel.indexOf(n)>=0;
  var b=card.querySelector(".lcmp-btn");
  if(!b){b=el("button","lcmp-btn","");b.type="button";b.setAttribute("data-n",String(n));
   b.onclick=function(e){e.preventDefault();e.stopPropagation();toggle(n);};card.appendChild(b);}
  var w=on?t.cmpOn:t.cmp;if(b.textContent!==w)b.textContent=w;
  b.classList.toggle("on",on);
 });
}
function refresh(){ensureBtns();renderTray();}
/* ---------- voice ---------- */
function getSR(){return window.SpeechRecognition||window.webkitSpeechRecognition;}
var rec=null,listening=false;
var STOP=["عايز","عايزه","عايزة","عاوز","عاوزه","عاوزة","عايزين","نفسي","ابحث","دور","دورلي","هاتلي","هات","اعرض","اعرضلي","وريني","ورني","لي","لو","سمحت","عن","على","علي","في","فيه","فى","ممكن","من","صابونة","صابونه","صابون","الصابونة","الصابونه","قطعة","قطعه","شكل","بتاع","بتاعة","i","want","a","an","soap","show","me","find","search","for","the","some","please","looking"];
function clean(txt){
 var ws=String(txt||"").replace(/[.,!?\u061f\u060c]/g," ").split(/\s+/).filter(Boolean);
 var k=ws.filter(function(w){return STOP.indexOf(w.toLowerCase())<0;});
 return (k.length?k:ws).join(" ");
}
function setStatus(bar,msg,err){
 var st=bar.querySelector(".lvc-st");
 if(!msg){if(st)st.remove();return;}
 if(!st){st=el("div","lvc-st","");st.setAttribute("role","status");var inp=bar.querySelector(".lum-f-search");inp.parentNode.insertBefore(st,inp.nextSibling);}
 st.className="lvc-st"+(err?" err":"");st.textContent=msg;
}
function stopRec(){try{if(rec)rec.stop();}catch(e){}}
function startRec(bar,btn){
 var l=lang(),t=T[l];
 if(listening){stopRec();return;}
 try{
  var SR=getSR();rec=new SR();rec.lang=l==="ar"?"ar-EG":"en-US";rec.interimResults=false;rec.maxAlternatives=1;rec.continuous=false;
  var got=false;
  rec.onstart=function(){listening=true;btn.classList.add("on");setStatus(bar,t.listen,false);};
  rec.onresult=function(e){
   var tx="";for(var i=e.resultIndex;i<e.results.length;i++){tx+=e.results[i][0].transcript+" ";}
   tx=tx.trim();if(!tx)return;got=true;
   var q=clean(tx);var inp=bar.querySelector(".lum-f-search");
   if(inp){inp.value=q;inp.dispatchEvent(new Event("input",{bubbles:true}));}
   setStatus(bar,t.heard+" \u00ab"+tx+"\u00bb",false);
  };
  rec.onerror=function(e){
   var er=e&&e.error;
   if(er==="no-speech"||er==="aborted"){if(er==="no-speech")setStatus(bar,t.noSpeech,true);}
   else if(er==="not-allowed"||er==="service-not-allowed")setStatus(bar,t.denied,true);
   else setStatus(bar,t.err,true);
  };
  rec.onend=function(){listening=false;btn.classList.remove("on");if(!got){var st=bar.querySelector(".lvc-st");if(st&&!st.classList.contains("err"))setStatus(bar,t.noSpeech,true);}};
  rec.start();
 }catch(e){listening=false;btn.classList.remove("on");setStatus(bar,t.err,true);}
}
function ensureMic(){
 if(!getSR())return;
 var bar=document.getElementById("lum-f");if(!bar)return;
 var inp=bar.querySelector(".lum-f-search");if(!inp)return;
 var l=lang(),t=T[l];
 var b=bar.querySelector(".lvc-mic");
 if(!b){
  inp.classList.add("lvc-pad");
  b=el("button","lvc-mic","\u{1F3A4}");b.type="button";
  b.onclick=function(){startRec(bar,b);};
  bar.appendChild(b);
 }
 b.setAttribute("aria-label",t.mic);b.title=t.mic;
 var top=inp.offsetTop+Math.round((inp.offsetHeight-34)/2);
 b.style.top=top+"px";
}
var sched=false;
function lift(){if(!tray)return;var c=document.getElementById("lum-install-card");tray.style.bottom=(c&&c.offsetHeight?c.offsetHeight+34:20)+"px";}
function ensure(){css();lift();ensureBtns();ensureMic();if(ov&&ov.getAttribute("data-lg")!==lang())renderCmp();if(tray&&tray.getAttribute("data-k")!==sel.join(",")+lang())renderTray();}
function onMut(){if(sched)return;sched=true;setTimeout(function(){sched=false;ensure();},100);}
document.addEventListener("keydown",function(e){if(e.key==="Escape")closeOv();});
function start(){ensure();new MutationObserver(onMut).observe(document.body,{childList:true,subtree:true});window.addEventListener("hashchange",onMut);window.addEventListener("resize",onMut);}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start);else start();
})();
