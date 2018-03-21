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

        number:0,
        sfIndex:0,
    },
    
    // use this for initialization
    onLoad: function () {
        this.initSpriteFrame();
    },

    initSpriteFrame:function(){
        function getRandomInt(min,max){
            var ratio = Math.random();
            return min + Math.floor((max - min) * ratio);
        }
        this.sfIndex = getRandomInt(0,this.number);
        // window.console.log(this.index);
        var sprite = this.getComponent(cc.Sprite);
        sprite.spriteFrame = this.icons[this.sfIndex];
    },
});