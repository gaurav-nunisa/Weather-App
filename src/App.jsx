import "./App.css";
import { useState , createContext} from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HistoricalData from "./components/historicalData";
import FutureForecast from "./components/FutureForecast";

import FetchWeather from "./components/weather-main";
export const WeatherContext = createContext();

import Test from "./components/test";

function App() {

  const [city, setCity] = useState("Haflong");
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY; // This remains static

  return (
    <div>
      <WeatherContext.Provider value={{ city, setCity, apiKey }}>
        <Router>
          <Routes>
            <Route path="/" element={<FetchWeather />} />
            <Route path = "/futureforecast" element={<FutureForecast />} />
            <Route path="/historical" element={<HistoricalData />} />
            <Route path="/test" element={<Test />} />
          </Routes>
        </Router>
      </WeatherContext.Provider>
    </div>
  );
}

export default App;
