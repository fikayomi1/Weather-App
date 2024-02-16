import React, { useState } from 'react';
import "./App.css";
const api = {
  key: "4f8e795dcd6dbf7b9f5276bff095ffc1",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState(''); //Input received from user
  const [weather, setWeather] = useState({}); //Weather data gotten from Api

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&appid=${api.key}&units=metric`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
    }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let time = d.getHours() + ":" + d.getMinutes();

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year} ,  ${time}`
  }

  return (
    <div className='app'>
      <main>
        <div className = "title"> React Weather Application</div>
        
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search location..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
          {/* <button onClick = {search}>Enter</button>
          
           */}
        </div>
        {(typeof weather.main != "undefined") ? (
        <div className = "Box">
          <div className="location-box">
            <p className="location">{weather.name}, {weather.sys.country}</p>
          </div>

          <div className="weather-box">
            <p className="coord"><strong>Coordinates</strong> : Lat - {weather.coord.lat}     Lon - {weather.coord.lon} </p>
            <p className="temperature"><strong>Temperature</strong> : {Math.round(weather.main.temp)}°c</p>
            <p className="weather"><strong>Weather</strong> : {weather.weather[0].description}</p>
            <p className="wind"><strong>Wind</strong> : Speed - {weather.wind.speed}  Degree - {weather.wind.deg}</p>
            <p className="date"><strong>Date</strong> : {dateBuilder(new Date())}</p>
            
          </div>
        </div>
        ) : (<div className = "error">{weather.message}</div>)}
      </main>
    </div>
  ); 
}

export default App;
