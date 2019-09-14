function selectedLocation() {
    selectedLocationURL = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + selectedLatitude + ',' + selectedLongitude + '&key=AIzaSyCUsqWQiU-SIFRi7Sd4HVtu5qDpwXq4KYE';

    $.ajax({
        url: selectedLocationURL,
        method: "GET"
    }).then(function (response) {
        console.log(response.results[0].address_components[2].long_name + ", " + response.results[0].address_components[4].long_name +  ", " + response.results[0].address_components[5].long_name);
    }
    )
}