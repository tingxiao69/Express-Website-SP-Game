// Student Name: Shi Tingxiao
// Student Admission Number: P2033444
// Class: DAAA-1B-04

// retrieved the gameid that's previously set to localStorage variable: detailed_page_no
var gd_gameid = localStorage.getItem("detailed_page_no")

// function to get the image by gameid
const get_img_by_id = (gameid) => {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:8081/get/image/${gameid}`)
            .then(res => res.json())
            .then(data_fetched => {
                let data = data_fetched
                resolve(data)
            })
    })
}

// function to get the game info by gameid
const get_game_info = (gameid) => {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:8081/api/getgame/${gameid}`)
            .then(res => res.json())
            .then(data_fetched => {
                let data = data_fetched
                resolve(data)
            })
    })
}



var img_path = ''
var game_info = []

// start the img fetching
get_img_by_id(gd_gameid).then(data1 => {
    // get the data and store as img_path
    img_path = data1[0]['img_path']
    // start the game_info fetching
    get_game_info(gd_gameid).then(data2 => {
        game_info = Object.assign({}, data2)
        // locate the div tag in the html
        var div = document.getElementById('insertion')
        if (div) {
            // inject the innerHTML into the div tag
            div.innerHTML = `
            
            <main>
            <div class="container" id="insertion">
                <div class="the_card">
                    <div class="cover" id="img_ins">
                       
                    </div>
                    <div class="card_content">
                        <div class="top_spam">

                        </div>
                        <div class="card_content-body justify-content-center">
                            <div class="card_spam">

                            </div>
                            <div class="black-label">
                                <span class="title text-dark"><b> ${game_info[0].title}</b></span>
                                <p class="card-text text-left">Platform: ${game_info[0].platform} </p>
                                <p class="card-text text-left">Published Year:  ${game_info[0].year}</p>
                                <p class="card-text text-left">Category:  ${game_info[0].catname}</p>
                                <p class="card-text text-left">Description:  ${game_info[0].description}</p>
                    
                                <div class="prix">
                                    <span class="text-dark h2"><b> $${game_info[0].price}</b></span>
                                    <!-- <span class="crt">Add to card</span> -->
                                </div>
                            </div>


                        </div>

                    </div>
                </div>

            </div>
        </main>
             `
            // locate the img insertion section and insert the img as a backgroud img
            var img_insertion = document.getElementById('img_ins')
            img_insertion.style.backgroundImage = `url("../${img_path}")`

            // start the review fetching
            fetch(`http://localhost:8081/game/${gd_gameid}/review`)
                .then(data3 => data3.json())
                .then(data3_json => {
                    // locate the comment detail section
                    const comments_detail = document.getElementById('comments_detail')
                    // Prepare for HTML insertion
                    var commentsInnerHTML = `
                    <div class="album py-5  w-100 album-background">
                    <h2 class="display-4 font-weight-light text-center mt-2 mb-5">Hear from Other People</h2>`
                    if (data3_json.length == 0) {
                        commentsInnerHTML = `
                        <h2 class="display-4 font-weight-light text-center mt-2 mb-5">Be the first one to comment</h2>
                        <a href="http://localhost:8081/login" target="#"
                        class="text-white button-text w-25 mt-3 mb-0 ml-auto mr-auto btn btn-primary btn-block button-color">
                        Add your comment
                    </a>
                        `
                    } else {
                        for (let i = 0; i < data3_json.length; i++) {
                            commentsInnerHTML += `
                            <div class="media p-3 mb-3">
                            <img src="${data3_json[i].profile_pic_url}" class="mr-3 mt-3 rounded-circle" width="62">
                            <div class="media-body">
                                <h3>${data3_json[i].username} rated ${data3_json[i].rating} out of 10<small class="small"><i>
                                            Posted at ${data3_json[i].created_at}
                                        </i></small></h3>
                                <h2 class="font-weight-light">${data3_json[i].content}</h2>
                            </div>
                        </div>`
                        }
                        
                    }

                    // Insert the comment section in detail
                    comments_detail.innerHTML = commentsInnerHTML
                    
                })


        }
    })
})




