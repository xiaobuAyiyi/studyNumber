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
            tooltip: '显示分数的Label框'
        },

        Col: 0, //每一列的数字数量
        Row: 0, //每一排的数字数量
        Padding: 0, //边距
        SpacingX: 0, //x轴方向上的数字之间的间距
        SpacingY: 0, //Y轴方向上的数字之间的间距

        _reward: 0,
        _pSet: null, // 坐标矩阵集合
        _stars: null,
        _mask: null,
        _startPosition: null,
        _endPosition: null,
        _node: null,
    },

    onLoad: function () {
        this.buildCoordinateSet(); // 根据配置信息生成每个元素的坐标点集合
        this.init();
        this._check();
    },

    // 初始化函数，生成star节点，添加监听事件
    init: function () {
        let node = this.node;
        this._mask = [];
        this._stars = [];

        // 坐标矩阵集合
        let pSet = this._pSet;
        for (let i = 0; i < this.Row; i++) {
            let arr1 = [];
            let marr = [];
            for (let j = 0; j < this.Col; j++) {
                let ele = cc.instantiate(this.star);

                //设置节点在父节点坐标系中的位置
                ele.setPosition(pSet[i][j].x, pSet[i][j].y);
                node.addChild(ele, 0, "ele");
                this.addTouchEvents(ele);
                let com = ele.getComponent(Star);
                com.pos = cc.v2(i, j);
                arr1.push(ele);
                marr.push(0);
            }
            this._mask.push(marr);
            this._stars.push(arr1);
        }
    },

    _check: function () {
        //如果有需要删除的数字
        if (this._checkConnected()) {
            // 删除需要删除的数字
            this._delAndDrop();
        }
    },

    // 根据配置信息生成每个元素的坐标点对象
    buildCoordinateSet: function () {
        // 克隆预制
        let ele = cc.instantiate(this.star);
        // 获取预制节点大小
        let eleSize = ele.getContentSize();
        let beginX = (this.node.width - (this.Row - 1) * (this.SpacingX + eleSize.width)) / 2;
        let beginY = this.Padding + eleSize.height / 2;

        this._pSet = [];
        for (let i = 0; i < this.Row; i++) {
            let arr = [];
            for (let j = 0; j < this.Col; j++) {
                let position = cc.v2(beginX + i * (eleSize.width + this.SpacingX), beginY + j * (eleSize.height + this.SpacingY));
                // console.log(position.toString());
                arr.push(position);
            }
            this._pSet.push(arr);
        }
        // console.log('节点集合',this._pSet)
    },

    // _onStartClick(event) {
    //     // 代表当前节点被选中
    //     this._node.select = true;
    //     this_startPosition = this._node.getComponent(Star).pos;
    //     console.log('节点的初始位置', this_startPosition);
    // },

    // _onMoveClick(event) {
    //     if (this._node.select) {
    //         // 获取当前触点的位置
    //         let x = event.getLocationX();
    //         let y = event.getLocationY();

    //         this._node.setPosition(x, y);
    //         console.log('当前节点移动到(' + x + "," + y + ')');
    //     }
    // },

    // _onClick(event) {
    //     // 将节点的选中状态置为false;
    //     this._node.select = false;

    //     let x = event.getLocationX();
    //     let y = event.getLocationY();

    //     //将节点的坐标转换为当前矩阵的坐标
    //     this._endPosition = this.PositionToPos(x, y);
    //     console.log('节点移动结束时的位置', this._endPosition);

    //     // 如果节点移动的开始和结束位置在矩阵中相邻,并且节点的结束位置存在
    //     if (this._isAround(this_startPosition, this._endPosition) && typeof (this._stars[this._endPosition.x][this._endPosition.y]) != 'undefined') {
    //         console.log('isAround');
    //         //交换两个数字位置
    //         this._changeTwoPos(this_startPosition, this._endPosition);

    //         this._check(); // check

    //     } else {
    //         this._node.setPosition(this._pSet[this_startPosition.x][this_startPosition.y]);
    //     }
    // },

    // 添加触摸监听事件
    addTouchEvents: function (node) {

        // let p1 = null;
        // let p2 = null;
        // 传回节点位置,触摸开始时

        this._node = node;
        // UITools.startClick(node, this._onStartClick, this);
        // this._node.on('touchstart', this._onStartClick, this);
        let me = this;
        node.on('touchstart', function (event) {
            // 代表当前节点被选中
            node.select = true;

            me._startPosition = node.getComponent(Star).pos;
            console.log('节点的初始位置', me._startPosition);
        }, this);

        // 触摸节点移动时
        // this._node.on('touchmove', this._onMoveClick, this);
        // UITools.moveClick(node, this._onMoveClick, this);
        node.on('touchmove', function (event) {
            if (node.select) {
                console.log(event)
                // 获取当前触点的位置
                let x = event.getLocationX();
                let y = event.getLocationY();

                node.setPosition(x, y);
                console.log('当前节点移动到(' + x + "," + y + ')');
            }
        }, this);

        // 触摸结束时
        // this._node.on('touchend', this._onClick, this)
        // UITools.onClick(node, this._onClick, this);
        node.on('touchend', function (event) {
            // 将节点的选中状态置为false;
            node.select = false;

            let x = event.getLocationX();
            let y = event.getLocationY();

            //将节点的坐标转换为当前矩阵的坐标
            me._endPosition = me.PositionToPos(x, y);
            console.log('节点移动结束时的位置', me._endPosition);

            // 如果节点移动的开始和结束位置在矩阵中相邻,并且节点的结束位置存在
            if (me._isAround(me._startPosition, me._endPosition) && typeof (me._stars[me._endPosition.x][me._endPosition.y]) != 'undefined') {
                console.log('isAround');
                //交换两个数字位置
                me._changeTwoPos(me._startPosition, me._endPosition);

                me._check(); // check
            } else {
                node.setPosition(me._pSet[me._startPosition.x][me._startPosition.y]);
            }

        }, this);
    },

    // 屏幕坐标转矩阵坐标
    PositionToPos: function (x, y) {
        let ele = cc.instantiate(this.star);
        let eleSize = ele.getContentSize();
        let pos = cc.v2(Math.floor((x - this.Padding) / (eleSize.width + this.SpacingX)), Math.floor((y - this.Padding) / (eleSize.height + this.SpacingY)));
        return pos;
    },

    // 判断矩阵坐标p2是否与p1相邻
    _isAround: function (p1, p2) {
        let dis = Math.abs((p2.x - p1.x) + (p2.y - p1.y));
        console.log(dis);
        if (dis == 1) {
            return true;
        }
        return false;
    },

    // 交换两个star的位置 包括自身存储的位置信息与stars数组内的实例交换
    _changeTwoPos: function (p1, p2) {
        this._stars[p1.x][p1.y].getComponent(Star).pos = p2;
        this._stars[p1.x][p1.y].setPosition(this._pSet[p2.x][p2.y]);
        this._stars[p2.x][p2.y].getComponent(Star).pos = p1;
        this._stars[p2.x][p2.y].setPosition(this._pSet[p1.x][p1.y]);
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
        let count1 = this.verticalCheckConnected();
        // 横向需要删除的数字数
        let count2 = this.horizontalCheckConnected();

        // 奖励分数
        this._reward = this._calScore(count1 + count2);
        console.log(this._reward + "rew");

        return ((count1 + count2) > 0) ? true : false;
    },

    // 计算分数
    _calScore: function (num) {
        return num * 10;
    },

    // 纵向检查star的相连形况
    verticalCheckConnected: function () {
        let index1, index2;
        let start, end;
        let count = 0;

        // 记录需要删除的star数
        for (let i = 0; i < this._stars.length; i++) {
            if (typeof (this._stars[i][0]) == 'undefined') {
                continue;
            }
            index1 = this._stars[i][0].getComponent('Star').sfIndex;
            start = 0;
            for (let j = 1; j <= this._stars[i].length; j++) {
                // 当到达边界值时
                if (j == this._stars[i].length) {
                    index2 = -1;
                } else {
                    index2 = this._stars[i][j].getComponent('Star').sfIndex;
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
                        index1 = this._stars[i][start].getComponent('Star').sfIndex;
                    }

                }
            }
        }
        return count;
    },

    // 横向检查star的相连情况
    horizontalCheckConnected: function () {
        let index1, index2;
        let start, end;
        let count = 0;
        // 记录需删除的star数
        for (let j = 0; j < this.Col; j++) {
            for (let i = 0; i < this.Row;) {
                if (typeof (this._stars[i][j]) == 'undefined') {
                    i++;
                    continue;
                }
                index1 = this._stars[i][j].getComponent('Star').sfIndex;
                let begin = i;
                end = begin;
                while (end < this.Row) {
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
                    index2 = this._stars[end][j].getComponent('Star').sfIndex;
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
                if (end == this.Row && end - begin >= 3) {
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
        for (let i = 0; i < this.Row; i++) {
            let count = 0;
            let start = 0,
                end;
            let onoff = true;
            for (let j = this.Col - 1; j >= 0; j--) {
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
        for (let i = 0; i < this._stars.length; i++) {
            starNumber += this._stars[i].length
        }
        console.log('删除后的星星数', starNumber)
        if (starNumber <= 100) {
            //发送事件创建结束预制
            EventBus.emit(Event.event.xiaoxiaoleOver);
            // 移除这个界面的所以监听事件
        }
    },

    // 下落动画以及更新位置信息
    _dropAndUpdata: function () {
        let finished = cc.callFunc(function (target) {
            this._check();

        }, this);

        let starsLength = this._stars.length;
        
        for (let i = 0; i < this._stars.length; i++) {
            for (let j = 0; j < this._stars[i].length; j++) {
                let act;
                if (i == this._stars.length - 1 && j == this._stars[i].length - 1) {
                    act = cc.sequence(cc.moveTo(1, this._pSet[i][j]), finished);
                } else {
                    act = cc.moveTo(1, this._pSet[i][j]);
                }
                this._stars[i][j].runAction(act);
                let com = this._stars[i][j].getComponent('Star');
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


//释放内存,销毁stars
//提前读取数组长度
//驼峰,第一个字母小写