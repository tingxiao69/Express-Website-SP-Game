// Student Name: Shi Tingxiao
// Student Admission Number: P2033444
// Class: DAAA-1B-04

var db = require('./dataBaseConfig');
var reformat = require('./reformat')


const spGamesApi = {
    // API No.1
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

    // API No.2
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

    // API No.3
    getUserByEmail_login: async (email, callback) => {
        // get the connection
        const conn = db.getConnection();
        conn.connect((err) => {
            if (err) {//connection failed
                // invoke callback function with err and result null
                return callback(err, null);
            } else {
                console.log("Connected");
                // form sql statement to select user with a given id
                let sql_str = 'SELECT email,password from user WHERE email=?';
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

    // API No.4
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

    // API No.5
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

    // API No.6
    // addGame: (title, description, price, platform, categoryid, year, callback) => {
    //     let conn = db.getConnection()
    //     conn.connect((err) => {
    //         if (err) {
    //             console.log(err);
    //             return callback(err, null);
    //         } else {
    //             console.log("Connected");
    //             let sql1 = "INSERT into games(title, description, price, platform, year) values(?,?,?,?,?);";
    //             conn.query(sql1, [title, description, price, platform, year], (err, result) => {
    //                 conn.end;
    //                 if (err) {
    //                     console.log("Error Inserting New Records")
    //                     console.log(err);
    //                     return callback(err, null);
    //                 } else {
    //                     console.log("game Insertion Successful!")
    //                     console.log(result)
    //                     gameId = result.insertId
    //
    //                     let sql2 = "INSERT into game_category_reference(game_id, category_id) values(?,?)"
    //                     for (let i = 0; i < categoryid.length; i++) {
    //                         conn.query(sql2, [result.insertId, categoryid[i]], (err, result) => {
    //                             conn.end;
    //                             if (err) {
    //                                 console.log("Error Inserting New Records")
    //                                 console.log(err);
    //                                 return callback(err, null);
    //                             } else {
    //                                 console.log("game_category_reference Insertion Successful!")
    //                                 console.log(result)
    //                             }
    //                         })
    //                     }
    //                     return callback(null, gameId)
    //                 }
    //             })
    //
    //         }
    //     })
    // },

    addGame: (title, description, price, platform, categoryid, year, callback) => {
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
                        for (let i = 0; i < categoryid.length; i++) {
                            conn.query(sql2, [result.insertId, categoryid[i],result.insertId], (err, result) => {
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
    // API No.7
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
                        console.log(result[0].gameid)
                        formatted_result = reformat(result)
                        return callback(null, formatted_result);
                    }
                })
            }
        })
    },

    getAllGames: (callback) => {
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
                
                `
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

    // API No.8
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

    // API No.9
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

    // API No.10
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


    // API No.11
    getReviewByGameID: (gameid, callback) => {
        let conn = db.getConnection()
        conn.connect((err) => {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                console.log("Successfully Connected!")
                let sql = `SELECT gameid, content, rating, username, r.created_at
                    FROM review r
                    INNER JOIN user u
                    ON r.userid = u.userid
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
                        return callback(null, new_result);
                    }
                })
            }
        })
    },

//    upload image
//     uploadImage: (gameid, path, callback) => {
//         let conn = db.getConnection()
//         conn.connect((err) => {
//             if (err) {
//                 console.log("Connection Error!")
//                 callback(err, null)
//             } else {
//                 console.log('Connection Successful')
//                 let sql = `
//                 INSERT INTO game_image(img_game_id, img_path)
//                 VALUES (?,?)`
//                 conn.query(sql, [gameid, path], (err, result) => {
//                     conn.end
//                     if (err) {
//                         console.log("Query Unsuccessful")
//                         console.log(err)
//                         return callback(err)
//                     } else {
//                         console.log("New game image inserted successfully")
//                         let body = {status: 201, gameid:gameid}
//                         return callback(null, body)
//                     }
//                 })
//             }
//         })
//     },
    uploadImage: (gameid, path, callback) => {
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

    getImage: (gameid, callback) => {
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
                        var formated_res
                        // if there is an image
                        if (result.length > 0) {
                            formated_res = result[0].img_path
                        } else { // if there isn't an image
                            // if there is no value return default
                            formated_res = "../public/game_image/default.jpg"
                        }
                        return callback(null, formated_res)
                    }
                })
            }
        })
    },

    getAllImage: (callback)=>{
        let conn = db.getConnection()
        conn.connect((err) => {
            if (err) {
                console.log("Connection Error!")
                callback(err, null)
            } else {
                console.log('Connection Successful')
                let sql = `
                SELECT img_game_id, img_path FROM game_image`
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

    loginGetUser: ()=>{

    }


}

module.exports = spGamesApi;