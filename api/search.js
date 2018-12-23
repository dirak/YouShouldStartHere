module.exports = (app) => {
	app.get('/search/:term', (req, res) => {
		require('axios')
			.get(`https://itunes.apple.com/search?term=${req.params.term}&media=podcast`)
			.then(response => {
				//check if the items are already in the db maybe?
				res.render('search', {
					title: `Results for ${req.params.term}`,
					episode: req.query.episode,
					reason: req.query.reason,
					collections: response.data.results
						.map(item => `${item.collectionName}`),
				});
			});
	});
}