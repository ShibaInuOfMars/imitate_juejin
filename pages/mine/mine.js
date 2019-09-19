// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  // 跳转到登录页面
  jumpToLogin() {
    wx.navigateTo({
      url: '/pages/login/login'
    });
  }
})