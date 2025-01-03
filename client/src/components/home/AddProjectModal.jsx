import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, Form } from 'react-bootstrap';
import { useAuth } from '../auth/AuthProvider';
import { useProjects } from './ProjectProvider';

const AddProjectModal = () => {
  // creates initial states for modals
	const [showAddModal, setShowAddModal] = useState(false);
	const [showConfirmModal, setShowConfirmModal] = useState(false);
  
  // creates initial state for project name
  const [projectName, setProjectName] = useState('');
  const [confirmedProjectName, setConfirmedProjectName] = useState('');
  const [projectId, setProjectId] = useState(null);

  // access from auth context and project context
  const { userId } = useAuth();
  const { addProject } = useProjects();

  const navigate = useNavigate();

  // creates function to handle adding new project
  const handleAddProject = async (e) => {
    e.preventDefault();

     // adding new project via context
     try {
      const newProject = await addProject({ project_name: projectName });

      setProjectId(newProject.id); // stores the projectId
      setShowAddModal(false); // closes the add project modal
      setConfirmedProjectName(projectName);
      setProjectName(''); // resets the input field
      setShowConfirmModal(true); // opens the confirmation modal
    } catch (error) {
        console.error('Error adding project:', error);
        alert(error.message);
      }
  };

  const handleRedirect = (path) => {
    navigate(path);
    setShowConfirmModal(false); // closes the confirmation modal
  };

	return (
    <div>
      <Button className="add-btn" onClick={() => setShowAddModal(true)} data-test="add-project-btn">
        Add Project <i className="bi bi-plus-circle"></i>
      </Button>

			{/* Add Project Modal */}
      <Modal 
        data-test="add-project-modal"
        show={showAddModal} 
        onHide={() => {
        setShowAddModal(false);
        setProjectName('');
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Project</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleAddProject} data-test="add-project-form">
            <Form.Group>
              <Form.Label>Project Name</Form.Label>
              <input
                data-test="add-project-name-input"
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
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} data-test="confirmation-modal">
        <Modal.Header closeButton>
          {/* TO DO: update title */}
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
              
        <Modal.Body>
          <p>Project "{confirmedProjectName}" has been added successfully!</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleRedirect('/home')} data-test="home-btn-confirmation-modal">Home</Button>
          <Button variant="primary" onClick={() => handleRedirect(`/user/${userId}/project/${projectId}`)} data-test="edit-project-btn-confirmation-modal">Edit Project</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default AddProjectModal;