import 'https://api.mapbox.com/mapbox-gl-js/v1.10.1/mapbox-gl.js';

const mapbox_pk = "pk.eyJ1IjoiYm9sb3J1bmR1cm92YiIsImEiOiJja2IzbGNuZGgwNm9mMzRwYjl6dmUwODM4In0.2OdiViNQQSyOlMuQA__jcg";

mapboxgl.accessToken = mapbox_pk;
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
zoom: 3.15,
center: [-2, 10],
});

const getColorFromCount = count => {
    if(count >= 1000){
        return "red";
    }
    if(count >= 100){
        return "blue";
    }
    return "gray";
}

// fetch("https://ncovid19api.herokuapp.com/geojson")
//   .then((response) => response.json())
//   .then((data) => {
//     data.forEach(country => {
//         console.log(country.properties.confirmed);

//         new mapboxgl.Marker({
//             draggable: false,
//             color: getColorFromCount(country.properties.confirmed)
//             })
//             .setLngLat(country.geometry.coordinates)
//             .addTo(map);
        
//     });
//   });

fetch("https://ncovid19api.herokuapp.com/geojson")
  .then((response) => response.json())
  .then((data) => {
      data.forEach(property => {
          property.properties.icon = 'theatre';
          console.log(property);
          
          
      });
    
    map.on('load', function() {
        map.addSource('places', {
        'type': 'geojson',
        'data': {
        'type': 'FeatureCollection',
        'features': data
        }
        });
         
        // Add a layer showing the places.
        map.addLayer({
        'id': 'places',
        'type': 'symbol',
        'source': 'places',
        
        'layout': {
        'icon-image': '{icon}-15',
        'icon-allow-overlap': true,
        'icon-size': 2
        }
        });
         
        // Create a popup, but don't add it to the map yet.
        var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
        });
         
        map.on('mouseenter', 'places', function(e) {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';
         
        var coordinates = e.features[0].geometry.coordinates.slice();
        var confirmed ="Confirmed:" + e.features[0].properties.confirmed + "<br>";
        var deaths ="Deaths:" + e.features[0].properties.deaths;
        var name ="Place:" + '<b>' + e.features[0].properties.name + '</b>' + "<br>";
         
        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
         
        // Populate the popup and set its coordinates
        // based on the feature found.
        popup
        .setLngLat(coordinates)
        .setHTML(name + confirmed + deaths)
        .addTo(map);
        });
         
        map.on('mouseleave', 'places', function() {
        map.getCanvas().style.cursor = '';
        popup.remove();
        });
        });    

    });

