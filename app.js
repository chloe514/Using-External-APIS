const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors'); // this handles cross-origin requests

const app = express();
const port = 3000;

// Define CORS options
const corsOptions = {
    origin: '*', 
    credentials: true,            // access-control-allow-credentials:true
    optionSuccessStatus: 200,
};

// Middleware
app.use(cors(corsOptions)); // Apply CORS options
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route handling
app.post('/weather', async (req, res) => {
    const zip = req.body.zip;
    const apiKey = '0b6d76197285696915e9154ac63d16bf'; 
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&units=imperial&appid=${apiKey}`;

    try {
        const response = await axios.get(apiUrl); // this sends GET request to OpenWeatherMap API
        const weatherData = {
            city: response.data.name,
            temperature: response.data.main.temp.toFixed(1),
            conditions: response.data.weather[0].description,
            tempHiLo: `${response.data.main.temp_max.toFixed(1)} / ${response.data.main.temp_min.toFixed(1)}`,
            date: new Date().toLocaleDateString()
        };
        res.json(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).send('Error fetching weather data');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});






