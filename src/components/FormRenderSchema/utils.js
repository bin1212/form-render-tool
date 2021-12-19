const _ = require('lodash');
const { typeMapWidget } = require('./contants');

// antd表单的默认结构映射
const objMapping = {
  checkbox: {
    type: 'array',
    items: {
      type: 'string',
    },
    widget: typeMapWidget.checkbox,
  },
  inputnumber: {
    type: 'number',
    widget: typeMapWidget.inputnumber,
  },
  textarea: {
    type: 'string',
    widget: typeMapWidget.textarea,
  },
};

// 将选项值转换为form-render规定的数据结构
const formatDataSource = (dataSource, type) => {
  if (_.isEmpty(dataSource)) {
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
      break;
  }
  return data;
};

const antdMappingRender = (type) => {
  if (!typeMapWidget[type]) {
    return null;
  }
  return objMapping[type];
};
module.exports = {
  formatDataSource,
  antdMappingRender,
  objMapping,
};
