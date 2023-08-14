import { Form, message } from 'antd'
import React from 'react'
import  {Link} from 'react-router-dom'
import { registerUser } from '../../../apicalls/users';
import { useDispatch } from 'react-redux';
import { ShowLoading , HideLoading } from '../../../redux/loaderSlice';
function Register(){
    const dispatch = useDispatch();
    const onFinish= async (values)=>{
        try {
            dispatch(ShowLoading());
            const response = await registerUser(values);
            dispatch(HideLoading());
            if(response.success){
                message.success(response.message);
            }
            else{
                message.error(response.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    }
    return(
        <div className="flex justify-center items-center h-screen w-screen">
            <div className="card w-400 p-3">
                <div className="flex flex-col"></div>
               
                <h1 className="text-2xl">Register
                <div className="divider"></div>
                <Form layout="vertical" className="mt-2"  onFinish={onFinish}>
                <Form.Item name="name" label="Name">  
                        <input type="text" />
                    </Form.Item>
                    <Form.Item name="email" label="Email">  
                        <input type="text" />
                    </Form.Item>
                    <Form.Item name="password" label="Password">  
                        <input type="password" placeholder="Password"/>
                    </Form.Item>
                    <div className="flex flex-col gap-2">
                    <button type="submit" className="primary-contained-btn mt-2 w-100">Register</button>
                    <Link to="/login" className="a">Already a Member? Login..</Link>
                    </div>
                </Form>
                </h1>
            </div>
        </div>
    )
}
export default Register