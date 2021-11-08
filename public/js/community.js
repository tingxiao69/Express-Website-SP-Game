// this file is for Community.html

// grab the form and store in var newQ
var newQ = document.getElementById('newQuestion');
// grab the display element and store it in newQuestionDis
var newQuestionDis = document.getElementById('newQuestionDis');
// var to store the user input
var qd_HTML = "";

// to generate the date 
var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

// function to generate date
function getDateAndFormat() {
    var date = new Date(); // use of object and methods
    var month = date.getMonth();
    var today = date.getDate();
    var year = date.getFullYear();
    // use of array
    var monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    date_str = `${monthName[month]} ${today}, ${year}`;
    console.log(date_str);
    return date_str;
}

// form validation
(function () {
    'use strict';
    window.addEventListener('load', function () {
        // Get the forms we want to add validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                event.preventDefault();
                event.stopPropagation();
                if (form.checkValidity() === false) {
                } else {
                    //get input value
                    var userInput_text = document.getElementById('user-concerns').value;
                    var userInput_lecturer = document.getElementById('newQuestion-lecturer').value;

                    // when user have no preference for lectures
                    // userInput_lecturer represents no preference for lecture refer to line 107 at Community.html
                    if (userInput_lecturer == 10) {
                        // modify the html variable
                        qd_HTML += `<div class="media p-3 bg-black mb-3">
        <img src="figures/student6.png" alt="Russel Williams" class="mr-3 mt-3 rounded-circle" width="62">
        <div class="media-body">
        <h3>Shirley Juan<small class="small"><i>
                    <spam class="text-primary">From Complete Community</spam> Posted on ${getDateAndFormat()}
                </i></small></h3>
        <h2 class="font-weight-light">${userInput_text}</h2>
    </div></div>`;
                        // modify the innerHTML to make content show on the website
                        newQuestionDis.innerHTML = qd_HTML;
                        // hide and refresh the submitted modal
                        $('#newQuestions').modal('hide');
                        document.getElementById('newQuestion').reset();
                    }
                    else {
                        qd_HTML += `<div class="media p-3 bg-black mb-3">
    <img src="figures/student6.png" alt="Russel Williams" class="mr-3 mt-3 rounded-circle" width="62">
    <div class="media-body">
    <h3>Shirley Juan<small class="small"><i>
                <spam class="text-primary">From Complete Community</spam> Posted on ${getDateAndFormat()} preferred lecture: ${userInput_lecturer}
            </i></small></h3>
    <h2 class="font-weight-light">${userInput_text}</h2>
</div></div>
`;
                        // modify the innerHTML to make content show on the website
                        newQuestionDis.innerHTML = qd_HTML
                        // hide and refresh the submitted modal
                        $('#newQuestions').modal('hide')
                        document.getElementById('newQuestion').reset()

                    }
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();




