import React , { useEffect } from 'react'
import PageTitle from '../../../components/PageTitle';
import { useNavigate } from 'react-router-dom';
import { Table } from 'antd';
import { useDispatch } from 'react-redux';
import { ShowLoading , HideLoading } from '../../../redux/loaderSlice';
import { message } from 'antd';
import { getAllExams } from '../../../apicalls/exams';
function Exams() {
    const navigate = useNavigate();
    const [exams , setExams] = React.useState([]);
    const dispatch = useDispatch();
    const columns = [{
        title: 'Exam Name',
        dataIndex: 'name',
    },
    {
        title: 'Duration',
        dataIndex: 'duration',
    },
    {
        title: 'Category',
        dataIndex: 'category',
    },
    {
        title: 'Total Marks',
        dataIndex: 'totalMarks',
    },
    {
        title: 'Passing Marks',
        dataIndex: 'passingMarks',
    },
    {
        title: 'Action',
        dataIndex: 'action',
        render: (text, record) => 
            <div className='flex gap-2'>
                <i className="ri-pencil-line"
                onClick={() => navigate(`/admin/exams/edit/${record._id}`)}
                ></i>
                <i className="ri-delete-bin-line"></i>
                </div>
},
];

const getExamsData = async () => {
    try {
        dispatch(ShowLoading());
        const response = await getAllExams();
        dispatch(HideLoading());
        if( response.success ) {
            setExams(response.data);       
    }else{
        message.error(response.messages);
    }
 } catch (error) {
        dispatch(HideLoading());
        message.error(error.messages);   
    }
}

useEffect(() => {
    getExamsData();
}, []);
    return (
        <div>
            <div className='flex justify-between mt-2'>
                <PageTitle title="Exams" />
                <button className='primary-outlined-btn flex item-center'
                onClick={() =>navigate("/admin/exams/add")}
                >
                    <i className='ri-add-line'></i>
                    Add Exams
                </button>
            </div>
            <div className='divider'></div>

            <Table columns={columns} dataSource={exams}/>
        </div>
    );
}

export default Exams;