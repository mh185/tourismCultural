// pages/index/index.js
var app = getApp();
const iconUrl = app.globalData.iconUrl;
const host = app.globalData.host;
var page = 1;
var size = 3;
import { getNotice } from '../../utils/api/notice'
import { getNews } from '../../utils/api/news'
import { getBanner, getAgenda, login, getSign, userSignIn,getRealAuth} from '../../utils/api/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    meetingShow: false,
    isMeetingShow: true,
    showPop: false,
    // show: true,
    // signInModel: true,//报到弹窗
    signInModel: false,//报到弹窗
    signedModel: false,//已报到
    bgModel: false,//model
    show: false,
    host: host,
    value: '',
    iconUrl: iconUrl,
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动播放
    interval: 3000, //停留时间间隔
    duration: 1000, //播放时长
    // previousMargin: '30rpx', //前边距，可用于露出前一项的一小部分，接受 px 和 rpx 值
    // nextMargin: '85px', //后边距，可用于露出后一项的一小部分，接受 px 和 rpx 值
    circular: true, //是否采用衔接滑动
    currentSwiperIndex: 0, //swiper当前索引
    navList: 12,//导航
    msgList: [],
    newsList: [],//资讯列表
    id: 0,
    weather: '',
    weatherKongqi: '',
    weatherCity: '',
    params: {},
    path: "https://lzzhly.wglj.liuzhou.gov.cn/upload/2020-10-17/1602901056182.mp4",
    bannerList: [],//轮播
    content: '',//会议议程
    signName: '',
    signPhone: '',
    weatherImg:''
  },
  // 会议议程
  backClick() {
    this.setData({
      meetingShow: false
    })
  },
  getAgenda() {
    getAgenda().then(res => {
      console.log(res);
      if (res.code == 200) {
        this.setData({
          content: res.data.content,
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
  // 我已阅读
  haveRead() {
    var that = this
    this.setData({
      meetingShow: false,
      isMeetingShow: false,
      showPop: false,
    })

  },
  // 姓名
  bindKeyName: function (e) {
    this.setData({
      signName: e.detail.value
    })
  },
  //单位
  bindKeyTel: function (e) {
    console.log('单位:',e)
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
        this.setData({
          signInModel: false,
          signedModel: true,
          bgModel: true
        })
      }else{
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
  //报到成功确定
  handleSigned() {
    this.setData({
      signedModel: false,
      bgModel: false
    })
  },
  onClose() {
    this.setData({ close: false });
  },
  // 视频播放结束
  closeVideo() {
    // wx.createVideoContext('myvideo').requestFullScreen({ direction: -90 })

    wx.createVideoContext('myvideo').exitFullScreen()
    this.setData({
      show: false,
      meetingShow: true
    })
    if (this.data.meetingShow && this.data.isMeetingShow) {
      this.setData({
        showPop: false
      })
      this.getSingFa()
    }
  },
  // 天气
  getWeither() {
    var that = this
    wx.request({
      // url: 'http://183.66.194.186:8000/weaher/city', //服务器url+参数中携带的接口具体地址
      url: 'https://lzzhly.wglj.liuzhou.gov.cn/weather/city', //服务器url+参数中携带的接口具体地址
      // data:{
      //   name:'柳州市'
      // },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: 'POST', //默认为GET,可以不写，如常用请求格式为POST，可以设置POST为默认请求方式
      success: function (res) {
        console.log('天气。。。。', res)
        if(res.data.code == 200) {
          app.globalData.weathers = res.data.data
          that.setData({
            weather: res.data.data.wendu,
            weatherImg:res.data.data.forecast7[1]
          })
        }else{
          that.setData({
            weather: '',
          })
          wx.showToast({
            title: '天气获取失败',
            icon: 'none',
            duration: 1500,
          })
        }


        // if (res.data.code == 200) {
        //   res.data.data.diqu = (res.data.data.city.split('，')).slice(0, 2).join('')
        //   app.globalData.weathers = res.data.data
        //   console.log('app.globalData.weathers.....', app.globalData.weathers)
        //   that.setData({
        //     weather: res.data.data.wendu,
        //     weatherCity: res.data.data.city.split('，')[0],
        //     weatherKongqi: res.data.data
        //   })
        //   console.log('weatherCity.....', that.data.weatherCity)
        // } else {
        //   that.setData({
        //     weather: {}
        //   })
        //   wx.showToast({
        //     title: '天气获取失败',
        //     icon: 'none',
        //     duration: 1500,
        //   })
        // }
      }
    })
  },
  //to 天气页面
  toWeather() {
    wx.navigateTo({
      url: '/pages/guide/weather/index?weather=' + JSON.stringify(this.data.weatherKongqi.forecast7),
    })
  },
  //隐藏弹出框
  toHide() {
    this.setData({
      show: false,
      meetingShow: true
    })
    if (this.data.meetingShow && this.data.isMeetingShow) {
      this.setData({
        showPop: false
      })
    }
    this.getSingFa()
  },
  // 公告详情
  toMegDetail: function (event) {
    // console.log(event);
    var id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/index/mesDetail/index?id=${id}`,
    })
  },
  //搜索栏
  toSearch: function () {
    wx.navigateTo({
      url: '/pages/index/search/index',
    })
  },
  swiperBindchange(e) {
    this.setData({
      currentSwiperIndex: e.detail.current
    })
  },
  toNews: function () {
    wx.navigateTo({
      url: '/pages/index/column/index',
    })
  },
  toLive: function () {
    wx.navigateTo({
      url: '/pages/live/index'
    })
  },
  toPicture: function () {
    wx.navigateTo({
      url: '/pages/pictureLive/index',
    })
  },
  // 搜索
  onSearch(ev) {
    const z = ev.detail
    // console.log('z....', z)
    wx.navigateTo({
      url: '/pages/index/search/index?id=' + z,
    })
  },
  // 会务手册
  toNotebook: function () {
    // wx.showToast({
    //   title: '大会前功能暂未开放，敬请期待！',
    //   icon: 'none',
    //   duration: 1500,
    // })
    wx.navigateTo({
      url: '/pages/note/inde',
    })
  },
  toNotebookTwo: function() {
    wx.navigateTo({
      url: '/pages/note/special/index'
    })
  },
  toColumnHf() {
    wx.navigateTo({
      url: '/pages/index/column-replay/index',
    })
  },
  toGuide: function () {
    wx.navigateTo({
      url: '/pages/guide/index',
    })
  },
  toAllGuide: function () {
    wx.navigateTo({
      url: '/pages/allGuide/index',
    })
  },
  toTravel() {
    // wx.showToast({
    //   title: '目前处于测试阶段，暂无法跳转。',
    //   icon: "none"
    // })
    wx.navigateToMiniProgram({
      appId: "wx7e192938c604b4a3",
      path:'',
      success(res) {
        wx.showToast({
          title: '跳转成功'
        })
      }
    })
  },
  toLook: function () {
    wx.navigateTo({
      url: '/pages/index/panorama/index',
    })
  },
  toNewsDetail: function (event) {
    // console.log(event);
    const id = event.currentTarget.dataset.index
    wx.navigateTo({
      url: `/pages/index/column/toNewsDetail/index?id=${id}`,
      // url: `/pages/index/newsDetail/index?id=${id}`,
    })
  },
  onChange(event) {
    // event.detail 为当前输入的值
    // console.log(event.detail);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 天气
    this.getWeither()
  
  },
  //查看用户是否报到
  getSingFa() {
    //     // 判断是否存在token
    // if (!app.globalData) {
    //   // 登录
    //   wx.login({
    //     success: res => {
    //       wx.request({
    //         url: app.globalData.host + '/login/v1/in/applets?code=' + res.code + '&appId=wxf585b434a78dc95d',
    //         method: 'POST',
    //         header: {
    //           'content-type': 'application/x-www-form-urlencoded'
    //         },
    //         success: element => {
    //           if (!element.data.data.state) {
    //             if (element.data.data.mobile != null && element.data.data.mobile != '') {
    //               app.globalData.userId = element.data.data.userId
    //               wx.setStorageSync('userId', app.globalData.userId)
    //               app.globalData.wxUserInfo = element.data.data
    //               app.globalData.openId = element.data.data.openId
    //               app.globalData.token = element.data.data.token
    //             }
    //           } else {
    //             app.globalData.openId = element.data.data
    //           }
    //         }
    //       })
    //     }
    //   });;
    // } else {

    // }
    getSign().then(res => {
      console.log('qiandao...', res)
      if (res.code == 200) {
      console.log('qiandao1111111...', res)
      if (res.data == false) {
      console.log('qiandao22222222222...', res)
      this.setData({
            bgModel: true,
            signInModel: true,
          })
        }
        // return
      }
    })
    // return false
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
    this.getNotice(),
    this.getNews(),
    this.getBanner(),
    this.getAgenda(),
    // wx.createVideoContext('myvideo').requestFullScreen({ direction: 90 })
    wx.createVideoContext('myvideo').showStatusBar()
  },
  // 公告内容
  getNotice: function () {
    getNotice().then(res => {
      // console.log(res);
      if (res.code == 200) {
        this.setData({
          msgList: res.data.rows
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
  // 新闻快讯
  getNews: function () {
    const params = {
      'sort': ''
    }
    this.setData({ params })
    page = 1;
    getNews({ params, page, size }).then(res => {
      console.log({ page, size }, res);

      if (res.code == 200) {
        // 改变 data 中的数据
        this.setData({
          newsList: res.data.rows
        })
        console.log(this.data.newsList)
      }
    })
  },
  //健康码
  toHealth() {
    this.onGetRealAuth();
  },
    // 查看用户是否已经实名认证
  onGetRealAuth() {
    getRealAuth().then((res) => {
      console.log('res......', res)
      if (res.code == 200) {
        // this.setData({
        //   authentication: res.data
        // })
        // 0 没认证
        if (!res.data){
          wx.navigateTo({
            // url: '/pages/index/healthCode/healthQrCode/index',
            url: '/pages/index/healthCode/index',
          })
        } else {
          wx.navigateTo({
            // url: '/pages/index/healthCode/index',
            url: '/pages/index/healthCode/healthQrCode/index',
          })  
        }
      } else {
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 1500,
        })
      }
    })
  },
  // 轮播图
  getBanner: function () {
    getBanner().then(res => {
      // console.log(res);
      if (res.code == 200) {
        this.setData({
          bannerList: res.data,
        })
        console.log('banner00000000', this.data.bannerList)
      } else {
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 1500,
        })
      }
    })
  },
  // 轮播跳转页面
  toBannerDetail: function (ev) {
    console.log('点击了', ev)
    let event = ev.currentTarget.dataset
    let isJump = event.index
    let url = event.url
    let id = event.id
    console.log(url);
    // console.log(param,url);
    // if (id == '37') {
    
    // }
    if (isJump == 0) {
      console.log('不跳转', 0);
    }
    if (isJump == 1) {
      wx.navigateTo({
        url: `${url}`,
      })
    }
    if (isJump == 2) {
      console.log('跳转外部', 2);
    }
    if (isJump == 3) {
      console.log('打开视频', 3);
      this.setData({
        show: !this.data.show,
        path:this.data.host+url

      })
    }
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
    console.log(page, size);

    let { newsList, params } = this.data;
    ++page;
    let res = await getNews({ params, page, size })
    if (res.data.rows.length > 0) {
      newsList = newsList.concat(res.data.rows)
      this.setData({ newsList })
      wx.showToast({
        title: '拼命加载中',
        icon: 'loading',
        duration: 1500,
      })
    } else {
      --page;
      console.log('ssss', page, res);
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