const EventBus = require('EventBus');
const Event = require('event');

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
        EventBus.onceOn(Event.event.xiaoxiaoleOver, this._oneEliminateOver, this);
    },

    onDestroy() {
        EventBus.onceOff(Event.event.xiaoxiaoleOver, this._oneEliminateOver);
    },

    _oneEliminateOver() {
        let gameOver = cc.instantiate(this.target);
        cc.find("Canvas").addChild(gameOver);
        // let gameOverIsCreate = parseInt(cc.sys.localStorage.getItem(Event.localStorage.gameOverIsCreate))
        // if(!gameOverIsCreate) {
        //     cc.sys.localStorage.setItem(Event.localStorage.gameOverIsCreate, 1);//本地存储
        //     let gameOver = cc.instantiate(this.target);
        //     cc.find("Canvas").addChild(gameOver);
        // }
    },
});
