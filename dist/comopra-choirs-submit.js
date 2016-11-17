/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);

/******/ 	};

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		0:0
/******/ 	};

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

/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);

/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;

/******/ 			script.src = __webpack_require__.p + "" + chunkId + ".comopra-choirs-submit.js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};

/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _loader = __webpack_require__(1);

	var _loader2 = _interopRequireDefault(_loader);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(0, _loader2.default)([{

	    key: "react",
	    version: "15.3.2",
	    src: "https://cdnjs.cloudflare.com/ajax/libs/react/15.3.2/react.min.js"

	}, {

	    key: "react-dom",
	    version: "15.3.2",
	    src: "https://cdnjs.cloudflare.com/ajax/libs/react/15.3.2/react-dom.min.js"

	}]).then(function (modules) {

	    __webpack_require__.e/* require */(1, function() {[__webpack_require__(3)];});
	}, function (e) {

	    console.log("ERROR", e);
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _cache = __webpack_require__(2);

	function download(module) {

	    return window.fetch(module.src).then(function (res) {
	        return res.text();
	    }).then(function (text) {
	        module.code = text;
	    });
	}

	function retrieveOrDownload(modules) {

	    var loading = modules.map(function (module) {
	        return (0, _cache.retrieve)(module) || download(module);
	    });
	    return Promise.all(loading);
	}

	function evalCJS(resolveRequires, code) {

	    var module = { exports: {} };
	    var evaluateScript = new Function("module", "exports", "require", code);
	    evaluateScript(module, module.exports, resolveRequires);
	    return module.exports;
	}

	function resolveRequires(modules, name) {

	    var module = modules.find(function (x) {
	        return x.key === name;
	    });
	    if (!module) {
	        throw new Error("Dependency not found: " + name);
	    }
	    if (!module.instance) {
	        throw new Error("Dependency not loaded: " + name);
	    }
	    return module.instance;
	}

	function evaluateModules(modules) {

	    var resolveWithModules = function resolveWithModules(name) {
	        return resolveRequires(modules, name);
	    };
	    modules.forEach(function (module) {

	        if (!module.instance) {

	            console.log("Evaluating", module.key);
	            module.instance = evalCJS(resolveWithModules, module.code);
	        }
	    });
	}

	function cacheModule(module) {

	    (0, _cache.store)(module);
	    module.cached = true;
	}

	function cacheModules(modules) {

	    modules.filter(function (module) {
	        return !module.cached;
	    }).forEach(cacheModule);
	}

	function loader(modules) {

	    var output = JSON.parse(JSON.stringify(modules));
	    return retrieveOrDownload(output).then(function () {
	        return evaluateModules(output);
	    }).then(function () {
	        return cacheModules(output);
	    }).then(function () {
	        return Promise.resolve(output);
	    });
	}

	exports.default = loader;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var ns = window.CoP = window.CoP || {};

	function cache() {

	    return ns.moduleCache = ns.moduleCache || {};
	}

	var moduleCache = cache();

	function asSemVer(version) {

	    var bits = version.split(".").map(function (x) {
	        return parseInt(x);
	    });
	    return {
	        major: bits[0],
	        minor: bits[1],
	        patch: bits[2]
	    };
	}

	function isAcceptable(req, avail) {

	    // not ok with diff major
	    if (req.major !== avail.major) {
	        return false;
	    }
	    // ok with any bigger minor version
	    if (req.minor < avail.minor) {
	        return true;
	    }
	    // not ok with smaller minor version
	    if (req.minor > avail.minor) {
	        return false;
	    }
	    // not ok with smaller patch version
	    if (req.patch > avail.patch) {
	        return false;
	    }
	    // ok with same minor, bigger or equal patch
	    return true;
	}

	function resolveVersion(keyCache, minVersion) {

	    var requiredVersion = asSemVer(minVersion);
	    var cachedVersions = Object.keys(keyCache);
	    var acceptableVersion = cachedVersions.find(function (version) {
	        return isAcceptable(requiredVersion, asSemVer(version));
	    });
	    return acceptableVersion ? keyCache[acceptableVersion] : null;
	}

	function retrieve(module) {

	    try {

	        var keyCache = cache()[module.key];
	        if (!keyCache) {
	            return null;
	        }
	        return resolveVersion(keyCache, module.version);
	    } catch (e) {

	        console.log("Error processing module cache versioning", e.stack);
	    }
	    return null;
	}

	function store(module) {

	    var keyCache = moduleCache[module.key] = moduleCache[module.key] || {};
	    keyCache[module.version] = module;
	}

	ns.store = store;
	ns.retrieve = retrieve;

	exports.store = store;
	exports.retrieve = retrieve;

/***/ }
/******/ ]);