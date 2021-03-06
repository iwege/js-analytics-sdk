import * as tool from './tool';

let localKey = 'leancloud-analytics-id';
export function getId() {
    let id = window.localStorage.getItem(localKey);
    if (!id) {
        id = tool.getId();
        window.localStorage.setItem(localKey, id);
    }
    return id;
}
export function setLocalKey(key) {
    localKey = key;
}
export function pageView(analytics) {
    let startTime, endTime, page;
    function start() {
        startTime = tool.now();
        page = window.location.href;
    }
    function end() {
        endTime = tool.now();
        analytics.send({
            event: '_page',
            duration: endTime - startTime,
            tag: page
        });
    }
    start();
    // 监听 url 变化（包括 hash 变化）
    window.addEventListener('hashchange',  (e) =>{
        // 页面发生变化，发送一次页面统计
        end();
        // 再次启动新的统计
        start();
    });
    if (analytics.isNW) {
        nw.Window.get().on('close',  end);
    } else {
        // 当页面关闭的时候，发送一次
        window.addEventListener('beforeunload',  end);
    }

}

export function sessionView(analytics) {
    let startTime = tool.now();
    let end = function () {
        let endTime = tool.now();
        analytics.send({
            //必须为 _session.close 表示一次使用结束
            event: '_session.close',

            // 使用时长，单位毫秒
            duration: endTime - startTime
        });
    };
    if (analytics.isNW) {
        nw.Window.get().on('close', end);
    } else {
        window.addEventListener('beforeunload', end);
    }

}
