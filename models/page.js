var mongoose = require('mongoose');

//page Schema
var PageSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    department: {
        type: String
    },
    designation: {
        type: String,
        required: true
    }
});

var Page = module.exports = mongoose.model('Page', PageSchema)