var http = require('http');
var querystring = require('querystring');

exports.testPingApi = function(test) {
    http.get('http://127.0.0.1:3000/ranking', function(res) {
        test.done();
    }).on('error', function(error) {
        test.ok(false, 'API does not running');
        test.done();
    });
}

exports.testAddPlayer = function(test) {

    var data = querystring.stringify({
            user_name: 'TestRomain',
            user_score : 123456789,
            game: "test"
        });

    var options = {
        host: '127.0.0.1',
        port: 3000,
        path: '/player',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(data)
        }
    };

    var req = http.request(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            var data = JSON.parse(chunk);
            if (data.msg == "OK") {
                test.done();
            }
            else {
                test.ok(false, data.error);
                test.done();
            }
        });
    });

    req.write(data);
    req.end();

};

exports.testGetRanking = function(test) {
    http.get('http://127.0.0.1:3000/ranking?game=test', function(response) {
        // Continuously update stream with data
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('error', function(error) {
            test.ok(false, data.error);
            test.done();
        });
        response.on('end', function() {
            var parsed = JSON.parse(body);

            if (parsed.length > 0) {
                test.done();
            }
            else {
                test.ok(false, "Error GET ranking");
                test.done();
            }
        });
    });
};

exports.testGetRankingLimit1 = function(test) {
    http.get('http://127.0.0.1:3000/ranking?limit=1&game=test', function(response) {
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {
            // Data reception is done, do whatever with it!
            var parsed = JSON.parse(body);
            if (parsed.length == 1) {
                test.done();
            }
            else {
                test.ok(false, "invalid limit");
                test.done();
            }
        });
    })
};
