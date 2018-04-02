const Event = require('event');
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
        this._init();
        this._gameActive();
    },

    _init() {
        this.xiaoxiaole.active = false;
    },

    _gameActive() {
        if(smartFox === null || smartFox.gameType === null || smartFox.gameType === undefined) {
            return;
        }
        if(smartFox.gameType === 'xxl') {
            if(this.xiaoxiaole) {
                this.xiaoxiaole.active = true;
            }
        }
    },
});
