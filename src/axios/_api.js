'use strict'
import API_ABSTRACT from '@/axios/_api.abstract'
import jwt from '@/axios/jwt'
import stroage from '@/store/stroage'
// import router from '@/router/index'

class API extends API_ABSTRACT {
  refreshAuthFetch(url, data, type = 'post', options = { 'errorTips': true, 'api': 'api2' }) {
    options = Object.assign({ 'errorTips': true, 'api': 'api2', 'auth': true }, options);
    return jwt.apiAuth().then(r => {
      options['headers'] = {};
      options['headers']['authorization'] = jwtToken;
      // 再调一次接口
      return super.fetch(url, data, type, options);
    }, j => {
      alert('去登录');
      return Promise.reject(j);
    });
  };

  authFetch(url, data, type = 'post', options = { 'errorTips': true, 'api': 'api2' }) {
    options = Object.assign({ 'errorTips': true, 'api': 'api2', 'auth': true }, options);
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
        return this.refreshAuthFetch();
      });
    } else {
      // 没有jwt
      return this.refreshAuthFetch();
    }
  };

  fetch(url, data, type = 'post', options = { 'errorTips': true, 'api': 'api2', 'auth': true }) {
    options = Object.assign({ 'errorTips': true, 'api': 'api2', 'auth': true }, options);
    if (!options['auth']) {
      return super.fetch(url, data, type, options);
    } else {
      return this.authFetch(url, data, type, options);
    }
  };
}

export default API
