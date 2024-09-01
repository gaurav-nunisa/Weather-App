export default function HistoricalData({history}) {
  return (
    <>
      <div>
        <h1>HISTORICAL TIME LINE</h1>
        <div>//TODO: ADD DAYS SUMMARY</div>
        {history ? (
          history.forecast.forecastday.map((dayforecast, index) => {
            return (
              <div key={index}>
                <table className="table-auto min-w-full max-h-10 overflow-y-auto border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2">Time</th>
                      <th className="border border-gray-300 px-4 py-2">
                        Condition
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        Temperature (°C)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dayforecast.hour.map((timelinehour, indexHour) => (
                      <tr key={indexHour} className="text-center">
                        <td className="border border-gray-300 px-4 py-2">
                          {timelinehour.time}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {timelinehour.condition.text}{" "}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {timelinehour.temp_c}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })
        ) : (
          <p>loading......</p>
        )}
      </div>
    </>
  );
}
