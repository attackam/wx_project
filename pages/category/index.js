import {request} from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleList:[],
    detailList:[],
    currentIndex:0,
    scrollTop:0
  },
  resultList:[],
  // 处理左侧点击事件
  handleTap(event) {
    const {index} = event.target.dataset
    this.setData({
      currentIndex:index,
      detailList:this.resultList[index].children,
      scrollTop:0
    })
  },
  // 获取页面数据
  async getCates() {
    let res = await request({url:'/categories'})
    this.resultList = res;
    wx.setStorageSync('hmyg', {
      data:res,
      time:Date.now()
    });
    this.uploadData()
  },
  // 更新页面数据 
  uploadData(){
    let titleList = this.resultList.map(v => v.cat_name);
      this.setData({
        titleList,
        detailList:this.resultList[0].children
      })
  },
  loadData(){
    let tempData = wx.getStorageSync('hmyg')
    // 判断是否有缓存
    if(tempData) {
      // 判断缓存是否过期
      if(Date.now() - tempData.time > 1000 * 10) {
        this.getCates()
      } else {
        this.resultList = tempData.data;
        this.uploadData()
      }
    } else {
      this.getCates()
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData()
  },

})