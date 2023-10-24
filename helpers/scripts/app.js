gsap.registerPlugin(ScrollTrigger);


// ! Text ----------------------------------------
gsap.from('#logo',{
    opacity:0,
    x:100,
    scrollTrigger:{
      trigger:'#logo',
      scrub:true,
      // markers:true,
      start: "top 30%" ,
      end:"top 20%"
    }
})
  
gsap.fromTo('.text-eff',{opacity:0.01},{
    opacity:1,
    stagger:1.5,
    duration:2,
    scrollTrigger:{
      trigger:'.reveal-txt',
      scrub:true,
      markers:true,
      start:'top 70%',
      end:'top 55%'
    }
})

const tl = gsap.timeline({});
gsap.from(
  ".hidden-text",1.5,{ 
    y: "100%", 
    ease: "power4.out",
    stagger: 0.15,
    scrollTrigger:{
      trigger:'.form-holder',
      scrub:true,
      // markers:true,
      start:'top 65%',
      end:'top 40%'
    }
  }
);
gsap.fromTo(
  ".show",
  {opacity:0 , y: 100},
  { 
    opacity:1, 
    y:0,
    ease: "power4.out",
    stagger: 0.15,
    scrollTrigger:{
      trigger:'.form-holder',
      scrub:2,
      // markers:true,
      
      start:'top 65%',
      end:'top 40%'
    }
  }
);


// !-----------------------------------------


// import { writeFile } from 'fs';
// let fInput = "You are reading the content from Tutorials Point"
// writeFile('./emails.txt', fInput, (err) => {
//    if (err) throw err;
//    else{
//       console.log("The file is updated with the given data")
//    }
// })
