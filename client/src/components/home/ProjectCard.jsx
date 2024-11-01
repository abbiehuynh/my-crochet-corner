import React, { useState } from 'react';
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

    const [isHovered, setIsHovered] = useState(false);

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
        <Button 
                id="favorite-btn"
                variant="light" 
                onClick={handleToggleFavorite}
                style={{ position: 'absolute', top: '5px', right: '8px', fontSize: '1.3rem' }}
                aria-label={`Favorite project: ${project.project_name}`}
            >
                <span className="visually-hidden">Click to favorite project</span>
                {project.is_favorite ? <FaHeart color="red" /> : <FaRegHeart />}
        </Button>

        <Card.Body className="d-flex flex-column flex-grow-1 position-relative" id="inner-project-card">
            
            {/* <Card.Img variant="top" src={project.images} alt={project.project_name} /> */}
            
            <Card.Title>{project.project_name}</Card.Title>
            <Card.Text><strong>Project Status:</strong> <br />{project.project_status}</Card.Text> 
            <Card.Text><strong>Project Type:</strong> <br />{project.project_type}</Card.Text>

            <div className="mt-auto" style={{ display: 'flex', justifyContent: 'space-between' }}>
                {/* Open Project Button */}
                <Link to={`/user/${userId}/project/${project.id}`} style={{ textDecoration: "none", flex: 1 }}>
                    <Button 
                        variant="primary" 
                        style={{ width: '100%', marginRight: '5px', color: "black" }}
                        aria-label={`View Project: ${project.project_name}`}
                    >
                        <span className="visually-hidden">Click to view project details</span>
                        <BiFolderOpen style={{ fontSize: '1.5rem', color: "black" }}/> Open Project
                    </Button> 
                </Link>

                {/* Delete Button */}
                <Button 
                    variant="danger" 
                    onClick={onDelete}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={{ marginLeft: '5px' }}
                    aria-label={`Delete project: ${project.project_name}`}
                >
                    <span className="visually-hidden">Click to delete project</span>
                    <FaTrashAlt 
                        style={{ 
                            fontSize: '1.3rem', 
                            color: isHovered ? 'white' : 'red'
                        }}
                    />
                </Button>
            </div>
        </Card.Body>
    </Card>    
  )
}

export default ProjectCard;