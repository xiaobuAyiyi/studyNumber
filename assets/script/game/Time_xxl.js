cc.Class({
    extends: cc.Component,

    properties: {
        time_label: {
            default: null,
            type: cc.Label,
            displayName: '时间框'
        },

        time: 0,
    },

    onLoad: function () {
        this.schedule(this._updataTime, 1);
    },

    //更新时间的回调函数
    _updataTime:function(){
        this.time ++;
        this.time_label.string="Time:" + this.time;
    }
});