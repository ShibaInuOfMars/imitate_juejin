Component({
  /**
   * 组件的属性列表
   */
  properties: {
    article: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    jumpToDetail(e) {
      console.log(e);
      let oId = e.currentTarget.dataset.article.objectId;
      // let type = e.currentTarget.dataset.article.type;
      wx.navigateTo({
        url: `/pages/articleDetail/articleDetail?entryIds=${oId}`
      });
    }
  }
})
