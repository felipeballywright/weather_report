import "./styles.css";
// import { greeting } from "./greeting.js";
// My key is: LA8QLDL4HNR6XYBUT77BTHZLT
// "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/{location}?unitGroup=metric&key={YOUR_API_KEY}&contentType=json"
// THE GET DATA ERROR RUNS EVEN WHEN THERE IS NO ERROR, PLEASE CORRECT THAT
// The giphy api is: g7fbykBOe2VJKZo4ZUU6Fbt7H8NYEeaS


function searchCity(){
    const searchBtn = document.getElementById("search-button");
    searchBtn.addEventListener("click", (event) => {
        event.preventDefault();
        const city = document.getElementById("city-input").value;
        document.getElementById("city-input").value = "";
        getData(city);
    })
}

async function getData(location) {
    try{
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=LA8QLDL4HNR6XYBUT77BTHZLT&contentType=json`;
        const response = await fetch(url, {mode: 'cors'});

        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data object", );
        processData(data);
    } catch(error){
        console.error(error);
        // alert("There was an error!");
    }
}

function processData(data) {
    const dataObject = { 
        city: data.resolvedAddress,
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
    cleanRender();
    renderData(dataObject);
}

async function renderData(object){
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


    const gifDiv = document.getElementById("gif-div");

    const gifUrl = await getGifData(object.condition, object.icon);

    const gifImage = document.createElement("img");
    gifImage.src = gifUrl;
    console.log("The gif html el is:", gifImage);
    gifDiv.appendChild(gifImage);
}

function cleanRender() {
    const renderDiv = document.getElementById("render-div");
    renderDiv.innerHTML = "";
    const gifDiv = document.getElementById("gif-div");
    gifDiv.innerHTML = "";
}

function getTodayDate(){
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', options);
    return formattedDate;
}

async function getGifData(condition, icon) {
    try{
      const url = `https://api.giphy.com/v1/gifs/search?api_key=g7fbykBOe2VJKZo4ZUU6Fbt7H8NYEeaS&q=weather-${condition}-${icon}&limit=3&rating=g&lang=en`;
      const response = await fetch(url, {mode: 'cors'});
      const gifData = await response.json();
      const gifUrl = gifData.data[Math.floor(Math.random() * 3)].images.original.url;
      console.log("Gif Data returns", gifUrl);
      return gifUrl;
    } catch(error){
      console.error(error);
    }
}

searchCity();