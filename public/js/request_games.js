// Student Name: Shi Tingxiao
// Student Admission Number: P2033444
// Class: DAAA-1B-04

// fetch function for game info and image
const fetch_ing = fetch('http://localhost:8081/get/allImage')
const fetch_game = fetch('http://localhost:8081/allgames')

// start fetching and wait for both to respond
Promise.all([fetch_ing, fetch_game]).then(res => {
    return Promise.all(res.map(r => r.json()))
}).then(([img_path_fetch, game_info_fetch]) => {
    // inject retrieved game info into 'the_html' variable
    game_count = game_info_fetch.length
    var the_html = ''

    // loop through the games and injecting the html
    for (let row = 0, count = 0; row < Math.ceil(game_count / 3) && count < game_count; row++) {
        the_html += '<div class="row justify-content-center">'
        for (let col = 0; col < 3 && count < game_count; col++, count++) {
            console.log
            the_html += `
            <div class="col-lg-4 pb-3 ">
                <div class="card text-center bg-black text-white">
                    <img alt="Card image cap" class="card-img-top thumbnails" src="${img_path_fetch[game_info_fetch[count].gameid]}">
                    <div class="card-body mt-0 pt-2">
                        <p class="card-title  mb-0  font-weight-lighter h5">
                            ${game_info_fetch[count].title}
                        </p>
                        <p class="card-text h6  pt-3">S$${game_info_fetch[count].price}</p>
                        <p class="card-text h6 ">Platform: ${game_info_fetch[count].platform}</p>
                        <p class="card-text h6">Released in: ${game_info_fetch[count].year}</p>
                        <p class="card-text h6">Category: ${game_info_fetch[count].catname}</p>
                        <button type="button" value="${game_info_fetch[count].gameid}" class="the_button_game_id font-weight-light h5 btn btn-primary pt-2 pl-3 pr-3 button-color">Learn More
                            </button>
                    </div>
                </div>
            </div>
            `

        }
        the_html += '</div>'
    }

    // inject into the actually html
    var insertion = document.querySelector('#insertion')
    insertion.innerHTML = the_html

    // set each button's value according to the gameid
    var buttons = document.querySelectorAll('.the_button_game_id')
    // console.log(buttons[0])

    // if any of the more_detail button is clicked, send the user to the games_detail.html with the gameid
    // stored in the localStorage
    if (buttons) {
        buttons.forEach((e) => {
            e.addEventListener('click', ()=>{
                e.preventDefault
                localStorage.setItem('detailed_page_no', e.value)
                window.location.href = 'Games_detail.html'
            })
        })
    }
})

