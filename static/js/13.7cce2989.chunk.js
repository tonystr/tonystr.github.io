(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{411:function(e,t,n){},430:function(e,t,n){"use strict";n.r(t);var a=n(64),r=n(9);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},a=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),a.forEach(function(t){o(e,t,n[t])})}return e}var l=n(0),u=n.n(l);n(411);function i(e,t,n,a,r){for(var o=0,c=Math.max(n-1,0);c<Math.min(n+2,r);c++)for(var l=Math.max(t-1,0);l<Math.min(t+2,a);l++)l===t&&c===n||void 0===e[c]||9===e[c][l].value&&o++;return o}function f(e){var t=e.stop,n=Object(l.useState)(0),a=Object(r.a)(n,2),o=a[0],c=a[1];return Object(l.useEffect)(function(){t||setTimeout(function(){return c(o+1)},1e3)},[o,t]),o<60?"".concat(o):o<3600?"".concat(Math.floor(o/60),":").concat(o%60):"".concat(Math.floor(o/3600),":").concat(Math.floor(o/60)%60,":").concat(o%60)}function s(){var e=Math.round(19.32),t=Object(l.useState)(function(e,t,n){for(var a={hidden:!0,flag:!1,value:0},r=Array.from({length:t},function(){return Array.from({length:e},function(){return c({},a,{value:0})})});n>0;){var o=Math.floor(Math.random()*e),l=Math.floor(Math.random()*t);0===r[l][o].value&&(r[l][o].value=9,n--)}return r=r.map(function(n,a){return n.map(function(n,o){return 0===n.value?c({},n,{value:i(r,o,a,e,t)}):n})})}(46,21,e)),n=Object(r.a)(t,2),o=n[0],s=n[1],v=Object(l.useState)("waiting"),d=Object(r.a)(v,2),g=d[0],h=d[1],p=Object(l.useState)(e),b=Object(r.a)(p,2),y=b[0],O=b[1],E=Object(l.useState)(0),j=Object(r.a)(E,2),w=j[0],N=j[1],M=u.a.useRef(),S=[" "].concat(Object(a.a)(new Array(8)),["\ud83d\udca3","\ud83d\udca5"]);Object(l.useEffect)(function(){var e=function(e){return e.preventDefault()&&!1};return M.current.addEventListener("contextmenu",e),function(){return M.current.removeEventListener("contextmenu",e)}});var x=function e(t,n,a){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:46,o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:21,c=!1!==t[a][n].hidden;return t[a][n].hidden=!1,t[a][n].value<1&&function(e,t,n){for(var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:46,r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:21,o=Math.max(t-1,0);o<Math.min(t+2,r);o++)for(var c=Math.max(e-1,0);c<Math.min(e+2,a);c++)c===e&&o===t||n(c,o)}(n,a,function(n,a){t[a][n].hidden&&!t[a][n].flag&&(c+=e(t,n,a,r,o))}),c};return u.a.createElement("div",{className:"minesweeper ".concat(g),ref:M,onButtonDown:function(e){return console.log(e)}},u.a.createElement("table",{className:"game-grid"},u.a.createElement("tbody",null,u.a.createElement(function(){return o.map(function(t,n){return u.a.createElement("tr",{key:n},t.map(function(t,a){return u.a.createElement("td",{key:a,className:(t.hidden?"hidden":"")+((!t.hidden||"lost"===g)&&t.value>=1?" c-".concat(t.value):"")+("lost"===g&&t.flag&&9!==t.value?" flag-wrong":""),onClick:function(){if(!o[n][a].flag){if("playing"!==g&&h("playing"),9===o[n][a].value){var t=JSON.parse(JSON.stringify(o));return t[n][a].value++,s(t),void h("lost")}var r=o,l=w;o[n][a].value>=1?(r=o.map(function(e,t){return e.map(function(e,r){return r===a&&t===n?c({},e,{hidden:!1}):e})}),l=w+1):(r=JSON.parse(JSON.stringify(o)),l=w+x(r,a,n)),N(l),966-l<=e&&function(e){var t=!0,n=!1,a=void 0;try{for(var r,o=e[Symbol.iterator]();!(t=(r=o.next()).done);t=!0){var c=r.value,l=!0,u=!1,i=void 0;try{for(var f,s=c[Symbol.iterator]();!(l=(f=s.next()).done);l=!0){var m=f.value;if(m.hidden&&m.value<9)return!1}}catch(v){u=!0,i=v}finally{try{l||null==s.return||s.return()}finally{if(u)throw i}}}}catch(v){n=!0,a=v}finally{try{t||null==o.return||o.return()}finally{if(n)throw a}}return!0}(r)&&h("won"),s(r)}},onContextMenu:function(){if(o[n][a].hidden&&(o[n][a].flag||!(y<=0)))return"playing"!==g&&h("playing"),O(y+o[n][a].flag-!o[n][a].flag),s(function(e){return e.map(function(e,t){return e.map(function(e,r){return r===a&&t===n?c({},e,{flag:!e.flag}):e})})}),!1}},t.flag&&u.a.createElement("i",{className:"far fa-flag"})||(!t.hidden||"lost"===g&&t.value>8)&&(S[t.value]||t.value))}))})},null))),u.a.createElement("div",{className:"infobar"},u.a.createElement(m,{className:"flagcount"},"Flags: ",u.a.createElement("span",null,y," ",u.a.createElement("i",{className:"far fa-flag"}))),u.a.createElement(m,{className:"bombcount"},"Bombs: ",u.a.createElement("span",null,e-y," \ud83d\udca3")),u.a.createElement(m,{className:"grid-size"},"Grid: ",u.a.createElement("span",null,46," \xd7 ",21)),u.a.createElement(m,{className:"stopwatch",toggle:!0},"Time: ",u.a.createElement("span",{className:"playing"!==g?"stop":""},u.a.createElement(f,{stop:"playing"!==g}))),u.a.createElement(m,{className:"grid-size"},"HiddenCount: ",u.a.createElement("span",null,w))))}function m(e){var t=Object(l.useState)(e.toggle||!1),n=Object(r.a)(t,2),a=n[0],o=n[1];return u.a.createElement("div",{className:(e.className||"")+" counter"+(a?" toggle":""),onClick:function(){return o(!a)}},e.children)}n.d(t,"default",function(){return s})},64:function(e,t,n){"use strict";function a(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}n.d(t,"a",function(){return a})}}]);
//# sourceMappingURL=13.7cce2989.chunk.js.map