/* Lumiera cart: collect products, send the order to WhatsApp / TikTok / Instagram. */
(function(){
"use strict";

var PRODUCTS=[
{n:1,ar:"قطعة مساج التوت الأحمر",en:"Red Berry Massage Bar",price:149},
{n:2,ar:"قطعة مساج الحرير الوردي",en:"Pink Silk Massage Bar",price:139},
{n:3,ar:"قطعة مساج الليل الذهبي",en:"Golden Night Massage Bar",price:159},
{n:4,ar:"قطعة مساج الزمرد",en:"Emerald Massage Bar",price:149},
{n:5,ar:"قطعة مساج السماء المرصعة",en:"Starry Sky Massage Bar",price:159},
{n:6,ar:"قطعة مساج اللؤلؤ الأبيض",en:"White Pearl Massage Bar",price:129},
{n:7,ar:"قطعة مساج الفضة",en:"Silver Massage Bar",price:149},
{n:8,ar:"قطعة مساج اللؤلؤ",en:"Pearl Massage Bar",price:139},
{n:9,ar:"قطعة مساج الورد الفاتح",en:"Soft Pink Massage Bar",price:139},
{n:10,ar:"قطعة مساج الذهب الأسود",en:"Black Gold Massage Bar",price:169},
{n:11,ar:"القرص الأخضر الملكي",en:"Royal Green Round",price:129},
{n:12,ar:"القرص الفضي",en:"Silver Round",price:139},
{n:13,ar:"قرص الزمرد",en:"Emerald Round",price:149},
{n:14,ar:"القرص الفيروزي",en:"Turquoise Round",price:149},
{n:15,ar:"قرص الماندالا الليلي",en:"Night Mandala Round",price:139},
{n:16,ar:"القرص الرمادي المنقوش",en:"Engraved Grey Round",price:129},
{n:17,ar:"القرص الأزرق الفاتح",en:"Light Blue Round",price:119},
{n:18,ar:"القرص الأزرق",en:"Blue Oval",price:129},
{n:19,ar:"بيضة الفراشة اللؤلؤية",en:"Pearl Butterfly Oval",price:119},
{n:20,ar:"وردة اللؤلؤ الأبيض",en:"White Pearl Rose",price:129},
{n:21,ar:"الفراشة الفضية",en:"Silver Butterfly",price:139},
{n:22,ar:"الفراشة الزرقاء",en:"Blue Butterfly",price:139},
{n:23,ar:"الوردة الزرقاء",en:"Blue Rose",price:149},
{n:24,ar:"القلبان الأزرقان",en:"Twin Blue Hearts",price:159},
{n:25,ar:"الوردة الذهبية",en:"Golden Rose",price:169},
{n:26,ar:"قرص النحلة الذهبي",en:"Golden Bee Oval",price:179},
{n:27,ar:"الوردة الوردية اللؤلؤية",en:"Pink Pearl Rose",price:139},
{n:28,ar:"المربع الأزرق",en:"Blue Square",price:129}
];

var WA_NUMBER="201031914373";
var IG_URL="https://www.instagram.com/lumierabeauty5/";
var TT_URL="https://www.tiktok.com/@lumiera_beauty1";
var STORE_KEY="lum-cart";
var AR_DIGITS="٠١٢٣٤٥٦٧٨٩";

function priceOf(p){return Math.round(p.price*0.9);} /* White Friday 10% price shown on the site */
function prod(n){for(var i=0;i<PRODUCTS.length;i++)if(PRODUCTS[i].n===n)return PRODUCTS[i];return null;}
function lang(){try{return localStorage.getItem("lum-lang")==="en"?"en":"ar";}catch(e){return "ar";}}
function digits(x,ln){var s=String(x);if(ln==="ar")s=s.replace(/[0-9]/g,function(d){return AR_DIGITS[+d];});return s;}
function money(x,ln){return ln==="ar"?digits(x,ln)+" جنيه":"EGP "+x;}

var T={
 ar:{
  fab:"سلة الطلبات",
  add:"أضف للسلة 🧺",
  added:"اتضافت ✅",
  title:"سلة الطلبات 🧺",
  empty:"السلة فاضية لسه.\nضيف صابون من المنتجات وهتلاقيه هنا.",
  total:"الإجمالي",
  ship:"الشحن من ٣ أيام لأسبوع — الأسعار شاملة خصم الوايت فرايداي 10%",
  wa:"إتمام الطلب على واتساب",
  ig:"ابعت الطلب على انستجرام",
  tt:"ابعت الطلب على تيك توك",
  copied:"تم نسخ الطلب ✅ ابعته في الرسايل",
  msgHead:"طلب جديد من موقع لوميرا 🧼",
  msgTotal:"الإجمالي"
 },
 en:{
  fab:"Cart",
  add:"Add to cart 🧺",
  added:"Added ✅",
  title:"Your cart 🧺",
  empty:"Your cart is empty.\nAdd a soap from the products and it will show up here.",
  total:"Total",
  ship:"Shipping in 3 days to a week — prices include the 10% White Friday discount",
  wa:"Checkout on WhatsApp",
  ig:"Send the order on Instagram",
  tt:"Send the order on TikTok",
  copied:"Order copied ✅ paste it in the DMs",
  msgHead:"New order from the LUMIERA website 🧼",
  msgTotal:"Total"
 }
};

function load(){try{var c=JSON.parse(localStorage.getItem(STORE_KEY)||"{}");var o={};for(var k in c){var n=+k,q=+c[k];if(prod(n)&&q>0)o[n]=Math.min(99,Math.floor(q));}return o;}catch(e){return{};}}
function save(c){try{localStorage.setItem(STORE_KEY,JSON.stringify(c));}catch(e){}}
var cart=load();

function count(){var s=0;for(var k in cart)s+=cart[k];return s;}
function total(){var s=0;for(var k in cart)s+=priceOf(prod(+k))*cart[k];return s;}

function orderText(){
 var ln=lang(),t=T[ln],lines=[t.msgHead],i=1;
 for(var k in cart){
  var p=prod(+k);
  lines.push(digits(i++,ln)+") "+(ln==="ar"?p.ar:p.en)+" ×"+digits(cart[k],ln)+" — "+money(priceOf(p)*cart[k],ln));
 }
 lines.push(t.msgTotal+": "+money(total(),ln));
 return lines.join("\n");
}

/* ---------- UI ---------- */
var root,fab,badge,overlay,drawer,toast,toastTimer;
var drawerOpen=false;

function build(){
 if(document.getElementById("lum-cart-root"))return;
 root=document.createElement("div");root.id="lum-cart-root";
 root.className="lum-cart-root";
 fab=document.createElement("button");fab.className="lum-cart-fab";fab.setAttribute("aria-label","cart");
 fab.innerHTML='🧺<span class="lum-cart-badge hide"></span>';
 badge=fab.querySelector(".lum-cart-badge");
 fab.onclick=function(){openDrawer();};
 overlay=document.createElement("div");overlay.className="lum-cart-overlay";
 overlay.onclick=function(){closeDrawer();};
 drawer=document.createElement("div");drawer.className="lum-cart-drawer";
 toast=document.createElement("div");toast.className="lum-cart-toast";
 root.appendChild(fab);root.appendChild(overlay);root.appendChild(drawer);root.appendChild(toast);
 document.body.appendChild(root);
 syncBadge();syncTheme();
}

function syncBadge(){var c=count();badge.textContent=c>99?"99+":String(c);badge.classList.toggle("hide",c===0);}
function syncTheme(){if(!root)return;root.classList.toggle("cart-dark",!!document.querySelector(".lum-dark"));}
function dir(){return lang()==="ar"?"rtl":"ltr";}

function showToast(msg){
 toast.textContent=msg;toast.classList.add("show");
 clearTimeout(toastTimer);toastTimer=setTimeout(function(){toast.classList.remove("show");},2600);
}

function bump(){fab.style.transform="scale(1.12)";setTimeout(function(){fab.style.transform="";},160);}

function addToCart(n){
 cart[n]=(cart[n]||0)+1;save(cart);syncBadge();bump();
 if(drawerOpen)renderDrawer();
}

function setQty(n,q){
 if(q<=0)delete cart[n];else cart[n]=Math.min(99,q);
 save(cart);syncBadge();renderDrawer();
}

function openDrawer(){drawerOpen=true;renderDrawer();overlay.classList.add("open");drawer.classList.add("open");}
function closeDrawer(){drawerOpen=false;overlay.classList.remove("open");drawer.classList.remove("open");}

function renderDrawer(){
 var ln=lang(),t=T[ln];
 drawer.setAttribute("dir",dir());
 var h='<div class="lum-cart-head"><span class="lum-cart-title">'+t.title+'</span><button class="lum-cart-close" aria-label="close">×</button></div>';
 h+='<div class="lum-cart-items">';
 if(count()===0){
  h+='<div class="lum-cart-empty">'+t.empty.replace(/\n/g,"<br>")+"</div>";
 }else{
  for(var k in cart){
   var p=prod(+k);
   h+='<div class="lum-cart-item" data-n="'+p.n+'">'
    +'<img src="./assets/ai-'+String(p.n).padStart(2,"0")+'-1.jpg" alt="">'
    +'<div class="lum-ci-info"><div class="lum-ci-name">'+(ln==="ar"?p.ar:p.en)+'</div>'
    +'<div class="lum-ci-price">'+money(priceOf(p),ln)+'</div></div>'
    +'<div class="lum-ci-qty"><button data-act="dec">−</button><span>'+digits(cart[k],ln)+'</span><button data-act="inc">+</button></div>'
    +'<button class="lum-ci-del" data-act="del">×</button>'
    +'</div>';
  }
 }
 h+='</div>';
 if(count()>0){
  h+='<div class="lum-cart-foot">'
   +'<div class="lum-cart-total"><span>'+t.total+'</span><span>'+money(total(),ln)+'</span></div>'
   +'<div class="lum-cart-ship">'+t.ship+'</div>'
   +'<div class="lum-cart-send">'
   +'<button class="lum-send-wa" data-send="wa">'+t.wa+'</button>'
   +'<button class="lum-send-ig" data-send="ig">'+t.ig+'</button>'
   +'<button class="lum-send-tt" data-send="tt">'+t.tt+'</button>'
   +'</div></div>';
 }
 drawer.innerHTML=h;
 drawer.querySelector(".lum-cart-close").onclick=function(){closeDrawer();};
 drawer.querySelectorAll(".lum-cart-item button").forEach(function(b){
  var n=+b.closest(".lum-cart-item").getAttribute("data-n");
  var act=b.getAttribute("data-act");
  b.onclick=function(){
   if(act==="inc")setQty(n,cart[n]+1);
   else if(act==="dec")setQty(n,cart[n]-1);
   else setQty(n,0);
  };
 });
 drawer.querySelectorAll("[data-send]").forEach(function(b){
  b.onclick=function(){sendOrder(b.getAttribute("data-send"));};
 });
}

function copyText(txt,cb){
 function fallback(){
  var ta=document.createElement("textarea");ta.value=txt;ta.style.position="fixed";ta.style.opacity="0";
  document.body.appendChild(ta);ta.select();
  try{document.execCommand("copy");}catch(e){}
  document.body.removeChild(ta);cb();
 }
 if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(txt).then(cb,fallback);}
 else fallback();
}

function sendOrder(kind){
 var txt=orderText();
 if(kind==="wa"){
  window.open("https://api.whatsapp.com/send?phone="+WA_NUMBER+"&text="+encodeURIComponent(txt),"_blank");
 }else{
  var url=kind==="ig"?IG_URL:TT_URL;
  copyText(txt,function(){
   showToast(T[lang()].copied);
   window.open(url,"_blank");
  });
 }
}

/* ---------- add-to-cart buttons inside the SPA ---------- */
function ensureProductButton(){
 var m=location.hash.match(/^#\/p\/(\d+)/);
 if(!m)return;
 var n=+m[1];if(!prod(n))return;
 var order=document.querySelector(".lum-order");
 if(!order)return;
 var b=order.parentNode.querySelector(":scope > .lum-add-cart");
 if(!b){
  b=document.createElement("button");
  b.className="lum-add-cart";
  order.parentNode.insertBefore(b,order);
 }
 /* the SPA keeps the order box (and our button) across product pages,
    so rebind the handler whenever the visible product changes */
 if(b.getAttribute("data-pn")===String(n))return;
 b.setAttribute("data-pn",String(n));
 b.textContent=T[lang()].add;b.classList.remove("added");
 b.onclick=function(){
  addToCart(n);
  b.textContent=T[lang()].added;b.classList.add("added");
  setTimeout(function(){b.textContent=T[lang()].add;b.classList.remove("added");},1400);
 };
}

/* quiz page: add button on the result card */
function ensureQuizButton(){
 var res=document.querySelector(".result .result-actions");
 if(!res)return;
 var img=document.querySelector(".result .result-photo");
 if(!img)return;
 var m=(img.getAttribute("src")||"").match(/ai-(\d+)-1\.jpg/);
 if(!m)return;
 var n=+m[1];if(!prod(n))return;
 var b=res.querySelector(".lum-add-cart");
 if(!b){
  b=document.createElement("button");
  b.className="lum-add-cart quiz-add-cart";
  res.appendChild(b);
 }
 /* same stale-binding fix as the product page button */
 if(b.getAttribute("data-pn")===String(n))return;
 b.setAttribute("data-pn",String(n));
 b.textContent=T[lang()].add;b.classList.remove("added");
 b.onclick=function(){
  addToCart(n);
  b.textContent=T[lang()].added;b.classList.add("added");
  setTimeout(function(){b.textContent=T[lang()].add;b.classList.remove("added");},1400);
 };
}

var scheduled=false;
function onMut(){
 if(scheduled)return;scheduled=true;
 setTimeout(function(){
  scheduled=false;
  syncTheme();
  ensureProductButton();
  ensureQuizButton();
 },60);
}

function start(){
 build();
 new MutationObserver(onMut).observe(document.body,{childList:true,subtree:true});
 window.addEventListener("hashchange",onMut);
 onMut();
 if(/[?&]cart-open/.test(location.search))setTimeout(function(){drawer.style.transition="none";overlay.style.transition="none";openDrawer();},300);
}

if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start);else start();
})();
