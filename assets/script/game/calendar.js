const UITools = require('UITools');
const NUMBER = 'number';

cc.Class({
    extends: cc.Component,

    properties: {
        leftButton: {
            default: null,
            type: cc.Node,
            diaplayName: '左按钮',
        },

        rigthtButton: {
            default: null,
            type: cc.Node,
            diaplayName: '右按钮',
        },

        number: {
            default: null,
            type: cc.Label,
            diaplayName: '数字显示框',
        },

        backButton: {
            default: null,
            type: cc.Node,
            diaplayName: '返回按钮',
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
        let math = cc.sys.localStorage.getItem(NUMBER);
        if(math) {
            this.number.string = math;
        }
        else {
            this.number.string = 1;
        }
        console.log(this.number.string)
    },

    //注册监听事件
    _onEvent() {
        //左边按钮的监听
        UITools.onClick(this.leftButton, this._onLeftButton, this);

        //右边按钮的监听
        UITools.onClick(this.rigthtButton, this._onRigthtButton, this);
        
        //返回按钮的监听
        UITools.onClick(this.backButton, this._onBackButton, this);
    },

    //取消监听事件
    _offEvent() {
        UITools.offClick(this.leftButton, this._onLeftButton);
        UITools.offClick(this.rigthtButton, this._onRigthtButton);
        UITools.offClick(this.backButton, this._onBackButton);
        
    },

    //左按钮的回调
    _onLeftButton() {
        console.log(cc.sys.localStorage)
        if(this.number.string != 1) {
            this.number.string--;
        }
        cc.sys.localStorage.setItem(NUMBER, this.number.string);//本地存储
    },

    //右按钮的回调
    _onRigthtButton() {
        if(this.number.string != 9) {
            this.number.string++;
        }
        cc.sys.localStorage.setItem(NUMBER, this.number.string);//本地存储
    },

    //返回按钮回调
    _onBackButton() {
        cc.director.loadScene("start");//点击跳转场景
    },
});


//字符串
//输入输出场景跳转,写成固定的方法