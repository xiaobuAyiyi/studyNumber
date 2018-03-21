const EventBus = require('EventBus');

cc.Class({
    extends: cc.Component,

    properties: {
        target: {
            default: null,
            type: cc.Prefab,
            displayName: '结束游戏预制',
        },
    },

    onLoad() {
        EventBus.on('xiaoxiaoleOver', this._oneEliminateOver, this);
    },

    onDistroy() {
        EventBus.off('xiaoxiaoleOver', this._oneEliminateOver);
    },

    _oneEliminateOver() {
        let gameOver = cc.instantiate(this.target);
        cc.find("Canvas").addChild(gameOver);
    },
});
