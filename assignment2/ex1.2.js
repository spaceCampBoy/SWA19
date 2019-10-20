const XMLHttpRequest = this.XMLHttpRequest || require('xmlhttprequest').XMLHttpRequest
const fetch = this.fetch || require('node-fetch')

// a)	Using XmlHttpRequest with callbacks
function xhrWeather(historicOrForecast, place, callback) {
    const request = new XMLHttpRequest();
    request.addEventListener('load', () => callback(JSON.parse(request.responseText), "XmlHttpRequest"))
    request.open('GET', `http://localhost:8080/${historicOrForecast}/${place}`)
    request.send()
}


// b)	Using fetch with promises
function fetchWeather(historicOrForecast, place, callback) {
    let promise = fetch(`http://localhost:8080/${historicOrForecast}/${place}`)
        .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
    promise.then(res => callback(res, "Fetch"))
}



xhrWeather("Data", "Horsens", logdata)
xhrWeather("Forecast", "Horsens", logForecast)
xhrWeather("Data", "Aarhus", logdata)
xhrWeather("Forecast", "Aarhus", logForecast)
xhrWeather("Data", "Copenhagen", logdata)
xhrWeather("Forecast", "Copenhagen", logForecast)



fetchWeather("Data", "Horsens", logdata)
fetchWeather("Forecast", "Horsens", logForecast)
fetchWeather("Data", "Aarhus", logdata)
fetchWeather("Forecast", "Aarhus", logForecast)
fetchWeather("Data", "Copenhagen", logdata)
fetchWeather("Forecast", "Copenhagen", logForecast)




function logdata(data, typeOfMethod) {
    console.log("****************************************************************************************")
    console.log(" Using " + typeOfMethod)
    console.log("************************************* Weather Data for " + data[0].place + "**********************************")
    console.log("****************************************************************************************")
    console.log("All data for the latest measurement of each kind")
    let latestMeasurementDate = data.reduce(((acc, e) => e.time > acc ? e.time : acc), data[0].time)
    console.log(data.filter(e => e.time == latestMeasurementDate))


    console.log("______________________________________________")
    console.log("**********************************************")
    console.log("Minimum temperature for the last 5 days")
    console.log("______________________________________________")

    let fiveDayBeforeDate = new Date()
    fiveDayBeforeDate.setDate(fiveDayBeforeDate.getDate() - 5)
    fiveDayBeforeDate = fiveDayBeforeDate.toISOString()

    let last5DaysTemperatures = data.filter(e => e.type === "temperature" && e.time >= fiveDayBeforeDate)
    let minTemperature = last5DaysTemperatures.reduce((acc, e) => e.value < acc ? e.value : acc, 0)
    console.log(minTemperature)

    console.log("______________________________________________")
    console.log("**********************************************")
    console.log("Maximum temperature for the last 5 days")
    console.log("______________________________________________")

    let maxTemperature = last5DaysTemperatures.reduce((acc, e) => e.value > acc ? e.value : acc, 0)
    console.log(maxTemperature)

    console.log("______________________________________________")
    console.log("**********************************************")
    console.log("Total precipitation for the last 5 days")
    console.log("______________________________________________")

    let last5DaysPrecipitation = data.filter(e => e.type === "precipitation" && e.time >= fiveDayBeforeDate)
    let totalPrecipitation = last5DaysPrecipitation.reduce((acc, e) => e.value + acc, 0)
    console.log(totalPrecipitation)

    console.log("______________________________________________")
    console.log("**********************************************")
    console.log("Average wind speed for the last 5 days")
    console.log("______________________________________________")
    let last5DaysWinds = data.filter(e => e.type === "wind speed" && e.time >= fiveDayBeforeDate)
    let averageWindSpeed = last5DaysWinds.reduce((sum, wind) => sum + wind.value, 0) / last5DaysWinds.length
    console.log(averageWindSpeed)


    console.log("______________________________________________")
    console.log("**********************************************")
    console.log("Dominant wind direction for the last 5 days")
    console.log("______________________________________________")
    let dominantDirection = NaN
    let maxOccurances = 0
    last5DaysWinds.reduce((acc, curr) => {
        let d = curr.direction
        if (d in acc) {
            acc[d]++;
        } else {
            acc[d] = 1;
        }

        if (maxOccurances < acc[d]) {
            maxOccurances = acc[d];
            dominantDirection = d;
        }
        return acc;
    }, {});
    console.log(dominantDirection + " with total number of occurances: " + maxOccurances)


    console.log("______________________________________________")
    console.log("**********************************************")
    console.log("Average cloud coverage for the last 5 days")
    console.log("______________________________________________")
    let last5DaysClouds = data.filter(e => e.type === "cloud coverage" && e.time >= fiveDayBeforeDate)
    let averageCloudCoverage = last5DaysClouds.reduce((sum, wind) => sum + wind.value, 0) / last5DaysClouds.length
    console.log(averageCloudCoverage)

}

function logForecast(data, typeOfMethod) {
    console.log("______________________________________________")
    console.log(" Using " + typeOfMethod)
    console.log("****************** Weather Predictions for " + data[0].place + "****************")
    console.log("Hourly predictions for the next 24 hours")
    console.log("______________________________________________")
    let now = new Date()
    
    console.log(data.filter(e => ((new Date(e.time) - now) / 36e5 < 24)))
}
