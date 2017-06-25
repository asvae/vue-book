(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["VueComponentTree"] = factory();
	else
		root["VueComponentTree"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 24);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DemoNode = function () {
  function DemoNode(data) {
    _classCallCheck(this, DemoNode);

    this.path = '';

    Object.assign(this, data);
  }

  _createClass(DemoNode, [{
    key: 'getFilename',
    value: function getFilename() {
      return this.path.split('/').pop();
    }
  }, {
    key: 'getParentFolderPath',
    value: function getParentFolderPath() {
      return this.path.split('/').slice(0, -1).join('/');
    }
  }, {
    key: 'toJson',
    value: function toJson() {
      return this.path;
    }
  }]);

  return DemoNode;
}();

/* harmony default export */ __webpack_exports__["a"] = (DemoNode);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(23)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DemoNode__ = __webpack_require__(0);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var DemoFolder = function () {
  function DemoFolder(data) {
    _classCallCheck(this, DemoFolder);

    this.folders = [];
    this.files = [];
    this.name = '';

    this.folders = [];
    Object.assign(this, data);
  }

  _createClass(DemoFolder, [{
    key: 'addFile',
    value: function addFile(node, relativePath) {
      if (relativePath) {
        var folderNameArray = relativePath.split('/');
        var folderName = folderNameArray.shift();
        this.findOrCreateFolder(folderName).addFile(node, folderNameArray.join('/'));
        return;
      }

      this.files.push(node);
    }
  }, {
    key: 'findOrCreateFolder',
    value: function findOrCreateFolder(name) {
      var foundFolder = this.folders.find(function (folder) {
        return folder.name === name;
      });
      if (foundFolder) {
        return foundFolder;
      }
      var folder = new DemoFolder({ name: name });
      this.folders.push(folder);
      return folder;
    }
  }, {
    key: 'addDemoNode',
    value: function addDemoNode(node) {
      var relativePath = node.getParentFolderPath().split('/').slice(1).join('/');
      this.addFile(node, relativePath);
    }
  }, {
    key: 'isEmpty',
    value: function isEmpty() {
      return !(this.folders.length || this.files.length);
    }
  }, {
    key: 'toJson',
    value: function toJson() {
      return {
        name: this.name,
        folders: this.folders.map(function (folder) {
          return folder.toJson();
        }),
        files: this.files.map(function (file) {
          return file.toJson();
        })
      };
    }
  }]);

  return DemoFolder;
}();

/* harmony default export */ __webpack_exports__["a"] = (DemoFolder);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__classes_Main_DemoPage_js__ = __webpack_require__(9);


/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__classes_Main_DemoPage_js__["a" /* default */]);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Folder_vue__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Folder_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Folder_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__classes_Main_DemoFolder_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__classes_Main_DemoNode_js__ = __webpack_require__(0);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      isHidden: false
    };
  },
  mounted: function mounted() {
    this.$refs.folder.openSelected();
  },

  methods: {},
  components: {
    vmFolder: __WEBPACK_IMPORTED_MODULE_0__Folder_vue___default.a
  },
  computed: {
    component: function component() {
      var _this = this;

      var file = this.files.find(function (file) {
        return _this.$route.path === file.path;
      });
      return file ? file.component : null;
    },
    files: function files() {
      return this.$route.meta.files;
    },
    tree: function tree() {
      var tree = new __WEBPACK_IMPORTED_MODULE_1__classes_Main_DemoFolder_js__["a" /* default */]({});
      this.files.forEach(function (node) {
        return tree.addDemoNode(node);
      });
      return tree.folders[0];
    }
  }
});

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__classes_Main_DemoNode_js__ = __webpack_require__(0);
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'File',
  props: {
    file: {
      type: __WEBPACK_IMPORTED_MODULE_0__classes_Main_DemoNode_js__["a" /* default */]
    }
  },
  computed: {
    isActive: function isActive() {
      return this.$route.path === this.file.path;
    },
    status: function status() {
      var status = this.file.component.status;
      return status && 'demo-node-1--' + status;
    }
  }
});

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__File_vue__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__File_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__File_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__classes_Main_DemoFolder_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__classes_Utility_ObjectHelpers_js__ = __webpack_require__(10);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'Folder',
  data: function data() {
    return {
      isOpen: false
    };
  },

  props: {
    folder: {
      type: __WEBPACK_IMPORTED_MODULE_1__classes_Main_DemoFolder_js__["a" /* default */]
    }
  },
  methods: {
    openSelected: function openSelected() {
      var _this = this;

      var foldersChain = __WEBPACK_IMPORTED_MODULE_2__classes_Utility_ObjectHelpers_js__["a" /* default */].traverseBranch(this.folder, { path: this.$route.path }).filter(function (item) {
        return item instanceof __WEBPACK_IMPORTED_MODULE_1__classes_Main_DemoFolder_js__["a" /* default */];
      });

      if (foldersChain.length) {
        this.isOpen = true;
      }

      if (foldersChain.length > 1) {
        setTimeout(function () {
          var folderComponent = _this.$refs.folders.find(function (folderComponent) {
            return folderComponent.folder === foldersChain[1];
          });
          folderComponent.openSelected();
        });
      }
    }
  },
  components: {
    vmFile: __WEBPACK_IMPORTED_MODULE_0__File_vue___default.a
  }
});

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DemoNode_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_DemoPage_vue__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_DemoPage_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_DemoPage_vue__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }





var DemoPage = function () {
  function DemoPage() {
    _classCallCheck(this, DemoPage);
  }

  _createClass(DemoPage, null, [{
    key: 'create',
    value: function create(requireContext, path) {
      var files = requireContext.keys().map(function (key) {
        return new __WEBPACK_IMPORTED_MODULE_0__DemoNode_js__["a" /* default */]({
          path: path + key.substr(1),
          component: requireContext(key)
        });
      });
      return {
        path: path + '*',
        component: __WEBPACK_IMPORTED_MODULE_1__components_DemoPage_vue___default.a,
        meta: { files: files }
      };
    }
  }]);

  return DemoPage;
}();

/* harmony default export */ __webpack_exports__["a"] = (DemoPage);

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ObjectHelpers = function () {
  function ObjectHelpers() {
    _classCallCheck(this, ObjectHelpers);
  }

  _createClass(ObjectHelpers, null, [{
    key: 'traverseBranch',

    /**
     * Find nested branch with object that meets criteria.
     * Branch is returned in form of array, where index means depth.
     *
     * Example:
     *
     * const parent =
     * [
     *   {
     *     one: {name: 1},
     *     two: {name: 2},
     *   },
     *   {
     *     one: {name: 3},
     *     two: {name: 4},
     *   },
     * ]
     *
     * ObjectHelpers.traverseBranch(parent, {name: 4})
     * [
     *   parent,
     *   {one: {name: 3}, two: {name: 4}},
     *   {name: 4},
     * ]
     *
     * @param parent object|array
     * @param criteria object
     * @returns {*}
     */
    value: function traverseBranch(parent, criteria) {
      var result = ObjectHelpers.findNestedRecursive(parent, criteria);
      return result ? [parent].concat(_toConsumableArray(result)) : [];
    }

    /**
     * @protected
     * @param parent
     * @param criteria
     * @returns {*}
     */

  }, {
    key: 'findNestedRecursive',
    value: function findNestedRecursive(parent, criteria) {
      if (!(Array.isArray(parent) || (typeof parent === 'undefined' ? 'undefined' : _typeof(parent)) === 'object')) {
        return null;
      }

      for (var index in parent) {
        var item = parent[index];

        if (item && (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' && ObjectHelpers.meetsCriteria(item, criteria)) {
          return [item];
        }
        var result = ObjectHelpers.findNestedRecursive(item, criteria);
        if (result) {
          return [item].concat(_toConsumableArray(result));
        }
      }
      return null;
    }

    /**
     * Object meets criteria.
     *
     * @protected
     * @param object Object
     * @param criteria Object
     * @returns {boolean}
     */

  }, {
    key: 'meetsCriteria',
    value: function meetsCriteria(object, criteria) {
      for (var index in criteria) {
        if (criteria[index] !== object[index]) {
          return false;
        }
      }
      return true;
    }
  }]);

  return ObjectHelpers;
}();

/* harmony default export */ __webpack_exports__["a"] = (ObjectHelpers);

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "\n.file-structure {\n  width: 300px;\n  overflow: auto;\n  padding: 5px;\n  background-color: white;\n}\n", ""]);

// exports


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(20)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(6),
  /* template */
  __webpack_require__(17),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(21)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(7),
  /* template */
  __webpack_require__(18),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(22)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(8),
  /* template */
  __webpack_require__(19),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "container-1"
  }, [_c('div', {
    staticClass: "container-1__item container-1__item--narrow"
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isHidden),
      expression: "isHidden"
    }]
  }, [_c('span', {
    staticClass: "icon-1",
    staticStyle: {
      "cursor": "pointer"
    },
    on: {
      "click": function($event) {
        _vm.isHidden = !_vm.isHidden
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-bars"
  })])]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.isHidden),
      expression: "! isHidden"
    }],
    staticClass: "file-structure"
  }, [_c('div', {
    staticStyle: {
      "text-align": "right"
    }
  }, [_c('span', {
    staticClass: "icon-2",
    staticStyle: {
      "cursor": "pointer"
    },
    on: {
      "click": function($event) {
        _vm.isHidden = !_vm.isHidden
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-bars"
  })]), _vm._v(" "), _c('span', {
    staticClass: "icon-2",
    staticStyle: {
      "cursor": "pointer"
    },
    on: {
      "click": function($event) {
        _vm.$refs.folder.openSelected()
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-dot-circle-o"
  })]), _vm._v(" "), _c('span', {
    staticClass: "icon-2",
    staticStyle: {
      "cursor": "pointer"
    },
    on: {
      "click": function($event) {
        _vm.$refs.folder.isOpen = false
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-exchange"
  })])]), _vm._v(" "), _c('vm-folder', {
    ref: "folder",
    attrs: {
      "folder": _vm.tree
    }
  })], 1)]), _vm._v(" "), _c('div', {
    staticClass: "container-1__item"
  }, [(_vm.component) ? _c(_vm.component, {
    tag: "component"
  }) : _vm._e()], 1)])
},staticRenderFns: []}

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('router-link', {
    staticClass: "demo-node-1",
    class: [_vm.status, _vm.isActive && 'demo-node-1--active'],
    attrs: {
      "tag": "div",
      "to": _vm.file.path
    }
  }, [_c('div', [_c('i', {
    staticClass: "fa fa-file"
  }), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.file.getFilename()))])])])
},staticRenderFns: []}

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "demo-folder-1"
  }, [_c('div', {
    staticClass: "demo-folder-1__title",
    on: {
      "click": function($event) {
        _vm.isOpen = !_vm.isOpen
      }
    }
  }, [_c('span', {
    staticClass: "icon-1"
  }, [(_vm.isOpen) ? _c('i', {
    staticClass: "fa fa-caret-down"
  }) : _c('i', {
    staticClass: "fa fa-caret-right"
  })]), _vm._v(" "), _c('i', {
    staticClass: "fa fa-folder"
  }), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.folder.name))])]), _vm._v(" "), (_vm.isOpen && !_vm.folder.isEmpty()) ? _c('div', {
    staticClass: "demo-folder-1__insides"
  }, [_vm._l((_vm.folder.folders), function(child) {
    return _c('folder', {
      key: child.path,
      ref: "folders",
      refInFor: true,
      attrs: {
        "folder": child
      }
    })
  }), _vm._v(" "), _vm._l((_vm.folder.files), function(file) {
    return _c('vm-file', {
      key: file.name,
      attrs: {
        "file": file
      }
    })
  })], 2) : _vm._e()])
},staticRenderFns: []}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(11);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("f600037a", content, true);

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(12);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("3c1cfa22", content, true);

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(13);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("4684701d", content, true);

/***/ }),
/* 23 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(5);


/***/ })
/******/ ]);
});
//# sourceMappingURL=app.js.map