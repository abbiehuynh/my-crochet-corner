import React, { useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useProjects } from './ProjectProvider';

const SortProjectStatus = () => {
    const { setSortOrder, setSelectedCategory } = useProjects();
    const [filterHeader, setFilterHeader] = useState('Filter projects by status');
    const [sortHeader, setSortHeader] = useState('Sort projects by criteria');

    // for project status - to do, in progress, completed
    const handleFilter = (category, header) => {
        setSelectedCategory(category);
        setFilterHeader(header);
    }

    // for sorting - name, type, date
    const handleSort = (order, header) => {
        setSortOrder(order);
        setSortHeader(header);
    }

  return (
    <div className="mb-3">
        <h3>{filterHeader}</h3>
        <ButtonGroup>
            <Button variant="primary" onClick={() => handleFilter('All', 'All Projects')}>All</Button>
            <Button variant="primary" onClick={() => handleFilter('To Do', 'To Do')}>To Do</Button>
            <Button variant="primary" onClick={() => handleFilter('In Progress', 'In Progress')}>In Progress</Button>
            <Button variant="primary" onClick={() => handleFilter('Completed', 'Completed')}>Completed</Button>
        </ButtonGroup>

        <h3>{sortHeader}</h3>
        <ButtonGroup>
            <Button variant="secondary" onClick={() => handleSort('name', 'Name')}>Name</Button>
            <Button variant="secondary" onClick={() => handleSort('type', 'Type')}>Type</Button>
            <Button variant="secondary" onClick={() => handleSort('date', 'Date')}>Date</Button>
        </ButtonGroup>
    </div>
  )
}

export default SortProjectStatus;