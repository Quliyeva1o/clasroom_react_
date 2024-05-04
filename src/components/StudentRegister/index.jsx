import React, { useState } from 'react';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import {
    Button,
    Form,
    Input,
} from 'antd';
import { post } from '../../API';
import endpoints from '../../API/constants';

const StudentRegister = () => {
    const [fileList, setFileList] = useState([]);
    const [form] = Form.useForm();

    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList.slice(-1));
    };

    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };

    const tailFormItemLayout = {
        wrapperCol: {
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 8 },
        },
    };

    const onFinish = (values) => {
        const uploadedFile = fileList[0];
        const fileSrc = uploadedFile.url ? uploadedFile.url : URL.createObjectURL(uploadedFile.originFileObj);
        const updatedValues = {
            ...values,
            profileImage: fileSrc
        };

        const reader = new FileReader();
        reader.readAsDataURL(uploadedFile.originFileObj);
        reader.onload = () => {
            const base64Image = reader.result;
            updatedValues.profileImage = base64Image;
            post(endpoints.students, updatedValues).then((res) => {
                console.log(res.data);
            }).catch((err) => {
                console.log(err);
            });
        };

        console.log('posted student', updatedValues);
    };

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            style={{
                maxWidth: 600,
            }}
            scrollToFirstError
            onFinish={onFinish}>
            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    { type: 'email', message: 'The input is not valid E-mail!' },
                    { required: true, message: 'Please input your E-mail!' },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="fullName"
                label="fullName"
                rules={[
                    { required: true, message: 'Please input your full name!', whitespace: true },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                    { required: true, message: 'Please input your password!' },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="username"
                label="username"
                rules={[
                    { required: true, message: 'Please input your nickname!', whitespace: true },
                ]}
            >
                <Input />
            </Form.Item>

            <ImgCrop rotationSlider>
                <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}
                    onPreview={onPreview}
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

export default StudentRegister;
