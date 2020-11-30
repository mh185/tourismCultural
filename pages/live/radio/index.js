// pages/live/radio/index.js
var app = getApp();
const host=app.globalData.host;
const iconUrl = app.globalData.iconUrl
import {getDetail,thumbsUp,getShare} from '../../../utils/api/live'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iconUrl:iconUrl,
    host:host,
    value: '',
    detailList:{},
    id:'',
    domReady:false,
  },
  toRadioDetail(ev){
    console.log(ev);
    const id=ev.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/live/radioDetail/index?id=${id}`,
    })
  },
  onChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },
  statechange(e){
    console.log(e,"statechange")
  },
  error(e){
    console.log(e,"error")
  },
  onClickLeft(){
    wx.navigateBack({
      delta: 1,
    })
  },
  toMake:function(){
    wx.navigateTo({
      url: '/pages/poster/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options,"options");
    const id = options.id
    this.setData({
      id
    })
    this.getDetail()
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
      this.getDetail();
    }
  },
  getDetail:function(){
    const params = {
      "meetingLiveId": this.data.id
    }
    getDetail(params).then(res=>{
      console.log(res);
      if(res.code==200){
        this.setData({
          detailList:res.data
        })
      }else{
        wx.showToast({
          title: res.message,
          icon:'none',
          duration:1500
        })
      }
    })
  },
  // 点赞
  onthumbsUp(){
    let params={
      meetingLiveId :this.data.detailList.id
    }
    thumbsUp(params).then(res=>{
      if (res.code == 200) {
        let {userIsLike,likeCount} = this.data.detailList;
        let hint = userIsLike==0?1:-1;
        this.setData({
          'detailList.userIsLike':!userIsLike,
          'detailList.likeCount':likeCount+hint
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
  // 分享
  toShare(){
    this.getShare()
  },
  getShare:function(){
    let params={
      meetingLiveId :this.data.detailList.id
    }
    getShare(params).then(res=>{
      if (res.code == 200) {
        let {shareCount} = this.data.detailList;
        this.setData({
          'detailList.shareCount':shareCount+1
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})