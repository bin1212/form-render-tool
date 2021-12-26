import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Input, Select, Checkbox } from 'antd';
import FormRenderSchema from '@/components/FormRenderSchema';
const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];
const { TextArea } = Input;
const MyTextEditor = (props) => {
  const { addons } = props;
  let rows;
  if (addons && addons.dependValues) {
    rows = addons.dependValues[0] || 2;
  }
  return <TextArea rows={rows} {...props} />;
};
const TextHtml = (props) => {
  return <div style={{ fontSize: '30px' }}>HTML</div>;
};
const Welcome = () => {
  const [form, setForm] = useState();
  const onOk = (data) => {
    console.log(data);
  };
  const onCancel = () => {
    console.log('onCancel');
  };
  const formSchema = [
    {
      dataIndex: 'useSelect',
      component: 'InputNumber',
      title: '输入框高度',
    },
    {
      dataIndex: 'select2',
      title: '输入框',
      dependencies: ['useSelect'],
      widget: 'MyTextEditor',
      disabled: '{{formData.useSelect==2}}',
    },
    {
      dataIndex: 'name2',
      component: 'checkbox',
      title: '姓名2:',
      rules: [
        {
          required: true,
        },
      ],
      dataSource: [
        {
          label: '选项1',
          value: 'a',
        },
        {
          label: '选项2',
          value: 'b',
        },
      ],
    },
    {
      dataIndex: 'Search',
      component: 'Search',
      title: '输入框',
      props: {
        addonBefore: 'https://',
        onSearch: (val) => {
          console.log(val);
        },
      },
      hidden: '{{formData.name2=="a"}}',
    },
    {
      dataIndex: 'select1',
      component: 'select',
      title: '选择框',
      // dataSource: [
      //   {
      //     label: '选项1',
      //     value: 'a',
      //   },
      //   {
      //     label: '选项2',
      //     value: 'b',
      //   },
      // ],
      props: {
        allowClear: true,
        mode: 'multiple',
        showSearch: true,
      },
    },
    {
      dataIndex: 'times',
      title: '时间选择框',
      component: 'TimePicker',
    },
    {
      dataIndex: 'date',
      title: '日期选择框',
      component: 'dateRangePicker',
      bind: ['startDate', 'endDate'],
      props: {
        picker: 'month',
        format: 'YYYY/MM',
      },
    },
    {
      dataIndex: 'rate',
      title: 'rate',
      component: 'Switch',
    },
    {
      type: 'html',
      widget: 'TextHtml',
    },
    {
      dataIndex: 'upload',
      title: 'upload',
      component: 'upload',
    },
  ];
  return (
    <PageContainer>
      <Card>
        <FormRenderSchema
          formSchema={formSchema}
          onOk={onOk}
          onCancel={onCancel}
          CustomForm={{ MyTextEditor, TextHtml }}
          getForm={(v) => {
            setForm(v);
          }}
          watch={{
            '#': (val) => {
              console.log('表单的时时数据为：', val);
            },
            useSelect: (val) => {
              form.onItemChange('select2', val);
            },
          }}
        />
      </Card>
    </PageContainer>
  );
};

export default Welcome;
