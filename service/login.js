import request from './request.js';

const login = {
  // 微信登陆成功后通过 openId, sessionKey, unionId 去后台换取token
  getToken(data) {
    console.log('data', data)
    return request({
      path: '/api/wechat/login/',
      method: 'POST',
      data
    })
  },
  // 获取用户在服务器上的信息
  getUserInfo(method = 'GET') {
    let path = '/api/user/info/';
    return request({ method, path });
  },
}

module.exports = login
