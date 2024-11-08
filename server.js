var mysql = require('mysql');
var express = require('express');
var session = require('cookie-session');
var path = require('path');
var { createServer } = require('http');

const connection = mysql.createConnection({
	host     : process.env.SQL_HOST,
	user     : process.env.SQL_USER,
	password : process.env.SQL_PASSWORD,
	database : process.env.SQL_DB,
	port: process.env.SQL_PORT
});

const app = express();

app.set('trust proxy', 1);

app.use(session({
	name: 'session',
	maxAge: 14 * 24 * 60 * 60 * 1000,
	secret: process.env.SECRET,
	keys: [process.env.KEY1, process.env.KEY2]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist/')))

app.get(['/', '/index', '/home', '/main'], async (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get(['/game'], async (req, res) => {
    res.sendFile(path.join(__dirname, 'game.html'));
});

app.get(['/faqs', '/faq', '/about'], async (req, res) => {
    res.sendFile(path.join(__dirname, 'faqs.html'));
});

app.get(['/login'], async (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.get(['/signup'], async (req, res) => {
    res.sendFile(path.join(__dirname, 'signup.html'));
});

app.get(['/profile', '/library'], async (req, res) => {
    res.sendFile(path.join(__dirname, 'profile.html'));
});

app.get(['/buy', '/checkout'], async (req, res) => {
    res.sendFile(path.join(__dirname, 'checkout.html'));
});

app.post('/db', function(request, response) {
	let query = request.body.query;
	let parameters = request.body.parameters;

	if (query) {
		connection.query(query, parameters, function(error, results, fields) {
			if (error) console.error(error.message);

			response.send(results);
			response.end();
		});
	} else {
		console.error("Hah");
		response.end();
	}
});

var httpServer = createServer(app);

httpServer.listen(8080, () => {
    console.log("PORT:8080");
});
