(this["webpackJsonptonystr.github.io"]=this["webpackJsonptonystr.github.io"]||[]).push([[13],{460:function(t){t.exports=JSON.parse('[{"name":"Periodic Table Builder","url":"https://ptb.TonyStr.net","role":"Webdesign & programming","image":"/images/periodic_table_maker.png"},{"name":"GMShaders","url":"https://GMShaders.com","role":"Webdesign & programming","image":"/images/GMShaders.png"},{"name":"obj_podcast","url":"https://objpodcast.com/","role":"Webdesign & programming","image":"/images/obj_podcast.png"},{"name":"JujuAdams.com","url":"https://www.jujuadams.com/","role":"Webdesign","image":"/images/juju_adams.png"},{"name":"The Story Goes On","url":"http://tsgogame.com","role":"Mobile support & other resolutions","image":"/images/tsgowebsite.jpg"},{"name":"TonyStr.net","url":"https://TonyStr.net","role":"Webdesign & programming","image":"/images/tonystrnet.png"}]')},476:function(t,e,r){"use strict";r.r(e),r.d(e,"default",(function(){return l}));var n=r(17),o=r(0),i=r(62),a=r(460),c=r(61),s=r(7),u=r(1);function l(){var t=Object(o.useState)("loading..."),e=Object(n.a)(t,2),l=e[0],h=e[1];Object(o.useEffect)((function(){Object(c.a)("https://raw.githubusercontent.com/tonystr/tonystr.github.io/master/src/pages/home.jsx",(function(t){h("".concat(t,"\n").concat(t)),r.e(24).then(r.t.bind(null,464,7)).then((function(t){return t.highlightAll()}))}))}),[]);return Object(u.jsxs)("section",{className:"page",id:"webdev",children:[Object(u.jsx)("div",{className:"left",children:Object(u.jsx)("div",{className:"codeWrapper",children:l&&Object(u.jsx)("pre",{children:Object(u.jsx)("code",{className:"prism language-jsx",children:l})})})}),Object(u.jsx)("div",{className:"right",children:Object(u.jsxs)("div",{className:"wrapper",children:[Object(u.jsx)(i.a,{className:"title",content:"Web development"}),Object(u.jsx)("div",{className:"showcase",children:Object(u.jsx)("div",{className:"gridview",children:function(){for(var t=[],e=0;e<a.length;e++){var r=a[e];t.push(Object(u.jsx)("div",{className:"website",children:Object(u.jsxs)("a",{target:"_blank",href:r.url,rel:"noopener noreferrer",children:[Object(u.jsx)("div",{className:"name",children:r.name}),Object(u.jsx)("img",{alt:"image: "+r.name,src:r.image}),Object(u.jsx)("div",{className:"role",children:r.role})]})},e))}return t}()})}),Object(u.jsxs)("div",{className:"description",children:[Object(u.jsxs)("div",{className:"window",children:[Object(u.jsx)("img",{src:"images/window.png",alt:"window"}),Object(u.jsx)("span",{className:"name",children:"TonyStr"})]}),Object(u.jsxs)("div",{className:"inner",children:["I specialize in ",Object(u.jsx)(s.a,{to:"https://reactjs.org/",children:"React.js"})," and ",Object(u.jsx)(s.a,{to:"https://sass-lang.com/",children:"SCSS"})," for front-end web development, though I also have experience with ",Object(u.jsx)(s.a,{to:"https://vuejs.org",children:"Vue.js"})," and ",Object(u.jsx)(s.a,{to:"https://www.styled-components.com/",children:"styled-components"}),", because I love trying out new technologies. Some of the websites displayed above are also written in plain html/css/js"]})]})]})})]})}},61:function(t,e,r){"use strict";r.d(e,"a",(function(){return a}));var n=r(66),o=r.n(n),i=r(67);function a(t,e){return c.apply(this,arguments)}function c(){return(c=Object(i.a)(o.a.mark((function t(e,r){var n;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:(n=new XMLHttpRequest).onreadystatechange=function(){4===n.readyState&&200===n.status&&n.responseText&&r(n.responseText)},n.open("GET",e,!0),n.send();case 4:case"end":return t.stop()}}),t)})))).apply(this,arguments)}},66:function(t,e,r){t.exports=r(83)},67:function(t,e,r){"use strict";function n(t,e,r,n,o,i,a){try{var c=t[i](a),s=c.value}catch(u){return void r(u)}c.done?e(s):Promise.resolve(s).then(n,o)}function o(t){return function(){var e=this,r=arguments;return new Promise((function(o,i){var a=t.apply(e,r);function c(t){n(a,o,i,c,s,"next",t)}function s(t){n(a,o,i,c,s,"throw",t)}c(void 0)}))}}r.d(e,"a",(function(){return o}))},83:function(t,e,r){var n=function(t){"use strict";var e,r=Object.prototype,n=r.hasOwnProperty,o="function"===typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",a=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function s(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{s({},"")}catch(G){s=function(t,e,r){return t[e]=r}}function u(t,e,r,n){var o=e&&e.prototype instanceof g?e:g,i=Object.create(o.prototype),a=new _(n||[]);return i._invoke=function(t,e,r){var n=h;return function(o,i){if(n===p)throw new Error("Generator is already running");if(n===d){if("throw"===o)throw i;return k()}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var c=N(a,r);if(c){if(c===m)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===h)throw n=d,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=p;var s=l(t,e,r);if("normal"===s.type){if(n=r.done?d:f,s.arg===m)continue;return{value:s.arg,done:r.done}}"throw"===s.type&&(n=d,r.method="throw",r.arg=s.arg)}}}(t,r,a),i}function l(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(G){return{type:"throw",arg:G}}}t.wrap=u;var h="suspendedStart",f="suspendedYield",p="executing",d="completed",m={};function g(){}function v(){}function y(){}var j={};j[i]=function(){return this};var b=Object.getPrototypeOf,w=b&&b(b(T([])));w&&w!==r&&n.call(w,i)&&(j=w);var x=y.prototype=g.prototype=Object.create(j);function O(t){["next","throw","return"].forEach((function(e){s(t,e,(function(t){return this._invoke(e,t)}))}))}function L(t,e){function r(o,i,a,c){var s=l(t[o],t,i);if("throw"!==s.type){var u=s.arg,h=u.value;return h&&"object"===typeof h&&n.call(h,"__await")?e.resolve(h.__await).then((function(t){r("next",t,a,c)}),(function(t){r("throw",t,a,c)})):e.resolve(h).then((function(t){u.value=t,a(u)}),(function(t){return r("throw",t,a,c)}))}c(s.arg)}var o;this._invoke=function(t,n){function i(){return new e((function(e,o){r(t,n,e,o)}))}return o=o?o.then(i,i):i()}}function N(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator.return&&(r.method="return",r.arg=e,N(t,r),"throw"===r.method))return m;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return m}var o=l(n,t.iterator,r.arg);if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,m;var i=o.arg;return i?i.done?(r[t.resultName]=i.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,m):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,m)}function E(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function S(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function _(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(E,this),this.reset(!0)}function T(t){if(t){var r=t[i];if(r)return r.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var o=-1,a=function r(){for(;++o<t.length;)if(n.call(t,o))return r.value=t[o],r.done=!1,r;return r.value=e,r.done=!0,r};return a.next=a}}return{next:k}}function k(){return{value:e,done:!0}}return v.prototype=x.constructor=y,y.constructor=v,v.displayName=s(y,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===v||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,y):(t.__proto__=y,s(t,c,"GeneratorFunction")),t.prototype=Object.create(x),t},t.awrap=function(t){return{__await:t}},O(L.prototype),L.prototype[a]=function(){return this},t.AsyncIterator=L,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new L(u(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},O(x),s(x,c,"Generator"),x[i]=function(){return this},x.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=T,_.prototype={constructor:_,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(S),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function o(n,o){return c.type="throw",c.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],c=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var s=n.call(a,"catchLoc"),u=n.call(a,"finallyLoc");if(s&&u){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(s){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,m):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),m},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),S(r),m}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;S(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:T(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),m}},t}(t.exports);try{regeneratorRuntime=n}catch(o){Function("r","regeneratorRuntime = r")(n)}}}]);
//# sourceMappingURL=13.9a2ce5e5.chunk.js.map