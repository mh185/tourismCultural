// pages/index/mesDetail/index.js
import {getNoticeDetail} from '../../../utils/api/notice'

var app = getApp();
const iconUrl = app.globalData.iconUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iconUrl:iconUrl,
    id:'',
    detailData:{}
  },
  onClickLeft(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options,'options');
    this.setData({
      id: options.id
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
    this.getNoticeDetail()
  },
  getNoticeDetail(){
    const params = {
      id: this.data.id
    }
    getNoticeDetail(params).then(res=>{
      console.log(res);
      if(res.code == 200){
        this.setData({
          detailData: res.data,
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})