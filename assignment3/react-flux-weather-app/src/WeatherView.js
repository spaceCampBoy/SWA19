import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';


import React from 'react'

const getTempratureData = () =>
{
    const temp = {
        value: document.getElementById("inputValue").value,
        time: document.getElementById("inputDate").value
    }
    return temp
}

const handleAddingData = (dispatcher) => (event) =>
{
    event.preventDefault();
    return dispatcher()({
        type:'ADD_TEMPRATURE',
        ...getTempratureData()
    })
}


const AddHistoricTemprature = ({dispatcher}) => (
    <div class="container">
        <h3 className="display-5">Add Temprature Data</h3>
        <form>
            <div class="form-group row">
                <div class="col-md-4">
                    <input type="text" class="form-control" name="inputValue" id="inputValue" placeholder=""/>
                </div>
                <div class="col-md-4">
                    <input type="date" class="form-control" name="inputDate" id="inputDate" placeholder=""/>
                </div>
                <div class="col-md-4">
                    <button onClick={handleAddingData(dispatcher)} class="btn btn-primary btn-block">Add Temprature</button>
                </div>
            </div>
        </form>
    </div>
)

const QueryPanel = ({model, dispatcher}) => (
    <div class="container">
        <h3 className="display-5">Search Weather data</h3>
        <div class="row">
            <div class="col-sm-3">
                <Select 
                    placeholder = "Data Type" 
                    value = {model.getQueryType()} 
                    onChange =  {(queryType) => dispatcher()({type:"QUERY_TYPE", queryType})} 
                    options={model.getQueryTypeOptions()}/>
            </div>
            <div class="col-sm-3">
                <Select 
                    placeholder = "City" 
                    value = {model.getQueryCity()} 
                    onChange =  {(queryCity) => dispatcher()({type:"QUERY_CITY", queryCity})} 
                    options={model.getCityOptions()}/>
            </div>
            <div class="col-sm-3">
                From: <DatePicker 
                    selected={model.getQueryFromDate()} 
                    onChange= {(queryDateFrom) => dispatcher()({type:"QUERY_FROM", queryDateFrom})}/>  
            </div>
            <div class="col-sm-3">
                To: <DatePicker 
                    selected={model.getQueryToDate()} 
                    onChange= {(queryDateTo) => dispatcher()({type:"QUERY_TO", queryDateTo})}/>
            </div>
        </div>
    </div>
)

const WeatherDataBody = ({model}) => {
    if(model.getQueryType() == null){return null}
    return (
        <div>
            <h3 class="display-5">{model.getQueryType().value}</h3>
            {model.getData().map((data, index) => <WeatherData key={index} {...data}/>)}
        </div>
    )
}

const WeatherData = (data) => (
    <div class="d-flex">
        {Object.keys(data).map(key => (<div class="p-2 flex-fill">{data[key]}</div>))}
    </div>
)

export default dispatcher => model => (
    <div class="container text-center">
        <AddHistoricTemprature {...{dispatcher}}/>
        <QueryPanel {...{model, dispatcher}}/>
        <WeatherDataBody {...{model}}/>
    </div>
)