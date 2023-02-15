const Ad = require('../models/ad.model');

exports.getAllAds = async (req, res) => {
	try {
		const ads = await Ad.find().populate('seller', 'login phone avatar');
		res.json(ads);
	} catch (err) {
		res.status(500).send({ message: err.message });
	}
};
exports.getAdById = async (req, res) => {
	try {
		const ad = await Ad.find({ id: req.params.id }).populate('seller', 'login phone avatar');
		if (!ad) res.status(404).send({ message: 'Not found' });
		else res.json(ad);
	} catch (err) {
		res.status(500).send({ message: err.message });
	}
};
exports.postAd = async (req, res) => {
	try {
		const fileType = req.file ? await getImageFileType(req.file) : 'unknown';
		if (req.file && ['image/jpeg', 'image/png', 'image/gif'].includes(fileType)) {
			const { title, description, price, location, seller } = req.body;
			const newAd = new Ad({ title, description, price, photo: req.file.path, location, seller });
			await newAd.save();
			res.json({ message: 'Ad created' });
		} else {
			fs.unlinkSync(req.file.path);
			res.status(400).send({ message: 'Bad request' });
		}
	} catch (err) {
		fs.unlinkSync(req.file.path);
		res.status(500).send({ message: err.message });
	}
};
exports.deleteAd = async (req, res) => {
	try {
		const ad = await Ad.find({ id: req.params.id });
		if (ad) {
			await Ad.deleteOne({ id: req.params.id });
			res.json({ message: 'Ad deleted' });
		} else res.status(404).send({ message: 'Not found' });
	} catch (err) {
		res.status(500).send({ message: err.message });
	}
};
exports.editAd = async (req, res) => {
	const { title, description, price, location, seller } = req.body;
	try {
		const ad = await Ad.find({ id: req.params.id });
		if (ad) {
			await Ad.updateOne({ id: req.params.id }, { $set: { title, description, price, location, seller } });
			if (req.file) {
				const fileType = req.file ? await getImageFileType(req.file) : 'unknown';
				if (req.file && ['image/jpeg', 'image/png', 'image/gif'].includes(fileType)) {
					fs.unlinkSync(ad.photo);
					await Ad.updateOne({ id: req.params.id }, { $set: { photo: req.file.path } });
				}
			}
			res.json({ message: 'Ad updated' });
		} else {
			if (req.file) fs.unlinkSync(req.file.path);
			res.status(404).send({ message: 'Not found' });
		}
	} catch (err) {
		if (req.file) fs.unlinkSync(req.file.path);
		res.status(500).send({ message: err.message });
	}
};
exports.getAdsBySearch = async (req, res) => {
	try {
		const search = req.params.searchPhrase;
		const searchRegex = new RegExp(search, 'i');
		const ads = await Ad.find({ title: { $regex: searchRegex } }).populate('seller', 'login phone avatar');
	} catch (err) {
		res.status(500).send({ message: err.message });
	}
};
