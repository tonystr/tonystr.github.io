(window.webpackJsonp=window.webpackJsonp||[]).push([[9,14,19],{39:function(e,t,a){"use strict";a.d(t,"a",function(){return l});var n=a(0),r=a.n(n),c=a(8);a(40);function l(e){return r.a.createElement("ul",{className:"ribbons"},r.a.createElement(c.b,{to:"/"},r.a.createElement("li",{className:"l0"},r.a.createElement("i",{className:"far fa-id-card"}))),r.a.createElement(c.b,{to:"/articles"},r.a.createElement("li",{className:"l1"},r.a.createElement("i",{className:"fas fa-file-invoice"}))),r.a.createElement(c.b,{to:"/snippets"},r.a.createElement("li",{className:"l2"},r.a.createElement("i",{className:"fas fa-code"}))),r.a.createElement("a",{href:"https://github.com/tonystr",target:"_blank",rel:"noopener noreferrer"},r.a.createElement("li",{className:"l3"},r.a.createElement("i",{className:"fab fa-github"}))),r.a.createElement("a",{href:"https://twitter.com/TonyStr_",target:"_blank",rel:"noopener noreferrer"},r.a.createElement("li",{className:"l4"},r.a.createElement("i",{className:"fab fa-twitter"}))))}},40:function(e,t,a){},42:function(e,t,a){"use strict";a.r(t),a.d(t,"default",function(){return l});var n=a(0),r=a.n(n),c=a(39);a(43);function l(e){return r.a.createElement("header",null,r.a.createElement(c.a,null),r.a.createElement("div",{className:"tony"},r.a.createElement("img",{src:"".concat(window.location.origin.toString(),"/images/window.png"),alt:"Window Icon"}),"Tony Str\xf8msn\xe6s"))}},43:function(e,t,a){},440:function(e,t,a){},459:function(e,t,a){"use strict";a.r(t),a.d(t,"default",function(){return f});var n=a(0),r=a.n(n),c=a(8),l=a(53),o=a(42),i=a(47),s=a(11);a(440);function u(e){var t=[],a="".concat(window.location.protocol,"//").concat(window.location.hostname,":").concat(window.location.port,"/articles/"),n="3001"!==window.location.port||window.location.search.includes("release"),l=!0,o=!1,i=void 0;try{for(var u,f=s.reverse()[Symbol.iterator]();!(l=(u=f.next()).done);l=!0){var d=u.value;if(!n||!d.password){var E=d.tags.map(function(e){return r.a.createElement("span",{key:e},e)}),w=d.timestamp?d.password?"Estimated date: "+new Date(d.timestamp).toDateString().slice(4):m(new Date(d.timestamp)):"Date unknown";t.push(r.a.createElement(c.b,{to:"../a/"+d.name.toLowerCase(),key:d.name},r.a.createElement("li",null,r.a.createElement("div",{className:"media"},d.thumbnail&&r.a.createElement("img",{src:"".concat(a).concat(d.name.toLowerCase(),"/").concat(d.thumbnail),alt:""})),r.a.createElement("div",{className:"text"},r.a.createElement("div",{className:"title"},r.a.createElement("span",null,d.displayName||d.name)),r.a.createElement("div",{className:"summary"},d.summary),r.a.createElement("div",{className:"tags"},E),r.a.createElement("div",{className:"timestamp"},w)))))}}}catch(p){o=!0,i=p}finally{try{l||null==f.return||f.return()}finally{if(o)throw i}}return r.a.createElement("ul",null,t)}function m(e){var t=Math.round((new Date-e)/1e3);if(t>=1209600)return e.toDateString().slice(4);for(var a=0,n=[function(e){return e<30&&"just now"},function(e){return e<60&&"".concat(e," seconds ago")},function(e){return e<120&&"1 minute ago"},function(e){return e<3600&&"".concat(Math.floor(t/60)," minutes ago")},function(e){return e<7200&&"1 hour ago"},function(e){return e<86400&&"".concat(Math.floor(t/3600)," hours ago")},function(e){return e<172800&&"yesterday"},function(e){return e<604800&&"".concat(Math.floor(t/86400)," days ago")},function(e){return e<1209600&&"last week"}];a<n.length;a++){var r=(0,n[a])(t);if(r)return r}return e.toDateString().slice(4)}function f(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement(o.default,null),r.a.createElement(i.default,{className:"article-list"},r.a.createElement(l.a,null," Articles "),r.a.createElement(u,{json:s})))}},47:function(e,t,a){"use strict";a.r(t),a.d(t,"default",function(){return l});var n=a(49),r=a(0),c=a.n(r);function l(e){var t=e.className,a=Object(n.a)(e,["className"]);return c.a.createElement("div",Object.assign({className:"standard-page "+(t||"")},a))}},49:function(e,t,a){"use strict";function n(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},c=Object.keys(e);for(n=0;n<c.length;n++)a=c[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(n=0;n<c.length;n++)a=c[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}a.d(t,"a",function(){return n})},53:function(e,t,a){"use strict";a.d(t,"a",function(){return c});var n=a(0),r=a.n(n);function c(e){return r.a.createElement("div",Object.assign({},e,{className:"article-title section-header"}))}}}]);
//# sourceMappingURL=9.6556eee0.chunk.js.map