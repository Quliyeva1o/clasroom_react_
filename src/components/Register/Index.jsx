import React, { useState } from 'react';
import { Tabs } from 'antd';
import StudentRegister from '../StudentRegister/index.jsx';

import TeacherRegister from '../TeacherRegister/index.jsx';
const Register = () => {
    const [tabId, setTabId] = useState("student")
    const items = [
        {
            key: 'teacher',
            label: 'Login as User',
            children: <StudentRegister/>,
        },
        {
            key: 'student',
            label: 'Login as Teacher',
            children: <TeacherRegister/>,
        }
    ];
    const onChange = (key) => {
        console.log(key);
        setTabId(key)
        
    };
    const [alignValue, setAlignValue] = React.useState('center');
    return (
        <>

            <Tabs
                defaultActiveKey="student"
                items={items}
                onChange={onChange}
                indicator={{
                    size: (origin) => origin - 20,
                    align: alignValue,
                }}
            />
        </>
    );
    console.log(key);
}

export default Register
