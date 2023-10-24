# Mapbox Map Application

<a name="readme-top"></a>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About the project</a>
      <ul>
        <li><a href="#features">Features</a></li>
      </ul>
    </li>
    <li>
      <a href="#built-with">Built with</a>
    </li>
    <li>
      <a href="#getting-started">Getting started</a>
		 <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
	<li><a href="#build-and-run">Build & Run</a></li>
        <li><a href="#how-to-start-the-project-for-development-purposes">How to start the project for development purposes</a></li>
     </ul>
    </li>
  </ol>
</details>

## About the project
![About The Project Screenshot][screenshot]

This is a simple web application that allows users to interact with a Mapbox map.
The application lets users place markers on the map, plan routes between markers, and customize route appearance.
The default map view centers on Veszprém, Hungary.

### Features
- **Interactive Map:** The application displays an interactive Mapbox map, allowing users to interact with it.
- **Mouse Wheel Zoom:** Users can zoom in and out of the map by scrolling the mouse wheel, allowing for a dynamic and detailed exploration of the map.
- **Place Markers:** Users can click on the map to place markers. The application limits the number of markers to a maximum of 25.
- **Plan Routes:** Users can plan routes between markers on foot, by car or by bike using the Mapbox Directions API. The following route information is displayed:
  - Route geometry on the map
  - Route distance and estimated travel time
- **Searchable Geocoding:** A search feature is implemented to search for locations and add markers to the map using address searches.
- **Customize Route Appearance:** Users can customize the appearance of the planned route by selecting a route line color and width.
- **Error Handling:** The application handles errors and provides informative error messages to the user.
- **Clear All Markers:** For user convenience, there is a "Clear All Markers" button that removes all markers from the map.
- **Geolocation Button:** A geolocation button is available for users to center the map on their current location.
- **Random Marker Orientation:** Placed markers have a touch of whimsy as they are randomly tilted by 10 degrees in either a positive or negative direction, adding a playful element to the map.
- **Fullscreen Mode:** Users can expand the map to full-screen mode with a dedicated button, providing an immersive mapping experience.

## Built with
* [![Mapbox][mapbox-gl.js]][mapbox-url]
* [![JavaScript][js]][js-url]
* [![React][react.js]][react-url]

## Getting started
### Prerequisites
- Node.js and npm installed on your machine.

<a name="build-and-run"></a>
### Build & Run
1. Clone the repository to your local machine:
```sh
git clone git@github.com:LBlanka99/mapbox-homework.git
```

2. Create a .env file in the project root directory and add your Mapbox access token to it. The .env file should look like this:
```sh
REACT_APP_MAPBOX_ACCESS_TOKEN=Paste-Your-Token-Here
```

3. Change to the project directory:
```sh
cd mapbox-homework
```

4. Install dependencies and build the project:
```sh
npm install && npm run build
```

5. Install serve:
```sh
npm install -g serve
```

6. Serve your static site on the port 3000:
```sh
serve -s build
```

### How to start the project for development purposes
1. Clone the repository to your local machine:
```sh
git clone git@github.com:LBlanka99/mapbox-homework.git
```

2. Change to the project directory:
```sh
cd mapbox-homework
```

3. Install the required dependencies:
```sh
npm install
```

4. Create a .env file in the project root directory and add your Mapbox access token to it. The .env file should look like this:
```sh
REACT_APP_MAPBOX_ACCESS_TOKEN=Paste-Your-Token-Here
```

5. Start the development server:
```sh
npm start
```

The application should now be running locally at http://localhost:3000/. You can access it in your web browser.



<!-- MARKDOWN LINKS & IMAGES -->
[react.js]: https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB
[react-url]: https://react.dev/
[mapbox-gl.js]: https://img.shields.io/badge/Mapbox-000000.svg?style=for-the-badge&logo=Mapbox&logoColor=white
[mapbox-url]: https://www.mapbox.com/
[js]: https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=JavaScript&logoColor=black
[js-url]: https://www.javascript.com/
[screenshot]: images/screenshot1.png
