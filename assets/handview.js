/* Lumiera: "soap in your hand" - shows the soap at real size over the phone camera (AR/EN). */
(function(){
"use strict";
if(window.__lhvLoaded)return;window.__lhvLoaded=1;
/* Longest side in cm per shape. ESTIMATES, edit here when real sizes are measured. Per-soap override: CM[n]. */
var SHAPE_CM={massage:9,round:7.5,oval:8,rose:6.5,butterfly:7.5,heart:8,square:6.5};
var KIND=["massage","massage","massage","massage","massage","massage","massage","massage","massage","massage","round","round","round","round","round","round","round","oval","oval","rose","butterfly","butterfly","rose","heart","rose","oval","rose","square"];
var CM={};
var CARD_W=8.56; /* bank card width in cm (ISO 7810 ID-1) */
var CARD_H=5.398;
var T={
 ar:{btn:"🖐 الصابونة في إيدك",title:"الصابونة بحجمها الحقيقي",
  s1:"١) اتأكد إن الصابونة هتبقى على نفس بُعد إيدك. حط كارت بنك في إيدك قدام الكاميرا، وظبط الإطار الدهبي بالسلايدر لحد ما يطابق الكارت.",
  s2:"٢) شيل الكارت وحط إيدك في نفس المكان بالظبط. اسحب الصابونة وحطها على إيدك.",
  next:"تمام، وريني الصابونة",again:"اظبط الإطار تاني",close:"إغلاق",flip:"اقلب الكاميرا",
  size:"المقاس التقريبي:",cm:"سم",
  note:"المقاس تقريبي (حوالي {w} سم عرض). كل صابونة هاند ميد وممكن تفرق سنتيمتر.",
  nocam:"الكاميرا مش شغالة على المتصفح ده. افتح الموقع من كروم أو سفاري عشان تشوف الصابونة على إيدك. وتقدر تحط الكارت على الشاشة وتشوف الحجم الحقيقي هنا.",
  card:"كارت بنك",slider:"حجم الإطار"},
 en:{btn:"🖐 Soap in your hand",title:"Soap at real size",
  s1:"1) Hold a bank card in your hand in front of the camera and drag the slider until the gold frame matches the card. Keep the card at the same distance your hand will be.",
  s2:"2) Remove the card and hold your hand in the same spot. Drag the soap onto your hand.",
  next:"Done, show me the soap",again:"Adjust frame again",close:"Close",flip:"Flip camera",
  size:"Approx. size:",cm:"cm",
  note:"Size is approximate (about {w} cm wide). Each soap is handmade and may differ by a centimetre.",
  nocam:"The camera is not available in this browser. Open the site in Chrome or Safari to see the soap in your hand. You can also put a card on the screen and see the real size here.",
  card:"Bank card",slider:"Frame size"}
};
var AD="\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669";
function lang(){try{return localStorage.getItem("lum-lang")==="en"?"en":"ar";}catch(e){return "ar";}}
function dg(x,l){var s=String(x);return l==="ar"?s.replace(/[0-9]/g,function(d){return AD[+d];}):s;}
function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;}
function widthCm(n){return CM[n]||SHAPE_CM[KIND[n-1]]||8;}
function loadData(cb){
 if(window.__LHV_IMG){cb();return;}
 var sc=document.createElement("script");sc.src="./assets/handdata.js?v=1";sc.onload=cb;sc.onerror=cb;document.head.appendChild(sc);
}
function imgUrl(n){return (window.__LHV_IMG&&window.__LHV_IMG[n])||"";}

function addStyle(){
 if(document.getElementById("lhv-style"))return;
 var s=document.createElement("style");s.id="lhv-style";
 s.textContent=
 ".lhv-open{display:block;width:100%;margin:8px 0;padding:12px;border-radius:10px;border:2px solid #a8832e;background:#fff;color:#a8832e;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit}"+
 ".lum-dark .lhv-open{background:#241f14;color:#e9cf8b}"+
 "#lhv-root{position:fixed;inset:0;z-index:2147483000;background:#17130c;color:#fff;overflow:hidden;font-family:inherit;touch-action:none;-webkit-user-select:none;user-select:none}"+
 "#lhv-root video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}"+
 "#lhv-root.lhv-nocam{background:linear-gradient(180deg,#f6f1e4,#e9dfc6)}"+
 "#lhv-card{position:absolute;left:50%;top:38%;transform:translate(-50%,-50%);border:3px solid #e9cf8b;border-radius:10px;box-shadow:0 0 0 2000px rgba(0,0,0,.18);pointer-events:none;display:flex;align-items:center;justify-content:center;color:#e9cf8b;font-weight:700;font-size:13px;text-shadow:0 1px 3px #000}"+
 "#lhv-root.lhv-nocam #lhv-card{color:#7a5d17;text-shadow:none;box-shadow:none;border-color:#a8832e}"+
 "#lhv-soap{position:absolute;left:50%;top:40%;transform:translate(-50%,-50%);display:none;cursor:grab;filter:drop-shadow(0 6px 8px rgba(0,0,0,.45));touch-action:none;-webkit-user-drag:none}"+
 "#lhv-top{position:absolute;top:0;left:0;right:0;padding:calc(10px + env(safe-area-inset-top)) 12px 10px;display:flex;gap:8px;align-items:center;justify-content:space-between;background:linear-gradient(180deg,rgba(0,0,0,.7),rgba(0,0,0,0))}"+
 "#lhv-root.lhv-nocam #lhv-top{background:none;color:#4b3a10}"+
 "#lhv-top b{font-size:16px}"+
 ".lhv-sbtn{border:1px solid rgba(255,255,255,.6);background:rgba(0,0,0,.45);color:#fff;border-radius:999px;padding:8px 14px;font-size:14px;font-family:inherit;cursor:pointer}"+
 "#lhv-root.lhv-nocam .lhv-sbtn{background:#fff;color:#4b3a10;border-color:#a8832e}"+
 "#lhv-bot{position:absolute;left:0;right:0;bottom:0;padding:14px 16px calc(16px + env(safe-area-inset-bottom));background:linear-gradient(0deg,rgba(0,0,0,.85) 70%,rgba(0,0,0,0));text-align:center}"+
 "#lhv-root.lhv-nocam #lhv-bot{background:linear-gradient(0deg,#f6f1e4 70%,rgba(246,241,228,0));color:#4b3a10}"+
 "#lhv-msg{font-size:14px;line-height:1.7;margin:0 0 10px}"+
 "#lhv-rng{width:100%;direction:ltr;accent-color:#d4af37;margin:2px 0 8px}"+
 "#lhv-go{display:block;width:100%;border:0;border-radius:10px;padding:13px;font-size:16px;font-weight:700;color:#241f14;background:linear-gradient(180deg,#e9cf8b,#a8832e);font-family:inherit;cursor:pointer}"+
 "#lhv-note{font-size:12px;opacity:.85;margin:8px 0 0;line-height:1.6}";
 document.head.appendChild(s);
}

var st=null;
function close(){
 if(!st)return;
 if(window.visualViewport&&st.fit){window.visualViewport.removeEventListener("resize",st.fit);window.visualViewport.removeEventListener("scroll",st.fit);}
 try{if(st.stream)st.stream.getTracks().forEach(function(t){t.stop();});}catch(e){}
 if(st.root&&st.root.parentNode)st.root.parentNode.removeChild(st.root);
 document.documentElement.style.overflow=st.ov||"";
 st=null;
}
function startCam(face){
 var v=st.video;
 if(st.stream){try{st.stream.getTracks().forEach(function(t){t.stop();});}catch(e){}st.stream=null;}
 if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){return Promise.reject(new Error("nocam"));}
 return navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:face}},audio:false}).then(function(s){
  if(!st){s.getTracks().forEach(function(t){t.stop();});return;}
  st.stream=s;v.srcObject=s;v.setAttribute("playsinline","");v.muted=true;
  v.style.transform=face==="user"?"scaleX(-1)":"none";
  var p=v.play();if(p&&p.catch)p.catch(function(){});
 });
}
function open(n){
 close();addStyle();
 var l=lang(),t=T[l],w=widthCm(n);
 var root=el("div","");root.id="lhv-root";root.setAttribute("dir",l==="ar"?"rtl":"ltr");
 var video=el("video","");video.autoplay=true;video.muted=true;video.setAttribute("playsinline","");
 var card=el("div","",t.card);card.id="lhv-card";
 var soap=el("img","");soap.id="lhv-soap";soap.alt="";soap.draggable=false;soap.src=imgUrl(n);
 var top=el("div","");top.id="lhv-top";
 var ttl=el("b","",t.title);
 var flip=el("button","lhv-sbtn",t.flip);flip.type="button";
 var cls=el("button","lhv-sbtn","✕ "+t.close);cls.type="button";
 var right=el("div","");right.style.cssText="display:flex;gap:8px";right.appendChild(flip);right.appendChild(cls);
 top.appendChild(ttl);top.appendChild(right);
 var bot=el("div","");bot.id="lhv-bot";
 var msg=el("p","",t.s1);msg.id="lhv-msg";
 var rng=document.createElement("input");rng.type="range";rng.id="lhv-rng";rng.min="90";rng.max="700";rng.step="1";
 rng.setAttribute("aria-label",t.slider);
 var go=el("button","",t.next);go.id="lhv-go";go.type="button";
 var note=el("p","","");note.id="lhv-note";note.style.display="none";
 bot.appendChild(msg);bot.appendChild(rng);bot.appendChild(go);bot.appendChild(note);
 root.appendChild(video);root.appendChild(card);root.appendChild(soap);root.appendChild(top);root.appendChild(bot);
 document.body.appendChild(root);
 function fit(){
  var vv=window.visualViewport;
  if(vv&&vv.scale<=1.01){root.style.inset="auto";root.style.left="0px";root.style.top="0px";root.style.width=vv.width+"px";root.style.height=vv.height+"px";}
 }
 fit();
 st={root:root,video:video,stream:null,ov:document.documentElement.style.overflow,face:"environment",pxcm:0,step:1,n:n};
 st.fit=fit;if(window.visualViewport){window.visualViewport.addEventListener("resize",fit);window.visualViewport.addEventListener("scroll",fit);}
 document.documentElement.style.overflow="hidden";
 function layoutCard(){
  var pw=+rng.value;st.pxcm=pw/CARD_W;
  card.style.width=pw+"px";card.style.height=(st.pxcm*CARD_H)+"px";
 }
 function layoutSoap(){
  var px=st.pxcm*w;
  soap.style.width=px+"px";soap.style.height="auto";
 }
 var vv0=window.visualViewport;var vw=Math.min(vv0?vv0.width:window.innerWidth,window.innerHeight*0.9);
 rng.value=String(Math.round(Math.min(Math.max(vw*0.55,160),460)));
 layoutCard();
 rng.addEventListener("input",layoutCard);
 go.addEventListener("click",function(){
  if(st.step===1){
   st.step=2;layoutSoap();
   card.style.display="none";rng.style.display="none";soap.style.display="block";
   msg.textContent=t.s2;go.textContent=t.again;
   note.style.display="block";note.textContent=t.size+" "+dg(w,l)+" "+t.cm+". "+t.note.replace("{w}",dg(w,l));
  }else{
   st.step=1;card.style.display="flex";rng.style.display="block";soap.style.display="none";
   msg.textContent=t.s1;go.textContent=t.next;note.style.display="none";
  }
 });
 cls.addEventListener("click",close);
 flip.addEventListener("click",function(){
  st.face=st.face==="environment"?"user":"environment";
  startCam(st.face).catch(function(){});
 });
 /* drag soap with pointer events */
 var drag=null;
 soap.addEventListener("pointerdown",function(e){
  var r=soap.getBoundingClientRect();
  drag={dx:e.clientX-(r.left+r.width/2),dy:e.clientY-(r.top+r.height/2)};
  try{soap.setPointerCapture(e.pointerId);}catch(x){}
  e.preventDefault();
 });
 soap.addEventListener("pointermove",function(e){
  if(!drag)return;
  soap.style.left=(e.clientX-drag.dx)+"px";soap.style.top=(e.clientY-drag.dy)+"px";
  e.preventDefault();
 });
 var end=function(){drag=null;};
 soap.addEventListener("pointerup",end);soap.addEventListener("pointercancel",end);
 startCam("environment").catch(function(){
  if(!st)return;
  root.classList.add("lhv-nocam");flip.style.display="none";
  msg.textContent=t.nocam+"\n\n"+t.s1;msg.style.whiteSpace="pre-line";
 });
}

function ensure(){
 var m=location.hash.match(/#\/p\/(\d+)/);
 var b=document.getElementById("lhv-btn");
 var add=document.querySelector(".lum-add-cart[data-pn]");
 var n=m?+m[1]:0;
 if(!m||!add||!add.parentNode||n<1||n>28){if(b)b.remove();return;}
 addStyle();
 var anchor=document.getElementById("lx-share")||document.getElementById("lum-heart-pp")||document.querySelector(".lum-buy-now")||add;
 if(!b){b=el("button","lhv-open","");b.id="lhv-btn";b.type="button";anchor.parentNode.insertBefore(b,anchor.nextSibling);}
 else if(anchor.nextSibling!==b&&anchor!==b){anchor.parentNode.insertBefore(b,anchor.nextSibling);}
 b.setAttribute("data-n",String(n));b.textContent=T[lang()].btn;
 b.onclick=function(){var q=+b.getAttribute("data-n");loadData(function(){open(q);});};
}
var sched=false;
function onMut(){if(sched)return;sched=true;setTimeout(function(){sched=false;ensure();},120);}
function start(){
 ensure();
 new MutationObserver(onMut).observe(document.body,{childList:true,subtree:true});
 window.addEventListener("hashchange",function(){close();onMut();});
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start);else start();
})();
