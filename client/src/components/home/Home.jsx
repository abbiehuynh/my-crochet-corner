import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListProjects from './ListProjects';

const Home = () => {
  return (
    <div>Home

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