import React from 'react';
import SignInForm from './SignInForm';

const SignInPage: React.FC = () => {
  return (
    <div className='flex flex-col h-screen justify-center items-center '>
      <SignInForm />
      <p className='mt-8'>Admin Credentials:</p>
      <p>codionslab@gmail.com</p>
      <p>12345678</p>
    </div>
  );
};

export default SignInPage;