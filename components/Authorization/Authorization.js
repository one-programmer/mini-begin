import wechatLogin from '../../service/login.js'
import service from '../../service/index.js'
import storage from '../../utils/storage.js'

var app = getApp();

Component({
  properties: {},
  data: {},
  methods: {
    bindGetUserInfo: function (e) {
      const token = storage.getSync('token') || void 0;
      console.log('token==', token)
      if (token) {
        this.triggerEvent('authCallback')
      } else {
        this.wxLogin()
      }
    },

    wxLogin: function() {
      var _this = this
      wx.login({
        success: result => {
          // 发送resultres.code 到后台换取 openId, sessionKey, unionId
          console.log("wx login result:" + result);
          wx.getUserInfo({
            success: res => {
              const data = {
                code: result.code,
                encryptedData: res.encryptedData,
                iv: res.iv,
              }

              wechatLogin(data).then(res => {
                storage.setSync("token", res.data.token);
                _this.triggerEvent('authCallback');
                _this.setUserInfo();
              }).catch(err => {
                wx.showModal({
                  title: '提示',
                  content: res.errMsg,
                })
              })
            }
          })
        }
      })
    },

    // 设置用户信息
    setUserInfo() {
      service.getUserInfo().then(res => {
        app.globalData.userInfo = res.data.results;
      })
    },
    wechatLogin() {
    }
  }
})


// import wechatLogin from '../../service/login.js'
// import storage from '../../utils/storage.js'

// var app = getApp();

// Component({
//   properties: {},
//   data: {},
//   methods: {
//     bindGetUserInfo: function (e) {
//       const token = storage.getSync('token') || void 0;
//       console.log('token==', token)
//       if (token) {
//         this.triggerEvent('authCallback')
//       } else {
//         this.wxLogin()
//       }
//     },
//     wxLogin: function () {
//       var _this = this
//       wx.login({
//         success: result => {
//           // 发送resultres.code 到后台换取 openId, sessionKey, unionId
//           console.log("wx login result:" + result);
//           this.wxGetUserInfo();
//         }
//       })
//     },
//     // 获取用户信息
//     wxGetUserInfo() {
//       console.log('wxGetUserInfo====')
//       wx.getUserInfo({
//         success: res => {
//           const data = {
//             code: result.code,
//             encryptedData: res.encryptedData,
//             iv: res.iv,
//           };
//           this.wechatLogin(data);
//         }
//       })
//     },
//     /**
//      * 请求咱们自己的服务器换取token
//      * @parma code, encryptedData, iv
//     */
//     wechatLogin(data) {
//       wechatLogin(data).then(res => {
//         console.log('*************************', res.data.result.token)
//         storage.setSync("token", res.data.result.token);
//         _this.triggerEvent('authEvent')

//       })
//         .catch(err => {
//           wx.showModal({
//             title: '提示',
//             content: res.errMsg,
//           })
//         })
//     }
//   }
// })
