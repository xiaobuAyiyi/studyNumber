cc.Class({
    extends: cc.Component,

    properties: {
        nameNode:{
            default:null,
            type:cc.Node,
            displayName: '游戏名称',
            tooltip: '游戏的名称,此属性控制游戏名称节点的动画显示',
        },
    },

    onLoad() {
        //开始按钮动画播放
        this._nameNodeAction();
    },

    //游戏名称节点放大缩小的动画
    _nameNodeAction() {
        let scaleTo = cc.scaleTo(.8, .9);
        let reverse = cc.scaleTo(.8, 1);
        let seq = cc.sequence(scaleTo, reverse);//顺序执行将节点放大缩小的动作
        let repeat = cc.repeatForever(seq);//永远重复执行动作
        this.nameNode.runAction(repeat);
    },
});
