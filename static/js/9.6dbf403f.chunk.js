(this["webpackJsonptonystr.github.io"]=this["webpackJsonptonystr.github.io"]||[]).push([[9,14,20],{44:function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));n(0);var r=n(10),c=(n(45),n(1));function a(t){return Object(c.jsxs)("ul",{className:"ribbons",children:[Object(c.jsx)(r.b,{to:"/",children:Object(c.jsx)("li",{className:"l0",children:Object(c.jsx)("i",{className:"far fa-id-card"})})}),Object(c.jsx)(r.b,{to:"/articles",children:Object(c.jsx)("li",{className:"l1",children:Object(c.jsx)("i",{className:"fas fa-file-invoice"})})}),Object(c.jsx)(r.b,{to:"/snippets",children:Object(c.jsx)("li",{className:"l2",children:Object(c.jsx)("i",{className:"fas fa-code"})})}),Object(c.jsx)("a",{href:"https://github.com/tonystr",target:"_blank",rel:"noopener noreferrer",children:Object(c.jsx)("li",{className:"l3",children:Object(c.jsx)("i",{className:"fab fa-github"})})}),Object(c.jsx)("a",{href:"https://twitter.com/TonyStr_",target:"_blank",rel:"noopener noreferrer",children:Object(c.jsx)("li",{className:"l4",children:Object(c.jsx)("i",{className:"fab fa-twitter"})})})]})}},45:function(t,e,n){},454:function(t,e,n){},46:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return a}));n(0);var r=n(44),c=(n(47),n(1));function a(t){return Object(c.jsxs)("header",{children:[Object(c.jsx)(r.a,{}),Object(c.jsxs)("div",{className:"tony",children:[Object(c.jsx)("img",{src:"".concat(window.location.origin.toString(),"/images/window.png"),alt:"Window Icon"}),"Tony Str\xf8msn\xe6s"]})]})}},469:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return j}));var r=n(52),c=(n(0),n(10)),a=n(60),i=n(46),s=n(54),o=n(14),l=(n(454),n(1));function u(t){var e,n=[],a="".concat(window.location.protocol,"//").concat(window.location.hostname,":").concat(window.location.port,"/articles/"),i="3001"!==window.location.port||window.location.search.includes("release"),s=Object(r.a)(o.reverse());try{for(s.s();!(e=s.n()).done;){var u=e.value;if(!i||!u.password){var j=u.tags.map((function(t){return Object(l.jsx)("span",{children:t},t)})),d=u.timestamp?u.password?"Estimated date: "+new Date(u.timestamp).toDateString().slice(4):f(new Date(u.timestamp)):"Date unknown";n.push(Object(l.jsx)(c.b,{to:"../a/"+u.name.toLowerCase(),children:Object(l.jsxs)("li",{children:[Object(l.jsx)("div",{className:"media",children:u.thumbnail&&Object(l.jsx)("img",{src:"".concat(a).concat(u.name.toLowerCase(),"/").concat(u.thumbnail),alt:""})}),Object(l.jsxs)("div",{className:"text",children:[Object(l.jsx)("div",{className:"title",children:Object(l.jsx)("span",{children:u.displayName||u.name})}),Object(l.jsx)("div",{className:"summary",children:u.summary}),Object(l.jsx)("div",{className:"tags",children:j}),Object(l.jsx)("div",{className:"timestamp",children:d})]})]})},u.name))}}}catch(b){s.e(b)}finally{s.f()}return Object(l.jsx)("ul",{children:n})}function f(t){var e=Math.round((new Date-t)/1e3),n=3600,r=86400,c=7*r;if(e>=2*c)return t.toDateString().slice(4);for(var a=0,i=[function(t){return t<30&&"just now"},function(t){return t<60&&"".concat(t," seconds ago")},function(t){return t<120&&"1 minute ago"},function(t){return t<n&&"".concat(Math.floor(e/60)," minutes ago")},function(t){return t<7200&&"1 hour ago"},function(t){return t<r&&"".concat(Math.floor(e/n)," hours ago")},function(t){return t<2*r&&"yesterday"},function(t){return t<c&&"".concat(Math.floor(e/r)," days ago")},function(t){return t<2*c&&"last week"}];a<i.length;a++){var s=(0,i[a])(e);if(s)return s}return t.toDateString().slice(4)}function j(t){return Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)(i.default,{}),Object(l.jsxs)(s.default,{className:"article-list",children:[Object(l.jsx)(a.a,{children:" Articles "}),Object(l.jsx)(u,{json:o})]})]})}},47:function(t,e,n){},52:function(t,e,n){"use strict";n.d(e,"a",(function(){return c}));var r=n(18);function c(t,e){var n;if("undefined"===typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(n=Object(r.a)(t))||e&&t&&"number"===typeof t.length){n&&(t=n);var c=0,a=function(){};return{s:a,n:function(){return c>=t.length?{done:!0}:{done:!1,value:t[c++]}},e:function(t){throw t},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,s=!0,o=!1;return{s:function(){n=t[Symbol.iterator]()},n:function(){var t=n.next();return s=t.done,t},e:function(t){o=!0,i=t},f:function(){try{s||null==n.return||n.return()}finally{if(o)throw i}}}}},53:function(t,e,n){"use strict";function r(t,e){if(null==t)return{};var n,r,c=function(t,e){if(null==t)return{};var n,r,c={},a=Object.keys(t);for(r=0;r<a.length;r++)n=a[r],e.indexOf(n)>=0||(c[n]=t[n]);return c}(t,e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);for(r=0;r<a.length;r++)n=a[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(c[n]=t[n])}return c}n.d(e,"a",(function(){return r}))},54:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return i}));var r=n(9),c=n(53),a=(n(0),n(1));function i(t){var e=t.className,n=Object(c.a)(t,["className"]);return Object(a.jsx)("div",Object(r.a)({className:"standard-page "+(e||"")},n))}},60:function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));var r=n(9),c=(n(0),n(1));function a(t){return Object(c.jsx)("div",Object(r.a)({},t,{className:"article-title section-header"}))}}}]);
//# sourceMappingURL=9.6dbf403f.chunk.js.map