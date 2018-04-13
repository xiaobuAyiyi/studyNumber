cc.Class({
    extends: cc.Component,

    properties: {
        cards: {
            default: [],
            type: cc.Node,
            displayName: '卡片',
            tooltip: '卡片',
        },

        maskCard: {
            default: null,
            type: cc.Node,
            displayName: '遮罩',
            tooltip: '遮罩的卡片',
        },
    },

    /**
     * 卡片下滑以及遮罩的动画
     */
    action() {
        let i = 0,
            j = this.cards.length,
            act1,
            act2 = cc.fadeTo(0.01, 255),
            delayTime = cc.delayTime(2),
            position;
        for (; i < j; i++) {
            position = this.cards[i].getPosition();
            this.cards[i].setPosition(position.x, 515);
            act1 = cc.moveTo(1, position);
            this.cards[i].runAction(act1);
        }
        this.maskCard.runAction(cc.sequence(delayTime, act2));
    },

    recovery() {
        this.maskCard.opacity = 0;
    }
});