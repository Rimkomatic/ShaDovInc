gsap.registerPlugin(ScrollTrigger);


// ! Text ----------------------------------------
gsap.from('#logo',{
    opacity:0,
    x:100,
    scrollTrigger:{
      trigger:'#logo',
      scrub:true,
    //   markers:true,
      start: "top center" ,
      end:"top end"
    }
})
  
gsap.fromTo('.text-eff',{opacity:0.1},{
    opacity:1,
    stagger:1.5,
    duration:2,
    scrollTrigger:{
      trigger:'.reveal-txt',
      scrub:true,
    //   markers:true,
      start:'top bottom -20%',
      end:'top center'
    }
})