const weatherForm = document.querySelector(".weatherForm");
const destinationInput = document.querySelector(".destinationInput");
const textDisplay = document.querySelector(".textDisplay");
const textDisplay2 = document.querySelector(".textDisplay2");
const card = document.querySelector(".card");


const apiKey = "";

weatherForm.addEventListener("submit", async event => {


    event.preventDefault();

    const destination = destinationInput.value;

    if(destination){
        try{
            const weatherData = await getWeatherData(destination)
            displayWeatherInfo(weatherData);
        }
        catch(error) {
            console.error(error);
            
        }

    }else{
       prompt("Please enter a destination");
    }

});

async function getWeatherData(destination){

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${destination}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }
    else {
        return await response.json();
    }
    console.log(response);
}

function displayWeatherInfo(data){
console.log(data);
 const {name: destination,
    main: {temp, humidity},
    weather: [{description, id}]} = data;

 
 textDisplay.textContent = "";
 textDisplay.style.display = "none";
 textDisplay.style.display = "flex";
 
 
 const destinationDisplay = document.createElement("h1");
 const tempDisplay = document.createElement("p");
 const humidityDisplay = document.createElement("p");
 const descDisplay = document.createElement("p");
 const weatherEmoji = document.createElement("p");

 destinationDisplay.textContent = destination;
 tempDisplay.textContent = `${((temp - 273.15) * 1.8 +32).toFixed(1)}°F`;
 humidityDisplay.textContent = `Humidity: ${humidity}%`;
 descDisplay.textContent = description;
 weatherEmoji.textContent = getWeatherEmoji(id);

 tempDisplay.classList.add("results");
 humidityDisplay.classList.add("results");
 descDisplay.classList.add("results");
 weatherEmoji.classList.add("weatherEmoji");



 textDisplay.appendChild(destinationDisplay)
 textDisplay.appendChild(tempDisplay)
 textDisplay.appendChild(humidityDisplay)
 textDisplay.appendChild(descDisplay)
 textDisplay.appendChild(weatherEmoji)
}

function getWeatherEmoji(weatherId){


    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";
        case (weatherId >= 300 && weatherId < 400):
            return "🌦️";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️";
        case (weatherId >= 600 && weatherId < 700):
            return "🌨️";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️";
        case (weatherId === 800):
            return "☀️";
        case (weatherId >= 801 && weatherId < 810):
            return "☁️";
        default:
            return "👽️";
    }
}
/*function errorDisplay(){
    textDisplay.textContent = "";
    textDisplay.style.display = "flex";
    const errorMessage = document.createElement("p");
    errorMessage.textContent = "Please enter a valid destination";
    errorMessage.classList.add("textDisplay2");

    textDisplay.appendChild(errorMessage);
    
    
}*/