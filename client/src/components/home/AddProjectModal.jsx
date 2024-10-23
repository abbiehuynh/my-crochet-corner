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

		// access from useContext
		const { token, userId } = useAuth();

		// creates function to handle adding new project
		const handleAddProject = async (e) => {
				// prevents user from submitting before checking conditions
				e.preventDefault();

				// adding new project
				try {
							const response = await fetch(`${import.meta.env.VITE_URL}/user/${userId}/add-project`, {
									method: 'POST',
									headers: {
										'Content-Type': 'application/json',
										'Authorization': `Bearer ${token}`
							},
							body: JSON.stringify({ project_name: projectName })
						});
					
						if (!response.ok) {
								throw new Error('Failed to add project');
						}

						const newProject = await response.json();
						console.log('New project added:', newProject);

						// closes the add project modal
						setShowAddModal(false);
						// opens the confirmation modal
						setShowConfirmModal(true);
				} catch (error) {
						console.error('Error adding project:', error);
						alert(error.message);
				}
		};

		const navigate = useNavigate();

		const handleRedirect = (path) => {
				// redirects based on the button clicked
				navigate(path);
				// closes the confirmation modal
				setShowConfirmModal(false);
	};

	return (
			<div>
					<Button onClick={() => setShowAddModal(true)}>Add Project</Button>

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
									<p>Project "{projectName}" has been added successfully!</p>
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