module.exports = (app, db) => {
	app.get("/recs/:slug", (req, res) => {
		db.RecModel.findOne({slug: new RegExp(req.params.slug, 'i')}).lean().exec((err, data) => {
			res.render('recommendation', {
				title: data.show,
				message: `You should start ${data.show} on episode ${data.episode}`
			});
		});
	});
}