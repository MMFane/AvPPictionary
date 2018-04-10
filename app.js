var express         	= require("express"),
    app             	= express(),
    expressSanitizer 	= require("express-sanitizer"),
    bodyParser      	= require("body-parser"),
    methodOverride  	= require("method-override"),
    mongoose        	= require("mongoose");

var Modifier 			= require("./models/modifier");

var modifierRoutes       = require("./routes/modifiers");

mongoose.connect("mongodb://localhost/avp_pict");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer()); // must go after body-parser
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("index");
});

app.get("/game/new", function(req, res) {
	res.render("./games/new");
});

app.use("/modifiers", modifierRoutes);

app.listen(3000, function () {
    console.log("AVP Pictionary: Server is go");
});