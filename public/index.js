// Add an event listener to the weatherForm when submitted
document.getElementById('weatherForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Get the zip code value from the input field
    const zip = document.getElementById('zip').value;

    try {
        // Send a POST request to the server with zip code data
        const response = await fetch('http://localhost:3000/weather', {
            method: 'POST', // Use POST method for sending data
            headers: {
                'Content-Type': 'application/json' // Specify content type as JSON
            },
            body: JSON.stringify({ zip }) // Convert zip code to JSON format and send in body
        });

        // Check if the server response is successful
        if (!response.ok) {
            throw new Error('Network response was not ok'); // Throw an error if response is not ok
        }

        // Parse JSON response from server to get weatherData object
        const weatherData = await response.json();

        // Display weather information section by setting its display to block
        document.getElementById('weatherInfo').style.display = 'block';

        // Update HTML elements with weather data received from server
        document.getElementById('cityDisplay').innerText = weatherData.city;
        document.getElementById('temperature').innerText = weatherData.temperature;
        document.getElementById('conditions').innerText = weatherData.conditions;
        document.getElementById('temp-hi-lo').innerText = weatherData.tempHiLo;
        document.getElementById('date').innerText = weatherData.date;
    } catch (error) {
        console.error('Error:', error); // Log any errors that occur during fetch or JSON parsing
    }
});



