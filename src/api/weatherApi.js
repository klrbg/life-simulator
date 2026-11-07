export async function fetchWeather() {
    const response = await fetch(
         "https://api.open-meteo.com/v1/forecast?latitude=48.15&longitude=17.11&current=temperature_2m,weather_code"
    )

    if (!response.ok) {
        throw new Error("Weather request failed")
    }

    const data = await response.json()

    return data.current 
    
}