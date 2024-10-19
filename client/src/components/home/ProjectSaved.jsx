import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const ProjectSaved = () => {
  return (
    <div>
        {/* this is a confirmation page that the project has been saved - the user will then have two options: */}
        ProjectSaved

        {/* user can choose to go back to homescreen after project has been saved */}
        <Link to={`/`}>
            <Button>Home</Button>
        </Link>

        {/* user can choose to add information to the project / fill out form */}
        {/* update to /user/${userId}/project/${projectId} */}
        <Link to={`/user/project`}>
            <Button>Edit Project</Button>
        </Link>

    </div>
  )
}

export default ProjectSaved;