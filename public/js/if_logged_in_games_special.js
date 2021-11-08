// Student Name: Shi Tingxiao
// Student Admission Number: P2033444
// Class: DAAA-1B-04

// this is the login checking for games.html
fetch('http://localhost:8081/checkStatus')
    .then(res => res.text())
    .then(data => {
        // console.log(data)
        if (data) {
            // get the userid from the localStorage
            var userid = localStorage.getItem('userid')
            var editGame_btn = document.querySelector('#editGame_btn')
            // using fetch to get the user info by userid
            fetch(`http://localhost:8081/usersbyid/${userid}`)
                .then(res => res.json())
                .then(data2 => {
                    // if the user is logged
                    var login_button_transform = document.getElementsByClassName('login_special')
                    // change the login button in the corner to user's profile picture in the nav bar
                    for (let i = 0; i < login_button_transform.length; i++) {
                        // console.log(data2[0].profile_pic_url)
                        login_button_transform[i].innerHTML = `
                        <img src="${data2[0].profile_pic_url}"  class=" ml-1 mt-0 rounded-circle pt-0" width="32"
                        height="32" loading="lazy">
                    `
                    }
                    // check if logged in user is an admin if is give special permission
                    if (data2[0].type == 'admin') {
                        // console.log('The current user is an admin')
                        // show the editGame_btn
                        editGame_btn.innerHTML = `            <button id="editGame_btn"
                        class="text-white button-text pl-2 pr-2 mt-5 mb-0 ml-auto mr-auto btn btn-primary button-color">
                        Admin CTRL
                    </button>`
                    }

                    // these are the button clicking animations
                    $('#editGame_btn').click(() => {
                        const pop_up = document.querySelector('#pop_up_main')
                        const tl = new TimelineMax()
                        tl.fromTo(pop_up, 0.5, { display: 'none', opacity: '0' },
                            { opacity: '1', display: 'flex' })
                    })
                    $('.cancel_pop_up').click(() => {
                        const pop_up = document.querySelector('#pop_up_main')
                        const main_menu = document.querySelector('#main_pop_menu')
                        const add_cat_screen = document.querySelector('#add_cat_screen')
                        const success = document.querySelector('#add_cat_successful')
                        const tl = new TimelineMax()
                        const fail = document.querySelector('#add_cat_fail')
                        tl.fromTo(pop_up, 0.5, { display: 'flex', opacity: '1' },
                            { opacity: '0', display: 'none' })
                        // reverse all the change made to the pop up screen
                        tl.fromTo(main_menu, 0.5, { display: 'none', opacity: '1' },
                            { display: 'block' })
                        tl.fromTo(add_cat_screen, 0.5, { opacity: '1', zIndex: '100', display: 'none' },
                            { opacity: '0', zIndex: '2', display: 'none' })
                        tl.fromTo(success, 0.5, { opacity: '1', zIndex: '100', display: 'none' },
                            { opacity: '0', zIndex: '2', display: 'none' })
                        tl.fromTo(fail, 0.5, { opacity: '1', zIndex: '100', display: 'none' },
                            { opacity: '0', zIndex: '2', display: 'none' })

                    })
                    $('#cat_btn').click(() => {
                        const main_menu = document.querySelector('#main_pop_menu')
                        const add_cat_screen = document.querySelector('#add_cat_screen')
                        const tl = new TimelineMax()
                        tl.fromTo(main_menu, 0.5, { display: 'block', opacity: '1' },
                            { opacity: '0', display: 'none' })
                        tl.fromTo(add_cat_screen, 0.5, { opacity: '0', zIndex: '2' }, { opacity: '1', zIndex: '100', display: 'block' })
                    })
                })
        }
    })