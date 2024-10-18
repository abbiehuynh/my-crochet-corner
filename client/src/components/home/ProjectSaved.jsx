import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const ProjectSaved = () => {
  return (
    <div>ProjectSaved
        <Link to={`/`}>
            <Button>Home</Button>
        </Link>
        {/* update to /user/${userId}/project/${projectId} */}
        <Link to={`/user/project`}>
            <Button>Edit Project</Button>
        </Link>

    </div>
  )
}

export default ProjectSaved;