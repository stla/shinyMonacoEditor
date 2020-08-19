$(document).ready(function() {
  $("#newTab").on("click", function(){
    setModel({value: "", language: "plaintext"});
    addChromeTab({title: "unnamed", icon: false});
    setTimeout(function() {
      selectize.setValue("");
    }, 0);
  });
});
