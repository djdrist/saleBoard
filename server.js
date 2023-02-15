const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const adsRoutes = require('./routes/ads.routes.js');
const authRoutes = require('./routes/auth.routes.js');
const usersRoutes = require('./routes/users.routes');

const app = express();

const server = app.listen(process.env.PORT || 8000);

const dbURI = 'mongodb://localhost:27017/SaleBoard';
mongoose.connect(dbURI, { useNewUrlParser: true });

app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
	session({
		secret: process.env.secret,
		store: MongoStore.create(mongoose.connection),
		resave: false,
		saveUninitialized: false,
		cookie: {
			secure: process.env.NODE_ENV == 'production',
		},
	})
);
if (process.env.NODE_ENV !== 'production') {
	app.use(
		cors({
			origin: ['http://localhost:3000'],
			credentials: true,
		})
	);
}

app.use('/api/ads', adsRoutes);
app.use('/auth/user', usersRoutes);
app.use('/auth', authRoutes);

app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.static(path.join(__dirname, '/public')));

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
	res.status(404).send({ message: 'Not found!' });
});

const db = mongoose.connection;
