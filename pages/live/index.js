// pages/live/index.js
var app = getApp();
const host = app.globalData.host;
const iconUrl = app.globalData.iconUrl;
const imgUrl = app.globalData.imgUrl;
import {
  getOnlineList
} from '../../utils/api/live'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: imgUrl,
    iconUrl: iconUrl,
    leftArrow: true,
    listData: [], //直播列表
    host: host,
    active: 0,
    page: 1,
    searchLoading: false, //"上拉加载"的变量，默认false，隐藏  
    keyword: '',
  },
  //搜索
  onSearch(e) {
    this.setData({
      keyword: e.detail,
      listData: [],
      page: 1,
    });
    this.getList()
  },
  toRadio: function (ev) {
    console.log(ev);
    let id = ev.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/live/radio/index?id=${id}`,
    })
  },
  toPicture() {
    wx.navigateTo({
      url: '/pages/live/live-picture/index',
    })
  },
  toPictureNext(){
    wx.navigateTo({
      url: '/pages/live/live-pictureNext/index',
    })
  },
  toPictureThree(){
    wx.navigateTo({
      url: '/pages/live/live-pictureThree/index',
    })
  },
  onClickLeft() {
    wx.switchTab({
      url: '/pages/index/index',
      success: function () {
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
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      page: 1,
      listData: [],
    })
    this.getList()
  },
  getList: function () {
    const params = {
      page: this.data.page,
      keyword: this.data.keyword,
    }
    getOnlineList(params).then(res => {
      console.log(res);
      if (res.code == 200) {
        if(res.data.rows.length < '10'){
        this.setData({
          searchLoading:true
        })
        }
        this.setData({
          listData:this.data.listData.concat(res.data.rows)
        })
        wx.hideLoading()
      } else {
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
    // wx.showToast({
    //   title: '没有更多了',
    //   icon: "loading"
    // })
    wx.showLoading({
      title: '玩命加载中',
    })
    this.onClickMore()
  },
  onClickMore:function(){
    console.log("点击")
    this.setData({
      page:this.data.page+1
    })
    this.getList()
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})