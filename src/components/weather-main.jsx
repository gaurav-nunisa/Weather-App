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

    // const fetchHistory = async () => {
    //   try {
    //     const historicalData = await axios.get(
    //       `https://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${encodeURIComponent(
    //         city
    //       )}&dt=${historicalYear}-${historicalMonth}-${historicalDate}`
    //     );

    //     console.log("THIS IS HISTORICAL DATA D-1");
    //     console.log(historicalData);
    //     setHistoricalDate(historicalData.data);
    //   } catch (error) {
    //     console.log('Error 400, check if date and city are valid:', error.response ? error.response.data : error.message);
    //   }
    // };
    // fetchHistory();

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
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Temperature (°C)</th>
            <th>Condition</th>
            <th>Humidity (%)</th>
          </tr>
        </thead>
        <tbody>
          {weatherTableParam.map((dayData, index) => (
            <tr key={index}>
              <td>{dayData.forecast.forecastday[0].date}</td>
              <td>{dayData.forecast.forecastday[0].day.avgtemp_c} °C</td>
              <td>{dayData.forecast.forecastday[0].day.condition.text}</td>
              <td>{dayData.forecast.forecastday[0].day.avghumidity}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

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
          <h1>Historical Weather</h1>
          <button onClick={handleNavigate}>View Historical Forecast</button>
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
          {todaysTimeline ? (
            todaysTimeline.forecast.forecastday.map((dayForeCast, index) => {
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
        <div className="TODAYSTIMELINE m-5  bg-[#212D3C] border-2 border-solid border-blue-500  overflow-auto col-start-1 col-end-3 row-start-4 row-end-5 ">
          <h1>TODAYS TIMLINE</h1>
          <table className="text-center w-[100%] 0  ">
            <thead>
              <tr>
                {todaysTimeline ? (
                  todaysTimeline.forecast.forecastday[0].hour.map(
                    (item, index) => {
                      return (
                        <th className="" key={index} colSpan={3}>
                          {item.time.split(" ")[1]}
                        </th>
                      );
                    }
                  )
                ) : (
                  <th>loading......</th>
                )}
              </tr>
              <tr>
                {todaysTimeline ? (
                  todaysTimeline.forecast.forecastday[0].hour.map(
                    (item, index) => {
                      return (
                        <th className="px-4" key={index} colSpan={3}>
                          {item.temp_c}°C
                        </th>
                      );
                    }
                  )
                ) : (
                  <th>loading......</th>
                )}
              </tr>
              <tr>
                {todaysTimeline ? (
                  todaysTimeline.forecast.forecastday[0].hour.map(
                    (item, index) => {
                      return (
                        <th className="px-4" key={index} colSpan={3}>
                          {item.condition.text}
                          {<img src={`https:${item.condition.icon}`} alt="" />}
                        </th>
                      );
                    }
                  )
                ) : (
                  <th>loading......</th>
                )}
              </tr>
            </thead>
          </table>
        </div>

        <div className="WEEKLYFORECAST  m-5  row-start-2 row-end-5 col-start-3 col-end-4 bg-[#212D3C] border-2 border-solid border-pink-500">
          <h1>Week's Forecast</h1>
          <button onClick={futureForecastNavigateHandle}>see Forecast</button>
          {futureForecastData.length > 0 ? (
            <WeatherHistory weatherData={futureForecastData} />
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
};
export default FetchWeather;
