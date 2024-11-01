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
	host     : 'localhost',
	user     : 'root',
	password : 'LoLGODOTA1&2',
	database : 'shabby'
});

const app = express();

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
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
		console.log(query);
		connection.query(query, parameters, function(error, results, fields) {
			if (error) throw error;

			console.log(results);

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
