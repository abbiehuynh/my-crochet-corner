import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import SearchBar from './SearchBar';
import SortProjectStatus from './SortProjectStatus';
import ListProjects from './ListProjects';

const Home = () => {
  return (
    <div>Home

        <SearchBar />
        <SortProjectStatus />

        <ListProjects />

        <Link to={`/ai-chat`}>
            <Button>Open AI</Button>
        </Link>

        <Link to={`/add-project`}>
            <Button>Add New Project</Button>
        </Link>
    </div>
  )
}

export default Home;