// Student Name: Shi Tingxiao
// Student Admission Number: P2033444
// Class: DAAA-1B-04

// this file is for page Main.html, Games.html and About.html
// this file does not submit to backend, its just a skeleton function

(function () {
    let sendBtn = document.getElementById('contact-us-sub')
    let email = document.getElementById('inputEmail_contact_us').value
    let issue_des = document.getElementById('issue_description').value
    let issue_elb = document.getElementById('issue_elaboration').value
    'use strict';
    window.addEventListener('load', function () {
        // Get the forms we want to add validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        var contactUsForm = document.getElementById('contact-us-submission')
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                event.preventDefault();
                if (form.checkValidity() === false) {
                } else {
                    // hide the modal after user's completion
                    $('#contact-us-submission-modal').modal('hide')
                    // reset the form after submit
                    document.getElementById('contact-us-submission').reset()
                    // notify the user that the form have been submitted
                    window.alert('Your feedback has been submitted, we will get back to you shortly ')
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();