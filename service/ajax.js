function myAjax(options) {
  // 判断参数的类型
  if (typeof options === 'string') {
    let url = options;
    options = {
      url
    };
  }

  return new Promise((resolve, reject) => {
    wx.request({
      url: options.url,
      data: options.data,
      method: options.method,
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        wx.showToast({
          title: '网络异常，请稍后再试',
        });
      }
    });
  });
}

module.exports = {
  myAjax: myAjax
};