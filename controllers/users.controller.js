const User = require('../models/user.model');

exports.getUser = async (req, res) => {
	res.send({ login: req.session.user.login });
};
