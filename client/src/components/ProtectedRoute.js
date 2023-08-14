import React, { useEffect, useState } from 'react';
import { getUserInfo } from '../apicalls/users';
import { message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { SetUser } from '../redux/usersSlice';
import {useNavigate}  from "react-router-dom"; 
import { ShowLoading , HideLoading } from '../redux/loaderSlice';
function ProtectedRoute(props) {
    const { user } = useSelector((state) => state.users);
    const [menu, setMenu] = useState([]);
    const [collapsed, setCollapsed] = useState(false);  
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const userMenu  = [
        {
            title : "Home",
            paths : ["/"],
            icon :<i className="ri-home-line"></i> ,
            onclick : () => navigate("/")
        },
        {
            title : "Reports",
            paths : ["/reports"],
            icon :<i className="ri-bar-chart-line"></i>,
            onclick : () => navigate("/reports")
        },
        {
            title : "Profile",
            paths : ["/profile"],
            icon :<i className="ri-user-line"></i>,
            onclick : () => navigate("/profile")
        },
        {
            title : "Logout",
            paths : ["/logout"],
            icon :<i className="ri-logout-box-line"></i>,
            onclick : () => {
                localStorage.removeItem("token");
                navigate("/login")
            },
        },
    ];

    const adminMenu = [
        {
            title : "Home",
            paths : ["/"],
            icon :<i className="ri-home-line"></i> ,
            onclick : () => navigate("/")
        },
        {
            title : "Exams",
            paths : ["/admin/exams" , "/admin/exams/add"],
            icon :<i className="ri-file-list-line"></i>,
            onclick : () => navigate("/admin/exams")
        },
        {
            title : "Reports",
            paths : ["/reports"],
            icon :<i className="ri-bar-chart-line"></i>,
            onclick : () => navigate("/admin/reports"),
        },
        {
            title : "Profile",
            paths : ["/profile"],
            icon :<i className="ri-user-line"></i>,
            onclick : () => navigate("/profile")
        },
        {
            title : "Logout",
            paths : ["/logout"],
            icon :<i className="ri-logout-box-line"></i>,
            onclick : () => {
                localStorage.removeItem("token");
                navigate("/login")
            },
        }
    ];
    const getUserData = async () => {
        try {
            dispatch(ShowLoading())
            const response = await getUserInfo()
            dispatch(HideLoading())
            if (response.success) {
                // message.success(response.message);
                dispatch(SetUser(response.data));
                if (response.data.isAdmin) {
                    setMenu(adminMenu);
                }else {
                    setMenu(userMenu);
                }
            } else {
                message.error(response.message)
            }
        } catch (error) {
            dispatch(HideLoading())
            message.error(error.message)
        }
    }
    useEffect(() => {
        getUserData()
    }, [])

    const activeRoute = window.location.pathname;
    const getIsActiveOrNot = (paths) => {
        if (paths.includes(activeRoute)) {
            return true;
        }else{
        return false;
        }
    }

    return (
        <div className="layout">
            <div className="flex gap-2 w-full h-full h-100">
                <div className="sidebar">
                <div className='menu'>
                    {menu.map((item , index) => {
                       return <div className={
                        `menu-item ${
                           getIsActiveOrNot(item.paths)  && 'active-menu-item'
                        }`
                       }
                       key={index}
                       onClick={item.onclick}
                       >
                            {item.icon}
                            {!collapsed && <span>{item.title}</span>}
                        </div>
                    })}
                </div>
                </div>
                <div className="body">
                    <div className="header flex justify-between">
                    {!collapsed && <i className="ri-close-line"
                    onClick={() => setCollapsed(true)}></i>}
                    {collapsed && <i className="ri-menu-line"
                    onClick={() => setCollapsed(false)}></i>}
                    <h1 className="text-2xl text-white"> SHEY QUIZ</h1>
                    <div className='flex gap-1 items-center'>
                    <i class="ri-user-line"></i>
                    <h1 className='text-md text-white underline'>{user?.name}</h1>
                    </div>
                    </div>
                    <div className="content">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProtectedRoute;
