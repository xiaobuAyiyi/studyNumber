const UITools = require('UITools');
const Event = require('event');
const smartFox = require('smartFox');

cc.Class({
    extends: cc.Component,

    properties: {
        btn_xxl: {
            default: null,
            type: cc.Node,
            displayName: '数字消消消按钮',
            toolip: '点击加载数字消消消',
        },

        btn_ssg: {
            default: null,
            type: cc.Node,
            displayName: '数水果',
            tooltip: '点击加载数水果',
        },

        btn_fsz: {
            default: null,
            type: cc.Node,
            displayName: '翻数字',
            tooltip: '点击加载翻数字',
        },
    },

    onLoad() {
        this._onEvent();
    },

    onDestroy() {
        this._offEvent();
    },

    _onEvent() {
        UITools.onClick(this.btn_xxl, this._onBtn_xxl, this);
        UITools.onClick(this.btn_ssg, this._onBtn_ssg, this);
        UITools.onClick(this.btn_fsz, this._onBtn_fsz, this);
    },

    _offEvent() {
        UITools.offClick(this.btn_xxl, this._onBtn_xxl);
        UITools.offClick(this.btn_ssg, this._onBtn_ssg);
        UITools.offClick(this.btn_fsz, this._onBtn_fsz);
    },

    /**
     * 数字消消乐按钮回调
     */
    _onBtn_xxl() {
        cc.director.loadScene('game');
        smartFox.setGameType('xxl');
    },

    /**
     * 数水果按钮回调
     */
    _onBtn_ssg() {
        cc.director.loadScene('game');
        smartFox.setGameType('ssg');
    },

    /**
     * 翻数字按钮回调
     */
    _onBtn_fsz() {
        cc.director.loadScene('game');
        smartFox.setGameType('fsz');
    },
});