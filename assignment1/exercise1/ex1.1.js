function Event(obj, time, place) {
    function time() {
        return time
    }
    function place(){
        return place
    }
    return Object.assign(obj, {time, place})
}


function DataType(obj, type , unit)
{
    function type(){
        return type
    }
    function unit(){
        return unit
    }
    return  Object.assign(obj, {type, unit})
}


function WeatherData(obj, value, time, place, type, unit){
    function value(){
        return value
    }
    const e = Event(obj, time, place)
    const dt = DataType(e, type, unit)
    return Object.assign(dt, value)
}

function Precipitation(precipitationType, value, time, place, type, unit) {
    function precipitationType(){
        return precipitationType 
    }
    function convertToInches(){

    }

    function convertToMM(){

    }
    return Object.assign({}, precipitationType, value, time, place, type, unit)
}