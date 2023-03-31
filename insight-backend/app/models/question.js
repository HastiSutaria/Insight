const mongoose = require('mongoose');
const QuestionSchema = mongoose.Schema({
        label:String,
        type:String,
        options:[String],
        responses:[{response:String,email:String}],

})

const Questions = mongoose.model('Question',QuestionSchema);

module.exports = Questions;