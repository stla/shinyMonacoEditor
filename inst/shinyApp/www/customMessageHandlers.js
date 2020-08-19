var actionRegistration_minifier = null,
  actionRegistration_prettifier = null,
  actionRegistration_sass = null;

function actionRegistration(language) {
  if(actionRegistration_minifier !== null) {
    actionRegistration_minifier.dispose();
  }
  if(actionRegistration_prettifier !== null) {
    actionRegistration_prettifier.dispose();
  }
  if(actionRegistration_sass !== null) {
    actionRegistration_sass.dispose();
  }
  if(language === "javascript") {
    actionRegistration_minifier = editor.addAction({
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
    actionRegistration_prettifier = editor.addAction({
      id: "prettifier",
      label: "Prettify",
      precondition: null,
      keybindingContext: null,
      contextMenuGroupId: "navigation",
      contextMenuOrder: 1.5,
      run: function(ed) {
        prettify(ed.getValue(), "babel");
        return null;
      }
    });
  } else if(language === "html") {
    actionRegistration_minifier = editor.addAction({
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
    actionRegistration_prettifier = editor.addAction({
      id: "prettifier",
      label: "Prettify",
      precondition: null,
      keybindingContext: null,
      contextMenuGroupId: "navigation",
      contextMenuOrder: 1.5,
      run: function(ed) {
        prettify(ed.getValue(), "html");
        return null;
      }
    });
  } else if(language === "css") {
    actionRegistration_minifier = editor.addAction({
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
    actionRegistration_prettifier = editor.addAction({
      id: "prettifier",
      label: "Prettify",
      precondition: null,
      keybindingContext: null,
      contextMenuGroupId: "navigation",
      contextMenuOrder: 1.5,
      run: function(ed) {
        prettify(ed.getValue(), "css");
        return null;
      }
    });
  } else if(language === "markdown") {
    actionRegistration_prettifier = editor.addAction({
      id: "prettifier",
      label: "Prettify",
      precondition: null,
      keybindingContext: null,
      contextMenuGroupId: "navigation",
      contextMenuOrder: 1.5,
      run: function(ed) {
        prettify(ed.getValue(), "markdown");
        return null;
      }
    });
  } else if(language === "scss") {
    actionRegistration_sass = editor.addAction({
      id: "scssCompiler",
      label: "Compile to CSS",
      precondition: null,
      keybindingContext: null,
      contextMenuGroupId: "navigation",
      contextMenuOrder: 1.5,
      run: function(ed) {
        var sass = new Sass();
        var scss = ed.getValue();
        sass.compile(scss, function(result) {
          console.log(result);
          if(result.status === 0) {
            setModel({value: result.text, language: "css"});
            var fileName = $(chromeTabs.activeTabEl).find(".chrome-tab-title").html();
            var fileSansExt = fileName.split('.').slice(0, -1).join('.');
            var title = (fileSansExt === "" ? fileName : fileSansExt) + ".css";
            addChromeTab({title: title, icon: "freeicons/css.svg"});
          }
        });
        return null;
      }
    });
    actionRegistration_prettifier = editor.addAction({
      id: "prettifier",
      label: "Prettify",
      precondition: null,
      keybindingContext: null,
      contextMenuGroupId: "navigation",
      contextMenuOrder: 1.5,
      run: function(ed) {
        prettify(ed.getValue(), "css");
        return null;
      }
    });
  }
}

function setModel(valueAndLanguage) {
  var language = valueAndLanguage.language;
  var modelInstance = monaco.editor.createModel(
    valueAndLanguage.value,
    language
  );
  modelInstances.push(modelInstance);
  actionRegistration(language);
}

function setLanguage(language) {
  var model = editor.getModel(); // create a model if the editor created from string value.
  monaco.editor.setModelLanguage(model, language);
  actionRegistration(language);
}

/*function setValue(value) {
  editor.setValue(value);
}*/

$(document).on("shiny:connected", function() {
  Shiny.addCustomMessageHandler("modelInstance", setModel);
  Shiny.addCustomMessageHandler("language", setLanguage);
//  Shiny.addCustomMessageHandler("value", setValue);
});
