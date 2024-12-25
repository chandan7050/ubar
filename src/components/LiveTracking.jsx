// import React, { useState, useEffect } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';

// import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png?url';
// import markerIcon from 'leaflet/dist/images/marker-icon.png?url';
// import markerShadow from 'leaflet/dist/images/marker-shadow.png?url';

// const containerStyle = {
//     width: '100%',
//     height: '100%',
// };

// // Custom marker icon (Leaflet needs this)
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//     iconRetinaUrl: markerIcon2x,
//     iconUrl: markerIcon,
//     shadowUrl: markerShadow,
// });

// const LiveTracking = () => {
//     const [currentPosition, setCurrentPosition] = useState({ lat: 20.5937, lng: 78.9629 });
//     const [locationName, setLocationName] = useState('Fetching location...');

//     useEffect(() => {
//         let watchId;

//         if (navigator.geolocation) {
//             watchId = navigator.geolocation.watchPosition(
//                 (position) => {
//                     const { latitude, longitude } = position.coords;
//                     if (latitude && longitude) {
//                         setCurrentPosition({ lat: latitude, lng: longitude });
//                         getLocationName(latitude, longitude);
//                     }
//                 }, 
//                 (error) => console.error('Error getting location:', error.message)
//             );
//         }

//         return () => {
//             if (watchId) {
//                 navigator.geolocation.clearWatch(watchId);
//             }
//         };
//     }, []);

//     // Function to get location name from latitude and longitude using OpenCage API
//     const getLocationName = async (latitude, longitude) => {
//         const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY;
//         try {
//             const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${apiKey}`);
//             const data = await response.json();
//             if (data?.results?.[0]?.formatted) {
//                 setLocationName(data.results[0].formatted);
//             } else {
//                 setLocationName('Location not found');
//             }
//         } catch (error) {
//             setLocationName('Error fetching location');
//         }
//     };

//     return (
//         <div style={containerStyle}>
//             <MapContainer 
//                 center={currentPosition} 
//                 zoom={15} 
//                 scrollWheelZoom={false} 
//                 style={{ height: '100%', width: '100%' }}
//             >
//                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//                 <Marker position={currentPosition}>
//                     <Popup>
//                         <strong>Current Location:</strong> {locationName}
//                     </Popup>
//                 </Marker>
//             </MapContainer>
//         </div>
//     );
// };

// export default LiveTracking;


// // import React, { useState, useEffect } from 'react';
// // import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';

// // const containerStyle = {
// //     width: '100%',
// //     height: '100%',
// // };

// // const center = {
// //     lat: -3.745,
// //     lng: -38.523
// // };

// // const LiveTracking = () => {
// //     const [currentPosition, setCurrentPosition] = useState(center);
// //     const [error, setError] = useState(null);

// //     useEffect(() => {
// //         // Fetch current position using OpenCage API
// //         navigator.geolocation.getCurrentPosition(
// //             async (position) => {
// //                 const { latitude, longitude } = position.coords;
                
// //                 // OpenCage Geocoder API call
// //                 try {
// //                     const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY;
// //                     const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`);
// //                     const data = await response.json();
                    
// //                     if (data.results && data.results.length > 0) {
// //                         // You can use the location details here, for now we'll set the position
// //                         setCurrentPosition({
// //                             lat: latitude,
// //                             lng: longitude,
// //                         });
// //                     }
// //                 } catch (err) {
// //                     setError('Error fetching location');
// //                     console.error('Error fetching location:', err);
// //                 }
// //             },
// //             (err) => {
// //                 setError('Error getting location');
// //                 console.error('Error getting location:', err);
// //             }
// //         );

// //         const watchId = navigator.geolocation.watchPosition(
// //             async (position) => {
// //                 const { latitude, longitude } = position.coords;

// //                 // OpenCage API update location
// //                 try {
// //                     const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY;
// //                     const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`);
// //                     const data = await response.json();

// //                     if (data.results && data.results.length > 0) {
// //                         setCurrentPosition({
// //                             lat: latitude,
// //                             lng: longitude,
// //                         });
// //                     }
// //                 } catch (err) {
// //                     console.error('Error updating location:', err);
// //                 }
// //             },
// //             (err) => {
// //                 setError('Error getting location');
// //                 console.error('Error getting location:', err);
// //             }
// //         );

// //         return () => navigator.geolocation.clearWatch(watchId);
// //     }, []);

// //     useEffect(() => {
// //         const updatePosition = async () => {
// //             navigator.geolocation.getCurrentPosition(async (position) => {
// //                 const { latitude, longitude } = position.coords;

// //                 console.log('Position updated:', latitude, longitude);

// //                 // OpenCage API for updated position
// //                 try {
// //                     const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY;
// //                     const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`);
// //                     const data = await response.json();

// //                     if (data.results && data.results.length > 0) {
// //                         setCurrentPosition({
// //                             lat: latitude,
// //                             lng: longitude,
// //                         });
// //                     }
// //                 } catch (err) {
// //                     console.error('Error updating location:', err);
// //                 }
// //             });
// //         };

// //         updatePosition(); // Initial position update

// //         const intervalId = setInterval(updatePosition, 10000); // Update every 10 seconds

// //         return () => clearInterval(intervalId);
// //     }, []);

// //     return (
// //         <div>
// //             {error && <div>Error: {error}</div>}
// //             <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
// //                 <GoogleMap
// //                     mapContainerStyle={containerStyle}
// //                     center={currentPosition}
// //                     zoom={15}
// //                 >
// //                     <Marker position={currentPosition} />
// //                 </GoogleMap>
// //             </LoadScript>
// //         </div>
// //     );
// // };

// // export default LiveTracking;


// // import React, { useState, useEffect } from 'react';
// // import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';

// // const containerStyle = {
// //   width: '100%',
// //   height: '100%',
// // };

// // const center = {
// //   lat: 51.5074, // Default to London
// //   lng: -0.1278,
// // };

// // const LiveTracking = () => {
// //   const [currentPosition, setCurrentPosition] = useState(center);

// //   useEffect(() => {
// //     // Get current geolocation
// //     navigator.geolocation.getCurrentPosition(
// //       (position) => {
// //         const { latitude, longitude } = position.coords;
// //         setCurrentPosition({
// //           lat: latitude,
// //           lng: longitude,
// //         });

// //         // Call OpenCage API for reverse geocoding
// //         fetchOpenCageData(latitude, longitude);
// //       },
// //       (error) => {
// //         console.error('Error getting location:', error);
// //       }
// //     );
// //   }, []);

// //   const fetchOpenCageData = async (lat, lng) => {
// //     const apiKey = "7ee2a2a0f8bb47a5b6e1450337898dc5";
// //     console.log("this my api kry ", apiKey);
    
// //   // Replace with your OpenCage API Key
// //     const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`;

// //     try {
// //       const response = await fetch(url);
// //       const data = await response.json();
// //       console.log(data); // Here you can access the location details
// //     } catch (error) {
// //       console.error('Error fetching data from OpenCage:', error);
// //     }
// //   };

// //   return (
// //     <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY"> {/* Replace with your Google Maps API Key */}
// //       <GoogleMap
// //         mapContainerStyle={containerStyle}
// //         center={currentPosition}
// //         zoom={15}
// //       >
// //         <Marker position={currentPosition} />
// //       </GoogleMap>
// //     </LoadScript>
// //   );
// // };

// // export default LiveTracking;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import axiosInstace from '../utlis/axiosinstace'

const LiveTracking = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    // OpenCage API key (replace with your actual OpenCage API key)
    const OPEN_CAGE_API_KEY = '7ee2a2a0f8bb47a5b6e1450337898dc5'

    // Fetching the location based on latitude and longitude
    const fetchLocation = async () => {
      try {
        const latitude = 13.0875;  // Replace with dynamic latitude if needed
        const longitude = 80.2047; // Replace with dynamic longitude if needed

        const response = await axios.get(
          `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${OPEN_CAGE_API_KEY}`
        );

        if (response.data.status.code === 200) {
          setLocation(response.data.results[0].formatted);
        } else {
          console.log('Error fetching location:', response.data.status.message);
        }
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };

    fetchLocation();
  }, []);

  return (
    <div>
      <h1>Live Location</h1>
      {location ? (
        <p>Location: {location}</p>
      ) : (
        <p>Loading location...</p>
      )}
    </div>
  );
};

export default LiveTracking;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconUrl: '/leaflet/marker-icon.png',
//   iconRetinaUrl: '/leaflet/marker-icon-2x.png',
//   shadowUrl: '/leaflet/marker-shadow.png'
// });
// const LiveTracking = () => {

// // Set the default icon for the marker


//   const [location, setLocation] = useState();
//   const [lat, setLat] = useState(13.0875);  // Default latitude
//   const [lng, setLng] = useState(80.2047);  // Default longitude

//   useEffect(() => {
//     const OPEN_CAGE_API_KEY = '7ee2a2a0f8bb47a5b6e1450337898dc5';
    
//     const fetchLocation = async () => {
//       try {
//         const response = await axios.get(
//           `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${OPEN_CAGE_API_KEY}`
//         );

//         if (response.data.status.code === 200) {
//           setLocation(response.data.results[0].formatted);
//         } else {
//           console.log('Error fetching location:', response.data.status.message);
//         }
//       } catch (error) {
//         console.error('Error fetching location:', error);
//       }
//     };

//     fetchLocation();
//   }, [lat, lng]);

//   return (
//     <div>
//       <h1>Live Location</h1>
//       {location ? (
//         <p>Location: {location}</p>
//       ) : (
//         <p>Loading location...</p>
//       )}

//       <MapContainer center={[lat, lng]} zoom={13} style={{ width: '100%', height: '500px' }}>
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <Marker position={[lat, lng]}>
//           <Popup>{location}</Popup>
//         </Marker>
//       </MapContainer>
//     </div>
//   );
// };

// export default LiveTracking;
