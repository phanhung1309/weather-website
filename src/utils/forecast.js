const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=619a3c7c57697af08f2bf9941c1bedb3&query=${latitude},${longitude}`
    request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
        callback('Unable to connect to weather services!', undefined)
    } else if (body.error) {
        callback('Unable to find the location', undefined)
    } else {
        callback(undefined, {
            currentTemperature: body.current.temperature,
            feelslike: body.current.feelslike,
            weather_desc: body.current.weather_descriptions[0],
            observation_time: body.current.observation_time,
            humidity: body.current.humidity,
            uv_index: body.current.uv_index,
            localTime: body.location.localtime
        })
    }
})
}

module.exports = forecast