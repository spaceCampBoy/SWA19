export const WeatherData = (historic, forecast, place = null, type = null, period = DateInterval(new Date(), new Date())) => {

    const forPlace = (_place) => WeatherData(historic, forecast, _place, type, period)

    const forType = (_type) => WeatherData(historic, forecast, place, _type, period)
    
    const forPeriod = (_period) => WeatherData(historic, forecast, place, type, _period)

    const including = (_data) => {
        return WeatherData([...historic, ..._data], forecast, place, type, period)
    }

    const getQueryType = () => type
    
    const getQueryCity = () => place

    const getQueryFromDate = () => period.getFrom()

    const getQueryToDate = () => period.getTo()

    const getData = () => {
        let data = type.value === "HISTORIC" ? historic : forecast
        console.log(place)
        return data.filter(e => (place != null ? e.place === place.value : true) &&
            (period != null ? period.contains(e.time) : true))
    }

    const cities = [...new Set(historic.map(x => x.place))]

    const getCityOptions = () => cities.map(city => {return {value: city, label: city}})

    const getQueryTypeOptions = () => [
        {value:"HISTORIC", label: "Historic"},
        {value:"FORECAST", label: "Forecast"}
    ]

    return {
        getCityOptions,
        getQueryTypeOptions,
        forPeriod,
        forPlace,
        forType,
        getQueryType,
        getQueryCity,
        getQueryFromDate,
        getQueryToDate,
        getData,
        including
    }
}


export const DateInterval = (from, to) => {

    function getFrom() {
        return from
    }

    function getTo() {
        return to
    }

    function contains(d) {
        const _from = from.toISOString()
        const _to = to.toISOString()
        return d >= _from && d <= _to
    }
    return {
        getFrom,
        getTo,
        contains
    }
}