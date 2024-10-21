import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { WeatherContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function HistoricalData() {
  const today = new Date();
  const { city, setCity, apiKey } = useContext(WeatherContext);
  const [historicalForecastData, setHistoricalForecastData] = useState([]);
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/");
  };
  function handleCityChange(event) {
    setCity(event.target.value);
  }

  // Fetch historical weather data for the past 7 days
  const fetchHistoricalData = async () => {
    const requests = [];

    // Loop through the last 7 days to get data for each day
    for (let i = 0; i < 9; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const formattedDate = date.toISOString().split("T")[0];

      const url = `https://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${city}&dt=${formattedDate}`;
      requests.push(axios.get(url));
    }

    // Wait for all API calls to resolve
    const responses = await Promise.all(requests);
    const data = responses.map((response) => response.data);
    console.log("HISTORICAL DATA");
    console.log(data);

    // Store the data in state
    setHistoricalForecastData(data);
  };

  // useEffect hook to call the fetch function when component mounts or when city/apiKey changes
  useEffect(() => {
    fetchHistoricalData();
  }, [city, apiKey]);

  return (
    <div className="p-6">
      <button className="mb-4 p-2 bg-blue-500 text-white rounded" onClick={handleNavigate}>Home</button>
      <input
        type="text"
        value={city}
        onChange={handleCityChange}
        placeholder="Enter a city"
        className="mb-4 p-2   w-1/3  m-2 border-4 border-gray-400 rounded-lg"
      />

      <h2 className="text-2xl font-bold mb-4">
        Historical Weather Data for <i><u><b>{city}</b></u></i>
      </h2>

      <div className="space-y-6 ">
        {historicalForecastData.map((dayData, dayIndex) => (
          <div key={dayIndex}>
            <h3 className="text-lg font-semibold mb-4 text-purple-400">
              {dayData.forecast.forecastday[0].date}
            </h3>

            <div className="overflow-x-auto">
              <table className="min-w-max table-auto border-collapse bg-[#212D3C] mb-3"> 
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
