import React from 'react';

const PropertyMap = ({ location }) => {
  if (!location || !location.lat || !location.lng) {
    return <div className="text-center p-4">Location data not available</div>;
  }

  const googleMapsUrl = `https://maps.google.com/maps?q=${location.lat},${location.lng}&z=14&output=embed`;

  return (
    <div className="h-[500px] w-full rounded-lg overflow-hidden shadow-lg">
      <iframe
        title="Property Location"
        src={googleMapsUrl}
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ border: 0 }}
        allowFullScreen=""
        aria-hidden="false"
        tabIndex="0"
      />
    </div>
  );
};
export default PropertyMap