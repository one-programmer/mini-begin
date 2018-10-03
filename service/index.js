import request from '../utils/request';

const service = {
  // GET 请求示例
  getUserInfo(method = 'GET') {
    let path = '/api/user/info/';
    return request({ method, path });
  },

  // POST 请求示例
  postRequest(data) {
    let path = '/api/activity/export/';
    let method = 'POST';
    return request({ method, path, data });
  }
}


module.exports = service;