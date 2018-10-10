// components/Authorization/Authorization.js

import login from '../../service/login.js'
import storage from '../../utils/storage.js'

var app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 允许授权后回调
    bindGetUserInfo: function (e) {
      const token = storage.getSync('token') || void 0;
      console.log('token==', token)
      if (token) {
        this.triggerEvent('authCallback')
      } else {
        this.wxLogin()
      }
    },

    // 发起微信登陆
    wxLogin: function () {
      wx.login({
        timeout: 5000,
        success: result => {
          // 发送resultres.code 到后台换取 openId, sessionKey, unionId
          console.log(result);
          // 获取微信服务器上的用户信息
          wx.getUserInfo({
            success: res => {
              console.log('wx.getUserInfo', res);
              const data = {
                code: result.code,
                encryptedData: res.encryptedData,
                iv: res.iv,
              }
              // 去自己的服务器换取 token
              login.getToken(data).then(res => {
                console.log('login.getToken', res);
                // storage.setSync("token", res.data.token);
                this.triggerEvent('authCallback');
                // this.setUserInfo();
              }).catch(err => {
                wx.showModal({
                  title: '提示',
                  content: res.errMsg,
                })
              })
            },
            fail: err => {
              console.log('err ', err)
            },
            complete: () => {
              console.log('complete')
            }
          })
        },
        fail: err => {
          console.log('err ', err)
        },
        complete: () => {
          console.log('complete')
        }
      })
    },
  }
})
