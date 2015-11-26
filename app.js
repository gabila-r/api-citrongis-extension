var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser());


var route = require('./routes.js');


/**
 * @api {get} /ranking Request Ranking information
 * @apiName GetRanking
 * @apiGroup User
 *
 * @apiParam {Number} limit Number max of users for the ranking
 *
 * @apiSuccess {Object[]} JSON JSON object with the users information
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          {
 *               "_id":"56488689e9cbe5427475c722",
 *               "user_name":"Toto1",
 *               "user_score":22343335,
 *                "__v":0
 *            },
 *            {
 *                "_id":"56488687e9cbe5427475c720",
 *                "user_name":"Toto1",
 *                "user_score":22345,
 *                "__v":0
 *            }
 *     }
 *
 */
app.get('/ranking', route.ranking);


/**
 * @api {post} /player Add new score for new user
 * @apiName SaveUser
 * @apiGroup User
 *
 * @apiParam {String} user_name Name for the new user
 * @apiParam {Number} user_score Score for the new user
 *
 * @apiSuccess {String} msg success message
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "msg": "OK"
 *     }
 *
 * @apiError {string} error Error when the user_name or user_score are missing
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Missing name or score parameter"
 *     }
 *
 */
app.post('/player', route.checkParams, route.player);

app.listen(3000, function() {
    console.log('Serve listing port 3000');
});
