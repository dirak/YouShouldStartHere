let mongoose = require("mongoose");

mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`, {
	useNewUrlParser: true
});

let rec_schema = new mongoose.Schema({
	slug: String,
	show: String,
	episode: String,
	reason: String
});

module.exports.RecModel = mongoose.model("document", rec_schema);
