import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Logout = () => {
  return (
    <div>
        {/* will show users confirmation that they have been logged out */}
        Logout

        {/* will give users the option to log back in */}
        <Link to={`/login`}>
            <Button>Log In</Button>
        </Link>

        


    </div>
  )
}

export default Logout;