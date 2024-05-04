import React, { useEffect, useState } from 'react';
import { Card, Modal, Button } from 'antd';
import AddTaskModal from '../AddTaskModal';
import { getAll } from '../../API';
import endpoints from '../../API/constants';

const { Meta } = Card;

const TeacherContent = () => {
  const [tasks, setTasks] = useState([]);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAssignments, setSelectedAssignments] = useState([]);

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

  const handleAssignmentClick = (assignments) => {
    setSelectedAssignments(assignments);
    setModalVisible(true);
  };

  const handleTaskAdded = () => {
    fetchTasks(); // Yeni görev eklendiğinde görevleri yeniden al
  };

  return (
    <>
      <AddTaskModal onTaskAdded={handleTaskAdded} /> {/* AddTaskModal bileşenine onTaskAdded prop'unu ekle */}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {tasks.map((task) => {
          const teacher = teachers.find((teacher) => teacher.id === task.teacherId);
          return (
            <Card
              key={task.id}
              style={{ width: 300, margin: '0 10px 20px 10px' }}
              actions={[
                <a href="#">edit task</a>,
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
    </>
  );
};

export default TeacherContent;
