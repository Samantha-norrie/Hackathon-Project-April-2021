var weather_api_key = "5e195e55fe8142116782bfc056146dae"
var latitude = "49.2827"
var longitude = "-123.1207"

if (navigator.geolocation)
{
    navigator.geolocation.getCurrentPosition((position) => SetLatLong(position))
} 
else
{
    console.log("Unavailable position. Defaulting to Vancouver")
	GetWeatherDataAsync(latitude, longitude, ProcessWeatherData)
}

function SetLocationUI(area_name)
{
	var location_name = document.getElementById("location_name")
	location_name.innerHTML = area_name
}

function ProcessLocationData(data)
{
	data.then(function(result)
	{
		var area_name = result["name"]
		
		SetLocationUI(area_name)
	});
}

function GetCityLocationAsync(lat, lon, callback)
{
	var url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat +"&lon=" + lon + "&units=metric&appid=" + weather_api_key
	fetch(url, {method: "GET"})
		.then((res) => callback(res.json()))
}

function SetLatLong(position)
{
	latitude = "" + position.coords.latitude
	longitude = "" + position.coords.longitude
	
	GetWeatherDataAsync(latitude, longitude, ProcessWeatherData)
	GetCityLocationAsync(latitude, longitude, ProcessLocationData)
}

function SetWeatherUI(icon_day1, icon_day2, temp_day1, temp_day2)
{
	// Set temperatures
	var day1_temp = document.getElementById("day1_temp")
	day1_temp.innerHTML = temp_day1
	
	// Set weather icons
	var day1_icon = document.getElementById("weather_icon")
	day1_icon.src = "http://openweathermap.org/img/wn/" + icon_day1 + "@2x.png"
}

function ProcessWeatherData(data)
{
	console.log(data)
	
	data.then(function(result)
	{
		var weather_icon_day1 = result["current"]["weather"]["0"]["icon"]
		var weather_icon_day2 = result["daily"]["1"]["weather"]["0"]["icon"]
		
		var temperature_day1 = result["current"]["temp"]
		var temperature_day2 = result["daily"]["1"]["temp"]["max"]
		
		SetWeatherUI(weather_icon_day1, weather_icon_day2, temperature_day1, temperature_day2)
	});
}

function GetWeatherDataAsync(latitude, longitude, callback)
{
	var url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=metric&exclude=minutely,hourly,alerts&appid=" + weather_api_key
	fetch(url, {method: "GET"})
		.then((res) => callback(res.json()))
}
