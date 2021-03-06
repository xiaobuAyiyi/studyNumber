const UITools = require('UITools');
const gameLayout = require('gameLayout');

cc.Class({
    extends: cc.Component,

    properties: {
        numberPrefab: {
            default: null,
            type: cc.Prefab,
            displayName: '数字消消消预制',
        },

        numberButton: {
            default: null,
            type: cc.Node,
            displayName: '数字消消消按钮',
            toolip: '点击加载数字消消消预制',
        },
    },

    onLoad() {
        this._onEvent();
    },

    onDestroy() {
        this._offEvent();
    },

    _onEvent() {
        UITools.onClick(this.numberButton, this._onNumberButton, this);
    },

    _offEvent() {
        UITools.offClick(this.numberButton, this._onNumberButton, this);
    },

    _onNumberButton() {
        let game_number = cc.instantiate(this.numberPrefab);
        cc.find("Canvas").addChild(game_number);
    },
});
