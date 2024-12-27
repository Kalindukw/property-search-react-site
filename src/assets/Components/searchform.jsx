import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SearchForm = ({ onSearch }) => {
  const [type, setType] = useState('any');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minBedrooms, setMinBedrooms] = useState('');
  const [maxBedrooms, setMaxBedrooms] = useState('');
  const [dateAdded, setDateAdded] = useState(null);
  const [postcode, setPostcode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      type,
      minPrice: minPrice ? parseInt(minPrice) : null,
      maxPrice: maxPrice ? parseInt(maxPrice) : null,
      minBedrooms: minBedrooms ? parseInt(minBedrooms) : null,
      maxBedrooms: maxBedrooms ? parseInt(maxBedrooms) : null,
      dateAdded: dateAdded ? dateAdded.toISOString().split('T')[0] : null,
      postcode: postcode.toUpperCase(),
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={3}>
          <Form.Group controlId="type">
            <Form.Label>Property Type</Form.Label>
            <Form.Control as="select" value={type} onChange={(e) => setType(e.target.value)}>
              <option value="any">Any</option>
              <option value="house">House</option>
              <option value="flat">Flat</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="minPrice">
            <Form.Label>Min Price</Form.Label>
            <Form.Control
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="Enter min price"
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="maxPrice">
            <Form.Label>Max Price</Form.Label>
            <Form.Control
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Enter max price"
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="minBedrooms">
            <Form.Label>Min Bedrooms</Form.Label>
            <Form.Control
              type="number"
              value={minBedrooms}
              onChange={(e) => setMinBedrooms(e.target.value)}
              placeholder="Enter min bedrooms"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={3}>
          <Form.Group controlId="maxBedrooms">
            <Form.Label>Max Bedrooms</Form.Label>
            <Form.Control
              type="number"
              value={maxBedrooms}
              onChange={(e) => setMaxBedrooms(e.target.value)}
              placeholder="Enter max bedrooms"
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="dateAdded">
            <Form.Label>Date Added</Form.Label>
            <DatePicker
              selected={dateAdded}
              onChange={(date) => setDateAdded(date)}
              className="form-control"
              placeholderText="Select date added"
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="postcode">
            <Form.Label>Postcode Area</Form.Label>
            <Form.Control
              type="text"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              placeholder="Enter postcode area"
            />
          </Form.Group>
        </Col>
        <Col md={3} className="d-flex align-items-end">
          <Button variant="primary" type="submit" className="w-100">
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchForm;