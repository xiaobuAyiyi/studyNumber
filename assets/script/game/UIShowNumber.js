const Event = require('event');

cc.Class({
    extends: cc.Component,

    properties: {
        icons: {
            default: [],
            type: cc.SpriteFrame,
            displayName: '',
            tooltip: '数字',
        },

        showNode: {
            default: null,
            type: cc.Node,
            displayName: '展示数字的节点',
            tooltip: '展示数字的节点，可以为空，若为空则默认展示在当前节点',
        },
    },

    onLoad() {
        this._setSpriteFrame()
    },

    /**
     * 展示数字，如果展示节点不为空，则展示在此节点上，若为空，则展示在当前节点上
     */
    _setSpriteFrame() {
        let number = cc.sys.localStorage.getItem(Event.localStorage.number),
            sprite;
        if (this.showNode) {
            sprite = this.showNode.getComponent(cc.Sprite);
        }
        else {
            sprite = this.getComponent(cc.Sprite);
        }
        sprite.spriteFrame = this.icons[number - 1];
    },
});