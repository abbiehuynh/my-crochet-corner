import React, {useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthProvider';
import ProjectCard from './ProjectCard';
import axios from 'axios';

// update to pass userId as prop
const ListProjects = () => {

    // creates initial state of list of projects
    const [projects, setProjects] = useState([]);

    // access from AuthContext
    const { token, userId, projectsUpdated, updateProjects, axiosInstance } = useAuth();

    // GET - fetches projects
    const loadProjects = async () => {
        if (!userId) {
            console.error('User ID is not available');
            return;
        }

        try {
            const response = await axiosInstance.get(`/user/${userId}/projects`);

            if(response.status !== 200) {
                throw new Error('Failed to fetch projects');
            }

            setProjects(response.data);
        } catch (error) {
            console.error('Error loading projects:', error);
        }
    };

    // DELETE projects
    const handleDeleteProject = async (projectId, projectName) => {
        // debugging - logging the project and user id
        console.log('Deleting project:', projectId, 'for user:', userId);

        const confirmDelete = window.confirm(`Are you sure you want to delete the project "${projectName}"?`);
        if (!confirmDelete) return;

        try {
            const response = await axiosInstance.delete(`/user/${userId}/delete-project/${projectId}`);
            
            // DELETE LATER: logging the response to check status and data
            console.log('Delete response:', response);

            if (response.status !== 204) {
                const errorMessage = response.data || 'Failed to delete project';
                throw new Error(errorMessage);
            }

            updateProjects();
        } catch (error) {
            console.error('Error deleting project:', error);
            alert(error.message);
        }
    };

    // runs when userId or projectsUpdated changes
    useEffect(() => {
        // checks if projects are being updated
        console.log('Loading projects for userId:', userId);
        loadProjects();
    }, [userId, projectsUpdated]);

  return (
    <div className="container">
        <div className="box list-projects">
            {/* TO DO: set to value in database so it can update with sorting button - All Projects */}
            <h2>List of Projects</h2>
            {/* creates a list of projects by mapping projectCard */}
            <ul style={{ listStyleType: "none" }}>
                {projects.map((project) => {
                    return <li key={project.id}> <ProjectCard project={project} onDelete={() => handleDeleteProject(project.id, project.project_name)} /></li>
                })}
            </ul>
        </div>
    </div>
  )
}

export default ListProjects;