
const storage = {
  set: function (key, value, expires) {
    wx.setStorage({
      key: key,
      data: value
    })
  },

  get: function(key) {
    wx.getStorage({
      key: key,
      success: function (res) {
        console.log(res.data)
        return res.data;
      }
    })
  },
  
  remove: function(key){

  },

  setSync: function (key, value) {
    console.log(key, value)
    try {
      wx.setStorageSync(key, value)
    } catch (e) {
      wx.showToast({
        title: `设置${key}失败`,
      })
    }
  },

  getSync: function(key) {
    let value;
    try {
      return wx.getStorageSync(key)
    } catch (e) {
      wx.showToast({
        title: `获取${key}失败`,
      })
    }
  },

  removeSync: function (key) {
    try {
      wx.removeStorageSync(key);
    } catch (e) {
      wx.showToast({
        title: `移除${key}失败`,
      })
    }
  },
};

module.exports = storage;
