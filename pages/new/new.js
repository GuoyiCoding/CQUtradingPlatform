Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: [],
    typeId:0,
    // : [
    //   {
    //     id: 0,
    //     name: '美国'
    //   },
    //   {
    //     id: 1,
    //     name: '中国'
    //   },
    //   {
    //     id: 2,
    //     name: '巴西'
    //   },
    //   {
    //     id: 3,
    //     name: '日本'
    //   }
    // ],
    type: ['手机数码','书籍','家用电器','其他'],
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
      url: '/goods/class',
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
      typeId: e.detail.value
    })
  },

  chooseImage(e) {
    var that = this
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        // app.globalData.imgs = tempFilePaths
        var paths = that.data.images
        for(var i=0;i<tempFilePaths.length;i++)
        {
          paths.push(tempFilePaths[i])
        }
        console.log(paths)
        that.setData({
          images: paths
        });
      }
    })
  },
})