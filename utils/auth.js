module.exports = (req, res, next) => {
	console.log(req.session.logged_in);
	if (!req.session.logged_in) {
		res.redirect('/login');
	} else {
		next();
	}
};