import React, { useEffect, useState } from 'react'
// import Login from '../Login.jsx'
import Register from '../Register/Index.jsx'
import TeacherContent from '../TeacherContent/index.jsx'
import { getAll } from '../../API/index.js'
import endpoints from '../../API/constants.js'
import Login from '../Login.jsx/index.jsx'
import StudentContent from '../StudentContent/index.jsx'

const MyContent = ({ taskPanel, setTaskPanel, id }) => {


    if (id == 3) {
        setTaskPanel(false);
        localStorage.setItem("loggedinuser", JSON.stringify({ id: "", isTeacher: false }));
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
