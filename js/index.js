
const body=document.querySelector('body'),
video=document.querySelector('.weather_vid'),
greeting=document.querySelector('span');
desc=document.querySelector('.description'),
loc=document.querySelector('.city_name'),
icon=document.querySelector('.icon'),
temp=document.querySelector('.temp'),
high_temp=document.querySelector('.high'),
low_temp=document.querySelector('.low'),
feelslike=document.querySelector('.feels_like'),
visible=document.querySelector('.visible'),
pressure=document.querySelector('.pressure'),
humid=document.querySelector('.humid'),
uvindex=document.querySelector('.uv_index'),
winddir=document.querySelector('.wind_dir');

const weather={}; //create an empty object to store the received data
 
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(setPosition);
}else{
    alert('browser does not support geolocation');
}
const key= process.env.API_KEY
function setPosition(position){
    let latitude=position.coords.latitude;
    let longitude=position.coords.longitude;
    getWeather(latitude,longitude)
} 


async function getWeather(latitude,longitude){

    const response =await fetch("http://api.weatherstack.com/current?access_key=05bd7ea2b3dfd264b875612fe4a495ac&query=fetch:ip");
    const data=await response.json();
    //console.log(data);
    //pull out information from response
    weather.temp=data.current.temperature;
    weather.feel=data.current.feelslike;
    weather.city=data.location.name;
    weather.country=data.location.country;
    weather.current_time=data.current.observation_time;
    weather.icon=data.current.weather_icons[0];
    weather.description=data.current.weather_descriptions[0];
    weather.humidity=data.current.humidity;
    weather.uv=data.current.uv_index;
    weather.feelslike=data.current.feelslike;
    weather.visibility=data.current.visibility;
    weather.pressure=data.current.pressure;
    weather.wind_dir=data.current.wind_dir;
   
    showWeather();
    Greeting();
    changeBack();
}
function Greeting(){
    if (weather.current_time.includes("AM")){
        greeting.innerText='good morning,';
        greeting.style.display="block";
    }else if(weather.current_time.includes("PM")){
        greeting.innerText='good evening,';
        greeting.style.display="block";
    }
}
function showWeather(){
        //set DOM
        loc.innerText=weather.city+'/ '+weather.country;
        desc.innerText=weather.description;
        temp.innerText=weather.temp+"°C";
        icon.src=weather.icon;
        feelslike.innerText=weather.feelslike+"°C";
        visible.innerText=weather.visibility;
        humid.innerText=weather.humidity;
        pressure.innerText=weather.pressure;
        winddir.innerText=weather.wind_dir;
}
function changeBack(){
    const filterString=weather.icon;
    if(filterString.includes("snow") || filterString.includes("snowy")){
        video.innerHTML="<source src='../vid/snow.mp4'>";
    }else if(filterString.includes("thundery") || filterString.includes("thunder")){
        video.innerHTML="<source src='../vid/thunder.mp4'>";
    }
    else if(filterString.includes("rain") || filterString.includes("rainy")){
        video.innerHTML="<source src='../vid/rainy.mp4'>";
    }
    else if(filterString.includes("fog") || filterString.includes("mist")){
        video.innerHTML="<source src='../vid/fog.mp4'>";
        body.classList.add("fog");
    }else if (filterString.includes("cloudy") || filterString.includes("cloud")){
        video.innerHTML="<source src='../vid/cloudy.mp4'>";
        body.classList.add("cloudy");
    }else {//sunny or clear
        video.innerHTML="<source src='../vid/sunny.mp4'>";
    }
}







