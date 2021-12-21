import React, { useEffect, useState } from 'react';
import { Button, Input, message, Space, Checkbox, Switch } from 'antd';
import FormRender, { useForm } from 'form-render';
import { typeMapWidget } from './contants';
import { formatDataSource, antdMappingRender } from './utils';

const { TextArea, Search } = Input;

const Welcome = ({ formSchema = [], onOk, onCancel, CustomForm }) => {
  const form = useForm();
  const [schema, setSchema] = useState({});

  const onFinish = (data, errors) => {
    if (errors.length > 0) {
      message.error('校验未通过：' + JSON.stringify(errors.map((item) => item.name)));
    } else {
      onOk(data);
    }
  };
  const schemaMock = {
    displayType: 'row',
    type: 'object',
    properties: {
      useSelect: {
        title: '输入框高度',
        type: 'number',
      },
      select2: {
        title: '输入框',
        type: 'string',
        dependencies: ['useSelect'],
        widget: 'MyTextEditor',
      },
      name: {
        title: '姓名:',
        type: 'string',
        dependencies: ['select2', 'useSelect'],
        widget: 'CustomFormItem',
        required: true,
      },
      name2: {
        title: '姓名2:',
        type: 'array',
        enumNames: ['选项1', '选项2'],
        enum: ['a', 'b'],
        widget: 'checkboxes',
        items: {
          type: 'string',
        },
      },
    },
  };
  useEffect(() => {
    let schemaMap = {};
    formSchema.map((item) => {
      const { dataIndex, dataSource, rules = [], type, show, ...others } = item;
      const widgetType = type?.toLocaleLowerCase();
      // form-render的required写在外面
      let required = false;
      rules.map((item) => {
        for (const key in item) {
          if (key === 'required') {
            required = item[key];
          }
        }
      });
      const widgetMapItem = antdMappingRender(widgetType) || { type: 'string', widget: type };
      let schemaItem = {
        required,
        ...rules,
        ...widgetMapItem,
        ...formatDataSource(dataSource, typeMapWidget[widgetType]),
        ...others,
      };
      schemaMap[dataIndex] = schemaItem;
    });
    setSchema({
      displayType: 'row',
      type: 'object',
      properties: schemaMap,
    });
  }, []);
  return (
    <>
      <FormRender
        form={form}
        schema={schema}
        widgets={{ ...CustomForm, Switch, Checkbox, Search }}
        onFinish={onFinish}
        layout={'horizontal'}
      />

      <Space>
        <Button onClick={onCancel}>取消</Button>
        <Button type="primary" onClick={form.submit}>
          提交
        </Button>
      </Space>
    </>
  );
};

const MyTextEditor = (props) => {
  const { addons } = props;
  let rows;
  if (addons && addons.dependValues) {
    rows = addons.dependValues[0] || 2;
  }
  return <TextArea rows={rows} {...props} />;
};
export default Welcome;
