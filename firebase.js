(()=>{var ad=function(r){let e=[],t=0;for(let n=0;n<r.length;n++){let i=r.charCodeAt(n);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&n+1<r.length&&(r.charCodeAt(n+1)&64512)===56320?(i=65536+((i&1023)<<10)+(r.charCodeAt(++n)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},Kg=function(r){let e=[],t=0,n=0;for(;t<r.length;){let i=r[t++];if(i<128)e[n++]=String.fromCharCode(i);else if(i>191&&i<224){let s=r[t++];e[n++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){let s=r[t++],o=r[t++],c=r[t++],u=((i&7)<<18|(s&63)<<12|(o&63)<<6|c&63)-65536;e[n++]=String.fromCharCode(55296+(u>>10)),e[n++]=String.fromCharCode(56320+(u&1023))}else{let s=r[t++],o=r[t++];e[n++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},cd={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(r,e){if(!Array.isArray(r))throw Error("encodeByteArray takes an array as a parameter");this.init_();let t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let i=0;i<r.length;i+=3){let s=r[i],o=i+1<r.length,c=o?r[i+1]:0,u=i+2<r.length,h=u?r[i+2]:0,f=s>>2,m=(s&3)<<4|c>>4,v=(c&15)<<2|h>>6,S=h&63;u||(S=64,o||(v=64)),n.push(t[f],t[m],t[v],t[S])}return n.join("")},encodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(r):this.encodeByteArray(ad(r),e)},decodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(r):Kg(this.decodeStringToByteArray(r,e))},decodeStringToByteArray(r,e){this.init_();let t=e?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let i=0;i<r.length;){let s=t[r.charAt(i++)],c=i<r.length?t[r.charAt(i)]:0;++i;let h=i<r.length?t[r.charAt(i)]:64;++i;let m=i<r.length?t[r.charAt(i)]:64;if(++i,s==null||c==null||h==null||m==null)throw new ba;let v=s<<2|c>>4;if(n.push(v),h!==64){let S=c<<4&240|h>>2;if(n.push(S),m!==64){let D=h<<6&192|m;n.push(D)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let r=0;r<this.ENCODED_VALS.length;r++)this.byteToCharMap_[r]=this.ENCODED_VALS.charAt(r),this.charToByteMap_[this.byteToCharMap_[r]]=r,this.byteToCharMapWebSafe_[r]=this.ENCODED_VALS_WEBSAFE.charAt(r),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[r]]=r,r>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(r)]=r,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(r)]=r)}}},ba=class extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}},Wg=function(r){let e=ad(r);return cd.encodeByteArray(e,!0)},Ra=function(r){return Wg(r).replace(/\./g,"")},Pa=function(r){try{return cd.decodeString(r,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};function Hg(){if(typeof self!="undefined")return self;if(typeof window!="undefined")return window;if(typeof global!="undefined")return global;throw new Error("Unable to locate global object.")}var Qg=()=>Hg().__FIREBASE_DEFAULTS__,Jg=()=>{if(typeof process=="undefined"||typeof process.env=="undefined")return;let r=process.env.__FIREBASE_DEFAULTS__;if(r)return JSON.parse(r)},Yg=()=>{if(typeof document=="undefined")return;let r;try{r=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}let e=r&&Pa(r[1]);return e&&JSON.parse(e)},Ca=()=>{try{return Qg()||Jg()||Yg()}catch(r){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${r}`);return}};var ud=()=>{var r;return(r=Ca())===null||r===void 0?void 0:r.config},ld=r=>{var e;return(e=Ca())===null||e===void 0?void 0:e[`_${r}`]};var Xi=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,n))}}};function pe(){return typeof navigator!="undefined"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function hd(){return typeof window!="undefined"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(pe())}function Xg(){var r;let e=(r=Ca())===null||r===void 0?void 0:r.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function dd(){return typeof navigator!="undefined"&&navigator.userAgent==="Cloudflare-Workers"}function fd(){let r=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof r=="object"&&r.id!==void 0}function pd(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function md(){let r=pe();return r.indexOf("MSIE ")>=0||r.indexOf("Trident/")>=0}function Da(){return!Xg()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Zi(){try{return typeof indexedDB=="object"}catch{return!1}}function gd(){return new Promise((r,e)=>{try{let t=!0,n="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(n);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(n),r(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(t){e(t)}})}var Zg="FirebaseError",Le=class r extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name=Zg,Object.setPrototypeOf(this,r.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,rt.prototype.create)}},rt=class{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){let n=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?e_(s,n):"Error",c=`${this.serviceName}: ${o} (${i}).`;return new Le(i,c,n)}};function e_(r,e){return r.replace(t_,(t,n)=>{let i=e[n];return i!=null?String(i):`<${n}?>`})}var t_=/\{\$([^}]+)}/g;function pt(r,e){if(r===e)return!0;let t=Object.keys(r),n=Object.keys(e);for(let i of t){if(!n.includes(i))return!1;let s=r[i],o=e[i];if(od(s)&&od(o)){if(!pt(s,o))return!1}else if(s!==o)return!1}for(let i of n)if(!t.includes(i))return!1;return!0}function od(r){return r!==null&&typeof r=="object"}function es(r){let e=[];for(let[t,n]of Object.entries(r))Array.isArray(n)?n.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(n));return e.length?"&"+e.join("&"):""}function Sn(r){let e={};return r.replace(/^\?/,"").split("&").forEach(n=>{if(n){let[i,s]=n.split("=");e[decodeURIComponent(i)]=decodeURIComponent(s)}}),e}function Rn(r){let e=r.indexOf("?");if(!e)return"";let t=r.indexOf("#",e);return r.substring(e,t>0?t:void 0)}function _d(r,e){let t=new Sa(r,e);return t.subscribe.bind(t)}var Sa=class{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(n=>{this.error(n)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,n){let i;if(e===void 0&&t===void 0&&n===void 0)throw new Error("Missing Observer.");n_(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:n},i.next===void 0&&(i.next=Aa),i.error===void 0&&(i.error=Aa),i.complete===void 0&&(i.complete=Aa);let s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(n){typeof console!="undefined"&&console.error&&console.error(n)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}};function n_(r,e){if(typeof r!="object"||r===null)return!1;for(let t of e)if(t in r&&typeof r[t]=="function")return!0;return!1}function Aa(){}var vw=4*60*60*1e3;function se(r){return r&&r._delegate?r._delegate:r}var Be=class{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}};var $t="[DEFAULT]";var ka=class{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){let n=new Xi;if(this.instancesDeferred.set(t,n),this.isInitialized(t)||this.shouldAutoInitialize())try{let i=this.getOrInitializeService({instanceIdentifier:t});i&&n.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;let n=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(i_(e))try{this.getOrInitializeService({instanceIdentifier:$t})}catch{}for(let[t,n]of this.instancesDeferred.entries()){let i=this.normalizeInstanceIdentifier(t);try{let s=this.getOrInitializeService({instanceIdentifier:i});n.resolve(s)}catch{}}}}clearInstance(e=$t){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){let e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=$t){return this.instances.has(e)}getOptions(e=$t){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let i=this.getOrInitializeService({instanceIdentifier:n,options:t});for(let[s,o]of this.instancesDeferred.entries()){let c=this.normalizeInstanceIdentifier(s);n===c&&o.resolve(i)}return i}onInit(e,t){var n;let i=this.normalizeInstanceIdentifier(t),s=(n=this.onInitCallbacks.get(i))!==null&&n!==void 0?n:new Set;s.add(e),this.onInitCallbacks.set(i,s);let o=this.instances.get(i);return o&&e(o,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){let n=this.onInitCallbacks.get(t);if(n)for(let i of n)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:r_(e),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch{}return n||null}normalizeInstanceIdentifier(e=$t){return this.component?this.component.multipleInstances?e:$t:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}};function r_(r){return r===$t?void 0:r}function i_(r){return r.instantiationMode==="EAGER"}var ts=class{constructor(e){this.name=e,this.providers=new Map}addComponent(e){let t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let t=new ka(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}};var s_=[],H;(function(r){r[r.DEBUG=0]="DEBUG",r[r.VERBOSE=1]="VERBOSE",r[r.INFO=2]="INFO",r[r.WARN=3]="WARN",r[r.ERROR=4]="ERROR",r[r.SILENT=5]="SILENT"})(H||(H={}));var o_={debug:H.DEBUG,verbose:H.VERBOSE,info:H.INFO,warn:H.WARN,error:H.ERROR,silent:H.SILENT},a_=H.INFO,c_={[H.DEBUG]:"log",[H.VERBOSE]:"log",[H.INFO]:"info",[H.WARN]:"warn",[H.ERROR]:"error"},u_=(r,e,...t)=>{if(e<r.logLevel)return;let n=new Date().toISOString(),i=c_[e];if(i)console[i](`[${n}]  ${r.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)},mt=class{constructor(e){this.name=e,this._logLevel=a_,this._logHandler=u_,this._userLogHandler=null,s_.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in H))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?o_[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,H.DEBUG,...e),this._logHandler(this,H.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,H.VERBOSE,...e),this._logHandler(this,H.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,H.INFO,...e),this._logHandler(this,H.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,H.WARN,...e),this._logHandler(this,H.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,H.ERROR,...e),this._logHandler(this,H.ERROR,...e)}};var l_=(r,e)=>e.some(t=>r instanceof t),yd,vd;function h_(){return yd||(yd=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function d_(){return vd||(vd=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}var Id=new WeakMap,Oa=new WeakMap,wd=new WeakMap,Na=new WeakMap,Va=new WeakMap;function f_(r){let e=new Promise((t,n)=>{let i=()=>{r.removeEventListener("success",s),r.removeEventListener("error",o)},s=()=>{t(Ke(r.result)),i()},o=()=>{n(r.error),i()};r.addEventListener("success",s),r.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&Id.set(t,r)}).catch(()=>{}),Va.set(e,r),e}function p_(r){if(Oa.has(r))return;let e=new Promise((t,n)=>{let i=()=>{r.removeEventListener("complete",s),r.removeEventListener("error",o),r.removeEventListener("abort",o)},s=()=>{t(),i()},o=()=>{n(r.error||new DOMException("AbortError","AbortError")),i()};r.addEventListener("complete",s),r.addEventListener("error",o),r.addEventListener("abort",o)});Oa.set(r,e)}var xa={get(r,e,t){if(r instanceof IDBTransaction){if(e==="done")return Oa.get(r);if(e==="objectStoreNames")return r.objectStoreNames||wd.get(r);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Ke(r[e])},set(r,e,t){return r[e]=t,!0},has(r,e){return r instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in r}};function Ed(r){xa=r(xa)}function m_(r){return r===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){let n=r.call(ns(this),e,...t);return wd.set(n,e.sort?e.sort():[e]),Ke(n)}:d_().includes(r)?function(...e){return r.apply(ns(this),e),Ke(Id.get(this))}:function(...e){return Ke(r.apply(ns(this),e))}}function g_(r){return typeof r=="function"?m_(r):(r instanceof IDBTransaction&&p_(r),l_(r,h_())?new Proxy(r,xa):r)}function Ke(r){if(r instanceof IDBRequest)return f_(r);if(Na.has(r))return Na.get(r);let e=g_(r);return e!==r&&(Na.set(r,e),Va.set(e,r)),e}var ns=r=>Va.get(r);function Ad(r,e,{blocked:t,upgrade:n,blocking:i,terminated:s}={}){let o=indexedDB.open(r,e),c=Ke(o);return n&&o.addEventListener("upgradeneeded",u=>{n(Ke(o.result),u.oldVersion,u.newVersion,Ke(o.transaction),u)}),t&&o.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),c.then(u=>{s&&u.addEventListener("close",()=>s()),i&&u.addEventListener("versionchange",h=>i(h.oldVersion,h.newVersion,h))}).catch(()=>{}),c}var __=["get","getKey","getAll","getAllKeys","count"],y_=["put","add","delete","clear"],La=new Map;function Td(r,e){if(!(r instanceof IDBDatabase&&!(e in r)&&typeof e=="string"))return;if(La.get(e))return La.get(e);let t=e.replace(/FromIndex$/,""),n=e!==t,i=y_.includes(t);if(!(t in(n?IDBIndex:IDBObjectStore).prototype)||!(i||__.includes(t)))return;let s=async function(o,...c){let u=this.transaction(o,i?"readwrite":"readonly"),h=u.store;return n&&(h=h.index(c.shift())),(await Promise.all([h[t](...c),i&&u.done]))[0]};return La.set(e,s),s}Ed(r=>({...r,get:(e,t,n)=>Td(e,t)||r.get(e,t,n),has:(e,t)=>!!Td(e,t)||r.has(e,t)}));var Fa=class{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(v_(t)){let n=t.getImmediate();return`${n.library}/${n.version}`}else return null}).filter(t=>t).join(" ")}};function v_(r){let e=r.getComponent();return(e==null?void 0:e.type)==="VERSION"}var Ua="@firebase/app",bd="0.10.16";var it=new mt("@firebase/app"),I_="@firebase/app-compat",w_="@firebase/analytics-compat",E_="@firebase/analytics",T_="@firebase/app-check-compat",A_="@firebase/app-check",b_="@firebase/auth",S_="@firebase/auth-compat",R_="@firebase/database",P_="@firebase/data-connect",C_="@firebase/database-compat",D_="@firebase/functions",k_="@firebase/functions-compat",N_="@firebase/installations",O_="@firebase/installations-compat",x_="@firebase/messaging",V_="@firebase/messaging-compat",L_="@firebase/performance",M_="@firebase/performance-compat",F_="@firebase/remote-config",U_="@firebase/remote-config-compat",B_="@firebase/storage",q_="@firebase/storage-compat",j_="@firebase/firestore",z_="@firebase/vertexai",G_="@firebase/firestore-compat",$_="firebase",K_="11.0.2";var W_="[DEFAULT]",H_={[Ua]:"fire-core",[I_]:"fire-core-compat",[E_]:"fire-analytics",[w_]:"fire-analytics-compat",[A_]:"fire-app-check",[T_]:"fire-app-check-compat",[b_]:"fire-auth",[S_]:"fire-auth-compat",[R_]:"fire-rtdb",[P_]:"fire-data-connect",[C_]:"fire-rtdb-compat",[D_]:"fire-fn",[k_]:"fire-fn-compat",[N_]:"fire-iid",[O_]:"fire-iid-compat",[x_]:"fire-fcm",[V_]:"fire-fcm-compat",[L_]:"fire-perf",[M_]:"fire-perf-compat",[F_]:"fire-rc",[U_]:"fire-rc-compat",[B_]:"fire-gcs",[q_]:"fire-gcs-compat",[j_]:"fire-fst",[G_]:"fire-fst-compat",[z_]:"fire-vertex","fire-js":"fire-js",[$_]:"fire-js-all"};var Ba=new Map,Q_=new Map,qa=new Map;function Sd(r,e){try{r.container.addComponent(e)}catch(t){it.debug(`Component ${e.name} failed to register with FirebaseApp ${r.name}`,t)}}function gt(r){let e=r.name;if(qa.has(e))return it.debug(`There were multiple attempts to register component ${e}.`),!1;qa.set(e,r);for(let t of Ba.values())Sd(t,r);for(let t of Q_.values())Sd(t,r);return!0}function rs(r,e){let t=r.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),r.container.getProvider(e)}function We(r){return r.settings!==void 0}var J_={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Kt=new rt("app","Firebase",J_);var ja=class{constructor(e,t,n){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new Be("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Kt.create("app-deleted",{appName:this._name})}};var Pn=K_;function Dd(r,e={}){let t=r;typeof e!="object"&&(e={name:e});let n=Object.assign({name:W_,automaticDataCollectionEnabled:!1},e),i=n.name;if(typeof i!="string"||!i)throw Kt.create("bad-app-name",{appName:String(i)});if(t||(t=ud()),!t)throw Kt.create("no-options");let s=Ba.get(i);if(s){if(pt(t,s.options)&&pt(n,s.config))return s;throw Kt.create("duplicate-app",{appName:i})}let o=new ts(i);for(let u of qa.values())o.addComponent(u);let c=new ja(t,n,o);return Ba.set(i,c),c}function ze(r,e,t){var n;let i=(n=H_[r])!==null&&n!==void 0?n:r;t&&(i+=`-${t}`);let s=i.match(/\s|\//),o=e.match(/\s|\//);if(s||o){let c=[`Unable to register library "${i}" with version "${e}":`];s&&c.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&o&&c.push("and"),o&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),it.warn(c.join(" "));return}gt(new Be(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}var Y_="firebase-heartbeat-database",X_=1,Lr="firebase-heartbeat-store",Ma=null;function kd(){return Ma||(Ma=Ad(Y_,X_,{upgrade:(r,e)=>{switch(e){case 0:try{r.createObjectStore(Lr)}catch(t){console.warn(t)}}}}).catch(r=>{throw Kt.create("idb-open",{originalErrorMessage:r.message})})),Ma}async function Z_(r){try{let t=(await kd()).transaction(Lr),n=await t.objectStore(Lr).get(Nd(r));return await t.done,n}catch(e){if(e instanceof Le)it.warn(e.message);else{let t=Kt.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});it.warn(t.message)}}}async function Rd(r,e){try{let n=(await kd()).transaction(Lr,"readwrite");await n.objectStore(Lr).put(e,Nd(r)),await n.done}catch(t){if(t instanceof Le)it.warn(t.message);else{let n=Kt.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});it.warn(n.message)}}}function Nd(r){return`${r.name}!${r.options.appId}`}var ey=1024,ty=30*24*60*60*1e3,za=class{constructor(e){this.container=e,this._heartbeatsCache=null;let t=this.container.getProvider("app").getImmediate();this._storage=new Ga(t),this._heartbeatsCachePromise=this._storage.read().then(n=>(this._heartbeatsCache=n,n))}async triggerHeartbeat(){var e,t;try{let i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Pd();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(o=>o.date===s)?void 0:(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{let c=new Date(o.date).valueOf();return Date.now()-c<=ty}),this._storage.overwrite(this._heartbeatsCache))}catch(n){it.warn(n)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";let t=Pd(),{heartbeatsToSend:n,unsentEntries:i}=ny(this._heartbeatsCache.heartbeats),s=Ra(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(t){return it.warn(t),""}}};function Pd(){return new Date().toISOString().substring(0,10)}function ny(r,e=ey){let t=[],n=r.slice();for(let i of r){let s=t.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),Cd(t)>e){s.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),Cd(t)>e){t.pop();break}n=n.slice(1)}return{heartbeatsToSend:t,unsentEntries:n}}var Ga=class{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Zi()?gd().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){let t=await Z_(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){let i=await this.read();return Rd(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){let i=await this.read();return Rd(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}};function Cd(r){return Ra(JSON.stringify({version:2,heartbeats:r})).length}function ry(r){gt(new Be("platform-logger",e=>new Fa(e),"PRIVATE")),gt(new Be("heartbeat",e=>new za(e),"PRIVATE")),ze(Ua,bd,r),ze(Ua,bd,"esm2017"),ze("fire-js","")}ry("");var iy="firebase",sy="11.0.2";ze(iy,sy,"app");function is(r,e){var t={};for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&e.indexOf(n)<0&&(t[n]=r[n]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,n=Object.getOwnPropertySymbols(r);i<n.length;i++)e.indexOf(n[i])<0&&Object.prototype.propertyIsEnumerable.call(r,n[i])&&(t[n[i]]=r[n[i]]);return t}function Wd(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}var Hd=Wd,Qd=new rt("auth","Firebase",Wd());var cs=new mt("@firebase/auth");function ay(r,...e){cs.logLevel<=H.WARN&&cs.warn(`Auth (${Pn}): ${r}`,...e)}function os(r,...e){cs.logLevel<=H.ERROR&&cs.error(`Auth (${Pn}): ${r}`,...e)}function st(r,...e){throw hc(r,...e)}function Cn(r,...e){return hc(r,...e)}function Jd(r,e,t){let n=Object.assign(Object.assign({},Hd()),{[e]:t});return new rt("auth","Firebase",n).create(e,{appName:r.name})}function yt(r){return Jd(r,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function hc(r,...e){if(typeof r!="string"){let t=e[0],n=[...e.slice(1)];return n[0]&&(n[0].appName=r.name),r._errorFactory.create(t,...n)}return Qd.create(r,...e)}function B(r,e,...t){if(!r)throw hc(e,...t)}function He(r){let e="INTERNAL ASSERTION FAILED: "+r;throw os(e),new Error(e)}function Qt(r,e){r||He(e)}function cy(){return Od()==="http:"||Od()==="https:"}function Od(){var r;return typeof self!="undefined"&&((r=self.location)===null||r===void 0?void 0:r.protocol)||null}function uy(){return typeof navigator!="undefined"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(cy()||fd()||"connection"in navigator)?navigator.onLine:!0}function ly(){if(typeof navigator=="undefined")return null;let r=navigator;return r.languages&&r.languages[0]||r.language||null}var Jt=class{constructor(e,t){this.shortDelay=e,this.longDelay=t,Qt(t>e,"Short delay should be less than long delay!"),this.isMobile=hd()||pd()}get(){return uy()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}};function hy(r,e){Qt(r.emulator,"Emulator should always be set here");let{url:t}=r.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}var us=class{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self!="undefined"&&"fetch"in self)return self.fetch;if(typeof globalThis!="undefined"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch!="undefined")return fetch;He("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self!="undefined"&&"Headers"in self)return self.Headers;if(typeof globalThis!="undefined"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers!="undefined")return Headers;He("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self!="undefined"&&"Response"in self)return self.Response;if(typeof globalThis!="undefined"&&globalThis.Response)return globalThis.Response;if(typeof Response!="undefined")return Response;He("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}};var dy={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};var fy=new Jt(3e4,6e4);function le(r,e){return r.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:r.tenantId}):e}async function ve(r,e,t,n,i={}){return Yd(r,i,async()=>{let s={},o={};n&&(e==="GET"?o=n:s={body:JSON.stringify(n)});let c=es(Object.assign({key:r.config.apiKey},o)).slice(1),u=await r._getAdditionalHeaders();u["Content-Type"]="application/json",r.languageCode&&(u["X-Firebase-Locale"]=r.languageCode);let h=Object.assign({method:e,headers:u},s);return dd()||(h.referrerPolicy="no-referrer"),us.fetch()(Xd(r,r.config.apiHost,t,c),h)})}async function Yd(r,e,t){r._canInitEmulator=!1;let n=Object.assign(Object.assign({},dy),e);try{let i=new Ha(r),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();let o=await s.json();if("needConfirmation"in o)throw Fr(r,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{let c=s.ok?o.errorMessage:o.error.message,[u,h]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw Fr(r,"credential-already-in-use",o);if(u==="EMAIL_EXISTS")throw Fr(r,"email-already-in-use",o);if(u==="USER_DISABLED")throw Fr(r,"user-disabled",o);let f=n[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw Jd(r,f,h);st(r,f)}}catch(i){if(i instanceof Le)throw i;st(r,"network-request-failed",{message:String(i)})}}async function vt(r,e,t,n,i={}){let s=await ve(r,e,t,n,i);return"mfaPendingCredential"in s&&st(r,"multi-factor-auth-required",{_serverResponse:s}),s}function Xd(r,e,t,n){let i=`${e}${t}?${n}`;return r.config.emulator?hy(r.config,i):`${r.config.apiScheme}://${i}`}function py(r){switch(r){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}var Ha=class{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,n)=>{this.timer=setTimeout(()=>n(Cn(this.auth,"network-request-failed")),fy.get())})}};function Fr(r,e,t){let n={appName:r.name};t.email&&(n.email=t.email),t.phoneNumber&&(n.phoneNumber=t.phoneNumber);let i=Cn(r,e,n);return i.customData._tokenResponse=t,i}function xd(r){return r!==void 0&&r.enterprise!==void 0}var ls=class{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(let t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return py(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}};async function Zd(r,e){return ve(r,"GET","/v2/recaptchaConfig",le(r,e))}async function my(r,e){return ve(r,"POST","/v1/accounts:delete",e)}async function ef(r,e){return ve(r,"POST","/v1/accounts:lookup",e)}function Ur(r){if(r)try{let e=new Date(Number(r));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function tf(r,e=!1){let t=se(r),n=await t.getIdToken(e),i=dc(n);B(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");let s=typeof i.firebase=="object"?i.firebase:void 0,o=s==null?void 0:s.sign_in_provider;return{claims:i,token:n,authTime:Ur($a(i.auth_time)),issuedAtTime:Ur($a(i.iat)),expirationTime:Ur($a(i.exp)),signInProvider:o||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function $a(r){return Number(r)*1e3}function dc(r){let[e,t,n]=r.split(".");if(e===void 0||t===void 0||n===void 0)return os("JWT malformed, contained fewer than 3 sections"),null;try{let i=Pa(t);return i?JSON.parse(i):(os("Failed to decode base64 JWT payload"),null)}catch(i){return os("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function Vd(r){let e=dc(r);return B(e,"internal-error"),B(typeof e.exp!="undefined","internal-error"),B(typeof e.iat!="undefined","internal-error"),Number(e.exp)-Number(e.iat)}async function kn(r,e,t=!1){if(t)return e;try{return await e}catch(n){throw n instanceof Le&&gy(n)&&r.auth.currentUser===r&&await r.auth.signOut(),n}}function gy({code:r}){return r==="auth/user-disabled"||r==="auth/user-token-expired"}var Qa=class{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){let n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;let i=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;let t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}};var jr=class{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ur(this.lastLoginAt),this.creationTime=Ur(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}};async function hs(r){var e;let t=r.auth,n=await r.getIdToken(),i=await kn(r,ef(t,{idToken:n}));B(i==null?void 0:i.users.length,t,"internal-error");let s=i.users[0];r._notifyReloadListener(s);let o=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?nf(s.providerUserInfo):[],c=_y(r.providerData,o),u=r.isAnonymous,h=!(r.email&&s.passwordHash)&&!(c!=null&&c.length),f=u?h:!1,m={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:c,metadata:new jr(s.createdAt,s.lastLoginAt),isAnonymous:f};Object.assign(r,m)}async function Ps(r){let e=se(r);await hs(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function _y(r,e){return[...r.filter(n=>!e.some(i=>i.providerId===n.providerId)),...e]}function nf(r){return r.map(e=>{var{providerId:t}=e,n=is(e,["providerId"]);return{providerId:t,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}})}async function yy(r,e){let t=await Yd(r,{},async()=>{let n=es({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=r.config,o=Xd(r,i,"/v1/token",`key=${s}`),c=await r._getAdditionalHeaders();return c["Content-Type"]="application/x-www-form-urlencoded",us.fetch()(o,{method:"POST",headers:c,body:n})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function vy(r,e){return ve(r,"POST","/v2/accounts:revokeToken",le(r,e))}var Br=class r{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){B(e.idToken,"internal-error"),B(typeof e.idToken!="undefined","internal-error"),B(typeof e.refreshToken!="undefined","internal-error");let t="expiresIn"in e&&typeof e.expiresIn!="undefined"?Number(e.expiresIn):Vd(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){B(e.length!==0,"internal-error");let t=Vd(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(B(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){let{accessToken:n,refreshToken:i,expiresIn:s}=await yy(e,t);this.updateTokensAndExpiration(n,i,Number(s))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+n*1e3}static fromJSON(e,t){let{refreshToken:n,accessToken:i,expirationTime:s}=t,o=new r;return n&&(B(typeof n=="string","internal-error",{appName:e}),o.refreshToken=n),i&&(B(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(B(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new r,this.toJSON())}_performRefresh(){return He("not implemented")}};function _t(r,e){B(typeof r=="string"||typeof r=="undefined","internal-error",{appName:e})}var Nn=class r{constructor(e){var{uid:t,auth:n,stsTokenManager:i}=e,s=is(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Qa(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=n,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new jr(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){let t=await kn(this,this.stsTokenManager.getToken(this.auth,e));return B(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return tf(this,e)}reload(){return Ps(this)}_assign(e){this!==e&&(B(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){let t=new r(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){B(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await hs(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(We(this.auth.app))return Promise.reject(yt(this.auth));let e=await this.getIdToken();return await kn(this,my(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var n,i,s,o,c,u,h,f;let m=(n=t.displayName)!==null&&n!==void 0?n:void 0,v=(i=t.email)!==null&&i!==void 0?i:void 0,S=(s=t.phoneNumber)!==null&&s!==void 0?s:void 0,D=(o=t.photoURL)!==null&&o!==void 0?o:void 0,N=(c=t.tenantId)!==null&&c!==void 0?c:void 0,k=(u=t._redirectEventId)!==null&&u!==void 0?u:void 0,z=(h=t.createdAt)!==null&&h!==void 0?h:void 0,j=(f=t.lastLoginAt)!==null&&f!==void 0?f:void 0,{uid:U,emailVerified:W,isAnonymous:Y,providerData:G,stsTokenManager:I}=t;B(U&&I,e,"internal-error");let g=Br.fromJSON(this.name,I);B(typeof U=="string",e,"internal-error"),_t(m,e.name),_t(v,e.name),B(typeof W=="boolean",e,"internal-error"),B(typeof Y=="boolean",e,"internal-error"),_t(S,e.name),_t(D,e.name),_t(N,e.name),_t(k,e.name),_t(z,e.name),_t(j,e.name);let y=new r({uid:U,auth:e,email:v,emailVerified:W,displayName:m,isAnonymous:Y,photoURL:D,phoneNumber:S,tenantId:N,stsTokenManager:g,createdAt:z,lastLoginAt:j});return G&&Array.isArray(G)&&(y.providerData=G.map(w=>Object.assign({},w))),k&&(y._redirectEventId=k),y}static async _fromIdTokenResponse(e,t,n=!1){let i=new Br;i.updateFromServerResponse(t);let s=new r({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:n});return await hs(s),s}static async _fromGetAccountInfoResponse(e,t,n){let i=t.users[0];B(i.localId!==void 0,"internal-error");let s=i.providerUserInfo!==void 0?nf(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!(s!=null&&s.length),c=new Br;c.updateFromIdToken(n);let u=new r({uid:i.localId,auth:e,stsTokenManager:c,isAnonymous:o}),h={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new jr(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(s!=null&&s.length)};return Object.assign(u,h),u}};var Ld=new Map;function Wt(r){Qt(r instanceof Function,"Expected a class definition");let e=Ld.get(r);return e?(Qt(e instanceof r,"Instance stored in cache mismatched with class"),e):(e=new r,Ld.set(r,e),e)}var ds=class{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){let t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}};ds.type="NONE";var Ja=ds;function Ka(r,e,t){return`firebase:${r}:${e}:${t}`}var fs=class r{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;let{config:i,name:s}=this.auth;this.fullUserKey=Ka(this.userKey,i.apiKey,s),this.fullPersistenceKey=Ka("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){let e=await this.persistence._get(this.fullUserKey);return e?Nn._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;let t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,n="authUser"){if(!t.length)return new r(Wt(Ja),e,n);let i=(await Promise.all(t.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h),s=i[0]||Wt(Ja),o=Ka(n,e.config.apiKey,e.name),c=null;for(let h of t)try{let f=await h._get(o);if(f){let m=Nn._fromJSON(e,f);h!==s&&(c=m),s=h;break}}catch{}let u=i.filter(h=>h._shouldAllowMigration);return!s._shouldAllowMigration||!u.length?new r(s,e,n):(s=u[0],c&&await s._set(o,c.toJSON()),await Promise.all(t.map(async h=>{if(h!==s)try{await h._remove(o)}catch{}})),new r(s,e,n))}};function Md(r){let e=r.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(rf(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Iy(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(of(e))return"Blackberry";if(af(e))return"Webos";if(wy(e))return"Safari";if((e.includes("chrome/")||Ey(e))&&!e.includes("edge/"))return"Chrome";if(sf(e))return"Android";{let t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=r.match(t);if((n==null?void 0:n.length)===2)return n[1]}return"Other"}function Iy(r=pe()){return/firefox\//i.test(r)}function wy(r=pe()){let e=r.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Ey(r=pe()){return/crios\//i.test(r)}function rf(r=pe()){return/iemobile/i.test(r)}function sf(r=pe()){return/android/i.test(r)}function of(r=pe()){return/blackberry/i.test(r)}function af(r=pe()){return/webos/i.test(r)}function Ty(r=pe()){return/iphone|ipad|ipod/i.test(r)||/macintosh/i.test(r)&&/mobile/i.test(r)}function Ay(){return md()&&document.documentMode===10}function by(r=pe()){return Ty(r)||sf(r)||af(r)||of(r)||/windows phone/i.test(r)||rf(r)}function cf(r,e=[]){let t;switch(r){case"Browser":t=Md(pe());break;case"Worker":t=`${Md(pe())}-${r}`;break;default:t=r}let n=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Pn}/${n}`}var Ya=class{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){let n=s=>new Promise((o,c)=>{try{let u=e(s);o(u)}catch(u){c(u)}});n.onAbort=t,this.queue.push(n);let i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;let t=[];try{for(let n of this.queue)await n(e),n.onAbort&&t.push(n.onAbort)}catch(n){t.reverse();for(let i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:n==null?void 0:n.message})}}};async function Sy(r,e={}){return ve(r,"GET","/v2/passwordPolicy",le(r,e))}var Ry=6,Xa=class{constructor(e){var t,n,i,s;let o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=o.minPasswordLength)!==null&&t!==void 0?t:Ry,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(n=e.allowedNonAlphanumericCharacters)===null||n===void 0?void 0:n.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(s=e.forceUpgradeOnSignin)!==null&&s!==void 0?s:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,n,i,s,o,c;let u={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,u),this.validatePasswordCharacterOptions(e,u),u.isValid&&(u.isValid=(t=u.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),u.isValid&&(u.isValid=(n=u.meetsMaxPasswordLength)!==null&&n!==void 0?n:!0),u.isValid&&(u.isValid=(i=u.containsLowercaseLetter)!==null&&i!==void 0?i:!0),u.isValid&&(u.isValid=(s=u.containsUppercaseLetter)!==null&&s!==void 0?s:!0),u.isValid&&(u.isValid=(o=u.containsNumericCharacter)!==null&&o!==void 0?o:!0),u.isValid&&(u.isValid=(c=u.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),u}validatePasswordLengthOptions(e,t){let n=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;n&&(t.meetsMinPasswordLength=e.length>=n),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let n;for(let i=0;i<e.length;i++)n=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,n>="a"&&n<="z",n>="A"&&n<="Z",n>="0"&&n<="9",this.allowedNonAlphanumericCharacters.includes(n))}updatePasswordCharacterOptionsStatuses(e,t,n,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=n)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}};var Za=class{constructor(e,t,n,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=n,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new ps(this),this.idTokenSubscription=new ps(this),this.beforeStateQueue=new Ya(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Qd,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Wt(t)),this._initializationPromise=this.queue(async()=>{var n,i;if(!this._deleted&&(this.persistenceManager=await fs.create(this,e),!this._deleted)){if(!((n=this._popupRedirectResolver)===null||n===void 0)&&n._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;let e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{let t=await ef(this,{idToken:e}),n=await Nn._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(n)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(We(this.app)){let o=this.app.settings.authIdToken;return o?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(c,c))}):this.directlySetCurrentUser(null)}let n=await this.assertedPersistence.getCurrentUser(),i=n,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();let o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,c=i==null?void 0:i._redirectEventId,u=await this.tryRedirectSignIn(e);(!o||o===c)&&(u!=null&&u.user)&&(i=u.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(o){i=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return B(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await hs(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=ly()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(We(this.app))return Promise.reject(yt(this));let t=e?se(e):null;return t&&B(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&B(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return We(this.app)?Promise.reject(yt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return We(this.app)?Promise.reject(yt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Wt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();let t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){let e=await Sy(this),t=new Xa(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new rt("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{let n=this.onAuthStateChanged(()=>{n(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){let t=await this.currentUser.getIdToken(),n={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(n.tenantId=this.tenantId),await vy(this,n)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){let n=await this.getOrInitRedirectPersistenceManager(t);return e===null?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){let t=e&&Wt(e)||this._popupRedirectResolver;B(t,this,"argument-error"),this.redirectPersistenceManager=await fs.create(this,[Wt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,n;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);let n=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==n&&(this.lastNotifiedUid=n,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,i){if(this._deleted)return()=>{};let s=typeof t=="function"?t:t.next.bind(t),o=!1,c=this._isInitialized?Promise.resolve():this._initializationPromise;if(B(c,this,"internal-error"),c.then(()=>{o||s(this.currentUser)}),typeof t=="function"){let u=e.addObserver(t,n,i);return()=>{o=!0,u()}}else{let u=e.addObserver(t);return()=>{o=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return B(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=cf(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;let t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);let n=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());n&&(t["X-Firebase-Client"]=n);let i=await this._getAppCheckToken();return i&&(t["X-Firebase-AppCheck"]=i),t}async _getAppCheckToken(){var e;let t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&ay(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}};function It(r){return se(r)}var ps=class{constructor(e){this.auth=e,this.observer=null,this.addObserver=_d(t=>this.observer=t)}get next(){return B(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}};var fc={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Py(r){fc=r}function Cy(r){return fc.loadJS(r)}function Dy(){return fc.recaptchaEnterpriseScript}function ky(r){return`__${r}${Math.floor(Math.random()*1e6)}`}var ec=class{constructor(){this.enterprise=new tc}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}},tc=class{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}};var Ny="recaptcha-enterprise",qr="NO_RECAPTCHA",ms=class{constructor(e){this.type=Ny,this.auth=It(e)}async verify(e="verify",t=!1){async function n(s){if(!t){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(o,c)=>{Zd(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{let h=new ls(u);return s.tenantId==null?s._agentRecaptchaConfig=h:s._tenantRecaptchaConfigs[s.tenantId]=h,o(h.siteKey)}}).catch(u=>{c(u)})})}function i(s,o,c){let u=window.grecaptcha;xd(u)?u.enterprise.ready(()=>{u.enterprise.execute(s,{action:e}).then(h=>{o(h)}).catch(()=>{o(qr)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new ec().execute("siteKey",{action:"verify"}):new Promise((s,o)=>{n(this.auth).then(c=>{if(!t&&xd(window.grecaptcha))i(c,s,o);else{if(typeof window=="undefined"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let u=Dy();u.length!==0&&(u+=c),Cy(u).then(()=>{i(c,s,o)}).catch(h=>{o(h)})}}).catch(c=>{o(c)})})}};async function Mr(r,e,t,n=!1,i=!1){let s=new ms(r),o;if(i)o=qr;else try{o=await s.verify(t)}catch{o=await s.verify(t,!0)}let c=Object.assign({},e);if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){let u=c.phoneEnrollmentInfo.phoneNumber,h=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:u,recaptchaToken:h,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){let u=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:u,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return n?Object.assign(c,{captchaResp:o}):Object.assign(c,{captchaResponse:o}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function Ht(r,e,t,n,i){var s,o;if(i==="EMAIL_PASSWORD_PROVIDER")if(!((s=r._getRecaptchaConfig())===null||s===void 0)&&s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){let c=await Mr(r,e,t,t==="getOobCode");return n(r,c)}else return n(r,e).catch(async c=>{if(c.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);let u=await Mr(r,e,t,t==="getOobCode");return n(r,u)}else return Promise.reject(c)});else if(i==="PHONE_PROVIDER")if(!((o=r._getRecaptchaConfig())===null||o===void 0)&&o.isProviderEnabled("PHONE_PROVIDER")){let c=await Mr(r,e,t);return n(r,c).catch(async u=>{var h;if(((h=r._getRecaptchaConfig())===null||h===void 0?void 0:h.getProviderEnforcementState("PHONE_PROVIDER"))==="AUDIT"&&(u.code==="auth/missing-recaptcha-token"||u.code==="auth/invalid-app-credential")){console.log(`Failed to verify with reCAPTCHA Enterprise. Automatically triggering the reCAPTCHA v2 flow to complete the ${t} flow.`);let f=await Mr(r,e,t,!1,!0);return n(r,f)}return Promise.reject(u)})}else{let c=await Mr(r,e,t,!1,!0);return n(r,c)}else return Promise.reject(i+" provider is not supported.")}async function Oy(r){let e=It(r),t=await Zd(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),n=new ls(t);e.tenantId==null?e._agentRecaptchaConfig=n:e._tenantRecaptchaConfigs[e.tenantId]=n,n.isAnyProviderEnabled()&&new ms(e).verify()}function pc(r,e){let t=rs(r,"auth");if(t.isInitialized()){let i=t.getImmediate(),s=t.getOptions();if(pt(s,e!=null?e:{}))return i;st(i,"already-initialized")}return t.initialize({options:e})}function xy(r,e){let t=(e==null?void 0:e.persistence)||[],n=(Array.isArray(t)?t:[t]).map(Wt);e!=null&&e.errorMap&&r._updateErrorMap(e.errorMap),r._initializeWithPersistence(n,e==null?void 0:e.popupRedirectResolver)}var Yt=class{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return He("not implemented")}_getIdTokenResponse(e){return He("not implemented")}_linkToIdToken(e,t){return He("not implemented")}_getReauthenticationResolver(e){return He("not implemented")}};async function Vy(r,e){return ve(r,"POST","/v1/accounts:signUp",e)}async function Ly(r,e){return vt(r,"POST","/v1/accounts:signInWithPassword",le(r,e))}async function uf(r,e){return ve(r,"POST","/v1/accounts:sendOobCode",le(r,e))}async function My(r,e){return uf(r,e)}async function Fy(r,e){return uf(r,e)}async function Uy(r,e){return vt(r,"POST","/v1/accounts:signInWithEmailLink",le(r,e))}async function By(r,e){return vt(r,"POST","/v1/accounts:signInWithEmailLink",le(r,e))}var zr=class r extends Yt{constructor(e,t,n,i=null){super("password",n),this._email=e,this._password=t,this._tenantId=i}static _fromEmailAndPassword(e,t){return new r(e,t,"password")}static _fromEmailAndCode(e,t,n=null){return new r(e,t,"emailLink",n)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":let t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Ht(e,t,"signInWithPassword",Ly,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return Uy(e,{email:this._email,oobCode:this._password});default:st(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":let n={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Ht(e,n,"signUpPassword",Vy,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return By(e,{idToken:t,email:this._email,oobCode:this._password});default:st(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}};async function Dn(r,e){return vt(r,"POST","/v1/accounts:signInWithIdp",le(r,e))}var qy="http://localhost",Xt=class r extends Yt{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){let t=new r(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):st("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e,{providerId:n,signInMethod:i}=t,s=is(t,["providerId","signInMethod"]);if(!n||!i)return null;let o=new r(n,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){let t=this.buildRequest();return Dn(e,t)}_linkToIdToken(e,t){let n=this.buildRequest();return n.idToken=t,Dn(e,n)}_getReauthenticationResolver(e){let t=this.buildRequest();return t.autoCreate=!1,Dn(e,t)}buildRequest(){let e={requestUri:qy,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{let t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=es(t)}return e}};async function Fd(r,e){return ve(r,"POST","/v1/accounts:sendVerificationCode",le(r,e))}async function jy(r,e){return vt(r,"POST","/v1/accounts:signInWithPhoneNumber",le(r,e))}async function zy(r,e){let t=await vt(r,"POST","/v1/accounts:signInWithPhoneNumber",le(r,e));if(t.temporaryProof)throw Fr(r,"account-exists-with-different-credential",t);return t}var Gy={USER_NOT_FOUND:"user-not-found"};async function $y(r,e){let t=Object.assign(Object.assign({},e),{operation:"REAUTH"});return vt(r,"POST","/v1/accounts:signInWithPhoneNumber",le(r,t),Gy)}var Gr=class r extends Yt{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new r({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new r({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return jy(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return zy(e,Object.assign({idToken:t},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return $y(e,this._makeVerificationRequest())}_makeVerificationRequest(){let{temporaryProof:e,phoneNumber:t,verificationId:n,verificationCode:i}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:n,code:i}}toJSON(){let e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));let{verificationId:t,verificationCode:n,phoneNumber:i,temporaryProof:s}=e;return!n&&!t&&!i&&!s?null:new r({verificationId:t,verificationCode:n,phoneNumber:i,temporaryProof:s})}};function Ky(r){switch(r){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Wy(r){let e=Sn(Rn(r)).link,t=e?Sn(Rn(e)).deep_link_id:null,n=Sn(Rn(r)).deep_link_id;return(n?Sn(Rn(n)).link:null)||n||t||e||r}var gs=class r{constructor(e){var t,n,i,s,o,c;let u=Sn(Rn(e)),h=(t=u.apiKey)!==null&&t!==void 0?t:null,f=(n=u.oobCode)!==null&&n!==void 0?n:null,m=Ky((i=u.mode)!==null&&i!==void 0?i:null);B(h&&f&&m,"argument-error"),this.apiKey=h,this.operation=m,this.code=f,this.continueUrl=(s=u.continueUrl)!==null&&s!==void 0?s:null,this.languageCode=(o=u.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(c=u.tenantId)!==null&&c!==void 0?c:null}static parseLink(e){let t=Wy(e);try{return new r(t)}catch{return null}}};var Zt=class r{constructor(){this.providerId=r.PROVIDER_ID}static credential(e,t){return zr._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){let n=gs.parseLink(t);return B(n,"argument-error"),zr._fromEmailAndCode(e,n.code,n.tenantId)}};Zt.PROVIDER_ID="password";Zt.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Zt.EMAIL_LINK_SIGN_IN_METHOD="emailLink";var nc=class{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}};var On=class extends nc{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}};var $r=class r extends On{constructor(){super("facebook.com")}static credential(e){return Xt._fromParams({providerId:r.PROVIDER_ID,signInMethod:r.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return r.credentialFromTaggedObject(e)}static credentialFromError(e){return r.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return r.credential(e.oauthAccessToken)}catch{return null}}};$r.FACEBOOK_SIGN_IN_METHOD="facebook.com";$r.PROVIDER_ID="facebook.com";var Kr=class r extends On{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Xt._fromParams({providerId:r.PROVIDER_ID,signInMethod:r.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return r.credentialFromTaggedObject(e)}static credentialFromError(e){return r.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthIdToken:t,oauthAccessToken:n}=e;if(!t&&!n)return null;try{return r.credential(t,n)}catch{return null}}};Kr.GOOGLE_SIGN_IN_METHOD="google.com";Kr.PROVIDER_ID="google.com";var Wr=class r extends On{constructor(){super("github.com")}static credential(e){return Xt._fromParams({providerId:r.PROVIDER_ID,signInMethod:r.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return r.credentialFromTaggedObject(e)}static credentialFromError(e){return r.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return r.credential(e.oauthAccessToken)}catch{return null}}};Wr.GITHUB_SIGN_IN_METHOD="github.com";Wr.PROVIDER_ID="github.com";var Hr=class r extends On{constructor(){super("twitter.com")}static credential(e,t){return Xt._fromParams({providerId:r.PROVIDER_ID,signInMethod:r.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return r.credentialFromTaggedObject(e)}static credentialFromError(e){return r.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthAccessToken:t,oauthTokenSecret:n}=e;if(!t||!n)return null;try{return r.credential(t,n)}catch{return null}}};Hr.TWITTER_SIGN_IN_METHOD="twitter.com";Hr.PROVIDER_ID="twitter.com";async function Hy(r,e){return vt(r,"POST","/v1/accounts:signUp",le(r,e))}var xn=class r{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,n,i=!1){let s=await Nn._fromIdTokenResponse(e,n,i),o=Ud(n);return new r({user:s,providerId:o,_tokenResponse:n,operationType:t})}static async _forOperation(e,t,n){await e._updateTokensIfNecessary(n,!0);let i=Ud(n);return new r({user:e,providerId:i,_tokenResponse:n,operationType:t})}};function Ud(r){return r.providerId?r.providerId:"phoneNumber"in r?"phone":null}var rc=class r extends Le{constructor(e,t,n,i){var s;super(t.code,t.message),this.operationType=n,this.user=i,Object.setPrototypeOf(this,r.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:t.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,t,n,i){return new r(e,t,n,i)}};function lf(r,e,t,n){return(e==="reauthenticate"?t._getReauthenticationResolver(r):t._getIdTokenResponse(r)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?rc._fromErrorAndOperation(r,s,e,n):s})}async function Qy(r,e,t=!1){let n=await kn(r,e._linkToIdToken(r.auth,await r.getIdToken()),t);return xn._forOperation(r,"link",n)}async function Jy(r,e,t=!1){let{auth:n}=r;if(We(n.app))return Promise.reject(yt(n));let i="reauthenticate";try{let s=await kn(r,lf(n,i,e,r),t);B(s.idToken,n,"internal-error");let o=dc(s.idToken);B(o,n,"internal-error");let{sub:c}=o;return B(r.uid===c,n,"user-mismatch"),xn._forOperation(r,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&st(n,"user-mismatch"),s}}async function hf(r,e,t=!1){if(We(r.app))return Promise.reject(yt(r));let n="signIn",i=await lf(r,n,e),s=await xn._fromIdTokenResponse(r,n,i);return t||await r._updateCurrentUser(s.user),s}async function df(r,e){return hf(It(r),e)}function ff(r,e,t){var n;B(((n=t.url)===null||n===void 0?void 0:n.length)>0,r,"invalid-continue-uri"),B(typeof t.dynamicLinkDomain=="undefined"||t.dynamicLinkDomain.length>0,r,"invalid-dynamic-link-domain"),e.continueUrl=t.url,e.dynamicLinkDomain=t.dynamicLinkDomain,e.canHandleCodeInApp=t.handleCodeInApp,t.iOS&&(B(t.iOS.bundleId.length>0,r,"missing-ios-bundle-id"),e.iOSBundleId=t.iOS.bundleId),t.android&&(B(t.android.packageName.length>0,r,"missing-android-pkg-name"),e.androidInstallApp=t.android.installApp,e.androidMinimumVersionCode=t.android.minimumVersion,e.androidPackageName=t.android.packageName)}async function pf(r){let e=It(r);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function mc(r,e,t){let n=It(r),i={requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"};t&&ff(n,i,t),await Ht(n,i,"getOobCode",Fy,"EMAIL_PASSWORD_PROVIDER")}async function gc(r,e,t){if(We(r.app))return Promise.reject(yt(r));let n=It(r),o=await Ht(n,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",Hy,"EMAIL_PASSWORD_PROVIDER").catch(u=>{throw u.code==="auth/password-does-not-meet-requirements"&&pf(r),u}),c=await xn._fromIdTokenResponse(n,"signIn",o);return await n._updateCurrentUser(c.user),c}function _c(r,e,t){return We(r.app)?Promise.reject(yt(r)):df(se(r),Zt.credential(e,t)).catch(async n=>{throw n.code==="auth/password-does-not-meet-requirements"&&pf(r),n})}async function yc(r,e){let t=se(r),i={requestType:"VERIFY_EMAIL",idToken:await r.getIdToken()};e&&ff(t.auth,i,e);let{email:s}=await My(t.auth,i);s!==r.email&&await r.reload()}async function Yy(r,e){return ve(r,"POST","/v1/accounts:update",e)}async function vc(r,{displayName:e,photoURL:t}){if(e===void 0&&t===void 0)return;let n=se(r),s={idToken:await n.getIdToken(),displayName:e,photoUrl:t,returnSecureToken:!0},o=await kn(n,Yy(n.auth,s));n.displayName=o.displayName||null,n.photoURL=o.photoUrl||null;let c=n.providerData.find(({providerId:u})=>u==="password");c&&(c.displayName=n.displayName,c.photoURL=n.photoURL),await n._updateTokensIfNecessary(o)}function Ic(r,e,t,n){return se(r).onAuthStateChanged(e,t,n)}function wc(r){return se(r).signOut()}function Bd(r,e){return ve(r,"POST","/v2/accounts/mfaEnrollment:start",le(r,e))}function Xy(r,e){return ve(r,"POST","/v2/accounts/mfaEnrollment:finalize",le(r,e))}function Zy(r,e){return ve(r,"POST","/v2/accounts/mfaEnrollment:start",le(r,e))}function ev(r,e){return ve(r,"POST","/v2/accounts/mfaEnrollment:finalize",le(r,e))}var _s="__sak";var ys=class{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(_s,"1"),this.storage.removeItem(_s),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){let t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}};var tv=1e3,nv=10,vs=class extends ys{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=by(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(let t of Object.keys(this.listeners)){let n=this.storage.getItem(t),i=this.localCache[t];n!==i&&e(t,i,n)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,c,u)=>{this.notifyListeners(o,u)});return}let n=e.key;t?this.detachListener():this.stopPolling();let i=()=>{let o=this.storage.getItem(n);!t&&this.localCache[n]===o||this.notifyListeners(n,o)},s=this.storage.getItem(n);Ay()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,nv):i()}notifyListeners(e,t){this.localCache[e]=t;let n=this.listeners[e];if(n)for(let i of Array.from(n))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:n}),!0)})},tv)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){let t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}};vs.type="LOCAL";var Ec=vs;var ic=class extends ys{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}};ic.type="SESSION";function rv(r){return Promise.all(r.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}var Is=class r{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){let t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;let n=new r(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){let t=e,{eventId:n,eventType:i,data:s}=t.data,o=this.handlersMap[i];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:n,eventType:i});let c=Array.from(o).map(async h=>h(t.origin,s)),u=await rv(c);t.ports[0].postMessage({status:"done",eventId:n,eventType:i,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}};Is.receivers=[];function mf(r="",e=10){let t="";for(let n=0;n<e;n++)t+=Math.floor(Math.random()*10);return r+t}var sc=class{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,n=50){let i=typeof MessageChannel!="undefined"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((c,u)=>{let h=mf("",20);i.port1.start();let f=setTimeout(()=>{u(new Error("unsupported_event"))},n);o={messageChannel:i,onMessage(m){let v=m;if(v.data.eventId===h)switch(v.data.status){case"ack":clearTimeout(f),s=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),c(v.data.response);break;default:clearTimeout(f),clearTimeout(s),u(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:h,data:t},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}};function qd(){return window}function gf(){return typeof qd().WorkerGlobalScope!="undefined"&&typeof qd().importScripts=="function"}async function iv(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function sv(){var r;return((r=navigator==null?void 0:navigator.serviceWorker)===null||r===void 0?void 0:r.controller)||null}function ov(){return gf()?self:null}var _f="firebaseLocalStorageDb",av=1,ws="firebaseLocalStorage",yf="fbase_key",en=class{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}};function Cs(r,e){return r.transaction([ws],e?"readwrite":"readonly").objectStore(ws)}function cv(){let r=indexedDB.deleteDatabase(_f);return new en(r).toPromise()}function oc(){let r=indexedDB.open(_f,av);return new Promise((e,t)=>{r.addEventListener("error",()=>{t(r.error)}),r.addEventListener("upgradeneeded",()=>{let n=r.result;try{n.createObjectStore(ws,{keyPath:yf})}catch(i){t(i)}}),r.addEventListener("success",async()=>{let n=r.result;n.objectStoreNames.contains(ws)?e(n):(n.close(),await cv(),e(await oc()))})})}async function jd(r,e,t){let n=Cs(r,!0).put({[yf]:e,value:t});return new en(n).toPromise()}async function uv(r,e){let t=Cs(r,!1).get(e),n=await new en(t).toPromise();return n===void 0?null:n.value}function zd(r,e){let t=Cs(r,!0).delete(e);return new en(t).toPromise()}var lv=800,hv=3,Es=class{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await oc(),this.db)}async _withRetries(e){let t=0;for(;;)try{let n=await this._openDb();return await e(n)}catch(n){if(t++>hv)throw n;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return gf()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Is._getInstance(ov()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await iv(),!this.activeServiceWorker)return;this.sender=new sc(this.activeServiceWorker);let n=await this.sender._send("ping",{},800);n&&!((e=n[0])===null||e===void 0)&&e.fulfilled&&!((t=n[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||sv()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;let e=await oc();return await jd(e,_s,"1"),await zd(e,_s),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(n=>jd(n,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){let t=await this._withRetries(n=>uv(n,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>zd(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){let e=await this._withRetries(i=>{let s=Cs(i,!1).getAll();return new en(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];let t=[],n=new Set;if(e.length!==0)for(let{fbase_key:i,value:s}of e)n.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(let i of Object.keys(this.localCache))this.localCache[i]&&!n.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;let n=this.listeners[e];if(n)for(let i of Array.from(n))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),lv)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}};Es.type="LOCAL";var Tc=Es;function Gd(r,e){return ve(r,"POST","/v2/accounts/mfaSignIn:start",le(r,e))}function dv(r,e){return ve(r,"POST","/v2/accounts/mfaSignIn:finalize",le(r,e))}function fv(r,e){return ve(r,"POST","/v2/accounts/mfaSignIn:finalize",le(r,e))}var Qw=ky("rcb"),Jw=new Jt(3e4,6e4);var as="recaptcha";async function pv(r,e,t){var n;if(!r._getRecaptchaConfig())try{await Oy(r)}catch{console.log("Failed to initialize reCAPTCHA Enterprise config. Triggering the reCAPTCHA v2 verification.")}try{let i;if(typeof e=="string"?i={phoneNumber:e}:i=e,"session"in i){let s=i.session;if("phoneNumber"in i){B(s.type==="enroll",r,"internal-error");let o={idToken:s.credential,phoneEnrollmentInfo:{phoneNumber:i.phoneNumber,clientType:"CLIENT_TYPE_WEB"}};return(await Ht(r,o,"mfaSmsEnrollment",async(f,m)=>{if(m.phoneEnrollmentInfo.captchaResponse===qr){B((t==null?void 0:t.type)===as,f,"argument-error");let v=await Wa(f,m,t);return Bd(f,v)}return Bd(f,m)},"PHONE_PROVIDER").catch(f=>Promise.reject(f))).phoneSessionInfo.sessionInfo}else{B(s.type==="signin",r,"internal-error");let o=((n=i.multiFactorHint)===null||n===void 0?void 0:n.uid)||i.multiFactorUid;B(o,r,"missing-multi-factor-info");let c={mfaPendingCredential:s.credential,mfaEnrollmentId:o,phoneSignInInfo:{clientType:"CLIENT_TYPE_WEB"}};return(await Ht(r,c,"mfaSmsSignIn",async(m,v)=>{if(v.phoneSignInInfo.captchaResponse===qr){B((t==null?void 0:t.type)===as,m,"argument-error");let S=await Wa(m,v,t);return Gd(m,S)}return Gd(m,v)},"PHONE_PROVIDER").catch(m=>Promise.reject(m))).phoneResponseInfo.sessionInfo}}else{let s={phoneNumber:i.phoneNumber,clientType:"CLIENT_TYPE_WEB"};return(await Ht(r,s,"sendVerificationCode",async(h,f)=>{if(f.captchaResponse===qr){B((t==null?void 0:t.type)===as,h,"argument-error");let m=await Wa(h,f,t);return Fd(h,m)}return Fd(h,f)},"PHONE_PROVIDER").catch(h=>Promise.reject(h))).sessionInfo}}finally{t==null||t._reset()}}async function Wa(r,e,t){B(t.type===as,r,"argument-error");let n=await t.verify();B(typeof n=="string",r,"argument-error");let i=Object.assign({},e);if("phoneEnrollmentInfo"in i){let s=i.phoneEnrollmentInfo.phoneNumber,o=i.phoneEnrollmentInfo.captchaResponse,c=i.phoneEnrollmentInfo.clientType,u=i.phoneEnrollmentInfo.recaptchaVersion;return Object.assign(i,{phoneEnrollmentInfo:{phoneNumber:s,recaptchaToken:n,captchaResponse:o,clientType:c,recaptchaVersion:u}}),i}else if("phoneSignInInfo"in i){let s=i.phoneSignInInfo.captchaResponse,o=i.phoneSignInInfo.clientType,c=i.phoneSignInInfo.recaptchaVersion;return Object.assign(i,{phoneSignInInfo:{recaptchaToken:n,captchaResponse:s,clientType:o,recaptchaVersion:c}}),i}else return Object.assign(i,{recaptchaToken:n}),i}var Qr=class r{constructor(e){this.providerId=r.PROVIDER_ID,this.auth=It(e)}verifyPhoneNumber(e,t){return pv(this.auth,e,se(t))}static credential(e,t){return Gr._fromVerification(e,t)}static credentialFromResult(e){let t=e;return r.credentialFromTaggedObject(t)}static credentialFromError(e){return r.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{phoneNumber:t,temporaryProof:n}=e;return t&&n?Gr._fromTokenResponse(t,n):null}};Qr.PROVIDER_ID="phone";Qr.PHONE_SIGN_IN_METHOD="phone";var Jr=class extends Yt{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Dn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Dn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Dn(e,this._buildIdpRequest())}_buildIdpRequest(e){let t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}};function mv(r){return hf(r.auth,new Jr(r),r.bypassAuthState)}function gv(r){let{auth:e,user:t}=r;return B(t,e,"internal-error"),Jy(t,new Jr(r),r.bypassAuthState)}async function _v(r){let{auth:e,user:t}=r;return B(t,e,"internal-error"),Qy(t,new Jr(r),r.bypassAuthState)}var ac=class{constructor(e,t,n,i,s=!1){this.auth=e,this.resolver=n,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(n){this.reject(n)}})}async onAuthEvent(e){let{urlResponse:t,sessionId:n,postBody:i,tenantId:s,error:o,type:c}=e;if(o){this.reject(o);return}let u={auth:this.auth,requestUri:t,sessionId:n,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return mv;case"linkViaPopup":case"linkViaRedirect":return _v;case"reauthViaPopup":case"reauthViaRedirect":return gv;default:st(this.auth,"internal-error")}}resolve(e){Qt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Qt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}};var yv=new Jt(2e3,1e4);var cc=class r extends ac{constructor(e,t,n,i,s){super(e,t,i,s),this.provider=n,this.authWindow=null,this.pollId=null,r.currentPopupAction&&r.currentPopupAction.cancel(),r.currentPopupAction=this}async executeNotNull(){let e=await this.execute();return B(e,this.auth,"internal-error"),e}async onExecution(){Qt(this.filter.length===1,"Popup operations only handle one event");let e=mf();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Cn(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Cn(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,r.currentPopupAction=null}pollUserCancellation(){let e=()=>{var t,n;if(!((n=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||n===void 0)&&n.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Cn(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,yv.get())};e()}};cc.currentPopupAction=null;var Yw=10*60*1e3;var Xw=new Jt(3e4,6e4);var Zw=new Jt(5e3,15e3);var eE=encodeURIComponent("fac");var Ts=class{constructor(e){this.factorId=e}_process(e,t,n){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,n);case"signin":return this._finalizeSignIn(e,t.credential);default:return He("unexpected MultiFactorSessionType")}}},uc=class r extends Ts{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new r(e)}_finalizeEnroll(e,t,n){return Xy(e,{idToken:t,displayName:n,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,t){return dv(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()})}},As=class{constructor(){}static assertion(e){return uc._fromCredential(e)}};As.FACTOR_ID="phone";var bs=class{static assertionForEnrollment(e,t){return Ss._fromSecret(e,t)}static assertionForSignIn(e,t){return Ss._fromEnrollmentId(e,t)}static async generateSecret(e){var t;let n=e;B(typeof((t=n.user)===null||t===void 0?void 0:t.auth)!="undefined","internal-error");let i=await Zy(n.user.auth,{idToken:n.credential,totpEnrollmentInfo:{}});return Rs._fromStartTotpMfaEnrollmentResponse(i,n.user.auth)}};bs.FACTOR_ID="totp";var Ss=class r extends Ts{constructor(e,t,n){super("totp"),this.otp=e,this.enrollmentId=t,this.secret=n}static _fromSecret(e,t){return new r(t,void 0,e)}static _fromEnrollmentId(e,t){return new r(t,e)}async _finalizeEnroll(e,t,n){return B(typeof this.secret!="undefined",e,"argument-error"),ev(e,{idToken:t,displayName:n,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)})}async _finalizeSignIn(e,t){B(this.enrollmentId!==void 0&&this.otp!==void 0,e,"argument-error");let n={verificationCode:this.otp};return fv(e,{mfaPendingCredential:t,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:n})}},Rs=class r{constructor(e,t,n,i,s,o,c){this.sessionInfo=o,this.auth=c,this.secretKey=e,this.hashingAlgorithm=t,this.codeLength=n,this.codeIntervalSeconds=i,this.enrollmentCompletionDeadline=s}static _fromStartTotpMfaEnrollmentResponse(e,t){return new r(e.totpSessionInfo.sharedSecretKey,e.totpSessionInfo.hashingAlgorithm,e.totpSessionInfo.verificationCodeLength,e.totpSessionInfo.periodSec,new Date(e.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),e.totpSessionInfo.sessionInfo,t)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,t){var n;let i=!1;return(ss(e)||ss(t))&&(i=!0),i&&(ss(e)&&(e=((n=this.auth.currentUser)===null||n===void 0?void 0:n.email)||"unknownuser"),ss(t)&&(t=this.auth.name)),`otpauth://totp/${t}:${e}?secret=${this.secretKey}&issuer=${t}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`}};function ss(r){return typeof r=="undefined"||(r==null?void 0:r.length)===0}var $d="@firebase/auth",Kd="1.8.1";var lc=class{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;let t=this.auth.onIdTokenChanged(n=>{e((n==null?void 0:n.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();let t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){B(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}};function vv(r){switch(r){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Iv(r){gt(new Be("auth",(e,{options:t})=>{let n=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=n.options;B(o&&!o.includes(":"),"invalid-api-key",{appName:n.name});let u={apiKey:o,authDomain:c,clientPlatform:r,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:cf(r)},h=new Za(n,i,s,u);return xy(h,t),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,n)=>{e.getProvider("auth-internal").initialize()})),gt(new Be("auth-internal",e=>{let t=It(e.getProvider("auth").getImmediate());return(n=>new lc(n))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),ze($d,Kd,vv(r)),ze($d,Kd,"esm2017")}var wv=5*60,tE=ld("authIdTokenMaxAge")||wv;function Ev(){var r,e;return(e=(r=document.getElementsByTagName("head"))===null||r===void 0?void 0:r[0])!==null&&e!==void 0?e:document}Py({loadJS(r){return new Promise((e,t)=>{let n=document.createElement("script");n.setAttribute("src",r),n.onload=e,n.onerror=i=>{let s=Cn("internal-error");s.customData=i,t(s)},n.type="text/javascript",n.charset="UTF-8",Ev().appendChild(n)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});Iv("Browser");var vf=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{},If={};var wt,Ac;(function(){var r;function e(I,g){function y(){}y.prototype=g.prototype,I.D=g.prototype,I.prototype=new y,I.prototype.constructor=I,I.C=function(w,E,A){for(var _=Array(arguments.length-2),et=2;et<arguments.length;et++)_[et-2]=arguments[et];return g.prototype[E].apply(w,_)}}function t(){this.blockSize=-1}function n(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(n,t),n.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(I,g,y){y||(y=0);var w=Array(16);if(typeof g=="string")for(var E=0;16>E;++E)w[E]=g.charCodeAt(y++)|g.charCodeAt(y++)<<8|g.charCodeAt(y++)<<16|g.charCodeAt(y++)<<24;else for(E=0;16>E;++E)w[E]=g[y++]|g[y++]<<8|g[y++]<<16|g[y++]<<24;g=I.g[0],y=I.g[1],E=I.g[2];var A=I.g[3],_=g+(A^y&(E^A))+w[0]+3614090360&4294967295;g=y+(_<<7&4294967295|_>>>25),_=A+(E^g&(y^E))+w[1]+3905402710&4294967295,A=g+(_<<12&4294967295|_>>>20),_=E+(y^A&(g^y))+w[2]+606105819&4294967295,E=A+(_<<17&4294967295|_>>>15),_=y+(g^E&(A^g))+w[3]+3250441966&4294967295,y=E+(_<<22&4294967295|_>>>10),_=g+(A^y&(E^A))+w[4]+4118548399&4294967295,g=y+(_<<7&4294967295|_>>>25),_=A+(E^g&(y^E))+w[5]+1200080426&4294967295,A=g+(_<<12&4294967295|_>>>20),_=E+(y^A&(g^y))+w[6]+2821735955&4294967295,E=A+(_<<17&4294967295|_>>>15),_=y+(g^E&(A^g))+w[7]+4249261313&4294967295,y=E+(_<<22&4294967295|_>>>10),_=g+(A^y&(E^A))+w[8]+1770035416&4294967295,g=y+(_<<7&4294967295|_>>>25),_=A+(E^g&(y^E))+w[9]+2336552879&4294967295,A=g+(_<<12&4294967295|_>>>20),_=E+(y^A&(g^y))+w[10]+4294925233&4294967295,E=A+(_<<17&4294967295|_>>>15),_=y+(g^E&(A^g))+w[11]+2304563134&4294967295,y=E+(_<<22&4294967295|_>>>10),_=g+(A^y&(E^A))+w[12]+1804603682&4294967295,g=y+(_<<7&4294967295|_>>>25),_=A+(E^g&(y^E))+w[13]+4254626195&4294967295,A=g+(_<<12&4294967295|_>>>20),_=E+(y^A&(g^y))+w[14]+2792965006&4294967295,E=A+(_<<17&4294967295|_>>>15),_=y+(g^E&(A^g))+w[15]+1236535329&4294967295,y=E+(_<<22&4294967295|_>>>10),_=g+(E^A&(y^E))+w[1]+4129170786&4294967295,g=y+(_<<5&4294967295|_>>>27),_=A+(y^E&(g^y))+w[6]+3225465664&4294967295,A=g+(_<<9&4294967295|_>>>23),_=E+(g^y&(A^g))+w[11]+643717713&4294967295,E=A+(_<<14&4294967295|_>>>18),_=y+(A^g&(E^A))+w[0]+3921069994&4294967295,y=E+(_<<20&4294967295|_>>>12),_=g+(E^A&(y^E))+w[5]+3593408605&4294967295,g=y+(_<<5&4294967295|_>>>27),_=A+(y^E&(g^y))+w[10]+38016083&4294967295,A=g+(_<<9&4294967295|_>>>23),_=E+(g^y&(A^g))+w[15]+3634488961&4294967295,E=A+(_<<14&4294967295|_>>>18),_=y+(A^g&(E^A))+w[4]+3889429448&4294967295,y=E+(_<<20&4294967295|_>>>12),_=g+(E^A&(y^E))+w[9]+568446438&4294967295,g=y+(_<<5&4294967295|_>>>27),_=A+(y^E&(g^y))+w[14]+3275163606&4294967295,A=g+(_<<9&4294967295|_>>>23),_=E+(g^y&(A^g))+w[3]+4107603335&4294967295,E=A+(_<<14&4294967295|_>>>18),_=y+(A^g&(E^A))+w[8]+1163531501&4294967295,y=E+(_<<20&4294967295|_>>>12),_=g+(E^A&(y^E))+w[13]+2850285829&4294967295,g=y+(_<<5&4294967295|_>>>27),_=A+(y^E&(g^y))+w[2]+4243563512&4294967295,A=g+(_<<9&4294967295|_>>>23),_=E+(g^y&(A^g))+w[7]+1735328473&4294967295,E=A+(_<<14&4294967295|_>>>18),_=y+(A^g&(E^A))+w[12]+2368359562&4294967295,y=E+(_<<20&4294967295|_>>>12),_=g+(y^E^A)+w[5]+4294588738&4294967295,g=y+(_<<4&4294967295|_>>>28),_=A+(g^y^E)+w[8]+2272392833&4294967295,A=g+(_<<11&4294967295|_>>>21),_=E+(A^g^y)+w[11]+1839030562&4294967295,E=A+(_<<16&4294967295|_>>>16),_=y+(E^A^g)+w[14]+4259657740&4294967295,y=E+(_<<23&4294967295|_>>>9),_=g+(y^E^A)+w[1]+2763975236&4294967295,g=y+(_<<4&4294967295|_>>>28),_=A+(g^y^E)+w[4]+1272893353&4294967295,A=g+(_<<11&4294967295|_>>>21),_=E+(A^g^y)+w[7]+4139469664&4294967295,E=A+(_<<16&4294967295|_>>>16),_=y+(E^A^g)+w[10]+3200236656&4294967295,y=E+(_<<23&4294967295|_>>>9),_=g+(y^E^A)+w[13]+681279174&4294967295,g=y+(_<<4&4294967295|_>>>28),_=A+(g^y^E)+w[0]+3936430074&4294967295,A=g+(_<<11&4294967295|_>>>21),_=E+(A^g^y)+w[3]+3572445317&4294967295,E=A+(_<<16&4294967295|_>>>16),_=y+(E^A^g)+w[6]+76029189&4294967295,y=E+(_<<23&4294967295|_>>>9),_=g+(y^E^A)+w[9]+3654602809&4294967295,g=y+(_<<4&4294967295|_>>>28),_=A+(g^y^E)+w[12]+3873151461&4294967295,A=g+(_<<11&4294967295|_>>>21),_=E+(A^g^y)+w[15]+530742520&4294967295,E=A+(_<<16&4294967295|_>>>16),_=y+(E^A^g)+w[2]+3299628645&4294967295,y=E+(_<<23&4294967295|_>>>9),_=g+(E^(y|~A))+w[0]+4096336452&4294967295,g=y+(_<<6&4294967295|_>>>26),_=A+(y^(g|~E))+w[7]+1126891415&4294967295,A=g+(_<<10&4294967295|_>>>22),_=E+(g^(A|~y))+w[14]+2878612391&4294967295,E=A+(_<<15&4294967295|_>>>17),_=y+(A^(E|~g))+w[5]+4237533241&4294967295,y=E+(_<<21&4294967295|_>>>11),_=g+(E^(y|~A))+w[12]+1700485571&4294967295,g=y+(_<<6&4294967295|_>>>26),_=A+(y^(g|~E))+w[3]+2399980690&4294967295,A=g+(_<<10&4294967295|_>>>22),_=E+(g^(A|~y))+w[10]+4293915773&4294967295,E=A+(_<<15&4294967295|_>>>17),_=y+(A^(E|~g))+w[1]+2240044497&4294967295,y=E+(_<<21&4294967295|_>>>11),_=g+(E^(y|~A))+w[8]+1873313359&4294967295,g=y+(_<<6&4294967295|_>>>26),_=A+(y^(g|~E))+w[15]+4264355552&4294967295,A=g+(_<<10&4294967295|_>>>22),_=E+(g^(A|~y))+w[6]+2734768916&4294967295,E=A+(_<<15&4294967295|_>>>17),_=y+(A^(E|~g))+w[13]+1309151649&4294967295,y=E+(_<<21&4294967295|_>>>11),_=g+(E^(y|~A))+w[4]+4149444226&4294967295,g=y+(_<<6&4294967295|_>>>26),_=A+(y^(g|~E))+w[11]+3174756917&4294967295,A=g+(_<<10&4294967295|_>>>22),_=E+(g^(A|~y))+w[2]+718787259&4294967295,E=A+(_<<15&4294967295|_>>>17),_=y+(A^(E|~g))+w[9]+3951481745&4294967295,I.g[0]=I.g[0]+g&4294967295,I.g[1]=I.g[1]+(E+(_<<21&4294967295|_>>>11))&4294967295,I.g[2]=I.g[2]+E&4294967295,I.g[3]=I.g[3]+A&4294967295}n.prototype.u=function(I,g){g===void 0&&(g=I.length);for(var y=g-this.blockSize,w=this.B,E=this.h,A=0;A<g;){if(E==0)for(;A<=y;)i(this,I,A),A+=this.blockSize;if(typeof I=="string"){for(;A<g;)if(w[E++]=I.charCodeAt(A++),E==this.blockSize){i(this,w),E=0;break}}else for(;A<g;)if(w[E++]=I[A++],E==this.blockSize){i(this,w),E=0;break}}this.h=E,this.o+=g},n.prototype.v=function(){var I=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);I[0]=128;for(var g=1;g<I.length-8;++g)I[g]=0;var y=8*this.o;for(g=I.length-8;g<I.length;++g)I[g]=y&255,y/=256;for(this.u(I),I=Array(16),g=y=0;4>g;++g)for(var w=0;32>w;w+=8)I[y++]=this.g[g]>>>w&255;return I};function s(I,g){var y=c;return Object.prototype.hasOwnProperty.call(y,I)?y[I]:y[I]=g(I)}function o(I,g){this.h=g;for(var y=[],w=!0,E=I.length-1;0<=E;E--){var A=I[E]|0;w&&A==g||(y[E]=A,w=!1)}this.g=y}var c={};function u(I){return-128<=I&&128>I?s(I,function(g){return new o([g|0],0>g?-1:0)}):new o([I|0],0>I?-1:0)}function h(I){if(isNaN(I)||!isFinite(I))return m;if(0>I)return k(h(-I));for(var g=[],y=1,w=0;I>=y;w++)g[w]=I/y|0,y*=4294967296;return new o(g,0)}function f(I,g){if(I.length==0)throw Error("number format error: empty string");if(g=g||10,2>g||36<g)throw Error("radix out of range: "+g);if(I.charAt(0)=="-")return k(f(I.substring(1),g));if(0<=I.indexOf("-"))throw Error('number format error: interior "-" character');for(var y=h(Math.pow(g,8)),w=m,E=0;E<I.length;E+=8){var A=Math.min(8,I.length-E),_=parseInt(I.substring(E,E+A),g);8>A?(A=h(Math.pow(g,A)),w=w.j(A).add(h(_))):(w=w.j(y),w=w.add(h(_)))}return w}var m=u(0),v=u(1),S=u(16777216);r=o.prototype,r.m=function(){if(N(this))return-k(this).m();for(var I=0,g=1,y=0;y<this.g.length;y++){var w=this.i(y);I+=(0<=w?w:4294967296+w)*g,g*=4294967296}return I},r.toString=function(I){if(I=I||10,2>I||36<I)throw Error("radix out of range: "+I);if(D(this))return"0";if(N(this))return"-"+k(this).toString(I);for(var g=h(Math.pow(I,6)),y=this,w="";;){var E=W(y,g).g;y=z(y,E.j(g));var A=((0<y.g.length?y.g[0]:y.h)>>>0).toString(I);if(y=E,D(y))return A+w;for(;6>A.length;)A="0"+A;w=A+w}},r.i=function(I){return 0>I?0:I<this.g.length?this.g[I]:this.h};function D(I){if(I.h!=0)return!1;for(var g=0;g<I.g.length;g++)if(I.g[g]!=0)return!1;return!0}function N(I){return I.h==-1}r.l=function(I){return I=z(this,I),N(I)?-1:D(I)?0:1};function k(I){for(var g=I.g.length,y=[],w=0;w<g;w++)y[w]=~I.g[w];return new o(y,~I.h).add(v)}r.abs=function(){return N(this)?k(this):this},r.add=function(I){for(var g=Math.max(this.g.length,I.g.length),y=[],w=0,E=0;E<=g;E++){var A=w+(this.i(E)&65535)+(I.i(E)&65535),_=(A>>>16)+(this.i(E)>>>16)+(I.i(E)>>>16);w=_>>>16,A&=65535,_&=65535,y[E]=_<<16|A}return new o(y,y[y.length-1]&-2147483648?-1:0)};function z(I,g){return I.add(k(g))}r.j=function(I){if(D(this)||D(I))return m;if(N(this))return N(I)?k(this).j(k(I)):k(k(this).j(I));if(N(I))return k(this.j(k(I)));if(0>this.l(S)&&0>I.l(S))return h(this.m()*I.m());for(var g=this.g.length+I.g.length,y=[],w=0;w<2*g;w++)y[w]=0;for(w=0;w<this.g.length;w++)for(var E=0;E<I.g.length;E++){var A=this.i(w)>>>16,_=this.i(w)&65535,et=I.i(E)>>>16,_r=I.i(E)&65535;y[2*w+2*E]+=_*_r,j(y,2*w+2*E),y[2*w+2*E+1]+=A*_r,j(y,2*w+2*E+1),y[2*w+2*E+1]+=_*et,j(y,2*w+2*E+1),y[2*w+2*E+2]+=A*et,j(y,2*w+2*E+2)}for(w=0;w<g;w++)y[w]=y[2*w+1]<<16|y[2*w];for(w=g;w<2*g;w++)y[w]=0;return new o(y,0)};function j(I,g){for(;(I[g]&65535)!=I[g];)I[g+1]+=I[g]>>>16,I[g]&=65535,g++}function U(I,g){this.g=I,this.h=g}function W(I,g){if(D(g))throw Error("division by zero");if(D(I))return new U(m,m);if(N(I))return g=W(k(I),g),new U(k(g.g),k(g.h));if(N(g))return g=W(I,k(g)),new U(k(g.g),g.h);if(30<I.g.length){if(N(I)||N(g))throw Error("slowDivide_ only works with positive integers.");for(var y=v,w=g;0>=w.l(I);)y=Y(y),w=Y(w);var E=G(y,1),A=G(w,1);for(w=G(w,2),y=G(y,2);!D(w);){var _=A.add(w);0>=_.l(I)&&(E=E.add(y),A=_),w=G(w,1),y=G(y,1)}return g=z(I,E.j(g)),new U(E,g)}for(E=m;0<=I.l(g);){for(y=Math.max(1,Math.floor(I.m()/g.m())),w=Math.ceil(Math.log(y)/Math.LN2),w=48>=w?1:Math.pow(2,w-48),A=h(y),_=A.j(g);N(_)||0<_.l(I);)y-=w,A=h(y),_=A.j(g);D(A)&&(A=v),E=E.add(A),I=z(I,_)}return new U(E,I)}r.A=function(I){return W(this,I).h},r.and=function(I){for(var g=Math.max(this.g.length,I.g.length),y=[],w=0;w<g;w++)y[w]=this.i(w)&I.i(w);return new o(y,this.h&I.h)},r.or=function(I){for(var g=Math.max(this.g.length,I.g.length),y=[],w=0;w<g;w++)y[w]=this.i(w)|I.i(w);return new o(y,this.h|I.h)},r.xor=function(I){for(var g=Math.max(this.g.length,I.g.length),y=[],w=0;w<g;w++)y[w]=this.i(w)^I.i(w);return new o(y,this.h^I.h)};function Y(I){for(var g=I.g.length+1,y=[],w=0;w<g;w++)y[w]=I.i(w)<<1|I.i(w-1)>>>31;return new o(y,I.h)}function G(I,g){var y=g>>5;g%=32;for(var w=I.g.length-y,E=[],A=0;A<w;A++)E[A]=0<g?I.i(A+y)>>>g|I.i(A+y+1)<<32-g:I.i(A+y);return new o(E,I.h)}n.prototype.digest=n.prototype.v,n.prototype.reset=n.prototype.s,n.prototype.update=n.prototype.u,Ac=If.Md5=n,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=h,o.fromString=f,wt=If.Integer=o}).apply(typeof vf!="undefined"?vf:typeof self!="undefined"?self:typeof window!="undefined"?window:{});var Ds=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{},ot={};var bc,Tv,Vn,Sc,Yr,ks,Rc,Pc,Cc;(function(){var r,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,l,d){return a==Array.prototype||a==Object.prototype||(a[l]=d.value),a};function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof Ds=="object"&&Ds];for(var l=0;l<a.length;++l){var d=a[l];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var n=t(this);function i(a,l){if(l)e:{var d=n;a=a.split(".");for(var p=0;p<a.length-1;p++){var T=a[p];if(!(T in d))break e;d=d[T]}a=a[a.length-1],p=d[a],l=l(p),l!=p&&l!=null&&e(d,a,{configurable:!0,writable:!0,value:l})}}function s(a,l){a instanceof String&&(a+="");var d=0,p=!1,T={next:function(){if(!p&&d<a.length){var R=d++;return{value:l(R,a[R]),done:!1}}return p=!0,{done:!0,value:void 0}}};return T[Symbol.iterator]=function(){return T},T}i("Array.prototype.values",function(a){return a||function(){return s(this,function(l,d){return d})}});var o=o||{},c=this||self;function u(a){var l=typeof a;return l=l!="object"?l:a?Array.isArray(a)?"array":l:"null",l=="array"||l=="object"&&typeof a.length=="number"}function h(a){var l=typeof a;return l=="object"&&a!=null||l=="function"}function f(a,l,d){return a.call.apply(a.bind,arguments)}function m(a,l,d){if(!a)throw Error();if(2<arguments.length){var p=Array.prototype.slice.call(arguments,2);return function(){var T=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(T,p),a.apply(l,T)}}return function(){return a.apply(l,arguments)}}function v(a,l,d){return v=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:m,v.apply(null,arguments)}function S(a,l){var d=Array.prototype.slice.call(arguments,1);return function(){var p=d.slice();return p.push.apply(p,arguments),a.apply(this,p)}}function D(a,l){function d(){}d.prototype=l.prototype,a.aa=l.prototype,a.prototype=new d,a.prototype.constructor=a,a.Qb=function(p,T,R){for(var O=Array(arguments.length-2),ne=2;ne<arguments.length;ne++)O[ne-2]=arguments[ne];return l.prototype[T].apply(p,O)}}function N(a){let l=a.length;if(0<l){let d=Array(l);for(let p=0;p<l;p++)d[p]=a[p];return d}return[]}function k(a,l){for(let d=1;d<arguments.length;d++){let p=arguments[d];if(u(p)){let T=a.length||0,R=p.length||0;a.length=T+R;for(let O=0;O<R;O++)a[T+O]=p[O]}else a.push(p)}}class z{constructor(l,d){this.i=l,this.j=d,this.h=0,this.g=null}get(){let l;return 0<this.h?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function j(a){return/^[\s\xa0]*$/.test(a)}function U(){var a=c.navigator;return a&&(a=a.userAgent)?a:""}function W(a){return W[" "](a),a}W[" "]=function(){};var Y=U().indexOf("Gecko")!=-1&&!(U().toLowerCase().indexOf("webkit")!=-1&&U().indexOf("Edge")==-1)&&!(U().indexOf("Trident")!=-1||U().indexOf("MSIE")!=-1)&&U().indexOf("Edge")==-1;function G(a,l,d){for(let p in a)l.call(d,a[p],p,a)}function I(a,l){for(let d in a)l.call(void 0,a[d],d,a)}function g(a){let l={};for(let d in a)l[d]=a[d];return l}let y="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function w(a,l){let d,p;for(let T=1;T<arguments.length;T++){p=arguments[T];for(d in p)a[d]=p[d];for(let R=0;R<y.length;R++)d=y[R],Object.prototype.hasOwnProperty.call(p,d)&&(a[d]=p[d])}}function E(a){var l=1;a=a.split(":");let d=[];for(;0<l&&a.length;)d.push(a.shift()),l--;return a.length&&d.push(a.join(":")),d}function A(a){c.setTimeout(()=>{throw a},0)}function _(){var a=Zo;let l=null;return a.g&&(l=a.g,a.g=a.g.next,a.g||(a.h=null),l.next=null),l}class et{constructor(){this.h=this.g=null}add(l,d){let p=_r.get();p.set(l,d),this.h?this.h.next=p:this.g=p,this.h=p}}var _r=new z(()=>new dg,a=>a.reset());class dg{constructor(){this.next=this.g=this.h=null}set(l,d){this.h=l,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let yr,vr=!1,Zo=new et,sh=()=>{let a=c.Promise.resolve(void 0);yr=()=>{a.then(fg)}};var fg=()=>{for(var a;a=_();){try{a.h.call(a.g)}catch(d){A(d)}var l=_r;l.j(a),100>l.h&&(l.h++,a.next=l.g,l.g=a)}vr=!1};function lt(){this.s=this.s,this.C=this.C}lt.prototype.s=!1,lt.prototype.ma=function(){this.s||(this.s=!0,this.N())},lt.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function we(a,l){this.type=a,this.g=this.target=l,this.defaultPrevented=!1}we.prototype.h=function(){this.defaultPrevented=!0};var pg=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var a=!1,l=Object.defineProperty({},"passive",{get:function(){a=!0}});try{let d=()=>{};c.addEventListener("test",d,l),c.removeEventListener("test",d,l)}catch{}return a}();function Ir(a,l){if(we.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var d=this.type=a.type,p=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=l,l=a.relatedTarget){if(Y){e:{try{W(l.nodeName);var T=!0;break e}catch{}T=!1}T||(l=null)}}else d=="mouseover"?l=a.fromElement:d=="mouseout"&&(l=a.toElement);this.relatedTarget=l,p?(this.clientX=p.clientX!==void 0?p.clientX:p.pageX,this.clientY=p.clientY!==void 0?p.clientY:p.pageY,this.screenX=p.screenX||0,this.screenY=p.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:mg[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&Ir.aa.h.call(this)}}D(Ir,we);var mg={2:"touch",3:"pen",4:"mouse"};Ir.prototype.h=function(){Ir.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var wr="closure_listenable_"+(1e6*Math.random()|0),gg=0;function _g(a,l,d,p,T){this.listener=a,this.proxy=null,this.src=l,this.type=d,this.capture=!!p,this.ha=T,this.key=++gg,this.da=this.fa=!1}function Vi(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function Li(a){this.src=a,this.g={},this.h=0}Li.prototype.add=function(a,l,d,p,T){var R=a.toString();a=this.g[R],a||(a=this.g[R]=[],this.h++);var O=ta(a,l,p,T);return-1<O?(l=a[O],d||(l.fa=!1)):(l=new _g(l,this.src,R,!!p,T),l.fa=d,a.push(l)),l};function ea(a,l){var d=l.type;if(d in a.g){var p=a.g[d],T=Array.prototype.indexOf.call(p,l,void 0),R;(R=0<=T)&&Array.prototype.splice.call(p,T,1),R&&(Vi(l),a.g[d].length==0&&(delete a.g[d],a.h--))}}function ta(a,l,d,p){for(var T=0;T<a.length;++T){var R=a[T];if(!R.da&&R.listener==l&&R.capture==!!d&&R.ha==p)return T}return-1}var na="closure_lm_"+(1e6*Math.random()|0),ra={};function oh(a,l,d,p,T){if(p&&p.once)return ch(a,l,d,p,T);if(Array.isArray(l)){for(var R=0;R<l.length;R++)oh(a,l[R],d,p,T);return null}return d=aa(d),a&&a[wr]?a.K(l,d,h(p)?!!p.capture:!!p,T):ah(a,l,d,!1,p,T)}function ah(a,l,d,p,T,R){if(!l)throw Error("Invalid event type");var O=h(T)?!!T.capture:!!T,ne=sa(a);if(ne||(a[na]=ne=new Li(a)),d=ne.add(l,d,p,O,R),d.proxy)return d;if(p=yg(),d.proxy=p,p.src=a,p.listener=d,a.addEventListener)pg||(T=O),T===void 0&&(T=!1),a.addEventListener(l.toString(),p,T);else if(a.attachEvent)a.attachEvent(lh(l.toString()),p);else if(a.addListener&&a.removeListener)a.addListener(p);else throw Error("addEventListener and attachEvent are unavailable.");return d}function yg(){function a(d){return l.call(a.src,a.listener,d)}let l=vg;return a}function ch(a,l,d,p,T){if(Array.isArray(l)){for(var R=0;R<l.length;R++)ch(a,l[R],d,p,T);return null}return d=aa(d),a&&a[wr]?a.L(l,d,h(p)?!!p.capture:!!p,T):ah(a,l,d,!0,p,T)}function uh(a,l,d,p,T){if(Array.isArray(l))for(var R=0;R<l.length;R++)uh(a,l[R],d,p,T);else p=h(p)?!!p.capture:!!p,d=aa(d),a&&a[wr]?(a=a.i,l=String(l).toString(),l in a.g&&(R=a.g[l],d=ta(R,d,p,T),-1<d&&(Vi(R[d]),Array.prototype.splice.call(R,d,1),R.length==0&&(delete a.g[l],a.h--)))):a&&(a=sa(a))&&(l=a.g[l.toString()],a=-1,l&&(a=ta(l,d,p,T)),(d=-1<a?l[a]:null)&&ia(d))}function ia(a){if(typeof a!="number"&&a&&!a.da){var l=a.src;if(l&&l[wr])ea(l.i,a);else{var d=a.type,p=a.proxy;l.removeEventListener?l.removeEventListener(d,p,a.capture):l.detachEvent?l.detachEvent(lh(d),p):l.addListener&&l.removeListener&&l.removeListener(p),(d=sa(l))?(ea(d,a),d.h==0&&(d.src=null,l[na]=null)):Vi(a)}}}function lh(a){return a in ra?ra[a]:ra[a]="on"+a}function vg(a,l){if(a.da)a=!0;else{l=new Ir(l,this);var d=a.listener,p=a.ha||a.src;a.fa&&ia(a),a=d.call(p,l)}return a}function sa(a){return a=a[na],a instanceof Li?a:null}var oa="__closure_events_fn_"+(1e9*Math.random()>>>0);function aa(a){return typeof a=="function"?a:(a[oa]||(a[oa]=function(l){return a.handleEvent(l)}),a[oa])}function Ee(){lt.call(this),this.i=new Li(this),this.M=this,this.F=null}D(Ee,lt),Ee.prototype[wr]=!0,Ee.prototype.removeEventListener=function(a,l,d,p){uh(this,a,l,d,p)};function Pe(a,l){var d,p=a.F;if(p)for(d=[];p;p=p.F)d.push(p);if(a=a.M,p=l.type||l,typeof l=="string")l=new we(l,a);else if(l instanceof we)l.target=l.target||a;else{var T=l;l=new we(p,a),w(l,T)}if(T=!0,d)for(var R=d.length-1;0<=R;R--){var O=l.g=d[R];T=Mi(O,p,!0,l)&&T}if(O=l.g=a,T=Mi(O,p,!0,l)&&T,T=Mi(O,p,!1,l)&&T,d)for(R=0;R<d.length;R++)O=l.g=d[R],T=Mi(O,p,!1,l)&&T}Ee.prototype.N=function(){if(Ee.aa.N.call(this),this.i){var a=this.i,l;for(l in a.g){for(var d=a.g[l],p=0;p<d.length;p++)Vi(d[p]);delete a.g[l],a.h--}}this.F=null},Ee.prototype.K=function(a,l,d,p){return this.i.add(String(a),l,!1,d,p)},Ee.prototype.L=function(a,l,d,p){return this.i.add(String(a),l,!0,d,p)};function Mi(a,l,d,p){if(l=a.i.g[String(l)],!l)return!0;l=l.concat();for(var T=!0,R=0;R<l.length;++R){var O=l[R];if(O&&!O.da&&O.capture==d){var ne=O.listener,ye=O.ha||O.src;O.fa&&ea(a.i,O),T=ne.call(ye,p)!==!1&&T}}return T&&!p.defaultPrevented}function hh(a,l,d){if(typeof a=="function")d&&(a=v(a,d));else if(a&&typeof a.handleEvent=="function")a=v(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(l)?-1:c.setTimeout(a,l||0)}function dh(a){a.g=hh(()=>{a.g=null,a.i&&(a.i=!1,dh(a))},a.l);let l=a.h;a.h=null,a.m.apply(null,l)}class Ig extends lt{constructor(l,d){super(),this.m=l,this.l=d,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:dh(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Er(a){lt.call(this),this.h=a,this.g={}}D(Er,lt);var fh=[];function ph(a){G(a.g,function(l,d){this.g.hasOwnProperty(d)&&ia(l)},a),a.g={}}Er.prototype.N=function(){Er.aa.N.call(this),ph(this)},Er.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var ca=c.JSON.stringify,wg=c.JSON.parse,Eg=class{stringify(a){return c.JSON.stringify(a,void 0)}parse(a){return c.JSON.parse(a,void 0)}};function ua(){}ua.prototype.h=null;function mh(a){return a.h||(a.h=a.i())}function gh(){}var Tr={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function la(){we.call(this,"d")}D(la,we);function ha(){we.call(this,"c")}D(ha,we);var qt={},_h=null;function Fi(){return _h=_h||new Ee}qt.La="serverreachability";function yh(a){we.call(this,qt.La,a)}D(yh,we);function Ar(a){let l=Fi();Pe(l,new yh(l))}qt.STAT_EVENT="statevent";function vh(a,l){we.call(this,qt.STAT_EVENT,a),this.stat=l}D(vh,we);function Ce(a){let l=Fi();Pe(l,new vh(l,a))}qt.Ma="timingevent";function Ih(a,l){we.call(this,qt.Ma,a),this.size=l}D(Ih,we);function br(a,l){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){a()},l)}function Sr(){this.g=!0}Sr.prototype.xa=function(){this.g=!1};function Tg(a,l,d,p,T,R){a.info(function(){if(a.g)if(R)for(var O="",ne=R.split("&"),ye=0;ye<ne.length;ye++){var X=ne[ye].split("=");if(1<X.length){var Te=X[0];X=X[1];var Ae=Te.split("_");O=2<=Ae.length&&Ae[1]=="type"?O+(Te+"="+X+"&"):O+(Te+"=redacted&")}}else O=null;else O=R;return"XMLHTTP REQ ("+p+") [attempt "+T+"]: "+l+`
`+d+`
`+O})}function Ag(a,l,d,p,T,R,O){a.info(function(){return"XMLHTTP RESP ("+p+") [ attempt "+T+"]: "+l+`
`+d+`
`+R+" "+O})}function En(a,l,d,p){a.info(function(){return"XMLHTTP TEXT ("+l+"): "+Sg(a,d)+(p?" "+p:"")})}function bg(a,l){a.info(function(){return"TIMEOUT: "+l})}Sr.prototype.info=function(){};function Sg(a,l){if(!a.g)return l;if(!l)return null;try{var d=JSON.parse(l);if(d){for(a=0;a<d.length;a++)if(Array.isArray(d[a])){var p=d[a];if(!(2>p.length)){var T=p[1];if(Array.isArray(T)&&!(1>T.length)){var R=T[0];if(R!="noop"&&R!="stop"&&R!="close")for(var O=1;O<T.length;O++)T[O]=""}}}}return ca(d)}catch{return l}}var Ui={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},wh={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},da;function Bi(){}D(Bi,ua),Bi.prototype.g=function(){return new XMLHttpRequest},Bi.prototype.i=function(){return{}},da=new Bi;function ht(a,l,d,p){this.j=a,this.i=l,this.l=d,this.R=p||1,this.U=new Er(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Eh}function Eh(){this.i=null,this.g="",this.h=!1}var Th={},fa={};function pa(a,l,d){a.L=1,a.v=Gi(tt(l)),a.m=d,a.P=!0,Ah(a,null)}function Ah(a,l){a.F=Date.now(),qi(a),a.A=tt(a.v);var d=a.A,p=a.R;Array.isArray(p)||(p=[String(p)]),Fh(d.i,"t",p),a.C=0,d=a.j.J,a.h=new Eh,a.g=nd(a.j,d?l:null,!a.m),0<a.O&&(a.M=new Ig(v(a.Y,a,a.g),a.O)),l=a.U,d=a.g,p=a.ca;var T="readystatechange";Array.isArray(T)||(T&&(fh[0]=T.toString()),T=fh);for(var R=0;R<T.length;R++){var O=oh(d,T[R],p||l.handleEvent,!1,l.h||l);if(!O)break;l.g[O.key]=O}l=a.H?g(a.H):{},a.m?(a.u||(a.u="POST"),l["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,l)):(a.u="GET",a.g.ea(a.A,a.u,null,l)),Ar(),Tg(a.i,a.u,a.A,a.l,a.R,a.m)}ht.prototype.ca=function(a){a=a.target;let l=this.M;l&&nt(a)==3?l.j():this.Y(a)},ht.prototype.Y=function(a){try{if(a==this.g)e:{let Ae=nt(this.g);var l=this.g.Ba();let bn=this.g.Z();if(!(3>Ae)&&(Ae!=3||this.g&&(this.h.h||this.g.oa()||$h(this.g)))){this.J||Ae!=4||l==7||(l==8||0>=bn?Ar(3):Ar(2)),ma(this);var d=this.g.Z();this.X=d;t:if(bh(this)){var p=$h(this.g);a="";var T=p.length,R=nt(this.g)==4;if(!this.h.i){if(typeof TextDecoder=="undefined"){jt(this),Rr(this);var O="";break t}this.h.i=new c.TextDecoder}for(l=0;l<T;l++)this.h.h=!0,a+=this.h.i.decode(p[l],{stream:!(R&&l==T-1)});p.length=0,this.h.g+=a,this.C=0,O=this.h.g}else O=this.g.oa();if(this.o=d==200,Ag(this.i,this.u,this.A,this.l,this.R,Ae,d),this.o){if(this.T&&!this.K){t:{if(this.g){var ne,ye=this.g;if((ne=ye.g?ye.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!j(ne)){var X=ne;break t}}X=null}if(d=X)En(this.i,this.l,d,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,ga(this,d);else{this.o=!1,this.s=3,Ce(12),jt(this),Rr(this);break e}}if(this.P){d=!0;let je;for(;!this.J&&this.C<O.length;)if(je=Rg(this,O),je==fa){Ae==4&&(this.s=4,Ce(14),d=!1),En(this.i,this.l,null,"[Incomplete Response]");break}else if(je==Th){this.s=4,Ce(15),En(this.i,this.l,O,"[Invalid Chunk]"),d=!1;break}else En(this.i,this.l,je,null),ga(this,je);if(bh(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Ae!=4||O.length!=0||this.h.h||(this.s=1,Ce(16),d=!1),this.o=this.o&&d,!d)En(this.i,this.l,O,"[Invalid Chunked Response]"),jt(this),Rr(this);else if(0<O.length&&!this.W){this.W=!0;var Te=this.j;Te.g==this&&Te.ba&&!Te.M&&(Te.j.info("Great, no buffering proxy detected. Bytes received: "+O.length),Ea(Te),Te.M=!0,Ce(11))}}else En(this.i,this.l,O,null),ga(this,O);Ae==4&&jt(this),this.o&&!this.J&&(Ae==4?Xh(this.j,this):(this.o=!1,qi(this)))}else Gg(this.g),d==400&&0<O.indexOf("Unknown SID")?(this.s=3,Ce(12)):(this.s=0,Ce(13)),jt(this),Rr(this)}}}catch{}finally{}};function bh(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function Rg(a,l){var d=a.C,p=l.indexOf(`
`,d);return p==-1?fa:(d=Number(l.substring(d,p)),isNaN(d)?Th:(p+=1,p+d>l.length?fa:(l=l.slice(p,p+d),a.C=p+d,l)))}ht.prototype.cancel=function(){this.J=!0,jt(this)};function qi(a){a.S=Date.now()+a.I,Sh(a,a.I)}function Sh(a,l){if(a.B!=null)throw Error("WatchDog timer not null");a.B=br(v(a.ba,a),l)}function ma(a){a.B&&(c.clearTimeout(a.B),a.B=null)}ht.prototype.ba=function(){this.B=null;let a=Date.now();0<=a-this.S?(bg(this.i,this.A),this.L!=2&&(Ar(),Ce(17)),jt(this),this.s=2,Rr(this)):Sh(this,this.S-a)};function Rr(a){a.j.G==0||a.J||Xh(a.j,a)}function jt(a){ma(a);var l=a.M;l&&typeof l.ma=="function"&&l.ma(),a.M=null,ph(a.U),a.g&&(l=a.g,a.g=null,l.abort(),l.ma())}function ga(a,l){try{var d=a.j;if(d.G!=0&&(d.g==a||_a(d.h,a))){if(!a.K&&_a(d.h,a)&&d.G==3){try{var p=d.Da.g.parse(l)}catch{p=null}if(Array.isArray(p)&&p.length==3){var T=p;if(T[0]==0){e:if(!d.u){if(d.g)if(d.g.F+3e3<a.F)Qi(d),Wi(d);else break e;wa(d),Ce(18)}}else d.za=T[1],0<d.za-d.T&&37500>T[2]&&d.F&&d.v==0&&!d.C&&(d.C=br(v(d.Za,d),6e3));if(1>=Ch(d.h)&&d.ca){try{d.ca()}catch{}d.ca=void 0}}else Gt(d,11)}else if((a.K||d.g==a)&&Qi(d),!j(l))for(T=d.Da.g.parse(l),l=0;l<T.length;l++){let X=T[l];if(d.T=X[0],X=X[1],d.G==2)if(X[0]=="c"){d.K=X[1],d.ia=X[2];let Te=X[3];Te!=null&&(d.la=Te,d.j.info("VER="+d.la));let Ae=X[4];Ae!=null&&(d.Aa=Ae,d.j.info("SVER="+d.Aa));let bn=X[5];bn!=null&&typeof bn=="number"&&0<bn&&(p=1.5*bn,d.L=p,d.j.info("backChannelRequestTimeoutMs_="+p)),p=d;let je=a.g;if(je){let Yi=je.g?je.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Yi){var R=p.h;R.g||Yi.indexOf("spdy")==-1&&Yi.indexOf("quic")==-1&&Yi.indexOf("h2")==-1||(R.j=R.l,R.g=new Set,R.h&&(ya(R,R.h),R.h=null))}if(p.D){let Ta=je.g?je.g.getResponseHeader("X-HTTP-Session-Id"):null;Ta&&(p.ya=Ta,re(p.I,p.D,Ta))}}d.G=3,d.l&&d.l.ua(),d.ba&&(d.R=Date.now()-a.F,d.j.info("Handshake RTT: "+d.R+"ms")),p=d;var O=a;if(p.qa=td(p,p.J?p.ia:null,p.W),O.K){Dh(p.h,O);var ne=O,ye=p.L;ye&&(ne.I=ye),ne.B&&(ma(ne),qi(ne)),p.g=O}else Jh(p);0<d.i.length&&Hi(d)}else X[0]!="stop"&&X[0]!="close"||Gt(d,7);else d.G==3&&(X[0]=="stop"||X[0]=="close"?X[0]=="stop"?Gt(d,7):Ia(d):X[0]!="noop"&&d.l&&d.l.ta(X),d.v=0)}}Ar(4)}catch{}}var Pg=class{constructor(a,l){this.g=a,this.map=l}};function Rh(a){this.l=a||10,c.PerformanceNavigationTiming?(a=c.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Ph(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function Ch(a){return a.h?1:a.g?a.g.size:0}function _a(a,l){return a.h?a.h==l:a.g?a.g.has(l):!1}function ya(a,l){a.g?a.g.add(l):a.h=l}function Dh(a,l){a.h&&a.h==l?a.h=null:a.g&&a.g.has(l)&&a.g.delete(l)}Rh.prototype.cancel=function(){if(this.i=kh(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(let a of this.g.values())a.cancel();this.g.clear()}};function kh(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let l=a.i;for(let d of a.g.values())l=l.concat(d.D);return l}return N(a.i)}function Cg(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map!="undefined"&&a instanceof Map||typeof Set!="undefined"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(u(a)){for(var l=[],d=a.length,p=0;p<d;p++)l.push(a[p]);return l}l=[],d=0;for(p in a)l[d++]=a[p];return l}function Dg(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map!="undefined"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set!="undefined"&&a instanceof Set)){if(u(a)||typeof a=="string"){var l=[];a=a.length;for(var d=0;d<a;d++)l.push(d);return l}l=[],d=0;for(let p in a)l[d++]=p;return l}}}function Nh(a,l){if(a.forEach&&typeof a.forEach=="function")a.forEach(l,void 0);else if(u(a)||typeof a=="string")Array.prototype.forEach.call(a,l,void 0);else for(var d=Dg(a),p=Cg(a),T=p.length,R=0;R<T;R++)l.call(void 0,p[R],d&&d[R],a)}var Oh=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function kg(a,l){if(a){a=a.split("&");for(var d=0;d<a.length;d++){var p=a[d].indexOf("="),T=null;if(0<=p){var R=a[d].substring(0,p);T=a[d].substring(p+1)}else R=a[d];l(R,T?decodeURIComponent(T.replace(/\+/g," ")):"")}}}function zt(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof zt){this.h=a.h,ji(this,a.j),this.o=a.o,this.g=a.g,zi(this,a.s),this.l=a.l;var l=a.i,d=new Dr;d.i=l.i,l.g&&(d.g=new Map(l.g),d.h=l.h),xh(this,d),this.m=a.m}else a&&(l=String(a).match(Oh))?(this.h=!1,ji(this,l[1]||"",!0),this.o=Pr(l[2]||""),this.g=Pr(l[3]||"",!0),zi(this,l[4]),this.l=Pr(l[5]||"",!0),xh(this,l[6]||"",!0),this.m=Pr(l[7]||"")):(this.h=!1,this.i=new Dr(null,this.h))}zt.prototype.toString=function(){var a=[],l=this.j;l&&a.push(Cr(l,Vh,!0),":");var d=this.g;return(d||l=="file")&&(a.push("//"),(l=this.o)&&a.push(Cr(l,Vh,!0),"@"),a.push(encodeURIComponent(String(d)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.s,d!=null&&a.push(":",String(d))),(d=this.l)&&(this.g&&d.charAt(0)!="/"&&a.push("/"),a.push(Cr(d,d.charAt(0)=="/"?xg:Og,!0))),(d=this.i.toString())&&a.push("?",d),(d=this.m)&&a.push("#",Cr(d,Lg)),a.join("")};function tt(a){return new zt(a)}function ji(a,l,d){a.j=d?Pr(l,!0):l,a.j&&(a.j=a.j.replace(/:$/,""))}function zi(a,l){if(l){if(l=Number(l),isNaN(l)||0>l)throw Error("Bad port number "+l);a.s=l}else a.s=null}function xh(a,l,d){l instanceof Dr?(a.i=l,Mg(a.i,a.h)):(d||(l=Cr(l,Vg)),a.i=new Dr(l,a.h))}function re(a,l,d){a.i.set(l,d)}function Gi(a){return re(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function Pr(a,l){return a?l?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Cr(a,l,d){return typeof a=="string"?(a=encodeURI(a).replace(l,Ng),d&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function Ng(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Vh=/[#\/\?@]/g,Og=/[#\?:]/g,xg=/[#\?]/g,Vg=/[#\?@]/g,Lg=/#/g;function Dr(a,l){this.h=this.g=null,this.i=a||null,this.j=!!l}function dt(a){a.g||(a.g=new Map,a.h=0,a.i&&kg(a.i,function(l,d){a.add(decodeURIComponent(l.replace(/\+/g," ")),d)}))}r=Dr.prototype,r.add=function(a,l){dt(this),this.i=null,a=Tn(this,a);var d=this.g.get(a);return d||this.g.set(a,d=[]),d.push(l),this.h+=1,this};function Lh(a,l){dt(a),l=Tn(a,l),a.g.has(l)&&(a.i=null,a.h-=a.g.get(l).length,a.g.delete(l))}function Mh(a,l){return dt(a),l=Tn(a,l),a.g.has(l)}r.forEach=function(a,l){dt(this),this.g.forEach(function(d,p){d.forEach(function(T){a.call(l,T,p,this)},this)},this)},r.na=function(){dt(this);let a=Array.from(this.g.values()),l=Array.from(this.g.keys()),d=[];for(let p=0;p<l.length;p++){let T=a[p];for(let R=0;R<T.length;R++)d.push(l[p])}return d},r.V=function(a){dt(this);let l=[];if(typeof a=="string")Mh(this,a)&&(l=l.concat(this.g.get(Tn(this,a))));else{a=Array.from(this.g.values());for(let d=0;d<a.length;d++)l=l.concat(a[d])}return l},r.set=function(a,l){return dt(this),this.i=null,a=Tn(this,a),Mh(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[l]),this.h+=1,this},r.get=function(a,l){return a?(a=this.V(a),0<a.length?String(a[0]):l):l};function Fh(a,l,d){Lh(a,l),0<d.length&&(a.i=null,a.g.set(Tn(a,l),N(d)),a.h+=d.length)}r.toString=function(){if(this.i)return this.i;if(!this.g)return"";let a=[],l=Array.from(this.g.keys());for(var d=0;d<l.length;d++){var p=l[d];let R=encodeURIComponent(String(p)),O=this.V(p);for(p=0;p<O.length;p++){var T=R;O[p]!==""&&(T+="="+encodeURIComponent(String(O[p]))),a.push(T)}}return this.i=a.join("&")};function Tn(a,l){return l=String(l),a.j&&(l=l.toLowerCase()),l}function Mg(a,l){l&&!a.j&&(dt(a),a.i=null,a.g.forEach(function(d,p){var T=p.toLowerCase();p!=T&&(Lh(this,p),Fh(this,T,d))},a)),a.j=l}function Fg(a,l){let d=new Sr;if(c.Image){let p=new Image;p.onload=S(ft,d,"TestLoadImage: loaded",!0,l,p),p.onerror=S(ft,d,"TestLoadImage: error",!1,l,p),p.onabort=S(ft,d,"TestLoadImage: abort",!1,l,p),p.ontimeout=S(ft,d,"TestLoadImage: timeout",!1,l,p),c.setTimeout(function(){p.ontimeout&&p.ontimeout()},1e4),p.src=a}else l(!1)}function Ug(a,l){let d=new Sr,p=new AbortController,T=setTimeout(()=>{p.abort(),ft(d,"TestPingServer: timeout",!1,l)},1e4);fetch(a,{signal:p.signal}).then(R=>{clearTimeout(T),R.ok?ft(d,"TestPingServer: ok",!0,l):ft(d,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(T),ft(d,"TestPingServer: error",!1,l)})}function ft(a,l,d,p,T){try{T&&(T.onload=null,T.onerror=null,T.onabort=null,T.ontimeout=null),p(d)}catch{}}function Bg(){this.g=new Eg}function qg(a,l,d){let p=d||"";try{Nh(a,function(T,R){let O=T;h(T)&&(O=ca(T)),l.push(p+R+"="+encodeURIComponent(O))})}catch(T){throw l.push(p+"type="+encodeURIComponent("_badmap")),T}}function kr(a){this.l=a.Ub||null,this.j=a.eb||!1}D(kr,ua),kr.prototype.g=function(){return new $i(this.l,this.j)},kr.prototype.i=function(a){return function(){return a}}({});function $i(a,l){Ee.call(this),this.D=a,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}D($i,Ee),r=$i.prototype,r.open=function(a,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=l,this.readyState=1,Or(this)},r.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;let l={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(l.body=a),(this.D||c).fetch(new Request(this.A,l)).then(this.Sa.bind(this),this.ga.bind(this))},r.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Nr(this)),this.readyState=0},r.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,Or(this)),this.g&&(this.readyState=3,Or(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream!="undefined"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Uh(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function Uh(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}r.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var l=a.value?a.value:new Uint8Array(0);(l=this.v.decode(l,{stream:!a.done}))&&(this.response=this.responseText+=l)}a.done?Nr(this):Or(this),this.readyState==3&&Uh(this)}},r.Ra=function(a){this.g&&(this.response=this.responseText=a,Nr(this))},r.Qa=function(a){this.g&&(this.response=a,Nr(this))},r.ga=function(){this.g&&Nr(this)};function Nr(a){a.readyState=4,a.l=null,a.j=null,a.v=null,Or(a)}r.setRequestHeader=function(a,l){this.u.append(a,l)},r.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},r.getAllResponseHeaders=function(){if(!this.h)return"";let a=[],l=this.h.entries();for(var d=l.next();!d.done;)d=d.value,a.push(d[0]+": "+d[1]),d=l.next();return a.join(`\r
`)};function Or(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty($i.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function Bh(a){let l="";return G(a,function(d,p){l+=p,l+=":",l+=d,l+=`\r
`}),l}function va(a,l,d){e:{for(p in d){var p=!1;break e}p=!0}p||(d=Bh(d),typeof a=="string"?d!=null&&encodeURIComponent(String(d)):re(a,l,d))}function ae(a){Ee.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}D(ae,Ee);var jg=/^https?$/i,zg=["POST","PUT"];r=ae.prototype,r.Ha=function(a){this.J=a},r.ea=function(a,l,d,p){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);l=l?l.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():da.g(),this.v=this.o?mh(this.o):mh(da),this.g.onreadystatechange=v(this.Ea,this);try{this.B=!0,this.g.open(l,String(a),!0),this.B=!1}catch(R){qh(this,R);return}if(a=d||"",d=new Map(this.headers),p)if(Object.getPrototypeOf(p)===Object.prototype)for(var T in p)d.set(T,p[T]);else if(typeof p.keys=="function"&&typeof p.get=="function")for(let R of p.keys())d.set(R,p.get(R));else throw Error("Unknown input type for opt_headers: "+String(p));p=Array.from(d.keys()).find(R=>R.toLowerCase()=="content-type"),T=c.FormData&&a instanceof c.FormData,!(0<=Array.prototype.indexOf.call(zg,l,void 0))||p||T||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(let[R,O]of d)this.g.setRequestHeader(R,O);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Gh(this),this.u=!0,this.g.send(a),this.u=!1}catch(R){qh(this,R)}};function qh(a,l){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=l,a.m=5,jh(a),Ki(a)}function jh(a){a.A||(a.A=!0,Pe(a,"complete"),Pe(a,"error"))}r.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,Pe(this,"complete"),Pe(this,"abort"),Ki(this))},r.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Ki(this,!0)),ae.aa.N.call(this)},r.Ea=function(){this.s||(this.B||this.u||this.j?zh(this):this.bb())},r.bb=function(){zh(this)};function zh(a){if(a.h&&typeof o!="undefined"&&(!a.v[1]||nt(a)!=4||a.Z()!=2)){if(a.u&&nt(a)==4)hh(a.Ea,0,a);else if(Pe(a,"readystatechange"),nt(a)==4){a.h=!1;try{let O=a.Z();e:switch(O){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break e;default:l=!1}var d;if(!(d=l)){var p;if(p=O===0){var T=String(a.D).match(Oh)[1]||null;!T&&c.self&&c.self.location&&(T=c.self.location.protocol.slice(0,-1)),p=!jg.test(T?T.toLowerCase():"")}d=p}if(d)Pe(a,"complete"),Pe(a,"success");else{a.m=6;try{var R=2<nt(a)?a.g.statusText:""}catch{R=""}a.l=R+" ["+a.Z()+"]",jh(a)}}finally{Ki(a)}}}}function Ki(a,l){if(a.g){Gh(a);let d=a.g,p=a.v[0]?()=>{}:null;a.g=null,a.v=null,l||Pe(a,"ready");try{d.onreadystatechange=p}catch{}}}function Gh(a){a.I&&(c.clearTimeout(a.I),a.I=null)}r.isActive=function(){return!!this.g};function nt(a){return a.g?a.g.readyState:0}r.Z=function(){try{return 2<nt(this)?this.g.status:-1}catch{return-1}},r.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},r.Oa=function(a){if(this.g){var l=this.g.responseText;return a&&l.indexOf(a)==0&&(l=l.substring(a.length)),wg(l)}};function $h(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function Gg(a){let l={};a=(a.g&&2<=nt(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let p=0;p<a.length;p++){if(j(a[p]))continue;var d=E(a[p]);let T=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();let R=l[T]||[];l[T]=R,R.push(d)}I(l,function(p){return p.join(", ")})}r.Ba=function(){return this.m},r.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function xr(a,l,d){return d&&d.internalChannelParams&&d.internalChannelParams[a]||l}function Kh(a){this.Aa=0,this.i=[],this.j=new Sr,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=xr("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=xr("baseRetryDelayMs",5e3,a),this.cb=xr("retryDelaySeedMs",1e4,a),this.Wa=xr("forwardChannelMaxRetries",2,a),this.wa=xr("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new Rh(a&&a.concurrentRequestLimit),this.Da=new Bg,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}r=Kh.prototype,r.la=8,r.G=1,r.connect=function(a,l,d,p){Ce(0),this.W=a,this.H=l||{},d&&p!==void 0&&(this.H.OSID=d,this.H.OAID=p),this.F=this.X,this.I=td(this,null,this.W),Hi(this)};function Ia(a){if(Wh(a),a.G==3){var l=a.U++,d=tt(a.I);if(re(d,"SID",a.K),re(d,"RID",l),re(d,"TYPE","terminate"),Vr(a,d),l=new ht(a,a.j,l),l.L=2,l.v=Gi(tt(d)),d=!1,c.navigator&&c.navigator.sendBeacon)try{d=c.navigator.sendBeacon(l.v.toString(),"")}catch{}!d&&c.Image&&(new Image().src=l.v,d=!0),d||(l.g=nd(l.j,null),l.g.ea(l.v)),l.F=Date.now(),qi(l)}ed(a)}function Wi(a){a.g&&(Ea(a),a.g.cancel(),a.g=null)}function Wh(a){Wi(a),a.u&&(c.clearTimeout(a.u),a.u=null),Qi(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&c.clearTimeout(a.s),a.s=null)}function Hi(a){if(!Ph(a.h)&&!a.s){a.s=!0;var l=a.Ga;yr||sh(),vr||(yr(),vr=!0),Zo.add(l,a),a.B=0}}function $g(a,l){return Ch(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=l.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=br(v(a.Ga,a,l),Zh(a,a.B)),a.B++,!0)}r.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;let T=new ht(this,this.j,a),R=this.o;if(this.S&&(R?(R=g(R),w(R,this.S)):R=this.S),this.m!==null||this.O||(T.H=R,R=null),this.P)e:{for(var l=0,d=0;d<this.i.length;d++){t:{var p=this.i[d];if("__data__"in p.map&&(p=p.map.__data__,typeof p=="string")){p=p.length;break t}p=void 0}if(p===void 0)break;if(l+=p,4096<l){l=d;break e}if(l===4096||d===this.i.length-1){l=d+1;break e}}l=1e3}else l=1e3;l=Qh(this,T,l),d=tt(this.I),re(d,"RID",a),re(d,"CVER",22),this.D&&re(d,"X-HTTP-Session-Id",this.D),Vr(this,d),R&&(this.O?l="headers="+encodeURIComponent(String(Bh(R)))+"&"+l:this.m&&va(d,this.m,R)),ya(this.h,T),this.Ua&&re(d,"TYPE","init"),this.P?(re(d,"$req",l),re(d,"SID","null"),T.T=!0,pa(T,d,null)):pa(T,d,l),this.G=2}}else this.G==3&&(a?Hh(this,a):this.i.length==0||Ph(this.h)||Hh(this))};function Hh(a,l){var d;l?d=l.l:d=a.U++;let p=tt(a.I);re(p,"SID",a.K),re(p,"RID",d),re(p,"AID",a.T),Vr(a,p),a.m&&a.o&&va(p,a.m,a.o),d=new ht(a,a.j,d,a.B+1),a.m===null&&(d.H=a.o),l&&(a.i=l.D.concat(a.i)),l=Qh(a,d,1e3),d.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),ya(a.h,d),pa(d,p,l)}function Vr(a,l){a.H&&G(a.H,function(d,p){re(l,p,d)}),a.l&&Nh({},function(d,p){re(l,p,d)})}function Qh(a,l,d){d=Math.min(a.i.length,d);var p=a.l?v(a.l.Na,a.l,a):null;e:{var T=a.i;let R=-1;for(;;){let O=["count="+d];R==-1?0<d?(R=T[0].g,O.push("ofs="+R)):R=0:O.push("ofs="+R);let ne=!0;for(let ye=0;ye<d;ye++){let X=T[ye].g,Te=T[ye].map;if(X-=R,0>X)R=Math.max(0,T[ye].g-100),ne=!1;else try{qg(Te,O,"req"+X+"_")}catch{p&&p(Te)}}if(ne){p=O.join("&");break e}}}return a=a.i.splice(0,d),l.D=a,p}function Jh(a){if(!a.g&&!a.u){a.Y=1;var l=a.Fa;yr||sh(),vr||(yr(),vr=!0),Zo.add(l,a),a.v=0}}function wa(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=br(v(a.Fa,a),Zh(a,a.v)),a.v++,!0)}r.Fa=function(){if(this.u=null,Yh(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=br(v(this.ab,this),a)}},r.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Ce(10),Wi(this),Yh(this))};function Ea(a){a.A!=null&&(c.clearTimeout(a.A),a.A=null)}function Yh(a){a.g=new ht(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var l=tt(a.qa);re(l,"RID","rpc"),re(l,"SID",a.K),re(l,"AID",a.T),re(l,"CI",a.F?"0":"1"),!a.F&&a.ja&&re(l,"TO",a.ja),re(l,"TYPE","xmlhttp"),Vr(a,l),a.m&&a.o&&va(l,a.m,a.o),a.L&&(a.g.I=a.L);var d=a.g;a=a.ia,d.L=1,d.v=Gi(tt(l)),d.m=null,d.P=!0,Ah(d,a)}r.Za=function(){this.C!=null&&(this.C=null,Wi(this),wa(this),Ce(19))};function Qi(a){a.C!=null&&(c.clearTimeout(a.C),a.C=null)}function Xh(a,l){var d=null;if(a.g==l){Qi(a),Ea(a),a.g=null;var p=2}else if(_a(a.h,l))d=l.D,Dh(a.h,l),p=1;else return;if(a.G!=0){if(l.o)if(p==1){d=l.m?l.m.length:0,l=Date.now()-l.F;var T=a.B;p=Fi(),Pe(p,new Ih(p,d)),Hi(a)}else Jh(a);else if(T=l.s,T==3||T==0&&0<l.X||!(p==1&&$g(a,l)||p==2&&wa(a)))switch(d&&0<d.length&&(l=a.h,l.i=l.i.concat(d)),T){case 1:Gt(a,5);break;case 4:Gt(a,10);break;case 3:Gt(a,6);break;default:Gt(a,2)}}}function Zh(a,l){let d=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(d*=2),d*l}function Gt(a,l){if(a.j.info("Error code "+l),l==2){var d=v(a.fb,a),p=a.Xa;let T=!p;p=new zt(p||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||ji(p,"https"),Gi(p),T?Fg(p.toString(),d):Ug(p.toString(),d)}else Ce(2);a.G=0,a.l&&a.l.sa(l),ed(a),Wh(a)}r.fb=function(a){a?(this.j.info("Successfully pinged google.com"),Ce(2)):(this.j.info("Failed to ping google.com"),Ce(1))};function ed(a){if(a.G=0,a.ka=[],a.l){let l=kh(a.h);(l.length!=0||a.i.length!=0)&&(k(a.ka,l),k(a.ka,a.i),a.h.i.length=0,N(a.i),a.i.length=0),a.l.ra()}}function td(a,l,d){var p=d instanceof zt?tt(d):new zt(d);if(p.g!="")l&&(p.g=l+"."+p.g),zi(p,p.s);else{var T=c.location;p=T.protocol,l=l?l+"."+T.hostname:T.hostname,T=+T.port;var R=new zt(null);p&&ji(R,p),l&&(R.g=l),T&&zi(R,T),d&&(R.l=d),p=R}return d=a.D,l=a.ya,d&&l&&re(p,d,l),re(p,"VER",a.la),Vr(a,p),p}function nd(a,l,d){if(l&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return l=a.Ca&&!a.pa?new ae(new kr({eb:d})):new ae(a.pa),l.Ha(a.J),l}r.isActive=function(){return!!this.l&&this.l.isActive(this)};function rd(){}r=rd.prototype,r.ua=function(){},r.ta=function(){},r.sa=function(){},r.ra=function(){},r.isActive=function(){return!0},r.Na=function(){};function Ji(){}Ji.prototype.g=function(a,l){return new Ve(a,l)};function Ve(a,l){Ee.call(this),this.g=new Kh(l),this.l=a,this.h=l&&l.messageUrlParams||null,a=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(a?a["X-WebChannel-Content-Type"]=l.messageContentType:a={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.va&&(a?a["X-WebChannel-Client-Profile"]=l.va:a={"X-WebChannel-Client-Profile":l.va}),this.g.S=a,(a=l&&l.Sb)&&!j(a)&&(this.g.m=a),this.v=l&&l.supportsCrossDomainXhr||!1,this.u=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!j(l)&&(this.g.D=l,a=this.h,a!==null&&l in a&&(a=this.h,l in a&&delete a[l])),this.j=new An(this)}D(Ve,Ee),Ve.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Ve.prototype.close=function(){Ia(this.g)},Ve.prototype.o=function(a){var l=this.g;if(typeof a=="string"){var d={};d.__data__=a,a=d}else this.u&&(d={},d.__data__=ca(a),a=d);l.i.push(new Pg(l.Ya++,a)),l.G==3&&Hi(l)},Ve.prototype.N=function(){this.g.l=null,delete this.j,Ia(this.g),delete this.g,Ve.aa.N.call(this)};function id(a){la.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var l=a.__sm__;if(l){e:{for(let d in l){a=d;break e}a=void 0}(this.i=a)&&(a=this.i,l=l!==null&&a in l?l[a]:void 0),this.data=l}else this.data=a}D(id,la);function sd(){ha.call(this),this.status=1}D(sd,ha);function An(a){this.g=a}D(An,rd),An.prototype.ua=function(){Pe(this.g,"a")},An.prototype.ta=function(a){Pe(this.g,new id(a))},An.prototype.sa=function(a){Pe(this.g,new sd)},An.prototype.ra=function(){Pe(this.g,"b")},Ji.prototype.createWebChannel=Ji.prototype.g,Ve.prototype.send=Ve.prototype.o,Ve.prototype.open=Ve.prototype.m,Ve.prototype.close=Ve.prototype.close,Cc=ot.createWebChannelTransport=function(){return new Ji},Pc=ot.getStatEventTarget=function(){return Fi()},Rc=ot.Event=qt,ks=ot.Stat={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Ui.NO_ERROR=0,Ui.TIMEOUT=8,Ui.HTTP_ERROR=6,Yr=ot.ErrorCode=Ui,wh.COMPLETE="complete",Sc=ot.EventType=wh,gh.EventType=Tr,Tr.OPEN="a",Tr.CLOSE="b",Tr.ERROR="c",Tr.MESSAGE="d",Ee.prototype.listen=Ee.prototype.K,Vn=ot.WebChannel=gh,Tv=ot.FetchXmlHttpFactory=kr,ae.prototype.listenOnce=ae.prototype.L,ae.prototype.getLastError=ae.prototype.Ka,ae.prototype.getLastErrorCode=ae.prototype.Ba,ae.prototype.getStatus=ae.prototype.Z,ae.prototype.getResponseJson=ae.prototype.Oa,ae.prototype.getResponseText=ae.prototype.oa,ae.prototype.send=ae.prototype.ea,ae.prototype.setWithCredentials=ae.prototype.Ha,bc=ot.XhrIo=ae}).apply(typeof Ds!="undefined"?Ds:typeof self!="undefined"?self:typeof window!="undefined"?window:{});var wf="@firebase/firestore";var _e=class{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}};_e.UNAUTHENTICATED=new _e(null),_e.GOOGLE_CREDENTIALS=new _e("google-credentials-uid"),_e.FIRST_PARTY=new _e("first-party-uid"),_e.MOCK_USER=new _e("mock-user");var pr="11.0.2";var dn=new mt("@firebase/firestore");function Bn(){return dn.logLevel}function C(r,...e){if(dn.logLevel<=H.DEBUG){let t=e.map(xl);dn.debug(`Firestore (${pr}): ${r}`,...t)}}function ce(r,...e){if(dn.logLevel<=H.ERROR){let t=e.map(xl);dn.error(`Firestore (${pr}): ${r}`,...t)}}function li(r,...e){if(dn.logLevel<=H.WARN){let t=e.map(xl);dn.warn(`Firestore (${pr}): ${r}`,...t)}}function xl(r){if(typeof r=="string")return r;try{return function(t){return JSON.stringify(t)}(r)}catch{return r}}function L(r="Unexpected state"){let e=`FIRESTORE (${pr}) INTERNAL ASSERTION FAILED: `+r;throw ce(e),new Error(e)}function F(r,e){r||L()}function M(r,e){return r}var P={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"},x=class extends Le{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}};var Ye=class{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}};var Lc=class{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}},Mc=class{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(_e.UNAUTHENTICATED))}shutdown(){}};var Fc=class{constructor(e){this.t=e,this.currentUser=_e.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){F(this.o===void 0);let n=this.i,i=u=>this.i!==n?(n=this.i,t(u)):Promise.resolve(),s=new Ye;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new Ye,e.enqueueRetryable(()=>i(this.currentUser))};let o=()=>{let u=s;e.enqueueRetryable(async()=>{await u.promise,await i(this.currentUser)})},c=u=>{C("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(u=>c(u)),setTimeout(()=>{if(!this.auth){let u=this.t.getImmediate({optional:!0});u?c(u):(C("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new Ye)}},0),o()}getToken(){let e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(n=>this.i!==e?(C("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):n?(F(typeof n.accessToken=="string"),new Lc(n.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){let e=this.auth&&this.auth.getUid();return F(e===null||typeof e=="string"),new _e(e)}},Uc=class{constructor(e,t,n){this.l=e,this.h=t,this.P=n,this.type="FirstParty",this.user=_e.FIRST_PARTY,this.T=new Map}I(){return this.P?this.P():null}get headers(){this.T.set("X-Goog-AuthUser",this.l);let e=this.I();return e&&this.T.set("Authorization",e),this.h&&this.T.set("X-Goog-Iam-Authorization-Token",this.h),this.T}},Bc=class{constructor(e,t,n){this.l=e,this.h=t,this.P=n}getToken(){return Promise.resolve(new Uc(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(_e.FIRST_PARTY))}shutdown(){}invalidateToken(){}},qc=class{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}},jc=class{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){F(this.o===void 0);let n=s=>{s.error!=null&&C("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);let o=s.token!==this.R;return this.R=s.token,C("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>n(s))};let i=s=>{C("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(s=>i(s)),setTimeout(()=>{if(!this.appCheck){let s=this.A.getImmediate({optional:!0});s?i(s):C("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){let e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(F(typeof t.token=="string"),this.R=t.token,new qc(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}};function Av(r){let e=typeof self!="undefined"&&(self.crypto||self.msCrypto),t=new Uint8Array(r);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let n=0;n<r;n++)t[n]=Math.floor(256*Math.random());return t}var zs=class{static newId(){let e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length,n="";for(;n.length<20;){let i=Av(40);for(let s=0;s<i.length;++s)n.length<20&&i[s]<t&&(n+=e.charAt(i[s]%e.length))}return n}};function $(r,e){return r<e?-1:r>e?1:0}function Qn(r,e,t){return r.length===e.length&&r.every((n,i)=>t(n,e[i]))}function Ap(r){return r+"\0"}var ue=class r{static now(){return r.fromMillis(Date.now())}static fromDate(e){return r.fromMillis(e.getTime())}static fromMillis(e){let t=Math.floor(e/1e3),n=Math.floor(1e6*(e-1e3*t));return new r(t,n)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new x(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new x(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new x(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new x(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?$(this.nanoseconds,e.nanoseconds):$(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){let e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}};var q=class r{static fromTimestamp(e){return new r(e)}static min(){return new r(new ue(0,0))}static max(){return new r(new ue(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}};var Gs=class r{constructor(e,t,n){t===void 0?t=0:t>e.length&&L(),n===void 0?n=e.length-t:n>e.length-t&&L(),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return r.comparator(this,e)===0}child(e){let t=this.segments.slice(this.offset,this.limit());return e instanceof r?e.forEach(n=>{t.push(n)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){let n=Math.min(e.length,t.length);for(let i=0;i<n;i++){let s=e.get(i),o=t.get(i);if(s<o)return-1;if(s>o)return 1}return e.length<t.length?-1:e.length>t.length?1:0}},ee=class r extends Gs{construct(e,t,n){return new r(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){let t=[];for(let n of e){if(n.indexOf("//")>=0)throw new x(P.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter(i=>i.length>0))}return new r(t)}static emptyPath(){return new r([])}},bv=/^[_a-zA-Z][_a-zA-Z0-9]*$/,me=class r extends Gs{construct(e,t,n){return new r(e,t,n)}static isValidIdentifier(e){return bv.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),r.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new r(["__name__"])}static fromServerFormat(e){let t=[],n="",i=0,s=()=>{if(n.length===0)throw new x(P.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""},o=!1;for(;i<e.length;){let c=e[i];if(c==="\\"){if(i+1===e.length)throw new x(P.INVALID_ARGUMENT,"Path has trailing escape character: "+e);let u=e[i+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new x(P.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=u,i+=2}else c==="`"?(o=!o,i++):c!=="."||o?(n+=c,i++):(s(),i++)}if(s(),o)throw new x(P.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new r(t)}static emptyPath(){return new r([])}};var V=class r{constructor(e){this.path=e}static fromPath(e){return new r(ee.fromString(e))}static fromName(e){return new r(ee.fromString(e).popFirst(5))}static empty(){return new r(ee.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&ee.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return ee.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new r(new ee(e.slice()))}};var Jn=class{constructor(e,t,n,i){this.indexId=e,this.collectionGroup=t,this.fields=n,this.indexState=i}};function zc(r){return r.fields.find(e=>e.kind===2)}function nn(r){return r.fields.filter(e=>e.kind!==2)}Jn.UNKNOWN_ID=-1;var Kn=class{constructor(e,t){this.fieldPath=e,this.kind=t}};var hi=class r{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new r(0,qe.min())}};function bp(r,e){let t=r.toTimestamp().seconds,n=r.toTimestamp().nanoseconds+1,i=q.fromTimestamp(n===1e9?new ue(t+1,0):new ue(t,n));return new qe(i,V.empty(),e)}function Sp(r){return new qe(r.readTime,r.key,-1)}var qe=class r{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new r(q.min(),V.empty(),-1)}static max(){return new r(q.max(),V.empty(),-1)}};function Vl(r,e){let t=r.readTime.compareTo(e.readTime);return t!==0?t:(t=V.comparator(r.documentKey,e.documentKey),t!==0?t:$(r.largestBatchId,e.largestBatchId))}var Rp="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.",$s=class{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}};async function Mt(r){if(r.code!==P.FAILED_PRECONDITION||r.message!==Rp)throw r;C("LocalStore","Unexpectedly lost primary lease")}var b=class r{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&L(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new r((n,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(n,i)},this.catchCallback=s=>{this.wrapFailure(t,s).next(n,i)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{let t=e();return t instanceof r?t:r.resolve(t)}catch(t){return r.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):r.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):r.reject(t)}static resolve(e){return new r((t,n)=>{t(e)})}static reject(e){return new r((t,n)=>{n(e)})}static waitFor(e){return new r((t,n)=>{let i=0,s=0,o=!1;e.forEach(c=>{++i,c.next(()=>{++s,o&&s===i&&t()},u=>n(u))}),o=!0,s===i&&t()})}static or(e){let t=r.resolve(!1);for(let n of e)t=t.next(i=>i?r.resolve(i):n());return t}static forEach(e,t){let n=[];return e.forEach((i,s)=>{n.push(t.call(this,i,s))}),this.waitFor(n)}static mapArray(e,t){return new r((n,i)=>{let s=e.length,o=new Array(s),c=0;for(let u=0;u<s;u++){let h=u;t(e[h]).next(f=>{o[h]=f,++c,c===s&&n(o)},f=>i(f))}})}static doWhile(e,t){return new r((n,i)=>{let s=()=>{e()===!0?t().next(()=>{s()},i):n()};s()})}};var Ks=class r{static open(e,t,n,i){try{return new r(t,e.transaction(i,n))}catch(s){throw new ln(t,s)}}constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.V=new Ye,this.transaction.oncomplete=()=>{this.V.resolve()},this.transaction.onabort=()=>{t.error?this.V.reject(new ln(e,t.error)):this.V.resolve()},this.transaction.onerror=n=>{let i=Ll(n.target.error);this.V.reject(new ln(e,i))}}get m(){return this.V.promise}abort(e){e&&this.V.reject(e),this.aborted||(C("SimpleDb","Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}g(){let e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){let t=this.transaction.objectStore(e);return new $c(t)}},Yn=class r{static delete(e){return C("SimpleDb","Removing database:",e),rn(window.indexedDB.deleteDatabase(e)).toPromise()}static p(){if(!Zi())return!1;if(r.S())return!0;let e=pe(),t=r.D(e),n=0<t&&t<10,i=Pp(e),s=0<i&&i<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||n||s)}static S(){var e;return typeof process!="undefined"&&((e=process.__PRIVATE_env)===null||e===void 0?void 0:e.v)==="YES"}static C(e,t){return e.store(t)}static D(e){let t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),n=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(n)}constructor(e,t,n){this.name=e,this.version=t,this.F=n,r.D(pe())===12.2&&ce("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async M(e){return this.db||(C("SimpleDb","Opening database:",this.name),this.db=await new Promise((t,n)=>{let i=indexedDB.open(this.name,this.version);i.onsuccess=s=>{let o=s.target.result;t(o)},i.onblocked=()=>{n(new ln(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},i.onerror=s=>{let o=s.target.error;o.name==="VersionError"?n(new x(P.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?n(new x(P.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):n(new ln(e,o))},i.onupgradeneeded=s=>{C("SimpleDb",'Database "'+this.name+'" requires upgrade from version:',s.oldVersion);let o=s.target.result;this.F.O(o,i.transaction,s.oldVersion,this.version).next(()=>{C("SimpleDb","Database upgrade to version "+this.version+" complete")})}})),this.N&&(this.db.onversionchange=t=>this.N(t)),this.db}L(e){this.N=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,n,i){let s=t==="readonly",o=0;for(;;){++o;try{this.db=await this.M(e);let c=Ks.open(this.db,e,s?"readonly":"readwrite",n),u=i(c).next(h=>(c.g(),h)).catch(h=>(c.abort(h),b.reject(h))).toPromise();return u.catch(()=>{}),await c.m,u}catch(c){let u=c,h=u.name!=="FirebaseError"&&o<3;if(C("SimpleDb","Transaction failed with error:",u.message,"Retrying:",h),this.close(),!h)return Promise.reject(u)}}}close(){this.db&&this.db.close(),this.db=void 0}};function Pp(r){let e=r.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}var Gc=class{constructor(e){this.B=e,this.k=!1,this.q=null}get isDone(){return this.k}get K(){return this.q}set cursor(e){this.B=e}done(){this.k=!0}$(e){this.q=e}delete(){return rn(this.B.delete())}},ln=class extends x{constructor(e,t){super(P.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}};function Ft(r){return r.name==="IndexedDbTransactionError"}var $c=class{constructor(e){this.store=e}put(e,t){let n;return t!==void 0?(C("SimpleDb","PUT",this.store.name,e,t),n=this.store.put(t,e)):(C("SimpleDb","PUT",this.store.name,"<auto-key>",e),n=this.store.put(e)),rn(n)}add(e){return C("SimpleDb","ADD",this.store.name,e,e),rn(this.store.add(e))}get(e){return rn(this.store.get(e)).next(t=>(t===void 0&&(t=null),C("SimpleDb","GET",this.store.name,e,t),t))}delete(e){return C("SimpleDb","DELETE",this.store.name,e),rn(this.store.delete(e))}count(){return C("SimpleDb","COUNT",this.store.name),rn(this.store.count())}U(e,t){let n=this.options(e,t),i=n.index?this.store.index(n.index):this.store;if(typeof i.getAll=="function"){let s=i.getAll(n.range);return new b((o,c)=>{s.onerror=u=>{c(u.target.error)},s.onsuccess=u=>{o(u.target.result)}})}{let s=this.cursor(n),o=[];return this.W(s,(c,u)=>{o.push(u)}).next(()=>o)}}G(e,t){let n=this.store.getAll(e,t===null?void 0:t);return new b((i,s)=>{n.onerror=o=>{s(o.target.error)},n.onsuccess=o=>{i(o.target.result)}})}j(e,t){C("SimpleDb","DELETE ALL",this.store.name);let n=this.options(e,t);n.H=!1;let i=this.cursor(n);return this.W(i,(s,o,c)=>c.delete())}J(e,t){let n;t?n=e:(n={},t=e);let i=this.cursor(n);return this.W(i,t)}Y(e){let t=this.cursor({});return new b((n,i)=>{t.onerror=s=>{let o=Ll(s.target.error);i(o)},t.onsuccess=s=>{let o=s.target.result;o?e(o.primaryKey,o.value).next(c=>{c?o.continue():n()}):n()}})}W(e,t){let n=[];return new b((i,s)=>{e.onerror=o=>{s(o.target.error)},e.onsuccess=o=>{let c=o.target.result;if(!c)return void i();let u=new Gc(c),h=t(c.primaryKey,c.value,u);if(h instanceof b){let f=h.catch(m=>(u.done(),b.reject(m)));n.push(f)}u.isDone?i():u.K===null?c.continue():c.continue(u.K)}}).next(()=>b.waitFor(n))}options(e,t){let n;return e!==void 0&&(typeof e=="string"?n=e:t=e),{index:n,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){let n=this.store.index(e.index);return e.H?n.openKeyCursor(e.range,t):n.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}};function rn(r){return new b((e,t)=>{r.onsuccess=n=>{let i=n.target.result;e(i)},r.onerror=n=>{let i=Ll(n.target.error);t(i)}})}var Ef=!1;function Ll(r){let e=Yn.D(pe());if(e>=12.2&&e<13){let t="An internal error was encountered in the Indexed Database server";if(r.message.indexOf(t)>=0){let n=new x("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return Ef||(Ef=!0,setTimeout(()=>{throw n},0)),n}}return r}var Kc=class{constructor(e,t){this.asyncQueue=e,this.Z=t,this.task=null}start(){this.X(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}X(e){C("IndexBackfiller",`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,async()=>{this.task=null;try{C("IndexBackfiller",`Documents written: ${await this.Z.ee()}`)}catch(t){Ft(t)?C("IndexBackfiller","Ignoring IndexedDB error during index backfill: ",t):await Mt(t)}await this.X(6e4)})}},Wc=class{constructor(e,t){this.localStore=e,this.persistence=t}async ee(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",t=>this.te(t,e))}te(e,t){let n=new Set,i=t,s=!0;return b.doWhile(()=>s===!0&&i>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(o=>{if(o!==null&&!n.has(o))return C("IndexBackfiller",`Processing collection: ${o}`),this.ne(e,o,i).next(c=>{i-=c,n.add(o)});s=!1})).next(()=>t-i)}ne(e,t,n){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next(i=>this.localStore.localDocuments.getNextDocuments(e,t,i,n).next(s=>{let o=s.changes;return this.localStore.indexManager.updateIndexEntries(e,o).next(()=>this.re(i,s)).next(c=>(C("IndexBackfiller",`Updating offset: ${c}`),this.localStore.indexManager.updateCollectionGroup(e,t,c))).next(()=>o.size)}))}re(e,t){let n=e;return t.changes.forEach((i,s)=>{let o=Sp(s);Vl(o,n)>0&&(n=o)}),new qe(n.readTime,n.documentKey,Math.max(t.batchId,e.largestBatchId))}};var Se=class{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=n=>this.ie(n),this.se=n=>t.writeSequenceNumber(n))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){let e=++this.previousValue;return this.se&&this.se(e),e}};Se.oe=-1;function jo(r){return r==null}function di(r){return r===0&&1/r==-1/0}function Cp(r){return typeof r=="number"&&Number.isInteger(r)&&!di(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER}function Re(r){let e="";for(let t=0;t<r.length;t++)e.length>0&&(e=Tf(e)),e=Sv(r.get(t),e);return Tf(e)}function Sv(r,e){let t=e,n=r.length;for(let i=0;i<n;i++){let s=r.charAt(i);switch(s){case"\0":t+="";break;case"":t+="";break;default:t+=s}}return t}function Tf(r){return r+""}function Qe(r){let e=r.length;if(F(e>=2),e===2)return F(r.charAt(0)===""&&r.charAt(1)===""),ee.emptyPath();let t=e-2,n=[],i="";for(let s=0;s<e;){let o=r.indexOf("",s);switch((o<0||o>t)&&L(),r.charAt(o+1)){case"":let c=r.substring(s,o),u;i.length===0?u=c:(i+=c,u=i,i=""),n.push(u);break;case"":i+=r.substring(s,o),i+="\0";break;case"":i+=r.substring(s,o+1);break;default:L()}s=o+2}return new ee(n)}var Af=["userId","batchId"];function Ms(r,e){return[r,Re(e)]}function Dp(r,e,t){return[r,Re(e),t]}var Rv={},Pv=["prefixPath","collectionGroup","readTime","documentId"],Cv=["prefixPath","collectionGroup","documentId"],Dv=["collectionGroup","readTime","prefixPath","documentId"],kv=["canonicalId","targetId"],Nv=["targetId","path"],Ov=["path","targetId"],xv=["collectionId","parent"],Vv=["indexId","uid"],Lv=["uid","sequenceNumber"],Mv=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],Fv=["indexId","uid","orderedDocumentKey"],Uv=["userId","collectionPath","documentId"],Bv=["userId","collectionPath","largestBatchId"],qv=["userId","collectionGroup","largestBatchId"],kp=["mutationQueues","mutations","documentMutations","remoteDocuments","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries"],jv=[...kp,"documentOverlays"],Np=["mutationQueues","mutations","documentMutations","remoteDocumentsV14","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries","documentOverlays"],Op=Np,Ml=[...Op,"indexConfiguration","indexState","indexEntries"],zv=Ml,Gv=[...Ml,"globals"];var fi=class extends $s{constructor(e,t){super(),this._e=e,this.currentSequenceNumber=t}};function ge(r,e){let t=M(r);return Yn.C(t._e,e)}function bf(r){let e=0;for(let t in r)Object.prototype.hasOwnProperty.call(r,t)&&e++;return e}function Ut(r,e){for(let t in r)Object.prototype.hasOwnProperty.call(r,t)&&e(t,r[t])}function xp(r){for(let e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}var ie=class r{constructor(e,t){this.comparator=e,this.root=t||Xe.EMPTY}insert(e,t){return new r(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Xe.BLACK,null,null))}remove(e){return new r(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Xe.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){let n=this.comparator(e,t.key);if(n===0)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){let i=this.comparator(e,n.key);if(i===0)return t+n.left.size;i<0?n=n.left:(t+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,n)=>(e(t,n),!1))}toString(){let e=[];return this.inorderTraversal((t,n)=>(e.push(`${t}:${n}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new $n(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new $n(this.root,e,this.comparator,!1)}getReverseIterator(){return new $n(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new $n(this.root,e,this.comparator,!0)}},$n=class{constructor(e,t,n,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?n(e.key,t):1,t&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop(),t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;let e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}},Xe=class r{constructor(e,t,n,i,s){this.key=e,this.value=t,this.color=n!=null?n:r.RED,this.left=i!=null?i:r.EMPTY,this.right=s!=null?s:r.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,i,s){return new r(e!=null?e:this.key,t!=null?t:this.value,n!=null?n:this.color,i!=null?i:this.left,s!=null?s:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let i=this,s=n(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,t,n),null):s===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,n)),i.fixUp()}removeMin(){if(this.left.isEmpty())return r.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let n,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return r.EMPTY;n=i.right.min(),i=i.copy(n.key,n.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){let e=this.copy(null,null,r.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){let e=this.copy(null,null,r.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){let e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){let e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw L();let e=this.left.check();if(e!==this.right.check())throw L();return e+(this.isRed()?0:1)}};Xe.EMPTY=null,Xe.RED=!0,Xe.BLACK=!1;Xe.EMPTY=new class{constructor(){this.size=0}get key(){throw L()}get value(){throw L()}get color(){throw L()}get left(){throw L()}get right(){throw L()}copy(e,t,n,i,s){return this}insert(e,t,n){return new Xe(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};var te=class r{constructor(e){this.comparator=e,this.data=new ie(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,n)=>(e(t),!1))}forEachInRange(e,t){let n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){let i=n.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let n;for(n=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){let t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Ws(this.data.getIterator())}getIteratorFrom(e){return new Ws(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(n=>{t=t.add(n)}),t}isEqual(e){if(!(e instanceof r)||this.size!==e.size)return!1;let t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){let i=t.getNext().key,s=n.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){let e=[];return this.forEach(t=>{e.push(t)}),e}toString(){let e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){let t=new r(this.comparator);return t.data=e,t}},Ws=class{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}};function Ln(r){return r.hasNext()?r.getNext():void 0}var Me=class r{constructor(e){this.fields=e,e.sort(me.comparator)}static empty(){return new r([])}unionWith(e){let t=new te(me.comparator);for(let n of this.fields)t=t.add(n);for(let n of e)t=t.add(n);return new r(t.toArray())}covers(e){for(let t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Qn(this.fields,e.fields,(t,n)=>t.isEqual(n))}};var Hs=class extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}};var fe=class r{constructor(e){this.binaryString=e}static fromBase64String(e){let t=function(i){try{return atob(i)}catch(s){throw typeof DOMException!="undefined"&&s instanceof DOMException?new Hs("Invalid base64 string: "+s):s}}(e);return new r(t)}static fromUint8Array(e){let t=function(i){let s="";for(let o=0;o<i.length;++o)s+=String.fromCharCode(i[o]);return s}(e);return new r(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){let n=new Uint8Array(t.length);for(let i=0;i<t.length;i++)n[i]=t.charCodeAt(i);return n}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return $(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}};fe.EMPTY_BYTE_STRING=new fe("");var $v=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function ct(r){if(F(!!r),typeof r=="string"){let e=0,t=$v.exec(r);if(F(!!t),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}let n=new Date(r);return{seconds:Math.floor(n.getTime()/1e3),nanos:e}}return{seconds:oe(r.seconds),nanos:oe(r.nanos)}}function oe(r){return typeof r=="number"?r:typeof r=="string"?Number(r):0}function ut(r){return typeof r=="string"?fe.fromBase64String(r):fe.fromUint8Array(r)}function Fl(r){var e,t;return((t=(((e=r==null?void 0:r.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function zo(r){let e=r.mapValue.fields.__previous_value__;return Fl(e)?zo(e):e}function pi(r){let e=ct(r.mapValue.fields.__local_write_time__.timestampValue);return new ue(e.seconds,e.nanos)}var Hc=class{constructor(e,t,n,i,s,o,c,u,h){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=i,this.ssl=s,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=u,this.useFetchStreams=h}},Xn=class r{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new r("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof r&&e.projectId===this.projectId&&e.database===this.database}};var bt={mapValue:{fields:{__type__:{stringValue:"__max__"}}}},Fs={nullValue:"NULL_VALUE"};function Pt(r){return"nullValue"in r?0:"booleanValue"in r?1:"integerValue"in r||"doubleValue"in r?2:"timestampValue"in r?3:"stringValue"in r?5:"bytesValue"in r?6:"referenceValue"in r?7:"geoPointValue"in r?8:"arrayValue"in r?9:"mapValue"in r?Fl(r)?4:Vp(r)?9007199254740991:Go(r)?10:11:L()}function Ze(r,e){if(r===e)return!0;let t=Pt(r);if(t!==Pt(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return r.booleanValue===e.booleanValue;case 4:return pi(r).isEqual(pi(e));case 3:return function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;let o=ct(i.timestampValue),c=ct(s.timestampValue);return o.seconds===c.seconds&&o.nanos===c.nanos}(r,e);case 5:return r.stringValue===e.stringValue;case 6:return function(i,s){return ut(i.bytesValue).isEqual(ut(s.bytesValue))}(r,e);case 7:return r.referenceValue===e.referenceValue;case 8:return function(i,s){return oe(i.geoPointValue.latitude)===oe(s.geoPointValue.latitude)&&oe(i.geoPointValue.longitude)===oe(s.geoPointValue.longitude)}(r,e);case 2:return function(i,s){if("integerValue"in i&&"integerValue"in s)return oe(i.integerValue)===oe(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){let o=oe(i.doubleValue),c=oe(s.doubleValue);return o===c?di(o)===di(c):isNaN(o)&&isNaN(c)}return!1}(r,e);case 9:return Qn(r.arrayValue.values||[],e.arrayValue.values||[],Ze);case 10:case 11:return function(i,s){let o=i.mapValue.fields||{},c=s.mapValue.fields||{};if(bf(o)!==bf(c))return!1;for(let u in o)if(o.hasOwnProperty(u)&&(c[u]===void 0||!Ze(o[u],c[u])))return!1;return!0}(r,e);default:return L()}}function mi(r,e){return(r.values||[]).find(t=>Ze(t,e))!==void 0}function Ct(r,e){if(r===e)return 0;let t=Pt(r),n=Pt(e);if(t!==n)return $(t,n);switch(t){case 0:case 9007199254740991:return 0;case 1:return $(r.booleanValue,e.booleanValue);case 2:return function(s,o){let c=oe(s.integerValue||s.doubleValue),u=oe(o.integerValue||o.doubleValue);return c<u?-1:c>u?1:c===u?0:isNaN(c)?isNaN(u)?0:-1:1}(r,e);case 3:return Sf(r.timestampValue,e.timestampValue);case 4:return Sf(pi(r),pi(e));case 5:return $(r.stringValue,e.stringValue);case 6:return function(s,o){let c=ut(s),u=ut(o);return c.compareTo(u)}(r.bytesValue,e.bytesValue);case 7:return function(s,o){let c=s.split("/"),u=o.split("/");for(let h=0;h<c.length&&h<u.length;h++){let f=$(c[h],u[h]);if(f!==0)return f}return $(c.length,u.length)}(r.referenceValue,e.referenceValue);case 8:return function(s,o){let c=$(oe(s.latitude),oe(o.latitude));return c!==0?c:$(oe(s.longitude),oe(o.longitude))}(r.geoPointValue,e.geoPointValue);case 9:return Rf(r.arrayValue,e.arrayValue);case 10:return function(s,o){var c,u,h,f;let m=s.fields||{},v=o.fields||{},S=(c=m.value)===null||c===void 0?void 0:c.arrayValue,D=(u=v.value)===null||u===void 0?void 0:u.arrayValue,N=$(((h=S==null?void 0:S.values)===null||h===void 0?void 0:h.length)||0,((f=D==null?void 0:D.values)===null||f===void 0?void 0:f.length)||0);return N!==0?N:Rf(S,D)}(r.mapValue,e.mapValue);case 11:return function(s,o){if(s===bt.mapValue&&o===bt.mapValue)return 0;if(s===bt.mapValue)return 1;if(o===bt.mapValue)return-1;let c=s.fields||{},u=Object.keys(c),h=o.fields||{},f=Object.keys(h);u.sort(),f.sort();for(let m=0;m<u.length&&m<f.length;++m){let v=$(u[m],f[m]);if(v!==0)return v;let S=Ct(c[u[m]],h[f[m]]);if(S!==0)return S}return $(u.length,f.length)}(r.mapValue,e.mapValue);default:throw L()}}function Sf(r,e){if(typeof r=="string"&&typeof e=="string"&&r.length===e.length)return $(r,e);let t=ct(r),n=ct(e),i=$(t.seconds,n.seconds);return i!==0?i:$(t.nanos,n.nanos)}function Rf(r,e){let t=r.values||[],n=e.values||[];for(let i=0;i<t.length&&i<n.length;++i){let s=Ct(t[i],n[i]);if(s)return s}return $(t.length,n.length)}function Zn(r){return Qc(r)}function Qc(r){return"nullValue"in r?"null":"booleanValue"in r?""+r.booleanValue:"integerValue"in r?""+r.integerValue:"doubleValue"in r?""+r.doubleValue:"timestampValue"in r?function(t){let n=ct(t);return`time(${n.seconds},${n.nanos})`}(r.timestampValue):"stringValue"in r?r.stringValue:"bytesValue"in r?function(t){return ut(t).toBase64()}(r.bytesValue):"referenceValue"in r?function(t){return V.fromName(t).toString()}(r.referenceValue):"geoPointValue"in r?function(t){return`geo(${t.latitude},${t.longitude})`}(r.geoPointValue):"arrayValue"in r?function(t){let n="[",i=!0;for(let s of t.values||[])i?i=!1:n+=",",n+=Qc(s);return n+"]"}(r.arrayValue):"mapValue"in r?function(t){let n=Object.keys(t.fields||{}).sort(),i="{",s=!0;for(let o of n)s?s=!1:i+=",",i+=`${o}:${Qc(t.fields[o])}`;return i+"}"}(r.mapValue):L()}function Us(r){switch(Pt(r)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:let e=zo(r);return e?16+Us(e):16;case 5:return 2*r.stringValue.length;case 6:return ut(r.bytesValue).approximateByteSize();case 7:return r.referenceValue.length;case 9:return function(n){return(n.values||[]).reduce((i,s)=>i+Us(s),0)}(r.arrayValue);case 10:case 11:return function(n){let i=0;return Ut(n.fields,(s,o)=>{i+=s.length+Us(o)}),i}(r.mapValue);default:throw L()}}function gi(r,e){return{referenceValue:`projects/${r.projectId}/databases/${r.database}/documents/${e.path.canonicalString()}`}}function Jc(r){return!!r&&"integerValue"in r}function _i(r){return!!r&&"arrayValue"in r}function Pf(r){return!!r&&"nullValue"in r}function Cf(r){return!!r&&"doubleValue"in r&&isNaN(Number(r.doubleValue))}function Bs(r){return!!r&&"mapValue"in r}function Go(r){var e,t;return((t=(((e=r==null?void 0:r.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="__vector__"}function ii(r){if(r.geoPointValue)return{geoPointValue:Object.assign({},r.geoPointValue)};if(r.timestampValue&&typeof r.timestampValue=="object")return{timestampValue:Object.assign({},r.timestampValue)};if(r.mapValue){let e={mapValue:{fields:{}}};return Ut(r.mapValue.fields,(t,n)=>e.mapValue.fields[t]=ii(n)),e}if(r.arrayValue){let e={arrayValue:{values:[]}};for(let t=0;t<(r.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=ii(r.arrayValue.values[t]);return e}return Object.assign({},r)}function Vp(r){return(((r.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}var Lp={mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{}}}}};function Kv(r){return"nullValue"in r?Fs:"booleanValue"in r?{booleanValue:!1}:"integerValue"in r||"doubleValue"in r?{doubleValue:NaN}:"timestampValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in r?{stringValue:""}:"bytesValue"in r?{bytesValue:""}:"referenceValue"in r?gi(Xn.empty(),V.empty()):"geoPointValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in r?{arrayValue:{}}:"mapValue"in r?Go(r)?Lp:{mapValue:{}}:L()}function Wv(r){return"nullValue"in r?{booleanValue:!1}:"booleanValue"in r?{doubleValue:NaN}:"integerValue"in r||"doubleValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in r?{stringValue:""}:"stringValue"in r?{bytesValue:""}:"bytesValue"in r?gi(Xn.empty(),V.empty()):"referenceValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in r?{arrayValue:{}}:"arrayValue"in r?Lp:"mapValue"in r?Go(r)?{mapValue:{}}:bt:L()}function Df(r,e){let t=Ct(r.value,e.value);return t!==0?t:r.inclusive&&!e.inclusive?-1:!r.inclusive&&e.inclusive?1:0}function kf(r,e){let t=Ct(r.value,e.value);return t!==0?t:r.inclusive&&!e.inclusive?1:!r.inclusive&&e.inclusive?-1:0}var De=class r{constructor(e){this.value=e}static empty(){return new r({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(t=(t.mapValue.fields||{})[e.get(n)],!Bs(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=ii(t)}setAll(e){let t=me.emptyPath(),n={},i=[];e.forEach((o,c)=>{if(!t.isImmediateParentOf(c)){let u=this.getFieldsMap(t);this.applyChanges(u,n,i),n={},i=[],t=c.popLast()}o?n[c.lastSegment()]=ii(o):i.push(c.lastSegment())});let s=this.getFieldsMap(t);this.applyChanges(s,n,i)}delete(e){let t=this.field(e.popLast());Bs(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Ze(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let i=t.mapValue.fields[e.get(n)];Bs(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,n){Ut(t,(i,s)=>e[i]=s);for(let i of n)delete e[i]}clone(){return new r(ii(this.value))}};function Mp(r){let e=[];return Ut(r.fields,(t,n)=>{let i=new me([t]);if(Bs(n)){let s=Mp(n.mapValue).fields;if(s.length===0)e.push(i);else for(let o of s)e.push(i.child(o))}else e.push(i)}),new Me(e)}var Ie=class r{constructor(e,t,n,i,s,o,c){this.key=e,this.documentType=t,this.version=n,this.readTime=i,this.createTime=s,this.data=o,this.documentState=c}static newInvalidDocument(e){return new r(e,0,q.min(),q.min(),q.min(),De.empty(),0)}static newFoundDocument(e,t,n,i){return new r(e,1,t,q.min(),n,i,0)}static newNoDocument(e,t){return new r(e,2,t,q.min(),q.min(),De.empty(),0)}static newUnknownDocument(e,t){return new r(e,3,t,q.min(),q.min(),De.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(q.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=De.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=De.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=q.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof r&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new r(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}};var Dt=class{constructor(e,t){this.position=e,this.inclusive=t}};function Nf(r,e,t){let n=0;for(let i=0;i<r.position.length;i++){let s=e[i],o=r.position[i];if(s.field.isKeyField()?n=V.comparator(V.fromName(o.referenceValue),t.key):n=Ct(o,t.data.field(s.field)),s.dir==="desc"&&(n*=-1),n!==0)break}return n}function Of(r,e){if(r===null)return e===null;if(e===null||r.inclusive!==e.inclusive||r.position.length!==e.position.length)return!1;for(let t=0;t<r.position.length;t++)if(!Ze(r.position[t],e.position[t]))return!1;return!0}var er=class{constructor(e,t="asc"){this.field=e,this.dir=t}};function Hv(r,e){return r.dir===e.dir&&r.field.isEqual(e.field)}var Qs=class{},Q=class r extends Qs{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,n):new Zc(e,t,n):t==="array-contains"?new nu(e,n):t==="in"?new Js(e,n):t==="not-in"?new ru(e,n):t==="array-contains-any"?new iu(e,n):new r(e,t,n)}static createKeyFieldInFilter(e,t,n){return t==="in"?new eu(e,n):new tu(e,n)}matches(e){let t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(Ct(t,this.value)):t!==null&&Pt(this.value)===Pt(t)&&this.matchesComparison(Ct(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return L()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}},Z=class r extends Qs{constructor(e,t){super(),this.filters=e,this.op=t,this.ae=null}static create(e,t){return new r(e,t)}matches(e){return tr(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}};function tr(r){return r.op==="and"}function Yc(r){return r.op==="or"}function Ul(r){return Fp(r)&&tr(r)}function Fp(r){for(let e of r.filters)if(e instanceof Z)return!1;return!0}function Xc(r){if(r instanceof Q)return r.field.canonicalString()+r.op.toString()+Zn(r.value);if(Ul(r))return r.filters.map(e=>Xc(e)).join(",");{let e=r.filters.map(t=>Xc(t)).join(",");return`${r.op}(${e})`}}function Up(r,e){return r instanceof Q?function(n,i){return i instanceof Q&&n.op===i.op&&n.field.isEqual(i.field)&&Ze(n.value,i.value)}(r,e):r instanceof Z?function(n,i){return i instanceof Z&&n.op===i.op&&n.filters.length===i.filters.length?n.filters.reduce((s,o,c)=>s&&Up(o,i.filters[c]),!0):!1}(r,e):void L()}function Bp(r,e){let t=r.filters.concat(e);return Z.create(t,r.op)}function qp(r){return r instanceof Q?function(t){return`${t.field.canonicalString()} ${t.op} ${Zn(t.value)}`}(r):r instanceof Z?function(t){return t.op.toString()+" {"+t.getFilters().map(qp).join(" ,")+"}"}(r):"Filter"}var Zc=class extends Q{constructor(e,t,n){super(e,t,n),this.key=V.fromName(n.referenceValue)}matches(e){let t=V.comparator(e.key,this.key);return this.matchesComparison(t)}},eu=class extends Q{constructor(e,t){super(e,"in",t),this.keys=jp("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}},tu=class extends Q{constructor(e,t){super(e,"not-in",t),this.keys=jp("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}};function jp(r,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(n=>V.fromName(n.referenceValue))}var nu=class extends Q{constructor(e,t){super(e,"array-contains",t)}matches(e){let t=e.data.field(this.field);return _i(t)&&mi(t.arrayValue,this.value)}},Js=class extends Q{constructor(e,t){super(e,"in",t)}matches(e){let t=e.data.field(this.field);return t!==null&&mi(this.value.arrayValue,t)}},ru=class extends Q{constructor(e,t){super(e,"not-in",t)}matches(e){if(mi(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;let t=e.data.field(this.field);return t!==null&&!mi(this.value.arrayValue,t)}},iu=class extends Q{constructor(e,t){super(e,"array-contains-any",t)}matches(e){let t=e.data.field(this.field);return!(!_i(t)||!t.arrayValue.values)&&t.arrayValue.values.some(n=>mi(this.value.arrayValue,n))}};var su=class{constructor(e,t=null,n=[],i=[],s=null,o=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=i,this.limit=s,this.startAt=o,this.endAt=c,this.ue=null}};function ou(r,e=null,t=[],n=[],i=null,s=null,o=null){return new su(r,e,t,n,i,s,o)}function fn(r){let e=M(r);if(e.ue===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(n=>Xc(n)).join(","),t+="|ob:",t+=e.orderBy.map(n=>function(s){return s.field.canonicalString()+s.dir}(n)).join(","),jo(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(n=>Zn(n)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(n=>Zn(n)).join(",")),e.ue=t}return e.ue}function ki(r,e){if(r.limit!==e.limit||r.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<r.orderBy.length;t++)if(!Hv(r.orderBy[t],e.orderBy[t]))return!1;if(r.filters.length!==e.filters.length)return!1;for(let t=0;t<r.filters.length;t++)if(!Up(r.filters[t],e.filters[t]))return!1;return r.collectionGroup===e.collectionGroup&&!!r.path.isEqual(e.path)&&!!Of(r.startAt,e.startAt)&&Of(r.endAt,e.endAt)}function Ys(r){return V.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}function Xs(r,e){return r.filters.filter(t=>t instanceof Q&&t.field.isEqual(e))}function xf(r,e,t){let n=Fs,i=!0;for(let s of Xs(r,e)){let o=Fs,c=!0;switch(s.op){case"<":case"<=":o=Kv(s.value);break;case"==":case"in":case">=":o=s.value;break;case">":o=s.value,c=!1;break;case"!=":case"not-in":o=Fs}Df({value:n,inclusive:i},{value:o,inclusive:c})<0&&(n=o,i=c)}if(t!==null){for(let s=0;s<r.orderBy.length;++s)if(r.orderBy[s].field.isEqual(e)){let o=t.position[s];Df({value:n,inclusive:i},{value:o,inclusive:t.inclusive})<0&&(n=o,i=t.inclusive);break}}return{value:n,inclusive:i}}function Vf(r,e,t){let n=bt,i=!0;for(let s of Xs(r,e)){let o=bt,c=!0;switch(s.op){case">=":case">":o=Wv(s.value),c=!1;break;case"==":case"in":case"<=":o=s.value;break;case"<":o=s.value,c=!1;break;case"!=":case"not-in":o=bt}kf({value:n,inclusive:i},{value:o,inclusive:c})>0&&(n=o,i=c)}if(t!==null){for(let s=0;s<r.orderBy.length;++s)if(r.orderBy[s].field.isEqual(e)){let o=t.position[s];kf({value:n,inclusive:i},{value:o,inclusive:t.inclusive})>0&&(n=o,i=t.inclusive);break}}return{value:n,inclusive:i}}var pn=class{constructor(e,t=null,n=[],i=[],s=null,o="F",c=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=i,this.limit=s,this.limitType=o,this.startAt=c,this.endAt=u,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}};function zp(r,e,t,n,i,s,o,c){return new pn(r,e,t,n,i,s,o,c)}function $o(r){return new pn(r)}function Lf(r){return r.filters.length===0&&r.limit===null&&r.startAt==null&&r.endAt==null&&(r.explicitOrderBy.length===0||r.explicitOrderBy.length===1&&r.explicitOrderBy[0].field.isKeyField())}function Gp(r){return r.collectionGroup!==null}function si(r){let e=M(r);if(e.ce===null){e.ce=[];let t=new Set;for(let s of e.explicitOrderBy)e.ce.push(s),t.add(s.field.canonicalString());let n=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new te(me.comparator);return o.filters.forEach(u=>{u.getFlattenedFilters().forEach(h=>{h.isInequality()&&(c=c.add(h.field))})}),c})(e).forEach(s=>{t.has(s.canonicalString())||s.isKeyField()||e.ce.push(new er(s,n))}),t.has(me.keyField().canonicalString())||e.ce.push(new er(me.keyField(),n))}return e.ce}function Ue(r){let e=M(r);return e.le||(e.le=Qv(e,si(r))),e.le}function Qv(r,e){if(r.limitType==="F")return ou(r.path,r.collectionGroup,e,r.filters,r.limit,r.startAt,r.endAt);{e=e.map(i=>{let s=i.dir==="desc"?"asc":"desc";return new er(i.field,s)});let t=r.endAt?new Dt(r.endAt.position,r.endAt.inclusive):null,n=r.startAt?new Dt(r.startAt.position,r.startAt.inclusive):null;return ou(r.path,r.collectionGroup,e,r.filters,r.limit,t,n)}}function au(r,e){let t=r.filters.concat([e]);return new pn(r.path,r.collectionGroup,r.explicitOrderBy.slice(),t,r.limit,r.limitType,r.startAt,r.endAt)}function cu(r,e,t){return new pn(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),e,t,r.startAt,r.endAt)}function Ko(r,e){return ki(Ue(r),Ue(e))&&r.limitType===e.limitType}function $p(r){return`${fn(Ue(r))}|lt:${r.limitType}`}function qn(r){return`Query(target=${function(t){let n=t.path.canonicalString();return t.collectionGroup!==null&&(n+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(n+=`, filters: [${t.filters.map(i=>qp(i)).join(", ")}]`),jo(t.limit)||(n+=", limit: "+t.limit),t.orderBy.length>0&&(n+=`, orderBy: [${t.orderBy.map(i=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(i)).join(", ")}]`),t.startAt&&(n+=", startAt: ",n+=t.startAt.inclusive?"b:":"a:",n+=t.startAt.position.map(i=>Zn(i)).join(",")),t.endAt&&(n+=", endAt: ",n+=t.endAt.inclusive?"a:":"b:",n+=t.endAt.position.map(i=>Zn(i)).join(",")),`Target(${n})`}(Ue(r))}; limitType=${r.limitType})`}function Ni(r,e){return e.isFoundDocument()&&function(n,i){let s=i.key.path;return n.collectionGroup!==null?i.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(s):V.isDocumentKey(n.path)?n.path.isEqual(s):n.path.isImmediateParentOf(s)}(r,e)&&function(n,i){for(let s of si(n))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0}(r,e)&&function(n,i){for(let s of n.filters)if(!s.matches(i))return!1;return!0}(r,e)&&function(n,i){return!(n.startAt&&!function(o,c,u){let h=Nf(o,c,u);return o.inclusive?h<=0:h<0}(n.startAt,si(n),i)||n.endAt&&!function(o,c,u){let h=Nf(o,c,u);return o.inclusive?h>=0:h>0}(n.endAt,si(n),i))}(r,e)}function Kp(r){return r.collectionGroup||(r.path.length%2==1?r.path.lastSegment():r.path.get(r.path.length-2))}function Wp(r){return(e,t)=>{let n=!1;for(let i of si(r)){let s=Jv(i,e,t);if(s!==0)return s;n=n||i.field.isKeyField()}return 0}}function Jv(r,e,t){let n=r.field.isKeyField()?V.comparator(e.key,t.key):function(s,o,c){let u=o.data.field(s),h=c.data.field(s);return u!==null&&h!==null?Ct(u,h):L()}(r.field,e,t);switch(r.dir){case"asc":return n;case"desc":return-1*n;default:return L()}}var Ge=class{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){let t=this.mapKeyFn(e),n=this.inner[t];if(n!==void 0){for(let[i,s]of n)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,t){let n=this.mapKeyFn(e),i=this.inner[n];if(i===void 0)return this.inner[n]=[[e,t]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){let t=this.mapKeyFn(e),n=this.inner[t];if(n===void 0)return!1;for(let i=0;i<n.length;i++)if(this.equalsFn(n[i][0],e))return n.length===1?delete this.inner[t]:n.splice(i,1),this.innerSize--,!0;return!1}forEach(e){Ut(this.inner,(t,n)=>{for(let[i,s]of n)e(i,s)})}isEmpty(){return xp(this.inner)}size(){return this.innerSize}};var Yv=new ie(V.comparator);function Fe(){return Yv}var Hp=new ie(V.comparator);function ni(...r){let e=Hp;for(let t of r)e=e.insert(t.key,t);return e}function Qp(r){let e=Hp;return r.forEach((t,n)=>e=e.insert(t,n.overlayedDocument)),e}function Je(){return oi()}function Jp(){return oi()}function oi(){return new Ge(r=>r.toString(),(r,e)=>r.isEqual(e))}var Xv=new ie(V.comparator),Zv=new te(V.comparator);function K(...r){let e=Zv;for(let t of r)e=e.add(t);return e}var eI=new te($);function Bl(){return eI}function ql(r,e){if(r.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:di(e)?"-0":e}}function Yp(r){return{integerValue:""+r}}function tI(r,e){return Cp(e)?Yp(e):ql(r,e)}var nr=class{constructor(){this._=void 0}};function nI(r,e,t){return r instanceof kt?function(i,s){let o={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&Fl(s)&&(s=zo(s)),s&&(o.fields.__previous_value__=s),{mapValue:o}}(t,e):r instanceof Nt?Zp(r,e):r instanceof Ot?em(r,e):function(i,s){let o=Xp(i,s),c=Mf(o)+Mf(i.Pe);return Jc(o)&&Jc(i.Pe)?Yp(c):ql(i.serializer,c)}(r,e)}function rI(r,e,t){return r instanceof Nt?Zp(r,e):r instanceof Ot?em(r,e):t}function Xp(r,e){return r instanceof mn?function(n){return Jc(n)||function(s){return!!s&&"doubleValue"in s}(n)}(e)?e:{integerValue:0}:null}var kt=class extends nr{},Nt=class extends nr{constructor(e){super(),this.elements=e}};function Zp(r,e){let t=tm(e);for(let n of r.elements)t.some(i=>Ze(i,n))||t.push(n);return{arrayValue:{values:t}}}var Ot=class extends nr{constructor(e){super(),this.elements=e}};function em(r,e){let t=tm(e);for(let n of r.elements)t=t.filter(i=>!Ze(i,n));return{arrayValue:{values:t}}}var mn=class extends nr{constructor(e,t){super(),this.serializer=e,this.Pe=t}};function Mf(r){return oe(r.integerValue||r.doubleValue)}function tm(r){return _i(r)&&r.arrayValue.values?r.arrayValue.values.slice():[]}var Zs=class{constructor(e,t){this.field=e,this.transform=t}};function iI(r,e){return r.field.isEqual(e.field)&&function(n,i){return n instanceof Nt&&i instanceof Nt||n instanceof Ot&&i instanceof Ot?Qn(n.elements,i.elements,Ze):n instanceof mn&&i instanceof mn?Ze(n.Pe,i.Pe):n instanceof kt&&i instanceof kt}(r.transform,e.transform)}var uu=class{constructor(e,t){this.version=e,this.transformResults=t}},ke=class r{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new r}static exists(e){return new r(void 0,e)}static updateTime(e){return new r(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}};function qs(r,e){return r.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(r.updateTime):r.exists===void 0||r.exists===e.isFoundDocument()}var rr=class{};function nm(r,e){if(!r.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return r.isNoDocument()?new ir(r.key,ke.none()):new xt(r.key,r.data,ke.none());{let t=r.data,n=De.empty(),i=new te(me.comparator);for(let s of e.fields)if(!i.has(s)){let o=t.field(s);o===null&&s.length>1&&(s=s.popLast(),o=t.field(s)),o===null?n.delete(s):n.set(s,o),i=i.add(s)}return new $e(r.key,n,new Me(i.toArray()),ke.none())}}function sI(r,e,t){r instanceof xt?function(i,s,o){let c=i.value.clone(),u=Uf(i.fieldTransforms,s,o.transformResults);c.setAll(u),s.convertToFoundDocument(o.version,c).setHasCommittedMutations()}(r,e,t):r instanceof $e?function(i,s,o){if(!qs(i.precondition,s))return void s.convertToUnknownDocument(o.version);let c=Uf(i.fieldTransforms,s,o.transformResults),u=s.data;u.setAll(rm(i)),u.setAll(c),s.convertToFoundDocument(o.version,u).setHasCommittedMutations()}(r,e,t):function(i,s,o){s.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,t)}function ai(r,e,t,n){return r instanceof xt?function(s,o,c,u){if(!qs(s.precondition,o))return c;let h=s.value.clone(),f=Bf(s.fieldTransforms,u,o);return h.setAll(f),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),null}(r,e,t,n):r instanceof $e?function(s,o,c,u){if(!qs(s.precondition,o))return c;let h=Bf(s.fieldTransforms,u,o),f=o.data;return f.setAll(rm(s)),f.setAll(h),o.convertToFoundDocument(o.version,f).setHasLocalMutations(),c===null?null:c.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(m=>m.field))}(r,e,t,n):function(s,o,c){return qs(s.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):c}(r,e,t)}function oI(r,e){let t=null;for(let n of r.fieldTransforms){let i=e.data.field(n.field),s=Xp(n.transform,i||null);s!=null&&(t===null&&(t=De.empty()),t.set(n.field,s))}return t||null}function Ff(r,e){return r.type===e.type&&!!r.key.isEqual(e.key)&&!!r.precondition.isEqual(e.precondition)&&!!function(n,i){return n===void 0&&i===void 0||!(!n||!i)&&Qn(n,i,(s,o)=>iI(s,o))}(r.fieldTransforms,e.fieldTransforms)&&(r.type===0?r.value.isEqual(e.value):r.type!==1||r.data.isEqual(e.data)&&r.fieldMask.isEqual(e.fieldMask))}var xt=class extends rr{constructor(e,t,n,i=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}},$e=class extends rr{constructor(e,t,n,i,s=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}};function rm(r){let e=new Map;return r.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){let n=r.data.field(t);e.set(t,n)}}),e}function Uf(r,e,t){let n=new Map;F(r.length===t.length);for(let i=0;i<t.length;i++){let s=r[i],o=s.transform,c=e.data.field(s.field);n.set(s.field,rI(o,c,t[i]))}return n}function Bf(r,e,t){let n=new Map;for(let i of r){let s=i.transform,o=t.data.field(i.field);n.set(i.field,nI(s,o,e))}return n}var ir=class extends rr{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}},eo=class extends rr{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}};var yi=class{constructor(e,t,n,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=i}applyToRemoteDocument(e,t){let n=t.mutationResults;for(let i=0;i<this.mutations.length;i++){let s=this.mutations[i];s.key.isEqual(e.key)&&sI(s,e,n[i])}}applyToLocalView(e,t){for(let n of this.baseMutations)n.key.isEqual(e.key)&&(t=ai(n,e,t,this.localWriteTime));for(let n of this.mutations)n.key.isEqual(e.key)&&(t=ai(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){let n=Jp();return this.mutations.forEach(i=>{let s=e.get(i.key),o=s.overlayedDocument,c=this.applyToLocalView(o,s.mutatedFields);c=t.has(i.key)?null:c;let u=nm(o,c);u!==null&&n.set(i.key,u),o.isValidDocument()||o.convertToNoDocument(q.min())}),n}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),K())}isEqual(e){return this.batchId===e.batchId&&Qn(this.mutations,e.mutations,(t,n)=>Ff(t,n))&&Qn(this.baseMutations,e.baseMutations,(t,n)=>Ff(t,n))}},lu=class r{constructor(e,t,n,i){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=i}static from(e,t,n){F(e.mutations.length===n.length);let i=function(){return Xv}(),s=e.mutations;for(let o=0;o<s.length;o++)i=i.insert(s[o].key,n[o].version);return new r(e,t,n,i)}};var vi=class{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}};var hu=class{constructor(e,t){this.count=e,this.unchangedNames=t}};var he,J;function aI(r){switch(r){default:return L();case P.CANCELLED:case P.UNKNOWN:case P.DEADLINE_EXCEEDED:case P.RESOURCE_EXHAUSTED:case P.INTERNAL:case P.UNAVAILABLE:case P.UNAUTHENTICATED:return!1;case P.INVALID_ARGUMENT:case P.NOT_FOUND:case P.ALREADY_EXISTS:case P.PERMISSION_DENIED:case P.FAILED_PRECONDITION:case P.ABORTED:case P.OUT_OF_RANGE:case P.UNIMPLEMENTED:case P.DATA_LOSS:return!0}}function im(r){if(r===void 0)return ce("GRPC error has no .code"),P.UNKNOWN;switch(r){case he.OK:return P.OK;case he.CANCELLED:return P.CANCELLED;case he.UNKNOWN:return P.UNKNOWN;case he.DEADLINE_EXCEEDED:return P.DEADLINE_EXCEEDED;case he.RESOURCE_EXHAUSTED:return P.RESOURCE_EXHAUSTED;case he.INTERNAL:return P.INTERNAL;case he.UNAVAILABLE:return P.UNAVAILABLE;case he.UNAUTHENTICATED:return P.UNAUTHENTICATED;case he.INVALID_ARGUMENT:return P.INVALID_ARGUMENT;case he.NOT_FOUND:return P.NOT_FOUND;case he.ALREADY_EXISTS:return P.ALREADY_EXISTS;case he.PERMISSION_DENIED:return P.PERMISSION_DENIED;case he.FAILED_PRECONDITION:return P.FAILED_PRECONDITION;case he.ABORTED:return P.ABORTED;case he.OUT_OF_RANGE:return P.OUT_OF_RANGE;case he.UNIMPLEMENTED:return P.UNIMPLEMENTED;case he.DATA_LOSS:return P.DATA_LOSS;default:return L()}}(J=he||(he={}))[J.OK=0]="OK",J[J.CANCELLED=1]="CANCELLED",J[J.UNKNOWN=2]="UNKNOWN",J[J.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",J[J.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",J[J.NOT_FOUND=5]="NOT_FOUND",J[J.ALREADY_EXISTS=6]="ALREADY_EXISTS",J[J.PERMISSION_DENIED=7]="PERMISSION_DENIED",J[J.UNAUTHENTICATED=16]="UNAUTHENTICATED",J[J.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",J[J.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",J[J.ABORTED=10]="ABORTED",J[J.OUT_OF_RANGE=11]="OUT_OF_RANGE",J[J.UNIMPLEMENTED=12]="UNIMPLEMENTED",J[J.INTERNAL=13]="INTERNAL",J[J.UNAVAILABLE=14]="UNAVAILABLE",J[J.DATA_LOSS=15]="DATA_LOSS";var qf=null;function cI(){return new TextEncoder}var uI=new wt([4294967295,4294967295],0);function jf(r){let e=cI().encode(r),t=new Ac;return t.update(e),new Uint8Array(t.digest())}function zf(r){let e=new DataView(r.buffer),t=e.getUint32(0,!0),n=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new wt([t,n],0),new wt([i,s],0)]}var du=class r{constructor(e,t,n){if(this.bitmap=e,this.padding=t,this.hashCount=n,t<0||t>=8)throw new cn(`Invalid padding: ${t}`);if(n<0)throw new cn(`Invalid hash count: ${n}`);if(e.length>0&&this.hashCount===0)throw new cn(`Invalid hash count: ${n}`);if(e.length===0&&t!==0)throw new cn(`Invalid padding when bitmap length is 0: ${t}`);this.Te=8*e.length-t,this.Ie=wt.fromNumber(this.Te)}Ee(e,t,n){let i=e.add(t.multiply(wt.fromNumber(n)));return i.compare(uI)===1&&(i=new wt([i.getBits(0),i.getBits(1)],0)),i.modulo(this.Ie).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Te===0)return!1;let t=jf(e),[n,i]=zf(t);for(let s=0;s<this.hashCount;s++){let o=this.Ee(n,i,s);if(!this.de(o))return!1}return!0}static create(e,t,n){let i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),o=new r(s,i,t);return n.forEach(c=>o.insert(c)),o}insert(e){if(this.Te===0)return;let t=jf(e),[n,i]=zf(t);for(let s=0;s<this.hashCount;s++){let o=this.Ee(n,i,s);this.Ae(o)}}Ae(e){let t=Math.floor(e/8),n=e%8;this.bitmap[t]|=1<<n}},cn=class extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}};var Ii=class r{constructor(e,t,n,i,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,n){let i=new Map;return i.set(e,wi.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new r(q.min(),i,new ie($),Fe(),K())}},wi=class r{constructor(e,t,n,i,s){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new r(n,t,K(),K(),K())}};var Wn=class{constructor(e,t,n,i){this.Re=e,this.removedTargetIds=t,this.key=n,this.Ve=i}},to=class{constructor(e,t){this.targetId=e,this.me=t}},no=class{constructor(e,t,n=fe.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=i}},ro=class{constructor(){this.fe=0,this.ge=Gf(),this.pe=fe.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=K(),t=K(),n=K();return this.ge.forEach((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:n=n.add(i);break;default:L()}}),new wi(this.pe,this.ye,e,t,n)}Ce(){this.we=!1,this.ge=Gf()}Fe(e,t){this.we=!0,this.ge=this.ge.insert(e,t)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,F(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}},fu=class{constructor(e){this.Le=e,this.Be=new Map,this.ke=Fe(),this.qe=Ns(),this.Qe=Ns(),this.Ke=new ie($)}$e(e){for(let t of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.Ue(t,e.Ve):this.We(t,e.key,e.Ve);for(let t of e.removedTargetIds)this.We(t,e.key,e.Ve)}Ge(e){this.forEachTarget(e,t=>{let n=this.ze(t);switch(e.state){case 0:this.je(t)&&n.De(e.resumeToken);break;case 1:n.Oe(),n.Se||n.Ce(),n.De(e.resumeToken);break;case 2:n.Oe(),n.Se||this.removeTarget(t);break;case 3:this.je(t)&&(n.Ne(),n.De(e.resumeToken));break;case 4:this.je(t)&&(this.He(t),n.De(e.resumeToken));break;default:L()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Be.forEach((n,i)=>{this.je(i)&&t(i)})}Je(e){let t=e.targetId,n=e.me.count,i=this.Ye(t);if(i){let s=i.target;if(Ys(s))if(n===0){let o=new V(s.path);this.We(t,o,Ie.newNoDocument(o,q.min()))}else F(n===1);else{let o=this.Ze(t);if(o!==n){let c=this.Xe(e),u=c?this.et(c,e,o):1;if(u!==0){this.He(t);let h=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ke=this.Ke.insert(t,h)}qf==null||qf.tt(function(f,m,v,S,D){var N,k,z,j,U,W;let Y={localCacheCount:f,existenceFilterCount:m.count,databaseId:v.database,projectId:v.projectId},G=m.unchangedNames;return G&&(Y.bloomFilter={applied:D===0,hashCount:(N=G==null?void 0:G.hashCount)!==null&&N!==void 0?N:0,bitmapLength:(j=(z=(k=G==null?void 0:G.bits)===null||k===void 0?void 0:k.bitmap)===null||z===void 0?void 0:z.length)!==null&&j!==void 0?j:0,padding:(W=(U=G==null?void 0:G.bits)===null||U===void 0?void 0:U.padding)!==null&&W!==void 0?W:0,mightContain:I=>{var g;return(g=S==null?void 0:S.mightContain(I))!==null&&g!==void 0&&g}}),Y}(o,e.me,this.Le.nt(),c,u))}}}}Xe(e){let t=e.me.unchangedNames;if(!t||!t.bits)return null;let{bits:{bitmap:n="",padding:i=0},hashCount:s=0}=t,o,c;try{o=ut(n).toUint8Array()}catch(u){if(u instanceof Hs)return li("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{c=new du(o,i,s)}catch(u){return li(u instanceof cn?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return c.Te===0?null:c}et(e,t,n){return t.me.count===n-this.rt(e,t.targetId)?0:2}rt(e,t){let n=this.Le.getRemoteKeysForTarget(t),i=0;return n.forEach(s=>{let o=this.Le.nt(),c=`projects/${o.projectId}/databases/${o.database}/documents/${s.path.canonicalString()}`;e.mightContain(c)||(this.We(t,s,null),i++)}),i}it(e){let t=new Map;this.Be.forEach((s,o)=>{let c=this.Ye(o);if(c){if(s.current&&Ys(c.target)){let u=new V(c.target.path);this.st(u).has(o)||this.ot(o,u)||this.We(o,u,Ie.newNoDocument(u,e))}s.be&&(t.set(o,s.ve()),s.Ce())}});let n=K();this.Qe.forEach((s,o)=>{let c=!0;o.forEachWhile(u=>{let h=this.Ye(u);return!h||h.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(n=n.add(s))}),this.ke.forEach((s,o)=>o.setReadTime(e));let i=new Ii(e,t,this.Ke,this.ke,n);return this.ke=Fe(),this.qe=Ns(),this.Qe=Ns(),this.Ke=new ie($),i}Ue(e,t){if(!this.je(e))return;let n=this.ot(e,t.key)?2:0;this.ze(e).Fe(t.key,n),this.ke=this.ke.insert(t.key,t),this.qe=this.qe.insert(t.key,this.st(t.key).add(e)),this.Qe=this.Qe.insert(t.key,this._t(t.key).add(e))}We(e,t,n){if(!this.je(e))return;let i=this.ze(e);this.ot(e,t)?i.Fe(t,1):i.Me(t),this.Qe=this.Qe.insert(t,this._t(t).delete(e)),this.Qe=this.Qe.insert(t,this._t(t).add(e)),n&&(this.ke=this.ke.insert(t,n))}removeTarget(e){this.Be.delete(e)}Ze(e){let t=this.ze(e).ve();return this.Le.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}xe(e){this.ze(e).xe()}ze(e){let t=this.Be.get(e);return t||(t=new ro,this.Be.set(e,t)),t}_t(e){let t=this.Qe.get(e);return t||(t=new te($),this.Qe=this.Qe.insert(e,t)),t}st(e){let t=this.qe.get(e);return t||(t=new te($),this.qe=this.qe.insert(e,t)),t}je(e){let t=this.Ye(e)!==null;return t||C("WatchChangeAggregator","Detected inactive target",e),t}Ye(e){let t=this.Be.get(e);return t&&t.Se?null:this.Le.ut(e)}He(e){this.Be.set(e,new ro),this.Le.getRemoteKeysForTarget(e).forEach(t=>{this.We(e,t,null)})}ot(e,t){return this.Le.getRemoteKeysForTarget(e).has(t)}};function Ns(){return new ie(V.comparator)}function Gf(){return new ie(V.comparator)}var lI={asc:"ASCENDING",desc:"DESCENDING"},hI={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},dI={and:"AND",or:"OR"},pu=class{constructor(e,t){this.databaseId=e,this.useProto3Json=t}};function mu(r,e){return r.useProto3Json||jo(e)?e:{value:e}}function sr(r,e){return r.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function sm(r,e){return r.useProto3Json?e.toBase64():e.toUint8Array()}function fI(r,e){return sr(r,e.toTimestamp())}function Ne(r){return F(!!r),q.fromTimestamp(function(t){let n=ct(t);return new ue(n.seconds,n.nanos)}(r))}function jl(r,e){return gu(r,e).canonicalString()}function gu(r,e){let t=function(i){return new ee(["projects",i.projectId,"databases",i.database])}(r).child("documents");return e===void 0?t:t.child(e)}function om(r){let e=ee.fromString(r);return F(mm(e)),e}function io(r,e){return jl(r.databaseId,e.path)}function hn(r,e){let t=om(e);if(t.get(1)!==r.databaseId.projectId)throw new x(P.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+r.databaseId.projectId);if(t.get(3)!==r.databaseId.database)throw new x(P.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+r.databaseId.database);return new V(um(t))}function am(r,e){return jl(r.databaseId,e)}function cm(r){let e=om(r);return e.length===4?ee.emptyPath():um(e)}function _u(r){return new ee(["projects",r.databaseId.projectId,"databases",r.databaseId.database]).canonicalString()}function um(r){return F(r.length>4&&r.get(4)==="documents"),r.popFirst(5)}function $f(r,e,t){return{name:io(r,e),fields:t.value.mapValue.fields}}function pI(r,e,t){let n=hn(r,e.name),i=Ne(e.updateTime),s=e.createTime?Ne(e.createTime):q.min(),o=new De({mapValue:{fields:e.fields}}),c=Ie.newFoundDocument(n,i,s,o);return t&&c.setHasCommittedMutations(),t?c.setHasCommittedMutations():c}function mI(r,e){let t;if("targetChange"in e){e.targetChange;let n=function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:L()}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=function(h,f){return h.useProto3Json?(F(f===void 0||typeof f=="string"),fe.fromBase64String(f||"")):(F(f===void 0||f instanceof Buffer||f instanceof Uint8Array),fe.fromUint8Array(f||new Uint8Array))}(r,e.targetChange.resumeToken),o=e.targetChange.cause,c=o&&function(h){let f=h.code===void 0?P.UNKNOWN:im(h.code);return new x(f,h.message||"")}(o);t=new no(n,i,s,c||null)}else if("documentChange"in e){e.documentChange;let n=e.documentChange;n.document,n.document.name,n.document.updateTime;let i=hn(r,n.document.name),s=Ne(n.document.updateTime),o=n.document.createTime?Ne(n.document.createTime):q.min(),c=new De({mapValue:{fields:n.document.fields}}),u=Ie.newFoundDocument(i,s,o,c),h=n.targetIds||[],f=n.removedTargetIds||[];t=new Wn(h,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;let n=e.documentDelete;n.document;let i=hn(r,n.document),s=n.readTime?Ne(n.readTime):q.min(),o=Ie.newNoDocument(i,s),c=n.removedTargetIds||[];t=new Wn([],c,o.key,o)}else if("documentRemove"in e){e.documentRemove;let n=e.documentRemove;n.document;let i=hn(r,n.document),s=n.removedTargetIds||[];t=new Wn([],s,i,null)}else{if(!("filter"in e))return L();{e.filter;let n=e.filter;n.targetId;let{count:i=0,unchangedNames:s}=n,o=new hu(i,s),c=n.targetId;t=new to(c,o)}}return t}function so(r,e){let t;if(e instanceof xt)t={update:$f(r,e.key,e.value)};else if(e instanceof ir)t={delete:io(r,e.key)};else if(e instanceof $e)t={update:$f(r,e.key,e.data),updateMask:wI(e.fieldMask)};else{if(!(e instanceof eo))return L();t={verify:io(r,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(n=>function(s,o){let c=o.transform;if(c instanceof kt)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof Nt)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof Ot)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof mn)return{fieldPath:o.field.canonicalString(),increment:c.Pe};throw L()}(0,n))),e.precondition.isNone||(t.currentDocument=function(i,s){return s.updateTime!==void 0?{updateTime:fI(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:L()}(r,e.precondition)),t}function yu(r,e){let t=e.currentDocument?function(s){return s.updateTime!==void 0?ke.updateTime(Ne(s.updateTime)):s.exists!==void 0?ke.exists(s.exists):ke.none()}(e.currentDocument):ke.none(),n=e.updateTransforms?e.updateTransforms.map(i=>function(o,c){let u=null;if("setToServerValue"in c)F(c.setToServerValue==="REQUEST_TIME"),u=new kt;else if("appendMissingElements"in c){let f=c.appendMissingElements.values||[];u=new Nt(f)}else if("removeAllFromArray"in c){let f=c.removeAllFromArray.values||[];u=new Ot(f)}else"increment"in c?u=new mn(o,c.increment):L();let h=me.fromServerFormat(c.fieldPath);return new Zs(h,u)}(r,i)):[];if(e.update){e.update.name;let i=hn(r,e.update.name),s=new De({mapValue:{fields:e.update.fields}});if(e.updateMask){let o=function(u){let h=u.fieldPaths||[];return new Me(h.map(f=>me.fromServerFormat(f)))}(e.updateMask);return new $e(i,s,o,t,n)}return new xt(i,s,t,n)}if(e.delete){let i=hn(r,e.delete);return new ir(i,t)}if(e.verify){let i=hn(r,e.verify);return new eo(i,t)}return L()}function gI(r,e){return r&&r.length>0?(F(e!==void 0),r.map(t=>function(i,s){let o=i.updateTime?Ne(i.updateTime):Ne(s);return o.isEqual(q.min())&&(o=Ne(s)),new uu(o,i.transformResults||[])}(t,e))):[]}function lm(r,e){return{documents:[am(r,e.path)]}}function hm(r,e){let t={structuredQuery:{}},n=e.path,i;e.collectionGroup!==null?(i=n,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=n.popLast(),t.structuredQuery.from=[{collectionId:n.lastSegment()}]),t.parent=am(r,i);let s=function(h){if(h.length!==0)return pm(Z.create(h,"and"))}(e.filters);s&&(t.structuredQuery.where=s);let o=function(h){if(h.length!==0)return h.map(f=>function(v){return{field:jn(v.field),direction:yI(v.dir)}}(f))}(e.orderBy);o&&(t.structuredQuery.orderBy=o);let c=mu(r,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(h){return{before:h.inclusive,values:h.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(h){return{before:!h.inclusive,values:h.position}}(e.endAt)),{ct:t,parent:i}}function dm(r){let e=cm(r.parent),t=r.structuredQuery,n=t.from?t.from.length:0,i=null;if(n>0){F(n===1);let f=t.from[0];f.allDescendants?i=f.collectionId:e=e.child(f.collectionId)}let s=[];t.where&&(s=function(m){let v=fm(m);return v instanceof Z&&Ul(v)?v.getFilters():[v]}(t.where));let o=[];t.orderBy&&(o=function(m){return m.map(v=>function(D){return new er(zn(D.field),function(k){switch(k){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(D.direction))}(v))}(t.orderBy));let c=null;t.limit&&(c=function(m){let v;return v=typeof m=="object"?m.value:m,jo(v)?null:v}(t.limit));let u=null;t.startAt&&(u=function(m){let v=!!m.before,S=m.values||[];return new Dt(S,v)}(t.startAt));let h=null;return t.endAt&&(h=function(m){let v=!m.before,S=m.values||[];return new Dt(S,v)}(t.endAt)),zp(e,i,o,s,c,"F",u,h)}function _I(r,e){let t=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return L()}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function fm(r){return r.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":let n=zn(t.unaryFilter.field);return Q.create(n,"==",{doubleValue:NaN});case"IS_NULL":let i=zn(t.unaryFilter.field);return Q.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":let s=zn(t.unaryFilter.field);return Q.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":let o=zn(t.unaryFilter.field);return Q.create(o,"!=",{nullValue:"NULL_VALUE"});default:return L()}}(r):r.fieldFilter!==void 0?function(t){return Q.create(zn(t.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return L()}}(t.fieldFilter.op),t.fieldFilter.value)}(r):r.compositeFilter!==void 0?function(t){return Z.create(t.compositeFilter.filters.map(n=>fm(n)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return L()}}(t.compositeFilter.op))}(r):L()}function yI(r){return lI[r]}function vI(r){return hI[r]}function II(r){return dI[r]}function jn(r){return{fieldPath:r.canonicalString()}}function zn(r){return me.fromServerFormat(r.fieldPath)}function pm(r){return r instanceof Q?function(t){if(t.op==="=="){if(Cf(t.value))return{unaryFilter:{field:jn(t.field),op:"IS_NAN"}};if(Pf(t.value))return{unaryFilter:{field:jn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Cf(t.value))return{unaryFilter:{field:jn(t.field),op:"IS_NOT_NAN"}};if(Pf(t.value))return{unaryFilter:{field:jn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:jn(t.field),op:vI(t.op),value:t.value}}}(r):r instanceof Z?function(t){let n=t.getFilters().map(i=>pm(i));return n.length===1?n[0]:{compositeFilter:{op:II(t.op),filters:n}}}(r):L()}function wI(r){let e=[];return r.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function mm(r){return r.length>=4&&r.get(0)==="projects"&&r.get(2)==="databases"}var or=class r{constructor(e,t,n,i,s=q.min(),o=q.min(),c=fe.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=c,this.expectedCount=u}withSequenceNumber(e){return new r(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new r(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new r(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new r(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}};var oo=class{constructor(e){this.ht=e}};function EI(r,e){let t;if(e.document)t=pI(r.ht,e.document,!!e.hasCommittedMutations);else if(e.noDocument){let n=V.fromSegments(e.noDocument.path),i=_n(e.noDocument.readTime);t=Ie.newNoDocument(n,i),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return L();{let n=V.fromSegments(e.unknownDocument.path),i=_n(e.unknownDocument.version);t=Ie.newUnknownDocument(n,i)}}return e.readTime&&t.setReadTime(function(i){let s=new ue(i[0],i[1]);return q.fromTimestamp(s)}(e.readTime)),t}function Kf(r,e){let t=e.key,n={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:ao(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())n.document=function(s,o){return{name:io(s,o.key),fields:o.data.value.mapValue.fields,updateTime:sr(s,o.version.toTimestamp()),createTime:sr(s,o.createTime.toTimestamp())}}(r.ht,e);else if(e.isNoDocument())n.noDocument={path:t.path.toArray(),readTime:gn(e.version)};else{if(!e.isUnknownDocument())return L();n.unknownDocument={path:t.path.toArray(),version:gn(e.version)}}return n}function ao(r){let e=r.toTimestamp();return[e.seconds,e.nanoseconds]}function gn(r){let e=r.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function _n(r){let e=new ue(r.seconds,r.nanoseconds);return q.fromTimestamp(e)}function sn(r,e){let t=(e.baseMutations||[]).map(s=>yu(r.ht,s));for(let s=0;s<e.mutations.length-1;++s){let o=e.mutations[s];if(s+1<e.mutations.length&&e.mutations[s+1].transform!==void 0){let c=e.mutations[s+1];o.updateTransforms=c.transform.fieldTransforms,e.mutations.splice(s+1,1),++s}}let n=e.mutations.map(s=>yu(r.ht,s)),i=ue.fromMillis(e.localWriteTimeMs);return new yi(e.batchId,i,t,n)}function ri(r){let e=_n(r.readTime),t=r.lastLimboFreeSnapshotVersion!==void 0?_n(r.lastLimboFreeSnapshotVersion):q.min(),n;return n=function(s){return s.documents!==void 0}(r.query)?function(s){return F(s.documents.length===1),Ue($o(cm(s.documents[0])))}(r.query):function(s){return Ue(dm(s))}(r.query),new or(n,r.targetId,"TargetPurposeListen",r.lastListenSequenceNumber,e,t,fe.fromBase64String(r.resumeToken))}function gm(r,e){let t=gn(e.snapshotVersion),n=gn(e.lastLimboFreeSnapshotVersion),i;i=Ys(e.target)?lm(r.ht,e.target):hm(r.ht,e.target).ct;let s=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:fn(e.target),readTime:t,resumeToken:s,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:n,query:i}}function _m(r){let e=dm({parent:r.parent,structuredQuery:r.structuredQuery});return r.limitType==="LAST"?cu(e,e.limit,"L"):e}function Dc(r,e){return new vi(e.largestBatchId,yu(r.ht,e.overlayMutation))}function Wf(r,e){let t=e.path.lastSegment();return[r,Re(e.path.popLast()),t]}function Hf(r,e,t,n){return{indexId:r,uid:e,sequenceNumber:t,readTime:gn(n.readTime),documentKey:Re(n.documentKey.path),largestBatchId:n.largestBatchId}}var vu=class{getBundleMetadata(e,t){return Qf(e).get(t).next(n=>{if(n)return function(s){return{id:s.bundleId,createTime:_n(s.createTime),version:s.version}}(n)})}saveBundleMetadata(e,t){return Qf(e).put(function(i){return{bundleId:i.id,createTime:gn(Ne(i.createTime)),version:i.version}}(t))}getNamedQuery(e,t){return Jf(e).get(t).next(n=>{if(n)return function(s){return{name:s.name,query:_m(s.bundledQuery),readTime:_n(s.readTime)}}(n)})}saveNamedQuery(e,t){return Jf(e).put(function(i){return{name:i.name,readTime:gn(Ne(i.readTime)),bundledQuery:i.bundledQuery}}(t))}};function Qf(r){return ge(r,"bundles")}function Jf(r){return ge(r,"namedQueries")}var co=class r{constructor(e,t){this.serializer=e,this.userId=t}static Pt(e,t){let n=t.uid||"";return new r(e,n)}getOverlay(e,t){return Xr(e).get(Wf(this.userId,t)).next(n=>n?Dc(this.serializer,n):null)}getOverlays(e,t){let n=Je();return b.forEach(t,i=>this.getOverlay(e,i).next(s=>{s!==null&&n.set(i,s)})).next(()=>n)}saveOverlays(e,t,n){let i=[];return n.forEach((s,o)=>{let c=new vi(t,o);i.push(this.Tt(e,c))}),b.waitFor(i)}removeOverlaysForBatchId(e,t,n){let i=new Set;t.forEach(o=>i.add(Re(o.getCollectionPath())));let s=[];return i.forEach(o=>{let c=IDBKeyRange.bound([this.userId,o,n],[this.userId,o,n+1],!1,!0);s.push(Xr(e).j("collectionPathOverlayIndex",c))}),b.waitFor(s)}getOverlaysForCollection(e,t,n){let i=Je(),s=Re(t),o=IDBKeyRange.bound([this.userId,s,n],[this.userId,s,Number.POSITIVE_INFINITY],!0);return Xr(e).U("collectionPathOverlayIndex",o).next(c=>{for(let u of c){let h=Dc(this.serializer,u);i.set(h.getKey(),h)}return i})}getOverlaysForCollectionGroup(e,t,n,i){let s=Je(),o,c=IDBKeyRange.bound([this.userId,t,n],[this.userId,t,Number.POSITIVE_INFINITY],!0);return Xr(e).J({index:"collectionGroupOverlayIndex",range:c},(u,h,f)=>{let m=Dc(this.serializer,h);s.size()<i||m.largestBatchId===o?(s.set(m.getKey(),m),o=m.largestBatchId):f.done()}).next(()=>s)}Tt(e,t){return Xr(e).put(function(i,s,o){let[c,u,h]=Wf(s,o.mutation.key);return{userId:s,collectionPath:u,documentId:h,collectionGroup:o.mutation.key.getCollectionGroup(),largestBatchId:o.largestBatchId,overlayMutation:so(i.ht,o.mutation)}}(this.serializer,this.userId,t))}};function Xr(r){return ge(r,"documentOverlays")}var Iu=class{It(e){return ge(e,"globals")}getSessionToken(e){return this.It(e).get("sessionToken").next(t=>{let n=t==null?void 0:t.value;return n?fe.fromUint8Array(n):fe.EMPTY_BYTE_STRING})}setSessionToken(e,t){return this.It(e).put({name:"sessionToken",value:t.toUint8Array()})}};var at=class{constructor(){}Et(e,t){this.dt(e,t),t.At()}dt(e,t){if("nullValue"in e)this.Rt(t,5);else if("booleanValue"in e)this.Rt(t,10),t.Vt(e.booleanValue?1:0);else if("integerValue"in e)this.Rt(t,15),t.Vt(oe(e.integerValue));else if("doubleValue"in e){let n=oe(e.doubleValue);isNaN(n)?this.Rt(t,13):(this.Rt(t,15),di(n)?t.Vt(0):t.Vt(n))}else if("timestampValue"in e){let n=e.timestampValue;this.Rt(t,20),typeof n=="string"&&(n=ct(n)),t.ft(`${n.seconds||""}`),t.Vt(n.nanos||0)}else if("stringValue"in e)this.gt(e.stringValue,t),this.yt(t);else if("bytesValue"in e)this.Rt(t,30),t.wt(ut(e.bytesValue)),this.yt(t);else if("referenceValue"in e)this.St(e.referenceValue,t);else if("geoPointValue"in e){let n=e.geoPointValue;this.Rt(t,45),t.Vt(n.latitude||0),t.Vt(n.longitude||0)}else"mapValue"in e?Vp(e)?this.Rt(t,Number.MAX_SAFE_INTEGER):Go(e)?this.bt(e.mapValue,t):(this.Dt(e.mapValue,t),this.yt(t)):"arrayValue"in e?(this.vt(e.arrayValue,t),this.yt(t)):L()}gt(e,t){this.Rt(t,25),this.Ct(e,t)}Ct(e,t){t.ft(e)}Dt(e,t){let n=e.fields||{};this.Rt(t,55);for(let i of Object.keys(n))this.gt(i,t),this.dt(n[i],t)}bt(e,t){var n,i;let s=e.fields||{};this.Rt(t,53);let o="value",c=((i=(n=s[o].arrayValue)===null||n===void 0?void 0:n.values)===null||i===void 0?void 0:i.length)||0;this.Rt(t,15),t.Vt(oe(c)),this.gt(o,t),this.dt(s[o],t)}vt(e,t){let n=e.values||[];this.Rt(t,50);for(let i of n)this.dt(i,t)}St(e,t){this.Rt(t,37),V.fromName(e).path.forEach(n=>{this.Rt(t,60),this.Ct(n,t)})}Rt(e,t){e.Vt(t)}yt(e){e.Vt(2)}};at.Ft=new at;function TI(r){if(r===0)return 8;let e=0;return!(r>>4)&&(e+=4,r<<=4),!(r>>6)&&(e+=2,r<<=2),!(r>>7)&&(e+=1),e}function Yf(r){let e=64-function(n){let i=0;for(let s=0;s<8;++s){let o=TI(255&n[s]);if(i+=o,o!==8)break}return i}(r);return Math.ceil(e/8)}var wu=class{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Mt(e){let t=e[Symbol.iterator](),n=t.next();for(;!n.done;)this.xt(n.value),n=t.next();this.Ot()}Nt(e){let t=e[Symbol.iterator](),n=t.next();for(;!n.done;)this.Lt(n.value),n=t.next();this.Bt()}kt(e){for(let t of e){let n=t.charCodeAt(0);if(n<128)this.xt(n);else if(n<2048)this.xt(960|n>>>6),this.xt(128|63&n);else if(t<"\uD800"||"\uDBFF"<t)this.xt(480|n>>>12),this.xt(128|63&n>>>6),this.xt(128|63&n);else{let i=t.codePointAt(0);this.xt(240|i>>>18),this.xt(128|63&i>>>12),this.xt(128|63&i>>>6),this.xt(128|63&i)}}this.Ot()}qt(e){for(let t of e){let n=t.charCodeAt(0);if(n<128)this.Lt(n);else if(n<2048)this.Lt(960|n>>>6),this.Lt(128|63&n);else if(t<"\uD800"||"\uDBFF"<t)this.Lt(480|n>>>12),this.Lt(128|63&n>>>6),this.Lt(128|63&n);else{let i=t.codePointAt(0);this.Lt(240|i>>>18),this.Lt(128|63&i>>>12),this.Lt(128|63&i>>>6),this.Lt(128|63&i)}}this.Bt()}Qt(e){let t=this.Kt(e),n=Yf(t);this.$t(1+n),this.buffer[this.position++]=255&n;for(let i=t.length-n;i<t.length;++i)this.buffer[this.position++]=255&t[i]}Ut(e){let t=this.Kt(e),n=Yf(t);this.$t(1+n),this.buffer[this.position++]=~(255&n);for(let i=t.length-n;i<t.length;++i)this.buffer[this.position++]=~(255&t[i])}Wt(){this.Gt(255),this.Gt(255)}zt(){this.jt(255),this.jt(255)}reset(){this.position=0}seed(e){this.$t(e.length),this.buffer.set(e,this.position),this.position+=e.length}Ht(){return this.buffer.slice(0,this.position)}Kt(e){let t=function(s){let o=new DataView(new ArrayBuffer(8));return o.setFloat64(0,s,!1),new Uint8Array(o.buffer)}(e),n=(128&t[0])!=0;t[0]^=n?255:128;for(let i=1;i<t.length;++i)t[i]^=n?255:0;return t}xt(e){let t=255&e;t===0?(this.Gt(0),this.Gt(255)):t===255?(this.Gt(255),this.Gt(0)):this.Gt(t)}Lt(e){let t=255&e;t===0?(this.jt(0),this.jt(255)):t===255?(this.jt(255),this.jt(0)):this.jt(e)}Ot(){this.Gt(0),this.Gt(1)}Bt(){this.jt(0),this.jt(1)}Gt(e){this.$t(1),this.buffer[this.position++]=e}jt(e){this.$t(1),this.buffer[this.position++]=~e}$t(e){let t=e+this.position;if(t<=this.buffer.length)return;let n=2*this.buffer.length;n<t&&(n=t);let i=new Uint8Array(n);i.set(this.buffer),this.buffer=i}},Eu=class{constructor(e){this.Jt=e}wt(e){this.Jt.Mt(e)}ft(e){this.Jt.kt(e)}Vt(e){this.Jt.Qt(e)}At(){this.Jt.Wt()}},Tu=class{constructor(e){this.Jt=e}wt(e){this.Jt.Nt(e)}ft(e){this.Jt.qt(e)}Vt(e){this.Jt.Ut(e)}At(){this.Jt.zt()}},on=class{constructor(){this.Jt=new wu,this.Yt=new Eu(this.Jt),this.Zt=new Tu(this.Jt)}seed(e){this.Jt.seed(e)}Xt(e){return e===0?this.Yt:this.Zt}Ht(){return this.Jt.Ht()}reset(){this.Jt.reset()}};var an=class r{constructor(e,t,n,i){this.indexId=e,this.documentKey=t,this.arrayValue=n,this.directionalValue=i}en(){let e=this.directionalValue.length,t=e===0||this.directionalValue[e-1]===255?e+1:e,n=new Uint8Array(t);return n.set(this.directionalValue,0),t!==e?n.set([0],this.directionalValue.length):++n[n.length-1],new r(this.indexId,this.documentKey,this.arrayValue,n)}};function Et(r,e){let t=r.indexId-e.indexId;return t!==0?t:(t=Xf(r.arrayValue,e.arrayValue),t!==0?t:(t=Xf(r.directionalValue,e.directionalValue),t!==0?t:V.comparator(r.documentKey,e.documentKey)))}function Xf(r,e){for(let t=0;t<r.length&&t<e.length;++t){let n=r[t]-e[t];if(n!==0)return n}return r.length-e.length}var uo=class{constructor(e){this.tn=new te((t,n)=>me.comparator(t.field,n.field)),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.nn=e.orderBy,this.rn=[];for(let t of e.filters){let n=t;n.isInequality()?this.tn=this.tn.add(n):this.rn.push(n)}}get sn(){return this.tn.size>1}on(e){if(F(e.collectionGroup===this.collectionId),this.sn)return!1;let t=zc(e);if(t!==void 0&&!this._n(t))return!1;let n=nn(e),i=new Set,s=0,o=0;for(;s<n.length&&this._n(n[s]);++s)i=i.add(n[s].fieldPath.canonicalString());if(s===n.length)return!0;if(this.tn.size>0){let c=this.tn.getIterator().getNext();if(!i.has(c.field.canonicalString())){let u=n[s];if(!this.an(c,u)||!this.un(this.nn[o++],u))return!1}++s}for(;s<n.length;++s){let c=n[s];if(o>=this.nn.length||!this.un(this.nn[o++],c))return!1}return!0}cn(){if(this.sn)return null;let e=new te(me.comparator),t=[];for(let n of this.rn)if(!n.field.isKeyField())if(n.op==="array-contains"||n.op==="array-contains-any")t.push(new Kn(n.field,2));else{if(e.has(n.field))continue;e=e.add(n.field),t.push(new Kn(n.field,0))}for(let n of this.nn)n.field.isKeyField()||e.has(n.field)||(e=e.add(n.field),t.push(new Kn(n.field,n.dir==="asc"?0:1)));return new Jn(Jn.UNKNOWN_ID,this.collectionId,t,hi.empty())}_n(e){for(let t of this.rn)if(this.an(t,e))return!0;return!1}an(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;let n=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===n}un(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}};function ym(r){var e,t;if(F(r instanceof Q||r instanceof Z),r instanceof Q){if(r instanceof Js){let i=((t=(e=r.value.arrayValue)===null||e===void 0?void 0:e.values)===null||t===void 0?void 0:t.map(s=>Q.create(r.field,"==",s)))||[];return Z.create(i,"or")}return r}let n=r.filters.map(i=>ym(i));return Z.create(n,r.op)}function AI(r){if(r.getFilters().length===0)return[];let e=Su(ym(r));return F(vm(e)),Au(e)||bu(e)?[e]:e.getFilters()}function Au(r){return r instanceof Q}function bu(r){return r instanceof Z&&Ul(r)}function vm(r){return Au(r)||bu(r)||function(t){if(t instanceof Z&&Yc(t)){for(let n of t.getFilters())if(!Au(n)&&!bu(n))return!1;return!0}return!1}(r)}function Su(r){if(F(r instanceof Q||r instanceof Z),r instanceof Q)return r;if(r.filters.length===1)return Su(r.filters[0]);let e=r.filters.map(n=>Su(n)),t=Z.create(e,r.op);return t=lo(t),vm(t)?t:(F(t instanceof Z),F(tr(t)),F(t.filters.length>1),t.filters.reduce((n,i)=>zl(n,i)))}function zl(r,e){let t;return F(r instanceof Q||r instanceof Z),F(e instanceof Q||e instanceof Z),t=r instanceof Q?e instanceof Q?function(i,s){return Z.create([i,s],"and")}(r,e):Zf(r,e):e instanceof Q?Zf(e,r):function(i,s){if(F(i.filters.length>0&&s.filters.length>0),tr(i)&&tr(s))return Bp(i,s.getFilters());let o=Yc(i)?i:s,c=Yc(i)?s:i,u=o.filters.map(h=>zl(h,c));return Z.create(u,"or")}(r,e),lo(t)}function Zf(r,e){if(tr(e))return Bp(e,r.getFilters());{let t=e.filters.map(n=>zl(r,n));return Z.create(t,"or")}}function lo(r){if(F(r instanceof Q||r instanceof Z),r instanceof Q)return r;let e=r.getFilters();if(e.length===1)return lo(e[0]);if(Fp(r))return r;let t=e.map(i=>lo(i)),n=[];return t.forEach(i=>{i instanceof Q?n.push(i):i instanceof Z&&(i.op===r.op?n.push(...i.filters):n.push(i))}),n.length===1?n[0]:Z.create(n,r.op)}var Ru=class{constructor(){this.ln=new Ei}addToCollectionParentIndex(e,t){return this.ln.add(t),b.resolve()}getCollectionParents(e,t){return b.resolve(this.ln.getEntries(t))}addFieldIndex(e,t){return b.resolve()}deleteFieldIndex(e,t){return b.resolve()}deleteAllFieldIndexes(e){return b.resolve()}createTargetIndexes(e,t){return b.resolve()}getDocumentsMatchingTarget(e,t){return b.resolve(null)}getIndexType(e,t){return b.resolve(0)}getFieldIndexes(e,t){return b.resolve([])}getNextCollectionGroupToUpdate(e){return b.resolve(null)}getMinOffset(e,t){return b.resolve(qe.min())}getMinOffsetFromCollectionGroup(e,t){return b.resolve(qe.min())}updateCollectionGroup(e,t,n){return b.resolve()}updateIndexEntries(e,t){return b.resolve()}},Ei=class{constructor(){this.index={}}add(e){let t=e.lastSegment(),n=e.popLast(),i=this.index[t]||new te(ee.comparator),s=!i.has(n);return this.index[t]=i.add(n),s}has(e){let t=e.lastSegment(),n=e.popLast(),i=this.index[t];return i&&i.has(n)}getEntries(e){return(this.index[e]||new te(ee.comparator)).toArray()}};var Os=new Uint8Array(0),Pu=class{constructor(e,t){this.databaseId=t,this.hn=new Ei,this.Pn=new Ge(n=>fn(n),(n,i)=>ki(n,i)),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.hn.has(t)){let n=t.lastSegment(),i=t.popLast();e.addOnCommittedListener(()=>{this.hn.add(t)});let s={collectionId:n,parent:Re(i)};return ep(e).put(s)}return b.resolve()}getCollectionParents(e,t){let n=[],i=IDBKeyRange.bound([t,""],[Ap(t),""],!1,!0);return ep(e).U(i).next(s=>{for(let o of s){if(o.collectionId!==t)break;n.push(Qe(o.parent))}return n})}addFieldIndex(e,t){let n=Zr(e),i=function(c){return{indexId:c.indexId,collectionGroup:c.collectionGroup,fields:c.fields.map(u=>[u.fieldPath.canonicalString(),u.kind])}}(t);delete i.indexId;let s=n.add(i);if(t.indexState){let o=Fn(e);return s.next(c=>{o.put(Hf(c,this.uid,t.indexState.sequenceNumber,t.indexState.offset))})}return s.next()}deleteFieldIndex(e,t){let n=Zr(e),i=Fn(e),s=Mn(e);return n.delete(t.indexId).next(()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))).next(()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))}deleteAllFieldIndexes(e){let t=Zr(e),n=Mn(e),i=Fn(e);return t.j().next(()=>n.j()).next(()=>i.j())}createTargetIndexes(e,t){return b.forEach(this.Tn(t),n=>this.getIndexType(e,n).next(i=>{if(i===0||i===1){let s=new uo(n).cn();if(s!=null)return this.addFieldIndex(e,s)}}))}getDocumentsMatchingTarget(e,t){let n=Mn(e),i=!0,s=new Map;return b.forEach(this.Tn(t),o=>this.In(e,o).next(c=>{i&&(i=!!c),s.set(o,c)})).next(()=>{if(i){let o=K(),c=[];return b.forEach(s,(u,h)=>{C("IndexedDbIndexManager",`Using index ${function(U){return`id=${U.indexId}|cg=${U.collectionGroup}|f=${U.fields.map(W=>`${W.fieldPath}:${W.kind}`).join(",")}`}(u)} to execute ${fn(t)}`);let f=function(U,W){let Y=zc(W);if(Y===void 0)return null;for(let G of Xs(U,Y.fieldPath))switch(G.op){case"array-contains-any":return G.value.arrayValue.values||[];case"array-contains":return[G.value]}return null}(h,u),m=function(U,W){let Y=new Map;for(let G of nn(W))for(let I of Xs(U,G.fieldPath))switch(I.op){case"==":case"in":Y.set(G.fieldPath.canonicalString(),I.value);break;case"not-in":case"!=":return Y.set(G.fieldPath.canonicalString(),I.value),Array.from(Y.values())}return null}(h,u),v=function(U,W){let Y=[],G=!0;for(let I of nn(W)){let g=I.kind===0?xf(U,I.fieldPath,U.startAt):Vf(U,I.fieldPath,U.startAt);Y.push(g.value),G&&(G=g.inclusive)}return new Dt(Y,G)}(h,u),S=function(U,W){let Y=[],G=!0;for(let I of nn(W)){let g=I.kind===0?Vf(U,I.fieldPath,U.endAt):xf(U,I.fieldPath,U.endAt);Y.push(g.value),G&&(G=g.inclusive)}return new Dt(Y,G)}(h,u),D=this.En(u,h,v),N=this.En(u,h,S),k=this.dn(u,h,m),z=this.An(u.indexId,f,D,v.inclusive,N,S.inclusive,k);return b.forEach(z,j=>n.G(j,t.limit).next(U=>{U.forEach(W=>{let Y=V.fromSegments(W.documentKey);o.has(Y)||(o=o.add(Y),c.push(Y))})}))}).next(()=>c)}return b.resolve(null)})}Tn(e){let t=this.Pn.get(e);return t||(e.filters.length===0?t=[e]:t=AI(Z.create(e.filters,"and")).map(n=>ou(e.path,e.collectionGroup,e.orderBy,n.getFilters(),e.limit,e.startAt,e.endAt)),this.Pn.set(e,t),t)}An(e,t,n,i,s,o,c){let u=(t!=null?t.length:1)*Math.max(n.length,s.length),h=u/(t!=null?t.length:1),f=[];for(let m=0;m<u;++m){let v=t?this.Rn(t[m/h]):Os,S=this.Vn(e,v,n[m%h],i),D=this.mn(e,v,s[m%h],o),N=c.map(k=>this.Vn(e,v,k,!0));f.push(...this.createRange(S,D,N))}return f}Vn(e,t,n,i){let s=new an(e,V.empty(),t,n);return i?s:s.en()}mn(e,t,n,i){let s=new an(e,V.empty(),t,n);return i?s.en():s}In(e,t){let n=new uo(t),i=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,i).next(s=>{let o=null;for(let c of s)n.on(c)&&(!o||c.fields.length>o.fields.length)&&(o=c);return o})}getIndexType(e,t){let n=2,i=this.Tn(t);return b.forEach(i,s=>this.In(e,s).next(o=>{o?n!==0&&o.fields.length<function(u){let h=new te(me.comparator),f=!1;for(let m of u.filters)for(let v of m.getFlattenedFilters())v.field.isKeyField()||(v.op==="array-contains"||v.op==="array-contains-any"?f=!0:h=h.add(v.field));for(let m of u.orderBy)m.field.isKeyField()||(h=h.add(m.field));return h.size+(f?1:0)}(s)&&(n=1):n=0})).next(()=>function(o){return o.limit!==null}(t)&&i.length>1&&n===2?1:n)}fn(e,t){let n=new on;for(let i of nn(e)){let s=t.data.field(i.fieldPath);if(s==null)return null;let o=n.Xt(i.kind);at.Ft.Et(s,o)}return n.Ht()}Rn(e){let t=new on;return at.Ft.Et(e,t.Xt(0)),t.Ht()}gn(e,t){let n=new on;return at.Ft.Et(gi(this.databaseId,t),n.Xt(function(s){let o=nn(s);return o.length===0?0:o[o.length-1].kind}(e))),n.Ht()}dn(e,t,n){if(n===null)return[];let i=[];i.push(new on);let s=0;for(let o of nn(e)){let c=n[s++];for(let u of i)if(this.pn(t,o.fieldPath)&&_i(c))i=this.yn(i,o,c);else{let h=u.Xt(o.kind);at.Ft.Et(c,h)}}return this.wn(i)}En(e,t,n){return this.dn(e,t,n.position)}wn(e){let t=[];for(let n=0;n<e.length;++n)t[n]=e[n].Ht();return t}yn(e,t,n){let i=[...e],s=[];for(let o of n.arrayValue.values||[])for(let c of i){let u=new on;u.seed(c.Ht()),at.Ft.Et(o,u.Xt(t.kind)),s.push(u)}return s}pn(e,t){return!!e.filters.find(n=>n instanceof Q&&n.field.isEqual(t)&&(n.op==="in"||n.op==="not-in"))}getFieldIndexes(e,t){let n=Zr(e),i=Fn(e);return(t?n.U("collectionGroupIndex",IDBKeyRange.bound(t,t)):n.U()).next(s=>{let o=[];return b.forEach(s,c=>i.get([c.indexId,this.uid]).next(u=>{o.push(function(f,m){let v=m?new hi(m.sequenceNumber,new qe(_n(m.readTime),new V(Qe(m.documentKey)),m.largestBatchId)):hi.empty(),S=f.fields.map(([D,N])=>new Kn(me.fromServerFormat(D),N));return new Jn(f.indexId,f.collectionGroup,S,v)}(c,u))})).next(()=>o)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(t=>t.length===0?null:(t.sort((n,i)=>{let s=n.indexState.sequenceNumber-i.indexState.sequenceNumber;return s!==0?s:$(n.collectionGroup,i.collectionGroup)}),t[0].collectionGroup))}updateCollectionGroup(e,t,n){let i=Zr(e),s=Fn(e);return this.Sn(e).next(o=>i.U("collectionGroupIndex",IDBKeyRange.bound(t,t)).next(c=>b.forEach(c,u=>s.put(Hf(u.indexId,this.uid,o,n)))))}updateIndexEntries(e,t){let n=new Map;return b.forEach(t,(i,s)=>{let o=n.get(i.collectionGroup);return(o?b.resolve(o):this.getFieldIndexes(e,i.collectionGroup)).next(c=>(n.set(i.collectionGroup,c),b.forEach(c,u=>this.bn(e,i,u).next(h=>{let f=this.Dn(s,u);return h.isEqual(f)?b.resolve():this.vn(e,s,u,h,f)}))))})}Cn(e,t,n,i){return Mn(e).put({indexId:i.indexId,uid:this.uid,arrayValue:i.arrayValue,directionalValue:i.directionalValue,orderedDocumentKey:this.gn(n,t.key),documentKey:t.key.path.toArray()})}Fn(e,t,n,i){return Mn(e).delete([i.indexId,this.uid,i.arrayValue,i.directionalValue,this.gn(n,t.key),t.key.path.toArray()])}bn(e,t,n){let i=Mn(e),s=new te(Et);return i.J({index:"documentKeyIndex",range:IDBKeyRange.only([n.indexId,this.uid,this.gn(n,t)])},(o,c)=>{s=s.add(new an(n.indexId,t,c.arrayValue,c.directionalValue))}).next(()=>s)}Dn(e,t){let n=new te(Et),i=this.fn(t,e);if(i==null)return n;let s=zc(t);if(s!=null){let o=e.data.field(s.fieldPath);if(_i(o))for(let c of o.arrayValue.values||[])n=n.add(new an(t.indexId,e.key,this.Rn(c),i))}else n=n.add(new an(t.indexId,e.key,Os,i));return n}vn(e,t,n,i,s){C("IndexedDbIndexManager","Updating index entries for document '%s'",t.key);let o=[];return function(u,h,f,m,v){let S=u.getIterator(),D=h.getIterator(),N=Ln(S),k=Ln(D);for(;N||k;){let z=!1,j=!1;if(N&&k){let U=f(N,k);U<0?j=!0:U>0&&(z=!0)}else N!=null?j=!0:z=!0;z?(m(k),k=Ln(D)):j?(v(N),N=Ln(S)):(N=Ln(S),k=Ln(D))}}(i,s,Et,c=>{o.push(this.Cn(e,t,n,c))},c=>{o.push(this.Fn(e,t,n,c))}),b.waitFor(o)}Sn(e){let t=1;return Fn(e).J({index:"sequenceNumberIndex",reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(n,i,s)=>{s.done(),t=i.sequenceNumber+1}).next(()=>t)}createRange(e,t,n){n=n.sort((o,c)=>Et(o,c)).filter((o,c,u)=>!c||Et(o,u[c-1])!==0);let i=[];i.push(e);for(let o of n){let c=Et(o,e),u=Et(o,t);if(c===0)i[0]=e.en();else if(c>0&&u<0)i.push(o),i.push(o.en());else if(u>0)break}i.push(t);let s=[];for(let o=0;o<i.length;o+=2){if(this.Mn(i[o],i[o+1]))return[];let c=[i[o].indexId,this.uid,i[o].arrayValue,i[o].directionalValue,Os,[]],u=[i[o+1].indexId,this.uid,i[o+1].arrayValue,i[o+1].directionalValue,Os,[]];s.push(IDBKeyRange.bound(c,u))}return s}Mn(e,t){return Et(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(tp)}getMinOffset(e,t){return b.mapArray(this.Tn(t),n=>this.In(e,n).next(i=>i||L())).next(tp)}};function ep(r){return ge(r,"collectionParents")}function Mn(r){return ge(r,"indexEntries")}function Zr(r){return ge(r,"indexConfiguration")}function Fn(r){return ge(r,"indexState")}function tp(r){F(r.length!==0);let e=r[0].indexState.offset,t=e.largestBatchId;for(let n=1;n<r.length;n++){let i=r[n].indexState.offset;Vl(i,e)<0&&(e=i),t<i.largestBatchId&&(t=i.largestBatchId)}return new qe(e.readTime,e.documentKey,t)}var np={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},xe=class r{static withCacheSize(e){return new r(e,r.DEFAULT_COLLECTION_PERCENTILE,r.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}};function Im(r,e,t){let n=r.store("mutations"),i=r.store("documentMutations"),s=[],o=IDBKeyRange.only(t.batchId),c=0,u=n.J({range:o},(f,m,v)=>(c++,v.delete()));s.push(u.next(()=>{F(c===1)}));let h=[];for(let f of t.mutations){let m=Dp(e,f.key.path,t.batchId);s.push(i.delete(m)),h.push(f.key)}return b.waitFor(s).next(()=>h)}function ho(r){if(!r)return 0;let e;if(r.document)e=r.document;else if(r.unknownDocument)e=r.unknownDocument;else{if(!r.noDocument)throw L();e=r.noDocument}return JSON.stringify(e).length}xe.DEFAULT_COLLECTION_PERCENTILE=10,xe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,xe.DEFAULT=new xe(41943040,xe.DEFAULT_COLLECTION_PERCENTILE,xe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),xe.DISABLED=new xe(-1,0,0);var fo=class r{constructor(e,t,n,i){this.userId=e,this.serializer=t,this.indexManager=n,this.referenceDelegate=i,this.xn={}}static Pt(e,t,n,i){F(e.uid!=="");let s=e.isAuthenticated()?e.uid:"";return new r(s,t,n,i)}checkEmpty(e){let t=!0,n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return Tt(e).J({index:"userMutationsIndex",range:n},(i,s,o)=>{t=!1,o.done()}).next(()=>t)}addMutationBatch(e,t,n,i){let s=Gn(e),o=Tt(e);return o.add({}).next(c=>{F(typeof c=="number");let u=new yi(c,t,n,i),h=function(S,D,N){let k=N.baseMutations.map(j=>so(S.ht,j)),z=N.mutations.map(j=>so(S.ht,j));return{userId:D,batchId:N.batchId,localWriteTimeMs:N.localWriteTime.toMillis(),baseMutations:k,mutations:z}}(this.serializer,this.userId,u),f=[],m=new te((v,S)=>$(v.canonicalString(),S.canonicalString()));for(let v of i){let S=Dp(this.userId,v.key.path,c);m=m.add(v.key.path.popLast()),f.push(o.put(h)),f.push(s.put(S,Rv))}return m.forEach(v=>{f.push(this.indexManager.addToCollectionParentIndex(e,v))}),e.addOnCommittedListener(()=>{this.xn[c]=u.keys()}),b.waitFor(f).next(()=>u)})}lookupMutationBatch(e,t){return Tt(e).get(t).next(n=>n?(F(n.userId===this.userId),sn(this.serializer,n)):null)}On(e,t){return this.xn[t]?b.resolve(this.xn[t]):this.lookupMutationBatch(e,t).next(n=>{if(n){let i=n.keys();return this.xn[t]=i,i}return null})}getNextMutationBatchAfterBatchId(e,t){let n=t+1,i=IDBKeyRange.lowerBound([this.userId,n]),s=null;return Tt(e).J({index:"userMutationsIndex",range:i},(o,c,u)=>{c.userId===this.userId&&(F(c.batchId>=n),s=sn(this.serializer,c)),u.done()}).next(()=>s)}getHighestUnacknowledgedBatchId(e){let t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]),n=-1;return Tt(e).J({index:"userMutationsIndex",range:t,reverse:!0},(i,s,o)=>{n=s.batchId,o.done()}).next(()=>n)}getAllMutationBatches(e){let t=IDBKeyRange.bound([this.userId,-1],[this.userId,Number.POSITIVE_INFINITY]);return Tt(e).U("userMutationsIndex",t).next(n=>n.map(i=>sn(this.serializer,i)))}getAllMutationBatchesAffectingDocumentKey(e,t){let n=Ms(this.userId,t.path),i=IDBKeyRange.lowerBound(n),s=[];return Gn(e).J({range:i},(o,c,u)=>{let[h,f,m]=o,v=Qe(f);if(h===this.userId&&t.path.isEqual(v))return Tt(e).get(m).next(S=>{if(!S)throw L();F(S.userId===this.userId),s.push(sn(this.serializer,S))});u.done()}).next(()=>s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new te($),i=[];return t.forEach(s=>{let o=Ms(this.userId,s.path),c=IDBKeyRange.lowerBound(o),u=Gn(e).J({range:c},(h,f,m)=>{let[v,S,D]=h,N=Qe(S);v===this.userId&&s.path.isEqual(N)?n=n.add(D):m.done()});i.push(u)}),b.waitFor(i).next(()=>this.Nn(e,n))}getAllMutationBatchesAffectingQuery(e,t){let n=t.path,i=n.length+1,s=Ms(this.userId,n),o=IDBKeyRange.lowerBound(s),c=new te($);return Gn(e).J({range:o},(u,h,f)=>{let[m,v,S]=u,D=Qe(v);m===this.userId&&n.isPrefixOf(D)?D.length===i&&(c=c.add(S)):f.done()}).next(()=>this.Nn(e,c))}Nn(e,t){let n=[],i=[];return t.forEach(s=>{i.push(Tt(e).get(s).next(o=>{if(o===null)throw L();F(o.userId===this.userId),n.push(sn(this.serializer,o))}))}),b.waitFor(i).next(()=>n)}removeMutationBatch(e,t){return Im(e._e,this.userId,t).next(n=>(e.addOnCommittedListener(()=>{this.Ln(t.batchId)}),b.forEach(n,i=>this.referenceDelegate.markPotentiallyOrphaned(e,i))))}Ln(e){delete this.xn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(t=>{if(!t)return b.resolve();let n=IDBKeyRange.lowerBound(function(o){return[o]}(this.userId)),i=[];return Gn(e).J({range:n},(s,o,c)=>{if(s[0]===this.userId){let u=Qe(s[1]);i.push(u)}else c.done()}).next(()=>{F(i.length===0)})})}containsKey(e,t){return wm(e,this.userId,t)}Bn(e){return Em(e).get(this.userId).next(t=>t||{userId:this.userId,lastAcknowledgedBatchId:-1,lastStreamToken:""})}};function wm(r,e,t){let n=Ms(e,t.path),i=n[1],s=IDBKeyRange.lowerBound(n),o=!1;return Gn(r).J({range:s,H:!0},(c,u,h)=>{let[f,m,v]=c;f===e&&m===i&&(o=!0),h.done()}).next(()=>o)}function Tt(r){return ge(r,"mutations")}function Gn(r){return ge(r,"documentMutations")}function Em(r){return ge(r,"mutationQueues")}var ar=class r{constructor(e){this.kn=e}next(){return this.kn+=2,this.kn}static qn(){return new r(0)}static Qn(){return new r(-1)}};var Cu=class{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.Kn(e).next(t=>{let n=new ar(t.highestTargetId);return t.highestTargetId=n.next(),this.$n(e,t).next(()=>t.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.Kn(e).next(t=>q.fromTimestamp(new ue(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.Kn(e).next(t=>t.highestListenSequenceNumber)}setTargetsMetadata(e,t,n){return this.Kn(e).next(i=>(i.highestListenSequenceNumber=t,n&&(i.lastRemoteSnapshotVersion=n.toTimestamp()),t>i.highestListenSequenceNumber&&(i.highestListenSequenceNumber=t),this.$n(e,i)))}addTargetData(e,t){return this.Un(e,t).next(()=>this.Kn(e).next(n=>(n.targetCount+=1,this.Wn(t,n),this.$n(e,n))))}updateTargetData(e,t){return this.Un(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next(()=>Un(e).delete(t.targetId)).next(()=>this.Kn(e)).next(n=>(F(n.targetCount>0),n.targetCount-=1,this.$n(e,n)))}removeTargets(e,t,n){let i=0,s=[];return Un(e).J((o,c)=>{let u=ri(c);u.sequenceNumber<=t&&n.get(u.targetId)===null&&(i++,s.push(this.removeTargetData(e,u)))}).next(()=>b.waitFor(s)).next(()=>i)}forEachTarget(e,t){return Un(e).J((n,i)=>{let s=ri(i);t(s)})}Kn(e){return rp(e).get("targetGlobalKey").next(t=>(F(t!==null),t))}$n(e,t){return rp(e).put("targetGlobalKey",t)}Un(e,t){return Un(e).put(gm(this.serializer,t))}Wn(e,t){let n=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,n=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,n=!0),n}getTargetCount(e){return this.Kn(e).next(t=>t.targetCount)}getTargetData(e,t){let n=fn(t),i=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]),s=null;return Un(e).J({range:i,index:"queryTargetsIndex"},(o,c,u)=>{let h=ri(c);ki(t,h.target)&&(s=h,u.done())}).next(()=>s)}addMatchingKeys(e,t,n){let i=[],s=At(e);return t.forEach(o=>{let c=Re(o.path);i.push(s.put({targetId:n,path:c})),i.push(this.referenceDelegate.addReference(e,n,o))}),b.waitFor(i)}removeMatchingKeys(e,t,n){let i=At(e);return b.forEach(t,s=>{let o=Re(s.path);return b.waitFor([i.delete([n,o]),this.referenceDelegate.removeReference(e,n,s)])})}removeMatchingKeysForTargetId(e,t){let n=At(e),i=IDBKeyRange.bound([t],[t+1],!1,!0);return n.delete(i)}getMatchingKeysForTargetId(e,t){let n=IDBKeyRange.bound([t],[t+1],!1,!0),i=At(e),s=K();return i.J({range:n,H:!0},(o,c,u)=>{let h=Qe(o[1]),f=new V(h);s=s.add(f)}).next(()=>s)}containsKey(e,t){let n=Re(t.path),i=IDBKeyRange.bound([n],[Ap(n)],!1,!0),s=0;return At(e).J({index:"documentTargetsIndex",H:!0,range:i},([o,c],u,h)=>{o!==0&&(s++,h.done())}).next(()=>s>0)}ut(e,t){return Un(e).get(t).next(n=>n?ri(n):null)}};function Un(r){return ge(r,"targets")}function rp(r){return ge(r,"targetGlobal")}function At(r){return ge(r,"targetDocuments")}function ip([r,e],[t,n]){let i=$(r,t);return i===0?$(e,n):i}var Du=class{constructor(e){this.Gn=e,this.buffer=new te(ip),this.zn=0}jn(){return++this.zn}Hn(e){let t=[e,this.jn()];if(this.buffer.size<this.Gn)this.buffer=this.buffer.add(t);else{let n=this.buffer.last();ip(t,n)<0&&(this.buffer=this.buffer.delete(n).add(t))}}get maxValue(){return this.buffer.last()[0]}},po=class{constructor(e,t,n){this.garbageCollector=e,this.asyncQueue=t,this.localStore=n,this.Jn=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Yn(6e4)}stop(){this.Jn&&(this.Jn.cancel(),this.Jn=null)}get started(){return this.Jn!==null}Yn(e){C("LruGarbageCollector",`Garbage collection scheduled in ${e}ms`),this.Jn=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Jn=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Ft(t)?C("LruGarbageCollector","Ignoring IndexedDB error during garbage collection: ",t):await Mt(t)}await this.Yn(3e5)})}},ku=class{constructor(e,t){this.Zn=e,this.params=t}calculateTargetCount(e,t){return this.Zn.Xn(e).next(n=>Math.floor(t/100*n))}nthSequenceNumber(e,t){if(t===0)return b.resolve(Se.oe);let n=new Du(t);return this.Zn.forEachTarget(e,i=>n.Hn(i.sequenceNumber)).next(()=>this.Zn.er(e,i=>n.Hn(i))).next(()=>n.maxValue)}removeTargets(e,t,n){return this.Zn.removeTargets(e,t,n)}removeOrphanedDocuments(e,t){return this.Zn.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(C("LruGarbageCollector","Garbage collection skipped; disabled"),b.resolve(np)):this.getCacheSize(e).next(n=>n<this.params.cacheSizeCollectionThreshold?(C("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),np):this.tr(e,t))}getCacheSize(e){return this.Zn.getCacheSize(e)}tr(e,t){let n,i,s,o,c,u,h,f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(m=>(m>this.params.maximumSequenceNumbersToCollect?(C("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${m}`),i=this.params.maximumSequenceNumbersToCollect):i=m,o=Date.now(),this.nthSequenceNumber(e,i))).next(m=>(n=m,c=Date.now(),this.removeTargets(e,n,t))).next(m=>(s=m,u=Date.now(),this.removeOrphanedDocuments(e,n))).next(m=>(h=Date.now(),Bn()<=H.DEBUG&&C("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-f}ms
	Determined least recently used ${i} in `+(c-o)+`ms
	Removed ${s} targets in `+(u-c)+`ms
	Removed ${m} documents in `+(h-u)+`ms
Total Duration: ${h-f}ms`),b.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:s,documentsRemoved:m})))}};function Tm(r,e){return new ku(r,e)}var Nu=class{constructor(e,t){this.db=e,this.garbageCollector=Tm(this,t)}Xn(e){let t=this.nr(e);return this.db.getTargetCache().getTargetCount(e).next(n=>t.next(i=>n+i))}nr(e){let t=0;return this.er(e,n=>{t++}).next(()=>t)}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}er(e,t){return this.rr(e,(n,i)=>t(i))}addReference(e,t,n){return xs(e,n)}removeReference(e,t,n){return xs(e,n)}removeTargets(e,t,n){return this.db.getTargetCache().removeTargets(e,t,n)}markPotentiallyOrphaned(e,t){return xs(e,t)}ir(e,t){return function(i,s){let o=!1;return Em(i).Y(c=>wm(i,c,s).next(u=>(u&&(o=!0),b.resolve(!u)))).next(()=>o)}(e,t)}removeOrphanedDocuments(e,t){let n=this.db.getRemoteDocumentCache().newChangeBuffer(),i=[],s=0;return this.rr(e,(o,c)=>{if(c<=t){let u=this.ir(e,o).next(h=>{if(!h)return s++,n.getEntry(e,o).next(()=>(n.removeEntry(o,q.min()),At(e).delete(function(m){return[0,Re(m.path)]}(o))))});i.push(u)}}).next(()=>b.waitFor(i)).next(()=>n.apply(e)).next(()=>s)}removeTarget(e,t){let n=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,n)}updateLimboDocument(e,t){return xs(e,t)}rr(e,t){let n=At(e),i,s=Se.oe;return n.J({index:"documentTargetsIndex"},([o,c],{path:u,sequenceNumber:h})=>{o===0?(s!==Se.oe&&t(new V(Qe(i)),s),s=h,i=u):s=Se.oe}).next(()=>{s!==Se.oe&&t(new V(Qe(i)),s)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}};function xs(r,e){return At(r).put(function(n,i){return{targetId:0,path:Re(n.path),sequenceNumber:i}}(e,r.currentSequenceNumber))}var mo=class{constructor(){this.changes=new Ge(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Ie.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();let n=this.changes.get(t);return n!==void 0?b.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}};var Ou=class{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,n){return tn(e).put(n)}removeEntry(e,t,n){return tn(e).delete(function(s,o){let c=s.path.toArray();return[c.slice(0,c.length-2),c[c.length-2],ao(o),c[c.length-1]]}(t,n))}updateMetadata(e,t){return this.getMetadata(e).next(n=>(n.byteSize+=t,this.sr(e,n)))}getEntry(e,t){let n=Ie.newInvalidDocument(t);return tn(e).J({index:"documentKeyIndex",range:IDBKeyRange.only(ei(t))},(i,s)=>{n=this._r(t,s)}).next(()=>n)}ar(e,t){let n={size:0,document:Ie.newInvalidDocument(t)};return tn(e).J({index:"documentKeyIndex",range:IDBKeyRange.only(ei(t))},(i,s)=>{n={document:this._r(t,s),size:ho(s)}}).next(()=>n)}getEntries(e,t){let n=Fe();return this.ur(e,t,(i,s)=>{let o=this._r(i,s);n=n.insert(i,o)}).next(()=>n)}cr(e,t){let n=Fe(),i=new ie(V.comparator);return this.ur(e,t,(s,o)=>{let c=this._r(s,o);n=n.insert(s,c),i=i.insert(s,ho(o))}).next(()=>({documents:n,lr:i}))}ur(e,t,n){if(t.isEmpty())return b.resolve();let i=new te(ap);t.forEach(u=>i=i.add(u));let s=IDBKeyRange.bound(ei(i.first()),ei(i.last())),o=i.getIterator(),c=o.getNext();return tn(e).J({index:"documentKeyIndex",range:s},(u,h,f)=>{let m=V.fromSegments([...h.prefixPath,h.collectionGroup,h.documentId]);for(;c&&ap(c,m)<0;)n(c,null),c=o.getNext();c&&c.isEqual(m)&&(n(c,h),c=o.hasNext()?o.getNext():null),c?f.$(ei(c)):f.done()}).next(()=>{for(;c;)n(c,null),c=o.hasNext()?o.getNext():null})}getDocumentsMatchingQuery(e,t,n,i,s){let o=t.path,c=[o.popLast().toArray(),o.lastSegment(),ao(n.readTime),n.documentKey.path.isEmpty()?"":n.documentKey.path.lastSegment()],u=[o.popLast().toArray(),o.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return tn(e).U(IDBKeyRange.bound(c,u,!0)).next(h=>{s==null||s.incrementDocumentReadCount(h.length);let f=Fe();for(let m of h){let v=this._r(V.fromSegments(m.prefixPath.concat(m.collectionGroup,m.documentId)),m);v.isFoundDocument()&&(Ni(t,v)||i.has(v.key))&&(f=f.insert(v.key,v))}return f})}getAllFromCollectionGroup(e,t,n,i){let s=Fe(),o=op(t,n),c=op(t,qe.max());return tn(e).J({index:"collectionGroupIndex",range:IDBKeyRange.bound(o,c,!0)},(u,h,f)=>{let m=this._r(V.fromSegments(h.prefixPath.concat(h.collectionGroup,h.documentId)),h);s=s.insert(m.key,m),s.size===i&&f.done()}).next(()=>s)}newChangeBuffer(e){return new xu(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(t=>t.byteSize)}getMetadata(e){return sp(e).get("remoteDocumentGlobalKey").next(t=>(F(!!t),t))}sr(e,t){return sp(e).put("remoteDocumentGlobalKey",t)}_r(e,t){if(t){let n=EI(this.serializer,t);if(!(n.isNoDocument()&&n.version.isEqual(q.min())))return n}return Ie.newInvalidDocument(e)}};function Am(r){return new Ou(r)}var xu=class extends mo{constructor(e,t){super(),this.hr=e,this.trackRemovals=t,this.Pr=new Ge(n=>n.toString(),(n,i)=>n.isEqual(i))}applyChanges(e){let t=[],n=0,i=new te((s,o)=>$(s.canonicalString(),o.canonicalString()));return this.changes.forEach((s,o)=>{let c=this.Pr.get(s);if(t.push(this.hr.removeEntry(e,s,c.readTime)),o.isValidDocument()){let u=Kf(this.hr.serializer,o);i=i.add(s.path.popLast());let h=ho(u);n+=h-c.size,t.push(this.hr.addEntry(e,s,u))}else if(n-=c.size,this.trackRemovals){let u=Kf(this.hr.serializer,o.convertToNoDocument(q.min()));t.push(this.hr.addEntry(e,s,u))}}),i.forEach(s=>{t.push(this.hr.indexManager.addToCollectionParentIndex(e,s))}),t.push(this.hr.updateMetadata(e,n)),b.waitFor(t)}getFromCache(e,t){return this.hr.ar(e,t).next(n=>(this.Pr.set(t,{size:n.size,readTime:n.document.readTime}),n.document))}getAllFromCache(e,t){return this.hr.cr(e,t).next(({documents:n,lr:i})=>(i.forEach((s,o)=>{this.Pr.set(s,{size:o,readTime:n.get(s).readTime})}),n))}};function sp(r){return ge(r,"remoteDocumentGlobal")}function tn(r){return ge(r,"remoteDocumentsV14")}function ei(r){let e=r.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function op(r,e){let t=e.documentKey.path.toArray();return[r,ao(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function ap(r,e){let t=r.path.toArray(),n=e.path.toArray(),i=0;for(let s=0;s<t.length-2&&s<n.length-2;++s)if(i=$(t[s],n[s]),i)return i;return i=$(t.length,n.length),i||(i=$(t[t.length-2],n[n.length-2]),i||$(t[t.length-1],n[n.length-1]))}var Vu=class{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}};var go=class{constructor(e,t,n,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=i}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next(i=>(n=i,this.remoteDocumentCache.getEntry(e,t))).next(i=>(n!==null&&ai(n.mutation,i,Me.empty(),ue.now()),i))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(n=>this.getLocalViewOfDocuments(e,n,K()).next(()=>n))}getLocalViewOfDocuments(e,t,n=K()){let i=Je();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,n).next(s=>{let o=ni();return s.forEach((c,u)=>{o=o.insert(c,u.overlayedDocument)}),o}))}getOverlayedDocuments(e,t){let n=Je();return this.populateOverlays(e,n,t).next(()=>this.computeViews(e,t,n,K()))}populateOverlays(e,t,n){let i=[];return n.forEach(s=>{t.has(s)||i.push(s)}),this.documentOverlayCache.getOverlays(e,i).next(s=>{s.forEach((o,c)=>{t.set(o,c)})})}computeViews(e,t,n,i){let s=Fe(),o=oi(),c=function(){return oi()}();return t.forEach((u,h)=>{let f=n.get(h.key);i.has(h.key)&&(f===void 0||f.mutation instanceof $e)?s=s.insert(h.key,h):f!==void 0?(o.set(h.key,f.mutation.getFieldMask()),ai(f.mutation,h,f.mutation.getFieldMask(),ue.now())):o.set(h.key,Me.empty())}),this.recalculateAndSaveOverlays(e,s).next(u=>(u.forEach((h,f)=>o.set(h,f)),t.forEach((h,f)=>{var m;return c.set(h,new Vu(f,(m=o.get(h))!==null&&m!==void 0?m:null))}),c))}recalculateAndSaveOverlays(e,t){let n=oi(),i=new ie((o,c)=>o-c),s=K();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(o=>{for(let c of o)c.keys().forEach(u=>{let h=t.get(u);if(h===null)return;let f=n.get(u)||Me.empty();f=c.applyToLocalView(h,f),n.set(u,f);let m=(i.get(c.batchId)||K()).add(u);i=i.insert(c.batchId,m)})}).next(()=>{let o=[],c=i.getReverseIterator();for(;c.hasNext();){let u=c.getNext(),h=u.key,f=u.value,m=Jp();f.forEach(v=>{if(!s.has(v)){let S=nm(t.get(v),n.get(v));S!==null&&m.set(v,S),s=s.add(v)}}),o.push(this.documentOverlayCache.saveOverlays(e,h,m))}return b.waitFor(o)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(n=>this.recalculateAndSaveOverlays(e,n))}getDocumentsMatchingQuery(e,t,n,i){return function(o){return V.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Gp(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n,i):this.getDocumentsMatchingCollectionQuery(e,t,n,i)}getNextDocuments(e,t,n,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,i).next(s=>{let o=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,i-s.size):b.resolve(Je()),c=-1,u=s;return o.next(h=>b.forEach(h,(f,m)=>(c<m.largestBatchId&&(c=m.largestBatchId),s.get(f)?b.resolve():this.remoteDocumentCache.getEntry(e,f).next(v=>{u=u.insert(f,v)}))).next(()=>this.populateOverlays(e,h,s)).next(()=>this.computeViews(e,u,h,K())).next(f=>({batchId:c,changes:Qp(f)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new V(t)).next(n=>{let i=ni();return n.isFoundDocument()&&(i=i.insert(n.key,n)),i})}getDocumentsMatchingCollectionGroupQuery(e,t,n,i){let s=t.collectionGroup,o=ni();return this.indexManager.getCollectionParents(e,s).next(c=>b.forEach(c,u=>{let h=function(m,v){return new pn(v,null,m.explicitOrderBy.slice(),m.filters.slice(),m.limit,m.limitType,m.startAt,m.endAt)}(t,u.child(s));return this.getDocumentsMatchingCollectionQuery(e,h,n,i).next(f=>{f.forEach((m,v)=>{o=o.insert(m,v)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,t,n,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId).next(o=>(s=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,s,i))).next(o=>{s.forEach((u,h)=>{let f=h.getKey();o.get(f)===null&&(o=o.insert(f,Ie.newInvalidDocument(f)))});let c=ni();return o.forEach((u,h)=>{let f=s.get(u);f!==void 0&&ai(f.mutation,h,Me.empty(),ue.now()),Ni(t,h)&&(c=c.insert(u,h))}),c})}};var Lu=class{constructor(e){this.serializer=e,this.Tr=new Map,this.Ir=new Map}getBundleMetadata(e,t){return b.resolve(this.Tr.get(t))}saveBundleMetadata(e,t){return this.Tr.set(t.id,function(i){return{id:i.id,version:i.version,createTime:Ne(i.createTime)}}(t)),b.resolve()}getNamedQuery(e,t){return b.resolve(this.Ir.get(t))}saveNamedQuery(e,t){return this.Ir.set(t.name,function(i){return{name:i.name,query:_m(i.bundledQuery),readTime:Ne(i.readTime)}}(t)),b.resolve()}};var Mu=class{constructor(){this.overlays=new ie(V.comparator),this.Er=new Map}getOverlay(e,t){return b.resolve(this.overlays.get(t))}getOverlays(e,t){let n=Je();return b.forEach(t,i=>this.getOverlay(e,i).next(s=>{s!==null&&n.set(i,s)})).next(()=>n)}saveOverlays(e,t,n){return n.forEach((i,s)=>{this.Tt(e,t,s)}),b.resolve()}removeOverlaysForBatchId(e,t,n){let i=this.Er.get(n);return i!==void 0&&(i.forEach(s=>this.overlays=this.overlays.remove(s)),this.Er.delete(n)),b.resolve()}getOverlaysForCollection(e,t,n){let i=Je(),s=t.length+1,o=new V(t.child("")),c=this.overlays.getIteratorFrom(o);for(;c.hasNext();){let u=c.getNext().value,h=u.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===s&&u.largestBatchId>n&&i.set(u.getKey(),u)}return b.resolve(i)}getOverlaysForCollectionGroup(e,t,n,i){let s=new ie((h,f)=>h-f),o=this.overlays.getIterator();for(;o.hasNext();){let h=o.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>n){let f=s.get(h.largestBatchId);f===null&&(f=Je(),s=s.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}let c=Je(),u=s.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((h,f)=>c.set(h,f)),!(c.size()>=i)););return b.resolve(c)}Tt(e,t,n){let i=this.overlays.get(n.key);if(i!==null){let o=this.Er.get(i.largestBatchId).delete(n.key);this.Er.set(i.largestBatchId,o)}this.overlays=this.overlays.insert(n.key,new vi(t,n));let s=this.Er.get(t);s===void 0&&(s=K(),this.Er.set(t,s)),this.Er.set(t,s.add(n.key))}};var Fu=class{constructor(){this.sessionToken=fe.EMPTY_BYTE_STRING}getSessionToken(e){return b.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,b.resolve()}};var Ti=class{constructor(){this.dr=new te(de.Ar),this.Rr=new te(de.Vr)}isEmpty(){return this.dr.isEmpty()}addReference(e,t){let n=new de(e,t);this.dr=this.dr.add(n),this.Rr=this.Rr.add(n)}mr(e,t){e.forEach(n=>this.addReference(n,t))}removeReference(e,t){this.gr(new de(e,t))}pr(e,t){e.forEach(n=>this.removeReference(n,t))}yr(e){let t=new V(new ee([])),n=new de(t,e),i=new de(t,e+1),s=[];return this.Rr.forEachInRange([n,i],o=>{this.gr(o),s.push(o.key)}),s}wr(){this.dr.forEach(e=>this.gr(e))}gr(e){this.dr=this.dr.delete(e),this.Rr=this.Rr.delete(e)}Sr(e){let t=new V(new ee([])),n=new de(t,e),i=new de(t,e+1),s=K();return this.Rr.forEachInRange([n,i],o=>{s=s.add(o.key)}),s}containsKey(e){let t=new de(e,0),n=this.dr.firstAfterOrEqual(t);return n!==null&&e.isEqual(n.key)}},de=class{constructor(e,t){this.key=e,this.br=t}static Ar(e,t){return V.comparator(e.key,t.key)||$(e.br,t.br)}static Vr(e,t){return $(e.br,t.br)||V.comparator(e.key,t.key)}};var Uu=class{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Dr=1,this.vr=new te(de.Ar)}checkEmpty(e){return b.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,n,i){let s=this.Dr;this.Dr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];let o=new yi(s,t,n,i);this.mutationQueue.push(o);for(let c of i)this.vr=this.vr.add(new de(c.key,s)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return b.resolve(o)}lookupMutationBatch(e,t){return b.resolve(this.Cr(t))}getNextMutationBatchAfterBatchId(e,t){let n=t+1,i=this.Fr(n),s=i<0?0:i;return b.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return b.resolve(this.mutationQueue.length===0?-1:this.Dr-1)}getAllMutationBatches(e){return b.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){let n=new de(t,0),i=new de(t,Number.POSITIVE_INFINITY),s=[];return this.vr.forEachInRange([n,i],o=>{let c=this.Cr(o.br);s.push(c)}),b.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new te($);return t.forEach(i=>{let s=new de(i,0),o=new de(i,Number.POSITIVE_INFINITY);this.vr.forEachInRange([s,o],c=>{n=n.add(c.br)})}),b.resolve(this.Mr(n))}getAllMutationBatchesAffectingQuery(e,t){let n=t.path,i=n.length+1,s=n;V.isDocumentKey(s)||(s=s.child(""));let o=new de(new V(s),0),c=new te($);return this.vr.forEachWhile(u=>{let h=u.key.path;return!!n.isPrefixOf(h)&&(h.length===i&&(c=c.add(u.br)),!0)},o),b.resolve(this.Mr(c))}Mr(e){let t=[];return e.forEach(n=>{let i=this.Cr(n);i!==null&&t.push(i)}),t}removeMutationBatch(e,t){F(this.Or(t.batchId,"removed")===0),this.mutationQueue.shift();let n=this.vr;return b.forEach(t.mutations,i=>{let s=new de(i.key,t.batchId);return n=n.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.vr=n})}Ln(e){}containsKey(e,t){let n=new de(t,0),i=this.vr.firstAfterOrEqual(n);return b.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,b.resolve()}Or(e,t){return this.Fr(e)}Fr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Cr(e){let t=this.Fr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}};var Bu=class{constructor(e){this.Nr=e,this.docs=function(){return new ie(V.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){let n=t.key,i=this.docs.get(n),s=i?i.size:0,o=this.Nr(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:o}),this.size+=o-s,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){let t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){let n=this.docs.get(t);return b.resolve(n?n.document.mutableCopy():Ie.newInvalidDocument(t))}getEntries(e,t){let n=Fe();return t.forEach(i=>{let s=this.docs.get(i);n=n.insert(i,s?s.document.mutableCopy():Ie.newInvalidDocument(i))}),b.resolve(n)}getDocumentsMatchingQuery(e,t,n,i){let s=Fe(),o=t.path,c=new V(o.child("")),u=this.docs.getIteratorFrom(c);for(;u.hasNext();){let{key:h,value:{document:f}}=u.getNext();if(!o.isPrefixOf(h.path))break;h.path.length>o.length+1||Vl(Sp(f),n)<=0||(i.has(f.key)||Ni(t,f))&&(s=s.insert(f.key,f.mutableCopy()))}return b.resolve(s)}getAllFromCollectionGroup(e,t,n,i){L()}Lr(e,t){return b.forEach(this.docs,n=>t(n))}newChangeBuffer(e){return new qu(this)}getSize(e){return b.resolve(this.size)}},qu=class extends mo{constructor(e){super(),this.hr=e}applyChanges(e){let t=[];return this.changes.forEach((n,i)=>{i.isValidDocument()?t.push(this.hr.addEntry(e,i)):this.hr.removeEntry(n)}),b.waitFor(t)}getFromCache(e,t){return this.hr.getEntry(e,t)}getAllFromCache(e,t){return this.hr.getEntries(e,t)}};var ju=class{constructor(e){this.persistence=e,this.Br=new Ge(t=>fn(t),ki),this.lastRemoteSnapshotVersion=q.min(),this.highestTargetId=0,this.kr=0,this.qr=new Ti,this.targetCount=0,this.Qr=ar.qn()}forEachTarget(e,t){return this.Br.forEach((n,i)=>t(i)),b.resolve()}getLastRemoteSnapshotVersion(e){return b.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return b.resolve(this.kr)}allocateTargetId(e){return this.highestTargetId=this.Qr.next(),b.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.kr&&(this.kr=t),b.resolve()}Un(e){this.Br.set(e.target,e);let t=e.targetId;t>this.highestTargetId&&(this.Qr=new ar(t),this.highestTargetId=t),e.sequenceNumber>this.kr&&(this.kr=e.sequenceNumber)}addTargetData(e,t){return this.Un(t),this.targetCount+=1,b.resolve()}updateTargetData(e,t){return this.Un(t),b.resolve()}removeTargetData(e,t){return this.Br.delete(t.target),this.qr.yr(t.targetId),this.targetCount-=1,b.resolve()}removeTargets(e,t,n){let i=0,s=[];return this.Br.forEach((o,c)=>{c.sequenceNumber<=t&&n.get(c.targetId)===null&&(this.Br.delete(o),s.push(this.removeMatchingKeysForTargetId(e,c.targetId)),i++)}),b.waitFor(s).next(()=>i)}getTargetCount(e){return b.resolve(this.targetCount)}getTargetData(e,t){let n=this.Br.get(t)||null;return b.resolve(n)}addMatchingKeys(e,t,n){return this.qr.mr(t,n),b.resolve()}removeMatchingKeys(e,t,n){this.qr.pr(t,n);let i=this.persistence.referenceDelegate,s=[];return i&&t.forEach(o=>{s.push(i.markPotentiallyOrphaned(e,o))}),b.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this.qr.yr(t),b.resolve()}getMatchingKeysForTargetId(e,t){let n=this.qr.Sr(t);return b.resolve(n)}containsKey(e,t){return b.resolve(this.qr.containsKey(t))}};var Ai=class{constructor(e,t){this.Kr={},this.overlays={},this.$r=new Se(0),this.Ur=!1,this.Ur=!0,this.Wr=new Fu,this.referenceDelegate=e(this),this.Gr=new ju(this),this.indexManager=new Ru,this.remoteDocumentCache=function(i){return new Bu(i)}(n=>this.referenceDelegate.zr(n)),this.serializer=new oo(t),this.jr=new Lu(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Ur=!1,Promise.resolve()}get started(){return this.Ur}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Mu,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this.Kr[e.toKey()];return n||(n=new Uu(t,this.referenceDelegate),this.Kr[e.toKey()]=n),n}getGlobalsCache(){return this.Wr}getTargetCache(){return this.Gr}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.jr}runTransaction(e,t,n){C("MemoryPersistence","Starting transaction:",e);let i=new zu(this.$r.next());return this.referenceDelegate.Hr(),n(i).next(s=>this.referenceDelegate.Jr(i).next(()=>s)).toPromise().then(s=>(i.raiseOnCommittedEvent(),s))}Yr(e,t){return b.or(Object.values(this.Kr).map(n=>()=>n.containsKey(e,t)))}},zu=class extends $s{constructor(e){super(),this.currentSequenceNumber=e}},_o=class r{constructor(e){this.persistence=e,this.Zr=new Ti,this.Xr=null}static ei(e){return new r(e)}get ti(){if(this.Xr)return this.Xr;throw L()}addReference(e,t,n){return this.Zr.addReference(n,t),this.ti.delete(n.toString()),b.resolve()}removeReference(e,t,n){return this.Zr.removeReference(n,t),this.ti.add(n.toString()),b.resolve()}markPotentiallyOrphaned(e,t){return this.ti.add(t.toString()),b.resolve()}removeTarget(e,t){this.Zr.yr(t.targetId).forEach(i=>this.ti.add(i.toString()));let n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next(i=>{i.forEach(s=>this.ti.add(s.toString()))}).next(()=>n.removeTargetData(e,t))}Hr(){this.Xr=new Set}Jr(e){let t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return b.forEach(this.ti,n=>{let i=V.fromPath(n);return this.ni(e,i).next(s=>{s||t.removeEntry(i,q.min())})}).next(()=>(this.Xr=null,t.apply(e)))}updateLimboDocument(e,t){return this.ni(e,t).next(n=>{n?this.ti.delete(t.toString()):this.ti.add(t.toString())})}zr(e){return 0}ni(e,t){return b.or([()=>b.resolve(this.Zr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Yr(e,t)])}},yo=class r{constructor(e,t){this.persistence=e,this.ri=new Ge(n=>Re(n.path),(n,i)=>n.isEqual(i)),this.garbageCollector=Tm(this,t)}static ei(e,t){return new r(e,t)}Hr(){}Jr(e){return b.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}Xn(e){let t=this.nr(e);return this.persistence.getTargetCache().getTargetCount(e).next(n=>t.next(i=>n+i))}nr(e){let t=0;return this.er(e,n=>{t++}).next(()=>t)}er(e,t){return b.forEach(this.ri,(n,i)=>this.ir(e,n,i).next(s=>s?b.resolve():t(i)))}removeTargets(e,t,n){return this.persistence.getTargetCache().removeTargets(e,t,n)}removeOrphanedDocuments(e,t){let n=0,i=this.persistence.getRemoteDocumentCache(),s=i.newChangeBuffer();return i.Lr(e,o=>this.ir(e,o,t).next(c=>{c||(n++,s.removeEntry(o,q.min()))})).next(()=>s.apply(e)).next(()=>n)}markPotentiallyOrphaned(e,t){return this.ri.set(t,e.currentSequenceNumber),b.resolve()}removeTarget(e,t){let n=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,n)}addReference(e,t,n){return this.ri.set(n,e.currentSequenceNumber),b.resolve()}removeReference(e,t,n){return this.ri.set(n,e.currentSequenceNumber),b.resolve()}updateLimboDocument(e,t){return this.ri.set(t,e.currentSequenceNumber),b.resolve()}zr(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Us(e.data.value)),t}ir(e,t,n){return b.or([()=>this.persistence.Yr(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{let i=this.ri.get(t);return b.resolve(i!==void 0&&i>n)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}};var Gu=class{constructor(e){this.serializer=e}O(e,t,n,i){let s=new Ks("createOrUpgrade",t);n<1&&i>=1&&(function(u){u.createObjectStore("owner")}(e),function(u){u.createObjectStore("mutationQueues",{keyPath:"userId"}),u.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",Af,{unique:!0}),u.createObjectStore("documentMutations")}(e),cp(e),function(u){u.createObjectStore("remoteDocuments")}(e));let o=b.resolve();return n<3&&i>=3&&(n!==0&&(function(u){u.deleteObjectStore("targetDocuments"),u.deleteObjectStore("targets"),u.deleteObjectStore("targetGlobal")}(e),cp(e)),o=o.next(()=>function(u){let h=u.store("targetGlobal"),f={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:q.min().toTimestamp(),targetCount:0};return h.put("targetGlobalKey",f)}(s))),n<4&&i>=4&&(n!==0&&(o=o.next(()=>function(u,h){return h.store("mutations").U().next(f=>{u.deleteObjectStore("mutations"),u.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",Af,{unique:!0});let m=h.store("mutations"),v=f.map(S=>m.put(S));return b.waitFor(v)})}(e,s))),o=o.next(()=>{(function(u){u.createObjectStore("clientMetadata",{keyPath:"clientId"})})(e)})),n<5&&i>=5&&(o=o.next(()=>this.ii(s))),n<6&&i>=6&&(o=o.next(()=>(function(u){u.createObjectStore("remoteDocumentGlobal")}(e),this.si(s)))),n<7&&i>=7&&(o=o.next(()=>this.oi(s))),n<8&&i>=8&&(o=o.next(()=>this._i(e,s))),n<9&&i>=9&&(o=o.next(()=>{(function(u){u.objectStoreNames.contains("remoteDocumentChanges")&&u.deleteObjectStore("remoteDocumentChanges")})(e)})),n<10&&i>=10&&(o=o.next(()=>this.ai(s))),n<11&&i>=11&&(o=o.next(()=>{(function(u){u.createObjectStore("bundles",{keyPath:"bundleId"})})(e),function(u){u.createObjectStore("namedQueries",{keyPath:"name"})}(e)})),n<12&&i>=12&&(o=o.next(()=>{(function(u){let h=u.createObjectStore("documentOverlays",{keyPath:Uv});h.createIndex("collectionPathOverlayIndex",Bv,{unique:!1}),h.createIndex("collectionGroupOverlayIndex",qv,{unique:!1})})(e)})),n<13&&i>=13&&(o=o.next(()=>function(u){let h=u.createObjectStore("remoteDocumentsV14",{keyPath:Pv});h.createIndex("documentKeyIndex",Cv),h.createIndex("collectionGroupIndex",Dv)}(e)).next(()=>this.ui(e,s)).next(()=>e.deleteObjectStore("remoteDocuments"))),n<14&&i>=14&&(o=o.next(()=>this.ci(e,s))),n<15&&i>=15&&(o=o.next(()=>function(u){u.createObjectStore("indexConfiguration",{keyPath:"indexId",autoIncrement:!0}).createIndex("collectionGroupIndex","collectionGroup",{unique:!1}),u.createObjectStore("indexState",{keyPath:Vv}).createIndex("sequenceNumberIndex",Lv,{unique:!1}),u.createObjectStore("indexEntries",{keyPath:Mv}).createIndex("documentKeyIndex",Fv,{unique:!1})}(e))),n<16&&i>=16&&(o=o.next(()=>{t.objectStore("indexState").clear()}).next(()=>{t.objectStore("indexEntries").clear()})),n<17&&i>=17&&(o=o.next(()=>{(function(u){u.createObjectStore("globals",{keyPath:"name"})})(e)})),o}si(e){let t=0;return e.store("remoteDocuments").J((n,i)=>{t+=ho(i)}).next(()=>{let n={byteSize:t};return e.store("remoteDocumentGlobal").put("remoteDocumentGlobalKey",n)})}ii(e){let t=e.store("mutationQueues"),n=e.store("mutations");return t.U().next(i=>b.forEach(i,s=>{let o=IDBKeyRange.bound([s.userId,-1],[s.userId,s.lastAcknowledgedBatchId]);return n.U("userMutationsIndex",o).next(c=>b.forEach(c,u=>{F(u.userId===s.userId);let h=sn(this.serializer,u);return Im(e,s.userId,h).next(()=>{})}))}))}oi(e){let t=e.store("targetDocuments"),n=e.store("remoteDocuments");return e.store("targetGlobal").get("targetGlobalKey").next(i=>{let s=[];return n.J((o,c)=>{let u=new ee(o),h=function(m){return[0,Re(m)]}(u);s.push(t.get(h).next(f=>f?b.resolve():(m=>t.put({targetId:0,path:Re(m),sequenceNumber:i.highestListenSequenceNumber}))(u)))}).next(()=>b.waitFor(s))})}_i(e,t){e.createObjectStore("collectionParents",{keyPath:xv});let n=t.store("collectionParents"),i=new Ei,s=o=>{if(i.add(o)){let c=o.lastSegment(),u=o.popLast();return n.put({collectionId:c,parent:Re(u)})}};return t.store("remoteDocuments").J({H:!0},(o,c)=>{let u=new ee(o);return s(u.popLast())}).next(()=>t.store("documentMutations").J({H:!0},([o,c,u],h)=>{let f=Qe(c);return s(f.popLast())}))}ai(e){let t=e.store("targets");return t.J((n,i)=>{let s=ri(i),o=gm(this.serializer,s);return t.put(o)})}ui(e,t){let n=t.store("remoteDocuments"),i=[];return n.J((s,o)=>{let c=t.store("remoteDocumentsV14"),u=function(m){return m.document?new V(ee.fromString(m.document.name).popFirst(5)):m.noDocument?V.fromSegments(m.noDocument.path):m.unknownDocument?V.fromSegments(m.unknownDocument.path):L()}(o).path.toArray(),h={prefixPath:u.slice(0,u.length-2),collectionGroup:u[u.length-2],documentId:u[u.length-1],readTime:o.readTime||[0,0],unknownDocument:o.unknownDocument,noDocument:o.noDocument,document:o.document,hasCommittedMutations:!!o.hasCommittedMutations};i.push(c.put(h))}).next(()=>b.waitFor(i))}ci(e,t){let n=t.store("mutations"),i=Am(this.serializer),s=new Ai(_o.ei,this.serializer.ht);return n.U().next(o=>{let c=new Map;return o.forEach(u=>{var h;let f=(h=c.get(u.userId))!==null&&h!==void 0?h:K();sn(this.serializer,u).keys().forEach(m=>f=f.add(m)),c.set(u.userId,f)}),b.forEach(c,(u,h)=>{let f=new _e(h),m=co.Pt(this.serializer,f),v=s.getIndexManager(f),S=fo.Pt(f,this.serializer,v,s.referenceDelegate);return new go(i,S,m,v).recalculateAndSaveOverlaysForDocumentKeys(new fi(t,Se.oe),u).next()})})}};function cp(r){r.createObjectStore("targetDocuments",{keyPath:Nv}).createIndex("documentTargetsIndex",Ov,{unique:!0}),r.createObjectStore("targets",{keyPath:"targetId"}).createIndex("queryTargetsIndex",kv,{unique:!0}),r.createObjectStore("targetGlobal")}var kc="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",$u=class r{constructor(e,t,n,i,s,o,c,u,h,f,m=17){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=n,this.li=s,this.window=o,this.document=c,this.hi=h,this.Pi=f,this.Ti=m,this.$r=null,this.Ur=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Ii=null,this.inForeground=!1,this.Ei=null,this.di=null,this.Ai=Number.NEGATIVE_INFINITY,this.Ri=v=>Promise.resolve(),!r.p())throw new x(P.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new Nu(this,i),this.Vi=t+"main",this.serializer=new oo(u),this.mi=new Yn(this.Vi,this.Ti,new Gu(this.serializer)),this.Wr=new Iu,this.Gr=new Cu(this.referenceDelegate,this.serializer),this.remoteDocumentCache=Am(this.serializer),this.jr=new vu,this.window&&this.window.localStorage?this.fi=this.window.localStorage:(this.fi=null,f===!1&&ce("IndexedDbPersistence","LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.gi().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new x(P.FAILED_PRECONDITION,kc);return this.pi(),this.yi(),this.wi(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.Gr.getHighestSequenceNumber(e))}).then(e=>{this.$r=new Se(e,this.hi)}).then(()=>{this.Ur=!0}).catch(e=>(this.mi&&this.mi.close(),Promise.reject(e)))}Si(e){return this.Ri=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.mi.L(async t=>{t.newVersion===null&&await e()})}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.li.enqueueAndForget(async()=>{this.started&&await this.gi()}))}gi(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>Vs(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.bi(e).next(t=>{t||(this.isPrimary=!1,this.li.enqueueRetryable(()=>this.Ri(!1)))})}).next(()=>this.Di(e)).next(t=>this.isPrimary&&!t?this.vi(e).next(()=>!1):!!t&&this.Ci(e).next(()=>!0))).catch(e=>{if(Ft(e))return C("IndexedDbPersistence","Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return C("IndexedDbPersistence","Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.li.enqueueRetryable(()=>this.Ri(e)),this.isPrimary=e})}bi(e){return ti(e).get("owner").next(t=>b.resolve(this.Fi(t)))}Mi(e){return Vs(e).delete(this.clientId)}async xi(){if(this.isPrimary&&!this.Oi(this.Ai,18e5)){this.Ai=Date.now();let e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",t=>{let n=ge(t,"clientMetadata");return n.U().next(i=>{let s=this.Ni(i,18e5),o=i.filter(c=>s.indexOf(c)===-1);return b.forEach(o,c=>n.delete(c.clientId)).next(()=>o)})}).catch(()=>[]);if(this.fi)for(let t of e)this.fi.removeItem(this.Li(t.clientId))}}wi(){this.di=this.li.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.gi().then(()=>this.xi()).then(()=>this.wi()))}Fi(e){return!!e&&e.ownerId===this.clientId}Di(e){return this.Pi?b.resolve(!0):ti(e).get("owner").next(t=>{if(t!==null&&this.Oi(t.leaseTimestampMs,5e3)&&!this.Bi(t.ownerId)){if(this.Fi(t)&&this.networkEnabled)return!0;if(!this.Fi(t)){if(!t.allowTabSynchronization)throw new x(P.FAILED_PRECONDITION,kc);return!1}}return!(!this.networkEnabled||!this.inForeground)||Vs(e).U().next(n=>this.Ni(n,5e3).find(i=>{if(this.clientId!==i.clientId){let s=!this.networkEnabled&&i.networkEnabled,o=!this.inForeground&&i.inForeground,c=this.networkEnabled===i.networkEnabled;if(s||o&&c)return!0}return!1})===void 0)}).next(t=>(this.isPrimary!==t&&C("IndexedDbPersistence",`Client ${t?"is":"is not"} eligible for a primary lease.`),t))}async shutdown(){this.Ur=!1,this.ki(),this.di&&(this.di.cancel(),this.di=null),this.qi(),this.Qi(),await this.mi.runTransaction("shutdown","readwrite",["owner","clientMetadata"],e=>{let t=new fi(e,Se.oe);return this.vi(t).next(()=>this.Mi(t))}),this.mi.close(),this.Ki()}Ni(e,t){return e.filter(n=>this.Oi(n.updateTimeMs,t)&&!this.Bi(n.clientId))}$i(){return this.runTransaction("getActiveClients","readonly",e=>Vs(e).U().next(t=>this.Ni(t,18e5).map(n=>n.clientId)))}get started(){return this.Ur}getGlobalsCache(){return this.Wr}getMutationQueue(e,t){return fo.Pt(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.Gr}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new Pu(e,this.serializer.ht.databaseId)}getDocumentOverlayCache(e){return co.Pt(this.serializer,e)}getBundleCache(){return this.jr}runTransaction(e,t,n){C("IndexedDbPersistence","Starting transaction:",e);let i=t==="readonly"?"readonly":"readwrite",s=function(u){return u===17?Gv:u===16?zv:u===15?Ml:u===14?Op:u===13?Np:u===12?jv:u===11?kp:void L()}(this.Ti),o;return this.mi.runTransaction(e,i,s,c=>(o=new fi(c,this.$r?this.$r.next():Se.oe),t==="readwrite-primary"?this.bi(o).next(u=>!!u||this.Di(o)).next(u=>{if(!u)throw ce(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.li.enqueueRetryable(()=>this.Ri(!1)),new x(P.FAILED_PRECONDITION,Rp);return n(o)}).next(u=>this.Ci(o).next(()=>u)):this.Ui(o).next(()=>n(o)))).then(c=>(o.raiseOnCommittedEvent(),c))}Ui(e){return ti(e).get("owner").next(t=>{if(t!==null&&this.Oi(t.leaseTimestampMs,5e3)&&!this.Bi(t.ownerId)&&!this.Fi(t)&&!(this.Pi||this.allowTabSynchronization&&t.allowTabSynchronization))throw new x(P.FAILED_PRECONDITION,kc)})}Ci(e){let t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return ti(e).put("owner",t)}static p(){return Yn.p()}vi(e){let t=ti(e);return t.get("owner").next(n=>this.Fi(n)?(C("IndexedDbPersistence","Releasing primary lease."),t.delete("owner")):b.resolve())}Oi(e,t){let n=Date.now();return!(e<n-t)&&(!(e>n)||(ce(`Detected an update time that is in the future: ${e} > ${n}`),!1))}pi(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Ei=()=>{this.li.enqueueAndForget(()=>(this.inForeground=this.document.visibilityState==="visible",this.gi()))},this.document.addEventListener("visibilitychange",this.Ei),this.inForeground=this.document.visibilityState==="visible")}qi(){this.Ei&&(this.document.removeEventListener("visibilitychange",this.Ei),this.Ei=null)}yi(){var e;typeof((e=this.window)===null||e===void 0?void 0:e.addEventListener)=="function"&&(this.Ii=()=>{this.ki();let t=/(?:Version|Mobile)\/1[456]/;Da()&&(navigator.appVersion.match(t)||navigator.userAgent.match(t))&&this.li.enterRestrictedMode(!0),this.li.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.Ii))}Qi(){this.Ii&&(this.window.removeEventListener("pagehide",this.Ii),this.Ii=null)}Bi(e){var t;try{let n=((t=this.fi)===null||t===void 0?void 0:t.getItem(this.Li(e)))!==null;return C("IndexedDbPersistence",`Client '${e}' ${n?"is":"is not"} zombied in LocalStorage`),n}catch(n){return ce("IndexedDbPersistence","Failed to get zombied client id.",n),!1}}ki(){if(this.fi)try{this.fi.setItem(this.Li(this.clientId),String(Date.now()))}catch(e){ce("Failed to set zombie client id.",e)}}Ki(){if(this.fi)try{this.fi.removeItem(this.Li(this.clientId))}catch{}}Li(e){return`firestore_zombie_${this.persistenceKey}_${e}`}};function ti(r){return ge(r,"owner")}function Vs(r){return ge(r,"clientMetadata")}function bm(r,e){let t=r.projectId;return r.isDefaultDatabase||(t+="."+r.database),"firestore/"+e+"/"+t+"/"}var Ku=class r{constructor(e,t,n,i){this.targetId=e,this.fromCache=t,this.Wi=n,this.Gi=i}static zi(e,t){let n=K(),i=K();for(let s of t.docChanges)switch(s.type){case 0:n=n.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new r(e,t.fromCache,n,i)}};var Wu=class{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}};var vo=class{constructor(){this.ji=!1,this.Hi=!1,this.Ji=100,this.Yi=function(){return Da()?8:Pp(pe())>0?6:4}()}initialize(e,t){this.Zi=e,this.indexManager=t,this.ji=!0}getDocumentsMatchingQuery(e,t,n,i){let s={result:null};return this.Xi(e,t).next(o=>{s.result=o}).next(()=>{if(!s.result)return this.es(e,t,i,n).next(o=>{s.result=o})}).next(()=>{if(s.result)return;let o=new Wu;return this.ts(e,t,o).next(c=>{if(s.result=c,this.Hi)return this.ns(e,t,o,c.size)})}).next(()=>s.result)}ns(e,t,n,i){return n.documentReadCount<this.Ji?(Bn()<=H.DEBUG&&C("QueryEngine","SDK will not create cache indexes for query:",qn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Ji,"documents"),b.resolve()):(Bn()<=H.DEBUG&&C("QueryEngine","Query:",qn(t),"scans",n.documentReadCount,"local documents and returns",i,"documents as results."),n.documentReadCount>this.Yi*i?(Bn()<=H.DEBUG&&C("QueryEngine","The SDK decides to create cache indexes for query:",qn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Ue(t))):b.resolve())}Xi(e,t){if(Lf(t))return b.resolve(null);let n=Ue(t);return this.indexManager.getIndexType(e,n).next(i=>i===0?null:(t.limit!==null&&i===1&&(t=cu(t,null,"F"),n=Ue(t)),this.indexManager.getDocumentsMatchingTarget(e,n).next(s=>{let o=K(...s);return this.Zi.getDocuments(e,o).next(c=>this.indexManager.getMinOffset(e,n).next(u=>{let h=this.rs(t,c);return this.ss(t,h,o,u.readTime)?this.Xi(e,cu(t,null,"F")):this.os(e,h,t,u)}))})))}es(e,t,n,i){return Lf(t)||i.isEqual(q.min())?b.resolve(null):this.Zi.getDocuments(e,n).next(s=>{let o=this.rs(t,s);return this.ss(t,o,n,i)?b.resolve(null):(Bn()<=H.DEBUG&&C("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),qn(t)),this.os(e,o,t,bp(i,-1)).next(c=>c))})}rs(e,t){let n=new te(Wp(e));return t.forEach((i,s)=>{Ni(e,s)&&(n=n.add(s))}),n}ss(e,t,n,i){if(e.limit===null)return!1;if(n.size!==t.size)return!0;let s=e.limitType==="F"?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}ts(e,t,n){return Bn()<=H.DEBUG&&C("QueryEngine","Using full collection scan to execute query:",qn(t)),this.Zi.getDocumentsMatchingQuery(e,t,qe.min(),n)}os(e,t,n,i){return this.Zi.getDocumentsMatchingQuery(e,n,i).next(s=>(t.forEach(o=>{s=s.insert(o.key,o)}),s))}};var Hu=class{constructor(e,t,n,i){this.persistence=e,this._s=t,this.serializer=i,this.us=new ie($),this.cs=new Ge(s=>fn(s),ki),this.ls=new Map,this.hs=e.getRemoteDocumentCache(),this.Gr=e.getTargetCache(),this.jr=e.getBundleCache(),this.Ps(n)}Ps(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new go(this.hs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.hs.setIndexManager(this.indexManager),this._s.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.us))}};function Sm(r,e,t,n){return new Hu(r,e,t,n)}async function Rm(r,e){let t=M(r);return await t.persistence.runTransaction("Handle user change","readonly",n=>{let i;return t.mutationQueue.getAllMutationBatches(n).next(s=>(i=s,t.Ps(e),t.mutationQueue.getAllMutationBatches(n))).next(s=>{let o=[],c=[],u=K();for(let h of i){o.push(h.batchId);for(let f of h.mutations)u=u.add(f.key)}for(let h of s){c.push(h.batchId);for(let f of h.mutations)u=u.add(f.key)}return t.localDocuments.getDocuments(n,u).next(h=>({Ts:h,removedBatchIds:o,addedBatchIds:c}))})})}function bI(r,e){let t=M(r);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",n=>{let i=e.batch.keys(),s=t.hs.newChangeBuffer({trackRemovals:!0});return function(c,u,h,f){let m=h.batch,v=m.keys(),S=b.resolve();return v.forEach(D=>{S=S.next(()=>f.getEntry(u,D)).next(N=>{let k=h.docVersions.get(D);F(k!==null),N.version.compareTo(k)<0&&(m.applyToRemoteDocument(N,h),N.isValidDocument()&&(N.setReadTime(h.commitVersion),f.addEntry(N)))})}),S.next(()=>c.mutationQueue.removeMutationBatch(u,m))}(t,n,e,s).next(()=>s.apply(n)).next(()=>t.mutationQueue.performConsistencyCheck(n)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(n,i,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(n,function(c){let u=K();for(let h=0;h<c.mutationResults.length;++h)c.mutationResults[h].transformResults.length>0&&(u=u.add(c.batch.mutations[h].key));return u}(e))).next(()=>t.localDocuments.getDocuments(n,i))})}function Pm(r){let e=M(r);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Gr.getLastRemoteSnapshotVersion(t))}function SI(r,e){let t=M(r),n=e.snapshotVersion,i=t.us;return t.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{let o=t.hs.newChangeBuffer({trackRemovals:!0});i=t.us;let c=[];e.targetChanges.forEach((f,m)=>{let v=i.get(m);if(!v)return;c.push(t.Gr.removeMatchingKeys(s,f.removedDocuments,m).next(()=>t.Gr.addMatchingKeys(s,f.addedDocuments,m)));let S=v.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(m)!==null?S=S.withResumeToken(fe.EMPTY_BYTE_STRING,q.min()).withLastLimboFreeSnapshotVersion(q.min()):f.resumeToken.approximateByteSize()>0&&(S=S.withResumeToken(f.resumeToken,n)),i=i.insert(m,S),function(N,k,z){return N.resumeToken.approximateByteSize()===0||k.snapshotVersion.toMicroseconds()-N.snapshotVersion.toMicroseconds()>=3e8?!0:z.addedDocuments.size+z.modifiedDocuments.size+z.removedDocuments.size>0}(v,S,f)&&c.push(t.Gr.updateTargetData(s,S))});let u=Fe(),h=K();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(s,f))}),c.push(RI(s,o,e.documentUpdates).next(f=>{u=f.Is,h=f.Es})),!n.isEqual(q.min())){let f=t.Gr.getLastRemoteSnapshotVersion(s).next(m=>t.Gr.setTargetsMetadata(s,s.currentSequenceNumber,n));c.push(f)}return b.waitFor(c).next(()=>o.apply(s)).next(()=>t.localDocuments.getLocalViewOfDocuments(s,u,h)).next(()=>u)}).then(s=>(t.us=i,s))}function RI(r,e,t){let n=K(),i=K();return t.forEach(s=>n=n.add(s)),e.getEntries(r,n).next(s=>{let o=Fe();return t.forEach((c,u)=>{let h=s.get(c);u.isFoundDocument()!==h.isFoundDocument()&&(i=i.add(c)),u.isNoDocument()&&u.version.isEqual(q.min())?(e.removeEntry(c,u.readTime),o=o.insert(c,u)):!h.isValidDocument()||u.version.compareTo(h.version)>0||u.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(u),o=o.insert(c,u)):C("LocalStore","Ignoring outdated watch update for ",c,". Current version:",h.version," Watch version:",u.version)}),{Is:o,Es:i}})}function PI(r,e){let t=M(r);return t.persistence.runTransaction("Get next mutation batch","readonly",n=>(e===void 0&&(e=-1),t.mutationQueue.getNextMutationBatchAfterBatchId(n,e)))}function Io(r,e){let t=M(r);return t.persistence.runTransaction("Allocate target","readwrite",n=>{let i;return t.Gr.getTargetData(n,e).next(s=>s?(i=s,b.resolve(i)):t.Gr.allocateTargetId(n).next(o=>(i=new or(e,o,"TargetPurposeListen",n.currentSequenceNumber),t.Gr.addTargetData(n,i).next(()=>i))))}).then(n=>{let i=t.us.get(n.targetId);return(i===null||n.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(t.us=t.us.insert(n.targetId,n),t.cs.set(e,n.targetId)),n})}async function cr(r,e,t){let n=M(r),i=n.us.get(e),s=t?"readwrite":"readwrite-primary";try{t||await n.persistence.runTransaction("Release target",s,o=>n.persistence.referenceDelegate.removeTarget(o,i))}catch(o){if(!Ft(o))throw o;C("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}n.us=n.us.remove(e),n.cs.delete(i.target)}function Qu(r,e,t){let n=M(r),i=q.min(),s=K();return n.persistence.runTransaction("Execute query","readwrite",o=>function(u,h,f){let m=M(u),v=m.cs.get(f);return v!==void 0?b.resolve(m.us.get(v)):m.Gr.getTargetData(h,f)}(n,o,Ue(e)).next(c=>{if(c)return i=c.lastLimboFreeSnapshotVersion,n.Gr.getMatchingKeysForTargetId(o,c.targetId).next(u=>{s=u})}).next(()=>n._s.getDocumentsMatchingQuery(o,e,t?i:q.min(),t?s:K())).next(c=>(km(n,Kp(e),c),{documents:c,ds:s})))}function Cm(r,e){let t=M(r),n=M(t.Gr),i=t.us.get(e);return i?Promise.resolve(i.target):t.persistence.runTransaction("Get target data","readonly",s=>n.ut(s,e).next(o=>o?o.target:null))}function Dm(r,e){let t=M(r),n=t.ls.get(e)||q.min();return t.persistence.runTransaction("Get new document changes","readonly",i=>t.hs.getAllFromCollectionGroup(i,e,bp(n,-1),Number.MAX_SAFE_INTEGER)).then(i=>(km(t,e,i),i))}function km(r,e,t){let n=r.ls.get(e)||q.min();t.forEach((i,s)=>{s.readTime.compareTo(n)>0&&(n=s.readTime)}),r.ls.set(e,n)}function up(r,e){return`firestore_clients_${r}_${e}`}function lp(r,e,t){let n=`firestore_mutations_${r}_${t}`;return e.isAuthenticated()&&(n+=`_${e.uid}`),n}function Nc(r,e){return`firestore_targets_${r}_${e}`}var wo=class r{constructor(e,t,n,i){this.user=e,this.batchId=t,this.state=n,this.error=i}static fs(e,t,n){let i=JSON.parse(n),s,o=typeof i=="object"&&["pending","acknowledged","rejected"].indexOf(i.state)!==-1&&(i.error===void 0||typeof i.error=="object");return o&&i.error&&(o=typeof i.error.message=="string"&&typeof i.error.code=="string",o&&(s=new x(i.error.code,i.error.message))),o?new r(e,t,i.state,s):(ce("SharedClientState",`Failed to parse mutation state for ID '${t}': ${n}`),null)}gs(){let e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}},ci=class r{constructor(e,t,n){this.targetId=e,this.state=t,this.error=n}static fs(e,t){let n=JSON.parse(t),i,s=typeof n=="object"&&["not-current","current","rejected"].indexOf(n.state)!==-1&&(n.error===void 0||typeof n.error=="object");return s&&n.error&&(s=typeof n.error.message=="string"&&typeof n.error.code=="string",s&&(i=new x(n.error.code,n.error.message))),s?new r(e,n.state,i):(ce("SharedClientState",`Failed to parse target state for ID '${e}': ${t}`),null)}gs(){let e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}},Eo=class r{constructor(e,t){this.clientId=e,this.activeTargetIds=t}static fs(e,t){let n=JSON.parse(t),i=typeof n=="object"&&n.activeTargetIds instanceof Array,s=Bl();for(let o=0;i&&o<n.activeTargetIds.length;++o)i=Cp(n.activeTargetIds[o]),s=s.add(n.activeTargetIds[o]);return i?new r(e,s):(ce("SharedClientState",`Failed to parse client data for instance '${e}': ${t}`),null)}},Ju=class r{constructor(e,t){this.clientId=e,this.onlineState=t}static fs(e){let t=JSON.parse(e);return typeof t=="object"&&["Unknown","Online","Offline"].indexOf(t.onlineState)!==-1&&typeof t.clientId=="string"?new r(t.clientId,t.onlineState):(ce("SharedClientState",`Failed to parse online state: ${e}`),null)}},bi=class{constructor(){this.activeTargetIds=Bl()}ps(e){this.activeTargetIds=this.activeTargetIds.add(e)}ys(e){this.activeTargetIds=this.activeTargetIds.delete(e)}gs(){let e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}},ui=class{constructor(e,t,n,i,s){this.window=e,this.li=t,this.persistenceKey=n,this.ws=i,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.Ss=this.bs.bind(this),this.Ds=new ie($),this.started=!1,this.vs=[];let o=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=s,this.Cs=up(this.persistenceKey,this.ws),this.Fs=function(u){return`firestore_sequence_number_${u}`}(this.persistenceKey),this.Ds=this.Ds.insert(this.ws,new bi),this.Ms=new RegExp(`^firestore_clients_${o}_([^_]*)$`),this.xs=new RegExp(`^firestore_mutations_${o}_(\\d+)(?:_(.*))?$`),this.Os=new RegExp(`^firestore_targets_${o}_(\\d+)$`),this.Ns=function(u){return`firestore_online_state_${u}`}(this.persistenceKey),this.Ls=function(u){return`firestore_bundle_loaded_v2_${u}`}(this.persistenceKey),this.window.addEventListener("storage",this.Ss)}static p(e){return!(!e||!e.localStorage)}async start(){let e=await this.syncEngine.$i();for(let n of e){if(n===this.ws)continue;let i=this.getItem(up(this.persistenceKey,n));if(i){let s=Eo.fs(n,i);s&&(this.Ds=this.Ds.insert(s.clientId,s))}}this.Bs();let t=this.storage.getItem(this.Ns);if(t){let n=this.ks(t);n&&this.qs(n)}for(let n of this.vs)this.bs(n);this.vs=[],this.window.addEventListener("pagehide",()=>this.shutdown()),this.started=!0}writeSequenceNumber(e){this.setItem(this.Fs,JSON.stringify(e))}getAllActiveQueryTargets(){return this.Qs(this.Ds)}isActiveQueryTarget(e){let t=!1;return this.Ds.forEach((n,i)=>{i.activeTargetIds.has(e)&&(t=!0)}),t}addPendingMutation(e){this.Ks(e,"pending")}updateMutationState(e,t,n){this.Ks(e,t,n),this.$s(e)}addLocalQueryTarget(e,t=!0){let n="not-current";if(this.isActiveQueryTarget(e)){let i=this.storage.getItem(Nc(this.persistenceKey,e));if(i){let s=ci.fs(e,i);s&&(n=s.state)}}return t&&this.Us.ps(e),this.Bs(),n}removeLocalQueryTarget(e){this.Us.ys(e),this.Bs()}isLocalQueryTarget(e){return this.Us.activeTargetIds.has(e)}clearQueryState(e){this.removeItem(Nc(this.persistenceKey,e))}updateQueryState(e,t,n){this.Ws(e,t,n)}handleUserChange(e,t,n){t.forEach(i=>{this.$s(i)}),this.currentUser=e,n.forEach(i=>{this.addPendingMutation(i)})}setOnlineState(e){this.Gs(e)}notifyBundleLoaded(e){this.zs(e)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.Ss),this.removeItem(this.Cs),this.started=!1)}getItem(e){let t=this.storage.getItem(e);return C("SharedClientState","READ",e,t),t}setItem(e,t){C("SharedClientState","SET",e,t),this.storage.setItem(e,t)}removeItem(e){C("SharedClientState","REMOVE",e),this.storage.removeItem(e)}bs(e){let t=e;if(t.storageArea===this.storage){if(C("SharedClientState","EVENT",t.key,t.newValue),t.key===this.Cs)return void ce("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.li.enqueueRetryable(async()=>{if(this.started){if(t.key!==null){if(this.Ms.test(t.key)){if(t.newValue==null){let n=this.js(t.key);return this.Hs(n,null)}{let n=this.Js(t.key,t.newValue);if(n)return this.Hs(n.clientId,n)}}else if(this.xs.test(t.key)){if(t.newValue!==null){let n=this.Ys(t.key,t.newValue);if(n)return this.Zs(n)}}else if(this.Os.test(t.key)){if(t.newValue!==null){let n=this.Xs(t.key,t.newValue);if(n)return this.eo(n)}}else if(t.key===this.Ns){if(t.newValue!==null){let n=this.ks(t.newValue);if(n)return this.qs(n)}}else if(t.key===this.Fs){let n=function(s){let o=Se.oe;if(s!=null)try{let c=JSON.parse(s);F(typeof c=="number"),o=c}catch(c){ce("SharedClientState","Failed to read sequence number from WebStorage",c)}return o}(t.newValue);n!==Se.oe&&this.sequenceNumberHandler(n)}else if(t.key===this.Ls){let n=this.no(t.newValue);await Promise.all(n.map(i=>this.syncEngine.ro(i)))}}}else this.vs.push(t)})}}get Us(){return this.Ds.get(this.ws)}Bs(){this.setItem(this.Cs,this.Us.gs())}Ks(e,t,n){let i=new wo(this.currentUser,e,t,n),s=lp(this.persistenceKey,this.currentUser,e);this.setItem(s,i.gs())}$s(e){let t=lp(this.persistenceKey,this.currentUser,e);this.removeItem(t)}Gs(e){let t={clientId:this.ws,onlineState:e};this.storage.setItem(this.Ns,JSON.stringify(t))}Ws(e,t,n){let i=Nc(this.persistenceKey,e),s=new ci(e,t,n);this.setItem(i,s.gs())}zs(e){let t=JSON.stringify(Array.from(e));this.setItem(this.Ls,t)}js(e){let t=this.Ms.exec(e);return t?t[1]:null}Js(e,t){let n=this.js(e);return Eo.fs(n,t)}Ys(e,t){let n=this.xs.exec(e),i=Number(n[1]),s=n[2]!==void 0?n[2]:null;return wo.fs(new _e(s),i,t)}Xs(e,t){let n=this.Os.exec(e),i=Number(n[1]);return ci.fs(i,t)}ks(e){return Ju.fs(e)}no(e){return JSON.parse(e)}async Zs(e){if(e.user.uid===this.currentUser.uid)return this.syncEngine.io(e.batchId,e.state,e.error);C("SharedClientState",`Ignoring mutation for non-active user ${e.user.uid}`)}eo(e){return this.syncEngine.so(e.targetId,e.state,e.error)}Hs(e,t){let n=t?this.Ds.insert(e,t):this.Ds.remove(e),i=this.Qs(this.Ds),s=this.Qs(n),o=[],c=[];return s.forEach(u=>{i.has(u)||o.push(u)}),i.forEach(u=>{s.has(u)||c.push(u)}),this.syncEngine.oo(o,c).then(()=>{this.Ds=n})}qs(e){this.Ds.get(e.clientId)&&this.onlineStateHandler(e.onlineState)}Qs(e){let t=Bl();return e.forEach((n,i)=>{t=t.unionWith(i.activeTargetIds)}),t}},To=class{constructor(){this._o=new bi,this.ao={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e,t=!0){return t&&this._o.ps(e),this.ao[e]||"not-current"}updateQueryState(e,t,n){this.ao[e]=t}removeLocalQueryTarget(e){this._o.ys(e)}isLocalQueryTarget(e){return this._o.activeTargetIds.has(e)}clearQueryState(e){delete this.ao[e]}getAllActiveQueryTargets(){return this._o.activeTargetIds}isActiveQueryTarget(e){return this._o.activeTargetIds.has(e)}start(){return this._o=new bi,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}};var Yu=class{uo(e){}shutdown(){}};var Ao=class{constructor(){this.co=()=>this.lo(),this.ho=()=>this.Po(),this.To=[],this.Io()}uo(e){this.To.push(e)}shutdown(){window.removeEventListener("online",this.co),window.removeEventListener("offline",this.ho)}Io(){window.addEventListener("online",this.co),window.addEventListener("offline",this.ho)}lo(){C("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(let e of this.To)e(0)}Po(){C("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(let e of this.To)e(1)}static p(){return typeof window!="undefined"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}};var Ls=null;function Oc(){return Ls===null?Ls=function(){return 268435456+Math.round(2147483648*Math.random())}():Ls++,"0x"+Ls.toString(16)}var CI={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};var Xu=class{constructor(e){this.Eo=e.Eo,this.Ao=e.Ao}Ro(e){this.Vo=e}mo(e){this.fo=e}po(e){this.yo=e}onMessage(e){this.wo=e}close(){this.Ao()}send(e){this.Eo(e)}So(){this.Vo()}bo(){this.fo()}Do(e){this.yo(e)}vo(e){this.wo(e)}};var be="WebChannelConnection",Zu=class extends class{get Co(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;let n=t.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Fo=n+"://"+t.host,this.Mo=`projects/${i}/databases/${s}`,this.xo=this.databaseId.database==="(default)"?`project_id=${i}`:`project_id=${i}&database_id=${s}`}Oo(t,n,i,s,o){let c=Oc(),u=this.No(t,n.toUriEncodedString());C("RestConnection",`Sending RPC '${t}' ${c}:`,u,i);let h={"google-cloud-resource-prefix":this.Mo,"x-goog-request-params":this.xo};return this.Lo(h,s,o),this.Bo(t,u,h,i).then(f=>(C("RestConnection",`Received RPC '${t}' ${c}: `,f),f),f=>{throw li("RestConnection",`RPC '${t}' ${c} failed with error: `,f,"url: ",u,"request:",i),f})}ko(t,n,i,s,o,c){return this.Oo(t,n,i,s,o)}Lo(t,n,i){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+pr}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),n&&n.headers.forEach((s,o)=>t[o]=s),i&&i.headers.forEach((s,o)=>t[o]=s)}No(t,n){let i=CI[t];return`${this.Fo}/v1/${n}:${i}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Bo(e,t,n,i){let s=Oc();return new Promise((o,c)=>{let u=new bc;u.setWithCredentials(!0),u.listenOnce(Sc.COMPLETE,()=>{try{switch(u.getLastErrorCode()){case Yr.NO_ERROR:let f=u.getResponseJson();C(be,`XHR for RPC '${e}' ${s} received:`,JSON.stringify(f)),o(f);break;case Yr.TIMEOUT:C(be,`RPC '${e}' ${s} timed out`),c(new x(P.DEADLINE_EXCEEDED,"Request time out"));break;case Yr.HTTP_ERROR:let m=u.getStatus();if(C(be,`RPC '${e}' ${s} failed with status:`,m,"response text:",u.getResponseText()),m>0){let v=u.getResponseJson();Array.isArray(v)&&(v=v[0]);let S=v==null?void 0:v.error;if(S&&S.status&&S.message){let D=function(k){let z=k.toLowerCase().replace(/_/g,"-");return Object.values(P).indexOf(z)>=0?z:P.UNKNOWN}(S.status);c(new x(D,S.message))}else c(new x(P.UNKNOWN,"Server responded with status "+u.getStatus()))}else c(new x(P.UNAVAILABLE,"Connection failed."));break;default:L()}}finally{C(be,`RPC '${e}' ${s} completed.`)}});let h=JSON.stringify(i);C(be,`RPC '${e}' ${s} sending request:`,i),u.send(t,"POST",h,n,15)})}qo(e,t,n){let i=Oc(),s=[this.Fo,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=Cc(),c=Pc(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(u.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(u.useFetchStreams=!0),this.Lo(u.initMessageHeaders,t,n),u.encodeInitMessageHeaders=!0;let f=s.join("");C(be,`Creating RPC '${e}' stream ${i}: ${f}`,u);let m=o.createWebChannel(f,u),v=!1,S=!1,D=new Xu({Eo:k=>{S?C(be,`Not sending because RPC '${e}' stream ${i} is closed:`,k):(v||(C(be,`Opening RPC '${e}' stream ${i} transport.`),m.open(),v=!0),C(be,`RPC '${e}' stream ${i} sending:`,k),m.send(k))},Ao:()=>m.close()}),N=(k,z,j)=>{k.listen(z,U=>{try{j(U)}catch(W){setTimeout(()=>{throw W},0)}})};return N(m,Vn.EventType.OPEN,()=>{S||(C(be,`RPC '${e}' stream ${i} transport opened.`),D.So())}),N(m,Vn.EventType.CLOSE,()=>{S||(S=!0,C(be,`RPC '${e}' stream ${i} transport closed`),D.Do())}),N(m,Vn.EventType.ERROR,k=>{S||(S=!0,li(be,`RPC '${e}' stream ${i} transport errored:`,k),D.Do(new x(P.UNAVAILABLE,"The operation could not be completed")))}),N(m,Vn.EventType.MESSAGE,k=>{var z;if(!S){let j=k.data[0];F(!!j);let U=j,W=(U==null?void 0:U.error)||((z=U[0])===null||z===void 0?void 0:z.error);if(W){C(be,`RPC '${e}' stream ${i} received error:`,W);let Y=W.status,G=function(y){let w=he[y];if(w!==void 0)return im(w)}(Y),I=W.message;G===void 0&&(G=P.INTERNAL,I="Unknown error status: "+Y+" with message "+W.message),S=!0,D.Do(new x(G,I)),m.close()}else C(be,`RPC '${e}' stream ${i} received:`,j),D.vo(j)}}),N(c,Rc.STAT_EVENT,k=>{k.stat===ks.PROXY?C(be,`RPC '${e}' stream ${i} detected buffering proxy`):k.stat===ks.NOPROXY&&C(be,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{D.bo()},0),D}};function Nm(){return typeof window!="undefined"?window:null}function js(){return typeof document!="undefined"?document:null}function Wo(r){return new pu(r,!0)}var bo=class{constructor(e,t,n=1e3,i=1.5,s=6e4){this.li=e,this.timerId=t,this.Qo=n,this.Ko=i,this.$o=s,this.Uo=0,this.Wo=null,this.Go=Date.now(),this.reset()}reset(){this.Uo=0}zo(){this.Uo=this.$o}jo(e){this.cancel();let t=Math.floor(this.Uo+this.Ho()),n=Math.max(0,Date.now()-this.Go),i=Math.max(0,t-n);i>0&&C("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.Uo} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.Wo=this.li.enqueueAfterDelay(this.timerId,i,()=>(this.Go=Date.now(),e())),this.Uo*=this.Ko,this.Uo<this.Qo&&(this.Uo=this.Qo),this.Uo>this.$o&&(this.Uo=this.$o)}Jo(){this.Wo!==null&&(this.Wo.skipDelay(),this.Wo=null)}cancel(){this.Wo!==null&&(this.Wo.cancel(),this.Wo=null)}Ho(){return(Math.random()-.5)*this.Uo}};var So=class{constructor(e,t,n,i,s,o,c,u){this.li=e,this.Yo=n,this.Zo=i,this.connection=s,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=c,this.listener=u,this.state=0,this.Xo=0,this.e_=null,this.t_=null,this.stream=null,this.n_=0,this.r_=new bo(e,t)}i_(){return this.state===1||this.state===5||this.s_()}s_(){return this.state===2||this.state===3}start(){this.n_=0,this.state!==4?this.auth():this.o_()}async stop(){this.i_()&&await this.close(0)}__(){this.state=0,this.r_.reset()}a_(){this.s_()&&this.e_===null&&(this.e_=this.li.enqueueAfterDelay(this.Yo,6e4,()=>this.u_()))}c_(e){this.l_(),this.stream.send(e)}async u_(){if(this.s_())return this.close(0)}l_(){this.e_&&(this.e_.cancel(),this.e_=null)}h_(){this.t_&&(this.t_.cancel(),this.t_=null)}async close(e,t){this.l_(),this.h_(),this.r_.cancel(),this.Xo++,e!==4?this.r_.reset():t&&t.code===P.RESOURCE_EXHAUSTED?(ce(t.toString()),ce("Using maximum backoff delay to prevent overloading the backend."),this.r_.zo()):t&&t.code===P.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.P_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.po(t)}P_(){}auth(){this.state=1;let e=this.T_(this.Xo),t=this.Xo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([n,i])=>{this.Xo===t&&this.I_(n,i)},n=>{e(()=>{let i=new x(P.UNKNOWN,"Fetching auth token failed: "+n.message);return this.E_(i)})})}I_(e,t){let n=this.T_(this.Xo);this.stream=this.d_(e,t),this.stream.Ro(()=>{n(()=>this.listener.Ro())}),this.stream.mo(()=>{n(()=>(this.state=2,this.t_=this.li.enqueueAfterDelay(this.Zo,1e4,()=>(this.s_()&&(this.state=3),Promise.resolve())),this.listener.mo()))}),this.stream.po(i=>{n(()=>this.E_(i))}),this.stream.onMessage(i=>{n(()=>++this.n_==1?this.A_(i):this.onNext(i))})}o_(){this.state=5,this.r_.jo(async()=>{this.state=0,this.start()})}E_(e){return C("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}T_(e){return t=>{this.li.enqueueAndForget(()=>this.Xo===e?t():(C("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}},el=class extends So{constructor(e,t,n,i,s,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,i,o),this.serializer=s}d_(e,t){return this.connection.qo("Listen",e,t)}A_(e){return this.onNext(e)}onNext(e){this.r_.reset();let t=mI(this.serializer,e),n=function(s){if(!("targetChange"in s))return q.min();let o=s.targetChange;return o.targetIds&&o.targetIds.length?q.min():o.readTime?Ne(o.readTime):q.min()}(e);return this.listener.R_(t,n)}V_(e){let t={};t.database=_u(this.serializer),t.addTarget=function(s,o){let c,u=o.target;if(c=Ys(u)?{documents:lm(s,u)}:{query:hm(s,u).ct},c.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){c.resumeToken=sm(s,o.resumeToken);let h=mu(s,o.expectedCount);h!==null&&(c.expectedCount=h)}else if(o.snapshotVersion.compareTo(q.min())>0){c.readTime=sr(s,o.snapshotVersion.toTimestamp());let h=mu(s,o.expectedCount);h!==null&&(c.expectedCount=h)}return c}(this.serializer,e);let n=_I(this.serializer,e);n&&(t.labels=n),this.c_(t)}m_(e){let t={};t.database=_u(this.serializer),t.removeTarget=e,this.c_(t)}},tl=class extends So{constructor(e,t,n,i,s,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,i,o),this.serializer=s}get f_(){return this.n_>0}start(){this.lastStreamToken=void 0,super.start()}P_(){this.f_&&this.g_([])}d_(e,t){return this.connection.qo("Write",e,t)}A_(e){return F(!!e.streamToken),this.lastStreamToken=e.streamToken,F(!e.writeResults||e.writeResults.length===0),this.listener.p_()}onNext(e){F(!!e.streamToken),this.lastStreamToken=e.streamToken,this.r_.reset();let t=gI(e.writeResults,e.commitTime),n=Ne(e.commitTime);return this.listener.y_(n,t)}w_(){let e={};e.database=_u(this.serializer),this.c_(e)}g_(e){let t={streamToken:this.lastStreamToken,writes:e.map(n=>so(this.serializer,n))};this.c_(t)}};var nl=class extends class{}{constructor(e,t,n,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.serializer=i,this.S_=!1}b_(){if(this.S_)throw new x(P.FAILED_PRECONDITION,"The client has already been terminated.")}Oo(e,t,n,i){return this.b_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,o])=>this.connection.Oo(e,gu(t,n),i,s,o)).catch(s=>{throw s.name==="FirebaseError"?(s.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new x(P.UNKNOWN,s.toString())})}ko(e,t,n,i,s){return this.b_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,c])=>this.connection.ko(e,gu(t,n),i,o,c,s)).catch(o=>{throw o.name==="FirebaseError"?(o.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new x(P.UNKNOWN,o.toString())})}terminate(){this.S_=!0,this.connection.terminate()}},rl=class{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.D_=0,this.v_=null,this.C_=!0}F_(){this.D_===0&&(this.M_("Unknown"),this.v_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.v_=null,this.x_("Backend didn't respond within 10 seconds."),this.M_("Offline"),Promise.resolve())))}O_(e){this.state==="Online"?this.M_("Unknown"):(this.D_++,this.D_>=1&&(this.N_(),this.x_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.M_("Offline")))}set(e){this.N_(),this.D_=0,e==="Online"&&(this.C_=!1),this.M_(e)}M_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}x_(e){let t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.C_?(ce(t),this.C_=!1):C("OnlineStateTracker",t)}N_(){this.v_!==null&&(this.v_.cancel(),this.v_=null)}};var il=class{constructor(e,t,n,i,s){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.L_=[],this.B_=new Map,this.k_=new Set,this.q_=[],this.Q_=s,this.Q_.uo(o=>{n.enqueueAndForget(async()=>{wn(this)&&(C("RemoteStore","Restarting streams for network reachability change."),await async function(u){let h=M(u);h.k_.add(4),await Oi(h),h.K_.set("Unknown"),h.k_.delete(4),await Ho(h)}(this))})}),this.K_=new rl(n,i)}};async function Ho(r){if(wn(r))for(let e of r.q_)await e(!0)}async function Oi(r){for(let e of r.q_)await e(!1)}function Qo(r,e){let t=M(r);t.B_.has(e.targetId)||(t.B_.set(e.targetId,e),Kl(t)?$l(t):gr(t).s_()&&Gl(t,e))}function ur(r,e){let t=M(r),n=gr(t);t.B_.delete(e),n.s_()&&Om(t,e),t.B_.size===0&&(n.s_()?n.a_():wn(t)&&t.K_.set("Unknown"))}function Gl(r,e){if(r.U_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(q.min())>0){let t=r.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}gr(r).V_(e)}function Om(r,e){r.U_.xe(e),gr(r).m_(e)}function $l(r){r.U_=new fu({getRemoteKeysForTarget:e=>r.remoteSyncer.getRemoteKeysForTarget(e),ut:e=>r.B_.get(e)||null,nt:()=>r.datastore.serializer.databaseId}),gr(r).start(),r.K_.F_()}function Kl(r){return wn(r)&&!gr(r).i_()&&r.B_.size>0}function wn(r){return M(r).k_.size===0}function xm(r){r.U_=void 0}async function DI(r){r.K_.set("Online")}async function kI(r){r.B_.forEach((e,t)=>{Gl(r,e)})}async function NI(r,e){xm(r),Kl(r)?(r.K_.O_(e),$l(r)):r.K_.set("Unknown")}async function OI(r,e,t){if(r.K_.set("Online"),e instanceof no&&e.state===2&&e.cause)try{await async function(i,s){let o=s.cause;for(let c of s.targetIds)i.B_.has(c)&&(await i.remoteSyncer.rejectListen(c,o),i.B_.delete(c),i.U_.removeTarget(c))}(r,e)}catch(n){C("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),n),await Ro(r,n)}else if(e instanceof Wn?r.U_.$e(e):e instanceof to?r.U_.Je(e):r.U_.Ge(e),!t.isEqual(q.min()))try{let n=await Pm(r.localStore);t.compareTo(n)>=0&&await function(s,o){let c=s.U_.it(o);return c.targetChanges.forEach((u,h)=>{if(u.resumeToken.approximateByteSize()>0){let f=s.B_.get(h);f&&s.B_.set(h,f.withResumeToken(u.resumeToken,o))}}),c.targetMismatches.forEach((u,h)=>{let f=s.B_.get(u);if(!f)return;s.B_.set(u,f.withResumeToken(fe.EMPTY_BYTE_STRING,f.snapshotVersion)),Om(s,u);let m=new or(f.target,u,h,f.sequenceNumber);Gl(s,m)}),s.remoteSyncer.applyRemoteEvent(c)}(r,t)}catch(n){C("RemoteStore","Failed to raise snapshot:",n),await Ro(r,n)}}async function Ro(r,e,t){if(!Ft(e))throw e;r.k_.add(1),await Oi(r),r.K_.set("Offline"),t||(t=()=>Pm(r.localStore)),r.asyncQueue.enqueueRetryable(async()=>{C("RemoteStore","Retrying IndexedDB access"),await t(),r.k_.delete(1),await Ho(r)})}function Vm(r,e){return e().catch(t=>Ro(r,t,e))}async function mr(r){let e=M(r),t=Vt(e),n=e.L_.length>0?e.L_[e.L_.length-1].batchId:-1;for(;xI(e);)try{let i=await PI(e.localStore,n);if(i===null){e.L_.length===0&&t.a_();break}n=i.batchId,VI(e,i)}catch(i){await Ro(e,i)}Lm(e)&&Mm(e)}function xI(r){return wn(r)&&r.L_.length<10}function VI(r,e){r.L_.push(e);let t=Vt(r);t.s_()&&t.f_&&t.g_(e.mutations)}function Lm(r){return wn(r)&&!Vt(r).i_()&&r.L_.length>0}function Mm(r){Vt(r).start()}async function LI(r){Vt(r).w_()}async function MI(r){let e=Vt(r);for(let t of r.L_)e.g_(t.mutations)}async function FI(r,e,t){let n=r.L_.shift(),i=lu.from(n,e,t);await Vm(r,()=>r.remoteSyncer.applySuccessfulWrite(i)),await mr(r)}async function UI(r,e){e&&Vt(r).f_&&await async function(n,i){if(function(o){return aI(o)&&o!==P.ABORTED}(i.code)){let s=n.L_.shift();Vt(n).__(),await Vm(n,()=>n.remoteSyncer.rejectFailedWrite(s.batchId,i)),await mr(n)}}(r,e),Lm(r)&&Mm(r)}async function hp(r,e){let t=M(r);t.asyncQueue.verifyOperationInProgress(),C("RemoteStore","RemoteStore received new credentials");let n=wn(t);t.k_.add(3),await Oi(t),n&&t.K_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.k_.delete(3),await Ho(t)}async function sl(r,e){let t=M(r);e?(t.k_.delete(2),await Ho(t)):e||(t.k_.add(2),await Oi(t),t.K_.set("Unknown"))}function gr(r){return r.W_||(r.W_=function(t,n,i){let s=M(t);return s.b_(),new el(n,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(r.datastore,r.asyncQueue,{Ro:DI.bind(null,r),mo:kI.bind(null,r),po:NI.bind(null,r),R_:OI.bind(null,r)}),r.q_.push(async e=>{e?(r.W_.__(),Kl(r)?$l(r):r.K_.set("Unknown")):(await r.W_.stop(),xm(r))})),r.W_}function Vt(r){return r.G_||(r.G_=function(t,n,i){let s=M(t);return s.b_(),new tl(n,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(r.datastore,r.asyncQueue,{Ro:()=>Promise.resolve(),mo:LI.bind(null,r),po:UI.bind(null,r),p_:MI.bind(null,r),y_:FI.bind(null,r)}),r.q_.push(async e=>{e?(r.G_.__(),await mr(r)):(await r.G_.stop(),r.L_.length>0&&(C("RemoteStore",`Stopping write stream with ${r.L_.length} pending writes`),r.L_=[]))})),r.G_}var ol=class r{constructor(e,t,n,i,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=i,this.removalCallback=s,this.deferred=new Ye,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,n,i,s){let o=Date.now()+n,c=new r(e,t,o,i,s);return c.start(n),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new x(P.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}};function Wl(r,e){if(ce("AsyncQueue",`${e}: ${r}`),Ft(r))return new x(P.UNAVAILABLE,`${e}: ${r}`);throw r}var Po=class r{static emptySet(e){return new r(e.comparator)}constructor(e){this.comparator=e?(t,n)=>e(t,n)||V.comparator(t.key,n.key):(t,n)=>V.comparator(t.key,n.key),this.keyedMap=ni(),this.sortedSet=new ie(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){let t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,n)=>(e(t),!1))}add(e){let t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){let t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof r)||this.size!==e.size)return!1;let t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){let i=t.getNext().key,s=n.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){let e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){let n=new r;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n}};var Co=class{constructor(){this.z_=new ie(V.comparator)}track(e){let t=e.doc.key,n=this.z_.get(t);n?e.type!==0&&n.type===3?this.z_=this.z_.insert(t,e):e.type===3&&n.type!==1?this.z_=this.z_.insert(t,{type:n.type,doc:e.doc}):e.type===2&&n.type===2?this.z_=this.z_.insert(t,{type:2,doc:e.doc}):e.type===2&&n.type===0?this.z_=this.z_.insert(t,{type:0,doc:e.doc}):e.type===1&&n.type===0?this.z_=this.z_.remove(t):e.type===1&&n.type===2?this.z_=this.z_.insert(t,{type:1,doc:n.doc}):e.type===0&&n.type===1?this.z_=this.z_.insert(t,{type:2,doc:e.doc}):L():this.z_=this.z_.insert(t,e)}j_(){let e=[];return this.z_.inorderTraversal((t,n)=>{e.push(n)}),e}},lr=class r{constructor(e,t,n,i,s,o,c,u,h){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=i,this.mutatedKeys=s,this.fromCache=o,this.syncStateChanged=c,this.excludesMetadataChanges=u,this.hasCachedResults=h}static fromInitialDocuments(e,t,n,i,s){let o=[];return t.forEach(c=>{o.push({type:0,doc:c})}),new r(e,t,Po.emptySet(t),o,n,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Ko(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;let t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==n[i].type||!t[i].doc.isEqual(n[i].doc))return!1;return!0}};var al=class{constructor(){this.H_=void 0,this.J_=[]}Y_(){return this.J_.some(e=>e.Z_())}},cl=class{constructor(){this.queries=dp(),this.onlineState="Unknown",this.X_=new Set}terminate(){(function(t,n){let i=M(t),s=i.queries;i.queries=dp(),s.forEach((o,c)=>{for(let u of c.J_)u.onError(n)})})(this,new x(P.ABORTED,"Firestore shutting down"))}};function dp(){return new Ge(r=>$p(r),Ko)}async function BI(r,e){let t=M(r),n=3,i=e.query,s=t.queries.get(i);s?!s.Y_()&&e.Z_()&&(n=2):(s=new al,n=e.Z_()?0:1);try{switch(n){case 0:s.H_=await t.onListen(i,!0);break;case 1:s.H_=await t.onListen(i,!1);break;case 2:await t.onFirstRemoteStoreListen(i)}}catch(o){let c=Wl(o,`Initialization of query '${qn(e.query)}' failed`);return void e.onError(c)}t.queries.set(i,s),s.J_.push(e),e.ea(t.onlineState),s.H_&&e.ta(s.H_)&&Hl(t)}async function qI(r,e){let t=M(r),n=e.query,i=3,s=t.queries.get(n);if(s){let o=s.J_.indexOf(e);o>=0&&(s.J_.splice(o,1),s.J_.length===0?i=e.Z_()?0:1:!s.Y_()&&e.Z_()&&(i=2))}switch(i){case 0:return t.queries.delete(n),t.onUnlisten(n,!0);case 1:return t.queries.delete(n),t.onUnlisten(n,!1);case 2:return t.onLastRemoteStoreUnlisten(n);default:return}}function jI(r,e){let t=M(r),n=!1;for(let i of e){let s=i.query,o=t.queries.get(s);if(o){for(let c of o.J_)c.ta(i)&&(n=!0);o.H_=i}}n&&Hl(t)}function zI(r,e,t){let n=M(r),i=n.queries.get(e);if(i)for(let s of i.J_)s.onError(t);n.queries.delete(e)}function Hl(r){r.X_.forEach(e=>{e.next()})}var ul,fp;(fp=ul||(ul={})).na="default",fp.Cache="cache";var ll=class{constructor(e,t,n){this.query=e,this.ra=t,this.ia=!1,this.sa=null,this.onlineState="Unknown",this.options=n||{}}ta(e){if(!this.options.includeMetadataChanges){let n=[];for(let i of e.docChanges)i.type!==3&&n.push(i);e=new lr(e.query,e.docs,e.oldDocs,n,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.ia?this.oa(e)&&(this.ra.next(e),t=!0):this._a(e,this.onlineState)&&(this.aa(e),t=!0),this.sa=e,t}onError(e){this.ra.error(e)}ea(e){this.onlineState=e;let t=!1;return this.sa&&!this.ia&&this._a(this.sa,e)&&(this.aa(this.sa),t=!0),t}_a(e,t){if(!e.fromCache||!this.Z_())return!0;let n=t!=="Offline";return(!this.options.ua||!n)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}oa(e){if(e.docChanges.length>0)return!0;let t=this.sa&&this.sa.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}aa(e){e=lr.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.ia=!0,this.ra.next(e)}Z_(){return this.options.source!==ul.Cache}};var Do=class{constructor(e){this.key=e}},ko=class{constructor(e){this.key=e}},hl=class{constructor(e,t){this.query=e,this.da=t,this.Aa=null,this.hasCachedResults=!1,this.current=!1,this.Ra=K(),this.mutatedKeys=K(),this.Va=Wp(e),this.ma=new Po(this.Va)}get fa(){return this.da}ga(e,t){let n=t?t.pa:new Co,i=t?t.ma:this.ma,s=t?t.mutatedKeys:this.mutatedKeys,o=i,c=!1,u=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,h=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((f,m)=>{let v=i.get(f),S=Ni(this.query,m)?m:null,D=!!v&&this.mutatedKeys.has(v.key),N=!!S&&(S.hasLocalMutations||this.mutatedKeys.has(S.key)&&S.hasCommittedMutations),k=!1;v&&S?v.data.isEqual(S.data)?D!==N&&(n.track({type:3,doc:S}),k=!0):this.ya(v,S)||(n.track({type:2,doc:S}),k=!0,(u&&this.Va(S,u)>0||h&&this.Va(S,h)<0)&&(c=!0)):!v&&S?(n.track({type:0,doc:S}),k=!0):v&&!S&&(n.track({type:1,doc:v}),k=!0,(u||h)&&(c=!0)),k&&(S?(o=o.add(S),s=N?s.add(f):s.delete(f)):(o=o.delete(f),s=s.delete(f)))}),this.query.limit!==null)for(;o.size>this.query.limit;){let f=this.query.limitType==="F"?o.last():o.first();o=o.delete(f.key),s=s.delete(f.key),n.track({type:1,doc:f})}return{ma:o,pa:n,ss:c,mutatedKeys:s}}ya(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n,i){let s=this.ma;this.ma=e.ma,this.mutatedKeys=e.mutatedKeys;let o=e.pa.j_();o.sort((f,m)=>function(S,D){let N=k=>{switch(k){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return L()}};return N(S)-N(D)}(f.type,m.type)||this.Va(f.doc,m.doc)),this.wa(n),i=i!=null&&i;let c=t&&!i?this.Sa():[],u=this.Ra.size===0&&this.current&&!i?1:0,h=u!==this.Aa;return this.Aa=u,o.length!==0||h?{snapshot:new lr(this.query,e.ma,s,o,e.mutatedKeys,u===0,h,!1,!!n&&n.resumeToken.approximateByteSize()>0),ba:c}:{ba:c}}ea(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({ma:this.ma,pa:new Co,mutatedKeys:this.mutatedKeys,ss:!1},!1)):{ba:[]}}Da(e){return!this.da.has(e)&&!!this.ma.has(e)&&!this.ma.get(e).hasLocalMutations}wa(e){e&&(e.addedDocuments.forEach(t=>this.da=this.da.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.da=this.da.delete(t)),this.current=e.current)}Sa(){if(!this.current)return[];let e=this.Ra;this.Ra=K(),this.ma.forEach(n=>{this.Da(n.key)&&(this.Ra=this.Ra.add(n.key))});let t=[];return e.forEach(n=>{this.Ra.has(n)||t.push(new ko(n))}),this.Ra.forEach(n=>{e.has(n)||t.push(new Do(n))}),t}va(e){this.da=e.ds,this.Ra=K();let t=this.ga(e.documents);return this.applyChanges(t,!0)}Ca(){return lr.fromInitialDocuments(this.query,this.ma,this.mutatedKeys,this.Aa===0,this.hasCachedResults)}},dl=class{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}},fl=class{constructor(e){this.key=e,this.Fa=!1}},pl=class{constructor(e,t,n,i,s,o){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=o,this.Ma={},this.xa=new Ge(c=>$p(c),Ko),this.Oa=new Map,this.Na=new Set,this.La=new ie(V.comparator),this.Ba=new Map,this.ka=new Ti,this.qa={},this.Qa=new Map,this.Ka=ar.Qn(),this.onlineState="Unknown",this.$a=void 0}get isPrimaryClient(){return this.$a===!0}};async function GI(r,e,t=!0){let n=Jo(r),i,s=n.xa.get(e);return s?(n.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.Ca()):i=await Fm(n,e,t,!0),i}async function $I(r,e){let t=Jo(r);await Fm(t,e,!0,!1)}async function Fm(r,e,t,n){let i=await Io(r.localStore,Ue(e)),s=i.targetId,o=r.sharedClientState.addLocalQueryTarget(s,t),c;return n&&(c=await Ql(r,e,s,o==="current",i.resumeToken)),r.isPrimaryClient&&t&&Qo(r.remoteStore,i),c}async function Ql(r,e,t,n,i){r.Ua=(m,v,S)=>async function(N,k,z,j){let U=k.view.ga(z);U.ss&&(U=await Qu(N.localStore,k.query,!1).then(({documents:I})=>k.view.ga(I,U)));let W=j&&j.targetChanges.get(k.targetId),Y=j&&j.targetMismatches.get(k.targetId)!=null,G=k.view.applyChanges(U,N.isPrimaryClient,W,Y);return ml(N,k.targetId,G.ba),G.snapshot}(r,m,v,S);let s=await Qu(r.localStore,e,!0),o=new hl(e,s.ds),c=o.ga(s.documents),u=wi.createSynthesizedTargetChangeForCurrentChange(t,n&&r.onlineState!=="Offline",i),h=o.applyChanges(c,r.isPrimaryClient,u);ml(r,t,h.ba);let f=new dl(e,t,o);return r.xa.set(e,f),r.Oa.has(t)?r.Oa.get(t).push(e):r.Oa.set(t,[e]),h.snapshot}async function KI(r,e,t){let n=M(r),i=n.xa.get(e),s=n.Oa.get(i.targetId);if(s.length>1)return n.Oa.set(i.targetId,s.filter(o=>!Ko(o,e))),void n.xa.delete(e);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(i.targetId),n.sharedClientState.isActiveQueryTarget(i.targetId)||await cr(n.localStore,i.targetId,!1).then(()=>{n.sharedClientState.clearQueryState(i.targetId),t&&ur(n.remoteStore,i.targetId),hr(n,i.targetId)}).catch(Mt)):(hr(n,i.targetId),await cr(n.localStore,i.targetId,!0))}async function WI(r,e){let t=M(r),n=t.xa.get(e),i=t.Oa.get(n.targetId);t.isPrimaryClient&&i.length===1&&(t.sharedClientState.removeLocalQueryTarget(n.targetId),ur(t.remoteStore,n.targetId))}async function HI(r,e,t){let n=Zl(r);try{let i=await function(o,c){let u=M(o),h=ue.now(),f=c.reduce((S,D)=>S.add(D.key),K()),m,v;return u.persistence.runTransaction("Locally write mutations","readwrite",S=>{let D=Fe(),N=K();return u.hs.getEntries(S,f).next(k=>{D=k,D.forEach((z,j)=>{j.isValidDocument()||(N=N.add(z))})}).next(()=>u.localDocuments.getOverlayedDocuments(S,D)).next(k=>{m=k;let z=[];for(let j of c){let U=oI(j,m.get(j.key).overlayedDocument);U!=null&&z.push(new $e(j.key,U,Mp(U.value.mapValue),ke.exists(!0)))}return u.mutationQueue.addMutationBatch(S,h,z,c)}).next(k=>{v=k;let z=k.applyToLocalDocumentSet(m,N);return u.documentOverlayCache.saveOverlays(S,k.batchId,z)})}).then(()=>({batchId:v.batchId,changes:Qp(m)}))}(n.localStore,e);n.sharedClientState.addPendingMutation(i.batchId),function(o,c,u){let h=o.qa[o.currentUser.toKey()];h||(h=new ie($)),h=h.insert(c,u),o.qa[o.currentUser.toKey()]=h}(n,i.batchId,t),await Bt(n,i.changes),await mr(n.remoteStore)}catch(i){let s=Wl(i,"Failed to persist write");t.reject(s)}}async function Um(r,e){let t=M(r);try{let n=await SI(t.localStore,e);e.targetChanges.forEach((i,s)=>{let o=t.Ba.get(s);o&&(F(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1),i.addedDocuments.size>0?o.Fa=!0:i.modifiedDocuments.size>0?F(o.Fa):i.removedDocuments.size>0&&(F(o.Fa),o.Fa=!1))}),await Bt(t,n,e)}catch(n){await Mt(n)}}function pp(r,e,t){let n=M(r);if(n.isPrimaryClient&&t===0||!n.isPrimaryClient&&t===1){let i=[];n.xa.forEach((s,o)=>{let c=o.view.ea(e);c.snapshot&&i.push(c.snapshot)}),function(o,c){let u=M(o);u.onlineState=c;let h=!1;u.queries.forEach((f,m)=>{for(let v of m.J_)v.ea(c)&&(h=!0)}),h&&Hl(u)}(n.eventManager,e),i.length&&n.Ma.R_(i),n.onlineState=e,n.isPrimaryClient&&n.sharedClientState.setOnlineState(e)}}async function QI(r,e,t){let n=M(r);n.sharedClientState.updateQueryState(e,"rejected",t);let i=n.Ba.get(e),s=i&&i.key;if(s){let o=new ie(V.comparator);o=o.insert(s,Ie.newNoDocument(s,q.min()));let c=K().add(s),u=new Ii(q.min(),new Map,new ie($),o,c);await Um(n,u),n.La=n.La.remove(s),n.Ba.delete(e),Xl(n)}else await cr(n.localStore,e,!1).then(()=>hr(n,e,t)).catch(Mt)}async function JI(r,e){let t=M(r),n=e.batch.batchId;try{let i=await bI(t.localStore,e);Yl(t,n,null),Jl(t,n),t.sharedClientState.updateMutationState(n,"acknowledged"),await Bt(t,i)}catch(i){await Mt(i)}}async function YI(r,e,t){let n=M(r);try{let i=await function(o,c){let u=M(o);return u.persistence.runTransaction("Reject batch","readwrite-primary",h=>{let f;return u.mutationQueue.lookupMutationBatch(h,c).next(m=>(F(m!==null),f=m.keys(),u.mutationQueue.removeMutationBatch(h,m))).next(()=>u.mutationQueue.performConsistencyCheck(h)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(h,f,c)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f)).next(()=>u.localDocuments.getDocuments(h,f))})}(n.localStore,e);Yl(n,e,t),Jl(n,e),n.sharedClientState.updateMutationState(e,"rejected",t),await Bt(n,i)}catch(i){await Mt(i)}}function Jl(r,e){(r.Qa.get(e)||[]).forEach(t=>{t.resolve()}),r.Qa.delete(e)}function Yl(r,e,t){let n=M(r),i=n.qa[n.currentUser.toKey()];if(i){let s=i.get(e);s&&(t?s.reject(t):s.resolve(),i=i.remove(e)),n.qa[n.currentUser.toKey()]=i}}function hr(r,e,t=null){r.sharedClientState.removeLocalQueryTarget(e);for(let n of r.Oa.get(e))r.xa.delete(n),t&&r.Ma.Wa(n,t);r.Oa.delete(e),r.isPrimaryClient&&r.ka.yr(e).forEach(n=>{r.ka.containsKey(n)||Bm(r,n)})}function Bm(r,e){r.Na.delete(e.path.canonicalString());let t=r.La.get(e);t!==null&&(ur(r.remoteStore,t),r.La=r.La.remove(e),r.Ba.delete(t),Xl(r))}function ml(r,e,t){for(let n of t)n instanceof Do?(r.ka.addReference(n.key,e),XI(r,n)):n instanceof ko?(C("SyncEngine","Document no longer in limbo: "+n.key),r.ka.removeReference(n.key,e),r.ka.containsKey(n.key)||Bm(r,n.key)):L()}function XI(r,e){let t=e.key,n=t.path.canonicalString();r.La.get(t)||r.Na.has(n)||(C("SyncEngine","New document in limbo: "+t),r.Na.add(n),Xl(r))}function Xl(r){for(;r.Na.size>0&&r.La.size<r.maxConcurrentLimboResolutions;){let e=r.Na.values().next().value;r.Na.delete(e);let t=new V(ee.fromString(e)),n=r.Ka.next();r.Ba.set(n,new fl(t)),r.La=r.La.insert(t,n),Qo(r.remoteStore,new or(Ue($o(t.path)),n,"TargetPurposeLimboResolution",Se.oe))}}async function Bt(r,e,t){let n=M(r),i=[],s=[],o=[];n.xa.isEmpty()||(n.xa.forEach((c,u)=>{o.push(n.Ua(u,e,t).then(h=>{var f;if((h||t)&&n.isPrimaryClient){let m=h?!h.fromCache:(f=t==null?void 0:t.targetChanges.get(u.targetId))===null||f===void 0?void 0:f.current;n.sharedClientState.updateQueryState(u.targetId,m?"current":"not-current")}if(h){i.push(h);let m=Ku.zi(u.targetId,h);s.push(m)}}))}),await Promise.all(o),n.Ma.R_(i),await async function(u,h){let f=M(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",m=>b.forEach(h,v=>b.forEach(v.Wi,S=>f.persistence.referenceDelegate.addReference(m,v.targetId,S)).next(()=>b.forEach(v.Gi,S=>f.persistence.referenceDelegate.removeReference(m,v.targetId,S)))))}catch(m){if(!Ft(m))throw m;C("LocalStore","Failed to update sequence numbers: "+m)}for(let m of h){let v=m.targetId;if(!m.fromCache){let S=f.us.get(v),D=S.snapshotVersion,N=S.withLastLimboFreeSnapshotVersion(D);f.us=f.us.insert(v,N)}}}(n.localStore,s))}async function ZI(r,e){let t=M(r);if(!t.currentUser.isEqual(e)){C("SyncEngine","User change. New user:",e.toKey());let n=await Rm(t.localStore,e);t.currentUser=e,function(s,o){s.Qa.forEach(c=>{c.forEach(u=>{u.reject(new x(P.CANCELLED,o))})}),s.Qa.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,n.removedBatchIds,n.addedBatchIds),await Bt(t,n.Ts)}}function ew(r,e){let t=M(r),n=t.Ba.get(e);if(n&&n.Fa)return K().add(n.key);{let i=K(),s=t.Oa.get(e);if(!s)return i;for(let o of s){let c=t.xa.get(o);i=i.unionWith(c.view.fa)}return i}}async function tw(r,e){let t=M(r),n=await Qu(t.localStore,e.query,!0),i=e.view.va(n);return t.isPrimaryClient&&ml(t,e.targetId,i.ba),i}async function nw(r,e){let t=M(r);return Dm(t.localStore,e).then(n=>Bt(t,n))}async function rw(r,e,t,n){let i=M(r),s=await function(c,u){let h=M(c),f=M(h.mutationQueue);return h.persistence.runTransaction("Lookup mutation documents","readonly",m=>f.On(m,u).next(v=>v?h.localDocuments.getDocuments(m,v):b.resolve(null)))}(i.localStore,e);s!==null?(t==="pending"?await mr(i.remoteStore):t==="acknowledged"||t==="rejected"?(Yl(i,e,n||null),Jl(i,e),function(c,u){M(M(c).mutationQueue).Ln(u)}(i.localStore,e)):L(),await Bt(i,s)):C("SyncEngine","Cannot apply mutation batch with id: "+e)}async function iw(r,e){let t=M(r);if(Jo(t),Zl(t),e===!0&&t.$a!==!0){let n=t.sharedClientState.getAllActiveQueryTargets(),i=await mp(t,n.toArray());t.$a=!0,await sl(t.remoteStore,!0);for(let s of i)Qo(t.remoteStore,s)}else if(e===!1&&t.$a!==!1){let n=[],i=Promise.resolve();t.Oa.forEach((s,o)=>{t.sharedClientState.isLocalQueryTarget(o)?n.push(o):i=i.then(()=>(hr(t,o),cr(t.localStore,o,!0))),ur(t.remoteStore,o)}),await i,await mp(t,n),function(o){let c=M(o);c.Ba.forEach((u,h)=>{ur(c.remoteStore,h)}),c.ka.wr(),c.Ba=new Map,c.La=new ie(V.comparator)}(t),t.$a=!1,await sl(t.remoteStore,!1)}}async function mp(r,e,t){let n=M(r),i=[],s=[];for(let o of e){let c,u=n.Oa.get(o);if(u&&u.length!==0){c=await Io(n.localStore,Ue(u[0]));for(let h of u){let f=n.xa.get(h),m=await tw(n,f);m.snapshot&&s.push(m.snapshot)}}else{let h=await Cm(n.localStore,o);c=await Io(n.localStore,h),await Ql(n,qm(h),o,!1,c.resumeToken)}i.push(c)}return n.Ma.R_(s),i}function qm(r){return zp(r.path,r.collectionGroup,r.orderBy,r.filters,r.limit,"F",r.startAt,r.endAt)}function sw(r){return function(t){return M(M(t).persistence).$i()}(M(r).localStore)}async function ow(r,e,t,n){let i=M(r);if(i.$a)return void C("SyncEngine","Ignoring unexpected query state notification.");let s=i.Oa.get(e);if(s&&s.length>0)switch(t){case"current":case"not-current":{let o=await Dm(i.localStore,Kp(s[0])),c=Ii.createSynthesizedRemoteEventForCurrentChange(e,t==="current",fe.EMPTY_BYTE_STRING);await Bt(i,o,c);break}case"rejected":await cr(i.localStore,e,!0),hr(i,e,n);break;default:L()}}async function aw(r,e,t){let n=Jo(r);if(n.$a){for(let i of e){if(n.Oa.has(i)&&n.sharedClientState.isActiveQueryTarget(i)){C("SyncEngine","Adding an already active target "+i);continue}let s=await Cm(n.localStore,i),o=await Io(n.localStore,s);await Ql(n,qm(s),o.targetId,!1,o.resumeToken),Qo(n.remoteStore,o)}for(let i of t)n.Oa.has(i)&&await cr(n.localStore,i,!1).then(()=>{ur(n.remoteStore,i),hr(n,i)}).catch(Mt)}}function Jo(r){let e=M(r);return e.remoteStore.remoteSyncer.applyRemoteEvent=Um.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=ew.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=QI.bind(null,e),e.Ma.R_=jI.bind(null,e.eventManager),e.Ma.Wa=zI.bind(null,e.eventManager),e}function Zl(r){let e=M(r);return e.remoteStore.remoteSyncer.applySuccessfulWrite=JI.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=YI.bind(null,e),e}var yn=class{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Wo(e.databaseInfo.databaseId),this.sharedClientState=this.za(e),this.persistence=this.ja(e),await this.persistence.start(),this.localStore=this.Ha(e),this.gcScheduler=this.Ja(e,this.localStore),this.indexBackfillerScheduler=this.Ya(e,this.localStore)}Ja(e,t){return null}Ya(e,t){return null}Ha(e){return Sm(this.persistence,new vo,e.initialUser,this.serializer)}ja(e){return new Ai(_o.ei,this.serializer)}za(e){return new To}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}};yn.provider={build:()=>new yn};var gl=class extends yn{constructor(e){super(),this.cacheSizeBytes=e}Ja(e,t){F(this.persistence.referenceDelegate instanceof yo);let n=this.persistence.referenceDelegate.garbageCollector;return new po(n,e.asyncQueue,t)}ja(e){let t=this.cacheSizeBytes!==void 0?xe.withCacheSize(this.cacheSizeBytes):xe.DEFAULT;return new Ai(n=>yo.ei(n,t),this.serializer)}},No=class extends yn{constructor(e,t,n){super(),this.Za=e,this.cacheSizeBytes=t,this.forceOwnership=n,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.Za.initialize(this,e),await Zl(this.Za.syncEngine),await mr(this.Za.remoteStore),await this.persistence.Si(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}Ha(e){return Sm(this.persistence,new vo,e.initialUser,this.serializer)}Ja(e,t){let n=this.persistence.referenceDelegate.garbageCollector;return new po(n,e.asyncQueue,t)}Ya(e,t){let n=new Wc(t,this.persistence);return new Kc(e.asyncQueue,n)}ja(e){let t=bm(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),n=this.cacheSizeBytes!==void 0?xe.withCacheSize(this.cacheSizeBytes):xe.DEFAULT;return new $u(this.synchronizeTabs,t,e.clientId,n,e.asyncQueue,Nm(),js(),this.serializer,this.sharedClientState,!!this.forceOwnership)}za(e){return new To}},_l=class extends No{constructor(e,t){super(e,t,!1),this.Za=e,this.cacheSizeBytes=t,this.synchronizeTabs=!0}async initialize(e){await super.initialize(e);let t=this.Za.syncEngine;this.sharedClientState instanceof ui&&(this.sharedClientState.syncEngine={io:rw.bind(null,t),so:ow.bind(null,t),oo:aw.bind(null,t),$i:sw.bind(null,t),ro:nw.bind(null,t)},await this.sharedClientState.start()),await this.persistence.Si(async n=>{await iw(this.Za.syncEngine,n),this.gcScheduler&&(n&&!this.gcScheduler.started?this.gcScheduler.start():n||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(n&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():n||this.indexBackfillerScheduler.stop())})}za(e){let t=Nm();if(!ui.p(t))throw new x(P.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");let n=bm(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey);return new ui(t,e.asyncQueue,n,e.clientId,e.initialUser)}},vn=class{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=n=>pp(this.syncEngine,n,1),this.remoteStore.remoteSyncer.handleCredentialChange=ZI.bind(null,this.syncEngine),await sl(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new cl}()}createDatastore(e){let t=Wo(e.databaseInfo.databaseId),n=function(s){return new Zu(s)}(e.databaseInfo);return function(s,o,c,u){return new nl(s,o,c,u)}(e.authCredentials,e.appCheckCredentials,n,t)}createRemoteStore(e){return function(n,i,s,o,c){return new il(n,i,s,o,c)}(this.localStore,this.datastore,e.asyncQueue,t=>pp(this.syncEngine,t,0),function(){return Ao.p()?new Ao:new Yu}())}createSyncEngine(e,t){return function(i,s,o,c,u,h,f){let m=new pl(i,s,o,c,u,h);return f&&(m.$a=!0),m}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(i){let s=M(i);C("RemoteStore","RemoteStore shutting down."),s.k_.add(5),await Oi(s),s.Q_.shutdown(),s.K_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}};vn.provider={build:()=>new vn};var yl=class{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Xa(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Xa(this.observer.error,e):ce("Uncaught Error in snapshot listener:",e.toString()))}eu(){this.muted=!0}Xa(e,t){setTimeout(()=>{this.muted||e(t)},0)}};var vl=class{constructor(e,t,n,i,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this.databaseInfo=i,this.user=_e.UNAUTHENTICATED,this.clientId=zs.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(n,async o=>{C("FirestoreClient","Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(n,o=>(C("FirestoreClient","Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();let e=new Ye;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){let n=Wl(t,"Failed to shutdown persistence");e.reject(n)}}),e.promise}};async function xc(r,e){r.asyncQueue.verifyOperationInProgress(),C("FirestoreClient","Initializing OfflineComponentProvider");let t=r.configuration;await e.initialize(t);let n=t.initialUser;r.setCredentialChangeListener(async i=>{n.isEqual(i)||(await Rm(e.localStore,i),n=i)}),e.persistence.setDatabaseDeletedListener(()=>r.terminate()),r._offlineComponents=e}async function gp(r,e){r.asyncQueue.verifyOperationInProgress();let t=await cw(r);C("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(t,r.configuration),r.setCredentialChangeListener(n=>hp(e.remoteStore,n)),r.setAppCheckTokenChangeListener((n,i)=>hp(e.remoteStore,i)),r._onlineComponents=e}async function cw(r){if(!r._offlineComponents)if(r._uninitializedComponentsProvider){C("FirestoreClient","Using user provided OfflineComponentProvider");try{await xc(r,r._uninitializedComponentsProvider._offline)}catch(e){let t=e;if(!function(i){return i.name==="FirebaseError"?i.code===P.FAILED_PRECONDITION||i.code===P.UNIMPLEMENTED:!(typeof DOMException!="undefined"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(t))throw t;li("Error using user provided cache. Falling back to memory cache: "+t),await xc(r,new yn)}}else C("FirestoreClient","Using default OfflineComponentProvider"),await xc(r,new gl(void 0));return r._offlineComponents}async function jm(r){return r._onlineComponents||(r._uninitializedComponentsProvider?(C("FirestoreClient","Using user provided OnlineComponentProvider"),await gp(r,r._uninitializedComponentsProvider._online)):(C("FirestoreClient","Using default OnlineComponentProvider"),await gp(r,new vn))),r._onlineComponents}function uw(r){return jm(r).then(e=>e.syncEngine)}async function _p(r){let e=await jm(r),t=e.eventManager;return t.onListen=GI.bind(null,e.syncEngine),t.onUnlisten=KI.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=$I.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=WI.bind(null,e.syncEngine),t}function zm(r){let e={};return r.timeoutSeconds!==void 0&&(e.timeoutSeconds=r.timeoutSeconds),e}var yp=new Map;function Gm(r,e,t){if(!t)throw new x(P.INVALID_ARGUMENT,`Function ${r}() cannot be called with an empty ${e}.`)}function lw(r,e,t,n){if(e===!0&&n===!0)throw new x(P.INVALID_ARGUMENT,`${r} and ${t} cannot be used together.`)}function vp(r){if(!V.isDocumentKey(r))throw new x(P.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${r} has ${r.length}.`)}function Ip(r){if(V.isDocumentKey(r))throw new x(P.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${r} has ${r.length}.`)}function Yo(r){if(r===void 0)return"undefined";if(r===null)return"null";if(typeof r=="string")return r.length>20&&(r=`${r.substring(0,20)}...`),JSON.stringify(r);if(typeof r=="number"||typeof r=="boolean")return""+r;if(typeof r=="object"){if(r instanceof Array)return"an array";{let e=function(n){return n.constructor?n.constructor.name:null}(r);return e?`a custom ${e} object`:"an object"}}return typeof r=="function"?"a function":L()}function St(r,e){if("_delegate"in r&&(r=r._delegate),!(r instanceof e)){if(e.name===r.constructor.name)throw new x(P.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{let t=Yo(r);throw new x(P.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return r}var Oo=class{constructor(e){var t,n;if(e.host===void 0){if(e.ssl!==void 0)throw new x(P.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new x(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}lw("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=zm((n=e.experimentalLongPollingOptions)!==null&&n!==void 0?n:{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new x(P.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new x(P.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new x(P.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(n,i){return n.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}},Si=class{constructor(e,t,n,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Oo({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new x(P.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new x(P.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Oo(e),e.credentials!==void 0&&(this._authCredentials=function(n){if(!n)return new Mc;switch(n.type){case"firstParty":return new Bc(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new x(P.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){let n=yp.get(t);n&&(C("ComponentProvider","Removing Datastore"),yp.delete(t),n.terminate())}(this),Promise.resolve()}};var dr=class r{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new r(this.firestore,e,this._query)}},Oe=class r{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Rt(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new r(this.firestore,e,this._key)}},Rt=class r extends dr{constructor(e,t,n){super(e,t,$o(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){let e=this._path.popLast();return e.isEmpty()?null:new Oe(this.firestore,null,new V(e))}withConverter(e){return new r(this.firestore,e,this._path)}};function $m(r,e,...t){if(r=se(r),Gm("collection","path",e),r instanceof Si){let n=ee.fromString(e,...t);return Ip(n),new Rt(r,null,n)}{if(!(r instanceof Oe||r instanceof Rt))throw new x(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let n=r._path.child(ee.fromString(e,...t));return Ip(n),new Rt(r.firestore,null,n)}}function Km(r,e,...t){if(r=se(r),arguments.length===1&&(e=zs.newId()),Gm("doc","path",e),r instanceof Si){let n=ee.fromString(e,...t);return vp(n),new Oe(r,null,new V(n))}{if(!(r instanceof Oe||r instanceof Rt))throw new x(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let n=r._path.child(ee.fromString(e,...t));return vp(n),new Oe(r.firestore,r instanceof Rt?r.converter:null,new V(n))}}var xo=class{constructor(e=Promise.resolve()){this.Iu=[],this.Eu=!1,this.du=[],this.Au=null,this.Ru=!1,this.Vu=!1,this.mu=[],this.r_=new bo(this,"async_queue_retry"),this.fu=()=>{let n=js();n&&C("AsyncQueue","Visibility state changed to "+n.visibilityState),this.r_.Jo()},this.gu=e;let t=js();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.fu)}get isShuttingDown(){return this.Eu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.pu(),this.yu(e)}enterRestrictedMode(e){if(!this.Eu){this.Eu=!0,this.Vu=e||!1;let t=js();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.fu)}}enqueue(e){if(this.pu(),this.Eu)return new Promise(()=>{});let t=new Ye;return this.yu(()=>this.Eu&&this.Vu?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Iu.push(e),this.wu()))}async wu(){if(this.Iu.length!==0){try{await this.Iu[0](),this.Iu.shift(),this.r_.reset()}catch(e){if(!Ft(e))throw e;C("AsyncQueue","Operation failed with retryable error: "+e)}this.Iu.length>0&&this.r_.jo(()=>this.wu())}}yu(e){let t=this.gu.then(()=>(this.Ru=!0,e().catch(n=>{this.Au=n,this.Ru=!1;let i=function(o){let c=o.message||"";return o.stack&&(c=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),c}(n);throw ce("INTERNAL UNHANDLED ERROR: ",i),n}).then(n=>(this.Ru=!1,n))));return this.gu=t,t}enqueueAfterDelay(e,t,n){this.pu(),this.mu.indexOf(e)>-1&&(t=0);let i=ol.createAndSchedule(this,e,t,n,s=>this.Su(s));return this.du.push(i),i}pu(){this.Au&&L()}verifyOperationInProgress(){}async bu(){let e;do e=this.gu,await e;while(e!==this.gu)}Du(e){for(let t of this.du)if(t.timerId===e)return!0;return!1}vu(e){return this.bu().then(()=>{this.du.sort((t,n)=>t.targetTimeMs-n.targetTimeMs);for(let t of this.du)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.bu()})}Cu(e){this.mu.push(e)}Su(e){let t=this.du.indexOf(e);this.du.splice(t,1)}};function wp(r){return function(t,n){if(typeof t!="object"||t===null)return!1;let i=t;for(let s of n)if(s in i&&typeof i[s]=="function")return!0;return!1}(r,["next","error","complete"])}var Lt=class extends Si{constructor(e,t,n,i){super(e,t,n,i),this.type="firestore",this._queue=new xo,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){let e=this._firestoreClient.terminate();this._queue=new xo(e),this._firestoreClient=void 0,await e}}};function Wm(r,e,t){t||(t="(default)");let n=rs(r,"firestore");if(n.isInitialized(t)){let i=n.getImmediate({identifier:t}),s=n.getOptions(t);if(pt(s,e))return i;throw new x(P.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new x(P.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new x(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return n.initialize({options:e,instanceIdentifier:t})}function eh(r){if(r._terminated)throw new x(P.FAILED_PRECONDITION,"The client has already been terminated.");return r._firestoreClient||hw(r),r._firestoreClient}function hw(r){var e,t,n;let i=r._freezeSettings(),s=function(c,u,h,f){return new Hc(c,u,h,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,zm(f.experimentalLongPollingOptions),f.useFetchStreams)}(r._databaseId,((e=r._app)===null||e===void 0?void 0:e.options.appId)||"",r._persistenceKey,i);r._componentsProvider||!((t=i.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((n=i.localCache)===null||n===void 0)&&n._onlineComponentProvider)&&(r._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),r._firestoreClient=new vl(r._authCredentials,r._appCheckCredentials,r._queue,s,r._componentsProvider&&function(c){let u=c==null?void 0:c._online.build();return{_offline:c==null?void 0:c._offline.build(u),_online:u}}(r._componentsProvider))}var Ri=class r{constructor(e){this._byteString=e}static fromBase64String(e){try{return new r(fe.fromBase64String(e))}catch(t){throw new x(P.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new r(fe.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}};var In=class{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new x(P.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new me(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}};var fr=class{constructor(e){this._methodName=e}};var Pi=class{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new x(P.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new x(P.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return $(this._lat,e._lat)||$(this._long,e._long)}};var Ci=class{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(n,i){if(n.length!==i.length)return!1;for(let s=0;s<n.length;++s)if(n[s]!==i[s])return!1;return!0}(this._values,e._values)}};var dw=/^__.*__$/,Il=class{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return this.fieldMask!==null?new $e(e,this.data,this.fieldMask,t,this.fieldTransforms):new xt(e,this.data,t,this.fieldTransforms)}},Vo=class{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return new $e(e,this.data,this.fieldMask,t,this.fieldTransforms)}};function Hm(r){switch(r){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw L()}}var wl=class r{constructor(e,t,n,i,s,o){this.settings=e,this.databaseId=t,this.serializer=n,this.ignoreUndefinedProperties=i,s===void 0&&this.Fu(),this.fieldTransforms=s||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Mu(){return this.settings.Mu}xu(e){return new r(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Ou(e){var t;let n=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.xu({path:n,Nu:!1});return i.Lu(e),i}Bu(e){var t;let n=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.xu({path:n,Nu:!1});return i.Fu(),i}ku(e){return this.xu({path:void 0,Nu:!0})}qu(e){return Mo(e,this.settings.methodName,this.settings.Qu||!1,this.path,this.settings.Ku)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Fu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Lu(this.path.get(e))}Lu(e){if(e.length===0)throw this.qu("Document fields must not be empty");if(Hm(this.Mu)&&dw.test(e))throw this.qu('Document fields cannot begin and end with "__"')}},El=class{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=n||Wo(e)}$u(e,t,n,i=!1){return new wl({Mu:e,methodName:t,Ku:n,path:me.emptyPath(),Nu:!1,Qu:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}};function Xo(r){let e=r._freezeSettings(),t=Wo(r._databaseId);return new El(r._databaseId,!!e.ignoreUndefinedProperties,t)}function Qm(r,e,t,n,i,s={}){let o=r.$u(s.merge||s.mergeFields?2:0,e,t,i);th("Data must be an object, but it was:",o,n);let c=Xm(n,o),u,h;if(s.merge)u=new Me(o.fieldMask),h=o.fieldTransforms;else if(s.mergeFields){let f=[];for(let m of s.mergeFields){let v=Al(e,m,t);if(!o.contains(v))throw new x(P.INVALID_ARGUMENT,`Field '${v}' is specified in your field mask but missing from your input data.`);eg(f,v)||f.push(v)}u=new Me(f),h=o.fieldTransforms.filter(m=>u.covers(m.field))}else u=null,h=o.fieldTransforms;return new Il(new De(c),u,h)}var Lo=class r extends fr{_toFieldTransform(e){if(e.Mu!==2)throw e.Mu===1?e.qu(`${this._methodName}() can only appear at the top level of your update data`):e.qu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof r}};var Tl=class r extends fr{_toFieldTransform(e){return new Zs(e.path,new kt)}isEqual(e){return e instanceof r}};function Jm(r,e,t,n){let i=r.$u(1,e,t);th("Data must be an object, but it was:",i,n);let s=[],o=De.empty();Ut(n,(u,h)=>{let f=nh(e,u,t);h=se(h);let m=i.Bu(f);if(h instanceof Lo)s.push(f);else{let v=xi(h,m);v!=null&&(s.push(f),o.set(f,v))}});let c=new Me(s);return new Vo(o,c,i.fieldTransforms)}function Ym(r,e,t,n,i,s){let o=r.$u(1,e,t),c=[Al(e,n,t)],u=[i];if(s.length%2!=0)throw new x(P.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let v=0;v<s.length;v+=2)c.push(Al(e,s[v])),u.push(s[v+1]);let h=[],f=De.empty();for(let v=c.length-1;v>=0;--v)if(!eg(h,c[v])){let S=c[v],D=u[v];D=se(D);let N=o.Bu(S);if(D instanceof Lo)h.push(S);else{let k=xi(D,N);k!=null&&(h.push(S),f.set(S,k))}}let m=new Me(h);return new Vo(f,m,o.fieldTransforms)}function fw(r,e,t,n=!1){return xi(t,r.$u(n?4:3,e))}function xi(r,e){if(Zm(r=se(r)))return th("Unsupported field value:",e,r),Xm(r,e);if(r instanceof fr)return function(n,i){if(!Hm(i.Mu))throw i.qu(`${n._methodName}() can only be used with update() and set()`);if(!i.path)throw i.qu(`${n._methodName}() is not currently supported inside arrays`);let s=n._toFieldTransform(i);s&&i.fieldTransforms.push(s)}(r,e),null;if(r===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),r instanceof Array){if(e.settings.Nu&&e.Mu!==4)throw e.qu("Nested arrays are not supported");return function(n,i){let s=[],o=0;for(let c of n){let u=xi(c,i.ku(o));u==null&&(u={nullValue:"NULL_VALUE"}),s.push(u),o++}return{arrayValue:{values:s}}}(r,e)}return function(n,i){if((n=se(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return tI(i.serializer,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){let s=ue.fromDate(n);return{timestampValue:sr(i.serializer,s)}}if(n instanceof ue){let s=new ue(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:sr(i.serializer,s)}}if(n instanceof Pi)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof Ri)return{bytesValue:sm(i.serializer,n._byteString)};if(n instanceof Oe){let s=i.databaseId,o=n.firestore._databaseId;if(!o.isEqual(s))throw i.qu(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:jl(n.firestore._databaseId||i.databaseId,n._key.path)}}if(n instanceof Ci)return function(o,c){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:o.toArray().map(u=>{if(typeof u!="number")throw c.qu("VectorValues must only contain numeric values.");return ql(c.serializer,u)})}}}}}}(n,i);throw i.qu(`Unsupported field value: ${Yo(n)}`)}(r,e)}function Xm(r,e){let t={};return xp(r)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Ut(r,(n,i)=>{let s=xi(i,e.Ou(n));s!=null&&(t[n]=s)}),{mapValue:{fields:t}}}function Zm(r){return!(typeof r!="object"||r===null||r instanceof Array||r instanceof Date||r instanceof ue||r instanceof Pi||r instanceof Ri||r instanceof Oe||r instanceof fr||r instanceof Ci)}function th(r,e,t){if(!Zm(t)||!function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)}(t)){let n=Yo(t);throw n==="an object"?e.qu(r+" a custom object"):e.qu(r+" "+n)}}function Al(r,e,t){if((e=se(e))instanceof In)return e._internalPath;if(typeof e=="string")return nh(r,e);throw Mo("Field path arguments must be of type string or ",r,!1,void 0,t)}var pw=new RegExp("[~\\*/\\[\\]]");function nh(r,e,t){if(e.search(pw)>=0)throw Mo(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,r,!1,void 0,t);try{return new In(...e.split("."))._internalPath}catch{throw Mo(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,r,!1,void 0,t)}}function Mo(r,e,t,n,i){let s=n&&!n.isEmpty(),o=i!==void 0,c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let u="";return(s||o)&&(u+=" (found",s&&(u+=` in field ${n}`),o&&(u+=` in document ${i}`),u+=")"),new x(P.INVALID_ARGUMENT,c+r+u)}function eg(r,e){return r.some(t=>t.isEqual(e))}var Fo=class{constructor(e,t,n,i,s){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new Oe(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){let e=new bl(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){let t=this._document.data.field(rh("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}},bl=class extends Fo{data(){return super.data()}};function rh(r,e){return typeof e=="string"?nh(r,e):e instanceof In?e._internalPath:e._delegate._internalPath}function mw(r){if(r.limitType==="L"&&r.explicitOrderBy.length===0)throw new x(P.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}var Di=class{},Sl=class extends Di{};function tg(r,e,...t){let n=[];e instanceof Di&&n.push(e),n=n.concat(t),function(s){let o=s.filter(u=>u instanceof Rl).length,c=s.filter(u=>u instanceof Uo).length;if(o>1||o>0&&c>0)throw new x(P.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(n);for(let i of n)r=i._apply(r);return r}var Uo=class r extends Sl{constructor(e,t,n){super(),this._field=e,this._op=t,this._value=n,this.type="where"}static _create(e,t,n){return new r(e,t,n)}_apply(e){let t=this._parse(e);return rg(e._query,t),new dr(e.firestore,e.converter,au(e._query,t))}_parse(e){let t=Xo(e.firestore);return function(s,o,c,u,h,f,m){let v;if(h.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new x(P.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){Tp(m,f);let S=[];for(let D of m)S.push(Ep(u,s,D));v={arrayValue:{values:S}}}else v=Ep(u,s,m)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||Tp(m,f),v=fw(c,o,m,f==="in"||f==="not-in");return Q.create(h,f,v)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}};function ng(r,e,t){let n=e,i=rh("where",r);return Uo._create(i,n,t)}var Rl=class r extends Di{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new r(e,t)}_parse(e){let t=this._queryConstraints.map(n=>n._parse(e)).filter(n=>n.getFilters().length>0);return t.length===1?t[0]:Z.create(t,this._getOperator())}_apply(e){let t=this._parse(e);return t.getFilters().length===0?e:(function(i,s){let o=i,c=s.getFlattenedFilters();for(let u of c)rg(o,u),o=au(o,u)}(e._query,t),new dr(e.firestore,e.converter,au(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}};function Ep(r,e,t){if(typeof(t=se(t))=="string"){if(t==="")throw new x(P.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Gp(e)&&t.indexOf("/")!==-1)throw new x(P.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);let n=e.path.child(ee.fromString(t));if(!V.isDocumentKey(n))throw new x(P.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${n}' is not because it has an odd number of segments (${n.length}).`);return gi(r,new V(n))}if(t instanceof Oe)return gi(r,t._key);throw new x(P.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Yo(t)}.`)}function Tp(r,e){if(!Array.isArray(r)||r.length===0)throw new x(P.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function rg(r,e){let t=function(i,s){for(let o of i)for(let c of o.getFlattenedFilters())if(s.indexOf(c.op)>=0)return c.op;return null}(r.filters,function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new x(P.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new x(P.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}var Pl=class{convertValue(e,t="none"){switch(Pt(e)){case 0:return null;case 1:return e.booleanValue;case 2:return oe(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(ut(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw L()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){let n={};return Ut(e,(i,s)=>{n[i]=this.convertValue(s,t)}),n}convertVectorValue(e){var t,n,i;let s=(i=(n=(t=e.fields)===null||t===void 0?void 0:t.value.arrayValue)===null||n===void 0?void 0:n.values)===null||i===void 0?void 0:i.map(o=>oe(o.doubleValue));return new Ci(s)}convertGeoPoint(e){return new Pi(oe(e.latitude),oe(e.longitude))}convertArray(e,t){return(e.values||[]).map(n=>this.convertValue(n,t))}convertServerTimestamp(e,t){switch(t){case"previous":let n=zo(e);return n==null?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(pi(e));default:return null}}convertTimestamp(e){let t=ct(e);return new ue(t.seconds,t.nanos)}convertDocumentKey(e,t){let n=ee.fromString(e);F(mm(n));let i=new Xn(n.get(1),n.get(3)),s=new V(n.popFirst(5));return i.isEqual(t)||ce(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}};function ig(r,e,t){let n;return n=r?t&&(t.merge||t.mergeFields)?r.toFirestore(e,t):r.toFirestore(e):e,n}var un=class{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}},Bo=class extends Fo{constructor(e,t,n,i,s,o){super(e,t,n,i,o),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){let t=new Hn(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){let n=this._document.data.field(rh("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}},Hn=class extends Bo{data(e={}){return super.data(e)}},Cl=class{constructor(e,t,n,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new un(i.hasPendingWrites,i.fromCache),this.query=n}get docs(){let e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(n=>{e.call(t,new Hn(this._firestore,this._userDataWriter,n.key,n,new un(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){let t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new x(P.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(i,s){if(i._snapshot.oldDocs.isEmpty()){let o=0;return i._snapshot.docChanges.map(c=>{let u=new Hn(i._firestore,i._userDataWriter,c.doc.key,c.doc,new un(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);return c.doc,{type:"added",doc:u,oldIndex:-1,newIndex:o++}})}{let o=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(c=>s||c.type!==3).map(c=>{let u=new Hn(i._firestore,i._userDataWriter,c.doc.key,c.doc,new un(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter),h=-1,f=-1;return c.type!==0&&(h=o.indexOf(c.doc.key),o=o.delete(c.doc.key)),c.type!==1&&(o=o.add(c.doc),f=o.indexOf(c.doc.key)),{type:gw(c.type),doc:u,oldIndex:h,newIndex:f}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}};function gw(r){switch(r){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return L()}}var qo=class extends Pl{constructor(e){super(),this.firestore=e}convertBytes(e){return new Ri(e)}convertReference(e){let t=this.convertDocumentKey(e,this.firestore._databaseId);return new Oe(this.firestore,null,t)}};function sg(r,e,t){r=St(r,Oe);let n=St(r.firestore,Lt),i=ig(r.converter,e,t);return ih(n,[Qm(Xo(n),"setDoc",r._key,i,r.converter!==null,t).toMutation(r._key,ke.none())])}function og(r,e,t,...n){r=St(r,Oe);let i=St(r.firestore,Lt),s=Xo(i),o;return o=typeof(e=se(e))=="string"||e instanceof In?Ym(s,"updateDoc",r._key,e,t,n):Jm(s,"updateDoc",r._key,e),ih(i,[o.toMutation(r._key,ke.exists(!0))])}function ag(r,...e){var t,n,i;r=se(r);let s={includeMetadataChanges:!1,source:"default"},o=0;typeof e[o]!="object"||wp(e[o])||(s=e[o],o++);let c={includeMetadataChanges:s.includeMetadataChanges,source:s.source};if(wp(e[o])){let m=e[o];e[o]=(t=m.next)===null||t===void 0?void 0:t.bind(m),e[o+1]=(n=m.error)===null||n===void 0?void 0:n.bind(m),e[o+2]=(i=m.complete)===null||i===void 0?void 0:i.bind(m)}let u,h,f;if(r instanceof Oe)h=St(r.firestore,Lt),f=$o(r._key.path),u={next:m=>{e[o]&&e[o](_w(h,r,m))},error:e[o+1],complete:e[o+2]};else{let m=St(r,dr);h=St(m.firestore,Lt),f=m._query;let v=new qo(h);u={next:S=>{e[o]&&e[o](new Cl(h,v,m,S))},error:e[o+1],complete:e[o+2]},mw(r._query)}return function(v,S,D,N){let k=new yl(N),z=new ll(S,k,D);return v.asyncQueue.enqueueAndForget(async()=>BI(await _p(v),z)),()=>{k.eu(),v.asyncQueue.enqueueAndForget(async()=>qI(await _p(v),z))}}(eh(h),f,c,u)}function ih(r,e){return function(n,i){let s=new Ye;return n.asyncQueue.enqueueAndForget(async()=>HI(await uw(n),i,s)),s.promise}(eh(r),e)}function _w(r,e,t){let n=t.docs.get(e._key),i=new qo(r);return new Bo(r,i,e._key,n,new un(t.hasPendingWrites,t.fromCache),e.converter)}var Dl=class{constructor(e){let t;this.kind="persistent",e!=null&&e.tabManager?(e.tabManager._initialize(e),t=e.tabManager):(t=yw(void 0),t._initialize(e)),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}};function cg(r){return new Dl(r)}var kl=class{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=vn.provider,this._offlineComponentProvider={build:t=>new No(t,e==null?void 0:e.cacheSizeBytes,this.forceOwnership)}}},Nl=class{constructor(){this.kind="PersistentMultipleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=vn.provider,this._offlineComponentProvider={build:t=>new _l(t,e==null?void 0:e.cacheSizeBytes)}}};function yw(r){return new kl(r==null?void 0:r.forceOwnership)}function ug(){return new Nl}var Ol=class{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=Xo(e)}set(e,t,n){this._verifyNotCommitted();let i=Vc(e,this._firestore),s=ig(i.converter,t,n),o=Qm(this._dataReader,"WriteBatch.set",i._key,s,i.converter!==null,n);return this._mutations.push(o.toMutation(i._key,ke.none())),this}update(e,t,n,...i){this._verifyNotCommitted();let s=Vc(e,this._firestore),o;return o=typeof(t=se(t))=="string"||t instanceof In?Ym(this._dataReader,"WriteBatch.update",s._key,t,n,i):Jm(this._dataReader,"WriteBatch.update",s._key,t),this._mutations.push(o.toMutation(s._key,ke.exists(!0))),this}delete(e){this._verifyNotCommitted();let t=Vc(e,this._firestore);return this._mutations=this._mutations.concat(new ir(t._key,ke.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new x(P.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}};function Vc(r,e){if((r=se(r)).firestore!==e)throw new x(P.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return r}function lg(){return new Tl("serverTimestamp")}function hg(r){return eh(r=St(r,Lt)),new Ol(r,e=>ih(r,e))}(function(e,t=!0){(function(i){pr=i})(Pn),gt(new Be("firestore",(n,{instanceIdentifier:i,options:s})=>{let o=n.getProvider("app").getImmediate(),c=new Lt(new Fc(n.getProvider("auth-internal")),new jc(n.getProvider("app-check-internal")),function(h,f){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new x(P.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Xn(h.options.projectId,f)}(o,i),o);return s=Object.assign({useFetchStreams:t},s),c._setSettings(s),c},"PUBLIC").setMultipleInstances(!0)),ze(wf,"4.7.5",e),ze(wf,"4.7.5","esm2017")})();window.FB={initializeApp:Dd,initializeAuth:pc,indexedDBLocalPersistence:Tc,browserLocalPersistence:Ec,onAuthStateChanged:Ic,signInWithEmailAndPassword:_c,createUserWithEmailAndPassword:gc,sendEmailVerification:yc,sendPasswordResetEmail:mc,signOut:wc,updateProfile:vc,reload:Ps,initializeFirestore:Wm,persistentLocalCache:cg,persistentMultipleTabManager:ug,collection:$m,doc:Km,onSnapshot:ag,setDoc:sg,updateDoc:og,query:tg,where:ng,serverTimestamp:lg,writeBatch:hg};})();
/*! Bundled license information:

@firebase/util/dist/index.esm2017.js:
  (**
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
   *)

@firebase/util/dist/index.esm2017.js:
  (**
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
   *)

@firebase/util/dist/index.esm2017.js:
  (**
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
   *)

@firebase/util/dist/index.esm2017.js:
  (**
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
   *)

@firebase/util/dist/index.esm2017.js:
  (**
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
   *)
  (**
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
   *)

@firebase/util/dist/index.esm2017.js:
  (**
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
   *)

@firebase/util/dist/index.esm2017.js:
  (**
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
   *)

@firebase/util/dist/index.esm2017.js:
  (**
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
   *)

@firebase/util/dist/index.esm2017.js:
  (**
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
   *)

@firebase/util/dist/index.esm2017.js:
  (**
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
   *)

@firebase/util/dist/index.esm2017.js:
  (**
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
   *)

@firebase/util/dist/index.esm2017.js:
  (**
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
   *)

@firebase/util/dist/index.esm2017.js:
  (**
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
   *)

@firebase/util/dist/index.esm2017.js:
  (**
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
   *)

@firebase/util/dist/index.esm2017.js:
  (**
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
   *)

@firebase/util/dist/index.esm2017.js:
  (**
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
   *)

@firebase/util/dist/index.esm2017.js:
  (**
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
   *)

@firebase/component/dist/esm/index.esm2017.js:
  (**
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
   *)

@firebase/logger/dist/esm/index.esm2017.js:
  (**
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
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
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
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
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
   *)
  (**
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
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
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
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
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
   *)
  (**
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
   *)

firebase/app/dist/esm/index.esm.js:
  (**
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
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
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
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
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
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
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
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
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
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
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
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
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
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
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
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
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
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
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
   *)
  (**
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
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
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
   *)
  (**
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
   *)
  (**
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
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
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
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
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
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
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
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
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
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
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
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
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
   *)
  (**
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
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
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
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
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
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
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
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
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
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
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
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
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
   *)
  (**
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
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
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
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
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
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
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
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
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
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
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
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
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
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
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
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
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
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
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
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
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
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
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
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
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
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
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
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
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
   *)
  (**
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
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
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
   *)
  (**
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
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
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
   *)
  (**
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
   *)
  (**
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
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
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
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
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
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
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
   *)
  (**
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
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
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
   *)
  (**
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
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
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
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
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
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
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
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
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
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
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
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
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
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
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
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
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
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
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
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
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
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
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
   *)
  (**
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
   *)

@firebase/webchannel-wrapper/dist/bloom-blob/esm/bloom_blob_es2018.js:
  (** @license
  Copyright The Closure Library Authors.
  SPDX-License-Identifier: Apache-2.0
  *)
  (** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  *)

@firebase/webchannel-wrapper/dist/webchannel-blob/esm/webchannel_blob_es2018.js:
  (** @license
  Copyright The Closure Library Authors.
  SPDX-License-Identifier: Apache-2.0
  *)
  (** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  *)

@firebase/firestore/dist/index.esm2017.js:
  (**
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
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
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
  *)
  (**
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
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
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
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
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
   *)
  (**
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
   *)
  (**
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
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
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
   *)
  (**
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
   *)
  (**
   * @license
   * Copyright 2018 Google LLC
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
   *)
  (**
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
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
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
   *)
  (**
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
   *)
  (**
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
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
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
   *)
  (**
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
   *)
  (**
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
   *)
  (**
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
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
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
   *)
  (**
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
   *)
  (**
   * @license
   * Copyright 2018 Google LLC
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
   *)
  (**
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
   *)
  (**
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
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
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
   *)
  (**
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
   *)
  (**
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
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
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
   *)
  (**
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
   *)
  (**
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
   *)
  (**
   * @license
   * Copyright 2024 Google LLC
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
   *)
  (**
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
   *)
  (**
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
   *)
  (**
   * @license
   * Copyright 2018 Google LLC
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
   *)
  (**
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
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
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
   *)
  (**
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
   *)
  (**
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
   *)
  (**
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
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
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
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
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
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
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
   *)
  (**
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
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
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
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
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
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
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
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
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
   *)
  (**
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
   *)
  (**
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
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
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
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
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
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
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
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
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
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
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
   *)
  (**
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
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
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
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
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
   *)
  (**
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
   *)
  (**
   * @license
   * Copyright 2024 Google LLC
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
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
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
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
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
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
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
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
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
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
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
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
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
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
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
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
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
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
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
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
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
   *)
  (**
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
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
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
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
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
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
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
   *)
*/
