const Star = require('Star');
const EventBus = require('EventBus');
const UITools = require('UITools');
const Score = require('Score');
const Event = require('event');

cc.Class({
    extends: cc.Component,

    properties: {
        star: {
            default: null,
            type: cc.Prefab,
            diaplayName: '数字预制',
        },

        score: {
            default: null,
            type: cc.Node,
            diaplayName: '分数框',
            tooltip: '显示分数的Label框',
        },

        numbers: {
            default: null,
            type: cc.Node,
            displayName: '数字放置节点',
        },

        col: 0, //每一列的数字数量
        row: 0, //每一排的数字数量
        padding: 0, //边距
        spacingX: 0, //x轴方向上的数字之间的间距
        spacingY: 0, //Y轴方向上的数字之间的间距

        _reward: 0,
        _CoorCollection: null, // 坐标矩阵集合
        _stars: null,
        _mask: null,
        _startPosition: null,
        _endPosition: null,
        _gameOverNumber: -1,
    },

    onLoad: function () {
        this._buildCoordinateSet(); // 根据配置信息生成每个元素的坐标点集合
        this._init();
        this._check();
    },

    onDestroy() {
        this._stars = null;
        this._reward = 0;
        this._CoorCollection = null;// 坐标矩阵集合
        this._mask = null;
        this._startPosition = null;
        this._endPosition = null;
    },

    // 初始化函数，生成star节点，添加监听事件
    _init: function () {
        let numbers = this.numbers;
        this._mask = [];
        this._stars = [];

        // 坐标矩阵集合
        let pSet = this._CoorCollection;
        for (let i = 0; i < this.row; i++) {
            let stars = [];
            let marr = [];
            for (let j = 0; j < this.col; j++) {
                let ele = cc.instantiate(this.star);
                //设置节点在父节点坐标系中的位置
                ele.setPosition(pSet[i][j].x, pSet[i][j].y);
                numbers.addChild(ele, 0, "ele");
                this._addTouchEvents(ele);
                let com = ele.getComponent(Star);
                com.pos = cc.v2(i, j);
                stars.push(ele);
                marr.push(0);
            }
            this._mask.push(marr);
            this._stars.push(stars);
            this._gameOverNumber = this._overNumber();
        }
    },

    _check: function (falg) {
        //如果有需要删除的数字
        if(falg) {
            this._delAndDrop();
        }
        else {
            if (this._checkConnected()) {
                // 删除需要删除的数字
                this._delAndDrop();
            }
        }
    },

    // 根据配置信息生成每个元素的坐标点对象
    _buildCoordinateSet: function () {
        // 克隆预制
        let ele = cc.instantiate(this.star);
        // 获取预制节点大小
        let eleSize = ele.getContentSize();
        let beginX = (this.node.width - (this.row - 1) * (this.spacingX + eleSize.width)) / 2;
        let beginY = this.padding + eleSize.height / 2;

        this._CoorCollection = [];
        for (let i = 0; i < this.row; i++) {
            let arr = [];
            for (let j = 0; j < this.col; j++) {
                let position = cc.v2(beginX + i * (eleSize.width + this.spacingX), beginY + j * (eleSize.height + this.spacingY));
                // console.log(position.toString());
                arr.push(position);
            }
            this._CoorCollection.push(arr);
        }
        // console.log('节点集合',this._CoorCollection)
    },

    _onStartClick(event) {
        // 代表当前节点被选中
        let currentTarget = event.currentTarget;
        currentTarget.isSelect = true;
        this._startPosition = currentTarget.getComponent(Star).pos;
        console.log('节点的初始位置', this._startPosition);
    },

    _onMoveClick(event) {
        let currentTarget = event.currentTarget;
        if (currentTarget.isSelect) {
            // 获取当前触点的位置
            let x = event.getLocationX();
            let y = event.getLocationY();

            currentTarget.setPosition(x, y);
            console.log('当前节点移动到(' + x + "," + y + ')');
        }
    },

    _onClick(event) {
        let currentTarget = event.currentTarget;
        // 将节点的选中状态置为false;
        currentTarget.isSelect = false;

        let x = event.getLocationX();
        let y = event.getLocationY();

        //将节点的坐标转换为当前矩阵的坐标
        this._endPosition = this._PositionToPos(x, y);
        console.log('节点移动结束时的位置', this._endPosition);

        // 如果节点移动的开始和结束位置在矩阵中相邻,并且节点的结束位置存在
        if (this._isAround(this._startPosition, this._endPosition) && typeof (this._stars[this._endPosition.x][this._endPosition.y]) != 'undefined') {
            console.log('isAround');
            //交换两个数字位置
            this._changeTwoPos(this._startPosition, this._endPosition);
            // 判断可消除的数字数量是否满足要求,不满足则再次交换回去
            if(this._checkConnected()) {
                console.log('删除相连的数字')
                this._check(true); // check
            }
            else {
                console.log('不满足消除条件,退回原位置')
                this._changeTwoPos(this._startPosition, this._endPosition);
            }
        } else {
            currentTarget.setPosition(this._CoorCollection[this._startPosition.x][this._startPosition.y]);
        }
    },

    // 添加触摸监听事件
    _addTouchEvents: function (node) {
        // 传回节点位置,触摸开始时
        UITools.startClick(node, this._onStartClick, this);

        // 触摸节点移动时
        UITools.moveClick(node, this._onMoveClick, this);

        // 触摸结束时
        UITools.onClick(node, this._onClick, this);
    },

    // 屏幕坐标转矩阵坐标
    _PositionToPos: function (x, y) {
        let ele = cc.instantiate(this.star);
        let eleSize = ele.getContentSize();
        let pos = cc.v2(Math.floor((x - this.padding) / (eleSize.width + this.spacingX)), Math.floor((y - this.padding) / (eleSize.height + this.spacingY)));
        return pos;
    },

    // 判断矩阵坐标p2是否与p1相邻
    _isAround: function (p1, p2) {
        let dis = Math.abs((p2.x - p1.x) + (p2.y - p1.y));
        console.log('节点移动的位置', dis);
        if (dis == 1) {
            return true;
        }
        return false;
    },

    // 交换两个star的位置 包括自身存储的位置信息与stars数组内的实例交换
    _changeTwoPos: function (p1, p2) {
        this._stars[p1.x][p1.y].getComponent(Star).pos = p2;
        this._stars[p1.x][p1.y].setPosition(this._CoorCollection[p2.x][p2.y]);
        this._stars[p2.x][p2.y].getComponent(Star).pos = p1;
        this._stars[p2.x][p2.y].setPosition(this._CoorCollection[p1.x][p1.y]);
        let t = this._stars[p1.x][p1.y];
        this._stars[p1.x][p1.y] = this._stars[p2.x][p2.y];
        this._stars[p2.x][p2.y] = t;
    },

    _delAndDrop: function () {
        // 删除需要删除的数字
        this._deleteConnected();
        // 下落动画以及更新位置信息
        this._dropAndUpdata();
    },

    _checkConnected: function () {
        // 纵向需要删除的数字数
        let count1 = this._verticalCheckConnected();
        // 横向需要删除的数字数
        let count2 = this._horizontalCheckConnected();

        // 奖励分数
        this._reward = this._calScore(count1 + count2);
        console.log('我是可消除的数量', count1 + count2);

        return ((count1 + count2) > 0) ? true : false;
    },

    // 计算分数
    _calScore: function (num) {
        return num * 10;
    },

    // 纵向检查star的相连形况
    _verticalCheckConnected: function () {
        let index1, index2;
        let start, end;
        let count = 0;

        // 记录需要删除的star数
        for (let i = 0; i < this._stars.length; i++) {
            if (typeof (this._stars[i][0]) == 'undefined') {
                continue;
            }
            index1 = this._stars[i][0].getComponent(Star).iconIndex;
            start = 0;
            for (let j = 1; j <= this._stars[i].length; j++) {
                // 当到达边界值时
                if (j == this._stars[i].length) {
                    index2 = -1;
                } else {
                    index2 = this._stars[i][j].getComponent(Star).iconIndex;
                }

                if (index1 != index2) {
                    end = j;
                    if (end - start >= 3) {
                        while (start != end) {
                            this._mask[i][start] = 1;
                            start++;
                            count++;
                        }
                    }
                    start = end;
                    if (start != this._stars[i].length) {
                        index1 = this._stars[i][start].getComponent(Star).iconIndex;
                    }

                }
            }
        }
        return count;
    },

    // 横向检查star的相连情况
    _horizontalCheckConnected: function () {
        let index1, index2;
        let start, end;
        let count = 0;
        // 记录需删除的star数
        for (let j = 0; j < this.col; j++) {
            for (let i = 0; i < this.row;) {
                if (typeof (this._stars[i][j]) == 'undefined') {
                    i++;
                    continue;
                }
                index1 = this._stars[i][j].getComponent(Star).iconIndex;
                let begin = i;
                end = begin;
                while (end < this.row) {
                    if (typeof (this._stars[end][j]) == 'undefined') {
                        if (end - begin >= 3) {
                            while (begin != end) {
                                if (this._mask[begin][j] != 1) {
                                    this._mask[begin][j] = 1;
                                    count++;
                                }
                                begin++;
                            }
                        }
                        break;
                    }
                    index2 = this._stars[end][j].getComponent(Star).iconIndex;
                    if (index1 != index2) {
                        if (end - begin >= 3) {
                            while (begin != end) {
                                if (this._mask[begin][j] != 1) {
                                    this._mask[begin][j] = 1;
                                    count++;
                                }
                                begin++;
                            }
                        }
                        break;
                    }
                    end++;
                }
                if (end == this.row && end - begin >= 3) {
                    while (begin != end) {
                        if (this._mask[begin][j] != 1) {
                            this._mask[begin][j] = 1;
                            count++;
                        }
                        begin++;
                    }
                }
                i = end;
            }
        }
        return count;
    },

    // 根据mask的状态信息删除相连的star
    _deleteConnected: function () {
        for (let i = 0; i < this.row; i++) {
            let count = 0;
            let start = 0,
                end;
            let onoff = true;
            for (let j = this.col - 1; j >= 0; j--) {
                if (this._mask[i][j] == 1) {
                    if (onoff) {
                        start = j;
                        onoff = false;
                    }
                    // 消失动画
                    let act = cc.sequence(cc.blink(0.2, 1), cc.scaleBy(0.5, 0, 0));
                    this._stars[i][j].runAction(act);
                }
                if ((this._mask[i][j - 1] != 1 || j - 1 < 0) && onoff == false) {
                    end = j;
                    // 删除star实例
                    this._stars[i].splice(end, start - end + 1);
                    onoff = true;
                }
                this._mask[i][j] = 0;
            }
        }
        this._gameOver();
        // 删除相连的stars后更新分数显示
        this._updateScore();
    },

    _gameOver() {
        let starNumber = 0;
        let j = this._stars.length;
        for (let i = 0; i < j; i++) {
            starNumber += this._stars[i].length
        }
        console.log('删除后的星星数', starNumber)
        console.log('最终停止游戏的数量', this._gameOverNumber);
        if (starNumber <= this._gameOverNumber) {
            //发送事件创建结束预制
            EventBus.emit(Event.event.xiaoxiaoleOver);
        }
    },

    _overNumber() {
        let currentNumber = cc.sys.localStorage.getItem(Event.localStorage.number);
        if(!currentNumber) {
            return 25;
        }
        currentNumber = parseInt(currentNumber);
        switch(currentNumber){
            case 1: return 25;
            case 2: return 25;
            case 3: return 50;
            case 4: return 70;
            case 5: return 80;
            case 6: return 90;
            case 7: return 105;
            case 8: return 135;
            case 9: return 145;
        }
    },

    // 下落动画以及更新位置信息
    _dropAndUpdata: function () {
        let finished = cc.callFunc(function (target) {
            this._check();

        }, this);

        let m = this._stars.length;
        for (let i = 0; i < m; i++) {
            let n = this._stars[i].length;
            for (let j = 0; j < n; j++) {
                let act;
                if (i == m - 1 && j == n - 1) {
                    act = cc.sequence(cc.moveTo(1, this._CoorCollection[i][j]), finished);
                } else {
                    act = cc.moveTo(1, this._CoorCollection[i][j]);
                }
                this._stars[i][j].runAction(act);
                let com = this._stars[i][j].getComponent(Star);
                com.pos = cc.v2(i, j);
            }
        }
    },

    _updateScore: function () {
        // 更新分数显示
        let scoreNode = this.score.getComponent(Score);
        scoreNode.setReward(this._reward);
    },
});