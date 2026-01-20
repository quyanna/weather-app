# Weather App

A sleek, responsive weather application that provides real-time weather information with dynamic gradient backgrounds that adapt to the current weather conditions.

## Features

- **Real-time Weather Data**: Fetches current weather information from the Visual Crossing Weather API
- **Dynamic Backgrounds**: Smooth gradient transitions that change based on weather conditions (clear, rain, cloudy, snow, wind)
- **Glassmorphism UI**: Modern glass-like design with backdrop blur effects
- **Responsive Design**: Optimized for desktop and mobile devices
- **Smooth Animations**: Opacity transitions for background changes and UI elements
- **Location Search**: Search for weather by city name or location

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript (ES6+)
- **Build Tool**: Webpack
- **API**: Visual Crossing Weather API
- **Styling**: Custom CSS with glassmorphism effects and responsive design

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/weather-app.git
   cd weather-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:8080`

## Usage

1. Enter a city name or location in the search bar
2. Press Enter or click the search button
3. View the current weather data including temperature, conditions, humidity, and more
4. The background will smoothly transition to match the weather type

## API Key

This app uses the Visual Crossing Weather API. You'll need to sign up for a free API key at [Visual Crossing](https://www.visualcrossing.com/) and replace the placeholder in `src/api-handling.js`:

```javascript
const response = await fetch(
  `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/today?&unitGroup=metric&include=current&key=YOUR_API_KEY&contentType=json`
);
```

## Project Structure

```
weather-app/
├── src/
│   ├── api-handling.js    # API calls and data processing
│   ├── index.js          # Main application logic
│   ├── styles.css        # Styling and responsive design
│   ├── template.html     # HTML template
│   └── videos/           # (Removed) Previously used video backgrounds
├── webpack.common.js     # Webpack configuration
├── webpack.dev.js        # Development build config
├── webpack.prod.js       # Production build config
├── package.json          # Dependencies and scripts
└── README.md             # This file
```

## Build

To create a production build:

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Weather data provided by [Visual Crossing Weather API](https://www.visualcrossing.com/)
- Font: BO CD Mono (custom font faces from the video game Death Stranding)
