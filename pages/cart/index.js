import regeneratorRuntime from '../../lib/runtime/runtime';
import { openSetting,getSetting,chooseAddress,showModal,showToast } from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    goodsList:[],
    allChecked:true,
    totalPrice:0,
    totalNumber:0
  },
  handleAddress() {
    this.getUserAddress()
  },
  handleCheckedChange(event) {
    let {goodsList} = this.data
    const {index} = event.target.dataset
    goodsList[index].checked = !goodsList[index].checked
    this.setData({
      goodsList
    })
    wx.setStorageSync('cart',goodsList)
    this.countTotalPrice()
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
  async changeGoodsNumber(event) {
    let {goodsList} = this.data
    const {index,type} = event.target.dataset
    if(goodsList[index].goods_number === 1 && type === -1) {
      let res = await showModal({
        title: '提示',
        content: '您确定要删除此商品吗？',
        showCancel: true,
        cancelText: '取消',
        confirmText: '确定'
      })
      if (res) {
        goodsList.splice(index,1)
        this.setData({
          goodsList
        })
        wx.setStorageSync('cart',goodsList)
      }
    } else {
      
      goodsList[index].goods_number += type
      this.setData({
        goodsList
      })
      wx.setStorageSync('cart',goodsList)
    }
    this.countTotalPrice()
    
  },
  countTotalPrice() {
    let goodsList = wx.getStorageSync('cart') || [];
    let totalPrice = 0;
    let totalNumber = 0;
    let allChecked = true
    goodsList.forEach(v => {
      if (v.checked) {
        totalPrice += v.goods_price * v.goods_number
        totalNumber += v.goods_number
      } else {
        allChecked = false
      }
    });
    allChecked = goodsList.length === 0 ? false : allChecked
    this.setData({ goodsList,totalPrice,totalNumber,allChecked })
  },
  goPay() {
    const {userInfo,totalNumber} = this.data
    if(!userInfo.detailAddress) {
      showToast({
        title: '请先填写收货地址',
        icon: 'none'
      })
      return
    }
    if(totalNumber === 0) {
      showToast({
        title: '请先选择商品',
        icon: 'none'
      })
      return
    }
    wx.navigateTo({
      url: '/pages/pay/index'
    });
      
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let userInfo = wx.getStorageSync('userInfo');
    this.setData({ userInfo })
    this.countTotalPrice()
  }
})