// Student Name: Shi Tingxiao
// Student Admission Number: P2033444
// Class: DAAA-1B-04

// this is a logged in check for generic pages: main.html, about.html, community.html
// check the user status using the fetch
fetch('http://localhost:8081/checkStatus')
    .then(res => res.text())
    .then(data => {
        // if user is logged in
        if (data) {
            // get the user id from the localStorage
            var userid = localStorage.getItem('userid')
            // get the user information using the
            fetch(`http://localhost:8081/usersbyid/${userid}`)
                .then(res => res.json())
                .then(data2 => {
                    var login_button_transform = document.getElementsByClassName('login_special')
                    for (let i = 0; i < login_button_transform.length; i++){
                        login_button_transform[i].innerHTML = `
                        <img src="${data2[0].profile_pic_url}"  class=" ml-1 mt-0 rounded-circle pt-0" width="32"
                        height="32" loading="lazy">
                    `
                    }

                })
        }
    })