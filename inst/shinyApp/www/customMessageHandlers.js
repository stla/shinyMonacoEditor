var actionRegistration_minifier = null,
  actionRegistration_prettifier = null;

function setModel(valueAndLanguage) {
  var language = valueAndLanguage.language;
  var modelInstance = monaco.editor.createModel(
    valueAndLanguage.value,
    language
  );
  modelInstances.push(modelInstance);
  if(language === "javascript") {
    if(actionRegistration_minifier !== null) {
      actionRegistration_minifier.dispose();
    }
    if(actionRegistration_prettifier !== null) {
      actionRegistration_prettifier.dispose();
    }
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
    if(actionRegistration_minifier !== null) {
      actionRegistration_minifier.dispose();
    }
    if(actionRegistration_prettifier !== null) {
      actionRegistration_prettifier.dispose();
    }
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
    if(actionRegistration_minifier !== null) {
      actionRegistration_minifier.dispose();
    }
    if(actionRegistration_prettifier !== null) {
      actionRegistration_prettifier.dispose();
    }
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
    if(actionRegistration_minifier !== null) {
      actionRegistration_minifier.dispose();
    }
    if(actionRegistration_prettifier !== null) {
      actionRegistration_prettifier.dispose();
    }
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
  } else {
    if(actionRegistration_minifier !== null) {
      actionRegistration_minifier.dispose();
    }
    if(actionRegistration_prettifier !== null) {
      actionRegistration_prettifier.dispose();
    }
  }
}

function setLanguage(language) {
  var model = editor.getModel(); // create a model if the editor created from string value.
  monaco.editor.setModelLanguage(model, language);
  if(language === "javascript") {
    if(actionRegistration_minifier !== null) {
      actionRegistration_minifier.dispose();
    }
    if(actionRegistration_prettifier !== null) {
      actionRegistration_prettifier.dispose();
    }
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
    if(actionRegistration_minifier !== null) {
      actionRegistration_minifier.dispose();
    }
    if(actionRegistration_prettifier !== null) {
      actionRegistration_prettifier.dispose();
    }
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
    if(actionRegistration_minifier !== null) {
      actionRegistration_minifier.dispose();
    }
    if(actionRegistration_prettifier !== null) {
      actionRegistration_prettifier.dispose();
    }
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
    if(actionRegistration_minifier !== null) {
      actionRegistration_minifier.dispose();
    }
    if(actionRegistration_prettifier !== null) {
      actionRegistration_prettifier.dispose();
    }
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
  } else {
    if(actionRegistration_minifier !== null) {
      actionRegistration_minifier.dispose();
    }
    if(actionRegistration_prettifier !== null) {
      actionRegistration_prettifier.dispose();
    }
  }
}
function setValue(value) {
  editor.setValue(value);
}
$(document).on("shiny:connected", function() {
  Shiny.addCustomMessageHandler("modelInstance", setModel);
  Shiny.addCustomMessageHandler("language", setLanguage);
  Shiny.addCustomMessageHandler("value", setValue);
});
