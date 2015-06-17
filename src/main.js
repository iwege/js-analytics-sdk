import tool from './tool';
import engine from './engine';
import createAnalytics from './createAnalytics';

const VERSION = '0.0.1';

class Analytics {
    constructor(options){
        if (typeof options !== 'object') {
            throw('AV.analytics need a argument at least.');
        }
        else if (!options.appId) {
            throw('Options must have appId.');
        }
        else if (!options.appKey) {
            throw('Options must have appKey.');
        }
         // 创建一个新的实例
        var analytics = createAnalytics(options);

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