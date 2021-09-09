const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name : {type:String, required:true},
    email : {type:String,reqiured : true},
    password : {type : String, required : true},
    id:{type : String},
    watchlist : [{
        id:{type : Number},
        poster:{type : String},
        title:{type : String},
        date:{type : String},
        media_type:{type : String},
        vote_average:{type : Number}
    }]
})

module.exports = mongoose.model("User",userSchema);