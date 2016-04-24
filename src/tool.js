// ID 前缀
let prefix = 'LEAN';
// 与时间相关的随机因子
function getIdItem() {
    return new Date().getTime().toString(36) + Math.random().toString(36).substring(2, 3);
}

/**
 * 获取唯一一个ID
 *
 * @return {String}
 */
export function getId() {
    return `${prefix}${getIdItem()}${getIdItem()}${getIdItem()}`;
}

export function ajax({url,method='get',appId,appKey,data}, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url);
    if (method === 'post' || method === 'put') {
        xhr.setRequestHeader('Content-Type', 'application/json');
    }
    if (appId) {
        xhr.setRequestHeader('X-AVOSCloud-Application-Id', appId);
    }
    if (appKey) {
        xhr.setRequestHeader('X-AVOSCloud-Application-Key', appKey);
    }
    xhr.onload = function(data) {
      let returnData = '';
      // 当lean出问题的时候，不致于程序崩溃
      try{
        returnData = JSON.parse(xhr.responseText);
      }catch(e){
        returnData = '返回结果解析错误';
      }
        // 检测认为 2xx 的返回都是成功
        if (xhr.status >= 200 && xhr.status < 300) {
            callback(null,returnData);
        } else {
            callback(returnData);
        }
    };
    xhr.onerror = function(data) {
        callback(new Error('Network error'), data);
    };
    xhr.send(JSON.stringify(data));
}

export function now(){
    return Date.now();
}
