// pages/guide/detail/index.js
var WxParse = require('../../../components/wxParse/wxParse.js');
var app = getApp();
const iconUrl = app.globalData.iconUrl
const host=app.globalData.host
import {getDetail} from '../../../utils/api/guide'
Page({

  /** 
   * 页面的初始数据
   */
  data: {
    host:host,
    autoplay:true,
    iconUrl: iconUrl,
    imgUrl: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
    detailData:{},
    id:'',
    travelsRotation:[],//轮播
    current:1,
    phone:'',
    lat:'',
    lon:'',
    name:'',
    position:'',
    weather: '',
    observationPointName:''
  },
  // to 天气页面
  toWeather(){
    wx.navigateTo({
      // url: '/pages/guide/weather/index?weather='+JSON.stringify(this.data.weatherKongqi.forecast7),
      url: '/pages/guide/weather/index',
    })
  },
   // 轮播
   swiperBindchange(event){
    // console.log("000000000", event.detail);
    var current = event.detail.current
    this.setData({
      current:current + 1
    })
  },
  // toWeather(){
  //   wx.navigateTo({
  //     url: '/pages/guide/weather/index',
  //   })
  // },
  onClickLeft:function(){
    wx.navigateBack({
      delta: 1,
    })
    // wx.showTabBar()
  },
  toGuide:function(){
    var that=this
    console.log('点击了111');
      wx.openLocation({
        latitude:that.data.lat,	//纬度
        longitude: that.data.lon, //经度
        name:that.data.name,	//目的地定位名称
        scale: 15,	//缩放比例
        address: that.data.position	//导航详细地址
      })
  },
  //生成海报
  generatePoster:function(){
    let prams={
      banner:this.data.travelsRotation[0].url,
      title:this.data.detailData.name
    }
   wx.navigateTo({
     url: '/pages/poster/index?shareDate='+JSON.stringify(prams),
   })
 },
  toPhone:function(){
    wx.makePhoneCall({
      phoneNumber: this.data.phone,
    })
  },
    // 导览地图
    toGuideMap() {
      if(this.data.detailData.handDrawingUrl == null) {

      }else{
        wx.navigateTo({
          // url: '/pages/guide/guideMap/index?id=' + this.data.id
          url: '/pages/guide/guideMapTwo/index?id=' + this.data.id
        })
      }
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options,'options');
    this.setData({
      id: options.id,
      observationPointName:options.name
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
    this.setData({
      weather: app.globalData.weathers.wendu
    })
    this.getDetail();
  },
  getDetail(){
    let that=this;
    const params = {
      id: this.data.id
    }
    getDetail(params).then(res=>{
      console.log(res);
      if(res.code == 200){
        this.setData({
          detailData: res.data,
          travelsRotation: res.data.fileManageList,
          phone:res.data.phone,
          lat:res.data.lat,
          lon:res.data.lon,
          position:res.data.position,
        })
        // //  解析图片base64的方法 -
        WxParse.wxParse('courseDetail', 'html', that.data.detailData.summary, that, 0)
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