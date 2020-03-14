// components/MyTabbar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    titleList:{
      type:Array,
      value:[]
    },
    currentIndex:{
      type:Number,
      value:0
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
    handleTap(event) {
      this.triggerEvent('changeCurrentIndex',event.target.dataset.index)
    }
  }
})
