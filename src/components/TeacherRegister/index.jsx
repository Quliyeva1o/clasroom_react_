import React, { useState } from 'react';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import {
    Button,
    Form,
    Input,
    Select,
} from 'antd';
import endpoints from '../../API/constants';
import { post } from '../../API';
import { Teacher } from '../../classes/classes';
const { Option } = Select;

const TeacherRegister = () => {
    const [fileList, setFileList] = useState([]);

    const [form] = Form.useForm();

    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList.slice(-1));
    };





    const formItemLayout = {
        labelCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 8,
            },
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 16,
            },
        },
    };

    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };

    const onFinish = (values) => {
        const uploadedFile = fileList[0];

        const reader = new FileReader();
        reader.readAsDataURL(uploadedFile.originFileObj);
        reader.onload = () => {
            const base64Image = reader.result;
            const tc = new Teacher(values.fullnxame,values.username,values.email,values.password,values.major,base64Image)
            post(endpoints.teachers, tc).then((res) => {
                console.log(res.data);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "You are registered",
                    showConfirmButton: false,
                    timer: 1500
                });
               
                form.resetFields();
                setFileList([]); 
            }).catch((err) => {
                console.log(err);
            });
        };

    };

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            style={{
                maxWidth: 600,
            }}
            scrollToFirstError>
            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="fullname"
                label="fullname"
                rules={[
                    {
                        required: true,
                        message: 'Please input your full name!',
                        whitespace: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="username"
                label="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your nickname!',
                        whitespace: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="major"
                label="major"
                rules={[
                    {
                        required: true,
                        message: 'Please select major!',
                    },
                ]}
            >
                <Select placeholder="select your major">
                    <Option value="front">Front-End</Option>
                    <Option value="back">Back-End</Option>
                    <Option value="help">Help Desk</Option>
                </Select>
            </Form.Item>
            <ImgCrop rotationSlider>
                <Upload

                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}

                >
                    {fileList.length < 5 && '+ Upload'}
                </Upload>
            </ImgCrop>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
            </Form.Item>
        </Form>
    );
};
export default TeacherRegister;
