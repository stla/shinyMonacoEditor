var el = document.querySelector(".chrome-tabs");

document.documentElement.classList.add("dark-theme");
el.classList.add("chrome-tabs-dark-theme");

var chromeTabs = new ChromeTabs();
chromeTabs.init(el);

el.addEventListener("activeTabChange", function(e) {
  var index = parseInt($(e.detail.tabEl).data("tab-id"));
  if(editor) {
    var interval = setInterval(function() {
      if(editor.getModel()) {
        clearInterval(interval);
        editor.setModel(modelInstances[index]);
        var language = editor.getModel().getLanguageIdentifier().language;
        actionRegistration(language);
        selectize.setValue(language, true);
      }
    }, 100);
/*    setTimeout(function() {
      editor.setModel(modelInstances[index]);
      var language = editor.getModel().getLanguageIdentifier().language;
      actionRegistration(language);
      selectize.setValue(language, true);
    }, 500); */
  }
});

el.addEventListener("tabRemove", function(e) {
  if(chromeTabs.tabEls.length === 0) {
    editor.dispose();
  }
});

chromeTabs.addTab({
  title: "example.js",
  favicon: "SuperTinyIcons/javascript.svg",
  id: counter.toString()
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
