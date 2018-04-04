const UITools = require('UITools');
const Event = require('event');
const EventBus = require('EventBus');
const smartFox = require('smartFox');

cc.Class({
    extends: cc.Component,

    properties: {
        backHall: {
            default: null,
            type: cc.Node,
            displayName: '返回大厅',
        },

        backGame: {
            default: null,
            type: cc.Node,
            displayName: '返回当前所在游戏',
        },

        nextGame: {
            default: null,
            type: cc.Node,
            displayName: '下一个游戏',
        },

        gameOver: {
            default: null,
            type: cc.Node,
            displayName: '游戏结束界面',
        }
    },

    onLoad() {
        this._onEvent();
    },

    onDestroy() {
        this._offEvent();
    },

    //添加监听事件
    _onEvent() {
        UITools.enterClick(this.backHall, this._zoomBigAction, this);
        UITools.leaveClick(this.backHall, this._zoomSmallAction, this);

        UITools.enterClick(this.backGame, this._zoomBigAction, this);
        UITools.leaveClick(this.backGame, this._zoomSmallAction, this);
        UITools.onClick(this.backGame, this._onBackGame, this);

        UITools.enterClick(this.nextGame, this._zoomBigAction, this);
        UITools.leaveClick(this.nextGame, this._zoomSmallAction, this);
        UITools.onClick(this.nextGame, this._onNextGame, this);

        EventBus.on(Event.event.gameOver, this._oneEliminateOver.bind(this), this);
    },

    //移除监听事件
    _offEvent() {
        UITools.offEnterClick(this.backHall, this._zoomBigAction);
        UITools.offLeaveClick(this.backHall, this._zoomSmallAction);

        UITools.offEnterClick(this.backGame, this._zoomBigAction);
        UITools.offLeaveClick(this.backGame, this._zoomSmallAction);
        UITools.offClick(this.backGame, this._onBackGame);

        UITools.offEnterClick(this.nextGame, this._zoomBigAction);
        UITools.offLeaveClick(this.nextGame, this._zoomSmallAction);
        UITools.offClick(this.nextGame, this._onNextGame);

        EventBus.off(Event.event.gameOver, this._oneEliminateOver.bind(this));
    },

    //返回当场游戏回调
    _onBackGame() {
        //隐藏当前节点,返回当前所在游戏,发送事件使得游戏节点重新运行以生成新的游戏
        if(this.gameOver) {
            this.gameOver.active = false;
        }
        if(smartFox.gameType == 'xxl') {
            EventBus.emit(Event.event.xiaoxiaoleBegin);
        }
        else if(smartFox.gameType == 'ssg') {
            EventBus.emit(Event.event.shushuiguoBegin);
        }
        else if(smartFox.gameType == 'fsz') {
            EventBus.emit(Event.event.fanshuziBegin);
        }
    },

    //跳转到下一个游戏回调
    _onNextGame() {
        //跳转到下一个游戏,需要销毁当前节点和当前游戏节点
    },

    //触碰按钮时的回调,按钮放大动画
    _zoomBigAction(event) {
        let evet = event;
        if (evet.currentTarget == this.backHall) {
            this.backHall.scaleX = 1.1;
            this.backHall.scaleY = 1.1;
            return;
        }
        if (evet.currentTarget == this.backGame) {
            this.backGame.scaleX = 1.1;
            this.backGame.scaleY = 1.1;
            return;
        }
        if (evet.currentTarget == this.nextGame) {
            this.nextGame.scaleX = 1.1;
            this.nextGame.scaleY = 1.1;
            return;
        }
    },

    //触碰按钮时的回调,按钮缩小动画
    _zoomSmallAction(event) {
        let evet = event;
        if (evet.currentTarget == this.backHall) {
            this.backHall.scaleX = 1;
            this.backHall.scaleY = 1;
            return;
        }
        if (evet.currentTarget == this.backGame) {
            this.backGame.scaleX = 1;
            this.backGame.scaleY = 1;
            return;
        }
        if (evet.currentTarget == this.nextGame) {
            this.nextGame.scaleX = 1;
            this.nextGame.scaleY = 1;
            return;
        }
    },

    //消消乐游戏结束的回调事件
    _oneEliminateOver() {
        // 隐藏游戏结束节点
        if (this.gameOver) {
            this.gameOver.active = true;
        }
    }
});