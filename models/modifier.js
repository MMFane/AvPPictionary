var mongoose = require("mongoose");

var modifierSchema = new mongoose.Schema({
    text: String,
    isBuff: Boolean,
    used: Boolean 
});

module.exports = mongoose.model("Modifier", modifierSchema);
