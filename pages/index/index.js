//index.js
//获取应用实例
var app = getApp();
var imageServer='http://120.78.213.69:8088/'/*一定要加http！！！*/
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
        console.log(res)
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
            console.log(image)
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
        // else {
        //   var strdata = jsdata.data
        //   // console.log('历史返回    ' + strdata)
        //   var jsd = JSON.parse(strdata)
        //   var historyPageNum = jsd.length % pageCount == 0 ? parseInt(jsd.length / pageCount) : parseInt(jsd.length / pageCount) + 1
        //   console.log('Num   ' + historyPageNum)
        //   that.setData({
        //     historyHave: true,
        //     historyPageNum: historyPageNum
        //   })
        //   for (var i = jsd.length - 1; i >= 0; i--) {
        //     var state = jsd[i]['fields']['state'] + ''
        //     var result = jsd[i]['fields']['result'] + ''
        //     var time = jsd[i]['fields']['time'] + ''
        //     var year = time.substring(0, 4)
        //     var month = time.substring(6, 7)
        //     var day = time.substring(8, 10)
        //     var clock = time.substring(11, 13)
        //     var minute = time.substring(14, 16)
        //     time = year + '年' + month + '月' + day + '日  ' + clock + ':' + minute

        //     if (state == '0' || state == '1') {
        //       result = '尚未计算完成'
        //     }
        //     else if (state == '2') {
        //       if (result == 'true') {
        //         result = '已感染'
        //       }
        //       else {
        //         result = '未感染'
        //       }
        //     }
        //     else {
        //       result = '计算失败'
        //     }
        //     if (result != '尚未计算完成') {
        //       that.data.historySmallImages.push({
        //         'name': imgServer + thumbPre + jsd[i]['fields']['originalPicUrl'].substring(7),
        //         'id': jsd[i]['pk'],
        //         'state': state,
        //         'result': result,
        //         'time': time
        //       });
        //       that.data.historyBigImages.push(imgServer + jsd[i]['fields']['originalPicUrl'].substring(7));
        //     }
        //   }
        // }
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

