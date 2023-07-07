// ==UserScript==
// @name        yt-video-time-management
// @version     2.0.0
// @description extension for video time management
// @match       https://www.youtube.com/watch?*
// @icon        https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant       GM_addStyle
// ==/UserScript==

(function(){"use strict";const _t=(t,e)=>t===e,x=Symbol("solid-proxy"),G=Symbol("solid-track"),N={equals:_t};let tt=st;const _=1,E=2,et={owned:null,cleanups:null,context:null,owner:null};var d=null;let J=null,p=null,h=null,w=null,I=0;function K(t,e){const n=p,r=d,o=t.length===0,s=o?et:{owned:null,cleanups:null,context:null,owner:e===void 0?r:e},i=o?t:()=>t(()=>k(()=>D(s)));d=s,p=null;try{return A(i,!0)}finally{p=n,d=r}}function v(t,e){e=e?Object.assign({},N,e):N;const n={value:t,observers:null,observerSlots:null,comparator:e.equals||void 0},r=o=>(typeof o=="function"&&(o=o(n.value)),ot(n,o));return[rt.bind(n),r]}function S(t,e,n){const r=U(t,e,!1,_);j(r)}function z(t,e,n){tt=At;const r=U(t,e,!1,_);(!n||!n.render)&&(r.user=!0),w?w.push(r):j(r)}function C(t,e,n){n=n?Object.assign({},N,n):N;const r=U(t,e,!0,0);return r.observers=null,r.observerSlots=null,r.comparator=n.equals||void 0,j(r),rt.bind(r)}function M(t){return A(t,!1)}function k(t){if(p===null)return t();const e=p;p=null;try{return t()}finally{p=e}}function H(t){z(()=>k(t))}function kt(t){return d===null||(d.cleanups===null?d.cleanups=[t]:d.cleanups.push(t)),t}function nt(){return p}function rt(){if(this.sources&&this.state)if(this.state===_)j(this);else{const t=h;h=null,A(()=>B(this),!1),h=t}if(p){const t=this.observers?this.observers.length:0;p.sources?(p.sources.push(this),p.sourceSlots.push(t)):(p.sources=[this],p.sourceSlots=[t]),this.observers?(this.observers.push(p),this.observerSlots.push(p.sources.length-1)):(this.observers=[p],this.observerSlots=[p.sources.length-1])}return this.value}function ot(t,e,n){let r=t.value;return(!t.comparator||!t.comparator(r,e))&&(t.value=e,t.observers&&t.observers.length&&A(()=>{for(let o=0;o<t.observers.length;o+=1){const s=t.observers[o],i=J&&J.running;i&&J.disposed.has(s),(i?!s.tState:!s.state)&&(s.pure?h.push(s):w.push(s),s.observers&&lt(s)),i||(s.state=_)}if(h.length>1e6)throw h=[],new Error},!1)),e}function j(t){if(!t.fn)return;D(t);const e=d,n=p,r=I;p=d=t,Tt(t,t.value,r),p=n,d=e}function Tt(t,e,n){let r;try{r=t.fn(e)}catch(o){return t.pure&&(t.state=_,t.owned&&t.owned.forEach(D),t.owned=null),t.updatedAt=n+1,it(o)}(!t.updatedAt||t.updatedAt<=n)&&(t.updatedAt!=null&&"observers"in t?ot(t,r):t.value=r,t.updatedAt=n)}function U(t,e,n,r=_,o){const s={fn:t,state:r,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:e,owner:d,context:null,pure:n};return d===null||d!==et&&(d.owned?d.owned.push(s):d.owned=[s]),s}function q(t){if(t.state===0)return;if(t.state===E)return B(t);if(t.suspense&&k(t.suspense.inFallback))return t.suspense.effects.push(t);const e=[t];for(;(t=t.owner)&&(!t.updatedAt||t.updatedAt<I);)t.state&&e.push(t);for(let n=e.length-1;n>=0;n--)if(t=e[n],t.state===_)j(t);else if(t.state===E){const r=h;h=null,A(()=>B(t,e[0]),!1),h=r}}function A(t,e){if(h)return t();let n=!1;e||(h=[]),w?n=!0:w=[],I++;try{const r=t();return St(n),r}catch(r){n||(w=null),h=null,it(r)}}function St(t){if(h&&(st(h),h=null),t)return;const e=w;w=null,e.length&&A(()=>tt(e),!1)}function st(t){for(let e=0;e<t.length;e++)q(t[e])}function At(t){let e,n=0;for(e=0;e<t.length;e++){const r=t[e];r.user?t[n++]=r:q(r)}for(e=0;e<n;e++)q(t[e])}function B(t,e){t.state=0;for(let n=0;n<t.sources.length;n+=1){const r=t.sources[n];if(r.sources){const o=r.state;o===_?r!==e&&(!r.updatedAt||r.updatedAt<I)&&q(r):o===E&&B(r,e)}}}function lt(t){for(let e=0;e<t.observers.length;e+=1){const n=t.observers[e];n.state||(n.state=E,n.pure?h.push(n):w.push(n),n.observers&&lt(n))}}function D(t){let e;if(t.sources)for(;t.sources.length;){const n=t.sources.pop(),r=t.sourceSlots.pop(),o=n.observers;if(o&&o.length){const s=o.pop(),i=n.observerSlots.pop();r<o.length&&(s.sourceSlots[i]=r,o[r]=s,n.observerSlots[r]=i)}}if(t.owned){for(e=t.owned.length-1;e>=0;e--)D(t.owned[e]);t.owned=null}if(t.cleanups){for(e=t.cleanups.length-1;e>=0;e--)t.cleanups[e]();t.cleanups=null}t.state=0,t.context=null}function it(t){throw t}const ct=Symbol("fallback");function ut(t){for(let e=0;e<t.length;e++)t[e]()}function Ot(t,e,n={}){let r=[],o=[],s=[],i=[],l=0,c;return kt(()=>ut(s)),()=>{const u=t()||[];return u[G],k(()=>{if(u.length===0)return l!==0&&(ut(s),s=[],r=[],o=[],l=0,i=[]),n.fallback&&(r=[ct],o[0]=K(f=>(s[0]=f,n.fallback())),l=1),o;for(r[0]===ct&&(s[0](),s=[],r=[],o=[],l=0),c=0;c<u.length;c++)c<r.length&&r[c]!==u[c]?i[c](()=>u[c]):c>=r.length&&(o[c]=K(a));for(;c<r.length;c++)s[c]();return l=i.length=s.length=u.length,r=u.slice(0),o=o.slice(0,l)});function a(f){s[c]=f;const[m,T]=v(u[c]);return i[c]=T,e(m,c)}}}function y(t,e){return k(()=>t(e||{}))}const $t=t=>`Stale read from <${t}>.`;function Ct(t){const e="fallback"in t&&{fallback:()=>t.fallback};return C(Ot(()=>t.each,t.children,e||void 0))}function jt(t){const e=t.keyed,n=C(()=>t.when,void 0,{equals:(r,o)=>e?r===o:!r==!o});return C(()=>{const r=n();if(r){const o=t.children;return typeof o=="function"&&o.length>0?k(()=>o(e?r:()=>{if(!k(n))throw $t("Show");return t.when})):o}return t.fallback},void 0,void 0)}function Pt(t,e,n){let r=n.length,o=e.length,s=r,i=0,l=0,c=e[o-1].nextSibling,u=null;for(;i<o||l<s;){if(e[i]===n[l]){i++,l++;continue}for(;e[o-1]===n[s-1];)o--,s--;if(o===i){const a=s<r?l?n[l-1].nextSibling:n[s-l]:c;for(;l<s;)t.insertBefore(n[l++],a)}else if(s===l)for(;i<o;)(!u||!u.has(e[i]))&&e[i].remove(),i++;else if(e[i]===n[s-1]&&n[l]===e[o-1]){const a=e[--o].nextSibling;t.insertBefore(n[l++],e[i++].nextSibling),t.insertBefore(n[--s],a),e[o]=n[s]}else{if(!u){u=new Map;let f=l;for(;f<s;)u.set(n[f],f++)}const a=u.get(e[i]);if(a!=null)if(l<a&&a<s){let f=i,m=1,T;for(;++f<o&&f<s&&!((T=u.get(e[f]))==null||T!==a+m);)m++;if(m>a-l){const W=e[i];for(;l<a;)t.insertBefore(n[l++],W)}else t.replaceChild(n[l++],e[i++])}else i++;else e[i++].remove()}}}const at="_$DX_DELEGATE";function Nt(t,e,n,r={}){let o;return K(s=>{o=s,e===document?t():O(e,t(),e.firstChild?null:void 0,n)},r.owner),()=>{o(),e.textContent=""}}function b(t,e,n){let r;const o=()=>{const i=document.createElement("template");return i.innerHTML=t,n?i.content.firstChild.firstChild:i.content.firstChild},s=e?()=>k(()=>document.importNode(r||(r=o()),!0)):()=>(r||(r=o())).cloneNode(!0);return s.cloneNode=s,s}function V(t,e=window.document){const n=e[at]||(e[at]=new Set);for(let r=0,o=t.length;r<o;r++){const s=t[r];n.has(s)||(n.add(s),e.addEventListener(s,It))}}function Et(t,e){e==null?t.removeAttribute("class"):t.className=e}function O(t,e,n,r){if(n!==void 0&&!r&&(r=[]),typeof e!="function")return L(t,e,r,n);S(o=>L(t,e(),o,n),r)}function It(t){const e=`$$${t.type}`;let n=t.composedPath&&t.composedPath()[0]||t.target;for(t.target!==n&&Object.defineProperty(t,"target",{configurable:!0,value:n}),Object.defineProperty(t,"currentTarget",{configurable:!0,get(){return n||document}});n;){const r=n[e];if(r&&!n.disabled){const o=n[`${e}Data`];if(o!==void 0?r.call(n,o,t):r.call(n,t),t.cancelBubble)return}n=n._$host||n.parentNode||n.host}}function L(t,e,n,r,o){for(;typeof n=="function";)n=n();if(e===n)return n;const s=typeof e,i=r!==void 0;if(t=i&&n[0]&&n[0].parentNode||t,s==="string"||s==="number")if(s==="number"&&(e=e.toString()),i){let l=n[0];l&&l.nodeType===3?l.data=e:l=document.createTextNode(e),n=$(t,n,r,l)}else n!==""&&typeof n=="string"?n=t.firstChild.data=e:n=t.textContent=e;else if(e==null||s==="boolean")n=$(t,n,r);else{if(s==="function")return S(()=>{let l=e();for(;typeof l=="function";)l=l();n=L(t,l,n,r)}),()=>n;if(Array.isArray(e)){const l=[],c=n&&Array.isArray(n);if(X(l,e,n,o))return S(()=>n=L(t,l,n,r,!0)),()=>n;if(l.length===0){if(n=$(t,n,r),i)return n}else c?n.length===0?ft(t,l,r):Pt(t,n,l):(n&&$(t),ft(t,l));n=l}else if(e.nodeType){if(Array.isArray(n)){if(i)return n=$(t,n,r,e);$(t,n,null,e)}else n==null||n===""||!t.firstChild?t.appendChild(e):t.replaceChild(e,t.firstChild);n=e}else console.warn("Unrecognized value. Skipped inserting",e)}return n}function X(t,e,n,r){let o=!1;for(let s=0,i=e.length;s<i;s++){let l=e[s],c=n&&n[s],u;if(!(l==null||l===!0||l===!1))if((u=typeof l)=="object"&&l.nodeType)t.push(l);else if(Array.isArray(l))o=X(t,l,c)||o;else if(u==="function")if(r){for(;typeof l=="function";)l=l();o=X(t,Array.isArray(l)?l:[l],Array.isArray(c)?c:[c])||o}else t.push(l),o=!0;else{const a=String(l);c&&c.nodeType===3&&c.data===a?t.push(c):t.push(document.createTextNode(a))}}return o}function ft(t,e,n=null){for(let r=0,o=e.length;r<o;r++)t.insertBefore(e[r],n)}function $(t,e,n,r){if(n===void 0)return t.textContent="";const o=r||document.createTextNode("");if(e.length){let s=!1;for(let i=e.length-1;i>=0;i--){const l=e[i];if(o!==l){const c=l.parentNode===t;!s&&!i?c?t.replaceChild(o,l):t.insertBefore(o,n):c&&l.remove()}else s=!0}}else t.insertBefore(o,n);return[o]}const Y=Symbol("store-raw"),P=Symbol("store-node");function pt(t){let e;return t!=null&&typeof t=="object"&&(t[x]||!(e=Object.getPrototypeOf(t))||e===Object.prototype||Array.isArray(t))}function F(t,e=new Set){let n,r,o,s;if(n=t!=null&&t[Y])return n;if(!pt(t)||e.has(t))return t;if(Array.isArray(t)){Object.isFrozen(t)?t=t.slice(0):e.add(t);for(let i=0,l=t.length;i<l;i++)o=t[i],(r=F(o,e))!==o&&(t[i]=r)}else{Object.isFrozen(t)?t=Object.assign({},t):e.add(t);const i=Object.keys(t),l=Object.getOwnPropertyDescriptors(t);for(let c=0,u=i.length;c<u;c++)s=i[c],!l[s].get&&(o=t[s],(r=F(o,e))!==o&&(t[s]=r))}return t}function Z(t){let e=t[P];return e||Object.defineProperty(t,P,{value:e=Object.create(null)}),e}function Q(t,e,n){return t[e]||(t[e]=ht(n))}function dt(t){if(nt()){const e=Z(t);(e._||(e._=ht()))()}}function zt(t){return dt(t),Reflect.ownKeys(t)}function ht(t){const[e,n]=v(t,{equals:!1,internal:!0});return e.$=n,e}function mt(t,e,n,r=!1){if(!r&&t[e]===n)return;const o=t[e],s=t.length;n===void 0?delete t[e]:t[e]=n;let i=Z(t),l;if((l=Q(i,e,o))&&l.$(()=>n),Array.isArray(t)&&t.length!==s){for(let c=t.length;c<s;c++)(l=i[c])&&l.$();(l=Q(i,"length",s))&&l.$(t.length)}(l=i._)&&l.$()}function Mt(t,e){const n=Reflect.getOwnPropertyDescriptor(t,e);return!n||n.get||n.set||!n.configurable||e===x||e===P||(delete n.value,delete n.writable,n.get=()=>t[x][e],n.set=r=>t[x][e]=r),n}const qt={get(t,e,n){if(e===Y)return t;if(e===x)return n;if(e===G)return dt(t),n;const r=Z(t),o=r[e];let s=o?o():t[e];if(e===P||e==="__proto__")return s;if(!o){const i=Object.getOwnPropertyDescriptor(t,e),l=typeof s=="function";if(nt()&&(!l||t.hasOwnProperty(e))&&!(i&&i.get))s=Q(r,e,s)();else if(s!=null&&l&&s===Array.prototype[e])return(...c)=>M(()=>Array.prototype[e].apply(n,c))}return pt(s)?gt(s):s},has(t,e){return e===Y||e===x||e===G||e===P||e==="__proto__"?!0:(this.get(t,e,t),e in t)},set(t,e,n){return M(()=>mt(t,e,F(n))),!0},deleteProperty(t,e){return M(()=>mt(t,e,void 0,!0)),!0},ownKeys:zt,getOwnPropertyDescriptor:Mt};function gt(t){let e=t[x];if(!e){Object.defineProperty(t,x,{value:e=new Proxy(t,qt)});const n=Object.keys(t),r=Object.getOwnPropertyDescriptors(t);for(let o=0,s=n.length;o<s;o++){const i=n[o];if(r[i].get){const l=r[i].get.bind(e);Object.defineProperty(t,i,{get:l})}if(r[i].set){const l=r[i].set;Object.defineProperty(t,i,{set:c=>M(()=>l.call(e,c))})}}}return e}function Bt(t,e){const n=F(t||{});return gt(n)}const Dt=b('<div class="switcher"><input type="checkbox" id="cbx" style="display:none"><label for="cbx" class="toggle"><span>'),Vt=t=>(()=>{const e=Dt(),n=e.firstChild;return n.addEventListener("change",()=>t.setState(!t.state)),S(()=>n.checked=!t.state),e})(),Lt=b('<div class="content__time"><div> </div><div>min</div><input type="number" min="0" max="60" maxlength="2"><div>sec</div><input type="number" min="0" max="60" maxlength="2">'),bt=t=>{const[e,n]=v(Math.floor(t.time/60)),[r,o]=v(t.time%60);return t.ref({allTime:()=>e()*60+r(),min:e,sec:r,setMin:n,setSec:o}),z(()=>{n(Math.floor(t.time/60)),o(t.time%60)}),(()=>{const s=Lt(),i=s.firstChild,l=i.firstChild,c=i.nextSibling,u=c.nextSibling,a=u.nextSibling,f=a.nextSibling;return O(i,()=>t.title,l),u.$$input=m=>n(Number(m.target.value)),f.$$input=m=>o(Number(m.target.value)),S(()=>u.value=e()),S(()=>f.value=r()),s})()};V(["input"]);const Ft=b('<div class="content__wrapper__time">'),yt=t=>{let e,n;const r=()=>{e&&n&&(n.allTime()<e.allTime()&&n.setSec(e.sec()),n.allTime()<e.allTime()&&n.setMin(e.min()))};return H(()=>{!e||!n||t.ref({startTime:e.allTime,endTime:n.allTime,checkInputsValues:r})}),(()=>{const o=Ft();return O(o,y(bt,{title:"start",get time(){return t.time.start},ref:s=>e=s}),null),O(o,y(bt,{title:"end",get time(){return t.time.end},ref:s=>n=s}),null),o})()},Rt=b("<div>loop"),Gt=t=>{const[e,n]=v();return z(()=>{const r=e();if(r){const o=t.player();t.ref({checkInputsValues:r.checkInputsValues,startTime:r.startTime,endTime:r.endTime,apply:(s,i)=>{if(!o)return;const l=o.getCurrentTime();i!==0&&(l>=i||l<s)&&o.seekTo(s)}});return}}),[(()=>{const r=Rt();return r.style.setProperty("text-align","center"),r})(),y(yt,{ref:n,get time(){return g.loopTime}})]},Jt=b("<div>skip"),Kt=b('<button class="btn mt-8">add'),Ht=b('<button class="btn mt-8">remove'),Ut=b('<button class="btn mt-8">clear'),Xt=t=>{const[e,n]=v([]);z(()=>{if(e().length){const i=t.player();t.ref({checkInputsValues:()=>e().forEach(l=>l.checkInputsValues()),startTime:e().map(l=>l.startTime),endTime:e().map(l=>l.endTime),apply:l=>{if(!i)return;const c=i.getCurrentTime();l.forEach(u=>{u.end!==0&&c>=u.start&&c<u.end&&i.seekTo(u.end)})}})}});const r=()=>{g.skipTime.push({start:0,end:0})},o=()=>{g.skipTime.length!==1&&(g.skipTime.splice(-1),n([...e()].splice(-1)))},s=()=>{g.skipTime=g.skipTime.map(()=>({start:0,end:0}))};return[(()=>{const i=Jt();return i.style.setProperty("text-align","center"),i})(),y(Ct,{get each(){return g.skipTime},children:(i,l)=>y(yt,{ref:c=>n([...e(),c]),get time(){return g.skipTime[l]}})}),(()=>{const i=Kt();return i.$$click=r,i})(),(()=>{const i=Ht();return i.$$click=o,i})(),(()=>{const i=Ut();return i.$$click=s,i})()]};V(["click"]);const Yt=b('<button class="btn mt-8">apply'),Zt=b('<button class="btn mt-8">cancel');let R=0;const Qt=()=>{const[t,e]=v(!0),n=document.querySelector("#ytd-player");let[r,o]=v(null),s,i;H(()=>{setTimeout(()=>{n&&o(n.player_)},500)});const l=()=>{const a=s?.startTime()||0,f=s?.endTime()||0,m=[];return s&&(s.checkInputsValues(),g.loopTime={start:a,end:f}),i&&(i.checkInputsValues(),i.startTime.forEach((T,W)=>{const xt=i?.endTime[W]();xt!==void 0&&m.push({start:T(),end:xt})}),g.skipTime=m),localStorage.setItem("yt-time",JSON.stringify(g)),{loopTimeStart:a,loopTimeEnd:f,skipTime:m}},c=()=>{if(!r())return;const a=t(),{loopTimeStart:f,loopTimeEnd:m,skipTime:T}=l();clearInterval(R),R=setInterval(()=>{a?s?.apply(f,m):i?.apply(T)},1e3)},u=()=>{clearInterval(R),R=0};return[y(Vt,{get state(){return t()},setState:a=>{l(),e(a)}}),C((()=>{const a=C(()=>!!t());return()=>a()?y(Gt,{ref:f=>s=f,player:r}):y(Xt,{ref:f=>i=f,player:r})})()),(()=>{const a=Yt();return a.$$click=c,a})(),(()=>{const a=Zt();return a.$$click=u,a})()]};V(["click"]);const Wt=b("<div>"),te=b('<div class="menu__root"><svg class="settings" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z">'),[vt,ee]=v(!1),[ne,wt]=v("open");let g=Bt({loopTime:{start:0,end:0},skipTime:[{start:0,end:0}]});const re=()=>{const t=()=>{wt("close"),setTimeout(()=>{ee(!vt()),wt("open")},100)};return H(()=>{const e=localStorage.getItem("yt-time");if(e){const n=JSON.parse(e);g.loopTime=n.loopTime,g.skipTime=n.skipTime}}),(()=>{const e=te(),n=e.firstChild;return n.$$click=t,O(e,y(jt,{get when(){return vt()},get children(){const r=Wt();return O(r,y(Qt,{})),S(()=>Et(r,`content ${ne()}`)),r}}),null),e})()};V(["click"]);const oe=(t,e)=>{const n=e?.timeDisconnect??1e4;return new Promise(r=>{const o=document.querySelector(t);if(o)return r(o);const s=new MutationObserver(i=>{const l=document.querySelector(t);l&&(r(l),s.disconnect())});setTimeout(()=>{document.querySelector(t)||s.disconnect()},n),s.observe(document.body,{childList:!0,subtree:!0})})},se=`#owner .menu__root{position:relative;margin-left:10px}#owner .menu__root .settings{cursor:pointer;transition:.3s;user-select:none}#owner .menu__root .settings:hover{transform:rotate(180deg) scale(1.1)}#owner .menu__root .content{position:absolute;top:0;left:30px;background:#1c1c1c;border-radius:8px;width:240px;max-height:290px;z-index:100;animation:menuOpen .2s;padding:12px 4px 12px 12px;scrollbar-gutter:stable;box-sizing:border-box;font-size:14px;overflow:auto}#owner .menu__root .content.close{animation:menuClose .1s}#owner .menu__root .content::-webkit-scrollbar{width:8px}#owner .menu__root .content::-webkit-scrollbar-track{background-color:#1c1c1c;border-radius:0 0 8px}#owner .menu__root .content::-webkit-scrollbar-thumb{background:#7b7b7b;border-radius:10px;transform:scaleY(-1)}#owner .menu__root .content .content__wrapper__time{margin-bottom:6px}#owner .menu__root .content .content__wrapper__time .content__time{display:grid;grid-template-columns:60px auto 1fr auto 1fr;align-items:center;gap:4px}#owner .menu__root .content .content__wrapper__time .content__time .loop{display:flex;gap:4px;align-items:center}#owner .menu__root .content input{margin:4px 0;border:none;border-radius:4px;background:#363636;color:#fff;outline:none;width:24px;text-align:center}#owner .menu__root .content input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}#owner .menu__root .content hr{all:revert}@keyframes menuOpen{0%{opacity:.6;transform:scale(0)}to{opacity:1;transform:scale(1)}}@keyframes menuClose{0%{opacity:1;transform:scale(1)}to{opacity:.6;transform:scale(0)}}.mb-6{margin-bottom:6px}.mt-8{margin-top:6px}.btn{font-family:Roboto;font-size:16px;cursor:pointer;border-radius:10px;outline:none;color:#1c1c1c;background:#363636;padding:2px 6px 1px;transition:.4s;border:2px solid #363636;width:100%;color:#fff}.btn:hover{background:#1c1c1c}.switcher{display:flex;justify-content:center;margin-bottom:6px}.switcher .toggle{position:relative;display:block;width:40px;height:20px;cursor:pointer;-webkit-tap-highlight-color:transparent;transform:translateZ(0)}.switcher .toggle:before{content:"";position:relative;top:3px;left:3px;width:34px;height:14px;display:block;background:#9A9999;border-radius:8px;transition:background .2s linear}.switcher .toggle span{position:absolute;top:0;left:0;width:20px;height:20px;display:block;background:white;border-radius:10px;box-shadow:0 3px 8px #9a999980;transition:all .2s linear}.switcher #cbx:checked+.toggle span{background:#fff;transform:translate(20px);transition:all .2s cubic-bezier(.8,.4,.3,1.25) linear;box-shadow:0 3px 8px #fff3}
`;GM_addStyle(se),oe("#owner").then(t=>{Nt(()=>y(re,{}),t)})})();
