const apiKey = '8db3f405694570190179de9cab9f16c0'; 
const defaultCity = 'Gadsden'; // default city

// get elements from the DOM
const searchBox = document.querySelector('.search-box input');
const searchButton = document.querySelector('.search-box button');
const locationElement = document.querySelector('#loc');
const datetimeElement = document.querySelector('.datetime p');
const tempTitle = document.querySelector('#Title');
const tempValue = document.querySelector('#valueoftitle');
const weatherConditions = document.querySelector('.text_box p:last-child');

const humidityBtn = document.querySelector('#humidityBtn');
const pressureBtn = document.querySelector('#pressureBtn');
const windBtn = document.querySelector('#windBtn');



// fetch weather data for a given city
function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                throw new Error(data.message);
            }

            // update the location element
            locationElement.textContent = data.name;

            // update the datetime element
            const date = new Date(data.dt * 1000);
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const dayOfWeek = days[date.getDay()];
            const dayOfMonth = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            datetimeElement.textContent = `${dayOfWeek} ${dayOfMonth}/${month}/${year}`;

            // update the temperature and weather conditions elements
            tempTitle.textContent = 'Temperature';
            tempValue.textContent = `${data.main.temp}°C`;
            weatherConditions.textContent = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);

            // add weather icon
            const weatherIcon = document.querySelector('.weather-icon .fas');
            weatherIcon.className = 'fas'; // remove all previous classes
            const weatherCode = data.weather[0].id;
            if (weatherCode >= 200 && weatherCode <= 232) { // thunderstorm
                weatherIcon.classList.add('fa-bolt');
            } else if (weatherCode >= 300 && weatherCode <= 321) { // drizzle
                weatherIcon.classList.add('fa-cloud-rain');
            } else if (weatherCode >= 500 && weatherCode <= 531) { // rain
                weatherIcon.classList.add('fa-cloud-showers-heavy');
            } else if (weatherCode >= 600 && weatherCode <= 622) { // snow
                weatherIcon.classList.add('fa-snowflake');
            } else if (weatherCode >= 701 && weatherCode <= 781) { // atmosphere
                weatherIcon.classList.add('fa-smog');
            } else if (weatherCode === 800) { // clear sky
                weatherIcon.classList.add('fa-sun');
            } else if (weatherCode >= 801 && weatherCode <= 804) { // clouds
                weatherIcon.classList.add('fa-cloud');
            }

            //weather suggestions
            function generateSuggestion(weatherCode) {
                weatherConditions.textContent = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
                const sugtxt = document.querySelector('#sugtext');
            
                if (weatherCode >= 200 && weatherCode <= 232) { // thunderstorm
                    sugtxt.textContent = "It's thunderstorming, stay indoors and keep safe!";
                } else if (weatherCode >= 300 && weatherCode <= 321) { // drizzle
                    sugtxt.textContent = "It's drizzling outside, don't forget your umbrella!";
                } else if (weatherCode >= 500 && weatherCode <= 531) { // rain
                    sugtxt.textContent = "It's raining outside, bring your raincoat or umbrella!";
                } else if (weatherCode >= 600 && weatherCode <= 622) { // snow
                    sugtxt.textContent = "It's snowing outside, wear warm clothes and boots!";
                } else if (weatherCode >= 701 && weatherCode <= 781) { // atmosphere
                    sugtxt.textContent = "It's hazy outside, avoid strenuous outdoor activities!";
                } else if (weatherCode === 800) { // clear sky
                    sugtxt.textContent = "It's a beautiful day, enjoy the sunshine!";
                } else if (weatherCode >= 801 && weatherCode <= 804) { // clouds
                    sugtxt.textContent = "It's cloudy outside, take an umbrella in case it rains!";
                }
            }
            
            generateSuggestion(weatherCode);
            
            // modal 1
            const imageButton = document.querySelector('.image-button');
            const modal = document.querySelector('.modal');
            const closeBtn = document.querySelector('.close-btn');

            imageButton.addEventListener('click', function() {
                modal.style.display = 'block';
            });

            closeBtn.addEventListener('click', function() {
                modal.style.display = 'none';
            });

            window.addEventListener('click', function(event) {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            });

            // modal 2
            const funFactButton = document.querySelector('#modal-button2');
            const modal2 = document.querySelector('.modal2');
            const closeBtn2 = document.querySelector('.close-btn2');

            funFactButton.addEventListener('click', function() {
                modal2.style.display = 'block';
                getFunFact();
            });

            closeBtn2.addEventListener('click', function() {
                modal2.style.display = 'none';
            });

            window.addEventListener('click', function(event) {
                if (event.target === modal2) {
                    modal2.style.display = 'none';
                }
            });

            function getFunFact() {
                const funFact = document.querySelector('#Funfact');
                const facts = [
                    'Lightning bolts can sometimes be hotter than the surface of the sun.',
                    'The coldest temperature ever recorded on Earth was minus 128.6 degrees Fahrenheit (minus 89.2 degrees Celsius) in Antarctica in 1983.',
                    'The largest hailstone ever recorded in the United States was nearly the size of a volleyball, weighing 1.9 pounds and measuring 7.9 inches in diameter.',
                    'The wettest place on Earth is Mawsynram, a village in India, which receives an average annual rainfall of 467 inches.',
                    'Hurricanes are the most powerful storms on Earth, with winds that can reach over 200 mph.', 'Hurricanes are named alphabetically each year, with names alternating between male and female.',
                    'The worlds largest snowflake on record measured 15 inches wide and 8 inches thick. It fell in Fort Keogh, Montana in 1887.',
                    'The highest temperature ever recorded was 134 degrees Fahrenheit (56.7 degrees Celsius) in Furnace Creek Ranch, California in 1913.',
                    'The driest place on Earth is the Atacama Desert in Chile. Some weather stations in the desert have never recorded any rainfall.',
                    'The strongest tornado ever recorded had wind speeds of 318 mph (512 km/h). It hit Moore, Oklahoma in 2013.',
                    'The Great Red Spot on Jupiter is a storm that has been raging for at least 400 years. Its about three times the size of Earth.',
                    'The worlds largest hailstone on record measured 8 inches in diameter and weighed 1.93 pounds. It fell in Vivian, South Dakota in 2010.'
                ];
                const randomFact = facts[Math.floor(Math.random() * facts.length)];
                funFact.textContent = randomFact;
            }


            // add event listeners to the humidity, pressure, and wind buttons
            humidityBtn.addEventListener('click', () => {
                tempTitle.textContent = 'Humidity';
                tempValue.textContent = `${data.main.humidity}%`;
            });
            pressureBtn.addEventListener('click', () => {
                tempTitle.textContent = 'Pressure';
                tempValue.textContent = `${data.main.pressure} hPa`;
            });
            windBtn.addEventListener('click', () => {
                tempTitle.textContent = 'Wind Speed';
                tempValue.textContent = `${data.wind.speed} m/s`;
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}




// load weather data for the default city on page load
fetchWeatherData(defaultCity);

// add event listener to the search button
searchButton.addEventListener('click', () => {
    const city = searchBox.value;
    fetchWeatherData(city);
    searchBox.value = '';
});

// add event listener to the search box for enter key press
searchBox.addEventListener('keyup', event => {
    if (event.key === 'Enter') {
        searchButton.click();
    }
});

