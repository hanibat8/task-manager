import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import {login} from '../../features/userSlice';
import { AppDispatch } from '../../app/store';
import { Link } from 'react-router-dom';

import { validateEmail, validatePassword } from '../../utils/validationHelpers';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';

type FieldType = {
  password: string;
  email:string;
};

const SignInForm: React.FC = () => {
  const dispatch : AppDispatch  = useDispatch();

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => dispatch(login(values))
  
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const {error}=useSelector((state:RootState)=>state.user)

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className='md:w-1/2 mx-auto mt-8 p-6  shadow-md rounded-lg'
    >
      <h2 className='text-center font-bold mb-4 text-lg	'>SignIn</h2>

      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' },
          { validator: validateEmail }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' },
          { validator: validatePassword }
        ]}
      >
        <Input.Password />
      </Form.Item>

      <div className='mt-8'>
        <Button type="primary" htmlType="submit" className="w-full">
          Submit
        </Button>
      </div>

      <Link to='/signUp'><p className='text-center mt-4'>Don't have an account? Sign up</p></Link>

      {error && <div className='my-4 text-red-700 text-center font-bold'>
        <p><span>Error: </span>{error.message}</p>
      </div>}
    </Form>)
};

export default SignInForm;