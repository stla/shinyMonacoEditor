$(document).ready(function() {

  $("#container2").hide();

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

  // easyui
  $(window).resize(function() {
    $("#tabs").tabs("resize");
  });

  var initAll = function() {
    $("#tabs").tabs({
      tabPosition: "bottom",
      border: false,
      narrow: true,
      onUnselect: function(title, index) {
        onLeaveTab();
      },
      onSelect: function(title, index) {
        $("ul.tabs").sortable("refreshPositions");
        var id = $('#tabs').tabs("getSelected").attr("id");
        var modelInstance = modelInstances2[id];
        if(modelInstance) {
          editor2.setModel(modelInstance);
        }
      },
      onClose: function(title, index) {
        if($(".tabs-panels").children().length === 0) {
          $("#editors").css("display", "block");
          editorsAreStacked = true;
          $("#container2").hide();
          $("#container,#container2").css("width", "100%");
          var h = 0.8 * window.innerHeight;
          $("#container").height(h);
          $("#editors").css("height", "");
          editorsHeight = h;
          $("#container,#container2").resizable("enable");
          $("#editors").resizable("disable");
          if(editorIsDisposed) {
            $(".background").show("fade", 1000);
          }
          editor2isShown = false;
        } else {
          var $lis = $tabs.children();
          var orders = $lis.map(function(i, e) {
            return $(e).css("order");
          }).get();
          for(var i = 0; i < $lis.length; i++) {
            var $li = $($lis[i]);
            $li.attr("data-rank", i);
            var order = $li.css("order");
            $li.css("order", orders.indexOf(order));
          }
          $tabs.sortable("refresh");
        }
      }
    }).removeClass(
      ["ui-tabs", "ui-corner-all", "ui-widget", "ui-widget-content"]
    );

    var $tabs = $("ul.tabs");

    //$tabs.css("display", "flex");

    var updated = false;
    var orders;
    $tabs.sortable({
      axis: "x",
      items: "> li",
      handle: $tabs,
      helper: function(event, item) {
        orders = $tabs.children().map(function(i, e) {
          return $(e).css("order");
        }).get();
        return item;
      },
      start: function(event, ui) {
        var $lis = $tabs.children();
        $lis.sort(function(a, b) {
          return $(a).css("order") > $(b).css("order");
        }).appendTo($tabs);
        $lis.css("order", "");
      },
      change: function(event, ui) {
        updated = true;
      },
      stop: function(event, ui) {
        var $lis = $tabs.children();
        if(updated) {
          for(var i = 0; i < $lis.length; i++) {
            $($lis[i]).css("order", i);
          }
          $lis.sort(function(a, b) {
            return parseInt(a.dataset.rank) > parseInt(b.dataset.rank);
          }).appendTo($tabs);
          updated = false;
        } else {
          $lis.sort(function(a, b) {
            return parseInt(a.dataset.rank) > parseInt(b.dataset.rank);
          }).appendTo($tabs);
          for(var i = 0; i < $lis.length; i++) {
            $($lis[i]).css("order", orders[i]);
          }
        }
      }
    });
  };

  easyloader.theme = "black";
  using(["tabs"], function() {
    initAll.call(this);
  });

  //

  bg_well = $(".well").css("background-color");

  var d = 500;
  $("#hide-sidebar").on("click", function() {
    var containers = editor2isShown ? "#container,#container2" : "#container";
    $(".chrome-tabs").animate({opacity: 0}, d, function() {
      $("#container2").hide("fade", {duration: d}, function() {
        $("#container").hide("fade", {duration: d}, function() {
          $("#sidebar").parent().hide("fold", {duration: d}, function() {
            $("#mainPanel").toggleClass("col-sm-8 col-sm-12");
            $("#main-container").addClass("ml10");
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
            $("#main-container").removeClass("ml10");
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
