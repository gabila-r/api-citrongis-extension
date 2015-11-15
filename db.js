var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    user_name: String,
    user_score: Number
});

mongoose.model('User', User);
mongoose.connect('mongodb://localhost/citrongis-extension-ranking', function(err) {
    if (err) {
        thow (err);
    }
});
