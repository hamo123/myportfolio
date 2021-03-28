# myportfolio

Overview

This project contains two projects, testproj & testprojAPI. testproj contains the UI which uses REACT & testProjAPI contains the API which uses ASP.NET 5.0. To run the project both 
projects must be running at the same time. 

Setup

To run the project get the latest from GitHub and update / create your database via powershell. If you want to add some data, run datasetup.sql under testprojapiDAL -> SQL. There 
is a stored procedure called "[GetProduct]" as well which must be ran before running the project. This procedure doesn't do anything but an example was required under
the specification for this project. 

All database functionality, including entity framework migrations, is under testprojapiDAL.

Areas for improvement & General Notes

I haven't went crazy with the UI due to time constraints. You'll notice you can't specify quantity and it always defaults to 10. In a future iteration I would allow the user to 
select how much they want. I'd also add some pictures to the products to make the page pop more. On a successful order confirmation I would redirect the user to another page to
give them their order reference number & send them an order confirmation email. I haven't validated the inputs, so you can put in whatever you like. In a future iteration 
validation on inputs would be added. If there was a specific client requirement I could look at bootstrap theming the page. 

For the API, I'm generally happy. I could look at abstracting away some more business logic in my controllers to make the methods more concise & readable.
I've implemented a RequestResponse pattern which I like to use for sending and recieving requests. (Controllers -> RequestResponse). 
Finally, I would of liked to include some automated unit tests, but they weren’t asked for in the specification and time constraints stopped me from progressing further. 
I’m not a TDD developer and I write my tests at the end. 

For microservices, I've only split the project up into 3 layers. A UI, API & Data layer. However, it wouldn't take much to split the ProductController & OrdersController into their own projects to facilitate microservices. 

Final Comments

I hope you enjoy looking through this project as much as I did creating it. Thank you for taking the time to look at this. 

