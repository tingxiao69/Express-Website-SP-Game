// Student Name: Shi Tingxiao
// Student Admission Number: P2033444
// Class: DAAA-1B-04

// define the loading screen element and the animation using gsap
const loading_screen = document.querySelector('.loading_screen')
const after_loaded = document.querySelector('#after_loaded')

// define gsap timeline and set the animation
const tl = new TimelineMax()
$(window).on('load', () => {
    tl.fromTo(loading_screen, 0.9, { opacity: '1' }, { opacity: '0', ease:Power2.easeInOut})
    tl.fromTo(after_loaded, 0.7, {display:'none', opacity:'0'}, {display:'block', opacity:'1', ease:Power2.easeInOut}, '-=0.3')
})

