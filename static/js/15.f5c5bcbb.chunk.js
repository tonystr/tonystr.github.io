(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{408:function(e,n,o){"use strict";o.r(n),o.d(n,"default",function(){return d});var t=o(8),i=o(0),w=o.n(i);function u(e){var n=document.getElementById("canvas").getContext("2d"),o=e.clientX,t=e.clientY,i=window.mousePrevious.down?window.mousePrevious.x:o,w=window.mousePrevious.down?window.mousePrevious.y:t;Math.sqrt(Math.pow(o-i,2)+Math.pow(t-w,2));n.beginPath(),n.lineWidth=5,n.strokeStyle="#ffffff",n.lineCap="round",n.moveTo(i,w),n.lineTo(o,t),n.stroke(),window.mousePrevious={x:o,y:t,down:!0}}function d(){var e=Object(i.useState)({width:window.innerWidth,height:window.innerHeight-138}),n=Object(t.a)(e,2),o=n[0],d=n[1];return Object(i.useEffect)(function(){var e=function(){return d({width:window.innerWidth,height:window.innerHeight-138})};return window.addEventListener("resize",e),function(){return window.removeEventListener("resize",e)}},[]),w.a.createElement("div",{className:"paint"},w.a.createElement("canvas",{width:o.width,height:o.height,id:"canvas",onMouseDown:function(e){u(e),document.addEventListener("mousemove",u)},onMouseUp:function(){document.removeEventListener("mousemove",u),window.mousePrevious.down=!1},onClick:function(e){u(e),window.mousePrevious.down=!1}}),w.a.createElement("textarea",{id:"copybox"}))}window.mousePrevious={x:null,y:null,down:!1}}}]);
//# sourceMappingURL=15.f5c5bcbb.chunk.js.map