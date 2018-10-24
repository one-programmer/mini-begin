// pages/click/click.js
import { throttle } from '../../utils/index.js'

var timer;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isManyTimes: false,
    timer: false
  },

  disabledHandle(e) {
    console.log('manyTimesClick: ', e);
    this.setData({
      isManyTimes: true
    })
    this.goLogs();
  },


  touchStart(e) {
    console.log(e)
    this.touchStartTime = e.timeStamp;
  },
  touchEnd(e) {
    console.log(e)
    this.touchEndTime = e.timeStamp;
  },
  newTapHandle(e) {
    console.log(e);
    // 控制点击事件在350ms内触发，加这层判断是为了防止长按时会触发点击事件
    if (this.touchEndTime - this.touchStartTime < 350) {
      // 当前点击的时间
      var currentTime = e.timeStamp;
      var lastTapTime = this.lastTapTime;

      // 更新最后一次点击时间
      this.lastTapTime = currentTime;

      // 如果两次点击时间在300毫秒内，则认为是多次事件
      if (currentTime - lastTapTime > 250) {
        // do something 点击事件具体执行那个业务
        console.log('双击')
        this.goLogs();
      }
    }
  },



  setTimeoutHandle(e) {
    console.log(e)
    const {timer} = this.data;

    if (timer) clearTimeout(timer);

    this.setData({
      timer: setTimeout(() => {
        console.log('Single');
        this.goLogs();
      }, 250)
    })
    
  },

  throttleHandle: throttle(function(e) {
    console.log('manyTimesClick: ', e);
    // this.goLogs();
  }, 1000),

  goLogs() {
    wx.navigateTo({
      url: '/pages/logs/logs',
    })
  }

})