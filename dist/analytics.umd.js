!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define(t);else{var n=t();for(var o in n)("object"==typeof exports?exports:e)[o]=n[o]}}(this,function(){return function(e){function t(o){if(n[o])return n[o].exports;var a=n[o]={exports:{},id:o,loaded:!1};return e[o].call(a.exports,a,a.exports,t),a.loaded=!0,a.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),u=n(1),i=o(u),d=n(2),l=o(d),s=n(3),f=o(s),p="0.0.1",c=function(){function e(t){if(a(this,e),"object"!=typeof t)throw"LeanAnalytics need a argument at least.";if(!t.appId)throw"Options must have appId.";if(!t.appKey)throw"Options must have appKey.";var n=t.localKey;"string"==typeof n&&l["default"].setLocalKey(n);var o=f["default"](t);l["default"].pageView(o),l["default"].sessionView(o),this.send=o.send}return r(e,null,[{key:"_tool",value:i["default"],enumerable:!0},{key:"_engine",value:l["default"],enumerable:!0},{key:"version",value:p,enumerable:!0}]),e}();t["default"]=c,e.exports=t["default"]},function(e,t){"use strict";function n(){return(new Date).getTime().toString(36)+Math.random().toString(36).substring(2,3)}function o(){return""+u+n()+n()+n()}function a(e,t){var n=e.url,o=e.method,a=void 0===o?"get":o,r=e.appId,u=e.appKey,i=e.data,d=new XMLHttpRequest;d.open(a,n),("post"===a||"put"===a)&&d.setRequestHeader("Content-Type","application/json"),r&&d.setRequestHeader("X-AVOSCloud-Application-Id",r),u&&d.setRequestHeader("X-AVOSCloud-Application-Key",u),d.onload=function(e){d.status>=200&&d.status<300?t(null,JSON.parse(d.responseText)):t(JSON.parse(d.responseText))},d.onerror=function(e){t(new Error("Network error"),e)},d.send(JSON.stringify(i))}function r(){return Date.now()}Object.defineProperty(t,"__esModule",{value:!0}),t.getId=o,t.ajax=a,t.now=r;var u="LEAN"},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function a(){var e=window.localStorage.getItem(s);return e||(e=l["default"].getId(),window.localStorage.setItem(key,e)),e}function r(e){s=e}function u(e){function t(){o=l["default"].now(),r=window.location.href}function n(){a=l["default"].now(),e.send({event:"_page",duration:a-o,tag:r})}var o=void 0,a=void 0,r=void 0;t(),window.addEventListener("hashchange",function(e){n(),t()}),window.addEventListener("beforeunload",function(){n()})}function i(e){var t=l["default"].now();window.addEventListener("beforeunload",function(){var n=l["default"].now();e.send({event:"_session.close",duration:n-t})})}Object.defineProperty(t,"__esModule",{value:!0}),t.getId=a,t.setLocalKey=r,t.pageView=u,t.sessionView=i;var d=n(1),l=o(d),s="leancloud-analytics-id"},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function a(e){return e.map(function(e){return e.attributes=e.attr,delete e.attr,e})}function r(e){if(Array.isArray(e)&&e.length)return e;if(!e||!e.event)return!1;var t=e.event,n=e.attr,o=e.duration,a=e.tag,r={event:t,attr:n,duration:o,tag:a};return[r]}function u(e,t){var n=t.platform,o=void 0===n?"web":n,a=t.version,r=t.channel;return{client:{id:p["default"].getId(),platform:o,app_version:a,app_channel:r},session:{id:s["default"].getId()},events:e}}function i(e,t){var n=e.appId,o=e.appKey,a=e.data;s["default"].ajax({url:c,method:"post",data:a,appId:n,appKey:o},function(e,n){t&&t(e,n)})}function d(e){var t=e.appId,n=e.appKey,o=e.version,d=void 0===o?null:o,l=e.channel,s=void 0===l?null:l,f=e.platform,p=void 0===f?"web":f;return{send:function(e,o){var l=r(e);if(!l)return void o(new Error("EventObject must have a event value."));l=a(l);var f=u(l,{platform:p,version:d,channel:s});return i({appId:t,appKey:n,data:f},o)}}}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=d;var l=n(1),s=o(l),f=n(2),p=o(f),c="https://api.leancloud.cn/1.1/stats/open/collect";e.exports=t["default"]}])});