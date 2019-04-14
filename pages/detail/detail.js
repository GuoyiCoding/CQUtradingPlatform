//index.js
//获取应用实例
var app = getApp();
var imageServer = 'http://120.78.213.69:8088/thumb_'/*一定要加http！！！*/
Page({
  data: {
    pictures: [],
    product_id:null,
    name:'',
    describe:'',
    price:null,
    telephone:null,
  },
  onLoad: function (option) {
    this.setData({
      product_id: option.product_id,
    });
    console.log(option);
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
        // console.log(res)
        var jsdata = res.data;
        var msg = jsdata.msg;
        if (msg == "failed") {
          console.log('获取最新商品失败')
        } 
        else {
          console.log(jsdata)
        //   // console.log(typeof (jsdata))
          var strdata = jsdata['data']
          // console.log(strdata)
          var name = strdata['product']['name']
          var describe = strdata['product']['describe']
          var price=strdata['product']['price']
          var telephone = strdata['product']['telephone']
          var strPictures = strdata['pictures']
          console.log(strPictures)
          console.log(typeof(strPictures))
          // strPictures="'"+strPictures+"'"
          // var strLen = strPictures.length
          // strPictures=strPictures.substring(1,strLen-1)
          // console.log(strPictures)
          var jsPictures=JSON.parse(strPictures)
          // console.log(jsPictures[0]['fields'])
        //   var goods = []
          var pictures=[]
          for (var i = 0; i < jsPictures.length; i++) {
            var fdata = imageServer+jsPictures[i].fields.file
            pictures.push(fdata)
          }
          that.setData({
            name:name,
            describe:describe,
            price:price,
            telephone:telephone,
            pictures:pictures
          })
        //   // console.log(this.data.goods)
        }
      }
    })
  },
  onShow: function () {
  },
  iWant:function(){
    var that=this
    wx.showModal({
      title: '',
      showCancel:true,
      cancelText:'取消',
      cancelColor:'',
      confirmText	:'拨打电话',
      confirmColor:'',
      content: '当前平台只支持电话联系卖家',
      success(res) {
        if (res.confirm) {
          // console.log('用户点击确定')
          wx.makePhoneCall({
            phoneNumber: that.data.telephone,
          })
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })   
  }
})

