import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const AddProjectNameForm = () => {
  return (
    <div>AddProjectNameForm

        <Link to={`/project-saved`}>
            <Button>Add Project</Button>
        </Link>
    </div>
  )
}

export default AddProjectNameForm;