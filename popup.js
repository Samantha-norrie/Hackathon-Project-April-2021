let cliendID = '64764';
let clientSecret = '68dd7121628a2920d5ff7c67ca7c51791fef40ab';
let accessToken = 'ad1c40043d90f5e3daae21cd3a3ca260c01ff654';
let refreshToken = 'fbbdc1ac89168a378595ca8cb2365024df80ecd5';
const auth_link = 'https://www.strava.com/oauth/token'

function getActivities(res){
  console.log(res);
  console.log("Getting activities...");
  const activites_link = `https://www.strava.com/api/v3/athlete/activities?access_token=${res.access_token}`

  fetch(activites_link)
    .then(function (response){
    return response.json();
    })
    .then(function (data) {
      //appendData(data)
      console.log(data)
      display(data)
    });

  function appendData(data) {
    for (var i = 0; i < data.length; i++) {
      var mainContainer = document.getElementById("myData");
      var div = document.createElement("div");
      div.innerHTML = data[i].name + ' Distance ' + data[i].distance + ' Moving Time ' + data[i].moving_time;
      mainContainer.appendChild(div);
    }
  }
}

function display(data){
	totalBikeDistance = 0;
  totalRunDistance = 0;
  totalSwimDistance = 0;

  for (i = 0; i < 7; i++) {
    if (data[i]["type"] == "Ride")
    {
      totalBikeDistance += data[i]["distance"]; 
    }
    else if (data[i]["type"] == "Run")
    {
      totalRunDistance += data[i]["distance"]; 
    }
    else
    {
      totalSwimDistance += data[i]["distance"]; 
    }
  }
  totalBikeDistance = totalBikeDistance/1000
  
	document.getElementById("bikeBar").style.width = totalBikeDistance + "px";
	document.getElementById('bikeDistance').innerHTML = totalBikeDistance + " km";

  document.getElementById("runBar").style.width = totalRunDistance + "px";
	document.getElementById('runDistance').innerHTML = totalRunDistance + " km";

  document.getElementById("swimBar").style.width = totalSwimDistance + "px";
	document.getElementById('swimDistance').innerHTML = totalSwimDistance + " km";
}

function reAuthorize(){
  console.log("re authorizing...");

  fetch(auth_link, {
    method: 'post',
    headers: {
      'Authorization': 'Bearer',
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },

    body: JSON.stringify({
      client_id: cliendID,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
      scope: 'activity:write' 
    })
  }).then((res) => res.json())
      .then(res => getActivities(res));
}

reAuthorize();