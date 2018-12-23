let express = require("express");
let bodyParser = require("body-parser");
let app = express();

require('dotenv').config();

app.set('views', './views');
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
require('./api')(app, require('./db'));

app.get("/", (req, res) => {
	res.render('index', {
		title: '',
		error: req.query.error,
	});
});

app.listen(process.env.PORT, () => {
	console.log(`Starting the server listening on port ${process.env.PORT}`);
});