import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';

const ProjectCard = ({ project, onDelete }) => {
    // delete function
    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete the project "${project.project_name}"?`)) {
            onDelete(project.id);
        }
    }
    

  return (
    <Card>
        <Card.Body>
            <Card.Title>Project Name: {project.project_name}</Card.Title>
            {/* TO DO: add favorite button / icon to represent is_favorite */}
            {/* just testing to see if data will render */}
            <Card.Text>Favorite Project: {String(project.is_favorite)}</Card.Text> 
            <Card.Text>Project Status: {project.project_status}</Card.Text> 
            <Card.Text>Project Type: {project.project_type}</Card.Text>

            {/* the user can click the button to view all of the project details */}
            {/* should be updated to /user/${userId}/project/${projectId} */}
            <Button>
                {/* change color to make text visible */}
                <Link to={`/user/project`} style={{ color: "white", textDecoration: "none" }}>Open Project</Link>
            </Button> 
            <Button variant="danger" onClick={handleDelete}>Delete Project</Button>

        </Card.Body>
    </Card>    
  )
}

export default ProjectCard;