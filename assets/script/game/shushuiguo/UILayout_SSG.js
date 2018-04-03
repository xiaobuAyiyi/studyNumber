const Star = require('fruit');
const UITools = require('UITools');
const EventBus = require('EventBus');
const Event = require('event');

cc.Class({
    extends: cc.Component,

    properties: {
        star: {
            default: null,
            type: cc.Prefab,
            diaplayName: '水果预制',
        },

        nodes: {
            default: [],
            type: cc.Node,
            tooltip: '水果放置的节点集合',
        },

        _mask: null,
        _stars: null,
        _CoorCollection: null,
        _currentNumber: -1,
        _number: 9,
    },

    onLoad() {
        EventBus.on(Event.event.shushuiguoBegin, this._begin.bind(this), this);
        this._init();
        this._setSpriteFrame();
        this._initMask();
    },

    onDestroy() {
        this._clearData();
        EventBus.off(Event.event.shushuiguoBegin, this._begin.bind(this));
    },

    /**
     * 游戏结束或者重新开始时清空内存数据
     */
    _clearData() {
        this._mask = null;
        this._stars = null;
        this._CoorCollection = null;
        this._currentNumber = -1;
        this._number = 9;
    },

    /**
     * 游戏重新开始的回调
     */
    _begin() {
        this._clearData();
        this._init();
        this._setSpriteFrame();
        this._initMask();
    },

    /**
     * 初始化函数，生成star节点，添加监听事件
     */
    _init: function () {
        this._currentNumber = parseInt(cc.sys.localStorage.getItem(Event.localStorage.number));
        this._mask = [];
        this._stars = [];

        for (let i = 0; i < 9; i++) {
            let ele = cc.instantiate(this.star);
            //设置节点在父节点坐标系中的位置
            this.nodes[i].addChild(ele, 0, "ele");
            UITools.onClick(ele, this._onClick, this);
            let com = ele.getComponent(Star);
            com.pos = i;
            this._stars.push(ele);
            this._mask.push(0);
        }
    },

    /**
     * 为水果预制设置SpriteFrame
     */
    _setSpriteFrame() {
        //根据随机数返回值设置图片
        let nums = this._getRandom();
        let i = 0,
            j = this._stars.length;
        for (i = 0; i < j; i++) {
            let com = this._stars[i].getComponent(Star);
            com.setSpriteFrame(nums[i]);
        }
    },

    /**
     * 获取9个随机数
     */
    _getRandom() {
        let currentNumber = this._currentNumber;
        let num1 = [1, 2, 3, 2, 3, 4, 4, 6, 6],
            num2 = [2, 0, 1, 1, 3, 5, 2, 1, 7],
            num3 = [3, 2, 2, 2, 2, 1, 1, 3, 3],
            num4 = [4, 4, 5, 8, 4, 2, 1, 2, 4],
            num5 = [5, 2, 0, 5, 1, 5, 5, 1, 5],
            num6 = [6, 5, 6, 9, 6, 6, 8, 6, 6],
            num7 = [7, 5, 7, 7, 7, 7, 6, 7, 7],
            num8 = [8, 1, 8, 8, 8, 8, 8, 8, 8],
            num9 = [9, 9, 9, 9, 9, 9, 9, 9, 9];
        switch (currentNumber) {
            case 1:
                return num1;
            case 2:
                return num2;
            case 3:
                return num3;
            case 4:
                return num4;
            case 5:
                return num5;
            case 6:
                return num6;
            case 7:
                return num7;
            case 8:
                return num8;
            case 9:
                return num9;
            default:
                return num1;
        }
    },

    /**
     * 水果是否可点击
     * 1 可点击消除，2 不可点击消除
     */
    _initMask() {
        let currentNumber = this._currentNumber,
            nums = this._getRandom(),
            i = 0,
            j = nums.length;
        for (i = 0; i < j; i++) {
            if (nums[i] === currentNumber) {
                this._mask[i] = 1;
            }
        }
    },

    /**
     * 点击水果的回调
     */
    _onClick(event) {
        let name = event.currentTarget._parent.name.split('_'),
            num = name[1] - 1;
        if (this._mask[num]) {
            let act = cc.sequence(cc.blink(0.2, 1), cc.scaleBy(0.5, 0, 0));
            this._stars[num].stopAllActions();
            this._stars[num].runAction(act);
            this._stars[num] = null;
            this._number  = this._number - 1;
            this._check();
        }
    },

    /**
     * 判断游戏是否结束
     */
    _check() {
        let min = 9 - this._currentNumber;
        if(this._number ===  min) {
            EventBus.emit(Event.event.gameOver);
        }
    },
});