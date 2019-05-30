/**
 * 获取服务器时间
 *
 * 时间差（服务器和系统时间差） =  服务器时间 - 系统时间 
 * 当前时间 = 系统时间 + 时间差 
 * 倒计时时间 =  结束时间 - 当前时间
 * 
**/

let goodsList = [
  { actEndTime: '2019/08/01 10:00:43' },
  { actEndTime: '2019/09/01 11:00:00' },
  { actEndTime: '2019/06/01 12:45:56' },
  { actEndTime: '2019/07/01 15:00:23' },
  { actEndTime: '2019/08/23 17:00:22' },
  { actEndTime: '2019/08/14 19:00:44' },
  { actEndTime: '2019/08/21 21:00:34' },
  { actEndTime: '2019/06/17 09:00:37' },
  { actEndTime: '2019/10/21 08:00:59' },
  { actEndTime: '2019/09/19 07:00:48' },
  { actEndTime: '2019/09/28 10:00:11' }
]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    countDownList: [],
    actEndTimeList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    let endTimeList = [];
    goodsList.forEach((item)=>{
      endTimeList.push(item.actEndTime)
    })
    this.setData({
      actEndTimeList: endTimeList
    })
    this.countDownFn()
  },
  timeFormat(param){ //小于10 前加 0
    return param < 10 ? '0' + param : param; 
  },
  timeProcessing(t){
    let  time = Math.floor(t / 1000);
    let  obj = {};
    if(time>0){
      // let day = Math.floor(time / (3600 * 24));
      // let hous = Math.floor((time - day * (3600 * 24)) / 3600);
      // let min = Math.floor((time - day * (3600 * 24) - (hous * 3600)) / 60);
      // let sec = (time % 60);
      let day = Math.floor(time / (60 * 60 * 24));
      let hous = Math.floor(time % (60 * 60 * 24) / 3600);
      let min = Math.floor(time % (60 * 60 * 24) % 3600 / 60);
      let sec = Math.floor(time % (60 * 60 * 24) % 3600 % 60);
      return obj={
        day: this.timeFormat(day),
        hou: this.timeFormat(hous),
        min: this.timeFormat(min),
        sec: this.timeFormat(sec)
      }
    }else{
      return obj ={
        day: '00',
        hou: '00',
        min: '00',
        sec: '00'
      }
    }
  },
  countDownFn(){
    let newTime = new Date().getTime();
    let endTimeList = this.data.actEndTimeList;
    let countDownArr = [];
    // console.log(endTimeList)
    endTimeList.forEach((arr)=>{
      let endTime = new Date(arr).getTime();
      let time = endTime - newTime
      let obj =  this.timeProcessing(time)
      countDownArr.push(obj);
      // console.log(countDownArr)
    })
    this.setData({ countDownList: countDownArr })
    setTimeout(this.countDownFn, 1000);
  },
  uniformTimeFormat (time) { //ios系统格式处理
    return new Date(time.trim().replace(/\-/g, '\/'));
  }
  
})