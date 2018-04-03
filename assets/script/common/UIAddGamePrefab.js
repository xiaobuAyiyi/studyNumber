cc.Class({
    extends: cc.Component,

    properties: {
        isShow: {
            default: false,
            notify: function () {
                this._checkEditorShow();
            }
        },
        root: {
            default: null,
            type: cc.Node,
            dispalyName: '容器'
        },
        prefabs: {
            default: [],
            type: cc.Prefab,
            dispalyName: '预制'
        },

        _count: 0,
    },

    onLoad: function () {
        this._checkEditorShow();
    },

    update: function (dt) {
        if(!this.isShow) {
            this._showGamePre();
        }
    },

    /**
     * 编辑器中是否显示
     */
    _checkEditorShow() {
        if(CC_EDITOR) {
            if(this.isShow) {
                this._showEditorOutRoot();
            }
            else {
                if(this.root)
                    this.root.removeAllChildren(true);
            }
        }else {
            this._count = this.prefabs.length;
        }
    },

    /**
     * 在编辑器中显示
     */
    _showEditorOutRoot() {
        if(this.root) {
            this.root.removeAllChildren(true);
            for(let i = 0; i < this.prefabs.length; i++) {
                let pre = cc.instantiate(this.prefabs[i]);
                this.root.addChild(pre);
            }
        }
    },

    /**
     * 创建预制
     * @param num 预制项下标
     */
    _addPre(num) {
        let pre = this.prefabs[num];
        let node = cc.instantiate(pre);
        this.root.addChild(node);
    },

    /**
     * 在游戏中展示
     */
    _showGamePre() {
        if(this._count === 0) return;
        if(this.root) {
            this._count --;
            this._addPre(this._count);
        }
    }
});