import React, { useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useProjects } from './ProjectProvider';

const SortProjectStatus = () => {
    const { setSortOrder, setSelectedCategory } = useProjects();
    const [filterHeader, setFilterHeader] = useState('');
    const [sortHeader, setSortHeader] = useState('');

    // defines headers
    const headers = {
        filterDefault: 'Filter projects by status',
        sortDefault: 'Sort projects by criteria',
        filterCategories: {
            all: 'All Projects',
            todo: 'To Do',
            inprogress: 'In Progress',
            completed: 'Completed'
        },
        sortOptions: {
            name: 'Name',
            type: 'Type',
            date: 'Date'
        }
    }

    // for project status - to do, in progress, completed
    const handleFilter = (category) => {
        setSelectedCategory(category);
        setFilterHeader(headers.filterCategories[category.toLowerCase().replace(' ', '')] || headers.filterDefault);
    }

    // for sorting - name, type, date
    const handleSort = (order) => {
        setSortOrder(order);
        setSortHeader(headers.sortOptions[order] || headers.sortDefault);
    }

  return (
    <div className="mb-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
            <div>
                <h3>{filterHeader || headers.filterDefault}</h3>
                <ButtonGroup className="me-2">
                    <Button variant="primary" onClick={() => handleFilter('All')}>{headers.filterCategories.all}</Button>
                    <Button variant="primary" onClick={() => handleFilter('To Do')}>{headers.filterCategories.todo}</Button>
                    <Button variant="primary" onClick={() => handleFilter('In Progress')}>{headers.filterCategories.inprogress}</Button>
                    <Button variant="primary" onClick={() => handleFilter('Completed')}>{headers.filterCategories.completed}</Button>
                </ButtonGroup>
            </div>

            <div>
                <h3>{sortHeader || headers.sortDefault}</h3>
                <ButtonGroup className="d-flex justify-content-end">
                    <Button variant="secondary" onClick={() => handleSort('name', 'Name')}>Name</Button>
                    <Button variant="secondary" onClick={() => handleSort('type', 'Type')}>Type</Button>
                    <Button variant="secondary" onClick={() => handleSort('date', 'Date')}>Date</Button>
                </ButtonGroup>
            </div>
        </div>
    </div>
  )
}

export default SortProjectStatus;