import { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { WeatherContext } from "../App";
import { useNavigate } from "react-router-dom";

const FutureForecast = () => {
  const navigate = useNavigate();
  const today = new Date();
  const { city, apiKey } = useContext(WeatherContext);
  const [futureForecastData, setFutureForecastData] = useState([]);

  const futureForecastNavigateHandle = () => {
    navigate("/");
  };
  const handleCityChange = (event) => {
    setCity(event.target.value);
  }

  useEffect(() => {
    const fetchFutureForecast = async () => {
      const requests = [];
      setFutureForecastData([]); // Clear previous data

      for (let i = 0; i < 15; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i); // Increment the date by i days

        const formattedDate = date.toISOString().split("T")[0];
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&dt=${formattedDate}&days=1`;

        requests.push(axios.get(url)); // Push each day's forecast request into the requests array
      }

      try {
        const responses = await Promise.all(requests); // Await all API requests simultaneously
        const data = responses.map((response) => response.data); // Extract forecast data from the responses
        console.log("FUTURE FORECAST DATA", data);
        setFutureForecastData(data); // Store the forecast data for the future days
      } catch (error) {
        console.error("Error fetching future forecast:", error.response ? error.response.data : error.message);
      }
    };

    fetchFutureForecast(); // Call the function to fetch data
  }, [city, apiKey]);

  return (
    <div className="p-6">
      <button onClick={futureForecastNavigateHandle} className="mb-4 p-2 bg-blue-500 text-white rounded">
        Home
      </button>
      <input
        type="text"
        value={city}
        onChange={handleCityChange}
        placeholder="Enter a city"
        className="mb-4 p-2   w-1/3  m-2 border-4 border-gray-400 rounded-lg"
      />

      <h2 className="text-2xl font-bold mb-4">Historical Weather Data for <b><u><i>{city }</i></u></b></h2>

      <div className="space-y-6  ">
        {futureForecastData.map((dayData, dayIndex) => (
          <div key={dayIndex}>
            <h3 className="text-lg  border border-gray-200 font-semibold mb-4 text-yellow-300" >{dayData.forecast.forecastday[0].date}</h3>

            <div className="overflow-x-auto">
              <table className="min-w-max table-auto border-collapse bg-[#212D3C] mb-3">
                <thead>
                  <tr className="text-left border-b border-gray-200">
                    <th className="p-2 border-r border-gray-200">Time</th>
                    {dayData.forecast.forecastday[0].hour.map((hourData, hourIndex) => (
                      <th key={hourIndex} className="p-2 border-r border-gray-200">
                        {hourData.time.split(" ")[1]}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-200">
                    <td className="p-2 border-r border-gray-200">Temperature (°C)</td>
                    {dayData.forecast.forecastday[0].hour.map((hourData, hourIndex) => (
                      <td key={hourIndex} className="p-2 border-r border-gray-200">
                        {hourData.temp_c}°C
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="p-2 border-r border-gray-200">Condition</td>
                    {dayData.forecast.forecastday[0].hour.map((hourData, hourIndex) => (
                      <td key={hourIndex} className="p-2 border-r border-gray-200">
                        {hourData.condition.text}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="p-2 border-r border-gray-200">Icon</td>
                    {dayData.forecast.forecastday[0].hour.map((hourData, hourIndex) => (
                      <td key={hourIndex} className="p-2 border-r border-gray-200">
                        <img
                          src={`https:${hourData.condition.icon}`}
                          alt="icon"
                          className="w-6 h-6"
                        />
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="p-2 border-r border-gray-200">Rain (%)</td>
                    {dayData.forecast.forecastday[0].hour.map((hourData, hourIndex) => (
                      <td key={hourIndex} className="p-2 border-r border-gray-200">
                        {hourData.chance_of_rain}%
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="p-2 border-r border-gray-200">Snow (%)</td>
                    {dayData.forecast.forecastday[0].hour.map((hourData, hourIndex) => (
                      <td key={hourIndex} className="p-2 border-r border-gray-200">
                        {hourData.chance_of_snow}%
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="p-2 border-r border-gray-200">Wind Speed</td>
                    {dayData.forecast.forecastday[0].hour.map((hourData, hourIndex) => (
                      <td key={hourIndex} className="p-2 border-r border-gray-200">
                        {hourData.wind_kph} kph / {hourData.wind_mph} mph
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

};

export default FutureForecast;

