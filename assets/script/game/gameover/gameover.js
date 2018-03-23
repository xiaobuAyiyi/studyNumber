const UITools = require('UITools');
const Event = require('event');

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
    },

    onLoad() {
        this._onEvent();
    },

    onDestroy() {
        // cc.sys.localStorage.setItem(Event.localStorage.gameOverIsCreate, 0);//本地存储
        this._offEvent();
    },

    //添加监听事件
    _onEvent() {
        UITools.enterClick(this.backHall, this._zoomBigAction, this);
        UITools.leaveClick(this.backHall, this._zoomSmallAction, this);
        UITools.onClick(this.backHall, this._onBackHall, this);
        
        UITools.enterClick(this.backGame, this._zoomBigAction, this);
        UITools.leaveClick(this.backGame, this._zoomSmallAction, this);
        UITools.onClick(this.backGame, this._onBackGame, this);

        UITools.enterClick(this.nextGame, this._zoomBigAction, this);
        UITools.leaveClick(this.nextGame, this._zoomSmallAction, this);
        UITools.onClick(this.nextGame, this._onNextGame, this);
    },

    //注销监听事件
    _offEvent() {
        UITools.offEnterClick(this.backHall, this._zoomBigAction);
        UITools.offLeaveClick(this.backHall, this._zoomSmallAction);
        UITools.offClick(this.backHall, this._onBackHall);

        UITools.offEnterClick(this.backGame, this._zoomBigAction);
        UITools.offLeaveClick(this.backGame, this._zoomSmallAction);
        UITools.offClick(this.backGame, this._onBackGame);

        UITools.offEnterClick(this.nextGame, this._zoomBigAction);
        UITools.offLeaveClick(this.nextGame, this._zoomSmallAction);
        UITools.offClick(this.nextGame, this._onNextGame);
    },

    //返回大厅回调
    _onBackHall() {
        console.log('销毁')
        this.node.destroy()
        //销毁当前的节点,同时销毁当前游戏节点,跳转到大厅界面
    },

    //返回当场游戏回调
    _onBackGame() {
        //销毁当前节点,返回当前所在游戏
        this.node.active = false;
    },

    //跳转到下一个游戏回调
    _onNextGame() {
        //跳转到下一个游戏,需要销毁当前节点和当前游戏节点
    },

    //触碰按钮时的回调,按钮放大动画
    _zoomBigAction(event) {
        let evet = event;
        if(evet.currentTarget == this.backHall) {
            this.backHall.scaleX = 1.1;
            this.backHall.scaleY = 1.1;
            return;
        }
        if(evet.currentTarget == this.backGame) {
            this.backGame.scaleX = 1.1;
            this.backGame.scaleY = 1.1;
            return;
        }
        if(evet.currentTarget == this.nextGame) {
            this.nextGame.scaleX = 1.1;
            this.nextGame.scaleY = 1.1;
            return;
        }
    },

    //触碰按钮时的回调,按钮缩小动画
    _zoomSmallAction(event) {
        let evet = event;
        if(evet.currentTarget == this.backHall) {
            this.backHall.scaleX = 1;
            this.backHall.scaleY = 1;
            return;
        }
        if(evet.currentTarget == this.backGame) {
            this.backGame.scaleX = 1;
            this.backGame.scaleY = 1;
            return;
        }
        if(evet.currentTarget == this.nextGame) {
            this.nextGame.scaleX = 1;
            this.nextGame.scaleY = 1;
            return;
        }
    },
});
