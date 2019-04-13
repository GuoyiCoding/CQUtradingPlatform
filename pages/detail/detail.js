//index.js
//获取应用实例
var app = getApp();
var imageServer = 'http://120.78.213.69:8088/'/*一定要加http！！！*/
Page({
  data: {
    goods: [],
    product_id:null,
    typeId: {
      'phone': 1,
      'book': 2,
      'computer': 3,
    }
  },
  onLoad: function (option) {
    this.setData({
      product_id: option.product_id,
    });
    console.log(option.product_id);
    var that = this
    wx.showToast({
      title: '努力加载中...',
      icon: 'loading',
      mask: true,
      duration: 3000
    })
    wx.request({
      url: 'http://120.78.213.69:8000/show_product_by_product_id/',
      method: 'POST',
      header: {
        "Content-Type": 'application/x-www-form-urlencoded'
      },
      data: {
        product_id: this.data.product_id
      },
      success: function (res) {
        console.log(res)
        var jsdata = res.data;
        var msg = jsdata.msg;
        if (msg == "failed") {
          console.log('获取最新商品失败')
        }
        else {
        //   // console.log(jsdata)
        //   // console.log(typeof (jsdata))
        //   var strdata = jsdata['data']
        //   // console.log(strdata)
        //   strdata = JSON.parse(strdata)
        //   var goods = []
        //   for (var i = 0; i < strdata.length; i++) {
        //     var fdata = strdata[i].fields
        //     var name = fdata.name
        //     var image = imageServer + fdata.file
        //     var price = fdata.price
        //     var describe = fdata.describe
        //     var product_id = strdata[i].pk
        //     // console.log(image)
        //     // console.log(fdata)
        //     goods.push({
        //       'product_id': product_id,
        //       'name': name,
        //       'describe': describe,
        //       'price': price,
        //       'goodsImg': image
        //     });
        //   }
        //   that.setData({
        //     goods: goods
        //   })
        //   // console.log(this.data.goods)
        }
      }
    })
  },
  onShow: function () {
  },
})

