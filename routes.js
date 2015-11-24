var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.checkParams = function(request, response, next) {
    var player = request.body;

    console.log(player);

    if (!player.user_name || !player.user_score) {
        response.status(400).json({"error": "Missing name or score parameter"});
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
    console.log("/GET ranking");

	response.header('Access-Control-Allow-Origin', '*');
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
    console.log("/POST player");

	response.header('Access-Control-Allow-Origin', '*');
    var player = request.body;

    if (typeof player.user_score != 'number') {
        player.user_score = parseInt(player.user_score);
    }
	console.log(player.user_name);
	console.log(player.user_score);

    new User({
        user_id: new mongoose.Types.ObjectId,
        user_name: player.user_name,
        user_score: player.user_score
    }).save(function (err) {
        if (err) {
            response.status(500).send("Error save new player :" + err);
        }
        response.json({"msg": "OK"});
    });
};
