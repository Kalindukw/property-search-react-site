import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SearchForm = ({ onSearch }) => {
  const [type, setType] = useState("any");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minBedrooms, setMinBedrooms] = useState("");
  const [maxBedrooms, setMaxBedrooms] = useState("");
  const [dateAdded, setDateAdded] = useState(null);
  const [postcode, setPostcode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert date to match your JSON format
    let formattedDate = null;
    if (dateAdded) {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      formattedDate = {
        month: months[dateAdded.getMonth()],
        day: dateAdded.getDate(),
        year: dateAdded.getFullYear(),
      };
    }

    // Only include non-empty values in the search criteria
    const searchCriteria = {
      type: type !== "any" ? type : null,
      minPrice: minPrice ? parseInt(minPrice) : null,
      maxPrice: maxPrice ? parseInt(maxPrice) : null,
      minBedrooms: minBedrooms ? parseInt(minBedrooms) : null,
      maxBedrooms: maxBedrooms ? parseInt(maxBedrooms) : null,
      dateAdded: formattedDate,
      postcode: postcode ? postcode.trim().toUpperCase() : null,
    };

    // Filter out null values
    const cleanSearchCriteria = Object.fromEntries(
      Object.entries(searchCriteria).filter(([_, value]) => value !== null)
    );

    onSearch(cleanSearchCriteria);
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <Row>
        <Col md={3}>
          <Form.Group controlId="type">
            <Form.Label>Property Type</Form.Label>
            <Form.Select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="any">Any</option>
              <option value="House">House</option>
              <option value="Flat">Flat</option>
            </Form.Select>
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
              min="0"
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
              min="0"
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
              min="0"
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
              min="0"
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="dateAdded">
            <Form.Label>Date Added After</Form.Label>
            <DatePicker
              selected={dateAdded}
              onChange={(date) => setDateAdded(date)}
              className="form-control"
              placeholderText="Select date"
              maxDate={new Date()}
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
              placeholder="e.g., BR5, NW1"
              maxLength="4"
            />
          </Form.Group>
        </Col>
        <Col md={3} className="d-flex align-items-end">
          <Button variant="primary" type="submit" className="w-100">
            Search Properties
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchForm;
