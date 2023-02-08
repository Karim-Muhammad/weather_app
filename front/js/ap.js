const cont = document.querySelector('.container');
const form = document.querySelector('.form_weather form');
const searchIcon = form.querySelector('.search-icon');

const main = document.querySelector('.app__main');
const error404 = document.querySelector('.not-found');

form.addEventListener('submit', fetch_weather)
searchIcon.addEventListener('click', fetch_weather);

async function fetch_weather(evt) {
     evt.preventDefault();
     
     const country = form.querySelector('.form_country').value;
     const unit = form.querySelector('.form_unit').value;

     fetch('/post_weather', {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
               "Content-Type": "application/json"
          },
          body: JSON.stringify({country, unit})
     }).then(_=> fetch('/all'))
     .then(res=> res.json())
     .then(da => updateUI(da, unit))
     
     // console.log(data);
}

const updateUI = (data, unit)=> {

     if(data.cod == '404' || data.cod == '400') {
          show_error404();
          return;
     }
     weather_view(data, unit);
}

function show_error404() {
     cont.style.height = '404px';
     error404.style.display = 'block';
     error404.classList.add('fadeIn');
     main.style.display = 'none';
}

function weather_view(data, unit) {
     console.log(data)
     cont.style.height = '504px';
     error404.style.display = 'none';
     main.style.display = 'block';
     main.classList.add('fadeIn');

     const textarea = form.querySelector('textarea').value;
     const img = main.querySelector('.app__main-img img');
     const desc = main.querySelector('.app__main-img .desc');
     const feel = main.querySelector('.app__main-img .feel');
     desc.innerHTML = data.weather[0].description;
     feel.innerHTML = textarea;

     switch(data.weather[0].main) {
          case "Fog":
               img.src = '../assets/fog.png';
               break;
          case "Clear":
               img.src = '../assets/clear.png';
               break;
          case "Clouds":
               img.src = '../assets/cloud.png';
               break;
          case "Thunderstorm":
               img.src = '../assets/thunder.png';
               break;
          case "Drizzle":
               img.src = '../assets/drizzle.png';
               break;
          case "Rain":
               img.src = '../assets/rain.png';
               break;
          case "Snow":
               img.src = '../assets/snow.png';
               break;
          case "Mist":
               img.src = '../assets/mist.png';
               break;
          case "Smoke":
               img.src = '../assets/smoke.png';
               break;
          case "Dust":
               img.src = '../assets/dust.png';
               break;
          case "Sand":
               img.src = '../assets/sand.png';
               break;
          default:
               const iconcode = data.weather[0].icon;
               const iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
               img.src = iconurl;
               console.log(iconurl,img.src)
     }
     
     const date = new Date();

     const country = main.querySelector('.country');
     country.innerHTML = data.name;

     const time = main.querySelector('.time');
     time.innerHTML = date.toLocaleString('en-US');

     const info_left_air = main.querySelector('.info-left .air .val');
     info_left_air.innerHTML = `${data.wind.speed} km/h`;

     const info_left_rain = main.querySelector('.info-left .rain .val');
     info_left_rain.innerHTML = data.main.humidity;

     const info_left_sun = main.querySelector('.info-left .sun .val');
     info_left_sun.innerHTML = data.main.feels_like;

     const info_right_temp = main.querySelector('.info-right .val');
     info_right_temp.innerHTML = `${unit == 'imperial' ?data.main.temp+'°F':((data.main.temp - 273.15).toFixed(2))+'°C'}`;
}