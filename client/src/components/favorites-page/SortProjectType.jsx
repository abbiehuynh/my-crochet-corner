import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const SortProjectType = () => {
  return (
    <div>
        {/* will allow users to sort through and view projects by project type */}
        SortProjectType

        <Button >All Projects</Button>

        <Button>Amigurimi</Button>
        <Button>Blanket</Button>
        <Button>Clothing</Button>
        <Button>Tapestry</Button>

        {/* will allow users to filter projects by alphabetical order and date (most recent - latest) */}
        <Button >Sort By</Button>
    </div>
  )
}

export default SortProjectType;