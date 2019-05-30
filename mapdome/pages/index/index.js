// const app = getApp()



Page({

  data: {

    longitude: '108.947040',

    latitude: '34.259430',

  },

  onLoad() {



  },

  regionchange(e) {

    console.log(e)

    // 地图发生变化的时候，获取中间点，也就是用户选择的位置toFixed

    if (e.type == 'end' && (e.causedBy == 'scale' || e.causedBy == 'drag')) {

      console.log(e)

      var that = this;

      this.mapCtx = wx.createMapContext("map4select");

      this.mapCtx.getCenterLocation({

        type: 'gcj02',

        success: function (res) {

          console.log(res, 11111)

          that.setData({

            latitude: res.latitude,

            longitude: res.longitude,

          })

        }

      })

    }

  },

  //定位到自己的位置事件

  my_location: function (e) {

    var that = this;

    that.onLoad();

  },

})