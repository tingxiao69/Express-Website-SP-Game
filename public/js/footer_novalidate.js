// Student Name: Shi Tingxiao
// Student Admission Number: P2033444
// Class: DAAA-1B-04

// this file is for foot validation

// get element and store in var contactUs
var contactUs = document.getElementById('contact-us-submission')

contactUs.addEventListener('submit', contactUs_feedback)

// funciton to make the form submitting interactive
function contactUs_feedback(e) {
    // prevent the normal submittion
    e.preventDefault()
    // reset the form and hide the modal
    $('#contact-us-submission-modal').modal('hide')
    document.getElementById('contact-us-submission').reset()
    // acknowledge the user that their input was received
    window.alert('Your feedback has been submitted, we will get back to you shortly ')
}