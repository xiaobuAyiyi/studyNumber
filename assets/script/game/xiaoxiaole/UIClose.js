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
        console.log('加载');
        UITools.onClick(this.close, this._onClose, this);
    },

    onDestroy() {
        UITools.offClick(this.close, this._onClose);
    },

    //关闭按钮回调
    _onClose(event) {
        console.log('关闭游戏');
        this.node.destroy();
        // cc.director.loadScene("Game");
    },
});