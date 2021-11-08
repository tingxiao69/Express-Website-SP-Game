const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const spApi = require('./apis')


// api.getUserByEmail_login(email, (err, result)=>{
//     if (err){
//         console.log(err)
//         return null
//     } else {
//         console.log(result)
//         return result
//     }
// })



function initialize(passport) {
    var user


    const authenticateUser = (email, password, done) => {
        spApi.getUserByEmail_login(email, (err, result) => {
            if (err) {
                console.log(err)
                return user_rendered(null)
            } else {
                console.log(result[0])
                return user_rendered(result[0]), user = Object.assign({}, result[0])
            }
        })

        const user_rendered = async (user) => {

            if (typeof user === 'undefined') {
                console.log('No user with that email')
                return done(null, false, {message: 'No user with that email'})
            }

            try {
                if (await bcrypt.compare(password, user.password)) {
                    console.log('password Correct')
                    return done(null, user)
                } else {
                    return done(null, false, {message: 'Password incorrect'})
                }
            } catch (e) {
                return done(e)
            }
        }
    }

    passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser))
    passport.serializeUser((user, done) => {
        return done(null, user.userid)
    })
    passport.deserializeUser((user, done) => {
        return done(null, user)
    })
}

module.exports = initialize