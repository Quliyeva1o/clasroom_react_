import React, { useState } from 'react';
import { Card, Modal, Button } from 'antd';
import AddTaskModal from '../AddTaskModal';

const { Meta } = Card;

const TeacherContent = ({ tasks, teachers, students }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAssignments, setSelectedAssignments] = useState([]);

  const handleAssignmentClick = (assignments) => {
    setSelectedAssignments(assignments);
    setModalVisible(true);
  };

  return (
    <>
    <AddTaskModal/>
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {tasks.map(task => {
        const teacher = teachers.find(teacher => teacher.id === task.teacherId);
        return (
          <Card
            key={task.id}
            style={{ width: 300, margin: '0 10px 20px 10px' }}
            actions={[
              <a href="#">edit task</a>,
              <Button onClick={() => handleAssignmentClick(task.assignments)}>Show responses</Button>
            ]}
          >
            <Meta title={task.title} description={task.description} />
            <p>Teacher: {teacher ? teacher.fullName : 'no teacher'}</p>
            <p>Show responses: {task.assignments.length}</p>
          </Card>
        );
      })}

      <Modal
        title="Task Responses"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setModalVisible(false)}>Close</Button>
        ]}
      >

        {selectedAssignments.map((assignment, index) => {
          const myStudent = students.find(stud => stud.id === assignment.student)
          return (

            <div key={index}>
              <p>Student id: {myStudent.fullName}</p>
              <p>Work URL: <a href={assignment.url}>{assignment.url}</a></p>
            </div>
          )
        })}
      </Modal>
    </div></>
  );
}

export default TeacherContent;
