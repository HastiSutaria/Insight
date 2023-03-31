const mongoose  = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Insight_survey',{useNewUrlParser:true,useUnifiedTopology:true})
    .then(res => {
        console.log('Database Connected!')
    }).catch(err => {
        console.log(err.message)
    })
module.exports = mongoose;