import React, { useEffect, useState } from 'react';
import { Button, Input, message, Space, Checkbox, Switch, Cascader } from 'antd';
import FormRender, { useForm } from 'form-render';
import { typeMapWidget } from './contants';
import { formatDataSource, antdMappingRender } from './utils';

const { TextArea, Search } = Input;

/**
 formSchema：表单结构
[
  {
    dataIndex: 'select2', 表单的字段name
    title: '输入框', label名
    component:'Input', antd的组建名，如果自定义组件则不需要传
    dependencies: ['useSelect'], 自定义组建依赖的dataIndex
    widget: 'MyTextEditor', 自定义组件，此处的名称需要和传入的自定义组建的名称相同，自定义组件需要有value和onChange
    dataSource:[{label: '选项1',value: 'a'}], 表单的需要的数据，比如select的下拉选项
    rules:[],表单的rule，
    props:{addonBefore: 'https://',},表单的props，和antd中组件的props一致，
    hidden: '{{formData.name2=="a"}}', 表单联动，formData拿到当前表单的所有值
    bind: ['startDate', 'endDate'],转换的字段名，比如时间区间选完后转换
    disabled: '{{formData.useSelect==2}}',不可编辑
  }
]
onOk :()=>{}确定，
onCancel：()=>{}取消
CustomForm：[{MyTextEditor:MyTextEditor}],自定义组件

  例子：antd的TextArea有value和onchange的受控组件，如果是自己封装的则需要有value和onChange
    addons.dependValues是依赖的值，
  const MyTextEditor = (props) => {
    const { addons } = props;
    let rows;
    if (addons && addons.dependValues) {
      rows = addons.dependValues[0] || 2;
    }
    return <TextArea rows={rows} {...props} />;
};
 */

const Index = ({ formSchema = [], onOk, onCancel, CustomForm, watch = {}, getForm }) => {
  const form = useForm();
  const [schema, setSchema] = useState({});

  const onFinish = (data, errors) => {
    if (errors.length > 0) {
      message.error('校验未通过：' + JSON.stringify(errors.map((item) => item.name)));
    } else {
      onOk(data);
    }
  };
  useEffect(() => {
    getForm && getForm(form);
    let schemaMap = {};
    formSchema.map((item, index) => {
      const {
        dataIndex,
        widget,
        dataSource,
        type,
        rules = [],
        component,
        show,
        props,
        ...others
      } = item;
      const widgetComponent = component?.toLocaleLowerCase();
      // form-render的required写在外面
      let required = false;
      rules.map((item) => {
        for (const key in item) {
          if (key === 'required') {
            required = item[key];
          }
        }
      });
      let widgetMapItem = {};
      widgetMapItem = antdMappingRender(widgetComponent, props) || {
        type: 'string',
        widget: component,
      };
      if (widget) {
        widgetMapItem = {
          widget,
          type: type || 'string',
        };
      } else {
        widgetMapItem = antdMappingRender(widgetComponent, props) || {
          type: 'string',
          widget: component,
        };
      }
      let schemaItem = {
        required,
        ...rules,
        props,
        ...widgetMapItem,
        ...formatDataSource(dataSource, typeMapWidget[widgetComponent]),
        ...others,
      };
      const key = dataIndex || `key${index}`;
      schemaMap[key] = schemaItem;
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
        widgets={{ ...CustomForm, Switch, Checkbox, Search, Cascader }}
        onFinish={onFinish}
        layout={'horizontal'}
        watch={watch}
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

export default Index;
