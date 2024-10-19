import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const ProjectForm = () => {
  return (
    <div>
        {/* this form will include access to the JOIN table that includes all project details */}
        {/* form will require every label and input for every project detail */}
        
        ProjectForm
        {/* the buttons will allow users to choose to either edit/update the form or delete the form */}
        <Button>Edit</Button>
        <Button>Delete</Button>
    </div>
  )
}

export default ProjectForm;