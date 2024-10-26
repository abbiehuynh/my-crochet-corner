import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './components/auth/AuthProvider';
import { ProjectProvider } from './components/home/ProjectProvider';
import ProtectedRoute from './components/auth/ProtectedRoute';
import NavBar from './components/common/NavBar';
import Home from './components/home/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Logout from './components/auth/Logout';
import Favorites from './components/favorites-page/Favorites';
import Profile from './components/profile-page/Profile';
import Project from './components/home/Project';
import AIChatBot from './components/ai/AIChatBot';
import AddProjectNameForm from './components/home/AddProjectModal';
import './App.css'

const App = () => {

  return (
    <AuthProvider>
      <ProjectProvider>
        <Router>
          {/* allows access to navbar throughout entire app */}
          <NavBar />
          <Routes>

            {/* routes to auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<ProtectedRoute element={<Logout />} />} />

            {/* routes to pages */}
            <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
            <Route path="/favorites" element={<ProtectedRoute element={<Favorites />} />} />
            {/* should be updated to profile/{$userId} */}
            <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} /> 

            {/* routes to features */}
            {/* should be updated to /user/${userId}/project/${projectId} */}
            <Route path="/user/project" element={<ProtectedRoute element={<Project />} />} />
            <Route path="/add-project" element={<ProtectedRoute element={<AddProjectNameForm />} />} />
          </Routes>
        </Router>
      </ProjectProvider>
    </AuthProvider>
  );
}

export default App;
