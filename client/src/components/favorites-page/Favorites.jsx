import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ListProjects from '../home/ListProjects';

const Favorites = () => {

  return (
    <div>
        Favorites

        {/* uses listProjects with showFavorites set to true */}
        <ListProjects showFavorites={true} />

        {/* will allow users to add a new project and open a new form */}
        <Link to={`/add-project`}>
            <Button>Add New Project</Button>
        </Link>
    </div>
  )
}

export default Favorites;