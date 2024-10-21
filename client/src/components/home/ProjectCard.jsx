import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const ProjectCard = () => {
  return (
    <div>
        {/* this is the project card that will be displayed in the list of projects */}
        ProjectCard

        {/* the user can click the button to view all of the project details */}
        {/* should be updated to /user/${userId}/project/${projectId} */}
        <Link to={`/user/project/`}>
            <Button>Open Project</Button>
        </Link>

    </div>
  )
}

export default ProjectCard;