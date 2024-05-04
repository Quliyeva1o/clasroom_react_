import React, { useEffect, useState } from 'react'
// import Login from '../Login.jsx'
import Register from '../Register/Index.jsx'
import TeacherContent from '../TeacherContent/index.jsx'
import { getAll } from '../../API/index.js'
import endpoints from '../../API/constants.js'
import Login from '../Login.jsx/index.jsx'
import StudentContent from '../StudentContent/index.jsx'

const MyContent = ({ id }) => {



    let loggedinUserLocal = JSON.parse(localStorage.getItem("loggedinuser"))

  

    return (
        <>
             {id == 1 ?
                loggedinUserLocal && loggedinUserLocal.id !== "" ? 
                    loggedinUserLocal.isTeacher ? <TeacherContent /> : <StudentContent />
                : <Login  />
            : id == 2 ? <Register /> : <Login  />}
        </>
    )
}

export default MyContent
