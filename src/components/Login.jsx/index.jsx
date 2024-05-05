import React, { useEffect, useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { getAll } from '../../API';
import endpoints from '../../API/constants';

const Login = ({ setTaskPanel }) => {
    const [tasks, setTasks] = useState([]);
    const [students, setStudents] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [loggedinUser, setLoggedinUser] = useState(null); // Define loggedinUser state

    useEffect(() => {
        getAll(endpoints.tasks).then((res) => {
            setTasks(res.data);
        });
        getAll(endpoints.students).then((res) => {
            setStudents(res.data);
        });
        getAll(endpoints.teachers).then((res) => {
            setTeachers(res.data);
        });
    }, []);

    const onFinish = (values) => {
        const foundStudent = students.find((student) => student.username === values.username);
        if (foundStudent) {
            if (foundStudent.password === values.password) {
                setLoggedinUser({ id: foundStudent.id, isTeacher: false });
                alert("Student logged in");
            } else {
                alert("Incorrect password for student");
            }
        } else {
            const foundTeacher = teachers.find((teacher) => teacher.username === values.username);
            if (foundTeacher) {
                if (foundTeacher.password === values.password) {
                    setLoggedinUser({ id: foundTeacher.id, isTeacher: true });
                    setTaskPanel({ id: foundTeacher.id, isTeacher: true });
                    localStorage.setItem("loggedinuser", JSON.stringify({ id: foundTeacher.id, isTeacher: true }));
                    alert("Teacher logged in");
                } else {
                    alert("Incorrect password for teacher");
                }
            } else {
                localStorage.setItem("loggedinuser", JSON.stringify({ id: "", isTeacher: false }));
                alert("Username not found");
            }
        }
    };

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
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Login;
