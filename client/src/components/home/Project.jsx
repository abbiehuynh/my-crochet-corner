import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import { Container, ListGroup, Alert, Spinner } from 'react-bootstrap';
import ProjectForm from './ProjectForm';

const Project = () => {
    // creates initial states
    const { userId, axiosInstance } = useAuth();
    const { projectId } = useParams();

    // DELETE LATER - debugging checking userId, and project Id
    console.log('User ID:', userId, 'Project ID:', projectId);

    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchProject = async () => {
            // DELETE LATER - debugging
            console.log(`Fetching project for User ID: ${userId}, Project ID: ${projectId}`);

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

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    }

    const handleUpdate = async (updatedProject) => {
        try {
            // DELETE LATER - debugging update
            console.log(`Updating project at: /user/${userId}/project/${projectId}`, updatedProject);
            
            const response = await axiosInstance.put(`/user/${userId}/project/${projectId}`, updatedProject);
            
            setProject(response.data);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating project:', error);
            if (error.reponse && error.response.status === 404) {
                setError('Project not found');
            } else {
                setError('Failed to update project details');
            }
        }
    };

    if (loading) return <p>Loading project details...</p>;
    if (error) return <p>{error}</p>;
    if (!project) return <p>No project data available.</p>;

  return (
    <Container>
        <button onClick={handleEditToggle}>
            {isEditing ? 'Cancel' : 'Edit Project'}
        </button>
        {isEditing ? (
            <ProjectForm 
                project={project}
                onUpdate={handleUpdate}
                projectId={projectId}
            />
        ) : (
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
                    
                <h3>Patterns:</h3>
                {project.patterns && project.patterns.length > 0 ? (
                    <ListGroup>
                        {project.patterns.map((pattern, index) => (
                            <ListGroup.Item key={index}>
                                <strong>Pattern Name:</strong> {pattern.pattern_name} <br />
                                <strong>Pattern By:</strong> {pattern.pattern_by} <br />
                                <strong>Pattern Source:</strong> {pattern.pattern_url}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                ) : (
                    <p>No patterns listed yet.</p>
                )}

                <h3>Other Materials:</h3>
                {project.otherMaterials && project.otherMaterials.length > 0 ? (
                    <ListGroup>
                        {project.otherMaterials.map((material, index) => (
                            <ListGroup.Item key={index}>
                                <strong>Hook Size:</strong> {material.project_hook_size} <br />
                                <strong>Safety Eyes:</strong> {material.safety_eyes} <br />
                                <strong>Stuffing:</strong> {material.stuffing}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                ) : (
                    <p>No other materials listed yet.</p>
                )}
                                
                <h3>Yarn</h3>
                {project.yarns && project.yarns.length > 0 ? (
                    <ListGroup>
                        {project.yarns.map((yarn, index) => (
                            <ListGroup.Item key={index}>
                                <strong>Brand:</strong> {yarn.yarn_brand} <br />
                                <strong>Color:</strong> {yarn.yarn_color} <br />
                                <strong>Weight:</strong> {yarn.yarn_weight} <br />
                                <strong>Type:</strong> {yarn.yarn_type}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                ) : (
                    <p>No yarn details available.</p>
                )}
            </div>
        )}
        <div>
            <p>User: {project.user_name}</p>
            <p>Updated At: {new Date(project.updated_at).toLocaleString()}</p>
        </div>
    </Container>
  );
}

export default Project;