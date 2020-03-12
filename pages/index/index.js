
import {request} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList:[],
    navList:[],
    floorList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.getSwiperList()
   this.getNavList()
   this.getFloorList()
  },
  // 获取轮播图数据
  getSwiperList() {
    request({
      url:'/home/swiperdata',
    }).then(result => {
      this.setData({
        swiperList:result.data.message
      })
    })
  },
  // 获取导航栏数据
  getNavList() {
    request({
      url:'/home/catitems',
    }).then(result => {
      this.setData({
        navList:result.data.message
      })
    })
  },
  // 获取楼层数据
  getFloorList() {
    request({
      url:'/home/floordata',
    }).then(result => {
      this.setData({
        floorList:result.data.message
      })
    })
  }

})