import React, { useEffect, useState } from 'react'
// import Login from '../Login.jsx'
import Register from '../Register/Index.jsx'
import TeacherContent from '../TeacherContent/index.jsx'
import { getAll } from '../../API/index.js'
import endpoints from '../../API/constants.js'
import Login from '../Login.jsx/index.jsx'

const MyContent = ({ id }) => {
    const [tasks,setTasks] = useState([])
    useEffect(()=>{
        getAll(endpoints.tasks).then((res)=>{
            setTasks(res.data)
        })
    },[tasks])
    
 
         return (
        <>
            {id == 1 ? <Login  /> : id == 2 ? <Register /> : <Login />}
        </>
    )
}

export default MyContent
