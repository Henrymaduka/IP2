var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: new google.maps.LatLng(0, 0),
        zoom: 2,
        mapTypeId: 'terrain'
    });

    map.data.loadGeoJson('airports.geojson');

    var infowindow = new google.maps.InfoWindow();
    map.data.addListener('click', function (event) {
        var airportInfo0 = event.feature.getProperty("name");
        var airportInfo1 = event.feature.getProperty("type");
        infowindow.setContent("<table style='width:100%; border-collapse: collapse;'>" +
            "<tr>"+
                "<td style='border: 1px solid; padding:8px; text-align: left;font-weight:bold;'>name:</td>" +
                "<td style='border: 1px solid; padding:8px; text-align: left;'>" + airportInfo0 + "</td>" +
            "</tr>"+

            "<tr>" + 
                "<td style='border: 1px solid; padding: 8px; text-align: left;font-weight:bold;'>type:</td>" +
                "<td style='border: 1px solid; padding: 8px; text-align: left;'>" + airportInfo1 + "</td>" +
            "</tr>"+
        "</table>");
        // position the infowindow on the marker
        infowindow.setPosition(event.feature.getGeometry().get());
        // anchor the infowindow on the marker
        infowindow.setOptions({
            pixelOffset: new google.maps.Size(0, -30)
        });
        infowindow.open(map);
    });

}
