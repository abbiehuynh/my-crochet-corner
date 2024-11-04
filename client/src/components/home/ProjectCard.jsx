import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import { useProjects } from './ProjectProvider';
import { FaHeart, FaRegHeart, FaTrashAlt } from 'react-icons/fa';
import { BiFolderOpen } from 'react-icons/bi';

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
    <Card className="h-100 d-flex flex-column" id="project-card"> 
        
        {/* Favorite button */}
        <div className="fav-btn">
            <Button 
                    id="favorite-btn"
                    variant="light" 
                    onClick={handleToggleFavorite}
                    aria-label={`Favorite project: ${project.project_name}`}
                >
                    <span className="visually-hidden">Click to favorite project</span>
                    {project.is_favorite ? <FaHeart color="red" /> : <FaRegHeart />}
            </Button>
        </div>

        <Card.Body className="d-flex flex-column flex-grow-1 position-relative" id="inner-project-card">
            
            {/* <Card.Img variant="top" src={project.images} alt={project.project_name} /> */}
            
            <Card.Title data-test="project-name">{project.project_name}</Card.Title>
            <Card.Text data-test="project-status"><strong>Project Status:</strong> <br />{project.project_status}</Card.Text> 
            <Card.Text data-test="project-type"><strong>Project Type:</strong> <br />{project.project_type}</Card.Text>
            <Card.Text data-test="project-date"><strong>Created At:</strong> <br />{new Date(project.created_at).toLocaleDateString()}</Card.Text>

            <div className="mt-auto">
                {/* Open Project Button */}
                <Link className="open-project-link" to={`/user/${userId}/project/${project.id}`}>
                    <Button 
                        variant="primary" 
                        className="open-project-btn"
                        aria-label={`View Project: ${project.project_name}`}
                    >
                        <span className="visually-hidden">Click to view project details</span>
                        <BiFolderOpen className="folder-icon"/> Open Project
                    </Button> 
                </Link>

                {/* Delete Button */}
                <Button 
                    variant="danger" 
                    className="delete-btn"
                    onClick={onDelete}
                    aria-label={`Delete project: ${project.project_name}`}
                >
                    <span className="visually-hidden">Click to delete project</span>
                    <FaTrashAlt className="trash-icon"/>
                </Button>
            </div>
        </Card.Body>
    </Card>    
  )
}

export default ProjectCard;