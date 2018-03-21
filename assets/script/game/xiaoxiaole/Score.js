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
        _reward: 0,// 分数奖励倍数
    },

    // 分数奖励倍数
    setReward:function(reward){
        this._reward = reward;
    },

    // 更新分数显示
    updateScore:function(){
        this.score += this._reward;
        this.scoreLabel.string = "Score:"+this.score;
    }
});