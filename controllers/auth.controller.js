const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const getImageFileType = require('../utils/getImageFileType');

exports.register = async (req, res) => {
	try {
		console.log(req.file);
		const { login, password, phone } = req.body;
		const fileType = req.file ? await getImageFileType(req.file) : 'unknown';
		if (
			login &&
			typeof login === 'string' &&
			password &&
			typeof password === 'string' &&
			phone &&
			typeof phone === 'string' &&
			req.file &&
			['image/jpeg', 'image/png', 'image/gif'].includes(fileType)
		) {
			const userWithLogin = await User.findOne({ login });
			if (userWithLogin) {
				fs.unlinkSync(req.file.path);
				return res.status(409).send({ message: 'User exists!' });
			}
			const user = await User.create({ login, password: await bcrypt.hash(password, 10), avatar: req.file.filename, phone });
			res.status(201).send({ message: 'User created ' + user.login });
		} else {
			fs.unlinkSync(req.file.path);
			res.status(400).send({ message: 'Bad request' });
		}
	} catch (err) {
		res.status(500).send({ message: err.message });
	}
};
exports.login = async (req, res) => {
	try {
		const { login, password } = req.body;
		if (login && typeof login === 'string' && password && typeof password === 'string') {
			const user = await User.findOne({ login });
			if (!user) {
				res.status(400).send({ message: 'Login or password are incorrect' });
			} else {
				if (bcrypt.compareSync(password, user.password)) {
					req.session.user = { login: user.login, userId: user.id };
					res.status(200).send({ message: 'Login successful' });
				} else {
					res.status(400).send({ message: 'Login or password are incorrect' });
				}
			}
		} else {
			res.status(400).send({ message: 'Bad request' });
		}
	} catch (err) {}
};

exports.logout = async (req, res) => {
	req.session.destroy();
	res.status(200).send({ message: 'Logout successful' });
};
