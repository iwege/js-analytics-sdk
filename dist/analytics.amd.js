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

	    // 当页面关闭的时候
	    window.addEventListener('beforeunload', function () {
	        // 发送一次
	        end();
	    });
	}

	function sessionView(analytics) {
	    var startTime = tool.now();
	    window.addEventListener('beforeunload', function () {
	        var endTime = tool.now();
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

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	var _tool = __webpack_require__(1);

	var tool = _interopRequireWildcard(_tool);

	var _engine = __webpack_require__(2);

	var engine = _interopRequireWildcard(_engine);

	var _uaParser = __webpack_require__(4);

	var _uaParser2 = _interopRequireDefault(_uaParser);

	var url = 'https://api.leancloud.cn/1.1/stats/open/collect';

	var _appId = undefined,
	    _appKey = undefined,
	    _appVersion = undefined,
	    _appChannel = undefined,
	    _platform = undefined;

	function format(eventsList) {
	    var ua = getUAParser().getResult();
	    return eventsList.map(function (event) {
	        event.attributes = event.attr || {};
	        event.attributes.ua = ua;
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

	    version = version.toString() ? '0' : version.toString();
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

	function post(_ref2, callback) {
	    var appId = _ref2.appId;
	    var appKey = _ref2.appKey;
	    var data = _ref2.data;

	    tool.ajax({
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

	function getUAParser() {
	    return new _uaParser2['default']();
	}

	function createAnalytics(_ref3) {
	    var appId = _ref3.appId;
	    var appKey = _ref3.appKey;
	    var _ref3$version = _ref3.version;
	    var version = _ref3$version === undefined ? undefined : _ref3$version;
	    var _ref3$channel = _ref3.channel;
	    var channel = _ref3$channel === undefined ? undefined : _ref3$channel;
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
	            var data = createData(eventsList, {
	                platform: platform, version: version, channel: channel
	            });
	            return post({
	                appId: appId, appKey: appKey, data: data
	            }, callback);
	        }

	    };
	}

	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports) {

	/**
	 * UAParser.js v0.7.8
	 * Lightweight JavaScript-based User-Agent string parser
	 * https://github.com/faisalman/ua-parser-js
	 *
	 * Copyright © 2012-2015 Faisal Salman <fyzlman@gmail.com>
	 * Dual licensed under GPLv2 & MIT
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	//////////////
	// Constants
	/////////////

	var LIBVERSION = '0.7.8',
	    EMPTY = '',
	    UNKNOWN = '?',
	    FUNC_TYPE = 'function',
	    UNDEF_TYPE = 'undefined',
	    OBJ_TYPE = 'object',
	    STR_TYPE = 'string',
	    MAJOR = 'major',
	    // deprecated
	MODEL = 'model',
	    NAME = 'name',
	    TYPE = 'type',
	    VENDOR = 'vendor',
	    VERSION = 'version',
	    ARCHITECTURE = 'architecture',
	    CONSOLE = 'console',
	    MOBILE = 'mobile',
	    TABLET = 'tablet',
	    SMARTTV = 'smarttv',
	    WEARABLE = 'wearable',
	    EMBEDDED = 'embedded';

	///////////
	// Helper
	//////////

	var util = {
	    extend: function extend(regexes, extensions) {
	        for (var i in extensions) {
	            if ('browser cpu device engine os'.indexOf(i) !== -1 && extensions[i].length % 2 === 0) {
	                regexes[i] = extensions[i].concat(regexes[i]);
	            }
	        }
	        return regexes;
	    },
	    has: function has(str1, str2) {
	        if (typeof str1 === 'string') {
	            return str2.toLowerCase().indexOf(str1.toLowerCase()) !== -1;
	        } else {
	            return false;
	        }
	    },
	    lowerize: function lowerize(str) {
	        return str.toLowerCase();
	    },
	    major: function major(version) {
	        return typeof version === STR_TYPE ? version.split('.')[0] : undefined;
	    }
	};

	///////////////
	// Map helper
	//////////////

	var mapper = {

	    rgx: function rgx() {

	        var result,
	            i = 0,
	            j,
	            k,
	            p,
	            q,
	            matches,
	            match,
	            args = arguments;

	        // loop through all regexes maps
	        while (i < args.length && !matches) {

	            var regex = args[i],
	                // even sequence (0,2,4,..)
	            props = args[i + 1]; // odd sequence (1,3,5,..)

	            // construct object barebones
	            if (typeof result === UNDEF_TYPE) {
	                result = {};
	                for (p in props) {
	                    q = props[p];
	                    if (typeof q === OBJ_TYPE) {
	                        result[q[0]] = undefined;
	                    } else {
	                        result[q] = undefined;
	                    }
	                }
	            }

	            // try matching uastring with regexes
	            j = k = 0;
	            while (j < regex.length && !matches) {
	                matches = regex[j++].exec(this.getUA());
	                if (!!matches) {
	                    for (p = 0; p < props.length; p++) {
	                        match = matches[++k];
	                        q = props[p];
	                        // check if given property is actually array
	                        if (typeof q === OBJ_TYPE && q.length > 0) {
	                            if (q.length == 2) {
	                                if (typeof q[1] == FUNC_TYPE) {
	                                    // assign modified match
	                                    result[q[0]] = q[1].call(this, match);
	                                } else {
	                                    // assign given value, ignore regex match
	                                    result[q[0]] = q[1];
	                                }
	                            } else if (q.length == 3) {
	                                // check whether function or regex
	                                if (typeof q[1] === FUNC_TYPE && !(q[1].exec && q[1].test)) {
	                                    // call function (usually string mapper)
	                                    result[q[0]] = match ? q[1].call(this, match, q[2]) : undefined;
	                                } else {
	                                    // sanitize match using given regex
	                                    result[q[0]] = match ? match.replace(q[1], q[2]) : undefined;
	                                }
	                            } else if (q.length == 4) {
	                                result[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined;
	                            }
	                        } else {
	                            result[q] = match ? match : undefined;
	                        }
	                    }
	                }
	            }
	            i += 2;
	        }
	        return result;
	    },

	    str: function str(_str, map) {

	        for (var i in map) {
	            // check if array
	            if (typeof map[i] === OBJ_TYPE && map[i].length > 0) {
	                for (var j = 0; j < map[i].length; j++) {
	                    if (util.has(map[i][j], _str)) {
	                        return i === UNKNOWN ? undefined : i;
	                    }
	                }
	            } else if (util.has(map[i], _str)) {
	                return i === UNKNOWN ? undefined : i;
	            }
	        }
	        return _str;
	    }
	};

	///////////////
	// String map
	//////////////

	var maps = {

	    browser: {
	        oldsafari: {
	            version: {
	                '1.0': '/8',
	                '1.2': '/1',
	                '1.3': '/3',
	                '2.0': '/412',
	                '2.0.2': '/416',
	                '2.0.3': '/417',
	                '2.0.4': '/419',
	                '?': '/'
	            }
	        }
	    },

	    device: {
	        amazon: {
	            model: {
	                'Fire Phone': ['SD', 'KF']
	            }
	        },
	        sprint: {
	            model: {
	                'Evo Shift 4G': '7373KT'
	            },
	            vendor: {
	                'HTC': 'APA',
	                'Sprint': 'Sprint'
	            }
	        }
	    },

	    os: {
	        windows: {
	            version: {
	                'ME': '4.90',
	                'NT 3.11': 'NT3.51',
	                'NT 4.0': 'NT4.0',
	                '2000': 'NT 5.0',
	                'XP': ['NT 5.1', 'NT 5.2'],
	                'Vista': 'NT 6.0',
	                '7': 'NT 6.1',
	                '8': 'NT 6.2',
	                '8.1': 'NT 6.3',
	                '10': ['NT 6.4', 'NT 10.0'],
	                'RT': 'ARM'
	            }
	        }
	    }
	};

	//////////////
	// Regex map
	/////////////

	var regexes = {

	    browser: [[

	    // Presto based
	    /(opera\smini)\/([\w\.-]+)/i, // Opera Mini
	    /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i, // Opera Mobi/Tablet
	    /(opera).+version\/([\w\.]+)/i, // Opera > 9.80
	    /(opera)[\/\s]+([\w\.]+)/i // Opera < 9.80

	    ], [NAME, VERSION], [/\s(opr)\/([\w\.]+)/i // Opera Webkit
	    ], [[NAME, 'Opera'], VERSION], [

	    // Mixed
	    /(kindle)\/([\w\.]+)/i, // Kindle
	    /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]+)*/i,
	    // Lunascape/Maxthon/Netfront/Jasmine/Blazer

	    // Trident based
	    /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i,
	    // Avant/IEMobile/SlimBrowser/Baidu
	    /(?:ms|\()(ie)\s([\w\.]+)/i, // Internet Explorer

	    // Webkit/KHTML based
	    /(rekonq)\/([\w\.]+)*/i, // Rekonq
	    /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi)\/([\w\.-]+)/i
	    // Chromium/Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron
	    ], [NAME, VERSION], [/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i // IE11
	    ], [[NAME, 'IE'], VERSION], [/(edge)\/((\d+)?[\w\.]+)/i // Microsoft Edge
	    ], [NAME, VERSION], [/(yabrowser)\/([\w\.]+)/i // Yandex
	    ], [[NAME, 'Yandex'], VERSION], [/(comodo_dragon)\/([\w\.]+)/i // Comodo Dragon
	    ], [[NAME, /_/g, ' '], VERSION], [/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i,
	    // Chrome/OmniWeb/Arora/Tizen/Nokia
	    /(uc\s?browser|qqbrowser)[\/\s]?([\w\.]+)/i
	    // UCBrowser/QQBrowser
	    ], [NAME, VERSION], [/(dolfin)\/([\w\.]+)/i // Dolphin
	    ], [[NAME, 'Dolphin'], VERSION], [/((?:android.+)crmo|crios)\/([\w\.]+)/i // Chrome for Android/iOS
	    ], [[NAME, 'Chrome'], VERSION], [/XiaoMi\/MiuiBrowser\/([\w\.]+)/i // MIUI Browser
	    ], [VERSION, [NAME, 'MIUI Browser']], [/android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)/i // Android Browser
	    ], [VERSION, [NAME, 'Android Browser']], [/FBAV\/([\w\.]+);/i // Facebook App for iOS
	    ], [VERSION, [NAME, 'Facebook']], [/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i // Mobile Safari
	    ], [VERSION, [NAME, 'Mobile Safari']], [/version\/([\w\.]+).+?(mobile\s?safari|safari)/i // Safari & Safari Mobile
	    ], [VERSION, NAME], [/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i // Safari < 3.0
	    ], [NAME, [VERSION, mapper.str, maps.browser.oldsafari.version]], [/(konqueror)\/([\w\.]+)/i, // Konqueror
	    /(webkit|khtml)\/([\w\.]+)/i], [NAME, VERSION], [

	    // Gecko based
	    /(navigator|netscape)\/([\w\.-]+)/i // Netscape
	    ], [[NAME, 'Netscape'], VERSION], [/(swiftfox)/i, // Swiftfox
	    /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i,
	    // IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror
	    /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/([\w\.-]+)/i,
	    // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
	    /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i, // Mozilla

	    // Other
	    /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf)[\/\s]?([\w\.]+)/i,
	    // Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf
	    /(links)\s\(([\w\.]+)/i, // Links
	    /(gobrowser)\/?([\w\.]+)*/i, // GoBrowser
	    /(ice\s?browser)\/v?([\w\._]+)/i, // ICE Browser
	    /(mosaic)[\/\s]([\w\.]+)/i // Mosaic
	    ], [NAME, VERSION]

	    /* /////////////////////
	    // Media players BEGIN
	    ////////////////////////
	    , [
	    /(apple(?:coremedia|))\/((\d+)[\w\._]+)/i,                          // Generic Apple CoreMedia
	    /(coremedia) v((\d+)[\w\._]+)/i
	    ], [NAME, VERSION], [
	    /(aqualung|lyssna|bsplayer)\/((\d+)?[\w\.-]+)/i                     // Aqualung/Lyssna/BSPlayer
	    ], [NAME, VERSION], [
	    /(ares|ossproxy)\s((\d+)[\w\.-]+)/i                                 // Ares/OSSProxy
	    ], [NAME, VERSION], [
	    /(audacious|audimusicstream|amarok|bass|core|dalvik|gnomemplayer|music on console|nsplayer|psp-internetradioplayer|videos)\/((\d+)[\w\.-]+)/i,
	                                                                        // Audacious/AudiMusicStream/Amarok/BASS/OpenCORE/Dalvik/GnomeMplayer/MoC
	                                                                        // NSPlayer/PSP-InternetRadioPlayer/Videos
	    /(clementine|music player daemon)\s((\d+)[\w\.-]+)/i,               // Clementine/MPD
	    /(lg player|nexplayer)\s((\d+)[\d\.]+)/i,
	    /player\/(nexplayer|lg player)\s((\d+)[\w\.-]+)/i                   // NexPlayer/LG Player
	    ], [NAME, VERSION], [
	    /(nexplayer)\s((\d+)[\w\.-]+)/i                                     // Nexplayer
	    ], [NAME, VERSION], [
	    /(flrp)\/((\d+)[\w\.-]+)/i                                          // Flip Player
	    ], [[NAME, 'Flip Player'], VERSION], [
	    /(fstream|nativehost|queryseekspider|ia-archiver|facebookexternalhit)/i
	                                                                        // FStream/NativeHost/QuerySeekSpider/IA Archiver/facebookexternalhit
	    ], [NAME], [
	    /(gstreamer) souphttpsrc (?:\([^\)]+\)){0,1} libsoup\/((\d+)[\w\.-]+)/i
	                                                                        // Gstreamer
	    ], [NAME, VERSION], [
	    /(htc streaming player)\s[\w_]+\s\/\s((\d+)[\d\.]+)/i,              // HTC Streaming Player
	    /(java|python-urllib|python-requests|wget|libcurl)\/((\d+)[\w\.-_]+)/i,
	                                                                        // Java/urllib/requests/wget/cURL
	    /(lavf)((\d+)[\d\.]+)/i                                             // Lavf (FFMPEG)
	    ], [NAME, VERSION], [
	    /(htc_one_s)\/((\d+)[\d\.]+)/i                                      // HTC One S
	    ], [[NAME, /_/g, ' '], VERSION], [
	    /(mplayer)(?:\s|\/)(?:(?:sherpya-){0,1}svn)(?:-|\s)(r\d+(?:-\d+[\w\.-]+){0,1})/i
	                                                                        // MPlayer SVN
	    ], [NAME, VERSION], [
	    /(mplayer)(?:\s|\/|[unkow-]+)((\d+)[\w\.-]+)/i                      // MPlayer
	    ], [NAME, VERSION], [
	    /(mplayer)/i,                                                       // MPlayer (no other info)
	    /(yourmuze)/i,                                                      // YourMuze
	    /(media player classic|nero showtime)/i                             // Media Player Classic/Nero ShowTime
	    ], [NAME], [
	    /(nero (?:home|scout))\/((\d+)[\w\.-]+)/i                           // Nero Home/Nero Scout
	    ], [NAME, VERSION], [
	    /(nokia\d+)\/((\d+)[\w\.-]+)/i                                      // Nokia
	    ], [NAME, VERSION], [
	    /\s(songbird)\/((\d+)[\w\.-]+)/i                                    // Songbird/Philips-Songbird
	    ], [NAME, VERSION], [
	    /(winamp)3 version ((\d+)[\w\.-]+)/i,                               // Winamp
	    /(winamp)\s((\d+)[\w\.-]+)/i,
	    /(winamp)mpeg\/((\d+)[\w\.-]+)/i
	    ], [NAME, VERSION], [
	    /(ocms-bot|tapinradio|tunein radio|unknown|winamp|inlight radio)/i  // OCMS-bot/tap in radio/tunein/unknown/winamp (no other info)
	                                                                        // inlight radio
	    ], [NAME], [
	    /(quicktime|rma|radioapp|radioclientapplication|soundtap|totem|stagefright|streamium)\/((\d+)[\w\.-]+)/i
	                                                                        // QuickTime/RealMedia/RadioApp/RadioClientApplication/
	                                                                        // SoundTap/Totem/Stagefright/Streamium
	    ], [NAME, VERSION], [
	    /(smp)((\d+)[\d\.]+)/i                                              // SMP
	    ], [NAME, VERSION], [
	    /(vlc) media player - version ((\d+)[\w\.]+)/i,                     // VLC Videolan
	    /(vlc)\/((\d+)[\w\.-]+)/i,
	    /(xbmc|gvfs|xine|xmms|irapp)\/((\d+)[\w\.-]+)/i,                    // XBMC/gvfs/Xine/XMMS/irapp
	    /(foobar2000)\/((\d+)[\d\.]+)/i,                                    // Foobar2000
	    /(itunes)\/((\d+)[\d\.]+)/i                                         // iTunes
	    ], [NAME, VERSION], [
	    /(wmplayer)\/((\d+)[\w\.-]+)/i,                                     // Windows Media Player
	    /(windows-media-player)\/((\d+)[\w\.-]+)/i
	    ], [[NAME, /-/g, ' '], VERSION], [
	    /windows\/((\d+)[\w\.-]+) upnp\/[\d\.]+ dlnadoc\/[\d\.]+ (home media server)/i
	                                                                        // Windows Media Server
	    ], [VERSION, [NAME, 'Windows']], [
	    /(com\.riseupradioalarm)\/((\d+)[\d\.]*)/i                          // RiseUP Radio Alarm
	    ], [NAME, VERSION], [
	    /(rad.io)\s((\d+)[\d\.]+)/i,                                        // Rad.io
	    /(radio.(?:de|at|fr))\s((\d+)[\d\.]+)/i
	    ], [[NAME, 'rad.io'], VERSION]
	    //////////////////////
	    // Media players END
	    ////////////////////*/

	    ],

	    cpu: [[/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i // AMD64
	    ], [[ARCHITECTURE, 'amd64']], [/(ia32(?=;))/i // IA32 (quicktime)
	    ], [[ARCHITECTURE, util.lowerize]], [/((?:i[346]|x)86)[;\)]/i // IA32
	    ], [[ARCHITECTURE, 'ia32']], [

	    // PocketPC mistakenly identified as PowerPC
	    /windows\s(ce|mobile);\sppc;/i], [[ARCHITECTURE, 'arm']], [/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i // PowerPC
	    ], [[ARCHITECTURE, /ower/, '', util.lowerize]], [/(sun4\w)[;\)]/i // SPARC
	    ], [[ARCHITECTURE, 'sparc']], [/((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+;))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i
	    // IA64, 68K, ARM/64, AVR/32, IRIX/64, MIPS/64, SPARC/64, PA-RISC
	    ], [[ARCHITECTURE, util.lowerize]]],

	    device: [[/\((ipad|playbook);[\w\s\);-]+(rim|apple)/i // iPad/PlayBook
	    ], [MODEL, VENDOR, [TYPE, TABLET]], [/applecoremedia\/[\w\.]+ \((ipad)/ // iPad
	    ], [MODEL, [VENDOR, 'Apple'], [TYPE, TABLET]], [/(apple\s{0,1}tv)/i // Apple TV
	    ], [[MODEL, 'Apple TV'], [VENDOR, 'Apple']], [/(archos)\s(gamepad2?)/i, // Archos
	    /(hp).+(touchpad)/i, // HP TouchPad
	    /(kindle)\/([\w\.]+)/i, // Kindle
	    /\s(nook)[\w\s]+build\/(\w+)/i, // Nook
	    /(dell)\s(strea[kpr\s\d]*[\dko])/i // Dell Streak
	    ], [VENDOR, MODEL, [TYPE, TABLET]], [/(kf[A-z]+)\sbuild\/[\w\.]+.*silk\//i // Kindle Fire HD
	    ], [MODEL, [VENDOR, 'Amazon'], [TYPE, TABLET]], [/(sd|kf)[0349hijorstuw]+\sbuild\/[\w\.]+.*silk\//i // Fire Phone
	    ], [[MODEL, mapper.str, maps.device.amazon.model], [VENDOR, 'Amazon'], [TYPE, MOBILE]], [/\((ip[honed|\s\w*]+);.+(apple)/i // iPod/iPhone
	    ], [MODEL, VENDOR, [TYPE, MOBILE]], [/\((ip[honed|\s\w*]+);/i // iPod/iPhone
	    ], [MODEL, [VENDOR, 'Apple'], [TYPE, MOBILE]], [/(blackberry)[\s-]?(\w+)/i, // BlackBerry
	    /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|huawei|meizu|motorola|polytron)[\s_-]?([\w-]+)*/i,
	    // BenQ/Palm/Sony-Ericsson/Acer/Asus/Dell/Huawei/Meizu/Motorola/Polytron
	    /(hp)\s([\w\s]+\w)/i, // HP iPAQ
	    /(asus)-?(\w+)/i // Asus
	    ], [VENDOR, MODEL, [TYPE, MOBILE]], [/\(bb10;\s(\w+)/i // BlackBerry 10
	    ], [MODEL, [VENDOR, 'BlackBerry'], [TYPE, MOBILE]], [
	    // Asus Tablets
	    /android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7)/i], [MODEL, [VENDOR, 'Asus'], [TYPE, TABLET]], [/(sony)\s(tablet\s[ps])\sbuild\//i, // Sony
	    /(sony)?(?:sgp.+)\sbuild\//i], [[VENDOR, 'Sony'], [MODEL, 'Xperia Tablet'], [TYPE, TABLET]], [/(?:sony)?(?:(?:(?:c|d)\d{4})|(?:so[-l].+))\sbuild\//i], [[VENDOR, 'Sony'], [MODEL, 'Xperia Phone'], [TYPE, MOBILE]], [/\s(ouya)\s/i, // Ouya
	    /(nintendo)\s([wids3u]+)/i // Nintendo
	    ], [VENDOR, MODEL, [TYPE, CONSOLE]], [/android.+;\s(shield)\sbuild/i // Nvidia
	    ], [MODEL, [VENDOR, 'Nvidia'], [TYPE, CONSOLE]], [/(playstation\s[3portablevi]+)/i // Playstation
	    ], [MODEL, [VENDOR, 'Sony'], [TYPE, CONSOLE]], [/(sprint\s(\w+))/i // Sprint Phones
	    ], [[VENDOR, mapper.str, maps.device.sprint.vendor], [MODEL, mapper.str, maps.device.sprint.model], [TYPE, MOBILE]], [/(lenovo)\s?(S(?:5000|6000)+(?:[-][\w+]))/i // Lenovo tablets
	    ], [VENDOR, MODEL, [TYPE, TABLET]], [/(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i, // HTC
	    /(zte)-(\w+)*/i, // ZTE
	    /(alcatel|geeksphone|huawei|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]+)*/i
	    // Alcatel/GeeksPhone/Huawei/Lenovo/Nexian/Panasonic/Sony
	    ], [VENDOR, [MODEL, /_/g, ' '], [TYPE, MOBILE]], [/(nexus\s9)/i // HTC Nexus 9
	    ], [MODEL, [VENDOR, 'HTC'], [TYPE, TABLET]], [/[\s\(;](xbox(?:\sone)?)[\s\);]/i // Microsoft Xbox
	    ], [MODEL, [VENDOR, 'Microsoft'], [TYPE, CONSOLE]], [/(kin\.[onetw]{3})/i // Microsoft Kin
	    ], [[MODEL, /\./g, ' '], [VENDOR, 'Microsoft'], [TYPE, MOBILE]], [

	    // Motorola
	    /\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?(:?\s4g)?)[\w\s]+build\//i, /mot[\s-]?(\w+)*/i, /(XT\d{3,4}) build\//i], [MODEL, [VENDOR, 'Motorola'], [TYPE, MOBILE]], [/android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i], [MODEL, [VENDOR, 'Motorola'], [TYPE, TABLET]], [/android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n8000|sgh-t8[56]9|nexus 10))/i, /((SM-T\w+))/i], [[VENDOR, 'Samsung'], MODEL, [TYPE, TABLET]], [// Samsung
	    /((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-n900))/i, /(sam[sung]*)[\s-]*(\w+-?[\w-]*)*/i, /sec-((sgh\w+))/i], [[VENDOR, 'Samsung'], MODEL, [TYPE, MOBILE]], [/(samsung);smarttv/i], [VENDOR, MODEL, [TYPE, SMARTTV]], [/\(dtv[\);].+(aquos)/i // Sharp
	    ], [MODEL, [VENDOR, 'Sharp'], [TYPE, SMARTTV]], [/sie-(\w+)*/i // Siemens
	    ], [MODEL, [VENDOR, 'Siemens'], [TYPE, MOBILE]], [/(maemo|nokia).*(n900|lumia\s\d+)/i, // Nokia
	    /(nokia)[\s_-]?([\w-]+)*/i], [[VENDOR, 'Nokia'], MODEL, [TYPE, MOBILE]], [/android\s3\.[\s\w;-]{10}(a\d{3})/i // Acer
	    ], [MODEL, [VENDOR, 'Acer'], [TYPE, TABLET]], [/android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i // LG Tablet
	    ], [[VENDOR, 'LG'], MODEL, [TYPE, TABLET]], [/(lg) netcast\.tv/i // LG SmartTV
	    ], [VENDOR, MODEL, [TYPE, SMARTTV]], [/(nexus\s[45])/i, // LG
	    /lg[e;\s\/-]+(\w+)*/i], [MODEL, [VENDOR, 'LG'], [TYPE, MOBILE]], [/android.+(ideatab[a-z0-9\-\s]+)/i // Lenovo
	    ], [MODEL, [VENDOR, 'Lenovo'], [TYPE, TABLET]], [/linux;.+((jolla));/i // Jolla
	    ], [VENDOR, MODEL, [TYPE, MOBILE]], [/((pebble))app\/[\d\.]+\s/i // Pebble
	    ], [VENDOR, MODEL, [TYPE, WEARABLE]], [/android.+;\s(glass)\s\d/i // Google Glass
	    ], [MODEL, [VENDOR, 'Google'], [TYPE, WEARABLE]], [/android.+(\w+)\s+build\/hm\1/i, // Xiaomi Hongmi 'numeric' models
	    /android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i, // Xiaomi Hongmi
	    /android.+(mi[\s\-_]*(?:one|one[\s_]plus)?[\s_]*(?:\d\w)?)\s+build/i // Xiaomi Mi
	    ], [[MODEL, /_/g, ' '], [VENDOR, 'Xiaomi'], [TYPE, MOBILE]], [/(mobile|tablet);.+rv\:.+gecko\//i // Unidentifiable
	    ], [[TYPE, util.lowerize], VENDOR, MODEL]

	    /*//////////////////////////
	    // TODO: move to string map
	    ////////////////////////////
	    /(C6603)/i                                                          // Sony Xperia Z C6603
	    ], [[MODEL, 'Xperia Z C6603'], [VENDOR, 'Sony'], [TYPE, MOBILE]], [
	    /(C6903)/i                                                          // Sony Xperia Z 1
	    ], [[MODEL, 'Xperia Z 1'], [VENDOR, 'Sony'], [TYPE, MOBILE]], [
	    /(SM-G900[F|H])/i                                                   // Samsung Galaxy S5
	    ], [[MODEL, 'Galaxy S5'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
	    /(SM-G7102)/i                                                       // Samsung Galaxy Grand 2
	    ], [[MODEL, 'Galaxy Grand 2'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
	    /(SM-G530H)/i                                                       // Samsung Galaxy Grand Prime
	    ], [[MODEL, 'Galaxy Grand Prime'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
	    /(SM-G313HZ)/i                                                      // Samsung Galaxy V
	    ], [[MODEL, 'Galaxy V'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
	    /(SM-T805)/i                                                        // Samsung Galaxy Tab S 10.5
	    ], [[MODEL, 'Galaxy Tab S 10.5'], [VENDOR, 'Samsung'], [TYPE, TABLET]], [
	    /(SM-G800F)/i                                                       // Samsung Galaxy S5 Mini
	    ], [[MODEL, 'Galaxy S5 Mini'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
	    /(SM-T311)/i                                                        // Samsung Galaxy Tab 3 8.0
	    ], [[MODEL, 'Galaxy Tab 3 8.0'], [VENDOR, 'Samsung'], [TYPE, TABLET]], [
	    /(R1001)/i                                                          // Oppo R1001
	    ], [MODEL, [VENDOR, 'OPPO'], [TYPE, MOBILE]], [
	    /(X9006)/i                                                          // Oppo Find 7a
	    ], [[MODEL, 'Find 7a'], [VENDOR, 'Oppo'], [TYPE, MOBILE]], [
	    /(R2001)/i                                                          // Oppo YOYO R2001
	    ], [[MODEL, 'Yoyo R2001'], [VENDOR, 'Oppo'], [TYPE, MOBILE]], [
	    /(R815)/i                                                           // Oppo Clover R815
	    ], [[MODEL, 'Clover R815'], [VENDOR, 'Oppo'], [TYPE, MOBILE]], [
	     /(U707)/i                                                          // Oppo Find Way S
	    ], [[MODEL, 'Find Way S'], [VENDOR, 'Oppo'], [TYPE, MOBILE]], [
	    /(T3C)/i                                                            // Advan Vandroid T3C
	    ], [MODEL, [VENDOR, 'Advan'], [TYPE, TABLET]], [
	    /(ADVAN T1J\+)/i                                                    // Advan Vandroid T1J+
	    ], [[MODEL, 'Vandroid T1J+'], [VENDOR, 'Advan'], [TYPE, TABLET]], [
	    /(ADVAN S4A)/i                                                      // Advan Vandroid S4A
	    ], [[MODEL, 'Vandroid S4A'], [VENDOR, 'Advan'], [TYPE, MOBILE]], [
	    /(V972M)/i                                                          // ZTE V972M
	    ], [MODEL, [VENDOR, 'ZTE'], [TYPE, MOBILE]], [
	    /(i-mobile)\s(IQ\s[\d\.]+)/i                                        // i-mobile IQ
	    ], [VENDOR, MODEL, [TYPE, MOBILE]], [
	    /(IQ6.3)/i                                                          // i-mobile IQ IQ 6.3
	    ], [[MODEL, 'IQ 6.3'], [VENDOR, 'i-mobile'], [TYPE, MOBILE]], [
	    /(i-mobile)\s(i-style\s[\d\.]+)/i                                   // i-mobile i-STYLE
	    ], [VENDOR, MODEL, [TYPE, MOBILE]], [
	    /(i-STYLE2.1)/i                                                     // i-mobile i-STYLE 2.1
	    ], [[MODEL, 'i-STYLE 2.1'], [VENDOR, 'i-mobile'], [TYPE, MOBILE]], [
	    
	    /(mobiistar touch LAI 512)/i                                        // mobiistar touch LAI 512
	    ], [[MODEL, 'Touch LAI 512'], [VENDOR, 'mobiistar'], [TYPE, MOBILE]], [
	    /////////////
	    // END TODO
	    ///////////*/

	    ],

	    engine: [[/windows.+\sedge\/([\w\.]+)/i // EdgeHTML
	    ], [VERSION, [NAME, 'EdgeHTML']], [/(presto)\/([\w\.]+)/i, // Presto
	    /(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i, // WebKit/Trident/NetFront/NetSurf/Amaya/Lynx/w3m
	    /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i, // KHTML/Tasman/Links
	    /(icab)[\/\s]([23]\.[\d\.]+)/i // iCab
	    ], [NAME, VERSION], [/rv\:([\w\.]+).*(gecko)/i // Gecko
	    ], [VERSION, NAME]],

	    os: [[

	    // Windows based
	    /microsoft\s(windows)\s(vista|xp)/i // Windows (iTunes)
	    ], [NAME, VERSION], [/(windows)\snt\s6\.2;\s(arm)/i, // Windows RT
	    /(windows\sphone(?:\sos)*|windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i], [NAME, [VERSION, mapper.str, maps.os.windows.version]], [/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i], [[NAME, 'Windows'], [VERSION, mapper.str, maps.os.windows.version]], [

	    // Mobile/Embedded OS
	    /\((bb)(10);/i // BlackBerry 10
	    ], [[NAME, 'BlackBerry'], VERSION], [/(blackberry)\w*\/?([\w\.]+)*/i, // Blackberry
	    /(tizen)[\/\s]([\w\.]+)/i, // Tizen
	    /(android|webos|palm\os|qnx|bada|rim\stablet\sos|meego|contiki)[\/\s-]?([\w\.]+)*/i,
	    // Android/WebOS/Palm/QNX/Bada/RIM/MeeGo/Contiki
	    /linux;.+(sailfish);/i // Sailfish OS
	    ], [NAME, VERSION], [/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]+)*/i // Symbian
	    ], [[NAME, 'Symbian'], VERSION], [/\((series40);/i // Series 40
	    ], [NAME], [/mozilla.+\(mobile;.+gecko.+firefox/i // Firefox OS
	    ], [[NAME, 'Firefox OS'], VERSION], [

	    // Console
	    /(nintendo|playstation)\s([wids3portablevu]+)/i, // Nintendo/Playstation

	    // GNU/Linux based
	    /(mint)[\/\s\(]?(\w+)*/i, // Mint
	    /(mageia|vectorlinux)[;\s]/i, // Mageia/VectorLinux
	    /(joli|[kxln]?ubuntu|debian|[open]*suse|gentoo|arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?([\w\.-]+)*/i,
	    // Joli/Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware
	    // Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk/Linpus
	    /(hurd|linux)\s?([\w\.]+)*/i, // Hurd/Linux
	    /(gnu)\s?([\w\.]+)*/i // GNU
	    ], [NAME, VERSION], [/(cros)\s[\w]+\s([\w\.]+\w)/i // Chromium OS
	    ], [[NAME, 'Chromium OS'], VERSION], [

	    // Solaris
	    /(sunos)\s?([\w\.]+\d)*/i // Solaris
	    ], [[NAME, 'Solaris'], VERSION], [

	    // BSD based
	    /\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]+)*/i // FreeBSD/NetBSD/OpenBSD/PC-BSD/DragonFly
	    ], [NAME, VERSION], [/(ip[honead]+)(?:.*os\s*([\w]+)*\slike\smac|;\sopera)/i // iOS
	    ], [[NAME, 'iOS'], [VERSION, /_/g, '.']], [/(mac\sos\sx)\s?([\w\s\.]+\w)*/i, /(macintosh|mac(?=_powerpc)\s)/i // Mac OS
	    ], [[NAME, 'Mac OS'], [VERSION, /_/g, '.']], [

	    // Other
	    /((?:open)?solaris)[\/\s-]?([\w\.]+)*/i, // Solaris
	    /(haiku)\s(\w+)/i, // Haiku
	    /(aix)\s((\d)(?=\.|\)|\s)[\w\.]*)*/i, // AIX
	    /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms)/i,
	    // Plan9/Minix/BeOS/OS2/AmigaOS/MorphOS/RISCOS/OpenVMS
	    /(unix)\s?([\w\.]+)*/i // UNIX
	    ], [NAME, VERSION]]
	};

	/////////////////
	// Constructor
	////////////////

	var UAParser = function UAParser(uastring, extensions) {

	    if (!(this instanceof UAParser)) {
	        return new UAParser(uastring, extensions).getResult();
	    }

	    var ua = uastring || (window && window.navigator && window.navigator.userAgent ? window.navigator.userAgent : EMPTY);
	    var rgxmap = extensions ? util.extend(regexes, extensions) : regexes;

	    this.getBrowser = function () {
	        var browser = mapper.rgx.apply(this, rgxmap.browser);
	        browser.major = util.major(browser.version);
	        return browser;
	    };
	    this.getCPU = function () {
	        return mapper.rgx.apply(this, rgxmap.cpu);
	    };
	    this.getDevice = function () {
	        return mapper.rgx.apply(this, rgxmap.device);
	    };
	    this.getEngine = function () {
	        return mapper.rgx.apply(this, rgxmap.engine);
	    };
	    this.getOS = function () {
	        return mapper.rgx.apply(this, rgxmap.os);
	    };
	    this.getResult = function () {
	        return {
	            ua: this.getUA(),
	            browser: this.getBrowser(),
	            engine: this.getEngine(),
	            os: this.getOS(),
	            device: this.getDevice(),
	            cpu: this.getCPU()
	        };
	    };
	    this.getUA = function () {
	        return ua;
	    };
	    this.setUA = function (uastring) {
	        ua = uastring;
	        return this;
	    };
	    this.setUA(ua);
	    return this;
	};

	UAParser.VERSION = LIBVERSION;
	UAParser.BROWSER = {
	    NAME: NAME,
	    MAJOR: MAJOR, // deprecated
	    VERSION: VERSION
	};
	UAParser.CPU = {
	    ARCHITECTURE: ARCHITECTURE
	};
	UAParser.DEVICE = {
	    MODEL: MODEL,
	    VENDOR: VENDOR,
	    TYPE: TYPE,
	    CONSOLE: CONSOLE,
	    MOBILE: MOBILE,
	    SMARTTV: SMARTTV,
	    TABLET: TABLET,
	    WEARABLE: WEARABLE,
	    EMBEDDED: EMBEDDED
	};
	UAParser.ENGINE = {
	    NAME: NAME,
	    VERSION: VERSION
	};
	UAParser.OS = {
	    NAME: NAME,
	    VERSION: VERSION
	};

	exports['default'] = UAParser;
	module.exports = exports['default'];

/***/ }
/******/ ])});;