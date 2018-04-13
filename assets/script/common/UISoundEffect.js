const UITools = require('UITools');
const AudioManager = require('AudioManager');

cc.Class({
    extends: cc.Component,
    properties: {
        target: {
            default: null,
            type: cc.Node,
            displayName: "触发播放声音按钮",
            tooltip: "没有设置为当前节点设置了为设置节点"
        },
        effectName: {
            default: '',
            displayName: '音效文件名'
        },
        
        isCommon: {
            default: true,
            displayName: '该文件是否为公共文件',
            tooltip: '该文件是否为公共文件'
        },
    },

    onLoad: function () {
        UITools.startClick(this.target || this.node, this._onTouchUp.bind(this), this.node);
    },

    _onTouchUp: function (event) {
        if (this.effectName != '') {
            AudioManager.playEffect(this._getGameType(), this.effectName + '.mp3');
        }
    },
});
