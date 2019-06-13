var mysql = require('mysql');

/** 
 * db configuration object
 */
var db = mysql.createConnection({
    host: 'mysql-babyconnect.alwaysdata.net',
    user: '185254',
    password: '289KJL17',
    database: 'babyconnect_innovation',
});

/** 
 * db connection
 */
db.connect((err) => {
    if (err) {
        console.log('|-----| not connected to database |-----| ');
    } else {
        console.log('|-----| connected to database |-----|');
    }
});



function AddUserLeft(user, location) {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO `Utilisateur` (Nom, Emplacement)' +
            'VALUES (?,?)',
            [user, location],
            function (err, rows, fields) {
                if (err) reject(err)
                resolve(rows)
            })
    })
}

function AddUserRight(user, location) {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO `Utilisateur` (Nom, Emplacement)' +
            'VALUES (?,?)',
            [user, location],
            function (err, rows, fields) {
                if (err) reject(err)
                resolve(rows)
            })
    })
}

function AddGame(limitScore) {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO `Game` (Score)' +
            'VALUES (?)',
            [limitScore],
            function (err, rows, fields) {
                if (err) reject(err)
                resolve(rows)
            })
    })
}

function AddUserInGame(idGame, idUser){
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO `Utilisateur_Game` (Game_ID, Utilisateur_ID, NbButs)' +
            'VALUES (?,?,?)',
            [idGame, idUser, 0],
            function (err, rows, fields) {
                if (err) reject(err)
                resolve(rows)
            })
    })
}

function getUserPoint(idGame, idUser){
    return new Promise((resolve, reject) => {
        db.query('Select  INTO `Utilisateur_Game` (Game_ID, Utilisateur_ID, NbButs)' +
            'VALUES (?,?,?)',
            [idGame, idUser, 0],
            function (err, rows, fields) {
                if (err) reject(err)
                resolve(rows)
            })
    })
}

function AddPoint(idGame, idUser, Point){

}


module.exports = db;
module.exports.AddUserLeft = AddUserLeft;
module.exports.AddUserRight = AddUserRight;
module.exports.AddGame = AddGame;
module.exports.AddUserInGame = AddUserInGame;
module.exports.AddPoint = AddPoint;