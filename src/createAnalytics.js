import tool from './tool';
import engine from './engine';
let url = 'https://api.leancloud.cn/1.1/stats/open/collect';

let _appId,_appKey,_appVersion,_appChannel,_platform;

function format(eventsList){
    return eventsList.map(function(event){
        event.attributes = event.attr;
        delete event.attr;
        return event;
    });
};
function getEventsList(options){    
    // 判断是否传入的是有值的数组
    if (Array.isArray(options) && options.length) {
       return options;
    }
    // 判断参数是否正确
    if (!options || !options.event) {
        return false;
    }
    let [event,attr,duration,tag] = options;
     // 单个事件对象
    var eventObj = {

        // 事件名称
        event: event,

        // 事件属性，完全自定义
        attr: attr,

        // 持续时长
        duration: duration,

        // 内部使用
        tag:tag
    };
    return [eventObj];
}

function createData(eventsList,{platform='web',version,channel}){
// 分析统计接口            
return {
    client: {
        id: engine.getId(),

        // 服务器端会统一按照小写字母校验
        platform: platform,
        app_version: version,
        app_channel: channel
    },
    session: {
        id: tool.getId()
    },
    events: eventsList
};
}

function post({appId,appKey,data},callback){
    tool.ajax({
        url: url,
        method: 'post',
        data: data,
        appId: appId,
        appKey: appKey
    }, function(error,result) {
        if(!callback){
            return ;
        }
        callback(error,result);        
    });
}

export default function createAnalytics({appId,appKey,version=null,channel=null,platform = 'web'}){
            return {
                send(options,callback){
                    let eventsList = getEventsList(options);
                    if(!eventsList){
                        callback(new Error('EventObject must have a event value.'));
                        return ;
                    } 
                    eventsList = format(eventsList);
                    let data = createData(eventsList,{platform,version,channel});
                    return post({appId,appKey,data},callback);
                }
               
        }
}
