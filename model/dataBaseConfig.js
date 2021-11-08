// Student Name: Shi Tingxiao
// Student Admission Number: P2033444
// Class: DAAA-1B-04
const mysql = require("mysql");

const dbconnect = {
  getConnection: () => {
    let conn = mysql.createConnection({
      host: "127.0.0.1",
      port: "3309",
      user: "root",
      password: "",
      database: "spgames_stx",
    });
    return conn;
  },
};

module.exports = dbconnect;
