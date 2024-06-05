import React, { useEffect } from 'react';
import L from 'leaflet';

const SelectPoint = () => {
  useEffect(() => {
    const mapOptions = {
      center: [51.958, 9.141],
      zoom: 10
    };

    const map = L.map('map', mapOptions);

    const layer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    map.addLayer(layer);

    let marker = null;
    map.on('click', (event) => {
      if (marker !== null) {
        map.removeLayer(marker);
      }
      marker = L.marker([event.latlng.lat, event.latlng.lng]).addTo(map);

      document.getElementById('latitude').value = event.latlng.lat;
      document.getElementById('longitude').value = event.latlng.lng;
    });

    
    return () => {
      map.off();
    };
  }, []);

  return (
    <div className="wrap">
      <form action="" className="form">
        <input type="text" id="latitude" placeholder="latitude" />
        <input type="text" id="longitude" placeholder="longitude" />
      </form>
      <div id="map"></div>
    </div>
  );
};

export default SelectPoint;