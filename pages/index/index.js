const regeneratorRuntime = require("./../../utils/runtime.js");

let { getHotRecommend } = require('./../../service/index.js');

Page({

  data: {
    page_size: 20, // 上拉每次添加的条数
    articleList: [] // 文章数据
  },

  onShow() {
    // 没有数据的时候才加载
    if (this.data.articleList.length === 0) {
      this.reqArticleData(true);
    }
  },

  // 请求文章列表数据
  async reqArticleData(flag) {
    let articleList = this.data.articleList;
    let beforeIndex = null;

    // 1. 判断是上拉还是下拉
    if (flag || articleList.length === 0) { // 下拉
      beforeIndex = '';
    } else { // 上拉
      beforeIndex = articleList.slice(-1)[0].verifyCreatedAt || '';
    }
    
    wx.showLoading({
      title: '加载中',
    });

    // 发送请求
    let res = await getHotRecommend('/get_entry_by_timeline', {
      limit: this.data.page_size,
      before: beforeIndex
    });

    if (res.data.s === 1) {
      if (flag) {
        this.data.articleList = [...res.data.d.entrylist];
        this.setData(this.data);
        wx.hideLoading();
        wx.stopPullDownRefresh();
      } else {
        this.data.articleList = [...this.data.articleList, ...res.data.d.entrylist];
        this.setData(this.data);
        wx.hideLoading();
      }
    } else {
      wx.hideLoading();
      wx.showToast({
        title: res.data.m,
        icon: 'none'
      });
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.reqArticleData(true);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.reqArticleData(false);
  }
})