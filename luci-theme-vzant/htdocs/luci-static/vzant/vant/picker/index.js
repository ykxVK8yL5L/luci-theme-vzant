"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _utils = require("../utils");

var _event = require("../utils/dom/event");

var _deepClone = require("../utils/deep-clone");

var _shared = require("./shared");

var _constant = require("../utils/constant");

var _loading = _interopRequireDefault(require("../loading"));

var _PickerColumn = _interopRequireDefault(require("./PickerColumn"));

var _createNamespace = (0, _utils.createNamespace)('picker'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1],
    t = _createNamespace[2];

var _default2 = createComponent({
  props: (0, _extends2.default)({}, _shared.pickerProps, {
    defaultIndex: {
      type: Number,
      default: 0
    },
    columns: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    toolbarPosition: {
      type: String,
      default: 'top'
    },
    valueKey: {
      type: String,
      default: 'text'
    }
  }),
  data: function data() {
    return {
      children: []
    };
  },
  computed: {
    simple: function simple() {
      return this.columns.length && !this.columns[0].values;
    }
  },
  watch: {
    columns: 'setColumns'
  },
  methods: {
    setColumns: function setColumns() {
      var _this = this;

      var columns = this.simple ? [{
        values: this.columns
      }] : this.columns;
      columns.forEach(function (column, index) {
        _this.setColumnValues(index, (0, _deepClone.deepClone)(column.values));
      });
    },
    emit: function emit(event) {
      if (this.simple) {
        this.$emit(event, this.getColumnValue(0), this.getColumnIndex(0));
      } else {
        this.$emit(event, this.getValues(), this.getIndexes());
      }
    },
    onChange: function onChange(columnIndex) {
      if (this.simple) {
        this.$emit('change', this, this.getColumnValue(0), this.getColumnIndex(0));
      } else {
        this.$emit('change', this, this.getValues(), columnIndex);
      }
    },
    // get column instance by index
    getColumn: function getColumn(index) {
      return this.children[index];
    },
    // get column value by index
    getColumnValue: function getColumnValue(index) {
      var column = this.getColumn(index);
      return column && column.getValue();
    },
    // set column value by index
    setColumnValue: function setColumnValue(index, value) {
      var column = this.getColumn(index);
      column && column.setValue(value);
    },
    // get column option index by column index
    getColumnIndex: function getColumnIndex(columnIndex) {
      return (this.getColumn(columnIndex) || {}).currentIndex;
    },
    // set column option index by column index
    setColumnIndex: function setColumnIndex(columnIndex, optionIndex) {
      var column = this.getColumn(columnIndex);
      column && column.setIndex(optionIndex);
    },
    // get options of column by index
    getColumnValues: function getColumnValues(index) {
      return (this.children[index] || {}).options;
    },
    // set options of column by index
    setColumnValues: function setColumnValues(index, options) {
      var column = this.children[index];

      if (column && JSON.stringify(column.options) !== JSON.stringify(options)) {
        column.options = options;
        column.setIndex(0);
      }
    },
    // get values of all columns
    getValues: function getValues() {
      return this.children.map(function (child) {
        return child.getValue();
      });
    },
    // set values of all columns
    setValues: function setValues(values) {
      var _this2 = this;

      values.forEach(function (value, index) {
        _this2.setColumnValue(index, value);
      });
    },
    // get indexes of all columns
    getIndexes: function getIndexes() {
      return this.children.map(function (child) {
        return child.currentIndex;
      });
    },
    // set indexes of all columns
    setIndexes: function setIndexes(indexes) {
      var _this3 = this;

      indexes.forEach(function (optionIndex, columnIndex) {
        _this3.setColumnIndex(columnIndex, optionIndex);
      });
    },
    onConfirm: function onConfirm() {
      this.children.map(function (child) {
        return child.stopMomentum();
      });
      this.emit('confirm');
    },
    onCancel: function onCancel() {
      this.emit('cancel');
    }
  },
  render: function render(h) {
    var _this4 = this;

    var itemHeight = this.itemHeight;
    var wrapHeight = itemHeight * this.visibleItemCount;
    var columns = this.simple ? [this.columns] : this.columns;
    var frameStyle = {
      height: itemHeight + "px"
    };
    var columnsStyle = {
      height: wrapHeight + "px"
    };
    var maskStyle = {
      backgroundSize: "100% " + (wrapHeight - itemHeight) / 2 + "px"
    };
    var Toolbar = this.showToolbar && h("div", {
      "class": [_constant.BORDER_TOP_BOTTOM, bem('toolbar')]
    }, [this.slots() || [h("div", {
      "attrs": {
        "role": "button",
        "tabindex": "0"
      },
      "class": bem('cancel'),
      "on": {
        "click": this.onCancel
      }
    }, [this.cancelButtonText || t('cancel')]), this.slots('title') || this.title && h("div", {
      "class": ['van-ellipsis', bem('title')]
    }, [this.title]), h("div", {
      "attrs": {
        "role": "button",
        "tabindex": "0"
      },
      "class": bem('confirm'),
      "on": {
        "click": this.onConfirm
      }
    }, [this.confirmButtonText || t('confirm')])]]);
    return h("div", {
      "class": bem()
    }, [this.toolbarPosition === 'top' ? Toolbar : h(), this.loading ? h(_loading.default, {
      "class": bem('loading'),
      "attrs": {
        "color": _constant.BLUE
      }
    }) : h(), h("div", {
      "class": bem('columns'),
      "style": columnsStyle,
      "on": {
        "touchmove": _event.preventDefault
      }
    }, [columns.map(function (item, index) {
      return h(_PickerColumn.default, {
        "attrs": {
          "valueKey": _this4.valueKey,
          "allowHtml": _this4.allowHtml,
          "className": item.className,
          "itemHeight": _this4.itemHeight,
          "defaultIndex": item.defaultIndex || _this4.defaultIndex,
          "visibleItemCount": _this4.visibleItemCount,
          "initialOptions": _this4.simple ? item : item.values
        },
        "on": {
          "change": function change() {
            _this4.onChange(index);
          }
        }
      });
    }), h("div", {
      "class": bem('mask'),
      "style": maskStyle
    }), h("div", {
      "class": [_constant.BORDER_UNSET_TOP_BOTTOM, bem('frame')],
      "style": frameStyle
    })]), this.toolbarPosition === 'bottom' ? Toolbar : h()]);
  }
});

exports.default = _default2;