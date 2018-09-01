const request = require('request');

var geocodeAddress = (address, callback) => {
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`,
        json: true
    }, (error, response, body) => {
        
        if (error) {
            //console.log('Unable to connect to google servers.');
            callback('Unable to connect to google servers.');
        } else if (body.status === "ZERO_RESULTS") {
            //console.log('Unable to find the address.');
            callback('Unable to find the address.');
        } else if (body.status === "OK") {
            // console.log(`Address: ${body.results[0].formatted_address}`);
            // console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
            // console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
        }
    });
}

module.exports = {
    geocodeAddress
};