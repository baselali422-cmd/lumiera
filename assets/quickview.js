/* Lumiera: quick view popup + related soaps (AR/EN) */
(function(){
"use strict";
var P=[[1, "قطعة مساج التوت الأحمر", "Red Berry Massage Bar", 149], [2, "قطعة مساج الحرير الوردي", "Pink Silk Massage Bar", 139], [3, "قطعة مساج الليل الذهبي", "Golden Night Massage Bar", 159], [4, "قطعة مساج الزمرد", "Emerald Massage Bar", 149], [5, "قطعة مساج السماء المرصعة", "Starry Sky Massage Bar", 159], [6, "قطعة مساج اللؤلؤ الأبيض", "White Pearl Massage Bar", 129], [7, "قطعة مساج الفضة", "Silver Massage Bar", 149], [8, "قطعة مساج اللؤلؤ", "Pearl Massage Bar", 139], [9, "قطعة مساج الورد الفاتح", "Soft Pink Massage Bar", 139], [10, "قطعة مساج الذهب الأسود", "Black Gold Massage Bar", 169], [11, "القرص الأخضر الملكي", "Royal Green Round", 129], [12, "القرص الفضي", "Silver Round", 139], [13, "قرص الزمرد", "Emerald Round", 149], [14, "القرص الفيروزي", "Turquoise Round", 149], [15, "قرص الماندالا الليلي", "Night Mandala Round", 139], [16, "القرص الرمادي المنقوش", "Engraved Grey Round", 129], [17, "القرص الأزرق الفاتح", "Light Blue Round", 119], [18, "القرص الأزرق", "Blue Oval", 129], [19, "بيضة الفراشة اللؤلؤية", "Pearl Butterfly Oval", 119], [20, "وردة اللؤلؤ الأبيض", "White Pearl Rose", 129], [21, "الفراشة الفضية", "Silver Butterfly", 139], [22, "الفراشة الزرقاء", "Blue Butterfly", 139], [23, "الوردة الزرقاء", "Blue Rose", 149], [24, "القلبان الأزرقان", "Twin Blue Hearts", 159], [25, "الوردة الذهبية", "Golden Rose", 169], [26, "قرص النحلة الذهبي", "Golden Bee Oval", 179], [27, "الوردة الوردية اللؤلؤية", "Pink Pearl Rose", 139], [28, "المربع الأزرق", "Blue Square", 129]];
function lang(){try{return localStorage.getItem("lum-lang")==="en"?"en":"ar";}catch(e){return "ar";}}
var AD="\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669";
function dg(x,l){var s=String(x);return l==="ar"?s.replace(/[0-9]/g,function(d){return AD[+d];}):s;}
function shown(p){return Math.round(p[3]*0.9);}
function money(x,l){return l==="ar"?dg(x,l)+" \u062c\u0646\u064a\u0647":"EGP "+x;}
function prod(n){for(var i=0;i<P.length;i++)if(P[i][0]===n)return P[i];return null;}
function grp(n){return n<=10?0:(n<=18?1:2);}
function img(n,k){return "./assets/ai-"+String(n).padStart(2,"0")+"-"+k+".jpg";}
var T={ar:{qv:"\u0646\u0638\u0631\u0629 \u0633\u0631\u064a\u0639\u0629",add:"\u0623\u0636\u0641 \u0644\u0644\u0633\u0644\u0629 \u{1F9FA}",full:"\u0643\u0644 \u0627\u0644\u062a\u0641\u0627\u0635\u064a\u0644",close:"\u0625\u063a\u0644\u0627\u0642",rel:"\u0647\u062a\u0639\u062c\u0628\u0643 \u0643\u0645\u0627\u0646",toast:"\u0627\u062a\u0636\u0627\u0641\u062a \u0644\u0644\u0633\u0644\u0629 \u2705"},
 en:{qv:"Quick view",add:"Add to cart \u{1F9FA}",full:"Full details",close:"Close",rel:"You may also like",toast:"Added to cart \u2705"}};
function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;}
function css(){
 if(document.getElementById("lqv-css"))return;
 var s=document.createElement("style");s.id="lqv-css";
 s.textContent=".lqv-btn{position:absolute;top:8px;inset-inline-end:8px;z-index:3;background:rgba(255,255,255,.92);color:#a8832e;border:1px solid #c9a64c;border-radius:999px;padding:5px 11px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit}"
 +".lum-cardlink .lum-card{position:relative}"
 +".lqv-ov{position:fixed;inset:0;background:rgba(20,16,8,.6);z-index:100000;display:flex;align-items:center;justify-content:center;padding:14px}"
 +".lqv-box{background:#fff;color:#241f1c;border-radius:18px;max-width:420px;width:100%;max-height:92vh;overflow:auto;padding:14px;position:relative;border:1px solid #c9a64c}"
 +".lum-dark .lqv-box,.lqv-dark .lqv-box{background:#241f14;color:#f3e9d0}"
 +".lqv-x{position:absolute;top:8px;inset-inline-end:10px;z-index:2;background:rgba(255,255,255,.9);border:1px solid #c9a64c;color:#a8832e;border-radius:999px;width:32px;height:32px;font-size:20px;cursor:pointer;line-height:1}"
 +".lqv-main{width:100%;aspect-ratio:4/5;object-fit:cover;border-radius:12px;display:block;background:#eee}"
 +".lqv-th{display:flex;gap:6px;margin:8px 0}.lqv-th img{flex:1 1 0;min-width:0;box-sizing:border-box;aspect-ratio:1;object-fit:cover;border-radius:8px;cursor:pointer;border:2px solid transparent}.lqv-th img.on{border-color:#a8832e}"
 +".lqv-name{font-size:18px;font-weight:700;margin:6px 0}"
 +".lqv-pr{font-size:16px;color:#a8832e;font-weight:700;margin-bottom:10px}.lqv-pr s{color:#999;font-weight:400;margin-inline-end:8px;font-size:13px}"
 +".lqv-act{display:flex;gap:8px;flex-wrap:wrap}.lqv-act button,.lqv-act a{flex:1;min-width:120px;text-align:center;border-radius:10px;padding:11px 8px;font-size:14px;font-weight:700;cursor:pointer;text-decoration:none;font-family:inherit}"
 +".lqv-add{background:#a8832e;color:#fff;border:0}.lqv-full{background:transparent;color:#a8832e;border:1.5px solid #a8832e}"
 +".lqr{margin:22px 0 8px}.lqr-t{font-size:17px;font-weight:700;color:#a8832e;margin-bottom:10px;text-align:center}"
 +".lqr-g{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}"
 +".lqr-c{cursor:pointer;border:1px solid #e6d9b3;border-radius:12px;overflow:hidden;background:#fff;text-align:center;padding:0 0 8px}"
 +".lum-dark .lqr-c{background:#241f14;border-color:#4a3f22}"
 +".lqr-c img{width:100%;aspect-ratio:4/5;object-fit:cover;display:block}"
 +".lqr-n{font-size:12px;font-weight:600;margin:6px 6px 2px;line-height:1.4}.lqr-p{font-size:12px;color:#a8832e;font-weight:700}";
 document.head.appendChild(s);
}
var ov=null,cur=0;
function closeQV(){if(ov){ov.remove();ov=null;}document.body.style.overflow="";}
function renderQV(){
 if(!ov)return;var l=lang(),t=T[l],p=prod(cur);if(!p)return;
 ov.innerHTML="";ov.setAttribute("data-lg",l);
 var box=el("div","lqv-box");box.dir=l==="ar"?"rtl":"ltr";
 var x=el("button","lqv-x","\u00d7");x.type="button";x.setAttribute("aria-label",t.close);x.onclick=closeQV;box.appendChild(x);
 var m=el("img","lqv-main");m.src=img(cur,1);m.alt=l==="ar"?p[1]:p[2];box.appendChild(m);
 var th=el("div","lqv-th");
 for(var k=1;k<=4;k++){(function(k){var i=el("img",k===1?"on":"");i.src=img(cur,k);i.alt="";i.onclick=function(){m.src=img(cur,k);th.querySelectorAll("img").forEach(function(z){z.classList.remove("on");});i.classList.add("on");};th.appendChild(i);})(k);}
 box.appendChild(th);
 box.appendChild(el("div","lqv-name",l==="ar"?p[1]:p[2]));
 var pr=el("div","lqv-pr");var old=el("s","",money(p[3],l));pr.appendChild(old);pr.appendChild(document.createTextNode(money(shown(p),l)));box.appendChild(pr);
 var act=el("div","lqv-act");
 var a=el("button","lqv-add",t.add);a.type="button";a.onclick=function(){var n=cur;closeQV();if(window.lumCart&&window.lumCart.addMany)window.lumCart.addMany([n],t.toast);};
 var f=el("a","lqv-full",t.full);f.href="#/p/"+cur;f.onclick=function(){closeQV();};
 act.appendChild(a);act.appendChild(f);box.appendChild(act);
 ov.appendChild(box);
}
function openQV(n){
 closeQV();cur=n;ov=el("div","lqv-ov");
 if(document.querySelector(".lum-dark"))ov.classList.add("lqv-dark");
 ov.onclick=function(e){if(e.target===ov)closeQV();};
 document.body.appendChild(ov);document.body.style.overflow="hidden";renderQV();
}
document.addEventListener("keydown",function(e){if(e.key==="Escape")closeQV();});
function ensureBtns(){
 var l=lang();
 document.querySelectorAll(".lum-cardlink").forEach(function(a){
  var m=(a.getAttribute("href")||"").match(/\/p\/(\d+)/);if(!m)return;
  var card=a.querySelector(".lum-card");if(!card)return;
  var b=card.querySelector(".lqv-btn");
  if(!b){b=el("button","lqv-btn","");b.type="button";
   b.onclick=function(e){e.preventDefault();e.stopPropagation();openQV(+m[1]);};
   card.insertBefore(b,card.firstChild);}
  var w="\u{1F441} "+T[l].qv;if(b.textContent!==w)b.textContent=w;
 });
}
function related(n){
 var p=prod(n),g=grp(n);
 var c=P.filter(function(q){return q[0]!==n;}).map(function(q){
  return {q:q,s:(grp(q[0])===g?0:1000)+Math.abs(q[3]-p[3])*3+Math.abs(q[0]-n)/100};
 });
 c.sort(function(a,b){return a.s-b.s;});
 return c.slice(0,3).map(function(x){return x.q;});
}
function ensureRel(){
 var m=location.hash.match(/^#\/p\/(\d+)/);var blk=document.getElementById("lqr");
 if(!m||!prod(+m[1])){if(blk)blk.remove();return;}
 var n=+m[1],l=lang();
 if(blk&&blk.getAttribute("data-n")===String(n)&&blk.getAttribute("data-lg")===l)return;
 var anchor=document.querySelector(".lum-follow");
 if(!anchor||!anchor.parentNode){if(blk)blk.remove();return;}
 if(blk)blk.remove();
 blk=el("div","lqr");blk.id="lqr";blk.setAttribute("data-n",String(n));blk.setAttribute("data-lg",l);blk.dir=l==="ar"?"rtl":"ltr";
 blk.appendChild(el("div","lqr-t",T[l].rel));
 var g=el("div","lqr-g");
 related(n).forEach(function(q){
  var c=el("div","lqr-c");
  var i=el("img");i.src=img(q[0],1);i.alt="";i.loading="lazy";c.appendChild(i);
  c.appendChild(el("div","lqr-n",l==="ar"?q[1]:q[2]));
  c.appendChild(el("div","lqr-p",money(shown(q),l)));
  c.onclick=function(){location.hash="#/p/"+q[0];window.scrollTo(0,0);};
  g.appendChild(c);
 });
 blk.appendChild(g);anchor.parentNode.insertBefore(blk,anchor);
}
var sched=false;
function ensure(){css();ensureBtns();ensureRel();if(ov&&ov.getAttribute("data-lg")!==lang())renderQV();}
function onMut(){if(sched)return;sched=true;setTimeout(function(){sched=false;ensure();},90);}
function start(){ensure();new MutationObserver(onMut).observe(document.body,{childList:true,subtree:true});window.addEventListener("hashchange",onMut);}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start);else start();
})();
