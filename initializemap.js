var map;  // Declare map globally
var currentMarker; // Global variable to store the current marker


function initializeMap() {
    var defaultLocation = [51.505, -0.09]; // Example default location (London)
    var zoomlevel = 13; //Zoom level 0: Shows the entire world map (zoomed out).Zoom level 13: A more detailed zoom, typically showing a city or a large town. Zoom level 19 (or higher): Shows detailed street-level view (zoomed in).
     map = L.map('map').setView(defaultLocation, zoomlevel); // Create the map with default view

     // Add the marker
    var marker = L.marker(defaultLocation).addTo(map);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);

 console.log("Map successfully initialized:", map);
}

// Run the map initialization when the page is fully loaded
window.onload = function() {
    initializeMap();  // Initialize the map when the page loads
    console.log("Map should now be initialized")
};
