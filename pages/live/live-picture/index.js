// pages/DirectSeeding/picture-detail/index.js
import {
  shareImageTextlive, likeImageTextLive, getInfoById
} from '../../../utils/api/live'
var app = getApp();
const host = app.globalData.host;
const iconUrl = app.globalData.iconUrl;
const imgUrl = app.globalData.imgUrl;
// const WrittenLiveList = app.globalData.WrittenLiveList;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: '2020年广西文化旅游发展大会',
    id: '',
    host: host,
    iconUrl:iconUrl,
    imgUrl:imgUrl,
    footerList:[],
    WrittenLiveList:[],
    steps: [
      {
        text: '柳州电视台',
        desc: '',
        
      }
    ], // 步骤
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
    const newWrittenList = app.globalData.WrittenLiveList
    // console.log('app.globalData.pictureLiveList...', pictureLiveLists)
    newWrittenList.map((item,i) => {
      if(item.id == this.data.id) {
        this.setData({
          WrittenLiveList: item
        })
      }
    })
    // console.log('注意 WrittenLiveList：',this.data.WrittenLiveList)
    this.getInfoById()
  },
//根据ID获取 图文直播详情
  getInfoById(){
    const params = {
      imageTextLiveId: this.data.id,
      page: 1,
      size: 10
    }
    getInfoById(params).then(res => {
      // console.log('图文直播详情', res)
      if (res.code == 200) {
        const list = res.data.rows
        list.map((img, j) => {
          list.likeCounts = 0
          list.shareCounts = 0
        })
        this.data.WrittenLiveList = app.globalData.WrittenLiveList;  
        this.setData({
          footerList: res.data.rows
        })
        // console.log('注意footerList：',this.data.footerList)
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
  onShareAppMessage: function (options) {
    console.log("options风向....", options)
    const that = this
    const imgId = options.target.dataset.imgid
    // 来自页面内的按钮的转发
    if (options.from == 'button') {
      // console.log("button分享....")
      // that.shareImageTextlive(imgId)
    }
  },
  // 分享
  shareImageTextlive(imgId) {
    console.log("button分享....", imgId)
    const params = {
      pictureId: imgId
    }
    shareImageTextlive(params).then((res) => {
      if (res.code == 200) {
        this.getInfoById()
        // this.onShow()
      } else {
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 1500,
        })
      }
    })
  },
  // 点赞
  clickFabulous(e) {
    console.log("buttondainzainnn....", e)
    const params = {
      pictureId: e.currentTarget.dataset.imgid
    }
    likeImageTextLive(params).then((res) => {
      if (res.code == 200) {
        this.getInfoById()
        // this.onShow()
      } else {
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 1500,
        })
      }
    })
  },
})