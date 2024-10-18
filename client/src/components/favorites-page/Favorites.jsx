import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import SearchBar from '../home/SearchBar';
import SortProjectType from './SortProjectType';
import ListFavoriteProjects from './ListFavoriteProjects';

const Favorites = () => {
  return (
    <div>Favorites
        <SearchBar />
        <SortProjectType />
        <ListFavoriteProjects />

        <Link to={`/add-project`}>
            <Button>Add New Project</Button>
        </Link>
    </div>
  )
}

export default Favorites;