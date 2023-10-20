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
        <li><a href="#how-to-start-the-project">How to start the project</a></li>
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
- **Place Markers:** Users can click on the map to place markers. The application limits the number of markers to a maximum of 25.
- **Plan Routes:** Users can plan routes between markers using the Mapbox Directions API. The following route information is displayed:
  - Route geometry on the map
  - Route distance and estimated travel time
- **Searchable Geocoding:** A search feature is implemented to search for locations and add markers to the map using address searches.
- **Customize Route Appearance:** Users can customize the appearance of the planned route by selecting a route line color and width.
- **Error Handling:** The application handles errors and provides informative error messages to the user.

## Built with
* [![Mapbox][mapbox-gl.js]][mapbox-url]
* [![JavaScript][js]][js-url]
* [![React][react.js]][react-url]

## Getting started
### Prerequisites
- Node.js and npm installed on your machine.

### How to start the project
1. Clone the repository to your local machine:
```sh
git clone git@github.com:LBlanka99/mapbox-homework.git
```

2. Change to the project directory:
```sh
cd mapbox-map-app
```

3. Install the required dependencies:
```sh
npm install
```

4. Start the development server:
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
