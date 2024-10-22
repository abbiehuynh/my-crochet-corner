import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, Form } from 'react-bootstrap';
import { useAuth } from '../auth/AuthProvider';

const AddProjectModal = () => {
  // creates initial states for modals
	const [showAddModal, setShowAddModal] = useState(false);
	const [showConfirmModal, setShowConfirmModal] = useState(false);
  
  // creates initial state for project name
  const [projectName, setProjectName] = useState('');
  const [confirmedProjectName, setShowConfirmedProjectName] = useState('');

  // access from useContext
  const { token, userId, updateProjects, axiosInstance } = useAuth();

  // creates function to handle adding new project
  const handleAddProject = async (e) => {
    // prevents user from submitting before checking conditions
    e.preventDefault();

     // adding new project
     try {
      const response = await axiosInstance.post(`/user/${userId}/add-project`, {
        project_name: projectName
      });
          
      if (response.status !== 201) {
        throw new Error('Failed to add project');
      }

      const newProject = response.data;
      console.log('New project added:', newProject);

      // closes the add project modal
      setShowAddModal(false);
      setShowConfirmedProjectName(projectName);
      // resets the input field
      setProjectName('');

      // opens the confirmation modal
      setShowConfirmModal(true);
    } catch (error) {
        console.error('Error adding project:', error);
        alert(error.message);
      }
  };

  const handleRedirect = (path) => {
    // updates project list before redirecting to home page
    if (path === '/home') {
      updateProjects();
    }
    // else redirects path 
    navigate(path);
    // closes the confirmation modal
    setShowConfirmModal(false);
  };

	return (
    <div>
			{/* Add Project Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Project</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleAddProject}>
            <Form.Group>
              <Form.Label>Project Name</Form.Label>
              <input
                type="text"
                placeholder="Enter project name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit">Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Confirmation Modal */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          {/* TO DO: update title */}
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
              
        <Modal.Body>
          <p>Project "{confirmedProjectName}" has been added successfully!</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleRedirect('/home')}>Home</Button>
          {/* update to be project id */}
          <Button variant="primary" onClick={() => handleRedirect('/user/project')}>Edit Project</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default AddProjectModal;