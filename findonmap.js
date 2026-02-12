function findonMap() {
    if (!map) {
        console.error('Map is not initialized');
        return;
    }

    const latRaw = document.getElementById('lat').value;
    const longRaw = document.getElementById('long').value;
    let lat = Number(latRaw);
    let long = Number(longRaw);

    if (!Number.isFinite(lat) || !Number.isFinite(long)) {
        alert('Please enter valid latitude and longitude values!');
        return;
    }

    if (lat < -90 || lat > 90 || long < -180 || long > 180) {
        alert('Latitude must be between -90 and 90, and longitude between -180 and 180.');
        return;
    }

    // Keep values readable for kids without losing directionality.
    lat = Number(lat.toFixed(2));
    long = Number(long.toFixed(2));

    const newLocation = [lat, long];
    map.setView(newLocation, 3);

    if (currentMarker) {
        map.removeLayer(currentMarker);
        currentMarker = null;
    }

    currentMarker = L.marker(newLocation).addTo(map)
        .bindPopup(`You are here: Latitude ${lat}, Longitude ${long}.`)
        .openPopup();

    fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${long}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Reverse geocoding failed with status ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            const country = data && data.address ? data.address.country : null;
            const locationText = country
                ? `which is in ${country}!`
                : `that seems to be in water or an unnamed place.`;
            currentMarker
                .bindPopup(`You are here: Latitude ${lat}, Longitude ${long}, ${locationText}`)
                .openPopup();
        })
        .catch((error) => {
            console.error('Error fetching place details:', error);
            currentMarker
                .bindPopup(`You are here: Latitude ${lat}, Longitude ${long}. This place may be in water.`)
                .openPopup();
        });
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
