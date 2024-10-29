import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useAuth } from '../auth/AuthProvider';
import axios from 'axios';

// creates project context
const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
    // creates initial states for projects
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // acesses axios instance and user Id from AuthContext
    const { axiosInstance, userId } = useAuth();

    // GET - fetch projects
    // useCallback ensures function does not change on every render, preventing unnecessary calls
    const fetchProjects = useCallback(async () => {
        if (!userId) {
            console.error('User ID is not available');
            return;
        }
        // updates states, resets error state
        setLoading(true);
        setError(null);

        try {
            const response = await axiosInstance.get(`/user/${userId}/projects`);
            if (response.status !== 200) {
                throw new Error('Failed to fetch projects');
            }
            setProjects(response.data);

        } catch (error) {
            setError(error);
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
    }, [axiosInstance, userId]);

    // DELETE projects
    const deleteProject = async (projectId, projectName) => {
        // debugging - logging the project and user id
        console.log('Deleting project:', projectId, 'for user:', userId);

        const confirmDelete = window.confirm(`Are you sure you want to delete the project "${projectName}"?`);
        if (!confirmDelete) return;

        setLoading(true);

        try {
            const response = await axiosInstance.delete(`/user/${userId}/delete-project/${projectId}`);
            if (response.status !== 204) {
                throw new Error('Failed to delete project');
            }
            // remove deleted project from state
            setProjects((prev) => prev.filter((project) => project.id !== projectId));
        } catch (error) {
            console.error('Error deleting project:', error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // fetches projects only if userId is available - will not try to fetch before user has logged in
        if (userId) {
            fetchProjects();
        } else {
            // clear projects if user is logged out
            setProjects([]);
        }
    }, [userId, fetchProjects]);

  return (
    <ProjectContext.Provider value={{ projects, loading, error, deleteProject, fetchProjects }}>
        {children}
    </ProjectContext.Provider>
  )
}

export const useProjects = () => useContext(ProjectContext);