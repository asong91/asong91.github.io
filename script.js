import magnemite from './assets/magnemite/scene.gltf';

window.onload = () => {
     let places = staticLoadPlaces();
     console.log("places" + places)
     renderPlaces(places);
};

function dynamicLoadPlaces(){
    let lat, lng
    if ("geolocation" in navigator) {
        // Prompt user for permission to access their location
        coords = navigator.geolocation.getCurrentPosition(
          // Success callback function
          (position) => {
            // Get the user's latitude and longitude coordinates
            lat = position.coords.latitude;
            lng = position.coords.longitude;
      
            // Do something with the location data, e.g. display on a map
            console.log(`Latitude: ${lat}, longitude: ${lng}`);

            return {
                lat,
                lng
            }
          },
          // Error callback function
          (error) => {
            // Handle errors, e.g. user denied location sharing permissions
            console.error("Error getting user location:", error);
          }
        );
      } else {
        // Geolocation is not supported by the browser
        console.error("Geolocation is not supported by this browser.");
      }

      return [{lat, lng}];
}


function staticLoadPlaces() {
    return [
        {
            name: 'Magnemite',
            location: {
                lat: 33.086102,
                lng: -96.830721,
            }
        },
    ];
}

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');
    let coords = navigator.geolocation.getCurrentPosition((pos) => {
      return {
        lat: position.coords.latitude,
        long: position.coords.longitude
      }
    })
    places.forEach((place) => {
        let latitude = coords.lat;
        let longitude = coords.long;

        let model = document.createElement('a-entity');
        console.log(`Latitude: ${lat}, longitude: ${lng}`);
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        model.setAttribute('gltf-model', magnemite);
        model.setAttribute('rotation', '0 180 0');
        model.setAttribute('animation-mixer', '');
        model.setAttribute('scale', '0.5 0.5 0.5');

        model.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
        });

        scene.appendChild(model);
    });
}
