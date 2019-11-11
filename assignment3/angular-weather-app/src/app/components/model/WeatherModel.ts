export class WeatherData 
{
    historic;
    forecast;
    place;
    type;
    period;
    cities;

    constructor(historic = [], forecast = [], place = null, type = "HISTORIC", period = new DateInterval(new Date(), new Date())) 
    {
        this.historic = historic;
        this.forecast = forecast;
        this.place = place;
        this.type = type;
        this.period = period;
        this.distinctCities();
    }

    distinctCities = () => this.cities = [...new Set(this.historic.map(x => x.place))]
    
    forPlace = (_place) => this.place = _place

    forType = (_type) => this.type = _type
    
    forFrom = (from) => this.period.setFrom(from)

    forTo = (to) => this.period.setTo(to)

    includingHistoric = (_data) => {
        this.historic = [...this.historic, ..._data]
        this.distinctCities()
    }

    includingForecast = (_data) => {
       this.forecast = [...this.forecast,..._data]
    }

    getQueryType = () => this.type
    
    getQueryCity = () => this.place

    getQueryFromDate = () => this.period.getFrom()

    getQueryToDate = () => this.period.getTo()

    getData = () => {
        let data = this.type === "HISTORIC" ? this.historic : this.forecast
        return data.filter(e => (this.place ? e.place === this.place : true) &&
            (this.period ? this.period.contains(e.time) : true))
    }

    

    getCityOptions = () => this.cities.map(city => {return {value: city, label: city}})

    getQueryTypeOptions = () => [
        {value:"HISTORIC", label: "Historic"},
        {value:"FORECAST", label: "Forecast"}
    ]

}


class DateInterval 
{
    from;
    to;
    constructor(from, to)
    {
        this.from = from;
        this.to = to;
    }

    getFrom() {
        return this.from
    }

    getTo() {
        return this.to
    }

    setFrom = (from) => this.from = from

    setTo = (to) => this.to = to

    contains(d) {
        const _from = this.from.toISOString();
        const _to = this.to.toISOString();
        return d >= _from && d <= _to
    }
}