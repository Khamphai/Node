var User = require('mongoose').model('User');

exports.create = function(req, res, next){
	var user = new User(req.body);

	user.save(function(err){
		if (err) {
			return next(err);
		}else{
			res.json(user);
		}
	});
};

exports.list = function(req, res, next){
	User.find({}, function(err, users){
		if (err) {
			return next(err);
		}else{
			res.json(users);
		}
	});
};


exports.login = function(req, res){
	// console.log(req.body);
	// console.log('Email: ' +req.body.email);
	// console.log('Email: ' +req.body.password);

	req.checkBody('email', 'Invalid email').notEmpty().isEmail();
	req.sanitizeBody('email').normalizeEmail();
	//req.sessionOptions.maxAge = 60000; //milliseconds
	req.session.cookie.maxAge = 60000; //milliseconds
	var errors = req.validationErrors();
	if (errors) {
		res.render('index', {
			title: 'Threr have been validation errors: ' + JSON.stringify(errors),
			isLoggedIn: false
		});
		return;
	}

	if (req.body.remember === 'remember') {
		req.session.remember = true;
		req.session.email = req.body.email;
	}

	res.render('index', {
		title: 'Logged in as ' + req.body.email,
		isLoggedIn: true
	});
};

exports.logout = function(req, res){
	req.session = null;
	res.render('index', {
		title: 'See you again later ',
		isLoggedIn: false
	});
};