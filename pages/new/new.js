Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    images: [],
    typeId:0,
    type: ['手机数码','书籍','家用电器','其他'],
    isShowDelete:false,
    appid:'f12ccbd03ff68662a7b83721bc4eb42a'
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
    this.setData({
      isShowDelete: false
    });
    var that = this
    wx.chooseImage({
      count: 9-that.data.images.length,
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
        that.setData({
          images: paths
        });
      }
    })
  },
  clearDelete(e) {
    this.setData({
      isShowDelete: false
    });
  },
  showDelete(e) {
    this.setData({
      isShowDelete: true
    });
  },
  removeImageFirst:function(e) {/*带有function的是复杂的写法？ */
    var idx = e.currentTarget.dataset.index;
    var images = this.data.images
    images.splice(idx, 1)
    this.setData({
      images:images
    })
  },
  removeImageSecond: function (e) {/*带有function的是复杂的写法？ */
    var idx = e.currentTarget.dataset.index+3
    var images = this.data.images
    images.splice(idx, 1)
    this.setData({
      images: images
    })
  },
  removeImageThird: function (e) {/*带有function的是复杂的写法？ */
    var idx = e.currentTarget.dataset.index+6
    var images = this.data.images
    images.splice(idx, 1)
    this.setData({
      images: images
    })
  }, 
})