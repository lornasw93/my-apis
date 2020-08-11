
# My APIs

The purpose of this project is to work as a backend service for my portfolio website.

## Tech stack
* Node.js
* Firebase (Cloud Functions) (not free 😢 but wicked 😎)
* Heruko for hosting (free)

## Project structure

### Blog 

**GET** `http://localhost:5000/posts/<username>`

### Repos

**GET** `http://localhost:5000/repos/<username>`
**GET** `http://localhost:5000/<username>/repo/<project>/readme`

### Communications

#### Email

#### Text Messaging

## Running the project
Because I'm using FCF you'll need to `cd` into the *functions* folder of your workspace folder i.e. mine is:

`cd C:\Users\lorna.watson\repos\my-apis\functions`

To run locally, fire off `firebase serve` and usually this uses port *5000* (it'll say in the command window anyway).

## What's next?
* Setup MongoDB (for logging purposes i.e. emails)
* Implement testing
* More functionality
* Explore Twilio API more
* Pretty emails
* ...
