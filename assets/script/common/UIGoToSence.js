const UITools = require('UITools');

cc.Class({
    extends: cc.Component,

    properties: {
        target: {
            default: null,
            type: cc.Node,
            displayName: "跳转场景触发节点",
            tooltip: "跳转场景触发节点"
        },

        senceName: {
            default: '',
            displayName: "跳转场景的名字",
            tooltip: "跳转场景的名字适用于直接跳转场景不做任何服务跳转的"
        }
    },

    onLoad: function () {
        if (this.senceName != "")
            cc.director.preloadScene(this.senceName);
        UITools.onClick(this.target, this._onTouchUp.bind(this), this.node);
    },

    _onTouchUp: function (event) {
        cc.director.loadScene(this.senceName);
    },
});
