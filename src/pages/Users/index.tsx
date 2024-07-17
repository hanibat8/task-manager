import LayoutWrapper from '../../components/Layout'
import React, {useEffect, useState} from 'react'
import { Button, Modal, Form, Input, Table, Space, Badge } from 'antd';
import { EditTwoTone} from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux';
import {fetchUsers, createUser, fetchUserById} from '../../features/usersSlice';
import { AppDispatch } from '../../app/store';
import { RootState } from '../../app/rootReducer';
import { validatePassword } from '../../utils/validationHelpers';
import { validateEmail } from '../../utils/validationHelpers';

const Users = () => {

  useEffect(()=>{
    dispatch(fetchUsers())
  },[])

  const {users, status, error}=useSelector((state: RootState)=>state.users);
  const dispatch : AppDispatch  = useDispatch();
  
  const [modalOpen, setModalOpen]=useState(false);
  const [modalMode, setModalMode]=useState<'create' |'edit'>('create');
  const [form]= Form.useForm();

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width:'20%'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width:'30%'
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      width:'10%',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width:'10%',
      render: (_: any, record: any) => (
        <Badge 
        text={record.is_active === 1 ? 'Active' : 'Inactive'} 
        status={record.is_active === 1 ? 'success' : 'error'} 
      />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width:'20%',
      render: (_: any, record: any) => (
        <Space size="middle">
          <EditTwoTone onClick={() => onHandleShowModal('edit',record)}/>
        </Space>
      ),
    },
  ];

  const onHandleShowModal=(mode:'create' | 'edit',record?)=>{
    setModalOpen(true)
    setModalMode(mode)

    if(mode==='edit'){
        dispatch(fetchUserById(record.id)).unwrap()
        .then((response)=>{
         // setUserData(response);
          form.setFieldsValue(response)
        })
        .catch((error)=>{
          setModalOpen(false)
        })
    }
    else{
      form.resetFields()
      //setUserData(null);
    }
  }

  const onHandleOk=()=>{
    form.validateFields()
      .then(values=>{
        setModalOpen(false)
        dispatch(createUser(values)).unwrap().then(() => {
          dispatch(fetchUsers());
        }).catch(error => {
          console.log('Create project failed', error);
        });
      })
      .catch(error=>{
        console.log('error', error)
      })
  }

  const onHandleCancel=()=>setModalOpen(false)

  const handleDelete=()=>{}

  const handleAssignProject=()=>{

  }

  return (
    <LayoutWrapper>
      <div className='flex justify-between mb-4'>
      <h2 className='font-bold'>USERS</h2>
        <Button onClick={()=>onHandleShowModal('create')} type="primary" shape="round" size='large'>
          Create User
        </Button>
      </div>
      {error && <div className='my-4 text-red-700 font-bold'>
        <p><span>Error: </span>{error.message}</p>
      </div>}
      {users &&
        <Table
        columns={columns}
        dataSource={users}
        rowKey='id'
        loading={status==='loading'}
        pagination={{pageSize:10}}
        />
      }
     
      <Modal
        title={modalMode==='create'? 'Create User' : 'Edit User'}
         open={modalOpen} 
         onOk={onHandleOk}
         onCancel={onHandleCancel}
      >
        <Form form={form} layout='vertical'>
            <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: 'Please input the User name!' }]}>
                <Input placeholder="Enter User name" />
            </Form.Item>
            <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: 'Please input the user email!'},
                  { validator: validateEmail }
                ]}>
                <Input placeholder="Enter User email" />
            </Form.Item>
            <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: 'Please input the user password!'},
                  { validator: validatePassword }
                ]}>
                <Input.Password placeholder="Enter User password" />
            </Form.Item>
            <Form.Item
                name="role"
                label="Role"
                rules={[{ required: true, message: 'Please input the user role!' }]}>
                <Input placeholder="Enter User role" />
            </Form.Item>
        </Form>
      </Modal>
    </LayoutWrapper>
  )
}

export default Users