// pages/user/about/index.js
var WxParse = require('../../../components/wxParse/wxParse.js');
import {getAbout} from '../../../utils/api/user'
var app = getApp();
const iconUrl = app.globalData.iconUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iconUrl:iconUrl,
    contentData:{},
    path:"https://lzzhly.wglj.liuzhou.gov.cn/upload/2020-10-17/1602901056182.mp4"
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
    this.getAbout()
    // this.videoContext = wx.createVideoContext('myvideo', this);
    // this.videoContext.requestFullScreen({ direction: 90 });
    // wx.createVideoContext('myvideo').requestFullScreen({ direction: 90 })
    // wx.createVideoContext('myvideo').showStatusBar()
  },

  //关于我们
  getAbout:function(){
    let that=this;
    getAbout().then(res=>{
      console.log(res);
      if(res.code==200){
        this.setData({
          contentData:res.data
        })
        // //  解析图片base64的方法 -
        WxParse.wxParse('courseDetail', 'html', that.data.contentData.content, that, 0)
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