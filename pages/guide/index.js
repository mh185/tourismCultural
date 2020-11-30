// pages/guide/index.js
import {getList} from '../../utils/api/guide'
var app = getApp();
var page=1;
var size=5;
const host=app.globalData.host;
const iconUrl=app.globalData.iconUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iconUrl:iconUrl,
    host:host,
    listData:{},//导览列表
    params:{}
  },
  onClickLeft(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  toDetail:function(ev){
    console.log(ev);
    var id = ev.currentTarget.dataset.id
    var name=ev.currentTarget.dataset.name
    wx.navigateTo({
      url: `/pages/guide/detail/index?id=${id}&name=${name}`,
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
    this.getList()
  },
  getList:function(){
    const  params={
      'areaCode':''
    }
    this.setData({params})
    page=1;
    getList({params,page,size}).then(res=>{
      console.log({page,size},res);
      
      if (res.code==200) {
          // 改变 data 中的数据
        this.setData({
          listData:res.data.rows 
        })
        console.log(this.data.listData)
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
    console.log(page,size);
    
    let {listData,params} = this.data;
    ++page;
    let res = await getList({params,page,size})
    if(res.data.rows.length>0){
      listData =listData.concat(res.data.rows)
      this.setData({listData})
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