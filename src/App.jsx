import { useState } from "react";
import cloudImage from "./assets/cloudy.png";
import { IoSearchSharp as SearchIcon } from "react-icons/io5";
import axios from "axios";

const App = () => {
  const [city, setCity] = useState("");
  const [data, setData] = useState({});
  const [weather, setWeather] = useState("");
  const [img, setImg] = useState("");

  const API_KEY = "450ed075a2662eb8213bba40d439171e";

  const fetchWeather = async (city) => {
    try {
      const URI = `https://api.openweathermap.org/data/2.5/weather?q=${city.toLowerCase()}&appid=${API_KEY}`;

      let { data } = await axios.get(URI);
  
      setData(data?.main);
      setWeather(data?.weather[0]?.main);

      changeWeather(data?.weather[0]?.main);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const changeWeather = (weather) => {
    switch (weather) {
      case "Clear":
        setImg("https://openweathermap.org/img/wn/01d.png");
        break;
      case "Clouds":
        setImg("https://openweathermap.org/img/wn/03d.png");
        break;
      case "Rain":
        setImg("https://openweathermap.org/img/wn/09d.png");
        break;
      case "Drizzle":
        setImg("https://openweathermap.org/img/wn/10d.png");
        break;
      case "Thunderstorm":
        setImg("https://openweathermap.org/img/wn/11d.png");
        break;
      case "Snow":
        setImg("https://openweathermap.org/img/wn/13d.png");
        break;
      case "Mist":
      case "Fog":
      case "Haze":
        setImg("https://openweathermap.org/img/wn/50d.png");
        break;
      default:
        setImg("https://openweathermap.org/img/wn/01d.png"); // fallback
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-zinc-800 text-zinc-200 px-4">
      <div className="">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-medium text-center">Hows the weather today?</h1>
        <div className="w-full flex gap-2 mt-8">
          <input
            className="w-full border-2 border-zinc-200 text-sm p-2 rounded-xl"
            type="text"
            placeholder="Enter your city here..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            className="py-2 px-4 rounded-xl bg-blue-400 text-white flex items-center justify-center gap-1 cursor-pointer"
            onClick={() => fetchWeather(city)}
          >
            <SearchIcon /> Search
          </button>
        </div>
        <div className="w-full flex items-center justify-center flex-col my-10">
          <img src={img} alt="cloud image" className="w-42" />
          <div>
            <p className="text-xl font-bold my-4">Weather: {weather}</p>
            <p>Temp: {Math.floor(data.temp - 273.15) || 0}&deg; C</p>
            <p>
              Feels like: {Math.floor(data.feels_like - 273.15) || 0}&deg; C
            </p>
            <p>Humidity: {Math.floor(data.humidity) || 0}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
