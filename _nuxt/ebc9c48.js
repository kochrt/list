(window.webpackJsonp=window.webpackJsonp||[]).push([[7,6],{259:function(t,e,o){var content=o(262);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(56).default)("9d8b1be8",content,!0,{sourceMap:!1})},261:function(t,e,o){"use strict";o(259)},262:function(t,e,o){var n=o(55)((function(i){return i[1]}));n.push([t.i,".copyButton{\n  top:2px;\n  right:2px\n}",""]),n.locals={},t.exports=n},263:function(t,e,o){"use strict";o.r(e);var n={props:["responses"],data:function(){return{index:0}},methods:{left:function(){var i=this.index-1;i<0&&(i=this.responses.length-1),this.index=i},right:function(){var i=this.index+1;i>=this.responses.length&&(i=0),this.index=i}}},r=o(42),component=Object(r.a)(n,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{},[o("recruiter-response",{attrs:{response:t.responses[t.index]}}),t._v(" "),o("div",{staticClass:"flex justify-center"},[o("button",{staticClass:"mr-1",on:{click:t.left}},[o("svg",{staticClass:"h-6 w-6",attrs:{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"}},[o("path",{attrs:{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"}})])]),t._v(" "),o("button",{on:{click:t.right}},[o("svg",{staticClass:"h-6 w-6",attrs:{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"}},[o("path",{attrs:{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"}})])])])],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{RecruiterResponse:o(264).default})},264:function(t,e,o){"use strict";o.r(e);o(57);var n={props:["response"],data:function(){return{hovering:!1,copied:!1}},watch:{copied:function(t,e){var o=this;t&&setTimeout((function(){return o.copied=!1}),5e3)}},computed:{copyButtonText:function(){return this.copied?"Copied":"Copy"}},methods:{copy:function(){if(document.queryCommandSupported&&document.queryCommandSupported("copy")){var textarea=document.createElement("textarea");textarea.textContent=this.response,textarea.style.position="fixed",document.body.appendChild(textarea),textarea.select();try{document.execCommand("copy"),this.copied=!0}catch(t){return console.warn("Copy to clipboard failed.",t),!1}finally{document.body.removeChild(textarea)}}}}},r=(o(261),o(42)),component=Object(r.a)(n,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"bg-gray-50 p-2 rounded mb-2 relative",on:{mouseenter:function(e){t.hovering=!0},mouseleave:function(e){t.hovering=!1}}},[t.hovering?o("button",{staticClass:"absolute copyButton px-2 py-1 bg-gray-200 shadow-lg rounded flex flex-row items-center",on:{click:t.copy}},[o("svg",{staticClass:"h-4 w-4 mr-1",attrs:{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"}},[o("path",{attrs:{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"}})]),o("p",[t._v(t._s(t.copyButtonText))])]):t._e(),t._v(" "),o("p",{staticClass:"font-mono text-sm whitespace-pre-wrap"},[t._v(t._s(t.response))])])}),[],!1,null,null,null);e.default=component.exports}}]);