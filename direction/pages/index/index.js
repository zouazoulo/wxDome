// 引入SDK核心类
var QQMapWX = require('../qqmap-wx-jssdk.js');

// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: 'RRTBZ-RM5W2-KE5UK-CKZ4F-JZPJJ-5ZF44' // 必填
});
Page({
  //在Page({})中使用下列代码
  //触发表单提交事件，调用接口
 /** formSubmit(e) {
    var _this = this;
    //调用距离计算接口
    qqmapsdk.direction({
      mode: 'driving',//可选值：'driving'（驾车）、'walking'（步行）、'bicycling'（骑行），不填默认：'driving',可不填
      //from参数不填默认当前地址
      from: e.detail.value.start,
      to: e.detail.value.dest,
      success: function (res) {
        console.log(res);
        var ret = res;
        var coors = ret.result.routes[0].polyline, pl = [];
        //坐标解压（返回的点串坐标，通过前向差分进行压缩）
        var kr = 1000000;
        for (var i = 2; i < coors.length; i++) {
          coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
        }
        //将解压后的坐标放入点串数组pl中
        for (var i = 0; i < coors.length; i += 2) {
          pl.push({ latitude: coors[i], longitude: coors[i + 1] })
        }
        console.log(pl)
        //设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
        _this.setData({
          latitude: pl[0].latitude,
          longitude: pl[0].longitude,
          polyline: [{
            points: pl,
            color: '#FF0000DD',
            width: 4
          }]
        })
      },
      fail: function (error) {
        console.error(error);
      },
      complete: function (res) {
        console.log(res);
      }
    });
  }
  **/
  //在Page({})中使用下列代码
  //触发表单提交事件，调用接口
  formSubmit(e) {
    var _this = this;
    //调用距离计算接口
    qqmapsdk.direction({
      mode: 'transit',//'transit'(公交路线规划)
      //from参数不填默认当前地址
      from: e.detail.value.start,
      to: e.detail.value.dest,
      success: function (res) {
        console.log(res);
        var ret = res.result.routes[0];
        var count = ret.steps.length;
        var pl = [];
        var coors = [];
        //获取各个步骤的polyline
        for (var i = 0; i < count; i++) {
          if (ret.steps[i].mode == 'WALKING' && ret.steps[i].polyline) {
            coors.push(ret.steps[i].polyline);
          }
          if (ret.steps[i].mode == 'TRANSIT' && ret.steps[i].lines[0].polyline) {
            coors.push(ret.steps[i].lines[0].polyline);
          }
        }
        //坐标解压（返回的点串坐标，通过前向差分进行压缩）
        var kr = 1000000;
        for (var i = 0; i < coors.length; i++) {
          for (var j = 2; j < coors[i].length; j++) {
            coors[i][j] = Number(coors[i][j - 2]) + Number(coors[i][j]) / kr;
          }
        }
        //定义新数组，将coors中的数组合并为一个数组
        var coorsArr = [];
        for (var i = 0; i < coors.length; i++) {
          coorsArr = coorsArr.concat(coors[i]);
        }
        //将解压后的坐标放入点串数组pl中
        for (var i = 0; i < coorsArr.length; i += 2) {
          pl.push({ latitude: coorsArr[i], longitude: coorsArr[i + 1] })
        }
        //设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
        _this.setData({
          latitude: pl[0].latitude,
          longitude: pl[0].longitude,
          polyline: [{
            points: pl,
            color: '#FF0000DD',
            width: 4
          }]
        })
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
