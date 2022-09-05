import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'

function App() {

  const [ weather, setWeather ] = useState({})
  const [ isCelsius, setIsCelsius] = useState(true) 
 
  useEffect(() => {
      navigator.geolocation.getCurrentPosition(success);

      function success(pos) {
        const crd = pos.coords;

        console.log('Your current position is:');
        console.log(`Latitude: ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=6eeb520cc09bd19ccf603ad1183857c7`)
            .then(res => setWeather(res.data))
      }

  }, [])

  console.log(weather)

   const degrees = () =>{
    setIsCelsius(!isCelsius)
  } 

  const celsius = Math.trunc(weather.main?.temp - 273.15)
  const fahrenheit = Math.trunc((weather.main?.temp - 273.15) * (9/5) + 32)  
  
 

  return (
    <div className="App">
      <div>
      <img src="/src/assets/atardecer-en-el-mar_1920x1200_xtrafondos.com.jpg" className='imgbackk' alt="img paisaje del mar" />
        <div>
          <div className='card'>
            <h1>Weather app</h1>
            <h2>{weather.name}, {weather.sys?.country}</h2> 
            <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}.png`} alt="" />
            <p>{isCelsius ? celsius : fahrenheit}{isCelsius ? `°C`: `°F`}</p> 
            <h4>Humidity: {weather.main?.humidity}%</h4>
            <button onClick={degrees}>Degrees °F/°C</button> 
          </div>
        </div>
      </div>  
    </div>
  )
}

export default App
