# CHAS ACADEMY | ASSIGNMENT U09

~~[Live app preview]()~~

## Introduction

This assignment requires the developer to create a weather app using [ReactJS](https://reactjs.org/).

### Prerequisites

**NODEJS**

To test if you have it, run `node -v`. If this outputs a version number (e.g. v15.x.x) you are good to go.

If you don't have it installed visit [nodejs.org](https://nodejs.org/en/download/), download installer and follow instructions for you OS.

**Local environment**

On build this project looks for an environment. Since environment variables are secret and should never be shared in public repos you will need to set it up yourself. Create a new file called `.env` in the project root. You can do this several ways, e.g.:

- vsc file browser: right-click -> new file and name it `.env`
- macOS/Linux: `touch .env`
- windows (cmd): `type nul > .env`

Edit `.env` file and insert:

- `TBA`

Then save and exit. Your environment setup is now done!

### Local setup

1. download repo
2. navigate to folder
3. run `npm i` to install dependencies
4. run `npm start` to serve website on [localhost:3000](http://localhost:3000)

# App Functionallity

## Requirements

User must be able to see weather conditions for:
- [ ] Temperature
- [ ] Wind
- [ ] Humidity
- [ ] Sunrise/sunset (time)
- [ ] switch between celsius (c) and farenheit (f)
- [ ] get weather forecast (with above details) 5 days ahead:
    - [ ] short weekly summary
    - [ ] three hour intervals for current day
    - [ ] five-day prognosis

App must also:
- [ ] use weather API, e.g. SMHI, YR.NO, OpenWeatherMaps etc
- [ ] use web browser goeloaction to get user position
- [ ] design/colors based on [weather.com](http://weather.com/) or similar application(s)

## Extra (optional)

- [ ] search for weather on specific location
- [ ] save locations
- [ ] graphs for:
  - [ ] high/low temperatures
  - [ ] average high/low temperatures
- [ ] weather front on a radar map
- [ ] average precipitation

# Hand in

**Due date:** April 29th 2021

~~[Github repo]()~~
and link to repo in LMS

# Article/Video references

During the development of this application some helpful/interesting articles where found:

- [Pure CSS Horizontal Scrolling](https://css-tricks.com/pure-css-horizontal-scrolling/)
