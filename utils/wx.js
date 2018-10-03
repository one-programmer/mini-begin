const downloadFile = (date) => {
  wx.downloadFile({
    url: detail.images[0],
    success(res) {
      console.log('我是下载的图片：' + res.tempFilePath);
    },
    fail() {},
    complete() {

    }
  })
}

module.exports = {
  downloadFile: downloadFile,
}
