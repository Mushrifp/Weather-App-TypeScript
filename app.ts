const submitButton = document.getElementById('submit') as HTMLButtonElement
const userLocation = document.getElementById('userLocation') as HTMLInputElement
const showData = document.getElementById('showData') as HTMLDivElement
const loadingIndicator = document.getElementById('loading') as HTMLDivElement
const suggestionsDiv = document.getElementById('suggestionsDiv') as HTMLDivElement;

submitButton.addEventListener('click', getUserLocation)

document.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
        getUserLocation();
    }
  });


interface mainData {
    name: string;
    windSpeed: string;
    temperature: string
}

async function getUserLocation() {
    let userInput = userLocation.value.trim()
    if (userInput === '') {
        alert("Enter a Location")
        return
    }

    userLocation.value = ''

    loadingIndicator.style.display = 'block';
    showData.innerHTML = '';

    try {
        let locationCoordinates = await getLocationCoordinates(userInput)
        let response = await getLocationWeather(locationCoordinates.longitude, locationCoordinates.latitude)

        const dateToShow: mainData = {
            name: locationCoordinates.details,
            temperature: response.temperature,
            windSpeed: response.windSpeed
        }

        showData.innerHTML = `
        <p style="background: #f8f9fa; padding: 12px; margin: 8px 0; border-radius: 4px; border-left: 4px solid #4CAF50;">
            <strong>Location:</strong> ${dateToShow.name}
        </p>
        <p style="background: #f8f9fa; padding: 12px; margin: 8px 0; border-radius: 4px; border-left: 4px solid #2196F3;">
            <strong>Temperature:</strong> ${dateToShow.temperature}°C
        </p>
        <p style="background: #f8f9fa; padding: 12px; margin: 8px 0; border-radius: 4px; border-left: 4px solid #FF9800;">
            <strong>Wind Speed:</strong> ${dateToShow.windSpeed} km/h
        </p>
        `;
        loadingIndicator.style.display = 'none';
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

interface coordinates {
    latitude: number;
    longitude: number;
    details: string
}

async function getLocationCoordinates(placeName: string): Promise<coordinates> {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(placeName)}&format=json&limit=1`;

    const response = await fetch(url)
    const data = await response.json()
    if (data.length > 0) {
        const { lat, lon, display_name } = data[0];

        let dataToReturn: coordinates = {
            latitude: parseFloat(lat),
            longitude: parseFloat(lon),
            details: display_name
        }
        return dataToReturn

    } else {
        alert("not found")
        throw new Error('Place not found');
    }
}

interface locationData {
    windSpeed: string
    temperature: string
}

async function getLocationWeather(longitude: number, latitude: number): Promise<locationData> {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

    const response = await fetch(url);
    const weatherData = await response.json();
    const dataToReturn: locationData = {
        windSpeed: weatherData.current_weather.windspeed,
        temperature: weatherData.current_weather.temperature,
    }
    return dataToReturn;
}



userLocation.addEventListener('input', async () => {
    const query = userLocation.value;
    if (query.length < 3) { 
        suggestionsDiv.innerHTML = '';
        return;
    }

    await fetchAndDisplaySuggestions(query);
});


async function fetchAndDisplaySuggestions(query: string):Promise<void> {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json`;

    try {
        const response = await fetch(url);

        const suggestions = await response.json();
        suggestionsDiv.innerHTML = '';

        for (let i = 0; i < suggestions.length; i++) {
            const suggestion = suggestions[i];
            
            const div = document.createElement('div');
            div.textContent = suggestion.display_name;
            div.style.color = 'white'

            div.addEventListener('click', () => {
                userLocation.value = suggestion.display_name;
                suggestionsDiv.innerHTML = ''; 
            });

            suggestionsDiv.appendChild(div);
        }
    } catch (error) {
        console.error('Error fetching location suggestions:', error);
    }
}

