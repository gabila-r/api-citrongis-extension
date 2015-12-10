var engine = require('tingodb')();
assert = require('assert');

var db = new engine.Db(__dirname + '/db_extensions', {});
var collection = db.collection('users');

exports.checkParams = function(request, response, next) {
    var player = request.body;

    if (!player.user_name || !player.user_score || !player.game) {
        response.status(400).json({"error": "Missing name, score or game parameter"});
    }
    else {
        next();
    }
};


var sendFindResult = function(limit, results, response) {

    if (limit >= 0 && results) {
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


    if (!request.query.game || request.query.game == "") {
        response.status(400).send("Missing game parameter");
    }

    collection.find({game:request.query.game}).sort({user_score: -1}).toArray(function (err, res) {
        sendFindResult(request.query.limit, res, response);
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

    collection.insert({"user_name": player.user_name, "user_score": player.user_score, "game": player.game}, function(err) {
        if (err) {
            response.status(500).send("Error save new player :" + err);
        }
        response.json({"msg": "OK"});
    });
};
