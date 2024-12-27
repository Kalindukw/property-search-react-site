import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PropertyList = ({ properties }) => {
  return (
    <Row>
      {properties.map((property) => (
        <Col key={property.id} md={4} className="mb-4">
          <Card>
            <Card.Img variant="top" src={property.images[0]} alt={property.shortDescription} />
            <Card.Body>
              <Card.Title>{property.shortDescription}</Card.Title>
              <Card.Text>
                <strong>Price:</strong> £{property.price.toLocaleString()}<br />
                <strong>Type:</strong> {property.type}<br />
                <strong>Bedrooms:</strong> {property.bedrooms}<br />
                <strong>Postcode:</strong> {property.postcode}
              </Card.Text>
              <Link to={`/property/${property.id}`} className="btn btn-primary">
                View Details
              </Link>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default PropertyList;