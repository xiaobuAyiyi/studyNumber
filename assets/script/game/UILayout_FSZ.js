const Event = require('event');
const cardAction = require('cardAction_fsz');
const UITools = require('UITools');
const EventBus = require('EventBus');

cc.Class({
    extends: cc.Component,

    properties: {
        dataItem: {
            default: [],
            type: cc.Label,
            displayName: '数据',
        },

        cardNode: {
            default: null,
            type: cc.Node,
            displayName: '卡片节点',
        },

        fsz_UI: {
            default: null,
            type: cc.Node,
            displayName: '翻数字节点',
        },

        maskCards: {
            default: [],
            type: cc.Node,
            displayName: '遮罩问号节点',
        },

        maskCardsBg: {
            default: [],
            type: cc.Node,
            displayName: '遮罩背景',
        },

        _cardAction: null,
        _number: -1,
    },

    // 生命周期函数，当组件开始加载时调用
    onLoad() {
        this._init();
        this._onEvent();
        EventBus.on(Event.event.fanshuziBegin, this._begin.bind(this), this);
    },

    // 生命周期函数，调用组件的destroy函数时调用
    onDestroy() {
        this._cardAction = null;
        this._number = -1;
        this._offEvent();
        EventBus.off(Event.event.fanshuziBegin, this._begin.bind(this));
    },

    // 重新开始游戏时将UI返回最初状态
    _recovery() {
        this._cardAction.recovery();
        let i = 0,
            j = this.maskCardsBg.length;
        for (; i < j; i++) {
            this.maskCardsBg[i].opacity = 255;
            this.maskCardsBg[i].rotation = this.maskCardsBg[i].rotationX = this.maskCardsBg[i].rotationY = 0;
            this.maskCardsBg[i].children[0].opacity = 255;
        }
    },

    // 重新开始游戏回调
    _begin() {
        this._recovery();
        this._init();
        this._onEvent();
    },

    // 注册监听
    _onEvent() {
        let i = 0,
            j = this.maskCardsBg.length;
        for (; i < j; i++) {
            UITools.onClick(this.maskCardsBg[i], this._onCard, this);
        }
    },

    // 移除监听
    _offEvent() {
        let i = 0,
            j = this.maskCardsBg.length;
        for (; i < j; i++) {
            UITools.offClick(this.maskCardsBg[i], this._onCard);
        }
    },

    // 卡片点击结束回调
    _onCard(event) {
        // 隐藏问号节点
        let currentTarget = event.currentTarget;
        currentTarget.children[0].runAction(cc.fadeTo(1, 0));
        let self = this;

        function removeSelf() {
            currentTarget.opacity = 0;
            self._checkNumber(currentTarget.name);
        }
        let act1 = cc.rotateBy(1, 0, 180),
            remove = cc.callFunc(removeSelf, currentTarget);
        currentTarget.runAction(cc.sequence(act1, remove));
    },

    // 检查所点击的卡片数字与当前学习数字是否相同
    _checkNumber(name) {
        name = name.split('_');
        if (this._number == this.dataItem[name[2]].string) {
            EventBus.emit(Event.event.gameOver);
        }
    },

    // 初始化
    _init() {
        this._cardAction = this.fsz_UI.getComponent(cardAction);
        this._cardAction.action();
        let nums = this._creatData(),
            i = 0,
            j = this.dataItem.length;
        for (; i < j; i++) {
            this.dataItem[i].string = nums[i];
        }
    },

    /**
     * 生成数据
     */
    _creatData() {
        let number = parseInt(cc.sys.localStorage.getItem(Event.localStorage.number));
        if (!number) {
            number = 1;
        }
        this._number = number;
        return this._getRandomInt(number);
    },

    /**
     * 获取随机数
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
     * 判断是否是nums的成员
     */
    _isNums(nums) {
        let ratio = Math.floor(9 * Math.random()) + 1,
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
});