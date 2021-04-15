"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _babelHelperVueJsxMergeProps = _interopRequireDefault(require("@vue/babel-helper-vue-jsx-merge-props"));

var _utils = require("../utils");

var _functional = require("../utils/functional");

var _constant = require("../utils/constant");

var _popup = require("../mixins/popup");

var _icon = _interopRequireDefault(require("../icon"));

var _popup2 = _interopRequireDefault(require("../popup"));

var _loading = _interopRequireDefault(require("../loading"));

var _createNamespace = (0, _utils.createNamespace)('action-sheet'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

function ActionSheet(h, props, slots, ctx) {
  var title = props.title,
      cancelText = props.cancelText;

  function onCancel() {
    (0, _functional.emit)(ctx, 'input', false);
    (0, _functional.emit)(ctx, 'cancel');
  }

  function Header() {
    if (title) {
      return h("div", {
        "class": [bem('header'), _constant.BORDER_BOTTOM]
      }, [title, h(_icon.default, {
        "attrs": {
          "name": "close"
        },
        "class": bem('close'),
        "on": {
          "click": onCancel
        }
      })]);
    }
  }

  function Content() {
    if (slots.default) {
      return h("div", {
        "class": bem('content')
      }, [slots.default()]);
    }
  }

  function Option(item, index) {
    var disabled = item.disabled || item.loading;

    function onClickOption(event) {
      event.stopPropagation();

      if (item.disabled || item.loading) {
        return;
      }

      if (item.callback) {
        item.callback(item);
      }

      (0, _functional.emit)(ctx, 'select', item, index);

      if (props.closeOnClickAction) {
        (0, _functional.emit)(ctx, 'input', false);
      }
    }

    function OptionContent() {
      if (item.loading) {
        return h(_loading.default, {
          "attrs": {
            "size": "20px"
          }
        });
      }

      return [h("span", {
        "class": bem('name')
      }, [item.name]), item.subname && h("span", {
        "class": bem('subname')
      }, [item.subname])];
    }

    return h("div", {
      "class": [bem('item', {
        disabled: disabled
      }), item.className, _constant.BORDER_TOP],
      "style": {
        color: item.color
      },
      "on": {
        "click": onClickOption
      }
    }, [OptionContent()]);
  }

  function CancelText() {
    if (cancelText) {
      return h("div", {
        "class": bem('cancel'),
        "on": {
          "click": onCancel
        }
      }, [cancelText]);
    }
  }

  return h(_popup2.default, (0, _babelHelperVueJsxMergeProps.default)([{
    "class": bem({
      'safe-area-inset-bottom': props.safeAreaInsetBottom
    }),
    "attrs": {
      "position": "bottom",
      "round": props.round,
      "value": props.value,
      "overlay": props.overlay,
      "duration": props.duration,
      "lazyRender": props.lazyRender,
      "lockScroll": props.lockScroll,
      "getContainer": props.getContainer,
      "closeOnClickOverlay": props.closeOnClickOverlay
    }
  }, (0, _functional.inherit)(ctx, true)]), [Header(), props.actions && props.actions.map(Option), Content(), CancelText()]);
}

ActionSheet.props = (0, _extends2.default)({}, _popup.PopupMixin.props, {
  title: String,
  round: Boolean,
  actions: Array,
  duration: Number,
  cancelText: String,
  getContainer: [String, Function],
  closeOnClickAction: Boolean,
  safeAreaInsetBottom: Boolean,
  overlay: {
    type: Boolean,
    default: true
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: true
  }
});

var _default = createComponent(ActionSheet);

exports.default = _default;