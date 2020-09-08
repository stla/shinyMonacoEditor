$(document).ready(function() {

  $("#container").height(0.8 * window.innerHeight);

  $("#editors").resizable({
    handles: "s",
    disabled: true,
    alsoResize: ".editor",
    stop: function(event, ui) {
      if(editor2isShown && !editorsAreStacked) {
        $(".editor").css("width", "calc(50% + 1px)");
      }
    }
  });

  $("#container").on("resize", function(event, ui) {
    if(editor2isShown && editorsAreStacked) {
      var x = editorsHeight - ui.size.height;
      $("#container2").height(x);
    }
  });

  $("#container2").on("resizestop", function(event, ui) {
    editorsHeight = $("#editors").height();
  });

  bg_well = $(".well").css("background-color");

  var d = 500;
  $("#hide-sidebar").on("click", function() {
    var containers = editor2isShown ? "#container,#container2" : "#container";
    $(".chrome-tabs").animate({opacity: 0}, d, function() {
      $("#container2").hide("fade", {duration: d}, function() {
        $("#container").hide("fade", {duration: d}, function() {
          $("#sidebar").parent().hide("fold", {duration: d}, function() {
            $("#mainPanel").toggleClass("col-sm-8 col-sm-12");
            $("#main").toggleClass("col-sm-11 col-sm-12");
            $("#show-sidebar-container").show("fade", {duration: d}, function() {
              $(containers).show("fade", {duration: d}, function() {
                $(".chrome-tabs").animate({opacity: 1}, d, function() {
                  editor.focus();
                });
              });
            });
          });
        });
      });
    });
  });
  $("#show-sidebar").on("click", function() {
    var containers = editor2isShown ? "#container,#container2" : "#container";
    $(".chrome-tabs").animate({opacity: 0}, d, function() {
      $("#container2").hide("fade", {duration: d}, function() {
        $("#container").hide("fade", {duration: d}, function() {
          $("#show-sidebar-container").hide("fade", {duration: d}, function() {
            $("#mainPanel").toggleClass("col-sm-8 col-sm-12");
            $("#main").toggleClass("col-sm-11 col-sm-12");
            $("#sidebar").parent().show("fold", {duration: d}, function() {
              $(containers).show("fade", {duration: d}, function() {
                $(".chrome-tabs").animate({opacity: 1}, d, function() {
                  editor.focus();
                });
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
