webpackJsonp([7],{552:function(a,t,o){function e(a){o(600)}var r=o(10)(o(578),o(613),e,"data-v-0caf1460",null);a.exports=r.exports},568:function(a,t,o){"use strict";function e(){var a=s()({},A.c,{platform:"yqq",needNewCode:0,outCharset:"utf-8"});return o.i(l.a)("https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_tag_conf.fcg",a,A.d)}function r(a){var t=s()({},A.c,{picmid:1,rnd:.5334892526345625,g_tk:814876556,outCharset:"utf-8",platform:"yqq",needNewCode:0,categoryId:a,sortId:5,sin:0,ein:29});return p.a.get("/api/getQQDissByTagProxy",{params:t}).then(function(a){return c.a.resolve(a.data)}).catch(function(a){console.log("获取QQ音乐分类标签歌单详情数据出错getQQDissByTagProxy",a)})}t.b=e,t.a=r;var n=o(89),c=o.n(n),i=o(88),s=o.n(i),l=o(195),A=o(64),g=o(126),p=o.n(g)},578:function(a,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e=o(38),r=o.n(e),n=o(568),c=o(65),i=o.n(c),s=o(87),l=o(33),A=o(196),g=o.n(A);t.default={mixins:[s.c],data:function(){return{category:[]}},computed:r()({},o.i(l.a)(["musicSourceData"])),created:function(){this._getQQCategory()},methods:r()({handlePlayList:function(a){var t=a.length>0?"60px":"";this.$refs.categoryWrap.style.bottom=t,this.$refs.categoryScroll.refresh()},_getQQCategory:function(){var a=this;o.i(n.b)().then(function(t){console.log(t.data),a.category=t.data.categories.splice(1),console.log(a.category)}).catch(function(a){console.log("获取QQ音乐大分类数据出错",a)})},sendCategory:function(a,t){var o={categoryId:a,categoryName:t};this.setCategory(o),console.log("sendCategory",a,t),this.$router.push({path:"/category/"+a})}},o.i(l.b)({setCategory:"SET_CATEGRORY"})),components:{Scroll:i.a,Loading:g.a}}},588:function(a,t,o){t=a.exports=o(549)(!0),t.push([a.i,".category-wrap[data-v-0caf1460]{position:fixed;top:90px;bottom:0;left:0;right:0}.category-wrap .category-scroll[data-v-0caf1460]{height:100%;overflow:hidden;position:relative}.category-wrap .category-scroll .category-ul li[data-v-0caf1460]{padding:0 0 15px}.category-wrap .category-scroll .category-ul li .category-group-name[data-v-0caf1460]{color:#ffcd32;background-color:#333;height:30px;line-height:30px;padding-left:20px;font-size:14px}.category-wrap .category-scroll .category-ul li ul[data-v-0caf1460]{padding:20px;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}.category-wrap .category-scroll .category-ul li ul li .category-name[data-v-0caf1460]{margin:0 10px;padding:5px;color:hsla(0,0%,100%,.5);border:1px solid hsla(0,0%,100%,.5);border-radius:4px;font-size:12px}.category-wrap .loading[data-v-0caf1460]{position:fixed;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}","",{version:3,sources:["C:/vue-music/vue-music/src/components/category/category.vue"],names:[],mappings:"AACA,gCACE,eAAgB,AAChB,SAAU,AACV,SAAU,AACV,OAAQ,AACR,OAAS,CACV,AACD,iDACE,YAAa,AACb,gBAAiB,AACjB,iBAAmB,CACpB,AACD,iEACE,gBAAoB,CACrB,AACD,sFACE,cAAe,AACf,sBAAuB,AACvB,YAAa,AACb,iBAAkB,AAClB,kBAAmB,AACnB,cAAgB,CACjB,AACD,oEACE,aAAc,AACd,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,mBAAoB,AAChB,cAAgB,CACrB,AACD,sFACE,cAAe,AACf,YAAa,AACb,yBAA6B,AAC7B,oCAAwC,AACxC,kBAAmB,AACnB,cAAgB,CACjB,AACD,yCACE,eAAgB,AAChB,QAAS,AACT,SAAU,AACV,uCAAyC,AACjC,8BAAiC,CAC1C",file:"category.vue",sourcesContent:["\n.category-wrap[data-v-0caf1460] {\n  position: fixed;\n  top: 90px;\n  bottom: 0;\n  left: 0;\n  right: 0;\n}\n.category-wrap .category-scroll[data-v-0caf1460] {\n  height: 100%;\n  overflow: hidden;\n  position: relative;\n}\n.category-wrap .category-scroll .category-ul li[data-v-0caf1460] {\n  padding: 0 0 15px 0;\n}\n.category-wrap .category-scroll .category-ul li .category-group-name[data-v-0caf1460] {\n  color: #ffcd32;\n  background-color: #333;\n  height: 30px;\n  line-height: 30px;\n  padding-left: 20px;\n  font-size: 14px;\n}\n.category-wrap .category-scroll .category-ul li ul[data-v-0caf1460] {\n  padding: 20px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n.category-wrap .category-scroll .category-ul li ul li .category-name[data-v-0caf1460] {\n  margin: 0 10px;\n  padding: 5px;\n  color: rgba(255,255,255,0.5);\n  border: 1px solid rgba(255,255,255,0.5);\n  border-radius: 4px;\n  font-size: 12px;\n}\n.category-wrap .loading[data-v-0caf1460] {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n}"],sourceRoot:""}])},600:function(a,t,o){var e=o(588);"string"==typeof e&&(e=[[a.i,e,""]]),e.locals&&(a.exports=e.locals);o(550)("6113a1f2",e,!0)},613:function(a,t){a.exports={render:function(){var a=this,t=a.$createElement,o=a._self._c||t;return o("div",{ref:"categoryWrap",staticClass:"category-wrap"},[o("scroll",{ref:"categoryScroll",staticClass:"category-scroll",attrs:{data:a.category}},[o("ul",{staticClass:"category-ul"},a._l(a.category,function(t){return o("li",[o("h1",{staticClass:"category-group-name",domProps:{innerHTML:a._s(t.categoryGroupName)}}),a._v(" "),o("ul",a._l(t.items,function(t){return o("li",[o("p",{staticClass:"category-name",domProps:{innerHTML:a._s(t.categoryName)},on:{click:function(o){a.sendCategory(t.categoryId,t.categoryName)}}})])}))])}))]),a._v(" "),o("router-view"),a._v(" "),!a.category.length>0?o("div",{staticClass:"loading"},[o("loading")],1):a._e()],1)},staticRenderFns:[]}}});
//# sourceMappingURL=7.2fd41a3958b1f9548e1b.js.map