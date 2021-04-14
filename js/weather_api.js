var weather_api_key = "5e195e55fe8142116782bfc056146dae"

var country_code = 124 // 124 == Canada
var city_name = "Vancouver"

GetWeatherDataAsync(country_code, city_name, ProcessWeatherData)

function SetWeatherUI(icon_day1, icon_day2, temp_day1, temp_day2)
{
	var day1_temp = document.getElementById("day1_temp");
	day1_temp.innerHTML = temp_day1
}

function ProcessWeatherData(data)
{
	console.log(data)
	
	data.then(function(result)
	{
		var weather_icon_day1 = result["list"]["0"]["weather"]["0"]["icon"]
		var weather_icon_day2 = result["list"]["1"]["weather"]["0"]["icon"]
		
		var temperature_day1 = result["list"]["0"]["main"]["temp"]
		var temperature_day2 = result["list"]["1"]["main"]["temp"]
		
		SetWeatherUI(weather_icon_day1, weather_icon_day2, temperature_day1, temperature_day2)
	});
}

function GetWeatherDataAsync(country_code, city_name, callback)
{
	var url = "https:///api.openweathermap.org/data/2.5/forecast/?q=Vancouver,124&cnt=2&units=metric&appid=5e195e55fe8142116782bfc056146dae"
	fetch(url, {method: "GET"})
		.then((res) => callback(res.json()))
}
