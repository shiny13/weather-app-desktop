const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const addressOptions = {
    describe: 'Address to fetch weather for',
    demand: true,
    alias: 'address',
    string: true
};
const argv = yargs
                .options({
                    a: addressOptions
                })
                .help()
                .alias('help', 'h')
                .argv;

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(`Address: ${argv.address}`);
        console.log(JSON.stringify(results, undefined, 2));
        //lat, lng, callback
        weather.getWeather({
            latitude: results.latitude,
            longitude: results.longitude
        }, (errorWeather, temp) => {
            if (errorWeather) {
                console.log(errorWeather);
            } else {
                console.log(`In ${results.address}, it's currently ${temp.temperature} F but feels like ${temp.apparentTemperature} F`);
            }
        });
    }
});

