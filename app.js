//app.js
App({
  onLaunch: function () {
    var that = this
    // 展示本地存储能力
      var logs = wx.getStorageSync('logs') || []
      logs.unshift(Date.now())
      wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
      // debugger
          wx.request({
              // url: that.globalData.host + '/login/v1/in/applets?code=' + res.code,
            url: that.globalData.host + '/login/v1/in/applets?code=' + res.code + '&appId=wxf585b434a78dc95d',
              method: 'POST',
              header: {
                  'content-type': 'application/x-www-form-urlencoded'
              },
              success: element => {
                  console.log('--------login', element)
                  if (!element.data.data.state) {
                      console.log('--------login222', !element.data.data.state)
                      if (element.data.data.mobile != null && element.data.data.mobile != '') {
                          that.globalData.userId = element.data.data.userId
                          wx.setStorageSync('userId', that.globalData.userId)
                          that.globalData.wxUserInfo = element.data.data
                          that.globalData.openId = element.data.data.openId
                          that.globalData.token=element.data.data.token
                      }
                  } else {
                      that.globalData.openId = element.data.data
                  }
              }
          })
      }
  });;
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  globalData: {
     // host: 'https://shopping.metro-orientalplaza.cn/api', // 正式
    //  imgUrl: 'https://shopping.metro-orientalplaza.cn/file', // 正式
     // imgUrl: 'http://183.66.230.94:5080/images/root/project', // 正式2
     //  host: 'https://192.168.1.10', // 测试吴川
      // host: 'https://192.168.1.102', // 测试刘同乐
      // host: 'https://ly.liaoin.com',//线上
      host: 'https://lzzhly.wglj.liuzhou.gov.cn', // 正式
      hotel: 'http://gxwldh.wglj.liuzhou.gov.cn', // 正式
        // hotel: 'http://gl.dyneinfo.com',
      // host: 'http://192.168.1.10:8080', // 测试刘同乐
      // host: 'gxwldh.wglj.liuzhou.gov.cn', // 测试刘同乐
     // host:'http://47.108.86.202:35100',
     // host: 'http://192.168.0.107/ZTwordMaven', // 测试
     // host: 'http://192.168.2.2:8080/ZTwordMaven', // 本地
     // host: 'http://192.168.2.76:8080/ZTwordMaven', // 本地
     // imgUrl:'http://39.98.185.89:8080/ZTwordMaven',// 本地
     // host:'http://192.168.3.176:8080/ZTwordMaven',// 佳林
     iconUrl:'https://lzzhly.wglj.liuzhou.gov.cn/icon',//图标And图片地址
     imgUrl:'https://lzzhly.wglj.liuzhou.gov.cn/image',//图标And图片地址
     wxInfo: null, //微信本地用户信息
     wxUserInfo: null, //微信用户信息
     userId: '', //用户id  402882827355b2d2017355bc8f910000
     appid: "wxf585b434a78dc95d",
     address: null,
     confirmOrder: null,
     openId: '',
     shareId: '', // 分想人ID
     weathers: ''//天气
  }
})