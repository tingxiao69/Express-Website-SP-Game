var db = require('./dataBaseConfig');

suggestion_api = {

    get_title_names : (callback) => {
        let conn = db.getConnection();
    
        conn.connect((err) => {
            if (err) {
                console.log(err);
                console.log("Connection Failed");
                return callback(err, null)
            } else {
                console.log("Connection Successful, start to retrieve all user data!")
                let sql_str = "SELECT title from games";
                conn.query(sql_str, (err, result) => {
                    conn.end();
                    if (err) {
                        console.log(err);
                        console.log("---Query Failed")
                        return callback(err, null)
                    } else {
                        console.log("---Query Successful")
                        return callback(null, result)
                    }
                    ;
                })
            }
            ;
        });
    }

}


module.exports = suggestion_api