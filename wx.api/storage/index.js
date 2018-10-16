// 重写 storage api
// class Storage {
//   setSync(key, value) {
//     console.log(key, value)
//     // try {
//     //   wx.setStorageSync(key, value)
//     // } catch (e) {
//     //   wx.showToast({
//     //     title: `设置${key}失败`,
//     //   })
//     // }
//   }
// }

const Storage = {
  setSync(key, value) {
    console.log(key, value)
    // try {
    //   wx.setStorageSync(key, value)
    // } catch (e) {
    //   wx.showToast({
    //     title: `设置${key}失败`,
    //   })
    // }
  }
}

module.exports = Storage;
