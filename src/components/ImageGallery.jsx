import React, { useState } from 'react';
import { Image, Modal, Carousel } from 'react-bootstrap';

const ImageGallery = ({ images }) => {
  const [showModal, setShowModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClose = () => setShowModal(false);
  const handleShow = (index) => { //open the modal and set the active image index
    setActiveIndex(index);
    setShowModal(true);
  };

  return (
    <>
      <div className="d-flex flex-wrap">
        {images.map((image, index) => (
          <div key={index} className="m-2" style={{ width: '30%' }}>
            <Image
              src={image}
              alt={`Property image ${index + 1}`}
              thumbnail
              onClick={() => handleShow(index)}
              style={{ cursor: 'pointer' }}
            />
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={handleClose} size="lg" centered>
        <Modal.Body>
          <Carousel activeIndex={activeIndex} onSelect={(index) => setActiveIndex(index)}>
            {images.map((image, index) => (
              <Carousel.Item key={index}>
                <img 
                  className="d-block w-100" 
                  src={image} 
                  alt={`Property image ${index + 1}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ImageGallery;

