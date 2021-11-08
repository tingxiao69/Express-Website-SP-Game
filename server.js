// Student Name: Shi Tingxiao
// Student Admission Number: P2033444
// Class: DAAA-1B-04

const app = require('./controller/app')
const hostname = "localhost"
const port = 8081

let server = app.listen(port, hostname, () => {
    console.log("The server have started!")

})