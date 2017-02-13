import * as tool from './tool';
import * as engine from './engine';
import createAnalytics from './createAnalytics';

const VERSION = __VERSION__;

class Analytics {
    constructor(options) {
        if (typeof options !== 'object') {
            throw ('LeanAnalytics need a argument at least.');
        }
        else if (!options.appId) {
            throw ('Options must have appId.');
        }
        else if (!options.appKey) {
            throw ('Options must have appKey.');
        }
        let {localKey} = options;
        if (typeof localKey == 'string') {
            engine.setLocalKey(localKey);
        }
        // 创建一个新的实例
        let analytics = createAnalytics(options);

        // 启动自动页面时长统计
        engine.pageView(analytics);

        // 启动自动 session 时长统计
        engine.sessionView(analytics);
        this.send = analytics.send;
    }

    static _tool = tool;
    static _engine = engine;
    static version = VERSION;
}

export default Analytics;
