import React, { useEffect, useState } from 'react'
// import Login from '../Login.jsx'
import Register from '../Register/Index.jsx'
import TeacherContent from '../TeacherContent/index.jsx'
import { getAll } from '../../API/index.js'
import endpoints from '../../API/constants.js'
import Login from '../Login.jsx/index.jsx'
import StudentContent from '../StudentContent/index.jsx'

const MyContent = ({ id }) => {
    const [tasks, setTasks] = useState([])
    const [students, setStudents] = useState([])
    const [teachers, setTeachers] = useState([])
    useEffect(() => {
        getAll(endpoints.tasks).then((res) => {
            setTasks(res.data)
        })
        getAll(endpoints.students).then((res) => {
            setStudents(res.data);
        });
        getAll(endpoints.teachers).then((res) => {
            setTeachers(res.data);
        });
    }, [tasks])



    let loggedinUserLocal = JSON.parse(localStorage.getItem("loggedinuser"))

  

    return (
        <>
             {id == 1 ?
                loggedinUserLocal && loggedinUserLocal.id !== "" ? 
                    loggedinUserLocal.isTeacher ? <TeacherContent tasks={tasks} teachers={teachers} students={students}/> : <StudentContent />
                : <Login students={students} teachers={teachers} />
            : id == 2 ? <Register /> : <Login students={students} teachers={teachers}  />}
        </>
    )
}

export default MyContent
