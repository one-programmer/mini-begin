import apiUrl from '../config/index'

const uploadFile = (filePath) => {
  
  return new Promise((resolve, reject) => {

    wx.showToast({
      icon: "loading",
      title: "正在上传"
    })

    wx.uploadFile({
      url: `${apiUrl}/api/upload/`,
      method: 'POST',
      header: {
        'content-type': "multipart/form-data"
      },
      filePath: filePath,
      name: 'file',
      formData: {
        douploadpic: '1'
      },
      success: function (res) {
        const data = res.data
        resolve(data)
        wx.hideToast();   //隐藏Toast
      },
      fail: function (res) {
        wx.showModal({
          title: '提示',
          content: '上传失败',
          showCancel: false
        })
        reject(res);
      },
      complete: function() {
        
      }
    })
  })
};

module.exports = uploadFile;