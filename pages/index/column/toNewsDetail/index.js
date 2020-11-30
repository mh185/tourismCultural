// pages/index/newsDetail/index.js
var WxParse = require('../../../../components/wxParse/wxParse.js');
import {getNewsDetail} from '../../../../utils/api/news'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    domReady:false,
    detailData:{}
  },
  onClickLeft(){
    wx.navigateBack({
      delta: 1,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.id
    this.setData({
      id
    })
    this.getNewsDetail()
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
    if(this.data.domReady){
      this.getNewsDetail();
    }
  },
  getNewsDetail:function(){
    let that=this;
    const params = {
      id: this.data.id
    }
    getNewsDetail(params).then(res=>{
      console.log(res);
      if(res.code==200){
        this.setData({
          detailData:res.data
        })
        //  解析图片base64的方法 -
        WxParse.wxParse('courseDetail', 'html', that.data.detailData.content, that, 0)
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