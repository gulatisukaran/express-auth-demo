# About

This project demonstrates the access restriction to private routes of a NodeJs application using Youtube and Github. 

Process Flow:
1. User chooses to authenticate themselves using Github or Youtube authentication.
2. Once the authentication is done, a subsription check middleware checks if the user follows BYTE's github account or is Subscribed to BYTE's youtube channel.
3. Then the user is given an auth token that they can use to access private page which shows the username of the user on that specific platform.

Tech Stack:
Node Js + Express
Render for deployment
Github and Youtube/Google APIs

Link: https://express-auth-demo.onrender.com
