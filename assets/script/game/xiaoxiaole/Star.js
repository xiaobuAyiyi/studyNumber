const Event = require('event');

cc.Class({
    extends: cc.Component,

    properties: {
        //数字图标
        icons:{
            default:[],
            type:cc.SpriteFrame,
        },

        //位置
        pos:{
            default:new cc.Vec2
        },

        _number: 2,
        iconIndex:0,//图片下标
    },
    
    // use this for initialization
    onLoad: function () {
        let currentNumber = cc.sys.localStorage.getItem(Event.localStorage.number);
        if(currentNumber && currentNumber != 1) {
            this._number = currentNumber;
        }
        this._initSpriteFrame();
    },

    _initSpriteFrame:function(){
        function getRandomInt(min,max){
            let ratio = Math.random();
            return min + Math.floor((max - min) * ratio);
        }
        this.iconIndex = getRandomInt(0, this._number);
        let sprite = this.getComponent(cc.Sprite);
        sprite.spriteFrame = this.icons[this.iconIndex];
    },
});