import './App.css';
import React, { useEffect, useState } from 'react';
import location from './icons/location.png'
import Clothes from './components/Clothes';
import Forecast from './components/Forecast';
import ReadyOrNot from './components/ReadyOrNot';
import Temperature from './components/Temperature';
import getFormattedWeatherData from './services/weatherService';

function App() {

  const [query, setQuery] = useState({q: "london"})
  const [units, setUnits] = useState("metric")
  const [weather, setWeather] = useState(null)

  //fetch new weather everytime:
  //1. first time it loads
  //2. everytime location or unit is changed
  useEffect(() => {
    const fetchWeather = async () => {
      await getFormattedWeatherData({...query, units}).then((data) => {setWeather(data);});

    };
  
    fetchWeather().then(console.log(weather));
    
  }, [query, units]);

  

  return (
    <React.Fragment>
      
      <section className="main-container">
        <div className="topbar">
          <button id = "cityloc"> 
          <img src={location}/>
          London
          </button>

          <button id="add-table">Add timetable</button>
        </div>

        {weather && (
          //if weather is not null. if weather exists
        <div className='weatherArea'>
          <div className="important">
            <div id="temp">
              <Temperature weather ={weather}/>
            </div>

            <div id="clothes">
              <Clothes weather={weather}/>
            </div>
          </div>
          
          <p id="today">Today's Forecast:</p>

          <div id="forecast-area">
            <div className='center'>
            <Forecast day={weather.daily} items={weather.hourly}/>
            </div>
          </div>

          <footer id="ready">
            <ReadyOrNot weather={weather}/>
          </footer>

        </div>
        )}

      </section>

    </React.Fragment>
  );
}

export default App;
