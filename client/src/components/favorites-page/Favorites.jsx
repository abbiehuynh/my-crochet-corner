import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import SearchBar from '../home/SearchBar';
import SortProjectType from './SortProjectType';
import ListFavoriteProjects from './ListFavoriteProjects';

const Favorites = () => {
  return (
    <div>
        Favorites

        {/* will allow users to search through the list of projects by project name */}
        <SearchBar />

        {/* will allow users to sort through projects by project status */}
        <SortProjectType />

        {/* will allow users to view all favorite projects as a list of cards */}
        <ListFavoriteProjects />

        {/* will allow users to add a new project and open a new form */}
        <Link to={`/add-project`}>
            <Button>Add New Project</Button>
        </Link>
    </div>
  )
}

export default Favorites;