import { DateTime } from "luxon";

const API_KEY = "3771b73c35ce87aaaac32c781f8eaa5f"
const BASE_URL = "https://api.openweathermap.org/data/2.5"

//function to get data
const getWeatherData = (infoType, searchParam) => {
    const url = new URL(BASE_URL + '/' + infoType)
    url.search = new URLSearchParams({...searchParam, appid:API_KEY})

    return fetch(url)
        .then((res) => res.json())
};


const formatCurrentWeather = (data) => {
    const {
        coord: {lat, lon},
        main: {temp},
        name,
        sys: {country},
        weather
    } = data
    
    return {lat, lon, temp, name, country, weather}
}

const formatForecastWeather = (data) => {
    let {timezone, daily, hourly} = data
    //showing only 3 forecasts. start from 1 becuase we want to show from next hour
    daily = daily.slice(0,1).map(d =>{
        return {
            title: formatToLocalTime(d.dt, timezone, 'ccc')
        }
    });

    hourly = hourly.slice(0,5).map(d =>{
        return {
            time: formatToLocalTime(d.dt, timezone, 'HH:mm'),
            temp: d.temp,
            icon: d.weather[0].icon,
            main: d.weather[0].main,
            desc: d.weather[0].description,
            humid: d.humidity,
            cloud: d.clouds
        }
    });
    
    return {timezone, daily, hourly}
};


const getFormattedWeatherData = async (searchParam) => {
    const formattedCurrentWeather = await getWeatherData('weather', searchParam).then(formatCurrentWeather)
    
    const {lat, lon} = formattedCurrentWeather

    const formattedForecastWeather = await getWeatherData('onecall', 
    {lat, lon, 
    exclude: "current,minutely,alerts", 
    units: searchParam.units})
    .then(formatForecastWeather)

    return {...formattedCurrentWeather, ...formattedForecastWeather};
}

//Luxon use
//params: seconds, timezone, format -> if you dont pass a format it has a defalt
const formatToLocalTime = (secs, zone, format = "cccc, dd LLL yyyy' | Local time:'hh:mm a") => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconURLFromCode = (code) => `https://openweathermap.org/img/wn/${code}@2x.png`

export default getFormattedWeatherData;
export {formatToLocalTime, iconURLFromCode}