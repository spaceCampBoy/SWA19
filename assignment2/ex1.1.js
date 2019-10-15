const pipe = (...fs) => x => fs.reduce((f, y) => f(y), x)
const compose = (...fs) => x => fs.reduceRight((f, y) => f(y), x)

const Event = (time, place) => obj => {
    const getTime = () => time
    const getPlace = () => place
    return {
        ...obj,
        getTime,
        getPlace
    }
}


const DataType = (type, unit) => obj => {
    const getType = () => type
    const getUnit = () => unit
    const setUnit = _unit => {
        unit = _unit
    }
    return {
        ...obj,
        getType,
        getUnit,
        setUnit
    }
}

const WeatherData = value => obj => {
    const getValue = () => value
    const setValue = _value => {
        value = _value
    }
    return {
        ...obj,
        getValue,
        setValue
    }
}

const Temperature = () => obj => {
    function convertToF() {
        if (obj.getUnit() === 'C') {
            return create_temperature(
                obj.value() *(9/5) + 32,
                obj.place(),
                obj.time(),
                "F" )
        }
    }

    function convertToC() {
        if (obj.getUnit() === 'F') {
            return create_temperature(
                obj.value() - 32 * (5 / 9),
                obj.place(),
                obj.time(),
                "C"
            )
        }
    }
    return {
        ...obj,
        convertToF,
        convertToC
    }
}

const create_temperature = (value, place, time, unit) => {
    const event = Event(place, time)
    const type = DataType('Temperature', unit)
    const data = WeatherData(value)
    const temp = Temperature()
    const f = compose(temp, data, type, event)
    return f({})
}


/*  function convertToInches() {
        if (obj.getUnit() === "MM") {
            return create_precipitation_prediction(
                types(),
                obj.from() / 25.4,
                obj.to() / 25.4,
                obj.place(),
                obj.time(),
                "Inches")
        }
    }

*/

const Precipitation = () => obj => {
    const precipitationType = () => {
        return precipitationType
    }

    function convertToInches() {
        if (obj.getUnit() === "MM") {
            return create_precipitation(
                obj.value()* 25.4,
                obj.place(),
                obj.time(),
                "MM")
        }

    }

    function convertToMM() {
        if (obj.getUnit() === "Inches") {
            return create_precipitation(
                obj.value()/25.4,
                obj.place(),
                onj.time(),
                "Inches"
            )
        }

    }
    return {
        ...obj,
        convertToInches,
        convertToMM
    }
}

const create_precipitation = (value, place, time, unit) => {
    const event = Event(place, time)
    const type = DataType('Precipitation', unit)
    const data = WeatherData(value)
    const precip = Precipitation()
    const f = compose(precip, data, type, event)
    return f({})
}

const Wind = () => obj => {
    function direction() {
        return direction
    }

    function convertToMph() {
        if (obj.getUnit() === "Mps") {
            return create_wind(
                obj.value() *3600,
                obj.place(),
                obj.time(),
                "Mps"
            )
        }

    }

    function convertToMps() {
        if (obj.getUnit() === "Mph") {
            return create_wind(
                obj.value() /3600,
                obj.place(),
                obj.time(),
                "Mph")
        }

    }
    return {
        ...obj,
        convertToMph,
        convertToMps
    }

}
const create_wind = (value, place, time, unit) => {
    const event = Event(place, time)
    const type = DataType('Wind', unit)
    const data = WeatherData(value)
    const wind = Wind()
    const f = compose(wind, data, type, event)
    return f({})
}

function CloudCoverage() {
    return WeatherData({}, value, time, place, type, unit)

}

const WeatherPrediction = (from, to) => obj => {
    const matches = (WeatherData) => {
        return WeatherData.time() === time &&
            WeatherData.place() === place &&
            WeatherData.type() === type &&
            WeatherData.unit() === unit
    }

    const getFrom = () => from

    const getTo = () => to
    return {
        ...obj,
        matches,
        getFrom,
        getTo
    }

}

const create_temperature_prediction = (from, to, place, time, unit) => {
    const event = Event(place, time)
    const type = DataType('Temperature_Prediction', unit)
    const data = WeatherPrediction(from, to)
    const temp = Temperature()
    const f = compose(temp, data, type, event)
    return f({})
}


const PrecipitationPrediction = (types) => obj => {

    function types() {
        return types
    }

    function matches(WeatherData) {
        return obj.matches(WeatherData) && types.includes(WeatherData.type())
    }

    function convertToInches() {
        if (obj.getUnit() === "MM") {
            return create_precipitation_prediction(
                types(),
                obj.from() / 25.4,
                obj.to() / 25.4,
                obj.place(),
                obj.time(),
                "Inches")
        }
    }

    function convertToMM() {
        if (obj.getUnit() === "Inches") {
            return create_precipitation_prediction(
                types(),
                obj.from() * 25.4,
                obj.to() * 25.4,
                obj.place(),
                obj.time(),
                "MM")
        }
    }

    return {
        ...obj,
        convertToInches,
        convertToMM,
        matches
    }
}

const create_precipitation_prediction = (types, from, to, place, time, unit) => {
    const event = Event(place, time)
    const type = DataType('Precipitation', unit)
    const data = WeatherPrediction(from, to)
    const precip = Precipitation(types)
    const f = compose(precip, data, type, event)
    return f({})
}


const WindPrediction = (to, from, time, place, type, unit) => {

    function directions() {
        return directions
    }

    function matches(WeatherData) {

        return e.matches(WeatherData) && directions.includes(WeatherData.direction())


    }

    function convertToMph() {
        if (obj.getUnit() === "Mps") {
            return create_wind_prediction(
                directions(),
                obj.from()*3600,
                obj.to()*3600,
                obj.place(),
                obj.time(),
                "Mps")
        }

    }

    function convertToMps() {
        if (obj.getUnit() === "Mph") {
            return create_wind_prediction(
                directions(),
                onj.from()/3600,
                obj.to()/3600,
                obj.place(),
                obj.time(),
                "Mph")
        }

    }
    return {
        ...obj,
        convertToMph,
        convertToMps,
        matches
    }

}
const create_wind_prediction = (to, from, place, time, unit) => {
    const event = Event(place, time)
    const type = DataType('Wind', unit)
    const data = WeatherPrediction(to, from)
    const wind = Wind()
    const f = compose(wind, data, type, event)
    return f({})
}

function cloudCoveragePrediction() {
    return WeatherPrediction({}, to, from, time, place, type, unit)
}


const DateInterval = (from, to) => {

    function from() {
        return from
    }

    function to() {
        return to
    }

    function contains(d) {
        return d >= from && d <= to
    }
    return {
        from,
        to,
        contains
    }
}


function WeatherForecast(WeatherPrediction) {
    let CurrentPlace;
    let CurrentType;
    let CurrentPeriod;

    function forPLace(place) {
        CurrentPlace = place
    }

    function forType() {
        return CurrentType
    }

    function forPeriod() {
        return CurrentPeriod
    }
    function including(){
        
    }

    function convertToUSUnits() {

    }

    function convertToInternationalUnits() {

    }
    const averageFromValue = () => {

    }
    const averageToValue = () => {

    }

    function data() {
        return WeatherPrediction
    }
}



function WeatherHistory(WeatherHistory) {
    let CurrentPlace;
    let CurrentType;
    let CurrentPeriod;

    function forPlace() {
        return CurrentPlace
    }

    function forType(place) {

    }

    function forPeriod() {
    }

    function including() {
    }

    function convertToUSUnits() {

    }

    function convertToInternationalUnits() {

    }

    function lowestValue() {

    }

    function data() {
        return WeatherHistory
    }


}