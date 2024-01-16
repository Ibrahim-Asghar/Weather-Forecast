function getLocation() {
    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(showWeather, handleLocationError);


    } else {
        alert('Location not supported or denied.');
    }
}

function handleLocationError(error) {
    if (error.code === 1) {
        manualWeatherCheck();
    } else {
        alert('error getting location')
    }
}

function showWeather(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    getWeatherByCoordinates(latitude, longitude);
}

function getWeatherByCoordinates(latitude, longitude) {
    let Api_key = 'a19ac5ed42c436634a170333b3d18673';
    console.log("API Request URL:", `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${Api_key}`);

    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${Api_key}`)
        .then((response) => {

            document.querySelector('#country').innerHTML = response.data.sys.country;
            document.querySelector('#city').innerHTML = response.data.name;
            document.querySelector('#temp').innerHTML = response.data.main.temp;
            document.querySelector('#weatherdesc').innerHTML = response.data.weather[0].description;
            document.querySelector('#humidity').innerHTML = 'Humidity ' + response.data.main.humidity;
            let windSpeedKMH = (response.data.wind.speed * 3.6).toFixed(2);
            document.querySelector('#wind').innerHTML = 'Wind Speed ' + windSpeedKMH + ' km/h';
            // document.querySelector('#wind').innerHTML = 'wind ' + response.data.wind.speed + ' m/s';
            document.querySelector('#temp_max').innerHTML = 'Temp max ' + response.data.main.temp_max;
            document.querySelector('#temp_min').innerHTML = 'Temp low ' + response.data.main.temp_min;

            updateLocalStorage(response.data.name, response.data);
            renderCityButtons();
        })
        .catch((error) => {
            console.log(error);
        });
}


function manualWeatherCheck() {
    const cityName = prompt("Enter city name for weather check:");
    if (cityName) {
        getWeatherByCityName(cityName);

    } else {
        alert("City name cannot be empty.");
    }
}

function getWeatherByCity() {
    const cityName = document.getElementById('inp-city').value;
    if (cityName) {
        getWeatherByCityName(cityName);

    } else {
        alert('City name cannot be empty.');
    }
}



function getWeatherByCityName(cityName) {
    let Api_key = 'a19ac5ed42c436634a170333b3d18673';
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${Api_key}`)
        .then((response) => {
            console.log(response)

            document.querySelector('#country').innerHTML = response.data.sys.country;
            document.querySelector('#city').innerHTML = response.data.name;
            document.querySelector('#temp').innerHTML = response.data.main.temp;
            document.querySelector('#weatherdesc').innerHTML = response.data.weather[0].description;
            document.querySelector('#humidity').innerHTML = 'Humidity ' + response.data.main.humidity;
            let windSpeedKMH = (response.data.wind.speed * 3.6).toFixed(2);
            document.querySelector('#wind').innerHTML = 'Wind Speed ' + windSpeedKMH + ' km/h';
            document.querySelector('#temp_max').innerHTML = 'Temp max ' + response.data.main.temp_max;
            document.querySelector('#temp_min').innerHTML = 'Temp low ' + response.data.main.temp_min;


            updateLocalStorage(response.data.name, response.data);
            renderCityButtons();
        })
        .catch((error) => {
            console.log(error);
        });
}


function updateLocalStorage(city, data) {
    let weatherHistory = JSON.parse(localStorage.getItem('weatherHistory')) || {};
    weatherHistory[city] = data;
    localStorage.setItem('weatherHistory', JSON.stringify(weatherHistory));

}

function createCityButton(city) {
    const button = document.createElement('button');
    button.textContent = city;
    button.className = 'btn btn btn-warning mt-5 col-12';
    button.addEventListener('click', function () {
        getWeatherByCityName(city);
    });
    return button;
}


function renderCityButtons() {
    const weatherHistory = JSON.parse(localStorage.getItem('weatherHistory'))
    const buttonContainer = document.getElementById('cityButtons');
    buttonContainer.innerHTML = '';

    for (const city in weatherHistory) {
        const button = createCityButton(city);
        buttonContainer.appendChild(button);
    }

}




setTimeout(() => {
    getLocation();
    renderCityButtons();
}, 1000);

renderCityButtons();


function searchpage() {
    window.location.href = 'index.html';

}
