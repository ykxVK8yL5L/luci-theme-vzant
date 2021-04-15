"use strict";

exports.__esModule = true;
exports.switchProps = void 0;

/**
 * Common Switch Props
 */
var switchProps = {
  value: null,
  loading: Boolean,
  disabled: Boolean,
  activeColor: String,
  inactiveColor: String,
  activeValue: {
    type: null,
    default: true
  },
  inactiveValue: {
    type: null,
    default: false
  },
  size: {
    type: String,
    default: '30px'
  }
};
exports.switchProps = switchProps;