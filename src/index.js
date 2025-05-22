import "./styles.css";
// import { greeting } from "./greeting.js";
// My key is: LA8QLDL4HNR6XYBUT77BTHZLT
// "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/{location}?unitGroup=metric&key={YOUR_API_KEY}&contentType=json"


async function getData() {
    try{
        const location = "Berlin";
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
        temperature: await data.currentConditions.temp,
        feelsLike: await data.currentConditions.feelslike,
        humidity: await data.currentConditions.humidity,
        condition: await data.currentConditions.conditions,
        description: await data.description
    }
    console.log("THE OBJECT IS", dataObject);
}

getData();