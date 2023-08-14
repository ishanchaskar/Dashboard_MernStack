import React, { useEffect } from 'react'
import PageTitle from '../../../components/PageTitle'
import { Col, Form, Row, Select, message } from 'antd'
import { addExam, editExamById, getExamById } from '../../../apicalls/exams'
import { useNavigate , useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import {Tabs} from 'antd';
import { HideLoading , ShowLoading } from '../../../redux/loaderSlice';

const {TabPane} = Tabs;
function AddEditExam() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [examData , setExamData] = React.useState(null);
    const params = new useParams();
    const onFinish =
        async (values) => {
            try {
                dispatch(ShowLoading())
                let response;

                if(params.id){
                    response = await editExamById({
                        ...values,
                        examId : params.id
                    });
                }
                else{
                    response = await addExam(values);
                }
                
                if (response.success) {
                    message.success(response.message);
                    navigate('/admin/exams');
                } else {
                    message.error(response.message);
                }
                dispatch(HideLoading())
            } catch (error) {
                dispatch(HideLoading())
                message.error(error.message);
            }
           
        };

const getExamData = async () =>{
    try {
        dispatch(ShowLoading())
        let response;
        response = await getExamById({
          examId : params.id  
        });
        if (response.success) {
            setExamData(response.data);
        } else {
            message.error(response.message);
        }
    } catch (error) {
        dispatch(HideLoading())
        message.error(error.message);
    }
}

useEffect(() =>{
    if(params.id){
        getExamData();
    }
},[])

    return (
        <div>

            <PageTitle title=
            {params.id ? "Edit exam" : "add exam"} />
            <div className='divider'></div>
            {(examData || !params.id) && 
             <Form layout='vertical' onFinish={onFinish}
             initialValues={examData}>
                 <Tabs defaultActiveKey='1'>
                     <Tabs.TabPane tab="Exam Details" key="1">
                     <Row gutter={[10, 10]}>
                     <Col span={8}>
                         <Form.Item label="Exam Name" name='name'>
                             <input type="text" />
                         </Form.Item>
                     </Col>
                     <Col span={8}>
                         <Form.Item label="Exam Duration" name='duration'>
                             <input type="number" />
                         </Form.Item>
                     </Col>
                     <Col span={8}>
                         <Form.Item label="Category" name='category'>
                             <select name='' id=''>
                                 <option value=''>Select Category</option>
                                 <option value='javascript'>Javascript</option>
                                 <option value='java'>Java</option>
                                 <option value='MongoDb'>MongoDb</option>
                                 <option value='React'>React</option>
                             </select>
                         </Form.Item>
                     </Col>
                     <Col span={8}>
                         <Form.Item label="Total Marks" name='totalMarks'>
                             <input type="number" />
                         </Form.Item>
                     </Col>
                     <Col span={8}>
                         <Form.Item label="Passing Marks" name='passingMarks'>
                             <input type="number" />
                         </Form.Item>
                     </Col>
                 </Row>
                         </Tabs.TabPane>
                         {params.id &&           <Tabs.TabPane tab=" Exam Questions" key="2">
                             <h1>Questions</h1>
                         </Tabs.TabPane>}
                 </Tabs>
                 
                 <div className='flex justify-end'>
                     <button className='primary-contained-btn' type='submit'>Save</button>
                 </div>
             </Form>}
        </div>
    );
}

export default AddEditExam