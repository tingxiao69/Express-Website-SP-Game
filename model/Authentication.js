var db = require('./dataBaseConfig');
var bcrypt = require('bcrypt')


const authApi = {
    register: async (req, callback) => {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        username = req.body.username
        email = req.body.email

        console.log(hashedPassword)

        let conn = db.getConnection()
        conn.connect((err) => {
            if (err) {
                return callback(err, null)
            } else {
                console.log("Connected!")
                let sql = 'INSERT INTO user(username, email, password) value(?,?,?)'
                conn.query(sql, [username, email, hashedPassword], (err, result) => {
                    conn.end
                    if (err) {
                        console.log("--Query Failed")
                        console.log(err, null)
                    } else {
                        console.log('--Query Successful')
                        return callback(null, result)
                    }
                })
            }
        })
    }

}

module.exports = authApi