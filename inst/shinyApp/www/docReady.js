$(document).ready(function() {
  $("#newTab").on("click", function(){
    setModel({value: "", language: "plaintext"});
    addChromeTab("unnamed");
    setTimeout(function() {
      selectize.setValue("");
    }, 0);
  });
});
