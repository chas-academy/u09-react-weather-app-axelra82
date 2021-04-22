# CHAS ACADEMY | ASSIGNMENT U09

[Live app preview](https://awesome-wozniak-c074b3.netlify.app/)

## Introduction

This assignment requires the developer to create a weather app using [ReactJS](https://reactjs.org/).

### Prerequisites

**NODEJS**

To test if you have it, run `node -v`. If this outputs a version number (e.g. v15.x.x) you are good to go.

If you don't have it installed visit [nodejs.org](https://nodejs.org/en/download/), download installer and follow instructions for you OS.

**Netlify CLI**

To test if you have it, run `netlify -v`. If this outputs a version number (e.g. netlify-cli/3.18.3) you are good to go.

If you don't have it installed you can run `npm i -g netlify-cli`. For more details visit [netlify docs](https://docs.netlify.com/cli/get-started/).

**NOTE** You will need netlify localy since all API requests are made using Netlify functions (AWS Lambda functions). This is for absolute secrecy of environmnet variables. If you wan't to see the result you can visit the link for the live app in the begining if this document.

**Local environment**

On build this project looks for an environment. Since environment variables are secret and should never be shared in public repos you will need to set it up yourself. Create a new file called `.env` in the project root. You can do this several ways, e.g.:

- vsc file browser: right-click -> new file and name it `.env`
- macOS/Linux: `touch .env`
- windows (cmd): `type nul > .env`

Edit `.env` file and insert:

- `REACT_APP_OWM_API_URL=http://api.openweathermap.org`
- `REACT_APP_OWM_API_KEY=YOUR_API_KEY`

Then save and exit. Your environment setup is now done!

**NOTE** Remember to replace `YOUR_API_KEY` with your own API key from [openweathermap.org](https://openweathermap.org/api)

### Local setup

1. download repo
2. navigate to folder
3. run `npm i` to install dependencies
4. run `npm netlify_dev` to serve website on [localhost:8888](http://localhost:8888)

# App Functionallity

## Requirements

User must be able to see weather conditions for:
- [x] temperature
- [x] wind
- [x] humidity
- [x] sunrise/sunset (time)
- [x] switch between celsius (c) and farenheit (f)
- [x] get weather forecast (with above details) 5 days ahead:
    - [x] short weekly summary
    - [x] three hour intervals for current day
    - [x] five-day prognosis

App must also:
- [x] use weather API, e.g. ~~SMHI~~, ~~YR.NO~~, [OpenWeatherMaps](https://openweathermap.org/api) etc
- [x] use web browser goeloaction to get user position
- [x] design/colors based on [weather.com](http://weather.com/) or similar application(s)

## Extra (optional)

- [x] search for weather on specific location
- [x] save locations
- ~~[ ] graphs for:~~
  - ~~[ ] high/low temperatures~~
  - ~~[ ] average high/low temperatures~~
- ~~[ ] weather front on a radar map~~
- [x] ~ average precipitation (showing PoP)

# Hand in

**Due date:** April 29th 2021

[Github repo](https://github.com/chas-academy/u09-react-weather-app-axelra82) and link to repo in LMS

# Article/Video references

During the development of this application some helpful/interesting articles where found:

- [Pure CSS Horizontal Scrolling](https://css-tricks.com/pure-css-horizontal-scrolling/)
