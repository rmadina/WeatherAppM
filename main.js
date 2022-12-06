const cityBtn = document.getElementById("submitCity")
const coordBtn = document.getElementById("submitCoord")
// const closeBtn = document.getElementById("closeDetails")
const autoBtn = document.getElementById("autoBtn")

var weatherInfo = document.getElementById("weather-details")
var cityInput = document.getElementById("cityName")
var latInput = document.getElementById("latitude")
var longInput = document.getElementById("longitude")




cityBtn.onclick = function () {
    requestApiForCity(cityInput.value)
}


coordBtn.onclick = function () {
    requestApiForCoordinates(latInput.value, longInput.value)
}

autoBtn.onclick = function () {
    getLocation()()
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.")
    }

}

function showPosition(position) {
    console.log(position.coords.latitude)
    requestApiForCoordinates(position.coords.latitude, position.coords.longitude)
}

function requestApiForCity(city) {
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3d98bc002b3fd6d117d4ffb7e88cee81`
    fetch(api).then(response => response.json()).then(result => showDetails(result))

}

function requestApiForCoordinates(latitude, longitude) {
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=3d98bc002b3fd6d117d4ffb7e88cee81`;
    fetch(api).then(response => response.json()).then(result => showDetails(result))

}

//creating closeBtn outside because we use it in other function
var closeBtn = document.createElement("button")


function showDetails(data) {
    // console.log(data)


    closeBtn.classList.add("closeDetails")
    closeBtn.innerText = 'Close'

    var cityOut = document.createElement("h3")
    cityOut.innerText = `City name : ${data.name}`

    var conditionOut = document.createElement("h4")
    conditionOut.innerText = `Weather Conditon: ${data.weather[0].main}`

    var temperatureOut = document.createElement("span")
    temperatureOut.innerText = `
        Outside Temperature: ${Math.floor(data.main.temp - 273.15)} ℃
    `

    var maxTempOut = document.createElement("span")
    maxTempOut.innerText = `
        Maximum Temperature: ${Math.floor(data.main.temp_max - 273.15)} ℃
    `

    var minTempOut = document.createElement("span")
    minTempOut.innerText = `
    Minimum Temperature: ${Math.floor(data.main.temp_min - 273.15)} ℃
    `

    var feelsLikeOut = document.createElement("span")
    feelsLikeOut.innerText = `
    Feels Like: ${Math.floor(data.main.feels_like - 273.15)} ℃
    `

    var humidityOut = document.createElement("span")
    humidityOut.innerText = `
    Humnidity: ${data.main.humidity}%
    `

    var pressureOut = document.createElement("span")
    pressureOut.innerText = `
    Pressure: ${data.main.pressure} hPa
    `

    var windSpeedOut = document.createElement("span")
    var windSpeed = data.wind.speed
    windSpeedOut.innerText = `
    Wind Speed: ${windSpeed} m/s 
    `
    var windDirectOut = document.createElement("span")
    var windDirect = data.wind.deg
    var windDirectFun
    if (windDirect > 315 || windDirect < 45) {
        windDirectFun = "North"

    } else if (windDirect > 45 && windDirect < 135) {
        windDirectFun = "East"
    } else if (windDirect > 135 && windDirect < 225) {
        windDirectFun = "South"
    } else if (windDirect > 225 && windDirect < 315) {
        windDirectFun = "West"
    }
    windDirectOut.innerText = `
    Wind Direction: ${windDirectFun}
    `


    var currentTime = data.dt
    var date = new Date(currentTime * 1000)
    var year = date.getFullYear()
    var month = date.getMonth()
    var day = date.getDate()
    var hours = date.getHours()
    var minutes = "0" + date.getMinutes()
    var seconds = "0" + date.getSeconds()

   
    var timeOut = document.createElement("span")
    timeOut.innerText = `
    Local date and time: ${day}.${month}.${year} ,  ${hours} : ${minutes.slice(-2)} : ${seconds.slice(-2)}
    
    `
    
    weatherInfo.appendChild(cityOut)
    weatherInfo.appendChild(conditionOut)
    weatherInfo.appendChild(temperatureOut)
    weatherInfo.appendChild(maxTempOut)
    weatherInfo.appendChild(minTempOut)
    weatherInfo.appendChild(feelsLikeOut)
    weatherInfo.appendChild(humidityOut)
    weatherInfo.appendChild(pressureOut)
    weatherInfo.appendChild(closeBtn)
    weatherInfo.appendChild(windSpeedOut)
    weatherInfo.appendChild(windDirectOut)
    weatherInfo.appendChild(timeOut)
    weatherInfo.appendChild(closeBtn)



    weatherInfo.appendChild(closeBtn)
    weatherInfo.classList.add("visibleDetails")

}

closeBtn.onclick = function () {
    weatherInfo.classList.remove("visibleDetails")  
    weatherInfo.innerHTML = ""
    cityInput.value = ''
    latInput.value = ''
    longInput.value = ''
}


