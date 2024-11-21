//https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?key=https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?key=2ENCEKSZGFMZW584F4R3ZFYL2

const search = document.querySelector("#search");
const button = document.querySelector("button");
const content = document.querySelector("#content");
const result = document.querySelector("#result");

let cloudCover;
let precip;
let snow;
let sunrise;
let sunset;
let temp;
let wind;
let resolvedAddress;
let str;

function getWeather() {
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${search.value}?key=2ENCEKSZGFMZW584F4R3ZFYL2`, { mode: 'cors' } )
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            cloudCover = response.currentConditions.cloudcover;
            precip = response.currentConditions.precip;
            snow = response.currentConditions.snow;
            sunrise = response.currentConditions.sunrise;
            sunset = response.currentConditions.sunset;
            temp = response.currentConditions.temp;
            wind = response.currentConditions.windgust;
            resolvedAddress = response.resolvedAddress;

            if (resolvedAddress.includes("United States")) {
                let p = document.createElement("p");
                p.textContent = temp + " °F";
                content.appendChild(p);
                toggleUnit = document.createElement("button");
                toggleUnit.textContent = "change temp unit";
                toggleUnit.setAttribute("type", "button");
                toggleUnit.addEventListener("click", function() {
                    if (p.textContent.includes("F")) {
                        temp = (Math.round((temp - 32) * (5 / 9) * 10) / 10);
                        p.textContent = temp + " °C";
                        p.appendChild(toggleUnit);
                    } else {
                        temp = (Math.round(((temp * 9) / 5 + 32) * 10) / 10);
                        p.textContent = temp + " °F";
                        p.appendChild(toggleUnit);
                    }
                })
                p.appendChild(toggleUnit);
                let p2 = document.createElement("p");
                if (Number(cloudCover) < 10) {
                    p2.textContent = "little to no clouds";
                } else if (Number(cloudCover) < 35) {
                    p2.textContent = "a few clouds";
                } else if (Number(cloudCover) < 70) {
                    p2.textContent = "cloudy";
                } else {
                    p2.textContent = "very cloudy";
                }
                content.appendChild(p2);
                let p3 = document.createElement("p");
                if (Number(precip) == 0) {
                    p3.textContent = "no precipitation";
                } else if (Number(precip) < 30) {
                    p3.textContent = "a little rain";
                } else if (Number(precip) < 60) {
                    p3.textContent = "rainy";
                } else {
                    p3.textContent = "very rainy";
                }
                if (Number(snow) > 0) {
                    p3.textContent = "snowy";
                }
                console.log(snow);
                content.appendChild(p3);
                console.log(sunrise);
                console.log(sunset);
                let sunriseArray = sunrise.split(":");
                let sunriseHour = +sunriseArray[0];
                let sunriseMin = +sunriseArray[1];
                let sunsetArray = sunset.split(":");
                let sunsetHour = +sunsetArray[0];
                let sunsetMin = +sunsetArray[1];
                let p4 = document.createElement("p");
                content.appendChild(p4);
                const observer = new MutationObserver((mutationsList) => {
                    for (const mutation of mutationsList) {
                        if (mutation.type === "childList") {
                            if (result.textContent.trim() !== "") {
                                console.log("The div was populated with text:", result.textContent);
                                const numbers = result.textContent.match(/\d+/g).map(Number);
                                console.log(numbers);
                                if ((((numbers[0] > sunriseHour) && (numbers[0] < sunsetHour)) ||
                                ((numbers[0] == sunriseHour) && (numbers[1] >= sunriseMin)) ||
                                ((numbers[0] == sunsetHour) && (numbers[1] <= sunsetMin))) && (cloudCover < 50)) {
                                    p4.textContent = "sun is out";
                                } else {
                                    p4.textContent = "sun is not out";
                                }
                            }
                        }
                    }
                });
                const config = {
                    childList: true,
                    subtree: false,
                };
                observer.observe(result, config);
                let p5 = document.createElement("p");
                content.appendChild(p5);
                if (Number(wind) >= 4) {
                    p5.textContent = "windy";
                } else {
                    p5.textContent = "not windy";
                }
            } else {
                temp = (Math.round((temp - 32) * (5 / 9) * 10) / 10);
                let p = document.createElement("p");
                p.textContent = temp + " °C";
                content.appendChild(p);
                toggleUnit = document.createElement("button");
                toggleUnit.textContent = "change temp unit"
                toggleUnit.setAttribute("type", "button");
                toggleUnit.addEventListener("click", function() {
                    if (p.textContent.includes("F")) {
                        temp = (Math.round((temp - 32) * (5 / 9) * 10) / 10);
                        p.textContent = temp + " °C";
                        p.appendChild(toggleUnit);
                    } else {
                        temp = (Math.round(((temp * 9) / 5 + 32) * 10) / 10);
                        p.textContent = temp + " °F";
                        p.appendChild(toggleUnit);
                    }
                })
                p.appendChild(toggleUnit);
                let p2 = document.createElement("p");
                if (Number(cloudCover) < 10) {
                    p2.textContent = "little to no clouds";
                } else if (Number(cloudCover) < 35) {
                    p2.textContent = "a few clouds";
                } else if (Number(cloudCover) < 70) {
                    p2.textContent = "cloudy";
                } else {
                    p2.textContent = "very cloudy";
                }
                content.appendChild(p2);
                let p3 = document.createElement("p");
                if (Number(precip) == 0) {
                    p3.textContent = "no precipitation";
                } else if (Number(precip) < 30) {
                    p3.textContent = "a little rain";
                } else if (Number(precip) < 60) {
                    p3.textContent = "rainy";
                } else {
                    p3.textContent = "very rainy";
                }
                if (Number(snow) > 0) {
                    p3.textContent = "snowy";
                }
                content.appendChild(p3);
                console.log(sunrise);
                console.log(new Date())
                console.log(sunrise);
                console.log(sunset);
                let sunriseArray = sunrise.split(":");
                let sunriseHour = +sunriseArray[0];
                let sunriseMin = +sunriseArray[1];
                let sunsetArray = sunset.split(":");
                let sunsetHour = +sunsetArray[0];
                let sunsetMin = +sunsetArray[1];
                let p4 = document.createElement("p");
                content.appendChild(p4);
                const observer = new MutationObserver((mutationsList) => {
                    for (const mutation of mutationsList) {
                        if (mutation.type === "childList") {
                            if (result.textContent.trim() !== "") {
                                console.log("The div was populated with text:", result.textContent);
                                const numbers = result.textContent.match(/\d+/g).map(Number);
                                console.log(numbers);
                                if ((((numbers[0] > sunriseHour) && (numbers[0] < sunsetHour)) ||
                                ((numbers[0] == sunriseHour) && (numbers[1] >= sunriseMin)) ||
                                ((numbers[0] == sunsetHour) && (numbers[1] <= sunsetMin))) && (cloudCover < 50)) {
                                    p4.textContent = "sun is out";
                                } else {
                                    p4.textContent = "sun is not out";
                                }
                            }
                        }
                    }
                });
                const config = {
                    childList: true,
                    subtree: false,
                };
                observer.observe(result, config);
                let p5 = document.createElement("p");
                content.appendChild(p5);
                if ((Number(wind) >= 4)&&(resolvedAddress.includes("United Kingdom"))){
                    p5.textContent = "windy";
                } else if (Number(wind) >= 6.44  ){
                    p5.textContent = "windy";
                } else {
                    p5.textContent = "no wind";
                }
            }
        })
        .catch(function(err) {
            console.log(err);
        });
}

button.addEventListener('click', () => {
    content.textContent = "";
    getCityTime();
    getWeather();
});

function getCityTime() {
    const city = search.value.trim();
    if (!city) {
        result.textContent = "Please enter a city name.";
        return;
    }

    // Clear result to avoid showing stale data
    result.textContent = "Fetching time...";

    // Step 1: Get the coordinates of the city
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${city}&key=e4202136f0c9430194b5b526cda54a19&no_cache=${Date.now()}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch coordinates");
            }
            return response.json();
        })
        .then((data) => {
            if (!data.results || data.results.length === 0) {
                throw new Error(`Could not find coordinates for "${city}"`);
            }

            const { lat, lng } = data.results[0].geometry; // Extract latitude and longitude
            console.log(`Coordinates of ${city}:`, lat, lng);

            // Step 2: Fetch the time zone using the coordinates
            return fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat},${lng}&key=e4202136f0c9430194b5b526cda54a19&no_cache=${Date.now()}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to fetch time zone information");
                    }
                    return response.json();
                })
                .then((data) => {
                    const timeZone = data.results[0].annotations.timezone.name; // Extract timezone
                    console.log(`Time Zone of ${city}:`, timeZone);

                    // Step 3: Fetch the current time from WorldTimeAPI
                    return fetch(`http://worldtimeapi.org/api/timezone/${timeZone}?no_cache=${Date.now()}`)
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error(`Failed to fetch time for ${timeZone}`);
                            }
                            return response.json();
                        })
                        .then((data) => {
                            const cityTimeString = data.datetime; // This is already local time in the city's time zone
                            const cityTime = new Date(cityTimeString); // Parse the ISO 8601 datetime string
                            const cityLocalTime = new Intl.DateTimeFormat("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                                timeZone: timeZone,
                            }).format(cityTime);
                            result.textContent = `The time in ${city} (${timeZone}) is ${cityLocalTime}.`;
                        });
                });
        })
        .catch((err) => {
            console.error("Error fetching city time:", err);
            result.textContent = "An error occurred. Please try again.";
        });
}