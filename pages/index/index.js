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
    wx.showToast({
      title: '刷新中...',
      icon: 'loading',
      mask: true,
      duration: 3000
    })

    wx.request({
      url: 'http://120.78.213.69:8000/show_all_product/',
      method: 'POST',
      header: {
        "Content-Type": 'application/x-www-form-urlencoded'
      },
      data: {
        type: 1
      },
      success: function (res) {
        console.log('返回    ' + JSON.stringify(res))
        // var jsdata = res.data;
        // var msg = jsdata.msg;

        // that.data.historySmallImages = []
        // that.data.historyBigImages = []
        // if (msg == "failed") {
        //   that.setData({
        //     historyHave: false
        //   })
        // }
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

