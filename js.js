

const weatherform = document.querySelector(".weatherform");
const cityinput = document.querySelector(".cityinput");
const card = document.querySelector(".card");
const apikey = "a78ff4b74a2c5493074e6bfe28f63200";

weatherform.addEventListener("submit", async event => {

event.preventDefault();
const city= cityinput.value;
if(city){
try{
const weatherData = await getweatherData(city);
    displayweatherInfo(weatherData);

}
catch(error){
    console.error(error);
    displayError(error);
}

}
else{
    displayError("please enter a city");
}



});

async function getweatherData(city){
    const apiurl = ` https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
const response = await fetch(apiurl);
if(!response.ok){
    throw new Error("could not fetch weather data");
}
return await response.json();
}

function displayweatherInfo(data){
    console.log(data);
const {name: city,main:{temp,humidity}, weather:[{description,id}]} = data;
card.textContent = " ";
card.style.display="flex";
const citydisplay=document.createElement("h1");
const tempdisplay=document.createElement("p");
const humiditydisplay=document.createElement("p");
const dsecdisplay=document.createElement("p");
const weatheremoji=document.createElement("p");
citydisplay.textContent = city;
tempdisplay.textContent = `${(temp -273.15).toFixed(1)}°c `;
humiditydisplay.textContent = `humidity: ${humidity}`;
dsecdisplay.textContent=description;
weatheremoji.textContent=getweatheremoji(id);

citydisplay.classList.add("citydisplay");
tempdisplay.classList.add("tempdisplay");
humiditydisplay.classList.add("humiditydisplay");
dsecdisplay.classList.add("dsecdisplay");
weatheremoji.classList.add("weatheremoji");
card.appendChild(citydisplay);
card.appendChild(tempdisplay);
card.appendChild(humiditydisplay);
card.appendChild(dsecdisplay);
card.appendChild(weatheremoji);
}
function getweatheremoji(weatherid){
 switch(true){
   
    case(weatherid >=200 && weatherid<300):
    return "⛈️";
    case(weatherid >=300 && weatherid<400):
    return "⛈️";
    case(weatherid >=500 && weatherid<600):
    return "⛈️";
    case(weatherid >=600 && weatherid<700):
    return "❄️";
    case(weatherid >=700 && weatherid<800):
    return "☃️";
    case(weatherid ===800):
    return "☀️";
    case(weatherid >=801 && weatherid<810):
    return "☁️";
    default:
        return"?";

 }



}
function displayError(message){
    const errordisplay=document.createElement("P");
    errordisplay.textContent = message;
    errordisplay.classList.add("errordisplay");
    card.textContent="";
    card.style.display="flex";
    card.appendChild(errordisplay);
}