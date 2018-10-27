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
    bindGetUserInfo(e) {
      const token = storage.getSync('token') || void 0;
      if (token) {
        // 已登陆
        this.triggerEvent('authCallback')
      } else {
        // 发起微信登陆
        this.notifyWXLogin()
      }
    },

    // 发起微信登陆
    notifyWXLogin() {
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
              this.getServiceToken(data)
            },
            fail: err => {
              console.log('wx getUserInfo err ', err)
            }
          })
        },
        fail: err => {
          console.log('wx.login: ', err)
        }
      })
    },

    // 去服务器换取 token
    getServiceToken(data) {
      login.getToken(data).then(res => {
        console.log('login.getToken', res);
        storage.setSync("token", res.data.token);
        this.setUserInfo();
      }).catch(err => {
        wx.showModal({
          title: '提示',
          content: res.errMsg,
        })
      })
    },

    // 设置用户信息
    setUserInfo() {
      login.getUserInfo().then(res => {
        app.globalData.userInfo = res.data.results;
        this.triggerEvent('authCallback');
      })
    }
  }
})
