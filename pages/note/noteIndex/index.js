// pages/note/noteIndex/index.js
const app = getApp()
const host = app.globalData.host
const iconUrl = app.globalData.iconUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iconUrl:iconUrl,
    host:host
  },
  toAll(){
    wx.navigateTo({
      url: '/pages/note/inde',
    })
  },
  toOne(){
    wx.navigateTo({
      url: '/pages/note/one/index',
    })
  },
  toTwo(){
    wx.navigateTo({
      url: '/pages/note/two/index',
    })
  },
  toThree(){
    wx.navigateTo({
      url: '/pages/note/three/index',
    })
  },
  toFour(){
    wx.navigateTo({
      url: '/pages/note/four/index',
    })
  },
  toFive(){
    wx.navigateTo({
      url: '/pages/note/five/index',
    })
  },
  toSix(){
    wx.navigateTo({
      url: '/pages/note/six/index',
    })
  },
  toSeven(){
    wx.navigateTo({
      url: '/pages/note/seven/index',
    })
  },
  toEight(){
    wx.navigateTo({
      url: '/pages/note/eight/index',
    })
  },
  onClickLeft(){
    wx.navigateBack({
      delta:1
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