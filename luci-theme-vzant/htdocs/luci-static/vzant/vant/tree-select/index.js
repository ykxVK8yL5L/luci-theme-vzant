"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _babelHelperVueJsxMergeProps = _interopRequireDefault(require("@vue/babel-helper-vue-jsx-merge-props"));

var _utils = require("../utils");

var _functional = require("../utils/functional");

var _icon = _interopRequireDefault(require("../icon"));

var _sidebar = _interopRequireDefault(require("../sidebar"));

var _sidebarItem = _interopRequireDefault(require("../sidebar-item"));

var _createNamespace = (0, _utils.createNamespace)('tree-select'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

function TreeSelect(h, props, slots, ctx) {
  var height = props.height,
      items = props.items,
      mainActiveIndex = props.mainActiveIndex,
      activeId = props.activeId;
  var selectedItem = items[mainActiveIndex] || {};
  var subItems = selectedItem.children || [];
  var isMultiple = Array.isArray(activeId);

  function isActiveItem(id) {
    return isMultiple ? activeId.indexOf(id) !== -1 : activeId === id;
  }

  var Navs = items.map(function (item) {
    return h(_sidebarItem.default, {
      "attrs": {
        "info": item.info,
        "title": item.text,
        "disabled": item.disabled
      },
      "class": bem('nav-item')
    });
  });

  function Content() {
    if (slots.content) {
      return slots.content();
    }

    return subItems.map(function (item) {
      return h("div", {
        "key": item.id,
        "class": ['van-ellipsis', bem('item', {
          active: isActiveItem(item.id),
          disabled: item.disabled
        })],
        "on": {
          "click": function click() {
            if (!item.disabled) {
              var newActiveId = item.id;

              if (isMultiple) {
                newActiveId = activeId.slice();
                var index = newActiveId.indexOf(item.id);

                if (index !== -1) {
                  newActiveId.splice(index, 1);
                } else if (newActiveId.length < props.max) {
                  newActiveId.push(item.id);
                }
              }

              (0, _functional.emit)(ctx, 'click-item', item);
              (0, _functional.emit)(ctx, 'update:active-id', newActiveId); // compatible for old usage, should be removed in next major version

              (0, _functional.emit)(ctx, 'itemclick', item);
            }
          }
        }
      }, [item.text, isActiveItem(item.id) && h(_icon.default, {
        "attrs": {
          "name": "checked",
          "size": "16px"
        },
        "class": bem('selected')
      })]);
    });
  }

  return h("div", (0, _babelHelperVueJsxMergeProps.default)([{
    "class": bem(),
    "style": {
      height: (0, _utils.addUnit)(height)
    }
  }, (0, _functional.inherit)(ctx)]), [h(_sidebar.default, {
    "class": bem('nav'),
    "attrs": {
      "activeKey": mainActiveIndex
    },
    "on": {
      "change": function change(index) {
        (0, _functional.emit)(ctx, 'click-nav', index);
        (0, _functional.emit)(ctx, 'update:main-active-index', index); // compatible for old usage, should be removed in next major version

        (0, _functional.emit)(ctx, 'navclick', index);
      }
    }
  }, [Navs]), h("div", {
    "class": bem('content')
  }, [Content()])]);
}

TreeSelect.props = {
  max: {
    type: Number,
    default: Infinity
  },
  items: {
    type: Array,
    default: function _default() {
      return [];
    }
  },
  height: {
    type: [Number, String],
    default: 300
  },
  activeId: {
    type: [Number, String, Array],
    default: 0
  },
  mainActiveIndex: {
    type: Number,
    default: 0
  }
};

var _default2 = createComponent(TreeSelect);

exports.default = _default2;