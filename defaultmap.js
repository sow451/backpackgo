function defaultMap() {
    var defaultLocation = [51.505, -0.09]; // Default location (same as initializeMap)
    var zoomlevel = 13; //Zoom level 0: Shows the entire world map (zoomed out).Zoom level 13: A more detailed zoom, typically showing a city or a large town. Zoom level 19 (or higher): Shows detailed street-level view (zoomed in).


    map.setView(defaultLocation, zoomlevel); // Reset the map to default location
    
    // Remove the existing marker if needed
        if (currentMarker) {
            map.removeLayer(currentMarker);
        }
    
}

    // Optionally, clear any added markers or layers if needed
function clearInputs() {
    document.getElementById('lat').value = '';  // Clear the latitude input
    document.getElementById('long').value = ''; // Clear the longitude input
    console.log(`Values cleared`)
}
