const UITools = require('UITools');

cc.Class({
    extends: cc.Component,

    properties: {
        quitButton:{
            default:null,
            type:cc.Node,
            displayName: '退出按钮',
            tooltip: '退出游戏按钮,点击退出游戏并关闭网页',
        },

        musicButton:{
            default:null,
            type:cc.Node,
            displayName: '播放音乐按钮',
            tooltip: '点击播放音乐并设置音量大小',
        },

        underGroundAudio: {
            default: null,
            url: cc.AudioClip,
            tooltip: '音乐资源',
        },

        musicPanel:{
            default:null,
            type:cc.Node,
            displayName: '音乐设置面板',
            tooltip: '音乐设置面板',
        },

        slider: {
            default: null,
            type: cc.Slider,
            displayName: '滑动器',
        },
        
        music: cc.AudioSource,
        _volume : 0,
    },

    onLoad() {
        //注册监听事件
        this._onEvent();
        //隐藏音乐设置面板
        this._hideMusicPanel();

        this._playBGMusic();
    },

    onDestroy() {
        //销毁监听事件
        this._offEvent();
        this._volume = 0;
    },

    _playBGMusic() {
        //将滑动器设置到上次离开时的位置
        let progress = cc.sys.localStorage.getItem('sliderProgress');
        if(progress) {
            //滑动器当前进度值，该数值的区间是 0-1 之间
            this.slider.progress = progress;
            this._volume = progress;
        }
        this._updateMusicVolume(this.slider.progress);//调整音量大小
        cc.audioEngine.stopAll();//停止正在播放的所有音频
        cc.audioEngine.play(this.underGroundAudio, true, this._volume);
    },

    _onEvent() {
        UITools.onClick(this.quitButton, this._onQuitButton, this);
        UITools.onClick(this.musicButton, this._onMusic, this);
        this.slider.node.on('slide', this._onSliderHEvent, this);
    },

    _offEvent() {
        UITools.offClick(this.quitButton, this._onQuitButton);
        UITools.offClick(this.musicButton, this._onMusic);
        this.slider.node.off('slide', this._onSliderHEvent);
    },

    //初始加载时默认隐藏音乐设置面板
    _hideMusicPanel() {
        this.musicPanel.active = false;
    },

    //播放声音的回调
    _onSliderHEvent (sender, eventType) {
        cc.sys.localStorage.setItem('sliderProgress', this.slider.progress);//本地存储
        this._updateMusicVolume(sender.progress);
    },

    // 更新音量大小
    _updateMusicVolume (progress) {
        this.music.volume = progress;//调整音量大小
        this._volume = this.music.volume;//将音量设为全局变量
        // console.log('this.music.volume: ', this.music);
    },

    //quit按钮的回调,关闭游戏
    _onQuitButton(){
        cc.game.end();
    },

    //music按钮的回调,打开音乐设置面板
    _onMusic(evet){
        this.musicPanel.active = true;
    },
});