const _ = require('lodash');
const { typeMapWidget } = require('./contants');

// antd表单的默认结构映射
const objMapping = {
  checkbox: () => {
    return {
      type: 'array',
      items: {
        type: 'string',
      },
      widget: typeMapWidget.checkbox,
    };
  },
  inputnumber: () => {
    return {
      type: 'number',
      widget: typeMapWidget.inputnumber,
    };
  },
  textarea: () => {
    return {
      type: 'string',
      widget: typeMapWidget.textarea,
    };
  },
  timepicker: () => {
    return {
      type: 'string',
      widget: typeMapWidget.timepicker,
      format: 'time',
    };
  },
  timerangepicker: () => {
    return {
      type: 'range',
      widget: typeMapWidget.timerangepicker,
      format: 'dateTime',
    };
  },
  datepicker: (props) => {
    const { picker } = props;
    return {
      type: 'string',
      widget: typeMapWidget.datepicker,
      format: picker || 'time',
    };
  },
  daterangepicker: (props) => {
    const { picker } = props;
    return {
      type: 'range',
      widget: typeMapWidget.daterangepicker,
      format: picker || 'time',
    };
  },
  cascader: () => {
    return {
      type: 'array',
      widget: typeMapWidget.cascader,
    };
  },
  rate: () => {
    return {
      type: 'number',
      widget: typeMapWidget.rate,
    };
  },
  slider: () => {
    return {
      type: 'number',
      widget: typeMapWidget.slider,
    };
  },
  switch: () => {
    return {
      type: 'boolean',
      widget: typeMapWidget.switch,
    };
  },
  html: () => {
    return {
      type: 'html',
      widget: 'html',
    };
  },
  upload: () => {
    return {
      type: 'string',
      widget: typeMapWidget.upload,
      format: 'upload',
    };
  },
  select: (props) => {
    const { mode } = props;
    return {
      type: mode === 'multiple' ? 'array' : 'string',
      // widget: typeMapWidget.select,
      widget: mode === 'multiple' ? 'multiSelect' : 'select',
      items: {
        type: 'string',
      },
    };
  },
};

// 将选项值转换为form-render规定的数据结构
const formatDataSource = (dataSource, type) => {
  if (_.isEmpty(dataSource)) {
    console.log(type, 'no data');
    return {};
  }
  let data = {};
  switch (type) {
    case 'checkboxes':
      data = {
        enum: [],
        enumNames: [],
      };
      dataSource.map((item) => {
        data.enum.push(item.value);
        data.enumNames.push(item.label);
      });
      break;
    default:
      data = {
        enum: [],
        enumNames: [],
      };
      dataSource.map((item) => {
        data.enum.push(item.value);
        data.enumNames.push(item.label);
      });
      break;
  }
  console.log(data);
  return data;
};

const antdMappingRender = (type, props) => {
  if (!typeMapWidget[type]) {
    return null;
  }
  return objMapping[type] && objMapping[type](props);
};
module.exports = {
  formatDataSource,
  antdMappingRender,
  objMapping,
};
