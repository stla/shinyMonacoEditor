$(document).ready(function() {

  $("#container2").hide();

  $("#tabs").tabs({
    tabPosition: "bottom",
    border: false,
    narrow: true,
    onUnselect: function(title, index) {
      onLeaveTab();
    },
    onSelect: function(title, index) {
      $("ul.tabs").sortable("refreshPositions");
      console.log(title); console.log(index);
//      setTimeout(function() {
//        $("#container2").append($("#tabs"));
//      }, 0);
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
      }
    }
  });

  $("ul.tabs").css("display", "flex");

$.fn.swap = function (elem) {
    elem = elem.jquery ? elem : $(elem);
    return this.each(function () {
        $(document.createTextNode('')).insertBefore(this).before(elem.before(this)).remove();
    });
};

function Update(event, ui) {
//index_stop = ui.item.index(); //getting index where element is dropped
/*Below steps will fetch the elements from List1 based on original Index ofpicked element in List2
 and its dropped Index position*/
             picked_element = ui.item; //$('ul.tabs li:eq('+index_start+')');
             var picked_order = picked_element.css("order");
console.log("picked_element", picked_element);
/*swap_element = $('ul.tabs li:eq('+index_stop+')');
var swap_order = swap_element.css("order");

console.log("swap_element", swap_element);
//              swap_element.swap(picked_element);

picked_element.css("order", swap_order);
swap_element.css("order", picked_order); */

/*                   if(swap_order > picked_order)
                         picked_element.after(swap_element);
                   else
                         picked_element.before(swap_element);*/


/*              $("ul.tabs").sortable("refreshPositions");
          //replaceWith method of javascript removes the picked_element from its original
          //position & replaces swap_element with picked_element */

}

  var index_start=0;
  var order_start = 0;
  var index_stop=0;
  var order_stop = 0;
  var swap_element=0;
  var picked_element=0;
  var updated = false;
  var swap_order;
  var picked_order;
  $("ul.tabs").sortable({
    axis: "x",
//    handle: ".tabs-title",
    start: function(event, ui){
      console.log("start");
                   picked_element = ui.item; //getting index of picked element
                   order_start = picked_element.css("order");
                   index_start = picked_element.index();
                   $("ul.tabs").css("display","block");
           },
    beforeStop: function(event, ui) {
      console.log("beforeStop");
//      console.log(ui.item);
//      console.log(ui.item.index());
    },
    helper: function(event, item){
      console.log("helper event", event);
      console.log("helper item", item);
      console.log("helper item index", $(item).index());
      return item;
    },
//    appendTo: document.body,
    stop: function(event, ui){
      console.log("stop");
//      console.log(event);
      console.log("ui.item", ui.item);
//      picked_element = ui.item;
//console.log(picked_element.css("order"));
//},500);
      if(updated){

        var $lis = $('ul.tabs li');

        var orders = $lis.map(function(i,e) {
          return $(e).data("rank");
        }).get();

        $lis.sort(function(a,b) {
     return $(a).data('rank') > $(b).data('rank');
}).appendTo('ul.tabs');

        $lis = $('ul.tabs li');

        for(var i = 0; i < $lis.length; i++) {
          $($lis[i]).css("order", orders[i]);
        }

/*     index_stop = picked_element.index();
swap_element = $('ul.tabs li:eq('+order_start+')');
var swap_order = swap_element.css("order");

console.log("picked_element", picked_element);
console.log("picked_element siblings", picked_element.parent().children());
console.log("order", picked_element.css("order"));
console.log("order_start", order_start);
console.log("index_stop", index_stop);
console.log("index_start", index_start);
console.log("ui.item index", ui.item.index());

console.log("swap_element", swap_element);
console.log("swap_order", swap_order);
console.log("index", swap_element.index());
picked_element.css("order", swap_order);
//console.log(picked_element.css("order"));
swap_element.css("order", order_start);
//setTimeout(function(){
if(index_stop !== index_start){
  swap_element.swap(picked_element);
}
updated = false;
//        Update(event,ui); */

/*        index_stop = ui.item.index();
order_stop = ui.item.css("order");
             picked_element = $('ul.tabs li:eq('+order_start+')');
             var picked_order = picked_element.index();
swap_element = $('ul.tabs li:eq('+order_stop+')');
var swap_order = swap_element.index();


picked_element.css("order", index_stop);
swap_element.css("order", index_start);
              swap_element.swap(picked_element);
              $("ul.tabs").css("display","flex"); */
      } else {
//        updated = false;
      }
  $("ul.tabs").sortable("refreshPositions");
              $("ul.tabs").css("display","flex");
    },
    change: function(event, ui) {
            console.log("change");
//            console.log("change event", event);
            console.log("change ui item", ui.item);
            console.log("change ui item index", ui.item.index());
            var siblings = ui.item.parent().children();
            console.log("siblings", siblings);
            console.log("orders", siblings.map(function(i,e){return $(e).css("order");}));
            //ui.item.parent().find(".ui-sortable-placeholder").remove();
            //ui.item.remove();
            updated = true;
              }  });

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
            $("#main-container").addClass("ml10");
            //$("#main").toggleClass("col-sm-11 col-sm-12");
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
            //$("#main").toggleClass("col-sm-11 col-sm-12");
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
