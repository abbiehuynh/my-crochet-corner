import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import { useProjects } from './ProjectProvider';

const ProjectCard = ({ project, onDelete }) => {
    // access via contexts
    const { userId } = useAuth();
    const { toggleFavorite } = useProjects();

    const handleToggleFavorite = async () => {
        try { 
            await toggleFavorite(project.id);
        } catch (error) {
            console.error("Error toggling favorite:", error);
            alert("Failed to update favorite status.");
        }
    };
    
  return (
    <Card>
        <Card.Body>

            <Card.Title>Project Name: {project.project_name}</Card.Title>
            
            {/* Favorite button */}
            <Button 
                variant={project.is_favorite ? "warning" : "secondary"} 
                onClick={handleToggleFavorite}
            >
                {project.is_favorite ? "Unfavorite" : "Favorite"}
            </Button>
            <Card.Text>Favorite Project: {project.is_favorite ? "Yes" : "No"}</Card.Text> 
            <Card.Text>Project Status: {project.project_status}</Card.Text> 
            <Card.Text>Project Type: {project.project_type}</Card.Text>

            {/* the user can click the button to view all of the project details */}
            <Button>
                <Link to={`/user/${userId}/project/${project.id}`} style={{ color: "white", textDecoration: "none" }}>Open Project</Link>
            </Button> 
            <Button variant="danger" onClick={onDelete}>Delete Project</Button>
        </Card.Body>
    </Card>    
  )
}

export default ProjectCard;