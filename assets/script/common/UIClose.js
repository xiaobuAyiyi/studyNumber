const UITools = require('UITools');

cc.Class({
    extends: cc.Component,

    properties: {
        closeButton: {
            default: null,
            type: cc.Node,
            displayName: '触发按钮',
            tooltip: '点击关闭游戏,跳转到主界面'
        },

        closeNode: {
            default: null,
            type: cc.Node,
            displayName: '所要关闭的节点',
            tooltip: '所要关闭的节点,可以为空,为空则默认关闭当前挂载脚本节点'
        },
    },

    onLoad () {
        UITools.onClick(this.closeButton, this._onClose, this);
    },

    onDestroy() {
        UITools.offClick(this.closeButton, this._onClose);
    },

    /**
     * 如果关闭节点存在则关闭此节点，若不存在则默认关闭当前节点
     * @param event 监听回调信息
     */
    _onClose(event) {
        if(this.closeNode === null) {
            this.node.active = false;
        }
        else {
            this.closeNode.active = false;
        }
    },
});