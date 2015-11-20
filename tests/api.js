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
            user_name: 'Test1',
            user_score : 123456789
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
            console.log("body: " + chunk);
        });
    });

    req.write(data);
    req.end();

}

exports.testSomething = function(test){
    test.expect(1);
    test.ok(true, "this assertion should pass");
    test.done();
};

