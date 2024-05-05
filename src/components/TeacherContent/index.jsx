import React, { useEffect, useState } from 'react';
import { Card, Modal, Button } from 'antd';
import AddTaskModal from '../AddTaskModal';
import { getAll, patchOne } from '../../API';
import endpoints from '../../API/constants';
import {
  DatePicker,
  Form,
  Input,

} from 'antd';
const { RangePicker } = DatePicker;

const { Meta } = Card;

const TeacherContent = () => {
  const [tasks, setTasks] = useState([]);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [selectedAssignments, setSelectedAssignments] = useState([]);
  const [getEditTasks, setGetEditTasks] = useState({});





  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 6,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 14,
      },
    },
  };



  useEffect(() => {
    fetchTasks();
    fetchStudents();
    fetchTeachers();
  }, [tasks]);

  const fetchTasks = () => {
    getAll(endpoints.tasks).then((res) => {
      setTasks(res.data);
    });
  };

  const fetchStudents = () => {
    getAll(endpoints.students).then((res) => {
      setStudents(res.data);
    });
  };

  const fetchTeachers = () => {
    getAll(endpoints.teachers).then((res) => {
      setTeachers(res.data);
    });
  };

  const handleAssignmentClick = (assignments) => {
    setSelectedAssignments(assignments);
    setModalVisible(true);
  };
  const handleAssignmentClick2 = (assignments) => {
    let editTasks = tasks.find(tasks => tasks.id == assignments);
    setGetEditTasks(editTasks)
    setModalVisible2(true);
  };

  const handleTaskAdded = () => {
    fetchTasks();
  };


  const modalSubmit = (value) => {

    patchOne(endpoints.tasks, getEditTasks.id, {
      id: getEditTasks.id,
      title: value.Input1,
      description: value.Input2,
      topic: getEditTasks.topic,
      deadline: getEditTasks.deadline,
      createdAt: getEditTasks.createdAt,
      teacherId: getEditTasks.teacherId,
      assignments: getEditTasks.assignment
    })
    setModalVisible2(false);
  }

  return (
    <>
      <AddTaskModal onTaskAdded={handleTaskAdded} />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {tasks?.map((task) => {
          const teacher = teachers.find((teacherx) => teacherx.id === task.teacherId);


          return (
            <Card
              key={task.id}
              style={{ width: 300, margin: '0 10px 20px 10px' }}
              actions={[
                <Button onClick={() => handleAssignmentClick2(task.id)}>Edit Task</Button>,
                <Button onClick={() => handleAssignmentClick(task.assignments)}>Show responses</Button>,
              ]}
            >
              <Meta title={task.title} description={task.description} />
              <p>Teacher: {teacher ? teacher.fullName : 'no teacher'}</p>
              <p>Show responses: {task.assignments.length}</p>
            </Card>
          );
        })}
      </div>
      <Modal
        title="Task Responses"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setModalVisible(false)}>Close</Button>,
        ]}
      >
        {selectedAssignments.map((assignment, index) => {
          const myStudent = students.find((stud) => stud.id === assignment.student);

          return (
            <div key={index}>
              <p>Student id: {myStudent ? myStudent.fullName : 'Unknown'}</p>
              <p>Work URL: <a href={assignment.url}>{assignment.url}</a></p>
            </div>
          );
        })}
      </Modal>




      <Modal
        title="Task Responses"
        open={modalVisible2}
        onCancel={() => setModalVisible2(false)}
        footer={[
          <Button key="cancel" onClick={() => setModalVisible2(false)}>Close</Button>,
        ]}
      >

        {

          <Form
            onFinish={modalSubmit}
            {...formItemLayout}
            variant="filled"
            style={{
              maxWidth: 600,
            }}
          >


            <Form.Item
              label="Input1"
              name="Input1"
              initialValue={getEditTasks.title}
              rules={[
                {
                  required: true,
                  message: 'Please input!',
                },
              ]}
            >
              <Input style={{ marginBottom: "5px" }} />
            </Form.Item>
            <Form.Item
              label="Input2"
              name="Input2"
              initialValue={getEditTasks.description}
              rules={[
                {
                  required: true,
                  message: 'Please input!',
                },
              ]}
            >
              <Input style={{ marginBottom: "5px" }} />
            </Form.Item>


            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>

        }

      </Modal>
    </>
  );
};

export default TeacherContent;