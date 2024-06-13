document.addEventListener("DOMContentLoaded", function () {
    document
        .getElementById("uv-form")
        .addEventListener("submit", function (event) {
            event.preventDefault();

            const cityName = document.getElementById("city").value.trim();

            // Clear the city input after submission
            document.getElementById("city").value = "";

            // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
            const apiKeyWeather = "c910185fdcf76476c4870196d821f66a";
            const apiUrlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKeyWeather}`;

            fetch(apiUrlWeather)
                .then((response) => response.json())
                .then((data) => {
                    if (data.coord) {
                        const latitude = data.coord.lat;
                        const longitude = data.coord.lon;

                        // Replace 'YOUR_API_KEY' with your actual OpenUV API key
                        const apiKeyUV = "openuv-yu4rlxakhwp0-io";
                        const apiUrlUV = `https://api.openuv.io/api/v1/uv?lat=${latitude}&lng=${longitude}`;

                        return fetch(apiUrlUV, {
                            method: "GET",
                            headers: {
                                "x-access-token": apiKeyUV,
                            },
                        });
                    } else {
                        throw new Error("City not found");
                    }
                })
                .then((response) => response.json())
                .then((data) => {
                    const uvResultDiv = document.getElementById("uv-result");
                    uvResultDiv.innerHTML = ""; // Clear previous content

                    if (data && data.result && data.result.uv !== undefined) {
                        const uvValue = parseFloat(data.result.uv).toFixed(2); // Round to 2 decimal places
                        const uvTitle = document.createElement("h2");
                        uvTitle.textContent = `Current UV in ${cityName}: ${uvValue}`;
                        uvResultDiv.appendChild(uvTitle);

                        // Define the background image based on UV index ranges
                        let backgroundImage = "";

                        if (uvValue <= 3) {
                            backgroundImage = "url('./images/good.jpeg')"; // Image for low UV index
                        } else if (uvValue > 3 && uvValue <= 6) {
                            backgroundImage = "url('./images/alert.jpeg')"; // Image for moderate UV index
                        } else {
                            backgroundImage = "url('./images/angry_sun.jpeg')"; // Image for high or extreme UV index
                        }

                        document.body.style.backgroundImage = backgroundImage;
                    } else {
                        console.error("Invalid UV data:", data);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching UV data:", error);
                    const uvResultDiv = document.getElementById("uv-result");
                    uvResultDiv.innerHTML = "<h2>Error loading UV data.</h2>";
                });
        });
});
