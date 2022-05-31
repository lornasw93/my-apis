# Portfolio APIs

The purpose of this project was to work as a very basic Node.js backend service for my V1 portfolio website (not in use anymore) where I could:

* Send contact email
* List all GitHub repos
* GitHub repo count
* GitHub repo readme file
* List all dev.to blog posts
* dev.to blog post count

Ideally I would've liked to have spent more time working on a number of things like authentication, better error handling, pretty emails, testing etc. it was suitable for me at the time. I've talked about why I created this backend service in [this blog post](https://dev.to/lornasw93/why-i-created-a-node-js-back-end-service-for-my-portfolio-site-4062).

I used Node.js and Heroku for hosting as both were free.

## Get started
Install NPM packages via `npm i` then run the project via `node index.js` and look at `http://localhost:3000`

## Basic usage

### List all blog posts from dev.to
**GET** `http://localhost:3000/api/posts`

### List all repos from GitHub
**GET** `http://localhost:3000/api/repos`  

### Get GitHub repo readme
**GET** `http://localhost:3000/api/repo/<repoName>/readme`

### Send contact email
**POST** TBC