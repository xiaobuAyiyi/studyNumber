const UITools = require('UITools');
const Event = require('event');
const smartFox = require('smartFox');

cc.Class({
    extends: cc.Component,

    properties: {
        numberButton: {
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
        }
    },

    onLoad() {
        this._onEvent();
    },

    onDestroy() {
        this._offEvent();
    },

    _onEvent() {
        UITools.onClick(this.numberButton, this._onNumberButton, this);
        UITools.onClick(this.btn_ssg, this._onBtn_ssg, this);
    },

    _offEvent() {
        UITools.offClick(this.numberButton, this._onNumberButton);
        UITools.offClick(this.btn_ssg, this._onBtn_ssg);
    },

    _onNumberButton() {
        cc.director.loadScene('game');
        smartFox.setGameType('xxl');
    },

    _onBtn_ssg() {
        cc.director.loadScene('game');
        smartFox.setGameType('ssg');
    },
});