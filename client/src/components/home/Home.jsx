import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import SearchBar from './SearchBar';
import SortProjectStatus from './SortProjectStatus';
import ListProjects from './ListProjects';
import AIChatBot from '../ai/AIChatBot';

const Home = () => {
    // creates state for AI chatbox modal
    const [isModalOpen, setModalOpen] = useState(false);

    // sets modal state to open and close 
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

  return (
    <div>
        {/* this is the landing page where the user flow will start for most user stories */}
        Home

        {/* will allow users to search through the list of projects by project name */}
        <SearchBar />

        {/* will allow users to sort through projects by project status */}
        <SortProjectStatus />

        {/* will allow users to view all projects as a list of cards */}
        <ListProjects />

        {/* will open an AI Chat Box/ Modal */}
        <button onClick={openModal}>Open AIChat</button>
        <AIChatBot isOpen={isModalOpen} onClose={closeModal} />

        {/* will allow users to add a new project and open a new form */}
        <Link to={`/add-project`}>
            <Button>Add New Project</Button>
        </Link>
    </div>
  )
}

export default Home;