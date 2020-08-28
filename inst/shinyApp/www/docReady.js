$(document).ready(function() {

  bg_well = $(".well").css("background-color");

  $(".toggle-sidebar").on("click", function() {
    $(".chrome-tabs").animate({opacity: 0}, 1000, function() {
      $("#container").hide("fade", {duration: 1000}, function() {
        $("#sidebar").parent().toggle("fold", {duration: 1000}, function() {
          $("#mainPanel").toggleClass("col-sm-8 col-sm-12");
          $("#right").toggleClass("col-sm-11 col-sm-12");
          $("#toggle1").parent().toggle("fade", {duration: 1000}, function() {
            $("#container").show("fade", {duration: 1000}, function() {
              $(".chrome-tabs").animate({opacity: 1}, 1000);
            });
          });
        });
      });
    });
  });

  $("[data-toggle=tooltip]").tooltip();

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

  $(".radialred,.radialgreen,.radialblue").on("mouseenter", function(){
    $(".radialred,.radialgreen,.radialblue")
      .animate({width:"250px",height:"250px",margin:"-125px 0 0 -125px"}, "slow");
  }).on("mouseleave", function(){
    $(".radialred,.radialgreen,.radialblue")
      .animate({width:"300px",height:"300px",margin:"-150px 0 0 -150px"}, "slow");
  });

});
