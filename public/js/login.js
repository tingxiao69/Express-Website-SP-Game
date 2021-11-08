// This file is for the form validation for login.html

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
                    var password = document.getElementById('inputPassword').value
                    var email = document.getElementById('inputEmail').value
                    console.log(password + " " + email)
                    // determine if user's input is correct
                    if (email.toLowerCase() == '1@nno.com') {
                        if (password == 123) {
                            // if email and password are correct, redirect to the community 
                            location.href = "community.html";

                            // if email and password are not a match
                        } else {
                            window.alert("Incorrect Email and Password")
                        }
                        // if email and password are not a match

                    } else {
                        window.alert("Incorrect Email and Password")
                    }
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();


