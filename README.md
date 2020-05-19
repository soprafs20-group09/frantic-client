![Logo](src/assets/frantic/logo-hollow.svg)

# Frantic-Client
[![Deployment Status](https://github.com/soprafs20-group09/frantic-client/workflows/Deploy%20Project/badge.svg)](https://github.com/soprafs20-group09/frantic-client/actions)
![Heroku](https://heroku-badge.herokuapp.com/?app=sopra-fs20-group-09-client)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=soprafs20-group09_frantic-client&metric=alert_status)](https://sonarcloud.io/dashboard?id=soprafs20-group09_frantic-client)

## Introduction

Frantic is a chaotic card game created by [Rulefactory](https://rulefactory.ch). This repository is the front-end part of an online implementation for this card game. 

Please find the current build under http://frantic.online/.

## Technologies

To establish a connection between the front- and backend REST is used. When further proceeding in the game (joining a lobby), a websocket connection gets established.

## High-level Components

Listed below are the main components of the frontend:

## Launch & Development

* `npm run dev`

  Runs the app in the development mode.<br />
  Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

  The page will reload if you make edits.<br />
  You will also see any lint errors in the console.

* `npm run build`

  Builds the app for production to the `build` folder.<br />
  It correctly bundles React in production mode and optimizes the build for the best performance.

  The build is minified and the filenames include the hashes.<br />
  Your app is ready to be deployed!

  See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
  
  ## Illustrations
  
  When visiting the site, the menu screen appears where one can choose either to create or join a game. 
  
  When creating a game, the player is asked to enter a username and choose the settings for the game.
  
  When joining a game a player is redirected to the lobby browser, where a lobby can be joined.
  
  Once there are enough player in a lobby the host can start the game. 
  
  During every phase of this process a player can visit the help page to read the rule set or special effects of cards.
  
  ## Roadmap
  
  1.Implement the expansion pack  
  2.Minor bug fixes   
  3.Moblie version?
  
  ## Authors and Aknowledgements
  
  ### Members of the SoPra-group 09 2020:
  
  Kyrill Hux, Jan Willi, Davide Fontanella, Remy Egloff, Sina Krumhard
  
  ### Aknowledgements
  
  First of all we want to thank our tutor Moritz Eck, who always provided useful advice to get cleaner code and more user friendlyness.   Further, we would like to say thank you to our friends and families, who tested our game extensively and also provided improvements in   terms of user friendlyness
  
  ## License
  
