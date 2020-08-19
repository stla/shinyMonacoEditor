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
  favicon: "SuperTinyIcons/javascript.svg",
  id: counter.toString()
});

$("#add").on("click", function() {
});

function addChromeTab(titleAndIcon){
  counter++;
  chromeTabs.addTab({
    title: titleAndIcon.title,
    favicon: titleAndIcon.icon,
    id: counter.toString()
  });
}

$(document).on("shiny:connected", function() {
  Shiny.addCustomMessageHandler("addChromeTab", addChromeTab);
});
