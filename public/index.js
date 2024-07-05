
//Waiting for the DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
   //form element
    const form = document.querySelector('form');

    //adding submit event listener to form
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const zip = formData.get('zip');

        try {
            const response = await axios.post('/weather', { zip }); //Sends post request to weather endpoint with zip code
            const weatherData = response.data; //gets weather data from response

            // Update UI with weather data
            document.getElementById('cityDisplay').textContent = weatherData.city;
            document.getElementById('temperature').textContent = weatherData.temperature;
            document.getElementById('conditions').textContent = weatherData.conditions;
            document.getElementById('temp-hi-lo').textContent = weatherData.tempHiLo;
            document.getElementById('date').textContent = weatherData.date;

            // Show weather info card
            document.getElementById('weatherInfo').style.display = 'block';
        } catch (error) {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again.');
        }
    });
});

