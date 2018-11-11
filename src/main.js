import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { Notification } from 'element-ui';


import 'common/stylus/index.styl'

import store from './store/index'

import VueLazyLoad from 'vue-lazyload'

Vue.use(ElementUI);

Vue.config.productionTip = false

// 请求拦截器
axios.interceptors.request.use((request) => {
  // console.warn('成功的请求拦截器==',request.url)
  return request
}, (error) => {
  alert(`${error.config.url}请求败，请检查参数是否正确。原因${error}`)


  // Notification.error({
  //   title: '错误',
  //   message: `${error.config.url}请求败，请检查参数是否正确。原因${error}`,
  //   duration: 6000,
  // });
  // console.log(error.config.url, '后端接口响应失败，请刷新浏览器重试。错误原因')
  return Promise.resolve(error);
});


// 响应拦截器
axios
  .interceptors
  .response
  .use((response) => {
  // alert('响应拦截器==chenggong'+response);
  // console.warn('成功的响应拦截器1==',response.request.responseURL)
    // `${daZhuanpanApi}/v1/award/export`
    // 如果不是大转盘的领取详情导出或七牛上传图片的接口
    // if (response.config.url !== `${daZhuanpanApi}/v1/award/export` && response.config.url !== `${daZhuanpanApi}/v1/matchaward/export` && response.config.url !== 'http://up.qiniu.com') {
    //   // 如果请求errno不等于0，则弹出错误原因
    //   if (parseInt(response.data.errno, 10) !== 0) {
    //     console.log(response, 'response');
    //     Notification.error({
    //       title: '错误',
    //       message: `${response.config.url}:${response.data.errmsg},errno:${response.data.errno}`,
    //       duration: 5000,
    //     });
    //   }
    // }
    return response;
  }, (error) => {
  // alert('响应失败拦截了'+error)
    if (!error.response) {
      Notification.error({
        title: '错误',
        message: `${error.config.url}响应失败，请刷新浏览器重试。原因${error}`,
        duration: 5000,
      });
      // Notification.error({
      //   title: '错误',
      //   message: `${error.config.url}响应失败，请刷新浏览器重试。原因${error}`,
      //   duration: 6000,
      // });
      // console.log(error.config.url, '后端接口响应失败，请刷新浏览器重试。错误原因')
      return Promise.resolve(error);
    }
    switch (error.response.status) {
      case 400:
        Notification.error({
          title: '错误',
          message: `${error.response.status}传递参数出现错误:${error.response.data}`,
          duration: 5000,
        });
        break;
      case 401:
        Notification.error({
          title: '错误',
          message: '登录信息过期，跳转登陆页401',
          duration: 5000,
        });
        break;
      case 403:
        Notification.error({
          title: '错误',
          message: '您没有权限进行此操作403',
          duration: 5000,
        });
        break;
      case 404:
        console.log('40444444444444');
        alert('404')
        Notification.error({
          title: '错误',
          message: '接口网址未找到404',
          duration: 5000,
        });
        break;
      case 500:
        Notification.error({
          title: '错误',
          message: '后端服务器内部错误500',
          duration: 5000,
        });
        break;
      case 501:
        Notification.error({
          title: '错误',
          message: '服务器不具备完成请求的功能(如无法识别请求方法)501',
          duration: 5000,
        });
        break;
      case 502:
        Notification.error({
          title: '错误',
          message: '错误网关，收到无效响应502',
          duration: 5000,
        });
        break;
      case 503:
        Notification.error({
          title: '错误',
          message: '后端服务暂不可用(超载或停机维护)503',
          duration: 5000,
        });
        break;
      case 504:
        Notification.error({
          title: '错误',
          message: '网关超时504',
          duration: 5000,
        });
        break;
      case 505:
        Notification.error({
          title: '错误',
          message: 'HTTP 版本不受支持505',
          duration: 5000,
        });
        break;
      default:
        Notification.error({
          title: '错误',
          message: `错误码:${error.response.status}错误原因: ${error.response.data} 未知错误！`,
          duration: 5000,
        });
        return Promise.reject(error);
    }

    alert('监测到响应失败，请尝试刷新浏览器。错误原因为'+error);
    console.log('监测到响应失败，错误原因为:',error);
    return error;
  });

fastclick.attach(document.body)

Vue.use(VueLazyLoad, {
  loading: require('common/image/loading.svg')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  axios,
  render: h => h(App)
})
