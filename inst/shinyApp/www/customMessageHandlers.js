var actionRegistration = null;
function setLanguage(language) {
  var model = editor.getModel(); // create a model if the editor created from string value.
  monaco.editor.setModelLanguage(model, language);
  if(language === "javascript") {
    if(actionRegistration !== null) {
      actionRegistration.dispose();
    }
    actionRegistration = editor.addAction({
      id: "minifier",
      label: "Minify",
      precondition: null,
      keybindingContext: null,
      contextMenuGroupId: "navigation",
      contextMenuOrder: 1.5,
      run: function(ed) {
        var minified = Terser.minify(ed.getValue());
        minified.then(function(result) {
          ed.setValue(result.code);
        }).catch(function(error) {
          console.log(error);
        });
        return null;
      }
    });
  } else if(language === "html") {
    if(actionRegistration !== null) {
      actionRegistration.dispose();
    }
    actionRegistration = editor.addAction({
      id: "minifier",
      label: "Minify",
      precondition: null,
      keybindingContext: null,
      contextMenuGroupId: "navigation",
      contextMenuOrder: 1.5,
      run: function(ed) {
        var minified = HtmlMinifierTerser.minify(editor.getValue(), {
          minifyJS: true,
          minifyCSS: true,
          collapseWhitespace: true
        });
        ed.setValue(minified);
        return null;
      }
    });
  } else if(language === "css") {
    if(actionRegistration !== null) {
      actionRegistration.dispose();
    }
    actionRegistration = editor.addAction({
      id: "minifier",
      label: "Minify",
      precondition: null,
      keybindingContext: null,
      contextMenuGroupId: "navigation",
      contextMenuOrder: 1.5,
      run: function(ed) {
        var minified = new CleanCSS().minify(editor.getValue());
        ed.setValue(minified.styles);
        return null;
      }
    });
  }
}
function setValue(value) {
  editor.setValue(value);
}
$(document).on("shiny:connected", function() {
  Shiny.addCustomMessageHandler("language", setLanguage);
  Shiny.addCustomMessageHandler("value", setValue);
});
