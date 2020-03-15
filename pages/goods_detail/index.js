import {request} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_id:0,
    goodsData:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id} = options
    this.setData({
      goods_id
    })
    this.getDetailData()
  },
  getDetailData() {
    request({
      url:'/goods/detail',
      data:{
        goods_id:this.data.goods_id
      }
    }).then(res => {
      this.setData({
        goodsData:res.data.message
      })
      
    })
  },
  handleTap(event) {
    const urls = this.data.goodsData.pics.map(v => v.pics_mid_url)
    const {current} = event.currentTarget.dataset
    wx.previewImage({
      current,
      urls
    }); 
  },
  handleAddGoods() {
    
    let cartData = wx.getStorageSync('cart') || [];
    let index = cartData.findIndex(v => {
      return v.goods_id === this.data.goodsData.goods_id
    });
    
    
    if (index === -1) {
      const {goods_id,goods_name,goods_price,goods_small_logo} = this.data.goodsData
      cartData.push({
        goods_id,
        goods_name,
        goods_price,
        goods_number:1,
        goods_image:goods_small_logo
      })
    } else {
      cartData[index].goods_number++
    }
    wx.setStorageSync('cart',cartData)
    wx.showToast({
      title: '加入购物车成功',
      icon: 'success'
    });
      
  }

  
})