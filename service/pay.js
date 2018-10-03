import request from '../utils/request';

const pay = {
  // 充值
  recharge(data) {
    return request({
      path: `/api/order/`,
      method: 'POST',
      data
    })
  },

  // 支付
  payByWechat(data) {
    return request({
      path: `/api/wechat_h5/order/`,
      method: 'POST',
      data
    })
  },


  // 提现
  drawCash(data) {
    return request({
      path: `/api/withdraw/`,
      method: 'POST',
      data
    })
  }
}

module.exports = pay;
