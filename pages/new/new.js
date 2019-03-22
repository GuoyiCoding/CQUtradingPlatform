Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: null,
    classId: null,
    classification: null,
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
    var that = this
    wx.request({
      url: app.data.apiUrl + '/goods/class',
      success: function (res) {
        that.setData({
          classification: res.data.data
        })
      }
    })
  },
  bindPickerChange: function (e) {
  var that = this
  console.log('携带值为', e.detail.value)
  that.setData({
    classId: that.data.classification[e.detail.value].id
  })
  },
})