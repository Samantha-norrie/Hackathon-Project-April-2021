let cliendID = '64764';
let clientSecret = '68dd7121628a2920d5ff7c67ca7c51791fef40ab';
let accessToken = 'ad1c40043d90f5e3daae21cd3a3ca260c01ff654';
let refreshToken = 'fbbdc1ac89168a378595ca8cb2365024df80ecd5';
const auth_link = 'https://www.strava.com/oauth/token'

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ cliendID });
  chrome.storage.sync.set({ clientSecret });
  chrome.storage.sync.set({ accessToken });
  chrome.storage.sync.set({ refreshToken });
  console.log('Tokens have been saved.');
  reAuthorize();
});

function getActivities(res){
  console.log(res);
  console.log("Getting activities...");
  const activites_link = `https://www.strava.com/api/v3/athlete/activities?access_token=${res.access_token}`
  fetch(activites_link)
  	.then((res) => console.log(res.json()));
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
