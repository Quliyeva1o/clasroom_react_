import React, { useEffect, useState } from 'react';
import { Button, Modal, Checkbox, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { DatePicker } from 'antd';
import moment from 'moment';
import { post } from '../../API';
import endpoints from '../../API/constants';
const { RangePicker } = DatePicker;

const AddTaskModal = () => {
  const [open, setOpen] = useState(false);
  const [datestring, setDateString] = useState("");

  let loggedinuser = JSON.parse(localStorage.getItem("loggedinuser"))
  const showModal = () => {
    setOpen(true);
  };
  const onFinish =  (values) => {
    setOpen(false);
    console.log(values);
    const updatedValues = { ...values, deadline: datestring, teacherId: loggedinuser.id, createdAt: moment(new Date()).format('lll'), assignments: [] };
    console.log(datestring);
    console.log(updatedValues);

    post(endpoints.tasks, updatedValues).then((res) => {
      console.log(res.data);
    }).catch((err) => {
      console.log(err);
    });

  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onChange = (date, dateString) => {
    console.log(date, dateString);
    setDateString(moment(dateString).format('lll'))
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add TASK Modal
      </Button>
      <Modal
        title="Title"
        visible={open}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="title"
            name="title"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="description"
            name="description"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="topic"
            name="topic"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <TextArea />
          </Form.Item>
          <DatePicker onChange={onChange} showTime needConfirm={false} />


          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddTaskModal;
