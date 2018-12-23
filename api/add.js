module.exports = (app, db) => {
	app.post("/addname", (req, res) => {
		require('axios')
			.get(`https://itunes.apple.com/search?term=${req.body.show}&media=podcast`)
			.then(response => {
				let slug = require('slug')(req.body.show)
				if(response.data.results.length == 1) {
					db.RecModel.countDocuments({slug: new RegExp(slug, 'i')}, (err, count) => {
						if(count > 0) {
							res.redirect(`/?error=Item+Already+Exists`);
						} else {
							let data = new db.RecModel({
								slug: slug,
								...req.body
							});
							data.save()
							res.redirect(`/recs/${slug}`);
						}
					});
				} else if(response.data.results.length > 1) {
					res.redirect(`search/${req.body.show}?episode=${req.body.episode}&reason=${req.body.reason}`);
				} else {
					res.redirect(`/?error=Item+Not+Found`);
				}
			}) 
			.catch(err => {
				console.log(err);
				res.status(400).send("unable to save to database");
			})
	});
}