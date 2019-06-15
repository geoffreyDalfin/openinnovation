'use strict';

const {
    EtherPortClient
} = require('etherport-client');
const five = require('johnny-five');
var Request = require("request");


const board = new five.Board({
    port: new EtherPortClient({
        host: '192.168.1.25',
        port: 3030
    }),
    repl: false
});

const RIGHT_SENSOR_PIN = "A0";
const LEFT_SENSOR_PIN = "D0";
board.on('ready', () => {
    const RightMotion = new five.Sensor(RIGHT_SENSOR_PIN);

    const express = require('express');
    const app = express();
    const morgan = require('morgan');
    const bodyParser = require('body-parser');
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );
        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });
    var game = {};
    var leftUser = {};
    var rightUser = {};
    app.post('/launchBoard', function (req, res) {
        game = req.body.Game;
        leftUser = req.body.userLeft;
        rightUser = req.body.userRight;
        console.log(`${game.ID} - ${leftUser.Name} - ${rightUser.Name}`);
    });

    app.set('port', process.env.PORT || 3030);

    app.listen(app.get('port'), function () {
        console.log("|-----| Board service started |-----|");
    });

    RightMotion.on("change", function () {
        if (game.ID != undefined) {
            if (RightMotion.boolean === true) {
                rightUser.Point += 1;
                  Request.post({
                    "headers": { "content-type": "application/json" },
                    "url": "http://localhost:3000/addPoint",
                    "body": JSON.stringify({
                        "game": game.ID,
                        "user": {
                            "ID": rightUser.ID,
                            "Name": rightUser.Name,
                            "Point": rightUser.Point,
                        }
                    })
                }, (error, response, body) => {
                    if (error) {
                        return console.dir(error);
                    }
                });
            }
        }
    });
})