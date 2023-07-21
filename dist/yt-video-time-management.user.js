// ==UserScript==
// @name        yt-video-time-management
// @version     2.0.4
// @description extension for video time management
// @match       https://www.youtube.com/watch?*
// @icon        https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant       GM_addStyle
// ==/UserScript==

(function(){"use strict";const At=(t,e)=>t===e,T=Symbol("solid-proxy"),U=Symbol("solid-track"),N={equals:At};let rt=ct;const S=1,I=2,ot={owned:null,cleanups:null,context:null,owner:null};var m=null;let G=null,p=null,h=null,k=null,M=0;function K(t,e){const n=p,r=m,o=t.length===0,s=o?ot:{owned:null,cleanups:null,context:null,owner:e===void 0?r:e},l=o?t:()=>t(()=>_(()=>D(s)));m=s,p=null;try{return O(l,!0)}finally{p=n,m=r}}function v(t,e){e=e?Object.assign({},N,e):N;const n={value:t,observers:null,observerSlots:null,comparator:e.equals||void 0},r=o=>(typeof o=="function"&&(o=o(n.value)),it(n,o));return[lt.bind(n),r]}function A(t,e,n){const r=X(t,e,!1,S);C(r)}function L(t,e,n){rt=Pt;const r=X(t,e,!1,S);(!n||!n.render)&&(r.user=!0),k?k.push(r):C(r)}function P(t,e,n){n=n?Object.assign({},N,n):N;const r=X(t,e,!0,0);return r.observers=null,r.observerSlots=null,r.comparator=n.equals||void 0,C(r),lt.bind(r)}function z(t){return O(t,!1)}function _(t){if(p===null)return t();const e=p;p=null;try{return t()}finally{p=e}}function H(t){L(()=>_(t))}function Ot(t){return m===null||(m.cleanups===null?m.cleanups=[t]:m.cleanups.push(t)),t}function st(){return p}function lt(){if(this.sources&&this.state)if(this.state===S)C(this);else{const t=h;h=null,O(()=>V(this),!1),h=t}if(p){const t=this.observers?this.observers.length:0;p.sources?(p.sources.push(this),p.sourceSlots.push(t)):(p.sources=[this],p.sourceSlots=[t]),this.observers?(this.observers.push(p),this.observerSlots.push(p.sources.length-1)):(this.observers=[p],this.observerSlots=[p.sources.length-1])}return this.value}function it(t,e,n){let r=t.value;return(!t.comparator||!t.comparator(r,e))&&(t.value=e,t.observers&&t.observers.length&&O(()=>{for(let o=0;o<t.observers.length;o+=1){const s=t.observers[o],l=G&&G.running;l&&G.disposed.has(s),(l?!s.tState:!s.state)&&(s.pure?h.push(s):k.push(s),s.observers&&ut(s)),l||(s.state=S)}if(h.length>1e6)throw h=[],new Error},!1)),e}function C(t){if(!t.fn)return;D(t);const e=m,n=p,r=M;p=m=t,$t(t,t.value,r),p=n,m=e}function $t(t,e,n){let r;try{r=t.fn(e)}catch(o){return t.pure&&(t.state=S,t.owned&&t.owned.forEach(D),t.owned=null),t.updatedAt=n+1,at(o)}(!t.updatedAt||t.updatedAt<=n)&&(t.updatedAt!=null&&"observers"in t?it(t,r):t.value=r,t.updatedAt=n)}function X(t,e,n,r=S,o){const s={fn:t,state:r,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:e,owner:m,context:null,pure:n};return m===null||m!==ot&&(m.owned?m.owned.push(s):m.owned=[s]),s}function B(t){if(t.state===0)return;if(t.state===I)return V(t);if(t.suspense&&_(t.suspense.inFallback))return t.suspense.effects.push(t);const e=[t];for(;(t=t.owner)&&(!t.updatedAt||t.updatedAt<M);)t.state&&e.push(t);for(let n=e.length-1;n>=0;n--)if(t=e[n],t.state===S)C(t);else if(t.state===I){const r=h;h=null,O(()=>V(t,e[0]),!1),h=r}}function O(t,e){if(h)return t();let n=!1;e||(h=[]),k?n=!0:k=[],M++;try{const r=t();return jt(n),r}catch(r){n||(k=null),h=null,at(r)}}function jt(t){if(h&&(ct(h),h=null),t)return;const e=k;k=null,e.length&&O(()=>rt(e),!1)}function ct(t){for(let e=0;e<t.length;e++)B(t[e])}function Pt(t){let e,n=0;for(e=0;e<t.length;e++){const r=t[e];r.user?t[n++]=r:B(r)}for(e=0;e<n;e++)B(t[e])}function V(t,e){t.state=0;for(let n=0;n<t.sources.length;n+=1){const r=t.sources[n];if(r.sources){const o=r.state;o===S?r!==e&&(!r.updatedAt||r.updatedAt<M)&&B(r):o===I&&V(r,e)}}}function ut(t){for(let e=0;e<t.observers.length;e+=1){const n=t.observers[e];n.state||(n.state=I,n.pure?h.push(n):k.push(n),n.observers&&ut(n))}}function D(t){let e;if(t.sources)for(;t.sources.length;){const n=t.sources.pop(),r=t.sourceSlots.pop(),o=n.observers;if(o&&o.length){const s=o.pop(),l=n.observerSlots.pop();r<o.length&&(s.sourceSlots[l]=r,o[r]=s,n.observerSlots[r]=l)}}if(t.owned){for(e=t.owned.length-1;e>=0;e--)D(t.owned[e]);t.owned=null}if(t.cleanups){for(e=t.cleanups.length-1;e>=0;e--)t.cleanups[e]();t.cleanups=null}t.state=0,t.context=null}function at(t){throw t}const ft=Symbol("fallback");function pt(t){for(let e=0;e<t.length;e++)t[e]()}function Ct(t,e,n={}){let r=[],o=[],s=[],l=[],i=0,c;return Ot(()=>pt(s)),()=>{const u=t()||[];return u[U],_(()=>{if(u.length===0)return i!==0&&(pt(s),s=[],r=[],o=[],i=0,l=[]),n.fallback&&(r=[ft],o[0]=K(a=>(s[0]=a,n.fallback())),i=1),o;for(r[0]===ft&&(s[0](),s=[],r=[],o=[],i=0),c=0;c<u.length;c++)c<r.length&&r[c]!==u[c]?l[c](()=>u[c]):c>=r.length&&(o[c]=K(d));for(;c<r.length;c++)s[c]();return i=l.length=s.length=u.length,r=u.slice(0),o=o.slice(0,i)});function d(a){s[c]=a;const[f,b]=v(u[c]);return l[c]=b,e(f,c)}}}function w(t,e){return _(()=>t(e||{}))}const Et=t=>`Stale read from <${t}>.`;function Nt(t){const e="fallback"in t&&{fallback:()=>t.fallback};return P(Ct(()=>t.each,t.children,e||void 0))}function It(t){const e=t.keyed,n=P(()=>t.when,void 0,{equals:(r,o)=>e?r===o:!r==!o});return P(()=>{const r=n();if(r){const o=t.children;return typeof o=="function"&&o.length>0?_(()=>o(e?r:()=>{if(!_(n))throw Et("Show");return t.when})):o}return t.fallback},void 0,void 0)}function Mt(t,e,n){let r=n.length,o=e.length,s=r,l=0,i=0,c=e[o-1].nextSibling,u=null;for(;l<o||i<s;){if(e[l]===n[i]){l++,i++;continue}for(;e[o-1]===n[s-1];)o--,s--;if(o===l){const d=s<r?i?n[i-1].nextSibling:n[s-i]:c;for(;i<s;)t.insertBefore(n[i++],d)}else if(s===i)for(;l<o;)(!u||!u.has(e[l]))&&e[l].remove(),l++;else if(e[l]===n[s-1]&&n[i]===e[o-1]){const d=e[--o].nextSibling;t.insertBefore(n[i++],e[l++].nextSibling),t.insertBefore(n[--s],d),e[o]=n[s]}else{if(!u){u=new Map;let a=i;for(;a<s;)u.set(n[a],a++)}const d=u.get(e[l]);if(d!=null)if(i<d&&d<s){let a=l,f=1,b;for(;++a<o&&a<s&&!((b=u.get(e[a]))==null||b!==d+f);)f++;if(f>d-i){const x=e[l];for(;i<d;)t.insertBefore(n[i++],x)}else t.replaceChild(n[i++],e[l++])}else l++;else e[l++].remove()}}}const dt="_$DX_DELEGATE";function Lt(t,e,n,r={}){let o;return K(s=>{o=s,e===document?t():$(e,t(),e.firstChild?null:void 0,n)},r.owner),()=>{o(),e.textContent=""}}function y(t,e,n){let r;const o=()=>{const l=document.createElement("template");return l.innerHTML=t,n?l.content.firstChild.firstChild:l.content.firstChild},s=e?()=>_(()=>document.importNode(r||(r=o()),!0)):()=>(r||(r=o())).cloneNode(!0);return s.cloneNode=s,s}function q(t,e=window.document){const n=e[dt]||(e[dt]=new Set);for(let r=0,o=t.length;r<o;r++){const s=t[r];n.has(s)||(n.add(s),e.addEventListener(s,Vt))}}function zt(t,e){e==null?t.removeAttribute("class"):t.className=e}function Bt(t,e,n){return _(()=>t(e,n))}function $(t,e,n,r){if(n!==void 0&&!r&&(r=[]),typeof e!="function")return R(t,e,r,n);A(o=>R(t,e(),o,n),r)}function Vt(t){const e=`$$${t.type}`;let n=t.composedPath&&t.composedPath()[0]||t.target;for(t.target!==n&&Object.defineProperty(t,"target",{configurable:!0,value:n}),Object.defineProperty(t,"currentTarget",{configurable:!0,get(){return n||document}});n;){const r=n[e];if(r&&!n.disabled){const o=n[`${e}Data`];if(o!==void 0?r.call(n,o,t):r.call(n,t),t.cancelBubble)return}n=n._$host||n.parentNode||n.host}}function R(t,e,n,r,o){for(;typeof n=="function";)n=n();if(e===n)return n;const s=typeof e,l=r!==void 0;if(t=l&&n[0]&&n[0].parentNode||t,s==="string"||s==="number")if(s==="number"&&(e=e.toString()),l){let i=n[0];i&&i.nodeType===3?i.data=e:i=document.createTextNode(e),n=j(t,n,r,i)}else n!==""&&typeof n=="string"?n=t.firstChild.data=e:n=t.textContent=e;else if(e==null||s==="boolean")n=j(t,n,r);else{if(s==="function")return A(()=>{let i=e();for(;typeof i=="function";)i=i();n=R(t,i,n,r)}),()=>n;if(Array.isArray(e)){const i=[],c=n&&Array.isArray(n);if(Y(i,e,n,o))return A(()=>n=R(t,i,n,r,!0)),()=>n;if(i.length===0){if(n=j(t,n,r),l)return n}else c?n.length===0?mt(t,i,r):Mt(t,n,i):(n&&j(t),mt(t,i));n=i}else if(e.nodeType){if(Array.isArray(n)){if(l)return n=j(t,n,r,e);j(t,n,null,e)}else n==null||n===""||!t.firstChild?t.appendChild(e):t.replaceChild(e,t.firstChild);n=e}else console.warn("Unrecognized value. Skipped inserting",e)}return n}function Y(t,e,n,r){let o=!1;for(let s=0,l=e.length;s<l;s++){let i=e[s],c=n&&n[s],u;if(!(i==null||i===!0||i===!1))if((u=typeof i)=="object"&&i.nodeType)t.push(i);else if(Array.isArray(i))o=Y(t,i,c)||o;else if(u==="function")if(r){for(;typeof i=="function";)i=i();o=Y(t,Array.isArray(i)?i:[i],Array.isArray(c)?c:[c])||o}else t.push(i),o=!0;else{const d=String(i);c&&c.nodeType===3&&c.data===d?t.push(c):t.push(document.createTextNode(d))}}return o}function mt(t,e,n=null){for(let r=0,o=e.length;r<o;r++)t.insertBefore(e[r],n)}function j(t,e,n,r){if(n===void 0)return t.textContent="";const o=r||document.createTextNode("");if(e.length){let s=!1;for(let l=e.length-1;l>=0;l--){const i=e[l];if(o!==i){const c=i.parentNode===t;!s&&!l?c?t.replaceChild(o,i):t.insertBefore(o,n):c&&i.remove()}else s=!0}}else t.insertBefore(o,n);return[o]}const Z=Symbol("store-raw"),E=Symbol("store-node");function ht(t){let e;return t!=null&&typeof t=="object"&&(t[T]||!(e=Object.getPrototypeOf(t))||e===Object.prototype||Array.isArray(t))}function F(t,e=new Set){let n,r,o,s;if(n=t!=null&&t[Z])return n;if(!ht(t)||e.has(t))return t;if(Array.isArray(t)){Object.isFrozen(t)?t=t.slice(0):e.add(t);for(let l=0,i=t.length;l<i;l++)o=t[l],(r=F(o,e))!==o&&(t[l]=r)}else{Object.isFrozen(t)?t=Object.assign({},t):e.add(t);const l=Object.keys(t),i=Object.getOwnPropertyDescriptors(t);for(let c=0,u=l.length;c<u;c++)s=l[c],!i[s].get&&(o=t[s],(r=F(o,e))!==o&&(t[s]=r))}return t}function Q(t){let e=t[E];return e||Object.defineProperty(t,E,{value:e=Object.create(null)}),e}function W(t,e,n){return t[e]||(t[e]=bt(n))}function gt(t){if(st()){const e=Q(t);(e._||(e._=bt()))()}}function Dt(t){return gt(t),Reflect.ownKeys(t)}function bt(t){const[e,n]=v(t,{equals:!1,internal:!0});return e.$=n,e}function yt(t,e,n,r=!1){if(!r&&t[e]===n)return;const o=t[e],s=t.length;n===void 0?delete t[e]:t[e]=n;let l=Q(t),i;if((i=W(l,e,o))&&i.$(()=>n),Array.isArray(t)&&t.length!==s){for(let c=t.length;c<s;c++)(i=l[c])&&i.$();(i=W(l,"length",s))&&i.$(t.length)}(i=l._)&&i.$()}function qt(t,e){const n=Reflect.getOwnPropertyDescriptor(t,e);return!n||n.get||n.set||!n.configurable||e===T||e===E||(delete n.value,delete n.writable,n.get=()=>t[T][e],n.set=r=>t[T][e]=r),n}const Rt={get(t,e,n){if(e===Z)return t;if(e===T)return n;if(e===U)return gt(t),n;const r=Q(t),o=r[e];let s=o?o():t[e];if(e===E||e==="__proto__")return s;if(!o){const l=Object.getOwnPropertyDescriptor(t,e),i=typeof s=="function";if(st()&&(!i||t.hasOwnProperty(e))&&!(l&&l.get))s=W(r,e,s)();else if(s!=null&&i&&s===Array.prototype[e])return(...c)=>z(()=>Array.prototype[e].apply(n,c))}return ht(s)?vt(s):s},has(t,e){return e===Z||e===T||e===U||e===E||e==="__proto__"?!0:(this.get(t,e,t),e in t)},set(t,e,n){return z(()=>yt(t,e,F(n))),!0},deleteProperty(t,e){return z(()=>yt(t,e,void 0,!0)),!0},ownKeys:Dt,getOwnPropertyDescriptor:qt};function vt(t){let e=t[T];if(!e){Object.defineProperty(t,T,{value:e=new Proxy(t,Rt)});const n=Object.keys(t),r=Object.getOwnPropertyDescriptors(t);for(let o=0,s=n.length;o<s;o++){const l=n[o];if(r[l].get){const i=r[l].get.bind(e);Object.defineProperty(t,l,{get:i})}if(r[l].set){const i=r[l].set;Object.defineProperty(t,l,{set:c=>z(()=>i.call(e,c))})}}}return e}function Ft(t,e){const n=F(t||{});return vt(n)}const Jt=t=>{let e=window.location.href;t({url:e}),navigation.addEventListener("navigate",n=>{e!==n.destination.url&&(e=n.destination.url,t({url:e}))})},Ut=y('<div class="switcher"><input type="checkbox" id="cbx" style="display:none"><label for="cbx" class="toggle"><span>'),Gt=t=>(()=>{const e=Ut(),n=e.firstChild;return n.addEventListener("change",()=>t.setState(!t.state)),A(()=>n.checked=!t.state),e})(),Kt=y('<div class="content__time"><div> </div><div>min</div><input type="number" min="0" max="60" maxlength="2"><div>sec</div><input type="number" min="0" max="60" maxlength="2">'),wt=t=>{const[e,n]=v(Math.floor(t.time/60)),[r,o]=v(t.time%60);return t.ref({allTime:()=>e()*60+r(),min:e,sec:r,setMin:n,setSec:o}),H(()=>{n(Math.floor(t.time/60)),o(t.time%60)}),(()=>{const s=Kt(),l=s.firstChild,i=l.firstChild,c=l.nextSibling,u=c.nextSibling,d=u.nextSibling,a=d.nextSibling;return $(l,()=>t.title,i),u.$$input=f=>n(Number(f.target.value)),a.$$input=f=>o(Number(f.target.value)),A(()=>u.value=e()),A(()=>a.value=r()),s})()};q(["input"]);const Ht=y('<div class="content__wrapper__time">'),xt=t=>{let e,n;const r=()=>{!e||!n||(n.allTime()<e.allTime()&&n.setSec(e.sec()),n.allTime()<e.allTime()&&n.setMin(e.min()))};return H(()=>{!e||!n||t.ref({startTime:e.allTime,endTime:n.allTime,checkInputsValues:r,clearValues:()=>{!e||!n||(e.setMin(0),e.setSec(0),n.setMin(0),n.setSec(0))}})}),(()=>{const o=Ht();return $(o,w(wt,{title:"start",get time(){return t.time.start},ref:s=>e=s}),null),$(o,w(wt,{title:"end",get time(){return t.time.end},ref:s=>n=s}),null),o})()},Xt=y("<div>loop"),Yt=t=>{const[e,n]=v();return L(()=>{const r=e();if(r){const o=t.player();t.ref({checkInputsValues:r.checkInputsValues,startTime:r.startTime,endTime:r.endTime,apply:(s,l)=>{if(!o)return;const i=o.getCurrentTime();l!==0&&(i>=l||i<s)&&o.seekTo(s)}});return}}),[(()=>{const r=Xt();return r.style.setProperty("text-align","center"),r})(),w(xt,{ref:n,get time(){return g.loopTime}})]},Zt=y("<div>skip"),Qt=y('<button class="btn mt-8">add'),Wt=y('<button class="btn mt-8">remove'),te=y('<button class="btn mt-8">clear'),ee=t=>{const[e,n]=v([]);L(()=>{if(e().length){const l=t.player();t.ref({checkInputsValues:()=>e().forEach(i=>i.checkInputsValues()),startTime:e().map(i=>i.startTime),endTime:e().map(i=>i.endTime),apply:i=>{if(!l)return;const c=l.getCurrentTime();i.forEach(u=>{u.end!==0&&c>=u.start&&c<u.end&&l.seekTo(u.end)})}})}});const r=()=>{g.skipTime.push({start:0,end:0})},o=()=>{g.skipTime.length!==1&&(g.skipTime.splice(-1),n([...e()].splice(-1)))},s=()=>{g.skipTime=g.skipTime.map(()=>({start:0,end:0})),e().forEach(l=>l.clearValues())};return[(()=>{const l=Zt();return l.style.setProperty("text-align","center"),l})(),w(Nt,{get each(){return g.skipTime},children:(l,i)=>w(xt,{ref:c=>n([...e(),c]),get time(){return g.skipTime[i]}})}),(()=>{const l=Qt();return l.$$click=r,l})(),(()=>{const l=Wt();return l.$$click=o,l})(),(()=>{const l=te();return l.$$click=s,l})()]};q(["click"]);const ne=y('<button class="btn mt-8">apply'),re=y('<button class="btn mt-8">cancel'),oe=()=>{const[t,e]=v(!0),n=document.querySelector("#ytd-player");let[r,o]=v(null),s,l;H(()=>{setTimeout(()=>{n&&o(n.player_)},500)});const i=()=>{const a=localStorage.getItem("yt-time");let f=JSON.parse(a||"[]");const b=new URLSearchParams(window.location.search).get("v");b&&(f.some(x=>x.id===b)?f=f.map(x=>x.id===b?{...x,time:g}:x):f=[...f,{id:b,time:g}],localStorage.setItem("yt-time",JSON.stringify(f)))},c=()=>{const a=s?.startTime()||0,f=s?.endTime()||0,b=[];return s&&(s.checkInputsValues(),g.loopTime={start:a,end:f}),l&&(l.checkInputsValues(),l.startTime.forEach((x,fe)=>{const St=l?.endTime[fe]();St!==void 0&&b.push({start:x(),end:St})}),g.skipTime=b),i(),{loopTimeStart:a,loopTimeEnd:f,skipTime:b}},u=()=>{if(!r())return;const a=t(),{loopTimeStart:f,loopTimeEnd:b,skipTime:x}=c();clearInterval(tt()),et(setInterval(()=>{a?s?.apply(f,b):l?.apply(x)},1e3))},d=()=>{clearInterval(tt()),et(0)};return[w(Gt,{get state(){return t()},setState:a=>{c(),e(a)}}),P((()=>{const a=P(()=>!!t());return()=>a()?w(Yt,{ref:f=>s=f,player:r}):w(ee,{ref:f=>l=f,player:r})})()),(()=>{const a=ne();return a.$$click=u,a})(),(()=>{const a=re();return a.$$click=d,a})()]};q(["click"]);const se=y("<div>"),le=y('<div class="menu__root"><svg class="settings" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z">'),[tt,et]=v(0),[nt,kt]=v(!1),[ie,_t]=v("open");let J=null;const g=Ft({loopTime:{start:0,end:0},skipTime:[{start:0,end:0}]});Jt(({url:t})=>{clearInterval(tt()),et(0),g.loopTime={start:0,end:0},g.skipTime=[{start:0,end:0}],kt(!1);const e=t.split("?")[1],n=new URLSearchParams(e).get("v"),r=localStorage.getItem("yt-time");if(r){const o=JSON.parse(r).find(s=>s.id===n);if(o){const{loopTime:s,skipTime:l}=o.time;g.loopTime=s,g.skipTime=l}}});const ce=()=>{const t=()=>{_t("close"),setTimeout(()=>{kt(!nt()),_t("open")},100)},e=n=>{J&&!n.composedPath().includes(J)&&t()};return L(()=>{nt()?window.addEventListener("click",e):window.removeEventListener("click",e)}),(()=>{const n=le(),r=n.firstChild,o=J;return typeof o=="function"?Bt(o,n):J=n,r.$$click=t,$(n,w(It,{get when(){return nt()},get children(){const s=se();return $(s,w(oe,{})),A(()=>zt(s,`content ${ie()}`)),s}}),null),n})()};q(["click"]);function ue(t,e,n){const r=new MutationObserver((o,s)=>{for(const l of o)e(l,s)});return r.observe(t,{childList:!0,subtree:!0,...n}),()=>r.disconnect()}function Tt({selector:t,target:e=document.body,rejectTimeoutMs:n,signal:r}){return new Promise((o,s)=>{const l=ue(e,(u,d)=>{const a=e.querySelector(t);a&&(d.disconnect(),o(a))}),i={timeout:null,abort:null},c=u=>{i.timeout&&clearTimeout(i.timeout),i.abort&&r.removeEventListener("abort",i.abort),l(),s(u)};n>0&&(i.timeout=setTimeout(()=>c(`${Tt.name} rejected (${n}ms)`),n)),r&&!r.aborted&&(i.abort=()=>c(r.reason),r.addEventListener("abort",i.abort))})}const ae=`#owner .menu__root{position:relative;margin-left:10px}#owner .menu__root .settings{cursor:pointer;transition:.3s;user-select:none}#owner .menu__root .settings:hover{transform:rotate(180deg) scale(1.1)}#owner .menu__root .content{position:absolute;top:0;left:30px;background:#1c1c1c;border-radius:8px;width:240px;max-height:290px;z-index:100;animation:menuOpen .2s;padding:12px 4px 12px 12px;scrollbar-gutter:stable;box-sizing:border-box;font-size:14px;overflow:auto}#owner .menu__root .content.close{animation:menuClose .1s}#owner .menu__root .content::-webkit-scrollbar{width:8px}#owner .menu__root .content::-webkit-scrollbar-track{background-color:#1c1c1c;border-radius:0 0 8px}#owner .menu__root .content::-webkit-scrollbar-thumb{background:#7b7b7b;border-radius:10px;transform:scaleY(-1)}#owner .menu__root .content .content__wrapper__time{margin-bottom:6px}#owner .menu__root .content .content__wrapper__time .content__time{display:grid;grid-template-columns:60px auto 1fr auto 1fr;align-items:center;gap:4px}#owner .menu__root .content .content__wrapper__time .content__time .loop{display:flex;gap:4px;align-items:center}#owner .menu__root .content input{margin:4px 0;border:none;border-radius:4px;background:#363636;color:#fff;outline:none;width:24px;text-align:center}#owner .menu__root .content input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}#owner .menu__root .content hr{all:revert}@keyframes menuOpen{0%{opacity:.6;transform:scale(0)}to{opacity:1;transform:scale(1)}}@keyframes menuClose{0%{opacity:1;transform:scale(1)}to{opacity:.6;transform:scale(0)}}.mb-6{margin-bottom:6px}.mt-8{margin-top:6px}.btn{font-family:Roboto;font-size:16px;cursor:pointer;border-radius:10px;outline:none;color:#1c1c1c;background:#363636;padding:2px 6px 1px;transition:.4s;border:2px solid #363636;width:100%;color:#fff}.btn:hover{background:#1c1c1c}.switcher{display:flex;justify-content:center;margin-bottom:6px}.switcher .toggle{position:relative;display:block;width:40px;height:20px;cursor:pointer;-webkit-tap-highlight-color:transparent;transform:translateZ(0)}.switcher .toggle:before{content:"";position:relative;top:3px;left:3px;width:34px;height:14px;display:block;background:#9A9999;border-radius:8px;transition:background .2s linear}.switcher .toggle span{position:absolute;top:0;left:0;width:20px;height:20px;display:block;background:white;border-radius:10px;box-shadow:0 3px 8px #9a999980;transition:all .2s linear}.switcher #cbx:checked+.toggle span{background:#fff;transform:translate(20px);transition:all .2s cubic-bezier(.8,.4,.3,1.25) linear;box-shadow:0 3px 8px #fff3}
`;GM_addStyle(ae),Tt({selector:"#owner"}).then(t=>{Lt(()=>w(ce,{}),t)})})();
