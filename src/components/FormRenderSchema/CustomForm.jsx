import React from 'react';
import { Form, Input } from 'antd';

const { TextArea } = Input;
export default (props) => {
  const {
    addons: { formData },
  } = props;
  console.log(props, 'CustomForm-props');
  console.info('formData:', formData);
  return (
    <>
      <TextArea {...props} />
    </>
  );
};
