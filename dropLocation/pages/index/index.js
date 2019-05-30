// 引入SDK核心类
const QQMapWX = require('../qqmap-wx-jssdk.js');
let qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude:0.0,
    latitude:0.0,
    // height:"",
    moveData:{},
    currentTab: 0, 
    nearbyData:[],
    officeData: [],
    villageData:[],
    schoolData:[],
    currentAddress:{},
    scrollTop:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 实例化API核心类
     qqmapsdk = new QQMapWX({
      key: 'RRTBZ-RM5W2-KE5UK-CKZ4F-JZPJJ-5ZF44'
    });
    // wx.getSystemInfo({
    //   success: (res)=> {
    //     console.log(res)
    //     this.setData({
    //       height: res.windowHeight
    //     })
    //   },
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      console.log('定位开始')
      this.autoLocation()
  },
  regionchange(e){
    // console.log(e)
    // 地图发生变化的时候，获取中间点，也就是用户选择的位置toFixed
    if (e.type == 'end' && (e.causedBy == 'scale' || e.causedBy == 'drag')){
      // console.log(e)
      // marker 动画
      let moveData = wx.createAnimation({
        duration: 100,
        timingFunction: "linear",
      })
      this.moveData = moveData
      moveData.translateY(0).step()
      this.setData({
        moveData: moveData.export()
      })
      setTimeout(() => {
        moveData.translateY(20).step()
        this.setData({
          moveData: moveData.export()
        })
      }, 600)
      
      this.mapCtx = wx.createMapContext("address_map");
      this.mapCtx.getCenterLocation({
        type: 'gcj02',
        success: (res)=> {
          this.updateLocation(res)
          this.setData({
            latitude: res.latitude,
            longitude: res.longitude,
          })
        }

      })
    }
  },
  //定位到自己的位置事件
  my_location(e) {
    this.onLoad();
  },
  updateLocation(e){
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: e.latitude,
        longitude: e.longitude
      },
      get_poi: 1,
      poi_options: "radius=5000;page_index=6;page_size=20;policy=2;category=房产小区,大厦,教育学校",
      success:(res)=>{
        this.arrayProcessing(res)
      }
    })
  },
  /** 
   * 点击tab切换 
   */
  swichNav(e) {
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      this.setData({
        currentTab: e.target.dataset.current,
        scrollTop: 0
      })
    }
  },
  arrayProcessing(res){
    let data = res.result
    let currentAddress = {
      address: data.address,
      location: data.location
    }
    let allData = data.pois
    console.log(data)
    console.log(allData)
    let officeData = [], villageData = [], schoolData=[];

    for(let item of allData){
      if (item.category.split(":")[0] == "房产小区"){
        if (item.category.split(":")[1] == "商务楼宇"){
          officeData.push(item)
        }else{
          villageData.push(item)  
        }
      }else {
        schoolData.push(item)
      }
    }
    this.setData({
      nearbyData: allData ,
      currentAddress: currentAddress,
      officeData: officeData,
      villageData: villageData,
      schoolData: schoolData
    })
  },
  returnLocation(){
    console.log(1)
    let mpCtx = wx.createMapContext("address_map");
    mpCtx.moveToLocation();
    this.autoLocation()
  },
  autoLocation(){
    wx.getLocation({
      success: (res) => {
        this.updateLocation(res)
        let latitude = res.latitude;
        let longitude = res.longitude;
        this.setData({
          latitude: latitude,
          longitude: longitude,

        })
      },
      fail: (res) => {
        console.log('定位失败')
      }
    })
  },
  tap(e) {
    console.log(e)
  },
})
