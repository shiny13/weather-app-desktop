const request = require('request');

const apikey = '395194af28c3277793ca60fab7e8ddf6';

var getWeather = (location, callback) => {
    let url = `https://api.darksky.net/forecast/${apikey}/${location.latitude},${location.longitude}`;
    request({
        url: url,
        json: true  
    }, (error, response, body) => {
        if (error) {
            callback('Error while connecting to forecast.io server');
        } else if (response.statusCode === 400) 
        {
            callback('Unable to fetch weather.');
        } else if (!error && response.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        } else {
            callback('Unable to retrieve weather');
        }
    });
};

module.exports = {
    getWeather
}