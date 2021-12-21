import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Input, Select } from 'antd';
import FormRenderSchema from '@/components/FormRenderSchema';

const { TextArea } = Input;
const MyTextEditor = (props) => {
  const { addons } = props;
  let rows;
  if (addons && addons.dependValues) {
    rows = addons.dependValues[0] || 2;
  }
  // return <span>1</span>;
  return <TextArea rows={rows} {...props} />;
};
const Welcome = () => {
  const onOk = (data) => {
    console.log(data);
  };
  const onCancel = () => {
    console.log('onCancel');
  };
  const formSchema = [
    {
      dataIndex: 'useSelect',
      type: 'InputNumber',
      title: '输入框高度',
    },
    {
      dataIndex: 'select2',
      // type: 'TextArea',
      title: '输入框',
      dependencies: ['useSelect'],
      widget: 'MyTextEditor',
    },
    {
      dataIndex: 'name2',
      type: 'checkbox',
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
      type: 'Search',
      title: '输入框',
      props: {
        addonBefore: 'https://',
      },
      hidden: '{{formData.name2=="a"}}',
    },
    {
      dataIndex: 'select1',
      type: 'select',
      title: '选择框',
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
      props: {
        allowClear: true,
        mode: 'multiple',
        showSearch: true,
      },
    },
    {
      dataIndex: 'times',
      title: '时间选择框',
      type: 'RangePicker',
    },
  ];

  return (
    <PageContainer>
      <Card>
        <FormRenderSchema
          formSchema={formSchema}
          onOk={onOk}
          onCancel={onCancel}
          CustomForm={{ MyTextEditor }}
        />
      </Card>
    </PageContainer>
  );
};

export default Welcome;
