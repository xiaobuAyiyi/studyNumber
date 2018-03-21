var UITools = function () {

};

/**
 * 显示组件 是否 可见
 * @param target
 * @param visible
 */
UITools.setVisible = function (target, visible) {
    if (target != null) {
        target.node.active = visible;
    }
}

/**
 * 显示节点是否 可见
 * @param target
 * @param visible
 */
UITools.setNodeVisible = function (node, visible) {
    if (node != null) {
        node.active = visible;
    }
}

/**
 * 组件本身是否启动 不设计到子组件
 * @param target
 * @param enable
 */
UITools.setEnabled = function (target, enable) {
    if (target != null) {
        target.enabled = enable;
    }
}

/**
 * 注册监听
 * @param target 需要监听的节点
 * @param callback  监听事件回调函数
 * @param domain  调用回调的目标节点
 */
UITools.onClick = function (target, callback, domain) {
    if (target && target instanceof cc.Node) {
        target.on('touchmove', callback, domain);
    }
}

/**
 * 销毁监听
 * @param target 需要监听的节点
 * @param callback  监听事件回调函数
 * @param domain  调用回调的目标节点
 */
UITools.offClick = function (target, callback, domain) {
    if (target && target instanceof cc.Node) {
        target.off('touchmove', callback, domain);
    }
}


//刚刚按下还没移动时
UITools.startClick = function (target, callback, domain) {
    if (target && target instanceof cc.Node) {
        target.on(cc.Node.EventType.TOUCH_START, callback, domain);
    }
}

UITools.offStartClick = function (target, callback, domain) {
    if (target && target instanceof cc.Node) {
        target.off(cc.Node.EventType.TOUCH_START, callback, domain);
    }
}


//按住目标移动
UITools.moveClick = function (target, callback, domain) {
    if (target && target instanceof cc.Node) {
        target.on(cc.Node.EventType.TOUCH_Move, callback, domain);
    }
}

UITools.offMoveClick = function (target, callback, domain) {
    if (target && target instanceof cc.Node) {
        target.off(cc.Node.EventType.TOUCH_Move, callback, domain);
    }
}


// 鼠标按下取消事件
UITools.cancelClick = function (target, callback, domain) {
    if (target && target instanceof cc.Node) {
        target.on(cc.Node.EventType.TOUCH_CANCEL, callback, domain);
    }
}

UITools.offCancelClick = function (target, callback, domain) {
    if (target && target instanceof cc.Node) {
        target.off(cc.Node.EventType.TOUCH_CANCEL, callback, domain);
    }
}


// 鼠标进入目标事件
UITools.enterClick = function (target, callback, domain) {
    if (target && target instanceof cc.Node) {
        target.on(cc.Node.EventType.MOUSE_ENTER, callback, domain);
    }
}

UITools.offEnterClick = function (target, callback, domain) {
    if (target && target instanceof cc.Node) {
        target.off(cc.Node.EventType.MOUSE_ENTER, callback, domain);
    }
}


// 鼠标离开目标事件  
UITools.leaveClick = function (target, callback, domain) {
    if (target && target instanceof cc.Node) {
        target.on(cc.Node.EventType.MOUSE_LEAVE, callback, domain);
    }
}

UITools.offLeaveClick = function (target, callback, domain) {
    if (target && target instanceof cc.Node) {
        target.off(cc.Node.EventType.MOUSE_LEAVE, callback, domain);
    }
}

module.exports = UITools;