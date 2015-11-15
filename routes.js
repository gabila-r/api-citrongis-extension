var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.checkParams = function(request, response, next) {
    var player = request.body;

    if (!player.name || !player.score) {
        response.status(400).json({"error": "Missing name or score parameter"});
    }
    else if (typeof player.score != 'number') {
        response.status(400).json({"error": "Score must be a number"});
    }
    else {
        next();
    }
};


var sendFindResult = function(limit, results, response) {

    if (limit >= 0) {
        response.json(results.slice(0, limit));
    }
    else {
        response.json(results);
    }

};

//GET /ranking
exports.ranking = function (request, response) {

    User.find({})
    .sort('-user_score')
    .exec(function (err, result) {
        if (err) {
            response.status(500).send(err);
        }
        sendFindResult(request.query.limit, result, response);
    });

};

//POST /player
exports.player = function (request, response) {
    var player = request.body;

    new User({
        user_id: new mongoose.Types.ObjectId,
        user_name: player.name,
        user_score: player.score
    }).save(function (err) {
        if (err) {
            response.status(500).send("Error save new player :" + err);
        }
        response.json({"msg": "OK"});
    });
};
