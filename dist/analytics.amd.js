define(function() { return /******/ (function(modules) { // webpackBootstrap
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

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _tool2 = __webpack_require__(1);

	var tool = _interopRequireWildcard(_tool2);

	var _engine2 = __webpack_require__(2);

	var engine = _interopRequireWildcard(_engine2);

	var _createAnalytics = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./createAnalytics\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

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
	            engine.setLocalKey(localKey);
	        }
	        // 创建一个新的实例           
	        var analytics = (0, _createAnalytics2['default'])(options);

	        // 启动自动页面时长统计
	        engine.pageView(analytics);

	        // 启动自动 session 时长统计
	        engine.sessionView(analytics);
	        this.send = analytics.send;
	    }

	    _createClass(Analytics, null, [{
	        key: '_tool',
	        value: tool,
	        enumerable: true
	    }, {
	        key: '_engine',
	        value: engine,
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

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	var _tool = __webpack_require__(1);

	var tool = _interopRequireWildcard(_tool);

	var localKey = 'leancloud-analytics-id';

	function getId() {
	    var id = window.localStorage.getItem(localKey);
	    if (!id) {
	        id = tool.getId();
	        window.localStorage.setItem(localKey, id);
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
	    window.addEventListener('hashchange', function (e) {
	        // 页面发生变化，发送一次页面统计
	        end();
	        // 再次启动新的统计
	        start();
	    });
	    if (analytics.isNW) {
	        __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"nw.gui\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).Window.get().on('close', function () {
	            end();
	        });
	    } else {
	        // 当页面关闭的时候
	        window.addEventListener('beforeunload', function () {
	            // 发送一次
	            end();
	        });
	    }
	}

	function sessionView(analytics) {
	    var startTime = tool.now();
	    var end = function end() {
	        var endTime = tool.now();
	        analytics.send({
	            //必须为 _session.close 表示一次使用结束
	            event: '_session.close',

	            // 使用时长，单位毫秒
	            duration: endTime - startTime
	        });
	    };
	    if (analytics.isNW) {
	        __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"nw.gui\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).Window.get().on('close', end);
	    } else {
	        window.addEventListener('beforeunload', end);
	    }
	}

/***/ }
/******/ ])});;