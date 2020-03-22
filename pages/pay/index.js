import regeneratorRuntime from '../../lib/runtime/runtime';
import { openSetting,getSetting,chooseAddress,showModal,showToast,request } from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    goodsList:[],
    totalPrice:0,
    totalNumber:0
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let userInfo = wx.getStorageSync('userInfo');
    this.setData({ userInfo })
    this.countTotalPrice()
  },
  handleAddress() {
    this.getUserAddress()
  },
  async getUserAddress() {
    try {
      let result1 = await getSetting()
      let auth =  result1.authSetting["scope.address"]
      if (auth === false) {
        await openSetting()
      }
      let result2 = await chooseAddress()
      result2.detailAddress = result2.provinceName + result2.cityName + result2.countyName + result2.detailInfo
      wx.setStorageSync('userInfo', result2);
    } catch(error) {
      console.log(error);
    }
    
  },
  countTotalPrice() {
    let goodsList = wx.getStorageSync('cart') || [];
    goodsList = goodsList.filter(v => {
      return v.checked
    })
    let totalPrice = 0;
    let totalNumber = 0;
    goodsList.forEach(v => {
      totalPrice += v.goods_price * v.goods_number
      totalNumber += v.goods_number
    });
    this.setData({ goodsList,totalPrice,totalNumber })
  },
  goPay() {
    let token = wx.getStorageSync('token')
    if(token) {

    } else {
      wx.navigateTo({
        url: '/pages/auth/index'
      });
        
    }
  }
})