const sqlite3 = require('sqlite3').verbose();
const DBSOURCE = "./db.sqlite";
const { databaseName } = require("./server.config.js");

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE IF NOT EXISTS  ${databaseName} (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            protein REAL NOT NULL,
            fat REAL NOT NULL,
            carbohydrates REAL NOT NULL,
            kkal REAL NOT NULL
            )`,
            (err) => {
                if (err) {
                    console.error('table already EXISTs', err)
                    // Table already created
                } else {
                    const sql = `SELECT * FROM ${databaseName} LIMIT 1`

                    db.get(sql, (err, rows) => {
                        if (err) {
                            console.error('err.message', err.message)
                            // res.status(400).json({ "error": err.message });
                            return;
                        }
                        if (!rows) {
                            console.log('need to add test rows')

                            const insert = `INSERT INTO ${databaseName} (name,protein,fat,carbohydrates,kkal) VALUES (?,?,?,?,?)`
                            db.run(insert, ["куриная грудка", 24, 2, 0.5, 113]),
                                db.run(insert, ["куриная", 24, 2, 0.5, 113]),

                                db.run(insert, ["гречка", 13, 3.4, 72, 343]),
                                db.run(insert, ["abcd", 13, 3.4, 72, 343])
                        }else{
                            console.log('test rows are already exist')
                        }
                    });
                }
            });
    }
});

module.exports = db

