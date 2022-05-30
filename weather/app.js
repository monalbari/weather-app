const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement= document.querySelector(".temperature-description p");
const locationElement=document.querySelector(".location p");
const notificationElement= document.querySelector(".notification");

//App Data
const weather={};

weather.temperature={
    unit:"celcius"
}

//App CONST AND VARS
const KELVIN=273;
// API KEY
const key="4f1df4cbb51e730e456b0572987c4a7d";

//Check if browser support geolocation

if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition,showError);

}else{
    notificationElement.getElementsByClassName.display ="block";
    notificationElement.innerHTML="<p>Browser doesn't support Geolocation</p>";

}


//set user's position
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude,longitude);
}

//Show error when there is an issue with geolocation service
function showError(error){
    notificationElement.getElementsByClassName.display ="block";
    notificationElement.innerHTML=`<p> ${error.message}</p>`;
}
// get weather from api provider
 function getWeather(latitude,longitude){
     let api= `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
 

     fetch(api)
     .then(function(response){
         let data = response.json();
         return data;
     })

     .then(function(data){
         weather.temperature.value = Math.floor(data.main.temp - KELVIN);
         weather.description = data.weather[0].description;
         weather.iconId= data.weather[0].icon;
         weather.city=data.name;
         weather.country=data.sys.country;

     })
     .then(function(){
         displayWeather();
     });
    
    }

 

     //Display weather to ui
     function displayWeather(){
         iconElement.innerHTML =`<img src="icons/${weather.iconId}.png"/>`;
         tempElement.innerHTML =`${weather.temperature.value}°<span>C</span>`;
         descElement.innerHTML=weather.description;
         locationElement.innerHTML=`${weather.city},${weather.country}`;

     }


// C to F conversion
function celciusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

//When the user clicks on the temperature element 
tempElement.addEventListener("click",function(){
    if(weather.temperature.value === undefined) return;

    if(weather.temperature.unit == "celcius"){
        let fahrenheit = celciusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);

        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit="fahrenheit";


    }else{
        tempElement.innerHTML=`${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit="celcius"
    }





});


 
 
 
 
 
 
 
