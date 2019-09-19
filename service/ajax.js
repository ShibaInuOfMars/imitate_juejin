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
      url: url,
      data: options.data,
      method: options.method,
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}

module.exports = {
  myAjax: myAjax
};