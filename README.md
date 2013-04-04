## Heroku ExpressJS Boilerplate

Boilerplate for ExpressJS

* Routes directory
* Hogan-Express template engine (w/ layouts)
* MongoDB (coming soon)


### Getting started w/ local development server

Download and install Heroku Toolbelt <https://toolbelt.heroku.com>, this will give you Foreman and the Heroku CLI (command line interface).

1) Download this boilerplate repo and navigate into the code directory with Terminal.

2) Run **npm install** to get all required libraries.

	npm install

3) A Git repository and Heroku app are required for this Example to work. 

	git init
	git add .
	git commit -am "init commit"


4) Create Heroku app and add database

	heroku create

5) Add MongoLabs Starter MongoDB add on to your heroku app

	heroku addons:add mongolab:starter

6) Get Heroku MongoLab connection string into .env file

	heroku config --shell | grep MONGOLAB_URI >> .env

Your connection string to MongoDB will be in your **.env** file now.

7) Start server with **foreman start**.

	foreman start

Foreman reads your .env file, populates the process.env object for use in your app.

8) Open web browser to <http://localhost:5000> to view the web app.

9) Stop the web server press Command+C in the Terminal window.

### Auto restart development server

To auto restart your development server after you make some changes to your code. Install **Nodemon**. [Nodemon](https://github.com/remy/nodemon) will watch your files and restart the server for you.

Install Nodemon. In Terminal type,

	npm install -g nodemon

There are two possible ways to use Nodemon,

	foreman run nodemon app.js

Or with the helper script

	. devserver

The **.nodemonignore** file will ignore certain files and directories from being watched. By default and for example we're ignoring /public folder.


### Frameworks and NodeJS

Libraries and frameworks are created for all programming languages to make complicated programming tasks more easier to program. A database library will create the connection to the database server, insert and query data and return a result that is easily used. A framework involves the same ideas of a library but it usually is larger in size and complexity - picking a framework is usually done at the beginning of development because it is often difficult to switch to another. Android, Arduino, OpenFrameworks, Sinatra, Ruby on Rails, Django and Processing are frameworks, each is a collection of libraries to interact with lower level code.

Libraries and frameworks are available to make your programming life easier - someone else has had similar tasks and requirements so they organized their code into a library and made it available to the community.

#### ExpressJS

ExpressJS (http://expressjs.com/guide.html) is a popular framework for building web applications in NodeJS. ExpressJS's core is taken from the Connect framework.

#### Routing

Routing is how you direct the user's requested URL to retrieve the appropriate 'page' or save the submitted form. All routes execute functions, the callbacks should receive a request and response object from Express

app.get('/page1',function(request, response){
    //your code goes here
})

#### HTTP Methods

GET- a user requests a web page or resource

	app.get('/about',function(request, response){
	    console.log("GET request for /about");
	    response.send("This is the about page.");
	});

POST- a user submits a form

	app.post("/the-form", function(request, response){
	    
	    console.log("a user has request /the-form via POST");
	    
	    //form processing code goes here....
	    
	    //send message to user
	    response.send("okay, we'll process that right away.")
	});


-----

#### Template Engine - Hogan-Express

[Hogan Express](https://github.com/vol4ok/hogan-express)

We will use Hogan-Express, Embedded JavaScript template engine to render our html on ExpressJS. Hogan-Express templates are the mainly HTML and include {{variablehere}} template tags to display dynamic data and perform simple logic and looping.  You will save these templates to a specific directory and then tell ExpressJS what that directory named **/views**. We configure Express to use Hogan-Express template engine and set the template directory **/views** with these statements.

We configure ExpressJS to use Hogan-Express in two files

package.json
	
	...
	"dependencies": {
	    "express": "3.0.0rc5",
	    "hogan-express" : "0.3.3",
	    "moment" : "1.7.2"
  	},
  	...

app.js

	...

	//  templates directory
	app.set('views', __dirname + '/views');

	// setup template engine - we're using Hogan-Express
	// https://github.com/vol4ok/hogan-express
	app.set('view engine', 'html');
	app.set('layout','layout');
	app.engine('html', require('hogan-express'));

	...

#### Rendering templates w/ data

We define our incoming routes in app.js like mentioned above.

app.js

	var routes = require('../routes/index.js');
	app.get('/page1', routes.index);

/routes/index.js (example,not the same as actual code in routes/index.js)

	exports.index = function(req, res) {

		var templateData = {
			'title' : 'Hello World',
			'content' : 'A Priest and a Rabbi walk into a bar...',
			'tags' : ['bar','old','not funny']

		}

		res.render('joke.html', templateData);
	}

/views/joke.html

	<h1>{{title}}</h1>
	<hr>
	<p>
		{{content}}
	</p>
	<br>
	Tagged:
	{{#tags}}
	<li>{{.}}</li>
	{{/tags}}

/view/layout.html

Layouts allow you to have a standard header and footer for a set of pages. It is automatically enabled for this demo code to use /views/layout.html.P

	<html>
		<head>
		<!-- meta and css stuff here -->
		</head>
		<body>
			{{{ yield }}}
		</body>
	</html>

