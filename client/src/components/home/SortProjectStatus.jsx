import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useProjects } from './ProjectProvider';

const SortProjectStatus = () => {
    const { setSortOrder, setSelectedCategory } = useProjects();

  return (
    <div className="mb-3">
        <h3>Sort By:</h3>
        <ButtonGroup>
            <Button variant="secondary" onClick={() => setSortOrder('name')}>Name</Button>
            <Button variant="secondary" onClick={() => setSortOrder('type')}>Type</Button>
            <Button variant="secondary" onClick={() => setSortOrder('date')}>Date</Button>
        </ButtonGroup>

        <h3>Filter By Project Status:</h3>
        <ButtonGroup>
            <Button variant="primary" onClick={() => setSelectedCategory('All')}>All</Button>
            <Button variant="primary" onClick={() => setSelectedCategory('To Do')}>To Do</Button>
            <Button variant="primary" onClick={() => setSelectedCategory('In Progress')}>In Progress</Button>
            <Button variant="primary" onClick={() => setSelectedCategory('Completed')}>Completed</Button>
        </ButtonGroup>
    </div>
  )
}

export default SortProjectStatus;