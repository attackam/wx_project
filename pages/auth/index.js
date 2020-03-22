import regeneratorRuntime from '../../lib/runtime/runtime';
import { login, request } from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  async handleUserInfo(e) {
    try {
      const {rawData,signature,iv,encryptedData} = e.detail
      let res = await login()
      const {code} = res
      let tokenParams = {rawData,signature,iv,encryptedData,code}
      request({url:"/users/wxlogin", method:"post", data:tokenParams}).then(res => {
        console.log(res);
        
      }).catch(err => {
        console.log(err);
        
      })
      console.log(res2);
    } catch (error) {
      console.log(error);
      
    }
    
    
      
  }, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})