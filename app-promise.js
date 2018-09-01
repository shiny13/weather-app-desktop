const yargs = require('yargs');
const axios = require('axios');

const apikey = '395194af28c3277793ca60fab7e8ddf6';

const addressOptions = {
    describe: 'Address to fetch weather for',
    demand: false,
    alias: 'address',
    string: true
};
const defaultOptions = {
    describe: 'Default Address: 30 Rochester Street, Victoria 3019, Australia',
    demand: false,
    alias: 'default',
    string: true
};
const argv = yargs
                .options({
                    a: addressOptions,
                    d: defaultOptions
                })
                .help()
                .alias('help', 'h')
                .argv;

let address = '30 Rochester Street Victoria Australia';
debugger;
if (argv.address && argv.address !== '') {
    debugger;
    address = argv.address;
}

var excodedAddress = encodeURIComponent(address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(excodedAddress)}`

axios.get(geocodeUrl).then((response) => {
    debugger;
    if (response.data.status === "ZERO_RESULTS") {
        throw new Error('Unable to find that address');
    }

    var location = {
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
    };
    var weatherUrl = `https://api.darksky.net/forecast/${apikey}/${location.latitude},${location.longitude}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
}).then((response) => {
    debugger;
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It's currently ${temperature} and it feels like ${apparentTemperature}`);
}).catch((e) => {
    if (e.code === 'ENOTFOUND') {
        console.log('Unable to conenct to API servers');
    } else {
        console.log(e.message);
    }
});
