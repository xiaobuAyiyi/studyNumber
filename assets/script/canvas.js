cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad() {
        var color = new cc.Color(1000, 0, 0, 255);
        console.log(color.fromHEX("#FFFF33")); // (255, 0, 0, 255)
    },
});