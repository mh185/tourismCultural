// pages/live/index.js
var app = getApp();
const host=app.globalData.host;
const iconUrl = app.globalData.iconUrl;
import { getPlaybackList} from '../../../utils/api/live'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    keyword: '',
    iconUrl:iconUrl,
    leftArrow:true,
    listData:[],//直播列表
    host:host
  },
  toRadio:function(ev){

   let id=ev.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/index/column-replay/replay-radio/index?id=${id}`,
    })
  },
  onClickLeft() {
    wx.switchTab({
      url: '/pages/index/index',
      success:function(){
        wx.showTabBar()
      }
    })
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
    this.getList()
  },
  getList:function(){
    const params = {
      page: this.data.page,
      keyword: this.data.keyword,
    }
    getPlaybackList(params).then(res=>{
      console.log(res);
      if(res.code==200){
        this.setData({
          listData:res.data.rows
        })
      }else{
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 1500,
      })
      }
    })
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
    wx.showToast({
      title: '没有更多了',
      icon:"loading"
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})