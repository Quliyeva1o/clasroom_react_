import React, { useEffect, useState } from 'react';
import { Card, Modal, Button, Input } from 'antd';
import AddTaskModal from '../AddTaskModal';
import { getAll, getOne, patchOne } from '../../API';
import endpoints from '../../API/constants';

const { Meta } = Card;

const StudentContent = () => {
  const [tasks, setTasks] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isAssigned, setIsAssigned] = useState(false);
  const [urlInput, setUrlInput] = useState('');

  useEffect(() => {
    fetchTasks();
    fetchTeachers();
  }, []);

  const fetchTasks = () => {
    getAll(endpoints.tasks).then((res) => {
      setTasks(res.data);
    });
  };

  const fetchTeachers = () => {
    getAll(endpoints.teachers).then((res) => {
      setTeachers(res.data);
    });
  };

  const handleAssign = (taskId) => {
    getOne(endpoints.tasks, taskId).then((res) => {
      setSelectedTask(res.data);
      const loggedinUser = JSON.parse(localStorage.getItem("loggedinuser"));
      const isAssigned = res.data.assignments.some((assignment) => assignment.student === loggedinUser.id);
      setIsAssigned(isAssigned);
      setModalVisible(true);
    });
  };

  const handleUrlInputChange = (e) => {
    setUrlInput(e.target.value);
  };

  const handleAddAssignment = () => {
    const loggedinUser = JSON.parse(localStorage.getItem("loggedinuser"));
    patchOne(endpoints.tasks, selectedTask.id, {
      "assignments": [...selectedTask.assignments, {
        "student": loggedinUser.id,
        "url": urlInput,
        "taskid": selectedTask.id,
      }]
    }).then(() => {
      setUrlInput("");
      setModalVisible(false);
      fetchTasks(); 
    });
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
          <Button key="submit" type="primary" onClick={handleAddAssignment} disabled={isAssigned}>Add</Button>,
        ]}
      >
        <div>{isAssigned ? <p>You are already assigned to this task</p> : <Input placeholder="Enter URL" value={urlInput} onChange={handleUrlInputChange} />
        }</div>
      </Modal>
    </>
  );
};

export default StudentContent;
