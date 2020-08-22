$(document).ready(function() {

  setTimeout(function() {
    slider = $("#wrapWidth").data("ionRangeSlider");
  }, 0);

  $("#newTab").on("click", function(){
    setModel({value: "", language: "plaintext"});
    counter_unnamed++;
    addChromeTab({
      title: "unnamed" + counter_unnamed,
      icon: false,
      language: ""
    });
    setTimeout(function() {
      selectize.setValue("");
    }, 0);
  });

  $("#radials").on("mouseenter", function(){
    $(".radialred,.radialgreen,.radialblue")
      .animate({width:"250px",height:"250px",margin:"-125px 0 0 -125px"}, "slow");
  }).on("mouseleave", function(){
    $(".radialred,.radialgreen,.radialblue")
      .animate({width:"300px",height:"300px",margin:"-150px 0 0 -150px"}, "slow");
  });

});
