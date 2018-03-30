const Event = require('event');
const EventBus = require('EventBus');
const smartFox = require('smartFox');

cc.Class({
    extends: cc.Component,

    properties: {
        xiaoxiaole: {
            default: null,
            type: cc.Node,
            displayName: '消消乐',
            tooltip: '消消乐预制装载节点',
        },

        gameOver: {
            default: null,
            type: cc.Node,
            displayName: '游戏结束',
        },
    },

    onLoad() {
        EventBus.on(Event.event.xiaoxiaoleOver, this._oneEliminateOver, this);
        console.log('游戏结束界面', this.gameOver)
        this._init();
        this._gameActive();
    },

    _init() {
        this.xiaoxiaole.active = false;
        this.gameOver.active = false;
    },

    _gameActive() {
        if(smartFox === null || smartFox.gameType === null || smartFox.gameType === undefined) {
            return;
        }
        if(smartFox.gameType === 'xxl') {
            this.xiaoxiaole.active = true;
        }
    },

    _oneEliminateOver() {
        console.log(this.gameOver)
        this.gameOver.active = true;
    }
});
