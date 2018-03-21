cc.Class({
    extends: cc.Component,

    properties: {
        scoreLabel: {
            default: null,
            type: cc.Label,
            displayName: '分数显示框',
            tooltip: '用于显示分数',
        },

        score:0,
    },

    // 更新分数
    setReward:function(reward){
        this.score += reward;
        this.scoreLabel.string = "Score:" + this.score;
    },
});