const Event = require('event');

cc.Class({
    extends: cc.Component,

    properties: {
        number: {
            default: null,
            type: cc.Label,
            displayName: '数字',
        },
    },

    onLoad() {
        this._init();
    },

    _init() {
        let number = cc.sys.localStorage.getItem(Event.localStorage.number);
        if(number) {
            this.number.string = number;
        }
        else {
            this.number.string = 1;
        }
    },
});
