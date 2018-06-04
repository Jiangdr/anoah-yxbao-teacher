'use strict'
import API_ABSTRACT from '@/axios/_api.abstract'
import jwt from '@/axios/jwt'
import stroage from '@/store/stroage'
// import router from '@/router/index'

class API extends API_ABSTRACT {
  fetch(url, data, type = 'post', options = { 'errorTips': true, 'api': 'api2' }) {
    let jwtToken = stroage['persistent'].get('jwt.jwt');
    // 有jwt
    if (jwtToken) {
      options['headers'] = {};
      options['headers']['authorization'] = jwtToken;
      return super.fetch(url, data, type, options).then(r => {
        return r;
      },
        // jwt失效
      j => {
        return jwt.apiAuth().then(r => {
          // 再调一次接口
          return super.fetch(url, data, type, options);
        }, j => {
          alert('去登录');
          return Promise.reject(j);
        });
      });
    } else {
      // 没有jwt
      return jwt.apiAuth().then(r => {
        // 再调一次接口
        return super.fetch(url, data, type, options);
      }, j => {
        alert('去登录');
        return Promise.reject(j);
      });
    }
  }
}

export default API
