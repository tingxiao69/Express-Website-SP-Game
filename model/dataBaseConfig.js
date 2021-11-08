// Student Name: Shi Tingxiao
// Student Admission Number: P2033444
// Class: DAAA-1B-04
const mysql = require('mysql');

const dbconnect = {
    getConnection: () => {
        let conn = mysql.createConnection({
            host: "localhost",
            user: "SPGAMEUSER",
            password: "Stx123321@",
            database: "spgames_stx"
        });
        return conn;
    }
}

module.exports = dbconnect



