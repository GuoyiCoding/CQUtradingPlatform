//index.js
//获取应用实例
var app = getApp();
var imageServer ='http://120.78.213.69:8088/thumb_'/*一定要加http！！！*/
Page({
  data: {
    goods: [],
    num: 20, //默认首页初始化五条商品信息
    typeId: {
      'phone': 1,
      'book': 2,
      'computer': 3,
    }
  },

  onShow: function () {
    var that = this
    wx.showToast({
      title: '刷新中...',
      icon: 'loading',
      mask: true,
      duration: 3000
    })

    wx.request({
      url: 'http://120.78.213.69:8000/show_latest_product/',
      method: 'POST',
      header: {
        "Content-Type": 'application/x-www-form-urlencoded'
      },
      data: {
        type: 1
      },
      success: function (res) {
        // console.log(res)
        var jsdata = res.data;
        var msg = jsdata.msg;

        if (msg == "failed") {
          console.log('获取最新商品失败')
        }
        else{
          // console.log(jsdata)
          // console.log(typeof (jsdata))
          var strdata=jsdata['data']
          // console.log(strdata)
          strdata=JSON.parse(strdata)
          var goods=[]
          for(var i=0;i<strdata.length;i++)
          {
            var fdata=strdata[i].fields
            var name=fdata.name
            var image = imageServer+fdata.file
            var price = fdata.price
            var describe = fdata.describe
            var product_id = strdata[i].pk
            // console.log(image)
            // console.log(fdata)
            goods.push({
              'product_id': product_id,
              'name': name,
              'describe': describe,
              'price': price,
              'goodsImg':image
            });
          }
          that.setData({
            goods:goods
          })
          // console.log(this.data.goods)
        }
      }
    })
  },
  onLoad: function () {
    wx.showToast({
      title: '',
      icon: 'loading',
      duration: 1000
    })
  },
  onReachBottom: function () {/*拉到底部刷新 */
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

