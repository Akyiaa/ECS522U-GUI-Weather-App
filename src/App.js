import './App.css';
import React, { useEffect, useState } from 'react';
import Temperature from './components/Temperature';
import Clothes from './components/Clothes';
import Forecast from './components/Forecast';
import getWeatherData from './services/weatherService';
import getFormattedWeatherData from './services/weatherService';
import ReadyOrNot from './components/ReadyOrNot';
import Table from './services/Table';
import location from './icons/location.jpeg'

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
      
      <section className="flex-container">
        <div className="topbar">
          <button id = "cityloc"> 
          <img src={location} />
          London
          </button>

          <button id="but">Add timetable</button>
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

          
            <div id="today">
              <p>Today's Forecast:</p>
            </div>

            <div id="matchingForecast">
            <div className='center'>
              <Forecast items={weather.hourly}/>

              <section id="time-table">
                {/* {console.log(weather)}
                {console.log(weather.daily)}
                {console.log(weather.hourly)} */}
                <Table day={weather.daily} items={weather.hourly}/>
              </section>
            </div>
          </div>

          <div id="ready">
            <ReadyOrNot weather={weather}/>
          </div>

        </div>
        )}

      </section>

    </React.Fragment>
  );
}

export default App;
