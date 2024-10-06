import { useState, useEffect } from "react";
import axios from "axios";
import React, { createContext, useContext } from "react";
import { WeatherContext } from "../App";
import { useNavigate } from "react-router-dom";

const FetchWeather = ({ children }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/historical");
  };
  const futureForecastNavigateHandle = () => {
    navigate("/futureforecast");
  };
  const today = new Date();

  const { city, setCity, apiKey } = useContext(WeatherContext);
  const [weather, setWeather] = useState(null); //gets todays General weather data

  const [futureForecastData, setFutureForecastData] = useState([]);

  const [todaysTimeline, setTodaysTimeline] = useState(); // get todays data in hours
  const icon = weather?.current?.condition?.icon;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const WeatherResponse = await axios.get(
          `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
        );

        console.log("WeatherResponse");
        console.log(WeatherResponse);
        setWeather(WeatherResponse.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchWeather();

    const fetchTodaysTimeline = async () => {
      try {
        const todaysTimelineData = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1`
        );
        setTodaysTimeline(todaysTimelineData.data);
        console.log("TODAYS TIMELINE");
        console.log(todaysTimelineData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTodaysTimeline();
    const fetchFutureForecast = async () => {
      const requests = [];
      setFutureForecastData([]);
      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);

        const formattedDate = date.toISOString().split("T")[0];
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&dt=${formattedDate}`;

        requests.push(axios.get(url));
      }
      const responses = await Promise.all(requests);

      const data = responses.map((response) => response.data);
      console.log("FUTURE FORECAST");
      console.log(data);
      setFutureForecastData(data);
    };
    fetchFutureForecast();
  }, [city, apiKey]);

  function changeCity(e) {
    setCity(e.target.value);
  }
  const WeatherHistory = ({ weatherData }) => {
    return (
      <div>
        {weatherData.length === 0 ? (
          <p>Loading...</p>
        ) : (
          <div>
            <WeatherTable weatherTableParam={weatherData} />
          </div>
        )}
      </div>
    );
  };
  const WeatherTable = ({ weatherTableParam }) => {
    return (
      <table className="table-auto border-collapse bg-[#212D3C] gap-5 ">
        <thead>
          <tr>
            <th className="p-2 border-b border-gray-200">Date</th>
            <th className="p-2 border-b border-gray-200">Temp (°C)</th>
            <th className="p-2 border-b border-gray-200">Condition</th>
            <th className="p-2 border-b border-gray-200">Humidity (%)</th>
            <th className="p-2 border-b border-gray-200">Chance of Rain(%)</th>
            <th className="p-2 border-b border-gray-200">UV </th>
            <th className="p-2 border-b border-gray-200">Max Temp(C) </th>
            <th className="p-2 border-b border-gray-200">Min Temp(C)</th>
          </tr>
        </thead>
        <tbody>
          {weatherTableParam.map((dayData, index) => (
            <tr key={index} className="border-t border-gray-200">
              <td className="p-2 align-top border-r border-gray-200">
                {dayData.forecast.forecastday[0].date}
              </td>
              <td className="p-2 align-top border-r border-gray-200 text-center">
                {dayData.forecast.forecastday[0].day.avgtemp_c} °C
              </td>
              <td className="p-2 align-top border-r border-gray-200 text-center">
                {dayData.forecast.forecastday[0].day.condition.text}

              </td>
              <td className="p-2 align-top border-r border-gray-200 text-center">
                {dayData.forecast.forecastday[0].day.avghumidity}%
              </td>
              <td className="p-2 align-top border-r border-gray-200 text-center">
                {dayData.forecast.forecastday[0].day.daily_chance_of_rain}%
              </td>
              <td className="p-2 align-top border-r border-gray-200 text-center">
                {dayData.forecast.forecastday[0].day.uv}%
              </td>
              <td className="p-2 align-top border-r border-gray-200 text-center">
                {dayData.forecast.forecastday[0].day.maxtemp_c}%
              </td>
              <td className="p-2 align-top border-r border-gray-200 text-center">
                {dayData.forecast.forecastday[0].day.mintemp_c}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <>
      <div className=" grid  grid-cols-3 h-screen md:grid-cols-2">
        <div className=" m-5 HEADER bg-[#212D3C] border rounded-lg  col-start-1 col-end-4 row-start-1 row-end-2 content-cente r flex gap-5 xl:col-end-3">
          <input
            className=" w-[50%] p-2 m-2 border-4 border-gray-400 rounded-lg "
            type="text"
            value={city}
            onChange={changeCity}
            placeholder="Enter City"

            

            
          />
          <div className="flex gap-5 justify-center m-3  xl:hidden"> 
            <button
            onClick={handleNavigate}
            className="border rounded-lg p-1 bg-blue-300"
          >
            <b className="text-sm">Historical Data</b>
          </button>
          <button
            className="border rounded-lg p-1 bg-yellow-300 "
            onClick={futureForecastNavigateHandle}
            
          >
            
            <b className="text-sm">Future Forecast</b>
          </button></div>
          
          

          
          
        </div>
        {/* <div className=" SIDEBUTTONS flex justify-center m-5 content-center sm:hidden ">
          <button
            onClick={handleNavigate}
            className="border rounded-lg p-1 bg-blue-300"
          >
            <b className="text-sm">Historical Data</b>
          </button>
          <button
            className="border rounded-lg p-1 bg-yellow-300 "
            onClick={futureForecastNavigateHandle}
            
          >
            
            <b className="text-sm">Future Forecast</b>
          </button>
        </div> */}
        <div className="SEEMORE m-5  bg-[#212D3C] border rounded-lg  col-start-3 col-end-4 row-start-1 row-end-2 display  items-center justify-center gap-4 hidden xl:flex">
          <h1>Historical Weather</h1>
          <button
            onClick={handleNavigate}
            className="border rounded-lg p-2 bg-yellow-300"
          >
            <b>View Historical Data</b>
          </button>
        </div>

        <div className="TODAYSHIGHLIGHT m-5  bg-[#212D3C] border rounded-lg  col-start-1 col-end-4 row-start-2 row-end-3 p-2 sm:col-start-1 sm:col-end-3">
          <h1 className="text-center mb-3 mt-3 text-yellow-300">
            TODAY'S HIGHLIGHT
          </h1>
          <div className="grid grid-cols-2 items-start content-evenly border-b-2 border-gray-400 md:grid-cols-3 ">
            <div className="text-center ">
              {" "}
              {weather && weather.current ? (
                <div>
                  <p>{weather.current.temp_c} C</p>

                  <img src={`https:${icon}`} alt="" />

                  <p>{weather.current.condition.text}</p>
                </div>
              ) : (
                <p>Loading.......</p>
              )}
            </div>

            <div>
              {todaysTimeline ? (
                todaysTimeline.forecast.forecastday.map(
                  (dayForeCast, index) => {
                    return (
                      <div className="text-center  ">
                        <p>
                          FEELS LIKE : {todaysTimeline.current.feelslike_c} C 🌡️
                        </p>
                        <p>UV INDEX : {todaysTimeline.current.uv} ⚠️</p>
                        <p>
                          WIND : {todaysTimeline.current.wind_mph}mph 💨
                          <br />
                          {todaysTimeline.current.wind_kph}kph 💨
                        </p>
                        <p>HUMIDITY : {todaysTimeline.current.humidity}% 💧</p>
                      </div>
                    );
                  }
                )
              ) : (
                <p>loading......</p>
              )}
            </div>
            <div>
              {todaysTimeline ? (
                todaysTimeline.forecast.forecastday.map(
                  (dayForeCast, index) => {
                    return (
                      <div className="text-center hidden flex-col  md:block ">
                        <p>SUNRISE : {dayForeCast.astro.sunrise} 🌄</p>
                        <p>SUNSET : {dayForeCast.astro.sunset} 🌅</p>
                        <p>MOON RISE :{dayForeCast.astro.moonrise} 🌃</p>
                        <p>MOON SET : {dayForeCast.astro.moonset} 🌆</p>
                      </div>
                    );
                  }
                )
              ) : (
                <p>loading......</p>
              )}
            </div>
          </div>
        </div>

        <div className="TODAYSTIMELINE m-5 bg-[#212D3C] border rounded-lg overflow-auto col-start-1 col-end-4 row-start-3 row-end-4 sm:col-start-1 sm:col-end-3">
          <h1 className="text-center mb-3 mt-3 text-yellow-300">
            TODAY'S TIMELINE
          </h1>
          <table className="text-center w-full">
            <thead>
              <tr>
                {todaysTimeline ? (
                  todaysTimeline.forecast.forecastday[0].hour.map(
                    (item, index) => (
                      <th className="p-2 border-b border-gray-200" key={index}>
                        {item.time.split(" ")[1]}
                      </th>
                    )
                  )
                ) : (
                  <th>loading......</th>
                )}
              </tr>
            </thead>
            <tbody>
              <tr>
                {todaysTimeline ? (
                  todaysTimeline.forecast.forecastday[0].hour.map(
                    (item, index) => (
                      <td className="p-2 border-b border-gray-200" key={index}>
                        {item.temp_c}°C
                      </td>
                    )
                  )
                ) : (
                  <td>loading......</td>
                )}
              </tr>
              <tr>
                {todaysTimeline ? (
                  todaysTimeline.forecast.forecastday[0].hour.map(
                    (item, index) => (
                      <td className="p-2 border-b border-gray-200" key={index}>
                        <div>
                          {item.condition.text}
                          <img
                            src={`https:${item.condition.icon}`}
                            alt=""
                            className="w-6 h-6 inline"
                          />
                        </div>
                      </td>
                    )
                  )
                ) : (
                  <td>loading......</td>
                )}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="WEEKLYFORECAST  m-5  row-start-2 row-end-4 col-start-3 col-end-4 bg-[#212D3C] border rounded-lg overflow-x-scroll hidden sm:block md: text-center md:block md:col-start-1 md:col-end-3 md:row-start-4 md-row-end-5 xl:col-start-3 xl:col-end-4 xl:row-start-2 xl:row-end-4 md:text-center">
          <h1 className="text-center mb-3 mt-3 text-yellow-300">
            Week's Forecast
          </h1>
          <div className="pl-3 pr-3 ">
            {futureForecastData.length > 0 ? (
              <WeatherHistory weatherData={futureForecastData} />
            ) : (
              <p>Loading...</p>
            )}
          </div>

          <div className="p-5">
            <h3>
              TO CHECKOUT THE FORECAST FOR THE NEXT 15 DAYS , CLICK HERE :{" "}
              <br />
              <button
                className="border rounded-lg p-2 bg-yellow-300 mt-3"
                onClick={futureForecastNavigateHandle}
              >
                <b>see Forecast</b>
              </button>
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};
export default FetchWeather;
