// pages/pictureLive/index.js
var app = getApp();
const host = app.globalData.host;
const iconUrl = app.globalData.iconUrl;
const imgUrl = app.globalData.imgUrl;
import {
  getWrittenLiveByMeetingId, getPictureLiveByMeetingId
} from '../../utils/api/live'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: '',
    page: 1, 
    searchLoading: false, //"上拉加载"的变量，默认false，隐藏  
    imgUrl: imgUrl,
    iconUrl: iconUrl,
    host: host,
    // leftArrow: true,
    WrittenLiveList: [], // 图文直播列表
    pictureLiveList: [], // 图片直播列表
    active: 0,
  },

//图片点击事件  
clickImg: function(e){
    console.log('图文的e', e)
  var index = e.target.dataset.index;
  var pictures = e.target.dataset.pictures;
  var nowPictures = []
  pictures.map(item=>{
    var url = this.data.host + item.url
    nowPictures.push(url)
  })
  // console.log('shuzu......', nowPictures)
  wx.previewImage({
    current: nowPictures[index], //需要预览的图片http链接列表，注意是数组
    urls: nowPictures, // 当前显示图片的http链接，默认是第一个
    success: function (res) { },
    fail: function (res) { },
    complete: function (res) { },
  })
},
  //搜索
  onSearch(e) {
    this.setData({
      keyword: e.detail,
      listData: [],
      page: 1,
    });
    // this.getList()
  },
  // 图文直播详情
  toWritten(e) {
    // console.log('图文的e', e)
    wx.navigateTo({
      url: `/pages/live/live-picture/index?imageTextLiveId=${e.currentTarget.dataset.id}`,
    })
  },
  // 图片直播详情
  toPicture(e) {
    // console.log('图片的e', e)
    // wx.navigateTo({
    //   url: `/pages/pictureLive/picture-detail/index?imageTextLiveId=${e.currentTarget.dataset.id}`,
    // })
  },
  //返回
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
      page:1,
      pictureLiveList:[],
      WrittenLiveList: []
    })
    this.getWrittenLiveList()
    this.getPictureLiveList()
  },
  // 图文直播列表
  getWrittenLiveList: function () {
    const params = {
      page: this.data.page
    }
    getWrittenLiveByMeetingId(params).then(res => {
      // console.log("图文：",res);
      if(res.code == 200) {
        const List = res.data.rows
        List.map((item,i) => {
          item.watchCount = 0
          
        })
        if (res.data.rows.length < '10') {
          this.setData({
            searchLoading: true
          })
        }
        this.setData({
          WrittenLiveList: this.data.WrittenLiveList.concat(res.data.rows)
        })
        // console.log('注意 WrittenLiveList：',this.data.WrittenLiveList)

        app.globalData.WrittenLiveList = this.data.WrittenLiveList
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
  // 图片直播列表
  getPictureLiveList: function () {
    const params = {
      page: this.data.page
    }
    getPictureLiveByMeetingId(params).then(res => {
      // console.log("片片片：",res);
      if (res.code == 200) {
        const list = res.data.rows
        list.map((item,i) => {
          item.likeCounts = 0
          item.shareCounts = 0
          item.pictures.map((img,j) => {
            item.likeCounts += Number(img.likeCount)
            item.shareCounts += Number(img.shareCount == null ? 0 : img.shareCount)
          })
          // console.log('zongdianzhan....', item.likeCounts, item.shareCounts)
        })
        if (res.data.rows.length < '10') {
          this.setData({
            searchLoading: true
          })
        }
        this.setData({
          pictureLiveList: this.data.pictureLiveList.concat(res.data.rows)
        })
        console.log(this.data.pictureLiveList,"图片集锦列表......")
        app.globalData.pictureLiveList = this.data.pictureLiveList
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
  // onReachBottom: function () {
  //   wx.showToast({
  //     title: '没有更多了',
  //     icon: "loading"
  //   })
  // },
  onReachBottom() {
    // console.log("到底了！！");
    wx.showToast({
      title: '玩命加载中',
      icon: 'loading',
      duration: 1500
    })
    this.onClickMore()
  },
  onClickMore: function () {
    // console.log("点击")
    this.setData({
      page: this.data.page + 1
    })
    this.getPictureLiveList()
    this.getWrittenLiveList()
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})