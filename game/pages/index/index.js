Page({
  data:{
    background: [{ bg: "bg1", url: '/pages/out/out' }, { bg: "bg2", url: '/pages/out/out' }, { bg: "bg3",         url: '/pages/out/out'}],
    latitude:0.0,
    longitude:0.0,
    markers:[],
  },
  onReady(){
    this.mapCtx = wx.createMapContext('myMap')
  },
  onLoad(){
    console.log('定位开始')
    let that = this;
    wx.getLocation({
      type:'gcj02',
      success: (res) => {
        let latitude = res.latitude;
        let longitude = res.longitude;
        let marker = this.createMarker(res);
        this.setData({
          latitude: latitude,
          longitude:longitude,
          markers: this.getShopMarkers()
        })
      }
    })
  },
  getShopMarkers(){
    let markers = [];
    console.log(shopData)
    // shopData.forEach((item)=>{
    //   console.log(item)
    // })
    for(let item of shopData){
      console.log(item)
      let marker = this.createMarker(item);
      markers.push(marker)
    } 
   
    return markers
  },
  createMarker(point){
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
      callout:{
        content:point.name || '',
        color:'#000',
        fontSize:'16',
        borderRadius:'10',
        borderColor:'#000',
        bgColor:'#fff',
        padding:'6',
        display:'ALWAYS',
        textAlign:'center'

      }
    };
    return marker;
  },
  clickEvent(){
    wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗',
      success(res) {
        console.log(res)
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})
const shopData =[
  {
    "id":"34",
    "name":"果然好仓储管理中心",
    "latitude":"30.177857",
    "longitude": "120.200132"
  },
  {
    "id": "38",
    "name": "专用测试门店",
    "latitude": "30.18917970083626",
    "longitude": "120.1807326994259"
  },

]