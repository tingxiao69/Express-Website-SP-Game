
// let suggestions = [
//     "Channel",
//     "CodingLab",
//     "CodingNepal",
//     "YouTube",
//     "YouTuber",
//     "YouTube Channel",
//     "Blogger",
//     "Bollywood",
//     "Vlogger",
//     "Vechiles",
//     "Facebook",
//     "Freelancer",
//     "Facebook Page",
//     "Designer",
//     "Developer",
//     "Web Designer",
//     "Web Developer",
//     "Login Form in HTML & CSS",
//     "How to learn HTML & CSS",
//     "How to learn JavaScript",
//     "How to became Freelancer",
//     "How to became Web Designer",
//     "How to start Gaming Channel",
//     "How to start YouTube Channel",
//     "What does HTML stands for?",
//     "What does CSS stands for?",
// ];


// const getData = () => {
//     return new Promise((resolve, reject) => {
//         fetch('URL')
//             .then(response => {
//                 return response.json();
//             }).then(data_from_fetched => {
//                 let data = data_from_fetched.results;
//                 resolve(data);
//             })
//     }
// }


const getData = () => {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:8081/api/titles')
            .then(res => {
                return res.json();
            }).then(data_fetched => {
                let data = data_fetched
                resolve(data)
            })
    })
}
let suggestions = ''
getData().then(data => {
    suggestions = JSON.stringify(data)
    console.log(suggestions)



})

// suggestions = JSON.parse(suggestions)
console.log(suggestions)
