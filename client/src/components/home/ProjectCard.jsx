import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const ProjectCard = () => {
  return (
    <div>ProjectCard
        {/* should be updated to /user/${userId}/project/${projectId} */}
        <Link to={`/user/project/`}>
            <Button>Open Project</Button>
        </Link>

    </div>
  )
}

export default ProjectCard;