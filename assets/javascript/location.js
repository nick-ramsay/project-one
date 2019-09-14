function selectedLocation() {
    selectedLocationURL = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + selectedLatitude + ',' + selectedLongitude + '&key=AIzaSyCUsqWQiU-SIFRi7Sd4HVtu5qDpwXq4KYE';

    $.ajax({
        url: selectedLocationURL,
        method: "GET"
    }).then(function (response) {
        $("#selectedLocation").text("Location: " + response.results[0].formatted_address);
    }
    )
}