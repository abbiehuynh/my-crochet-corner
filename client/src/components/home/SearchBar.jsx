import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';

const SearchBar = ({ setSearchQuery }) => {

  return (
    <InputGroup data-test="search-bar-container"className="mb-3">
        <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
        <Form.Control
            data-test="search-bar-input"
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