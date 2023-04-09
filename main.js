let cityInput = document.querySelector('.city');
let day = document.querySelector('.day');
let date_year = document.querySelector('.date');
let time = document.querySelector('.time');
let temperature = document.querySelector('.temperature');
let maxTemp = document.querySelector('.maxtemp');
let minTemp = document.querySelector('.mintemp');
let windSpeed = document.querySelector('.windspeed');
let humidity = document.querySelector('.humidity');
let pressure = document.querySelector('.pressure');
let sunriseTime = document.querySelector('.sunrisetime');
let sunsetTime = document.querySelector('.sunsettime');
let weatherStatus = document.querySelector('.weatherstatus');
let image = document.querySelector('.image');

cityInput.addEventListener('keyup', showWeather);

function showWeather(e) {
    if (e.keyCode === 13) {
        let city = cityInput.value;
        let xml = new XMLHttpRequest();
        xml.open("GET", `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=63dd46b2292ff9dae5832550ea217fb7&units=metric`);
        xml.onreadystatechange = function() {
            if(xml.readyState === 4 && xml.status === 200) {
                displayResult(JSON.parse(xml.responseText));
            }
        };
        xml.send();
    }
}

function displayResult(data) {
   
    let date = new Date();
    let localTime = date.getTime();
    let localOffset = date.getTimezoneOffset() * 60000;
    let utc = localTime + localOffset;

    let utcTime = utc + 1000 * data.timezone;
    let newCity = new Date(utcTime);

    let msunrise = new Date(data.sys.sunrise * 1000).getMinutes();
    let msunset = new Date(data.sys.sunset * 1000).getMinutes();
    let hsunrise = new Date(data.sys.sunrise * 1000).getHours();
    let hsunset = new Date(data.sys.sunset * 1000).getHours();

    hsunrise < 10 ? (hsunrise = `0${hsunrise}`) : (hsunrise = hsunrise);
    hsunset < 10 ? (hsunset = `0${hsunset}`) : (hsunset = hsunset);
    msunrise < 10 ? (msunrise = `0${msunrise}`) : (msunrise = msunrise);
    msunset < 10 ? (msunset = `0${msunset}`) : (msunset = msunset);

    let cityHour = newCity.getHours();
    let cityMinute = newCity.getMinutes();
    cityHour < 10 ? (cityHour= `0${cityHour}`) : (cityHour = cityHour);
    cityMinute < 10 ? (cityMinute= `0${cityMinute}`) : (cityMinute = cityMinute);

    temperature.innerHTML = `${Math.round(data.main.temp)} &deg;C`;
    maxTemp.innerHTML = `Max: ${Math.round(data.main.temp_max)} &deg;C`;
    minTemp.innerHTML = `Min: ${Math.round(data.main.temp_min)} &deg;C`;
    windSpeed.innerHTML = `${data.wind.speed} Km/h`;
    humidity.innerHTML = `${data.main.humidity} %`;
    pressure.innerHTML = `${data.main.pressure} hPa`;
    sunriseTime.innerHTML = `${hsunrise}:${msunrise} h`;
    sunsetTime.innerHTML = `${hsunset}:${msunset} h`;
    weatherStatus.innerHTML = `Weather Status: ${data.weather[0].description}`; 

    let currentStatus = data.weather[0].description;

    if(currentStatus.includes("clear sky")) {
        image.setAttribute("src", "images/clearsky.png");
    } else if (currentStatus.includes("rain")) {
        image.setAttribute("src", "images/rain.png");
    } else if (currentStatus.includes("thunderstorm")) {
        image.setAttribute("src", "images/thunderstorm.png");
    } else if (currentStatus.includes("snow")) {
        image.setAttribute("src", "images/snow.png");
    } else if (currentStatus.includes("mist")) {
        image.setAttribute("src", "images/mist.png");
    } else if (currentStatus.includes("clouds")) {
        image.setAttribute("src", "images/brokenclouds.png");
    } 

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thurstday", "Friday", "Saturday"];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    day.innerHTML = days[newCity.getDay()];
    date_year.innerHTML = `${months[newCity.getMonth()]} ${newCity.getUTCDate()}, ${newCity.getFullYear()}`;

    time.innerHTML = `${cityHour}:${cityMinute} h`;
}