ScrollSmoother.create({
    content: ".viewport",
    smooth: 1
  });
  
  $('*').on('*', function () {
    ScrollTrigger.refresh();
  }).on('hidden.bs.collapse', function() {
    ScrollTrigger.refresh();
  });