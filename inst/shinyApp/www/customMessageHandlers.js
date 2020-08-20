var actionRegistration_minifier = null,
  actionRegistration_prettifier = null,
  actionRegistration_sass = null,
  actionRegistration_clangFormat = null,
  actionRegistration_cppCheck = null;

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
  if(actionRegistration_clangFormat !== null) {
    actionRegistration_clangFormat.dispose();
  }
  if(actionRegistration_cppCheck !== null) {
    actionRegistration_cppCheck.dispose();
  }
  if(language === "javascript") { /*                               javascript */
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
  } else if(language === "html") { /*                                    html */
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
  } else if(language === "css") { /*                                      css */
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
  } else if(language === "markdown") { /*                            markdown */
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
  } else if(language === "scss") { /*                                    scss */
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
            var fileName =
              $(chromeTabs.activeTabEl).find(".chrome-tab-title").html();
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
  } else if(language === "cpp") { /*                                      cpp */
    actionRegistration_clangFormat = editor.addAction({
      id: "clangFormatter",
      label: "Prettify",
      precondition: null,
      keybindingContext: null,
      contextMenuGroupId: "navigation",
      contextMenuOrder: 1.5,
      run: function(ed) {
        if(clangFormat) {
          Shiny.setInputValue("clangFormat", ed.getValue());
        } else {
          flashFunction({
            message: "Either <span style='font-style: monospace;'>clang-format</span> is not installed or it is not in the PATH variable.",
            title: "<span style='font-style: monospace;'>clang-format</span> not found",
            type: "info",
            icon: "glyphicon glyphicon-ban-circle",
            withTime: true,
            autoClose: true,
            closeTime: 10000,
            animation: true,
            animShow: "rotateInDownLeft",
            animHide: "bounceOutRight",
            position: ["bottom-left", [0, 0.01]],
            speed: "slow"
          });
        }
        return null;
      }
    });
    actionRegistration_cppCheck = editor.addAction({
      id: "cppCheck",
      label: "Check code",
      precondition: null,
      keybindingContext: null,
      contextMenuGroupId: "navigation",
      contextMenuOrder: 1.5,
      run: function(ed) {
        if(cppCheck) {
          var fileName = $(chromeTabs.activeTabEl).find(".chrome-tab-title").html();
          Shiny.setInputValue("cppCheck", {title: fileName, content: ed.getValue()});
        } else {
          flashFunction({
            message: "Either <span style='font-style: monospace;'>cppcheck</span> is not installed or it is not in the PATH variable.",
            title: "<span style='font-style: monospace;'>cppcheck</span> not found",
            type: "info",
            icon: "glyphicon glyphicon-ban-circle",
            withTime: true,
            autoClose: true,
            closeTime: 10000,
            animation: true,
            animShow: "rotateInDownLeft",
            animHide: "bounceOutRight",
            position: ["bottom-left", [0, 0.01]],
            speed: "slow"
          });
        }
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
  modelValues[modelInstance.id] = valueAndLanguage.value;
  console.log("modelInstance", modelInstance);
  actionRegistration(language);
  var ss = editor.saveViewState();
  console.log(ss);
}

function setLanguage(language) {
  var model = editor.getModel(); // create a model if the editor created from string value.
  monaco.editor.setModelLanguage(model, language);
  actionRegistration(language);
}

function setValue(value) {
  editor.setValue(value);
}

function setClangFormat(x) {
  clangFormat = x;
}

function setCppCheck(x) {
  cppCheck = x;
}

$(document).on("shiny:connected", function() {
  Shiny.addCustomMessageHandler("modelInstance", setModel);
  Shiny.addCustomMessageHandler("language", setLanguage);
  Shiny.addCustomMessageHandler("value", setValue);
  Shiny.addCustomMessageHandler("clangFormat", setClangFormat);
  Shiny.addCustomMessageHandler("cppCheck", setCppCheck);
});
