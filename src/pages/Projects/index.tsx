import LayoutWrapper from '../../components/Layout'
import React, {useEffect, useState} from 'react'
import { Button, Modal, Form, Input, Table, Space, Select, Badge } from 'antd';
import { EditTwoTone, UserAddOutlined, ProfileOutlined } from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux';
import {assignProject, createProject, fetchProjectById, fetchProjects, updateProject} from '../../features/projectsSlice';
import { fetchUsers } from '../../features/usersSlice';
import { AppDispatch } from '../../app/store';
import { RootState } from '../../app/rootReducer';

import { useNavigate } from 'react-router-dom';

const Projects = () => {

  useEffect(()=>{
    dispatch(fetchProjects(userRole))
    if(users.length===0 && userRole==='admin')
      dispatch(fetchUsers())
  },[])

  const {projects, status: projectStatus, error: projectError }=useSelector((state: RootState)=>state.projects);
  const dispatch : AppDispatch  = useDispatch();
  
  const [modalOpen, setModalOpen]=useState(false);
  const [modalMode, setModalMode]=useState<'create' |'edit'>('create');
  const [form]= Form.useForm();

  const [projectData,setProjectData]=useState(null);

  const {users, status: usersStatus, error: usesrError}=useSelector((state: RootState)=>state.users);
  const [userAssignModalOpen, setUserAssignModalOpen]=useState(false);

  const [selectedProject,setSelectedProject]=useState(null);
  const [user_ids,setSelectedUser]=useState<string[]>([]);

  const [userRole,setUserRole]=useState(()=>localStorage.getItem('role'));

  const navigate = useNavigate();

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width:'20%'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width:'30%'
    },
    ...(userRole === 'admin' ? [{
      title: 'Users',
      dataIndex: 'users',
      key: 'users',
      width: '20%',
      render: (users: any[]) => users?.map(user => user.name).join(', '),
      }] : []),  
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
          {userRole==='user' &&<ProfileOutlined onClick={() => onHandleTaskManager(record)}/>}
          {userRole==='admin' && <EditTwoTone onClick={() => onHandleShowModal('edit',record)}/>}
          {userRole==='admin' && <UserAddOutlined onClick={() => onShowAssignProject(record)}/>}

        </Space>
      ),
    },
  ];

  const onHandleTaskManager=(record)=>{
    navigate(`/project/${record.id}/task`)
  }

  const onHandleShowModal=(mode:'create' | 'edit',record?)=>{
    setModalOpen(true)
    setModalMode(mode)

    if(mode==='edit'){
      let projectById=record?.id
      let role=userRole
        dispatch(fetchProjectById({projectById,role})).unwrap()
        .then((response)=>{
          setProjectData(response);
          form.setFieldsValue(response)
        })
        .catch((error)=>{
          setModalOpen(false)
        })
    }
    else{
      form.resetFields()
      setProjectData(null);
    }
  }

  const onShowAssignProject=(record)=>{
    setSelectedProject(record.id)
    setUserAssignModalOpen(true)
  }

  const onHandleOk=()=>{
    form.validateFields()
      .then(values=>{
        setModalOpen(false)
        dispatch(createProject(values)).unwrap().then(() => {
          dispatch(fetchProjects(userRole));
          setModalOpen(false)
        }).catch(error => {
          console.log('Create project failed', error);
        });
      })
      .catch(error=>{
        console.log('error', error)
      })
  }

  const onHandleCancel=()=>setModalOpen(false)

  const onHandleAssignProject=()=>{
    dispatch(assignProject({selectedProject,user_ids})).unwrap().then(()=>{
      dispatch(fetchProjects(userRole));
      setUserAssignModalOpen(false)
    }).catch(error => {
      console.log('Create project failed', error);
    });
    setUserAssignModalOpen(false)
  }

  return (
    <LayoutWrapper>
      {userRole==='admin' && <div className='flex justify-between mb-4'>
        <h2 className='font-bold'>PROJECTS</h2>
        <Button onClick={()=>onHandleShowModal('create')} type="primary" shape="round" size='large'>
          Create Project
        </Button>
      </div>}
      {projectError && <div className='my-4 text-red-700 font-bold'>
        <p><span>Error: </span>{projectError.message}</p>
      </div>}
      {projects &&
        <Table
        columns={columns}
        dataSource={projects}
        rowKey='id'
        loading={projectStatus==='loading'}
        pagination={{pageSize:10}}
        />
      }
     
      <Modal
        title={modalMode==='create'? 'Create Project' : 'Edit Project'}
         open={modalOpen} 
         onOk={onHandleOk}
         onCancel={onHandleCancel}
      >
        <Form form={form} layout='vertical'>
        <Form.Item
            name="name"
            label="Project Name"
            rules={[{ required: true, message: 'Please input the project name!' }]}
          >
            <Input placeholder="Enter project name" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Project Description"
            rules={[{ required: true, message: 'Please input the project description!' }]}
          >
            <Input.TextArea placeholder="Enter project description" />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Assign Users to Project"
        open={userAssignModalOpen}
        onCancel={() => setUserAssignModalOpen(false)}
        footer={[
          <>
           <Button key="ok" onClick={onHandleAssignProject}>
              Ok
            </Button>
            <Button key="cancel" onClick={() => setUserAssignModalOpen(false)}>
              Cancel
            </Button>
          </>          
        ]}
      >
        <Select
          placeholder="Select a user"
          mode="multiple"
          style={{ width: '100%' }}
          onChange={setSelectedUser}
        >
          {users?.map(user => (
            <Select.Option key={user.id} value={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </Modal>
    </LayoutWrapper>
  )
}

export default Projects