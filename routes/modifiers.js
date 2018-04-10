var express     = require("express");
var router      = express.Router();
var Modifier  = require("../models/modifier");

//INDEX
router.get("/", function(req, res) {
  var perPage = 10;
  var pageQuery = parseInt(req.query.page);
  var pageNumber = pageQuery ? pageQuery : 1;
  Modifier.find({}).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function(err, modifiers) {
      if (err) {
          console.log(err);
      } else {
          Modifier.count().exec(function(err, count) {
              if(err) {
                  console.log(err);
              } else {
                  res.render("./modifiers/index", {modifiers: modifiers, current: pageNumber, pages: Math.ceil(count / perPage)});
              }
          });
      }
  });
});

//NO SHOW PAGE NECESSARY

//NEW
router.get("/new", function(req, res) {
    res.render("./modifiers/new");
});

//CREATE
router.post("/", function(req, res) {
	var newModifier = new Modifier();
   	newModifier.text = req.body.text;
   	newModifier.isBuff = req.body.isBuff;
   	newModifier.used = false;
   	Modifier.create(newModifier, function (err, modifier) {
        if(err) {
            console.log(err);
        } else {
        	console.log(newModifier);
            res.redirect("/modifiers");
        }
    });
});

module.exports = router;