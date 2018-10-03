import api from '../config/index'
import storage from './storage.js'

/**
 * https://redpacket.xiaoyanzhang.com 接口调用通用函数
 * @param {Object} options  详情见下面注释
 *  optiosn.method      defalut: 'GET'  请求的方法，需大写
 *  options.body        defalut: {}     业务，GET 请求参数中的 body 参数，即 data.body
 *  optison.functionId  defalut: ''     接口标识, 网关需要
 * @return {Promise}        wx.request
 */

const request = ({
  path,
  method = 'GET',
  data = {},
}) => { 
  const url = `${api}{path}`;

  const token = storage.getSync('token');

  const header = {
    'Content-Type': 'application/json',
    'TOKEN': token,
  };

  return new Promise((resolve, reject) => {
    wx.request({
      url,
      method,
      header,
      data,
      success: function(res) {
        if (res.statusCode == 401) {
          storage.setSync("token", "");
          wx.switchTab({
            url: '/pages/mine/index',
          })
          return
        }
        resolve(res)
      },
      fail: function(res) {
        wx.showToast({
          title: '系统异常请稍后重试！',
          icon: 'none',
        })
        reject(res);
      },
      complete: function() {
        console.log('complete');
      }
    })
  })
};

module.exports = request;
