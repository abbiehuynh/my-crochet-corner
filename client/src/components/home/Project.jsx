import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import { Button, Card, Container, ListGroup, Alert, Spinner } from 'react-bootstrap';
import ProjectForm from './ProjectForm';

const Project = () => {
    
    const { userId, axiosInstance } = useAuth();
    const { projectId } = useParams();

    // creates initial states
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const fetchProject = async () => {
        try {
            const response = await axiosInstance.get(`/user/${userId}/project/${projectId}`);
            
            if (response.data) {
                setProject(response.data);
            } else {
                setError('No project found');
            }
            // DELETE LATER - debugging refetching project
            console.log('Feteched project data:', response.data);
        } catch (error) {
            console.error('Error fetching project:', error);
            setError('Failed to fetch project details');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProject();
    }, [userId, projectId, axiosInstance]);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    }

    const handleUpdate = async (updatedProject) => {
        try {
            const response = await axiosInstance.put(`/user/${userId}/project/${projectId}`, updatedProject);
            setProject(response.data);
            await fetchProject(); // refetch the project data after making put request
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

    if (loading) return <Spinner animation="border" />;
    if (error) return <Alert variant= "danger">{error}</Alert>;
    if (!project) return <p>No project data available.</p>;

  return (
    <Container className="project-details-container">
        <Button className="edit-btn" variant="primary" onClick={handleEditToggle} data-test="edit-btn">
            {isEditing ? 'Cancel' : 'Edit Project'}
        </Button>
        {isEditing ? (
            <ProjectForm 
                project={project}
                onUpdate={handleUpdate}
                projectId={projectId}
            />
        ) : (
            <>
                {/* Project Information Card */}
                <Card className="mb-4" data-test="project-details-view">
                    <Card.Body>
                        <Card.Title data-test="project-name-project-page">{project.project_name}</Card.Title>
                        <ListGroup variant="flush">
                            <ListGroup.Item data-test="project-favorite-detail">Favorite Project: {String(project.is_favorite)}</ListGroup.Item>
                            <ListGroup.Item data-test="project-status">Project Status: {project.project_status}</ListGroup.Item>
                            <ListGroup.Item data-test="project-type-detail">Project Type: {project.project_type}</ListGroup.Item>
                            <ListGroup.Item data-test="project-created-at">Date Created: {new Date(project.created_at).toLocaleDateString()}</ListGroup.Item>
                            <ListGroup.Item data-test="project-completion-date">Date Completed: {project.end_at ? new Date(project.end_at).toLocaleDateString() : 'Not completed'}</ListGroup.Item>
                            <ListGroup.Item data-test="project-time-to-complete">Time to Complete: {project.time_to_complete?.hours || 'N/A'} hours</ListGroup.Item>
                            <ListGroup.Item data-test="project-notes">Notes: {project.notes || 'N/A'}</ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>

                {/* Pattern Card */}
                <Card className='mb-4'>
                    <Card.Body>
                        <Card.Title>Patterns:</Card.Title>
                        {project.patterns && project.patterns.length > 0 ? (
                                <ListGroup variant="flush">
                                    {project.patterns.map((pattern, index) => (
                                        <ListGroup.Item key={index} data-test="patterns-section">
                                            <strong>Pattern Name:</strong> {pattern.pattern_name} <br />
                                            <strong>Pattern By:</strong> {pattern.pattern_by} <br />
                                            <strong>Pattern Source:</strong> {pattern.pattern_url}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            ) : (
                                <p>No patterns listed yet.</p>
                            )}
                    </Card.Body>
                </Card>

                {/* Other Materials Card */}
                <Card className='mb-4'>
                    <Card.Body>
                        <Card.Title>Other Materials:</Card.Title>
                        {project.otherMaterials && project.otherMaterials.length > 0 ? (
                            <ListGroup variant="flush">
                                {project.otherMaterials.map((material, index) => (
                                    <ListGroup.Item key={index} data-test="other-materials-section">
                                        <strong>Hook Size:</strong> {material.project_hook_size} <br />
                                        <strong>Safety Eyes:</strong> {material.safety_eyes} <br />
                                        <strong>Stuffing:</strong> {material.stuffing}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        ) : (
                            <p>No other materials listed yet.</p>
                        )}
                    </Card.Body>
                </Card>

                {/* Yarn Card  */}
                <Card className='mb-4'>
                    <Card.Body>
                        <Card.Title>Yarn</Card.Title>
                        {project.yarns && project.yarns.length > 0 ? (
                            <ListGroup variant="flush">
                                {project.yarns.map((yarn, index) => (
                                    <ListGroup.Item key={index} data-test="yarn-section">
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
                    </Card.Body>
                </Card>

                <Card>
                    <Card.Body>
                        <p data-test="project-user">User: {project.user_name}</p>
                        <p data-test="project-updated-at">Updated At: {new Date(project.updated_at).toLocaleString()}</p>
                    </Card.Body>
                </Card>
            </>
        )}
    </Container>
  );
}

export default Project;