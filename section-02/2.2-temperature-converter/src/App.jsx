import { useState } from "react";

const App = () => {
  const [celsius, setCelsius] = useState("");
  const [fahrenheit, setFahrenheit] = useState("");
  const [error, setError] = useState("");

  const handleCelsiusChange = (e) => {
    const value = e.target.value;
    setCelsius(value);

    // if empty, clear both
    if (value === "") {
      setFahrenheit("");
      setError("");
      return;
    }

    // allow user to start typing negative numbers or decimals
    if (value === "-" || value === ".") {
      setError("");
      return;
    }

    // of invalid (contains letters/symbols), show error and do not break Fahrenheit
    if (isNaN(value)) {
      setError("Please enter a valid number");
      return;
    }

    // valid number, clear error and update Fahrenheit
    setError("");
    const fValue = (parseFloat(value) * 9) / 5 + 32;
    setFahrenheit(fValue.toFixed(1));
  };

  // called when Fahrenheit input changes -> updates Celsius
  const handleFahrenheitChange = (e) => {
    const value = e.target.value;
    setFahrenheit(value);

    //  if empty, clear both
    if (value === "") {
      setCelsius("");
      setError("");
      return;
    }

    // allow user to start typing negative numbers or decimals
    if (value === "-" || value === ".") {
      setError("");
      return;
    }

    // if invalid, show error and do not break Celsius
    if (isNaN(value)) {
      setError("Please enter a valid number");
      return;
    }

    // valid number, clear error and update Celsius
    setError("");
    const cValue = ((parseFloat(value) - 32) * 5) / 9;
    setCelsius(cValue.toFixed(1));
  };

  const tempColors = {
    cold: "bg-blue-400",
    warm: "bg-green-300",
    hot: "bg-orange-400",
    default: "bg-gray-100",
  };

  const getBackgroundColor = (celsiusValue) => {
    // if empty, typing incomplete signs, or invalid, keep default
    if (
      celsiusValue === "" ||
      celsiusValue === "-" ||
      celsiusValue === "." ||
      isNaN(celsiusValue)
    ) {
      return tempColors.default;
    }

    const temp = parseFloat(celsiusValue);

    if (temp < 0) {
      return tempColors.cold;
    } else if (temp <= 25) {
      return tempColors.warm;
    } else {
      return tempColors.hot;
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${getBackgroundColor(celsius)}`}
    >
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-xl font-bold text-center mb-6">
          Temperature Converter
        </h1>

        {/* Celsius Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Celsius (°C)
          </label>
          <input
            type="text"
            value={celsius}
            onChange={handleCelsiusChange}
            placeholder="e.g. 100"
            className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500"
          />
        </div>

        {/* Fahrenheit Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fahrenheit (°F)
          </label>
          <input
            type="text"
            value={fahrenheit}
            onChange={handleFahrenheitChange}
            placeholder="e.g. 212"
            className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500"
          />
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm font-medium text-center">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default App;
