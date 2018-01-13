

$(document).ready(function() {
  // enlarge image toggle function
  function imgageEnlarge(imgURL) {
    console.log(imgURL);
    $('#imageEnlarged').attr('src', imgURL);
    $('#imageEnlargedContainer').stop().css('display', 'inherit');
    imageEnlarged = true;
  }
  function imageReset() {
    console.log("entering imageReset function");
    $('#imageEnlargedContainer').stop().css('display', 'none');
    imageEnlarged = false;
  }

  var imageEnlarged = false;
  $(".galleryImage").click(function() {
    var imgURL = $(this).attr("src");
    if (imageEnlarged == false) {
      imgageEnlarge(imgURL);
      $("html").css("position","fixed");
    }
  });
  $("#imageEnlargedContainer").click(function(e) {
    if (!$(e.target).hasClass('fa')) {
      if (imageEnlarged == true) {
        imageReset();
        $("html").css("position","relative");
      }
    }
  });
// image switch from enlarged image

  function nextImage(value) {
    var nextImg;
    var nextImg;
    var imgNr;
  // sperates image url nr from url
    var urlImg = $('#imageEnlarged').attr('src');
    urlImg = urlImg.replace('.jpg', '');
    urlImg = urlImg.replace('screenshots/', '');
    // console.log(urlImg);
    var fullUrl = urlImg + ".jpg";
  // increases/decreases img nr by 1
    imgNr = parseInt(urlImg) + value;
    if (imgNr < 0) {
      imgNr = 15;
    } else if (imgNr > 15) {
      imgNr = 0;
    }
    if (imgNr < 10) {
      nextImg = "screenshots/" + 0 + imgNr + ".jpg";
    } else {
      nextImg = "screenshots/" + imgNr + ".jpg";
    }
    $('#imageEnlarged').attr('src', nextImg);
  //loop image switch
  console.log(imgNr);
  }
// Image navigation, mouse
  $('.fa-chevron-left').click(function() {
    nextImage(-1);
  });
  $('.fa-chevron-right').click(function() {
    nextImage(1);
  });
// Image navigation, keyboard
  $(document).keydown(function(e) {
    if (imageEnlarged == true) {
      // console.log(e.which);
      if (e.which == 37) { //left
        nextImage(-1);
      } else if (e.which == 39) {
        nextImage(1);
      }
    }
  });

  // Mobile swipe
  var x1,x2;
  $(".imageEnlarged").on('touchstart', function(e){
    console.log(e.originalEvent.touches["0"].pageX);
    x1 = e.originalEvent.touches["0"].pageX;
  });
  $(".imageEnlarged").on('touchend', function(e){
    console.log(e.originalEvent.changedTouches["0"].pageX);
    x2 = e.originalEvent.changedTouches["0"].pageX;
  });
  $(".imageEnlarged").on('touchend', function(e) {
    if (x2 > x1) {
      // swiped left
      nextImage(-1);
    } else if (x2 < x1) {
      // swiped right
      nextImage(1);
    }
  });

});
