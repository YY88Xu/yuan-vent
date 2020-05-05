// component/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like: {
      type: Boolean,
      default: false
    },
    count: {
      type: Number,
      default: 0
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    yesImg: 'images/like.png',
    noImg: 'images/like@dis.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onlike(){
      let like = this.properties.like;
      let count = this.properties.count;
      count = like ? count-1 : count+1;
      this.setData({
        like: !like,
        count: count
      })

      let behavior = this.properties.like ? 'like' : 'cancel';
      this.triggerEvent('like', { 'behavior': behavior}, {});
    }
  }
})
