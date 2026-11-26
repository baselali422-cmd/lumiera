/* Lumiera shop helpers: search + filters + wishlist (home page only). */
(function(){
"use strict";
var P=[
[1,"massage",149,"قطعة مساج التوت الأحمر","Red Berry Massage Bar"],
[2,"massage",139,"قطعة مساج الحرير الوردي","Pink Silk Massage Bar"],
[3,"massage",159,"قطعة مساج الليل الذهبي","Golden Night Massage Bar"],
[4,"massage",149,"قطعة مساج الزمرد","Emerald Massage Bar"],
[5,"massage",159,"قطعة مساج السماء المرصعة","Starry Sky Massage Bar"],
[6,"massage",129,"قطعة مساج اللؤلؤ الأبيض","White Pearl Massage Bar"],
[7,"massage",149,"قطعة مساج الفضة","Silver Massage Bar"],
[8,"massage",139,"قطعة مساج اللؤلؤ","Pearl Massage Bar"],
[9,"massage",139,"قطعة مساج الورد الفاتح","Soft Pink Massage Bar"],
[10,"massage",169,"قطعة مساج الذهب الأسود","Black Gold Massage Bar"],
[11,"round",129,"القرص الأخضر الملكي","Royal Green Round"],
[12,"round",139,"القرص الفضي","Silver Round"],
[13,"round",149,"قرص الزمرد","Emerald Round"],
[14,"round",149,"القرص الفيروزي","Turquoise Round"],
[15,"round",139,"قرص الماندالا الليلي","Night Mandala Round"],
[16,"round",129,"القرص الرمادي المنقوش","Engraved Grey Round"],
[17,"round",119,"القرص الأزرق الفاتح","Light Blue Round"],
[18,"oval",129,"القرص الأزرق","Blue Oval"],
[19,"oval butterfly",119,"بيضة الفراشة اللؤلؤية","Pearl Butterfly Oval"],
[20,"rose",129,"وردة اللؤلؤ الأبيض","White Pearl Rose"],
[21,"butterfly",139,"الفراشة الفضية","Silver Butterfly"],
[22,"butterfly",139,"الفراشة الزرقاء","Blue Butterfly"],
[23,"rose",149,"الوردة الزرقاء","Blue Rose"],
[24,"heart",159,"القلبان الأزرقان","Twin Blue Hearts"],
[25,"rose",169,"الوردة الذهبية","Golden Rose"],
[26,"oval",179,"قرص النحلة الذهبي","Golden Bee Oval"],
[27,"rose",139,"الوردة الوردية اللؤلؤية","Pink Pearl Rose"],
[28,"square",129,"المربع الأزرق","Blue Square"]
];
var SHAPES=["all","massage","round","oval","rose","butterfly","heart","square"];
var AR_DIGITS="٠١٢٣٤٥٦٧٨٩";
var WKEY="lum-wish";
var T={
 ar:{
  ph:"ابحث عن صابونة…",all:"الكل",massage:"مساج",round:"دائري",oval:"بيضاوي",rose:"وردة",butterfly:"فراشة",heart:"قلب",square:"مربع",
  fav:"المفضلة",anyPrice:"كل الأسعار",
  showing:"عرض {a} من {b}",none:"مفيش صابونة بالمواصفات دي. جرّب تغيّر الفلتر.",reset:"مسح الفلتر",
  favEmpty:"لسه مفيش مفضلة. اضغط ♡ على أي صابونة تعجبك وهتلاقيها هنا.",
  addAll:"أضف المفضلة كلها للسلة ({n})",clearFav:"مسح المفضلة",
  toast:"اتضافت {n} صابونة للسلة ✅",
  addFav:"أضف للمفضلة",inFav:"في المفضلة",sr:"المفضلة"
 },
 en:{
  ph:"Search for a soap…",all:"All",massage:"Massage",round:"Round",oval:"Oval",rose:"Rose",butterfly:"Butterfly",heart:"Heart",square:"Square",
  fav:"Favorites",anyPrice:"Any price",
  showing:"Showing {a} of {b}",none:"No soap matches these filters. Try changing them.",reset:"Clear filters",
  favEmpty:"No favorites yet. Tap ♡ on any soap you like and it will show up here.",
  addAll:"Add all favorites to cart ({n})",clearFav:"Clear favorites",
  toast:"{n} soaps added to your cart ✅",
  addFav:"Add to favorites",inFav:"In favorites",sr:"Favorites"
 }
};
var state={q:"",shape:"all",price:"any",fav:false};
var lastSig="";

function lang(){try{return localStorage.getItem("lum-lang")==="en"?"en":"ar";}catch(e){return "ar";}}
function dg(x,ln){var s=String(x);if(ln==="ar")s=s.replace(/[0-9]/g,function(d){return AR_DIGITS[+d];});return s;}
function shown(p){return Math.round(p[2]*0.9);}
function fill(s,o,ln){return s.replace(/\{(\w+)\}/g,function(m,k){return dg(o[k],ln);});}
var CANON={"زرقاء":"ازرق","زرقا":"ازرق","ازرق":"ازرق","فضي":"فضه","فضيه":"فضه","فضه":"فضه","ذهبي":"ذهب","ذهبيه":"ذهب","ذهب":"ذهب","خضراء":"اخضر","خضرا":"اخضر","اخضر":"اخضر","رمادي":"رمادي","رماديه":"رمادي","بيضاء":"ابيض","بيضا":"ابيض","ابيض":"ابيض","حمراء":"احمر","حمرا":"احمر","احمر":"احمر"};
function norm(s){var t=String(s||"").toLowerCase().replace(/[\u064B-\u0652\u0640]/g,"").replace(/[أإآ]/g,"ا").replace(/ة/g,"ه").replace(/ى/g,"ي").replace(/\s+/g," ").trim();return t.split(" ").map(function(w){var b=w.length>3&&w.indexOf("ال")===0?w.slice(2):w;return CANON[b]||w;}).join(" ");}
function loadW(){try{var a=JSON.parse(localStorage.getItem(WKEY)||"[]");var o=[];if(Array.isArray(a))a.forEach(function(n){n=+n;if(n>=1&&n<=P.length&&o.indexOf(n)<0)o.push(n);});return o;}catch(e){return [];}}
function saveW(a){try{localStorage.setItem(WKEY,JSON.stringify(a));}catch(e){}}
var wish=loadW();
function isW(n){return wish.indexOf(n)>=0;}
function toggleW(n){var i=wish.indexOf(n);if(i>=0)wish.splice(i,1);else wish.push(n);saveW(wish);}

function priceRanges(ln){
 return [
  {k:"any",l:T[ln].anyPrice},
  {k:"p1",l:ln==="ar"?"لحد "+dg(120,ln)+" جنيه":"Up to EGP 120",test:function(v){return v<=120;}},
  {k:"p2",l:ln==="ar"?dg(121,ln)+" – "+dg(140,ln)+" جنيه":"EGP 121 – 140",test:function(v){return v>120&&v<=140;}},
  {k:"p3",l:ln==="ar"?"أكتر من "+dg(140,ln)+" جنيه":"Over EGP 140",test:function(v){return v>140;}}
 ];
}
function matches(p,ln){
 if(state.fav&&!isW(p[0]))return false;
 if(state.shape&&state.shape!=="all"&&state.shape!=="none"&&p[1].split(" ").indexOf(state.shape)<0)return false;
 if(state.price&&state.price!=="any"){var r=priceRanges(ln).filter(function(x){return x.k===state.price;})[0];if(r&&!r.test(shown(p)))return false;}
 var q=norm(state.q);
 if(q){
  var hay=norm(p[3]+" "+p[4]+" "+T.ar[p[1].split(" ")[0]]+" "+p[1]);
  var words=q.split(" ");
  for(var i=0;i<words.length;i++){var w=words[i];if(hay.indexOf(w)<0&&!(w.length>3&&w.charAt(0)==="ا"&&hay.indexOf(w.slice(1))>=0))return false;}
 }
 return true;
}

var css=".lum-f{position:sticky;top:0;z-index:50;background:#f6f7f1;border:1px solid #c9a64c;border-radius:14px;padding:10px 10px 8px;margin:12px 0 14px;box-shadow:0 3px 10px rgba(0,0,0,.08)}"
+".lum-dark .lum-f{background:#241e15;border-color:#3a3226}"
+".lum-f-search{width:100%;border:1px solid #c9a64c;border-radius:10px;padding:10px 12px;font-size:15px;font-family:inherit;background:#fff;color:#2c2620;outline:none}"
+".lum-dark .lum-f-search{background:#14110c;color:#f2ece1}"
+".lum-f-row{display:flex;gap:6px;overflow-x:auto;padding:8px 2px 2px;scrollbar-width:none}"
+".lum-f-row::-webkit-scrollbar{display:none}"
+".lum-f-chip{flex:0 0 auto;border:1px solid #c9a64c;background:#fff;color:#a8832e;border-radius:999px;padding:6px 13px;font-size:13px;cursor:pointer;font-family:inherit;white-space:nowrap}"
+".lum-f-chip.on{background:#a8832e;color:#fff}"
+".lum-dark .lum-f-chip{background:#2a2317;color:#d9b96a}"
+".lum-dark .lum-f-chip.on{background:#a8832e;color:#fff}"
+".lum-f-info{display:flex;justify-content:space-between;align-items:center;gap:8px;font-size:12.5px;color:#585254;padding:6px 4px 0}"
+".lum-dark .lum-f-info{color:#c9b68a}"
+".lum-f-link{background:none;border:none;color:#a8832e;font-family:inherit;font-size:12.5px;text-decoration:underline;cursor:pointer;padding:0}"
+".lum-f-msg{text-align:center;color:#585254;font-size:14px;line-height:1.8;padding:18px 10px;border:1px dashed #c9a64c;border-radius:12px;margin:0 0 14px}"
+".lum-dark .lum-f-msg{color:#c9b68a}"
+".lum-f-favbar{display:flex;gap:8px;align-items:center;padding:8px 2px 2px}"
+".lum-f-addall{flex:1;background:#a8832e;color:#fff;border:none;border-radius:10px;padding:10px 12px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit}"
+".lum-card{position:relative}"
+".lum-heart{position:absolute;top:8px;inset-inline-start:8px;width:34px;height:34px;border-radius:50%;border:none;background:rgba(255,255,255,.92);color:#a8832e;font-size:20px;line-height:34px;padding:0;cursor:pointer;box-shadow:0 1px 5px rgba(0,0,0,.25);z-index:2;font-family:inherit}"
+".lum-heart.on{color:#c0392b}"
+".lum-heart-pp{display:block;width:100%;margin:0 0 14px;background:#fff;color:#a8832e;border:1px solid #c9a64c;border-radius:10px;padding:10px 18px;font-size:15px;font-weight:700;cursor:pointer;font-family:inherit}"
+".lum-heart-pp.on{color:#c0392b;border-color:#c0392b}"
+".lum-dark .lum-heart-pp{background:#2a2317}"
+".lum-hide{display:none!important}";
function addStyle(){if(document.getElementById("lum-f-style"))return;var s=document.createElement("style");s.id="lum-f-style";s.textContent=css;document.head.appendChild(s);}

function el(tag,cls,txt){var e=document.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e;}

function buildBar(){
 var ln=lang(),t=T[ln];
 var bar=el("div","lum-f");bar.id="lum-f";bar.setAttribute("data-lang",ln);bar.dir=ln==="ar"?"rtl":"ltr";
 var inp=el("input","lum-f-search");inp.type="search";inp.placeholder=t.ph;inp.value=state.q;inp.setAttribute("aria-label",t.ph);
 inp.oninput=function(){state.q=inp.value;apply();};
 bar.appendChild(inp);
 var r1=el("div","lum-f-row");r1.id="lum-f-r1";
 SHAPES.forEach(function(s){
  var b=el("button","lum-f-chip",t[s]);b.type="button";b.setAttribute("data-shape",s);
  b.onclick=function(){state.shape=state.shape===s?"none":s;apply();};r1.appendChild(b);
 });
 var fb=el("button","lum-f-chip","");fb.type="button";fb.id="lum-f-fav";
 fb.onclick=function(){state.fav=!state.fav;apply();};
 r1.appendChild(fb);
 bar.appendChild(r1);
 var r2=el("div","lum-f-row");r2.id="lum-f-r2";
 priceRanges(ln).forEach(function(r){
  var b=el("button","lum-f-chip",r.l);b.type="button";b.setAttribute("data-price",r.k);
  b.onclick=function(){state.price=state.price===r.k?"none":r.k;apply();};r2.appendChild(b);
 });
 bar.appendChild(r2);
 var fav=el("div","lum-f-favbar");fav.id="lum-f-favbar";bar.appendChild(fav);
 var info=el("div","lum-f-info");info.id="lum-f-info";bar.appendChild(info);
 return bar;
}

function apply(){
 var bar=document.getElementById("lum-f");if(!bar)return;
 var ln=lang(),t=T[ln];
 var cards=document.querySelectorAll(".lum-cardlink");
 var vis=0,total=0,favIn=0;
 cards.forEach(function(a){
  var m=(a.getAttribute("href")||"").match(/#\/p\/(\d+)/);if(!m)return;
  var p=P[+m[1]-1];if(!p)return;
  total++;
  var ok=matches(p,ln);
  a.classList.toggle("lum-hide",!ok);
  if(ok){var im=a.querySelector("img");if(im&&im.loading!=="eager")im.loading="eager";}
  if(ok)vis++;
 });
 document.querySelectorAll("section.file-group").forEach(function(sec){
  if(!sec.querySelector(".lum-cardlink"))return;
  sec.classList.toggle("lum-hide",!sec.querySelector(".lum-cardlink:not(.lum-hide)"));
 });
 bar.querySelectorAll("[data-shape]").forEach(function(b){b.classList.toggle("on",b.getAttribute("data-shape")===state.shape);});
 bar.querySelectorAll("[data-price]").forEach(function(b){b.classList.toggle("on",b.getAttribute("data-price")===state.price);});
 var fb=document.getElementById("lum-f-fav");
 fb.textContent="♥ "+t.fav+(wish.length?" ("+dg(wish.length,ln)+")":"");
 fb.classList.toggle("on",state.fav);
 var fbar=document.getElementById("lum-f-favbar");fbar.innerHTML="";
 if(state.fav&&wish.length){
  var a=el("button","lum-f-addall",fill(t.addAll,{n:wish.length},ln));a.type="button";
  a.onclick=function(){
   if(window.lumCart&&window.lumCart.addMany)window.lumCart.addMany(wish.slice(),fill(t.toast,{n:wish.length},ln));
  };
  var c=el("button","lum-f-link",t.clearFav);c.type="button";
  c.onclick=function(){wish=[];saveW(wish);apply();};
  fbar.appendChild(a);fbar.appendChild(c);
 }
 var info=document.getElementById("lum-f-info");info.innerHTML="";
 var filtered=state.q||(state.shape&&state.shape!=="all")||(state.price&&state.price!=="any")||state.fav;
 info.appendChild(el("span","",fill(t.showing,{a:vis,b:total},ln)));
 if(filtered){var rs=el("button","lum-f-link",t.reset);rs.type="button";rs.onclick=function(){state.q="";state.shape="all";state.price="any";state.fav=false;var i=document.querySelector(".lum-f-search");if(i)i.value="";apply();};info.appendChild(rs);}
 var old=document.getElementById("lum-f-msg");if(old)old.remove();
 if(total&&!vis){
  var msg=el("div","lum-f-msg",(state.fav&&!wish.length)?t.favEmpty:t.none);msg.id="lum-f-msg";
  bar.parentNode.insertBefore(msg,bar.nextSibling);
 }
 document.querySelectorAll(".lum-heart").forEach(function(h){var on=isW(+h.getAttribute("data-n"));h.classList.toggle("on",on);h.textContent=on?"♥":"♡";});
 syncProduct();
}

function ensure(){
 addStyle();
 var grid=document.querySelector(".lum-grid");
 var bar=document.getElementById("lum-f");
 if(!grid){if(bar)bar.remove();var m=document.getElementById("lum-f-msg");if(m)m.remove();syncProduct();return;}
 var ln=lang();
 if(bar&&bar.getAttribute("data-lang")!==ln){bar.remove();bar=null;}
 var first=document.querySelector("section.file-group");
 if(!bar&&first&&first.parentNode){bar=buildBar();first.parentNode.insertBefore(bar,first);apply();}
 var added=false;
 document.querySelectorAll(".lum-cardlink").forEach(function(a){
  var card=a.querySelector(".lum-card");if(!card)return;
  var m=(a.getAttribute("href")||"").match(/#\/p\/(\d+)/);if(!m)return;
  if(!card.querySelector(".lum-heart")){
   var h=el("button","lum-heart",isW(+m[1])?"♥":"♡");h.type="button";h.setAttribute("data-n",m[1]);h.setAttribute("aria-label",T[ln].addFav);
   if(isW(+m[1]))h.classList.add("on");
   card.appendChild(h);added=true;
  }
 });
 var sig=document.querySelectorAll(".lum-cardlink").length+":"+ln;
 if(sig!==lastSig){lastSig=sig;if(bar)apply();}
}

function syncProduct(){
 var m=location.hash.match(/^#\/p\/(\d+)/);
 var btn=document.getElementById("lum-heart-pp");
 var add=document.querySelector(".lum-add-cart[data-pn]");
 if(!m||!add||!add.parentNode){if(btn)btn.remove();return;}
 var n=+m[1];if(!P[n-1]){return;}
 var ln=lang(),t=T[ln];
 if(!btn){btn=el("button","lum-heart-pp","");btn.id="lum-heart-pp";btn.type="button";
  var anchor=document.querySelector(".lum-buy-now")||add;
  anchor.parentNode.insertBefore(btn,anchor.nextSibling);}
 btn.setAttribute("data-n",String(n));
 var on=isW(n);
 btn.classList.toggle("on",on);
 btn.textContent=(on?"♥ ":"♡ ")+(on?t.inFav:t.addFav);
}

document.addEventListener("click",function(e){
 var h=e.target&&e.target.closest?e.target.closest(".lum-heart,.lum-heart-pp"):null;
 if(!h)return;
 e.preventDefault();e.stopPropagation();
 toggleW(+h.getAttribute("data-n"));
 apply();
 if(!document.getElementById("lum-f"))syncProduct();
},true);

var sched=false;
function onMut(){if(sched)return;sched=true;setTimeout(function(){sched=false;ensure();syncProduct();},80);}
function start(){
 ensure();
 new MutationObserver(onMut).observe(document.body,{childList:true,subtree:true});
 window.addEventListener("hashchange",onMut);
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start);else start();
})();
