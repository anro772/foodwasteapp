Team Name: The Debuggers

Anti Food Waste App

This project is centered to solve the problem that people tend to waste food by encouraging them to use a user-friendly application that allows them to connect with friends and create preference-based lists. The application reminds users of their foods' expiry date, when their fridge is nearly empty and when their friends have eaten something, turning the user experience into a highly distinctive aspect of their daily lives that they could not forget, thus making the environment better by always checking on the app.

General Functionalities: 
-	make a list organized by categories
-	notify user when the product reached the valability term
-	mark products as available to be shared
-	define group of friends
-	label them according to their preferences
-	invite friends to see the list of the available preferences
-	any user can claim products from the list
-	the app allows sharing on social media platform

The database will contain the following classes:
-	Users - all Users in the app
-	Friends - an user can have friends that are also Users
-	User_Fridge - the food available in an user’s list
-	Foods - foods that are available for Users

Backend
Creating the classes:
1.	Users Class with the following attributes: userId, userName, userPhone etc. 
2.	Friends Class, which extends the Users Class 
3.	User_Fridge Class, which HAS-A a list of foods (composition)
4.	Foods Class -  which contains the following attributes: category (vegetarian, meat etc.), price, availability etc.
Creating a relational database with the tables mentioned above.
Creating the ORM in Node.js and managing the relationships between the tables
Accessing the data from the relational database using an API and the HTTP methods: GET, PUT, DELETE and POST 

Frontend
Creating an interactive UIs using React.js 
1.	Implementing the first page, where users can be created and added to the database
2.	After creation, implementing the option to create a list of foods and make it visible for all of the users
3.	Adding the option to edit the list of foods
4.	Creating the friends list, with the option to also edit it 
5.	Adding the functionality of inviting friends to check the list of foods
6.	Adding the functionality to claim a certain food and then to have it deleted from the list
7.	Adding the option to share on other social media platforms
