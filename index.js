const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const APIKey = 'cbf66292ab33844503f3a5edb5302824';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');


            temperature.innerHTML = `${parseInt(json.main.temp * 9/5 + 32)}<span>°F</span>`;
            if (json.main.temp * 9/5 + 32 > 90)
                {
                    image.src = 'images/TooHot.png';
                    description.innerHTML = `<span>It's too hot. Stay indoors.</span>`;
                }
            else if(json.main.temp * 9/5 + 32 > 60)
                {
                    image.src = 'images/good-weather.png';
                    description.innerHTML = `<span>Perfect temperature to go outside.</span>`;
                }
            else
                {
                    image.src = 'images/TooCold.png';
                    description.innerHTML = `<span>It's too cold to go outside.</span>`;
                }
          

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';


        });


});