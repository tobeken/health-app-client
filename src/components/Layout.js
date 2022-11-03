import { Avatar, Badge } from 'antd';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "../layout.css";

const Layout = ({children}) => {
    const [collapsed,setCollapsed] =useState(false); 
    const {user} = useSelector((state) => state.user);
    const navigate = useNavigate();
    const location = useLocation();

    const userMenu = [
        {
            name:"Home",
            path:'/',
            icon:'ri-home-line'
        },
        {
            name:'Appointments',
            path:'/appointments',
            icon:'ri-file-list-line'
        },
        {
            name:'Apply Doctor',
            path:'/apply-doctor',
            icon:'ri-hospital-line'
        },
        {
            name:'Profile',
            path:'/profile',
            icon:'ri-user-3-line',
        },
    ];

    const doctorMenu = [
        {
            name:"Home",
            path:'/',
            icon:'ri-home-line'
        },
        {
            name:'Appointments',
            path:'/doctor/appointments',
            icon:'ri-file-list-line'
        },

        {
            name:'Profile',
            path:`/profile/${user?.id}`,
            icon:'ri-user-3-line',
        },
    ];

    const adminMenu = [
        {
            name:"Home",
            path:'/',
            icon:'ri-home-line'
        },
        {
            name: "Users",
            path:"/admin/userslist",
            icon:"ri-user-line"
        },
        {
            name:"Doctor",
            path:"/admin/doctorslist",
            icon:"ri-doctor-line"
        },

        {
            name:'Profile',
            path:'/profile',
            icon:'ri-user-3-line',
        },

    ];



    const menuToBeRendered = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu;
    const role = user?.isAdmin ? "Admin" :user?.isDoctor ? "Doctor" :"User";
  return (
    <div className='main p-2'>
        <div className='d-flex layout'>
            <div className='sidebar'>
                <div className='sidebar-header'>
                <h1 className='logo'>SH</h1>
                <h1 className='normal-text'>{role}</h1>
                </div>
 
            <div className='menu'>
                {menuToBeRendered.map((menu)=>{
                    const isActive = location.pathname === menu.path
                    return (
                    <div className={`d-flex menu-item ${
                        isActive && 'active-menu-item'
                        }`}
                        >
                        <i className={menu.icon}></i>
                        {!collapsed &&  <Link to={menu.path}>{menu.name}</Link> }
                       
                    </div>
                    )
                })}
                    <div className={`d-flex menu-item`} onClick={()=> {
                        localStorage.clear()
                        navigate('/login')
                    }}>
                        <i className='ri-logout-circle-line'></i>
                        {!collapsed &&  <Link to='/login'>Logout</Link> }
                       
                    </div>
            </div>
            </div>
            <div className='content'>
                <div className='header'>
                    {collapsed ? (
                    <i 
                    className='ri-menu-2-fill header-action-icon' 
                    onClick={()=>setCollapsed(false)}
                    ></i>
                    ):(
                    <i 
                    className='ri-close-fill header-action-icon' 
                    onClick={()=>setCollapsed(true)}
                    >                        
                    </i>
                    )}
                    <div className='d-flex align-items-center px-4'>
                    <Badge count={user?.unseenNotifications.length} onClick={()=>navigate('/notifications')}>
                    <i class="ri-notification-line layout-action-icon px-3"></i>
                       
                    </Badge>
                   
                    <Link className='anchor' to="/profile">{user?.name}</Link>
                    </div>
                    
                </div>
                <div className='body'>
                    {children}

                </div>

            </div>

        </div>
    </div>
  )
}

export default Layout