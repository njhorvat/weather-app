window.addEventListener('load', ()=> {
    let lon;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let weatherIcons = document.querySelector('.weather-icon');
    let temperatureSection = document.querySelector('.temperature');
    let temperatureSpan = document.querySelector('.temperature span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            lon = position.coords.longitude;
            lat = position.coords.latitude;
            
            const api = `http://api.weatherapi.com/v1/current.json?key=7b0e78e306854dd1ac701431202705&q=${lat},${lon}`;

            fetch(api)
                .then(response =>{
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const { temp_f, temp_c,} = data.current;
                    const {text} = data.current.condition;
                    

                    //set DOM elements from the API
                    temperatureDegree.textContent = temp_f;
                    temperatureDescription.textContent = text;
                    locationTimezone.textContent = `${data.location.name}, ${data.location.region}`;
                    
                    
                    //icons
                    
                    //temp toggle
                    temperatureSection.addEventListener('click', ()=>{
                        if(temperatureSpan.textContent === "F" && temperatureDegree.textContent === temp_f){
                            temperatureSpan.textContent = "C", temperatureDegree.textContent = temp_c;
                        }else{
                            temperatureSpan.textContent = "F", temperatureDegree.textContent = temp_f;
                        }

                    });
                });
        });

        
    }

});