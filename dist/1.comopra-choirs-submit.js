webpackJsonp([1],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _EditorContainer = __webpack_require__(4);

	var _EditorContainer2 = _interopRequireDefault(_EditorContainer);

	var _react = __webpack_require__(7);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(12);

	var _reactRedux = __webpack_require__(5);

	var _editorStore = __webpack_require__(13);

	var _editorStore2 = _interopRequireDefault(_editorStore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function appendContainer() {

	    var div = document.createElement("div");
	    document.body.appendChild(div);
	    return div;
	}

	function loadWidget(e) {

	    var site = e.detail && e.detail.site || appendContainer();
	    var widget = _react2.default.createElement(
	        _reactRedux.Provider,
	        { store: _editorStore2.default },
	        _react2.default.createElement(_EditorContainer2.default, null)
	    );
	    (0, _reactDom.render)(widget, site);
	}

	document.addEventListener("load-comopra-choirs-submit", loadWidget);
	document.dispatchEvent(new CustomEvent("widget-loaded", { detail: "comopra-choirs-submit" }));

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _reactRedux = __webpack_require__(5);

	var _Editor = __webpack_require__(6);

	var _Editor2 = _interopRequireDefault(_Editor);

	var _actionCreators = __webpack_require__(10);

	var _actionCreators2 = _interopRequireDefault(_actionCreators);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var mapStateToProps = function mapStateToProps(state) {
	    return {

	        defaults: state.session

	    };
	};
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	    return {

	        handleChange: function handleChange(e) {
	            return dispatch(_actionCreators2.default.fieldChange(e.target.name, e.target.value));
	        }

	    };
	};

	var EditorContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_Editor2.default);
	exports.default = EditorContainer;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var key = "react-redux";
	var version = "4.4.6";

	var x = window.CoP.retrieve({ key: key, version: version }).instance;
	var Provider = x.Provider,
	    connect = x.connect;
	exports.Provider = Provider;
	exports.connect = connect;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(7);

	var _react2 = _interopRequireDefault(_react);

	var _formSerialize = __webpack_require__(8);

	var _formSerialize2 = _interopRequireDefault(_formSerialize);

	__webpack_require__(9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Editor = function (_Component) {
	    _inherits(Editor, _Component);

	    function Editor() {
	        _classCallCheck(this, Editor);

	        return _possibleConstructorReturn(this, (Editor.__proto__ || Object.getPrototypeOf(Editor)).apply(this, arguments));
	    }

	    _createClass(Editor, [{
	        key: "handleSubmit",
	        value: function handleSubmit(e) {

	            e.preventDefault();
	            console.log((0, _formSerialize2.default)(this.refs.form, { hash: true }));
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var _this2 = this;

	            var _props = this.props,
	                handleChange = _props.handleChange,
	                defaults = _props.defaults;

	            return _react2.default.createElement(
	                "article",
	                { className: "comopra-choirs-submit" },
	                _react2.default.createElement(
	                    "h1",
	                    null,
	                    "Editor"
	                ),
	                _react2.default.createElement(
	                    "form",
	                    { ref: "form", method: "POST", action: "/error", onSubmit: function onSubmit(e) {
	                            return _this2.handleSubmit(e);
	                        } },
	                    _react2.default.createElement(
	                        "p",
	                        null,
	                        _react2.default.createElement(
	                            "label",
	                            null,
	                            "Name"
	                        ),
	                        _react2.default.createElement("input", { type: "text", name: "name", defaultValue: defaults.name, onChange: function onChange(e) {
	                                return handleChange(e);
	                            } })
	                    ),
	                    _react2.default.createElement("input", { type: "submit", value: "Submit" })
	                )
	            );
	        }
	    }]);

	    return Editor;
	}(_react.Component);

	exports.default = Editor;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var key = "react";
	var version = "15.3.2";

	var React = window.CoP.retrieve({ key: key, version: version }).instance;
	exports.default = React;
	var Component = React.Component,
	    PropTypes = React.PropTypes;
	exports.Component = Component;
	exports.PropTypes = PropTypes;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	// get successful control from form and assemble into object
	// http://www.w3.org/TR/html401/interact/forms.html#h-17.13.2

	// types which indicate a submit action and are not successful controls
	// these will be ignored
	var k_r_submitter = /^(?:submit|button|image|reset|file)$/i;

	// node names which could be successful controls
	var k_r_success_contrls = /^(?:input|select|textarea|keygen)/i;

	// Matches bracket notation.
	var brackets = /(\[[^\[\]]*\])/g;

	// serializes form fields
	// @param form MUST be an HTMLForm element
	// @param options is an optional argument to configure the serialization. Default output
	// with no options specified is a url encoded string
	//    - hash: [true | false] Configure the output type. If true, the output will
	//    be a js object.
	//    - serializer: [function] Optional serializer function to override the default one.
	//    The function takes 3 arguments (result, key, value) and should return new result
	//    hash and url encoded str serializers are provided with this module
	//    - disabled: [true | false]. If true serialize disabled fields.
	//    - empty: [true | false]. If true serialize empty fields
	function serialize(form, options) {
	    if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) != 'object') {
	        options = { hash: !!options };
	    } else if (options.hash === undefined) {
	        options.hash = true;
	    }

	    var result = options.hash ? {} : '';
	    var serializer = options.serializer || (options.hash ? hash_serializer : str_serialize);

	    var elements = form && form.elements ? form.elements : [];

	    //Object store each radio and set if it's empty or not
	    var radio_store = Object.create(null);

	    for (var i = 0; i < elements.length; ++i) {
	        var element = elements[i];

	        // ingore disabled fields
	        if (!options.disabled && element.disabled || !element.name) {
	            continue;
	        }
	        // ignore anyhting that is not considered a success field
	        if (!k_r_success_contrls.test(element.nodeName) || k_r_submitter.test(element.type)) {
	            continue;
	        }

	        var key = element.name;
	        var val = element.value;

	        // we can't just use element.value for checkboxes cause some browsers lie to us
	        // they say "on" for value when the box isn't checked
	        if ((element.type === 'checkbox' || element.type === 'radio') && !element.checked) {
	            val = undefined;
	        }

	        // If we want empty elements
	        if (options.empty) {
	            // for checkbox
	            if (element.type === 'checkbox' && !element.checked) {
	                val = '';
	            }

	            // for radio
	            if (element.type === 'radio') {
	                if (!radio_store[element.name] && !element.checked) {
	                    radio_store[element.name] = false;
	                } else if (element.checked) {
	                    radio_store[element.name] = true;
	                }
	            }

	            // if options empty is true, continue only if its radio
	            if (!val && element.type == 'radio') {
	                continue;
	            }
	        } else {
	            // value-less fields are ignored unless options.empty is true
	            if (!val) {
	                continue;
	            }
	        }

	        // multi select boxes
	        if (element.type === 'select-multiple') {
	            val = [];

	            var selectOptions = element.options;
	            var isSelectedOptions = false;
	            for (var j = 0; j < selectOptions.length; ++j) {
	                var option = selectOptions[j];
	                var allowedEmpty = options.empty && !option.value;
	                var hasValue = option.value || allowedEmpty;
	                if (option.selected && hasValue) {
	                    isSelectedOptions = true;

	                    // If using a hash serializer be sure to add the
	                    // correct notation for an array in the multi-select
	                    // context. Here the name attribute on the select element
	                    // might be missing the trailing bracket pair. Both names
	                    // "foo" and "foo[]" should be arrays.
	                    if (options.hash && key.slice(key.length - 2) !== '[]') {
	                        result = serializer(result, key + '[]', option.value);
	                    } else {
	                        result = serializer(result, key, option.value);
	                    }
	                }
	            }

	            // Serialize if no selected options and options.empty is true
	            if (!isSelectedOptions && options.empty) {
	                result = serializer(result, key, '');
	            }

	            continue;
	        }

	        result = serializer(result, key, val);
	    }

	    // Check for all empty radio buttons and serialize them with key=""
	    if (options.empty) {
	        for (var key in radio_store) {
	            if (!radio_store[key]) {
	                result = serializer(result, key, '');
	            }
	        }
	    }

	    return result;
	}

	function parse_keys(string) {
	    var keys = [];
	    var prefix = /^([^\[\]]*)/;
	    var children = new RegExp(brackets);
	    var match = prefix.exec(string);

	    if (match[1]) {
	        keys.push(match[1]);
	    }

	    while ((match = children.exec(string)) !== null) {
	        keys.push(match[1]);
	    }

	    return keys;
	}

	function hash_assign(result, keys, value) {
	    if (keys.length === 0) {
	        result = value;
	        return result;
	    }

	    var key = keys.shift();
	    var between = key.match(/^\[(.+?)\]$/);

	    if (key === '[]') {
	        result = result || [];

	        if (Array.isArray(result)) {
	            result.push(hash_assign(null, keys, value));
	        } else {
	            // This might be the result of bad name attributes like "[][foo]",
	            // in this case the original `result` object will already be
	            // assigned to an object literal. Rather than coerce the object to
	            // an array, or cause an exception the attribute "_values" is
	            // assigned as an array.
	            result._values = result._values || [];
	            result._values.push(hash_assign(null, keys, value));
	        }

	        return result;
	    }

	    // Key is an attribute name and can be assigned directly.
	    if (!between) {
	        result[key] = hash_assign(result[key], keys, value);
	    } else {
	        var string = between[1];
	        // +var converts the variable into a number
	        // better than parseInt because it doesn't truncate away trailing
	        // letters and actually fails if whole thing is not a number
	        var index = +string;

	        // If the characters between the brackets is not a number it is an
	        // attribute name and can be assigned directly.
	        if (isNaN(index)) {
	            result = result || {};
	            result[string] = hash_assign(result[string], keys, value);
	        } else {
	            result = result || [];
	            result[index] = hash_assign(result[index], keys, value);
	        }
	    }

	    return result;
	}

	// Object/hash encoding serializer.
	function hash_serializer(result, key, value) {
	    var matches = key.match(brackets);

	    // Has brackets? Use the recursive assignment function to walk the keys,
	    // construct any missing objects in the result tree and make the assignment
	    // at the end of the chain.
	    if (matches) {
	        var keys = parse_keys(key);
	        hash_assign(result, keys, value);
	    } else {
	        // Non bracket notation can make assignments directly.
	        var existing = result[key];

	        // If the value has been assigned already (for instance when a radio and
	        // a checkbox have the same name attribute) convert the previous value
	        // into an array before pushing into it.
	        //
	        // NOTE: If this requirement were removed all hash creation and
	        // assignment could go through `hash_assign`.
	        if (existing) {
	            if (!Array.isArray(existing)) {
	                result[key] = [existing];
	            }

	            result[key].push(value);
	        } else {
	            result[key] = value;
	        }
	    }

	    return result;
	}

	// urlform encoding serializer
	function str_serialize(result, key, value) {
	    // encode newlines as \r\n cause the html spec says so
	    value = value.replace(/(\r)?\n/g, '\r\n');
	    value = encodeURIComponent(value);

	    // spaces should be '+' rather than '%20'.
	    value = value.replace(/%20/g, '+');
	    return result + (result ? '&' : '') + encodeURIComponent(key) + '=' + value;
	}

	module.exports = serialize;

/***/ },
/* 9 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _actionTypes = __webpack_require__(11);

	var _actionTypes2 = _interopRequireDefault(_actionTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {

	    fieldChange: function fieldChange(prop, value) {
	        return { type: _actionTypes2.default.FIELD_CHANGE, prop: prop, value: value };
	    }

	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var FIELD_CHANGE = "FIELD_CHANGE";
	exports.default = {

	    FIELD_CHANGE: FIELD_CHANGE

	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var key = "react-dom";
	var version = "15.3.2";
	var ReactDOM = window.CoP.retrieve({ key: key, version: version }).instance;
	exports.default = ReactDOM;
	var render = ReactDOM.render;
	exports.render = render;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redux = __webpack_require__(14);

	var _editor = __webpack_require__(15);

	var _editor2 = _interopRequireDefault(_editor);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var devtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

	exports.default = (0, _redux.createStore)(_editor2.default, devtools);

/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var key = "redux";
	var version = "3.6.0";

	var redux = window.CoP.retrieve({ key: key, version: version }).instance;
	exports.default = redux;
	var createStore = redux.createStore,
	    applyMiddleware = redux.applyMiddleware,
	    combineReducers = redux.combineReducers;
	exports.createStore = createStore;
	exports.applyMiddleware = applyMiddleware;
	exports.combineReducers = combineReducers;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redux = __webpack_require__(14);

	var _session = __webpack_require__(17);

	var _session2 = _interopRequireDefault(_session);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = (0, _redux.combineReducers)({ session: _session2.default });

/***/ },
/* 16 */,
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _actionTypes = __webpack_require__(11);

	var _actionTypes2 = _interopRequireDefault(_actionTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var store = window.sessionStorage;

	var initialState = function fetchState() {

	    if (!store) {
	        return {};
	    }
	    try {

	        console.log(store.getItem("editor-state"));
	        return JSON.parse(store.getItem("editor-state")) || {};
	    } catch (e) {

	        return {};
	    }
	}();

	exports.default = function () {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	    var action = arguments[1];


	    if (!store) {
	        return state;
	    }

	    switch (action.type) {

	        case _actionTypes2.default.FIELD_CHANGE:
	            var newState = _extends({}, state, _defineProperty({}, action.prop, action.value));
	            store.setItem("editor-state", JSON.stringify(newState));
	            return newState;

	        default:
	            return state;

	    }
	};

/***/ }
]);