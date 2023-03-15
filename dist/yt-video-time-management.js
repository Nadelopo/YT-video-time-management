(function(){"use strict";function U(n,e){var t=J(n),o=t.tag,r=t.id,i=t.className,a=e?document.createElementNS(e,o):document.createElement(o);return r&&(a.id=r),i&&(e?a.setAttribute("class",i):a.className=i),a}function J(n){for(var e=n.split(/([.#])/),t="",o="",r=1;r<e.length;r+=2)switch(e[r]){case".":t+=" "+e[r+1];break;case"#":o=e[r+1]}return{className:t.trim(),tag:e[0]||"div",id:o}}function L(n,e){var t=s(n),o=s(e);return e===o&&o.__redom_view&&(e=o.__redom_view),o.parentNode&&(j(e,o,t),t.removeChild(o)),e}function j(n,e,t){var o=e.__redom_lifecycle;if(I(o)){e.__redom_lifecycle={};return}var r=t;for(e.__redom_mounted&&p(e,"onunmount");r;){var i=r.__redom_lifecycle||{};for(var a in o)i[a]&&(i[a]-=o[a]);I(i)&&(r.__redom_lifecycle=null),r=r.parentNode}}function I(n){if(n==null)return!0;for(var e in n)if(n[e])return!1;return!0}var K=["onmount","onremount","onunmount"],X=typeof window<"u"&&"ShadowRoot"in window;function _(n,e,t,o){var r=s(n),i=s(e);e===i&&i.__redom_view&&(e=i.__redom_view),e!==i&&(i.__redom_view=e);var a=i.__redom_mounted,u=i.parentNode;if(a&&u!==r&&j(e,i,u),t!=null)if(o){var l=s(t);l.__redom_mounted&&p(l,"onunmount"),r.replaceChild(i,l)}else r.insertBefore(i,s(t));else r.appendChild(i);return $(e,i,r,u),e}function p(n,e){e==="onmount"||e==="onremount"?n.__redom_mounted=!0:e==="onunmount"&&(n.__redom_mounted=!1);var t=n.__redom_lifecycle;if(t){var o=n.__redom_view,r=0;o&&o[e]&&o[e]();for(var i in t)i&&r++;if(r)for(var a=n.firstChild;a;){var u=a.nextSibling;p(a,e),a=u}}}function $(n,e,t,o){for(var r=e.__redom_lifecycle||(e.__redom_lifecycle={}),i=t===o,a=!1,u=0,l=K;u<l.length;u+=1){var d=l[u];i||n!==e&&d in n&&(r[d]=(r[d]||0)+1),r[d]&&(a=!0)}if(!a){e.__redom_lifecycle={};return}var c=t,v=!1;for((i||c&&c.__redom_mounted)&&(p(e,i?"onremount":"onmount"),v=!0);c;){var b=c.parentNode,H=c.__redom_lifecycle||(c.__redom_lifecycle={});for(var w in r)H[w]=(H[w]||0)+r[w];if(v)break;(c.nodeType===Node.DOCUMENT_NODE||X&&c instanceof ShadowRoot||b&&b.__redom_mounted)&&(p(c,i?"onremount":"onmount"),v=!0),c=b}}function ee(n,e,t){var o=s(n);if(typeof e=="object")for(var r in e)D(o,r,e[r]);else D(o,e,t)}function D(n,e,t){n.style[e]=t??""}var C="http://www.w3.org/1999/xlink";function S(n,e,t,o){var r=s(n),i=typeof e=="object";if(i)for(var a in e)S(r,a,e[a],o);else{var u=r instanceof SVGElement,l=typeof t=="function";if(e==="style"&&typeof t=="object")ee(r,t);else if(u&&l)r[e]=t;else if(e==="dataset")h(r,t);else if(!u&&(e in r||l)&&e!=="list")r[e]=t;else{if(u&&e==="xlink"){A(r,t);return}o&&e==="class"&&(t=r.className+" "+t),t==null?r.removeAttribute(e):r.setAttribute(e,t)}}}function A(n,e,t){if(typeof e=="object")for(var o in e)A(n,o,e[o]);else t!=null?n.setAttributeNS(C,e,t):n.removeAttributeNS(C,e,t)}function h(n,e,t){if(typeof e=="object")for(var o in e)h(n,o,e[o]);else t!=null?n.dataset[e]=t:delete n.dataset[e]}function ne(n){return document.createTextNode(n??"")}function T(n,e,t){for(var o=0,r=e;o<r.length;o+=1){var i=r[o];if(!(i!==0&&!i)){var a=typeof i;a==="function"?i(n):a==="string"||a==="number"?n.appendChild(ne(i)):E(s(i))?_(n,i):i.length?T(n,i,t):a==="object"&&S(n,i,null,t)}}}function s(n){return n.nodeType&&n||!n.el&&n||s(n.el)}function E(n){return n&&n.nodeType}function M(n){for(var e=[],t=arguments.length-1;t-- >0;)e[t]=arguments[t+1];var o,r=typeof n;if(r==="string")o=U(n);else if(r==="function"){var i=n;o=new(Function.prototype.bind.apply(i,[null].concat(e)))}else throw new Error("At least one argument required");return T(s(o),e,!0),o}var m=M;M.extend=function(){for(var n=[],e=arguments.length;e--;)n[e]=arguments[e];return M.bind.apply(M,[this].concat(n))};function z(n){for(var e=[],t=arguments.length-1;t-- >0;)e[t]=arguments[t+1];for(var o=s(n),r=O(n,e,o.firstChild);r;){var i=r.nextSibling;L(n,r),r=i}}function O(n,e,t){for(var o=t,r=Array(e.length),i=0;i<e.length;i++)r[i]=e[i]&&s(e[i]);for(var a=0;a<e.length;a++){var u=e[a];if(u){var l=r[a];if(l===o){o=o.nextSibling;continue}if(E(l)){var d=o&&o.nextSibling,c=u.__redom_index!=null,v=c&&d===r[a+1];_(n,u,o,v),v&&(o=d);continue}u.length!=null&&(o=O(n,u,o))}}return o}class f{constructor(e){this.el=m("input",{className:e??"",type:"number",value:"00",min:0,max:60,maxlength:2})}}class N{constructor(e,t,o){this.el=m("div",{className:"content__loop"}),z(this.el,[m("div",e+":"),m("div","min."),t,m("div","sec."),o])}}function k(n){return new Promise(e=>{if(document.querySelector(n))return e(document.querySelector(n));const t=new MutationObserver(o=>{document.querySelector(n)&&(e(document.querySelector(n)),t.disconnect())});t.observe(document.body,{childList:!0,subtree:!0})})}const te=(n,e)=>{const t=new DOMParser().parseFromString(atob(n.replace(/data:image\/svg\+xml;base64,/,"")),"image/svg+xml").querySelector("svg");return e&&t.classList.add(e),t},oe="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iY3VycmVudENvbG9yIiBjbGFzcz0iYmkgYmktZ2Vhci1maWxsIiB2aWV3Qm94PSIwIDAgMTYgMTYiPg0KICA8cGF0aCBkPSJNOS40MDUgMS4wNWMtLjQxMy0xLjQtMi4zOTctMS40LTIuODEgMGwtLjEuMzRhMS40NjQgMS40NjQgMCAwIDEtMi4xMDUuODcybC0uMzEtLjE3Yy0xLjI4My0uNjk4LTIuNjg2LjcwNS0xLjk4NyAxLjk4N2wuMTY5LjMxMWMuNDQ2LjgyLjAyMyAxLjg0MS0uODcyIDIuMTA1bC0uMzQuMWMtMS40LjQxMy0xLjQgMi4zOTcgMCAyLjgxbC4zNC4xYTEuNDY0IDEuNDY0IDAgMCAxIC44NzIgMi4xMDVsLS4xNy4zMWMtLjY5OCAxLjI4My43MDUgMi42ODYgMS45ODcgMS45ODdsLjMxMS0uMTY5YTEuNDY0IDEuNDY0IDAgMCAxIDIuMTA1Ljg3MmwuMS4zNGMuNDEzIDEuNCAyLjM5NyAxLjQgMi44MSAwbC4xLS4zNGExLjQ2NCAxLjQ2NCAwIDAgMSAyLjEwNS0uODcybC4zMS4xN2MxLjI4My42OTggMi42ODYtLjcwNSAxLjk4Ny0xLjk4N2wtLjE2OS0uMzExYTEuNDY0IDEuNDY0IDAgMCAxIC44NzItMi4xMDVsLjM0LS4xYzEuNC0uNDEzIDEuNC0yLjM5NyAwLTIuODFsLS4zNC0uMWExLjQ2NCAxLjQ2NCAwIDAgMS0uODcyLTIuMTA1bC4xNy0uMzFjLjY5OC0xLjI4My0uNzA1LTIuNjg2LTEuOTg3LTEuOTg3bC0uMzExLjE2OWExLjQ2NCAxLjQ2NCAwIDAgMS0yLjEwNS0uODcybC0uMS0uMzR6TTggMTAuOTNhMi45MjkgMi45MjkgMCAxIDEgMC01Ljg2IDIuOTI5IDIuOTI5IDAgMCAxIDAgNS44NTh6Ii8+DQo8L3N2Zz4=",re=`#owner .menu__root{position:relative;margin-left:10px}#owner .menu__root .settings{cursor:pointer;transition:.3s;user-select:none}#owner .menu__root .settings:hover{transform:rotate(180deg) scale(1.1)}#owner .menu__root .content{position:absolute;top:0;left:30px;background:#1c1c1c;border-radius:8px;width:240px;height:260px;z-index:100;animation:menuOpen .2s;padding:12px;box-sizing:border-box;font-size:14px}#owner .menu__root .content.close{animation:menuClose .1s}#owner .menu__root .content .content__loop{display:grid;grid-template-columns:60px auto 1fr auto 1fr;align-items:center;gap:4px}#owner .menu__root .content .content__loop .loop{display:flex;gap:4px;align-items:center}#owner .menu__root .content input{margin:4px 0;border:none;border-radius:4px;background:#363636;color:#fff;outline:none;width:24px;text-align:center}#owner .menu__root .content input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}#owner .menu__root .content hr{all:revert}@keyframes menuOpen{0%{opacity:.6;transform:scale(0)}to{opacity:1;transform:scale(1)}}@keyframes menuClose{0%{opacity:1;transform:scale(1)}to{opacity:.6;transform:scale(0)}}.mb-6{margin-bottom:6px}.mt-8{margin-top:6px}.btn{font-family:Roboto;font-size:16px;cursor:pointer;border-radius:10px;outline:none;color:#1c1c1c;background:#363636;padding:2px 6px 1px;transition:.4s;border:2px solid #363636;width:100%;color:#fff}.btn:hover{background:#1c1c1c}
`;GM_addStyle(re);const y=m("div",{className:"menu__root"}),Y=new f().el,Q=new f().el,G=new f().el,W=new f().el,g=m("div",{className:"content"}),ie=new N("start",Y,Q),ae=new N("end",G,W),P=new f().el,V=new f().el,R=new f().el,F=new f().el,ue=new N("start",P,V),ce=new N("end",R,F),Z=m("button","apply",{className:"btn mt-8"}),B=m("button","cancel",{className:"btn mt-8"});z(g,[m("div","loop time video",{className:"mb-6"}),ie,ae,m("hr"),m("div","skip time video",{className:"mb-6"}),ue,ce,Z,B]);const le=()=>{g.classList.add("close"),setTimeout(()=>{L(y,g),g.classList.remove("close")},100)};_(y,g);let x=!0;const q=te(oe,"settings");q.onclick=()=>{x?_(y,g):le(),x=!x},_(y,q),(async()=>{let n=0,e=0,t=0,o=0,r=0,i=0,a=!1,u=await k("#ytd-player");const l=await k(".item.style-scope.ytd-watch-metadata");_(l,y);function d(c){c===1&&(i=setInterval(()=>{console.log("interval"),(e&&r>=e||r<n)&&(clearInterval(i),u.player_.seekTo(n)),o&&r>=t&&r<o&&(clearInterval(i),u.player_.seekTo(o)),r=u.player_.getCurrentTime()},1e3)),(c==2||c==3||c==0)&&clearInterval(i)}Z.onclick=()=>{n=Number(Y.value)*60+Number(Q.value),e=Number(G.value)*60+Number(W.value),t=Number(P.value)*60+Number(V.value),o=Number(R.value)*60+Number(F.value),a||(d(1),setTimeout(()=>{u.player_.addEventListener("onStateChange",d)},1e3),a=!0)},B.onclick=()=>{clearInterval(i),u.player_.removeEventListener("onStateChange",d),a=!1}})()})();
