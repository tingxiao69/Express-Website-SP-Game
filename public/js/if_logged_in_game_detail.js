// Student Name: Shi Tingxiao
// Student Admission Number: P2033444
// Class: DAAA-1B-04

// this is a login check for the game details page
// use fetch to check the login status
fetch('http://localhost:8081/checkStatus')
    .then(res => res.text())
    .then(data => {
        if (data) { // when the user is logged in
            // get the userid and gameid from the local storage
            var userid = localStorage.getItem('userid')
            var gameid = localStorage.getItem('detailed_page_no')
            // fetch the user detail using userid
            fetch(`http://localhost:8081/usersbyid/${userid}`)
                .then(res => res.json())
                .then(data2 => {
                    // the section to sho the user when he is logged in
                    var login_button_transform = document.getElementsByClassName('login_special')
                    for (let i = 0; i < login_button_transform.length; i++) {
                        login_button_transform[i].innerHTML = `
                        <img src="${data2[0].profile_pic_url}"  class=" ml-1 mt-0 rounded-circle pt-0" width="32"
                        height="32" loading="lazy">
                    `
                    }
                    var comment_section = document.getElementById('comment_section')
                    comment_section.innerHTML = `
                    <div class="form-group container">
                    <form action="http://localhost:8081/user/${userid}/game/${gameid}/review" method="post">
                    <label for="rating">Rating</label>
                    <input type="text" name="rating" class='form-control' id="ranting" placeholder = 'Rate 1 out of 10'>
                    <label for="content">Comment:</label>
                    <textarea class="form-control" rows="5" id="content" name="content" placeholder='How does this game make you feel....'></textarea>
                    <button class="text-white button-text w-25 mt-3 mb-0 ml-auto mr-auto btn btn-primary btn-block button-color" type="submit">
                        submit
                    </button>
                </form>
                </div>
                    `
                })
                

        } else {
            // sections of html to inject when the user is not logged in
            var comment_section = document.getElementById('comment_section')
            comment_section.innerHTML = `<div class="pb-2 mb-0 pb-0">
            <a href="http://localhost:8081/login" target="#"
                class="text-white button-text w-25 mt-3 mb-0 ml-auto mr-auto btn btn-primary btn-block button-color">
                Add your comment
            </a>
                </div>
            </div>`
        }


    })