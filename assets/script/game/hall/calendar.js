const UITools = require('UITools');
const Event = require('event');

cc.Class({
    extends: cc.Component,

    properties: {
        leftButton: {
            default: null,
            type: cc.Node,
            diaplayName: '左按钮',
            tooltip: '点击一次数字减少1',
        },

        rigthtButton: {
            default: null,
            type: cc.Node,
            diaplayName: '右按钮',
            tooltip: '点击一次数字增加1',
        },

        number: {
            default: null,
            type: cc.Label,
            diaplayName: '数字显示框',
            tooltip: '显示当前数字',
        },
    },

    onLoad() {
        this._init();
        this._onEvent();
    },

    onDestroy() {
        this._offEvent();
    },

    _init() {
        let math = cc.sys.localStorage.getItem(Event.localStorage.number);
        if(math) {
            this.number.string = math;
        }
        else {
            this.number.string = 1;
            cc.sys.localStorage.setItem(Event.localStorage.number, 1);
        }
        // console.log('当前数字', this.number.string);
    },

    //注册监听事件
    _onEvent() {
        //左边按钮的监听
        UITools.onClick(this.leftButton, this._onLeftButton, this);

        //右边按钮的监听
        UITools.onClick(this.rigthtButton, this._onRigthtButton, this);
    },

    //取消监听事件
    _offEvent() {
        UITools.offClick(this.leftButton, this._onLeftButton);
        UITools.offClick(this.rigthtButton, this._onRigthtButton);
    },

    /**
     * 左按钮的回调
     * 点击当前数字减一
     */
    _onLeftButton() {
        if(this.number.string != 1) {
            this.number.string--;
        }
        cc.sys.localStorage.setItem(Event.localStorage.number, this.number.string);//本地存储
    },

    /**
     * 右按钮的回调
     * 点击当前数字加一
     */
    _onRigthtButton() {
        if(this.number.string != 9) {
            this.number.string++;
        }
        cc.sys.localStorage.setItem(Event.localStorage.number, this.number.string);//本地存储
    },
});