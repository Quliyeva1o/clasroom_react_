import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';



const Login = ({students , teachers}) => {
   
    const [loggedinUser, setLoggedinUser] = useState({ id: "", isTeacher: false })
    localStorage.setItem("loggedinuser", JSON.stringify({ id: loggedinUser.id, isTeacher: loggedinUser.isTeacher }));

 
    const onFinish = (values) => {

        const foundStudent = students.find(student => student.username === values.username);
        if (foundStudent) {

            if (foundStudent.password == values.password) {
                setLoggedinUser({ id: foundStudent.id, isTeacher: false });
                alert("studentlogedin")
            } else {
                alert("bele student yoxdur")
            }

        } else {
            const foundTeacher = teachers.find(teacher => teacher.username === values.username);
            if (foundTeacher) {

                if (foundTeacher.password == values.password) {
                    setLoggedinUser({ id: foundTeacher.id, isTeacher: true });
                    alert("teacherloggedin")
                } else {
                    alert("bele teacher yoxdur")
                }

            } else {
                localStorage.setItem("loggedinuser", JSON.stringify({ id:"", isTeacher: false }));

                alert("istifadeci adi ve ya sifre yalnisdir")
            }
        };

        console.log(loggedinUser);
        
        localStorage.setItem("loggedinuser", JSON.stringify({ id: loggedinUser.id, isTeacher: loggedinUser.isTeacher }));
    }

    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>


            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button" >
                    Log in
                </Button>

            </Form.Item>
        </Form>
    )
}

export default Login
