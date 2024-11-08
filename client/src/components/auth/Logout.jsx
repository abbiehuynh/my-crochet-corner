import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const Logout = () => {
  // creates initial state for logout modal
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setShowModal(false);
  };

  const handleConfirmLogout = () => {
    handleLogout();
    setShowModal(false);
  }

  return (
    <div>
      {/* logout button */}
      <Button className="logout-btn" onClick={handleShowModal} data-test="logout-btn-profile">Logout</Button>
      
      {/* logout confirmation modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to log out?</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>You will be redirected to the login page.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>

    </div>



  );
};

export default Logout;