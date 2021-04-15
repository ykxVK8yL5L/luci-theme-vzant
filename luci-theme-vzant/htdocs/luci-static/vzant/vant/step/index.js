"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _utils = require("../utils");

var _constant = require("../utils/constant");

var _icon = _interopRequireDefault(require("../icon"));

var _createNamespace = (0, _utils.createNamespace)('step'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

var _default = createComponent({
  beforeCreate: function beforeCreate() {
    var steps = this.$parent.steps;
    var index = this.$parent.slots().indexOf(this.$vnode);
    steps.splice(index === -1 ? steps.length : index, 0, this);
  },
  beforeDestroy: function beforeDestroy() {
    var index = this.$parent.steps.indexOf(this);

    if (index > -1) {
      this.$parent.steps.splice(index, 1);
    }
  },
  computed: {
    status: function status() {
      var index = this.$parent.steps.indexOf(this);
      var active = this.$parent.active;

      if (index < active) {
        return 'finish';
      }

      if (index === active) {
        return 'process';
      }
    }
  },
  render: function render() {
    var _ref;

    var h = arguments[0];
    var slots = this.slots,
        status = this.status;
    var _this$$parent = this.$parent,
        activeIcon = _this$$parent.activeIcon,
        activeColor = _this$$parent.activeColor,
        inactiveIcon = _this$$parent.inactiveIcon,
        direction = _this$$parent.direction;
    var titleStyle = status === 'process' && {
      color: activeColor
    };

    function Circle() {
      if (status === 'process') {
        return slots('active-icon') || h(_icon.default, {
          "class": bem('icon'),
          "attrs": {
            "name": activeIcon,
            "color": activeColor
          }
        });
      }

      var inactiveIconSlot = slots('inactive-icon');

      if (inactiveIcon || inactiveIconSlot) {
        return inactiveIconSlot || h(_icon.default, {
          "class": bem('icon'),
          "attrs": {
            "name": inactiveIcon
          }
        });
      }

      return h("i", {
        "class": bem('circle')
      });
    }

    return h("div", {
      "class": [_constant.BORDER, bem([direction, (_ref = {}, _ref[status] = status, _ref)])]
    }, [h("div", {
      "class": bem('title'),
      "style": titleStyle
    }, [this.slots()]), h("div", {
      "class": bem('circle-container')
    }, [Circle()]), h("div", {
      "class": bem('line')
    })]);
  }
});

exports.default = _default;