const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "API KEY";

weatherForm.addEventListener("submit", async event => {

    event.preventDefault();

    const city = cityInput.value;

    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch (error) {
            console.error(error);
            displayError(error);
        }
    } else {
        displayError("Please enter a city.")
    }
});

async function getWeatherData(city) {

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error("Could not find weather data.");
    }

    return await response.json();
}

function displayWeatherInfo(data) {

    const { name: city,
        main: { temp, humidity, temp_max },
        weather: [{ id, description}] } = data;

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h6");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const maxTempDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = `Weather in: ${city}`;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    maxTempDisplay.textContent = `Maximum: ${(temp_max - 273.15).toFixed(1)}°C`;
    weatherEmoji.textContent = getWeatherEmoji(id) + description;

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    maxTempDisplay.classList.add("maxTempDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(maxTempDisplay);
    card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId) {

    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️"
        case (weatherId >= 300 && weatherId < 400):
            return "🌧️"
        case (weatherId >= 500 && weatherId < 600):
            return "🌨️"
        case (weatherId >= 600 && weatherId < 700):
            return "❄️"
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️"
        case (weatherId === 800):
            return "☀️"
        case (weatherId >= 801 && weatherId < 810):
            return "☁️"
        default:
            return "❓";
    }
}

function displayError(message) {

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}