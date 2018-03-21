const UITools = require('UITools');

cc.Class({
    extends: cc.Component,

    properties: {
        close: {
            default: null,
            type: cc.Node,
            displayName: '关闭游戏',
            tooltip: '点击关闭游戏,跳转到主界面'
        },
    },

    onLoad () {
        UITools.onClick(this.close, this._onClose, this);
    },

    onDestroy() {
        UITools.offClick(this.close, this._onClose);
    },

    //关闭按钮回调
    _onClose() {
        cc.director.loadScene("Game");
    },
});
