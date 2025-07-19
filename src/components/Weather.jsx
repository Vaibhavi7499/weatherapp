import React, { useEffect, useRef, useState } from "react";
import searchImg from "../assets/search.png";
import clearImg from "../assets/sunny_2921794.png";
import cloudImg from "../assets/clouds.png";
import drizzleImg from "../assets/drizzle.png";
import rainImg from "../assets/heavy-rain.png";
import snowImg from "../assets/snow.png";
import humidityImg from "../assets/drop_1715910.png";
import windImg from "../assets/cloud (1).png";

import "./Weather.scss";
export const Weather = () => {
  const inptref = useRef();
  const [weatherData, setWeatherData] = useState(false);
  const allicons = {
    "01d": clearImg,
    "01n": clearImg,
    "02d": cloudImg,
    "02n": cloudImg,
    "03d": cloudImg,
    "03n": cloudImg,
    "04d": drizzleImg,
    "04n": drizzleImg,
    "09d": rainImg,
    "09n": rainImg,
    "010d": rainImg,
    "010n": rainImg,
    "013d": snowImg,
    "013n": snowImg,
  };

  const search = async (city) => {
    if (city === "") {
      alert("Please enter city name!!!");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;

      const response = await fetch(url);
      const res = await response.json();
      if(!response.ok){
        alert(res.message)
        return
      }
      console.log(res);
      const icon = allicons[res.weather[0].icon] || clearImg;
      setWeatherData({
        humidity: res.main.humidity,
        windSpeed: res.wind.speed,
        temperature: Math.floor(res.main.temp),
        location: res.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
      console.error("Error in fetching weather data");
    }
  };

  useEffect(() => {
    search("London");
  }, []);

  return (
    <div className="weather">
      <div className="searchbar">
        <input ref={inptref} type="text" placeholder="Search" />
        <img
          src={searchImg}
          height={18}
          onClick={() => search(inptref.current.value)}
        />
      </div>
      {weatherData ? (
        <>
          <img src={weatherData.icon} height={200} className="weather-icon" />
          <p className="temp">{weatherData.temperature}°C </p>
          <p className="location">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidityImg} height={45} />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={windImg} height={50} />
              <div>
                <p>{weatherData.windSpeed} km/h</p>
                <span>Wind speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
