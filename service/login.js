import request from '../utils/request.js';

module.exports = function(data) {
  return request({
    path: `/api/wechat/login/`,
    method: 'POST',
    data
  })
}
