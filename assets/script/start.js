const UITools = require('UITools');

cc.Class({
    extends: cc.Component,

    properties: {
        nameNode:{
            default:null,
            type:cc.Node,
            displayName: '游戏名称',
            tooltip: '游戏的名称,此属性控制游戏名称节点的动画显示',
        },

        quit:{
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

        startButton:{
            default:null,
            type:cc.Node,
            displayName: '开始按钮',
            tooltip: '点击跳转到游戏场景',
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

        scriptNode:{
            default:null,
            type:cc.Node,
            displayName: '挂载脚本节点',
            tooltip: '挂载脚本节点',
        },

        numbers: {
            default: [],
            type: cc.Node,
        },

        slider_h: cc.Slider,
        music: cc.AudioSource,
        _volume : null,
        _timeID: -1,
        _setTimeId: -1,
    },

    onLoad() {
        //注册监听事件
        this._onEvent();
        //开始按钮动画播放
        this._nameNodeAction();
        //隐藏音乐设置面板
        this._hideMusicPanel();
        //执行动作
        this._action();
        this._startInterval();

        this.slider_h.progress = 0;//滑动器当前进度值，该数值的区间是 0-1 之间
        this._updateMusicVolume(this.slider_h.progress);//调整音量大小
        cc.audioEngine.stopAll();//停止正在播放的所有音频
        cc.audioEngine.play(this.underGroundAudio, true, this._volume);

        //将滑动器设置到上次离开时的位置
        let progress = cc.sys.localStorage.getItem('sliderProgress');
        if(progress) {
            this.slider_h.progress = progress;
        }
    },

    onDestroy() {
        //销毁监听事件
        this._offEvent();
        this._stopInterval();
        this._stopSetTimeout();
    },

    _onEvent() {
        UITools.onClick(this.quit, this._onQuit, this);
        UITools.onClick(this.musicButton, this._onMusic, this);
        UITools.onClick(this.startButton, this._onStart, this);
        this.slider_h.node.on('slide', this._onSliderHEvent, this);
    },

    _offEvent() {
        UITools.offClick(this.quit, this._onQuit);
        UITools.offClick(this.musicButton, this._onMusic);
        UITools.offClick(this.startButton, this._onStart);
        this.slider_h.node.off('slide', this._onSliderHEvent);
    },

    _hideMusicPanel() {
        this.musicPanel.active = false;
    },

    //游戏名称节点放大缩小的动画
    _nameNodeAction() {
        let scaleTo = cc.scaleTo(.8, .9);
        let reverse = cc.scaleTo(.8, 1);
        let seq = cc.sequence(scaleTo, reverse);//顺序执行将节点放大缩小的动作
        let repeat = cc.repeatForever(seq);//永远重复执行动作
        this.nameNode.runAction(repeat);
    },

    _startInterval() {
        this._timeID = setInterval(this._action.bind(this), 4000);
    },

    _stopInterval() {
        clearInterval(this._timeID);
        this._timeID = -1;
    },

    _stopSetTimeout() {
        clearInterval(this._setTimeId);
        this._setTimeId = -1;
    },

    _action() {
        let act1 = this._threeAction();
        let act2 = this._twoAction();
        let act3 = cc.sequence(act2, act1);
        let self = this;
        for (let i = 0; i < this.numbers.length; i++) {
            this._setTimeId = setTimeout(function() {
                if(i === 0 || i === 2) {
                    self.numbers[i].runAction(act1);
                }
                else if(i === 1){
                    self.numbers[i].runAction(act2);
                }
                else {
                    self.numbers[i].runAction(act3);
                }
            }, i * 1000);
        }
    },

    //数字一和三跳动动画
    _threeAction() {
        //跳跃上升
        let jumpUp = cc.moveBy(0.3, cc.p(0, 20)).easing(cc.easeCubicActionOut());
        // 下落
        let jumpDown = jumpUp.reverse();
        //y轴方向缩小
        let narrow = cc.scaleTo(0.3, 1, 0.85);
        //y轴方向放大
        let magnify = cc.scaleTo(0.3, 1, 1);
        let action = cc.sequence(cc.spawn(jumpUp, narrow), cc.spawn(jumpDown, magnify));
        return action;
    },

    //数字二动画,左右摇摆
    _twoAction() {
        //向右旋转
        let right = cc.rotateTo(0.2, 0, 0).easing(cc.easeCubicActionOut());
        //向左旋转
        let left = cc.rotateTo(0.2, -40, -40).easing(cc.easeCubicActionOut());
        let action = cc.sequence(left, right);
        return action;
    },

    //开始按钮的回调
    _onStart() {
        cc.director.loadScene("Game");//点击跳转场景
    },

    //播放声音的回调
    _onSliderHEvent (sender, eventType) {
        cc.sys.localStorage.setItem('sliderProgress', this.slider_h.progress);//本地存储
        this._updateMusicVolume(sender.progress);
    },

    _updateMusicVolume (progress) {
        this.music.volume = progress;//调整音量大小
        this._volume = this.music.volume;//将音量设为全局变量
        // console.log('this.music.volume: ', this.music);
    },

    //quit按钮的回调
    _onQuit(){
        cc.game.end();
    },

    //music按钮的回调
    _onMusic(evet){
        this.musicPanel.active = true;
    },

    //关闭音乐框的回调
    disActiveVolumeBar(){
        this.musicPanel.active = false;
    },
});