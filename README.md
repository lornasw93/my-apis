# My APIs

The purpose of this project is to work as a backend service for my portfolio website. Although a work in progess, you can see this API in action over on [https://lorna.dev/](https://lorna.dev/) - check out the blog, projects and contact page. With basic functionality added, I'm working on taking the project to the next level by doing numerous things such as: (list will be kept up-to-date)

* Setup MongoDB (for logging purposes i.e. emails)
* Implement testing (Mocha?)
* More functionality
* Explore Twilio API more
* Pretty emails (basic HTML currently)
* Authentication (Auth0? Identity Server 4?)

I've talked about why I created this backend service in [my blog post](https://dev.to/lornasw93/why-i-created-a-node-js-back-end-service-for-my-portfolio-site-4062).

## Tech stack
* Node.js
* Heroku for hosting

## Project structure

### Blog 

**GET** `http://localhost:5000/api/posts`

### Repos

**GET** `http://localhost:5000/api/repos`  
**GET** `http://localhost:5000/api/repo/<project>/readme`
 
#### Email

## Running the project
`cd` into project root, run `node index.js` and open your browser `http://localhost:3000`
