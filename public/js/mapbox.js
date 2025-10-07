console.log("Hellow from client side");

const locations = JSON.parse(document.getElementById('map').dataset.locations);

mapboxgl.accessToken = 'pk.eyJ1IjoiaXNoYWtraWxvd290dCIsImEiOiJjbWc3dmY3NjUwMG9sMmtzOGlkdHl6ZDR3In0.NkCIFDQ2fo32TfapI9dGow';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/standard',
  center: [locations[0].coordinates[0], locations[0].coordinates[1]],
  zoom: 5
});

// Add markers
locations.forEach(loc => {
  new mapboxgl.Marker()
    .setLngLat(loc.coordinates)
    .addTo(map);
});
