import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import ProjectForm from './ProjectForm';

const Project = () => {
    // creates initial states
    const { userId, axiosInstance } = useAuth();
    const { projectId } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await axiosInstance.get(`/user/${userId}/project/${projectId}`);
                if (response.data) {
                    setProject(response.data);
                } else {
                    setError('No project found');
                }
                console.log('Feteched project data:', response.data);
            } catch (error) {
                console.error('Error fetching project:', error);
                setError('Failed to fetch project details');
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
    }, [userId, projectId, axiosInstance]);

    if (loading)
        return <p>Loading project details...</p>;

    if (error)
        return <p>{error}</p>;

    if (!project) 
        return <p>No project data available.</p>;

  return (
    <div>
        <h2>{project.project_name}</h2>
            <h3>Project Information:</h3>
                <p>Favorite Project: {String(project.is_favorite)}</p>
                <p>Project Status: {project.project_status}</p>
                <p>Project Type: {project.project_type}</p>
                <p>Date Created: {new Date(project.created_at).toLocaleDateString()}</p>
                <p>Date Completed: {project.end_at ? new Date(project.end_at).toLocaleDateString() : 'Not completed'}</p>
                <p>Time to Complete: {project.time_to_complete?.hours || 'N/A'} hours</p>
                <p>Notes: {project.notes || 'N/A'}</p>
            
            <h3>Pattern:</h3>
                <p>Pattern Name: {project.pattern_name}</p>
                <p>Pattern By: {project.pattern_by}</p>
                <p>Pattern Source: {project.pattern_url}</p>

            <h3>Materials:</h3>
                <p>Hook Size: {project.project_hook_size}</p>
                <p>Safety Eyes: {project.project_safety_eyes}</p>
                <p>Stuffing: {project.project_stuffing}</p>
                
            <h4>Yarn</h4>
                <p>Brand: {project.yarn_brand}</p>
                <p>Color: {project.yarn_color}</p>

        <p>User: {project.user_name}</p>
        <p>Updated At: {new Date(project.updated_at).toLocaleString()}</p>

        {/* this will include the project form to allow the user to update project details */}
        <ProjectForm />
    </div>
  )
}

export default Project;