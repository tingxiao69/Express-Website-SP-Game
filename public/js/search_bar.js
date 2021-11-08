// getting all required elements
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
let linkTag = searchWrapper.querySelector("a");
const select_search = document.querySelector('#select_search')
var insertion = document.querySelector('#insertion')
let webLink;

// fetch function to get all the title names
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


// createt the variable for search suggestions
var suggestions = []

// start the fetch
getData().then(data => {
    // if user press any key and release
    inputBox.onkeyup = (e) => {
        // when user chooses to search games by platform
        if (select_search.value == 1) {
            suggestions = ['Xbox', 'Playstation', 'PC']
        } else { // when the user choose to search by game title
            suggestions = Object.assign({}, data)
            suggestions = Object.values(suggestions)
            // console.log(suggestions)
        }
        // when keyup get user's input box value
        let userData = e.target.value; //user enetered data
        // the variable which stores the suggestion values
        let emptyArray = [];

        // if user has entered some characters
        if (userData) {
            // when the search icon is pressed
            icon.onclick = () => {
                // if user is searching by platform
                if (select_search.value == 1) {
                    // fetch the game using api /games/:platform
                    webLink = `http://localhost:8081/games/${userData}`;
                    // fetch function
                    request_game(webLink, userData)
                } else {
                    // fetch function
                    find_game_id_and_request(userData)
                }
                // hide the suggestion box when the user click the search button
                searchWrapper.classList.remove("active");
            }
            // find the matching values from the suggestions array
            emptyArray = suggestions.filter((data) => {
                //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
                return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());

            });

            // Loop through the data and create html elements
            emptyArray = emptyArray.map((data) => {
                // passing return data inside li tag
                return data = '<li>' + data + '</li>';
            });

            // if there is a matching result to the user input
            if (emptyArray.length != 0) {
                searchWrapper.classList.add("active"); //show autocomplete box
                // function to show the suggestions
                showSuggestions(emptyArray);
                let allList = suggBox.querySelectorAll("li");
                for (let i = 0; i < allList.length; i++) {
                    //adding onclick attribute in all li tag
                    allList[i].setAttribute("onclick", "select(this)");
                }
            }
        } else {
            // if there is no user input
            searchWrapper.classList.remove("active"); //hide autocomplete box
        }
    }
})


// when user clicks on the suggestion list
function select(element) {
    // make the selected element as the text content of the selected suggestion item
    let selectData = element.textContent;
    // make the input box value the same as selectData
    inputBox.value = selectData;
    // when the search button is clicked
    icon.onclick = () => {
        // if user is searching by the platform
        if (select_search.value == 1) {
            // formulate the fetch link and call the fetch function
            webLink = `http://localhost:8081/games/${selectData}`;
            request_game(webLink, selectData)
        } else {
            // if user is searching by the title name
            // start the fetch function
            find_game_id_and_request(selectData)
        }
    }
    // hide the search suggestion after the click of suggestion list
    searchWrapper.classList.remove("active");

}

// the function to show the suggestion box
function showSuggestions(list) {
    let listData;
    if (!list.length) {
        userValue = inputBox.value;
        listData = '<li>' + userValue + '</li>';
    } else {
        listData = list.join('');
    }
    suggBox.innerHTML = listData;
}

// when user is searching by the title name
function find_game_id_and_request(user_input) {
    // first get the game id with the seleceted title name
    fetch('http://localhost:8081/allgames')
        .then(res => res.json())
        .then(allgames_info => {
            var selected_gameid
            // find the matching gameid
            for (let i = 0; i < allgames_info.length; i++) {
                if (user_input == allgames_info[i].title) {
                    selected_gameid = allgames_info[i].gameid
                }
            }
            // formulate the fetch link and request game by game id
            webLink = `http://localhost:8081/api/getGame/${selected_gameid}`;
            request_game(webLink, user_input)
        })
}

// request game
function request_game(fetch_link, search_str) {
    // first to clear the innerHTML of the search result
    insertion.innerHTML = ''
    // console.log("Request Game Function is working")

    // get the game img
    const fetch_ing = fetch('http://localhost:8081/get/allImage')
    // get the games using the fetch link provided
    const fetch_game = fetch(fetch_link)

    Promise.all([fetch_ing, fetch_game]).then(res => {
        return Promise.all(res.map(r => r.json()))
    }).then(([img_path_fetch, game_info_fetch]) => {
        // console.log([img_path_fetch, game_info_fetch])
        game_count = game_info_fetch.length
        console.log(game_count)
        var the_html = ''
        // if there is game
        if (game_count == 0) {
            // start injecting innerHTML
            if (select_search.value == 1) {
                the_html = `<h1 class="h5 text-center">There is no game on the platform of "${search_str}"</h1>`
            } else {
                the_html = `<h1 class="h5 text-center">There is no game with the name of "${search_str}"</h1>`
            }
        } else {
            if (select_search.value == 1) {
                the_html += `<h1 class="h5 text-center pb-4">Here are the games on the platform of "${search_str}"</h1>`
            } else {
                the_html += `<h1 class="h5 text-center pb-4">Here are the game with the name of of "${search_str}"</h1>`
            }
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
        }
        // inject the html str to the game page
        insertion.innerHTML = the_html

        var buttons = document.querySelectorAll('.the_button_game_id')
        // console.log(buttons[0])

        if (buttons) {
            buttons.forEach((e) => {
                e.addEventListener('click', () => {
                    e.preventDefault
                    localStorage.setItem('detailed_page_no', e.value)
                    window.location.href = 'Games_detail.html'
                })
            })
        }


    })
}
