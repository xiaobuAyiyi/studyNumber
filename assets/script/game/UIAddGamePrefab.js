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

    _showEditorOutRoot() {
        if(this.root) {
            this.root.removeAllChildren(true);
            for(let i = 0; i < this.prefabs.length; i++) {
                let pre = cc.instantiate(this.prefabs[i]);
                this.root.addChild(pre);
            }
        }
    },

    _addPre(num) {
        let pre = this.prefabs[num];
        let node = cc.instantiate(pre);
        this.root.addChild(node);
    },

    _showGamePre() {
        if(this._count === 0) return;
        if(this.root) {
            this._count --;
            this._addPre(this._count);
        }
    }
});