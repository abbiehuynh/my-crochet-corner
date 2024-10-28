import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

const ProjectCard = ({ project, onDelete }) => {
    const { userId } = useAuth();
    
  return (
    <Card>
        <Card.Body>
            <Card.Title>Project Name: {project.project_name}</Card.Title>
            {/* TO DO: add favorite button / icon to represent is_favorite */}
            <Card.Text>Favorite Project: {String(project.is_favorite)}</Card.Text> 
            <Card.Text>Project Status: {project.project_status}</Card.Text> 
            <Card.Text>Project Type: {project.project_type}</Card.Text>
            {/* the user can click the button to view all of the project details */}
            <Button>
                <Link to={`/user/${userId}project/${project.id}`} style={{ color: "white", textDecoration: "none" }}>Open Project</Link>
            </Button> 
            <Button variant="danger" onClick={onDelete}>Delete Project</Button>
        </Card.Body>
    </Card>    
  )
}

export default ProjectCard;