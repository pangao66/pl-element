'use strict';

/* eslint-disable no-undefined,no-param-reassign,no-shadow */

/**
 * Throttle execution of a function. Especially useful for rate limiting
 * execution of handlers on events like resize and scroll.
 *
 * @param  {Number}    delay          A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
 * @param  {Boolean}   [noTrailing]   Optional, defaults to false. If noTrailing is true, callback will only execute every `delay` milliseconds while the
 *                                    throttled-function is being called. If noTrailing is false or unspecified, callback will be executed one final time
 *                                    after the last throttled-function call. (After the throttled-function has not been called for `delay` milliseconds,
 *                                    the internal counter is reset)
 * @param  {Function}  callback       A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
 *                                    to `callback` when the throttled-function is executed.
 * @param  {Boolean}   [debounceMode] If `debounceMode` is true (at begin), schedule `clear` to execute after `delay` ms. If `debounceMode` is false (at end),
 *                                    schedule `callback` to execute after `delay` ms.
 *
 * @return {Function}  A new, throttled, function.
 */
var throttle = function ( delay, noTrailing, callback, debounceMode ) {

	// After wrapper has stopped being called, this timeout ensures that
	// `callback` is executed at the proper times in `throttle` and `end`
	// debounce modes.
	var timeoutID;

	// Keep track of the last time `callback` was executed.
	var lastExec = 0;

	// `noTrailing` defaults to falsy.
	if ( typeof noTrailing !== 'boolean' ) {
		debounceMode = callback;
		callback = noTrailing;
		noTrailing = undefined;
	}

	// The `wrapper` function encapsulates all of the throttling / debouncing
	// functionality and when executed will limit the rate at which `callback`
	// is executed.
	function wrapper () {

		var self = this;
		var elapsed = Number(new Date()) - lastExec;
		var args = arguments;

		// Execute `callback` and update the `lastExec` timestamp.
		function exec () {
			lastExec = Number(new Date());
			callback.apply(self, args);
		}

		// If `debounceMode` is true (at begin) this is used to clear the flag
		// to allow future `callback` executions.
		function clear () {
			timeoutID = undefined;
		}

		if ( debounceMode && !timeoutID ) {
			// Since `wrapper` is being called for the first time and
			// `debounceMode` is true (at begin), execute `callback`.
			exec();
		}

		// Clear any existing timeout.
		if ( timeoutID ) {
			clearTimeout(timeoutID);
		}

		if ( debounceMode === undefined && elapsed > delay ) {
			// In throttle mode, if `delay` time has been exceeded, execute
			// `callback`.
			exec();

		} else if ( noTrailing !== true ) {
			// In trailing throttle mode, since `delay` time has not been
			// exceeded, schedule `callback` to execute `delay` ms after most
			// recent execution.
			//
			// If `debounceMode` is true (at begin), schedule `clear` to execute
			// after `delay` ms.
			//
			// If `debounceMode` is false (at end), schedule `callback` to
			// execute after `delay` ms.
			timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
		}

	}

	// Return the wrapper function.
	return wrapper;

};

/* eslint-disable no-undefined */



/**
 * Debounce execution of a function. Debouncing, unlike throttling,
 * guarantees that a function is only executed a single time, either at the
 * very beginning of a series of calls, or at the very end.
 *
 * @param  {Number}   delay         A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
 * @param  {Boolean}  [atBegin]     Optional, defaults to false. If atBegin is false or unspecified, callback will only be executed `delay` milliseconds
 *                                  after the last debounced-function call. If atBegin is true, callback will be executed only at the first debounced-function call.
 *                                  (After the throttled-function has not been called for `delay` milliseconds, the internal counter is reset).
 * @param  {Function} callback      A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
 *                                  to `callback` when the debounced-function is executed.
 *
 * @return {Function} A new, debounced function.
 */
var debounce = function ( delay, atBegin, callback ) {
	return callback === undefined ? throttle(delay, atBegin, false) : throttle(delay, callback, atBegin !== false);
};

var throttleDebounce = {
	throttle: throttle,
	debounce: debounce
};
var throttleDebounce_2 = throttleDebounce.debounce;

//
var script = {
  name: 'PlButton',
  inheritAttrs: false,
  props: {
    debounce: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    fullscreenLoading: {
      type: Boolean,
      default: false
    },
    confirmType: {
      type: String,
      default: ''
    },
    popConfig: {
      type: Object,
      default: function _default() {
        return {
          title: '确定删除吗？'
        };
      }
    },
    type: {
      type: String,
      default: ''
    },
    confirmConfig: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  data: function data() {
    return {
      loadingStatus: false,
      fullscreenLoadingStatus: false
    };
  },
  methods: {
    handleClick: function handleClick() {
      var _this = this;

      if (this.confirmType && this.confirmType === 'confirm') {
        this.messageConfirm();
        return;
      }

      if (!this.debounce) {
        if (this.loading) {
          this.loadingStatus = true;
        }

        if (this.fullscreenLoading) {
          this.fullscreenLoadingStatus = true;
        }

        this.$emit('click', function () {
          _this.loadingStatus = false;
          _this.fullscreenLoadingStatus = false;
        });
        return;
      }

      this.debounceClick();
    },
    messageConfirm: function messageConfirm() {
      var _this2 = this;

      var _this$confirmConfig = this.confirmConfig,
          _this$confirmConfig$m = _this$confirmConfig.message,
          message = _this$confirmConfig$m === void 0 ? '此操作将永久删除该数据, 是否继续?' : _this$confirmConfig$m,
          _this$confirmConfig$t = _this$confirmConfig.title,
          title = _this$confirmConfig$t === void 0 ? '提示' : _this$confirmConfig$t,
          _this$confirmConfig$c = _this$confirmConfig.confirmButtonText,
          confirmButtonText = _this$confirmConfig$c === void 0 ? '确定' : _this$confirmConfig$c,
          _this$confirmConfig$c2 = _this$confirmConfig.cancelButtonText,
          cancelButtonText = _this$confirmConfig$c2 === void 0 ? '取消' : _this$confirmConfig$c2,
          _this$confirmConfig$t2 = _this$confirmConfig.type,
          type = _this$confirmConfig$t2 === void 0 ? 'warning' : _this$confirmConfig$t2;
      this.$confirm(message, title, {
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
        type: type
      }).then(function () {
        _this2.confirm();
      }).catch(function () {
        _this2.$emit('cancel');
      });
    },
    confirm: function confirm() {
      var _this3 = this;

      if (this.fullscreenLoading) {
        this.fullscreenLoadingStatus = true;
      }

      this.$emit('confirm', function () {
        _this3.fullscreenLoadingStatus = false;
      });
    },
    debounceClick: throttleDebounce_2(500, true, function () {
      this.$emit('click');
    })
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */ var __vue_script__ = script;
/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.confirmType === "pop"
    ? _c(
        "el-popconfirm",
        _vm._b(
          {
            on: {
              onConfirm: _vm.confirm,
              onCancel: function($event) {
                return _vm.$emit("cancel")
              }
            }
          },
          "el-popconfirm",
          _vm.popConfig,
          false
        ),
        [
          _c(
            "el-button",
            _vm._b(
              {
                directives: [
                  {
                    name: "loading",
                    rawName: "v-loading.fullscreen.lock",
                    value: _vm.fullscreenLoadingStatus,
                    expression: "fullscreenLoadingStatus",
                    modifiers: { fullscreen: true, lock: true }
                  }
                ],
                attrs: { slot: "reference", type: _vm.type },
                slot: "reference"
              },
              "el-button",
              _vm.$attrs,
              false
            ),
            [_vm._t("default")],
            2
          )
        ],
        1
      )
    : _c(
        "el-button",
        _vm._b(
          {
            directives: [
              {
                name: "loading",
                rawName: "v-loading.fullscreen.lock",
                value: _vm.fullscreenLoadingStatus,
                expression: "fullscreenLoadingStatus",
                modifiers: { fullscreen: true, lock: true }
              }
            ],
            attrs: { loading: _vm.loadingStatus, type: _vm.type },
            on: { click: _vm.handleClick }
          },
          "el-button",
          _vm.$attrs,
          false
        ),
        [_vm._t("default")],
        2
      )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

__vue_component__.install = function (Vue) {
  return Vue.component(__vue_component__.name, __vue_component__);
};

module.exports = __vue_component__;
