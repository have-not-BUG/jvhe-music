webpackJsonp([7],{556:function(s,e,r){function t(s){r(590)}var o=r(10)(r(575),r(603),t,"data-v-0e6b8440",null);s.exports=o.exports},575:function(s,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t=r(48),o=r.n(t),a=r(204),i=r.n(a),h=r(199),n=r(64),c=r(206),l=r.n(c),A=r(202),y=r.n(A),p=r(65),w=r.n(p),d=r(87),u=r(37);e.default={mixins:[d.c,d.b],data:function(){return{hotkeys:[]}},components:{searchBox:i.a,Suggest:l.a,HistoryList:y.a,Scroll:w.a},created:function(){this._getQQSearchHotKey()},methods:o()({handlePlayList:function(s){var e=s.length>0?"60px":0;this.$refs.hotkeysHistoryScroll.$el.style.bottom=e,this.$refs.hotkeysHistoryScroll.refresh(),this.$refs.suggest.changeBottom(e),this.$refs.suggest.refresh()},_getQQSearchHotKey:function(){var s=this;r.i(h.b)().then(function(e){e.code===n.a?s.hotkeys=e.data.hotkey.slice(0,10):console.log("getQQSearchHotKey 里的res.code 不为0")}).catch(function(s){console.log("QQ热门搜索关键词数据获取失败",s)})},clearAllHistory:function(){confirm("您确定要清空搜索历史吗？")&&this.clearAllSearchHistory()}},r.i(u.c)(["saveSearchHistory","clearAllSearchHistory"])),computed:{hotkeysAndsearchHistory:function(){return this.hotkeys.concat(this.searchHistory)}},watch:{newInputWord:function(s){var e=this;s||setTimeout(function(){e.$refs.hotkeysHistoryScroll.refresh()},20)}}}},579:function(s,e,r){e=s.exports=r(549)(!0),e.push([s.i,".search-wrap[data-v-0e6b8440]{margin:0 20px}.search-wrap .search-box-wrap[data-v-0e6b8440]{padding:20px 0}.search-wrap .hotkeys-history-scroll[data-v-0e6b8440]{position:fixed;top:160px;bottom:0;left:20px;right:20px;z-index:-1}.search-wrap .hotkeys-history-scroll .hotkeys-history-wrap .search-hotkeys-wrap[data-v-0e6b8440]{z-index:2;position:relative}.search-wrap .hotkeys-history-scroll .hotkeys-history-wrap .search-hotkeys-wrap h1[data-v-0e6b8440]{margin-bottom:20px;color:#fff}.search-wrap .hotkeys-history-scroll .hotkeys-history-wrap .search-hotkeys-wrap .search-hotkeys-ul[data-v-0e6b8440]{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}.search-wrap .hotkeys-history-scroll .hotkeys-history-wrap .search-hotkeys-wrap .search-hotkeys-ul li[data-v-0e6b8440]{background-color:#333;padding:5px 10px;margin:5px 10px;border-radius:6px;color:hsla(0,0%,100%,.3)}.search-wrap .hotkeys-history-scroll .hotkeys-history-wrap .search-history-wrap[data-v-0e6b8440]{z-index:2}.search-wrap .hotkeys-history-scroll .hotkeys-history-wrap .search-history-wrap .search-history-title[data-v-0e6b8440]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-ms-flex-align:center;align-items:center;color:#fff}.search-wrap .hotkeys-history-scroll .hotkeys-history-wrap .search-history-wrap .search-history-title h1[data-v-0e6b8440]{margin:20px 0;font-size:14px}.search-wrap .hotkeys-history-scroll .hotkeys-history-wrap .search-history-wrap .search-history-title i[data-v-0e6b8440]{color:hsla(0,0%,100%,.5)}","",{version:3,sources:["C:/vue-music/vue-music/src/components/search/search.vue"],names:[],mappings:"AACA,8BACE,aAAe,CAChB,AACD,+CACE,cAAgB,CACjB,AACD,sDACE,eAAgB,AAChB,UAAW,AACX,SAAU,AACV,UAAW,AACX,WAAY,AACZ,UAAY,CACb,AACD,iGACE,UAAW,AACX,iBAAmB,CACpB,AACD,oGACE,mBAAoB,AACpB,UAAY,CACb,AACD,oHACE,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,mBAAoB,AAChB,cAAgB,CACrB,AACD,uHACE,sBAAuB,AACvB,iBAAkB,AAClB,gBAAiB,AACjB,kBAAmB,AACnB,wBAA6B,CAC9B,AACD,iGACE,SAAW,CACZ,AACD,uHACE,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,yBAA0B,AACtB,sBAAuB,AACnB,8BAA+B,AACvC,yBAA0B,AACtB,sBAAuB,AACnB,mBAAoB,AAC5B,UAAY,CACb,AACD,0HACE,cAAe,AACf,cAAgB,CACjB,AACD,yHACE,wBAA6B,CAC9B",file:"search.vue",sourcesContent:["\n.search-wrap[data-v-0e6b8440] {\n  margin: 0 20px;\n}\n.search-wrap .search-box-wrap[data-v-0e6b8440] {\n  padding: 20px 0;\n}\n.search-wrap .hotkeys-history-scroll[data-v-0e6b8440] {\n  position: fixed;\n  top: 160px;\n  bottom: 0;\n  left: 20px;\n  right: 20px;\n  z-index: -1;\n}\n.search-wrap .hotkeys-history-scroll .hotkeys-history-wrap .search-hotkeys-wrap[data-v-0e6b8440] {\n  z-index: 2;\n  position: relative;\n}\n.search-wrap .hotkeys-history-scroll .hotkeys-history-wrap .search-hotkeys-wrap h1[data-v-0e6b8440] {\n  margin-bottom: 20px;\n  color: #fff;\n}\n.search-wrap .hotkeys-history-scroll .hotkeys-history-wrap .search-hotkeys-wrap .search-hotkeys-ul[data-v-0e6b8440] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n.search-wrap .hotkeys-history-scroll .hotkeys-history-wrap .search-hotkeys-wrap .search-hotkeys-ul li[data-v-0e6b8440] {\n  background-color: #333;\n  padding: 5px 10px;\n  margin: 5px 10px;\n  border-radius: 6px;\n  color: rgba(255,255,255,0.3);\n}\n.search-wrap .hotkeys-history-scroll .hotkeys-history-wrap .search-history-wrap[data-v-0e6b8440] {\n  z-index: 2;\n}\n.search-wrap .hotkeys-history-scroll .hotkeys-history-wrap .search-history-wrap .search-history-title[data-v-0e6b8440] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  color: #fff;\n}\n.search-wrap .hotkeys-history-scroll .hotkeys-history-wrap .search-history-wrap .search-history-title h1[data-v-0e6b8440] {\n  margin: 20px 0;\n  font-size: 14px;\n}\n.search-wrap .hotkeys-history-scroll .hotkeys-history-wrap .search-history-wrap .search-history-title i[data-v-0e6b8440] {\n  color: rgba(255,255,255,0.5);\n}"],sourceRoot:""}])},590:function(s,e,r){var t=r(579);"string"==typeof t&&(t=[[s.i,t,""]]),t.locals&&(s.exports=t.locals);r(550)("f43b42fe",t,!0)},603:function(s,e){s.exports={render:function(){var s=this,e=s.$createElement,r=s._self._c||e;return r("div",{staticClass:"search-wrap"},[r("div",{staticClass:"search-box-wrap"},[r("search-box",{ref:"searchBox",on:{inputWord:s.showInputWord}})],1),s._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:s.newInputWord,expression:"newInputWord"}],staticClass:"suggest-wrap"},[r("suggest",{ref:"suggest",attrs:{newInputWord:s.newInputWord},on:{pushBlur:s.getBlur,chooseIt:s.saveHistory}})],1),s._v(" "),r("scroll",{directives:[{name:"show",rawName:"v-show",value:!s.newInputWord,expression:"!newInputWord"}],ref:"hotkeysHistoryScroll",staticClass:"hotkeys-history-scroll",attrs:{data:s.hotkeysAndsearchHistory,refreshDelay:s.refreshDelay}},[r("div",{staticClass:"hotkeys-history-wrap"},[r("div",{staticClass:"search-hotkeys-wrap"},[r("h1",[s._v("热门搜索")]),s._v(" "),r("ul",{staticClass:"search-hotkeys-ul"},s._l(s.hotkeys,function(e){return r("li",{on:{click:function(r){s.changeWord(e.k)}}},[s._v(" "+s._s(e.k)+" ")])}))]),s._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:!s.newInputWord&&s.searchHistory&&s.searchHistory.length,expression:"!newInputWord && searchHistory &&searchHistory.length"}],staticClass:"search-history-wrap"},[r("div",{staticClass:"search-history-title"},[r("h1",[s._v("搜索历史")]),s._v(" "),r("span",{on:{click:s.clearAllHistory}},[r("i",{staticClass:"icon-clear"})])]),s._v(" "),r("history-list",{attrs:{searches:s.searchHistory},on:{chooseIt:s.deleteOne,clickSavedWord:s.changeWord}})],1)])]),s._v(" "),r("router-view")],1)},staticRenderFns:[]}}});
//# sourceMappingURL=7.db03408dd16dd68df81d.js.map