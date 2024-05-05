import React, { useEffect, useState } from 'react';
import { Card, Modal, Button } from 'antd';
import AddTaskModal from '../AddTaskModal';
import { deleteOne, getAll, patchOne, post } from '../../API';
import endpoints from '../../API/constants';
import {
  DatePicker,
  Form,
  Input,
} from 'antd';
import Swal from 'sweetalert2';
const { RangePicker } = DatePicker;

const { Meta } = Card;

const TeacherContent = () => {
  const [tasks, setTasks] = useState([]);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [selectedAssignments, setSelectedAssignments] = useState([]);
  const [selectedAssignments2, setSelectedAssignments2] = useState([]);
  const [getEditTasks, setGetEditTasks] = useState({});
  const [isEditedTeacher, setisEditedTeacher] = useState(false);

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };

  useEffect(() => {
    fetchTasks();
    fetchStudents();
    fetchTeachers();
  }, [modalVisible2, modalVisible]);

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
    const localTeacher = JSON.parse(localStorage.getItem("loggedinuser"));
    
    if (assignments && assignments.length > 0) {
      const mytaskId = assignments[0].taskid;
      const myTask = tasks.find((x) => x.id === mytaskId);
      
      if (myTask) {
        const isEditedTeacher = myTask.teacherId === localTeacher.id;
        setisEditedTeacher(isEditedTeacher);
      }
    }
  };
  
  const handleAssignmentClick2 = (assignmentId) => {
    setSelectedAssignments2([assignmentId]);
    setModalVisible2(true);

  };

  const handleTaskAdded = () => {
    fetchTasks();
  };

  const handleDelete = (deleteId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteOne(endpoints.tasks, deleteId);
        const taskss = tasks.filter((x) => x.id != deleteId);
        setTasks(taskss);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
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
    });
    setModalVisible2(false);
  };

  const addGrade = (myStudent, assignment) => (value) => {
    console.log("Input Values:", value);
    console.log("stud", myStudent.grades);


    patchOne(endpoints.students, myStudent.id, {
      "grades": [...myStudent.grades, {
        "grade": value.grade,
        "taskid": assignment.taskid,
      }]
    })
    console.log("stud", assignment.taskid);
  };

  return (
    <>
      <AddTaskModal onTaskAdded={handleTaskAdded} />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {tasks?.map((task) => {
          const teacher = teachers.find((teacherx) => teacherx.id === task.teacherId);
          return (
            <>
              <Card
                key={task.id}
                style={{ width: 300, margin: '0 10px 20px 10px' }}
                actions={[
                  <Button onClick={() => handleAssignmentClick2(task.id)}>Edit Task</Button>,
                  <Button onClick={() => handleDelete(task.id)}>Delete</Button>,
                  <Button onClick={() => handleAssignmentClick(task.assignments)}>Responses</Button>,
                ]}
              >
                <Meta title={task.title} description={task.description} />
                <p>Teacher: {teacher ? teacher.fullName : 'no teacher'}</p>
                <p>Show responses: {task.assignments.length}</p>
              </Card>
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
                      <Form
                        key={index}
                        onFinish={addGrade(myStudent, assignment)}
                        {...formItemLayout}
                        variant="filled"
                        style={{ maxWidth: 600 }}>
                        {isEditedTeacher ? <Form.Item
                          label="grade"
                          name="grade"
                          rules={[{ required: true, message: 'Please input!' }]}>
                          <Input style={{ marginBottom: "5px" }} />
                        </Form.Item> : ""}
                        <Button key="submit" htmlType="submit">Submit</Button>
                      </Form>
                      <hr />
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
                {selectedAssignments2.map((assignmentId, index) => {
                  const editTask = tasks.find(task => task.id === assignmentId);
                  return (
                    <Form
                      key={index}
                      onFinish={modalSubmit}
                      {...formItemLayout}
                      variant="filled"
                      style={{ maxWidth: 600 }}
                      initialValues={{
                        Input1: editTask.title,
                        Input2: editTask.description
                      }}
                    >
                      <Form.Item
                        label="Input1"
                        name="Input1"
                        rules={[{ required: true, message: 'Please input!' }]}>
                        <Input style={{ marginBottom: "5px" }} />
                      </Form.Item>
                      <Form.Item
                        label="Input2"
                        name="Input2"
                        rules={[{ required: true, message: 'Please input!' }]}>
                        <Input style={{ marginBottom: "5px" }} />
                      </Form.Item>
                      <Form.Item>
                        <Button type="primary" htmlType="submit">Submit</Button>
                      </Form.Item>
                    </Form>
                  );
                })}
              </Modal>
            </>
          );
        })}
      </div>
    </>
  );
};

export default TeacherContent;
