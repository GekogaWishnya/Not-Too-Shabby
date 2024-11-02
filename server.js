import mysql from 'mysql'
import express from 'express'
import session from 'express-session'
import path from 'path'

import { createServer } from 'http'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const connection = mysql.createConnection({
	host     : 'sql7.freemysqlhosting.net',
	user     : 'sql7742229',
	password : 'JDgIbHcIgB',
	database : 'sql7742229'
});

const app = express();

app.set('trust proxy', 1);

app.use(session({
	cookie:{
		secure: true,
		maxAge: 60000
		   },
	store: new RedisStore(),
	secret: 'secret',
	saveUninitialized: true,
	resave: false
}));

app.use(function(req, res, next){
	if(!req.session){
		return next(new Error('Oh no'))
	}
	next()
});

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
			if (error) throw error;

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
    console.log("listening on localhost:8080");
});
