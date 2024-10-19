import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const SortProjectStatus = () => {
  return (
    <div>SortProjectStatus
        {/* will allow users to sort through projects by project status */}

        <Button >All Projects</Button>

        <Button >In Progress</Button>
        <Button >To Do</Button>
        <Button >Completed</Button>

        {/* will allow users to filter projects by alphabetical order and date (most recent - latest) */}
        <Button >Sort By</Button>
        
    </div>
  )
}

export default SortProjectStatus;