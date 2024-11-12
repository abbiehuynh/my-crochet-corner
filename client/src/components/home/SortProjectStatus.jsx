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
        if (category === 'All') {
            setSelectedCategory('All');
            setFilterHeader(headers.filterCategories.all);
        } else {
            const normalizedCategory = category.toLowerCase().replace(' ', '');
            setSelectedCategory(normalizedCategory);
            setFilterHeader(headers.filterCategories[normalizedCategory] || headers.filterDefault);
        }
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
                    <h3 data-test="filter-header">{filterHeader || headers.filterDefault}</h3>
                    <ButtonGroup className="me-2">
                        <Button variant="primary" onClick={() => handleFilter('All')} data-test="filter-all">{headers.filterCategories.all}</Button>
                        <Button variant="primary" onClick={() => handleFilter('To Do')} data-test="filter-todo">{headers.filterCategories.todo}</Button>
                        <Button variant="primary" onClick={() => handleFilter('In Progress')} data-test="filter-inprogress">{headers.filterCategories.inprogress}</Button>
                        <Button variant="primary" onClick={() => handleFilter('Completed')} data-test="filter-completed">{headers.filterCategories.completed}</Button>
                    </ButtonGroup>
                </div>

                <div>
                    <h3 data-test="sort-header">{sortHeader || headers.sortDefault}</h3>
                    <ButtonGroup className="d-flex justify-content-end">
                        <Button variant="secondary" onClick={() => handleSort('name', 'Name')} data-test="sort-name">Name</Button>
                        <Button variant="secondary" onClick={() => handleSort('type', 'Type')} data-test="sort-type">Type</Button>
                        <Button variant="secondary" onClick={() => handleSort('date', 'Date')} data-test="sort-date">Date</Button>
                    </ButtonGroup>
                </div>
            </div>
        </div>
    )
}

export default SortProjectStatus;