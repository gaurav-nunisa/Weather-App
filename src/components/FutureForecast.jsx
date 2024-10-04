import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { WeatherContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function futureForeCast() {
  const today = new Date();
  const { city, setCity, apiKey } = useContext(WeatherContext);
  const [FutureForecastData, setFutureForecastData] = useState([]);
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/");
  };
  function handleCityChange(event) {
    setCity(event.target.value);
  }

  // Fetch historical weather data for the past 7 days
  const fetchFutureForeCastData = async () => {
    const requests = [];

    // Loop through the last 7 days to get data for each day
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const formattedDate = date.toISOString().split("T")[0];

      const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&dt=${formattedDate}`;
      requests.push(axios.get(url));
    }

    // Wait for all API calls to resolve
    const responses = await Promise.all(requests);
    const data = responses.map((response) => response.data);
    console.log("FUTURE DATA");
    console.log(data);

    // Store the data in state
    setFutureForecastData(data);
  };

  // useEffect hook to call the fetch function when component mounts or when city/apiKey changes
  useEffect(() => {
    fetchFutureForeCastData();
  }, [city, apiKey]);

  return (
    <div className="p-6">
      <button onClick={handleNavigate}>Home</button>
      <input
        type="text"
        value={city}
        onChange={handleCityChange}
        placeholder="Enter a city"
        className="mb-4 p-2 border rounded w-full"
      />

      <h2 className="text-2xl font-bold mb-4">
       Forecast for {city}
      </h2>

      <div className="space-y-6">
        {FutureForecastData.map((dayData, dayIndex) => (
          <div key={dayIndex}>
            <h3 className="text-lg font-semibold mb-4">
              {dayData.forecast.forecastday[0].date}
            </h3>

            <div className="overflow-x-auto">
              <table className="min-w-max table-auto border-collapse">
                <thead>
                  <tr className="text-left border-b border-white">
                    <th className="p-2 border-r border-white">Time</th>
                    {dayData.forecast.forecastday[0].hour.map(
                      (hourData, hourIndex) => (
                        <th
                          key={hourIndex}
                          className="p-2 border-r border-white"
                        >
                          {hourData.time.split(" ")[1]}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-white">
                    <td className="p-2 border-r border-white">
                      Temperature (°C)
                    </td>
                    {dayData.forecast.forecastday[0].hour.map(
                      (hourData, hourIndex) => (
                        <td
                          key={hourIndex}
                          className="p-2 border-r border-white"
                        >
                          {hourData.temp_c}°C
                        </td>
                      )
                    )}
                  </tr>
                  <tr className="border-t border-white">
                    <td className="p-2 border-r border-white">Condition</td>
                    {dayData.forecast.forecastday[0].hour.map(
                      (hourData, hourIndex) => (
                        <td
                          key={hourIndex}
                          className="p-2 border-r border-white"
                        >
                          {hourData.condition.text}
                        </td>
                      )
                    )}
                  </tr>
                  <tr className="border-t border-white">
                    <td className="p-2 border-r border-white">Icon</td>
                    {dayData.forecast.forecastday[0].hour.map(
                      (hourData, hourIndex) => (
                        <td
                          key={hourIndex}
                          className="p-2 border-r border-white"
                        >
                          <img
                            src={`https:${hourData.condition.icon}`}
                            alt="icon"
                            className="w-6 h-6"
                          />
                        </td>
                      )
                    )}
                  </tr>
                  <tr className="border-t border-white">
                    <td className="p-2 border-r border-white">Rain (%)</td>
                    {dayData.forecast.forecastday[0].hour.map(
                      (hourData, hourIndex) => (
                        <td
                          key={hourIndex}
                          className="p-2 border-r border-white"
                        >
                          {hourData.chance_of_rain}%
                        </td>
                      )
                    )}
                  </tr>
                  <tr className="border-t border-white">
                    <td className="p-2 border-r border-white">Snow (%)</td>
                    {dayData.forecast.forecastday[0].hour.map(
                      (hourData, hourIndex) => (
                        <td
                          key={hourIndex}
                          className="p-2 border-r border-white"
                        >
                          {hourData.chance_of_snow}%
                        </td>
                      )
                    )}
                  </tr>
                  <tr className="border-t border-white">
                    <td className="p-2 border-r border-white">Wind Speed</td>
                    {dayData.forecast.forecastday[0].hour.map(
                      (hourData, hourIndex) => (
                        <td
                          key={hourIndex}
                          className="p-2 border-r border-white"
                        >
                          {hourData.wind_kph} kph / {hourData.wind_mph} mph
                        </td>
                      )
                    )}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
