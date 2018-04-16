const UITools = require('UITools');
const EventBus = require('EventBus');
const Event = require('event');

cc.Class({
    extends: cc.Component,

    properties: {
        numberItem: {
            default: [],
            type: cc.Sprite,
            displayName: '数字按钮',
        },

        icons: {
            default: [],
            type: cc.SpriteFrame,
            displayName: '数字按钮图片',
        },

        number: {
            default: null,
            type: cc.Sprite,
            displayName: '数字',
        },

        bg: {
            default: null,
            type: cc.Node,
            displayName: '背景节点',
        },

        _btnNumber: null,
        _tag: -1,
        _number: -1,
        _timeId: -1,
        _bgPosition: null,
    },

    onLoad() {
        this._onEvent();
        this._init();
    },

    onDestroy() {
        EventBus.off(Event.event.shuzijieliBegin, this._begin);
        this._btnNumber = null;
        this._tag = -1;
        this._number = -1;
        this._timeId = -1;
        this._bgPosition = null;
    },

    // 初始化
    _init() {
        let nums = this._creatData(),
            i = 0,
            j = this.numberItem.length;
        if (this._btnNumber === null) {
            this._btnNumber = {};
        }
        for (; i < j; i++) {
            this.numberItem[i].spriteFrame = this.icons[nums[i]];
            this._btnNumber[this.numberItem[i].node.name] = nums[i] + 1;
        }
        this.number.spriteFrame = this.icons[this._number - 1];
        console.log(this._btnNumber)
        EventBus.on(Event.event.shuzijieliBegin, this._begin, this);
        this._bgPosition = this.bg.getPosition();
        console.log(this._bgPosition)
    },

    // 重新开始游戏
    _begin() {
        this._recovery();
        this._init();
    },

    _recovery() {
        this._tag = -1;
        this.bg.position = this._bgPosition;
    },

    // 生成数据
    _creatData() {
        let number = parseInt(cc.sys.localStorage.getItem(Event.localStorage.number)) - 1;
        if (!number) {
            number = 1;
        }
        this._number = number + 1;
        return this._getRandomInt(number);
    },

    /**
     * 获取随机数
     * @param {number} number 
     */
    _getRandomInt(number) {
        let nums = [0, 0, 0],
            i = 0,
            j = nums.length;
        nums[Math.floor(3 * Math.random())] = number;
        for (; i < j; i++) {
            if (nums[i] == 0) {
                let ratio = this._isNums(nums);
                nums[i] = ratio;
            } else {
                continue;
            }
        }

        return nums;
    },

    /**
     * 生成一个随机数并判断是否是nums的成员
     * @param {array} nums 
     */
    _isNums(nums) {
        let ratio = Math.floor(9 * Math.random()),
            i = 0,
            j = nums.length,
            index = -1;
        for (; i < j; i++) {
            if (nums[i] == ratio) {
                index = i;
                break;
            }
        }
        // 递归出口
        if (index == -1) { //nums中没有元素与ratio相同
            return ratio;
        } else {
            ratio = this._isNums(nums);
            return ratio;
        }
    },

    // 注册监听
    _onEvent() {
        console.log('注册监听');
        let i = 0,
            j = this.numberItem.length;
        for (; i < j; i++) {
            UITools.onClick(this.numberItem[i].node, this._onNumber, this);
        }
        EventBus.on(Event.event.shuzijieliBegin, this._begin, this);
    },

    // 移除监听
    _offEvent() {
        let i = 0,
            j = this.numberItem.length;
        for (; i < j; i++) {
            UITools.offClick(this.numberItem[i].node, this._onNumber);
        }
    },

    // 点击数字按钮的回调
    _onNumber(event) {
        // 判断当前按钮是否是当前数字，如果是则猴子跑动，如果不是则不做任何动作
        if (this._tag === -1) {
            this._tag = 1;
        }
        let nodeName = event.currentTarget.name;
        if (this._number === this._btnNumber[nodeName]) {
            // 猴子跑动
            if (this._tag === 1) {
                EventBus.emit(Event.event.bgActionOne);
                this._hideItem();
                this._timeout();
            }
            if (this._tag === 2) {
                EventBus.emit(Event.event.bgActioTwo);
                this._hideItem();
                this._timeout();
            }
            if (this._tag === 3) {
                EventBus.emit(Event.event.bgActioThree);
                this._hideItem();
                this._timeout();
            }
            this._init();
            this._tag = this._tag + 1;
        }
    },

    _timeout() {
        let me = this;
        this._timeId = setTimeout(function () {
            me._accordingItem();
        }, 1500);
    },

    // 隐藏数字按钮
    _hideItem() {
        let i = 0,
            j = this.numberItem.length;
        for (; i < j; i++) {
            this.numberItem[i].node.active = false;
        }
    },

    // 显示数字按钮
    _accordingItem() {
        let i = 0,
            j = this.numberItem.length;
        for (; i < j; i++) {
            this.numberItem[i].node.active = true;
        }
    },
});