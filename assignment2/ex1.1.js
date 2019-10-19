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
    return {
        ...obj,
        getType,
        getUnit
    }
}

const WeatherData = value => obj => {
    const getValue = () => value
    return {
        ...obj,
        getValue
    }
}

const create_WeatherData = (place, time, dataType, unit, value) => {
    const event = Event(place, time)
    const type = DataType(dataType, unit)
    const data = WeatherData(value)
    const f = compose(data, type, event)
    return f({})
}

const Temperature = () => obj => {
    function convertToF() {
        if (obj.getUnit() === 'C') {
            return create_temperature(
                obj.getValue() * (9 / 5) + 32,
                obj.getPlace(),
                obj.getTime(),
                "F")
        }
    }

    function convertToC() {
        if (obj.getUnit() === 'F') {
            return create_temperature(
                obj.getValue() - 32 * (5 / 9),
                obj.getPlace(),
                obj.getTime(),
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

const create_temperature = (place, time, unit, value) => {
    const data = create_WeatherData(place, time, 'Temperature', unit, value)
    const temp = Temperature()
    const f = compose(temp, data)
    return f({})
}

const Precipitation = (precipitationType) => obj => {
    const getPrecipitationType = () => precipitationType
    
    const convertToInches = () => {
        if (obj.getUnit() === "MM") {
            return create_precipitation(
                obj.getValue() * 25.4,
                obj.getPlace(),
                obj.getTime(),
                "MM")
        }
    }

    const convertToMM = () => {
        if (obj.getUnit() === "Inches") {
            return create_precipitation(
                obj.getValue() / 25.4,
                obj.getPlace(),
                onj.time(),
                "Inches"
            )
        }
    }

    return {
        ...obj,
        convertToInches,
        convertToMM,
        getPrecipitationType
    }
}

const create_precipitation = (value, place, time, unit, precipitationType) => {
    const data = create_WeatherData(place, time, 'Precipitation', unit, value)
    const precip = Precipitation(precipitationType)
    const f = compose(precip, data)
    return f({})
}

const Wind = (direction) => obj => {
    const getDirection = () => direction

    const convertToMph = () => {
        if (obj.getUnit() === "Mps") {
            return create_wind(
                obj.getValue() * 3600,
                obj.getPlace(),
                obj.getTime(),
                "Mps"
            )
        }

    }

    const convertToMps = () => {
        if (obj.getUnit() === "Mph") {
            return create_wind(
                obj.getValue() / 3600,
                obj.getPlace(),
                obj.getTime(),
                "Mph")
        }

    }
    return {
        ...obj,
        convertToMph,
        convertToMps,
        getDirection
    }

}
const create_wind = (place, time, unit, value, direction) => {
    const data = create_WeatherData(place, time, 'Wind', unit, value)
    const wind = Wind(direction)
    const f = compose(wind, data)
    return f({})
}

const create_cloudCoverage = (place, time, unit, value) => {
    return create_WeatherData(place, time, 'Cloud Coverage', unit, value)
}

const WeatherPrediction = (from, to) => obj => {
    const matches = (WeatherData) => {
        return WeatherData.time() === obj.getTime() &&
            WeatherData.getPlace() === obj.getPlace() &&
            WeatherData.getType() === obj.getType() &&
            WeatherData.getUnit() === obj.getUnit() &&
            WeatherData.getValue() >= from &&
            WeatherData.getValue() <= to
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

const create_WeatherPrediction = (from, to, place, time, dataType, unit) => {
    const event = Event(place, time)
    const type = DataType(dataType, unit)
    const data = WeatherPrediction(from, to)
    const f = compose(data, type, event)
    return f({})
}

const create_temperature_prediction = (from, to, place, time, unit) => {
    const data = create_WeatherPrediction(from, to, place, time, 'Temperature_Prediction', unit)
    const temp = Temperature()
    const f = compose(temp, data)
    return f({})
}


const PrecipitationPrediction = (types) => obj => {

    const getPrecipitationType = () => types

    const matches = (WeatherData) => {
        if (WeatherData.getPrecipitationType) {
            return obj.matches(WeatherData) && types.includes(WeatherData.getPrecipitationType())
        }
        return false;
    }

    function convertToInches() {
        if (obj.getUnit() === "MM") {
            return create_precipitation_prediction(
                getPrecipitationType(),
                obj.getFrom() / 25.4,
                obj.getTo() / 25.4,
                obj.getPlace(),
                obj.getTime(),
                "Inches")
        }
    }

    function convertToMM() {
        if (obj.getUnit() === "Inches") {
            return create_precipitation_prediction(
                getPrecipitationType(),
                obj.getFrom() * 25.4,
                obj.getTo() * 25.4,
                obj.getPlace(),
                obj.getTime(),
                "MM")
        }
    }

    return {
        ...obj,
        getPrecipitationType,
        matches,
        convertToInches,
        convertToMM
    }
}

const create_precipitation_prediction = (types, from, to, place, time, unit) => {
    const data = create_WeatherPrediction(from, to, place, time, 'Precipitation_Prediction', unit)
    const precip = Precipitation(types)
    const f = compose(precip, data)
    return f({})
}


const WindPrediction = (directions) => obj => {

    const getDirections = () => directions

    const matches = (WeatherData) => {
        if (WeatherData.getDirections) {
            return obj.matches(WeatherData) && directions.includes(WeatherData.getDirections())
        }
        return false;
    }

    function convertToMph() {
        if (obj.getUnit() === "Mps") {
            return create_wind_prediction(
                getDirections(),
                obj.getFrom() * 3600,
                obj.getTo() * 3600,
                obj.getPlace(),
                obj.getTime(),
                "Mps")
        }
    }

    function convertToMps() {
        if (obj.getUnit() === "Mph") {
            return create_wind_prediction(
                getDirections(),
                obj.getFrom() / 3600,
                obj.getTo() / 3600,
                obj.getPlace(),
                obj.getTime(),
                "Mph")
        }
    }

    return {
        ...obj,
        getDirections,
        matches,
        convertToMph,
        convertToMps
    }

}
const create_wind_prediction = (from, to, place, time, unit, directions) => {
    const data = create_WeatherPrediction(from, to, place, time, 'Wind_Prediction', unit)
    const wind = WindPrediction(directions)
    const f = compose(wind, data)
    return f({})
}

const cloudCoveragePrediction = () => {
    return create_WeatherPrediction(from, to, place, time, 'Cloud_Coverage_Prediction', unit)
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

const WeatherUtil = (data, place = null, type = null, period = null) => obj => {

    const forPLace = (_place) => WeatherUtil(data, _place, type, period)(obj)

    const forType = (_type) => WeatherUtil(data, place, _type, period)(obj)

    const forPeriod = (_period) => WeatherUtil(data, place, type, _period)(obj)

    const including = (_data) => {
        return WeatherUtil(Array.prototype.push.apply(data, _data),
            place, type, _period)(obj)
    }

    const convertToUSUnits = () => {
        return WeatherUtil(data.map(e => {
                if (e.convertToF) {
                    return e.convertToF()
                } else if (e.convertToInches) {
                    return e.convertToInches()
                } else if (e.convertToMph) {
                    return e.convertToMph()
                } else {
                    return e
                }
            }),
            place, type, period)(obj)
    }

    const convertToInternationalUnits = () => {
        return WeatherUtil(data.map(e => {
                if (e.convertToC) {
                    return e.convertToC()
                } else if (e.convertToMM) {
                    return e.convertToMM()
                } else if (e.convertToMps) {
                    return e.convertToMps()
                } else {
                    return e
                }
            }),
            place, type, period)(obj)
    }

    const getData = () => {
        data.filter(e => e.getPlace() === (place != null ? place : e.getPlace()) &&
            e.getType() === (type != null ? type : e.getType()) &&
            period != null ? period.contains(e.getTime) : true)
    }

    return {
        ...obj,
        forPeriod,
        forPLace,
        forType,
        including,
        convertToUSUnits,
        convertToInternationalUnits,
        getData
    }
}

const create_WeatherForcast = (data) => {
    
    const averageFromValue = () => {
        let sumOfFrom = data.reduce(((e, acc) => e.getFrom() + acc), 0)
        return sumOfFrom / data.length
    }

    const averageToValue = () => {
        let sumOfTo = data.reduce(((e, acc) => e.getTo() + acc), 0)
        return sumOfTo / data.length
    }

    const utils = WeatherUtil(data)

    const f = compose({averageFromValue, averageToValue}, utils)
    return f({})
}

const create_WeatherHistory = (data) => {
    
    const lowestValue = () => {
        if(data.length && 
            data.filter((v, i, a) => a.indexOf(v) === i).length === 1)
        {
            return data.reduce(((e, acc) => e.getValue() < acc ? e.getValue() : acc), data[0].getValue())
        }
    }

    const utils = WeatherUtil(data)

    const f = compose({lowestValue}, utils)
    return f({})
}