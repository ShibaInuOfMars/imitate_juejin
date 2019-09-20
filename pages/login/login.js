// 解决不支持async/await
const regeneratorRuntime = require("./../../utils/runtime.js");

let {userLogin} = require('./../../service/index.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: ''
  },

  // 同步账号
  saveUserName(e) {
    this.data.username = e.detail.value;
    this.setData(this.data);
  },

  // 同步密码
  savePassWord(e) {
    this.data.password = e.detail.value;
    this.setData(this.data);
  },

  // 发送登录请求
  async submitOfLogin() {
    let {username, password} = this.data;
    // 1. 判断用户名和密码是否为空
    if (!username.replace(' ', '')) {
      wx.showToast({
        title: '请输入手机号码或邮箱',
        icon: 'none'
      });
      return;
    }

    if (!password.replace(' ', '')) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none'
      });
      return;
    }

    // 2. 判断登录类型
    wx.showLoading({
      title: '登录中',
    });

    let res = null;
    if (username.indexOf('@') === -1) { // 手机号登录
      res = await userLogin('phoneNumber', {username, password});
    } else { // 邮箱登录
      res = await userLogin('email', {username, password});
    }

    // 3. 判断请求返回结果
    console.log(res);
    if (res.statusCode === 404) {
      wx.hideLoading();
      wx.showToast({
        title: '用户名不存在',
        icon: 'none'
      });
      return;
    } else if (res.statusCode === 401) {
      wx.hideLoading();
      wx.showToast({
        title: '用户名或密码错误',
        icon: 'none'
      });
      return;
    } else if (res.statusCode !== 200) {
      x.hideLoading();
      wx.showToast({
        title: '网络出了点问题哟~',
        icon: 'none'
      });
      return;
    }

    // 4. 登录成功
    wx.hideLoading();
    wx.showToast({
      title: '登录成功',
      icon: 'success'
    });

    // 5. 将数据存在到本地
    wx.setStorageSync('auth', {
      token: res.data.token,
      userId: res.data.userId,
      clientId: res.data.clientId
    });

    // 6. 返回到我的界面
    wx.navigateBack({});
  }
})