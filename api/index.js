module.exports = (app, db) => {
	require('./recs')(app, db);
	require('./add')(app, db);
	require('./search')(app);
}