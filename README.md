# 429 Manager Application

This repository contains the code for a web application that helps streamline the student application process for the CS429 class
at UMass Amherst. The application uses NextJS on the frontend, and it uses Firebase to handle logins and to store data.

## Code and File Structure
The code structure follows a standard NextJS file structure, and it was created with create-next-app. The most important folders
are the components folder and the pages folder. The pages folder contains each page in the application as its own file. Since
NextJS has automatic routing, each name in the pages folder is a route to the corresponding page. So for example, the route
/login will take you to the login page, which is stored in login.js in the pages folder. The components folder contains React
components that are used by the pages in the pages folder.

The main pages are login.js, fillApplication.js, and viewApplications.js. The login page simply allows you to login as a student
or a professor using a Google account. If you login as a professor, you will be redirected to the View Applications page, which
allows you to review applicants and accept/reject them. If you login as a student, you will be redirected to the Fill Application
page, which allows you to apply for 429 sections

## How to run

First, you will need to make sure you have all the necessary packages by running `npm install`. Once all the packages are
installed, you can run the web app locally by running `npm run dev` and going to [localhost:3000](http://localhost:3000). This
will bring you to the login page where you can begin using the application.

## Github Repo
The github repo can be found at: https://github.com/gabrielgordbegli/429-manager-application/tree/main/pages