(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{415:function(e){e.exports=[{name:"Periodic Table Builder",url:"https://ptb.TonyStr.net",role:"Webdesign & programming",image:"/images/periodic_table_maker.png"},{name:"GMShaders",url:"https://GMShaders.com",role:"Webdesign & programming",image:"/images/GMShaders.png"},{name:"obj_podcast",url:"https://objpodcast.com/",role:"Webdesign & programming",image:"/images/obj_podcast.png"},{name:"JujuAdams.com",url:"https://www.jujuadams.com/",role:"Webdesign",image:"/images/juju_adams.png"},{name:"The Story Goes On",url:"http://tsgogame.com",role:"Mobile support & other resolutions",image:"/images/tsgowebsite.jpg"},{name:"TonyStr.net",url:"https://TonyStr.net",role:"Webdesign & programming",image:"/images/tonystrnet.png"}]},432:function(e,t,r){"use strict";r.r(t),r.d(t,"default",function(){return l});var n=r(9),o=r(0),a=r.n(o),i=r(46),c=r(415),s=r(44),u=r(4);function l(){var e=Object(o.useState)("loading..."),t=Object(n.a)(e,2),l=t[0],h=t[1];Object(o.useEffect)(function(){Object(s.a)("https://raw.githubusercontent.com/tonystr/tonystr.github.io/master/src/pages/home.jsx",function(e){h("".concat(e,"\n").concat(e)),r.e(22).then(r.t.bind(null,422,7)).then(function(e){return e.highlightAll()})})},[]);return a.a.createElement("section",{className:"page",id:"webdev"},a.a.createElement("div",{className:"left"},a.a.createElement("div",{className:"codeWrapper"},l&&a.a.createElement("pre",null,a.a.createElement("code",{className:"prism language-jsx"},l)))),a.a.createElement("div",{className:"right"},a.a.createElement("div",{className:"wrapper"},a.a.createElement(i.a,{className:"title",content:"Web development"}),a.a.createElement("div",{className:"showcase"},a.a.createElement("div",{className:"gridview"},function(){for(var e=[],t=0;t<c.length;t++){var r=c[t];e.push(a.a.createElement("div",{className:"website",key:t},a.a.createElement("a",{target:"_blank",href:r.url,rel:"noopener noreferrer"},a.a.createElement("div",{className:"name"},r.name),a.a.createElement("img",{alt:"image: "+r.name,src:r.image}),a.a.createElement("div",{className:"role"},r.role))))}return e}())),a.a.createElement("div",{className:"description"},a.a.createElement("div",{className:"window"},a.a.createElement("img",{src:"images/window.png",alt:"window"}),a.a.createElement("span",{className:"name"},"TonyStr")),a.a.createElement("div",{className:"inner"},"I specialize in ",a.a.createElement(u.a,{to:"https://reactjs.org/"},"React.js")," and ",a.a.createElement(u.a,{to:"https://sass-lang.com/"},"SCSS")," for front-end web development, though I also have experience with ",a.a.createElement(u.a,{to:"https://vuejs.org"},"Vue.js")," and ",a.a.createElement(u.a,{to:"https://www.styled-components.com/"},"styled-components"),", because I love trying out new technologies. Some of the websites displayed above are also written in plain html/css/js")))))}},44:function(e,t,r){"use strict";r.d(t,"a",function(){return i});var n=r(49),o=r.n(n),a=r(50);function i(e,t){return c.apply(this,arguments)}function c(){return(c=Object(a.a)(o.a.mark(function e(t,r){var n;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:(n=new XMLHttpRequest).onreadystatechange=function(){4===n.readyState&&200===n.status&&n.responseText&&r(n.responseText)},n.open("GET",t,!0),n.send();case 4:case"end":return e.stop()}},e)}))).apply(this,arguments)}},49:function(e,t,r){e.exports=r(63)},50:function(e,t,r){"use strict";function n(e,t,r,n,o,a,i){try{var c=e[a](i),s=c.value}catch(u){return void r(u)}c.done?t(s):Promise.resolve(s).then(n,o)}function o(e){return function(){var t=this,r=arguments;return new Promise(function(o,a){var i=e.apply(t,r);function c(e){n(i,o,a,c,s,"next",e)}function s(e){n(i,o,a,c,s,"throw",e)}c(void 0)})}}r.d(t,"a",function(){return o})},63:function(e,t,r){var n=function(){return this||"object"===typeof self&&self}()||Function("return this")(),o=n.regeneratorRuntime&&Object.getOwnPropertyNames(n).indexOf("regeneratorRuntime")>=0,a=o&&n.regeneratorRuntime;if(n.regeneratorRuntime=void 0,e.exports=r(64),o)n.regeneratorRuntime=a;else try{delete n.regeneratorRuntime}catch(i){n.regeneratorRuntime=void 0}},64:function(e,t){!function(t){"use strict";var r,n=Object.prototype,o=n.hasOwnProperty,a="function"===typeof Symbol?Symbol:{},i=a.iterator||"@@iterator",c=a.asyncIterator||"@@asyncIterator",s=a.toStringTag||"@@toStringTag",u="object"===typeof e,l=t.regeneratorRuntime;if(l)u&&(e.exports=l);else{(l=t.regeneratorRuntime=u?e.exports:{}).wrap=b;var h="suspendedStart",f="suspendedYield",p="executing",m="completed",g={},d={};d[i]=function(){return this};var v=Object.getPrototypeOf,y=v&&v(v(G([])));y&&y!==n&&o.call(y,i)&&(d=y);var w=L.prototype=x.prototype=Object.create(d);j.prototype=w.constructor=L,L.constructor=j,L[s]=j.displayName="GeneratorFunction",l.isGeneratorFunction=function(e){var t="function"===typeof e&&e.constructor;return!!t&&(t===j||"GeneratorFunction"===(t.displayName||t.name))},l.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,L):(e.__proto__=L,s in e||(e[s]="GeneratorFunction")),e.prototype=Object.create(w),e},l.awrap=function(e){return{__await:e}},N(_.prototype),_.prototype[c]=function(){return this},l.AsyncIterator=_,l.async=function(e,t,r,n){var o=new _(b(e,t,r,n));return l.isGeneratorFunction(t)?o:o.next().then(function(e){return e.done?e.value:o.next()})},N(w),w[s]="Generator",w[i]=function(){return this},w.toString=function(){return"[object Generator]"},l.keys=function(e){var t=[];for(var r in e)t.push(r);return t.reverse(),function r(){for(;t.length;){var n=t.pop();if(n in e)return r.value=n,r.done=!1,r}return r.done=!0,r}},l.values=G,T.prototype={constructor:T,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=r,this.done=!1,this.delegate=null,this.method="next",this.arg=r,this.tryEntries.forEach(k),!e)for(var t in this)"t"===t.charAt(0)&&o.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=r)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function n(n,o){return c.type="throw",c.arg=e,t.next=n,o&&(t.method="next",t.arg=r),!!o}for(var a=this.tryEntries.length-1;a>=0;--a){var i=this.tryEntries[a],c=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var s=o.call(i,"catchLoc"),u=o.call(i,"finallyLoc");if(s&&u){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(s){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&o.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var a=n;break}}a&&("break"===e||"continue"===e)&&a.tryLoc<=t&&t<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=e,i.arg=t,a?(this.method="next",this.next=a.finallyLoc,g):this.complete(i)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),g},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),k(r),g}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var o=n.arg;k(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,n){return this.delegate={iterator:G(e),resultName:t,nextLoc:n},"next"===this.method&&(this.arg=r),g}}}function b(e,t,r,n){var o=t&&t.prototype instanceof x?t:x,a=Object.create(o.prototype),i=new T(n||[]);return a._invoke=function(e,t,r){var n=h;return function(o,a){if(n===p)throw new Error("Generator is already running");if(n===m){if("throw"===o)throw a;return P()}for(r.method=o,r.arg=a;;){var i=r.delegate;if(i){var c=O(i,r);if(c){if(c===g)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===h)throw n=m,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=p;var s=E(e,t,r);if("normal"===s.type){if(n=r.done?m:f,s.arg===g)continue;return{value:s.arg,done:r.done}}"throw"===s.type&&(n=m,r.method="throw",r.arg=s.arg)}}}(e,r,i),a}function E(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(n){return{type:"throw",arg:n}}}function x(){}function j(){}function L(){}function N(e){["next","throw","return"].forEach(function(t){e[t]=function(e){return this._invoke(t,e)}})}function _(e){var t;this._invoke=function(r,n){function a(){return new Promise(function(t,a){!function t(r,n,a,i){var c=E(e[r],e,n);if("throw"!==c.type){var s=c.arg,u=s.value;return u&&"object"===typeof u&&o.call(u,"__await")?Promise.resolve(u.__await).then(function(e){t("next",e,a,i)},function(e){t("throw",e,a,i)}):Promise.resolve(u).then(function(e){s.value=e,a(s)},function(e){return t("throw",e,a,i)})}i(c.arg)}(r,n,t,a)})}return t=t?t.then(a,a):a()}}function O(e,t){var n=e.iterator[t.method];if(n===r){if(t.delegate=null,"throw"===t.method){if(e.iterator.return&&(t.method="return",t.arg=r,O(e,t),"throw"===t.method))return g;t.method="throw",t.arg=new TypeError("The iterator does not provide a 'throw' method")}return g}var o=E(n,e.iterator,t.arg);if("throw"===o.type)return t.method="throw",t.arg=o.arg,t.delegate=null,g;var a=o.arg;return a?a.done?(t[e.resultName]=a.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=r),t.delegate=null,g):a:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,g)}function S(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function k(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function T(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(S,this),this.reset(!0)}function G(e){if(e){var t=e[i];if(t)return t.call(e);if("function"===typeof e.next)return e;if(!isNaN(e.length)){var n=-1,a=function t(){for(;++n<e.length;)if(o.call(e,n))return t.value=e[n],t.done=!1,t;return t.value=r,t.done=!0,t};return a.next=a}}return{next:P}}function P(){return{value:r,done:!0}}}(function(){return this||"object"===typeof self&&self}()||Function("return this")())}}]);
//# sourceMappingURL=11.60f1b41f.chunk.js.map