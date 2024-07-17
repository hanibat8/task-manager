import React, {useState} from 'react';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import { logout } from '../features/userSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { useNavigate } from 'react-router-dom';

import { Button } from 'antd';

import {HomeOutlined, ProjectOutlined, UserSwitchOutlined} from '@ant-design/icons'

const { Header, Sider, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  // color: '#fff',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#fff',
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 128px)',
  // color: '#fff',
  // backgroundColor: '#0958d9',
  padding: '24px',
};

const siderStyle: React.CSSProperties = {
  // color: '#fff',
  backgroundColor: '#fff',
};

const linkStyle: React.CSSProperties = {
  display: 'block',
  padding: '10px 0', 
  color: '#000',
  textDecoration: 'none', 
  marginLeft:'1.5rem',
  fontWeight:'bold'
};

interface Props {
  children?: React.ReactNode;
}

const LayoutWrapper: React.FC<Props> = ({ children }) => {
  const dispatch : AppDispatch  = useDispatch();
  const navigate = useNavigate();

  const [userRole,setUserRole]=useState(()=>localStorage.getItem('role'))

  const onHandleLogout=async()=>{
    try{
      await dispatch(logout());
      navigate('/');
    }
    catch(error){
    console.log(error)      
    }
  }

  return(
    <Layout style={{ minHeight: '100vh' }}>
    <Header style={headerStyle}>
      <div className='flex justify-between my-4'>
        <h2 className='font-bold text-lg'>{userRole==='admin'? 'Admin Panel' : 'User Panel'}</h2>
        <Button onClick={onHandleLogout} type="primary" shape="round" size='large'>
          Logout
        </Button>
      </div>
    </Header>
    <Layout>
      <Sider width="20%" style={siderStyle}>
        <Link style={linkStyle} to='/home'><HomeOutlined/><span className='ml-2'>Dashboard</span></Link>
        <Link style={linkStyle} to='/projects'><ProjectOutlined /><span className='ml-2'>Projects</span></Link>
        {userRole==='admin' && <Link style={linkStyle} to='/users'><UserSwitchOutlined /><span className='ml-2'>Users</span></Link>}
      </Sider>
      <Content style={contentStyle}>
        {children}
      </Content>
    </Layout>
  </Layout>
  )
}

export default LayoutWrapper;
