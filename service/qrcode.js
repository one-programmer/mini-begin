import request from '../utils/request';

/**
 * 获取二维码
*/
const requestQRCode = (data) => {
  return request({
    path: `/api/wechat_h5/app/qrcode/`,
    method: 'POST',
    data
  })
}

module.exports = {
  requestQRCode: requestQRCode,
}
