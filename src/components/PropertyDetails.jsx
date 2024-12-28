import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const PropertyDetails = ({ properties, addToFavorites }) => {
  const { id } = useParams();
  const property = properties.find((p) => p.id === id); // Removed parseInt
  const [activeTab, setActiveTab] = useState(0);

  if (!property) {
    return <div>Property not found</div>;
  }

  return (
    <Container className="mt-4">
      <h1>
        {property.type} in {property.location}
      </h1>
      <Row className="mb-4">
        <Col md={8}>
          <Image
            src={property.picture}
            alt={property.description}
            className="w-100 mb-3"
            style={{ maxHeight: "500px", objectFit: "cover" }}
          />
        </Col>
        <Col md={4}>
          <h2>£{property.price.toLocaleString()}</h2>
          <p>
            <strong>Type:</strong> {property.type}
            <br />
            <strong>Bedrooms:</strong> {property.bedrooms}
            <br />
            <strong>Tenure:</strong> {property.tenure}
            <br />
            <strong>Date Added:</strong>{" "}
            {`${property.added.month} ${property.added.day}, ${property.added.year}`}
          </p>
          <Button
            variant="primary"
            className="w-100"
            onClick={() => addToFavorites(property)}
          >
            Add to Favorites
          </Button>
        </Col>
      </Row>
      <Tabs selectedIndex={activeTab} onSelect={(index) => setActiveTab(index)}>
        <TabList>
          <Tab>Description</Tab>
          <Tab>Floor Plan</Tab>
          <Tab>Map</Tab>
        </TabList>
        <TabPanel>
          <div
            className="property-description"
            dangerouslySetInnerHTML={{ __html: property.description }}
          />
        </TabPanel>
        <TabPanel>
          {/* Add your floor plan image when available */}
          <p>Floor plan coming soon</p>
        </TabPanel>
        <TabPanel>
          {/* Add your map iframe when available */}
          <p>Map location coming soon</p>
        </TabPanel>
      </Tabs>
    </Container>
  );
};

export default PropertyDetails;
