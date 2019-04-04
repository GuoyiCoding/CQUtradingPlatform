//index.js
//获取应用实例
var app = getApp();

Page({
  data: {
    goods: null,
    num: 5, //默认首页初始化五条商品信息
    classId: {
      'phone': 1,
      'book': 2,
      'computer': 3,
    }
  },

  onShow: function () {

    var that = this
    // wx.request({
    //   url: '/goods/' + that.data.isList + '/' + that.data.num,
    //   success: function (res) {
    //     that.setData({
    //       goods: res.data.data
    //     })
    //   }
    // })
  },
  onLoad: function () {
    wx.showToast({
      title: '',
      icon: 'loading',
      duration: 1000
    })
  },
  onReachBottom: function () {/*什么意思？？ */
    var that = this
    wx.showToast({
      title: '',
      icon: 'loading',
      duration: 1000
    })
    that.setData({
      num: that.data.num += 5
    })
    // wx.request({
    //   url: app.data.apiUrl + '/goods/' + that.data.isList + '/' + that.data.num,
    //   success: function (res) {
    //     that.setData({
    //       goods: res.data.data
    //     })
    //   }
    // })
  },
})

