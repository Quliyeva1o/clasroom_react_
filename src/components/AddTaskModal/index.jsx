import React, { useEffect, useState } from 'react';
import { Button, Modal, Checkbox, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { DatePicker } from 'antd';
import moment from 'moment';
import { post } from '../../API/index.js';
import endpoints from '../../API/constants';
import { getAll } from '../../API';
import { Task } from '../../classes/classes.js';

const { RangePicker } = DatePicker;

const AddTaskModal = ({ onTaskAdded }) => { 
  const [open, setOpen] = useState(false);
  const [datestring, setDateString] = useState("");
  const [tasks, setTasks] = useState([]); 

  let loggedinuser = JSON.parse(localStorage.getItem("loggedinuser"))
  const showModal = () => {
    setOpen(true);
  };
  const onFinish =  (values) => {
    setOpen(false);
   const ts=new Task(values.title,values.description,values.topic,datestring,loggedinuser.id)
    post(endpoints.tasks, ts)
      .then((res) => {
        console.log(res);
        onTaskAdded(); 
      })
      .catch((err) => {
        console.log(err);
      });

  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onChange = (date, dateString) => {
    setDateString(moment(dateString).format('lll'))
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  useEffect(() => {
    getAll(endpoints.tasks).then((res) => {
      setTasks(res.data);
    });
  }, [open]); 

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add TASK Modal
      </Button>
      <Modal
        title="Title"
        open={open}
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
