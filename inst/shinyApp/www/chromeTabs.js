var el = document.querySelector(".chrome-tabs");

document.documentElement.classList.add("dark-theme");
el.classList.add("chrome-tabs-dark-theme");

var chromeTabs = new ChromeTabs();
chromeTabs.init(el);

el.addEventListener("activeTabChange", function(e) {
  var index = parseInt($(e.detail.tabEl).data("tab-id"));
  if(editor){
    setTimeout(function() {
      editor.setModel(modelInstances[index]);
      var language = editor.getModel().getLanguageIdentifier().language;
      selectize.setValue(language, true);
    }, 0);
  }
});

chromeTabs.addTab({
  title: "example.js",
  favicon: false,
  id: counter.toString()
});

$("#add").on("click", function() {
});

function addChromeTab(title){
  counter++;
  chromeTabs.addTab({
    title: title,
    favicon: false,
    id: counter.toString()
  });
}

$(document).on("shiny:connected", function() {
  Shiny.addCustomMessageHandler("addChromeTab", addChromeTab);
});
