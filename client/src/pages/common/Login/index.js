import { Form, message } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { loginUser } from '../../../apicalls/users';
import { useDispatch } from 'react-redux';
import { ShowLoading , HideLoading } from '../../../redux/loaderSlice';
function Login() {
    const dispatch = useDispatch();
    const onFinish = async (values) => {
        try {
            dispatch(ShowLoading())
            const response = await loginUser(values);
            dispatch(HideLoading())
            if (response.success) {
                message.success(response.message);
                localStorage.setItem("token", response.data);
                window.location.href = "/";
            } else {
                message.error(response.message);
            }
        } catch (error) {
            dispatch(HideLoading())
            message.error(error.message);
        }
    };
    return (
        <div className="flex justify-center items-center h-screen w-screen">
            <div className="card w-400 p-3">
                <div className="flex flex-col"></div>
                <h1 className="text-2xl">Login</h1>
                <div className="divider"></div>
                <Form layout="vertical" className="mt-2" onFinish={onFinish} >
                    <Form.Item name='email' label='Email'>
                        <input type="text" placeholder="Username" />
                    </Form.Item>
                    <Form.Item name='password' label='Password'>
                        <input type="password" placeholder="Password" />
                    </Form.Item>
                    <div className="flex flex-col gap-2">
                        <button type="submit" className="primary-contained-btn mt-2 w-100">Login</button>
                        <Link className="a" to="/register">Register</Link>
                    </div>
                </Form>
            </div>
        </div>
    )
}
export default Login