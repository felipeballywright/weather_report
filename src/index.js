import "./styles.css";
// import { greeting } from "./greeting.js";
// My key is: LA8QLDL4HNR6XYBUT77BTHZLT
// "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/{location}?unitGroup=metric&key={YOUR_API_KEY}&contentType=json"
// THE GET DATA ERROR RUNS EVEN WHEN THERE IS NO ERROR, PLEASE CORRECT THAT


function searchCity(){
    const searchBtn = document.getElementById("search-button");
    searchBtn.addEventListener("click", (event) => {
        console.log("Running search city");
        event.preventDefault();
        const city = document.getElementById("city-input").value;
        document.getElementById("city-input").value = "";
        getData(city);
    })
}

async function getData(location) {
    try{
        console.log("Running get data");
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=LA8QLDL4HNR6XYBUT77BTHZLT&contentType=json`;
        const response = await fetch(url, {mode: 'cors'});
        const data = await response.json();
        console.log("The data:", data);
        processData(data);
    } catch(error){
        console.error(error);
        alert("Please input a real city");
    }
}

function processData(data) {
    const dataObject = { 
        city: data.address,
        date: getTodayDate(),
        temperature: `${data.days[0].temp}°C`,
        minTemperature: data.days[0].tempmin,
        maxTemperature: data.days[0].tempmax,
        feelsLike: data.days[0].feelslike,
        humidity: data.days[0].humidity,
        condition: data.days[0].conditions,
        description: data.days[0].description,
        windSpeed: data.days[0].windspeed,
        icon: data.days[0].icon
    }
    console.log("Process data says:", dataObject);
    cleanRender();
    renderData(dataObject);
    changeUI(dataObject);
    getGifData(icon);
}

function renderData(object){
    console.log("Running render data")
    const renderDiv = document.getElementById("render-div");

    const header = document.createElement("div");
    header.id = "weather-header"
    renderDiv.appendChild(header);

    const city = document.createElement("p");
    city.innerText = object.city;
    header.appendChild(city);

    const date = document.createElement("p");
    date.innerText = object.date;
    header.appendChild(date);

    const content = document.createElement("div");
    content.id = "weather-main-content";
    renderDiv.appendChild(content);

    const temperature = document.createElement("p");
    temperature.innerText = object.temperature;
    content.appendChild(temperature);

    const condition = document.createElement("p");
    condition.innerText = object.condition;
    content.appendChild(condition);

    const minTemp = document.createElement("p");
    minTemp.innerText = `Min: ${object.minTemperature}`;
    content.appendChild(minTemp);

    const maxTemp = document.createElement("p");
    maxTemp.innerText = `Max: ${object.maxTemperature}`;
    content.appendChild(maxTemp);

    const icon = document.createElement("img");
    icon.src = `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/2nd%20Set%20-%20Color/${object.icon}.png`;
    content.appendChild(icon);
}

function cleanRender() {
    console.log("Running clean render")
    const renderDiv = document.getElementById("render-div");
    renderDiv.innerHTML = "";
}

function getTodayDate(){
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', options);
    return formattedDate;
}

function changeUI(dataObject){
    const condition = dataObject.condition.toLowerCase();
    console.log("change UI says:", condition);
}

async function getGifData(icon) {
    try{
        console.log("Running get gif data")
    } catch(error){
      console.error(error);
      const url = `https://api.giphy.com/v1/gifs/search?api_key=YOUR_API_KEY&q=${icon}&limit=5`;
      const response = await fetch(url, {mode: 'cors'});
      const data = response.json();
      console.log("The gif data is", data);
    }
}

searchCity();