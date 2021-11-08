// Student Name: Shi Tingxiao
// Student Admission Number: P2033444
// Class: DAAA-1B-04

// environment access data
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const bodyparser = require('body-parser')
const app = express();
const api = require('../model/apis');
const uploadImage_game = require('../model/upload_image_game')
const uploadImage_user = require('../model/upload_image_user')
const auth = require('../model/Authentication')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const passport = require('passport')
const suggestion_api = require('../model/suggestion_api')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')


const initializePassport = require('../model/passportConfig')
initializePassport(passport)

app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

// current user will be pushed by the login function
var currentUser

// check if the logged in user is admin
function check_currentUser(req, res, next) {
    console.log(currentUser)
    if (currentUser) {
        api.getUserByEmail_login(currentUser, (err, result) => {
            if (err) {
                console.log(err)
                res.status(500)
                    .end('Internal Server Error')
            } else {
                console.log(result)

                if (result[0].type != 'admin') {
                    res.status(403)
                        .end('You are not admin, you are unable to access this api')
                } else {
                    return next()
                }

            }
        })
    } else (
        res.status(404)
            .end('You have no access to this API')
    )
}

// function to check for user is logged in
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

// function to check for user is not logged in
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.sendFile(path.join(__dirname, '../public/user_info.html'))
    }
    next()
}

// only allow userinfo get to be called if the user is logged in
function checkStatus_userInfoPulling(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.status(403)
        .end("F**k off")
}

// check the logged in userid
app.get('/checkLoggedInUserId', (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200)
        res.type('applicaiton/json')
        res.json(req.session.passport.user)
    } else {
        console.log('there is no user logged in')
        res.send(null)
    }
})

// check if the user is logged in if logged in - for general purpose
app.get('/checkStatus', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('User is authenticated, now showing the logout button')
        res.status(200)
        res.send("Authenticated")
    } else {
        console.log('User is not authenticated, now hiding the logout button')
        res.send(null)
    }
})

// serving the static websites
app.use(express.static('./public/', {root: __dirname}))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/main.html'))
})

app.get('/main', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/main.html'))
})

app.get('/games', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/Games.html'))
})


app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/about.html'))
})

app.get('/community', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/community.html'))
})

// page that's only accessible if user is not logged in
app.get('/login', checkNotAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login.html'))
})

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../public/Register.html'))
})

// the login with passport
app.post('/Login.html', checkNotAuthenticated, passport.authenticate('local'), (req, res) => {
    console.log(req.user.email)
    currentUser = req.user.email
    res.redirect('/mypage')

})

// register a new user
app.post('/register.html', checkNotAuthenticated, (req, res) => {
    auth.register(req, (err, result) => {
        if (err) {
            console.log(err)
            res.status(500)
                .send(`Condition: Unknown error\nCode: 500 Internal Server Error`)
        } else {
            console.log('New user registered successful')
            res.status(201)
            res.sendFile(path.join(__dirname, '../public/login.html'))
            // res.redirect('/login')
        }
    })
})

// static pages that's only accessible if user is logged in
app.get('/mypage', checkAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../public/user_info.html'))
})

app.get('/addgame_page', check_currentUser, checkAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../public/add_game.html'))
})

app.get('/editgame_page', check_currentUser, checkAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../public/edit_game.html'))
})


// Logout api
app.delete('/logout', (req, res) => {
    // passport logout function
    req.logOut()
    res.redirect('/login')
})



// User API - get user by email
app.get('/users/:email/', checkStatus_userInfoPulling, ((req, res) => {
    let email = req.params.email
    api.getUserByEmail_login(email, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500)
                .send(`Condition: Unknown error\nCode: 500 Internal Server Error`)
        } else {
            console.log(`Retrieve user with userID: ${email} is successful!`)
            console.log(result)
            res.status(200)
                .type("application/json")
                .json(result)
        }
    })
}))

// User API - get user by id
app.get('/usersbyid/:id/', checkStatus_userInfoPulling, ((req, res) => {
    let id = req.params.id
    api.getUserById(id, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500)
                .send(`Condition: Unknown error\nCode: 500 Internal Server Error`)
        } else {
            console.log(`Retrieve user with userID: ${id} is successful!`)
            console.log(result)
            res.status(200)
                .type("application/json")
                .json(result)
        }
    })
}))

// Category API - get all category
app.get('/api/all_cat', (req, res) => {
    api.getAllCat((err, result) => {
        if (err) {
            console.log(err)
            res.status(500)
                .end("Internal Server Error")
        } else {
            console.log(result)
            res.status(200)
                .type("application/json")
                .json(result)
        }
    })
})


// // Category API - add a game category
app.post('/api/add_category', check_currentUser, ((req, res) => {
    let catname = req.body.catname
    let description = req.body.description
    api.addCat(catname, description, (err, result) => {
        if (err) {
            if (err.code === "ER_DUP_ENTRY") {
                console.log(err)
                console.log("Type Duplicate")
                res.status(422)
                    .end("Error Code: 422 Unprocessable Entity\nYou have a duplicated entry!")
            } else {
                console.log(err);
                res.status(500)
                    .send(`Condition: Unknown error\nCode: 500 Internal Server Error`)
            }
        } else {
            console.log('New category inserted successfully!')
            res.status(204)
                .send("N/A")
        }
    })
}))


// Category API - Update a game category
app.put('/category/:id/', check_currentUser, (req, res) => {
    let catID = req.params.id
    let catname = req.body.catname
    let description = req.body.description
    api.updateCat(catID, catname, description, (err, result) => {
        if (err) {
            console.log(err)
            if (err.code === "ER_DUP_ENTRY") {
                console.log("Duplicate Entry")
                res.status(422)
                    .end(`Error Code: 422 Unprocessable Entity\nThe information is not updated as the category name: ${catname} already exists!`)
            } else {
                console.log(err);
                res.status(500)
                    .send(`Condition: Unknown error\nCode: 500 Internal Server Error`)
            }
        } else {
            console.log('Category updated successfully!')
            res.status(204)
                .send("N/A")
        }
    })
})

// game API - get all title
app.get("/api/titles", (req, res) => {
    suggestion_api.get_title_names((err, result) => {
        if (err) {
            res.status(500)
                .send(`Condition: Unknown error\nCode: 500 Internal Server Error`)
        } else {
            console.log("There is no error! All game info retrieved!")
            console.log(result)
            var title_list = []
            for (let i = 0; i < result.length; i++) {
                title_list.push(result[i].title)
            }
            res.status(200)
                .type("application/json")
                .json(title_list)
        }
    })
})

// Game API - add a game
app.post('/api/addgame', check_currentUser, ((req, res) => {
    let title = req.body.title
    let description = req.body.description
    let price = req.body.price
    let platform = req.body.platform
    var categoryid = String(req.body.categoryid).replace(/,/g, "")
    let year = req.body.year
    console.log(categoryid)

    api.addGame(title, description, price, platform, categoryid, year, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500)
                // .type("application/json")
                .end(`Condition: Unknown error\nCode: 500 Internal Server Error`)

        } else {
            console.log("New game added successful!")
            res.status(201);
            res.type("application/json");
            res.json(`Code: 201 Created\nContent: ID of the newly created game id:${result}`
            );


        }
    })
}))

// Game API - get game by its platform
app.get('/games/:platform', (req, res) => {
    let platform = req.params.platform;
    api.getGamesByPlatform(platform, (err, result) => {
        if (err) {
            console.log(err)
            res.status(500)
                .type("string")
                .send(`Condition: Unknown error\nCode: 500 Internal Server Error`)
        } else {
            res.status(200)
                .type("application/json")
                .json(result)
        }
    })
})


// Game API - Retrieve game by gameid
app.get('/api/getGame/:id', (req, res) => {
    let gameid = req.params.id
    api.getGameById(gameid, (err, result) => {
        if (err) {
            console.log(err)
            res.status(500)
                .type('string')
                .send(`Condition: Unknown error\nCode: 500 Internal Server Error`)
        } else {
            console.log('Game Retrieved')
            res.status(200)
                .type("application/json")
                .json(result)
        }
    })
})

// Game API - Retrieve all the games
app.get('/allgames/', (req, res) => {
    api.getAllGames((err, result) => {
        if (err) {
            console.log(err)
            res.status(500)
                .type('string')
                .send(`Condition: Unknown error\nCode: 500 Internal Server Error`)
        } else {
            console.log('All Game Retrieved')
            res.status(200)
                .type("application/json")
                .json(result)
        }
    })
})

// Game API - delete a game
app.delete('/game/:id', check_currentUser, (req, res) => {
    let gameid = req.params.id
    api.deleteGame(gameid, (err, result) => {
        if (err) {
            console.log(err)
            res.status(500)
                .type("string")
                .send(`Condition: Unknown error\nCode: 500 Internal Server Error`)
        } else {
            res.status(204)
                .end()
        }
    })
})

// Game API - update a game
app.put('/game/:id', check_currentUser, (req, res) => {
    let title = req.body.title
    let description = req.body.description
    let price = req.body.price
    let platform = req.body.platform
    let categoryid = req.body.categoryid
    let year = req.body.year
    let gameid = req.params.id

    api.updateGame(title, description, price, platform, categoryid, year, gameid, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500)
                .type("string")
                .send(`Condition: Unknown error\nCode: 500 Internal Server Error`)

        } else {
            console.log("New game Updated successful!")
            res.status(204)
                .end()
        }
    })

})

// Review API - Add review to a game
app.post('/user/:uid/game/:gid/review/', checkAuthenticated, ((req, res) => {
    let userid = req.params.uid
    let gameid = req.params.gid
    let content = req.body.content
    let rating = req.body.rating
    api.addReview(userid, gameid, content, rating, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500)
                .type("string")
                .send(`Condition: Unknown error\nCode: 500 Internal Server Error`)

        } else {
            console.log("New game added successful!")
            // refresh the page for user
            res.redirect(req.get('referer'));
            // res.status(201);
            // res.type("application/json");
            // res.send(`Code: 201 Created\nContent: ID of the newly created review id:${result}`

        }
    })
}))

// Review API - retrieve a review by game id
app.get('/game/:id/review', (req, res) => {
    let gameid = req.params.id;
    api.getReviewByGameID(gameid, (err, result) => {
        if (err) {
            console.log(err)
            res.status(500)
                .type("string")
                .send(`Condition: Unknown error\nCode: 500 Internal Server Error`)
        } else {
            console.log(result)
            res.status(200)
                .type("application/json")
                .json(result)
        }
    })
})


// Image API - Update/add game img
app.put('/game/:gameid/pic/', check_currentUser, (req, res) => {
    uploadImage_game(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            console.log('Multer error during uploading');
            console.log(err)
            res.status(500).type('application/json').json({'Message': 'Internal Server Error'});
        } else if (!req.file) {
            res.status(500)
            res.send('Please upload a file')
        } else if (err) {
            // An unknown error occurred when uploading.
            console.log('Something else went wrong');
            console.log(err);
            res.status(500).type('application/json').json({'Message': 'Internal Server Error'});
        }

        // find the gameid and absolute path to the file
        let gameid = req.params.gameid
        // let absolute_path = req.file.path
        console.log('gameid: ', gameid)
        // console.log('Absolute path: ',absolute_path)
        //find the original file name and the relative location of the file for later renaming
        let fileName = req.file.originalname

        // set the old and new file path for renaming file
        const pathToFile = req.file.path
        const newPathToFile = path.join(__dirname, `../public/game_image/game${gameid}.jpg`)
        // rename the picture name according to the gameid
        fs.rename(pathToFile, newPathToFile, function (err) {
            if (err) {
                throw err
            } else {
                console.log("Successfully renamed the file!")
            }
        })

        // create a new relative path to the file and push to the database
        // which will make the whole program work even on differnt machine
        let updated_path = `game_image/game${gameid}.jpg`
        api.uploadImage_game(gameid, updated_path, (err, result) => {
            if (err) {
                console.log(err)
                res.status(500)
                    .type('string')
                    .send(`Condition: Unknown error\nCode: 500 Internal Server Error`)
            } else {
                console.log('Picture Added')
                res.status(200)
                    .type("application/json")
                    .json(result)
            }

        })

    })
})




// Image API - Update/add user img
app.put('/user_img/:userid/', checkAuthenticated, (req, res) => {
    uploadImage_user(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            console.log('Multer error during uploading');
            console.log(err)
            res.status(500).type('application/json').json({'Message': 'Internal Server Error'});
        } else if (!req.file) {
            res.status(500)
            res.send('Please upload a file')
        } else if (err) {
            // An unknown error occurred when uploading.
            console.log('Something else went wrong');
            console.log(err);
            res.status(500).type('application/json').json({'Message': 'Internal Server Error'});
        }

        // find the gameid and absolute path to the file
        let userid = req.params.userid
        // let absolute_path = req.file.path
        console.log('userid: ', userid)
        // console.log('Absolute path: ',absolute_path)
        //find the original file name and the relative location of the file for later renaming
        let fileName = req.file.originalname

        // set the old and new file path for renaming file
        const pathToFile = req.file.path
        const newPathToFile = path.join(__dirname, `../public/user_image/user${userid}.jpg`)
        // rename the picture name according to the gameid
        fs.rename(pathToFile, newPathToFile, function (err) {
            if (err) {
                throw err
            } else {
                console.log("Successfully renamed the file!")
            }
        })

        // create a new relative path to the file and push to the database
        // which will make the whole program work even on differnt machine
        let updated_path = `user_image/user${userid}.jpg`
        api.uploadImage_user(userid, updated_path, (err, result) => {
            if (err) {
                console.log(err)
                res.status(500)
                    .type('string')
                    .send(`Condition: Unknown error\nCode: 500 Internal Server Error`)
            } else {
                console.log('Picture Added')
                res.status(200)
                    .type("application/json")
                    .json(result)
            }
        })
    })
})

//Image API - Get Image using gameid
app.get('/get/image/:gameid', (req, res) => {
    let gameid = req.params.gameid
    api.getImageByGameId(gameid, (err, result) => {
        if (err) {
            console.log(err)
            res.status(500)
                .type("string")
                .send(`Condition: Unknown error\nCode: 500 Internal Server Error`)
        } else {
            console.log("Game path retrieved")
            console.log(result)
            res.status(200)
            res.type('application/json')
                .json(result)
        }
    })
})


// Image API - get all game image
app.get('/get/allImage', (req, res) => {
    api.getAllImage((err, result) => {
        if (err) {
            console.log(err)
            res.status(500)
                .type("string")
                .send(`Condition: Unknown error\nCode: 500 Internal Server Error`)
        } else {
            console.log("Game path retrieved")
            res.status(200)
            // reformat the relative path to the absolute path
            // for (let i = 0; i < result.length; i++) {
            //     result[i].img_path = path.join(__dirname, result[i].img_path)
            // }

            // for (let i = 0; i < result.length; i++) {
            //     dict[`${result[i].img_game_id}`] = result[i].img_path
            // }
            // console.log(dict)
            var new_result = {}
            for (let i = 0; i < result.length; i++) {
                console.log(i)
                new_result[`${result[i].img_game_id}`] = result[i].img_path
            }
            console.log(new_result)
            res.type('application/json')
                .json(new_result)
        }
    })
})




module.exports = app