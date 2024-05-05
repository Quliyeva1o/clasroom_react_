import React from 'react'
import Register from '../Register/Index.jsx'
import TeacherContent from '../TeacherContent/index.jsx'

import Login from '../Login.jsx/index.jsx'
import StudentContent from '../StudentContent/index.jsx'

const MyContent = ({ taskPanel, setTaskPanel, id,setSelectedMenu }) => {


    if (id == 3) {
        setSelectedMenu("1")
        setTaskPanel(false);
        localStorage.clear()

    }

    return (
        <>
            {id == 1 ?
                taskPanel && taskPanel.id !== "" ?
                    taskPanel.isTeacher ? <TeacherContent /> : <StudentContent />
                    : <Login setTaskPanel={setTaskPanel} />
                : id == 2 ? <Register /> : <Login />}
        </>
    )
}

export default MyContent
