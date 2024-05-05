import React, { useEffect, useState } from 'react';
import { Card, Modal, Button, Input } from 'antd';
import AddTaskModal from '../AddTaskModal';
import { getAll, getOne, patchOne } from '../../API';
import endpoints from '../../API/constants';

const { Meta } = Card;

const StudentContent = () => {
  const [tasks, setTasks] = useState([]);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAssignments, setSelectedAssignments] = useState([]);
  const [urlInput, setUrlInput] = useState('');
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchTasks();
    fetchStudents();
    fetchTeachers();
  }, []);

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

  const handleAssign = (taskId) => {
    setSelectedTaskId(taskId);
       
    setModalVisible(true);
  };

  getOne(endpoints.tasks,selectedTaskId).then((res)=>{
    setSelectedTask(res.data)
  })


  const handleUrlInputChange = (e) => {
    setUrlInput(e.target.value);
  };


  const handleAddAssignment = () => {  
    const loggedinUser = JSON.parse(localStorage.getItem("loggedinuser"))

    let isAssigned
    selectedTask ? isAssigned = selectedTask.assignments.some((assignment) => assignment.student === loggedinUser.id) : console.log(selectedTask);

    isAssigned ? alert("artiq assign etmisiz") : patchOne(endpoints.tasks, selectedTaskId, {
      "assignments": [...selectedTask.assignments, {
        "student": loggedinUser.id,
        "url": urlInput
      }]
    })
    setUrlInput("")
    setModalVisible(false);

  };

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {tasks.map((task) => {
          const teacher = teachers.find((teacher) => teacher.id === task.teacherId);
          return (
            <Card
              key={task.id}
              style={{ width: 300, margin: '0 10px 20px 10px' }}
              actions={[
                <a href="#">edit task</a>,
                <Button onClick={() => handleAssign(task.id)}>assign</Button>,
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
        title="Add assignment"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setModalVisible(false)}>Close</Button>,
          <Button key="submit" type="primary" onClick={handleAddAssignment}>Add</Button>,
        ]}
      >
        <Input placeholder="Enter URL" value={urlInput} onChange={handleUrlInputChange} />
      </Modal>
    </>
  );
};

export default StudentContent;
