const regeneratorRuntime = require("./../../utils/runtime.js");

let { getArticleDesc, getArticleContent } = require('./../../service/index.js');

const WxParse = require('./../../wxParse/wxParse.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    entryList: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let entryIds = options.entryIds;

    this.reqDesc(entryIds);

    this.reqContent(entryIds);
  },

  // 请求摘要
  async reqDesc(id) {
    let res = await getArticleDesc('/get_entry_by_ids', { entryIds: id });
    // console.log(res);

    if(res.data.s === 1) {
      this.data.entryList = res.data.d.entrylist;
      this.setData(this.data);
    } else {
      wx.showToast({
        title: res.data.m,
        icon: 'none'
      });
    }
  },

  // 请求正文
  async reqContent(id) {
    let res = await getArticleContent('/getEntryView', { entryId: id });
    // console.log(res);

    if (res.data.s === 1) {
      let content = res.data.d.content;
      WxParse.wxParse('article', 'html', content, this);
    } else {
      wx.showToast({
        title: res.data.m,
        icon: 'none'
      });
    }
  }
})