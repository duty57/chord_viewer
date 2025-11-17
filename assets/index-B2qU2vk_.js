(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();/**
* @vue/shared v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function ho(e){const t=Object.create(null);for(const n of e.split(","))t[n]=1;return n=>n in t}const le={},$n=[],At=()=>{},il=()=>!1,Ds=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),po=e=>e.startsWith("onUpdate:"),xe=Object.assign,mo=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)},vd=Object.prototype.hasOwnProperty,se=(e,t)=>vd.call(e,t),G=Array.isArray,Hn=e=>Ls(e)==="[object Map]",ol=e=>Ls(e)==="[object Set]",z=e=>typeof e=="function",ve=e=>typeof e=="string",mn=e=>typeof e=="symbol",he=e=>e!==null&&typeof e=="object",al=e=>(he(e)||z(e))&&z(e.then)&&z(e.catch),cl=Object.prototype.toString,Ls=e=>cl.call(e),Ed=e=>Ls(e).slice(8,-1),ll=e=>Ls(e)==="[object Object]",go=e=>ve(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,dr=ho(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Ms=e=>{const t=Object.create(null);return(n=>t[n]||(t[n]=e(n)))},Id=/-\w/g,tt=Ms(e=>e.replace(Id,t=>t.slice(1).toUpperCase())),Td=/\B([A-Z])/g,gn=Ms(e=>e.replace(Td,"-$1").toLowerCase()),Us=Ms(e=>e.charAt(0).toUpperCase()+e.slice(1)),si=Ms(e=>e?`on${Us(e)}`:""),cn=(e,t)=>!Object.is(e,t),es=(e,...t)=>{for(let n=0;n<e.length;n++)e[n](...t)},ul=(e,t,n,r=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:r,value:n})},xi=e=>{const t=parseFloat(e);return isNaN(t)?e:t};let ia;const Fs=()=>ia||(ia=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function an(e){if(G(e)){const t={};for(let n=0;n<e.length;n++){const r=e[n],s=ve(r)?Rd(r):an(r);if(s)for(const i in s)t[i]=s[i]}return t}else if(ve(e)||he(e))return e}const Cd=/;(?![^(]*\))/g,Sd=/:([^]+)/,Ad=/\/\*[^]*?\*\//g;function Rd(e){const t={};return e.replace(Ad,"").split(Cd).forEach(n=>{if(n){const r=n.split(Sd);r.length>1&&(t[r[0].trim()]=r[1].trim())}}),t}function St(e){let t="";if(ve(e))t=e;else if(G(e))for(let n=0;n<e.length;n++){const r=St(e[n]);r&&(t+=r+" ")}else if(he(e))for(const n in e)e[n]&&(t+=n+" ");return t.trim()}const Pd="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Od=ho(Pd);function fl(e){return!!e||e===""}const dl=e=>!!(e&&e.__v_isRef===!0),Te=e=>ve(e)?e:e==null?"":G(e)||he(e)&&(e.toString===cl||!z(e.toString))?dl(e)?Te(e.value):JSON.stringify(e,hl,2):String(e),hl=(e,t)=>dl(t)?hl(e,t.value):Hn(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((n,[r,s],i)=>(n[ii(r,i)+" =>"]=s,n),{})}:ol(t)?{[`Set(${t.size})`]:[...t.values()].map(n=>ii(n))}:mn(t)?ii(t):he(t)&&!G(t)&&!ll(t)?String(t):t,ii=(e,t="")=>{var n;return mn(e)?`Symbol(${(n=e.description)!=null?n:t})`:e};/**
* @vue/reactivity v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let He;class pl{constructor(t=!1){this.detached=t,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=He,!t&&He&&(this.index=(He.scopes||(He.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let t,n;if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].pause();for(t=0,n=this.effects.length;t<n;t++)this.effects[t].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let t,n;if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].resume();for(t=0,n=this.effects.length;t<n;t++)this.effects[t].resume()}}run(t){if(this._active){const n=He;try{return He=this,t()}finally{He=n}}}on(){++this._on===1&&(this.prevScope=He,He=this)}off(){this._on>0&&--this._on===0&&(He=this.prevScope,this.prevScope=void 0)}stop(t){if(this._active){this._active=!1;let n,r;for(n=0,r=this.effects.length;n<r;n++)this.effects[n].stop();for(this.effects.length=0,n=0,r=this.cleanups.length;n<r;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){for(n=0,r=this.scopes.length;n<r;n++)this.scopes[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!t){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function kd(e){return new pl(e)}function Nd(){return He}let fe;const oi=new WeakSet;class ml{constructor(t){this.fn=t,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,He&&He.active&&He.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,oi.has(this)&&(oi.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||_l(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,oa(this),yl(this);const t=fe,n=lt;fe=this,lt=!0;try{return this.fn()}finally{bl(this),fe=t,lt=n,this.flags&=-3}}stop(){if(this.flags&1){for(let t=this.deps;t;t=t.nextDep)bo(t);this.deps=this.depsTail=void 0,oa(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?oi.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Di(this)&&this.run()}get dirty(){return Di(this)}}let gl=0,hr,pr;function _l(e,t=!1){if(e.flags|=8,t){e.next=pr,pr=e;return}e.next=hr,hr=e}function _o(){gl++}function yo(){if(--gl>0)return;if(pr){let t=pr;for(pr=void 0;t;){const n=t.next;t.next=void 0,t.flags&=-9,t=n}}let e;for(;hr;){let t=hr;for(hr=void 0;t;){const n=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(r){e||(e=r)}t=n}}if(e)throw e}function yl(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function bl(e){let t,n=e.depsTail,r=n;for(;r;){const s=r.prevDep;r.version===-1?(r===n&&(n=s),bo(r),xd(r)):t=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=s}e.deps=t,e.depsTail=n}function Di(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(wl(t.dep.computed)||t.dep.version!==t.version))return!0;return!!e._dirty}function wl(e){if(e.flags&4&&!(e.flags&16)||(e.flags&=-17,e.globalVersion===Er)||(e.globalVersion=Er,!e.isSSR&&e.flags&128&&(!e.deps&&!e._dirty||!Di(e))))return;e.flags|=2;const t=e.dep,n=fe,r=lt;fe=e,lt=!0;try{yl(e);const s=e.fn(e._value);(t.version===0||cn(s,e._value))&&(e.flags|=128,e._value=s,t.version++)}catch(s){throw t.version++,s}finally{fe=n,lt=r,bl(e),e.flags&=-3}}function bo(e,t=!1){const{dep:n,prevSub:r,nextSub:s}=e;if(r&&(r.nextSub=s,e.prevSub=void 0),s&&(s.prevSub=r,e.nextSub=void 0),n.subs===e&&(n.subs=r,!r&&n.computed)){n.computed.flags&=-5;for(let i=n.computed.deps;i;i=i.nextDep)bo(i,!0)}!t&&!--n.sc&&n.map&&n.map.delete(n.key)}function xd(e){const{prevDep:t,nextDep:n}=e;t&&(t.nextDep=n,e.prevDep=void 0),n&&(n.prevDep=t,e.nextDep=void 0)}let lt=!0;const vl=[];function Wt(){vl.push(lt),lt=!1}function qt(){const e=vl.pop();lt=e===void 0?!0:e}function oa(e){const{cleanup:t}=e;if(e.cleanup=void 0,t){const n=fe;fe=void 0;try{t()}finally{fe=n}}}let Er=0;class Dd{constructor(t,n){this.sub=t,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class wo{constructor(t){this.computed=t,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(t){if(!fe||!lt||fe===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==fe)n=this.activeLink=new Dd(fe,this),fe.deps?(n.prevDep=fe.depsTail,fe.depsTail.nextDep=n,fe.depsTail=n):fe.deps=fe.depsTail=n,El(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const r=n.nextDep;r.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=r),n.prevDep=fe.depsTail,n.nextDep=void 0,fe.depsTail.nextDep=n,fe.depsTail=n,fe.deps===n&&(fe.deps=r)}return n}trigger(t){this.version++,Er++,this.notify(t)}notify(t){_o();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{yo()}}}function El(e){if(e.dep.sc++,e.sub.flags&4){const t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let r=t.deps;r;r=r.nextDep)El(r)}const n=e.dep.subs;n!==e&&(e.prevSub=n,n&&(n.nextSub=e)),e.dep.subs=e}}const Li=new WeakMap,Sn=Symbol(""),Mi=Symbol(""),Ir=Symbol("");function Re(e,t,n){if(lt&&fe){let r=Li.get(e);r||Li.set(e,r=new Map);let s=r.get(n);s||(r.set(n,s=new wo),s.map=r,s.key=n),s.track()}}function Ut(e,t,n,r,s,i){const o=Li.get(e);if(!o){Er++;return}const a=c=>{c&&c.trigger()};if(_o(),t==="clear")o.forEach(a);else{const c=G(e),l=c&&go(n);if(c&&n==="length"){const u=Number(r);o.forEach((f,d)=>{(d==="length"||d===Ir||!mn(d)&&d>=u)&&a(f)})}else switch((n!==void 0||o.has(void 0))&&a(o.get(n)),l&&a(o.get(Ir)),t){case"add":c?l&&a(o.get("length")):(a(o.get(Sn)),Hn(e)&&a(o.get(Mi)));break;case"delete":c||(a(o.get(Sn)),Hn(e)&&a(o.get(Mi)));break;case"set":Hn(e)&&a(o.get(Sn));break}}yo()}function Mn(e){const t=re(e);return t===e?t:(Re(t,"iterate",Ir),et(e)?t:t.map(Se))}function Bs(e){return Re(e=re(e),"iterate",Ir),e}const Ld={__proto__:null,[Symbol.iterator](){return ai(this,Symbol.iterator,Se)},concat(...e){return Mn(this).concat(...e.map(t=>G(t)?Mn(t):t))},entries(){return ai(this,"entries",e=>(e[1]=Se(e[1]),e))},every(e,t){return Dt(this,"every",e,t,void 0,arguments)},filter(e,t){return Dt(this,"filter",e,t,n=>n.map(Se),arguments)},find(e,t){return Dt(this,"find",e,t,Se,arguments)},findIndex(e,t){return Dt(this,"findIndex",e,t,void 0,arguments)},findLast(e,t){return Dt(this,"findLast",e,t,Se,arguments)},findLastIndex(e,t){return Dt(this,"findLastIndex",e,t,void 0,arguments)},forEach(e,t){return Dt(this,"forEach",e,t,void 0,arguments)},includes(...e){return ci(this,"includes",e)},indexOf(...e){return ci(this,"indexOf",e)},join(e){return Mn(this).join(e)},lastIndexOf(...e){return ci(this,"lastIndexOf",e)},map(e,t){return Dt(this,"map",e,t,void 0,arguments)},pop(){return ir(this,"pop")},push(...e){return ir(this,"push",e)},reduce(e,...t){return aa(this,"reduce",e,t)},reduceRight(e,...t){return aa(this,"reduceRight",e,t)},shift(){return ir(this,"shift")},some(e,t){return Dt(this,"some",e,t,void 0,arguments)},splice(...e){return ir(this,"splice",e)},toReversed(){return Mn(this).toReversed()},toSorted(e){return Mn(this).toSorted(e)},toSpliced(...e){return Mn(this).toSpliced(...e)},unshift(...e){return ir(this,"unshift",e)},values(){return ai(this,"values",Se)}};function ai(e,t,n){const r=Bs(e),s=r[t]();return r!==e&&!et(e)&&(s._next=s.next,s.next=()=>{const i=s._next();return i.done||(i.value=n(i.value)),i}),s}const Md=Array.prototype;function Dt(e,t,n,r,s,i){const o=Bs(e),a=o!==e&&!et(e),c=o[t];if(c!==Md[t]){const f=c.apply(e,i);return a?Se(f):f}let l=n;o!==e&&(a?l=function(f,d){return n.call(this,Se(f),d,e)}:n.length>2&&(l=function(f,d){return n.call(this,f,d,e)}));const u=c.call(o,l,r);return a&&s?s(u):u}function aa(e,t,n,r){const s=Bs(e);let i=n;return s!==e&&(et(e)?n.length>3&&(i=function(o,a,c){return n.call(this,o,a,c,e)}):i=function(o,a,c){return n.call(this,o,Se(a),c,e)}),s[t](i,...r)}function ci(e,t,n){const r=re(e);Re(r,"iterate",Ir);const s=r[t](...n);return(s===-1||s===!1)&&Io(n[0])?(n[0]=re(n[0]),r[t](...n)):s}function ir(e,t,n=[]){Wt(),_o();const r=re(e)[t].apply(e,n);return yo(),qt(),r}const Ud=ho("__proto__,__v_isRef,__isVue"),Il=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(mn));function Fd(e){mn(e)||(e=String(e));const t=re(this);return Re(t,"has",e),t.hasOwnProperty(e)}class Tl{constructor(t=!1,n=!1){this._isReadonly=t,this._isShallow=n}get(t,n,r){if(n==="__v_skip")return t.__v_skip;const s=this._isReadonly,i=this._isShallow;if(n==="__v_isReactive")return!s;if(n==="__v_isReadonly")return s;if(n==="__v_isShallow")return i;if(n==="__v_raw")return r===(s?i?Kd:Rl:i?Al:Sl).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(r)?t:void 0;const o=G(t);if(!s){let c;if(o&&(c=Ld[n]))return c;if(n==="hasOwnProperty")return Fd}const a=Reflect.get(t,n,Ne(t)?t:r);if((mn(n)?Il.has(n):Ud(n))||(s||Re(t,"get",n),i))return a;if(Ne(a)){const c=o&&go(n)?a:a.value;return s&&he(c)?Fi(c):c}return he(a)?s?Fi(a):dn(a):a}}class Cl extends Tl{constructor(t=!1){super(!1,t)}set(t,n,r,s){let i=t[n];if(!this._isShallow){const c=hn(i);if(!et(r)&&!hn(r)&&(i=re(i),r=re(r)),!G(t)&&Ne(i)&&!Ne(r))return c||(i.value=r),!0}const o=G(t)&&go(n)?Number(n)<t.length:se(t,n),a=Reflect.set(t,n,r,Ne(t)?t:s);return t===re(s)&&(o?cn(r,i)&&Ut(t,"set",n,r):Ut(t,"add",n,r)),a}deleteProperty(t,n){const r=se(t,n);t[n];const s=Reflect.deleteProperty(t,n);return s&&r&&Ut(t,"delete",n,void 0),s}has(t,n){const r=Reflect.has(t,n);return(!mn(n)||!Il.has(n))&&Re(t,"has",n),r}ownKeys(t){return Re(t,"iterate",G(t)?"length":Sn),Reflect.ownKeys(t)}}class Bd extends Tl{constructor(t=!1){super(!0,t)}set(t,n){return!0}deleteProperty(t,n){return!0}}const $d=new Cl,Hd=new Bd,Vd=new Cl(!0);const Ui=e=>e,qr=e=>Reflect.getPrototypeOf(e);function jd(e,t,n){return function(...r){const s=this.__v_raw,i=re(s),o=Hn(i),a=e==="entries"||e===Symbol.iterator&&o,c=e==="keys"&&o,l=s[e](...r),u=n?Ui:t?ds:Se;return!t&&Re(i,"iterate",c?Mi:Sn),{next(){const{value:f,done:d}=l.next();return d?{value:f,done:d}:{value:a?[u(f[0]),u(f[1])]:u(f),done:d}},[Symbol.iterator](){return this}}}}function Gr(e){return function(...t){return e==="delete"?!1:e==="clear"?void 0:this}}function Wd(e,t){const n={get(s){const i=this.__v_raw,o=re(i),a=re(s);e||(cn(s,a)&&Re(o,"get",s),Re(o,"get",a));const{has:c}=qr(o),l=t?Ui:e?ds:Se;if(c.call(o,s))return l(i.get(s));if(c.call(o,a))return l(i.get(a));i!==o&&i.get(s)},get size(){const s=this.__v_raw;return!e&&Re(re(s),"iterate",Sn),s.size},has(s){const i=this.__v_raw,o=re(i),a=re(s);return e||(cn(s,a)&&Re(o,"has",s),Re(o,"has",a)),s===a?i.has(s):i.has(s)||i.has(a)},forEach(s,i){const o=this,a=o.__v_raw,c=re(a),l=t?Ui:e?ds:Se;return!e&&Re(c,"iterate",Sn),a.forEach((u,f)=>s.call(i,l(u),l(f),o))}};return xe(n,e?{add:Gr("add"),set:Gr("set"),delete:Gr("delete"),clear:Gr("clear")}:{add(s){!t&&!et(s)&&!hn(s)&&(s=re(s));const i=re(this);return qr(i).has.call(i,s)||(i.add(s),Ut(i,"add",s,s)),this},set(s,i){!t&&!et(i)&&!hn(i)&&(i=re(i));const o=re(this),{has:a,get:c}=qr(o);let l=a.call(o,s);l||(s=re(s),l=a.call(o,s));const u=c.call(o,s);return o.set(s,i),l?cn(i,u)&&Ut(o,"set",s,i):Ut(o,"add",s,i),this},delete(s){const i=re(this),{has:o,get:a}=qr(i);let c=o.call(i,s);c||(s=re(s),c=o.call(i,s)),a&&a.call(i,s);const l=i.delete(s);return c&&Ut(i,"delete",s,void 0),l},clear(){const s=re(this),i=s.size!==0,o=s.clear();return i&&Ut(s,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(s=>{n[s]=jd(s,e,t)}),n}function vo(e,t){const n=Wd(e,t);return(r,s,i)=>s==="__v_isReactive"?!e:s==="__v_isReadonly"?e:s==="__v_raw"?r:Reflect.get(se(n,s)&&s in r?n:r,s,i)}const qd={get:vo(!1,!1)},Gd={get:vo(!1,!0)},zd={get:vo(!0,!1)};const Sl=new WeakMap,Al=new WeakMap,Rl=new WeakMap,Kd=new WeakMap;function Jd(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Yd(e){return e.__v_skip||!Object.isExtensible(e)?0:Jd(Ed(e))}function dn(e){return hn(e)?e:Eo(e,!1,$d,qd,Sl)}function Pl(e){return Eo(e,!1,Vd,Gd,Al)}function Fi(e){return Eo(e,!0,Hd,zd,Rl)}function Eo(e,t,n,r,s){if(!he(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;const i=Yd(e);if(i===0)return e;const o=s.get(e);if(o)return o;const a=new Proxy(e,i===2?r:n);return s.set(e,a),a}function Vn(e){return hn(e)?Vn(e.__v_raw):!!(e&&e.__v_isReactive)}function hn(e){return!!(e&&e.__v_isReadonly)}function et(e){return!!(e&&e.__v_isShallow)}function Io(e){return e?!!e.__v_raw:!1}function re(e){const t=e&&e.__v_raw;return t?re(t):e}function Ol(e){return!se(e,"__v_skip")&&Object.isExtensible(e)&&ul(e,"__v_skip",!0),e}const Se=e=>he(e)?dn(e):e,ds=e=>he(e)?Fi(e):e;function Ne(e){return e?e.__v_isRef===!0:!1}function pe(e){return kl(e,!1)}function Xd(e){return kl(e,!0)}function kl(e,t){return Ne(e)?e:new Qd(e,t)}class Qd{constructor(t,n){this.dep=new wo,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?t:re(t),this._value=n?t:Se(t),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(t){const n=this._rawValue,r=this.__v_isShallow||et(t)||hn(t);t=r?t:re(t),cn(t,n)&&(this._rawValue=t,this._value=r?t:Se(t),this.dep.trigger())}}function be(e){return Ne(e)?e.value:e}const Zd={get:(e,t,n)=>t==="__v_raw"?e:be(Reflect.get(e,t,n)),set:(e,t,n,r)=>{const s=e[t];return Ne(s)&&!Ne(n)?(s.value=n,!0):Reflect.set(e,t,n,r)}};function Nl(e){return Vn(e)?e:new Proxy(e,Zd)}class eh{constructor(t,n,r){this.fn=t,this.setter=n,this._value=void 0,this.dep=new wo(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=Er-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=r}notify(){if(this.flags|=16,!(this.flags&8)&&fe!==this)return _l(this,!0),!0}get value(){const t=this.dep.track();return wl(this),t&&(t.version=this.dep.version),this._value}set value(t){this.setter&&this.setter(t)}}function th(e,t,n=!1){let r,s;return z(e)?r=e:(r=e.get,s=e.set),new eh(r,s,n)}const zr={},hs=new WeakMap;let bn;function nh(e,t=!1,n=bn){if(n){let r=hs.get(n);r||hs.set(n,r=[]),r.push(e)}}function rh(e,t,n=le){const{immediate:r,deep:s,once:i,scheduler:o,augmentJob:a,call:c}=n,l=C=>s?C:et(C)||s===!1||s===0?Ft(C,1):Ft(C);let u,f,d,m,g=!1,b=!1;if(Ne(e)?(f=()=>e.value,g=et(e)):Vn(e)?(f=()=>l(e),g=!0):G(e)?(b=!0,g=e.some(C=>Vn(C)||et(C)),f=()=>e.map(C=>{if(Ne(C))return C.value;if(Vn(C))return l(C);if(z(C))return c?c(C,2):C()})):z(e)?t?f=c?()=>c(e,2):e:f=()=>{if(d){Wt();try{d()}finally{qt()}}const C=bn;bn=u;try{return c?c(e,3,[m]):e(m)}finally{bn=C}}:f=At,t&&s){const C=f,B=s===!0?1/0:s;f=()=>Ft(C(),B)}const w=Nd(),O=()=>{u.stop(),w&&w.active&&mo(w.effects,u)};if(i&&t){const C=t;t=(...B)=>{C(...B),O()}}let I=b?new Array(e.length).fill(zr):zr;const A=C=>{if(!(!(u.flags&1)||!u.dirty&&!C))if(t){const B=u.run();if(s||g||(b?B.some((F,D)=>cn(F,I[D])):cn(B,I))){d&&d();const F=bn;bn=u;try{const D=[B,I===zr?void 0:b&&I[0]===zr?[]:I,m];I=B,c?c(t,3,D):t(...D)}finally{bn=F}}}else u.run()};return a&&a(A),u=new ml(f),u.scheduler=o?()=>o(A,!1):A,m=C=>nh(C,!1,u),d=u.onStop=()=>{const C=hs.get(u);if(C){if(c)c(C,4);else for(const B of C)B();hs.delete(u)}},t?r?A(!0):I=u.run():o?o(A.bind(null,!0),!0):u.run(),O.pause=u.pause.bind(u),O.resume=u.resume.bind(u),O.stop=O,O}function Ft(e,t=1/0,n){if(t<=0||!he(e)||e.__v_skip||(n=n||new Map,(n.get(e)||0)>=t))return e;if(n.set(e,t),t--,Ne(e))Ft(e.value,t,n);else if(G(e))for(let r=0;r<e.length;r++)Ft(e[r],t,n);else if(ol(e)||Hn(e))e.forEach(r=>{Ft(r,t,n)});else if(ll(e)){for(const r in e)Ft(e[r],t,n);for(const r of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,r)&&Ft(e[r],t,n)}return e}/**
* @vue/runtime-core v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function kr(e,t,n,r){try{return r?e(...r):e()}catch(s){$s(s,t,n)}}function Ot(e,t,n,r){if(z(e)){const s=kr(e,t,n,r);return s&&al(s)&&s.catch(i=>{$s(i,t,n)}),s}if(G(e)){const s=[];for(let i=0;i<e.length;i++)s.push(Ot(e[i],t,n,r));return s}}function $s(e,t,n,r=!0){const s=t?t.vnode:null,{errorHandler:i,throwUnhandledErrorInProduction:o}=t&&t.appContext.config||le;if(t){let a=t.parent;const c=t.proxy,l=`https://vuejs.org/error-reference/#runtime-${n}`;for(;a;){const u=a.ec;if(u){for(let f=0;f<u.length;f++)if(u[f](e,c,l)===!1)return}a=a.parent}if(i){Wt(),kr(i,null,10,[e,c,l]),qt();return}}sh(e,n,s,r,o)}function sh(e,t,n,r=!0,s=!1){if(s)throw e;console.error(e)}const Me=[];let Tt=-1;const jn=[];let tn=null,Un=0;const xl=Promise.resolve();let ps=null;function Dl(e){const t=ps||xl;return e?t.then(this?e.bind(this):e):t}function ih(e){let t=Tt+1,n=Me.length;for(;t<n;){const r=t+n>>>1,s=Me[r],i=Tr(s);i<e||i===e&&s.flags&2?t=r+1:n=r}return t}function To(e){if(!(e.flags&1)){const t=Tr(e),n=Me[Me.length-1];!n||!(e.flags&2)&&t>=Tr(n)?Me.push(e):Me.splice(ih(t),0,e),e.flags|=1,Ll()}}function Ll(){ps||(ps=xl.then(Ul))}function oh(e){G(e)?jn.push(...e):tn&&e.id===-1?tn.splice(Un+1,0,e):e.flags&1||(jn.push(e),e.flags|=1),Ll()}function ca(e,t,n=Tt+1){for(;n<Me.length;n++){const r=Me[n];if(r&&r.flags&2){if(e&&r.id!==e.uid)continue;Me.splice(n,1),n--,r.flags&4&&(r.flags&=-2),r(),r.flags&4||(r.flags&=-2)}}}function Ml(e){if(jn.length){const t=[...new Set(jn)].sort((n,r)=>Tr(n)-Tr(r));if(jn.length=0,tn){tn.push(...t);return}for(tn=t,Un=0;Un<tn.length;Un++){const n=tn[Un];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}tn=null,Un=0}}const Tr=e=>e.id==null?e.flags&2?-1:1/0:e.id;function Ul(e){try{for(Tt=0;Tt<Me.length;Tt++){const t=Me[Tt];t&&!(t.flags&8)&&(t.flags&4&&(t.flags&=-2),kr(t,t.i,t.i?15:14),t.flags&4||(t.flags&=-2))}}finally{for(;Tt<Me.length;Tt++){const t=Me[Tt];t&&(t.flags&=-2)}Tt=-1,Me.length=0,Ml(),ps=null,(Me.length||jn.length)&&Ul()}}let ze=null,Fl=null;function ms(e){const t=ze;return ze=e,Fl=e&&e.type.__scopeId||null,t}function ah(e,t=ze,n){if(!t||e._n)return e;const r=(...s)=>{r._d&&bs(-1);const i=ms(t);let o;try{o=e(...s)}finally{ms(i),r._d&&bs(1)}return o};return r._n=!0,r._c=!0,r._d=!0,r}function gs(e,t){if(ze===null)return e;const n=Ws(ze),r=e.dirs||(e.dirs=[]);for(let s=0;s<t.length;s++){let[i,o,a,c=le]=t[s];i&&(z(i)&&(i={mounted:i,updated:i}),i.deep&&Ft(o),r.push({dir:i,instance:n,value:o,oldValue:void 0,arg:a,modifiers:c}))}return e}function _n(e,t,n,r){const s=e.dirs,i=t&&t.dirs;for(let o=0;o<s.length;o++){const a=s[o];i&&(a.oldValue=i[o].value);let c=a.dir[r];c&&(Wt(),Ot(c,n,8,[e.el,a,e,t]),qt())}}const ch=Symbol("_vte"),lh=e=>e.__isTeleport,uh=Symbol("_leaveCb");function Co(e,t){e.shapeFlag&6&&e.component?(e.transition=t,Co(e.component.subTree,t)):e.shapeFlag&128?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function ht(e,t){return z(e)?xe({name:e.name},t,{setup:e}):e}function Bl(e){e.ids=[e.ids[0]+e.ids[2]+++"-",0,0]}const _s=new WeakMap;function mr(e,t,n,r,s=!1){if(G(e)){e.forEach((g,b)=>mr(g,t&&(G(t)?t[b]:t),n,r,s));return}if(gr(r)&&!s){r.shapeFlag&512&&r.type.__asyncResolved&&r.component.subTree.component&&mr(e,t,n,r.component.subTree);return}const i=r.shapeFlag&4?Ws(r.component):r.el,o=s?null:i,{i:a,r:c}=e,l=t&&t.r,u=a.refs===le?a.refs={}:a.refs,f=a.setupState,d=re(f),m=f===le?il:g=>se(d,g);if(l!=null&&l!==c){if(la(t),ve(l))u[l]=null,m(l)&&(f[l]=null);else if(Ne(l)){l.value=null;const g=t;g.k&&(u[g.k]=null)}}if(z(c))kr(c,a,12,[o,u]);else{const g=ve(c),b=Ne(c);if(g||b){const w=()=>{if(e.f){const O=g?m(c)?f[c]:u[c]:c.value;if(s)G(O)&&mo(O,i);else if(G(O))O.includes(i)||O.push(i);else if(g)u[c]=[i],m(c)&&(f[c]=u[c]);else{const I=[i];c.value=I,e.k&&(u[e.k]=I)}}else g?(u[c]=o,m(c)&&(f[c]=o)):b&&(c.value=o,e.k&&(u[e.k]=o))};if(o){const O=()=>{w(),_s.delete(e)};O.id=-1,_s.set(e,O),Ge(O,n)}else la(e),w()}}}function la(e){const t=_s.get(e);t&&(t.flags|=8,_s.delete(e))}Fs().requestIdleCallback;Fs().cancelIdleCallback;const gr=e=>!!e.type.__asyncLoader,$l=e=>e.type.__isKeepAlive;function fh(e,t){Hl(e,"a",t)}function dh(e,t){Hl(e,"da",t)}function Hl(e,t,n=Pe){const r=e.__wdc||(e.__wdc=()=>{let s=n;for(;s;){if(s.isDeactivated)return;s=s.parent}return e()});if(Hs(t,r,n),n){let s=n.parent;for(;s&&s.parent;)$l(s.parent.vnode)&&hh(r,t,n,s),s=s.parent}}function hh(e,t,n,r){const s=Hs(t,e,r,!0);Vl(()=>{mo(r[t],s)},n)}function Hs(e,t,n=Pe,r=!1){if(n){const s=n[e]||(n[e]=[]),i=t.__weh||(t.__weh=(...o)=>{Wt();const a=Nr(n),c=Ot(t,n,e,o);return a(),qt(),c});return r?s.unshift(i):s.push(i),i}}const Jt=e=>(t,n=Pe)=>{(!Sr||e==="sp")&&Hs(e,(...r)=>t(...r),n)},ph=Jt("bm"),Dn=Jt("m"),mh=Jt("bu"),gh=Jt("u"),_h=Jt("bum"),Vl=Jt("um"),yh=Jt("sp"),bh=Jt("rtg"),wh=Jt("rtc");function vh(e,t=Pe){Hs("ec",e,t)}const Eh="components";function Ih(e,t){return Ch(Eh,e,!0,t)||e}const Th=Symbol.for("v-ndc");function Ch(e,t,n=!0,r=!1){const s=ze||Pe;if(s){const i=s.type;{const a=mp(i,!1);if(a&&(a===t||a===tt(t)||a===Us(tt(t))))return i}const o=ua(s[e]||i[e],t)||ua(s.appContext[e],t);return!o&&r?i:o}}function ua(e,t){return e&&(e[t]||e[tt(t)]||e[Us(tt(t))])}function ot(e,t,n,r){let s;const i=n,o=G(e);if(o||ve(e)){const a=o&&Vn(e);let c=!1,l=!1;a&&(c=!et(e),l=hn(e),e=Bs(e)),s=new Array(e.length);for(let u=0,f=e.length;u<f;u++)s[u]=t(c?l?ds(Se(e[u])):Se(e[u]):e[u],u,void 0,i)}else if(typeof e=="number"){s=new Array(e);for(let a=0;a<e;a++)s[a]=t(a+1,a,void 0,i)}else if(he(e))if(e[Symbol.iterator])s=Array.from(e,(a,c)=>t(a,c,void 0,i));else{const a=Object.keys(e);s=new Array(a.length);for(let c=0,l=a.length;c<l;c++){const u=a[c];s[c]=t(e[u],u,c,i)}}else s=[];return s}const Bi=e=>e?lu(e)?Ws(e):Bi(e.parent):null,_r=xe(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>Bi(e.parent),$root:e=>Bi(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>Wl(e),$forceUpdate:e=>e.f||(e.f=()=>{To(e.update)}),$nextTick:e=>e.n||(e.n=Dl.bind(e.proxy)),$watch:e=>Gh.bind(e)}),li=(e,t)=>e!==le&&!e.__isScriptSetup&&se(e,t),Sh={get({_:e},t){if(t==="__v_skip")return!0;const{ctx:n,setupState:r,data:s,props:i,accessCache:o,type:a,appContext:c}=e;let l;if(t[0]!=="$"){const m=o[t];if(m!==void 0)switch(m){case 1:return r[t];case 2:return s[t];case 4:return n[t];case 3:return i[t]}else{if(li(r,t))return o[t]=1,r[t];if(s!==le&&se(s,t))return o[t]=2,s[t];if((l=e.propsOptions[0])&&se(l,t))return o[t]=3,i[t];if(n!==le&&se(n,t))return o[t]=4,n[t];$i&&(o[t]=0)}}const u=_r[t];let f,d;if(u)return t==="$attrs"&&Re(e.attrs,"get",""),u(e);if((f=a.__cssModules)&&(f=f[t]))return f;if(n!==le&&se(n,t))return o[t]=4,n[t];if(d=c.config.globalProperties,se(d,t))return d[t]},set({_:e},t,n){const{data:r,setupState:s,ctx:i}=e;return li(s,t)?(s[t]=n,!0):r!==le&&se(r,t)?(r[t]=n,!0):se(e.props,t)||t[0]==="$"&&t.slice(1)in e?!1:(i[t]=n,!0)},has({_:{data:e,setupState:t,accessCache:n,ctx:r,appContext:s,propsOptions:i,type:o}},a){let c,l;return!!(n[a]||e!==le&&a[0]!=="$"&&se(e,a)||li(t,a)||(c=i[0])&&se(c,a)||se(r,a)||se(_r,a)||se(s.config.globalProperties,a)||(l=o.__cssModules)&&l[a])},defineProperty(e,t,n){return n.get!=null?e._.accessCache[t]=0:se(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}};function fa(e){return G(e)?e.reduce((t,n)=>(t[n]=null,t),{}):e}let $i=!0;function Ah(e){const t=Wl(e),n=e.proxy,r=e.ctx;$i=!1,t.beforeCreate&&da(t.beforeCreate,e,"bc");const{data:s,computed:i,methods:o,watch:a,provide:c,inject:l,created:u,beforeMount:f,mounted:d,beforeUpdate:m,updated:g,activated:b,deactivated:w,beforeDestroy:O,beforeUnmount:I,destroyed:A,unmounted:C,render:B,renderTracked:F,renderTriggered:D,errorCaptured:W,serverPrefetch:ee,expose:Ce,inheritAttrs:st,components:Ye,directives:Ae,filters:We}=t;if(l&&Rh(l,r,null),o)for(const te in o){const X=o[te];z(X)&&(r[te]=X.bind(n))}if(s){const te=s.call(n,n);he(te)&&(e.data=dn(te))}if($i=!0,i)for(const te in i){const X=i[te],Xe=z(X)?X.bind(n,n):z(X.get)?X.get.bind(n,n):At,gt=!z(X)&&z(X.set)?X.set.bind(n):At,Ee=Oe({get:Xe,set:gt});Object.defineProperty(r,te,{enumerable:!0,configurable:!0,get:()=>Ee.value,set:ye=>Ee.value=ye})}if(a)for(const te in a)jl(a[te],r,n,te);if(c){const te=z(c)?c.call(n):c;Reflect.ownKeys(te).forEach(X=>{ts(X,te[X])})}u&&da(u,e,"c");function ie(te,X){G(X)?X.forEach(Xe=>te(Xe.bind(n))):X&&te(X.bind(n))}if(ie(ph,f),ie(Dn,d),ie(mh,m),ie(gh,g),ie(fh,b),ie(dh,w),ie(vh,W),ie(wh,F),ie(bh,D),ie(_h,I),ie(Vl,C),ie(yh,ee),G(Ce))if(Ce.length){const te=e.exposed||(e.exposed={});Ce.forEach(X=>{Object.defineProperty(te,X,{get:()=>n[X],set:Xe=>n[X]=Xe,enumerable:!0})})}else e.exposed||(e.exposed={});B&&e.render===At&&(e.render=B),st!=null&&(e.inheritAttrs=st),Ye&&(e.components=Ye),Ae&&(e.directives=Ae),ee&&Bl(e)}function Rh(e,t,n=At){G(e)&&(e=Hi(e));for(const r in e){const s=e[r];let i;he(s)?"default"in s?i=ut(s.from||r,s.default,!0):i=ut(s.from||r):i=ut(s),Ne(i)?Object.defineProperty(t,r,{enumerable:!0,configurable:!0,get:()=>i.value,set:o=>i.value=o}):t[r]=i}}function da(e,t,n){Ot(G(e)?e.map(r=>r.bind(t.proxy)):e.bind(t.proxy),t,n)}function jl(e,t,n,r){let s=r.includes(".")?ru(n,r):()=>n[r];if(ve(e)){const i=t[e];z(i)&&ln(s,i)}else if(z(e))ln(s,e.bind(n));else if(he(e))if(G(e))e.forEach(i=>jl(i,t,n,r));else{const i=z(e.handler)?e.handler.bind(n):t[e.handler];z(i)&&ln(s,i,e)}}function Wl(e){const t=e.type,{mixins:n,extends:r}=t,{mixins:s,optionsCache:i,config:{optionMergeStrategies:o}}=e.appContext,a=i.get(t);let c;return a?c=a:!s.length&&!n&&!r?c=t:(c={},s.length&&s.forEach(l=>ys(c,l,o,!0)),ys(c,t,o)),he(t)&&i.set(t,c),c}function ys(e,t,n,r=!1){const{mixins:s,extends:i}=t;i&&ys(e,i,n,!0),s&&s.forEach(o=>ys(e,o,n,!0));for(const o in t)if(!(r&&o==="expose")){const a=Ph[o]||n&&n[o];e[o]=a?a(e[o],t[o]):t[o]}return e}const Ph={data:ha,props:pa,emits:pa,methods:lr,computed:lr,beforeCreate:De,created:De,beforeMount:De,mounted:De,beforeUpdate:De,updated:De,beforeDestroy:De,beforeUnmount:De,destroyed:De,unmounted:De,activated:De,deactivated:De,errorCaptured:De,serverPrefetch:De,components:lr,directives:lr,watch:kh,provide:ha,inject:Oh};function ha(e,t){return t?e?function(){return xe(z(e)?e.call(this,this):e,z(t)?t.call(this,this):t)}:t:e}function Oh(e,t){return lr(Hi(e),Hi(t))}function Hi(e){if(G(e)){const t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function De(e,t){return e?[...new Set([].concat(e,t))]:t}function lr(e,t){return e?xe(Object.create(null),e,t):t}function pa(e,t){return e?G(e)&&G(t)?[...new Set([...e,...t])]:xe(Object.create(null),fa(e),fa(t??{})):t}function kh(e,t){if(!e)return t;if(!t)return e;const n=xe(Object.create(null),e);for(const r in t)n[r]=De(e[r],t[r]);return n}function ql(){return{app:null,config:{isNativeTag:il,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Nh=0;function xh(e,t){return function(r,s=null){z(r)||(r=xe({},r)),s!=null&&!he(s)&&(s=null);const i=ql(),o=new WeakSet,a=[];let c=!1;const l=i.app={_uid:Nh++,_component:r,_props:s,_container:null,_context:i,_instance:null,version:_p,get config(){return i.config},set config(u){},use(u,...f){return o.has(u)||(u&&z(u.install)?(o.add(u),u.install(l,...f)):z(u)&&(o.add(u),u(l,...f))),l},mixin(u){return i.mixins.includes(u)||i.mixins.push(u),l},component(u,f){return f?(i.components[u]=f,l):i.components[u]},directive(u,f){return f?(i.directives[u]=f,l):i.directives[u]},mount(u,f,d){if(!c){const m=l._ceVNode||ae(r,s);return m.appContext=i,d===!0?d="svg":d===!1&&(d=void 0),e(m,u,d),c=!0,l._container=u,u.__vue_app__=l,Ws(m.component)}},onUnmount(u){a.push(u)},unmount(){c&&(Ot(a,l._instance,16),e(null,l._container),delete l._container.__vue_app__)},provide(u,f){return i.provides[u]=f,l},runWithContext(u){const f=Wn;Wn=l;try{return u()}finally{Wn=f}}};return l}}let Wn=null;function ts(e,t){if(Pe){let n=Pe.provides;const r=Pe.parent&&Pe.parent.provides;r===n&&(n=Pe.provides=Object.create(r)),n[e]=t}}function ut(e,t,n=!1){const r=up();if(r||Wn){let s=Wn?Wn._context.provides:r?r.parent==null||r.ce?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(s&&e in s)return s[e];if(arguments.length>1)return n&&z(t)?t.call(r&&r.proxy):t}}const Gl={},zl=()=>Object.create(Gl),Kl=e=>Object.getPrototypeOf(e)===Gl;function Dh(e,t,n,r=!1){const s={},i=zl();e.propsDefaults=Object.create(null),Jl(e,t,s,i);for(const o in e.propsOptions[0])o in s||(s[o]=void 0);n?e.props=r?s:Pl(s):e.type.props?e.props=s:e.props=i,e.attrs=i}function Lh(e,t,n,r){const{props:s,attrs:i,vnode:{patchFlag:o}}=e,a=re(s),[c]=e.propsOptions;let l=!1;if((r||o>0)&&!(o&16)){if(o&8){const u=e.vnode.dynamicProps;for(let f=0;f<u.length;f++){let d=u[f];if(Vs(e.emitsOptions,d))continue;const m=t[d];if(c)if(se(i,d))m!==i[d]&&(i[d]=m,l=!0);else{const g=tt(d);s[g]=Vi(c,a,g,m,e,!1)}else m!==i[d]&&(i[d]=m,l=!0)}}}else{Jl(e,t,s,i)&&(l=!0);let u;for(const f in a)(!t||!se(t,f)&&((u=gn(f))===f||!se(t,u)))&&(c?n&&(n[f]!==void 0||n[u]!==void 0)&&(s[f]=Vi(c,a,f,void 0,e,!0)):delete s[f]);if(i!==a)for(const f in i)(!t||!se(t,f))&&(delete i[f],l=!0)}l&&Ut(e.attrs,"set","")}function Jl(e,t,n,r){const[s,i]=e.propsOptions;let o=!1,a;if(t)for(let c in t){if(dr(c))continue;const l=t[c];let u;s&&se(s,u=tt(c))?!i||!i.includes(u)?n[u]=l:(a||(a={}))[u]=l:Vs(e.emitsOptions,c)||(!(c in r)||l!==r[c])&&(r[c]=l,o=!0)}if(i){const c=re(n),l=a||le;for(let u=0;u<i.length;u++){const f=i[u];n[f]=Vi(s,c,f,l[f],e,!se(l,f))}}return o}function Vi(e,t,n,r,s,i){const o=e[n];if(o!=null){const a=se(o,"default");if(a&&r===void 0){const c=o.default;if(o.type!==Function&&!o.skipFactory&&z(c)){const{propsDefaults:l}=s;if(n in l)r=l[n];else{const u=Nr(s);r=l[n]=c.call(null,t),u()}}else r=c;s.ce&&s.ce._setProp(n,r)}o[0]&&(i&&!a?r=!1:o[1]&&(r===""||r===gn(n))&&(r=!0))}return r}const Mh=new WeakMap;function Yl(e,t,n=!1){const r=n?Mh:t.propsCache,s=r.get(e);if(s)return s;const i=e.props,o={},a=[];let c=!1;if(!z(e)){const u=f=>{c=!0;const[d,m]=Yl(f,t,!0);xe(o,d),m&&a.push(...m)};!n&&t.mixins.length&&t.mixins.forEach(u),e.extends&&u(e.extends),e.mixins&&e.mixins.forEach(u)}if(!i&&!c)return he(e)&&r.set(e,$n),$n;if(G(i))for(let u=0;u<i.length;u++){const f=tt(i[u]);ma(f)&&(o[f]=le)}else if(i)for(const u in i){const f=tt(u);if(ma(f)){const d=i[u],m=o[f]=G(d)||z(d)?{type:d}:xe({},d),g=m.type;let b=!1,w=!0;if(G(g))for(let O=0;O<g.length;++O){const I=g[O],A=z(I)&&I.name;if(A==="Boolean"){b=!0;break}else A==="String"&&(w=!1)}else b=z(g)&&g.name==="Boolean";m[0]=b,m[1]=w,(b||se(m,"default"))&&a.push(f)}}const l=[o,a];return he(e)&&r.set(e,l),l}function ma(e){return e[0]!=="$"&&!dr(e)}const So=e=>e==="_"||e==="_ctx"||e==="$stable",Ao=e=>G(e)?e.map(Ct):[Ct(e)],Uh=(e,t,n)=>{if(t._n)return t;const r=ah((...s)=>Ao(t(...s)),n);return r._c=!1,r},Xl=(e,t,n)=>{const r=e._ctx;for(const s in e){if(So(s))continue;const i=e[s];if(z(i))t[s]=Uh(s,i,r);else if(i!=null){const o=Ao(i);t[s]=()=>o}}},Ql=(e,t)=>{const n=Ao(t);e.slots.default=()=>n},Zl=(e,t,n)=>{for(const r in t)(n||!So(r))&&(e[r]=t[r])},Fh=(e,t,n)=>{const r=e.slots=zl();if(e.vnode.shapeFlag&32){const s=t._;s?(Zl(r,t,n),n&&ul(r,"_",s,!0)):Xl(t,r)}else t&&Ql(e,t)},Bh=(e,t,n)=>{const{vnode:r,slots:s}=e;let i=!0,o=le;if(r.shapeFlag&32){const a=t._;a?n&&a===1?i=!1:Zl(s,t,n):(i=!t.$stable,Xl(t,s)),o=t}else t&&(Ql(e,t),o={default:1});if(i)for(const a in s)!So(a)&&o[a]==null&&delete s[a]},Ge=ep;function $h(e){return Hh(e)}function Hh(e,t){const n=Fs();n.__VUE__=!0;const{insert:r,remove:s,patchProp:i,createElement:o,createText:a,createComment:c,setText:l,setElementText:u,parentNode:f,nextSibling:d,setScopeId:m=At,insertStaticContent:g}=e,b=(h,p,_,E=null,S=null,v=null,x=void 0,N=null,k=!!p.dynamicChildren)=>{if(h===p)return;h&&!or(h,p)&&(E=T(h),ye(h,S,v,!0),h=null),p.patchFlag===-2&&(k=!1,p.dynamicChildren=null);const{type:P,ref:V,shapeFlag:M}=p;switch(P){case js:w(h,p,_,E);break;case pn:O(h,p,_,E);break;case ns:h==null&&I(p,_,E,x);break;case de:Ye(h,p,_,E,S,v,x,N,k);break;default:M&1?B(h,p,_,E,S,v,x,N,k):M&6?Ae(h,p,_,E,S,v,x,N,k):(M&64||M&128)&&P.process(h,p,_,E,S,v,x,N,k,$)}V!=null&&S?mr(V,h&&h.ref,v,p||h,!p):V==null&&h&&h.ref!=null&&mr(h.ref,null,v,h,!0)},w=(h,p,_,E)=>{if(h==null)r(p.el=a(p.children),_,E);else{const S=p.el=h.el;p.children!==h.children&&l(S,p.children)}},O=(h,p,_,E)=>{h==null?r(p.el=c(p.children||""),_,E):p.el=h.el},I=(h,p,_,E)=>{[h.el,h.anchor]=g(h.children,p,_,E,h.el,h.anchor)},A=({el:h,anchor:p},_,E)=>{let S;for(;h&&h!==p;)S=d(h),r(h,_,E),h=S;r(p,_,E)},C=({el:h,anchor:p})=>{let _;for(;h&&h!==p;)_=d(h),s(h),h=_;s(p)},B=(h,p,_,E,S,v,x,N,k)=>{p.type==="svg"?x="svg":p.type==="math"&&(x="mathml"),h==null?F(p,_,E,S,v,x,N,k):ee(h,p,S,v,x,N,k)},F=(h,p,_,E,S,v,x,N)=>{let k,P;const{props:V,shapeFlag:M,transition:H,dirs:q}=h;if(k=h.el=o(h.type,v,V&&V.is,V),M&8?u(k,h.children):M&16&&W(h.children,k,null,E,S,ui(h,v),x,N),q&&_n(h,null,E,"created"),D(k,h,h.scopeId,x,E),V){for(const ue in V)ue!=="value"&&!dr(ue)&&i(k,ue,null,V[ue],v,E);"value"in V&&i(k,"value",null,V.value,v),(P=V.onVnodeBeforeMount)&&Et(P,E,h)}q&&_n(h,null,E,"beforeMount");const Z=Vh(S,H);Z&&H.beforeEnter(k),r(k,p,_),((P=V&&V.onVnodeMounted)||Z||q)&&Ge(()=>{P&&Et(P,E,h),Z&&H.enter(k),q&&_n(h,null,E,"mounted")},S)},D=(h,p,_,E,S)=>{if(_&&m(h,_),E)for(let v=0;v<E.length;v++)m(h,E[v]);if(S){let v=S.subTree;if(p===v||iu(v.type)&&(v.ssContent===p||v.ssFallback===p)){const x=S.vnode;D(h,x,x.scopeId,x.slotScopeIds,S.parent)}}},W=(h,p,_,E,S,v,x,N,k=0)=>{for(let P=k;P<h.length;P++){const V=h[P]=N?nn(h[P]):Ct(h[P]);b(null,V,p,_,E,S,v,x,N)}},ee=(h,p,_,E,S,v,x)=>{const N=p.el=h.el;let{patchFlag:k,dynamicChildren:P,dirs:V}=p;k|=h.patchFlag&16;const M=h.props||le,H=p.props||le;let q;if(_&&yn(_,!1),(q=H.onVnodeBeforeUpdate)&&Et(q,_,p,h),V&&_n(p,h,_,"beforeUpdate"),_&&yn(_,!0),(M.innerHTML&&H.innerHTML==null||M.textContent&&H.textContent==null)&&u(N,""),P?Ce(h.dynamicChildren,P,N,_,E,ui(p,S),v):x||X(h,p,N,null,_,E,ui(p,S),v,!1),k>0){if(k&16)st(N,M,H,_,S);else if(k&2&&M.class!==H.class&&i(N,"class",null,H.class,S),k&4&&i(N,"style",M.style,H.style,S),k&8){const Z=p.dynamicProps;for(let ue=0;ue<Z.length;ue++){const oe=Z[ue],Be=M[oe],$e=H[oe];($e!==Be||oe==="value")&&i(N,oe,Be,$e,S,_)}}k&1&&h.children!==p.children&&u(N,p.children)}else!x&&P==null&&st(N,M,H,_,S);((q=H.onVnodeUpdated)||V)&&Ge(()=>{q&&Et(q,_,p,h),V&&_n(p,h,_,"updated")},E)},Ce=(h,p,_,E,S,v,x)=>{for(let N=0;N<p.length;N++){const k=h[N],P=p[N],V=k.el&&(k.type===de||!or(k,P)||k.shapeFlag&198)?f(k.el):_;b(k,P,V,null,E,S,v,x,!0)}},st=(h,p,_,E,S)=>{if(p!==_){if(p!==le)for(const v in p)!dr(v)&&!(v in _)&&i(h,v,p[v],null,S,E);for(const v in _){if(dr(v))continue;const x=_[v],N=p[v];x!==N&&v!=="value"&&i(h,v,N,x,S,E)}"value"in _&&i(h,"value",p.value,_.value,S)}},Ye=(h,p,_,E,S,v,x,N,k)=>{const P=p.el=h?h.el:a(""),V=p.anchor=h?h.anchor:a("");let{patchFlag:M,dynamicChildren:H,slotScopeIds:q}=p;q&&(N=N?N.concat(q):q),h==null?(r(P,_,E),r(V,_,E),W(p.children||[],_,V,S,v,x,N,k)):M>0&&M&64&&H&&h.dynamicChildren?(Ce(h.dynamicChildren,H,_,S,v,x,N),(p.key!=null||S&&p===S.subTree)&&eu(h,p,!0)):X(h,p,_,V,S,v,x,N,k)},Ae=(h,p,_,E,S,v,x,N,k)=>{p.slotScopeIds=N,h==null?p.shapeFlag&512?S.ctx.activate(p,_,E,x,k):We(p,_,E,S,v,x,k):xt(h,p,k)},We=(h,p,_,E,S,v,x)=>{const N=h.component=lp(h,E,S);if($l(h)&&(N.ctx.renderer=$),fp(N,!1,x),N.asyncDep){if(S&&S.registerDep(N,ie,x),!h.el){const k=N.subTree=ae(pn);O(null,k,p,_),h.placeholder=k.el}}else ie(N,h,p,_,S,v,x)},xt=(h,p,_)=>{const E=p.component=h.component;if(Qh(h,p,_))if(E.asyncDep&&!E.asyncResolved){te(E,p,_);return}else E.next=p,E.update();else p.el=h.el,E.vnode=p},ie=(h,p,_,E,S,v,x)=>{const N=()=>{if(h.isMounted){let{next:M,bu:H,u:q,parent:Z,vnode:ue}=h;{const wt=tu(h);if(wt){M&&(M.el=ue.el,te(h,M,x)),wt.asyncDep.then(()=>{h.isUnmounted||N()});return}}let oe=M,Be;yn(h,!1),M?(M.el=ue.el,te(h,M,x)):M=ue,H&&es(H),(Be=M.props&&M.props.onVnodeBeforeUpdate)&&Et(Be,Z,M,ue),yn(h,!0);const $e=_a(h),bt=h.subTree;h.subTree=$e,b(bt,$e,f(bt.el),T(bt),h,S,v),M.el=$e.el,oe===null&&Zh(h,$e.el),q&&Ge(q,S),(Be=M.props&&M.props.onVnodeUpdated)&&Ge(()=>Et(Be,Z,M,ue),S)}else{let M;const{el:H,props:q}=p,{bm:Z,m:ue,parent:oe,root:Be,type:$e}=h,bt=gr(p);yn(h,!1),Z&&es(Z),!bt&&(M=q&&q.onVnodeBeforeMount)&&Et(M,oe,p),yn(h,!0);{Be.ce&&Be.ce._def.shadowRoot!==!1&&Be.ce._injectChildStyle($e);const wt=h.subTree=_a(h);b(null,wt,_,E,h,S,v),p.el=wt.el}if(ue&&Ge(ue,S),!bt&&(M=q&&q.onVnodeMounted)){const wt=p;Ge(()=>Et(M,oe,wt),S)}(p.shapeFlag&256||oe&&gr(oe.vnode)&&oe.vnode.shapeFlag&256)&&h.a&&Ge(h.a,S),h.isMounted=!0,p=_=E=null}};h.scope.on();const k=h.effect=new ml(N);h.scope.off();const P=h.update=k.run.bind(k),V=h.job=k.runIfDirty.bind(k);V.i=h,V.id=h.uid,k.scheduler=()=>To(V),yn(h,!0),P()},te=(h,p,_)=>{p.component=h;const E=h.vnode.props;h.vnode=p,h.next=null,Lh(h,p.props,E,_),Bh(h,p.children,_),Wt(),ca(h),qt()},X=(h,p,_,E,S,v,x,N,k=!1)=>{const P=h&&h.children,V=h?h.shapeFlag:0,M=p.children,{patchFlag:H,shapeFlag:q}=p;if(H>0){if(H&128){gt(P,M,_,E,S,v,x,N,k);return}else if(H&256){Xe(P,M,_,E,S,v,x,N,k);return}}q&8?(V&16&&Qe(P,S,v),M!==P&&u(_,M)):V&16?q&16?gt(P,M,_,E,S,v,x,N,k):Qe(P,S,v,!0):(V&8&&u(_,""),q&16&&W(M,_,E,S,v,x,N,k))},Xe=(h,p,_,E,S,v,x,N,k)=>{h=h||$n,p=p||$n;const P=h.length,V=p.length,M=Math.min(P,V);let H;for(H=0;H<M;H++){const q=p[H]=k?nn(p[H]):Ct(p[H]);b(h[H],q,_,null,S,v,x,N,k)}P>V?Qe(h,S,v,!0,!1,M):W(p,_,E,S,v,x,N,k,M)},gt=(h,p,_,E,S,v,x,N,k)=>{let P=0;const V=p.length;let M=h.length-1,H=V-1;for(;P<=M&&P<=H;){const q=h[P],Z=p[P]=k?nn(p[P]):Ct(p[P]);if(or(q,Z))b(q,Z,_,null,S,v,x,N,k);else break;P++}for(;P<=M&&P<=H;){const q=h[M],Z=p[H]=k?nn(p[H]):Ct(p[H]);if(or(q,Z))b(q,Z,_,null,S,v,x,N,k);else break;M--,H--}if(P>M){if(P<=H){const q=H+1,Z=q<V?p[q].el:E;for(;P<=H;)b(null,p[P]=k?nn(p[P]):Ct(p[P]),_,Z,S,v,x,N,k),P++}}else if(P>H)for(;P<=M;)ye(h[P],S,v,!0),P++;else{const q=P,Z=P,ue=new Map;for(P=Z;P<=H;P++){const qe=p[P]=k?nn(p[P]):Ct(p[P]);qe.key!=null&&ue.set(qe.key,P)}let oe,Be=0;const $e=H-Z+1;let bt=!1,wt=0;const sr=new Array($e);for(P=0;P<$e;P++)sr[P]=0;for(P=q;P<=M;P++){const qe=h[P];if(Be>=$e){ye(qe,S,v,!0);continue}let vt;if(qe.key!=null)vt=ue.get(qe.key);else for(oe=Z;oe<=H;oe++)if(sr[oe-Z]===0&&or(qe,p[oe])){vt=oe;break}vt===void 0?ye(qe,S,v,!0):(sr[vt-Z]=P+1,vt>=wt?wt=vt:bt=!0,b(qe,p[vt],_,null,S,v,x,N,k),Be++)}const na=bt?jh(sr):$n;for(oe=na.length-1,P=$e-1;P>=0;P--){const qe=Z+P,vt=p[qe],ra=p[qe+1],sa=qe+1<V?ra.el||ra.placeholder:E;sr[P]===0?b(null,vt,_,sa,S,v,x,N,k):bt&&(oe<0||P!==na[oe]?Ee(vt,_,sa,2):oe--)}}},Ee=(h,p,_,E,S=null)=>{const{el:v,type:x,transition:N,children:k,shapeFlag:P}=h;if(P&6){Ee(h.component.subTree,p,_,E);return}if(P&128){h.suspense.move(p,_,E);return}if(P&64){x.move(h,p,_,$);return}if(x===de){r(v,p,_);for(let M=0;M<k.length;M++)Ee(k[M],p,_,E);r(h.anchor,p,_);return}if(x===ns){A(h,p,_);return}if(E!==2&&P&1&&N)if(E===0)N.beforeEnter(v),r(v,p,_),Ge(()=>N.enter(v),S);else{const{leave:M,delayLeave:H,afterLeave:q}=N,Z=()=>{h.ctx.isUnmounted?s(v):r(v,p,_)},ue=()=>{v._isLeaving&&v[uh](!0),M(v,()=>{Z(),q&&q()})};H?H(v,Z,ue):ue()}else r(v,p,_)},ye=(h,p,_,E=!1,S=!1)=>{const{type:v,props:x,ref:N,children:k,dynamicChildren:P,shapeFlag:V,patchFlag:M,dirs:H,cacheIndex:q}=h;if(M===-2&&(S=!1),N!=null&&(Wt(),mr(N,null,_,h,!0),qt()),q!=null&&(p.renderCache[q]=void 0),V&256){p.ctx.deactivate(h);return}const Z=V&1&&H,ue=!gr(h);let oe;if(ue&&(oe=x&&x.onVnodeBeforeUnmount)&&Et(oe,p,h),V&6)yt(h.component,_,E);else{if(V&128){h.suspense.unmount(_,E);return}Z&&_n(h,null,p,"beforeUnmount"),V&64?h.type.remove(h,p,_,$,E):P&&!P.hasOnce&&(v!==de||M>0&&M&64)?Qe(P,p,_,!1,!0):(v===de&&M&384||!S&&V&16)&&Qe(k,p,_),E&&_t(h)}(ue&&(oe=x&&x.onVnodeUnmounted)||Z)&&Ge(()=>{oe&&Et(oe,p,h),Z&&_n(h,null,p,"unmounted")},_)},_t=h=>{const{type:p,el:_,anchor:E,transition:S}=h;if(p===de){it(_,E);return}if(p===ns){C(h);return}const v=()=>{s(_),S&&!S.persisted&&S.afterLeave&&S.afterLeave()};if(h.shapeFlag&1&&S&&!S.persisted){const{leave:x,delayLeave:N}=S,k=()=>x(_,v);N?N(h.el,v,k):k()}else v()},it=(h,p)=>{let _;for(;h!==p;)_=d(h),s(h),h=_;s(p)},yt=(h,p,_)=>{const{bum:E,scope:S,job:v,subTree:x,um:N,m:k,a:P}=h;ga(k),ga(P),E&&es(E),S.stop(),v&&(v.flags|=8,ye(x,h,p,_)),N&&Ge(N,p),Ge(()=>{h.isUnmounted=!0},p)},Qe=(h,p,_,E=!1,S=!1,v=0)=>{for(let x=v;x<h.length;x++)ye(h[x],p,_,E,S)},T=h=>{if(h.shapeFlag&6)return T(h.component.subTree);if(h.shapeFlag&128)return h.suspense.next();const p=d(h.anchor||h.el),_=p&&p[ch];return _?d(_):p};let U=!1;const L=(h,p,_)=>{h==null?p._vnode&&ye(p._vnode,null,null,!0):b(p._vnode||null,h,p,null,null,null,_),p._vnode=h,U||(U=!0,ca(),Ml(),U=!1)},$={p:b,um:ye,m:Ee,r:_t,mt:We,mc:W,pc:X,pbc:Ce,n:T,o:e};return{render:L,hydrate:void 0,createApp:xh(L)}}function ui({type:e,props:t},n){return n==="svg"&&e==="foreignObject"||n==="mathml"&&e==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:n}function yn({effect:e,job:t},n){n?(e.flags|=32,t.flags|=4):(e.flags&=-33,t.flags&=-5)}function Vh(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function eu(e,t,n=!1){const r=e.children,s=t.children;if(G(r)&&G(s))for(let i=0;i<r.length;i++){const o=r[i];let a=s[i];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=s[i]=nn(s[i]),a.el=o.el),!n&&a.patchFlag!==-2&&eu(o,a)),a.type===js&&a.patchFlag!==-1&&(a.el=o.el),a.type===pn&&!a.el&&(a.el=o.el)}}function jh(e){const t=e.slice(),n=[0];let r,s,i,o,a;const c=e.length;for(r=0;r<c;r++){const l=e[r];if(l!==0){if(s=n[n.length-1],e[s]<l){t[r]=s,n.push(r);continue}for(i=0,o=n.length-1;i<o;)a=i+o>>1,e[n[a]]<l?i=a+1:o=a;l<e[n[i]]&&(i>0&&(t[r]=n[i-1]),n[i]=r)}}for(i=n.length,o=n[i-1];i-- >0;)n[i]=o,o=t[o];return n}function tu(e){const t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:tu(t)}function ga(e){if(e)for(let t=0;t<e.length;t++)e[t].flags|=8}const Wh=Symbol.for("v-scx"),qh=()=>ut(Wh);function ln(e,t,n){return nu(e,t,n)}function nu(e,t,n=le){const{immediate:r,deep:s,flush:i,once:o}=n,a=xe({},n),c=t&&r||!t&&i!=="post";let l;if(Sr){if(i==="sync"){const m=qh();l=m.__watcherHandles||(m.__watcherHandles=[])}else if(!c){const m=()=>{};return m.stop=At,m.resume=At,m.pause=At,m}}const u=Pe;a.call=(m,g,b)=>Ot(m,u,g,b);let f=!1;i==="post"?a.scheduler=m=>{Ge(m,u&&u.suspense)}:i!=="sync"&&(f=!0,a.scheduler=(m,g)=>{g?m():To(m)}),a.augmentJob=m=>{t&&(m.flags|=4),f&&(m.flags|=2,u&&(m.id=u.uid,m.i=u))};const d=rh(e,t,a);return Sr&&(l?l.push(d):c&&d()),d}function Gh(e,t,n){const r=this.proxy,s=ve(e)?e.includes(".")?ru(r,e):()=>r[e]:e.bind(r,r);let i;z(t)?i=t:(i=t.handler,n=t);const o=Nr(this),a=nu(s,i.bind(r),n);return o(),a}function ru(e,t){const n=t.split(".");return()=>{let r=e;for(let s=0;s<n.length&&r;s++)r=r[n[s]];return r}}const zh=(e,t)=>t==="modelValue"||t==="model-value"?e.modelModifiers:e[`${t}Modifiers`]||e[`${tt(t)}Modifiers`]||e[`${gn(t)}Modifiers`];function Kh(e,t,...n){if(e.isUnmounted)return;const r=e.vnode.props||le;let s=n;const i=t.startsWith("update:"),o=i&&zh(r,t.slice(7));o&&(o.trim&&(s=n.map(u=>ve(u)?u.trim():u)),o.number&&(s=n.map(xi)));let a,c=r[a=si(t)]||r[a=si(tt(t))];!c&&i&&(c=r[a=si(gn(t))]),c&&Ot(c,e,6,s);const l=r[a+"Once"];if(l){if(!e.emitted)e.emitted={};else if(e.emitted[a])return;e.emitted[a]=!0,Ot(l,e,6,s)}}const Jh=new WeakMap;function su(e,t,n=!1){const r=n?Jh:t.emitsCache,s=r.get(e);if(s!==void 0)return s;const i=e.emits;let o={},a=!1;if(!z(e)){const c=l=>{const u=su(l,t,!0);u&&(a=!0,xe(o,u))};!n&&t.mixins.length&&t.mixins.forEach(c),e.extends&&c(e.extends),e.mixins&&e.mixins.forEach(c)}return!i&&!a?(he(e)&&r.set(e,null),null):(G(i)?i.forEach(c=>o[c]=null):xe(o,i),he(e)&&r.set(e,o),o)}function Vs(e,t){return!e||!Ds(t)?!1:(t=t.slice(2).replace(/Once$/,""),se(e,t[0].toLowerCase()+t.slice(1))||se(e,gn(t))||se(e,t))}function _a(e){const{type:t,vnode:n,proxy:r,withProxy:s,propsOptions:[i],slots:o,attrs:a,emit:c,render:l,renderCache:u,props:f,data:d,setupState:m,ctx:g,inheritAttrs:b}=e,w=ms(e);let O,I;try{if(n.shapeFlag&4){const C=s||r,B=C;O=Ct(l.call(B,C,u,f,m,d,g)),I=a}else{const C=t;O=Ct(C.length>1?C(f,{attrs:a,slots:o,emit:c}):C(f,null)),I=t.props?a:Yh(a)}}catch(C){yr.length=0,$s(C,e,1),O=ae(pn)}let A=O;if(I&&b!==!1){const C=Object.keys(I),{shapeFlag:B}=A;C.length&&B&7&&(i&&C.some(po)&&(I=Xh(I,i)),A=Jn(A,I,!1,!0))}return n.dirs&&(A=Jn(A,null,!1,!0),A.dirs=A.dirs?A.dirs.concat(n.dirs):n.dirs),n.transition&&Co(A,n.transition),O=A,ms(w),O}const Yh=e=>{let t;for(const n in e)(n==="class"||n==="style"||Ds(n))&&((t||(t={}))[n]=e[n]);return t},Xh=(e,t)=>{const n={};for(const r in e)(!po(r)||!(r.slice(9)in t))&&(n[r]=e[r]);return n};function Qh(e,t,n){const{props:r,children:s,component:i}=e,{props:o,children:a,patchFlag:c}=t,l=i.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&c>=0){if(c&1024)return!0;if(c&16)return r?ya(r,o,l):!!o;if(c&8){const u=t.dynamicProps;for(let f=0;f<u.length;f++){const d=u[f];if(o[d]!==r[d]&&!Vs(l,d))return!0}}}else return(s||a)&&(!a||!a.$stable)?!0:r===o?!1:r?o?ya(r,o,l):!0:!!o;return!1}function ya(e,t,n){const r=Object.keys(t);if(r.length!==Object.keys(e).length)return!0;for(let s=0;s<r.length;s++){const i=r[s];if(t[i]!==e[i]&&!Vs(n,i))return!0}return!1}function Zh({vnode:e,parent:t},n){for(;t;){const r=t.subTree;if(r.suspense&&r.suspense.activeBranch===e&&(r.el=e.el),r===e)(e=t.vnode).el=n,t=t.parent;else break}}const iu=e=>e.__isSuspense;function ep(e,t){t&&t.pendingBranch?G(e)?t.effects.push(...e):t.effects.push(e):oh(e)}const de=Symbol.for("v-fgt"),js=Symbol.for("v-txt"),pn=Symbol.for("v-cmt"),ns=Symbol.for("v-stc"),yr=[];let Ke=null;function K(e=!1){yr.push(Ke=e?null:[])}function tp(){yr.pop(),Ke=yr[yr.length-1]||null}let Cr=1;function bs(e,t=!1){Cr+=e,e<0&&Ke&&t&&(Ke.hasOnce=!0)}function ou(e){return e.dynamicChildren=Cr>0?Ke||$n:null,tp(),Cr>0&&Ke&&Ke.push(e),e}function Y(e,t,n,r,s,i){return ou(R(e,t,n,r,s,i,!0))}function np(e,t,n,r,s){return ou(ae(e,t,n,r,s,!0))}function ws(e){return e?e.__v_isVNode===!0:!1}function or(e,t){return e.type===t.type&&e.key===t.key}const au=({key:e})=>e??null,rs=({ref:e,ref_key:t,ref_for:n})=>(typeof e=="number"&&(e=""+e),e!=null?ve(e)||Ne(e)||z(e)?{i:ze,r:e,k:t,f:!!n}:e:null);function R(e,t=null,n=null,r=0,s=null,i=e===de?0:1,o=!1,a=!1){const c={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&au(t),ref:t&&rs(t),scopeId:Fl,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:r,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:ze};return a?(Ro(c,n),i&128&&e.normalize(c)):n&&(c.shapeFlag|=ve(n)?8:16),Cr>0&&!o&&Ke&&(c.patchFlag>0||i&6)&&c.patchFlag!==32&&Ke.push(c),c}const ae=rp;function rp(e,t=null,n=null,r=0,s=null,i=!1){if((!e||e===Th)&&(e=pn),ws(e)){const a=Jn(e,t,!0);return n&&Ro(a,n),Cr>0&&!i&&Ke&&(a.shapeFlag&6?Ke[Ke.indexOf(e)]=a:Ke.push(a)),a.patchFlag=-2,a}if(gp(e)&&(e=e.__vccOpts),t){t=sp(t);let{class:a,style:c}=t;a&&!ve(a)&&(t.class=St(a)),he(c)&&(Io(c)&&!G(c)&&(c=xe({},c)),t.style=an(c))}const o=ve(e)?1:iu(e)?128:lh(e)?64:he(e)?4:z(e)?2:0;return R(e,t,n,r,s,o,i,!0)}function sp(e){return e?Io(e)||Kl(e)?xe({},e):e:null}function Jn(e,t,n=!1,r=!1){const{props:s,ref:i,patchFlag:o,children:a,transition:c}=e,l=t?op(s||{},t):s,u={__v_isVNode:!0,__v_skip:!0,type:e.type,props:l,key:l&&au(l),ref:t&&t.ref?n&&i?G(i)?i.concat(rs(t)):[i,rs(t)]:rs(t):i,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:a,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==de?o===-1?16:o|16:o,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:c,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&Jn(e.ssContent),ssFallback:e.ssFallback&&Jn(e.ssFallback),placeholder:e.placeholder,el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce};return c&&r&&Co(u,c.clone(u)),u}function cu(e=" ",t=0){return ae(js,null,e,t)}function ip(e,t){const n=ae(ns,null,e);return n.staticCount=t,n}function Yn(e="",t=!1){return t?(K(),np(pn,null,e)):ae(pn,null,e)}function Ct(e){return e==null||typeof e=="boolean"?ae(pn):G(e)?ae(de,null,e.slice()):ws(e)?nn(e):ae(js,null,String(e))}function nn(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:Jn(e)}function Ro(e,t){let n=0;const{shapeFlag:r}=e;if(t==null)t=null;else if(G(t))n=16;else if(typeof t=="object")if(r&65){const s=t.default;s&&(s._c&&(s._d=!1),Ro(e,s()),s._c&&(s._d=!0));return}else{n=32;const s=t._;!s&&!Kl(t)?t._ctx=ze:s===3&&ze&&(ze.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else z(t)?(t={default:t,_ctx:ze},n=32):(t=String(t),r&64?(n=16,t=[cu(t)]):n=8);e.children=t,e.shapeFlag|=n}function op(...e){const t={};for(let n=0;n<e.length;n++){const r=e[n];for(const s in r)if(s==="class")t.class!==r.class&&(t.class=St([t.class,r.class]));else if(s==="style")t.style=an([t.style,r.style]);else if(Ds(s)){const i=t[s],o=r[s];o&&i!==o&&!(G(i)&&i.includes(o))&&(t[s]=i?[].concat(i,o):o)}else s!==""&&(t[s]=r[s])}return t}function Et(e,t,n,r=null){Ot(e,t,7,[n,r])}const ap=ql();let cp=0;function lp(e,t,n){const r=e.type,s=(t?t.appContext:e.appContext)||ap,i={uid:cp++,vnode:e,type:r,parent:t,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new pl(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(s.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Yl(r,s),emitsOptions:su(r,s),emit:null,emitted:null,propsDefaults:le,inheritAttrs:r.inheritAttrs,ctx:le,data:le,props:le,attrs:le,slots:le,refs:le,setupState:le,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=t?t.root:i,i.emit=Kh.bind(null,i),e.ce&&e.ce(i),i}let Pe=null;const up=()=>Pe||ze;let vs,ji;{const e=Fs(),t=(n,r)=>{let s;return(s=e[n])||(s=e[n]=[]),s.push(r),i=>{s.length>1?s.forEach(o=>o(i)):s[0](i)}};vs=t("__VUE_INSTANCE_SETTERS__",n=>Pe=n),ji=t("__VUE_SSR_SETTERS__",n=>Sr=n)}const Nr=e=>{const t=Pe;return vs(e),e.scope.on(),()=>{e.scope.off(),vs(t)}},ba=()=>{Pe&&Pe.scope.off(),vs(null)};function lu(e){return e.vnode.shapeFlag&4}let Sr=!1;function fp(e,t=!1,n=!1){t&&ji(t);const{props:r,children:s}=e.vnode,i=lu(e);Dh(e,r,i,t),Fh(e,s,n||t);const o=i?dp(e,t):void 0;return t&&ji(!1),o}function dp(e,t){const n=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,Sh);const{setup:r}=n;if(r){Wt();const s=e.setupContext=r.length>1?pp(e):null,i=Nr(e),o=kr(r,e,0,[e.props,s]),a=al(o);if(qt(),i(),(a||e.sp)&&!gr(e)&&Bl(e),a){if(o.then(ba,ba),t)return o.then(c=>{wa(e,c)}).catch(c=>{$s(c,e,0)});e.asyncDep=o}else wa(e,o)}else uu(e)}function wa(e,t,n){z(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:he(t)&&(e.setupState=Nl(t)),uu(e)}function uu(e,t,n){const r=e.type;e.render||(e.render=r.render||At);{const s=Nr(e);Wt();try{Ah(e)}finally{qt(),s()}}}const hp={get(e,t){return Re(e,"get",""),e[t]}};function pp(e){const t=n=>{e.exposed=n||{}};return{attrs:new Proxy(e.attrs,hp),slots:e.slots,emit:e.emit,expose:t}}function Ws(e){return e.exposed?e.exposeProxy||(e.exposeProxy=new Proxy(Nl(Ol(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in _r)return _r[n](e)},has(t,n){return n in t||n in _r}})):e.proxy}function mp(e,t=!0){return z(e)?e.displayName||e.name:e.name||t&&e.__name}function gp(e){return z(e)&&"__vccOpts"in e}const Oe=(e,t)=>th(e,t,Sr);function fu(e,t,n){try{bs(-1);const r=arguments.length;return r===2?he(t)&&!G(t)?ws(t)?ae(e,null,[t]):ae(e,t):ae(e,null,t):(r>3?n=Array.prototype.slice.call(arguments,2):r===3&&ws(n)&&(n=[n]),ae(e,t,n))}finally{bs(1)}}const _p="3.5.22";/**
* @vue/runtime-dom v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Wi;const va=typeof window<"u"&&window.trustedTypes;if(va)try{Wi=va.createPolicy("vue",{createHTML:e=>e})}catch{}const du=Wi?e=>Wi.createHTML(e):e=>e,yp="http://www.w3.org/2000/svg",bp="http://www.w3.org/1998/Math/MathML",Mt=typeof document<"u"?document:null,Ea=Mt&&Mt.createElement("template"),wp={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,r)=>{const s=t==="svg"?Mt.createElementNS(yp,e):t==="mathml"?Mt.createElementNS(bp,e):n?Mt.createElement(e,{is:n}):Mt.createElement(e);return e==="select"&&r&&r.multiple!=null&&s.setAttribute("multiple",r.multiple),s},createText:e=>Mt.createTextNode(e),createComment:e=>Mt.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>Mt.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,n,r,s,i){const o=n?n.previousSibling:t.lastChild;if(s&&(s===i||s.nextSibling))for(;t.insertBefore(s.cloneNode(!0),n),!(s===i||!(s=s.nextSibling)););else{Ea.innerHTML=du(r==="svg"?`<svg>${e}</svg>`:r==="mathml"?`<math>${e}</math>`:e);const a=Ea.content;if(r==="svg"||r==="mathml"){const c=a.firstChild;for(;c.firstChild;)a.appendChild(c.firstChild);a.removeChild(c)}t.insertBefore(a,n)}return[o?o.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},vp=Symbol("_vtc");function Ep(e,t,n){const r=e[vp];r&&(t=(t?[t,...r]:[...r]).join(" ")),t==null?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t}const Ia=Symbol("_vod"),Ip=Symbol("_vsh"),Tp=Symbol(""),Cp=/(?:^|;)\s*display\s*:/;function Sp(e,t,n){const r=e.style,s=ve(n);let i=!1;if(n&&!s){if(t)if(ve(t))for(const o of t.split(";")){const a=o.slice(0,o.indexOf(":")).trim();n[a]==null&&ss(r,a,"")}else for(const o in t)n[o]==null&&ss(r,o,"");for(const o in n)o==="display"&&(i=!0),ss(r,o,n[o])}else if(s){if(t!==n){const o=r[Tp];o&&(n+=";"+o),r.cssText=n,i=Cp.test(n)}}else t&&e.removeAttribute("style");Ia in e&&(e[Ia]=i?r.display:"",e[Ip]&&(r.display="none"))}const Ta=/\s*!important$/;function ss(e,t,n){if(G(n))n.forEach(r=>ss(e,t,r));else if(n==null&&(n=""),t.startsWith("--"))e.setProperty(t,n);else{const r=Ap(e,t);Ta.test(n)?e.setProperty(gn(r),n.replace(Ta,""),"important"):e[r]=n}}const Ca=["Webkit","Moz","ms"],fi={};function Ap(e,t){const n=fi[t];if(n)return n;let r=tt(t);if(r!=="filter"&&r in e)return fi[t]=r;r=Us(r);for(let s=0;s<Ca.length;s++){const i=Ca[s]+r;if(i in e)return fi[t]=i}return t}const Sa="http://www.w3.org/1999/xlink";function Aa(e,t,n,r,s,i=Od(t)){r&&t.startsWith("xlink:")?n==null?e.removeAttributeNS(Sa,t.slice(6,t.length)):e.setAttributeNS(Sa,t,n):n==null||i&&!fl(n)?e.removeAttribute(t):e.setAttribute(t,i?"":mn(n)?String(n):n)}function Ra(e,t,n,r,s){if(t==="innerHTML"||t==="textContent"){n!=null&&(e[t]=t==="innerHTML"?du(n):n);return}const i=e.tagName;if(t==="value"&&i!=="PROGRESS"&&!i.includes("-")){const a=i==="OPTION"?e.getAttribute("value")||"":e.value,c=n==null?e.type==="checkbox"?"on":"":String(n);(a!==c||!("_value"in e))&&(e.value=c),n==null&&e.removeAttribute(t),e._value=n;return}let o=!1;if(n===""||n==null){const a=typeof e[t];a==="boolean"?n=fl(n):n==null&&a==="string"?(n="",o=!0):a==="number"&&(n=0,o=!0)}try{e[t]=n}catch{}o&&e.removeAttribute(s||t)}function Fn(e,t,n,r){e.addEventListener(t,n,r)}function Rp(e,t,n,r){e.removeEventListener(t,n,r)}const Pa=Symbol("_vei");function Pp(e,t,n,r,s=null){const i=e[Pa]||(e[Pa]={}),o=i[t];if(r&&o)o.value=r;else{const[a,c]=Op(t);if(r){const l=i[t]=xp(r,s);Fn(e,a,l,c)}else o&&(Rp(e,a,o,c),i[t]=void 0)}}const Oa=/(?:Once|Passive|Capture)$/;function Op(e){let t;if(Oa.test(e)){t={};let r;for(;r=e.match(Oa);)e=e.slice(0,e.length-r[0].length),t[r[0].toLowerCase()]=!0}return[e[2]===":"?e.slice(3):gn(e.slice(2)),t]}let di=0;const kp=Promise.resolve(),Np=()=>di||(kp.then(()=>di=0),di=Date.now());function xp(e,t){const n=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=n.attached)return;Ot(Dp(r,n.value),t,5,[r])};return n.value=e,n.attached=Np(),n}function Dp(e,t){if(G(t)){const n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0},t.map(r=>s=>!s._stopped&&r&&r(s))}else return t}const ka=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,Lp=(e,t,n,r,s,i)=>{const o=s==="svg";t==="class"?Ep(e,r,o):t==="style"?Sp(e,n,r):Ds(t)?po(t)||Pp(e,t,n,r,i):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):Mp(e,t,r,o))?(Ra(e,t,r),!e.tagName.includes("-")&&(t==="value"||t==="checked"||t==="selected")&&Aa(e,t,r,o,i,t!=="value")):e._isVueCE&&(/[A-Z]/.test(t)||!ve(r))?Ra(e,tt(t),r,i,t):(t==="true-value"?e._trueValue=r:t==="false-value"&&(e._falseValue=r),Aa(e,t,r,o))};function Mp(e,t,n,r){if(r)return!!(t==="innerHTML"||t==="textContent"||t in e&&ka(t)&&z(n));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="autocorrect"||t==="form"||t==="list"&&e.tagName==="INPUT"||t==="type"&&e.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){const s=e.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return ka(t)&&ve(n)?!1:t in e}const Na=e=>{const t=e.props["onUpdate:modelValue"]||!1;return G(t)?n=>es(t,n):t};function Up(e){e.target.composing=!0}function xa(e){const t=e.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event("input")))}const hi=Symbol("_assign"),Es={created(e,{modifiers:{lazy:t,trim:n,number:r}},s){e[hi]=Na(s);const i=r||s.props&&s.props.type==="number";Fn(e,t?"change":"input",o=>{if(o.target.composing)return;let a=e.value;n&&(a=a.trim()),i&&(a=xi(a)),e[hi](a)}),n&&Fn(e,"change",()=>{e.value=e.value.trim()}),t||(Fn(e,"compositionstart",Up),Fn(e,"compositionend",xa),Fn(e,"change",xa))},mounted(e,{value:t}){e.value=t??""},beforeUpdate(e,{value:t,oldValue:n,modifiers:{lazy:r,trim:s,number:i}},o){if(e[hi]=Na(o),e.composing)return;const a=(i||e.type==="number")&&!/^0\d/.test(e.value)?xi(e.value):e.value,c=t??"";a!==c&&(document.activeElement===e&&e.type!=="range"&&(r&&t===n||s&&e.value.trim()===c)||(e.value=c))}},Fp=["ctrl","shift","alt","meta"],Bp={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>"button"in e&&e.button!==0,middle:e=>"button"in e&&e.button!==1,right:e=>"button"in e&&e.button!==2,exact:(e,t)=>Fp.some(n=>e[`${n}Key`]&&!t.includes(n))},$p=(e,t)=>{const n=e._withMods||(e._withMods={}),r=t.join(".");return n[r]||(n[r]=((s,...i)=>{for(let o=0;o<t.length;o++){const a=Bp[t[o]];if(a&&a(s,t))return}return e(s,...i)}))},Hp={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},Kr=(e,t)=>{const n=e._withKeys||(e._withKeys={}),r=t.join(".");return n[r]||(n[r]=(s=>{if(!("key"in s))return;const i=gn(s.key);if(t.some(o=>o===i||Hp[o]===i))return e(s)}))},Vp=xe({patchProp:Lp},wp);let Da;function jp(){return Da||(Da=$h(Vp))}const Wp=((...e)=>{const t=jp().createApp(...e),{mount:n}=t;return t.mount=r=>{const s=Gp(r);if(!s)return;const i=t._component;!z(i)&&!i.render&&!i.template&&(i.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const o=n(s,!1,qp(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),o},t});function qp(e){if(e instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&e instanceof MathMLElement)return"mathml"}function Gp(e){return ve(e)?document.querySelector(e):e}/*!
 * pinia v3.0.3
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */const zp=Symbol();var La;(function(e){e.direct="direct",e.patchObject="patch object",e.patchFunction="patch function"})(La||(La={}));function Kp(){const e=kd(!0),t=e.run(()=>pe({}));let n=[],r=[];const s=Ol({install(i){s._a=i,i.provide(zp,s),i.config.globalProperties.$pinia=s,r.forEach(o=>n.push(o)),r=[]},use(i){return this._a?n.push(i):r.push(i),this},_p:n,_a:null,_e:e,_s:new Map,state:t});return s}class wn{get profilePictureUrl(){return this._profilePictureUrl}get token(){return this._token}get password(){return this._password}get email(){return this._email}get favouriteChords(){return this._favouriteChords}get learnedChords(){return this._learnedChords}set email(t){this._email=t}set profilePictureUrl(t){this._profilePictureUrl=t}_email;_password;_token;_profilePictureUrl;_favouriteChords=dn(new Set);_learnedChords=dn(new Set);constructor(t,n,r){this._email=t||"",this._password=n||"",this._token=r||"",this._profilePictureUrl="",this._favouriteChords=new Set,this._learnedChords=new Set}setUser(t,n,r,s,i,o){this._email=t,this._password=n,this._token=r,this._profilePictureUrl=s,i&&i.forEach(a=>this._favouriteChords.add(a)),o&&o.forEach(a=>this._learnedChords.add(a))}}const ge=dn(new wn),Jp=()=>{};var Ma={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hu=function(e){const t=[];let n=0;for(let r=0;r<e.length;r++){let s=e.charCodeAt(r);s<128?t[n++]=s:s<2048?(t[n++]=s>>6|192,t[n++]=s&63|128):(s&64512)===55296&&r+1<e.length&&(e.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(e.charCodeAt(++r)&1023),t[n++]=s>>18|240,t[n++]=s>>12&63|128,t[n++]=s>>6&63|128,t[n++]=s&63|128):(t[n++]=s>>12|224,t[n++]=s>>6&63|128,t[n++]=s&63|128)}return t},Yp=function(e){const t=[];let n=0,r=0;for(;n<e.length;){const s=e[n++];if(s<128)t[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=e[n++];t[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=e[n++],o=e[n++],a=e[n++],c=((s&7)<<18|(i&63)<<12|(o&63)<<6|a&63)-65536;t[r++]=String.fromCharCode(55296+(c>>10)),t[r++]=String.fromCharCode(56320+(c&1023))}else{const i=e[n++],o=e[n++];t[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return t.join("")},pu={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<e.length;s+=3){const i=e[s],o=s+1<e.length,a=o?e[s+1]:0,c=s+2<e.length,l=c?e[s+2]:0,u=i>>2,f=(i&3)<<4|a>>4;let d=(a&15)<<2|l>>6,m=l&63;c||(m=64,o||(d=64)),r.push(n[u],n[f],n[d],n[m])}return r.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(hu(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):Yp(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const n=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<e.length;){const i=n[e.charAt(s++)],a=s<e.length?n[e.charAt(s)]:0;++s;const l=s<e.length?n[e.charAt(s)]:64;++s;const f=s<e.length?n[e.charAt(s)]:64;if(++s,i==null||a==null||l==null||f==null)throw new Xp;const d=i<<2|a>>4;if(r.push(d),l!==64){const m=a<<4&240|l>>2;if(r.push(m),f!==64){const g=l<<6&192|f;r.push(g)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};class Xp extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Qp=function(e){const t=hu(e);return pu.encodeByteArray(t,!0)},mu=function(e){return Qp(e).replace(/\./g,"")},gu=function(e){try{return pu.decodeString(e,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zp(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const em=()=>Zp().__FIREBASE_DEFAULTS__,tm=()=>{if(typeof process>"u"||typeof Ma>"u")return;const e=Ma.__FIREBASE_DEFAULTS__;if(e)return JSON.parse(e)},nm=()=>{if(typeof document>"u")return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=e&&gu(e[1]);return t&&JSON.parse(t)},Po=()=>{try{return Jp()||em()||tm()||nm()}catch(e){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);return}},rm=e=>Po()?.emulatorHosts?.[e],_u=()=>Po()?.config,yu=e=>Po()?.[`_${e}`];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sm{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,n)=>{this.resolve=t,this.reject=n})}wrapCallback(t){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(n):t(n,r))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qs(e){try{return(e.startsWith("http://")||e.startsWith("https://")?new URL(e).hostname:e).endsWith(".cloudworkstations.dev")}catch{return!1}}async function im(e){return(await fetch(e,{credentials:"include"})).ok}const br={};function om(){const e={prod:[],emulator:[]};for(const t of Object.keys(br))br[t]?e.emulator.push(t):e.prod.push(t);return e}function am(e){let t=document.getElementById(e),n=!1;return t||(t=document.createElement("div"),t.setAttribute("id",e),n=!0),{created:n,element:t}}let Ua=!1;function cm(e,t){if(typeof window>"u"||typeof document>"u"||!qs(window.location.host)||br[e]===t||br[e]||Ua)return;br[e]=t;function n(d){return`__firebase__banner__${d}`}const r="__firebase__banner",i=om().prod.length>0;function o(){const d=document.getElementById(r);d&&d.remove()}function a(d){d.style.display="flex",d.style.background="#7faaf0",d.style.position="fixed",d.style.bottom="5px",d.style.left="5px",d.style.padding=".5em",d.style.borderRadius="5px",d.style.alignItems="center"}function c(d,m){d.setAttribute("width","24"),d.setAttribute("id",m),d.setAttribute("height","24"),d.setAttribute("viewBox","0 0 24 24"),d.setAttribute("fill","none"),d.style.marginLeft="-6px"}function l(){const d=document.createElement("span");return d.style.cursor="pointer",d.style.marginLeft="16px",d.style.fontSize="24px",d.innerHTML=" &times;",d.onclick=()=>{Ua=!0,o()},d}function u(d,m){d.setAttribute("id",m),d.innerText="Learn more",d.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",d.setAttribute("target","__blank"),d.style.paddingLeft="5px",d.style.textDecoration="underline"}function f(){const d=am(r),m=n("text"),g=document.getElementById(m)||document.createElement("span"),b=n("learnmore"),w=document.getElementById(b)||document.createElement("a"),O=n("preprendIcon"),I=document.getElementById(O)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(d.created){const A=d.element;a(A),u(w,b);const C=l();c(I,O),A.append(I,g,w,C),document.body.appendChild(A)}i?(g.innerText="Preview backend disconnected.",I.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(I.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,g.innerText="Preview backend running in this workspace."),g.setAttribute("id",m)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",f):f()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fe(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function lm(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Fe())}function um(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function bu(){const e=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof e=="object"&&e.id!==void 0}function fm(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function dm(){const e=Fe();return e.indexOf("MSIE ")>=0||e.indexOf("Trident/")>=0}function wu(){try{return typeof indexedDB=="object"}catch{return!1}}function vu(){return new Promise((e,t)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{t(s.error?.message||"")}}catch(n){t(n)}})}function hm(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pm="FirebaseError";class Nt extends Error{constructor(t,n,r){super(n),this.code=t,this.customData=r,this.name=pm,Object.setPrototypeOf(this,Nt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ln.prototype.create)}}class Ln{constructor(t,n,r){this.service=t,this.serviceName=n,this.errors=r}create(t,...n){const r=n[0]||{},s=`${this.service}/${t}`,i=this.errors[t],o=i?mm(i,r):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new Nt(s,a,r)}}function mm(e,t){return e.replace(gm,(n,r)=>{const s=t[r];return s!=null?String(s):`<${r}?>`})}const gm=/\{\$([^}]+)}/g;function _m(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}function Rn(e,t){if(e===t)return!0;const n=Object.keys(e),r=Object.keys(t);for(const s of n){if(!r.includes(s))return!1;const i=e[s],o=t[s];if(Fa(i)&&Fa(o)){if(!Rn(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function Fa(e){return e!==null&&typeof e=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xr(e){const t=[];for(const[n,r]of Object.entries(e))Array.isArray(r)?r.forEach(s=>{t.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):t.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return t.length?"&"+t.join("&"):""}function ur(e){const t={};return e.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");t[decodeURIComponent(s)]=decodeURIComponent(i)}}),t}function fr(e){const t=e.indexOf("?");if(!t)return"";const n=e.indexOf("#",t);return e.substring(t,n>0?n:void 0)}function ym(e,t){const n=new bm(e,t);return n.subscribe.bind(n)}class bm{constructor(t,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{t(this)}).catch(r=>{this.error(r)})}next(t){this.forEachObserver(n=>{n.next(t)})}error(t){this.forEachObserver(n=>{n.error(t)}),this.close(t)}complete(){this.forEachObserver(t=>{t.complete()}),this.close()}subscribe(t,n,r){let s;if(t===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");wm(t,["next","error","complete"])?s=t:s={next:t,error:n,complete:r},s.next===void 0&&(s.next=pi),s.error===void 0&&(s.error=pi),s.complete===void 0&&(s.complete=pi);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(t){this.observers===void 0||this.observers[t]===void 0||(delete this.observers[t],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(t){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,t)}sendOne(t,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[t]!==void 0)try{n(this.observers[t])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(t){this.finalized||(this.finalized=!0,t!==void 0&&(this.finalError=t),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function wm(e,t){if(typeof e!="object"||e===null)return!1;for(const n of t)if(n in e&&typeof e[n]=="function")return!0;return!1}function pi(){}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vm=1e3,Em=2,Im=14400*1e3,Tm=.5;function Ba(e,t=vm,n=Em){const r=t*Math.pow(n,e),s=Math.round(Tm*r*(Math.random()-.5)*2);return Math.min(Im,r+s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rt(e){return e&&e._delegate?e._delegate:e}class kt{constructor(t,n,r){this.name=t,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vn="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cm{constructor(t,n){this.name=t,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const n=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(n)){const r=new sm;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(t){const n=this.normalizeInstanceIdentifier(t?.identifier),r=t?.optional??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(Am(t))try{this.getOrInitializeService({instanceIdentifier:vn})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(t=vn){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...t.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=vn){return this.instances.has(t)}getOptions(t=vn){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:n={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[i,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(i);r===a&&o.resolve(s)}return s}onInit(t,n){const r=this.normalizeInstanceIdentifier(n),s=this.onInitCallbacks.get(r)??new Set;s.add(t),this.onInitCallbacks.set(r,s);const i=this.instances.get(r);return i&&t(i,r),()=>{s.delete(t)}}invokeOnInitCallbacks(t,n){const r=this.onInitCallbacks.get(n);if(r)for(const s of r)try{s(t,n)}catch{}}getOrInitializeService({instanceIdentifier:t,options:n={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Sm(t),options:n}),this.instances.set(t,r),this.instancesOptions.set(t,n),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch{}return r||null}normalizeInstanceIdentifier(t=vn){return this.component?this.component.multipleInstances?t:vn:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Sm(e){return e===vn?void 0:e}function Am(e){return e.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rm{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const n=this.getProvider(t.name);if(n.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);n.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const n=new Cm(t,this);return this.providers.set(t,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ce;(function(e){e[e.DEBUG=0]="DEBUG",e[e.VERBOSE=1]="VERBOSE",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR",e[e.SILENT=5]="SILENT"})(ce||(ce={}));const Pm={debug:ce.DEBUG,verbose:ce.VERBOSE,info:ce.INFO,warn:ce.WARN,error:ce.ERROR,silent:ce.SILENT},Om=ce.INFO,km={[ce.DEBUG]:"log",[ce.VERBOSE]:"log",[ce.INFO]:"info",[ce.WARN]:"warn",[ce.ERROR]:"error"},Nm=(e,t,...n)=>{if(t<e.logLevel)return;const r=new Date().toISOString(),s=km[t];if(s)console[s](`[${r}]  ${e.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class Oo{constructor(t){this.name=t,this._logLevel=Om,this._logHandler=Nm,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in ce))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?Pm[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,ce.DEBUG,...t),this._logHandler(this,ce.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,ce.VERBOSE,...t),this._logHandler(this,ce.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,ce.INFO,...t),this._logHandler(this,ce.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,ce.WARN,...t),this._logHandler(this,ce.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,ce.ERROR,...t),this._logHandler(this,ce.ERROR,...t)}}const xm=(e,t)=>t.some(n=>e instanceof n);let $a,Ha;function Dm(){return $a||($a=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Lm(){return Ha||(Ha=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Eu=new WeakMap,qi=new WeakMap,Iu=new WeakMap,mi=new WeakMap,ko=new WeakMap;function Mm(e){const t=new Promise((n,r)=>{const s=()=>{e.removeEventListener("success",i),e.removeEventListener("error",o)},i=()=>{n(un(e.result)),s()},o=()=>{r(e.error),s()};e.addEventListener("success",i),e.addEventListener("error",o)});return t.then(n=>{n instanceof IDBCursor&&Eu.set(n,e)}).catch(()=>{}),ko.set(t,e),t}function Um(e){if(qi.has(e))return;const t=new Promise((n,r)=>{const s=()=>{e.removeEventListener("complete",i),e.removeEventListener("error",o),e.removeEventListener("abort",o)},i=()=>{n(),s()},o=()=>{r(e.error||new DOMException("AbortError","AbortError")),s()};e.addEventListener("complete",i),e.addEventListener("error",o),e.addEventListener("abort",o)});qi.set(e,t)}let Gi={get(e,t,n){if(e instanceof IDBTransaction){if(t==="done")return qi.get(e);if(t==="objectStoreNames")return e.objectStoreNames||Iu.get(e);if(t==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return un(e[t])},set(e,t,n){return e[t]=n,!0},has(e,t){return e instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in e}};function Fm(e){Gi=e(Gi)}function Bm(e){return e===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...n){const r=e.call(gi(this),t,...n);return Iu.set(r,t.sort?t.sort():[t]),un(r)}:Lm().includes(e)?function(...t){return e.apply(gi(this),t),un(Eu.get(this))}:function(...t){return un(e.apply(gi(this),t))}}function $m(e){return typeof e=="function"?Bm(e):(e instanceof IDBTransaction&&Um(e),xm(e,Dm())?new Proxy(e,Gi):e)}function un(e){if(e instanceof IDBRequest)return Mm(e);if(mi.has(e))return mi.get(e);const t=$m(e);return t!==e&&(mi.set(e,t),ko.set(t,e)),t}const gi=e=>ko.get(e);function Tu(e,t,{blocked:n,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(e,t),a=un(o);return r&&o.addEventListener("upgradeneeded",c=>{r(un(o.result),c.oldVersion,c.newVersion,un(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{i&&c.addEventListener("close",()=>i()),s&&c.addEventListener("versionchange",l=>s(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}const Hm=["get","getKey","getAll","getAllKeys","count"],Vm=["put","add","delete","clear"],_i=new Map;function Va(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t=="string"))return;if(_i.get(t))return _i.get(t);const n=t.replace(/FromIndex$/,""),r=t!==n,s=Vm.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||Hm.includes(n)))return;const i=async function(o,...a){const c=this.transaction(o,s?"readwrite":"readonly");let l=c.store;return r&&(l=l.index(a.shift())),(await Promise.all([l[n](...a),s&&c.done]))[0]};return _i.set(t,i),i}Fm(e=>({...e,get:(t,n,r)=>Va(t,n)||e.get(t,n,r),has:(t,n)=>!!Va(t,n)||e.has(t,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jm{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Wm(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function Wm(e){return e.getComponent()?.type==="VERSION"}const zi="@firebase/app",ja="0.14.5";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gt=new Oo("@firebase/app"),qm="@firebase/app-compat",Gm="@firebase/analytics-compat",zm="@firebase/analytics",Km="@firebase/app-check-compat",Jm="@firebase/app-check",Ym="@firebase/auth",Xm="@firebase/auth-compat",Qm="@firebase/database",Zm="@firebase/data-connect",eg="@firebase/database-compat",tg="@firebase/functions",ng="@firebase/functions-compat",rg="@firebase/installations",sg="@firebase/installations-compat",ig="@firebase/messaging",og="@firebase/messaging-compat",ag="@firebase/performance",cg="@firebase/performance-compat",lg="@firebase/remote-config",ug="@firebase/remote-config-compat",fg="@firebase/storage",dg="@firebase/storage-compat",hg="@firebase/firestore",pg="@firebase/ai",mg="@firebase/firestore-compat",gg="firebase",_g="12.5.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ki="[DEFAULT]",yg={[zi]:"fire-core",[qm]:"fire-core-compat",[zm]:"fire-analytics",[Gm]:"fire-analytics-compat",[Jm]:"fire-app-check",[Km]:"fire-app-check-compat",[Ym]:"fire-auth",[Xm]:"fire-auth-compat",[Qm]:"fire-rtdb",[Zm]:"fire-data-connect",[eg]:"fire-rtdb-compat",[tg]:"fire-fn",[ng]:"fire-fn-compat",[rg]:"fire-iid",[sg]:"fire-iid-compat",[ig]:"fire-fcm",[og]:"fire-fcm-compat",[ag]:"fire-perf",[cg]:"fire-perf-compat",[lg]:"fire-rc",[ug]:"fire-rc-compat",[fg]:"fire-gcs",[dg]:"fire-gcs-compat",[hg]:"fire-fst",[mg]:"fire-fst-compat",[pg]:"fire-vertex","fire-js":"fire-js",[gg]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Is=new Map,bg=new Map,Ji=new Map;function Wa(e,t){try{e.container.addComponent(t)}catch(n){Gt.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function zt(e){const t=e.name;if(Ji.has(t))return Gt.debug(`There were multiple attempts to register component ${t}.`),!1;Ji.set(t,e);for(const n of Is.values())Wa(n,e);for(const n of bg.values())Wa(n,e);return!0}function er(e,t){const n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}function Ze(e){return e==null?!1:e.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wg={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},fn=new Ln("app","Firebase",wg);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vg{constructor(t,n,r){this._isDeleted=!1,this._options={...t},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new kt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw fn.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dr=_g;function Cu(e,t={}){let n=e;typeof t!="object"&&(t={name:t});const r={name:Ki,automaticDataCollectionEnabled:!0,...t},s=r.name;if(typeof s!="string"||!s)throw fn.create("bad-app-name",{appName:String(s)});if(n||(n=_u()),!n)throw fn.create("no-options");const i=Is.get(s);if(i){if(Rn(n,i.options)&&Rn(r,i.config))return i;throw fn.create("duplicate-app",{appName:s})}const o=new Rm(s);for(const c of Ji.values())o.addComponent(c);const a=new vg(n,r,o);return Is.set(s,a),a}function Su(e=Ki){const t=Is.get(e);if(!t&&e===Ki&&_u())return Cu();if(!t)throw fn.create("no-app",{appName:e});return t}function Rt(e,t,n){let r=yg[e]??e;n&&(r+=`-${n}`);const s=r.match(/\s|\//),i=t.match(/\s|\//);if(s||i){const o=[`Unable to register library "${r}" with version "${t}":`];s&&o.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&o.push("and"),i&&o.push(`version name "${t}" contains illegal characters (whitespace or "/")`),Gt.warn(o.join(" "));return}zt(new kt(`${r}-version`,()=>({library:r,version:t}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Eg="firebase-heartbeat-database",Ig=1,Ar="firebase-heartbeat-store";let yi=null;function Au(){return yi||(yi=Tu(Eg,Ig,{upgrade:(e,t)=>{switch(t){case 0:try{e.createObjectStore(Ar)}catch(n){console.warn(n)}}}}).catch(e=>{throw fn.create("idb-open",{originalErrorMessage:e.message})})),yi}async function Tg(e){try{const n=(await Au()).transaction(Ar),r=await n.objectStore(Ar).get(Ru(e));return await n.done,r}catch(t){if(t instanceof Nt)Gt.warn(t.message);else{const n=fn.create("idb-get",{originalErrorMessage:t?.message});Gt.warn(n.message)}}}async function qa(e,t){try{const r=(await Au()).transaction(Ar,"readwrite");await r.objectStore(Ar).put(t,Ru(e)),await r.done}catch(n){if(n instanceof Nt)Gt.warn(n.message);else{const r=fn.create("idb-set",{originalErrorMessage:n?.message});Gt.warn(r.message)}}}function Ru(e){return`${e.name}!${e.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cg=1024,Sg=30;class Ag{constructor(t){this.container=t,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Pg(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=Ga();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(s=>s.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:n}),this._heartbeatsCache.heartbeats.length>Sg){const s=Og(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(t){Gt.warn(t)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Ga(),{heartbeatsToSend:n,unsentEntries:r}=Rg(this._heartbeatsCache.heartbeats),s=mu(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=t,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(t){return Gt.warn(t),""}}}function Ga(){return new Date().toISOString().substring(0,10)}function Rg(e,t=Cg){const n=[];let r=e.slice();for(const s of e){const i=n.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),za(n)>t){i.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),za(n)>t){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class Pg{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return wu()?vu().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await Tg(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){if(await this._canUseIndexedDBPromise){const r=await this.read();return qa(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){if(await this._canUseIndexedDBPromise){const r=await this.read();return qa(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...t.heartbeats]})}else return}}function za(e){return mu(JSON.stringify({version:2,heartbeats:e})).length}function Og(e){if(e.length===0)return-1;let t=0,n=e[0].date;for(let r=1;r<e.length;r++)e[r].date<n&&(n=e[r].date,t=r);return t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kg(e){zt(new kt("platform-logger",t=>new jm(t),"PRIVATE")),zt(new kt("heartbeat",t=>new Ag(t),"PRIVATE")),Rt(zi,ja,e),Rt(zi,ja,"esm2020"),Rt("fire-js","")}kg("");var Ng="firebase",xg="12.5.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Rt(Ng,xg,"app");const Pu="@firebase/installations",No="0.6.19";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ou=1e4,ku=`w:${No}`,Nu="FIS_v2",Dg="https://firebaseinstallations.googleapis.com/v1",Lg=3600*1e3,Mg="installations",Ug="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fg={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},Pn=new Ln(Mg,Ug,Fg);function xu(e){return e instanceof Nt&&e.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Du({projectId:e}){return`${Dg}/projects/${e}/installations`}function Lu(e){return{token:e.token,requestStatus:2,expiresIn:$g(e.expiresIn),creationTime:Date.now()}}async function Mu(e,t){const r=(await t.json()).error;return Pn.create("request-failed",{requestName:e,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function Uu({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function Bg(e,{refreshToken:t}){const n=Uu(e);return n.append("Authorization",Hg(t)),n}async function Fu(e){const t=await e();return t.status>=500&&t.status<600?e():t}function $g(e){return Number(e.replace("s","000"))}function Hg(e){return`${Nu} ${e}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Vg({appConfig:e,heartbeatServiceProvider:t},{fid:n}){const r=Du(e),s=Uu(e),i=t.getImmediate({optional:!0});if(i){const l=await i.getHeartbeatsHeader();l&&s.append("x-firebase-client",l)}const o={fid:n,authVersion:Nu,appId:e.appId,sdkVersion:ku},a={method:"POST",headers:s,body:JSON.stringify(o)},c=await Fu(()=>fetch(r,a));if(c.ok){const l=await c.json();return{fid:l.fid||n,registrationStatus:2,refreshToken:l.refreshToken,authToken:Lu(l.authToken)}}else throw await Mu("Create Installation",c)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bu(e){return new Promise(t=>{setTimeout(t,e)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jg(e){return btoa(String.fromCharCode(...e)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wg=/^[cdef][\w-]{21}$/,Yi="";function qg(){try{const e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;const n=Gg(e);return Wg.test(n)?n:Yi}catch{return Yi}}function Gg(e){return jg(e).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gs(e){return`${e.appName}!${e.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $u=new Map;function Hu(e,t){const n=Gs(e);Vu(n,t),zg(n,t)}function Vu(e,t){const n=$u.get(e);if(n)for(const r of n)r(t)}function zg(e,t){const n=Kg();n&&n.postMessage({key:e,fid:t}),Jg()}let En=null;function Kg(){return!En&&"BroadcastChannel"in self&&(En=new BroadcastChannel("[Firebase] FID Change"),En.onmessage=e=>{Vu(e.data.key,e.data.fid)}),En}function Jg(){$u.size===0&&En&&(En.close(),En=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yg="firebase-installations-database",Xg=1,On="firebase-installations-store";let bi=null;function xo(){return bi||(bi=Tu(Yg,Xg,{upgrade:(e,t)=>{switch(t){case 0:e.createObjectStore(On)}}})),bi}async function Ts(e,t){const n=Gs(e),s=(await xo()).transaction(On,"readwrite"),i=s.objectStore(On),o=await i.get(n);return await i.put(t,n),await s.done,(!o||o.fid!==t.fid)&&Hu(e,t.fid),t}async function ju(e){const t=Gs(e),r=(await xo()).transaction(On,"readwrite");await r.objectStore(On).delete(t),await r.done}async function zs(e,t){const n=Gs(e),s=(await xo()).transaction(On,"readwrite"),i=s.objectStore(On),o=await i.get(n),a=t(o);return a===void 0?await i.delete(n):await i.put(a,n),await s.done,a&&(!o||o.fid!==a.fid)&&Hu(e,a.fid),a}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Do(e){let t;const n=await zs(e.appConfig,r=>{const s=Qg(r),i=Zg(e,s);return t=i.registrationPromise,i.installationEntry});return n.fid===Yi?{installationEntry:await t}:{installationEntry:n,registrationPromise:t}}function Qg(e){const t=e||{fid:qg(),registrationStatus:0};return Wu(t)}function Zg(e,t){if(t.registrationStatus===0){if(!navigator.onLine){const s=Promise.reject(Pn.create("app-offline"));return{installationEntry:t,registrationPromise:s}}const n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},r=e_(e,n);return{installationEntry:n,registrationPromise:r}}else return t.registrationStatus===1?{installationEntry:t,registrationPromise:t_(e)}:{installationEntry:t}}async function e_(e,t){try{const n=await Vg(e,t);return Ts(e.appConfig,n)}catch(n){throw xu(n)&&n.customData.serverCode===409?await ju(e.appConfig):await Ts(e.appConfig,{fid:t.fid,registrationStatus:0}),n}}async function t_(e){let t=await Ka(e.appConfig);for(;t.registrationStatus===1;)await Bu(100),t=await Ka(e.appConfig);if(t.registrationStatus===0){const{installationEntry:n,registrationPromise:r}=await Do(e);return r||n}return t}function Ka(e){return zs(e,t=>{if(!t)throw Pn.create("installation-not-found");return Wu(t)})}function Wu(e){return n_(e)?{fid:e.fid,registrationStatus:0}:e}function n_(e){return e.registrationStatus===1&&e.registrationTime+Ou<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function r_({appConfig:e,heartbeatServiceProvider:t},n){const r=s_(e,n),s=Bg(e,n),i=t.getImmediate({optional:!0});if(i){const l=await i.getHeartbeatsHeader();l&&s.append("x-firebase-client",l)}const o={installation:{sdkVersion:ku,appId:e.appId}},a={method:"POST",headers:s,body:JSON.stringify(o)},c=await Fu(()=>fetch(r,a));if(c.ok){const l=await c.json();return Lu(l)}else throw await Mu("Generate Auth Token",c)}function s_(e,{fid:t}){return`${Du(e)}/${t}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Lo(e,t=!1){let n;const r=await zs(e.appConfig,i=>{if(!qu(i))throw Pn.create("not-registered");const o=i.authToken;if(!t&&a_(o))return i;if(o.requestStatus===1)return n=i_(e,t),i;{if(!navigator.onLine)throw Pn.create("app-offline");const a=l_(i);return n=o_(e,a),a}});return n?await n:r.authToken}async function i_(e,t){let n=await Ja(e.appConfig);for(;n.authToken.requestStatus===1;)await Bu(100),n=await Ja(e.appConfig);const r=n.authToken;return r.requestStatus===0?Lo(e,t):r}function Ja(e){return zs(e,t=>{if(!qu(t))throw Pn.create("not-registered");const n=t.authToken;return u_(n)?{...t,authToken:{requestStatus:0}}:t})}async function o_(e,t){try{const n=await r_(e,t),r={...t,authToken:n};return await Ts(e.appConfig,r),n}catch(n){if(xu(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await ju(e.appConfig);else{const r={...t,authToken:{requestStatus:0}};await Ts(e.appConfig,r)}throw n}}function qu(e){return e!==void 0&&e.registrationStatus===2}function a_(e){return e.requestStatus===2&&!c_(e)}function c_(e){const t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+Lg}function l_(e){const t={requestStatus:1,requestTime:Date.now()};return{...e,authToken:t}}function u_(e){return e.requestStatus===1&&e.requestTime+Ou<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function f_(e){const t=e,{installationEntry:n,registrationPromise:r}=await Do(t);return r?r.catch(console.error):Lo(t).catch(console.error),n.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function d_(e,t=!1){const n=e;return await h_(n),(await Lo(n,t)).token}async function h_(e){const{registrationPromise:t}=await Do(e);t&&await t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function p_(e){if(!e||!e.options)throw wi("App Configuration");if(!e.name)throw wi("App Name");const t=["projectId","apiKey","appId"];for(const n of t)if(!e.options[n])throw wi(n);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}function wi(e){return Pn.create("missing-app-config-values",{valueName:e})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gu="installations",m_="installations-internal",g_=e=>{const t=e.getProvider("app").getImmediate(),n=p_(t),r=er(t,"heartbeat");return{app:t,appConfig:n,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},__=e=>{const t=e.getProvider("app").getImmediate(),n=er(t,Gu).getImmediate();return{getId:()=>f_(n),getToken:s=>d_(n,s)}};function y_(){zt(new kt(Gu,g_,"PUBLIC")),zt(new kt(m_,__,"PRIVATE"))}y_();Rt(Pu,No);Rt(Pu,No,"esm2020");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cs="analytics",b_="firebase_id",w_="origin",v_=60*1e3,E_="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",Mo="https://www.googletagmanager.com/gtag/js";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ue=new Oo("@firebase/analytics");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const I_={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},Je=new Ln("analytics","Analytics",I_);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function T_(e){if(!e.startsWith(Mo)){const t=Je.create("invalid-gtag-resource",{gtagURL:e});return Ue.warn(t.message),""}return e}function zu(e){return Promise.all(e.map(t=>t.catch(n=>n)))}function C_(e,t){let n;return window.trustedTypes&&(n=window.trustedTypes.createPolicy(e,t)),n}function S_(e,t){const n=C_("firebase-js-sdk-policy",{createScriptURL:T_}),r=document.createElement("script"),s=`${Mo}?l=${e}&id=${t}`;r.src=n?n?.createScriptURL(s):s,r.async=!0,document.head.appendChild(r)}function A_(e){let t=[];return Array.isArray(window[e])?t=window[e]:window[e]=t,t}async function R_(e,t,n,r,s,i){const o=r[s];try{if(o)await t[o];else{const c=(await zu(n)).find(l=>l.measurementId===s);c&&await t[c.appId]}}catch(a){Ue.error(a)}e("config",s,i)}async function P_(e,t,n,r,s){try{let i=[];if(s&&s.send_to){let o=s.send_to;Array.isArray(o)||(o=[o]);const a=await zu(n);for(const c of o){const l=a.find(f=>f.measurementId===c),u=l&&t[l.appId];if(u)i.push(u);else{i=[];break}}}i.length===0&&(i=Object.values(t)),await Promise.all(i),e("event",r,s||{})}catch(i){Ue.error(i)}}function O_(e,t,n,r){async function s(i,...o){try{if(i==="event"){const[a,c]=o;await P_(e,t,n,a,c)}else if(i==="config"){const[a,c]=o;await R_(e,t,n,r,a,c)}else if(i==="consent"){const[a,c]=o;e("consent",a,c)}else if(i==="get"){const[a,c,l]=o;e("get",a,c,l)}else if(i==="set"){const[a]=o;e("set",a)}else e(i,...o)}catch(a){Ue.error(a)}}return s}function k_(e,t,n,r,s){let i=function(...o){window[r].push(arguments)};return window[s]&&typeof window[s]=="function"&&(i=window[s]),window[s]=O_(i,e,t,n),{gtagCore:i,wrappedGtag:window[s]}}function N_(e){const t=window.document.getElementsByTagName("script");for(const n of Object.values(t))if(n.src&&n.src.includes(Mo)&&n.src.includes(e))return n;return null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const x_=30,D_=1e3;class L_{constructor(t={},n=D_){this.throttleMetadata=t,this.intervalMillis=n}getThrottleMetadata(t){return this.throttleMetadata[t]}setThrottleMetadata(t,n){this.throttleMetadata[t]=n}deleteThrottleMetadata(t){delete this.throttleMetadata[t]}}const Ku=new L_;function M_(e){return new Headers({Accept:"application/json","x-goog-api-key":e})}async function U_(e){const{appId:t,apiKey:n}=e,r={method:"GET",headers:M_(n)},s=E_.replace("{app-id}",t),i=await fetch(s,r);if(i.status!==200&&i.status!==304){let o="";try{const a=await i.json();a.error?.message&&(o=a.error.message)}catch{}throw Je.create("config-fetch-failed",{httpStatus:i.status,responseMessage:o})}return i.json()}async function F_(e,t=Ku,n){const{appId:r,apiKey:s,measurementId:i}=e.options;if(!r)throw Je.create("no-app-id");if(!s){if(i)return{measurementId:i,appId:r};throw Je.create("no-api-key")}const o=t.getThrottleMetadata(r)||{backoffCount:0,throttleEndTimeMillis:Date.now()},a=new H_;return setTimeout(async()=>{a.abort()},v_),Ju({appId:r,apiKey:s,measurementId:i},o,a,t)}async function Ju(e,{throttleEndTimeMillis:t,backoffCount:n},r,s=Ku){const{appId:i,measurementId:o}=e;try{await B_(r,t)}catch(a){if(o)return Ue.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${a?.message}]`),{appId:i,measurementId:o};throw a}try{const a=await U_(e);return s.deleteThrottleMetadata(i),a}catch(a){const c=a;if(!$_(c)){if(s.deleteThrottleMetadata(i),o)return Ue.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${c?.message}]`),{appId:i,measurementId:o};throw a}const l=Number(c?.customData?.httpStatus)===503?Ba(n,s.intervalMillis,x_):Ba(n,s.intervalMillis),u={throttleEndTimeMillis:Date.now()+l,backoffCount:n+1};return s.setThrottleMetadata(i,u),Ue.debug(`Calling attemptFetch again in ${l} millis`),Ju(e,u,r,s)}}function B_(e,t){return new Promise((n,r)=>{const s=Math.max(t-Date.now(),0),i=setTimeout(n,s);e.addEventListener(()=>{clearTimeout(i),r(Je.create("fetch-throttle",{throttleEndTimeMillis:t}))})})}function $_(e){if(!(e instanceof Nt)||!e.customData)return!1;const t=Number(e.customData.httpStatus);return t===429||t===500||t===503||t===504}class H_{constructor(){this.listeners=[]}addEventListener(t){this.listeners.push(t)}abort(){this.listeners.forEach(t=>t())}}async function V_(e,t,n,r,s){if(s&&s.global){e("event",n,r);return}else{const i=await t,o={...r,send_to:i};e("event",n,o)}}async function j_(e,t,n,r){if(r&&r.global){const s={};for(const i of Object.keys(n))s[`user_properties.${i}`]=n[i];return e("set",s),Promise.resolve()}else{const s=await t;e("config",s,{update:!0,user_properties:n})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function W_(){if(wu())try{await vu()}catch(e){return Ue.warn(Je.create("indexeddb-unavailable",{errorInfo:e?.toString()}).message),!1}else return Ue.warn(Je.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function q_(e,t,n,r,s,i,o){const a=F_(e);a.then(d=>{n[d.measurementId]=d.appId,e.options.measurementId&&d.measurementId!==e.options.measurementId&&Ue.warn(`The measurement ID in the local Firebase config (${e.options.measurementId}) does not match the measurement ID fetched from the server (${d.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(d=>Ue.error(d)),t.push(a);const c=W_().then(d=>{if(d)return r.getId()}),[l,u]=await Promise.all([a,c]);N_(i)||S_(i,l.measurementId),s("js",new Date);const f=o?.config??{};return f[w_]="firebase",f.update=!0,u!=null&&(f[b_]=u),s("config",l.measurementId,f),l.measurementId}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G_{constructor(t){this.app=t}_delete(){return delete qn[this.app.options.appId],Promise.resolve()}}let qn={},Ya=[];const Xa={};let vi="dataLayer",z_="gtag",Qa,Uo,Za=!1;function K_(){const e=[];if(bu()&&e.push("This is a browser extension environment."),hm()||e.push("Cookies are not available."),e.length>0){const t=e.map((r,s)=>`(${s+1}) ${r}`).join(" "),n=Je.create("invalid-analytics-context",{errorInfo:t});Ue.warn(n.message)}}function J_(e,t,n){K_();const r=e.options.appId;if(!r)throw Je.create("no-app-id");if(!e.options.apiKey)if(e.options.measurementId)Ue.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${e.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw Je.create("no-api-key");if(qn[r]!=null)throw Je.create("already-exists",{id:r});if(!Za){A_(vi);const{wrappedGtag:i,gtagCore:o}=k_(qn,Ya,Xa,vi,z_);Uo=i,Qa=o,Za=!0}return qn[r]=q_(e,Ya,Xa,t,Qa,vi,n),new G_(e)}function Y_(e=Su()){e=rt(e);const t=er(e,Cs);return t.isInitialized()?t.getImmediate():X_(e)}function X_(e,t={}){const n=er(e,Cs);if(n.isInitialized()){const s=n.getImmediate();if(Rn(t,n.getOptions()))return s;throw Je.create("already-initialized")}return n.initialize({options:t})}function Q_(e,t,n){e=rt(e),j_(Uo,qn[e.app.options.appId],t,n).catch(r=>Ue.error(r))}function Z_(e,t,n,r){e=rt(e),V_(Uo,qn[e.app.options.appId],t,n,r).catch(s=>Ue.error(s))}const ec="@firebase/analytics",tc="0.10.19";function ey(){zt(new kt(Cs,(t,{options:n})=>{const r=t.getProvider("app").getImmediate(),s=t.getProvider("installations-internal").getImmediate();return J_(r,s,n)},"PUBLIC")),zt(new kt("analytics-internal",e,"PRIVATE")),Rt(ec,tc),Rt(ec,tc,"esm2020");function e(t){try{const n=t.getProvider(Cs).getImmediate();return{logEvent:(r,s,i)=>Z_(n,r,s,i),setUserProperties:(r,s)=>Q_(n,r,s)}}catch(n){throw Je.create("interop-component-reg-failed",{reason:n})}}}ey();function Yu(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const ty=Yu,Xu=new Ln("auth","Firebase",Yu());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ss=new Oo("@firebase/auth");function ny(e,...t){Ss.logLevel<=ce.WARN&&Ss.warn(`Auth (${Dr}): ${e}`,...t)}function is(e,...t){Ss.logLevel<=ce.ERROR&&Ss.error(`Auth (${Dr}): ${e}`,...t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nt(e,...t){throw Bo(e,...t)}function ft(e,...t){return Bo(e,...t)}function Fo(e,t,n){const r={...ty(),[t]:n};return new Ln("auth","Firebase",r).create(t,{appName:e.name})}function jt(e){return Fo(e,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function ry(e,t,n){const r=n;if(!(t instanceof r))throw r.name!==t.constructor.name&&nt(e,"argument-error"),Fo(e,"argument-error",`Type of ${t.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Bo(e,...t){if(typeof e!="string"){const n=t[0],r=[...t.slice(1)];return r[0]&&(r[0].appName=e.name),e._errorFactory.create(n,...r)}return Xu.create(e,...t)}function j(e,t,...n){if(!e)throw Bo(t,...n)}function Ht(e){const t="INTERNAL ASSERTION FAILED: "+e;throw is(t),new Error(t)}function Kt(e,t){e||Ht(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xi(){return typeof self<"u"&&self.location?.href||""}function sy(){return nc()==="http:"||nc()==="https:"}function nc(){return typeof self<"u"&&self.location?.protocol||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iy(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(sy()||bu()||"connection"in navigator)?navigator.onLine:!0}function oy(){if(typeof navigator>"u")return null;const e=navigator;return e.languages&&e.languages[0]||e.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lr{constructor(t,n){this.shortDelay=t,this.longDelay=n,Kt(n>t,"Short delay should be less than long delay!"),this.isMobile=lm()||fm()}get(){return iy()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $o(e,t){Kt(e.emulator,"Emulator should always be set here");const{url:n}=e.emulator;return t?`${n}${t.startsWith("/")?t.slice(1):t}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qu{static initialize(t,n,r){this.fetchImpl=t,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Ht("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Ht("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Ht("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ay={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cy=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],ly=new Lr(3e4,6e4);function Yt(e,t){return e.tenantId&&!t.tenantId?{...t,tenantId:e.tenantId}:t}async function Xt(e,t,n,r,s={}){return Zu(e,s,async()=>{let i={},o={};r&&(t==="GET"?o=r:i={body:JSON.stringify(r)});const a=xr({key:e.config.apiKey,...o}).slice(1),c=await e._getAdditionalHeaders();c["Content-Type"]="application/json",e.languageCode&&(c["X-Firebase-Locale"]=e.languageCode);const l={method:t,headers:c,...i};return um()||(l.referrerPolicy="no-referrer"),e.emulatorConfig&&qs(e.emulatorConfig.host)&&(l.credentials="include"),Qu.fetch()(await ef(e,e.config.apiHost,n,a),l)})}async function Zu(e,t,n){e._canInitEmulator=!1;const r={...ay,...t};try{const s=new fy(e),i=await Promise.race([n(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw Jr(e,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const a=i.ok?o.errorMessage:o.error.message,[c,l]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw Jr(e,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw Jr(e,"email-already-in-use",o);if(c==="USER_DISABLED")throw Jr(e,"user-disabled",o);const u=r[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw Fo(e,u,l);nt(e,u)}}catch(s){if(s instanceof Nt)throw s;nt(e,"network-request-failed",{message:String(s)})}}async function Mr(e,t,n,r,s={}){const i=await Xt(e,t,n,r,s);return"mfaPendingCredential"in i&&nt(e,"multi-factor-auth-required",{_serverResponse:i}),i}async function ef(e,t,n,r){const s=`${t}${n}?${r}`,i=e,o=i.config.emulator?$o(e.config,s):`${e.config.apiScheme}://${s}`;return cy.includes(n)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(o).toString():o}function uy(e){switch(e){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class fy{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(t){this.auth=t,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(ft(this.auth,"network-request-failed")),ly.get())})}}function Jr(e,t,n){const r={appName:e.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const s=ft(e,t,r);return s.customData._tokenResponse=n,s}function rc(e){return e!==void 0&&e.enterprise!==void 0}class dy{constructor(t){if(this.siteKey="",this.recaptchaEnforcementState=[],t.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=t.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=t.recaptchaEnforcementState}getProviderEnforcementState(t){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const n of this.recaptchaEnforcementState)if(n.provider&&n.provider===t)return uy(n.enforcementState);return null}isProviderEnabled(t){return this.getProviderEnforcementState(t)==="ENFORCE"||this.getProviderEnforcementState(t)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function hy(e,t){return Xt(e,"GET","/v2/recaptchaConfig",Yt(e,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function py(e,t){return Xt(e,"POST","/v1/accounts:delete",t)}async function As(e,t){return Xt(e,"POST","/v1/accounts:lookup",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wr(e){if(e)try{const t=new Date(Number(e));if(!isNaN(t.getTime()))return t.toUTCString()}catch{}}async function my(e,t=!1){const n=rt(e),r=await n.getIdToken(t),s=Ho(r);j(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i?.sign_in_provider;return{claims:s,token:r,authTime:wr(Ei(s.auth_time)),issuedAtTime:wr(Ei(s.iat)),expirationTime:wr(Ei(s.exp)),signInProvider:o||null,signInSecondFactor:i?.sign_in_second_factor||null}}function Ei(e){return Number(e)*1e3}function Ho(e){const[t,n,r]=e.split(".");if(t===void 0||n===void 0||r===void 0)return is("JWT malformed, contained fewer than 3 sections"),null;try{const s=gu(n);return s?JSON.parse(s):(is("Failed to decode base64 JWT payload"),null)}catch(s){return is("Caught error parsing JWT payload as JSON",s?.toString()),null}}function sc(e){const t=Ho(e);return j(t,"internal-error"),j(typeof t.exp<"u","internal-error"),j(typeof t.iat<"u","internal-error"),Number(t.exp)-Number(t.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Rr(e,t,n=!1){if(n)return t;try{return await t}catch(r){throw r instanceof Nt&&gy(r)&&e.auth.currentUser===e&&await e.auth.signOut(),r}}function gy({code:e}){return e==="auth/user-disabled"||e==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _y{constructor(t){this.user=t,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(t){if(t){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(t=!1){if(!this.isRunning)return;const n=this.getInterval(t);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(t){t?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qi{constructor(t,n){this.createdAt=t,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=wr(this.lastLoginAt),this.creationTime=wr(this.createdAt)}_copy(t){this.createdAt=t.createdAt,this.lastLoginAt=t.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Rs(e){const t=e.auth,n=await e.getIdToken(),r=await Rr(e,As(t,{idToken:n}));j(r?.users.length,t,"internal-error");const s=r.users[0];e._notifyReloadListener(s);const i=s.providerUserInfo?.length?tf(s.providerUserInfo):[],o=by(e.providerData,i),a=e.isAnonymous,c=!(e.email&&s.passwordHash)&&!o?.length,l=a?c:!1,u={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new Qi(s.createdAt,s.lastLoginAt),isAnonymous:l};Object.assign(e,u)}async function yy(e){const t=rt(e);await Rs(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}function by(e,t){return[...e.filter(r=>!t.some(s=>s.providerId===r.providerId)),...t]}function tf(e){return e.map(({providerId:t,...n})=>({providerId:t,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wy(e,t){const n=await Zu(e,{},async()=>{const r=xr({grant_type:"refresh_token",refresh_token:t}).slice(1),{tokenApiHost:s,apiKey:i}=e.config,o=await ef(e,s,"/v1/token",`key=${i}`),a=await e._getAdditionalHeaders();a["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:a,body:r};return e.emulatorConfig&&qs(e.emulatorConfig.host)&&(c.credentials="include"),Qu.fetch()(o,c)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function vy(e,t){return Xt(e,"POST","/v2/accounts:revokeToken",Yt(e,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(t){j(t.idToken,"internal-error"),j(typeof t.idToken<"u","internal-error"),j(typeof t.refreshToken<"u","internal-error");const n="expiresIn"in t&&typeof t.expiresIn<"u"?Number(t.expiresIn):sc(t.idToken);this.updateTokensAndExpiration(t.idToken,t.refreshToken,n)}updateFromIdToken(t){j(t.length!==0,"internal-error");const n=sc(t);this.updateTokensAndExpiration(t,null,n)}async getToken(t,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(j(this.refreshToken,t,"user-token-expired"),this.refreshToken?(await this.refresh(t,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(t,n){const{accessToken:r,refreshToken:s,expiresIn:i}=await wy(t,n);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(t,n,r){this.refreshToken=n||null,this.accessToken=t||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(t,n){const{refreshToken:r,accessToken:s,expirationTime:i}=n,o=new Gn;return r&&(j(typeof r=="string","internal-error",{appName:t}),o.refreshToken=r),s&&(j(typeof s=="string","internal-error",{appName:t}),o.accessToken=s),i&&(j(typeof i=="number","internal-error",{appName:t}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(t){this.accessToken=t.accessToken,this.refreshToken=t.refreshToken,this.expirationTime=t.expirationTime}_clone(){return Object.assign(new Gn,this.toJSON())}_performRefresh(){return Ht("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zt(e,t){j(typeof e=="string"||typeof e>"u","internal-error",{appName:t})}class ct{constructor({uid:t,auth:n,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new _y(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=n,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Qi(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(t){const n=await Rr(this,this.stsTokenManager.getToken(this.auth,t));return j(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(t){return my(this,t)}reload(){return yy(this)}_assign(t){this!==t&&(j(this.uid===t.uid,this.auth,"internal-error"),this.displayName=t.displayName,this.photoURL=t.photoURL,this.email=t.email,this.emailVerified=t.emailVerified,this.phoneNumber=t.phoneNumber,this.isAnonymous=t.isAnonymous,this.tenantId=t.tenantId,this.providerData=t.providerData.map(n=>({...n})),this.metadata._copy(t.metadata),this.stsTokenManager._assign(t.stsTokenManager))}_clone(t){const n=new ct({...this,auth:t,stsTokenManager:this.stsTokenManager._clone()});return n.metadata._copy(this.metadata),n}_onReload(t){j(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=t,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(t){this.reloadListener?this.reloadListener(t):this.reloadUserInfo=t}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(t,n=!1){let r=!1;t.idToken&&t.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(t),r=!0),n&&await Rs(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Ze(this.auth.app))return Promise.reject(jt(this.auth));const t=await this.getIdToken();return await Rr(this,py(this.auth,{idToken:t})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(t=>({...t})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(t,n){const r=n.displayName??void 0,s=n.email??void 0,i=n.phoneNumber??void 0,o=n.photoURL??void 0,a=n.tenantId??void 0,c=n._redirectEventId??void 0,l=n.createdAt??void 0,u=n.lastLoginAt??void 0,{uid:f,emailVerified:d,isAnonymous:m,providerData:g,stsTokenManager:b}=n;j(f&&b,t,"internal-error");const w=Gn.fromJSON(this.name,b);j(typeof f=="string",t,"internal-error"),Zt(r,t.name),Zt(s,t.name),j(typeof d=="boolean",t,"internal-error"),j(typeof m=="boolean",t,"internal-error"),Zt(i,t.name),Zt(o,t.name),Zt(a,t.name),Zt(c,t.name),Zt(l,t.name),Zt(u,t.name);const O=new ct({uid:f,auth:t,email:s,emailVerified:d,displayName:r,isAnonymous:m,photoURL:o,phoneNumber:i,tenantId:a,stsTokenManager:w,createdAt:l,lastLoginAt:u});return g&&Array.isArray(g)&&(O.providerData=g.map(I=>({...I}))),c&&(O._redirectEventId=c),O}static async _fromIdTokenResponse(t,n,r=!1){const s=new Gn;s.updateFromServerResponse(n);const i=new ct({uid:n.localId,auth:t,stsTokenManager:s,isAnonymous:r});return await Rs(i),i}static async _fromGetAccountInfoResponse(t,n,r){const s=n.users[0];j(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?tf(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!i?.length,a=new Gn;a.updateFromIdToken(r);const c=new ct({uid:s.localId,auth:t,stsTokenManager:a,isAnonymous:o}),l={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new Qi(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!i?.length};return Object.assign(c,l),c}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ic=new Map;function Vt(e){Kt(e instanceof Function,"Expected a class definition");let t=ic.get(e);return t?(Kt(t instanceof e,"Instance stored in cache mismatched with class"),t):(t=new e,ic.set(e,t),t)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nf{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(t,n){this.storage[t]=n}async _get(t){const n=this.storage[t];return n===void 0?null:n}async _remove(t){delete this.storage[t]}_addListener(t,n){}_removeListener(t,n){}}nf.type="NONE";const oc=nf;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function os(e,t,n){return`firebase:${e}:${t}:${n}`}class zn{constructor(t,n,r){this.persistence=t,this.auth=n,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=os(this.userKey,s.apiKey,i),this.fullPersistenceKey=os("persistence",s.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(t){return this.persistence._set(this.fullUserKey,t.toJSON())}async getCurrentUser(){const t=await this.persistence._get(this.fullUserKey);if(!t)return null;if(typeof t=="string"){const n=await As(this.auth,{idToken:t}).catch(()=>{});return n?ct._fromGetAccountInfoResponse(this.auth,n,t):null}return ct._fromJSON(this.auth,t)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(t){if(this.persistence===t)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=t,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(t,n,r="authUser"){if(!n.length)return new zn(Vt(oc),t,r);const s=(await Promise.all(n.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let i=s[0]||Vt(oc);const o=os(r,t.config.apiKey,t.name);let a=null;for(const l of n)try{const u=await l._get(o);if(u){let f;if(typeof u=="string"){const d=await As(t,{idToken:u}).catch(()=>{});if(!d)break;f=await ct._fromGetAccountInfoResponse(t,d,u)}else f=ct._fromJSON(t,u);l!==i&&(a=f),i=l;break}}catch{}const c=s.filter(l=>l._shouldAllowMigration);return!i._shouldAllowMigration||!c.length?new zn(i,t,r):(i=c[0],a&&await i._set(o,a.toJSON()),await Promise.all(n.map(async l=>{if(l!==i)try{await l._remove(o)}catch{}})),new zn(i,t,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ac(e){const t=e.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/"))return"Opera";if(af(t))return"IEMobile";if(t.includes("msie")||t.includes("trident/"))return"IE";if(t.includes("edge/"))return"Edge";if(rf(t))return"Firefox";if(t.includes("silk/"))return"Silk";if(lf(t))return"Blackberry";if(uf(t))return"Webos";if(sf(t))return"Safari";if((t.includes("chrome/")||of(t))&&!t.includes("edge/"))return"Chrome";if(cf(t))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=e.match(n);if(r?.length===2)return r[1]}return"Other"}function rf(e=Fe()){return/firefox\//i.test(e)}function sf(e=Fe()){const t=e.toLowerCase();return t.includes("safari/")&&!t.includes("chrome/")&&!t.includes("crios/")&&!t.includes("android")}function of(e=Fe()){return/crios\//i.test(e)}function af(e=Fe()){return/iemobile/i.test(e)}function cf(e=Fe()){return/android/i.test(e)}function lf(e=Fe()){return/blackberry/i.test(e)}function uf(e=Fe()){return/webos/i.test(e)}function Vo(e=Fe()){return/iphone|ipad|ipod/i.test(e)||/macintosh/i.test(e)&&/mobile/i.test(e)}function Ey(e=Fe()){return Vo(e)&&!!window.navigator?.standalone}function Iy(){return dm()&&document.documentMode===10}function ff(e=Fe()){return Vo(e)||cf(e)||uf(e)||lf(e)||/windows phone/i.test(e)||af(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function df(e,t=[]){let n;switch(e){case"Browser":n=ac(Fe());break;case"Worker":n=`${ac(Fe())}-${e}`;break;default:n=e}const r=t.length?t.join(","):"FirebaseCore-web";return`${n}/JsCore/${Dr}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ty{constructor(t){this.auth=t,this.queue=[]}pushCallback(t,n){const r=i=>new Promise((o,a)=>{try{const c=t(i);o(c)}catch(c){a(c)}});r.onAbort=n,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(t){if(this.auth.currentUser===t)return;const n=[];try{for(const r of this.queue)await r(t),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const s of n)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Cy(e,t={}){return Xt(e,"GET","/v2/passwordPolicy",Yt(e,t))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sy=6;class Ay{constructor(t){const n=t.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=n.minPasswordLength??Sy,n.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=n.maxPasswordLength),n.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=n.containsLowercaseCharacter),n.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=n.containsUppercaseCharacter),n.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=n.containsNumericCharacter),n.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=n.containsNonAlphanumericCharacter),this.enforcementState=t.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=t.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=t.forceUpgradeOnSignin??!1,this.schemaVersion=t.schemaVersion}validatePassword(t){const n={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(t,n),this.validatePasswordCharacterOptions(t,n),n.isValid&&(n.isValid=n.meetsMinPasswordLength??!0),n.isValid&&(n.isValid=n.meetsMaxPasswordLength??!0),n.isValid&&(n.isValid=n.containsLowercaseLetter??!0),n.isValid&&(n.isValid=n.containsUppercaseLetter??!0),n.isValid&&(n.isValid=n.containsNumericCharacter??!0),n.isValid&&(n.isValid=n.containsNonAlphanumericCharacter??!0),n}validatePasswordLengthOptions(t,n){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=t.length>=r),s&&(n.meetsMaxPasswordLength=t.length<=s)}validatePasswordCharacterOptions(t,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let s=0;s<t.length;s++)r=t.charAt(s),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(t,n,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(t.containsLowercaseLetter||(t.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(t.containsUppercaseLetter||(t.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(t.containsNumericCharacter||(t.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(t.containsNonAlphanumericCharacter||(t.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ry{constructor(t,n,r,s){this.app=t,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new cc(this),this.idTokenSubscription=new cc(this),this.beforeStateQueue=new Ty(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Xu,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=t.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(t,n){return n&&(this._popupRedirectResolver=Vt(n)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await zn.create(this,t),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const t=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!t)){if(this.currentUser&&t&&this.currentUser.uid===t.uid){this._currentUser._assign(t),await this.currentUser.getIdToken();return}await this._updateCurrentUser(t,!0)}}async initializeCurrentUserFromIdToken(t){try{const n=await As(this,{idToken:t}),r=await ct._fromGetAccountInfoResponse(this,n,t);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(t){if(Ze(this.app)){const i=this.app.settings.authIdToken;return i?new Promise(o=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(i).then(o,o))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let r=n,s=!1;if(t&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const i=this.redirectUser?._redirectEventId,o=r?._redirectEventId,a=await this.tryRedirectSignIn(t);(!i||i===o)&&a?.user&&(r=a.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(i){r=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(i))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return j(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(t){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,t,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(t){try{await Rs(t)}catch(n){if(n?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(t)}useDeviceLanguage(){this.languageCode=oy()}async _delete(){this._deleted=!0}async updateCurrentUser(t){if(Ze(this.app))return Promise.reject(jt(this));const n=t?rt(t):null;return n&&j(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(t,n=!1){if(!this._deleted)return t&&j(this.tenantId===t.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(t),this.queue(async()=>{await this.directlySetCurrentUser(t),this.notifyAuthListeners()})}async signOut(){return Ze(this.app)?Promise.reject(jt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(t){return Ze(this.app)?Promise.reject(jt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Vt(t))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(t){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(t)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const t=await Cy(this),n=new Ay(t);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(t){this._errorFactory=new Ln("auth","Firebase",t())}onAuthStateChanged(t,n,r){return this.registerStateListener(this.authStateSubscription,t,n,r)}beforeAuthStateChanged(t,n){return this.beforeStateQueue.pushCallback(t,n)}onIdTokenChanged(t,n,r){return this.registerStateListener(this.idTokenSubscription,t,n,r)}authStateReady(){return new Promise((t,n)=>{if(this.currentUser)t();else{const r=this.onAuthStateChanged(()=>{r(),t()},n)}})}async revokeAccessToken(t){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:t,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await vy(this,r)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(t,n){const r=await this.getOrInitRedirectPersistenceManager(n);return t===null?r.removeCurrentUser():r.setCurrentUser(t)}async getOrInitRedirectPersistenceManager(t){if(!this.redirectPersistenceManager){const n=t&&Vt(t)||this._popupRedirectResolver;j(n,this,"argument-error"),this.redirectPersistenceManager=await zn.create(this,[Vt(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(t){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===t?this._currentUser:this.redirectUser?._redirectEventId===t?this.redirectUser:null}async _persistUserIfCurrent(t){if(t===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(t))}_notifyListenersIfCurrent(t){t===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const t=this.currentUser?.uid??null;this.lastNotifiedUid!==t&&(this.lastNotifiedUid=t,this.authStateSubscription.next(this.currentUser))}registerStateListener(t,n,r,s){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(j(a,this,"internal-error"),a.then(()=>{o||i(this.currentUser)}),typeof n=="function"){const c=t.addObserver(n,r,s);return()=>{o=!0,c()}}else{const c=t.addObserver(n);return()=>{o=!0,c()}}}async directlySetCurrentUser(t){this.currentUser&&this.currentUser!==t&&this._currentUser._stopProactiveRefresh(),t&&this.isProactiveRefreshEnabled&&t._startProactiveRefresh(),this.currentUser=t,t?await this.assertedPersistence.setCurrentUser(t):await this.assertedPersistence.removeCurrentUser()}queue(t){return this.operations=this.operations.then(t,t),this.operations}get assertedPersistence(){return j(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(t){!t||this.frameworks.includes(t)||(this.frameworks.push(t),this.frameworks.sort(),this.clientVersion=df(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const n=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();n&&(t["X-Firebase-Client"]=n);const r=await this._getAppCheckToken();return r&&(t["X-Firebase-AppCheck"]=r),t}async _getAppCheckToken(){if(Ze(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return t?.error&&ny(`Error while retrieving App Check token: ${t.error}`),t?.token}}function Qt(e){return rt(e)}class cc{constructor(t){this.auth=t,this.observer=null,this.addObserver=ym(n=>this.observer=n)}get next(){return j(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ks={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Py(e){Ks=e}function hf(e){return Ks.loadJS(e)}function Oy(){return Ks.recaptchaEnterpriseScript}function ky(){return Ks.gapiScript}function Ny(e){return`__${e}${Math.floor(Math.random()*1e6)}`}class xy{constructor(){this.enterprise=new Dy}ready(t){t()}execute(t,n){return Promise.resolve("token")}render(t,n){return""}}class Dy{ready(t){t()}execute(t,n){return Promise.resolve("token")}render(t,n){return""}}const Ly="recaptcha-enterprise",pf="NO_RECAPTCHA";class My{constructor(t){this.type=Ly,this.auth=Qt(t)}async verify(t="verify",n=!1){async function r(i){if(!n){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,a)=>{hy(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(c=>{if(c.recaptchaKey===void 0)a(new Error("recaptcha Enterprise site key undefined"));else{const l=new dy(c);return i.tenantId==null?i._agentRecaptchaConfig=l:i._tenantRecaptchaConfigs[i.tenantId]=l,o(l.siteKey)}}).catch(c=>{a(c)})})}function s(i,o,a){const c=window.grecaptcha;rc(c)?c.enterprise.ready(()=>{c.enterprise.execute(i,{action:t}).then(l=>{o(l)}).catch(()=>{o(pf)})}):a(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new xy().execute("siteKey",{action:"verify"}):new Promise((i,o)=>{r(this.auth).then(a=>{if(!n&&rc(window.grecaptcha))s(a,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let c=Oy();c.length!==0&&(c+=a),hf(c).then(()=>{s(a,i,o)}).catch(l=>{o(l)})}}).catch(a=>{o(a)})})}}async function lc(e,t,n,r=!1,s=!1){const i=new My(e);let o;if(s)o=pf;else try{o=await i.verify(n)}catch{o=await i.verify(n,!0)}const a={...t};if(n==="mfaSmsEnrollment"||n==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in a){const c=a.phoneEnrollmentInfo.phoneNumber,l=a.phoneEnrollmentInfo.recaptchaToken;Object.assign(a,{phoneEnrollmentInfo:{phoneNumber:c,recaptchaToken:l,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in a){const c=a.phoneSignInInfo.recaptchaToken;Object.assign(a,{phoneSignInInfo:{recaptchaToken:c,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return a}return r?Object.assign(a,{captchaResp:o}):Object.assign(a,{captchaResponse:o}),Object.assign(a,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(a,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),a}async function Ps(e,t,n,r,s){if(e._getRecaptchaConfig()?.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const i=await lc(e,t,n,n==="getOobCode");return r(e,i)}else return r(e,t).catch(async i=>{if(i.code==="auth/missing-recaptcha-token"){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const o=await lc(e,t,n,n==="getOobCode");return r(e,o)}else return Promise.reject(i)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uy(e,t){const n=er(e,"auth");if(n.isInitialized()){const s=n.getImmediate(),i=n.getOptions();if(Rn(i,t??{}))return s;nt(s,"already-initialized")}return n.initialize({options:t})}function Fy(e,t){const n=t?.persistence||[],r=(Array.isArray(n)?n:[n]).map(Vt);t?.errorMap&&e._updateErrorMap(t.errorMap),e._initializeWithPersistence(r,t?.popupRedirectResolver)}function By(e,t,n){const r=Qt(e);j(/^https?:\/\//.test(t),r,"invalid-emulator-scheme");const s=!1,i=mf(t),{host:o,port:a}=$y(t),c=a===null?"":`:${a}`,l={url:`${i}//${o}${c}/`},u=Object.freeze({host:o,port:a,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){j(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),j(Rn(l,r.config.emulator)&&Rn(u,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=l,r.emulatorConfig=u,r.settings.appVerificationDisabledForTesting=!0,qs(o)?(im(`${i}//${o}${c}`),cm("Auth",!0)):Hy()}function mf(e){const t=e.indexOf(":");return t<0?"":e.substr(0,t+1)}function $y(e){const t=mf(e),n=/(\/\/)?([^?#/]+)/.exec(e.substr(t.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:uc(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:uc(o)}}}function uc(e){if(!e)return null;const t=Number(e);return isNaN(t)?null:t}function Hy(){function e(){const t=document.createElement("p"),n=t.style;t.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",t.classList.add("firebase-emulator-warning"),document.body.appendChild(t)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",e):e())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jo{constructor(t,n){this.providerId=t,this.signInMethod=n}toJSON(){return Ht("not implemented")}_getIdTokenResponse(t){return Ht("not implemented")}_linkToIdToken(t,n){return Ht("not implemented")}_getReauthenticationResolver(t){return Ht("not implemented")}}async function Vy(e,t){return Xt(e,"POST","/v1/accounts:signUp",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jy(e,t){return Mr(e,"POST","/v1/accounts:signInWithPassword",Yt(e,t))}async function Wy(e,t){return Xt(e,"POST","/v1/accounts:sendOobCode",Yt(e,t))}async function qy(e,t){return Wy(e,t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Gy(e,t){return Mr(e,"POST","/v1/accounts:signInWithEmailLink",Yt(e,t))}async function zy(e,t){return Mr(e,"POST","/v1/accounts:signInWithEmailLink",Yt(e,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pr extends jo{constructor(t,n,r,s=null){super("password",r),this._email=t,this._password=n,this._tenantId=s}static _fromEmailAndPassword(t,n){return new Pr(t,n,"password")}static _fromEmailAndCode(t,n,r=null){return new Pr(t,n,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(t){const n=typeof t=="string"?JSON.parse(t):t;if(n?.email&&n?.password){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(t){switch(this.signInMethod){case"password":const n={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Ps(t,n,"signInWithPassword",jy);case"emailLink":return Gy(t,{email:this._email,oobCode:this._password});default:nt(t,"internal-error")}}async _linkToIdToken(t,n){switch(this.signInMethod){case"password":const r={idToken:n,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Ps(t,r,"signUpPassword",Vy);case"emailLink":return zy(t,{idToken:n,email:this._email,oobCode:this._password});default:nt(t,"internal-error")}}_getReauthenticationResolver(t){return this._getIdTokenResponse(t)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Kn(e,t){return Mr(e,"POST","/v1/accounts:signInWithIdp",Yt(e,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ky="http://localhost";class kn extends jo{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(t){const n=new kn(t.providerId,t.signInMethod);return t.idToken||t.accessToken?(t.idToken&&(n.idToken=t.idToken),t.accessToken&&(n.accessToken=t.accessToken),t.nonce&&!t.pendingToken&&(n.nonce=t.nonce),t.pendingToken&&(n.pendingToken=t.pendingToken)):t.oauthToken&&t.oauthTokenSecret?(n.accessToken=t.oauthToken,n.secret=t.oauthTokenSecret):nt("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(t){const n=typeof t=="string"?JSON.parse(t):t,{providerId:r,signInMethod:s,...i}=n;if(!r||!s)return null;const o=new kn(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(t){const n=this.buildRequest();return Kn(t,n)}_linkToIdToken(t,n){const r=this.buildRequest();return r.idToken=n,Kn(t,r)}_getReauthenticationResolver(t){const n=this.buildRequest();return n.autoCreate=!1,Kn(t,n)}buildRequest(){const t={requestUri:Ky,returnSecureToken:!0};if(this.pendingToken)t.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),t.postBody=xr(n)}return t}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jy(e){switch(e){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Yy(e){const t=ur(fr(e)).link,n=t?ur(fr(t)).deep_link_id:null,r=ur(fr(e)).deep_link_id;return(r?ur(fr(r)).link:null)||r||n||t||e}class Wo{constructor(t){const n=ur(fr(t)),r=n.apiKey??null,s=n.oobCode??null,i=Jy(n.mode??null);j(r&&s&&i,"argument-error"),this.apiKey=r,this.operation=i,this.code=s,this.continueUrl=n.continueUrl??null,this.languageCode=n.lang??null,this.tenantId=n.tenantId??null}static parseLink(t){const n=Yy(t);try{return new Wo(n)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tr{constructor(){this.providerId=tr.PROVIDER_ID}static credential(t,n){return Pr._fromEmailAndPassword(t,n)}static credentialWithLink(t,n){const r=Wo.parseLink(n);return j(r,"argument-error"),Pr._fromEmailAndCode(t,r.code,r.tenantId)}}tr.PROVIDER_ID="password";tr.EMAIL_PASSWORD_SIGN_IN_METHOD="password";tr.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qo{constructor(t){this.providerId=t,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(t){this.defaultLanguageCode=t}setCustomParameters(t){return this.customParameters=t,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ur extends qo{constructor(){super(...arguments),this.scopes=[]}addScope(t){return this.scopes.includes(t)||this.scopes.push(t),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sn extends Ur{constructor(){super("facebook.com")}static credential(t){return kn._fromParams({providerId:sn.PROVIDER_ID,signInMethod:sn.FACEBOOK_SIGN_IN_METHOD,accessToken:t})}static credentialFromResult(t){return sn.credentialFromTaggedObject(t)}static credentialFromError(t){return sn.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t||!("oauthAccessToken"in t)||!t.oauthAccessToken)return null;try{return sn.credential(t.oauthAccessToken)}catch{return null}}}sn.FACEBOOK_SIGN_IN_METHOD="facebook.com";sn.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bt extends Ur{constructor(){super("google.com"),this.addScope("profile")}static credential(t,n){return kn._fromParams({providerId:Bt.PROVIDER_ID,signInMethod:Bt.GOOGLE_SIGN_IN_METHOD,idToken:t,accessToken:n})}static credentialFromResult(t){return Bt.credentialFromTaggedObject(t)}static credentialFromError(t){return Bt.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t)return null;const{oauthIdToken:n,oauthAccessToken:r}=t;if(!n&&!r)return null;try{return Bt.credential(n,r)}catch{return null}}}Bt.GOOGLE_SIGN_IN_METHOD="google.com";Bt.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $t extends Ur{constructor(){super("github.com")}static credential(t){return kn._fromParams({providerId:$t.PROVIDER_ID,signInMethod:$t.GITHUB_SIGN_IN_METHOD,accessToken:t})}static credentialFromResult(t){return $t.credentialFromTaggedObject(t)}static credentialFromError(t){return $t.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t||!("oauthAccessToken"in t)||!t.oauthAccessToken)return null;try{return $t.credential(t.oauthAccessToken)}catch{return null}}}$t.GITHUB_SIGN_IN_METHOD="github.com";$t.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class on extends Ur{constructor(){super("twitter.com")}static credential(t,n){return kn._fromParams({providerId:on.PROVIDER_ID,signInMethod:on.TWITTER_SIGN_IN_METHOD,oauthToken:t,oauthTokenSecret:n})}static credentialFromResult(t){return on.credentialFromTaggedObject(t)}static credentialFromError(t){return on.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=t;if(!n||!r)return null;try{return on.credential(n,r)}catch{return null}}}on.TWITTER_SIGN_IN_METHOD="twitter.com";on.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Xy(e,t){return Mr(e,"POST","/v1/accounts:signUp",Yt(e,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nn{constructor(t){this.user=t.user,this.providerId=t.providerId,this._tokenResponse=t._tokenResponse,this.operationType=t.operationType}static async _fromIdTokenResponse(t,n,r,s=!1){const i=await ct._fromIdTokenResponse(t,r,s),o=fc(r);return new Nn({user:i,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(t,n,r){await t._updateTokensIfNecessary(r,!0);const s=fc(r);return new Nn({user:t,providerId:s,_tokenResponse:r,operationType:n})}}function fc(e){return e.providerId?e.providerId:"phoneNumber"in e?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Os extends Nt{constructor(t,n,r,s){super(n.code,n.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,Os.prototype),this.customData={appName:t.name,tenantId:t.tenantId??void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(t,n,r,s){return new Os(t,n,r,s)}}function gf(e,t,n,r){return(t==="reauthenticate"?n._getReauthenticationResolver(e):n._getIdTokenResponse(e)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Os._fromErrorAndOperation(e,i,t,r):i})}async function Qy(e,t,n=!1){const r=await Rr(e,t._linkToIdToken(e.auth,await e.getIdToken()),n);return Nn._forOperation(e,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Zy(e,t,n=!1){const{auth:r}=e;if(Ze(r.app))return Promise.reject(jt(r));const s="reauthenticate";try{const i=await Rr(e,gf(r,s,t,e),n);j(i.idToken,r,"internal-error");const o=Ho(i.idToken);j(o,r,"internal-error");const{sub:a}=o;return j(e.uid===a,r,"user-mismatch"),Nn._forOperation(e,s,i)}catch(i){throw i?.code==="auth/user-not-found"&&nt(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _f(e,t,n=!1){if(Ze(e.app))return Promise.reject(jt(e));const r="signIn",s=await gf(e,r,t),i=await Nn._fromIdTokenResponse(e,r,s);return n||await e._updateCurrentUser(i.user),i}async function eb(e,t){return _f(Qt(e),t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yf(e){const t=Qt(e);t._getPasswordPolicyInternal()&&await t._updatePasswordPolicy()}async function tb(e,t,n){const r=Qt(e);await Ps(r,{requestType:"PASSWORD_RESET",email:t,clientType:"CLIENT_TYPE_WEB"},"getOobCode",qy)}async function nb(e,t,n){if(Ze(e.app))return Promise.reject(jt(e));const r=Qt(e),o=await Ps(r,{returnSecureToken:!0,email:t,password:n,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",Xy).catch(c=>{throw c.code==="auth/password-does-not-meet-requirements"&&yf(e),c}),a=await Nn._fromIdTokenResponse(r,"signIn",o);return await r._updateCurrentUser(a.user),a}function rb(e,t,n){return Ze(e.app)?Promise.reject(jt(e)):eb(rt(e),tr.credential(t,n)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&yf(e),r})}function sb(e,t,n,r){return rt(e).onIdTokenChanged(t,n,r)}function ib(e,t,n){return rt(e).beforeAuthStateChanged(t,n)}function Zi(e,t,n,r){return rt(e).onAuthStateChanged(t,n,r)}function ob(e){return rt(e).signOut()}const ks="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bf{constructor(t,n){this.storageRetriever=t,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(ks,"1"),this.storage.removeItem(ks),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(t,n){return this.storage.setItem(t,JSON.stringify(n)),Promise.resolve()}_get(t){const n=this.storage.getItem(t);return Promise.resolve(n?JSON.parse(n):null)}_remove(t){return this.storage.removeItem(t),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ab=1e3,cb=10;class wf extends bf{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(t,n)=>this.onStorageEvent(t,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=ff(),this._shouldAllowMigration=!0}forAllChangedKeys(t){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),s=this.localCache[n];r!==s&&t(n,s,r)}}onStorageEvent(t,n=!1){if(!t.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}const r=t.key;n?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);Iy()&&i!==t.newValue&&t.newValue!==t.oldValue?setTimeout(s,cb):s()}notifyListeners(t,n){this.localCache[t]=n;const r=this.listeners[t];if(r)for(const s of Array.from(r))s(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((t,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:t,oldValue:n,newValue:r}),!0)})},ab)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(t,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[t]||(this.listeners[t]=new Set,this.localCache[t]=this.storage.getItem(t)),this.listeners[t].add(n)}_removeListener(t,n){this.listeners[t]&&(this.listeners[t].delete(n),this.listeners[t].size===0&&delete this.listeners[t]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(t,n){await super._set(t,n),this.localCache[t]=JSON.stringify(n)}async _get(t){const n=await super._get(t);return this.localCache[t]=JSON.stringify(n),n}async _remove(t){await super._remove(t),delete this.localCache[t]}}wf.type="LOCAL";const lb=wf;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vf extends bf{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(t,n){}_removeListener(t,n){}}vf.type="SESSION";const Ef=vf;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ub(e){return Promise.all(e.map(async t=>{try{return{fulfilled:!0,value:await t}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Js{constructor(t){this.eventTarget=t,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(t){const n=this.receivers.find(s=>s.isListeningto(t));if(n)return n;const r=new Js(t);return this.receivers.push(r),r}isListeningto(t){return this.eventTarget===t}async handleEvent(t){const n=t,{eventId:r,eventType:s,data:i}=n.data,o=this.handlersMap[s];if(!o?.size)return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const a=Array.from(o).map(async l=>l(n.origin,i)),c=await ub(a);n.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:c})}_subscribe(t,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[t]||(this.handlersMap[t]=new Set),this.handlersMap[t].add(n)}_unsubscribe(t,n){this.handlersMap[t]&&n&&this.handlersMap[t].delete(n),(!n||this.handlersMap[t].size===0)&&delete this.handlersMap[t],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Js.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Go(e="",t=10){let n="";for(let r=0;r<t;r++)n+=Math.floor(Math.random()*10);return e+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fb{constructor(t){this.target=t,this.handlers=new Set}removeMessageHandler(t){t.messageChannel&&(t.messageChannel.port1.removeEventListener("message",t.onMessage),t.messageChannel.port1.close()),this.handlers.delete(t)}async _send(t,n,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((a,c)=>{const l=Go("",20);s.port1.start();const u=setTimeout(()=>{c(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(f){const d=f;if(d.data.eventId===l)switch(d.data.status){case"ack":clearTimeout(u),i=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),a(d.data.response);break;default:clearTimeout(u),clearTimeout(i),c(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:t,eventId:l,data:n},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pt(){return window}function db(e){Pt().location.href=e}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function If(){return typeof Pt().WorkerGlobalScope<"u"&&typeof Pt().importScripts=="function"}async function hb(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function pb(){return navigator?.serviceWorker?.controller||null}function mb(){return If()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tf="firebaseLocalStorageDb",gb=1,Ns="firebaseLocalStorage",Cf="fbase_key";class Fr{constructor(t){this.request=t}toPromise(){return new Promise((t,n)=>{this.request.addEventListener("success",()=>{t(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function Ys(e,t){return e.transaction([Ns],t?"readwrite":"readonly").objectStore(Ns)}function _b(){const e=indexedDB.deleteDatabase(Tf);return new Fr(e).toPromise()}function eo(){const e=indexedDB.open(Tf,gb);return new Promise((t,n)=>{e.addEventListener("error",()=>{n(e.error)}),e.addEventListener("upgradeneeded",()=>{const r=e.result;try{r.createObjectStore(Ns,{keyPath:Cf})}catch(s){n(s)}}),e.addEventListener("success",async()=>{const r=e.result;r.objectStoreNames.contains(Ns)?t(r):(r.close(),await _b(),t(await eo()))})})}async function dc(e,t,n){const r=Ys(e,!0).put({[Cf]:t,value:n});return new Fr(r).toPromise()}async function yb(e,t){const n=Ys(e,!1).get(t),r=await new Fr(n).toPromise();return r===void 0?null:r.value}function hc(e,t){const n=Ys(e,!0).delete(t);return new Fr(n).toPromise()}const bb=800,wb=3;class Sf{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await eo(),this.db)}async _withRetries(t){let n=0;for(;;)try{const r=await this._openDb();return await t(r)}catch(r){if(n++>wb)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return If()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Js._getInstance(mb()),this.receiver._subscribe("keyChanged",async(t,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(t,n)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await hb(),!this.activeServiceWorker)return;this.sender=new fb(this.activeServiceWorker);const t=await this.sender._send("ping",{},800);t&&t[0]?.fulfilled&&t[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(t){if(!(!this.sender||!this.activeServiceWorker||pb()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:t},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const t=await eo();return await dc(t,ks,"1"),await hc(t,ks),!0}catch{}return!1}async _withPendingWrite(t){this.pendingWrites++;try{await t()}finally{this.pendingWrites--}}async _set(t,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>dc(r,t,n)),this.localCache[t]=n,this.notifyServiceWorker(t)))}async _get(t){const n=await this._withRetries(r=>yb(r,t));return this.localCache[t]=n,n}async _remove(t){return this._withPendingWrite(async()=>(await this._withRetries(n=>hc(n,t)),delete this.localCache[t],this.notifyServiceWorker(t)))}async _poll(){const t=await this._withRetries(s=>{const i=Ys(s,!1).getAll();return new Fr(i).toPromise()});if(!t)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(t.length!==0)for(const{fbase_key:s,value:i}of t)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),n.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),n.push(s));return n}notifyListeners(t,n){this.localCache[t]=n;const r=this.listeners[t];if(r)for(const s of Array.from(r))s(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),bb)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(t,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[t]||(this.listeners[t]=new Set,this._get(t)),this.listeners[t].add(n)}_removeListener(t,n){this.listeners[t]&&(this.listeners[t].delete(n),this.listeners[t].size===0&&delete this.listeners[t]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Sf.type="LOCAL";const vb=Sf;new Lr(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Af(e,t){return t?Vt(t):(j(e._popupRedirectResolver,e,"argument-error"),e._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zo extends jo{constructor(t){super("custom","custom"),this.params=t}_getIdTokenResponse(t){return Kn(t,this._buildIdpRequest())}_linkToIdToken(t,n){return Kn(t,this._buildIdpRequest(n))}_getReauthenticationResolver(t){return Kn(t,this._buildIdpRequest())}_buildIdpRequest(t){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return t&&(n.idToken=t),n}}function Eb(e){return _f(e.auth,new zo(e),e.bypassAuthState)}function Ib(e){const{auth:t,user:n}=e;return j(n,t,"internal-error"),Zy(n,new zo(e),e.bypassAuthState)}async function Tb(e){const{auth:t,user:n}=e;return j(n,t,"internal-error"),Qy(n,new zo(e),e.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rf{constructor(t,n,r,s,i=!1){this.auth=t,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(t,n)=>{this.pendingPromise={resolve:t,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(t){const{urlResponse:n,sessionId:r,postBody:s,tenantId:i,error:o,type:a}=t;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:n,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(l){this.reject(l)}}onError(t){this.reject(t)}getIdpTask(t){switch(t){case"signInViaPopup":case"signInViaRedirect":return Eb;case"linkViaPopup":case"linkViaRedirect":return Tb;case"reauthViaPopup":case"reauthViaRedirect":return Ib;default:nt(this.auth,"internal-error")}}resolve(t){Kt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(t),this.unregisterAndCleanUp()}reject(t){Kt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(t),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cb=new Lr(2e3,1e4);async function pc(e,t,n){if(Ze(e.app))return Promise.reject(ft(e,"operation-not-supported-in-this-environment"));const r=Qt(e);ry(e,t,qo);const s=Af(r,n);return new In(r,"signInViaPopup",t,s).executeNotNull()}class In extends Rf{constructor(t,n,r,s,i){super(t,n,s,i),this.provider=r,this.authWindow=null,this.pollId=null,In.currentPopupAction&&In.currentPopupAction.cancel(),In.currentPopupAction=this}async executeNotNull(){const t=await this.execute();return j(t,this.auth,"internal-error"),t}async onExecution(){Kt(this.filter.length===1,"Popup operations only handle one event");const t=Go();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],t),this.authWindow.associatedEvent=t,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(ft(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(ft(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,In.currentPopupAction=null}pollUserCancellation(){const t=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(ft(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(t,Cb.get())};t()}}In.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sb="pendingRedirect",as=new Map;class Ab extends Rf{constructor(t,n,r=!1){super(t,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let t=as.get(this.auth._key());if(!t){try{const r=await Rb(this.resolver,this.auth)?await super.execute():null;t=()=>Promise.resolve(r)}catch(n){t=()=>Promise.reject(n)}as.set(this.auth._key(),t)}return this.bypassAuthState||as.set(this.auth._key(),()=>Promise.resolve(null)),t()}async onAuthEvent(t){if(t.type==="signInViaRedirect")return super.onAuthEvent(t);if(t.type==="unknown"){this.resolve(null);return}if(t.eventId){const n=await this.auth._redirectUserForId(t.eventId);if(n)return this.user=n,super.onAuthEvent(t);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Rb(e,t){const n=kb(t),r=Ob(e);if(!await r._isAvailable())return!1;const s=await r._get(n)==="true";return await r._remove(n),s}function Pb(e,t){as.set(e._key(),t)}function Ob(e){return Vt(e._redirectPersistence)}function kb(e){return os(Sb,e.config.apiKey,e.name)}async function Nb(e,t,n=!1){if(Ze(e.app))return Promise.reject(jt(e));const r=Qt(e),s=Af(r,t),o=await new Ab(r,s,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,t)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xb=600*1e3;class Db{constructor(t){this.auth=t,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(t){this.consumers.add(t),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,t)&&(this.sendToConsumer(this.queuedRedirectEvent,t),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(t){this.consumers.delete(t)}onEvent(t){if(this.hasEventBeenHandled(t))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(t,r)&&(n=!0,this.sendToConsumer(t,r),this.saveEventToCache(t))}),this.hasHandledPotentialRedirect||!Lb(t)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=t,n=!0)),n}sendToConsumer(t,n){if(t.error&&!Pf(t)){const r=t.error.code?.split("auth/")[1]||"internal-error";n.onError(ft(this.auth,r))}else n.onAuthEvent(t)}isEventForConsumer(t,n){const r=n.eventId===null||!!t.eventId&&t.eventId===n.eventId;return n.filter.includes(t.type)&&r}hasEventBeenHandled(t){return Date.now()-this.lastProcessedEventTime>=xb&&this.cachedEventUids.clear(),this.cachedEventUids.has(mc(t))}saveEventToCache(t){this.cachedEventUids.add(mc(t)),this.lastProcessedEventTime=Date.now()}}function mc(e){return[e.type,e.eventId,e.sessionId,e.tenantId].filter(t=>t).join("-")}function Pf({type:e,error:t}){return e==="unknown"&&t?.code==="auth/no-auth-event"}function Lb(e){switch(e.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Pf(e);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Mb(e,t={}){return Xt(e,"GET","/v1/projects",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ub=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Fb=/^https?/;async function Bb(e){if(e.config.emulator)return;const{authorizedDomains:t}=await Mb(e);for(const n of t)try{if($b(n))return}catch{}nt(e,"unauthorized-domain")}function $b(e){const t=Xi(),{protocol:n,hostname:r}=new URL(t);if(e.startsWith("chrome-extension://")){const o=new URL(e);return o.hostname===""&&r===""?n==="chrome-extension:"&&e.replace("chrome-extension://","")===t.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!Fb.test(n))return!1;if(Ub.test(e))return r===e;const s=e.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hb=new Lr(3e4,6e4);function gc(){const e=Pt().___jsl;if(e?.H){for(const t of Object.keys(e.H))if(e.H[t].r=e.H[t].r||[],e.H[t].L=e.H[t].L||[],e.H[t].r=[...e.H[t].L],e.CP)for(let n=0;n<e.CP.length;n++)e.CP[n]=null}}function Vb(e){return new Promise((t,n)=>{function r(){gc(),gapi.load("gapi.iframes",{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{gc(),n(ft(e,"network-request-failed"))},timeout:Hb.get()})}if(Pt().gapi?.iframes?.Iframe)t(gapi.iframes.getContext());else if(Pt().gapi?.load)r();else{const s=Ny("iframefcb");return Pt()[s]=()=>{gapi.load?r():n(ft(e,"network-request-failed"))},hf(`${ky()}?onload=${s}`).catch(i=>n(i))}}).catch(t=>{throw cs=null,t})}let cs=null;function jb(e){return cs=cs||Vb(e),cs}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wb=new Lr(5e3,15e3),qb="__/auth/iframe",Gb="emulator/auth/iframe",zb={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Kb=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Jb(e){const t=e.config;j(t.authDomain,e,"auth-domain-config-required");const n=t.emulator?$o(t,Gb):`https://${e.config.authDomain}/${qb}`,r={apiKey:t.apiKey,appName:e.name,v:Dr},s=Kb.get(e.config.apiHost);s&&(r.eid=s);const i=e._getFrameworks();return i.length&&(r.fw=i.join(",")),`${n}?${xr(r).slice(1)}`}async function Yb(e){const t=await jb(e),n=Pt().gapi;return j(n,e,"internal-error"),t.open({where:document.body,url:Jb(e),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:zb,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=ft(e,"network-request-failed"),a=Pt().setTimeout(()=>{i(o)},Wb.get());function c(){Pt().clearTimeout(a),s(r)}r.ping(c).then(c,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xb={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Qb=500,Zb=600,ew="_blank",tw="http://localhost";class _c{constructor(t){this.window=t,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function nw(e,t,n,r=Qb,s=Zb){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let a="";const c={...Xb,width:r.toString(),height:s.toString(),top:i,left:o},l=Fe().toLowerCase();n&&(a=of(l)?ew:n),rf(l)&&(t=t||tw,c.scrollbars="yes");const u=Object.entries(c).reduce((d,[m,g])=>`${d}${m}=${g},`,"");if(Ey(l)&&a!=="_self")return rw(t||"",a),new _c(null);const f=window.open(t||"",a,u);j(f,e,"popup-blocked");try{f.focus()}catch{}return new _c(f)}function rw(e,t){const n=document.createElement("a");n.href=e,n.target=t;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sw="__/auth/handler",iw="emulator/auth/handler",ow=encodeURIComponent("fac");async function yc(e,t,n,r,s,i){j(e.config.authDomain,e,"auth-domain-config-required"),j(e.config.apiKey,e,"invalid-api-key");const o={apiKey:e.config.apiKey,appName:e.name,authType:n,redirectUrl:r,v:Dr,eventId:s};if(t instanceof qo){t.setDefaultLanguage(e.languageCode),o.providerId=t.providerId||"",_m(t.getCustomParameters())||(o.customParameters=JSON.stringify(t.getCustomParameters()));for(const[u,f]of Object.entries({}))o[u]=f}if(t instanceof Ur){const u=t.getScopes().filter(f=>f!=="");u.length>0&&(o.scopes=u.join(","))}e.tenantId&&(o.tid=e.tenantId);const a=o;for(const u of Object.keys(a))a[u]===void 0&&delete a[u];const c=await e._getAppCheckToken(),l=c?`#${ow}=${encodeURIComponent(c)}`:"";return`${aw(e)}?${xr(a).slice(1)}${l}`}function aw({config:e}){return e.emulator?$o(e,iw):`https://${e.authDomain}/${sw}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ii="webStorageSupport";class cw{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Ef,this._completeRedirectFn=Nb,this._overrideRedirectResult=Pb}async _openPopup(t,n,r,s){Kt(this.eventManagers[t._key()]?.manager,"_initialize() not called before _openPopup()");const i=await yc(t,n,r,Xi(),s);return nw(t,i,Go())}async _openRedirect(t,n,r,s){await this._originValidation(t);const i=await yc(t,n,r,Xi(),s);return db(i),new Promise(()=>{})}_initialize(t){const n=t._key();if(this.eventManagers[n]){const{manager:s,promise:i}=this.eventManagers[n];return s?Promise.resolve(s):(Kt(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(t);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(t){const n=await Yb(t),r=new Db(t);return n.register("authEvent",s=>(j(s?.authEvent,t,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[t._key()]={manager:r},this.iframes[t._key()]=n,r}_isIframeWebStorageSupported(t,n){this.iframes[t._key()].send(Ii,{type:Ii},s=>{const i=s?.[0]?.[Ii];i!==void 0&&n(!!i),nt(t,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(t){const n=t._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=Bb(t)),this.originValidationPromises[n]}get _shouldInitProactively(){return ff()||sf()||Vo()}}const lw=cw;var bc="@firebase/auth",wc="1.11.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uw{constructor(t){this.auth=t,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(t){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(t)}:null}addAuthTokenListener(t){if(this.assertAuthConfigured(),this.internalListeners.has(t))return;const n=this.auth.onIdTokenChanged(r=>{t(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(t,n),this.updateProactiveRefresh()}removeAuthTokenListener(t){this.assertAuthConfigured();const n=this.internalListeners.get(t);n&&(this.internalListeners.delete(t),n(),this.updateProactiveRefresh())}assertAuthConfigured(){j(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fw(e){switch(e){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function dw(e){zt(new kt("auth",(t,{options:n})=>{const r=t.getProvider("app").getImmediate(),s=t.getProvider("heartbeat"),i=t.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=r.options;j(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const c={apiKey:o,authDomain:a,clientPlatform:e,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:df(e)},l=new Ry(r,s,i,c);return Fy(l,n),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((t,n,r)=>{t.getProvider("auth-internal").initialize()})),zt(new kt("auth-internal",t=>{const n=Qt(t.getProvider("auth").getImmediate());return(r=>new uw(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),Rt(bc,wc,fw(e)),Rt(bc,wc,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hw=300,pw=yu("authIdTokenMaxAge")||hw;let vc=null;const mw=e=>async t=>{const n=t&&await t.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>pw)return;const s=n?.token;vc!==s&&(vc=s,await fetch(e,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function gw(e=Su()){const t=er(e,"auth");if(t.isInitialized())return t.getImmediate();const n=Uy(e,{popupRedirectResolver:lw,persistence:[vb,lb,Ef]}),r=yu("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const o=mw(i.toString());ib(n,o,()=>o(n.currentUser)),sb(n,a=>o(a))}}const s=rm("auth");return s&&By(n,`http://${s}`),n}function _w(){return document.getElementsByTagName("head")?.[0]??document}Py({loadJS(e){return new Promise((t,n)=>{const r=document.createElement("script");r.setAttribute("src",e),r.onload=t,r.onerror=s=>{const i=ft("internal-error");i.customData=s,n(i)},r.type="text/javascript",r.charset="UTF-8",_w().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});dw("Browser");function Of(e,t){return function(){return e.apply(t,arguments)}}const{toString:yw}=Object.prototype,{getPrototypeOf:Ko}=Object,{iterator:Xs,toStringTag:kf}=Symbol,Qs=(e=>t=>{const n=yw.call(t);return e[n]||(e[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),pt=e=>(e=e.toLowerCase(),t=>Qs(t)===e),Zs=e=>t=>typeof t===e,{isArray:nr}=Array,Xn=Zs("undefined");function Br(e){return e!==null&&!Xn(e)&&e.constructor!==null&&!Xn(e.constructor)&&Ve(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const Nf=pt("ArrayBuffer");function bw(e){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&Nf(e.buffer),t}const ww=Zs("string"),Ve=Zs("function"),xf=Zs("number"),$r=e=>e!==null&&typeof e=="object",vw=e=>e===!0||e===!1,ls=e=>{if(Qs(e)!=="object")return!1;const t=Ko(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(kf in e)&&!(Xs in e)},Ew=e=>{if(!$r(e)||Br(e))return!1;try{return Object.keys(e).length===0&&Object.getPrototypeOf(e)===Object.prototype}catch{return!1}},Iw=pt("Date"),Tw=pt("File"),Cw=pt("Blob"),Sw=pt("FileList"),Aw=e=>$r(e)&&Ve(e.pipe),Rw=e=>{let t;return e&&(typeof FormData=="function"&&e instanceof FormData||Ve(e.append)&&((t=Qs(e))==="formdata"||t==="object"&&Ve(e.toString)&&e.toString()==="[object FormData]"))},Pw=pt("URLSearchParams"),[Ow,kw,Nw,xw]=["ReadableStream","Request","Response","Headers"].map(pt),Dw=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function Hr(e,t,{allOwnKeys:n=!1}={}){if(e===null||typeof e>"u")return;let r,s;if(typeof e!="object"&&(e=[e]),nr(e))for(r=0,s=e.length;r<s;r++)t.call(null,e[r],r,e);else{if(Br(e))return;const i=n?Object.getOwnPropertyNames(e):Object.keys(e),o=i.length;let a;for(r=0;r<o;r++)a=i[r],t.call(null,e[a],a,e)}}function Df(e,t){if(Br(e))return null;t=t.toLowerCase();const n=Object.keys(e);let r=n.length,s;for(;r-- >0;)if(s=n[r],t===s.toLowerCase())return s;return null}const Tn=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,Lf=e=>!Xn(e)&&e!==Tn;function to(){const{caseless:e,skipUndefined:t}=Lf(this)&&this||{},n={},r=(s,i)=>{const o=e&&Df(n,i)||i;ls(n[o])&&ls(s)?n[o]=to(n[o],s):ls(s)?n[o]=to({},s):nr(s)?n[o]=s.slice():(!t||!Xn(s))&&(n[o]=s)};for(let s=0,i=arguments.length;s<i;s++)arguments[s]&&Hr(arguments[s],r);return n}const Lw=(e,t,n,{allOwnKeys:r}={})=>(Hr(t,(s,i)=>{n&&Ve(s)?e[i]=Of(s,n):e[i]=s},{allOwnKeys:r}),e),Mw=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),Uw=(e,t,n,r)=>{e.prototype=Object.create(t.prototype,r),e.prototype.constructor=e,Object.defineProperty(e,"super",{value:t.prototype}),n&&Object.assign(e.prototype,n)},Fw=(e,t,n,r)=>{let s,i,o;const a={};if(t=t||{},e==null)return t;do{for(s=Object.getOwnPropertyNames(e),i=s.length;i-- >0;)o=s[i],(!r||r(o,e,t))&&!a[o]&&(t[o]=e[o],a[o]=!0);e=n!==!1&&Ko(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},Bw=(e,t,n)=>{e=String(e),(n===void 0||n>e.length)&&(n=e.length),n-=t.length;const r=e.indexOf(t,n);return r!==-1&&r===n},$w=e=>{if(!e)return null;if(nr(e))return e;let t=e.length;if(!xf(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},Hw=(e=>t=>e&&t instanceof e)(typeof Uint8Array<"u"&&Ko(Uint8Array)),Vw=(e,t)=>{const r=(e&&e[Xs]).call(e);let s;for(;(s=r.next())&&!s.done;){const i=s.value;t.call(e,i[0],i[1])}},jw=(e,t)=>{let n;const r=[];for(;(n=e.exec(t))!==null;)r.push(n);return r},Ww=pt("HTMLFormElement"),qw=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,r,s){return r.toUpperCase()+s}),Ec=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),Gw=pt("RegExp"),Mf=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),r={};Hr(n,(s,i)=>{let o;(o=t(s,i,e))!==!1&&(r[i]=o||s)}),Object.defineProperties(e,r)},zw=e=>{Mf(e,(t,n)=>{if(Ve(e)&&["arguments","caller","callee"].indexOf(n)!==-1)return!1;const r=e[n];if(Ve(r)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},Kw=(e,t)=>{const n={},r=s=>{s.forEach(i=>{n[i]=!0})};return nr(e)?r(e):r(String(e).split(t)),n},Jw=()=>{},Yw=(e,t)=>e!=null&&Number.isFinite(e=+e)?e:t;function Xw(e){return!!(e&&Ve(e.append)&&e[kf]==="FormData"&&e[Xs])}const Qw=e=>{const t=new Array(10),n=(r,s)=>{if($r(r)){if(t.indexOf(r)>=0)return;if(Br(r))return r;if(!("toJSON"in r)){t[s]=r;const i=nr(r)?[]:{};return Hr(r,(o,a)=>{const c=n(o,s+1);!Xn(c)&&(i[a]=c)}),t[s]=void 0,i}}return r};return n(e,0)},Zw=pt("AsyncFunction"),ev=e=>e&&($r(e)||Ve(e))&&Ve(e.then)&&Ve(e.catch),Uf=((e,t)=>e?setImmediate:t?((n,r)=>(Tn.addEventListener("message",({source:s,data:i})=>{s===Tn&&i===n&&r.length&&r.shift()()},!1),s=>{r.push(s),Tn.postMessage(n,"*")}))(`axios@${Math.random()}`,[]):n=>setTimeout(n))(typeof setImmediate=="function",Ve(Tn.postMessage)),tv=typeof queueMicrotask<"u"?queueMicrotask.bind(Tn):typeof process<"u"&&process.nextTick||Uf,nv=e=>e!=null&&Ve(e[Xs]),y={isArray:nr,isArrayBuffer:Nf,isBuffer:Br,isFormData:Rw,isArrayBufferView:bw,isString:ww,isNumber:xf,isBoolean:vw,isObject:$r,isPlainObject:ls,isEmptyObject:Ew,isReadableStream:Ow,isRequest:kw,isResponse:Nw,isHeaders:xw,isUndefined:Xn,isDate:Iw,isFile:Tw,isBlob:Cw,isRegExp:Gw,isFunction:Ve,isStream:Aw,isURLSearchParams:Pw,isTypedArray:Hw,isFileList:Sw,forEach:Hr,merge:to,extend:Lw,trim:Dw,stripBOM:Mw,inherits:Uw,toFlatObject:Fw,kindOf:Qs,kindOfTest:pt,endsWith:Bw,toArray:$w,forEachEntry:Vw,matchAll:jw,isHTMLForm:Ww,hasOwnProperty:Ec,hasOwnProp:Ec,reduceDescriptors:Mf,freezeMethods:zw,toObjectSet:Kw,toCamelCase:qw,noop:Jw,toFiniteNumber:Yw,findKey:Df,global:Tn,isContextDefined:Lf,isSpecCompliantForm:Xw,toJSONObject:Qw,isAsyncFn:Zw,isThenable:ev,setImmediate:Uf,asap:tv,isIterable:nv};function J(e,t,n,r,s){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack,this.message=e,this.name="AxiosError",t&&(this.code=t),n&&(this.config=n),r&&(this.request=r),s&&(this.response=s,this.status=s.status?s.status:null)}y.inherits(J,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:y.toJSONObject(this.config),code:this.code,status:this.status}}});const Ff=J.prototype,Bf={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach(e=>{Bf[e]={value:e}});Object.defineProperties(J,Bf);Object.defineProperty(Ff,"isAxiosError",{value:!0});J.from=(e,t,n,r,s,i)=>{const o=Object.create(Ff);y.toFlatObject(e,o,function(u){return u!==Error.prototype},l=>l!=="isAxiosError");const a=e&&e.message?e.message:"Error",c=t==null&&e?e.code:t;return J.call(o,a,c,n,r,s),e&&o.cause==null&&Object.defineProperty(o,"cause",{value:e,configurable:!0}),o.name=e&&e.name||"Error",i&&Object.assign(o,i),o};const rv=null;function no(e){return y.isPlainObject(e)||y.isArray(e)}function $f(e){return y.endsWith(e,"[]")?e.slice(0,-2):e}function Ic(e,t,n){return e?e.concat(t).map(function(s,i){return s=$f(s),!n&&i?"["+s+"]":s}).join(n?".":""):t}function sv(e){return y.isArray(e)&&!e.some(no)}const iv=y.toFlatObject(y,{},null,function(t){return/^is[A-Z]/.test(t)});function ei(e,t,n){if(!y.isObject(e))throw new TypeError("target must be an object");t=t||new FormData,n=y.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(b,w){return!y.isUndefined(w[b])});const r=n.metaTokens,s=n.visitor||u,i=n.dots,o=n.indexes,c=(n.Blob||typeof Blob<"u"&&Blob)&&y.isSpecCompliantForm(t);if(!y.isFunction(s))throw new TypeError("visitor must be a function");function l(g){if(g===null)return"";if(y.isDate(g))return g.toISOString();if(y.isBoolean(g))return g.toString();if(!c&&y.isBlob(g))throw new J("Blob is not supported. Use a Buffer instead.");return y.isArrayBuffer(g)||y.isTypedArray(g)?c&&typeof Blob=="function"?new Blob([g]):Buffer.from(g):g}function u(g,b,w){let O=g;if(g&&!w&&typeof g=="object"){if(y.endsWith(b,"{}"))b=r?b:b.slice(0,-2),g=JSON.stringify(g);else if(y.isArray(g)&&sv(g)||(y.isFileList(g)||y.endsWith(b,"[]"))&&(O=y.toArray(g)))return b=$f(b),O.forEach(function(A,C){!(y.isUndefined(A)||A===null)&&t.append(o===!0?Ic([b],C,i):o===null?b:b+"[]",l(A))}),!1}return no(g)?!0:(t.append(Ic(w,b,i),l(g)),!1)}const f=[],d=Object.assign(iv,{defaultVisitor:u,convertValue:l,isVisitable:no});function m(g,b){if(!y.isUndefined(g)){if(f.indexOf(g)!==-1)throw Error("Circular reference detected in "+b.join("."));f.push(g),y.forEach(g,function(O,I){(!(y.isUndefined(O)||O===null)&&s.call(t,O,y.isString(I)?I.trim():I,b,d))===!0&&m(O,b?b.concat(I):[I])}),f.pop()}}if(!y.isObject(e))throw new TypeError("data must be an object");return m(e),t}function Tc(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,function(r){return t[r]})}function Jo(e,t){this._pairs=[],e&&ei(e,this,t)}const Hf=Jo.prototype;Hf.append=function(t,n){this._pairs.push([t,n])};Hf.toString=function(t){const n=t?function(r){return t.call(this,r,Tc)}:Tc;return this._pairs.map(function(s){return n(s[0])+"="+n(s[1])},"").join("&")};function ov(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}function Vf(e,t,n){if(!t)return e;const r=n&&n.encode||ov;y.isFunction(n)&&(n={serialize:n});const s=n&&n.serialize;let i;if(s?i=s(t,n):i=y.isURLSearchParams(t)?t.toString():new Jo(t,n).toString(r),i){const o=e.indexOf("#");o!==-1&&(e=e.slice(0,o)),e+=(e.indexOf("?")===-1?"?":"&")+i}return e}class Cc{constructor(){this.handlers=[]}use(t,n,r){return this.handlers.push({fulfilled:t,rejected:n,synchronous:r?r.synchronous:!1,runWhen:r?r.runWhen:null}),this.handlers.length-1}eject(t){this.handlers[t]&&(this.handlers[t]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(t){y.forEach(this.handlers,function(r){r!==null&&t(r)})}}const jf={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},av=typeof URLSearchParams<"u"?URLSearchParams:Jo,cv=typeof FormData<"u"?FormData:null,lv=typeof Blob<"u"?Blob:null,uv={isBrowser:!0,classes:{URLSearchParams:av,FormData:cv,Blob:lv},protocols:["http","https","file","blob","url","data"]},Yo=typeof window<"u"&&typeof document<"u",ro=typeof navigator=="object"&&navigator||void 0,fv=Yo&&(!ro||["ReactNative","NativeScript","NS"].indexOf(ro.product)<0),dv=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",hv=Yo&&window.location.href||"http://localhost",pv=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:Yo,hasStandardBrowserEnv:fv,hasStandardBrowserWebWorkerEnv:dv,navigator:ro,origin:hv},Symbol.toStringTag,{value:"Module"})),ke={...pv,...uv};function mv(e,t){return ei(e,new ke.classes.URLSearchParams,{visitor:function(n,r,s,i){return ke.isNode&&y.isBuffer(n)?(this.append(r,n.toString("base64")),!1):i.defaultVisitor.apply(this,arguments)},...t})}function gv(e){return y.matchAll(/\w+|\[(\w*)]/g,e).map(t=>t[0]==="[]"?"":t[1]||t[0])}function _v(e){const t={},n=Object.keys(e);let r;const s=n.length;let i;for(r=0;r<s;r++)i=n[r],t[i]=e[i];return t}function Wf(e){function t(n,r,s,i){let o=n[i++];if(o==="__proto__")return!0;const a=Number.isFinite(+o),c=i>=n.length;return o=!o&&y.isArray(s)?s.length:o,c?(y.hasOwnProp(s,o)?s[o]=[s[o],r]:s[o]=r,!a):((!s[o]||!y.isObject(s[o]))&&(s[o]=[]),t(n,r,s[o],i)&&y.isArray(s[o])&&(s[o]=_v(s[o])),!a)}if(y.isFormData(e)&&y.isFunction(e.entries)){const n={};return y.forEachEntry(e,(r,s)=>{t(gv(r),s,n,0)}),n}return null}function yv(e,t,n){if(y.isString(e))try{return(t||JSON.parse)(e),y.trim(e)}catch(r){if(r.name!=="SyntaxError")throw r}return(n||JSON.stringify)(e)}const Vr={transitional:jf,adapter:["xhr","http","fetch"],transformRequest:[function(t,n){const r=n.getContentType()||"",s=r.indexOf("application/json")>-1,i=y.isObject(t);if(i&&y.isHTMLForm(t)&&(t=new FormData(t)),y.isFormData(t))return s?JSON.stringify(Wf(t)):t;if(y.isArrayBuffer(t)||y.isBuffer(t)||y.isStream(t)||y.isFile(t)||y.isBlob(t)||y.isReadableStream(t))return t;if(y.isArrayBufferView(t))return t.buffer;if(y.isURLSearchParams(t))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let a;if(i){if(r.indexOf("application/x-www-form-urlencoded")>-1)return mv(t,this.formSerializer).toString();if((a=y.isFileList(t))||r.indexOf("multipart/form-data")>-1){const c=this.env&&this.env.FormData;return ei(a?{"files[]":t}:t,c&&new c,this.formSerializer)}}return i||s?(n.setContentType("application/json",!1),yv(t)):t}],transformResponse:[function(t){const n=this.transitional||Vr.transitional,r=n&&n.forcedJSONParsing,s=this.responseType==="json";if(y.isResponse(t)||y.isReadableStream(t))return t;if(t&&y.isString(t)&&(r&&!this.responseType||s)){const o=!(n&&n.silentJSONParsing)&&s;try{return JSON.parse(t,this.parseReviver)}catch(a){if(o)throw a.name==="SyntaxError"?J.from(a,J.ERR_BAD_RESPONSE,this,null,this.response):a}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:ke.classes.FormData,Blob:ke.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};y.forEach(["delete","get","head","post","put","patch"],e=>{Vr.headers[e]={}});const bv=y.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),wv=e=>{const t={};let n,r,s;return e&&e.split(`
`).forEach(function(o){s=o.indexOf(":"),n=o.substring(0,s).trim().toLowerCase(),r=o.substring(s+1).trim(),!(!n||t[n]&&bv[n])&&(n==="set-cookie"?t[n]?t[n].push(r):t[n]=[r]:t[n]=t[n]?t[n]+", "+r:r)}),t},Sc=Symbol("internals");function ar(e){return e&&String(e).trim().toLowerCase()}function us(e){return e===!1||e==null?e:y.isArray(e)?e.map(us):String(e)}function vv(e){const t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let r;for(;r=n.exec(e);)t[r[1]]=r[2];return t}const Ev=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function Ti(e,t,n,r,s){if(y.isFunction(r))return r.call(this,t,n);if(s&&(t=n),!!y.isString(t)){if(y.isString(r))return t.indexOf(r)!==-1;if(y.isRegExp(r))return r.test(t)}}function Iv(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,n,r)=>n.toUpperCase()+r)}function Tv(e,t){const n=y.toCamelCase(" "+t);["get","set","has"].forEach(r=>{Object.defineProperty(e,r+n,{value:function(s,i,o){return this[r].call(this,t,s,i,o)},configurable:!0})})}let je=class{constructor(t){t&&this.set(t)}set(t,n,r){const s=this;function i(a,c,l){const u=ar(c);if(!u)throw new Error("header name must be a non-empty string");const f=y.findKey(s,u);(!f||s[f]===void 0||l===!0||l===void 0&&s[f]!==!1)&&(s[f||c]=us(a))}const o=(a,c)=>y.forEach(a,(l,u)=>i(l,u,c));if(y.isPlainObject(t)||t instanceof this.constructor)o(t,n);else if(y.isString(t)&&(t=t.trim())&&!Ev(t))o(wv(t),n);else if(y.isObject(t)&&y.isIterable(t)){let a={},c,l;for(const u of t){if(!y.isArray(u))throw TypeError("Object iterator must return a key-value pair");a[l=u[0]]=(c=a[l])?y.isArray(c)?[...c,u[1]]:[c,u[1]]:u[1]}o(a,n)}else t!=null&&i(n,t,r);return this}get(t,n){if(t=ar(t),t){const r=y.findKey(this,t);if(r){const s=this[r];if(!n)return s;if(n===!0)return vv(s);if(y.isFunction(n))return n.call(this,s,r);if(y.isRegExp(n))return n.exec(s);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,n){if(t=ar(t),t){const r=y.findKey(this,t);return!!(r&&this[r]!==void 0&&(!n||Ti(this,this[r],r,n)))}return!1}delete(t,n){const r=this;let s=!1;function i(o){if(o=ar(o),o){const a=y.findKey(r,o);a&&(!n||Ti(r,r[a],a,n))&&(delete r[a],s=!0)}}return y.isArray(t)?t.forEach(i):i(t),s}clear(t){const n=Object.keys(this);let r=n.length,s=!1;for(;r--;){const i=n[r];(!t||Ti(this,this[i],i,t,!0))&&(delete this[i],s=!0)}return s}normalize(t){const n=this,r={};return y.forEach(this,(s,i)=>{const o=y.findKey(r,i);if(o){n[o]=us(s),delete n[i];return}const a=t?Iv(i):String(i).trim();a!==i&&delete n[i],n[a]=us(s),r[a]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const n=Object.create(null);return y.forEach(this,(r,s)=>{r!=null&&r!==!1&&(n[s]=t&&y.isArray(r)?r.join(", "):r)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,n])=>t+": "+n).join(`
`)}getSetCookie(){return this.get("set-cookie")||[]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static concat(t,...n){const r=new this(t);return n.forEach(s=>r.set(s)),r}static accessor(t){const r=(this[Sc]=this[Sc]={accessors:{}}).accessors,s=this.prototype;function i(o){const a=ar(o);r[a]||(Tv(s,o),r[a]=!0)}return y.isArray(t)?t.forEach(i):i(t),this}};je.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);y.reduceDescriptors(je.prototype,({value:e},t)=>{let n=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(r){this[n]=r}}});y.freezeMethods(je);function Ci(e,t){const n=this||Vr,r=t||n,s=je.from(r.headers);let i=r.data;return y.forEach(e,function(a){i=a.call(n,i,s.normalize(),t?t.status:void 0)}),s.normalize(),i}function qf(e){return!!(e&&e.__CANCEL__)}function rr(e,t,n){J.call(this,e??"canceled",J.ERR_CANCELED,t,n),this.name="CanceledError"}y.inherits(rr,J,{__CANCEL__:!0});function Gf(e,t,n){const r=n.config.validateStatus;!n.status||!r||r(n.status)?e(n):t(new J("Request failed with status code "+n.status,[J.ERR_BAD_REQUEST,J.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))}function Cv(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}function Sv(e,t){e=e||10;const n=new Array(e),r=new Array(e);let s=0,i=0,o;return t=t!==void 0?t:1e3,function(c){const l=Date.now(),u=r[i];o||(o=l),n[s]=c,r[s]=l;let f=i,d=0;for(;f!==s;)d+=n[f++],f=f%e;if(s=(s+1)%e,s===i&&(i=(i+1)%e),l-o<t)return;const m=u&&l-u;return m?Math.round(d*1e3/m):void 0}}function Av(e,t){let n=0,r=1e3/t,s,i;const o=(l,u=Date.now())=>{n=u,s=null,i&&(clearTimeout(i),i=null),e(...l)};return[(...l)=>{const u=Date.now(),f=u-n;f>=r?o(l,u):(s=l,i||(i=setTimeout(()=>{i=null,o(s)},r-f)))},()=>s&&o(s)]}const xs=(e,t,n=3)=>{let r=0;const s=Sv(50,250);return Av(i=>{const o=i.loaded,a=i.lengthComputable?i.total:void 0,c=o-r,l=s(c),u=o<=a;r=o;const f={loaded:o,total:a,progress:a?o/a:void 0,bytes:c,rate:l||void 0,estimated:l&&a&&u?(a-o)/l:void 0,event:i,lengthComputable:a!=null,[t?"download":"upload"]:!0};e(f)},n)},Ac=(e,t)=>{const n=e!=null;return[r=>t[0]({lengthComputable:n,total:e,loaded:r}),t[1]]},Rc=e=>(...t)=>y.asap(()=>e(...t)),Rv=ke.hasStandardBrowserEnv?((e,t)=>n=>(n=new URL(n,ke.origin),e.protocol===n.protocol&&e.host===n.host&&(t||e.port===n.port)))(new URL(ke.origin),ke.navigator&&/(msie|trident)/i.test(ke.navigator.userAgent)):()=>!0,Pv=ke.hasStandardBrowserEnv?{write(e,t,n,r,s,i,o){if(typeof document>"u")return;const a=[`${e}=${encodeURIComponent(t)}`];y.isNumber(n)&&a.push(`expires=${new Date(n).toUTCString()}`),y.isString(r)&&a.push(`path=${r}`),y.isString(s)&&a.push(`domain=${s}`),i===!0&&a.push("secure"),y.isString(o)&&a.push(`SameSite=${o}`),document.cookie=a.join("; ")},read(e){if(typeof document>"u")return null;const t=document.cookie.match(new RegExp("(?:^|; )"+e+"=([^;]*)"));return t?decodeURIComponent(t[1]):null},remove(e){this.write(e,"",Date.now()-864e5,"/")}}:{write(){},read(){return null},remove(){}};function Ov(e){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function kv(e,t){return t?e.replace(/\/?\/$/,"")+"/"+t.replace(/^\/+/,""):e}function zf(e,t,n){let r=!Ov(t);return e&&(r||n==!1)?kv(e,t):t}const Pc=e=>e instanceof je?{...e}:e;function xn(e,t){t=t||{};const n={};function r(l,u,f,d){return y.isPlainObject(l)&&y.isPlainObject(u)?y.merge.call({caseless:d},l,u):y.isPlainObject(u)?y.merge({},u):y.isArray(u)?u.slice():u}function s(l,u,f,d){if(y.isUndefined(u)){if(!y.isUndefined(l))return r(void 0,l,f,d)}else return r(l,u,f,d)}function i(l,u){if(!y.isUndefined(u))return r(void 0,u)}function o(l,u){if(y.isUndefined(u)){if(!y.isUndefined(l))return r(void 0,l)}else return r(void 0,u)}function a(l,u,f){if(f in t)return r(l,u);if(f in e)return r(void 0,l)}const c={url:i,method:i,data:i,baseURL:o,transformRequest:o,transformResponse:o,paramsSerializer:o,timeout:o,timeoutMessage:o,withCredentials:o,withXSRFToken:o,adapter:o,responseType:o,xsrfCookieName:o,xsrfHeaderName:o,onUploadProgress:o,onDownloadProgress:o,decompress:o,maxContentLength:o,maxBodyLength:o,beforeRedirect:o,transport:o,httpAgent:o,httpsAgent:o,cancelToken:o,socketPath:o,responseEncoding:o,validateStatus:a,headers:(l,u,f)=>s(Pc(l),Pc(u),f,!0)};return y.forEach(Object.keys({...e,...t}),function(u){const f=c[u]||s,d=f(e[u],t[u],u);y.isUndefined(d)&&f!==a||(n[u]=d)}),n}const Kf=e=>{const t=xn({},e);let{data:n,withXSRFToken:r,xsrfHeaderName:s,xsrfCookieName:i,headers:o,auth:a}=t;if(t.headers=o=je.from(o),t.url=Vf(zf(t.baseURL,t.url,t.allowAbsoluteUrls),e.params,e.paramsSerializer),a&&o.set("Authorization","Basic "+btoa((a.username||"")+":"+(a.password?unescape(encodeURIComponent(a.password)):""))),y.isFormData(n)){if(ke.hasStandardBrowserEnv||ke.hasStandardBrowserWebWorkerEnv)o.setContentType(void 0);else if(y.isFunction(n.getHeaders)){const c=n.getHeaders(),l=["content-type","content-length"];Object.entries(c).forEach(([u,f])=>{l.includes(u.toLowerCase())&&o.set(u,f)})}}if(ke.hasStandardBrowserEnv&&(r&&y.isFunction(r)&&(r=r(t)),r||r!==!1&&Rv(t.url))){const c=s&&i&&Pv.read(i);c&&o.set(s,c)}return t},Nv=typeof XMLHttpRequest<"u",xv=Nv&&function(e){return new Promise(function(n,r){const s=Kf(e);let i=s.data;const o=je.from(s.headers).normalize();let{responseType:a,onUploadProgress:c,onDownloadProgress:l}=s,u,f,d,m,g;function b(){m&&m(),g&&g(),s.cancelToken&&s.cancelToken.unsubscribe(u),s.signal&&s.signal.removeEventListener("abort",u)}let w=new XMLHttpRequest;w.open(s.method.toUpperCase(),s.url,!0),w.timeout=s.timeout;function O(){if(!w)return;const A=je.from("getAllResponseHeaders"in w&&w.getAllResponseHeaders()),B={data:!a||a==="text"||a==="json"?w.responseText:w.response,status:w.status,statusText:w.statusText,headers:A,config:e,request:w};Gf(function(D){n(D),b()},function(D){r(D),b()},B),w=null}"onloadend"in w?w.onloadend=O:w.onreadystatechange=function(){!w||w.readyState!==4||w.status===0&&!(w.responseURL&&w.responseURL.indexOf("file:")===0)||setTimeout(O)},w.onabort=function(){w&&(r(new J("Request aborted",J.ECONNABORTED,e,w)),w=null)},w.onerror=function(C){const B=C&&C.message?C.message:"Network Error",F=new J(B,J.ERR_NETWORK,e,w);F.event=C||null,r(F),w=null},w.ontimeout=function(){let C=s.timeout?"timeout of "+s.timeout+"ms exceeded":"timeout exceeded";const B=s.transitional||jf;s.timeoutErrorMessage&&(C=s.timeoutErrorMessage),r(new J(C,B.clarifyTimeoutError?J.ETIMEDOUT:J.ECONNABORTED,e,w)),w=null},i===void 0&&o.setContentType(null),"setRequestHeader"in w&&y.forEach(o.toJSON(),function(C,B){w.setRequestHeader(B,C)}),y.isUndefined(s.withCredentials)||(w.withCredentials=!!s.withCredentials),a&&a!=="json"&&(w.responseType=s.responseType),l&&([d,g]=xs(l,!0),w.addEventListener("progress",d)),c&&w.upload&&([f,m]=xs(c),w.upload.addEventListener("progress",f),w.upload.addEventListener("loadend",m)),(s.cancelToken||s.signal)&&(u=A=>{w&&(r(!A||A.type?new rr(null,e,w):A),w.abort(),w=null)},s.cancelToken&&s.cancelToken.subscribe(u),s.signal&&(s.signal.aborted?u():s.signal.addEventListener("abort",u)));const I=Cv(s.url);if(I&&ke.protocols.indexOf(I)===-1){r(new J("Unsupported protocol "+I+":",J.ERR_BAD_REQUEST,e));return}w.send(i||null)})},Dv=(e,t)=>{const{length:n}=e=e?e.filter(Boolean):[];if(t||n){let r=new AbortController,s;const i=function(l){if(!s){s=!0,a();const u=l instanceof Error?l:this.reason;r.abort(u instanceof J?u:new rr(u instanceof Error?u.message:u))}};let o=t&&setTimeout(()=>{o=null,i(new J(`timeout ${t} of ms exceeded`,J.ETIMEDOUT))},t);const a=()=>{e&&(o&&clearTimeout(o),o=null,e.forEach(l=>{l.unsubscribe?l.unsubscribe(i):l.removeEventListener("abort",i)}),e=null)};e.forEach(l=>l.addEventListener("abort",i));const{signal:c}=r;return c.unsubscribe=()=>y.asap(a),c}},Lv=function*(e,t){let n=e.byteLength;if(n<t){yield e;return}let r=0,s;for(;r<n;)s=r+t,yield e.slice(r,s),r=s},Mv=async function*(e,t){for await(const n of Uv(e))yield*Lv(n,t)},Uv=async function*(e){if(e[Symbol.asyncIterator]){yield*e;return}const t=e.getReader();try{for(;;){const{done:n,value:r}=await t.read();if(n)break;yield r}}finally{await t.cancel()}},Oc=(e,t,n,r)=>{const s=Mv(e,t);let i=0,o,a=c=>{o||(o=!0,r&&r(c))};return new ReadableStream({async pull(c){try{const{done:l,value:u}=await s.next();if(l){a(),c.close();return}let f=u.byteLength;if(n){let d=i+=f;n(d)}c.enqueue(new Uint8Array(u))}catch(l){throw a(l),l}},cancel(c){return a(c),s.return()}},{highWaterMark:2})},kc=64*1024,{isFunction:Yr}=y,Fv=(({Request:e,Response:t})=>({Request:e,Response:t}))(y.global),{ReadableStream:Nc,TextEncoder:xc}=y.global,Dc=(e,...t)=>{try{return!!e(...t)}catch{return!1}},Bv=e=>{e=y.merge.call({skipUndefined:!0},Fv,e);const{fetch:t,Request:n,Response:r}=e,s=t?Yr(t):typeof fetch=="function",i=Yr(n),o=Yr(r);if(!s)return!1;const a=s&&Yr(Nc),c=s&&(typeof xc=="function"?(g=>b=>g.encode(b))(new xc):async g=>new Uint8Array(await new n(g).arrayBuffer())),l=i&&a&&Dc(()=>{let g=!1;const b=new n(ke.origin,{body:new Nc,method:"POST",get duplex(){return g=!0,"half"}}).headers.has("Content-Type");return g&&!b}),u=o&&a&&Dc(()=>y.isReadableStream(new r("").body)),f={stream:u&&(g=>g.body)};s&&["text","arrayBuffer","blob","formData","stream"].forEach(g=>{!f[g]&&(f[g]=(b,w)=>{let O=b&&b[g];if(O)return O.call(b);throw new J(`Response type '${g}' is not supported`,J.ERR_NOT_SUPPORT,w)})});const d=async g=>{if(g==null)return 0;if(y.isBlob(g))return g.size;if(y.isSpecCompliantForm(g))return(await new n(ke.origin,{method:"POST",body:g}).arrayBuffer()).byteLength;if(y.isArrayBufferView(g)||y.isArrayBuffer(g))return g.byteLength;if(y.isURLSearchParams(g)&&(g=g+""),y.isString(g))return(await c(g)).byteLength},m=async(g,b)=>{const w=y.toFiniteNumber(g.getContentLength());return w??d(b)};return async g=>{let{url:b,method:w,data:O,signal:I,cancelToken:A,timeout:C,onDownloadProgress:B,onUploadProgress:F,responseType:D,headers:W,withCredentials:ee="same-origin",fetchOptions:Ce}=Kf(g),st=t||fetch;D=D?(D+"").toLowerCase():"text";let Ye=Dv([I,A&&A.toAbortSignal()],C),Ae=null;const We=Ye&&Ye.unsubscribe&&(()=>{Ye.unsubscribe()});let xt;try{if(F&&l&&w!=="get"&&w!=="head"&&(xt=await m(W,O))!==0){let Ee=new n(b,{method:"POST",body:O,duplex:"half"}),ye;if(y.isFormData(O)&&(ye=Ee.headers.get("content-type"))&&W.setContentType(ye),Ee.body){const[_t,it]=Ac(xt,xs(Rc(F)));O=Oc(Ee.body,kc,_t,it)}}y.isString(ee)||(ee=ee?"include":"omit");const ie=i&&"credentials"in n.prototype,te={...Ce,signal:Ye,method:w.toUpperCase(),headers:W.normalize().toJSON(),body:O,duplex:"half",credentials:ie?ee:void 0};Ae=i&&new n(b,te);let X=await(i?st(Ae,Ce):st(b,te));const Xe=u&&(D==="stream"||D==="response");if(u&&(B||Xe&&We)){const Ee={};["status","statusText","headers"].forEach(yt=>{Ee[yt]=X[yt]});const ye=y.toFiniteNumber(X.headers.get("content-length")),[_t,it]=B&&Ac(ye,xs(Rc(B),!0))||[];X=new r(Oc(X.body,kc,_t,()=>{it&&it(),We&&We()}),Ee)}D=D||"text";let gt=await f[y.findKey(f,D)||"text"](X,g);return!Xe&&We&&We(),await new Promise((Ee,ye)=>{Gf(Ee,ye,{data:gt,headers:je.from(X.headers),status:X.status,statusText:X.statusText,config:g,request:Ae})})}catch(ie){throw We&&We(),ie&&ie.name==="TypeError"&&/Load failed|fetch/i.test(ie.message)?Object.assign(new J("Network Error",J.ERR_NETWORK,g,Ae),{cause:ie.cause||ie}):J.from(ie,ie&&ie.code,g,Ae)}}},$v=new Map,Jf=e=>{let t=e&&e.env||{};const{fetch:n,Request:r,Response:s}=t,i=[r,s,n];let o=i.length,a=o,c,l,u=$v;for(;a--;)c=i[a],l=u.get(c),l===void 0&&u.set(c,l=a?new Map:Bv(t)),u=l;return l};Jf();const Xo={http:rv,xhr:xv,fetch:{get:Jf}};y.forEach(Xo,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch{}Object.defineProperty(e,"adapterName",{value:t})}});const Lc=e=>`- ${e}`,Hv=e=>y.isFunction(e)||e===null||e===!1;function Vv(e,t){e=y.isArray(e)?e:[e];const{length:n}=e;let r,s;const i={};for(let o=0;o<n;o++){r=e[o];let a;if(s=r,!Hv(r)&&(s=Xo[(a=String(r)).toLowerCase()],s===void 0))throw new J(`Unknown adapter '${a}'`);if(s&&(y.isFunction(s)||(s=s.get(t))))break;i[a||"#"+o]=s}if(!s){const o=Object.entries(i).map(([c,l])=>`adapter ${c} `+(l===!1?"is not supported by the environment":"is not available in the build"));let a=n?o.length>1?`since :
`+o.map(Lc).join(`
`):" "+Lc(o[0]):"as no adapter specified";throw new J("There is no suitable adapter to dispatch the request "+a,"ERR_NOT_SUPPORT")}return s}const Yf={getAdapter:Vv,adapters:Xo};function Si(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new rr(null,e)}function Mc(e){return Si(e),e.headers=je.from(e.headers),e.data=Ci.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1&&e.headers.setContentType("application/x-www-form-urlencoded",!1),Yf.getAdapter(e.adapter||Vr.adapter,e)(e).then(function(r){return Si(e),r.data=Ci.call(e,e.transformResponse,r),r.headers=je.from(r.headers),r},function(r){return qf(r)||(Si(e),r&&r.response&&(r.response.data=Ci.call(e,e.transformResponse,r.response),r.response.headers=je.from(r.response.headers))),Promise.reject(r)})}const Xf="1.13.1",ti={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{ti[e]=function(r){return typeof r===e||"a"+(t<1?"n ":" ")+e}});const Uc={};ti.transitional=function(t,n,r){function s(i,o){return"[Axios v"+Xf+"] Transitional option '"+i+"'"+o+(r?". "+r:"")}return(i,o,a)=>{if(t===!1)throw new J(s(o," has been removed"+(n?" in "+n:"")),J.ERR_DEPRECATED);return n&&!Uc[o]&&(Uc[o]=!0,console.warn(s(o," has been deprecated since v"+n+" and will be removed in the near future"))),t?t(i,o,a):!0}};ti.spelling=function(t){return(n,r)=>(console.warn(`${r} is likely a misspelling of ${t}`),!0)};function jv(e,t,n){if(typeof e!="object")throw new J("options must be an object",J.ERR_BAD_OPTION_VALUE);const r=Object.keys(e);let s=r.length;for(;s-- >0;){const i=r[s],o=t[i];if(o){const a=e[i],c=a===void 0||o(a,i,e);if(c!==!0)throw new J("option "+i+" must be "+c,J.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new J("Unknown option "+i,J.ERR_BAD_OPTION)}}const fs={assertOptions:jv,validators:ti},It=fs.validators;let An=class{constructor(t){this.defaults=t||{},this.interceptors={request:new Cc,response:new Cc}}async request(t,n){try{return await this._request(t,n)}catch(r){if(r instanceof Error){let s={};Error.captureStackTrace?Error.captureStackTrace(s):s=new Error;const i=s.stack?s.stack.replace(/^.+\n/,""):"";try{r.stack?i&&!String(r.stack).endsWith(i.replace(/^.+\n.+\n/,""))&&(r.stack+=`
`+i):r.stack=i}catch{}}throw r}}_request(t,n){typeof t=="string"?(n=n||{},n.url=t):n=t||{},n=xn(this.defaults,n);const{transitional:r,paramsSerializer:s,headers:i}=n;r!==void 0&&fs.assertOptions(r,{silentJSONParsing:It.transitional(It.boolean),forcedJSONParsing:It.transitional(It.boolean),clarifyTimeoutError:It.transitional(It.boolean)},!1),s!=null&&(y.isFunction(s)?n.paramsSerializer={serialize:s}:fs.assertOptions(s,{encode:It.function,serialize:It.function},!0)),n.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?n.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:n.allowAbsoluteUrls=!0),fs.assertOptions(n,{baseUrl:It.spelling("baseURL"),withXsrfToken:It.spelling("withXSRFToken")},!0),n.method=(n.method||this.defaults.method||"get").toLowerCase();let o=i&&y.merge(i.common,i[n.method]);i&&y.forEach(["delete","get","head","post","put","patch","common"],g=>{delete i[g]}),n.headers=je.concat(o,i);const a=[];let c=!0;this.interceptors.request.forEach(function(b){typeof b.runWhen=="function"&&b.runWhen(n)===!1||(c=c&&b.synchronous,a.unshift(b.fulfilled,b.rejected))});const l=[];this.interceptors.response.forEach(function(b){l.push(b.fulfilled,b.rejected)});let u,f=0,d;if(!c){const g=[Mc.bind(this),void 0];for(g.unshift(...a),g.push(...l),d=g.length,u=Promise.resolve(n);f<d;)u=u.then(g[f++],g[f++]);return u}d=a.length;let m=n;for(;f<d;){const g=a[f++],b=a[f++];try{m=g(m)}catch(w){b.call(this,w);break}}try{u=Mc.call(this,m)}catch(g){return Promise.reject(g)}for(f=0,d=l.length;f<d;)u=u.then(l[f++],l[f++]);return u}getUri(t){t=xn(this.defaults,t);const n=zf(t.baseURL,t.url,t.allowAbsoluteUrls);return Vf(n,t.params,t.paramsSerializer)}};y.forEach(["delete","get","head","options"],function(t){An.prototype[t]=function(n,r){return this.request(xn(r||{},{method:t,url:n,data:(r||{}).data}))}});y.forEach(["post","put","patch"],function(t){function n(r){return function(i,o,a){return this.request(xn(a||{},{method:t,headers:r?{"Content-Type":"multipart/form-data"}:{},url:i,data:o}))}}An.prototype[t]=n(),An.prototype[t+"Form"]=n(!0)});let Wv=class Qf{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(i){n=i});const r=this;this.promise.then(s=>{if(!r._listeners)return;let i=r._listeners.length;for(;i-- >0;)r._listeners[i](s);r._listeners=null}),this.promise.then=s=>{let i;const o=new Promise(a=>{r.subscribe(a),i=a}).then(s);return o.cancel=function(){r.unsubscribe(i)},o},t(function(i,o,a){r.reason||(r.reason=new rr(i,o,a),n(r.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const n=this._listeners.indexOf(t);n!==-1&&this._listeners.splice(n,1)}toAbortSignal(){const t=new AbortController,n=r=>{t.abort(r)};return this.subscribe(n),t.signal.unsubscribe=()=>this.unsubscribe(n),t.signal}static source(){let t;return{token:new Qf(function(s){t=s}),cancel:t}}};function qv(e){return function(n){return e.apply(null,n)}}function Gv(e){return y.isObject(e)&&e.isAxiosError===!0}const so={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511,WebServerIsDown:521,ConnectionTimedOut:522,OriginIsUnreachable:523,TimeoutOccurred:524,SslHandshakeFailed:525,InvalidSslCertificate:526};Object.entries(so).forEach(([e,t])=>{so[t]=e});function Zf(e){const t=new An(e),n=Of(An.prototype.request,t);return y.extend(n,An.prototype,t,{allOwnKeys:!0}),y.extend(n,t,null,{allOwnKeys:!0}),n.create=function(s){return Zf(xn(e,s))},n}const _e=Zf(Vr);_e.Axios=An;_e.CanceledError=rr;_e.CancelToken=Wv;_e.isCancel=qf;_e.VERSION=Xf;_e.toFormData=ei;_e.AxiosError=J;_e.Cancel=_e.CanceledError;_e.all=function(t){return Promise.all(t)};_e.spread=qv;_e.isAxiosError=Gv;_e.mergeConfig=xn;_e.AxiosHeaders=je;_e.formToJSON=e=>Wf(y.isHTMLForm(e)?new FormData(e):e);_e.getAdapter=Yf.getAdapter;_e.HttpStatusCode=so;_e.default=_e;const{Axios:JT,AxiosError:YT,CanceledError:XT,isCancel:QT,CancelToken:ZT,VERSION:eC,all:tC,Cancel:nC,isAxiosError:rC,spread:sC,toFormData:iC,AxiosHeaders:oC,HttpStatusCode:aC,formToJSON:cC,getAdapter:lC,mergeConfig:uC}=_e,zv={apiKey:"AIzaSyAEhcUkneNuXjazuYuI96u3ZieUBlmYFZo",authDomain:"guitar-app-b28eb.firebaseapp.com",databaseURL:"https://guitar-app-b28eb-default-rtdb.europe-west1.firebasedatabase.app",projectId:"guitar-app-b28eb",storageBucket:"guitar-app-b28eb.firebasestorage.app",messagingSenderId:"743886142545",appId:"1:743886142545:web:07c7b52fc17a5fe6770c70",measurementId:"G-7Y0LWBF1VH"},ed=Cu(zv);Y_(ed);const at=gw(ed),we=_e.create({baseURL:"https://chord-viewer.onrender.com/api",withCredentials:!0});let Xr=!1,io=[];const Fc=(e,t=null)=>{io.forEach(n=>{e?n.reject(e):n.resolve(t)}),io=[]};we.interceptors.response.use(e=>e,async e=>{const t=e.config;if(e.response?.status===401&&!t._retry){if(window.location.pathname==="/")return Promise.reject(e);if(Xr)return new Promise((n,r)=>{io.push({resolve:n,reject:r})}).then(()=>we(t)).catch(n=>Promise.reject(n));t._retry=!0,Xr=!0;try{const n=at.currentUser;if(!n)throw new Error("No authenticated user");const r=await n.getIdToken(!0);return console.log("REFRESHING"),await we.post("/refresh",{},{headers:{Authorization:`Bearer ${r}`}}),Fc(null,r),Xr=!1,we(t)}catch(n){return Fc(n,null),Xr=!1,window.location.pathname!=="/"&&(window.location.href="/"),Promise.reject(n)}}return Promise.reject(e)});async function Ai(e){const t=e.token,n={email:e.email,password:e.password,admin:!1};try{return(await we.post("/login",n,{headers:{Authorization:`Bearer ${t}`}})).data}catch(r){return console.error("Login failed:",r.response?.data||r.message),null}}async function Ri(e){const t=e.token,n={email:e.email,password:e.password,admin:!1};try{return(await we.post("/register",n,{headers:{Authorization:`Bearer ${t}`}})).data}catch(r){return console.error("Registration failed:",r.response?.data||r.message),null}}async function Kv(){try{return(await we.get("/me")).data}catch(e){return console.log("No session",e),null}}async function Jv(){try{return(await we.post("/logout")).data}catch{return null}}async function Yv(e){try{return(await we.put("/profile-picture",{profilePictureUrl:e})).data}catch{return null}}const Xv={class:"theme-wrapper"},Qv=ht({__name:"App",setup(e){return Dn(async()=>{Zi(at,async()=>{const t=await Kv();t&&(ge.setUser(t.email,"","",t.profilePictureUrl,t.favouriteChords,t.learnedChords),console.log(t.email,"","",t.favouriteChords,t.learnedChords))})}),(t,n)=>{const r=Ih("router-view");return K(),Y("div",Xv,[ae(r)])}}}),mt=(e,t)=>{const n=e.__vccOpts||e;for(const[r,s]of t)n[r]=s;return n},Zv=mt(Qv,[["__scopeId","data-v-5ec3f2d9"]]);/*!
 * vue-router v4.6.3
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */const Bn=typeof document<"u";function td(e){return typeof e=="object"||"displayName"in e||"props"in e||"__vccOpts"in e}function eE(e){return e.__esModule||e[Symbol.toStringTag]==="Module"||e.default&&td(e.default)}const ne=Object.assign;function Pi(e,t){const n={};for(const r in t){const s=t[r];n[r]=dt(s)?s.map(e):e(s)}return n}const vr=()=>{},dt=Array.isArray;function Bc(e,t){const n={};for(const r in e)n[r]=r in t?t[r]:e[r];return n}const nd=/#/g,tE=/&/g,nE=/\//g,rE=/=/g,sE=/\?/g,rd=/\+/g,iE=/%5B/g,oE=/%5D/g,sd=/%5E/g,aE=/%60/g,id=/%7B/g,cE=/%7C/g,od=/%7D/g,lE=/%20/g;function Qo(e){return e==null?"":encodeURI(""+e).replace(cE,"|").replace(iE,"[").replace(oE,"]")}function uE(e){return Qo(e).replace(id,"{").replace(od,"}").replace(sd,"^")}function oo(e){return Qo(e).replace(rd,"%2B").replace(lE,"+").replace(nd,"%23").replace(tE,"%26").replace(aE,"`").replace(id,"{").replace(od,"}").replace(sd,"^")}function fE(e){return oo(e).replace(rE,"%3D")}function dE(e){return Qo(e).replace(nd,"%23").replace(sE,"%3F")}function hE(e){return dE(e).replace(nE,"%2F")}function Or(e){if(e==null)return null;try{return decodeURIComponent(""+e)}catch{}return""+e}const pE=/\/$/,mE=e=>e.replace(pE,"");function Oi(e,t,n="/"){let r,s={},i="",o="";const a=t.indexOf("#");let c=t.indexOf("?");return c=a>=0&&c>a?-1:c,c>=0&&(r=t.slice(0,c),i=t.slice(c,a>0?a:t.length),s=e(i.slice(1))),a>=0&&(r=r||t.slice(0,a),o=t.slice(a,t.length)),r=bE(r??t,n),{fullPath:r+i+o,path:r,query:s,hash:Or(o)}}function gE(e,t){const n=t.query?e(t.query):"";return t.path+(n&&"?")+n+(t.hash||"")}function $c(e,t){return!t||!e.toLowerCase().startsWith(t.toLowerCase())?e:e.slice(t.length)||"/"}function _E(e,t,n){const r=t.matched.length-1,s=n.matched.length-1;return r>-1&&r===s&&Qn(t.matched[r],n.matched[s])&&ad(t.params,n.params)&&e(t.query)===e(n.query)&&t.hash===n.hash}function Qn(e,t){return(e.aliasOf||e)===(t.aliasOf||t)}function ad(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const n in e)if(!yE(e[n],t[n]))return!1;return!0}function yE(e,t){return dt(e)?Hc(e,t):dt(t)?Hc(t,e):e===t}function Hc(e,t){return dt(t)?e.length===t.length&&e.every((n,r)=>n===t[r]):e.length===1&&e[0]===t}function bE(e,t){if(e.startsWith("/"))return e;if(!e)return t;const n=t.split("/"),r=e.split("/"),s=r[r.length-1];(s===".."||s===".")&&r.push("");let i=n.length-1,o,a;for(o=0;o<r.length;o++)if(a=r[o],a!==".")if(a==="..")i>1&&i--;else break;return n.slice(0,i).join("/")+"/"+r.slice(o).join("/")}const en={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};let ao=(function(e){return e.pop="pop",e.push="push",e})({}),ki=(function(e){return e.back="back",e.forward="forward",e.unknown="",e})({});function wE(e){if(!e)if(Bn){const t=document.querySelector("base");e=t&&t.getAttribute("href")||"/",e=e.replace(/^\w+:\/\/[^\/]+/,"")}else e="/";return e[0]!=="/"&&e[0]!=="#"&&(e="/"+e),mE(e)}const vE=/^[^#]+#/;function EE(e,t){return e.replace(vE,"#")+t}function IE(e,t){const n=document.documentElement.getBoundingClientRect(),r=e.getBoundingClientRect();return{behavior:t.behavior,left:r.left-n.left-(t.left||0),top:r.top-n.top-(t.top||0)}}const ni=()=>({left:window.scrollX,top:window.scrollY});function TE(e){let t;if("el"in e){const n=e.el,r=typeof n=="string"&&n.startsWith("#"),s=typeof n=="string"?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!s)return;t=IE(s,e)}else t=e;"scrollBehavior"in document.documentElement.style?window.scrollTo(t):window.scrollTo(t.left!=null?t.left:window.scrollX,t.top!=null?t.top:window.scrollY)}function Vc(e,t){return(history.state?history.state.position-t:-1)+e}const co=new Map;function CE(e,t){co.set(e,t)}function SE(e){const t=co.get(e);return co.delete(e),t}function AE(e){return typeof e=="string"||e&&typeof e=="object"}function cd(e){return typeof e=="string"||typeof e=="symbol"}let me=(function(e){return e[e.MATCHER_NOT_FOUND=1]="MATCHER_NOT_FOUND",e[e.NAVIGATION_GUARD_REDIRECT=2]="NAVIGATION_GUARD_REDIRECT",e[e.NAVIGATION_ABORTED=4]="NAVIGATION_ABORTED",e[e.NAVIGATION_CANCELLED=8]="NAVIGATION_CANCELLED",e[e.NAVIGATION_DUPLICATED=16]="NAVIGATION_DUPLICATED",e})({});const ld=Symbol("");me.MATCHER_NOT_FOUND+"",me.NAVIGATION_GUARD_REDIRECT+"",me.NAVIGATION_ABORTED+"",me.NAVIGATION_CANCELLED+"",me.NAVIGATION_DUPLICATED+"";function Zn(e,t){return ne(new Error,{type:e,[ld]:!0},t)}function Lt(e,t){return e instanceof Error&&ld in e&&(t==null||!!(e.type&t))}const RE=["params","query","hash"];function PE(e){if(typeof e=="string")return e;if(e.path!=null)return e.path;const t={};for(const n of RE)n in e&&(t[n]=e[n]);return JSON.stringify(t,null,2)}function OE(e){const t={};if(e===""||e==="?")return t;const n=(e[0]==="?"?e.slice(1):e).split("&");for(let r=0;r<n.length;++r){const s=n[r].replace(rd," "),i=s.indexOf("="),o=Or(i<0?s:s.slice(0,i)),a=i<0?null:Or(s.slice(i+1));if(o in t){let c=t[o];dt(c)||(c=t[o]=[c]),c.push(a)}else t[o]=a}return t}function jc(e){let t="";for(let n in e){const r=e[n];if(n=fE(n),r==null){r!==void 0&&(t+=(t.length?"&":"")+n);continue}(dt(r)?r.map(s=>s&&oo(s)):[r&&oo(r)]).forEach(s=>{s!==void 0&&(t+=(t.length?"&":"")+n,s!=null&&(t+="="+s))})}return t}function kE(e){const t={};for(const n in e){const r=e[n];r!==void 0&&(t[n]=dt(r)?r.map(s=>s==null?null:""+s):r==null?r:""+r)}return t}const NE=Symbol(""),Wc=Symbol(""),ri=Symbol(""),Zo=Symbol(""),lo=Symbol("");function cr(){let e=[];function t(r){return e.push(r),()=>{const s=e.indexOf(r);s>-1&&e.splice(s,1)}}function n(){e=[]}return{add:t,list:()=>e.slice(),reset:n}}function rn(e,t,n,r,s,i=o=>o()){const o=r&&(r.enterCallbacks[s]=r.enterCallbacks[s]||[]);return()=>new Promise((a,c)=>{const l=d=>{d===!1?c(Zn(me.NAVIGATION_ABORTED,{from:n,to:t})):d instanceof Error?c(d):AE(d)?c(Zn(me.NAVIGATION_GUARD_REDIRECT,{from:t,to:d})):(o&&r.enterCallbacks[s]===o&&typeof d=="function"&&o.push(d),a())},u=i(()=>e.call(r&&r.instances[s],t,n,l));let f=Promise.resolve(u);e.length<3&&(f=f.then(l)),f.catch(d=>c(d))})}function Ni(e,t,n,r,s=i=>i()){const i=[];for(const o of e)for(const a in o.components){let c=o.components[a];if(!(t!=="beforeRouteEnter"&&!o.instances[a]))if(td(c)){const l=(c.__vccOpts||c)[t];l&&i.push(rn(l,n,r,o,a,s))}else{let l=c();i.push(()=>l.then(u=>{if(!u)throw new Error(`Couldn't resolve component "${a}" at "${o.path}"`);const f=eE(u)?u.default:u;o.mods[a]=u,o.components[a]=f;const d=(f.__vccOpts||f)[t];return d&&rn(d,n,r,o,a,s)()}))}}return i}function xE(e,t){const n=[],r=[],s=[],i=Math.max(t.matched.length,e.matched.length);for(let o=0;o<i;o++){const a=t.matched[o];a&&(e.matched.find(l=>Qn(l,a))?r.push(a):n.push(a));const c=e.matched[o];c&&(t.matched.find(l=>Qn(l,c))||s.push(c))}return[n,r,s]}/*!
 * vue-router v4.6.3
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let DE=()=>location.protocol+"//"+location.host;function ud(e,t){const{pathname:n,search:r,hash:s}=t,i=e.indexOf("#");if(i>-1){let o=s.includes(e.slice(i))?e.slice(i).length:1,a=s.slice(o);return a[0]!=="/"&&(a="/"+a),$c(a,"")}return $c(n,e)+r+s}function LE(e,t,n,r){let s=[],i=[],o=null;const a=({state:d})=>{const m=ud(e,location),g=n.value,b=t.value;let w=0;if(d){if(n.value=m,t.value=d,o&&o===g){o=null;return}w=b?d.position-b.position:0}else r(m);s.forEach(O=>{O(n.value,g,{delta:w,type:ao.pop,direction:w?w>0?ki.forward:ki.back:ki.unknown})})};function c(){o=n.value}function l(d){s.push(d);const m=()=>{const g=s.indexOf(d);g>-1&&s.splice(g,1)};return i.push(m),m}function u(){if(document.visibilityState==="hidden"){const{history:d}=window;if(!d.state)return;d.replaceState(ne({},d.state,{scroll:ni()}),"")}}function f(){for(const d of i)d();i=[],window.removeEventListener("popstate",a),window.removeEventListener("pagehide",u),document.removeEventListener("visibilitychange",u)}return window.addEventListener("popstate",a),window.addEventListener("pagehide",u),document.addEventListener("visibilitychange",u),{pauseListeners:c,listen:l,destroy:f}}function qc(e,t,n,r=!1,s=!1){return{back:e,current:t,forward:n,replaced:r,position:window.history.length,scroll:s?ni():null}}function ME(e){const{history:t,location:n}=window,r={value:ud(e,n)},s={value:t.state};s.value||i(r.value,{back:null,current:r.value,forward:null,position:t.length-1,replaced:!0,scroll:null},!0);function i(c,l,u){const f=e.indexOf("#"),d=f>-1?(n.host&&document.querySelector("base")?e:e.slice(f))+c:DE()+e+c;try{t[u?"replaceState":"pushState"](l,"",d),s.value=l}catch(m){console.error(m),n[u?"replace":"assign"](d)}}function o(c,l){i(c,ne({},t.state,qc(s.value.back,c,s.value.forward,!0),l,{position:s.value.position}),!0),r.value=c}function a(c,l){const u=ne({},s.value,t.state,{forward:c,scroll:ni()});i(u.current,u,!0),i(c,ne({},qc(r.value,c,null),{position:u.position+1},l),!1),r.value=c}return{location:r,state:s,push:a,replace:o}}function UE(e){e=wE(e);const t=ME(e),n=LE(e,t.state,t.location,t.replace);function r(i,o=!0){o||n.pauseListeners(),history.go(i)}const s=ne({location:"",base:e,go:r,createHref:EE.bind(null,e)},t,n);return Object.defineProperty(s,"location",{enumerable:!0,get:()=>t.location.value}),Object.defineProperty(s,"state",{enumerable:!0,get:()=>t.state.value}),s}let Cn=(function(e){return e[e.Static=0]="Static",e[e.Param=1]="Param",e[e.Group=2]="Group",e})({});var Ie=(function(e){return e[e.Static=0]="Static",e[e.Param=1]="Param",e[e.ParamRegExp=2]="ParamRegExp",e[e.ParamRegExpEnd=3]="ParamRegExpEnd",e[e.EscapeNext=4]="EscapeNext",e})(Ie||{});const FE={type:Cn.Static,value:""},BE=/[a-zA-Z0-9_]/;function $E(e){if(!e)return[[]];if(e==="/")return[[FE]];if(!e.startsWith("/"))throw new Error(`Invalid path "${e}"`);function t(m){throw new Error(`ERR (${n})/"${l}": ${m}`)}let n=Ie.Static,r=n;const s=[];let i;function o(){i&&s.push(i),i=[]}let a=0,c,l="",u="";function f(){l&&(n===Ie.Static?i.push({type:Cn.Static,value:l}):n===Ie.Param||n===Ie.ParamRegExp||n===Ie.ParamRegExpEnd?(i.length>1&&(c==="*"||c==="+")&&t(`A repeatable param (${l}) must be alone in its segment. eg: '/:ids+.`),i.push({type:Cn.Param,value:l,regexp:u,repeatable:c==="*"||c==="+",optional:c==="*"||c==="?"})):t("Invalid state to consume buffer"),l="")}function d(){l+=c}for(;a<e.length;){if(c=e[a++],c==="\\"&&n!==Ie.ParamRegExp){r=n,n=Ie.EscapeNext;continue}switch(n){case Ie.Static:c==="/"?(l&&f(),o()):c===":"?(f(),n=Ie.Param):d();break;case Ie.EscapeNext:d(),n=r;break;case Ie.Param:c==="("?n=Ie.ParamRegExp:BE.test(c)?d():(f(),n=Ie.Static,c!=="*"&&c!=="?"&&c!=="+"&&a--);break;case Ie.ParamRegExp:c===")"?u[u.length-1]=="\\"?u=u.slice(0,-1)+c:n=Ie.ParamRegExpEnd:u+=c;break;case Ie.ParamRegExpEnd:f(),n=Ie.Static,c!=="*"&&c!=="?"&&c!=="+"&&a--,u="";break;default:t("Unknown state");break}}return n===Ie.ParamRegExp&&t(`Unfinished custom RegExp for param "${l}"`),f(),o(),s}const Gc="[^/]+?",HE={sensitive:!1,strict:!1,start:!0,end:!0};var Le=(function(e){return e[e._multiplier=10]="_multiplier",e[e.Root=90]="Root",e[e.Segment=40]="Segment",e[e.SubSegment=30]="SubSegment",e[e.Static=40]="Static",e[e.Dynamic=20]="Dynamic",e[e.BonusCustomRegExp=10]="BonusCustomRegExp",e[e.BonusWildcard=-50]="BonusWildcard",e[e.BonusRepeatable=-20]="BonusRepeatable",e[e.BonusOptional=-8]="BonusOptional",e[e.BonusStrict=.7000000000000001]="BonusStrict",e[e.BonusCaseSensitive=.25]="BonusCaseSensitive",e})(Le||{});const VE=/[.+*?^${}()[\]/\\]/g;function jE(e,t){const n=ne({},HE,t),r=[];let s=n.start?"^":"";const i=[];for(const l of e){const u=l.length?[]:[Le.Root];n.strict&&!l.length&&(s+="/");for(let f=0;f<l.length;f++){const d=l[f];let m=Le.Segment+(n.sensitive?Le.BonusCaseSensitive:0);if(d.type===Cn.Static)f||(s+="/"),s+=d.value.replace(VE,"\\$&"),m+=Le.Static;else if(d.type===Cn.Param){const{value:g,repeatable:b,optional:w,regexp:O}=d;i.push({name:g,repeatable:b,optional:w});const I=O||Gc;if(I!==Gc){m+=Le.BonusCustomRegExp;try{`${I}`}catch(C){throw new Error(`Invalid custom RegExp for param "${g}" (${I}): `+C.message)}}let A=b?`((?:${I})(?:/(?:${I}))*)`:`(${I})`;f||(A=w&&l.length<2?`(?:/${A})`:"/"+A),w&&(A+="?"),s+=A,m+=Le.Dynamic,w&&(m+=Le.BonusOptional),b&&(m+=Le.BonusRepeatable),I===".*"&&(m+=Le.BonusWildcard)}u.push(m)}r.push(u)}if(n.strict&&n.end){const l=r.length-1;r[l][r[l].length-1]+=Le.BonusStrict}n.strict||(s+="/?"),n.end?s+="$":n.strict&&!s.endsWith("/")&&(s+="(?:/|$)");const o=new RegExp(s,n.sensitive?"":"i");function a(l){const u=l.match(o),f={};if(!u)return null;for(let d=1;d<u.length;d++){const m=u[d]||"",g=i[d-1];f[g.name]=m&&g.repeatable?m.split("/"):m}return f}function c(l){let u="",f=!1;for(const d of e){(!f||!u.endsWith("/"))&&(u+="/"),f=!1;for(const m of d)if(m.type===Cn.Static)u+=m.value;else if(m.type===Cn.Param){const{value:g,repeatable:b,optional:w}=m,O=g in l?l[g]:"";if(dt(O)&&!b)throw new Error(`Provided param "${g}" is an array but it is not repeatable (* or + modifiers)`);const I=dt(O)?O.join("/"):O;if(!I)if(w)d.length<2&&(u.endsWith("/")?u=u.slice(0,-1):f=!0);else throw new Error(`Missing required param "${g}"`);u+=I}}return u||"/"}return{re:o,score:r,keys:i,parse:a,stringify:c}}function WE(e,t){let n=0;for(;n<e.length&&n<t.length;){const r=t[n]-e[n];if(r)return r;n++}return e.length<t.length?e.length===1&&e[0]===Le.Static+Le.Segment?-1:1:e.length>t.length?t.length===1&&t[0]===Le.Static+Le.Segment?1:-1:0}function fd(e,t){let n=0;const r=e.score,s=t.score;for(;n<r.length&&n<s.length;){const i=WE(r[n],s[n]);if(i)return i;n++}if(Math.abs(s.length-r.length)===1){if(zc(r))return 1;if(zc(s))return-1}return s.length-r.length}function zc(e){const t=e[e.length-1];return e.length>0&&t[t.length-1]<0}const qE={strict:!1,end:!0,sensitive:!1};function GE(e,t,n){const r=jE($E(e.path),n),s=ne(r,{record:e,parent:t,children:[],alias:[]});return t&&!s.record.aliasOf==!t.record.aliasOf&&t.children.push(s),s}function zE(e,t){const n=[],r=new Map;t=Bc(qE,t);function s(f){return r.get(f)}function i(f,d,m){const g=!m,b=Jc(f);b.aliasOf=m&&m.record;const w=Bc(t,f),O=[b];if("alias"in f){const C=typeof f.alias=="string"?[f.alias]:f.alias;for(const B of C)O.push(Jc(ne({},b,{components:m?m.record.components:b.components,path:B,aliasOf:m?m.record:b})))}let I,A;for(const C of O){const{path:B}=C;if(d&&B[0]!=="/"){const F=d.record.path,D=F[F.length-1]==="/"?"":"/";C.path=d.record.path+(B&&D+B)}if(I=GE(C,d,w),m?m.alias.push(I):(A=A||I,A!==I&&A.alias.push(I),g&&f.name&&!Yc(I)&&o(f.name)),dd(I)&&c(I),b.children){const F=b.children;for(let D=0;D<F.length;D++)i(F[D],I,m&&m.children[D])}m=m||I}return A?()=>{o(A)}:vr}function o(f){if(cd(f)){const d=r.get(f);d&&(r.delete(f),n.splice(n.indexOf(d),1),d.children.forEach(o),d.alias.forEach(o))}else{const d=n.indexOf(f);d>-1&&(n.splice(d,1),f.record.name&&r.delete(f.record.name),f.children.forEach(o),f.alias.forEach(o))}}function a(){return n}function c(f){const d=YE(f,n);n.splice(d,0,f),f.record.name&&!Yc(f)&&r.set(f.record.name,f)}function l(f,d){let m,g={},b,w;if("name"in f&&f.name){if(m=r.get(f.name),!m)throw Zn(me.MATCHER_NOT_FOUND,{location:f});w=m.record.name,g=ne(Kc(d.params,m.keys.filter(A=>!A.optional).concat(m.parent?m.parent.keys.filter(A=>A.optional):[]).map(A=>A.name)),f.params&&Kc(f.params,m.keys.map(A=>A.name))),b=m.stringify(g)}else if(f.path!=null)b=f.path,m=n.find(A=>A.re.test(b)),m&&(g=m.parse(b),w=m.record.name);else{if(m=d.name?r.get(d.name):n.find(A=>A.re.test(d.path)),!m)throw Zn(me.MATCHER_NOT_FOUND,{location:f,currentLocation:d});w=m.record.name,g=ne({},d.params,f.params),b=m.stringify(g)}const O=[];let I=m;for(;I;)O.unshift(I.record),I=I.parent;return{name:w,path:b,params:g,matched:O,meta:JE(O)}}e.forEach(f=>i(f));function u(){n.length=0,r.clear()}return{addRoute:i,resolve:l,removeRoute:o,clearRoutes:u,getRoutes:a,getRecordMatcher:s}}function Kc(e,t){const n={};for(const r of t)r in e&&(n[r]=e[r]);return n}function Jc(e){const t={path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:e.aliasOf,beforeEnter:e.beforeEnter,props:KE(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in e?e.components||null:e.component&&{default:e.component}};return Object.defineProperty(t,"mods",{value:{}}),t}function KE(e){const t={},n=e.props||!1;if("component"in e)t.default=n;else for(const r in e.components)t[r]=typeof n=="object"?n[r]:n;return t}function Yc(e){for(;e;){if(e.record.aliasOf)return!0;e=e.parent}return!1}function JE(e){return e.reduce((t,n)=>ne(t,n.meta),{})}function YE(e,t){let n=0,r=t.length;for(;n!==r;){const i=n+r>>1;fd(e,t[i])<0?r=i:n=i+1}const s=XE(e);return s&&(r=t.lastIndexOf(s,r-1)),r}function XE(e){let t=e;for(;t=t.parent;)if(dd(t)&&fd(e,t)===0)return t}function dd({record:e}){return!!(e.name||e.components&&Object.keys(e.components).length||e.redirect)}function Xc(e){const t=ut(ri),n=ut(Zo),r=Oe(()=>{const c=be(e.to);return t.resolve(c)}),s=Oe(()=>{const{matched:c}=r.value,{length:l}=c,u=c[l-1],f=n.matched;if(!u||!f.length)return-1;const d=f.findIndex(Qn.bind(null,u));if(d>-1)return d;const m=Qc(c[l-2]);return l>1&&Qc(u)===m&&f[f.length-1].path!==m?f.findIndex(Qn.bind(null,c[l-2])):d}),i=Oe(()=>s.value>-1&&nI(n.params,r.value.params)),o=Oe(()=>s.value>-1&&s.value===n.matched.length-1&&ad(n.params,r.value.params));function a(c={}){if(tI(c)){const l=t[be(e.replace)?"replace":"push"](be(e.to)).catch(vr);return e.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>l),l}return Promise.resolve()}return{route:r,href:Oe(()=>r.value.href),isActive:i,isExactActive:o,navigate:a}}function QE(e){return e.length===1?e[0]:e}const ZE=ht({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"},viewTransition:Boolean},useLink:Xc,setup(e,{slots:t}){const n=dn(Xc(e)),{options:r}=ut(ri),s=Oe(()=>({[Zc(e.activeClass,r.linkActiveClass,"router-link-active")]:n.isActive,[Zc(e.exactActiveClass,r.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const i=t.default&&QE(t.default(n));return e.custom?i:fu("a",{"aria-current":n.isExactActive?e.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:s.value},i)}}}),eI=ZE;function tI(e){if(!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)&&!e.defaultPrevented&&!(e.button!==void 0&&e.button!==0)){if(e.currentTarget&&e.currentTarget.getAttribute){const t=e.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(t))return}return e.preventDefault&&e.preventDefault(),!0}}function nI(e,t){for(const n in t){const r=t[n],s=e[n];if(typeof r=="string"){if(r!==s)return!1}else if(!dt(s)||s.length!==r.length||r.some((i,o)=>i!==s[o]))return!1}return!0}function Qc(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}const Zc=(e,t,n)=>e??t??n,rI=ht({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(e,{attrs:t,slots:n}){const r=ut(lo),s=Oe(()=>e.route||r.value),i=ut(Wc,0),o=Oe(()=>{let l=be(i);const{matched:u}=s.value;let f;for(;(f=u[l])&&!f.components;)l++;return l}),a=Oe(()=>s.value.matched[o.value]);ts(Wc,Oe(()=>o.value+1)),ts(NE,a),ts(lo,s);const c=pe();return ln(()=>[c.value,a.value,e.name],([l,u,f],[d,m,g])=>{u&&(u.instances[f]=l,m&&m!==u&&l&&l===d&&(u.leaveGuards.size||(u.leaveGuards=m.leaveGuards),u.updateGuards.size||(u.updateGuards=m.updateGuards))),l&&u&&(!m||!Qn(u,m)||!d)&&(u.enterCallbacks[f]||[]).forEach(b=>b(l))},{flush:"post"}),()=>{const l=s.value,u=e.name,f=a.value,d=f&&f.components[u];if(!d)return el(n.default,{Component:d,route:l});const m=f.props[u],g=m?m===!0?l.params:typeof m=="function"?m(l):m:null,w=fu(d,ne({},g,t,{onVnodeUnmounted:O=>{O.component.isUnmounted&&(f.instances[u]=null)},ref:c}));return el(n.default,{Component:w,route:l})||w}}});function el(e,t){if(!e)return null;const n=e(t);return n.length===1?n[0]:n}const sI=rI;function iI(e){const t=zE(e.routes,e),n=e.parseQuery||OE,r=e.stringifyQuery||jc,s=e.history,i=cr(),o=cr(),a=cr(),c=Xd(en);let l=en;Bn&&e.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const u=Pi.bind(null,T=>""+T),f=Pi.bind(null,hE),d=Pi.bind(null,Or);function m(T,U){let L,$;return cd(T)?(L=t.getRecordMatcher(T),$=U):$=T,t.addRoute($,L)}function g(T){const U=t.getRecordMatcher(T);U&&t.removeRoute(U)}function b(){return t.getRoutes().map(T=>T.record)}function w(T){return!!t.getRecordMatcher(T)}function O(T,U){if(U=ne({},U||c.value),typeof T=="string"){const _=Oi(n,T,U.path),E=t.resolve({path:_.path},U),S=s.createHref(_.fullPath);return ne(_,E,{params:d(E.params),hash:Or(_.hash),redirectedFrom:void 0,href:S})}let L;if(T.path!=null)L=ne({},T,{path:Oi(n,T.path,U.path).path});else{const _=ne({},T.params);for(const E in _)_[E]==null&&delete _[E];L=ne({},T,{params:f(_)}),U.params=f(U.params)}const $=t.resolve(L,U),Q=T.hash||"";$.params=u(d($.params));const h=gE(r,ne({},T,{hash:uE(Q),path:$.path})),p=s.createHref(h);return ne({fullPath:h,hash:Q,query:r===jc?kE(T.query):T.query||{}},$,{redirectedFrom:void 0,href:p})}function I(T){return typeof T=="string"?Oi(n,T,c.value.path):ne({},T)}function A(T,U){if(l!==T)return Zn(me.NAVIGATION_CANCELLED,{from:U,to:T})}function C(T){return D(T)}function B(T){return C(ne(I(T),{replace:!0}))}function F(T,U){const L=T.matched[T.matched.length-1];if(L&&L.redirect){const{redirect:$}=L;let Q=typeof $=="function"?$(T,U):$;return typeof Q=="string"&&(Q=Q.includes("?")||Q.includes("#")?Q=I(Q):{path:Q},Q.params={}),ne({query:T.query,hash:T.hash,params:Q.path!=null?{}:T.params},Q)}}function D(T,U){const L=l=O(T),$=c.value,Q=T.state,h=T.force,p=T.replace===!0,_=F(L,$);if(_)return D(ne(I(_),{state:typeof _=="object"?ne({},Q,_.state):Q,force:h,replace:p}),U||L);const E=L;E.redirectedFrom=U;let S;return!h&&_E(r,$,L)&&(S=Zn(me.NAVIGATION_DUPLICATED,{to:E,from:$}),Ee($,$,!0,!1)),(S?Promise.resolve(S):Ce(E,$)).catch(v=>Lt(v)?Lt(v,me.NAVIGATION_GUARD_REDIRECT)?v:gt(v):X(v,E,$)).then(v=>{if(v){if(Lt(v,me.NAVIGATION_GUARD_REDIRECT))return D(ne({replace:p},I(v.to),{state:typeof v.to=="object"?ne({},Q,v.to.state):Q,force:h}),U||E)}else v=Ye(E,$,!0,p,Q);return st(E,$,v),v})}function W(T,U){const L=A(T,U);return L?Promise.reject(L):Promise.resolve()}function ee(T){const U=it.values().next().value;return U&&typeof U.runWithContext=="function"?U.runWithContext(T):T()}function Ce(T,U){let L;const[$,Q,h]=xE(T,U);L=Ni($.reverse(),"beforeRouteLeave",T,U);for(const _ of $)_.leaveGuards.forEach(E=>{L.push(rn(E,T,U))});const p=W.bind(null,T,U);return L.push(p),Qe(L).then(()=>{L=[];for(const _ of i.list())L.push(rn(_,T,U));return L.push(p),Qe(L)}).then(()=>{L=Ni(Q,"beforeRouteUpdate",T,U);for(const _ of Q)_.updateGuards.forEach(E=>{L.push(rn(E,T,U))});return L.push(p),Qe(L)}).then(()=>{L=[];for(const _ of h)if(_.beforeEnter)if(dt(_.beforeEnter))for(const E of _.beforeEnter)L.push(rn(E,T,U));else L.push(rn(_.beforeEnter,T,U));return L.push(p),Qe(L)}).then(()=>(T.matched.forEach(_=>_.enterCallbacks={}),L=Ni(h,"beforeRouteEnter",T,U,ee),L.push(p),Qe(L))).then(()=>{L=[];for(const _ of o.list())L.push(rn(_,T,U));return L.push(p),Qe(L)}).catch(_=>Lt(_,me.NAVIGATION_CANCELLED)?_:Promise.reject(_))}function st(T,U,L){a.list().forEach($=>ee(()=>$(T,U,L)))}function Ye(T,U,L,$,Q){const h=A(T,U);if(h)return h;const p=U===en,_=Bn?history.state:{};L&&($||p?s.replace(T.fullPath,ne({scroll:p&&_&&_.scroll},Q)):s.push(T.fullPath,Q)),c.value=T,Ee(T,U,L,p),gt()}let Ae;function We(){Ae||(Ae=s.listen((T,U,L)=>{if(!yt.listening)return;const $=O(T),Q=F($,yt.currentRoute.value);if(Q){D(ne(Q,{replace:!0,force:!0}),$).catch(vr);return}l=$;const h=c.value;Bn&&CE(Vc(h.fullPath,L.delta),ni()),Ce($,h).catch(p=>Lt(p,me.NAVIGATION_ABORTED|me.NAVIGATION_CANCELLED)?p:Lt(p,me.NAVIGATION_GUARD_REDIRECT)?(D(ne(I(p.to),{force:!0}),$).then(_=>{Lt(_,me.NAVIGATION_ABORTED|me.NAVIGATION_DUPLICATED)&&!L.delta&&L.type===ao.pop&&s.go(-1,!1)}).catch(vr),Promise.reject()):(L.delta&&s.go(-L.delta,!1),X(p,$,h))).then(p=>{p=p||Ye($,h,!1),p&&(L.delta&&!Lt(p,me.NAVIGATION_CANCELLED)?s.go(-L.delta,!1):L.type===ao.pop&&Lt(p,me.NAVIGATION_ABORTED|me.NAVIGATION_DUPLICATED)&&s.go(-1,!1)),st($,h,p)}).catch(vr)}))}let xt=cr(),ie=cr(),te;function X(T,U,L){gt(T);const $=ie.list();return $.length?$.forEach(Q=>Q(T,U,L)):console.error(T),Promise.reject(T)}function Xe(){return te&&c.value!==en?Promise.resolve():new Promise((T,U)=>{xt.add([T,U])})}function gt(T){return te||(te=!T,We(),xt.list().forEach(([U,L])=>T?L(T):U()),xt.reset()),T}function Ee(T,U,L,$){const{scrollBehavior:Q}=e;if(!Bn||!Q)return Promise.resolve();const h=!L&&SE(Vc(T.fullPath,0))||($||!L)&&history.state&&history.state.scroll||null;return Dl().then(()=>Q(T,U,h)).then(p=>p&&TE(p)).catch(p=>X(p,T,U))}const ye=T=>s.go(T);let _t;const it=new Set,yt={currentRoute:c,listening:!0,addRoute:m,removeRoute:g,clearRoutes:t.clearRoutes,hasRoute:w,getRoutes:b,resolve:O,options:e,push:C,replace:B,go:ye,back:()=>ye(-1),forward:()=>ye(1),beforeEach:i.add,beforeResolve:o.add,afterEach:a.add,onError:ie.add,isReady:Xe,install(T){T.component("RouterLink",eI),T.component("RouterView",sI),T.config.globalProperties.$router=yt,Object.defineProperty(T.config.globalProperties,"$route",{enumerable:!0,get:()=>be(c)}),Bn&&!_t&&c.value===en&&(_t=!0,C(s.location).catch($=>{}));const U={};for(const $ in en)Object.defineProperty(U,$,{get:()=>c.value[$],enumerable:!0});T.provide(ri,yt),T.provide(Zo,Pl(U)),T.provide(lo,c);const L=T.unmount;it.add(T),T.unmount=function(){it.delete(T),it.size<1&&(l=en,Ae&&Ae(),Ae=null,c.value=en,_t=!1,te=!1),L()}}};function Qe(T){return T.reduce((U,L)=>U.then(()=>ee(L)),Promise.resolve())}return yt}function jr(){return ut(ri)}function hd(e){return ut(Zo)}function uo(e){const t=document.body;e?t.classList.add("dark-theme"):t.classList.remove("dark-theme")}function pd(){return localStorage.getItem("theme")==="dark"}function oI(e){localStorage.setItem("theme",e?"dark":"light")}const aI={class:"content"},cI={class:"card"},lI={class:"form-group"},uI={class:"form-group"},fI={key:0,class:"error"},dI={key:1,class:"success"},hI=ht({__name:"Login",setup(e){const t=pe(""),n=pe(""),r=pe(""),s=pe(""),i=jr();async function o(){try{const d=await(await rb(at,t.value,n.value)).user.getIdToken(),m=await Ai(new wn(t.value,n.value,d));m?(ge.setUser(m.email,n.value,"",m.profilePictureUrl,m.favouriteChords,m.learnedChords),console.log(m.email,n.value,"",m.favouriteChords,m.learnedChords),await i.push("/home")):r.value="Token verification failed."}catch(f){console.error("Login error:",f),r.value="Invalid email or password."}}async function a(){try{const d=await(await nb(at,t.value,n.value)).user.getIdToken(),m=await Ri(new wn(t.value,n.value,d));m?(ge.setUser(m.email,n.value,"",m.profilePictureUrl,m.favouriteChords,m.learnedChords),await i.push("/home")):r.value="Registration succeeded but verification failed."}catch(f){switch(console.error("Registration error:",f),f.code){case"auth/email-already-in-use":r.value="Email already registered.";break;case"auth/weak-password":r.value="Password must be at least 6 characters.";break;case"auth/invalid-email":r.value="Invalid email format.";break;default:r.value=f.message||"Registration failed."}}}async function c(){if(!t.value){r.value="Please enter your email address.";return}try{await tb(at,t.value),s.value="Password reset email sent! Check your inbox.",r.value="",setTimeout(()=>{s.value=""},3e3)}catch(f){switch(console.error("Password reset error:",f),f.code){case"auth/user-not-found":r.value="No account found with this email.";break;case"auth/invalid-email":r.value="Invalid email format.";break;case"auth/too-many-requests":r.value="Too many requests. Please try again later.";break;default:r.value=f.message||"Failed to send reset email."}}}async function l(){try{const f=new $t;f.addScope("user:email");const d=await pc(at,f),m=await d.user.getIdToken(),g=d.user.email||"",b=await Ai(new wn(g,"",m));if(b)ge.setUser(b.email,"",m,b.profilePictureUrl,b.favouriteChords,b.learnedChords),await i.push("/home");else{const w=await Ri(new wn(g||"","",m));w?(ge.setUser(w.email,"",m,w.profilePictureUrl,w.favouriteChords,w.learnedChords),await i.push("/home")):r.value="GitHub authentication failed."}}catch(f){console.error("GitHub sign-in error:",f),f.code==="auth/popup-closed-by-user"?r.value="Sign-in cancelled.":f.code==="auth/account-exists-with-different-credential"?r.value="Account exists with different sign-in method.":r.value=f.message||"GitHub sign-in failed."}}async function u(){try{const f=new Bt;f.addScope("email"),f.addScope("profile");const d=await pc(at,f),m=await d.user.getIdToken(),g=d.user.email||"",b=await Ai(new wn(g,"",m));if(b)ge.setUser(b.email,"",m,b.profilePictureUrl,b.favouriteChords,b.learnedChords),await i.push("/home");else{const w=await Ri(new wn(g||"","",m));w?(ge.setUser(w.email,"",m,w.profilePictureUrl,w.favouriteChords,w.learnedChords),await i.push("/home")):r.value="Google authentication failed."}}catch(f){console.error("Google sign-in error:",f),f.code==="auth/popup-closed-by-user"?r.value="Sign-in cancelled.":f.code==="auth/account-exists-with-different-credential"?r.value="Account exists with different sign-in method.":r.value=f.message||"Google sign-in failed."}}return Dn(()=>{const f=pd();uo(f)}),(f,d)=>(K(),Y("div",aI,[R("div",cI,[d[7]||(d[7]=R("div",{class:"header"},[R("h1",null,"Login")],-1)),R("form",{onSubmit:$p(o,["prevent"])},[R("div",lI,[d[2]||(d[2]=R("label",null,"Email",-1)),gs(R("input",{type:"email","onUpdate:modelValue":d[0]||(d[0]=m=>t.value=m),required:""},null,512),[[Es,t.value]])]),R("div",uI,[d[3]||(d[3]=R("label",null,"Password",-1)),gs(R("input",{type:"password","onUpdate:modelValue":d[1]||(d[1]=m=>n.value=m),required:""},null,512),[[Es,n.value]]),R("span",{class:"link reset-password",onClick:c},"Reset password")]),r.value?(K(),Y("p",fI,Te(r.value),1)):Yn("",!0),s.value?(K(),Y("p",dI,Te(s.value),1)):Yn("",!0),d[4]||(d[4]=R("button",{type:"submit",class:"txt-btn submit"},"Login",-1))],32),R("button",{type:"button",class:"txt-btn register",onClick:a}," Register "),R("button",{type:"button",class:"txt-btn github",onClick:l},[...d[5]||(d[5]=[R("svg",{class:"github-icon",viewBox:"0 0 24 24",fill:"currentColor"},[R("path",{d:"M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"})],-1),cu(" Continue with GitHub ",-1)])]),R("button",{type:"button",class:"txt-btn google",onClick:u},[...d[6]||(d[6]=[ip('<svg class="google-icon" viewBox="0 0 24 24" data-v-8e3ef287><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" data-v-8e3ef287></path><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" data-v-8e3ef287></path><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" data-v-8e3ef287></path><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" data-v-8e3ef287></path></svg> Continue with Google ',2)])])])]))}}),pI=mt(hI,[["__scopeId","data-v-8e3ef287"]]);async function md(){try{return(await _e.get("https://cataas.com/cat?position=center")).data}catch{return null}}const mI={class:"navbar"},gI=["onClick"],_I={class:"profile"},yI={key:0,class:"light-icon"},bI={key:1,class:"dark-icon"},wI={class:"profile-container"},vI=["src","title"],EI={key:0,class:"profile-menu"},II=ht({__name:"Menu",setup(e){const t=jr(),n=hd(),r=[{name:"Home",to:"/home"},{name:"Chords",to:"/chords"},{name:"Favourite",to:"/favourite"},{name:"Learning",to:"/learning"}],s=pe(pd()),i=pe(!1),o=pe(!1),a=Oe(()=>ge?.profilePictureUrl||"/img/placeholder_profile_picture.jpg");function c(g){n.path!==g&&t.push(g)}ln(s,g=>{uo(g),oI(g)},{immediate:!0}),Dn(()=>{uo(s.value)});function l(){s.value=!s.value}function u(){i.value=!i.value}function f(){o.value=!o.value}async function d(){const g=await md();g&&(await Yv(g.url),ge.profilePictureUrl=g.url)}async function m(){try{await Jv()||console.log("LOGOUT ERROR"),await ob(at),t.push("/")}catch(g){console.error("Logout error:",g)}}return(g,b)=>(K(),Y("header",null,[R("nav",mI,[R("div",{class:"hamburger",onClick:f},[...b[0]||(b[0]=[R("span",null,null,-1),R("span",null,null,-1),R("span",null,null,-1)])]),R("div",{class:St(["tabs",{"mobile-open":o.value}])},[(K(),Y(de,null,ot(r,w=>R("div",{key:w.to,class:St(["tab",{active:be(n).path===w.to}]),onClick:O=>c(w.to)},Te(w.name),11,gI)),64))],2),R("div",_I,[R("label",{for:"theme-toggle",class:"theme-toggle",onClick:l},[s.value?(K(),Y("span",bI,"☀️")):(K(),Y("span",yI,"🌙"))]),R("div",wI,[R("img",{src:a.value,alt:"Profile",class:"profile-img",title:be(ge).email,onClick:u},null,8,vI),i.value?(K(),Y("div",EI,[R("button",{class:"dropdown-btn",onClick:d},"Change profile picture "),R("button",{class:"dropdown-btn",onClick:m},"Logout")])):Yn("",!0)])])])]))}}),Wr=mt(II,[["__scopeId","data-v-111da6b0"]]),TI={},CI={class:"solid"};function SI(e,t){return K(),Y("hr",CI)}const ea=mt(TI,[["render",SI],["__scopeId","data-v-dd785ece"]]);async function AI(e){try{return(await we.post("/favChord",{chord:e})).data}catch{return null}}async function RI(e){try{return(await we.post("/learnedChord",{chord:e})).data}catch{return null}}async function PI(e){try{return(await we.delete("/favChord",{data:{chord:e}})).data}catch{return null}}async function OI(e){try{return(await we.delete("/learnedChord",{data:{chord:e}})).data}catch{return null}}async function kI(e){try{const t=await at.currentUser?.getIdToken(!1);return(await we.get(`/chord?chord=${e}`,{headers:{Authorization:`Bearer ${t}`}})).data}catch{return null}}async function gd(e,t){await PI(t).then(()=>e.delete(t))}async function NI(e,t){await AI(t).then(()=>e.add(t))}async function xI(e,t){await OI(t).then(()=>e.delete(t))}async function DI(e,t){await RI(t).then(()=>e.add(t))}function _d(e,t){e.push({path:"/chords",query:{chord:t}})}const LI={class:"stats-card"},MI={class:"title"},UI={class:"value"},FI=ht({__name:"StatsCard",props:{title:{},value:{}},setup(e){const t=e;return(n,r)=>(K(),Y("div",LI,[R("p",MI,Te(t.title),1),R("p",UI,Te(t.value),1)]))}}),fo=mt(FI,[["__scopeId","data-v-71187f74"]]),BI={class:"content"},$I={class:"stats"},HI={class:"progress"},VI={class:"latest-learned"},jI=["onClick"],WI=ht({__name:"Home",setup(e){const t=jr(),n=Oe(()=>new Set([...ge.learnedChords.values()].slice(-5).reverse()));return(r,s)=>(K(),Y(de,null,[ae(Wr),R("div",BI,[s[1]||(s[1]=R("h1",null,"Statistics",-1)),R("div",$I,[ae(fo,{title:"Chords learned",value:be(ge).learnedChords.size},null,8,["value"]),ae(fo,{title:"Favourite chords",value:be(ge).favouriteChords.size},null,8,["value"])]),ae(ea),R("div",HI,[s[0]||(s[0]=R("h1",null,"Latest learned chords",-1)),R("div",VI,[(K(!0),Y(de,null,ot(n.value,i=>(K(),Y("button",{class:"card-btn chord-card",onClick:o=>be(_d)(be(t),i)},Te(i.replace("_","#").replace("-","/")),9,jI))),256))])])])],64))}}),qI=mt(WI,[["__scopeId","data-v-6933742c"]]);let yd=[{label:"C",value:"C",maxAmount:1512,color:"#28ff01"},{label:"C#",value:"C_",maxAmount:0,color:"#00ffe9"},{label:"D",value:"D",maxAmount:2268,color:"#007dfe"},{label:"D#",value:"D_",maxAmount:0,color:"#0600fe"},{label:"E",value:"E",maxAmount:1512,color:"#4400e9"},{label:"F",value:"F",maxAmount:1512,color:"#57009d"},{label:"F#",value:"F_",maxAmount:0,color:"#740000"},{label:"G",value:"G",maxAmount:2268,color:"#b30101"},{label:"G#",value:"G_",maxAmount:0,color:"#ee0000"},{label:"A",value:"A",maxAmount:2268,color:"#ff6300"},{label:"A#",value:"A_",maxAmount:0,color:"#ffed02"},{label:"B",value:"B",maxAmount:1512,color:"#99fe00"}];const tl=[{label:"Major",value:""},{label:"Minor",value:"m"},{label:"7",value:"7"},{label:"5",value:"5"},{label:"dim",value:"dim"},{label:"dim7",value:"dim7"},{label:"aug",value:"aug"},{label:"sus2",value:"sus2"},{label:"sus4",value:"sus4"},{label:"maj7",value:"maj7"},{label:"m7",value:"m7"},{label:"7sus4",value:"7sus4"}],nl=[{label:"",value:""},{label:"C",value:"-C"},{label:"C#",value:"-C_"},{label:"D",value:"-D"},{label:"D#",value:"-D_"},{label:"E",value:"-E"},{label:"F",value:"-F"},{label:"F#",value:"-F_"},{label:"G",value:"-G"},{label:"G#",value:"-G_"},{label:"A",value:"-A"},{label:"A#",value:"-A_"},{label:"B",value:"-B"}];class Qr{get fingerings(){return this._fingerings}set fingerings(t){this._fingerings=t}get positions(){return this._positions}set positions(t){this._positions=t}get chordName(){return this._chordName}set chordName(t){this._chordName=t}_chordName;_positions;_fingerings;constructor(t="C",n=new Array("x","3","2","0","1","0"),r=new Array("0","3","2","0","1","0")){this._chordName=t,this._positions=n,this._fingerings=r}}const GI={class:"content"},zI={key:0,class:"dot"},KI={class:"chord-selector"},JI={class:"note-selector"},YI=["onClick"],XI={class:"alteration-selector"},QI=["onClick"],ZI={class:"compound-selector"},eT=["onClick"],tT={class:"chord-management"},Zr=18,rl=6,nT=.5,sl=1,rT=ht({__name:"Chords",setup(e){const t=hd(),n=new Set([3,5,7,9,12,15,17]),r=pe("C"),s=pe(""),i=pe(""),o=pe(new Qr),a=pe(!1),c=pe(!1);function l(){const I=[];for(let A=0;A<Zr;A++){const C=A/(Zr-1),B=sl-C*(sl-nT);I.push(`${B}fr`)}return I.join(" ")}function u(I,A){const C=I,B=A-1;return!o.value.positions||o.value.positions.length===0?null:Number(o.value.positions[B])===C?Number(o.value.fingerings?.[B])??null:null}async function f(){const I=o.value.chordName,A=ge.favouriteChords;A&&(A.has(I)?(await gd(A,I),a.value=!1):(await NI(A,I),a.value=!0))}async function d(){const I=o.value.chordName,A=ge.learnedChords;A&&(A.has(I)?(await xI(A,I),c.value=!1):(await DI(A,I),c.value=!0))}async function m(){const I=ge?.favouriteChords??new Set,A=ge?.learnedChords??new Set;a.value=I.has(o.value.chordName),c.value=A.has(o.value.chordName);const C=await kI(o.value.chordName);C&&(o.value=new Qr(C.chord,C.positions,C.fingerings))}Dn(()=>{const I=t.query.chord;if(I){o.value=new Qr(I,[],[]);const A=I.match(/^([A-G](?:_|b)?)([a-z0-9+]*)(?:-([A-G](?:_|b)?))?$/i);if(A){const[C,B,F,D]=A;g(B||"C");const W=tl.find(Ce=>Ce.value===(F||""));b(W?.value||"");const ee=nl.find(Ce=>Ce.value===(D?`-${D}`:""));w(ee?.value||""),m()}}setTimeout(async()=>{await m()},100)}),ln(()=>[ge.favouriteChords,ge.learnedChords],async()=>{await m()},{deep:!0}),ln(()=>[r.value,s.value,i.value],async()=>{const I=r.value+s.value+i.value;o.value=new Qr(I,[],[]),await m()},{immediate:!0});async function g(I){r.value=I}async function b(I){s.value=I}async function w(I){i.value=I}const O=Oe(()=>nl.filter(I=>I.value.slice(1)!==r.value));return(I,A)=>(K(),Y(de,null,[ae(Wr),R("div",GI,[R("div",{class:"fret-numeration",style:an({gridTemplateColumns:l()})},[(K(),Y(de,null,ot(Zr,C=>R("label",{key:"num-"+C,class:"cell num"},Te(C),1)),64))],4),R("div",{class:"fret",style:an({gridTemplateColumns:l()})},[(K(),Y(de,null,ot(Zr,C=>R("div",{class:"fret-column",key:C},[(K(),Y(de,null,ot(rl,B=>R("div",{class:"cell",key:B},[R("div",{class:"string",style:an({height:rl-B+1+"px"})},null,4),u(C,B)!==null?(K(),Y("div",{key:0,class:"finger-marker",style:an({backgroundColor:"var(--fingering-"+u(C,B)+")"})},Te(u(C,B)),5)):Yn("",!0)])),64)),be(n).has(C)?(K(),Y("div",zI)):Yn("",!0)])),64))],4),R("div",KI,[R("div",JI,[(K(!0),Y(de,null,ot(be(yd),C=>(K(),Y("div",{class:St(["note",{active:r.value===C.value}]),key:C.value,onClick:B=>g(C.value)},Te(C.label),11,YI))),128))]),R("div",XI,[(K(!0),Y(de,null,ot(be(tl),C=>(K(),Y("div",{class:St(["alteration",{active:s.value===C.value}]),key:C.value,onClick:B=>b(C.value)},Te(C.label),11,QI))),128))]),R("div",ZI,[(K(!0),Y(de,null,ot(O.value,C=>(K(),Y("div",{class:St(["compound",{active:i.value===C.value}]),key:C.value,onClick:B=>w(C.value)},Te(C.label),11,eT))),128))])]),R("div",tT,[R("button",{type:"button",class:St(["txt-btn learn",{active:c.value}]),onClick:d},Te(c.value?"Learned":"Learn"),3),R("button",{type:"button",class:"empty-btn fav",onClick:f},[(K(),Y("svg",{class:St(["star",{active:a.value}]),viewBox:"0 0 24 24",width:"24",height:"24"},[...A[0]||(A[0]=[R("path",{d:"M12 .587l3.668 7.431L23.5 9.75l-5.75 5.603L19.335 24 12 19.897 4.665 24l1.585-8.647L.5 9.75l7.832-1.732z"},null,-1)])],2))])])])],64))}}),sT=mt(rT,[["__scopeId","data-v-6714a944"]]),iT={},oT={class:"trash-btn",title:"Remove"};function aT(e,t){return K(),Y("button",oT,[...t[0]||(t[0]=[R("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 640 640"},[R("path",{d:"M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z"})],-1)])])}const bd=mt(iT,[["render",aT],["__scopeId","data-v-0cffb4c5"]]),cT={class:"content"},lT={class:"chords"},uT=["onClick"],fT=ht({__name:"Favourite",setup(e){const t=jr(),n=ge.favouriteChords;return(r,s)=>(K(),Y(de,null,[ae(Wr),R("div",cT,[s[0]||(s[0]=R("h1",{class:"page-label"},"My Favourite Tabs",-1)),ae(ea),R("div",lT,[(K(!0),Y(de,null,ot(be(n),i=>(K(),Y("div",{key:i,class:"chord-card"},[R("div",{class:"chord-name",onClick:o=>be(_d)(be(t),i)},Te(i.replace("-","/").replace("_","#")),9,uT),ae(bd,{class:"trash-btn",onClick:o=>be(gd)(be(n),i)},null,8,["onClick"])]))),128))])])],64))}}),dT=mt(fT,[["__scopeId","data-v-4a85feb8"]]),hT={class:"content"},pT={class:"progress-info"},mT={class:"note-label"},gT={class:"progress-values"},_T={class:"progress-bar-bg"},yT=ht({__name:"Learning",setup(e){const t=Oe(()=>be(yd).filter(s=>s.maxAmount>0)),n=dn({C:423,D:0,E:0,F:0,G:0,A:0,B:0});function r(){Object.keys(n).forEach(i=>{n[i]=0}),ge.learnedChords.forEach(i=>{const o=i[0];o&&Object.prototype.hasOwnProperty.call(n,o)&&(n[o]=(n[o]??0)+1)})}return Dn(()=>{setTimeout(()=>{r()},100)}),ln(()=>ge.learnedChords,()=>{r()},{deep:!0}),(s,i)=>(K(),Y(de,null,[ae(Wr),R("div",hT,[(K(!0),Y(de,null,ot(t.value,o=>(K(),Y("div",{class:"progress-panel",key:o.label},[R("div",pT,[R("label",mT,Te(o.label),1),R("label",gT,Te(`${n[o.label]}/${o.maxAmount}`),1)]),R("div",_T,[R("span",{class:"progress-bar",style:an({backgroundColor:o.color,width:(n[o.label]??0)/o.maxAmount*100+"%"})},null,4)])]))),128))])],64))}}),bT=mt(yT,[["__scopeId","data-v-545f0029"]]);async function wT(){try{return(await we.get("/admin/users/count")).data}catch{return 0}}async function vT(e){try{return(await we.get(`/admin/users?page=${e}`)).data}catch{return null}}async function ET(e,t){try{return(await we.put("/admin/users/email",{prevEmail:e,newEmail:t})).data}catch{return null}}async function IT(e,t){try{return(await we.put("/admin/users/picture",{email:e,profilePictureUrl:t})).data}catch{return null}}async function TT(e){try{return(await we.put("/admin/users/promote",{email:e})).data}catch{return null}}async function CT(e){try{return(await we.delete(`/admin/users?email=${e}`)).data}catch{return null}}async function ST(){try{return(await we.get("/admin/access")).data}catch{return null}}const AT={class:"content"},RT={class:"user-list"},PT=["src"],OT={key:0,class:"email-edit"},kT=["onKeyup"],NT=["onClick"],xT={key:1,class:"picture-edit"},DT=["onKeyup"],LT=["onClick"],MT={key:2},UT={class:"management-buttons"},FT={class:"edit-btn-container"},BT=["onClick"],$T={key:0,class:"edit-menu"},HT=["onClick"],VT=["onClick"],jT=["onClick"],WT={class:"page-scroller"},qT=ht({__name:"Admin",setup(e){jr();const t=pe(0),n=pe(1),r=Oe(()=>Math.max(1,Math.ceil(t.value/5))),s=pe([]),i=pe(null),o=pe(null),a=pe(""),c=pe(null),l=pe("");async function u(){const F=await wT();F&&(t.value=F.count)}async function f(F){F=Math.min(r.value,Math.max(1,F));const D=await vT(F);D&&(s.value=D.users||[],n.value=D.page)}function d(F){i.value===F?i.value=null:i.value=F}function m(F){c.value!=F&&(o.value=F,a.value=F,i.value=null)}async function g(F){if(a.value&&a.value!==F&&await ET(F,a.value)){const W=s.value.find(ee=>ee.email===F);W&&(W.email=a.value)}o.value=null,a.value=""}function b(){o.value=null,a.value=""}function w(F,D){o.value!=F&&(c.value=F,l.value=D||"",i.value=null)}async function O(){const F=await md();F&&F.url&&(l.value=F.url)}async function I(F){if(l.value&&await IT(F,l.value)){const W=s.value.find(ee=>ee.email===F);W&&(W.profilePictureUrl=l.value)}c.value=null,l.value=""}function A(){c.value=null,l.value=""}async function C(F){i.value=null,await TT(F)}async function B(F){console.log("deleting email: "+F),await CT(F)&&(console.log("email deleted"),t.value--,s.value=s.value.filter(W=>W.email!==F),await f(n.value),s.value.length===0&&n.value>1&&await f(n.value-1))}return Dn(async()=>{setTimeout(async()=>{await u(),await f(1)},100)}),(F,D)=>(K(),Y(de,null,[ae(Wr),R("div",AT,[ae(fo,{title:"Amount of users registered",value:t.value||0},null,8,["value"]),ae(ea),D[10]||(D[10]=R("h1",null,"Users",-1)),R("div",RT,[(K(!0),Y(de,null,ot(s.value,W=>(K(),Y("div",{class:"user-card",key:W.email},[R("img",{src:W.profilePictureUrl||"/img/placeholder_profile_picture.jpg",alt:"Profile"},null,8,PT),o.value===W.email?(K(),Y("div",OT,[gs(R("input",{"onUpdate:modelValue":D[0]||(D[0]=ee=>a.value=ee),type:"email",class:"email-input",onKeyup:[Kr(ee=>g(W.email),["enter"]),Kr(b,["esc"])]},null,40,kT),[[Es,a.value]]),R("button",{class:"save-btn",onClick:ee=>g(W.email)},"✓",8,NT),R("button",{class:"cancel-btn",onClick:b},"✕")])):c.value===W.email?(K(),Y("div",xT,[gs(R("input",{"onUpdate:modelValue":D[1]||(D[1]=ee=>l.value=ee),type:"text",class:"picture-input",placeholder:"Enter image URL",onKeyup:[Kr(ee=>I(W.email),["enter"]),Kr(A,["esc"])]},null,40,DT),[[Es,l.value]]),R("button",{class:"random-btn",onClick:O},"🎲"),R("button",{class:"save-btn",onClick:ee=>I(W.email)},"✓",8,LT),R("button",{class:"cancel-btn",onClick:A},"✕")])):(K(),Y("p",MT,Te(W.email),1)),R("div",UT,[R("div",FT,[R("button",{class:"edit-btn",onClick:ee=>d(W.email)},[...D[6]||(D[6]=[R("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor"},[R("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"})],-1)])],8,BT),i.value===W.email?(K(),Y("div",$T,[R("button",{class:"edit-menu-btn",onClick:ee=>m(W.email)}," Update email ",8,HT),R("button",{class:"edit-menu-btn",onClick:ee=>w(W.email,W.profilePictureUrl||"")}," Change profile picture ",8,VT),R("button",{class:"edit-menu-btn",onClick:ee=>C(W.email)},"Promote user",8,jT)])):Yn("",!0)]),ae(bd,{class:"trash-btn",onClick:ee=>B(W.email)},null,8,["onClick"])])]))),128))]),R("div",WT,[R("button",{class:"txt-btn arrow",onClick:D[2]||(D[2]=W=>f(Math.max(1,n.value-1)))},[...D[7]||(D[7]=[R("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor"},[R("path",{d:"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"})],-1)])]),R("button",{class:"txt-btn",onClick:D[3]||(D[3]=W=>f(n.value))},Te(n.value),1),D[9]||(D[9]=R("span",{class:"ellipsis"},"...",-1)),R("button",{class:"txt-btn",onClick:D[4]||(D[4]=W=>f(r.value))},Te(r.value),1),R("button",{class:"txt-btn arrow",onClick:D[5]||(D[5]=W=>f(Math.min(r.value,n.value+1)))},[...D[8]||(D[8]=[R("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor"},[R("path",{d:"M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"})],-1)])])])])],64))}}),GT=mt(qT,[["__scopeId","data-v-8ca127f1"]]),wd=iI({history:UE("/chord_viewer/"),routes:[{path:"/",component:pI,meta:{requiresAuth:!1}},{path:"/home",component:qI,meta:{requiresAuth:!0}},{path:"/chords",component:sT,meta:{requiresAuth:!0}},{path:"/favourite",component:dT,meta:{requiresAuth:!0}},{path:"/learning",component:bT,meta:{requiresAuth:!0}},{path:"/admin",component:GT,meta:{requiresAuth:!0,requiresAdmin:!0}}]});wd.beforeEach((e,t,n)=>{const r=e.meta.requiresAuth,s=e.meta.requiresAdmin;if(r){const i=Zi(at,async o=>{if(i(),o){if(s){const a=await ST();a&&a.admin?n():n("/home")}n()}else n("/")})}else{const i=Zi(at,o=>{i(),o&&e.path==="/"||n()})}});const ta=Wp(Zv);ta.use(Kp());ta.use(wd);ta.mount("#app");
