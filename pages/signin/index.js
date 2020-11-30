// pages/signin/index.js
var app = getApp();
const iconUrl = app.globalData.iconUrl;
import {
  getSign,
  userSignIn
} from '../../utils/api/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iconUrl: iconUrl,
    signName: '',
    signPhone: '',
    isShwo: false,
    title:"请填写个人信息，进行会议报到",
    isDis:false
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
    this.getSingFa()
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

  },
  // 姓名
  bindKeyName: function (e) {
    this.setData({
      signName: e.detail.value
    })
  },
  //单位
  bindKeyTel: function (e) {
    this.setData({
      signPhone: e.detail.value
    })
  },
  // 报到
  handleSign() {
    if (this.data.signName.length == 0 || this.data.signPhone.length == 0) {
      wx.showToast({
        title: '请输入用户信息',
        icon: 'none'
      })
      return false
    }
    var params = {
      name: this.data.signName,
      company: this.data.signPhone,
    }
    userSignIn(params).then(res => {
      console.log('报到信息。。。。', res)
      if (res.code == 200) {
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 1500,
        })
        this.setData({
          title:'恭喜！报到成功',
          isShwo:false,
          isDis:true
        })
      } else {
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 1500,
        })
      }
      // wx.showToast({
      //   title: res.message,
      //   icon: 'none'
      // })
      // this.setData({
      //   signInModel: false,
      //   signedModel: false,
      //   bgModel: false
      // })
    })
  },

  //查看用户是否报到
  getSingFa() {
    getSign().then(res => {
      console.log('qiandao...', res)
      if (res.code == 200) {
        console.log('qiandao1111111...', res)
        if (res.data.isSignIn == true) {
          // console.log('qiandao22222222222...', res)
          this.setData({
            isShwo: false,
            title:'恭喜！报到成功',
            isDis:true,
            signName: res.data.info.name,
            signPhone: res.data.info.phoneNumber,
          })
        } else {
          this.setData({
            isShwo: true,
            title:'请填写个人信息，进行会议报到',
            isDis:false
          })
        }
        // return
      }
    })
    // return false
  },
})