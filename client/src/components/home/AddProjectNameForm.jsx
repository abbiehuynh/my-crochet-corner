import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const AddProjectNameForm = () => {
  return (
    <div>
        {/* allows users to add a new project by inputting a project name */}
        AddProjectNameForm

        {/* Once the project has been saved, the user will be redirected to the confirmation page that the project has been saved */}
        <Link to={`/project-saved`}>
            <Button>Add Project</Button>
        </Link>
    </div>
  )
}

export default AddProjectNameForm;