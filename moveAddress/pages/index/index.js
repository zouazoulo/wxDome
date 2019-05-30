

// 引入SDK核心类
var QQMapWX = require('../qqmap-wx-jssdk.js');
var qqmapsdk;
Page({
  data:{
    latitude: 0.0,
    longitude: 0.0,
    markers: [],
  },
  onReady() {
    console.log('定位开始')
    let that = this;
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        let latitude = res.latitude;
        let longitude = res.longitude;
        let marker = this.createMarker(res);
        this.setData({
          latitude: latitude,
          longitude: longitude,
          markers: this.getShopMarkers()
        })
      }
    })
  },
  onLoad: function () {
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'RRTBZ-RM5W2-KE5UK-CKZ4F-JZPJJ-5ZF44'
    });
  },
  startSearch: function (e) {
    // 调用接口
    qqmapsdk.search({
      keyword: e.detail.value,
      success: function (res) {
        console.log(res);
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    });
  },
  createMarker(point) {
    console.log(point)
    let latitude = point.latitude;
    let longitude = point.longitude;
    let marker = {
      iconPath: "../resoures/location.png",
      id: point.id || 0,
      latitude: latitude,
      longitude: longitude,
      width: 50,
      height: 50,
      callout: {
        content: point.name || '',
        color: '#000',
        fontSize: '16',
        borderRadius: '10',
        borderColor: '#000',
        bgColor: '#fff',
        padding: '6',
        display: 'ALWAYS',
        textAlign: 'center'

      }
    };
    return marker;
  },
  getShopMarkers() {
    let markers = [];
    console.log(shopData)
    // shopData.forEach((item)=>{
    //   console.log(item)
    // })
    for (let item of shopData) {
      console.log(item)
      let marker = this.createMarker(item);
      markers.push(marker)
    }

    return markers
  },
})
const shopData = [
  {
    "id": "34",
    "name": "果然好仓储管理中心",
    "latitude": "30.177857",
    "longitude": "120.200132"
  },
  {
    "id": "38",
    "name": "专用测试门店",
    "latitude": "30.18917970083626",
    "longitude": "120.1807326994259"
  },

]