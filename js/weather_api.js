// Initial variables
var weather_api_key = "5e195e55fe8142116782bfc056146dae"
var latitude = "49.2827"
var longitude = "-123.1207"
var current_day = 0
var current_date = "Today"

// Set up initial location/weather data
if (navigator.geolocation)
{
    navigator.geolocation.getCurrentPosition((position) => SetLatLong(position))
} 
else
{
    console.log("Unavailable position. Defaulting to Vancouver")
	GetWeatherDataAsync(latitude, longitude, ProcessWeatherData)
}

var previous_day_btn = document.getElementById("previous_day")
previous_day_btn.addEventListener("click", function(event) {
    GetPreviousDay(event);
}, false);

var next_day_btn = document.getElementById("next_day")
next_day_btn.addEventListener("click", function(event) {
    GetNextDay(event);
}, false);

/*
----- Functions -----
*/

function GetPreviousDay(event)
{
	if (current_day > 0)
	{
		current_day = current_day - 1
		if (current_day == 0)
		{
			// Set opacity on button to translucent
		}
		else
		{
			// Set opacity on button to solid
		}
	}
	
	GetWeatherDataAsync(latitude, longitude, ProcessWeatherData)
}

function GetNextDay(event)
{
	if (current_day < 7)
	{
		current_day = current_day + 1
		if (current_day == 7)
		{
			// Set opacity on button
		}
	}
	
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

function SetWeatherUI(icon, temp)
{
	// Set temperatures
	var day_temp = document.getElementById("day1_temp")
	day_temp.innerHTML = temp + " °C"
	
	// Set weather icons
	var day_icon = document.getElementById("weather_icon")
	day_icon.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
	
	// Set date
	//var date_icon = document.getElementById("date")
	//date_icon.innerHTML = current_date
}

function ProcessWeatherData(data)
{
	console.log(data)
	
	data.then(function(result)
	{
		var weather_icon
		var temperature
		
		if (current_day == 0)
		{
			weather_icon = result["current"]["weather"]["0"]["icon"]
			temperature = result["current"]["temp"]
			current_date = "Today"
		}
		else
		{
			weather_icon = result["daily"]["" + current_day]["weather"]["0"]["icon"]
			temperature = result["daily"]["" + current_day]["temp"]["max"]
			
			var unix_timestamp = parseInt(result["daily"]["" + current_day]["dt"])
			var date_obj = new Date(unix_timestamp * 1000)
			
			current_date = "" + date_obj.getMonth() + "-" + date_obj.getUTCDate()
		}
		
		SetWeatherUI(weather_icon, temperature)
	});
}

function GetWeatherDataAsync(latitude, longitude, callback)
{
	var url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=metric&exclude=minutely,hourly,alerts&appid=" + weather_api_key
	fetch(url, {method: "GET"})
		.then((res) => callback(res.json()))
}
