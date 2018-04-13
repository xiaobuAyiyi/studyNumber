const Event = require('event');
const smartFox = require('smartFox');
const EventBus = require('EventBus');

cc.Class({
    extends: cc.Component,

    properties: {
        UI_xxl: {
            default: null,
            type: cc.Node,
            displayName: '消消乐',
            tooltip: '消消乐节点',
        },

        UI_ssg: {
            default: null,
            type: cc.Node,
            displayName: '数水果',
            tooltip: '数水果节点',
        },

        UI_fsz: {
            default: null,
            type: cc.Node,
            displayName: '翻数字',
            tooltip: '翻数字节点',
        },
    },

    onLoad() {
        this._init();
        this._onEvent();
    },

    // 注册监听
    _onEvent() {
        EventBus.on(Event.event.xxlNext, this._onXxlNext.bind(this), this);
        EventBus.on(Event.event.ssgNext, this._onSsgNext.bind(this), this);
        EventBus.on(Event.event.fszNext, this._onFszNext.bind(this), this);
    },

    // 移除监听
    _offEvent() {
        EventBus.off(Event.event.xxlNext, this._onXxlNext.bind(this));
        EventBus.off(Event.event.ssgNext, this._onSsgNext.bind(this));
        EventBus.off(Event.event.fszNext, this._onFszNext.bind(this));
    },

    // 初始化
    _init() {
        this.UI_xxl.active = false;
        this.UI_ssg.active = false;
        this.UI_fsz.active = false;
        this._gameActive();
    },

    // 控制游戏显示
    _gameActive() {
        if(smartFox === null || smartFox.gameType === null || smartFox.gameType === undefined) {
            return;
        }
        if(smartFox.gameType === 'xxl') {
            if(this.UI_xxl) {
                this.UI_xxl.active = true;
            }
        }
        else if(smartFox.gameType === 'ssg') {
            if(this.UI_ssg) {
                this.UI_ssg.active = true;
            }
        }
        else if(smartFox.gameType === 'fsz') {
            if(this.UI_fsz) {
                this.UI_fsz.active = true;
            }
        }
    },

    // 消消乐游戏结束时点击下一个按钮
    _onXxlNext() {
        this.UI_xxl.active = false;
        this.UI_ssg.active = true;
        EventBus.emit(Event.event.shushuiguoBegin);
        smartFox.setGameType('ssg');
    },

    // 数水果游戏结束时点击下一个按钮
    _onSsgNext() {
        this.UI_ssg.active = false;
        this.UI_fsz.active = true;
        EventBus.emit(Event.event.fanshuziBegin);
        smartFox.setGameType('fsz');
    },

    // 翻数字游戏结束时点击下一个按钮
    _onFszNext() {
        this.UI_fsz.active = false;
        this.UI_xxl.active = true;
        EventBus.emit(Event.event.xiaoxiaoleBegin);
        smartFox.setGameType('xxl');
    },
});