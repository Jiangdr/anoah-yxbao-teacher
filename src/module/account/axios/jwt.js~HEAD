import http from './_axios'

let apis = {
  'jwt': ' https://jwt.anoah.com/get/'
}

let origin = window.location.origin
if (origin.indexOf('localhost') > -1) {
  apis.jwt = 'https://dev.anoah.com/yxp_jwt/get/'
}

let jwt = {
  params: {
    'device': 'PC_BROWSER', // [*必传项*] 访问的设备类型，定义：browser(浏览器）,u-pad(优学派)，pad(第三方pad), 教师机pc端，smartphone,ipad等，需要一起定义
    // "device": "BROWSER",//[*必传项*] 访问的设备类型，定义：browser(浏览器）,u-pad(优学派)，pad(第三方pad), 教师机pc端，smartphone,ipad等，需要一起定义
    'module': 'SCHOOL_ACTIVITY', // [*必传项*] 定义访问的模块，包括“网站”，“教师端服务”，“教师客户端”，“优学帮”等，需要一起定义
    'version': 'v1.0', // [*必传项*] module版本号
    'timestamp': '', // [*必传项*]客户端时间戳
    'MAC': '', // （可选项）客户端网卡MAC地址
    // "machineid"//(可选性)客户端机身编号
    'UUID': ''// (可选项)，设备的UUID,如果是普通的浏览器或者获取不到，则为空
    // "username":"yunheke",//(可选项)，如要获取带用户身份的jwt需要传递
    // "password":"111111",//(可选项)，如果传递了username,则password必须传递
    // "jwtusertoken": true //需要返回刷新jwt的token，只有当传入了username和password此项才能设为true
  },
  // 返回参数
  data: {
    jwt: '',
    jwtusertoken: ''
  }
}

export default{

  getJWT (loginnm, password) {
    jwt.params.timestamp = new Date().getTime() / 1000
    jwt.params.username = loginnm
    jwt.params.password = password

    if (loginnm || password) {
      delete jwt.params.jwtusertoken
      // jwt.params.jwtusertoken = false;
    }
    // console.log('params ', jwt.params)
    return http.post(apis.jwt, jwt.params)
  }
}
