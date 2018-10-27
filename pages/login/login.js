// pages/login/login.js
import { testFun } from '../../utils/index.js'

var app = getApp();

Page({

  data: {
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onLoad: function (options) {
    console.log('app', app)
  },

  authCallback() {
    this.goBackHome();
  },

  goBackHome() {
    wx.navigateTo({
      url: '/pages/index/index',
    })
  }

})