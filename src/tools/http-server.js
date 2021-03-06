import axios from 'axios'
import store from '../store/index';
import { Message } from 'element-ui'
import router from '../router'

axios.defaults.timeout = 10000;
axios.defaults.baseURL = 'https://www.guangyi009.com'; //填写域名
// axios.defaults.baseURL = 'http://3d98c952.ngrok.io'; //填写域名
// axios.defaults.baseURL = '/api'; //填写域名  

//http request 拦截器
axios.interceptors.request.use(
   config => {
      let user_token = 
            store.getters.user_token || 
            localStorage.getItem('token') ? 
            localStorage.getItem('token') : 
            '';
      config.headers['Content-Type'] = 'application/json;charset=UTF-8'
      if (user_token) {
         config.headers.common['Authorization'] = "Bearer " + user_token;
      }else{
         // router.push({ name: 'home' })
      }
      return config;
   },
   error => {
      return Promise.reject(err);
   }
);

//响应拦截器即异常处理
axios.interceptors.response.use(response => {
   if ( response.data.code != 200 ){
     
      if (response.data.code == 502 || response.data.code == 501) {
         Message({
            message: '登录已过期,请重新登录',
            type: 'error',
            duration: 3 * 1000
         })
         localStorage.clear()
         router.push({ name: 'home' })
      } else
      if (response.data.code == 503) {
         Message({
            message: response.data.msg || 'Error',
            type: 'error',
            duration: 3 * 1000
         })
         localStorage.clear()
         router.push({ name: 'home' })
      } else
      if (response.data.code == 500) {
         Message({
            message: response.data.msg || 'Error',
            type: 'error',
            duration: 3 * 1000
         })
      }
   }
   
   return response
}, err => {
   if (err && err.response) {
      switch (err.response.status) {
         case 400:
            console.log('错误请求')
            break;
         case 401:
            console.log('未授权，请重新登录')
            break;
         case 403:
            console.log('拒绝访问')
            break;
         case 404:
            console.log('请求错误,未找到该资源')
            break;
         case 405:
            console.log('请求方法未允许')
            break;
         case 408:
            console.log('请求超时')
            break;
         case 500:
            console.log('服务器端出错')
            break;
         case 501:
            console.log('网络未实现')
            break;
         case 502:
            console.log('网络错误')
            break;
         case 503:
            console.log('服务不可用')
            break;
         case 504:
            console.log('网络超时')
            break;
         case 505:
            console.log('http版本不支持该请求')
            break;
         
         default:
            console.log(`连接错误${err.response.status}`)
      }
   } else {
      Message({
         message: '连接到服务器失败',
         type: 'error',
         duration: 3 * 1000
      })
   }
   return Promise.resolve(err.response)
})

export function get(url, params = {}) {
   return new Promise((resolve, reject) => {
      axios.get(url, {
         params: params
      })
      .then(response => {
         resolve(response.data);
      })
      .catch(err => {
         reject(err)
      })
   })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
   return new Promise((resolve, reject) => {
      axios.post(url, data)
         .then(response => {
            if (response){
               resolve(response.data);
            }else{
               reject('连接错误')
            }
         }, err => {
            reject(err)
         })
   })
}

//上传图片的方法
export function imgUpload(url, data) {
   return new Promise((resolve, reject) => {
      axios.post(url, data)
      .then(res => {
         resolve(res.data);
      }).catch(err => {
         reject(err)
      })
   })
   
};