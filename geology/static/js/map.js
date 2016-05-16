(function() {
    var loc = $("#location");
    var rocks = $("#rocks");

    var getLocation = function() {
        console.log("getLocation")
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(handlePosition);
            } else {
                loc.html("GeoLocation not supported");
            }
        }
        
    var handlePosition = function(position) {
        // Force Colorado coordinates

        // var lat = 39.80526;
        // var lon = -105.20925;

        // var lat = 38.2841;
        // var lon = -104.6752;

        // Actual localization
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        $.get(url, {"lat": lat,
                    "lon": lon },
                    function(data) {
                        rocks.empty();
                        $.each(data.features, function(index, val) {
                            var name = val.properties.name;
                            var description = val.properties.description;
                            rocks.append(name);
                            rocks.append(description);
                            makeMap(val, lon, lat);
                        });
                    });
        }

    var featurePopup = function(feature, layer) {
            var popupContent = feature.properties.name;

            if (feature.properties && feature.properties.popupContent) {
                popupContent += feature.properties.popupContent;
            }

            layer.bindPopup(popupContent);
        }



    var makeMap = function(feature, lon, lat) {
        var map = L.map('map').setView([lat, lon], 13);

        //Unit
        var unit = L.geoJson(feature, {
            onEachFeature: featurePopup
        }).addTo(map);

        //OSM layer
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.satellite',
            accessToken: 'pk.eyJ1Ijoicm1hbGxlcm1hcnRpbnMiLCJhIjoiY2ltdzJlb2xwMDMxdXY5a2s5b3owdzh5ZiJ9.uiFCUJZqiWu7YW7cGp-8Aw'
        }).addTo(map);

        // Marker
        L.marker([lat, lon]).addTo(map)
            .bindPopup(feature.properties.name)
            .openPopup();
    }

    getLocation();
})();
