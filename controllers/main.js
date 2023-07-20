const jwt = require("jsonwebtoken");

const { BadRequest } = require("../errors");

const login = async (req, res) => {
	const { username = "", password = "" } = req.body;

	if (!username || !password)
		throw new BadRequest("Please Provide Both Username and Password");

	// just for demo, usually provided by the db
	const id = new Date().getDate();

	// try to keep the payload small, better experience for user
	// remember to use long, complex and unguessable jwt secrets in production
	const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});
	res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
	const luckyNum = Math.floor(Math.random() * 101);

	res.status(200).json({
		msg: `Hello ${req.user.username}`,
		secret: `Here is your authorized data, your lucky number is ${luckyNum}`,
	});
};

module.exports = { login, dashboard };
