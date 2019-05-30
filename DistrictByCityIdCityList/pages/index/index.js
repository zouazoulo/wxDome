// 引入SDK核心类
var QQMapWX = require('../qqmap-wx-jssdk.js');

// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: 'RRTBZ-RM5W2-KE5UK-CKZ4F-JZPJJ-5ZF44' // 必填
});

Page({
  //在Page({})中使用下列代码
  //页面显示/切入前台时触发
  onShow: function () {
    /** var _this = this;
    //调用获取城市列表接口
    qqmapsdk.getCityList({
      success: function (res) {//成功后的回调
        console.log(res);
        console.log('省份数据：', res.result[0]); //打印省份数据
        console.log('城市数据：', res.result[1]); //打印城市数据
        console.log('区县数据：', res.result[2]); //打印区县数据
      },
      fail: function (error) {
        console.error(error);
      },
      complete: function (res) {
        console.log(res);
      }
    });
    **/
    var _this = this;
    //调用获取城市列表接口
    qqmapsdk.getCityList({
      success: function (res) {//成功后的回调
        console.log(res);
        console.log('省份数据：', res.result[0])
        var city = res.result[0];
        //根据对应接口getCityList返回数据的Id获取区县数据（以北京为例）
        qqmapsdk.getDistrictByCityId({
          // 传入对应省份ID获得城市数据，传入城市ID获得区县数据,依次类推
          id: city[0].id, //对应接口getCityList返回数据的Id，如：北京是'110000'
          success: function (res) {//成功后的回调
            console.log(res);
            console.log('对应城市ID下的区县数据(以北京为例)：', res.result[0]);
          },
          fail: function (error) {
            console.error(error);
          },
          complete: function (res) {
            console.log(res);
          }
        });
      },
      fail: function (error) {
        console.error(error);
      },
      complete: function (res) {
        console.log(res);
      }
      });
  }
})