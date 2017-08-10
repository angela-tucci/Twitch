var array = [
	{
		name: "FreeCodeCamp",
		status: ""
	},
	{
		name: "Day9tv",
		status: ""
	},
	{
		name: "AmazHS",
		status: ""
	},
	{
		name: "bmkibler",
		status: ""
	},
	{
		name: "nl_Kripp",
		status: ""
	},
	{
		name: "Alliestrasza",
		status: ""
	},
	{
		name: "DansGaming",
		status: ""
	},
	{
		name: "itsHafu",
		status: ""
	},
	{
	name:"DisguisedToastHS",
		status:""
	}
];

window.onload = init;

function init() {
	for (var h = 0; h < array.length; h++) {
		document.getElementById("streams").innerHTML +=
			"<span id=" +
			array[h].name +
			' class="stream"><a href="https://www.twitch.tv/' +
			array[h].name +
			'" target="_block">' +
			array[h].name +
			'</a><span class="status"></span></span>';
	}

	request();
	design();
}

function request() {
	for (var i = 0; i < array.length; i++) {
		$.getJSON(
			"https://wind-bow.gomix.me/twitch-api/channels/" +
				array[i].name +
				"?callback=?",
			function(data) {
				var stream = document.getElementById(data.display_name);

				var img = '<img src="' + data.logo + '" alt="logo" width=50px>';

				$(stream).prepend(img);
			}
		);
	}

	for (var j = 0; j < array.length; j++) {
		$.getJSON(
			"https://wind-bow.gomix.me/twitch-api/streams/" +
				array[j].name +
				"?callback=?",
			function(data) {
				if (data.stream != null) {
					var onlineStream = document.getElementById(
						data.stream.channel.display_name
					);
					onlineStream.getElementsByClassName("status")[0].innerHTML =
						" - currently streaming: " + data.stream.game + "<br>";
				}
			}
		);
	}

	for (var i = 0; i < array.length; i++) {
		var stream = document.getElementById(array[i].name);
		var streamStatus = stream.getElementsByClassName("status")[0];

		if (streamStatus.innerHTML == "") {
			streamStatus.innerHTML += " - Offline<br>";
		}
	}
}

function design(){
	var allStreams = document.getElementsByClassName("stream");
	
	for(var i = 0; i < allStreams.length; i++){
		if(i % 2 == 1){
			allStreams[i].style.backgroundColor = "#a9a9a9";
		}
		else{
			allStreams[i].style.backgroundColor = "#d3d3d3";
		}
	}
}