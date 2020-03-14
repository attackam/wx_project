import {request} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleList:[
      {id:0,text:"综合"},
      {id:1,text:"销量"},
      {id:2,text:"价格"}],
    currentIndex:0,
    goodsList:[],
    noMore:false
  },
  // 全局变量，页面渲染用不到的数据放在这里
  requestParams:{
    query:'',
    cid:'',
    pagenum:1,
    pagesize:10
  },
  totalNum:0,
  changeCurrentIndex(event) {
    this.setData({
      currentIndex:event.detail
    })
  },
  getGoodsList(){
    request({
      url:'/goods/search',
      data:this.requestParams
    }).then(res => {
      const newGoodsList = res.data.message.goods
      const oddGoodsList = this.data.goodsList
      const {total} = res.data.message
      this.totalNum = Math.ceil(total / this.requestParams.pagesize)
      this.setData({
        goodsList:[...oddGoodsList,...newGoodsList]
      })
      wx.stopPullDownRefresh()
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {cid} = options
    this.requestParams.cid = cid
    this.getGoodsList()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.requestParams.pagenum = 1;
    this.setData({
      goodsList:[],
      noMore:false
    })
    this.getGoodsList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if ( this.requestParams.pagenum >= this.totalNum )  {
      wx.showToast({
        title: '没数据啦',
        icon: 'none'
      });       
      this.setData({
        noMore:true
      })
    } else {   
      this.requestParams.pagenum++
      this.getGoodsList()
    }
  }
})