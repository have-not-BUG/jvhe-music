webpackJsonp([1],{556:function(t,i,e){function n(t){e(603)}var a=e(10)(e(582),e(616),n,"data-v-35a44a00",null);t.exports=a.exports},562:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=e(38),a=e.n(n),s=e(198),o=e.n(s),r=e(65),l=e.n(r),A=e(196),c=e.n(A),d=e(197),p=e(33),g=e(87),u=e.i(d.a)("transform"),m=e.i(d.a)("backdrop-filter");i.default={mixins:[g.c],props:{title:{type:String,default:""},bgImage:{type:String,default:""},songs:{type:Array,default:[]},rank:{type:Boolean,default:!1}},components:{songList:o.a,scroll:l.a,loading:c.a},computed:{bgStyle:function(){return"background-image:url("+this.bgImage+")"}},mounted:function(){this.singerAvatarHeight=this.$refs.singerAvatar.clientHeight,this.$refs.scrollSongList.$el.style.top=this.singerAvatarHeight+"px"},created:function(){this.probeType=3,this.listenScroll=!0},data:function(){return{scrollY:0}},methods:a()({handlePlayList:function(t){var i=t.length>0?"60px":"";this.$refs.scrollSongList.$el.style.bottom=i,this.$refs.scrollSongList.refresh()},goback:function(){this.$router.back()},scroll:function(t){this.scrollY=t.y},randomPlayAllMusic:function(t){this.randomPlay({list:t})},selectItem:function(t,i){this.selectPlay({list:this.songs,index:i})}},e.i(p.c)(["selectPlay","randomPlay"])),watch:{scrollY:function(t){-t<this.singerAvatarHeight-40?(this.$refs.songListBg.style[u]="translate3d(0,"+t+"px,0)",this.$refs.singerAvatar.style.zIndex=0,this.$refs.singerAvatar.style.paddingBottom="70%",this.$refs.singerAvatar.style.height=0,this.$refs.randomPlayAllWrap.style.display=""):(this.$refs.singerAvatar.style.zIndex=30,this.$refs.singerAvatar.style.paddingBottom=0,this.$refs.singerAvatar.style.height="40px",this.$refs.randomPlayAllWrap.style.display="none");var i=1+t/this.singerAvatarHeight;if(t>0)this.$refs.singerAvatar.style[u]="scale("+i+")";else{var e=Math.min(-t/this.singerAvatarHeight*20,20);this.$refs.bgCover.style[m]="blur("+e+"px)"}}}}},563:function(t,i,e){i=t.exports=e(549)(!0),i.push([t.i,".music-list-wrapper[data-v-77c0eaa0]{height:100%;width:100%;position:relative}.music-list-wrapper .singer-name[data-v-77c0eaa0]{z-index:40;color:#ffcd32;position:absolute;text-align:center;width:100%}.music-list-wrapper .singer-name .icon-back[data-v-77c0eaa0]{left:25px;top:0;position:absolute;display:block;height:40px;line-height:40px;font-size:22px}.music-list-wrapper .singer-name h2[data-v-77c0eaa0]{font-size:18px;line-height:40px;height:40px;padding:0 50px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.music-list-wrapper .singerAvatar[data-v-77c0eaa0]{position:relative;width:100%;height:0;background-size:cover;padding-bottom:70%;-webkit-transform-origin:top;transform-origin:top}.music-list-wrapper .singerAvatar .bg-cover[data-v-77c0eaa0]{position:absolute;width:100%;height:100%;top:0;left:0;background:rgba(7,17,27,.4)}.music-list-wrapper .singerAvatar .random-play-all-wrap[data-v-77c0eaa0]{position:absolute;left:50%;bottom:20px;-webkit-transform:translate(-50%);transform:translate(-50%);text-align:center;color:#ffcd32}.music-list-wrapper .singerAvatar .random-play-all-wrap .random-play-all-button[data-v-77c0eaa0]{-webkit-box-sizing:border-box;box-sizing:border-box;width:135px;padding:7px 0;border:1px solid #ffcd32;border-radius:100px;font-size:16px}.music-list-wrapper .song-list-bg[data-v-77c0eaa0]{background-color:#222;position:relative;top:0;left:0;height:200%;width:100%}.music-list-wrapper .scroll-song-list-part[data-v-77c0eaa0]{position:fixed;bottom:0;width:100%}.music-list-wrapper .loading-wrapper[data-v-77c0eaa0]{position:absolute;left:50%;bottom:30%;z-index:50;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}","",{version:3,sources:["C:/vue-music/vue-music/src/components/music-list/music-list.vue"],names:[],mappings:"AACA,qCACE,YAAa,AACb,WAAY,AACZ,iBAAmB,CACpB,AACD,kDACE,WAAY,AACZ,cAAe,AACf,kBAAmB,AACnB,kBAAmB,AACnB,UAAY,CACb,AACD,6DACE,UAAW,AACX,MAAO,AACP,kBAAmB,AACnB,cAAe,AACf,YAAa,AACb,iBAAkB,AAClB,cAAgB,CACjB,AACD,qDACE,eAAgB,AAChB,iBAAkB,AAClB,YAAa,AACb,eAAgB,AAChB,uBAAwB,AACxB,gBAAiB,AACjB,kBAAoB,CACrB,AACD,mDACE,kBAAmB,AACnB,WAAY,AACZ,SAAU,AACV,sBAAuB,AACvB,mBAAoB,AACpB,6BAA8B,AACtB,oBAAsB,CAC/B,AACD,6DACE,kBAAmB,AACnB,WAAY,AACZ,YAAa,AACb,MAAO,AACP,OAAQ,AACR,2BAA8B,CAC/B,AACD,yEACE,kBAAmB,AACnB,SAAU,AACV,YAAa,AACb,kCAAsC,AAC9B,0BAA8B,AACtC,kBAAmB,AACnB,aAAe,CAChB,AACD,iGACE,8BAA+B,AACvB,sBAAuB,AAC/B,YAAa,AACb,cAAe,AACf,yBAA0B,AAC1B,oBAAqB,AACrB,cAAgB,CACjB,AACD,mDACE,sBAAuB,AACvB,kBAAmB,AACnB,MAAO,AACP,OAAQ,AACR,YAAa,AACb,UAAY,CACb,AACD,4DACE,eAAgB,AAChB,SAAU,AACV,UAAY,CACb,AACD,sDACE,kBAAmB,AACnB,SAAU,AACV,WAAY,AACZ,WAAY,AACZ,uCAAyC,AACjC,8BAAiC,CAC1C",file:"music-list.vue",sourcesContent:["\n.music-list-wrapper[data-v-77c0eaa0] {\n  height: 100%;\n  width: 100%;\n  position: relative;\n}\n.music-list-wrapper .singer-name[data-v-77c0eaa0] {\n  z-index: 40;\n  color: #ffcd32;\n  position: absolute;\n  text-align: center;\n  width: 100%;\n}\n.music-list-wrapper .singer-name .icon-back[data-v-77c0eaa0] {\n  left: 25px;\n  top: 0;\n  position: absolute;\n  display: block;\n  height: 40px;\n  line-height: 40px;\n  font-size: 22px;\n}\n.music-list-wrapper .singer-name h2[data-v-77c0eaa0] {\n  font-size: 18px;\n  line-height: 40px;\n  height: 40px;\n  padding: 0 50px;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n}\n.music-list-wrapper .singerAvatar[data-v-77c0eaa0] {\n  position: relative;\n  width: 100%;\n  height: 0;\n  background-size: cover;\n  padding-bottom: 70%;\n  -webkit-transform-origin: top;\n          transform-origin: top;\n}\n.music-list-wrapper .singerAvatar .bg-cover[data-v-77c0eaa0] {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  background: rgba(7,17,27,0.4);\n}\n.music-list-wrapper .singerAvatar .random-play-all-wrap[data-v-77c0eaa0] {\n  position: absolute;\n  left: 50%;\n  bottom: 20px;\n  -webkit-transform: translate(-50%, 0);\n          transform: translate(-50%, 0);\n  text-align: center;\n  color: #ffcd32;\n}\n.music-list-wrapper .singerAvatar .random-play-all-wrap .random-play-all-button[data-v-77c0eaa0] {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  width: 135px;\n  padding: 7px 0;\n  border: 1px solid #ffcd32;\n  border-radius: 100px;\n  font-size: 16px;\n}\n.music-list-wrapper .song-list-bg[data-v-77c0eaa0] {\n  background-color: #222;\n  position: relative;\n  top: 0;\n  left: 0;\n  height: 200%;\n  width: 100%;\n}\n.music-list-wrapper .scroll-song-list-part[data-v-77c0eaa0] {\n  position: fixed;\n  bottom: 0;\n  width: 100%;\n}\n.music-list-wrapper .loading-wrapper[data-v-77c0eaa0] {\n  position: absolute;\n  left: 50%;\n  bottom: 30%;\n  z-index: 50;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n}"],sourceRoot:""}])},564:function(t,i,e){var n=e(563);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);e(550)("fd18c5bc",n,!0)},565:function(t,i,e){function n(t){e(564)}var a=e(10)(e(562),e(566),n,"data-v-77c0eaa0",null);t.exports=a.exports},566:function(t,i){t.exports={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{ref:"musicListWrapper",staticClass:"music-list-wrapper"},[e("div",{staticClass:"singer-name"},[e("i",{staticClass:"icon-back",on:{click:t.goback}}),t._v(" "),e("h2",{domProps:{innerHTML:t._s(t.title)}})]),t._v(" "),e("div",{ref:"singerAvatar",staticClass:"singerAvatar",style:t.bgStyle},[e("div",{ref:"bgCover",staticClass:"bg-cover"}),t._v(" "),t.songs.length>0?e("div",{ref:"randomPlayAllWrap",staticClass:"random-play-all-wrap"},[e("div",{staticClass:"random-play-all-button",on:{click:function(i){t.randomPlayAllMusic(t.songs)}}},[e("i",{staticClass:"icon-play"}),t._v(" 随机播放全部")])]):t._e()]),t._v(" "),e("div",{ref:"songListBg",staticClass:"song-list-bg"}),t._v(" "),e("scroll",{ref:"scrollSongList",staticClass:"scroll-song-list-part",attrs:{data:t.songs,probeType:t.probeType,listenScroll:t.listenScroll},on:{scroll:t.scroll}},[e("div",{staticClass:"song-list-wrapper"},[e("song-list",{attrs:{songs:t.songs,rank:t.rank},on:{selectEvent:t.selectItem}})],1)]),t._v(" "),t.songs.length?t._e():e("div",{staticClass:"loading-wrapper"},[e("loading")],1)],1)},staticRenderFns:[]}},570:function(t,i,e){"use strict";function n(){var t=d()({},g.c,{g_tk:135662383,uin:0,format:"json",inCharset:"utf-8",outCharset:"utf-8",platform:"h5",needNewCode:1,_:Date.now()});return m.a.get("/api/getQQSliderDataProxy",{params:t}).then(function(t){return A.a.resolve(t.data)}).catch(function(t){console.log("获取QQ轮播图数据出错",t)})}function a(){var t=d()({},g.c,{platform:"yqq",needNewCode:0});return e.i(p.a)("https://c.y.qq.com/v8/fcg-bin/fcg_first_yqq.fcg",t,g.d)}function s(){return m.a.get("/api/getWYHotSongListProxy").then(function(t){return A.a.resolve(t.data)}).catch(function(t){console.log("获取网易精品歌单数据出错",t)})}function o(t){var i=d()({},g.c,{g_tk:1733932805,uin:0,disstid:t,notice:0,type:1,json:1,utf8:1,onlysong:0,platform:"h5",hostUin:0,needNewCode:1,format:"json",outCharset:"utf-8",new_format:1,nosign:1,pic:500,_:Date.now()});return m.a.get("/api/getQQRecommendSongListDetailProxy",{params:i}).then(function(t){return A.a.resolve(t.data)}).catch(function(t){console.log(t)})}function r(t){var i={id:t};return m.a.get("/api/getWYRecommendSongListDetailProxy",{params:i}).then(function(t){return A.a.resolve(t.data)}).catch(function(t){console.log(t)})}i.c=n,i.d=a,i.e=s,i.a=o,i.b=r;var l=e(89),A=e.n(l),c=e(88),d=e.n(c),p=e(195),g=e(64),u=e(126),m=e.n(u)},582:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=e(38),a=e.n(n),s=e(565),o=e.n(s),r=e(33),l=e(570),A=e(64),c=e(127);i.default={data:function(){return{songs:[]}},computed:a()({title:function(){return this.disc&&this.disc.dissname?this.disc.dissname:this.disc&&this.disc.name?this.disc.name:void 0},bgImage:function(){return this.disc&&this.disc.imgurl?this.disc.imgurl:this.disc&&this.disc.coverImgUrl?this.disc.coverImgUrl:void 0}},e.i(r.a)(["disc","musicSourceData"])),components:{musicList:o.a},created:function(){this.disc&&this.disc.imgurl&&this._getQQRecommendSongListDetail(),this.disc&&this.disc.coverImgUrl&&this._getWYRecommendSongListDetail()},methods:{_getQQRecommendSongListDetail:function(){var t=this;if(!this.disc.dissid)return void this.$router.push("/recommend");e.i(l.a)(this.disc.dissid).then(function(i){console.log("this.disc.dissid this.disc.dissid",t.disc.dissid),A.a===i.code?(t.songs=t.optimizeQQHotSongList(i.cdlist[0].songlist),console.log(i.cdlist[0])):console.log("获取热门歌单详情数据失败：res.code不为0")}).catch(function(t){console.log("获取热门歌单详情数据失败:getQQRecommendSongListDetail",t)})},_getWYRecommendSongListDetail:function(){var t=this;if(!this.disc.id)return void this.$router.push("/recommend");e.i(l.b)(this.disc.id).then(function(i){A.b===i.code?t.songs=t.optimizeWYHotSongList(i.playlist.tracks):console.log("获取网易精品歌单详情数据失败：res.code不为200")}).catch(function(t){console.log("获取网易精品歌单详情数据失败:getWYRecommendSongListDetail",t)})},optimizeQQHotSongList:function(t){var i=this,n=[];return t.forEach(function(t){t.mid&&n.push(e.i(c.b)(i.convertSongData(t)))}),n},optimizeWYHotSongList:function(t){var i=[];return t.forEach(function(t){t.id&&i.push(e.i(c.c)(t))}),i},convertSongData:function(t){var i={};return i.songid=t.id,i.songmid=t.mid,i.singer=t.singer,i.songname=t.name,i.albumname=t.album.name,i.albummid=t.album.mid,i.interval=t.interval,i}}}},591:function(t,i,e){i=t.exports=e(549)(!0),i.push([t.i,".recomment-list-wrapper[data-v-35a44a00]{position:fixed;z-index:90;top:0;left:0;right:0;bottom:0;background:#222}.slide-enter-active[data-v-35a44a00],.slide-leave-active[data-v-35a44a00]{-webkit-transition:all .3s;transition:all .3s}.slide-enter[data-v-35a44a00],.slide-leave-to[data-v-35a44a00]{-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}","",{version:3,sources:["C:/vue-music/vue-music/src/components/recommend-list/recommend-list.vue"],names:[],mappings:"AACA,yCACE,eAAgB,AAChB,WAAY,AACZ,MAAO,AACP,OAAQ,AACR,QAAS,AACT,SAAU,AACV,eAAiB,CAClB,AACD,0EAEE,2BAA6B,AAC7B,kBAAqB,CACtB,AACD,+DAEE,wCAA2C,AACnC,+BAAmC,CAC5C",file:"recommend-list.vue",sourcesContent:["\n.recomment-list-wrapper[data-v-35a44a00] {\n  position: fixed;\n  z-index: 90;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: #222;\n}\n.slide-enter-active[data-v-35a44a00],\n.slide-leave-active[data-v-35a44a00] {\n  -webkit-transition: all 0.3s;\n  transition: all 0.3s;\n}\n.slide-enter[data-v-35a44a00],\n.slide-leave-to[data-v-35a44a00] {\n  -webkit-transform: translate3d(100%, 0, 0);\n          transform: translate3d(100%, 0, 0);\n}"],sourceRoot:""}])},603:function(t,i,e){var n=e(591);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);e(550)("c98c2bba",n,!0)},616:function(t,i){t.exports={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("transition",{attrs:{name:"slide"}},[e("div",{staticClass:"recomment-list-wrapper"},[e("music-list",{attrs:{songs:t.songs,title:t.title,"bg-image":t.bgImage}})],1)])},staticRenderFns:[]}}});
//# sourceMappingURL=1.eadd5310b06ceb7fac46.js.map