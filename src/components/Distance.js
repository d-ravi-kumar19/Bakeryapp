import React, { useState } from 'react';
import Map from './Map';

function Distance() {
  const [userLocation, setUserLocation] = useState(null);
  const [distance, setDistance] = useState('');

  const sourceLocation = {
    //Bakery location coordinates
    latitude: 37.12345, 
    longitude: -122.67890, 
  };

  const handleLocationSelection = (selectedLocation) => {
    setUserLocation(selectedLocation);
  };

  const handleDistanceCalculation = async () => {
    try {
      const response = await fetch(
        `/distance?originLat=${userLocation.latitude}&originLng=${userLocation.longitude}&destLat=${sourceLocation.latitude}&destLng=${sourceLocation.longitude}`
      );
      const data = await response.json();
      setDistance(data.distance);
    } catch (error) {
      console.error('Distance calculation error:', error);
    }
  };

  return (
    <div>
      <h1>Order Delivery</h1>
      <Map onLocationSelect={handleLocationSelection} />
      {userLocation && (
        <div>
          <p>Chosen Location:</p>
          <p>Latitude: {userLocation.latitude}</p>
          <p>Longitude: {userLocation.longitude}</p>
          <button onClick={handleDistanceCalculation}>Check Delivery</button>
        </div>
      )}
      {distance !== '' && (
        <div>
          {distance <= 30 ? (
            <p>Order is deliverable!</p>
          ) : (
            <p>Can't deliver .Please Self pickup</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Distance;
