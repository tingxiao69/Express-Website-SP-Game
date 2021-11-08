// Student Name: Shi Tingxiao
// Student Admission Number: P2033444
// Class: DAAA-1B-04

var db = require('./dataBaseConfig');
var reformat = require('./reformat')


const spGamesApi = {
    // User API 1
    getAllUsers: (callback) => {
        let conn = db.getConnection();

        conn.connect((err) => {
            if (err) {
                console.log(err);
                console.log("Connection Failed");
                return callback(err, null)
            } else {
                console.log("Connection Successful, start to retrieve all user data!")
                let sql_str = "SELECT * from user";
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

    },

    // User API 2
    addUser: (username, email, type, profile_pic_url, callback) => {
        let conn = db.getConnection();
        conn.connect((err) => {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                console.log("Connected!");
                let sql = 'Insert into user(username,email,type,profile_pic_url) values(?,?,?,?);';
                conn.query(sql, [username, email, type, profile_pic_url], (err, result) => {
                    conn.end();
                    if (err) {
                        console.log("Error Inserting Record!!");
                        //console.log(err);
                        err.statusCode = 500;
                        return callback(err, null);
                    } else {
                        console.log(result);
                        console.log(result.affectedRows);
                        return callback(null, {userid: result.insertId});
                        // return callback(null, result.affectedRows);
                    }
                });
            }
        });
    },

    // User API 3
    getUserByEmail_login: (email, callback) => {
        // get the connection
        const conn = db.getConnection();
        conn.connect((err) => {
            if (err) {//connection failed
                // invoke callback function with err and result null
                return callback(err, null);
            } else {
                console.log("Connected");
                // form sql statement to select user with a given id
                let sql_str = 'SELECT userid, type, username, email, password from user WHERE email=?';
                //exe query
                conn.query(sql_str, [email], (err, result) => {
                    conn.end()//close connection
                    // if connection fail. Invoke and return callback with error and result null
                    if (err) { // query error
                        console.log("query fail");
                        return callback(err, null);
                    } else { //  invoke with error null and result record
                        console.log("query successful");
                        return callback(null, result);
                    }
                })
            }
        })
    },

    // User API 4
    getUserById: (userid, callback) => {
        // get the connection
        const conn = db.getConnection();
        conn.connect((err) => {
            if (err) {//connection failed
                // invoke callback function with err and result null
                return callback(err, null);
            } else {
                console.log("Connected");
                // form sql statement to select user with a given id
                let sql_str = 'SELECT username, email, profile_pic_url, type ,  created_at from user WHERE userid=?';
                //exe query
                conn.query(sql_str, [userid], (err, result) => {
                    conn.end()//close connection
                    // if connection fail. Invoke and return callback with error and result null
                    if (err) { // query error
                        console.log("query fail");
                        return callback(err, null);
                    } else { //  invoke with error null and result record
                        console.log("query successful");
                        return callback(null, result);
                    }
                })
            }
        })
    },

    // Category API 1
    getAllCat: (callback) => {
        let conn = db.getConnection();
        conn.connect((err) => {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                console.log("Connected!");
                let sql = 'SELECT categoryid, catname FROM category ;';
                conn.query(sql, (err, result) => {
                    conn.end();
                    if (err) {
                        console.log("Error Inserting Record!!");
                        //console.log(err);
                        return callback(err, null);
                    } else {
                        console.log(result);
                        return callback(null, result);
                        // return callback(null, result.affectedRows);
                    }
                });
            }
        });
    },


    // Category API 2
    addCat: (catname, description, callback) => {
        let conn = db.getConnection();
        conn.connect((err) => {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                console.log("Connected!");
                let sql = 'Insert into category(catname, description) values(?,?);';
                conn.query(sql, [catname, description], (err, result) => {
                    conn.end();
                    if (err) {
                        console.log("Error Inserting Record!!");
                        //console.log(err);
                        return callback(err, null);
                    } else {
                        console.log(result);
                        return callback(null, {userid: result.insertId});
                        // return callback(null, result.affectedRows);
                    }
                });
            }
        });
    },

    // Category API 3
    updateCat: (catID, catname, description, callback) => {
        let conn = db.getConnection();
        conn.connect((err) => {
            if (err) {
                console.log(err);
                return callback(err, null)
            } else {
                console.log("Connected!");
                let sql = 'UPDATE category set catname=?, description=? WHERE categoryid=?';
                conn.query(sql, [catname, description, catID], (err, result) => {
                    conn.end();
                    if (err) {
                        console.log("Error updating Record!!");
                        console.log(err);
                        return callback(err, null);
                    } else {
                        console.log(result);
                        // console.log(result.affectedRows);
                        return callback(null, result);
                        // return callback(null, result.affectedRows);
                    }
                });
            }
        })
    },

    // Game API 1
    addGame: (title, description, price, platform, categoryid, year, callback) => {
        var categoryid_list
        categoryid_list = categoryid.split('/').map(e => parseInt(e));
        let conn = db.getConnection()
        conn.connect((err) => {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                console.log("Connected");
                let sql1 = "INSERT into games(title, description, price, platform, year) values(?,?,?,?,?);";
                conn.query(sql1, [title, description, price, platform, year], (err, result) => {
                    conn.end;
                    if (err) {
                        console.log("Error Inserting New Records")
                        console.log(err);
                        return callback(err, null);
                    } else {
                        console.log("game Insertion Successful!")
                        console.log(result)
                        gameId = result.insertId

                        let sql2 = "INSERT into game_category_reference(game_id, category_id) values(?,?)"
                        for (let i = 0; i < categoryid_list.length; i++) {
                            conn.query(sql2, [result.insertId, categoryid_list[i]], (err, result) => {
                                conn.end;
                                if (err) {
                                    console.log("Error Inserting New Records")
                                    console.log(err);
                                    return callback(err, null);
                                } else {
                                    console.log("game_category_reference Insertion Successful!")
                                    console.log(result)
                                }
                            })
                        }
                        let sql3 = 'INSERT into game_image(img_game_id) value(?)'
                        conn.query(sql3, [result.insertId], (err, result) => {
                            conn.end;
                            if (err) {
                                console.log("Error Inserting img_game_id")
                                console.log(err);
                                return callback(err, null);
                            } else {
                                console.log("img_game_id Insertion Successful!")
                                console.log(result)
                            }
                        })

                        return callback(null, gameId)
                    }
                })

            }
        })
    },

    // Game API 2
    getGamesByPlatform: (platform, callback) => {
        let conn = db.getConnection()
        conn.connect((err) => {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                console.log("Successfully Connected!")
                let sql = `SELECT gameid, title, games.description, price, platform, category.categoryid, category.catname, year, games.created_at
                from games 
                INNER JOIN game_category_reference
                on games.gameid = game_category_reference.game_id
                INNER JOIN category 
                on category.categoryid = game_category_reference.category_id
                
                WHERE platform = ?`
                conn.query(sql, [platform], (err, result) => {
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        console.log("All data retrieved successfully!")
                        // console.log(result[0].gameid)
                        formatted_result = reformat(result)
                        return callback(null, formatted_result);
                    }
                })
            }
        })
    },

    // Game API 3
    getAllGames: (callback) => {
        let conn = db.getConnection()
        conn.connect((err) => {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                console.log("Successfully Connected!")
                let sql = `SELECT gameid, title, games.description, price, platform, category.categoryid, category.catname, year,games.created_at
                from games 
                INNER JOIN game_category_reference
                on games.gameid = game_category_reference.game_id
                INNER JOIN category 
                on category.categoryid = game_category_reference.category_id
                ORDER BY gameid ASC`
                conn.query(sql, (err, result) => {
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        console.log("All data retrieved successfully!")
                        formatted_result = reformat(result)
                        return callback(null, formatted_result);
                    }
                })
            }
        })
    },

    // Game API 4
    getGameById: (game_id, callback) => {
        let conn = db.getConnection()
        conn.connect((err) => {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                console.log("Successfully Connected!")
                let sql = `SELECT gameid, title, games.description, price, platform, category.categoryid, category.catname, year,games.created_at
                from games 
                INNER JOIN game_category_reference
                on games.gameid = game_category_reference.game_id
                INNER JOIN category 
                on category.categoryid = game_category_reference.category_id
                WHERE gameid = ?`
                conn.query(sql, [game_id], (err, result) => {
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        console.log("All data retrieved successfully!")
                        formatted_result = reformat(result)
                        return callback(null, formatted_result);
                    }
                })
            }
        })
    },

    // Game API 5
    deleteGame: (gameid, callback) => {
        let conn = db.getConnection();
        conn.connect((err) => {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                console.log("Connected!");
                let sql = 'DELETE from games WHERE gameid=?';
                conn.query(sql, [gameid], (err, result) => {
                    conn.end();
                    if (err) {
                        console.log("Error Inserting Record!!");
                        console.log(err);
                        return callback(err, null);
                    } else {
                        console.log(result);
                        // console.log(result.affectedRows);
                        return callback(null, result);
                        // return callback(null, result.affectedRows);
                    }
                });
            }
        });
    },

    // Game API 6
    updateGame: (title, description, price, platform, categoryid, year, gameid, callback) => {
        let conn = db.getConnection()
        conn.connect((err) => {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                console.log("Connected");
                let sql = "UPDATE games set title=?, description=?, price=?, platform=?, year=? WHERE gameid=?";
                conn.query(sql, [title, description, price, platform, year, gameid], (err, result) => {
                    conn.end;
                    if (err) {
                        console.log("Error Updating Records")
                        console.log(err);
                        return callback(err, null);
                    } else {
                        console.log("Updating Successful!")
                        console.log(result)
                        return callback(null, result.insertId)
                    }
                })
            }
        })
    },

    // Review API 1
    addReview: (userid, gameid, content, rating, callback) => {
        let conn = db.getConnection()
        conn.connect((err) => {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                console.log("Connected");
                let sql = "INSERT into review(userid, gameid, content, rating) values(?,?,?,?);";
                conn.query(sql, [userid, gameid, content, rating], (err, result) => {
                    conn.end;
                    if (err) {
                        console.log("Error Inserting New Records")
                        console.log(err);
                        return callback(err, null);
                    } else {
                        console.log("Insertion Successful!")
                        console.log(result)
                        return callback(null, result.insertId)
                    }
                })
            }
        })
    },


    // Review API 2
    getReviewByGameID: (gameid, callback) => {
        let conn = db.getConnection()
        conn.connect((err) => {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                console.log("Successfully Connected!")
                let sql = `SELECT gameid, content, rating, username, profile_pic_url, review.created_at
                    FROM review 
                    INNER JOIN user 
                    ON review.userid = user.userid
                    WHERE gameid = ?;`
                conn.query(sql, [gameid], (err, result) => {
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        console.log("All data retrieved successfully!");
                        // console.log(result)
                        var new_result = []
                        for (let i = 0; i < result.length; i++) {
                            new_result.push({
                                "gameid": result[i].gameid,
                                "content": result[i].content,
                                "rating:": result[i].rating,
                                "username:": result[i].username,
                                "created_at:": result[i].created_at,
                            })
                        }
                        return callback(null, result);
                    }
                })
            }
        })
    },

    // Image API 1
    uploadImage_game: (gameid, path, callback) => {
        let conn = db.getConnection()
        conn.connect((err) => {
            if (err) {
                console.log("Connection Error!")
                callback(err, null)
            } else {
                console.log('Connection Successful')
                let sql = 'UPDATE game_image set img_path=? WHERE img_game_id=?';
                conn.query(sql, [path, gameid], (err, result) => {
                    conn.end
                    if (err) {
                        console.log("Query Unsuccessful")
                        console.log(err)
                        return callback(err)
                    } else {
                        console.log("New game image inserted successfully")
                        let body = {status: 201, gameid:gameid}
                        return callback(null, body)
                    }
                })
            }
        })
    },

    // Image API 2
    uploadImage_user: (userid, path, callback) => {
        let conn = db.getConnection()
        conn.connect((err) => {
            if (err) {
                console.log("Connection Error!")
                callback(err, null)
            } else {
                console.log('Connection Successful')
                let sql = 'UPDATE user set profile_pic_url=? WHERE userid=?';
                conn.query(sql, [path, userid], (err, result) => {
                    conn.end
                    if (err) {
                        console.log("Query Unsuccessful")
                        console.log(err)
                        return callback(err)
                    } else {
                        console.log("New game image inserted successfully")
                        let body = {status: 201, userid:userid}
                        return callback(null, body)
                    }
                })
            }
        })
    },

    // Image API 3
    getImageByGameId: (gameid, callback) => {
        let conn = db.getConnection()
        conn.connect((err) => {
            if (err) {
                console.log("Connection Error!")
                callback(err, null)
            } else {
                console.log('Connection Successful')
                let sql = `
                SELECT img_path FROM game_image WHERE img_game_id = ?`
                conn.query(sql, [gameid], (err, result) => {
                    conn.end
                    if (err) {
                        console.log("Query Unsuccessful")
                        console.log(err)
                        return callback(err)
                    } else {
                        console.log("image path retrieved successfully")
                        // set the formatted response

                        return callback(null, result)
                    }
                })
            }
        })
    },

    // Image API 4
    getAllImage: (callback)=>{
        let conn = db.getConnection()
        conn.connect((err) => {
            if (err) {
                console.log("Connection Error!")
                callback(err, null)
            } else {
                console.log('Connection Successful')
                let sql = `
                SELECT img_game_id, img_path FROM game_image
                ORDER BY img_game_id ASC
                `
                conn.query(sql, (err, result) => {
                    conn.end
                    if (err) {
                        console.log("Query Unsuccessful")
                        console.log(err)
                        return callback(err)
                    } else {
                        console.log("image path retrieved successfully")
                        return callback(null, result)
                    }
                })
            }
        })
    },

}

module.exports = spGamesApi;