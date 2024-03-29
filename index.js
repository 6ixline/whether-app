window.addEventListener('load', ()=> {
	let long;
	let lat;
	let temperatureDescription = document.querySelector('.temperature-description');
	let temperatureDegree = document.querySelector('.temperature-degree');
	let locationTimezone = document.querySelector('.location-timezone');
	let temperatureSection =document.querySelector('.temperature');
	const temperatureSpan =document.querySelector('.temperature span');
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(position =>{
			long= position.coords.longitude;
			lat = position.coords.latitude;
			const proxy="https://cors-anywhere.herokuapp.com/"
			const api= `${proxy}https://api.darksky.net/forecast/c0b08acf57de1a86b3b5afb71a3f21b7/${lat},${long}`;

			fetch(api)
			.then(response =>{
				return response.json();
			})
			.then(data =>{
				const {temperature, summary, icon } = data.currently;
				//set dom elements from the api

				temperatureDegree.textContent = temperature;
				temperatureDescription.textContent =summary;
				locationTimezone.textContent = data.timezone;

				//formula for celsius
				let celsius =(temperature - 32) * (5/9);
				//set icons
				setIcon(icon, document.querySelector(".icon"));
			
				//change in c and f

				temperatureSection.addEventListener('click', ()=>{
					if(temperatureSpan.textContent === "F"){
						temperatureSpan.textContent = "C";
						temperatureDegree.textContent = Math.floor(celsius);
					}else{
						temperatureSpan.textContent = "F";
						temperatureDegree.textContent = temperature;
					}
				});

			});
		});
	}

	function setIcon(icon, iconID) {
		const skycons =new Skycons({color: "white"});
		const currentIcon = icon.replace(/-/g, "_").toUpperCase();
		skycons.play();
		return skycons.set(iconID, Skycons[currentIcon]);
	}

});