// pages/DirectSeeding/picture-detail/index.js
var app = getApp();
const iconUrl = app.globalData.iconUrl;
const imgUrl = app.globalData.imgUrl;
const host = app.globalData.host;
import {
  getPicById
} from '../../../utils/api/live'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iconUrl:iconUrl,
    imgUrl:imgUrl,
    host: host,
    detailData:{},
    id:'',
    page: 1,
    searchLoading:false, //"上拉加载"的变量，默认false，隐藏
  },
  onClickLeft(){
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.imageTextLiveId
    })
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
    this.getDetailList()
  },
  // 图片直播详情
  getDetailList: function () {
    const params = {
      imageTextLiveId: this.data.id
    }
    getPicById(params).then(res => {
      // console.log('图片详情页',res)
      if(res.code == 200) {
        const list = res.data
        list.likeCounts = 0
        list.shareCounts = 0
        list.pictures.map((img, j) => {
          list.likeCounts += Number(img.likeCount)
          list.shareCounts += Number(img.shareCount == null ? 0 : img.shareCount)
        })
        if(res.data.length < '10') {
          this.setData({
            searchLoading: true,
          })
        }
        this.setData({
          detailData: res.data
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
    // console.log("到底了！！");
    wx.showToast({
      title: '玩命加载中',
      icon: 'loading',
      duration: 1500
    })
    this.onClickMore()
  },
  onClickMore: function () {
    console.log("点击")
    this.setData({
      page: this.data.page + 1
    })
    this.getDetailList()
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})