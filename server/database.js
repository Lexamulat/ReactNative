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
        db.run(`CREATE TABLE ${databaseName} (
            id BLOB PRIMARY KEY,
            response BLOB
            )`,
            (err) => {
                if (err) {
                    console.error('table already EXISTs', err)
                    // Table already created
                } else {
                    // console.log('Database created succesfully')
                    // const insert = `INSERT INTO ${databaseName} (id, response) VALUES (?,?)`
                    // db.run(insert, ["/api/front/{filter:{someData}}", "{a,b,c}"])
                    // db.run(insert, ["/api/front/{filter:{someData2}}", "{aaaaaaaaaaaaaaddddddddddddd}"])
                }
            });
    }
});

module.exports = db