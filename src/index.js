import "./styles.css";
// import { greeting } from "./greeting.js";
// My key is: LA8QLDL4HNR6XYBUT77BTHZLT
// "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/{location}?unitGroup=metric&key={YOUR_API_KEY}&contentType=json"

function searchCity(){
    const searchBtn = document.getElementById("search-button");
    searchBtn.addEventListener("click", (event) => {
        console.log("Running search city");
        event.preventDefault();
        const city = document.getElementById("city-input").value;
        getData(city);
    })
}

async function getData(city) {
    try{
        console.log("Running get data");
        const location = city;
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=LA8QLDL4HNR6XYBUT77BTHZLT&contentType=json`;
        const response = await fetch(url, {mode: 'cors'});
        const data = await response.json();
        console.log("The data:", data);
        processData(data);
    } catch{
        console.error(error);
    }
}

async function processData(data) {
    const dataObject = { 
        city: await data.address,
        date: getTodayDate(),
        temperature: await data.days[0].temp,
        minTemperature: await data.days[0].tempmin,
        maxTemperature: await data.days[0].tempmax,
        feelsLike: await data.days[0].feelslike,
        humidity: await data.days[0].humidity,
        condition: await data.days[0].conditions,
        description: await data.days[0].description,
        windSpeed: await data.days[0].windspeed
    }
    console.log("Process data says:", dataObject);
    renderData(dataObject);
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
}

function getTodayDate(){
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', options);
    return formattedDate;
}

searchCity();