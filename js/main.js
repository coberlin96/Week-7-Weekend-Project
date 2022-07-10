let apiKey = '8cc7e09952e8667663bddc6e458661bc'

/**
 *  calls api to get coordinates based on location name
 * @param {*} input location name given by user
 * @returns lattitude and longitude in a list
 */
const getLocation = async (input) =>{
    
    let request = new Request(`http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=1&appid=${apiKey}`,{
        method: 'GET'
     })

    let result = await fetch(request)
    let response = await result.json()
    let location = [response[0].lat, response[0].lon]
    console.log(location[0])
    console.log(location[1])
    return location;
}


/**
 *  calls api with lattitude and longitude coordinates, then searches for and returns requested data
 * @param {*} lat  lattitude
 * @param {*} lon  longitude
 * @returns  weather info to be displayed
 */
const getWeather = async(lat, lon)=>{
    let request = new Request(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`,{
        method:'GET'
    })

    let result = await fetch(request)
    let response = await result.json()
    let forecast = response.weather[0].main;
    let highK = response.main.temp_max;
    let lowK = response.main.temp_min;
    let humidity = response.main.humidity;

    let high = (highK-273.15)*(9/5)+32
    let low = (lowK-273.15)*(9/5)+32


    console.log(forecast)
    console.log(high.toFixed(0))
    console.log(low.toFixed(0))
    console.log(humidity)

    weather = [forecast, high.toFixed(0), low.toFixed(0), humidity]
    return weather
}

/**
 *  Retrieves the user input
 * @returns textfield input
 */
let getInput = () =>{
    console.log(document.getElementById('city').value)
    return document.getElementById('city').value
}

/**
 *  Fills in text fields with propper data
 * @param {*} list weather info to be displayed
 */
let fillInfo = async(list) =>{
    
    let forecast = document.getElementById('forecast')
    let high = document.getElementById('high')
    let low = document.getElementById('low')
    let humidity = document.getElementById('humidity')

    forecast.innerHTML += list[0]
    high.innerHTML += `${list[1]}°F`
    low.innerHTML += `${list[2]}°F`
    humidity.innerHTML += `${list[3]}%`
}

/**
 *  clears text fields of previous data
 *  Also, I ran into a problem with having the four document links being outside of the function
 *  so I put them in both this and the previous one
 */
let clearInfo = async() =>{
    
    let forecast = document.getElementById('forecast')
    let high = document.getElementById('high')
    let low = document.getElementById('low')
    let humidity = document.getElementById('humidity')

    forecast.innerHTML = ''
    high.innerHTML = ''
    low.innerHTML=''
    humidity.innerHTML=''
}


/**
 * runs all functions
 */
let fullSearch = async () =>{

    clearInfo()
    let location = await getInput()
    let coords = await getLocation(location)
    let weather = await getWeather(coords[0],coords[1])
    fillInfo(weather)
}

/**
 * weather[0] = current forecast
 * weather[1] = today's high
 * weather[2] = today's low
 * weather[3] = current humidity%
 */