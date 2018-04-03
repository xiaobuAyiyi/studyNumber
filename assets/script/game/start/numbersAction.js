cc.Class({
    extends: cc.Component,

    properties: {
        numbers: {
            default: [],
            type: cc.Node,
            tooltip: '数字，此属性是数组'
        },
        
        _timeID: -1,
        _setTimeId: -1,
    },

    onLoad() {
        //执行动作
        this._action();
        this._startInterval();
    },

    onDestroy() {
        this._stopInterval();
        this._stopSetTimeout();
    },
    
    // 设置一个定时器
    _startInterval() {
        this._timeID = setInterval(this._action.bind(this), 4000);
    },

    // 停止定时器
    _stopInterval() {
        clearInterval(this._timeID);
        this._timeID = -1;
    },

    // 设置一个暂停执行定时器
    _stopSetTimeout() {
        clearInterval(this._setTimeId);
        this._setTimeId = -1;
    },

    // 动画展示
    _action() {
        let act1 = this._threeAction();
        let act2 = this._twoAction();
        let act3 = cc.sequence(act2, act1);
        let self = this;
        for (let i = 0; i < this.numbers.length; i++) {
            this._setTimeId = setTimeout(function() {
                if(i === 0 || i === 2) {
                    self.numbers[i].runAction(act1);
                }
                else if(i === 1){
                    self.numbers[i].runAction(act2);
                }
                else {
                    self.numbers[i].runAction(act3);
                }
            }, i * 1000);
        }
    },

    // 数字一和三跳动动画
    _threeAction() {
        //跳跃上升
        let jumpUp = cc.moveBy(0.3, cc.p(0, 20)).easing(cc.easeCubicActionOut());
        // 下落
        let jumpDown = jumpUp.reverse();
        //y轴方向缩小
        let narrow = cc.scaleTo(0.3, 1, 0.85);
        //y轴方向放大
        let magnify = cc.scaleTo(0.3, 1, 1);
        let action = cc.sequence(cc.spawn(jumpUp, narrow), cc.spawn(jumpDown, magnify));
        return action;
    },

    // 数字二动画,左右摇摆
    _twoAction() {
        //向右旋转
        let right = cc.rotateTo(0.2, 0, 0).easing(cc.easeCubicActionOut());
        //向左旋转
        let left = cc.rotateTo(0.2, -40, -40).easing(cc.easeCubicActionOut());
        let action = cc.sequence(left, right);
        return action;
    },
});