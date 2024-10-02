(()=>{"use strict";var e,t,n,r,s={44:(e,t,n)=>{n.a(e,(async(e,t)=>{try{var r=n(929);const s=document.getElementById("search"),i=document.getElementById("results"),o=document.getElementsByClassName("main-container"),c=document.getElementById("mode"),a={keys:["title","url"],threshold:.4},l={keys:[{name:"title",weight:3},{name:"url",weight:2},{name:"parent",weight:1}],threshold:.4},h=[{color:"Orange",code:"#FFA500"},{color:"Green",code:"#67BB67"},{color:"Pastel Red",code:"#FF8383"},{color:"Gray",code:"#A8A8A8"},{color:"Teal",code:"#7DB7B7"}],d={keys:["color"],threshold:.4};let u,g,f,p,m,y,x=new r.A(h,d),w=0,M=[],v=[],b=[],k=[],L="T",E=await chrome.windows.getCurrent();async function S(){try{M=await chrome.tabs.query({}),M.forEach(((e,t)=>{y=e.windowId==m,console.log(e)})),u=new r.A(M,a),"T"===L&&T(M,!0)}catch(e){console.error("Error fetching tabs: ",e)}}async function _(){try{v=await chrome.history.search({text:""}),console.log("history array len "+v.length),console.log("history fields "+JSON.stringify(v[0])),g=new r.A(v,a),"H"===L&&T(v,!0)}catch(e){console.log("problem in fetching history "+e)}}async function A(){try{b=await chrome.topSites.get(),console.log("these are your top sites",b),f=new r.A(b,a),"F"===L&&T(b,!0)}catch(e){console.log("problem in fetching topsites "+e)}}async function I(){try{let e=await chrome.bookmarks.getTree();console.log("tree + ",e),k=C(e),console.log(k),p=new r.A(k,l),"B"===L&&T(k,!0)}catch(e){console.log("problem in fetching links "+e)}}function C(e){let t=[],n=new Map;return e.forEach((function e(r){r.url&&t.push({title:r.title,url:r.url,parent:r.parentId}),r.children&&(n.set(r.id,r.title),r.children.forEach(e))})),console.log("parent map ",n),t.forEach((e=>{e.parent=n.get(e.parent)})),t}function $(e){let t;console.log("updating theme"),null===localStorage.getItem("cruise-theme")?localStorage.setItem("cruise-theme","#00ff00"):localStorage.setItem("cruise-theme",e),t=localStorage.getItem("cruise-theme"),document.documentElement.style.setProperty("--theme-color",t)}function F(){let e;console.log("setting theme"),localStorage.getItem(!1)&&localStorage.setItem("cruise-theme","#00ff00"),e=localStorage.getItem("cruise-theme"),document.documentElement.style.setProperty("--theme-color",e)}function R(e){console.log("enter command dropdown"),i.innerHTML="",w=0,console.log("color array recieved ",e),e.forEach(((e,t)=>{const n=document.createElement("li");0==t&&n.classList.add("highlight"),n.innerHTML=`<strong>${e.color}</strong>`,n.classList.add("result-item"),n.addEventListener("click",(()=>{$(e.code),console.log("you clicked ",e.color,e.code)})),i.appendChild(n)}))}function T(e,t){i.innerHTML="",w=0;let n=e.slice(0,6);if(0==n.length){const e=document.createElement("li");return e.innerHTML='<img src="fav.png" alt="favicon" style="width:20px; height: 20px; margin-right: 8px; padding: 1px ; border-radius: 4px;">\n<strong>Search the web for it</strong>',e.classList.add("result-item"),e.classList.add("highlight"),e.setAttribute("data-search-element",!0),void i.appendChild(e)}n.forEach(((e,n)=>{const r=document.createElement("li");let s=new URL(e.url).hostname.replace("www.",""),o="";"T"===L&&e.windowId!=m&&(o=" (other tab)"),"B"===L?(r.innerHTML=`<img src="fav.png" alt="favicon" style="width:20px; height: 20px; margin-right: 8px; padding: 1px ; border-radius: 4px;">\n\n    <div class="result-item-text">\n    <strong style="display: block;">${e.title}</strong>\n    <small style="display: block;">${e.url} Category = ${e.parent}</small>\n    </div>`,r.classList.add("result-item"),r.setAttribute("data-tab-id",e.id),r.setAttribute("data-search-element",!1)):(e.favIconUrl?r.innerHTML=`\n    <img src="${e.favIconUrl}" alt="favicon" style="width: 20px; height: 20px; margin-right: 8px; padding: 1px;  border-radius: 4px;">\n    <div class="result-item-text">\n         <strong style="display: block;">${e.title}</strong>\n    <small style="display: block;">${s} ${o}</small>\n    </div>`:r.innerHTML=`\n    <img src="fav.png" alt="favicon" style="width:20px; height: 20px; margin-right: 8px; padding: 1px ; border-radius: 4px;">\n    <div class="result-item-text">\n    <strong style="display: block;">${e.title}</strong>\n    <small style="display: block;">${s} ${o}</small>\n    </div>`,r.classList.add("result-item"),r.setAttribute("data-tab-id",e.id),r.setAttribute("data-search-element",!1)),"T"===L&&r.setAttribute("data-window-id",e.windowId),t&&0===n&&r.classList.add("highlight"),"T"===L&&r.addEventListener("click",(()=>{chrome.tabs.update(e.id,{active:!0})})),"H"!==L&&"F"!==L&&"B"!==L||r.addEventListener("click",(()=>{console.log("hist url : "+e.url),O(e.url)})),i.appendChild(r)}))}function N(e){i.querySelectorAll("li").forEach(((t,n)=>{n===e?(t.classList.add("highlight"),t.scrollIntoView({block:"nearest"})):t.classList.remove("highlight")}))}async function O(e){try{let t=await chrome.tabs.create({url:e});console.log(t)}catch(e){console.log("error in creating tab of real url"+e)}}async function W(e){try{let t=`https://www.google.com/search?q=${encodeURIComponent(e)}`,n=await chrome.tabs.create({url:t});console.log(n)}catch(e){console.log("error in creating tab of not real url"+e)}}function j(e){const t=i.querySelectorAll("li");if(("T"===L||"B"===L||"F"===L||"H"===L)&&1===t.length&&"true"===t[0].getAttribute("data-search-element")&&"Enter"===e.key)return console.log("you want to search the web"),void W(s.value).then((()=>console.log("success in creating new tab"))).catch((e=>console.log("fail in creating new tab: "+e)));if("ArrowDown"===e.key)w=(w+1)%t.length,N(w);else if("ArrowUp"===e.key)w=(w-1+t.length)%t.length,N(w);else if("Enter"===e.key&&!e.shiftKey&&w>=0&&(t[w].click(),"T"===L)){let e=t[w].getAttribute("data-window-id");e!=m&&B(e),console.log("the clicked tab has window id "+e)}}async function B(e){try{console.log("type of target window sent down "+typeof e);let t=Number(e);await chrome.windows.update(t,{focused:!0}),console.log(`Switched focus to window with ID: ${t}`)}catch(e){console.log("Error switching focus to window: ",e)}}function H(){i.innerHTML="";const e=document.createElement("li");e.innerHTML="<strong>Go to the Cruise help page</strong><br>",e.classList.add("result-item"),e.classList.add("highlight"),e.addEventListener("click",(function(){chrome.tabs.create({url:chrome.runtime.getURL("help.html")})})),e.addEventListener("keydown",(function(e){"Enter"===e.key&&chrome.tabs.create({url:chrome.runtime.getURL("help.html")})})),i.appendChild(e)}m=E.id,console.log("current window id"+m),s.addEventListener("input",(e=>{let t=e.target.value.trim();if("COL"===L&&!t.startsWith("/"))return L="T",c.textContent="T",void T(M,!0);if(t.startsWith("/")){if(console.log("in command"),i.innerHTML="",L="COL",c.textContent="COL",t.startsWith("/h"))return void H();if(t.startsWith("/c")){if(console.log("we are in color mode"),"/c"==t)R(h);else{let e=t.slice(2).trim();console.log("trimmed query ",e),R(x.search(e).map((e=>e.item)))}return}}else if(""===t)"T"===L&&T(M,!0),"H"===L&&T(v,!0),"F"===L&&T(b,!0),"B"===L&&T(k,!0);else{let e;"T"===L&&(console.log("search tab data"),e=u.search(t)),"H"===L&&(console.log("search history data"),e=g.search(t)),"F"===L&&(console.log("search tab topsite data"),e=f.search(t)),"B"===L&&(console.log("search tab bookmark data"),e=p.search(t)),T(e.map((e=>e.item)),!0)}})),o[0].addEventListener("keydown",(e=>{if(e.shiftKey&&"Enter"===e.key&&(console.log("shift + enter pressed"),W(s.value)),"ArrowDown"===e.key||"ArrowUp"===e.key||"Enter"===e.key)return j(e),void e.preventDefault();e.altKey&&"h"===e.key&&(L="H",console.log("Alt + H pressed!"),c.textContent="H",T(v,!0)),e.altKey&&"t"===e.key&&(L="T",console.log("Alt + T pressed!"),c.textContent="T",T(M,!0)),e.altKey&&"b"===e.key&&(L="B",console.log("Alt + B pressed!"),c.textContent="B",T(k,!0)),e.altKey&&"f"===e.key&&(e.preventDefault(),L="F",console.log("Alt + F pressed!"),c.textContent="F",T(b,!0))})),F(),I(),A(),_(),S(),t()}catch(K){t(K)}}),1)},929:(e,t,n)=>{function r(e){return Array.isArray?Array.isArray(e):"[object Array]"===l(e)}function s(e){return"string"==typeof e}function i(e){return"number"==typeof e}function o(e){return"object"==typeof e}function c(e){return null!=e}function a(e){return!e.trim().length}function l(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":Object.prototype.toString.call(e)}n.d(t,{A:()=>H});const h=Object.prototype.hasOwnProperty;class d{constructor(e){this._keys=[],this._keyMap={};let t=0;e.forEach((e=>{let n=u(e);this._keys.push(n),this._keyMap[n.id]=n,t+=n.weight})),this._keys.forEach((e=>{e.weight/=t}))}get(e){return this._keyMap[e]}keys(){return this._keys}toJSON(){return JSON.stringify(this._keys)}}function u(e){let t=null,n=null,i=null,o=1,c=null;if(s(e)||r(e))i=e,t=g(e),n=f(e);else{if(!h.call(e,"name"))throw new Error("Missing name property in key");const r=e.name;if(i=r,h.call(e,"weight")&&(o=e.weight,o<=0))throw new Error((e=>`Property 'weight' in key '${e}' must be a positive integer`)(r));t=g(r),n=f(r),c=e.getFn}return{path:t,id:n,weight:o,src:i,getFn:c}}function g(e){return r(e)?e:e.split(".")}function f(e){return r(e)?e.join("."):e}var p={isCaseSensitive:!1,includeScore:!1,keys:[],shouldSort:!0,sortFn:(e,t)=>e.score===t.score?e.idx<t.idx?-1:1:e.score<t.score?-1:1,includeMatches:!1,findAllMatches:!1,minMatchCharLength:1,location:0,threshold:.6,distance:100,useExtendedSearch:!1,getFn:function(e,t){let n=[],a=!1;const h=(e,t,d)=>{if(c(e))if(t[d]){const u=e[t[d]];if(!c(u))return;if(d===t.length-1&&(s(u)||i(u)||function(e){return!0===e||!1===e||function(e){return o(e)&&null!==e}(e)&&"[object Boolean]"==l(e)}(u)))n.push(function(e){return null==e?"":function(e){if("string"==typeof e)return e;let t=e+"";return"0"==t&&1/e==-1/0?"-0":t}(e)}(u));else if(r(u)){a=!0;for(let e=0,n=u.length;e<n;e+=1)h(u[e],t,d+1)}else t.length&&h(u,t,d+1)}else n.push(e)};return h(e,s(t)?t.split("."):t,0),a?n:n[0]},ignoreLocation:!1,ignoreFieldNorm:!1,fieldNormWeight:1};const m=/[^ ]+/g;class y{constructor({getFn:e=p.getFn,fieldNormWeight:t=p.fieldNormWeight}={}){this.norm=function(e=1,t=3){const n=new Map,r=Math.pow(10,t);return{get(t){const s=t.match(m).length;if(n.has(s))return n.get(s);const i=1/Math.pow(s,.5*e),o=parseFloat(Math.round(i*r)/r);return n.set(s,o),o},clear(){n.clear()}}}(t,3),this.getFn=e,this.isCreated=!1,this.setIndexRecords()}setSources(e=[]){this.docs=e}setIndexRecords(e=[]){this.records=e}setKeys(e=[]){this.keys=e,this._keysMap={},e.forEach(((e,t)=>{this._keysMap[e.id]=t}))}create(){!this.isCreated&&this.docs.length&&(this.isCreated=!0,s(this.docs[0])?this.docs.forEach(((e,t)=>{this._addString(e,t)})):this.docs.forEach(((e,t)=>{this._addObject(e,t)})),this.norm.clear())}add(e){const t=this.size();s(e)?this._addString(e,t):this._addObject(e,t)}removeAt(e){this.records.splice(e,1);for(let t=e,n=this.size();t<n;t+=1)this.records[t].i-=1}getValueForItemAtKeyId(e,t){return e[this._keysMap[t]]}size(){return this.records.length}_addString(e,t){if(!c(e)||a(e))return;let n={v:e,i:t,n:this.norm.get(e)};this.records.push(n)}_addObject(e,t){let n={i:t,$:{}};this.keys.forEach(((t,i)=>{let o=t.getFn?t.getFn(e):this.getFn(e,t.path);if(c(o))if(r(o)){let e=[];const t=[{nestedArrIndex:-1,value:o}];for(;t.length;){const{nestedArrIndex:n,value:i}=t.pop();if(c(i))if(s(i)&&!a(i)){let t={v:i,i:n,n:this.norm.get(i)};e.push(t)}else r(i)&&i.forEach(((e,n)=>{t.push({nestedArrIndex:n,value:e})}))}n.$[i]=e}else if(s(o)&&!a(o)){let e={v:o,n:this.norm.get(o)};n.$[i]=e}})),this.records.push(n)}toJSON(){return{keys:this.keys,records:this.records}}}function x(e,t,{getFn:n=p.getFn,fieldNormWeight:r=p.fieldNormWeight}={}){const s=new y({getFn:n,fieldNormWeight:r});return s.setKeys(e.map(u)),s.setSources(t),s.create(),s}function w(e,{errors:t=0,currentLocation:n=0,expectedLocation:r=0,distance:s=p.distance,ignoreLocation:i=p.ignoreLocation}={}){const o=t/e.length;if(i)return o;const c=Math.abs(r-n);return s?o+c/s:c?1:o}const M=32;function v(e){let t={};for(let n=0,r=e.length;n<r;n+=1){const s=e.charAt(n);t[s]=(t[s]||0)|1<<r-n-1}return t}class b{constructor(e,{location:t=p.location,threshold:n=p.threshold,distance:r=p.distance,includeMatches:s=p.includeMatches,findAllMatches:i=p.findAllMatches,minMatchCharLength:o=p.minMatchCharLength,isCaseSensitive:c=p.isCaseSensitive,ignoreLocation:a=p.ignoreLocation}={}){if(this.options={location:t,threshold:n,distance:r,includeMatches:s,findAllMatches:i,minMatchCharLength:o,isCaseSensitive:c,ignoreLocation:a},this.pattern=c?e:e.toLowerCase(),this.chunks=[],!this.pattern.length)return;const l=(e,t)=>{this.chunks.push({pattern:e,alphabet:v(e),startIndex:t})},h=this.pattern.length;if(h>M){let e=0;const t=h%M,n=h-t;for(;e<n;)l(this.pattern.substr(e,M),e),e+=M;if(t){const e=h-M;l(this.pattern.substr(e),e)}}else l(this.pattern,0)}searchIn(e){const{isCaseSensitive:t,includeMatches:n}=this.options;if(t||(e=e.toLowerCase()),this.pattern===e){let t={isMatch:!0,score:0};return n&&(t.indices=[[0,e.length-1]]),t}const{location:r,distance:s,threshold:i,findAllMatches:o,minMatchCharLength:c,ignoreLocation:a}=this.options;let l=[],h=0,d=!1;this.chunks.forEach((({pattern:t,alphabet:u,startIndex:g})=>{const{isMatch:f,score:m,indices:y}=function(e,t,n,{location:r=p.location,distance:s=p.distance,threshold:i=p.threshold,findAllMatches:o=p.findAllMatches,minMatchCharLength:c=p.minMatchCharLength,includeMatches:a=p.includeMatches,ignoreLocation:l=p.ignoreLocation}={}){if(t.length>M)throw new Error("Pattern length exceeds max of 32.");const h=t.length,d=e.length,u=Math.max(0,Math.min(r,d));let g=i,f=u;const m=c>1||a,y=m?Array(d):[];let x;for(;(x=e.indexOf(t,f))>-1;){let e=w(t,{currentLocation:x,expectedLocation:u,distance:s,ignoreLocation:l});if(g=Math.min(e,g),f=x+h,m){let e=0;for(;e<h;)y[x+e]=1,e+=1}}f=-1;let v=[],b=1,k=h+d;const L=1<<h-1;for(let r=0;r<h;r+=1){let i=0,c=k;for(;i<c;)w(t,{errors:r,currentLocation:u+c,expectedLocation:u,distance:s,ignoreLocation:l})<=g?i=c:k=c,c=Math.floor((k-i)/2+i);k=c;let a=Math.max(1,u-c+1),p=o?d:Math.min(u+c,d)+h,x=Array(p+2);x[p+1]=(1<<r)-1;for(let i=p;i>=a;i-=1){let o=i-1,c=n[e.charAt(o)];if(m&&(y[o]=+!!c),x[i]=(x[i+1]<<1|1)&c,r&&(x[i]|=(v[i+1]|v[i])<<1|1|v[i+1]),x[i]&L&&(b=w(t,{errors:r,currentLocation:o,expectedLocation:u,distance:s,ignoreLocation:l}),b<=g)){if(g=b,f=o,f<=u)break;a=Math.max(1,2*u-f)}}if(w(t,{errors:r+1,currentLocation:u,expectedLocation:u,distance:s,ignoreLocation:l})>g)break;v=x}const E={isMatch:f>=0,score:Math.max(.001,b)};if(m){const e=function(e=[],t=p.minMatchCharLength){let n=[],r=-1,s=-1,i=0;for(let o=e.length;i<o;i+=1){let o=e[i];o&&-1===r?r=i:o||-1===r||(s=i-1,s-r+1>=t&&n.push([r,s]),r=-1)}return e[i-1]&&i-r>=t&&n.push([r,i-1]),n}(y,c);e.length?a&&(E.indices=e):E.isMatch=!1}return E}(e,t,u,{location:r+g,distance:s,threshold:i,findAllMatches:o,minMatchCharLength:c,includeMatches:n,ignoreLocation:a});f&&(d=!0),h+=m,f&&y&&(l=[...l,...y])}));let u={isMatch:d,score:d?h/this.chunks.length:1};return d&&n&&(u.indices=l),u}}class k{constructor(e){this.pattern=e}static isMultiMatch(e){return L(e,this.multiRegex)}static isSingleMatch(e){return L(e,this.singleRegex)}search(){}}function L(e,t){const n=e.match(t);return n?n[1]:null}class E extends k{constructor(e,{location:t=p.location,threshold:n=p.threshold,distance:r=p.distance,includeMatches:s=p.includeMatches,findAllMatches:i=p.findAllMatches,minMatchCharLength:o=p.minMatchCharLength,isCaseSensitive:c=p.isCaseSensitive,ignoreLocation:a=p.ignoreLocation}={}){super(e),this._bitapSearch=new b(e,{location:t,threshold:n,distance:r,includeMatches:s,findAllMatches:i,minMatchCharLength:o,isCaseSensitive:c,ignoreLocation:a})}static get type(){return"fuzzy"}static get multiRegex(){return/^"(.*)"$/}static get singleRegex(){return/^(.*)$/}search(e){return this._bitapSearch.searchIn(e)}}class S extends k{constructor(e){super(e)}static get type(){return"include"}static get multiRegex(){return/^'"(.*)"$/}static get singleRegex(){return/^'(.*)$/}search(e){let t,n=0;const r=[],s=this.pattern.length;for(;(t=e.indexOf(this.pattern,n))>-1;)n=t+s,r.push([t,n-1]);const i=!!r.length;return{isMatch:i,score:i?0:1,indices:r}}}const _=[class extends k{constructor(e){super(e)}static get type(){return"exact"}static get multiRegex(){return/^="(.*)"$/}static get singleRegex(){return/^=(.*)$/}search(e){const t=e===this.pattern;return{isMatch:t,score:t?0:1,indices:[0,this.pattern.length-1]}}},S,class extends k{constructor(e){super(e)}static get type(){return"prefix-exact"}static get multiRegex(){return/^\^"(.*)"$/}static get singleRegex(){return/^\^(.*)$/}search(e){const t=e.startsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[0,this.pattern.length-1]}}},class extends k{constructor(e){super(e)}static get type(){return"inverse-prefix-exact"}static get multiRegex(){return/^!\^"(.*)"$/}static get singleRegex(){return/^!\^(.*)$/}search(e){const t=!e.startsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[0,e.length-1]}}},class extends k{constructor(e){super(e)}static get type(){return"inverse-suffix-exact"}static get multiRegex(){return/^!"(.*)"\$$/}static get singleRegex(){return/^!(.*)\$$/}search(e){const t=!e.endsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[0,e.length-1]}}},class extends k{constructor(e){super(e)}static get type(){return"suffix-exact"}static get multiRegex(){return/^"(.*)"\$$/}static get singleRegex(){return/^(.*)\$$/}search(e){const t=e.endsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[e.length-this.pattern.length,e.length-1]}}},class extends k{constructor(e){super(e)}static get type(){return"inverse-exact"}static get multiRegex(){return/^!"(.*)"$/}static get singleRegex(){return/^!(.*)$/}search(e){const t=-1===e.indexOf(this.pattern);return{isMatch:t,score:t?0:1,indices:[0,e.length-1]}}},E],A=_.length,I=/ +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/,C=new Set([E.type,S.type]);const $=[];function F(e,t){for(let n=0,r=$.length;n<r;n+=1){let r=$[n];if(r.condition(e,t))return new r(e,t)}return new b(e,t)}const R="$and",T="$path",N=e=>!(!e[R]&&!e.$or),O=e=>({[R]:Object.keys(e).map((t=>({[t]:e[t]})))});function W(e,t,{auto:n=!0}={}){const i=e=>{let c=Object.keys(e);const a=(e=>!!e[T])(e);if(!a&&c.length>1&&!N(e))return i(O(e));if((e=>!r(e)&&o(e)&&!N(e))(e)){const r=a?e[T]:c[0],i=a?e.$val:e[r];if(!s(i))throw new Error((e=>`Invalid value for key ${e}`)(r));const o={keyId:f(r),pattern:i};return n&&(o.searcher=F(i,t)),o}let l={children:[],operator:c[0]};return c.forEach((t=>{const n=e[t];r(n)&&n.forEach((e=>{l.children.push(i(e))}))})),l};return N(e)||(e=O(e)),i(e)}function j(e,t){const n=e.matches;t.matches=[],c(n)&&n.forEach((e=>{if(!c(e.indices)||!e.indices.length)return;const{indices:n,value:r}=e;let s={indices:n,value:r};e.key&&(s.key=e.key.src),e.idx>-1&&(s.refIndex=e.idx),t.matches.push(s)}))}function B(e,t){t.score=e.score}class H{constructor(e,t={},n){this.options={...p,...t},this.options.useExtendedSearch,this._keyStore=new d(this.options.keys),this.setCollection(e,n)}setCollection(e,t){if(this._docs=e,t&&!(t instanceof y))throw new Error("Incorrect 'index' type");this._myIndex=t||x(this.options.keys,this._docs,{getFn:this.options.getFn,fieldNormWeight:this.options.fieldNormWeight})}add(e){c(e)&&(this._docs.push(e),this._myIndex.add(e))}remove(e=()=>!1){const t=[];for(let n=0,r=this._docs.length;n<r;n+=1){const s=this._docs[n];e(s,n)&&(this.removeAt(n),n-=1,r-=1,t.push(s))}return t}removeAt(e){this._docs.splice(e,1),this._myIndex.removeAt(e)}getIndex(){return this._myIndex}search(e,{limit:t=-1}={}){const{includeMatches:n,includeScore:r,shouldSort:o,sortFn:c,ignoreFieldNorm:a}=this.options;let l=s(e)?s(this._docs[0])?this._searchStringList(e):this._searchObjectList(e):this._searchLogical(e);return function(e,{ignoreFieldNorm:t=p.ignoreFieldNorm}){e.forEach((e=>{let n=1;e.matches.forEach((({key:e,norm:r,score:s})=>{const i=e?e.weight:null;n*=Math.pow(0===s&&i?Number.EPSILON:s,(i||1)*(t?1:r))})),e.score=n}))}(l,{ignoreFieldNorm:a}),o&&l.sort(c),i(t)&&t>-1&&(l=l.slice(0,t)),function(e,t,{includeMatches:n=p.includeMatches,includeScore:r=p.includeScore}={}){const s=[];return n&&s.push(j),r&&s.push(B),e.map((e=>{const{idx:n}=e,r={item:t[n],refIndex:n};return s.length&&s.forEach((t=>{t(e,r)})),r}))}(l,this._docs,{includeMatches:n,includeScore:r})}_searchStringList(e){const t=F(e,this.options),{records:n}=this._myIndex,r=[];return n.forEach((({v:e,i:n,n:s})=>{if(!c(e))return;const{isMatch:i,score:o,indices:a}=t.searchIn(e);i&&r.push({item:e,idx:n,matches:[{score:o,value:e,norm:s,indices:a}]})})),r}_searchLogical(e){const t=W(e,this.options),n=(e,t,r)=>{if(!e.children){const{keyId:n,searcher:s}=e,i=this._findMatches({key:this._keyStore.get(n),value:this._myIndex.getValueForItemAtKeyId(t,n),searcher:s});return i&&i.length?[{idx:r,item:t,matches:i}]:[]}const s=[];for(let i=0,o=e.children.length;i<o;i+=1){const o=e.children[i],c=n(o,t,r);if(c.length)s.push(...c);else if(e.operator===R)return[]}return s},r=this._myIndex.records,s={},i=[];return r.forEach((({$:e,i:r})=>{if(c(e)){let o=n(t,e,r);o.length&&(s[r]||(s[r]={idx:r,item:e,matches:[]},i.push(s[r])),o.forEach((({matches:e})=>{s[r].matches.push(...e)})))}})),i}_searchObjectList(e){const t=F(e,this.options),{keys:n,records:r}=this._myIndex,s=[];return r.forEach((({$:e,i:r})=>{if(!c(e))return;let i=[];n.forEach(((n,r)=>{i.push(...this._findMatches({key:n,value:e[r],searcher:t}))})),i.length&&s.push({idx:r,item:e,matches:i})})),s}_findMatches({key:e,value:t,searcher:n}){if(!c(t))return[];let s=[];if(r(t))t.forEach((({v:t,i:r,n:i})=>{if(!c(t))return;const{isMatch:o,score:a,indices:l}=n.searchIn(t);o&&s.push({score:a,key:e,value:t,idx:r,norm:i,indices:l})}));else{const{v:r,n:i}=t,{isMatch:o,score:c,indices:a}=n.searchIn(r);o&&s.push({score:c,key:e,value:r,norm:i,indices:a})}return s}}H.version="7.0.0",H.createIndex=x,H.parseIndex=function(e,{getFn:t=p.getFn,fieldNormWeight:n=p.fieldNormWeight}={}){const{keys:r,records:s}=e,i=new y({getFn:t,fieldNormWeight:n});return i.setKeys(r),i.setIndexRecords(s),i},H.config=p,H.parseQuery=W,function(...e){$.push(...e)}(class{constructor(e,{isCaseSensitive:t=p.isCaseSensitive,includeMatches:n=p.includeMatches,minMatchCharLength:r=p.minMatchCharLength,ignoreLocation:s=p.ignoreLocation,findAllMatches:i=p.findAllMatches,location:o=p.location,threshold:c=p.threshold,distance:a=p.distance}={}){this.query=null,this.options={isCaseSensitive:t,includeMatches:n,minMatchCharLength:r,findAllMatches:i,ignoreLocation:s,location:o,threshold:c,distance:a},this.pattern=t?e:e.toLowerCase(),this.query=function(e,t={}){return e.split("|").map((e=>{let n=e.trim().split(I).filter((e=>e&&!!e.trim())),r=[];for(let e=0,s=n.length;e<s;e+=1){const s=n[e];let i=!1,o=-1;for(;!i&&++o<A;){const e=_[o];let n=e.isMultiMatch(s);n&&(r.push(new e(n,t)),i=!0)}if(!i)for(o=-1;++o<A;){const e=_[o];let n=e.isSingleMatch(s);if(n){r.push(new e(n,t));break}}}return r}))}(this.pattern,this.options)}static condition(e,t){return t.useExtendedSearch}searchIn(e){const t=this.query;if(!t)return{isMatch:!1,score:1};const{includeMatches:n,isCaseSensitive:r}=this.options;e=r?e:e.toLowerCase();let s=0,i=[],o=0;for(let r=0,c=t.length;r<c;r+=1){const c=t[r];i.length=0,s=0;for(let t=0,r=c.length;t<r;t+=1){const r=c[t],{isMatch:a,indices:l,score:h}=r.search(e);if(!a){o=0,s=0,i.length=0;break}if(s+=1,o+=h,n){const e=r.constructor.type;C.has(e)?i=[...i,...l]:i.push(l)}}if(s){let e={isMatch:!0,score:o/s};return n&&(e.indices=i),e}}return{isMatch:!1,score:1}}})}},i={};function o(e){var t=i[e];if(void 0!==t)return t.exports;var n=i[e]={exports:{}};return s[e](n,n.exports,o),n.exports}e="function"==typeof Symbol?Symbol("webpack queues"):"__webpack_queues__",t="function"==typeof Symbol?Symbol("webpack exports"):"__webpack_exports__",n="function"==typeof Symbol?Symbol("webpack error"):"__webpack_error__",r=e=>{e&&e.d<1&&(e.d=1,e.forEach((e=>e.r--)),e.forEach((e=>e.r--?e.r++:e())))},o.a=(s,i,o)=>{var c;o&&((c=[]).d=-1);var a,l,h,d=new Set,u=s.exports,g=new Promise(((e,t)=>{h=t,l=e}));g[t]=u,g[e]=e=>(c&&e(c),d.forEach(e),g.catch((e=>{}))),s.exports=g,i((s=>{var i;a=(s=>s.map((s=>{if(null!==s&&"object"==typeof s){if(s[e])return s;if(s.then){var i=[];i.d=0,s.then((e=>{o[t]=e,r(i)}),(e=>{o[n]=e,r(i)}));var o={};return o[e]=e=>e(i),o}}var c={};return c[e]=e=>{},c[t]=s,c})))(s);var o=()=>a.map((e=>{if(e[n])throw e[n];return e[t]})),l=new Promise((t=>{(i=()=>t(o)).r=0;var n=e=>e!==c&&!d.has(e)&&(d.add(e),e&&!e.d&&(i.r++,e.push(i)));a.map((t=>t[e](n)))}));return i.r?l:o()}),(e=>(e?h(g[n]=e):l(u),r(c)))),c&&c.d<0&&(c.d=0)},o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o(44)})();