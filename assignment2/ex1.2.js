const XMLHttpRequest = this.XMLHttpRequest || require('xmlhttprequest').XMLHttpRequest

function xhrWeather(place, callback, error) {
    const request = new XMLHttpRequest();
    request.addEventListener('load', () => callback(JSON.parse(request.responseText)))
    request.addEventListener('error', error)
    request.open('GET', `http://localhost:8080/data/${place}`)
    request.send()
}

const fetch = this.fetch || require('node-fetch')

function fetchWeather(place, callback) {
    let promise = fetch(`http://localhost:8080/data/${place}`)
        .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
    promise.then(res => callback(res))
}


// •	All data for the latest measurement of each kind
function logdata(data) {


    console.log("All data for the latest measurement of each kind")
    let latestMeasurementDate = data.reduce(((acc, e) => e.time > acc ? e.time : acc), data[0].time)
    console.log(data.filter(e => e.time == latestMeasurementDate))


    console.log("______________________________________________")
    console.log("**********************************************")
    console.log("______________________________________________")

    let fiveDayBeforeDate = new Date()
    fiveDayBeforeDate.setDate(fiveDayBeforeDate.getDate() - 5)
    fiveDayBeforeDate = fiveDayBeforeDate.toISOString()

    console.log("Minimum temperature for the last 5 days")
    let last5DaysTemperatures = data.filter(e => e.type === "temperature" && e.time >= fiveDayBeforeDate)
    let minTemperature = last5DaysTemperatures.reduce((acc, e) => e.value < acc ? e.value : acc, 0)
    console.log(minTemperature)

    console.log("______________________________________________")
    console.log("**********************************************")
    console.log("______________________________________________")

    console.log("Maximum temperature for the last 5 days")
    let maxTemperature = last5DaysTemperatures.reduce((acc, e) => e.value > acc ? e.value : acc, 0)
    console.log(maxTemperature)

    console.log("______________________________________________")
    console.log("**********************************************")
    console.log("______________________________________________")

    console.log("Total precipitation for the last 5 days")
    let last5DaysPrecipitation = data.filter(e => e.type === "precipitation" && e.time >= fiveDayBeforeDate)
    let totalPrecipitation = last5DaysPrecipitation.reduce((acc, e) => e.value + acc, 0)
    console.log(totalPrecipitation)

    console.log("______________________________________________")
    console.log("**********************************************")
    console.log("______________________________________________")
    console.log("Average wind speed for the last 5 days")
    let last5DaysWinds = data.filter(e => e.type === "wind speed" && e.time >= fiveDayBeforeDate)
    let averageWindSpeed = last5DaysWinds.reduce((sum, wind) => sum + wind.value, 0) / last5DaysWinds.length
    console.log(averageWindSpeed)


    console.log("______________________________________________")
    console.log("**********************************************")
    console.log("______________________________________________")
    console.log("Dominant wind direction for the last 5 days")
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
    console.log("______________________________________________")
    console.log("Average cloud coverage for the last 5 days")
    let last5DaysClouds = data.filter(e => e.type === "cloud coverage" && e.time >= fiveDayBeforeDate)
    let averageCloudCoverage = last5DaysClouds.reduce((sum, wind) => sum + wind.value, 0) / last5DaysClouds.length
    console.log(averageCloudCoverage)

    
    console.log("______________________________________________")
    console.log("**********************************************")
    console.log("______________________________________________")
    console.log("Hourly predictions for the next 24 hours")

}

xhrWeather("Horsens", logdata, logdata)









// a)	Using XmlHttpRequest with callbacks
// b)	Using fetch with promises