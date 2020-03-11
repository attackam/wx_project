// pages/index/index.js
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
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
      success: (result) => {
        this.setData({
          swiperList:result.data.message
        })
      }
    });
  },
  // 获取导航栏数据
  getNavList() {
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems',
      success: (result) => {
        this.setData({
          navList:result.data.message
        })
      }
    });
  },
  // 获取楼层数据
  getFloorList() {
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata',
      success: (result) => {
        this.setData({
          floorList:result.data.message
        })
      }
    });
  }

})