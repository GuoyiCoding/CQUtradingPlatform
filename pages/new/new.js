Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    images: [],
    typeId:null,
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

  formSubmit: function (e) {
    var that = this
    var value = e.detail.value
    if (value.name == "") {
      wx.showToast({
        title: '标题不能为空',
        icon: "none"
      })
    }else if (value.describle == "") {
      wx.showToast({
        title: '描述不能为空',
        icon: "none"
      })
    }else if (that.data.typeId == null) {
      wx.showToast({
        title: '请选择分类',
        icon: "none"
      })
    }else if (value.price < 0 || value.price == "" || value.price > 99999999) {
      wx.showToast({
        title: '价格不能小于零',
        icon: "none"
      })
    }else if (value.telephone <=0 || value.telephone == "") {
      wx.showToast({
        title: '联系电话不能为空',
        icon: "none"
      })
    }else if (that.data.images.length == 0) {
      wx.showToast({
        title: '请上传照片',
        icon: "none"
      })
    }
    else {
      //这里添加一个延迟 以免用户多次添加
      wx.showToast({
        title: '发布中',
        icon: 'loading',
        duration: 30000
      })
      console.log("userId=" + app.data.userInfo.id +
        " name=" + value.name+
        " describle=" + value.describle +
        " typeId=" + that.data.typeId +
        " price=" + value.price+
        " telephone=" + value.telephone)
      wx.uploadFile({
        url: app.data.apiUrl + '/goods/add',
        filePath: images[i],
        name: 'picture',/*约定name为picture */
        header: {
          "Content-Type": "multipart/form-data"
        },
        formdata: {
          'openid': openid,
          'name': value.name,
          'describle': value.describle,
          'type': that.data.typeId,
          'price': value.price,
          'telephone': value.telephone,
          // 'name': 1,
          'picture': images[i]/*文件流放在formdata里面*/
        },
        success: function (res) {
          console.log(res.data)
          if (that.data.img != null) {
            for (var i = 0; i < that.data.img.length; i++) {
              wx.showToast({
                icon: 'loading',
                title: '正在上传'
              })
              console.log(that.data.img[i])
              wx.uploadFile({
                url: app.data.apiUrl + '/img/add',
                filePath: that.data.img[i],
                name: 'file',
                formData: {
                  goodsId: res.data.data.id,
                },
                success: function (res) {
                  console.log(res.data)
                  wx.showToast({
                    title: '上传成功',
                  })
                  wx.switchTab({
                    url: '/pages/index/index',
                  })
                },
                fail: function () {
                  wx.showToast({
                    icon: 'none',
                    title: '上传失败',
                  })
                }
              })
            }
          }
        }
      })
    } 
  }
})