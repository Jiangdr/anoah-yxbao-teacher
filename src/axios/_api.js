'use strict'
import API_ABSTRACT from '@/axios/_api.abstract'
import jwt from '@/axios/jwt'

class API extends API_ABSTRACT {
  fetch (url, data, type = 'post', options = {'errorTips': true, 'api': 'api2'}) {
    jwt.get();
    options['headers'] = {};
    options['headers']['authorization'] = window.bus.$store.getters['account/loginInfo']['jwt']['jwt'];
    return super.fetch(url, data, type, options);
  }
}

export default API
