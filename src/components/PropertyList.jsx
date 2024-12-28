import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const PropertyList = ({ properties }) => {
  return (
    <Row>
      {properties.map((property) => (
        <Col key={property.id} md={4} className="mb-4">
          <Card>
            <Card.Img
              variant="top"
              src={property.picture}
              alt={property.description.substring(0, 100)}
            />
            <Card.Body>
              <Card.Title>
                {property.type} in {property.location}
              </Card.Title>
              <Card.Text>
                <strong>Price:</strong> £{property.price.toLocaleString()}
                <br />
                <strong>Type:</strong> {property.type}
                <br />
                <strong>Bedrooms:</strong> {property.bedrooms}
                <br />
                <strong>Tenure:</strong> {property.tenure}
                <br />
                <strong>Added:</strong>{" "}
                {`${property.added.month} ${property.added.day}, ${property.added.year}`}
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
