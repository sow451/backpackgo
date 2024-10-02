function findonMap() {
    if (map) {

        var lat = parseFloat(document.getElementById('lat').value);
        var long = parseFloat(document.getElementById('long').value);

        if (!isNaN(lat) && !isNaN(long)) {
            // Format latitude and longitude to xx.yy format (2 decimal places). This can convert to string, so make it parseFloat again
            // Clear the existing marker if it exists
            if (currentMarker) {
                map.removeLayer(currentMarker); // Remove the existing marker
            }
            
            lat = parseFloat(lat.toFixed(2));
            long = parseFloat(long.toFixed(2));

            var newLocation = [lat, long];
            map.setView(newLocation, 3); // Update the map to center at the new location

            // Add the marker immediately
            currentMarker = L.marker(newLocation).addTo(map)
            .bindPopup(`You are here: Latitude:${lat}, Longitude:${long}`)
            .openPopup();


            // Reverse Geocoding API call using Nominatim
            fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${long}`)
                .then(response => response.json())
                .then(data => {
                    // Extract the country name from the response
                    var country = data.address.country;
                    
                    // Add a new marker for the new location and store it in the global variable
                    currentMarker =   L.marker(newLocation).addTo(map)
                        .bindPopup(`You are here: Latitude:${lat}, Longitude:${long} which is in ${country}!`)
                        .openPopup();
                })
                .catch(error => {
                    console.error('Error fetching country:', error);
                    alert(`You're in the water – hope you can swim!`);
                });
        
            } else {
            alert('Please enter valid latitude and longitude values!');
        }

    } else {
        console.error('Map is not initialized');
    }
}



                //     // If no country is found, try fetching ocean data
                //     fetch(`https://www.marineregions.org/rest/getGazetteerRecordsByLatLon.json/${lat}/${long}`)
                //         .then(response => response.json())
                //         .then(data => {
                //             // Extract the ocean-related info from the response 
                //             if (data && data.length > 0) {
                //                 var ocean = data[0].preferredGazetteerName;
                //                 // Add a marker for the new location
                //                 L.marker(newLocation).addTo(map)
                //                     .bindPopup(`You are here: Latitude:${lat}, Longitude:${long} which is in ${ocean}!`)
                //                     .openPopup();
                //             } else {
                //                 // No ocean data found
                //                 alert(`You're in the water – hope you can swim!`);
                //             }
                //         })
                //         .catch(error => {
                //             console.error('Error fetching ocean name:', error);
                //         });
                // });