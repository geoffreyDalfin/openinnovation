const db = require('../database/db.js');
var io = require('../app.js').io;
var Request = require("request");

module.exports = {
    createGame: async function (req, res, next) {
      const userLeft = req.body.nameLeft;
      const userRight = req.body.nameRight;
      const scoreLimit = req.body.scoreLimit;
      const isSuccessUserLeft = await db.AddUserLeft(userLeft, 'left');
      const isSuccessUserRight = await db.AddUserRight(userRight, 'right');
      const isSuccessGame = await db.AddGame(scoreLimit);
      const isAddedUserLeftInGame = db.AddUserInGame(isSuccessGame.insertId, isSuccessUserLeft.insertId);
      const isAddedUserRightInGame = db.AddUserInGame(isSuccessGame.insertId, isSuccessUserRight.insertId);

      Request.post({
        "headers": { "content-type": "application/json" },
        "url": "http://localhost:3030/launchBoard",
        "body": JSON.stringify({
            "Game": {
                "ID": isSuccessGame.insertId,
                "scoreLimit": scoreLimit,
            },
            "userLeft": {
                "ID": isSuccessUserLeft.insertId,
                "Name": userLeft,
                "Point": 0,
            },
            "userRight": {
                "ID": isSuccessUserRight.insertId,
                "Name": userRight,
                "Point": 0,
            }
        })
    }, (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
    });

      res.status(200).json({
        Game: {
            ID: isSuccessGame.insertId,
            scoreLimit: scoreLimit,
        },
        userLeft: {
            ID: isSuccessUserLeft.insertId,
            Name: userLeft,
            Point: 0,
        },
        userRight: {
            ID: isSuccessUserRight.insertId,
            Name: userRight.insertId,
            Point: 0,
        }
      }); 
    },

    getAllGame: function (req, res, next) {

    },

    getScore: function (req, res, next) {

    },

    addPointToUser: function (req, res ,next) {
        const idGame = req.body.game;
        const user = req.body.user;
        console.log(user);
    //     const addPoint = 
    //    // const result = await db.getUserPoint(user, idUser);
    //     res.io.emit('AddPoint', {
    //         user: user,
    //         match: match,
    //     });
    }
};