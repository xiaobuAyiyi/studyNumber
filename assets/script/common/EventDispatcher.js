/**
 * Created by apple on 16/8/3.
 */

var EventDispatcher = function () {
    this.listenersByEvent = {};
    this.onceListenersByEvent = {};
};

/**
 * 判断是否有此侦听器
 * @param event 
 */
EventDispatcher.prototype.hasEvent = function (event) {
    return this.listenersByEvent[event] != null;
}

/**
 * 判断是否有此侦听器(一次性侦听器)
 * @param event 
 */
EventDispatcher.prototype.hasOnceEvent = function (event) {
    return this.onceListenersByEvent[event] != null;
}

/**
 * 添加事件侦听器
 * @param  event 事件名
 * @param  listener 事件回调
 * @param  listenerContext 事件作用对象
 */
EventDispatcher.prototype.addEventListener = function (event, listener, listenerContext) {
    null == this.listenersByEvent[event] && (this.listenersByEvent[event] = []);
    this.listenersByEvent[event].push({listener: listener, scope: listenerContext})
};

 /**
  * 添加一次性事件侦听器
  * @param event 一次性事件名
  * @param listener 监听回调
  * @param  listenerContext 监听作用对象
  */
EventDispatcher.prototype.addOnceEventListener = function (event, listener, listenerContext) {
    null == this.onceListenersByEvent[event] && (this.onceListenersByEvent[event] = []);
    this.onceListenersByEvent[event].push({listener: listener, scope: listenerContext})
};

/**
 * 移除事件监听器
 * @param  event 
 * @param  listener 
 */
EventDispatcher.prototype.removeEventListener = function (event, listener) {
    var c = this.listenersByEvent[event];
    if (null != c) {
        var len = c.length;
        for (var d = 0; d < len; d++)
            if (c[d].listener === listener) {
                c.splice(d, 1);
                break;
            }
    }
};

/**
 * 移除一次性时间监听器
 * @param  event 事件名
 * @param  listener 监听回调
 */
EventDispatcher.prototype.removeOnceEventListener = function (event, listener) {
    var c = this.onceListenersByEvent[event];
    if (null != c) {
        var len = c.length;
        for (var d = 0; d < len; d++)
            if (c[d].listener === listener) {
                c.splice(d, 1);
                break;
            }
    }
};

/**
 * 移除所有监听事件
 */
EventDispatcher.prototype.removeAllEventListener = function () {
    this.listenersByEvent = null;
    this.listenersByEvent = {};
    this.onceListenersByEvent = null;
    this.onceListenersByEvent = {};
};

/**
 * 派发事件
 * @param  event 事件名
 * @param  eventData 派发事件信息
 */
EventDispatcher.prototype.dispatchEvent = function (event, eventData) {
    //持久事件
    var c = this.listenersByEvent[event];
    if (c && 0 < c.length) {
        var len = c.length;
        for (var d = 0; d < len; d++) {
            if (c[d] && c[d].listener)
                c[d].listener.call(c[d].scope, eventData);
            else
                cc.log("没有注册处理事件", event, eventData);
        }
    }
    //一次性事件
    var oc = this.onceListenersByEvent[event];
    if (oc && 0 < oc.length) {
        var olen = oc.length;
        for (var od = 0; od < olen; od++) {
            oc[od].listener.call(oc[od].scope, eventData);
        }
        oc.splice(0, olen);
    }

};

/**
 * 派发事件
 * @param event 事件名
 * @param eventData 
 */
EventDispatcher.prototype.emit = function (event, eventData) {
    this.dispatchEvent(event, eventData);
}

/**
 * 注册监听事件
 * @param event 事件名
 * @param listener 回调函数
 * @param listenerContext 监听作用对象
 */
EventDispatcher.prototype.on = function (event, listener, listenerContext) {
    this.addEventListener(event, listener, listenerContext);
}

/**
 * 注册一次性监听事件
 * @param {string} event 事件名
 * @param listener 回调函数
 * @param listenerContext 监听作用对象
 */
EventDispatcher.prototype.onceOn = function (event, listener, listenerContext) {
    this.addOnceEventListener(event, listener, listenerContext);
}

/**
 * 移除监听事件
 * @param {string} event 事件名
 * @param listener 监听回调函数
 */
EventDispatcher.prototype.off = function (event, listener) {
    this.removeEventListener(event, listener);
}

/**
 * 移除一次性监听事件
 * @param event 一次性事件名
 * @param listener 一次性事件回调
 */
EventDispatcher.prototype.onceOff = function (event, listener) {
    this.removeOnceEventListener(event, listener);
}

/**
 * 根据事件名返回事件
 * @param event 事件名
 */
EventDispatcher.prototype.getListeners = function (event) {
    return this.listenersByEvent[event];
};

module.exports = EventDispatcher;