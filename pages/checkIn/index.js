// pages/checkIn/index.js
var app = getApp();
const iconUrl = app.globalData.iconUrl;
const hotel = app.globalData.hotel;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iconUrl: iconUrl,
    hotel: hotel,
    display: ''
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
  
  },

  // 跳转到莲花山庄酒店入住
  toHotel(e) {
    const id = e.currentTarget.dataset.id;
    var urls = '';
    if(id == '11') {
      urls = iconUrl + '/lhfzewm.png'
    } else if(id == '22') {
      urls = iconUrl + '/dchmderweima.png'
    } else if(id == '33') {
      urls = iconUrl + '/lzfderweima.png'
    } else {
      urls = ''
    }
    wx.downloadFile({
      url: urls,
      success: (res) => {
        wx.saveImageToPhotosAlbum({　　　　　　　　　//保存到本地
          filePath: res.tempFilePath,
          success(res) {
            wx.showToast({
              title: '请扫码识别酒店',
              icon: 'success',
              duration: 3000
            })
            wx.navigateToMiniProgram({
              appId: 'wxa2672720f50a4fb5',
            })
          },
          fail: function (err) {
            if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
              wx.openSetting({
                success(settingdata) {
                  console.log(settingdata)
                  if (settingdata.authSetting['scope.writePhotosAlbum']) {
                    console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
                  } else {
                    console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                  }
                }
              })
            }
          }
        })
      }
    })
    console.log(url)
    
    // const id = e.currentTarget.dataset.id;
    // var url = '';
    // if(id == '11') {
    //   url = hotel + '/dyneinfo/TeamStay/pages/Tuser_idCard.do?indbtime=20201230&tcustomerUser.groupNum=B2E14AE080999C13E050007F01002B09&tcustomerUser.companycode=4502023011&companyName=柳州碧水莲花酒店管理有限公司'
    // } else if(id == '22') {
    //   url = hotel + '/dyneinfo/TeamStay/pages/Tuser_idCard.do?indbtime=20201230&tcustomerUser.groupNum=B2E14AE080999C13E050007F01002B09&tcustomerUser.companycode=4502060095&companyName=柳州东城酒店投资管理有限公司（华美达酒店'
    // } else if(id == '33') {
    //   url = hotel + '/dyneinfo/TeamStay/pages/Tuser_idCard.do?indbtime=20201230&tcustomerUser.groupNum=B2E14AE080989C13E050007F01002B09&tcustomerUser.companycode=4502050001&companyName=柳州市柳州饭店'
    // } else {
    //   url = ''
    // }
    // var str = url.replace(/['=']/g,'$').replace(/['?']/g,'#').replace(/['&']/g,'@')
    // wx.navigateTo({
    //   url: 'hotel/index?url=' + str,
    // })
  },

  // 跳转到操作手册
  toManual: function() {
    wx.navigateTo({
      url: '/pages/checkIn/manual/index',
    })
  },
  choosefyImg: function () {
    var that = this;
    if(that.data.urls.length < 5) {
      wx.chooseImage({
        count: 5,
        sizeType: ['compressed', 'original'],
        sourceType: ['camera'],
        success: function(res) {
          that.data.urls.push(res.tempFilePaths[0]);
          console.log('相机地址：',that.data.urls);
          that.setData({
            urls: that.data.urls
          })
        }
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
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})