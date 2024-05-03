import React, { useState } from 'react';
import { Card, Modal, Button } from 'antd';

const { Meta } = Card;

const TeacherContent = ({ tasks }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAssignments, setSelectedAssignments] = useState([]);

  const handleAssignmentClick = (assignments) => {
    setSelectedAssignments(assignments);
    setModalVisible(true);
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {tasks.map(task => (
        <Card
          key={task.id}
          style={{ width: 300, margin: '0 10px 20px 10px' }}
          actions={[
            <a href="#">Detaylar</a>,
            <Button onClick={() => handleAssignmentClick(task.assignments)}>Ödev</Button>
          ]}
        >
          <Meta title={task.title} description={task.description} />
          <p>Öğretmen: {task.teacherId}</p>
          <p>Ödevler: {task.assignments.length}</p>
        </Card>
      ))}

      <Modal
        title="Ödev Detayları"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setModalVisible(false)}>Kapat</Button>
        ]}
      >
        {selectedAssignments.map((assignment, index) => (
         <>
          <div key={index}>
            <p>Student id: {assignment.student}</p>
            <p>Ödev URL: <a href={assignment.url}>{assignment.url}</a></p>
          </div>
          <hr/></>
        ))}
      </Modal>
    </div>
  );
}

export default TeacherContent;
