// pages/user/index.js
import { getPhone } from '../../utils/api/user'
import { getSignInRecord, getUserInfoTwo, getRealAuth } from '../../utils/api/index'
var app = getApp();
const iconUrl = app.globalData.iconUrl;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    authentication:true,//实名
    searchLoading: false, //"上拉加载"的变量，默认false，隐藏  
    page: 1,
    checkInRecord: false,//报到记录
    userRoleTypeEnum: '',//管理员权限 "MANAGER_WX"
    telephone: '',
    iconUrl: iconUrl,
    userId: ' 森森',
    userInfor: '',
    show: false,//联系我们弹出框
    contactTel: "012-9922",//联系我们电话
    typeList: [],
    signInList: [],
    current: 0,//报到记录列表
    phone: ''
  },
  // 总页数
  // totalPages: 1,
  // params: {
  //   page: 1,
  //   size: 10,
  // },
  // toHelp:function(){
  //   wx.navigateTo({
  //     url: '/pages/user/help/index',
  //   })
  // },
  // toCall:function(){
  //   wx.navigateTo({
  //     url: '/pages/user/contact/index',
  //   })
  // },
  toPhone(ev) {
    console.log(ev);
    const num = ev.currentTarget.dataset.id
    wx.makePhoneCall({
      phoneNumber: num,
    })

  },
  toCall(ev) {
    console.log(ev);
    const tel = ev.currentTarget.dataset.phone
    wx.makePhoneCall({
      phoneNumber: tel //仅为示例，并非真实的电话号码
    })
  },
  toAbout: function () {
    wx.navigateTo({
      url: '/pages/user/about/index',
    })
  },
  getPerson: function (e) {
    app.globalData.wxInfo = e.detail;
    wx.navigateTo({
      url: "/pages/logIn/index"
    });
  },
  //联系我们
  getPhone: function () {
    getPhone().then(res => {
      console.log('联系我们：',res);
      if (res.code == 200) {
        this.setData({
          typeList: res.data
        })
      }
    })
  },

  tabsContact() {
    this.setData({
      current: 0
    })
  },
  tabsSign() {
    this.setData({
      current: 1
    })
    

  },
  //根据token获取账户信息
  getUserInfoTwo(){
    getUserInfoTwo().then(res => {
      console.log('根据token获取账户信息....', res)
      if(res.code === 200){
        this.setData({
          userRoleTypeEnum: res.data.userRoleTypeEnum
        })
        if(res.data.userRoleTypeEnum == "MANAGER_WX") {
          this.setData({
            checkInRecord: true
          })
          this.getSignInRecordList()
        }
      }
    })
  },
  // 报到记录
  getSignInRecordList() {
    const params = {
      page: this.data.page,
    }
    getSignInRecord(params).then(res => {
      // getSignInRecord(this.params).then(res => {
      if (res.code == 200) {
        if(res.data.rows.length < '10'){
          this.setData({
            searchLoading:true
          })
         }
        this.setData({
          signInList:this.data.signInList.concat(res.data.rows)
        })
        wx.hideLoading()
        // const total = res.data.total
        // this.totalPages = Math.ceil(total / this.params.size);
        // const signInList = res.data.rows
        // this.setData({
        //   signInList: [...this.data.signInList, ...signInList],
        // })
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //前往编辑个人信息页面
  // goEditPerson: function () {
  //   wx.navigateTo({
  //     url: '/pages/user/editPerson/index',
  //   });
  // },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getUserInfoTwo()
    this.getPhone()
    console.log('全局变量。。。', app.globalData)
    this.setData({
      userId: app.globalData.userId,
      userInfor: app.globalData.wxUserInfo
    })
    console.log('userInfor......。。。', this.data.userInfor)
    if(this.data.userInfor!=null&&this.data.userInfor!='') {
      this.onGetRealAuth()
    }
  },
  // 查看用户是否已经实名认证
  onGetRealAuth() {
    getRealAuth().then((res) => {
      console.log('res......', res)
      if (res.code == 200) {
        this.setData({
          authentication: res.data
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
  //实名认证
  toAuthentication:function(){
    wx.navigateTo({
      url: `/pages/user/authentication/index?authentication=${this.data.authentication}`,
    });
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
  //   if (this.params.page >= this.totalPages) {
  //     //没有下一页数据
  //     wx.showToast({
  //       title: '没有下一页数据了',
  //       icon: 'none'
  //     })
  //   } else {
  //     //还有下一页数据
  //     this.params.page++;
  //     this.getSignInRecordList();
  //   }
  // },
  onReachBottom(){
    if(this.data.checkInRecord) {
      console.log("到底了！！");
      wx.showLoading({
        title: '玩命加载中',
      })
      this.onClickMore()
    }
},
onClickMore:function(){
  console.log("点击")
  this.setData({
   page:this.data.page+1
  })
  this.getSignInRecordList()
},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})