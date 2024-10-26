import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import ProjectForm from './ProjectForm';

const Project = () => {
    const { userId, axiosInstance } = useAuth();
    const { projectId } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await axiosInstance.get(`/user/${userId}/project/${projectId}`);
                setProject(response.data);
            } catch (error) {
                setError('Failed to fetch project details');
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
    }, [userId, projectId, axiosInstance]);

    if (loading)
        return <p>Loading project details...</p>

    if (error)
        return <p>{error}</p>


  return (
    <div>
        <h2>{project.project_name}</h2>
        {/* this will include the project form to allow the user to update project details */}
        Project
        <ProjectForm />
    </div>
  )
}

export default Project;