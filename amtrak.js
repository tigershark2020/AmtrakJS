const express = require('express')
const { fetchAllTrains, fetchTrain, fetchAllStations, fetchStation } = require("amtrak");

const port = 1339;

const app = express()

app.get('/', async (req, res) => {

    const action = req.query.action;
    const value = req.query.value;
	console.log(action);
	
    if (action == null || action == '') {
		try
		{
			fetchAllTrains().then((trains) => {
			
				var trains_array = [];
			
				Object.keys(trains).forEach(function(key) {
				  var val = trains[key];
				  trains_array.push(val);
				});
				
				let trains_data_json = JSON.stringify(trains_array);
				return res.send(trains_data_json);
			});
			
		}
		catch(err)
		{
			console.log(err);
			return res.send(err);
		}
    } else {
		try
		{
			var headers_sent = true;
			if(action == "fetchAllTrains")
			{
					fetchAllTrains().then((trains) => {
						var trains_array = [];

						Object.keys(trains).forEach(function(key) {
						var val = trains[key];
						trains_array.push(val);
						});

						let trains_data_json = JSON.stringify(trains_array);
						headers_sent = true;
						return res.send(trains_data_json);

					});
			}
			
			if(action == "fetchTrain")
			{
				fetchTrain(value).then((train) => {
					console.log(train);
					let train_data_json = JSON.stringify(train);
					headers_sent = true;
					return res.send(train_data_json);
				});
			}
			
			
			if(action == "fetchAllStations")
			{
				fetchAllStations().then((stations) => {
					var stations_array = [];
					Object.keys(stations).forEach(function(key) {
						var val = stations[key];
						stations_array.push(val);
					});

				
					let stations_data_json = JSON.stringify(stations_array);
					headers_sent = true;
					return res.send(stations_data_json);
				});
			}

			if(action == "fetchStation")
			{
				fetchStation(value).then((station) => {
					console.log(station);
					let station_data_json = JSON.stringify(station);
					headers_sent = true;
					return res.send(station_data_json);
				});
			}
			
			if(headers_sent == false)
			{
				return res.send("Please enter valid action.");
			}
			
		}
		catch(err)
		{
			console.log(err);
			return res.send(err);
		}
    }
})

app.listen(port, '192.168.1.103', function () {
    console.log('Listening to port:  ' + port);
});
