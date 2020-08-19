$(document).ready(function() {
  $("#newTab").on("click", function(){
    setModel({value: "", language: "plaintext"});
    counter_unnamed++;
    addChromeTab({title: "unnamed" + counter_unnamed, icon: false});
    setTimeout(function() {
      selectize.setValue("");
    }, 0);
  });
});
