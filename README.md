# SGCooks
> Project By: 
> - [Zhao Xing](https://github.com/Newbieshine/)
> - [Yuan Sheng](https://github.com/ChongYuanSheng/)
> - [Novia](http://github.com/noviaantony/)
> - [Ariff](http://github.com//)

| Platform                          | Description                                                                                                                    |
:---------------------------------- | :----------------------------------------------------------------------------------------------------------------------------: |
| Youtube                           | [App Demo](https://youtu.be/GLeHdXek6B4)      |
| Figma                             | [Initial Wireframes](https://www.figma.com/file/Tx61GjMJgRKTi7rcVMW4RH/SGCooks-UX?node-id=0%3A1)    |


Code submission for [SMU .Hack HEAP 2022]

## Core Features

***Home***
> Landing page explaining what is SGCooks, including a menu preview, customer testimonials and a footer

***Menu***
> Search from a list of 5,000+ recipes based on ingredients included
> Search for cuisine-specific or diet-specific recipes with the filter buttons
> View the instructions, image of ingredients as well as equipment needed for each recipe

***Cart , Checkout & Order History***
> Add recipe kits to your own cart after signing up & logging in
> Order history will reflected upon checkout (note: payment section is a dummy payment section)

---
## **Technology Stack**
- [HTML & CSS]()
- [Bootstrap ](https://getbootstrap.com/)
- [Vanilla JavaScript](https://developer.mozilla.org/en-US/)
- [jQuery](https://jquery.com/)
- [SpringBoot](https://spring.io/projects/spring-boot)
- [PostgreSQL](https://www.postgresql.org/download/)
- [Spoonacular API](https://spoonacular.com/food-api)
- [Sweet Alert 2](https://sweetalert2.github.io/)


## **IDE Used**
- [Intellij IDEA](https://www.jetbrains.com/idea/) 

## Local Deployment

***Installations required***

> Kindly install [Intellij IDEA](https://www.jetbrains.com/idea/) IDEA and [PostgreSQL](https://www.postgresql.org/download/)

***PostgreSQL Set-Up***

> Download the latest version and choose the installer applicable 
![PostgreSQL Download Page](https://github.com/Newbieshine/SGCooks/blob/main/set-up%20resources/Postgres-Download.PNG?raw=true)

> Follow through the installation process

![PostgreSQL installation](https://github.com/Newbieshine/SGCooks/blob/main/set-up%20resources/postgres-installation1.PNG?raw=true)

> After installation, open cmd and type "psql -U postgres" as shown and log in with the password set up during installation

![PostgreSQL login](https://github.com/Newbieshine/SGCooks/blob/main/set-up%20resources/psql-login.PNG?raw=true)

> After which enter "CREATE DATABASE sgcooks;" as shown below

![create database in postgres](https://github.com/Newbieshine/SGCooks/blob/main/set-up%20resources/create-database.PNG?raw=true)


***Cloning the repo and opening with Intellij***

> Open command prompt, cd to your prefer directory and enter "git clone https://github.com/Newbieshine/SGCooks.git"
![Cloning repo](https://github.com/Newbieshine/SGCooks/blob/main/set-up%20resources/git-clone.PNG?raw=true)

> After cloning go into your Intellij and open the Sgcooks folder

> Kindly locate the "application.properties" file which is located in "SGCooks/src/main/resources/". Change the spring.datasource.username and spring.datasource.password to your PostgreSQL username and password as set-up above. 
![renaming application.properties file](https://github.com/Newbieshine/SGCooks/blob/main/set-up%20resources/rename-application-properties.jpg?raw=true)

> You may now launch the application through Intellij by clicking on the play button on the top right hand corner

> After a successful launch, enter "localhost:8080/" in your browser to access the SGCooks website

## Disclaimer
- We do not own or license any copyrights in the images used in the application. You may use the Services and the contents contained in the Services soley for your own individual non-commercial and informational purposes only.
