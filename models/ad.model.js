const mongoose = require('mongoose');

const adSchema = new mongoose.Schema(
	{
		title: { type: String, minLength: 10, maxLength: 50, required: true },
		description: { type: String, minLength: 20, maxLength: 1000, required: true },
		price: { type: Number, required: true },
		photo: { type: String, required: true },
		location: { type: String, required: true },
		seller: { type: String, required: true, ref: 'User' },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Ad', adSchema);
