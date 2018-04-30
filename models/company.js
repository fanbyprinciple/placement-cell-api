var mongoose = require("mongoose");
var { Schema } = mongoose;
// schema help taken from mlabs

var companySchema = new Schema({
    cname: String,
    cid: Number,
    regsid: [] // array of all registered students 
});

module.exports = mongoose.model('tb1company',companySchema);