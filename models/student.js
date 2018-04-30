var mongoose = require("mongoose");
var { Schema } = mongoose;
// schema help taken from mlabs

var studentSchema = new Schema({
    name: String,
    department: String,
    sid: Number, // supposedly unique even in nosql
    percentage: Number
});

module.exports = mongoose.model('tb1student',studentSchema);