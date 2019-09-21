// 验证是否登录
let isLogin = () => {
  let auth = wx.getStorageSync('auth') || {};
  if (auth.token && auth.userId) {
    return auth;
  }

  return false;
};

module.exports = {
  isLogin: isLogin
};