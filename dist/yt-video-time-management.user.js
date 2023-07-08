// ==UserScript==
// @name        yt-video-time-management
// @version     2.0.1
// @description extension for video time management
// @match       https://www.youtube.com/watch?*
// @icon        https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// ==/UserScript==

(function(){"use strict";const St=(t,e)=>t===e,k=Symbol("solid-proxy"),U=Symbol("solid-track"),E={equals:St};let tt=st;const A=1,I=2,et={owned:null,cleanups:null,context:null,owner:null};var h=null;let K=null,d=null,m=null,S=null,M=0;function G(t,e){const n=d,r=h,o=t.length===0,s=o?et:{owned:null,cleanups:null,context:null,owner:e===void 0?r:e},l=o?t:()=>t(()=>x(()=>L(s)));h=s,d=null;try{return $(l,!0)}finally{d=n,h=r}}function T(t,e){e=e?Object.assign({},E,e):E;const n={value:t,observers:null,observerSlots:null,comparator:e.equals||void 0},r=o=>(typeof o=="function"&&(o=o(n.value)),ot(n,o));return[rt.bind(n),r]}function O(t,e,n){const r=X(t,e,!1,A);C(r)}function H(t,e,n){tt=Ot;const r=X(t,e,!1,A);(!n||!n.render)&&(r.user=!0),S?S.push(r):C(r)}function j(t,e,n){n=n?Object.assign({},E,n):E;const r=X(t,e,!0,0);return r.observers=null,r.observerSlots=null,r.comparator=n.equals||void 0,C(r),rt.bind(r)}function q(t){return $(t,!1)}function x(t){if(d===null)return t();const e=d;d=null;try{return t()}finally{d=e}}function B(t){H(()=>x(t))}function kt(t){return h===null||(h.cleanups===null?h.cleanups=[t]:h.cleanups.push(t)),t}function nt(){return d}function rt(){if(this.sources&&this.state)if(this.state===A)C(this);else{const t=m;m=null,$(()=>V(this),!1),m=t}if(d){const t=this.observers?this.observers.length:0;d.sources?(d.sources.push(this),d.sourceSlots.push(t)):(d.sources=[this],d.sourceSlots=[t]),this.observers?(this.observers.push(d),this.observerSlots.push(d.sources.length-1)):(this.observers=[d],this.observerSlots=[d.sources.length-1])}return this.value}function ot(t,e,n){let r=t.value;return(!t.comparator||!t.comparator(r,e))&&(t.value=e,t.observers&&t.observers.length&&$(()=>{for(let o=0;o<t.observers.length;o+=1){const s=t.observers[o],l=K&&K.running;l&&K.disposed.has(s),(l?!s.tState:!s.state)&&(s.pure?m.push(s):S.push(s),s.observers&&lt(s)),l||(s.state=A)}if(m.length>1e6)throw m=[],new Error},!1)),e}function C(t){if(!t.fn)return;L(t);const e=h,n=d,r=M;d=h=t,At(t,t.value,r),d=n,h=e}function At(t,e,n){let r;try{r=t.fn(e)}catch(o){return t.pure&&(t.state=A,t.owned&&t.owned.forEach(L),t.owned=null),t.updatedAt=n+1,it(o)}(!t.updatedAt||t.updatedAt<=n)&&(t.updatedAt!=null&&"observers"in t?ot(t,r):t.value=r,t.updatedAt=n)}function X(t,e,n,r=A,o){const s={fn:t,state:r,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:e,owner:h,context:null,pure:n};return h===null||h!==et&&(h.owned?h.owned.push(s):h.owned=[s]),s}function D(t){if(t.state===0)return;if(t.state===I)return V(t);if(t.suspense&&x(t.suspense.inFallback))return t.suspense.effects.push(t);const e=[t];for(;(t=t.owner)&&(!t.updatedAt||t.updatedAt<M);)t.state&&e.push(t);for(let n=e.length-1;n>=0;n--)if(t=e[n],t.state===A)C(t);else if(t.state===I){const r=m;m=null,$(()=>V(t,e[0]),!1),m=r}}function $(t,e){if(m)return t();let n=!1;e||(m=[]),S?n=!0:S=[],M++;try{const r=t();return xt(n),r}catch(r){n||(S=null),m=null,it(r)}}function xt(t){if(m&&(st(m),m=null),t)return;const e=S;S=null,e.length&&$(()=>tt(e),!1)}function st(t){for(let e=0;e<t.length;e++)D(t[e])}function Ot(t){let e,n=0;for(e=0;e<t.length;e++){const r=t[e];r.user?t[n++]=r:D(r)}for(e=0;e<n;e++)D(t[e])}function V(t,e){t.state=0;for(let n=0;n<t.sources.length;n+=1){const r=t.sources[n];if(r.sources){const o=r.state;o===A?r!==e&&(!r.updatedAt||r.updatedAt<M)&&D(r):o===I&&V(r,e)}}}function lt(t){for(let e=0;e<t.observers.length;e+=1){const n=t.observers[e];n.state||(n.state=I,n.pure?m.push(n):S.push(n),n.observers&&lt(n))}}function L(t){let e;if(t.sources)for(;t.sources.length;){const n=t.sources.pop(),r=t.sourceSlots.pop(),o=n.observers;if(o&&o.length){const s=o.pop(),l=n.observerSlots.pop();r<o.length&&(s.sourceSlots[l]=r,o[r]=s,n.observerSlots[r]=l)}}if(t.owned){for(e=t.owned.length-1;e>=0;e--)L(t.owned[e]);t.owned=null}if(t.cleanups){for(e=t.cleanups.length-1;e>=0;e--)t.cleanups[e]();t.cleanups=null}t.state=0,t.context=null}function it(t){throw t}const ct=Symbol("fallback");function ut(t){for(let e=0;e<t.length;e++)t[e]()}function $t(t,e,n={}){let r=[],o=[],s=[],l=[],i=0,c;return kt(()=>ut(s)),()=>{const u=t()||[];return u[U],x(()=>{if(u.length===0)return i!==0&&(ut(s),s=[],r=[],o=[],i=0,l=[]),n.fallback&&(r=[ct],o[0]=G(a=>(s[0]=a,n.fallback())),i=1),o;for(r[0]===ct&&(s[0](),s=[],r=[],o=[],i=0),c=0;c<u.length;c++)c<r.length&&r[c]!==u[c]?l[c](()=>u[c]):c>=r.length&&(o[c]=G(p));for(;c<r.length;c++)s[c]();return i=l.length=s.length=u.length,r=u.slice(0),o=o.slice(0,i)});function p(a){s[c]=a;const[f,g]=T(u[c]);return l[c]=g,e(f,c)}}}function v(t,e){return x(()=>t(e||{}))}const _t=t=>`Stale read from <${t}>.`;function Pt(t){const e="fallback"in t&&{fallback:()=>t.fallback};return j($t(()=>t.each,t.children,e||void 0))}function jt(t){const e=t.keyed,n=j(()=>t.when,void 0,{equals:(r,o)=>e?r===o:!r==!o});return j(()=>{const r=n();if(r){const o=t.children;return typeof o=="function"&&o.length>0?x(()=>o(e?r:()=>{if(!x(n))throw _t("Show");return t.when})):o}return t.fallback},void 0,void 0)}function Ct(t,e,n){let r=n.length,o=e.length,s=r,l=0,i=0,c=e[o-1].nextSibling,u=null;for(;l<o||i<s;){if(e[l]===n[i]){l++,i++;continue}for(;e[o-1]===n[s-1];)o--,s--;if(o===l){const p=s<r?i?n[i-1].nextSibling:n[s-i]:c;for(;i<s;)t.insertBefore(n[i++],p)}else if(s===i)for(;l<o;)(!u||!u.has(e[l]))&&e[l].remove(),l++;else if(e[l]===n[s-1]&&n[i]===e[o-1]){const p=e[--o].nextSibling;t.insertBefore(n[i++],e[l++].nextSibling),t.insertBefore(n[--s],p),e[o]=n[s]}else{if(!u){u=new Map;let a=i;for(;a<s;)u.set(n[a],a++)}const p=u.get(e[l]);if(p!=null)if(i<p&&p<s){let a=l,f=1,g;for(;++a<o&&a<s&&!((g=u.get(e[a]))==null||g!==p+f);)f++;if(f>p-i){const w=e[l];for(;i<p;)t.insertBefore(n[i++],w)}else t.replaceChild(n[i++],e[l++])}else l++;else e[l++].remove()}}}const at="_$DX_DELEGATE";function Nt(t,e,n,r={}){let o;return G(s=>{o=s,e===document?t():_(e,t(),e.firstChild?null:void 0,n)},r.owner),()=>{o(),e.textContent=""}}function b(t,e,n){let r;const o=()=>{const l=document.createElement("template");return l.innerHTML=t,n?l.content.firstChild.firstChild:l.content.firstChild},s=e?()=>x(()=>document.importNode(r||(r=o()),!0)):()=>(r||(r=o())).cloneNode(!0);return s.cloneNode=s,s}function z(t,e=window.document){const n=e[at]||(e[at]=new Set);for(let r=0,o=t.length;r<o;r++){const s=t[r];n.has(s)||(n.add(s),e.addEventListener(s,It))}}function Et(t,e){e==null?t.removeAttribute("class"):t.className=e}function _(t,e,n,r){if(n!==void 0&&!r&&(r=[]),typeof e!="function")return R(t,e,r,n);O(o=>R(t,e(),o,n),r)}function It(t){const e=`$$${t.type}`;let n=t.composedPath&&t.composedPath()[0]||t.target;for(t.target!==n&&Object.defineProperty(t,"target",{configurable:!0,value:n}),Object.defineProperty(t,"currentTarget",{configurable:!0,get(){return n||document}});n;){const r=n[e];if(r&&!n.disabled){const o=n[`${e}Data`];if(o!==void 0?r.call(n,o,t):r.call(n,t),t.cancelBubble)return}n=n._$host||n.parentNode||n.host}}function R(t,e,n,r,o){for(;typeof n=="function";)n=n();if(e===n)return n;const s=typeof e,l=r!==void 0;if(t=l&&n[0]&&n[0].parentNode||t,s==="string"||s==="number")if(s==="number"&&(e=e.toString()),l){let i=n[0];i&&i.nodeType===3?i.data=e:i=document.createTextNode(e),n=P(t,n,r,i)}else n!==""&&typeof n=="string"?n=t.firstChild.data=e:n=t.textContent=e;else if(e==null||s==="boolean")n=P(t,n,r);else{if(s==="function")return O(()=>{let i=e();for(;typeof i=="function";)i=i();n=R(t,i,n,r)}),()=>n;if(Array.isArray(e)){const i=[],c=n&&Array.isArray(n);if(Q(i,e,n,o))return O(()=>n=R(t,i,n,r,!0)),()=>n;if(i.length===0){if(n=P(t,n,r),l)return n}else c?n.length===0?ft(t,i,r):Ct(t,n,i):(n&&P(t),ft(t,i));n=i}else if(e.nodeType){if(Array.isArray(n)){if(l)return n=P(t,n,r,e);P(t,n,null,e)}else n==null||n===""||!t.firstChild?t.appendChild(e):t.replaceChild(e,t.firstChild);n=e}else console.warn("Unrecognized value. Skipped inserting",e)}return n}function Q(t,e,n,r){let o=!1;for(let s=0,l=e.length;s<l;s++){let i=e[s],c=n&&n[s],u;if(!(i==null||i===!0||i===!1))if((u=typeof i)=="object"&&i.nodeType)t.push(i);else if(Array.isArray(i))o=Q(t,i,c)||o;else if(u==="function")if(r){for(;typeof i=="function";)i=i();o=Q(t,Array.isArray(i)?i:[i],Array.isArray(c)?c:[c])||o}else t.push(i),o=!0;else{const p=String(i);c&&c.nodeType===3&&c.data===p?t.push(c):t.push(document.createTextNode(p))}}return o}function ft(t,e,n=null){for(let r=0,o=e.length;r<o;r++)t.insertBefore(e[r],n)}function P(t,e,n,r){if(n===void 0)return t.textContent="";const o=r||document.createTextNode("");if(e.length){let s=!1;for(let l=e.length-1;l>=0;l--){const i=e[l];if(o!==i){const c=i.parentNode===t;!s&&!l?c?t.replaceChild(o,i):t.insertBefore(o,n):c&&i.remove()}else s=!0}}else t.insertBefore(o,n);return[o]}const W=Symbol("store-raw"),N=Symbol("store-node");function dt(t){let e;return t!=null&&typeof t=="object"&&(t[k]||!(e=Object.getPrototypeOf(t))||e===Object.prototype||Array.isArray(t))}function F(t,e=new Set){let n,r,o,s;if(n=t!=null&&t[W])return n;if(!dt(t)||e.has(t))return t;if(Array.isArray(t)){Object.isFrozen(t)?t=t.slice(0):e.add(t);for(let l=0,i=t.length;l<i;l++)o=t[l],(r=F(o,e))!==o&&(t[l]=r)}else{Object.isFrozen(t)?t=Object.assign({},t):e.add(t);const l=Object.keys(t),i=Object.getOwnPropertyDescriptors(t);for(let c=0,u=l.length;c<u;c++)s=l[c],!i[s].get&&(o=t[s],(r=F(o,e))!==o&&(t[s]=r))}return t}function Y(t){let e=t[N];return e||Object.defineProperty(t,N,{value:e=Object.create(null)}),e}function Z(t,e,n){return t[e]||(t[e]=ht(n))}function pt(t){if(nt()){const e=Y(t);(e._||(e._=ht()))()}}function Mt(t){return pt(t),Reflect.ownKeys(t)}function ht(t){const[e,n]=T(t,{equals:!1,internal:!0});return e.$=n,e}function mt(t,e,n,r=!1){if(!r&&t[e]===n)return;const o=t[e],s=t.length;n===void 0?delete t[e]:t[e]=n;let l=Y(t),i;if((i=Z(l,e,o))&&i.$(()=>n),Array.isArray(t)&&t.length!==s){for(let c=t.length;c<s;c++)(i=l[c])&&i.$();(i=Z(l,"length",s))&&i.$(t.length)}(i=l._)&&i.$()}function qt(t,e){const n=Reflect.getOwnPropertyDescriptor(t,e);return!n||n.get||n.set||!n.configurable||e===k||e===N||(delete n.value,delete n.writable,n.get=()=>t[k][e],n.set=r=>t[k][e]=r),n}const Bt={get(t,e,n){if(e===W)return t;if(e===k)return n;if(e===U)return pt(t),n;const r=Y(t),o=r[e];let s=o?o():t[e];if(e===N||e==="__proto__")return s;if(!o){const l=Object.getOwnPropertyDescriptor(t,e),i=typeof s=="function";if(nt()&&(!i||t.hasOwnProperty(e))&&!(l&&l.get))s=Z(r,e,s)();else if(s!=null&&i&&s===Array.prototype[e])return(...c)=>q(()=>Array.prototype[e].apply(n,c))}return dt(s)?gt(s):s},has(t,e){return e===W||e===k||e===U||e===N||e==="__proto__"?!0:(this.get(t,e,t),e in t)},set(t,e,n){return q(()=>mt(t,e,F(n))),!0},deleteProperty(t,e){return q(()=>mt(t,e,void 0,!0)),!0},ownKeys:Mt,getOwnPropertyDescriptor:qt};function gt(t){let e=t[k];if(!e){Object.defineProperty(t,k,{value:e=new Proxy(t,Bt)});const n=Object.keys(t),r=Object.getOwnPropertyDescriptors(t);for(let o=0,s=n.length;o<s;o++){const l=n[o];if(r[l].get){const i=r[l].get.bind(e);Object.defineProperty(t,l,{get:i})}if(r[l].set){const i=r[l].set;Object.defineProperty(t,l,{set:c=>q(()=>i.call(e,c))})}}}return e}function Dt(t,e){const n=F(t||{});return gt(n)}const Vt=b('<div class="switcher"><input type="checkbox" id="cbx" style="display:none"><label for="cbx" class="toggle"><span>'),Lt=t=>(()=>{const e=Vt(),n=e.firstChild;return n.addEventListener("change",()=>t.setState(!t.state)),O(()=>n.checked=!t.state),e})(),zt=b('<div class="content__time"><div> </div><div>min</div><input type="number" min="0" max="60" maxlength="2"><div>sec</div><input type="number" min="0" max="60" maxlength="2">'),yt=t=>{const[e,n]=T(Math.floor(t.time/60)),[r,o]=T(t.time%60);return t.ref({allTime:()=>e()*60+r(),min:e,sec:r,setMin:n,setSec:o}),B(()=>{n(Math.floor(t.time/60)),o(t.time%60)}),(()=>{const s=zt(),l=s.firstChild,i=l.firstChild,c=l.nextSibling,u=c.nextSibling,p=u.nextSibling,a=p.nextSibling;return _(l,()=>t.title,i),u.$$input=f=>n(Number(f.target.value)),a.$$input=f=>o(Number(f.target.value)),O(()=>u.value=e()),O(()=>a.value=r()),s})()};z(["input"]);const Rt=b('<div class="content__wrapper__time">'),bt=t=>{let e,n;const r=()=>{!e||!n||(n.allTime()<e.allTime()&&n.setSec(e.sec()),n.allTime()<e.allTime()&&n.setMin(e.min()))};return B(()=>{!e||!n||t.ref({startTime:e.allTime,endTime:n.allTime,checkInputsValues:r,clearValues:()=>{!e||!n||(e.setMin(0),e.setSec(0),n.setMin(0),n.setSec(0))}})}),(()=>{const o=Rt();return _(o,v(yt,{title:"start",get time(){return t.time.start},ref:s=>e=s}),null),_(o,v(yt,{title:"end",get time(){return t.time.end},ref:s=>n=s}),null),o})()},Ft=b("<div>loop"),Jt=t=>{const[e,n]=T();return H(()=>{const r=e();if(r){const o=t.player();t.ref({checkInputsValues:r.checkInputsValues,startTime:r.startTime,endTime:r.endTime,apply:(s,l)=>{if(!o)return;const i=o.getCurrentTime();l!==0&&(i>=l||i<s)&&o.seekTo(s)}});return}}),[(()=>{const r=Ft();return r.style.setProperty("text-align","center"),r})(),v(bt,{ref:n,get time(){return y.loopTime}})]},Ut=b("<div>skip"),Kt=b('<button class="btn mt-8">add'),Gt=b('<button class="btn mt-8">remove'),Ht=b('<button class="btn mt-8">clear'),Xt=t=>{const[e,n]=T([]);H(()=>{if(e().length){const l=t.player();t.ref({checkInputsValues:()=>e().forEach(i=>i.checkInputsValues()),startTime:e().map(i=>i.startTime),endTime:e().map(i=>i.endTime),apply:i=>{if(!l)return;const c=l.getCurrentTime();i.forEach(u=>{u.end!==0&&c>=u.start&&c<u.end&&l.seekTo(u.end)})}})}});const r=()=>{y.skipTime.push({start:0,end:0})},o=()=>{y.skipTime.length!==1&&(y.skipTime.splice(-1),n([...e()].splice(-1)))},s=()=>{y.skipTime=y.skipTime.map(()=>({start:0,end:0})),e().forEach(l=>l.clearValues())};return[(()=>{const l=Ut();return l.style.setProperty("text-align","center"),l})(),v(Pt,{get each(){return y.skipTime},children:(l,i)=>v(bt,{ref:c=>n([...e(),c]),get time(){return y.skipTime[i]}})}),(()=>{const l=Kt();return l.$$click=r,l})(),(()=>{const l=Gt();return l.$$click=o,l})(),(()=>{const l=Ht();return l.$$click=s,l})()]};z(["click"]);const Qt=b('<button class="btn mt-8">apply'),Wt=b('<button class="btn mt-8">cancel');let J=0;const Yt=()=>{const[t,e]=T(!0),n=document.querySelector("#ytd-player");let[r,o]=T(null),s,l;B(()=>{setTimeout(()=>{n&&o(n.player_)},500)});const i=()=>{const a=localStorage.getItem("yt-time");let f=JSON.parse(a||"[]");const g=new URLSearchParams(window.location.search).get("v");g&&(f.some(w=>w.id===g)?f=f.map(w=>w.id===g?{...w,time:y}:w):f=[...f,{id:g,time:y}],localStorage.setItem("yt-time",JSON.stringify(f)))},c=()=>{const a=s?.startTime()||0,f=s?.endTime()||0,g=[];return s&&(s.checkInputsValues(),y.loopTime={start:a,end:f}),l&&(l.checkInputsValues(),l.startTime.forEach((w,oe)=>{const Tt=l?.endTime[oe]();Tt!==void 0&&g.push({start:w(),end:Tt})}),y.skipTime=g),i(),{loopTimeStart:a,loopTimeEnd:f,skipTime:g}},u=()=>{if(!r())return;const a=t(),{loopTimeStart:f,loopTimeEnd:g,skipTime:w}=c();clearInterval(J),J=setInterval(()=>{a?s?.apply(f,g):l?.apply(w)},1e3)},p=()=>{clearInterval(J),J=0};return[v(Lt,{get state(){return t()},setState:a=>{c(),e(a)}}),j((()=>{const a=j(()=>!!t());return()=>a()?v(Jt,{ref:f=>s=f,player:r}):v(Xt,{ref:f=>l=f,player:r})})()),(()=>{const a=Qt();return a.$$click=u,a})(),(()=>{const a=Wt();return a.$$click=p,a})()]};z(["click"]);const Zt=b("<div>"),te=b('<div class="menu__root"><svg class="settings" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z">'),[vt,ee]=T(!1),[ne,wt]=T("open"),y=Dt({loopTime:{start:0,end:0},skipTime:[{start:0,end:0}]}),re=()=>{const t=()=>{wt("close"),setTimeout(()=>{ee(!vt()),wt("open")},100)};return B(()=>{const e=new URLSearchParams(window.location.search).get("v"),n=localStorage.getItem("yt-time");if(n){const r=JSON.parse(n).find(o=>o.id===e);if(r){const{loopTime:o,skipTime:s}=r.time;y.loopTime=o,y.skipTime=s}}}),(()=>{const e=te(),n=e.firstChild;return n.$$click=t,_(e,v(jt,{get when(){return vt()},get children(){const r=Zt();return _(r,v(Yt,{})),O(()=>Et(r,`content ${ne()}`)),r}}),null),e})()};z(["click"]),((t,e)=>{const n=e?.timeDisconnect??1e4;return new Promise(r=>{const o=document.querySelector(t);if(o)return r(o);const s=new MutationObserver(l=>{const i=document.querySelector(t);i&&(r(i),s.disconnect())});setTimeout(()=>{document.querySelector(t)||s.disconnect()},n),s.observe(document.body,{childList:!0,subtree:!0})})})("#owner").then(t=>{Nt(()=>v(re,{}),t)})})();
