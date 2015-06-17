(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _tool2 = __webpack_require__(1);

	var _tool3 = _interopRequireDefault(_tool2);

	var _engine2 = __webpack_require__(2);

	var _engine3 = _interopRequireDefault(_engine2);

	var _createAnalytics = __webpack_require__(3);

	var _createAnalytics2 = _interopRequireDefault(_createAnalytics);

	var VERSION = '0.0.1';

	var Analytics = (function () {
	    function Analytics(options) {
	        _classCallCheck(this, Analytics);

	        if (typeof options !== 'object') {
	            throw 'LeanAnalytics need a argument at least.';
	        } else if (!options.appId) {
	            throw 'Options must have appId.';
	        } else if (!options.appKey) {
	            throw 'Options must have appKey.';
	        }
	        var localKey = options.localKey;

	        if (typeof localKey == 'string') {
	            _engine3['default'].setLocalKey(localKey);
	        }
	        // 创建一个新的实例           
	        var analytics = (0, _createAnalytics2['default'])(options);

	        // 启动自动页面时长统计
	        _engine3['default'].pageView(analytics);

	        // 启动自动 session 时长统计
	        _engine3['default'].sessionView(analytics);
	        this.send = analytics.send;
	    }

	    _createClass(Analytics, null, [{
	        key: '_tool',
	        value: _tool3['default'],
	        enumerable: true
	    }, {
	        key: '_engine',
	        value: _engine3['default'],
	        enumerable: true
	    }, {
	        key: 'version',
	        value: VERSION,
	        enumerable: true
	    }]);

	    return Analytics;
	})();

	exports['default'] = Analytics;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	// ID 前缀
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports.getId = getId;
	exports.ajax = ajax;
	exports.now = now;
	var prefix = 'LEAN';
	// 与时间相关的随机因子
	function getIdItem() {
	    return new Date().getTime().toString(36) + Math.random().toString(36).substring(2, 3);
	}

	/**
	 * 获取唯一一个ID
	 * 
	 * @return {String}
	 */

	function getId() {
	    return '' + prefix + '' + getIdItem() + '' + getIdItem() + '' + getIdItem();
	}

	function ajax(_ref, callback) {
	    var url = _ref.url;
	    var _ref$method = _ref.method;
	    var method = _ref$method === undefined ? 'get' : _ref$method;
	    var appId = _ref.appId;
	    var appKey = _ref.appKey;
	    var data = _ref.data;

	    var xhr = new XMLHttpRequest();
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
	    xhr.onload = function (data) {
	        // 检测认为 2xx 的返回都是成功
	        if (xhr.status >= 200 && xhr.status < 300) {
	            callback(null, JSON.parse(xhr.responseText));
	        } else {
	            callback(JSON.parse(xhr.responseText));
	        }
	    };
	    xhr.onerror = function (data) {
	        callback(new Error('Network error'), data);
	    };
	    xhr.send(JSON.stringify(data));
	}

	function now() {
	    return Date.now();
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports.getId = getId;
	exports.setLocalKey = setLocalKey;
	exports.pageView = pageView;
	exports.sessionView = sessionView;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _tool = __webpack_require__(1);

	var _tool2 = _interopRequireDefault(_tool);

	var localKey = 'leancloud-analytics-id';

	function getId() {
	    var id = window.localStorage.getItem(localKey);
	    if (!id) {
	        id = _tool2['default'].getId();
	        window.localStorage.setItem(key, id);
	    }
	    return id;
	}

	function setLocalKey(key) {
	    localKey = key;
	}

	function pageView(analytics) {
	    var startTime = undefined,
	        endTime = undefined,
	        page = undefined;
	    function start() {
	        startTime = _tool2['default'].now();
	        page = window.location.href;
	    }
	    function end() {
	        endTime = _tool2['default'].now();
	        analytics.send({
	            event: '_page',
	            duration: endTime - startTime,
	            tag: page
	        });
	    }
	    start();
	    // 监听 url 变化（包括 hash 变化）
	    window.addEventListener('hashchange', function (e) {
	        // 页面发生变化，发送一次页面统计
	        end();
	        // 再次启动新的统计
	        start();
	    });

	    // 当页面关闭的时候
	    window.addEventListener('beforeunload', function () {
	        // 发送一次
	        end();
	    });
	}

	function sessionView(analytics) {
	    var startTime = _tool2['default'].now();
	    window.addEventListener('beforeunload', function () {
	        var endTime = _tool2['default'].now();
	        analytics.send({
	            //必须为 _session.close 表示一次使用结束
	            event: '_session.close',

	            // 使用时长，单位毫秒
	            duration: endTime - startTime
	        });
	    });
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports['default'] = createAnalytics;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _tool = __webpack_require__(1);

	var _tool2 = _interopRequireDefault(_tool);

	var _engine = __webpack_require__(2);

	var _engine2 = _interopRequireDefault(_engine);

	var url = 'https://api.leancloud.cn/1.1/stats/open/collect';

	var _appId = undefined,
	    _appKey = undefined,
	    _appVersion = undefined,
	    _appChannel = undefined,
	    _platform = undefined;

	function format(eventsList) {
	    return eventsList.map(function (event) {
	        event.attributes = event.attr;
	        delete event.attr;
	        return event;
	    });
	};
	function getEventsList(options) {
	    // 判断是否传入的是有值的数组
	    if (Array.isArray(options) && options.length) {
	        return options;
	    }
	    // 判断参数是否正确
	    if (!options || !options.event) {
	        return false;
	    }
	    var event = options.event;
	    var attr = options.attr;
	    var duration = options.duration;
	    var tag = options.tag;

	    // 单个事件对象
	    var eventObj = {

	        // 事件名称
	        event: event,

	        // 事件属性，完全自定义
	        attr: attr,

	        // 持续时长
	        duration: duration,

	        // 内部使用
	        tag: tag
	    };
	    return [eventObj];
	}

	function createData(eventsList, _ref) {
	    var _ref$platform = _ref.platform;
	    var platform = _ref$platform === undefined ? 'web' : _ref$platform;
	    var version = _ref.version;
	    var channel = _ref.channel;

	    // 分析统计接口           
	    return {
	        client: {
	            id: _engine2['default'].getId(),

	            // 服务器端会统一按照小写字母校验
	            platform: platform,
	            app_version: version,
	            app_channel: channel
	        },
	        session: {
	            id: _tool2['default'].getId()
	        },
	        events: eventsList
	    };
	}

	function post(_ref2, callback) {
	    var appId = _ref2.appId;
	    var appKey = _ref2.appKey;
	    var data = _ref2.data;

	    _tool2['default'].ajax({
	        url: url,
	        method: 'post',
	        data: data,
	        appId: appId,
	        appKey: appKey
	    }, function (error, result) {
	        if (!callback) {
	            return;
	        }
	        callback(error, result);
	    });
	}

	function createAnalytics(_ref3) {
	    var appId = _ref3.appId;
	    var appKey = _ref3.appKey;
	    var _ref3$version = _ref3.version;
	    var version = _ref3$version === undefined ? null : _ref3$version;
	    var _ref3$channel = _ref3.channel;
	    var channel = _ref3$channel === undefined ? null : _ref3$channel;
	    var _ref3$platform = _ref3.platform;
	    var platform = _ref3$platform === undefined ? 'web' : _ref3$platform;

	    return {
	        send: function send(options, callback) {
	            var eventsList = getEventsList(options);
	            if (!eventsList) {
	                callback(new Error('EventObject must have a event value.'));
	                return;
	            }
	            eventsList = format(eventsList);
	            var data = createData(eventsList, { platform: platform, version: version, channel: channel });
	            return post({ appId: appId, appKey: appKey, data: data }, callback);
	        }

	    };
	}

	module.exports = exports['default'];

/***/ }
/******/ ])
});
;