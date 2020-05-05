// pages/classic/classic.js
import {HTTP} from '../../utils/http.js'
let http = new HTTP();
import { $ajax } from '../../utils/ajax.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
    first: false,
    latest: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    http.request({
      url: 'classic/latest',
      success: (res)=>{
       // console.log(res);
      }
    })

    $ajax({ url: 'classic/latest'}).then(res=>{
      let classic = res;
      this.setData({
        classic: classic
      });
      this._setLocal(res.index);
    })
  },

  onLike(event){
    let behavior = event.detail.behavior;
    console.log(behavior);
  },

  _setLocal(index){
    wx.setStorageSync('classic', index);
  },
  _getLocal(index){
    return wx.getStorageSync('classic');
  },
  onPrevious(){
    this.getClassic('previous');
  },
  onNext(){
    this.getClassic('next');
  },
  getClassic(nextOrPrevious){
    let url = 'classic/' + nextOrPrevious;
    $ajax({ url: url, data: { index: this.data.classic.index }, method: 'post' }).then(res => {
      let classic = res;

      this.setData({
        classic: classic,
        first: res.index==1,
        latest: this._getLocal('classic')==res.index
      });

    })
  }
})