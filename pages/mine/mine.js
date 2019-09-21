const regeneratorRuntime = require("./../../utils/runtime.js");

const { isLogin } = require("./../../utils/utils.js");

let { getUserInfo, getUserMsgCount } = require('./../../service/index.js');

Page({

  data: {
    userInfo: {}, // 用户信息
    auth: {}, // 登录信息
    messageCount: 0 // 消息数量
  },

  onShow() {
    // 1. 获取本地的登录信息
    let auth = isLogin();
    this.setData({
      auth: auth
    });

    //  2. 判断用户是否登录
    if (auth) { // 已登录
      // 请求用户信息
      this.reqUserInfo();
      // 消息条数
      this.reqUserMsgCount();

    } else { // 未登录

      this.data.userInfo = {};
      this.data.messageCount = 0;
      this.setData(this.data);

    }
  },

  // 1. 获取登录的用户信息
  async reqUserInfo() {
    let {auth} = this.data;

    let res = await getUserInfo('/getUserInfo', {
      src: 'web',
      device_id: auth.clientId,
      uid: auth.userId,
      token: auth.token,
      current_uid: auth.userId
    });

    // console.log(res);

    if (res.data.s === 1 && res.data.d) {
      this.data.userInfo = res.data.d;
      this.setData(this.data);
    } else {
      wx.showToast({
        title: res.data.m,
        icon: 'none'
      });
    }
  },

  // 2. 获取用户的消息中心消息条数
  async reqUserMsgCount() {
    let { auth } = this.data;

    let res = await getUserMsgCount('/getUserNotificationNum', {
      src: 'web',
      uid: auth.userId,
      token: auth.token
    });

    // console.log(res);
    if (res.data.s === 1) {
      this.data.messageCount = res.data.d && res.data.d.notification_num;
      this.setData(this.data);
    } else {
      wx.showToast({
        title: res.data.m,
        icon: 'none'
      });
    }
  },

  // 跳转到登录页面
  jumpToLogin() {
    let url = '';
    if (!this.data.auth) { // 未登录
      url = '/pages/login/login';
    } else { // 已登录
      url = '/pages/personal/personal'
    }
    wx.navigateTo({
      url: url
    });
  }
})