import React, { useEffect, useState } from 'react';
import { Button, Input, message, Space, Checkbox, Switch, Cascader } from 'antd';
import FormRender, { useForm } from 'form-render';

const { TextArea } = Input;
const MyTextEditor = (props) => {
  const { addons } = props;
  let rows;
  if (addons && addons.dependValues) {
    rows = addons.dependValues[0] || 2;
  }
  return <TextArea rows={rows} {...props} />;
};

const Index = () => {
  const form = useForm();
  const schema = {
    type: 'object',
    properties: {
      // 简单例子
      inputDemo: {
        title: '长度',
        type: 'string',
        default: '750',
        rules: [
          {
            pattern: '^[A-Za-z0-9]+$',
            message: '请输入正确格式',
          },
        ],
        className: 'input-with-px',
        props: {
          addonAfter: 'px',
        },
      },
      numberDemo: {
        title: '数字',
        description: '数字输入框',
        type: 'number',
        min: 10,
        max: 100,
        step: 10,
      },
      textareaDemo: {
        title: '输入框',
        type: 'string',
        widget: 'textarea',
        default: 'FormRender\nHello World!',
        required: true,
      },
      // 联动
      input: {
        title: '{{formData.title || "联动输入框"}}',
        type: 'string',
        placeholder: '{{formData.config.placeholder}}',
        hidden: '{{formData.hidden === true}}',
        readOnly: '{{formData.readOnly === true}}',
        disabled: '{{formData.disabled === true}}',
      },
      hidden: {
        title: '是否隐藏',
        type: 'boolean',
      },
      readOnly: {
        title: '是否只读',
        type: 'boolean',
      },
      disabled: {
        title: '是否置灰',
        type: 'boolean',
      },
      inputSelf: {
        dependencies: ['numberDemo'],
        title: '自定义',
        type: 'string',
        widget: 'MyTextEditor',
      },

      // 表单方法
      select1: {
        title: '单选',
        type: 'string',
        widget: 'select',
      },
    },
  };
  const onFinish = (value) => {
    console.log(value);
  };

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  return (
    <>
      <FormRender
        form={form}
        schema={schema}
        onFinish={onFinish}
        widgets={{ MyTextEditor }}
        onMount={() => {
          delay(3000).then((_) => {
            form.setSchemaByPath('select1', {
              enum: ['a', 'b', 'c'],
              enumNames: ['早', '中', '晚'],
            });
          });
        }}
        watch={{
          '#': (val) => {
            console.log('表单的时时数据为：', val);
          },
          inputSelf: (val) => {
            form?.onItemChange('select1', val);
          },
        }}
      />

      <Space>
        <Button>取消</Button>
        <Button type="primary" onClick={form.submit}>
          提交
        </Button>
      </Space>
    </>
  );
};

export default Index;
