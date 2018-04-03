const Event = require('event');

cc.Class({
    extends: cc.Component,

    properties: {
        //数字图标
        icons: {
            default: [],
            type: cc.SpriteFrame,
        },

        //位置
        pos: {
            default: new cc.Vec2
        },

        _number: -1,
        iconIndex: 0, //图片下标
    },

    // 初始化
    onLoad: function () {
        let currentNumber = cc.sys.localStorage.getItem(Event.localStorage.number);
        this._number = currentNumber || 1;
        this._action();
    },

    /**
     * 设置图片
     * @param iconIndex 图片下标
     */
    setSpriteFrame(iconIndex) {
        let sprite = this.getComponent(cc.Sprite);
        sprite.spriteFrame = this.icons[iconIndex];
    },

    /**
     * 当前节点的动画
     */
    _action() {
        let scaleTo = cc.scaleTo(0.5, 0.9),
            reverse = cc.scaleTo(0.5, 1),
            seq = cc.repeatForever(cc.sequence(scaleTo, reverse));
        this.node.runAction(seq);
    },
});