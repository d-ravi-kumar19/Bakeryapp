//works for maps distance calculation
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Map= () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const sourceLocation = { lat:17.488113, lng: 78.484666 };
  const deliveryThreshold = 30; 
  const handleMapClick = (event) => {
    setSelectedLocation({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadius = 6371; 
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
  
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;
  
    return distance; 
  }
  

  const canDeliverOrder = () => {
    if (selectedLocation) {
      const distance = calculateDistance(
        sourceLocation.lat,
        sourceLocation.lng,
        selectedLocation.lat,
        selectedLocation.lng
      );

      return distance <= deliveryThreshold;
    }
    return false;
  };

  return (
    <div className='' style={{marginTop:'80px',marginLeft:'30px'}} >
      <LoadScript googleMapsApiKey=process.env.GOOGLEMAPS_API_KEY >
      <GoogleMap
        mapContainerStyle={{ height: '400px', width: '400px' }}
        center={sourceLocation}
        zoom={10}
        onClick={handleMapClick}
      >
        {selectedLocation && <Marker position={selectedLocation} />}
      </GoogleMap>
      {selectedLocation && (
        <div>
          {canDeliverOrder() ? (
            <p className='text-center fs-5  pt-3'>Order can be delivered.</p>
          ) : (
            <p className='text-center fs-5 pt-3'>Sorry We cannot deliver to this location.</p>
          )}
        </div>
      )}
    </LoadScript>
    </div>
    
  );
};

export default Map;

//user geolocation access method
// import React, { useState, useEffect } from 'react';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// const Map = () => {
//   const [userLocation, setUserLocation] = useState(null);
//   const sourceLocation = { lat: 17.488113, lng: 78.484666  };
//   const deliveryThreshold = 30; 

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setUserLocation({
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           });
//         },
//         (error) => {
//           console.error('Error getting user location:', error);
//         }
//       );
//     } else {
//       console.error('Geolocation is not supported by this browser.');
//     }
//   }, []);

// function calculateDistance(lat1, lon1, lat2, lon2) {
//   const earthRadius = 6371; 
//   const dLat = ((lat2 - lat1) * Math.PI) / 180;
//   const dLon = ((lon2 - lon1) * Math.PI) / 180;

//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos((lat1 * Math.PI) / 180) *
//       Math.cos((lat2 * Math.PI) / 180) *
//       Math.sin(dLon / 2) *
//       Math.sin(dLon / 2);

//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   const distance = earthRadius * c;

//   return distance; 
// }
//   const canDeliverOrder = () => {
//     if (userLocation) {
//       const distance = calculateDistance(
//         sourceLocation.lat,
//         sourceLocation.lng,
//         userLocation.lat,
//         userLocation.lng
//       );

//       return distance <= deliveryThreshold;
//     }
//     return false;
//   };

//   return (
//     <LoadScript googleMapsApiKey="AIzaSyBst5XJW9XhdMRGrrIV_7T1iBDeyPiBtLw">
//       <GoogleMap
//         mapContainerStyle={{ height: '400px', width: '100%' }}
//         center={userLocation || sourceLocation}
//         zoom={10}
//       >
//         {userLocation && <Marker position={userLocation} />}
//       </GoogleMap>
//       {userLocation && (
//         <div>
//           <p>Your Location: {userLocation.lat}, {userLocation.lng}</p>
//           {canDeliverOrder() ? (
//             <p>Order can be delivered.</p>
//           ) : (
//             <p>Sorry, we cannot deliver to this location.</p>
//           )}
//         </div>
//       )}
//     </LoadScript>
//   );
// };

// export default Map;


//user location choosing and default accessing
// import React, { useState, useEffect } from 'react';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// const Map = () => {
//   const [userLocation, setUserLocation] = useState(null);
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const sourceLocation = { lat: 17.488113, lng: 78.484666  };
//   const deliveryThreshold = 30; 

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setUserLocation({
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           });
//           setSelectedLocation({
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           });
//         },
//         (error) => {
//           console.error('Error getting user location:', error);
//         }
//       );
//     } else {
//       console.error('Geolocation is not supported by this browser.');
//     }
//   }, []);

//   function calculateDistance(lat1, lon1, lat2, lon2) {
//     const earthRadius = 6371; 
//     const dLat = ((lat2 - lat1) * Math.PI) / 180;
//     const dLon = ((lon2 - lon1) * Math.PI) / 180;
  
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos((lat1 * Math.PI) / 180) *
//         Math.cos((lat2 * Math.PI) / 180) *
//         Math.sin(dLon / 2) *
//         Math.sin(dLon / 2);
  
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     const distance = earthRadius * c;
  
//     return distance; 
//   }

//   const canDeliverOrder = () => {
//     if (selectedLocation) {
//       const distance = calculateDistance(
//         sourceLocation.lat,
//         sourceLocation.lng,
//         selectedLocation.lat,
//         selectedLocation.lng
//       );

//       return distance <= deliveryThreshold;
//     }
//     return false;
//   };

//   const handleMapClick = (event) => {
//     setSelectedLocation({
//       lat: event.latLng.lat(),
//       lng: event.latLng.lng(),
//     });
//   };

//   return (
//     <LoadScript googleMapsApiKey="AIzaSyBst5XJW9XhdMRGrrIV_7T1iBDeyPiBtLw">
//       <GoogleMap
//         mapContainerStyle={{ height: '400px', width: '100%' }}
//         center={userLocation || sourceLocation}
//         zoom={10}
//         onClick={handleMapClick}
//       >
//         {selectedLocation && <Marker position={selectedLocation} />}
//       </GoogleMap>
//       {userLocation && (
//         <div>
//           <p>Your Location: {userLocation.lat}, {userLocation.lng}</p>
//         </div>
//       )}
//       {selectedLocation && (
//         <div>
//           <p>Selected Location: {selectedLocation.lat}, {selectedLocation.lng}</p>
//           {canDeliverOrder() ? (
//             <p>Order can be delivered.</p>
//           ) : (
//             <p>Sorry we cannot deliver to this location.</p>
//           )}
//         </div>
//       )}
//     </LoadScript>
//   );
// };

// export default Map;
