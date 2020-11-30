// // pages/index/column/index.js
// import {getNews} from '../../../utils/api/news'
// var app = getApp();
// const host=app.globalData.host;
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     host:host,
//     listData:[]
//   },
//   toNewDetail:function(event){
//     const id=event.currentTarget.dataset.index
//     wx.navigateTo({
//       url: `/pages/index/newsDetail/index?id=${id}`,
//     })
//   },
//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {

//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {

//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {
//     this.getNews()
//   },
//   getNews:function(){
//     getNews().then(res=>{
//       console.log(res);
//       if(res.code==200){
//         this.setData({
//           listData:res.data.rows
//         })
//       }
//     })
//   },
//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {

//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {

//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {

//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {

//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {

//   }
// })
// pages/user/index.js
var app = getApp();
const iconUrl = app.globalData.iconUrl;
const host=app.globalData.host;
var page=1;
var size=6;
import {getNews} from '../../../utils/api/news'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    host:host,
    iconUrl: iconUrl,
    newsList:[],//资讯列表
    params:{},
  },
  onClickLeft(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  toNewsDetail:function(event){
    // console.log(event);
    const id=event.currentTarget.dataset.index
    wx.navigateTo({
      url: `/pages/index/column/toNewsDetail/index?id=${id}`,
    })
  },
  onChange() {
   
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
    this.getNews()
  },
  // 新闻快讯
  getNews:function(){
    const  params={
      'sort':''
    }
    this.setData({params})
    page=1;
    getNews({params,page,size}).then(res=>{
      console.log({page,size},res,'22222');
      
      if (res.code==200) {
          // 改变 data 中的数据
        this.setData({
          newsList:res.data.rows 
        })
        console.log(this.data.newsList)
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
  onReachBottom: async function () {
    console.log(page,size,'1111');
    
    let {newsList,params} = this.data;
    ++page;
    let res = await getNews({params,page,size})
    if(res.data.rows.length>0){
      newsList =newsList.concat(res.data.rows)
      this.setData({newsList})
      wx.showToast({
        title: '拼命加载中',
        icon: 'loading',
        duration: 1500,
    })
    }else{
      --page;
      console.log('ssss',page,res);
        wx.showToast({
          title: '没有更多了',
          icon: 'none',
          duration: 1500,
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})