# CSC 317 Term Project

## Purpose

The purpose of this repository is to store all the code for my web application.
## Project Information

I only got up to implementing the search functionality. It works in the back-end on Firefox through localhost:3000/posts/search?search=
I struggled to get the search button to work on the front-end despite trying different methods.

Something cool I did was hiding the option to post when not logged in and replacing it with post when logged in using Handlebars.
That leads me to think that I might be able to have a light/dark theme using Handlebars as well...

# Build/Run Instructions

## Build Instructions
1. cd imgur-clone/application
2. npm install
3. npm install --save nodemon mysql2 express flash sharp multer

Database dump is in application/config

## Run Instructions
1. cd imgur-clone/application
2. nodemon
3. go to localhost:3000 on web browser
