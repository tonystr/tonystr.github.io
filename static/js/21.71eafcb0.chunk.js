(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{458:function(e,n,o){"use strict";o.r(n),o.d(n,"default",function(){return d});var i=o(14),t=o(0),u=o.n(t);function w(e){var n=document.getElementById("canvas").getContext("2d"),o=e.clientX,i=e.clientY,t=window.mousePrevious.down?window.mousePrevious.x:o,u=window.mousePrevious.down?window.mousePrevious.y:i;n.beginPath(),n.lineWidth=5,n.strokeStyle="#ffffff",n.lineCap="round",n.moveTo(t,u),n.lineTo(o,i),n.stroke(),window.mousePrevious={x:o,y:i,down:!0}}function d(){var e=Object(t.useState)({width:window.innerWidth,height:window.innerHeight-138}),n=Object(i.a)(e,2),o=n[0],d=n[1];return Object(t.useEffect)(function(){var e=function(){return d({width:window.innerWidth,height:window.innerHeight-138})};return window.addEventListener("resize",e),function(){return window.removeEventListener("resize",e)}},[]),u.a.createElement("div",{className:"paint"},u.a.createElement("canvas",{width:o.width,height:o.height,id:"canvas",onMouseDown:function(e){w(e),document.addEventListener("mousemove",w)},onMouseUp:function(){document.removeEventListener("mousemove",w),window.mousePrevious.down=!1},onClick:function(e){w(e),window.mousePrevious.down=!1}}))}window.mousePrevious={x:null,y:null,down:!1}}}]);
//# sourceMappingURL=21.71eafcb0.chunk.js.map