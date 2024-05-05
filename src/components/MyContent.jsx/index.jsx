import React from 'react'
import Register from '../Register/Index.jsx'
import TeacherContent from '../TeacherContent/index.jsx'

import Login from '../Login.jsx/index.jsx'
import StudentContent from '../StudentContent/index.jsx'
import Swal from 'sweetalert2'

const MyContent = ({ taskPanel, setTaskPanel, id,setSelectedMenu }) => {


    if (id == 3) {

        setSelectedMenu("1")
        setTaskPanel(false);
        localStorage.clear()
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "You are logged out",
            showConfirmButton: false,
            timer: 1500
        });

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
