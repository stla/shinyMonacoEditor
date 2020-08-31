$(document).ready(function() {

  $("#container").height(0.8 * window.innerHeight);

  bg_well = $(".well").css("background-color");

  var d = 500;
  $("#hide-sidebar").on("click", function() {
    $(".chrome-tabs").animate({opacity: 0}, d, function() {
      $("#container").hide("fade", {duration: d}, function() {
        $("#sidebar").parent().hide("fold", {duration: d}, function() {
          $("#mainPanel").toggleClass("col-sm-8 col-sm-12");
          $("#main").toggleClass("col-sm-11 col-sm-12");
          $("#show-sidebar-container").show("fade", {duration: d}, function() {
            $("#container").show("fade", {duration: d}, function() {
              $(".chrome-tabs").animate({opacity: 1}, d, function() {
                editor.focus();
              });
            });
          });
        });
      });
    });
  });
  $("#show-sidebar").on("click", function() {
    $(".chrome-tabs").animate({opacity: 0}, d, function() {
      $("#container").hide("fade", {duration: d}, function() {
        $("#show-sidebar-container").hide("fade", {duration: d}, function() {
          $("#mainPanel").toggleClass("col-sm-8 col-sm-12");
          $("#main").toggleClass("col-sm-11 col-sm-12");
          $("#sidebar").parent().show("fold", {duration: d}, function() {
            $("#container").show("fade", {duration: d}, function() {
              $(".chrome-tabs").animate({opacity: 1}, d, function() {
                editor.focus();
              });
            });
          });
        });
      });
    });
  });

  $("[data-toggle=tooltip]").tooltip({
    delay: {
      "show": 0,
      "hide": 5000
    }
  }).on("hidden.bs.tooltip", function() {
    var $this = $(this);
    setTimeout(function() {
      $this.tooltip("destroy");
    }, 10000);
  });


  setTimeout(function() {
    slider = $("#wrapWidth").data("ionRangeSlider");
  }, 0);

  $("#newTab").on("click", function() {
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

  $(".radialred,.radialgreen,.radialblue").on("mouseenter", function() {
    $(".radialred,.radialgreen,.radialblue")
      .animate({
        width: "250px",
        height: "250px",
        margin: "-125px 0 0 -125px"
      }, "slow");
  }).on("mouseleave", function() {
    $(".radialred,.radialgreen,.radialblue")
      .animate({
        width: "300px",
        height: "300px",
        margin: "-150px 0 0 -150px"
      }, "slow");
  });

});
