const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();

const database = {
	users: [
		{
			id: '123',
			name: 'John',
			email: 'john@gmail.com',
			password: 'cookies',
			entries: 0,
			joined: new Date()
		},
		{
			id: '124',
			name: 'Sally',
			email: 'sally@gmail.com',
			password: 'bananas',
			entries: 0,
			joined: new Date()
		}
	],

	login: [
		{
			id: "987",
			hash: "",
			email: "john@gmail.com"
		}
	]
}

app.use(bodyParser.json()); 
app.use(cors())

app.get('/', (req, res) => {
	res.send(database.users);
})

// Check email and password from body and check with database
app.post('/signin', (req, res) => {
	if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
		res.json(database.users[0]);
	}else {
		res.status(400).json('error logging in');
	}
})

// Create a user object with email, name, password from body
// Add user to database
app.post('/register', (req, res) => {
	const {email, name, password} = req.body;
	database.users.push({
		id: '125',
		name: name,
		email: email,
		entries: 0,
		joined: new Date()
	})
	res.json(database.users[database.users.length-1]);
})

// Get id parameter of url and check if id is also in database
app.get('/profile/:id', (req, res) => {
	const {id} = req.params;
	let found = false;

	database.users.forEach(user => {
		if (user.id === id) {
			found = true;
			return res.json(user);
		}
	})

	if (!found) {
		res.status(400).json('user not found')
	}
})

// Get id from body and check if its in database
// If so, when url "/image" is present, we will
// increment the amount of entres by 1
app.put('/image', (req, res) => {
	const {id} = req.body;
	let found = false;

	database.users.forEach(user => {
		if (user.id === id) {
			found = true;
			user.entries++;
			return res.json(user.entries);
		}
	})

	if (!found) {
		res.status(400).json('user not found')
	}
})

// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

app.listen(3001, () => {
	console.log('app is running on port 3000')
})