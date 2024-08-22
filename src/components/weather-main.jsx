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
        console.log(response);
        setWeather(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchWeather();
  }, [city]);

  function changeCity(e) {
    setCity(e.target.value);
    console.log("Button is clicked");
  }

  return (
    <>
      <div className="grid grid-cols ">
        <div className=" bg-yellow-500 w-full p-2">
          <input
            className=" ml-5 w-auto p-2 m-2 border-4 border-gray-400"
            type="text"
            value={city}
            onChange={changeCity}
          />
          <button
            className="bg-slate-800  text-white rounded-lg m-2 p-3.5 shadow-3xl font-mono font-semibold"
            onClick={() => setCity(city)}
          >
            Update City
          </button>
          {/* <button>Get Weather</button> */}
        </div>
        <div className=" grid grid-cols-2 mt-10">
          <div>
            <h2 className="text-center font-bold font-mono text-2xl">
              LOCATION
            </h2>
            <div className="bg-slate-800 font-mono text-white rounded-lg m-4 p-5 shadow-4xl w-50% space-y-5">
              <div>{`City: ${weather?.location?.name}`}</div>
              <div>{`Country: ${weather?.location?.country}`}</div>
              <div>{`Local Time: ${weather?.location?.localtime}`}</div>
              <div>{`Latitude: ${weather?.location?.lat}`}</div>
              <div>{`Longitude: ${weather?.location?.lon}`}</div>
              <div>{`Epoch: ${weather?.location?.localtime_epoch}`}</div>
              <div>{`TZ: ${weather?.location?.tz_id}`}</div>
            </div>
          </div>

          <div>
            <h2 className="text-center font-bold font-mono text-2xl">
              WEATHER
            </h2>
            <div className="bg-slate-800 font-mono text-white rounded-lg m-4 p-5 shadow-4xl w-50% space-y-5">
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
      </div>
    </>
  );
};
export default FetchWeather;
