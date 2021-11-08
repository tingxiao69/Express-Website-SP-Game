# Project Description
 - Author: SHI TINGXIAO 
 - This project is completed in Sep 2020
 - This is a practicing project which utilises Express.js, MySql, Passport.js, HTML5 and CSS3

# Project Objective
SP GAME is an online game sales platform, recently they want to revamp their website, thus you are hired as the developer to create a website hosted using Express.js.
The website needs to achieve several functions:
 1) Allow user sign up
 2) User needs to be able to have presistent login and logout, user credentials needs to be protected(bcrypt)
 3) User can search a title and see details to each game listing
 4) User can update their profile picture
 5) Admin is able to create new games


# Run the file
 - Software Prerequisite
    - Mysql 
    - MySql WorkBench 
    - Visual Stuido Code
 1) Download -> unzip/Clone the file. 
 2) Open the project in VS code
 3) Open up a terminal and key in ```npm install``` to install all the node_modules
 4) Open MySql Workbench, in the tool bar, navigate to server > Data import > Import from self-contained file and select the 'spgames-stx.sql' found in the 'Mysql Dump' Folder of the project
 5) Once successfully imported, head to the project folder > model > dataBaseConfig.js, and edit the mysql.createConnection according to your computer settings.
 6) In the VS code terminal, key in ```node express.js``` to run the project. The website will be hosted at http://localhost:8081/

# Page Directory
### Globally Accessible
 1)	Home Page: http://localhost:8081/main
 2)	Games Page: http://localhost:8081/games
 3)	About Page: http://localhost:8081/about
 4)	Community Page: http://localhost:8081/community
### Accessible only when not logged in
 5)	Login Page: http://localhost:8081/login
 6)	Register Page: http://localhost:8081/register
### Accessible only when logged in
 7)	User Profile Page: http://localhost:8081/mypage
### Accessible only for admin
 8)	Add Game Page: http://localhost:8081/addgame_page
 9)	Edit Game Page: http://localhost:8081/editgame_page

# Project Demo
