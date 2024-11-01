import React, { useState, useCallback, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import ListProjects from '../home/ListProjects';
import AIChatBot from '../ai/AIChatBot';
import AddProjectModal from '../home/AddProjectModal';
import { useProjects } from '../home/ProjectProvider';

const Favorites = () => {
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
        {/* uses listProjects with showFavorites set to true */}
        <ListProjects showFavorites={true} />

        {/* will open an AI Chat Box/ Modal */}
        <Button onClick={openModal}>Open AIChat</Button>
        <AIChatBot isOpen={isModalOpen} onClose={closeModal} />

        {/* will allow users to add a new project and open a new form */}
        <AddProjectModal onAddProject={fetchProjectsCallback} />
    </div>
  )
}

export default Favorites;