import React from 'react';

const AboutUs = () => {
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-8 mx-auto text-center">
          <h1 className="display-4 mb-4">About Us</h1>
          <p className="lead mb-5">
            Welcome to our real estate platform. We are dedicated to helping you find
            your perfect property with ease and confidence.
          </p>
        </div>
      </div>
      
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card text-center">
            <img 
              src="/Images/WhatsApp Image 2024-10-30 at 13.57.17.jpeg" 
              className="card-img-top rounded-circle mx-auto mt-3" 
              style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              alt="Team member"
            />
            <div className="card-body">
              <h5 className="card-title">Kalindu Wijesinghe</h5>
              <p className="card-text">CEO & Founder</p>
            </div>
          </div>
        </div>
        {/*  team members */}
      </div>
    </div>
  );
};

export default AboutUs;