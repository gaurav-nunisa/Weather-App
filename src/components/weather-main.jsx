import { useState, useEffect } from "react";
import axios from "axios";


const FetchWeather = () => {
  const date = new Date();

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const [city, setCity] = useState("New York");
  const [weather, setWeather] = useState(null); //gets todays General weather data

  const [history, setHistory] = useState(null);//get historical data in hours

  const [historicalYear, setHistoricalYear] = useState();
  const [historicalMonth, setHistoricalMonth] = useState();
  const [historicalDate, setHistoricalDate] = useState();

  const [todaysTimeline, setTodaysTimeline] = useState() // get todays data in hours
  const icon = weather?.current?.condition?.icon;

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const WeatherResponse = await axios.get(
          `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
        );
        console.log(WeatherResponse);
        setWeather(WeatherResponse.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchWeather();

    const fetchHistory = async () => {
      try {
        const historicalData = await axios.get(`https://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${city}&dt=${historicalYear}-${historicalMonth}-${HistoricalDate}`)
        console.log(historicalData);
        setHistory(historicalData.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchHistory();

    const fetchTodaysTimeline = async () => {
      try {
        const todaysTimeline = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&day=1&hour=24`)
        setTodaysTimeline(todaysTimeline.data);
        console.log(todaysTimeline);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTodaysTimeline();


  }, [city,historicalYear, historicalMonth, historicalDate, apiKey]);

  function changeCity(e) {
    setCity(e.target.value);
  }

  return (
    <>
      <div className=" grid grid-rows 2 grid-cols-3 h-screen">
        <div className=" m-5 HEADER bg-[#212D3C] col-start-1 col-end-3 row-start-1 row-end-2">
          <input
            className="-5 w-[50%] p-2 m-2 border-4 border-gray-400 rounded-lg"
            type="text"
            value={city}
            onChange={changeCity}
            placeholder="Enter City"
          />
        </div>
        <div className="SEEMORE m-5  bg-[#212D3C] border-2 border-solid border-red-500 col-start-3 col-end-4 row-start-1 row-end-2">
          <h1>SEE MORE</h1>
        </div>

        <div className="TODAYSHIGHLIGHT m-5  bg-[#212D3C] border-2 border-solid border-yellow-300 col-start-1 col-end-3 row-start-2 row-end-3">
          <h1>TODAY'S HIGHLIGHT</h1>

          {weather && weather.current ? (
            <div>
              <h1> {weather.current.temp_c} C</h1>
              <h1>
                <img src={`https:${icon}`} alt="" />
              </h1>
              <p>{weather.current.condition.text}</p>
            </div>
          ) : (
            <p>Loading.......</p>
          )}
        </div>

        <div className="TODAYSDETAILS  m-5 bg-[#212D3C] border-2 border-solid border-green-500 col-start-1 col-end-3 row-start-3 row-end-4">
          <h1>TODAYS WEATHER DETAILS</h1>
          {history ? (
            history.forecast.forecastday.map((dayForeCast, index) => {
              return (
                <div>
                  <p>MOON SET : {dayForeCast.astro.moonset}</p>
                  <p>SUNRISE : {dayForeCast.astro.sunrise}</p>
                  <p>SUNSET : {dayForeCast.astro.sunset}</p>
                  <p>MOON RISE :{dayForeCast.astro.moonrise}</p>
                </div>
              );
            })
          ) : (
            <p>loading......</p>
          )}
        </div>
        <div className="TODAYSTIMELINE m-5  bg-[#212D3C] border-2 border-solid border-blue-500 col-start-1 col-end-3 row-start-4 row-end-5">
          <h1>TODAYS TIMLINE</h1>
        </div>

        <div className="WEEKLYFORECAST  m-5  row-start-2 row-end-5 col-start-3 col-end-4 bg-[#212D3C] border-2 border-solid border-pink-500">
          <h1>Week's Forecast</h1>
        </div>
      </div>
    </>
  );
};
export default FetchWeather;
