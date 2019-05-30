'use strict'

import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? '' : '/api';

const Axios = axios.create({
  timeout: 5000,
  responseType: "json",
  withCredentials: true, // 是否允许带cookie
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
  }
});



Axios.interceptors.request.use(//请求前

  config => {
    if (window.localStorage.Token) { //store.state.token 获取不到值
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = "Bearer " + window.localStorage.Token;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
  // config => {
  //   if (config.method === "post") {
  //     // config.data = qs.stringify(config.data);
  //     if(config.url !== "/notice/manage/add"){
  //       config.data = qs.stringify(config.data);
  //     }
      
  //   }
  //   return config;
  // },
  // error => {
  //   Message({
  //     showClose: true,
  //     message: "请求超时",
  //     type: 'warning'
  //   });
  //   return Promise.reject(error);
  // }
)

Axios.interceptors.response.use(//处理数据
  res => {
    if(res.data.code == 'S0000'){
      return res;
    }else if(res.data.code == 'N0008'){// 登录失败或未登录
      // router.push({name:'Login'});
    }else{
      return res;//用hw_result处理，如需特殊处理则不引用
    }
  },
  error => {
    if (error.response.status === 403) {
      Message({
        message :'服务器拒绝请求',
        type: 'error'
      });
    }
    if (error.response.status === 500) {
        Message({
          message: '服务器错误',
          type: 'error'
        });
    }
    if (error.response.status === 504) {
        Message({
          message: '链接服务器超时',
          type: 'error'
        });
    }
    if (error.response.status === 404) {
         Message({
           message: '找不到请求的网页',
           type: 'error'
         });
    }

    // 返回 response 里的错误信息
    let errorInfo = error;
    return Promise.reject(errorInfo);
  }
)

export default Axios
