let SmartFox = cc.Class({
    extends: cc.Component,

    properties: {
        gameType: null,
    },

    //设置游戏数据
    setGameType(data) {
        if(this.gameType === null) {
            this.gameType = {};
        }
        this.gameType = data;
    }
});

let smartFox = new SmartFox();
module.exports = smartFox;