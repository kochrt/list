(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{265:function(t,e,n){"use strict";n.r(e);var r={props:["item","filteredByCountry"],computed:{isoDate:function(){return new Date(this.item.added)},beforeSite:function(){return this.isoDate<new Date("June 20 2021")},whenAddedText:function(){return this.beforeSite?"before this site was created":this.item.added},domain:function(){return this.item.url.substring(this.item.url.indexOf("://")+3)},countryCode:function(){if(this.item.basedIn){var t=this.item.basedIn.toLowerCase();return"uk"===t?"gb":t}return null}}},l=n(42),component=Object(l.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("a",{staticClass:"\n    flex\n    w-full\n    p-4\n    bg-white\n    border\n    hover:border-pink-600\n    mb-4\n    rounded\n    transition\n  ",attrs:{href:t.item.url}},[n("div",{staticClass:"flex flex-col items-start w-full"},[n("div",{staticClass:"flex flex-row w-full"},[n("div",{staticClass:"flex flex-row items-baseline"},[n("img",{staticClass:"h-5 w-5 mr-2",attrs:{src:t.item.iconUrl}}),t._v(" "),n("h1",{staticClass:"text-3xl font-black"},[t._v("\n          "+t._s(t.item.company)+"\n        ")])])]),t._v(" "),n("h2",{staticClass:"text-sm mb-1 text-pink-700 font-mono font-semibold"},[t._v("\n      Since "+t._s(t.whenAddedText)+"\n    ")]),t._v(" "),n("h2",{staticClass:"text-l"},[t._v("\n      "+t._s(t.item.snippet)+"\n    ")]),t._v(" "),t.countryCode&&t.filteredByCountry?n("div",{staticClass:"flex items-start flex-grow pt-2"},[n("img",{staticClass:"w-5 ml-auto pt-2",attrs:{src:"https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/"+t.countryCode+".svg"}})]):t._e()])])}),[],!1,null,null,null);e.default=component.exports}}]);