import { useState, useEffect } from "react";
import axios from "axios";

const FetchWeather = () => {
  const [city, setCity] = useState("New York");
  const [weather, setWeather] = useState(null);
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
        );
        setWeather(response.data);
      } catch (error) {
        {
          throw new Error(error);
        }
      }
    };
    fetchWeather();
  }, [city, weather]);

  function changeCity(e) {
    setCity(e.target.value);
  }

  return (
    <>
      <div className="bg-yellow-300">
        <input
          className="w-auto h-100% p-2 m-2 border-4 border-gray-400"
          type="text"
          value={city}
          onChange={changeCity}
        />
        <button
          className="bg-slate-800 font-mono text-white rounded-lg m-2 p-3.5"
          onClick={() => setCity(city)}
        >
          Update City
        </button>
      </div>
      <div className="bg-slate-400 grid grid-cols-2 place-items-center items-start ">
        <div>
          <h2 className="text-center font-bold font-mono text-2xl">LOCATION</h2>
          <div className="bg-slate-800 font-mono text-white rounded-lg m-4 p-5">
            <div>{`City: ${weather?.location?.name}`}</div>
            <div>{`Country: ${weather?.location?.country}`}</div>
            <div>{`Local Time: ${weather?.location?.localtime}`}</div>
            <div>{`Latitude: ${weather?.location?.lat}`}</div>
            <div>{`Longitude: ${weather?.location?.lon}`}</div>
          </div>
        </div>

        <div>
          <h2 className="text-center font-bold font-mono text-2xl">WEATHER</h2>

          <div className="bg-slate-800 font-mono text-white rounded-lg m-4 p-5">
            <div>{`Weather: ${weather?.current?.condition?.text}`}</div>
            <div>{`Temperature: ${weather?.current?.temp_c}°C`}</div>
            <div>{`Feels Like: ${weather?.current?.feelslike_c}°C`}</div>
            <div>{`Dew Point: ${weather?.current?.dewpoint_c}°C`}</div>
            <div>{`Gust: ${weather?.current?.gust_kph} kph`}</div>
            <div>{`Humidity: ${weather?.current?.humidity}%`}</div>
            <div>{`UV Index: ${weather?.current?.uv}`}</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default FetchWeather;
