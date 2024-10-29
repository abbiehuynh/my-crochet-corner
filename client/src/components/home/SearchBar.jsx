import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';

const SearchBar = ({ setSearchQuery }) => {

  return (
    <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
        <Form.Control
            type="text"
            placeholder="Search projects..."
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search"
            aria-describedby='basic-addon1'
        />
    </InputGroup>
  )
}

export default SearchBar;