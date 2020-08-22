# My APIs

The purpose of this project is to work as a backend service for my portfolio website. Although a work in progess, you can see this API in action over on [https://lorna.dev/](https://lorna.dev/) - check out the blog, projects and contact page. With basic functality added, I'm working on taking the project to the next level by doing numerous things such as: (list will be kept up-to-date)

* Setup MongoDB (for logging purposes i.e. emails)
* Implement testing (Mocha?)
* More functionality
* Explore Twilio API more
* Pretty emails (basic HTML currently)
* Authentication (Auth0?)

I've talked about why I created this backend service in [my blog post](https://dev.to/lornasw93/why-i-created-a-node-js-back-end-service-for-my-portfolio-site-4062).

## Tech stack
* Node.js
* Firebase (Cloud Functions) (not free 😢 but wicked 😎)
* Firebase for hosting (free)

## Project structure

### Blog 

**GET** `http://localhost:5000/api/posts/<username>`

### Repos

**GET** `http://localhost:5000/api/repos/<username>`  
**GET** `http://localhost:5000/api/<username>/repo/<project>/readme`

### Communications

#### Email

#### Text Messaging

## Running the project
Because I'm using FCF you'll need to `cd` into the *functions* folder of your workspace folder i.e. mine is:

`cd C:\Users\lorna.watson\repos\my-apis\functions`

To run locally, fire off `firebase serve` and usually this uses port *5000* (it'll say in the command window anyway).
 
