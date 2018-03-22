const UITools = require('UITools');

cc.Class({
    extends: cc.Component,

    properties: {
        close_node: {
            default: null,
            type: cc.Node,
            displayName: "关闭按钮或者sprite",
            tooltip: "关闭按钮或者sprite会删除销毁当前附加的对象关闭节点可以为空,为空时默认当前节点为监听按钮",
        },

        destroy_node: {
            default: null,
            type: cc.Node,
            displayName: "要销毁的节点",
            tooltip: "要销毁的节点当前节点可以为空,为空时默认销毁当前节点",
        }
    },

    // use this for initialization
    onLoad: function () {
        UITools.onClick(this.close_node || this.node, this._onTouchUp.bind(this), this.node);
    },

    _onTouchUp: function (event) {
        if (this.destroy_node) {
            this.destroy_node.destroy();
        }
        else {
            this.node.destroy();
        }
    },
});