import "./App.css";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiKey = "2669e0d7689642c9827134801240702";

  const selectCity = (e) => {
    const selectedCity = e.target.value;
    setCity(selectedCity);
  };

  const fetchWeather = async () => {
    if (!city) {
      alert("Please enter a city name.");
      return;
    }

    setLoading(true); // Start loading
    try {
      let response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
      );
      setWeather(response.data);
      console.log(response.data);
    } catch (error) {
      alert("Failed to fetch weather data");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="App">
      <Box
        className="weather-app-container"
        style={{
          margin: "1rem",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          justifyContent: "center",
        }}
      >
        <input
          id="outlined-basic"
          label="Enter city name"
          type="text"
          style={{ padding: "0.8rem" }}
          onChange={selectCity}
        />
        <Button
          variant="contained"
          style={{ backgroundColor: "#1DB954" }}
          onClick={fetchWeather}
        >
          Search
        </Button>
      </Box>

      {loading ? (
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "2rem",
          }}
        >
          <p>Loading data... </p>
        </Box>
      ) : (
        weather && (
          <Box
            className= "weather-cards"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
              marginTop: "2rem",
            }}
          >
            <Paper
              className="weather-card"
              style={{
                height: "100px",
                width: "200px",
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>Temperature:</Typography>
              <Typography>{weather.current.temp_c} °C</Typography>
            </Paper>
            <Paper
              className="weather-card"
              style={{
                height: "100px",
                width: "200px",
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>Humidity:</Typography>
              <Typography>{weather.current.humidity} %</Typography>
            </Paper>
            <Paper
              className="weather-card"
              style={{
                height: "100px",
                width: "200px",
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>Condition:</Typography>
              <Typography>{weather.current.condition.text}</Typography>
            </Paper>
            <Paper
              className="weather-card"
              style={{
                height: "100px",
                width: "200px",
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>Wind Speed:</Typography>
              <Typography>{weather.current.wind_kph} kph</Typography>
            </Paper>
          </Box>
        )
      )}
    </div>
  );
}

export default App;
