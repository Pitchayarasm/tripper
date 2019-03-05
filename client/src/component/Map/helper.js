export function load_google_maps() {
    return new Promise(function(resolve, reject) {
      // define the global callback that will run when google maps is loaded
      window.resolveGoogleMapsPromise = function() {
        // resolve the google object
        resolve(window.google);
        // delete the global callback to tidy up since it is no longer needed
        delete window.resolveGoogleMapsPromise;
      }
      // Now, Load the Google Maps API
      const script = document.createElement("script");
      const API_KEY = "AIzaSyCsd5GbDBaiJBZ94ei5j9hfU1Cy6TRP6Ws";
      script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=${API_KEY}&callback=resolveGoogleMapsPromise`;
      script.async = true;
      document.body.appendChild(script);
    });
  }