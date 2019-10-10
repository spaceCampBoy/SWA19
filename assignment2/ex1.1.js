function Event(obj, time, place) {
    function time() {
        return time
    }

    function place() {
        return place
    }
    return Object.assign(obj, {
        time,
        place
    })
}


function DataType(obj, type, unit) {
    function type() {
        return type
    }

    function unit() {
        return unit
    }
    return Object.assign(obj, {
        type,
        unit
    })
}


function WeatherData(obj, value, time, place, type, unit) {
    function value() {
        return value
    }
    const e = Event(obj, time, place)
    const dt = DataType(e, type, unit)
    return Object.assign(dt, value)
}

function Precipitation(precipitationType, value, time, place, type, unit) {
    function precipitationType() {
        return precipitationType
    }

    function convertToInches() {

    }

    function convertToMM() {

    }
    const e = Object.assign({}, precipitationType, convertToInches, convertToMM)
    return WeatherData(e, value, time, place, type, unit)
}

function Temperature(value, time, place, type, unit) {


    function convertToF() {


    }

    function convertToC() {

    }
    const e = Object.assign({}, convertToF, convertToC)
    return WeatherData(e, value, time, place, type, unit)
}


function Wind(direction, value, time, place, type, unit) {
    function direction() {
        return direction
    }

    function convertToMPH() {

    }

    function convertToMs() {

    }
    const e = Object.assign({}, direction, convertToMPH, convertToMs)
    return WeatherData(e, value, time, place, type, unit)
}

function CloudCoverage() {
    return WeatherData({}, value, time, place, type, unit)

}


function WeatherPrediction(obj, to, from, time, place, type, unit) {
    function matches(WeatherData) {
        return WeatherData.time() === time &&
            WeatherData.place() === place &&
            WeatherData.type() === type &&
            WeatherData.unit() === unit
    }

    function to() {
        return to
    }

    function from() {
        return from
    }
    const e = Event(obj, time, place)
    const dt = DataType(e, type, unit)
    return Object.assign(dt, matches, to, from)


}

function TemperaturePrediction(to, from, time, place, type, unit) {
    function convertToC() {

    }

    function convertToF() {

    }

    const e = Object.assign({}, convertToF, convertToC)
    return WeatherPrediction(e, to, from, time, place, type, unit)
}

function PrecipitationPrediction(obj, types, to, from, time, place, type, unit) {
    const e = WeatherPrediction({}, to, from, time, place, type, unit)

    function types() {
        return types
    }

    function matches(WeatherData) {
        return e.matches(WeatherData) && types.includes(WeatherData.type())
    }

    function convertToInches() {}

    function convertToMM() {}
    return Object.assign(e, matches, convertToInches, convertToMM)
}

function WindPrediction(obj, directions, to, from, time, place, type, unit) {
    const e = WindPrediction({}.to, from, time, place, type, unit)

    function directions() {
        return directions
    }

    function matches(WeatherData) {
      
            return e.matches(WeatherData) && directions.includes(WeatherData.direction())

        
    }

    function convertToMPH() {}

    function convertToMs() {}
    return Object.assign(e, matches, convertToMPH, convertToMs)
}

function cloudCoveragePrediction() {
    return WeatherPrediction({}, to, from, time, place, type, unit)
}


function DateInterval( from, to){

    function from(){
        return from
    }
    function to(){
        return to
    }
    function contains(d){
        return d>=from && d<=to
    }
    return{
        from,to,contains
    }
}


function WeatherForecast(WeatherPrediction){
    let CurrentPlace;
    let CurrentType;
    let CurrentPeriod;

    function getCurrentPlace(){
        return CurrentPlace
    }

    function setCurrentPlace(place){
        CurrentPlace = place
    }

    function clearCurrentPlace(){
        CurrentPlace = null
    }
    function getCurrentType(){
        return CurrentType
    }

    function setCurrentType(Type){
        CurrentType = Type
    }

    function clearCurrentType(){
        CurrentType = null
    }
    function getCurrentPeriod(){
        return CurrentPeriod
    }

    function setCurrentPeriod(Period){
        CurrentPeriod = Period
    }

    function clearCurrentPeriod(){
        CurrentPeriod = null
    }

    function convertToUSUnits(){

    }
    function convertToInternationalUnits(){

    }
    function add(data){
        Array.prototype.push.apply(WeatherPrediction, data)
    
    }
    function data(){
        return WeatherPrediction
    }
}


    
    function WeatherHistory(WeatherHistory){
        let CurrentPlace;
        let CurrentType;
        let CurrentPeriod;
    
        function getCurrentPlace(){
            return CurrentPlace
        }
    
        function setCurrentPlace(place){
            CurrentPlace = place
        }
    
        function clearCurrentPlace(){
            CurrentPlace = null
        }
        function getCurrentType(){
            return CurrentType
        }
    
        function setCurrentType(Type){
            CurrentType = Type
        }
    
        function clearCurrentType(){
            CurrentType = null
        }
        function getCurrentPeriod(){
            return CurrentPeriod
        }
    
        function setCurrentPeriod(Period){
            CurrentPeriod = Period
        }
    
        function clearCurrentPeriod(){
            CurrentPeriod = null
        }
    
        function convertToUSUnits(){
    
        }
        function convertToInternationalUnits(){
    
        }
        function add(data){
            Array.prototype.push.apply(WeatherHistory, data)
        
        }
        function data(){
            return WeatherHistory
        }


 }
