var mongoose = require("mongoose");
var { Schema } = mongoose;
// schema help taken from mlabs

var companySchema = new Schema({
    cname: String,
    cid: Number,
    regsid: [] // array of all registered students 
    // this will indicate if students have registered or not
});

module.exports = mongoose.model('tb1company',companySchema);