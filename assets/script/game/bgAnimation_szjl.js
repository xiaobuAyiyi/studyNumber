const EventBus = require('EventBus');
const Event = require('event');

cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad() {
        this.anim = this.getComponent(cc.Animation);
        this._onEvent();
    },

    _onEvent() {
        EventBus.on(Event.event.bgActionOne, this._bg_one, this);
        EventBus.on(Event.event.bgActioTwo, this._bg_two, this);
        EventBus.on(Event.event.bgActioThree, this._bg_three, this);
    },

    _offEvent() {
        EventBus.off(Event.event.bgActionOne, this._bg_one);
        EventBus.off(Event.event.bgActioTwo, this._bg_two);
        EventBus.off(Event.event.bgActioThree, this._bg_three);
    },

    // 播放第一个动画
    _bg_one() {
        this.anim.play("bg_one");
    },

    // 播放第二个动画
    _bg_two() {
        this.anim.play("bg_two");
    },

    // 播放第三个动画
    _bg_three() {
        this.anim.play("bg_three");
        this._timeout();
    },

    _timeout() {
        let me = this;
        this._timeId = setTimeout(function () {
            EventBus.emit(Event.event.gameOver);
        }, 1500);
    },
});
