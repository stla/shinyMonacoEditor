var el = document.querySelector(".chrome-tabs");

document.documentElement.classList.add("dark-theme");
el.classList.add("chrome-tabs-dark-theme");

var chromeTabs = new ChromeTabs();
chromeTabs.init(el);

el.addEventListener("activeTabChange", function(e) {
  var index = parseInt($(e.detail.tabEl).data("tab-id"));
  var language = $(e.detail.tabEl).data("tab-language");
  if(editor) {
    var interval = setInterval(function() {
      if(editor.getModel() || editorIsDisposed) {
        clearInterval(interval);
        editorIsDisposed = false;
        if(editor.getModel()){
          var previousModelId = editor.getModel().id;
          modelStates[previousModelId] = editor.saveViewState();
        }
        editor.setModel(modelInstances[index]);
        var newModel = editor.getModel();
        var newModelId = newModel.id;
        if(modelStates[newModelId]) {
          editor.restoreViewState(modelStates[newModelId]);
          editor.focus();
        }
        //var language = newModel.getLanguageIdentifier().language;
        actionRegistration(language);
        selectize.setValue(language, true);
      }
    }, 50);
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
    editor.getModel().dispose();
    editorIsDisposed = true;
    $("#radials").show();
  }
});

chromeTabs.addTab({
  title: "example.js",
  favicon: "SuperTinyIcons/javascript.svg",
  id: counter.toString(),
  language: "javascript"
});

function addChromeTab(titleIconLanguage){
  $("#radials").hide();
  counter++;
  chromeTabs.addTab({
    title: titleIconLanguage.title,
    favicon: titleIconLanguage.icon,
    id: counter.toString(),
    language: titleIconLanguage.language
  });
}

$(document).on("shiny:connected", function() {
  Shiny.addCustomMessageHandler("addChromeTab", addChromeTab);
});
