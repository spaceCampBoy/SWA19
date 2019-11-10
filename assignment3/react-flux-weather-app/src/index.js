import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {WeatherData} from './model'
import store from './WeatherStore'
import view from './WeatherView'
import dispatcher from './WeatherDispatcher'

async function fetchWeather(historicOrForecast) {
    return await fetch(`http://localhost:8080/${historicOrForecast}`)
        .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
}

async function init() {
    try {
        const historicData = await fetchWeather("Data")
        const forecast = await fetchWeather("Forecast")
        const theModel = WeatherData(historicData, forecast)
        let renderer = dom => ReactDOM.render(dom, document.getElementById('root'))
        let theDispatcher
        const theView = view(() => theDispatcher)
        const theStore = store(theModel, theView, renderer)
        theDispatcher = dispatcher(theStore)
        renderer(theView(theModel))
    } catch (err) {
        console.log(err)
    }
}

init()
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
