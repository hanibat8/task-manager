import React,{useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SignUpPage from './pages/SignUp';
import SignInPage from './pages/SignIn';
import Home from './pages/Home';
import Users from './pages/Users';

import { useSelector } from 'react-redux';
import { RootState } from './app/rootReducer';
import Projects from './pages/Projects';
import ProtectedRoute from './components/ProtectedRoute';
import Task from './components/Task';

const App: React.FC = () => {

  const { user} = useSelector((state:RootState) => state.user);
  const navigate = useNavigate();
  
  useEffect(() => {
    if(user) {
      navigate('/home');
    }
  }, [user]);

  return (
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/projects" element={<Projects />} />
        </Route>
        <Route element={<ProtectedRoute requiredRoles={['admin']}/>}>
          <Route path="/users" element={<Users />} />
        </Route>
        <Route element={<ProtectedRoute requiredRoles={['user']}/>}>
          <Route path={`/project/:id/task`} element={<Task />} />
        </Route>
          
          {/* Add more protected routes here */}
      </Routes>
  );
};

export default App;