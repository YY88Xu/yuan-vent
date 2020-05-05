// component/classic/music/index.js
import { classicBeh } from '../classic-beh.js'
let mMgr = wx.getBackgroundAudioManager();
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],
  properties: {
    src: String,
    title: String
  },
  attached: function () {
    this._setRevoery();
    this._monitorSwitch();
  },

  /**
   * 组件的初始数据
   */
  data: {
    playSrc: 'images/player@play.png',
    pauseSrc: 'images/player@pause.png',
    playing: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay(){
      if(!this.data.playing){
        this.setData({
          playing: true
        })
        mMgr.title = this.properties.title;
        mMgr.src = this.properties.src;
      } else {
        this.setData({
          playing: false
        })
        mMgr.stop();
      }
    },
    _setRevoery(){
      if(mMgr.paused){
        this.setData({
          playing: false
        });
        return;
      }

      if (mMgr.src == this.properties.src) {
        this.setData({
          playing: true
        })
      }
    },

    _monitorSwitch(){
      mMgr.onPlay(()=>{
        this._setRevoery();
      });

      mMgr.onPause(() => {
        this._setRevoery();
      });

      mMgr.onStop(() => {
        this._setRevoery();
      });

      mMgr.onEnded(() => {
        this._setRevoery();
      });

    }
  }
})
