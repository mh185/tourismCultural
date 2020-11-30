// pages/live/index.js
var app = getApp();
const host = app.globalData.host;
const iconUrl = app.globalData.iconUrl;
const imgUrl = app.globalData.imgUrl;
import {
  getList
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
    active: 1,
  },
  toRadio: function (ev) {
    console.log(ev);
    let id = ev.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/DirectSeeding/seedingRadio/index?id=${id}`,
    })
  },
  toPicture() {
    wx.navigateTo({
      url: '/pages/DirectSeeding/picture-detail/index',
    })
  },
  toPictureNext(){
    wx.navigateTo({
      url: '/pages/DirectSeeding/picture-next/index',
    })
  },
  toPictureThree(){
    wx.navigateTo({
      url: '/pages/DirectSeeding/picture-three/index',
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
    this.getList()
  },
  getList: function () {
    getList().then(res => {
      console.log(res);
      if (res.code == 200) {
        this.setData({
          listData: res.data.rows
        })
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
    wx.showToast({
      title: '没有更多了',
      icon: "loading"
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})