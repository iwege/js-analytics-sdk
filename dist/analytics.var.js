var LeanAnalytics=function(e){function t(a){if(n[a])return n[a].exports;var o=n[a]={exports:{},id:a,loaded:!1};return e[a].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),u=n(1),i=a(u),d=n(2),l=a(d),s=n(3),f=a(s),p="0.0.1",c=function(){function e(t){if(o(this,e),"object"!=typeof t)throw"LeanAnalytics need a argument at least.";if(!t.appId)throw"Options must have appId.";if(!t.appKey)throw"Options must have appKey.";var n=t.localKey;"string"==typeof n&&l["default"].setLocalKey(n);var a=f["default"](t);l["default"].pageView(a),l["default"].sessionView(a),this.send=a.send}return r(e,null,[{key:"_tool",value:i["default"],enumerable:!0},{key:"_engine",value:l["default"],enumerable:!0},{key:"version",value:p,enumerable:!0}]),e}();t["default"]=c,e.exports=t["default"]},function(e,t){"use strict";function n(){return(new Date).getTime().toString(36)+Math.random().toString(36).substring(2,3)}function a(){return""+u+n()+n()+n()}function o(e,t){var n=e.url,a=e.method,o=void 0===a?"get":a,r=e.appId,u=e.appKey,i=e.data,d=new XMLHttpRequest;d.open(o,n),("post"===o||"put"===o)&&d.setRequestHeader("Content-Type","application/json"),r&&d.setRequestHeader("X-AVOSCloud-Application-Id",r),u&&d.setRequestHeader("X-AVOSCloud-Application-Key",u),d.onload=function(e){d.status>=200&&d.status<300?t(null,JSON.parse(d.responseText)):t(JSON.parse(d.responseText))},d.onerror=function(e){t(new Error("Network error"),e)},d.send(JSON.stringify(i))}function r(){return Date.now()}Object.defineProperty(t,"__esModule",{value:!0}),t.getId=a,t.ajax=o,t.now=r;var u="LEAN"},function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function o(){var e=window.localStorage.getItem(s);return e||(e=l["default"].getId(),window.localStorage.setItem(key,e)),e}function r(e){s=e}function u(e){function t(){a=l["default"].now(),r=window.location.href}function n(){o=l["default"].now(),e.send({event:"_page",duration:o-a,tag:r})}var a=void 0,o=void 0,r=void 0;t(),window.addEventListener("hashchange",function(e){n(),t()}),window.addEventListener("beforeunload",function(){n()})}function i(e){var t=l["default"].now();window.addEventListener("beforeunload",function(){var n=l["default"].now();e.send({event:"_session.close",duration:n-t})})}Object.defineProperty(t,"__esModule",{value:!0}),t.getId=o,t.setLocalKey=r,t.pageView=u,t.sessionView=i;var d=n(1),l=a(d),s="leancloud-analytics-id"},function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function o(e){return e.map(function(e){return e.attributes=e.attr,delete e.attr,e})}function r(e){if(Array.isArray(e)&&e.length)return e;if(!e||!e.event)return!1;var t=e.event,n=e.attr,a=e.duration,o=e.tag,r={event:t,attr:n,duration:a,tag:o};return[r]}function u(e,t){var n=t.platform,a=void 0===n?"web":n,o=t.version,r=t.channel;return{client:{id:p["default"].getId(),platform:a,app_version:o,app_channel:r},session:{id:s["default"].getId()},events:e}}function i(e,t){var n=e.appId,a=e.appKey,o=e.data;s["default"].ajax({url:c,method:"post",data:o,appId:n,appKey:a},function(e,n){t&&t(e,n)})}function d(e){var t=e.appId,n=e.appKey,a=e.version,d=void 0===a?null:a,l=e.channel,s=void 0===l?null:l,f=e.platform,p=void 0===f?"web":f;return{send:function(e,a){var l=r(e);if(!l)return void a(new Error("EventObject must have a event value."));l=o(l);var f=u(l,{platform:p,version:d,channel:s});return i({appId:t,appKey:n,data:f},a)}}}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=d;var l=n(1),s=a(l),f=n(2),p=a(f),c="https://api.leancloud.cn/1.1/stats/open/collect";e.exports=t["default"]}]);