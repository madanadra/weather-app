import { useRef, useState, useEffect } from "react";

function App() {
  const [load, setLoad] = useState(false)
  const [weather, setWeather] = useState([])
  const search = useRef()

  useEffect(() => {
    setLoad(true);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=jakarta&appid=3029b6c887dc856f57433710770a6026&units=metric`)
    .then(res => res.json())
    .then(
      (result) => {
        setLoad(false);
        setWeather(result);
        search.current.value = null;
        console.log(weather);
      },
      (error) => {
        setLoad(false);
        search.current.value = null;
        console.log(error);
      }
    )
  }, []);

  const func = () => {
    if (search.current.value) {
      setLoad(true);
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search.current.value}&appid=3029b6c887dc856f57433710770a6026&units=metric`)
      .then(res => res.json())
      .then(
        (result) => {
          setLoad(false);
          setWeather(result);
          search.current.value = null;
          console.log(weather);
        },
        (error) => {
          setLoad(false);
          search.current.value = null;
          console.log(error);
        }
      )
    }
  }

  return (
  <div className="app">
    <div className="search">
      <input type="text" placeholder="Search here" ref={search} autoComplete="off" spellCheck="false" />
      <button onClick={() => func()}>
        <span className="material-icons-outlined">search</span>
      </button>
    </div>
    {load ? <p className="load">Loading...</p> :
      weather.main ? <>
        <p className="temp">
          <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="icon" />
          {Math.round(weather.main.temp)}&deg;
        </p>
        <p className="desc">{weather.weather[0].description}</p>
        <p className="city">{weather.name}, {weather.sys.country}</p>
        <p className="loc">{weather.coord.lon}, {weather.coord.lat}</p>
      </> : <p className="load">No Result</p>
    }
  </div>);
}

export default App;
