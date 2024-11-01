import React, { useEffect, useState, useCallback } from 'react';
import ListProjects from './ListProjects';
import AIChatBot from '../ai/AIChatBot';
import AddProjectModal from './AddProjectModal';
import { useProjects } from './ProjectProvider';
import { Button } from 'react-bootstrap';

const Home = () => {
    // creates state for AI chatbox modal
    const [isModalOpen, setModalOpen] = useState(false);

    // sets modal state to open and close 
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    // access to fetchProjects from project context
    const { fetchProjects } = useProjects();

    // useCallback to avoid unecessary rendering
    const fetchProjectsCallback = useCallback(() => {
        fetchProjects();
    }, [fetchProjects]);

    useEffect(() => {
        fetchProjectsCallback();
    }, [fetchProjectsCallback]);

  return (
    <div>
        Home

        {/* will allow users to view all projects as a list of cards */}
        <ListProjects />

        {/* will open an AI Chat Box/ Modal */}
        <Button onClick={openModal}>Open AIChat</Button>
        <AIChatBot isOpen={isModalOpen} onClose={closeModal} />

        {/* will allow users to add a new project and open a new form */}
        <AddProjectModal onAddProject={fetchProjectsCallback} />
    </div>
  )
}

export default Home;