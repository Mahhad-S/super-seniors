# Wanderer's Quill

## Group 1 Super Seniors Final Project

Created by Mahhad, Anh, Edwin, Ethan and Mauricio

The goal of this project was to provide a worldbuilding platform for authors, tabletop gamers, game designers, etc.
so that they may have a centralized location to store any and all information relating to any aspect of their
worldbuilding

### To Start the Local Server
To start the local server, input the following command into your terminal: **nodemon src/index.js**
Then on your web browser, input the URL: **http://localhost:3000**

If nodemon is not present on your desktop, you can install it using: **npm i -g nodemon**

If nodemon is installed and your server is not starting, it may be because your execution policy is set to Restricted
To fix this, open up windows powershell as administrator
Type in the command: **Get-ExecutionPolicy**
if it says anything other than Unrestricted, then you need to input the following command: **Set-ExecutionPolicy Unrestrict**
Powershell will then prompt you to confirm, just type the letter **y** in powershell to continue
And you are all set! You should be able to start the local server now