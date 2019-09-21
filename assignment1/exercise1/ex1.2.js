class Event_DataType {

    constructor(time, place, type, unit) {
        this.time = time
        this.place = place
        this.type = type
        this.unit = unit
    }
    time() {
        return this.time
    }

    place() {
        return this.place
    }

    type() {
        return this.type
    }

    unit() {
        return this.unit
    }
}


class WeatherData extends Event_DataType {
    constructor( value, time, place, type, unit)
    {
        super(time, place, type, unit )
        this.value = value
     
    }
    value() {
        return this.value
    }


}

class Precipitation extends WeatherData{

    constructor(precipitationType, value, time, place, type, unit)
    {
        super(value, time, place, type, unit )
        this.precipitationType = precipitationType

    }
    precipitationType() {
        return this.precipitationType
    }

    convertToInches() {

    }

    convertToMM() {

    }
}

class Temperature extends WeatherData {
    constructor( value, time, place, type, unit)
    {
        super(value, time, place, type, unit )
    }



    convertToF() {


    }

    convertToC() {

    }
   
}


class Wind extends WeatherData {
     constructor(direction, value, time, place, type, unit)
    {
        super(value, time, place, type, unit )
        this.direction = direction
    }
    direction() {
        return this.direction
    }

    convertToMPH() {

    }

    convertToMs() {

    }
   
}

class CloudCoverage extends WeatherData {
    constructor(value, time, place, type, unit)
    {
        super(value, time, place, type, unit )
    }

}


class WeatherPrediction extends Event_DataType {

    constructor (to, from, time, place, type, unit)
    {
        super(time, place,type,unit )
        this.to = to
        this.from = from
    }
    matches(WeatherData) {
        return WeatherData.time() === this.time &&
            WeatherData.place() === this.place &&
            WeatherData.type() === this.type &&
            WeatherData.unit() === this.unit
    }

    to() {
        return this.to
    }

    from() {
        return this.from
    }

}

class TemperaturePrediction extends WeatherPrediction {

    constructor (to, from, time, place, type, unit)
    {
        super(to, from, time, place,type,unit )
    }
    convertToC() {

    }

    convertToF() {

    }
}

class PrecipitationPrediction extends WeatherPrediction {
   constructor(types, to, from, time, place, type, unit){
       super(to, from, time, place, type, unit)
       this.types  = types
   }
    types() {
        return this.types
    }

    matches(WeatherData) {
        return this.prototype.matches(WeatherData) && this.types.includes(WeatherData.type())
    }

    convertToInches() {}

    convertToMM() {}
   
}

class WindPrediction extends WeatherPrediction {
    constructor(directions, to, from, time, place, type, unit){
        super(to, from, time, place, type, unit)
        this.directions = directions
    }

    directions() {
        return this.directions
    }

    matches(WeatherData) {
      
            return this.prototype.matches(WeatherData) && this.directions.includes(WeatherData.direction())

        
    }

    convertToMPH() {}

    convertToMs() {}
}

class cloudCoveragePrediction extends WeatherPrediction {
    constructor (to, from, time, place, type, unit){
        super(to, from, time, place, type, unit)
    }
}


class DateInterval{
    constructor(to, from){
        this.to = to 
        this.from = from
    }

    from(){
        return this.from
    }
    to(){
        return this.to
    }
    contains(d){
        return d>=this.from && d<=this.to
    }
}


class WeatherForecast{
    constructor(data){
        this.data = data
        this.CurrentPlace;
        this.CurrentType;
        this.CurrentPeriod;
    }
   

    getCurrentPlace(){
        return this.CurrentPlace
    }

    setCurrentPlace(place){
        this.CurrentPlace = place
    }

    clearCurrentPlace(){
        this.CurrentPlace = null
    }
    getCurrentType(){
        return this.CurrentType
    }

    setCurrentType(Type){
        this.CurrentType = Type
    }

    clearCurrentType(){
        this.CurrentType = null
    }
    getCurrentPeriod(){
        return this.CurrentPeriod
    }

    setCurrentPeriod(Period){
        this.CurrentPeriod = Period
    }

    clearCurrentPeriod(){
        this.CurrentPeriod = null
    }

    convertToUSUnits(){

    }
    convertToInternationalUnits(){

    }
    add(data){
        Array.prototype.push.apply(this.data, data)
    
    }
    data(){
        return this.data
    }
}


    
   class WeatherHistory{
    constructor(data){
        this.data = data
        this.CurrentPlace;
        this.CurrentType;
        this.CurrentPeriod;
    }
   

    getCurrentPlace(){
        return this.CurrentPlace
    }

    setCurrentPlace(place){
        this.CurrentPlace = place
    }

    clearCurrentPlace(){
        this.CurrentPlace = null
    }
    getCurrentType(){
        return this.CurrentType
    }

    setCurrentType(Type){
        this.CurrentType = Type
    }

    clearCurrentType(){
        this.CurrentType = null
    }
    getCurrentPeriod(){
        return this.CurrentPeriod
    }

    setCurrentPeriod(Period){
        this.CurrentPeriod = Period
    }

    clearCurrentPeriod(){
        this.CurrentPeriod = null
    }

    convertToUSUnits(){

    }
    convertToInternationalUnits(){

    }
    add(data){
        Array.prototype.push.apply(this.data, data)
    
    }
    data(){
        return this.data
    }
}
