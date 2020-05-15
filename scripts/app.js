const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time=document.querySelector('img.time');
const icon=document.querySelector('.icon img');
const body = document.querySelector('body');

const updateUI = (data) =>{

    const cityDets = data.cityDets;
    const weather = data.weather;

    //update UI
    details.innerHTML=`
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
     <div class="display-4 my-4">
         <span>${weather.Temperature.Metric.Value}</span>
         <span>&deg;C</span>` ;


    // update day and night img
    let timesrc= null;
    if (weather.IsDayTime){
        timesrc='img/day.jpg';
        body.classList.remove('night');
        body.classList.add('day');
    }else{
        timesrc='img/night.jpg';
        body.classList.remove('day');
        body.classList.add('night');
    }
    time.setAttribute('src',timesrc);

    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

}

const updateCity = async (city) =>{

    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return {
        cityDets:cityDets,
        weather:weather
    };
}


cityForm.addEventListener('submit', e =>{
    e.preventDefault();

    const city = cityForm.city.value.trim();
    cityForm.reset();

    updateCity(city).then(data =>{
        updateUI(data);
        // console.log(data);
    }).catch(err => console.log(err)); 
})