document
    .getElementById("weather-form")
    .addEventListener("submit", function (event) {
        event.preventDefault();

        const latitude = document.getElementById("lat").value;
        const longitude = document.getElementById("lon").value;

        // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
        const apiKey = "c910185fdcf76476c4870196d821f66a";
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                const weatherResultDiv =
                    document.getElementById("weather-result");
                weatherResultDiv.innerHTML = ""; // Clear previous content

                const weatherTitle = document.createElement("h2");
                weatherTitle.textContent = data.name
                    ? `${data.name}, ${data.sys.country}`
                    : "The weather there is";
                weatherResultDiv.appendChild(weatherTitle);

                const weatherList = document.createElement("ul");

                const temperatureItem = document.createElement("li");
                const temperatureHeading = document.createElement("h3");
                temperatureHeading.textContent = `${Math.floor(
                    data.main.temp
                )}°C`;
                const weatherIcon = document.createElement("img");
                weatherIcon.setAttribute("alt", data.weather[0].main);
                if (data.weather[0].main === "Clouds") {
                    weatherIcon.setAttribute(
                        "src",
                        "../public/images/Cloud.png"
                    );
                } else if (data.weather[0].main === "Clear") {
                    weatherIcon.setAttribute("src", "../public/images/sun.png");
                } else if (data.weather[0].main === "Rain") {
                    weatherIcon.setAttribute(
                        "src",
                        "../public/images/rain.png"
                    );
                } else {
                    weatherIcon.setAttribute(
                        "src",
                        "../public/images/variable.png"
                    );
                }
                temperatureItem.appendChild(temperatureHeading);
                temperatureItem.appendChild(weatherIcon);
                weatherList.appendChild(temperatureItem);

                const humidityItem = document.createElement("li");
                humidityItem.textContent = `Humidity: ${data.main.humidity}%`;
                weatherList.appendChild(humidityItem);

                const windItem = document.createElement("li");
                windItem.textContent = `Wind Speed: ${data.wind.speed} m/s`;
                weatherList.appendChild(windItem);

                weatherResultDiv.appendChild(weatherList);
            })
            .catch((error) => {
                console.error("Error fetching the weather data:", error);
                const weatherResultDiv =
                    document.getElementById("weather-result");
                weatherResultDiv.innerHTML =
                    "<h2>Error loading weather data.</h2>";
            });
    });
