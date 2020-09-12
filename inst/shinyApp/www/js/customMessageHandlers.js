var actionRegistration_minifier = null,
  actionRegistration_prettifier = null,
  actionRegistration_sass = null,
  actionRegistration_clangFormat = null,
  actionRegistration_cppCheck = null,
  actionRegistration_styler = null,
  actionRegistration_formatR = null,
  actionRegistration_svgChecker = null,
  actionRegistration_svgParser = null,
  actionRegistration_svgViewer = null,
  actionRegistration_wordWrapper = null,
  actionRegistration_typescript = null,
  actionRegistration_formatCodeApi = null,
  actionRegistration_markdownit = null;

function prettifier(parser, label) {
  if(typeof label === "undefined") {
    label = "Prettify";
  }
  return {
    id: "prettifier",
    label: label,
    precondition: null,
    keybindingContext: null,
    contextMenuGroupId: "navigation",
    contextMenuOrder: 1.5,
    run: function(ed) {
      var bookmark = $("#bookmark").prop("checked");
      if(bookmark) {
        var modelId = ed.getModel().id;
        modelValues[modelId] = ed.getValue();
        $(chromeTabs.activeTabEl)
          .find(".chrome-tab-title")
            .css("font-style", "normal");
      }
      prettify(ed.getValue(), parser);
      return null;
    }
  };
}

function wordWrapper() {
  return {
    id: "wordWrapper",
    label: "Word wrap",
    precondition: null,
    keybindingContext: null,
    contextMenuGroupId: "navigation",
    contextMenuOrder: 1.5,
    run: function(ed) {
      var bookmark = $("#bookmark2").prop("checked");
      if(bookmark) {
        var modelId = ed.getModel().id;
        modelValues[modelId] = ed.getValue();
        $(chromeTabs.activeTabEl)
          .find(".chrome-tab-title")
            .css("font-style", "normal");
      }
      var text = ed.getValue();
      var newText = wordWrap(text, {
        width: parseInt(slider.input.value),
        indent: ""
      });
      ed.setValue(newText);
      return null;
    }
  };
}

function formatCodeApi(language, label) {
  if(typeof label === "undefined") {
    label = "Prettify";
  }
  var url;
  switch(language) {
    case "apex":
      url = "http://aozozo.com:600/apex";
      break;
    case "csharp":
      url = "http://aozozo.com:600/csharp";
      break;
    case "graphql":
      url = "http://aozozo.com:600/graphql";
      break;
    case "html":
      url = "http://aozozo.com:600/html";
      break;
    case "java":
      url = "http://aozozo.com:600/java";
      break;
    case "php":
      url = "http://aozozo.com:600/php";
      break;
    case "python":
      url = "http://www.zafuswitchout.com:3001/python";
      break;
    case "ruby":
      url = "http://www.zafuswitchout.com:3001/ruby";
      break;
    case "swift":
      url = "http://www.zafuswitchout.com:3001/swift";
      break;
  }
  return {
    id: "formatCodeApi",
    label: label,
    precondition: null,
    keybindingContext: null,
    contextMenuGroupId: "navigation",
    contextMenuOrder: 1.5,
    run: function(ed) {
      var bookmark = $("#bookmark").prop("checked");
      if(bookmark) {
        var modelId = ed.getModel().id;
        modelValues[modelId] = ed.getValue();
        $(chromeTabs.activeTabEl)
          .find(".chrome-tab-title")
            .css("font-style", "normal");
      }
      if(navigator.onLine) {
        $.post({
          url: url,
//          timeout: 0,
          contentType: "text/plain; charset=UTF-8",
          data: ed.getValue(),
          success: function(data) {
            var formattedCode = decodeURIComponent(data);
            ed.setValue(formattedCode);
          },
          error: function(e) {
            console.log(e);
            flashFunction({
              message: "Probable causes: your code is invalid or it is too big.",
              title: "Failed to prettify!",
              type: "danger",
              icon: "glyphicon glyphicon-ban-circle",
              withTime: true,
              autoClose: true,
              closeTime: 7000,
              animation: true,
              animShow: "rotateInDownLeft",
              animHide: "bounceOutRight",
              position: ["bottom-left", [0, 0.01]],
              speed: "slow"
            });
          }
        });
      } else {
        flashFunction({
          message: "This feature requires an Internet connection.",
          title: "No Internet connection!",
          type: "danger",
          icon: "freeicon freeicon-wifi-off",
          withTime: true,
          autoClose: true,
          closeTime: 7000,
          animation: true,
          animShow: "rotateInDownLeft",
          animHide: "bounceOutRight",
          position: ["bottom-left", [0, 0.01]],
          speed: "slow"
        });
      }
      return null;
    }
  };
}


function actionRegistration(language) {
  if(language === "plaintext" ||
      language === "markdown" ||
      language === undefined)
  {
    if(slider.options.disable) {
      setTimeout(function() {
        slider.update({disable: false});
        $("#wrapWidth").parent().effect("bounce", {distance: 10}, 1000);
      }, 0);
    }
  } else {
    slider.update({disable: true});
  }
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
  if(actionRegistration_styler !== null) {
    actionRegistration_styler.dispose();
  }
  if(actionRegistration_formatR !== null) {
    actionRegistration_formatR.dispose();
  }
  if(actionRegistration_svgParser !== null) {
    actionRegistration_svgParser.dispose();
  }
  if(actionRegistration_svgViewer !== null) {
    actionRegistration_svgViewer.dispose();
  }
  if(actionRegistration_svgChecker !== null) {
    actionRegistration_svgChecker.dispose();
  }
  if(actionRegistration_wordWrapper !== null) {
    actionRegistration_wordWrapper.dispose();
  }
  if(actionRegistration_typescript !== null) {
    actionRegistration_typescript.dispose();
  }
  if(actionRegistration_formatCodeApi !== null) {
    actionRegistration_formatCodeApi.dispose();
  }
  if(actionRegistration_markdownit !== null) {
    actionRegistration_markdownit.dispose();
  }
  var languages_formatCodeApi = [
    "apex",
    "csharp",
    "graphql",
    "php",
    "python",
    "ruby",
    "swift"
  ];
  if(language === "javascript") { /*                               javascript */
    actionRegistration_minifier = editor.addAction({
      id: "minifier",
      label: "Minify",
      precondition: null,
      keybindingContext: null,
      contextMenuGroupId: "navigation",
      contextMenuOrder: 1.5,
      run: function(ed) {
        var bookmark = $("#bookmark").prop("checked");
        if(bookmark) {
          var modelId = ed.getModel().id;
          modelValues[modelId] = ed.getValue();
          $(chromeTabs.activeTabEl)
            .find(".chrome-tab-title")
              .css("font-style", "normal");
        }
        var minified = Terser.minify(ed.getValue());
        minified.then(function(result) {
          ed.setValue(result.code);
        }).catch(function(error) {
          var err =
            error.message.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
              return "&#" + i.charCodeAt(0) + ";";
            });
          flashFunction({
            message: "<pre style='font-weight: bold; color: red;'>" +
              err + "</pre>",
            title: "An error occured!",
            type: "danger",
            icon: "glyphicon glyphicon-ban-circle",
            withTime: false,
            autoClose: false,
            closeTime: 6000,
            animation: true,
            animShow: "rotateInDownLeft",
            animHide: "bounceOutRight",
            position: ["bottom-left", [0, 0.01]],
            speed: "slow"
          });
        });
        return null;
      }
    });
    actionRegistration_prettifier =
      editor.addAction(prettifier("babel"));
  } else if(language === "html") { /*                                    html */
    actionRegistration_minifier = editor.addAction({
      id: "minifier",
      label: "Minify",
      precondition: null,
      keybindingContext: null,
      contextMenuGroupId: "navigation",
      contextMenuOrder: 1.5,
      run: function(ed) {
        var bookmark = $("#bookmark").prop("checked");
        if(bookmark) {
          var modelId = ed.getModel().id;
          modelValues[modelId] = ed.getValue();
          $(chromeTabs.activeTabEl)
            .find(".chrome-tab-title")
              .css("font-style", "normal");
        }
        var minified = HtmlMinifierTerser.minify(editor.getValue(), {
          minifyJS: true,
          minifyCSS: true,
          collapseWhitespace: true
        });
        ed.setValue(minified);
        return null;
      }
    });
    actionRegistration_prettifier =
      editor.addAction(prettifier("html"));
  } else if(language === "css") { /*                                      css */
    actionRegistration_minifier = editor.addAction({
      id: "minifier",
      label: "Minify",
      precondition: null,
      keybindingContext: null,
      contextMenuGroupId: "navigation",
      contextMenuOrder: 1.5,
      run: function(ed) {
        var bookmark = $("#bookmark").prop("checked");
        if(bookmark) {
          var modelId = ed.getModel().id;
          modelValues[modelId] = ed.getValue();
          $(chromeTabs.activeTabEl)
            .find(".chrome-tab-title")
              .css("font-style", "normal");
        }
        var minified = new CleanCSS().minify(editor.getValue());
        ed.setValue(minified.styles);
        return null;
      }
    });
    actionRegistration_prettifier =
      editor.addAction(prettifier("css"));
  } else if(language === "markdown") { /*                            markdown */
    actionRegistration_prettifier =
      editor.addAction(prettifier("markdown"));
    actionRegistration_wordWrapper =
      editor.addAction(wordWrapper());
    actionRegistration_markdownit = editor.addAction({
      id: "markdown-it",
      label: "View HTML rendering",
      precondition: null,
      keybindingContext: null,
      contextMenuGroupId: "navigation",
      contextMenuOrder: 1.5,
      run: function(ed) {
        try {
          var md = window.markdownit({
            html: true,
            linkify: true,
            typographer: true
          });
          var result = md.render(ed.getValue());
          Shiny.setInputValue("html", result, {priority: "event"});
        } catch(err) {
          var error =
            err.message.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
              return "&#" + i.charCodeAt(0) + ";";
            });
          flashFunction({
            message: "<pre style='font-weight: bold; color: red;'>" +
              error + "</pre>",
            title: "An error occured!",
            type: "danger",
            icon: "glyphicon glyphicon-ban-circle",
            withTime: false,
            autoClose: false,
            closeTime: 6000,
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
            addChromeTab({
              title: title,
              icon: "icons/freeicons/css.svg",
              language: "css"
            });
          }
        });
        return null;
      }
    });
    actionRegistration_prettifier =
      editor.addAction(prettifier("css"));
  } else if(["c","cpp","java"].indexOf(language) > -1) { /*      c, cpp, java */
    actionRegistration_clangFormat = editor.addAction({
      id: "clangFormatter",
      label: language === "java" ? "Prettify (clang-format)" : "Prettify",
      precondition: null,
      keybindingContext: null,
      contextMenuGroupId: "navigation",
      contextMenuOrder: 1.5,
      run: function(ed) {
        if(clangFormat) {
          var bookmark = $("#bookmark").prop("checked");
          if(bookmark) {
            var modelId = ed.getModel().id;
            modelValues[modelId] = ed.getValue();
            $(chromeTabs.activeTabEl)
              .find(".chrome-tab-title")
                .css("font-style", "normal");
          }
          Shiny.setInputValue("clangFormat", {
            language: language,
            content: ed.getValue()
          });
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
    if(language !== "java") { /* c or cpp */
      actionRegistration_cppCheck = editor.addAction({
        id: "cppCheck",
        label: "Check code",
        precondition: null,
        keybindingContext: null,
        contextMenuGroupId: "navigation",
        contextMenuOrder: 1.5,
        run: function(ed) {
          if(cppCheck) {
            var fileName =
              $(chromeTabs.activeTabEl).find(".chrome-tab-title").html();
            Shiny.setInputValue("cppCheck", {
              title: fileName,
              language: language,
              content: ed.getValue()
            });
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
    } else { /* java */
      actionRegistration_formatCodeApi =
        editor.addAction(
          formatCodeApi("java", "Prettify (formatCodeApi)")
        );
    }
  } else if(language === "r") { /*                                          r */
    actionRegistration_styler = editor.addAction({
      id: "styler",
      label: "Prettify (styler)",
      precondition: null,
      keybindingContext: null,
      contextMenuGroupId: "navigation",
      contextMenuOrder: 1.5,
      run: function(ed) {
        var bookmark = $("#bookmark").prop("checked");
        if(bookmark) {
          var modelId = ed.getModel().id;
          modelValues[modelId] = ed.getValue();
          $(chromeTabs.activeTabEl)
            .find(".chrome-tab-title")
              .css("font-style", "normal");
        }
        Shiny.setInputValue("styler", ed.getValue());
        return null;
      }
    });
    actionRegistration_formatR = editor.addAction({
      id: "formatR",
      label: "Prettify (formatR)",
      precondition: null,
      keybindingContext: null,
      contextMenuGroupId: "navigation",
      contextMenuOrder: 1.5,
      run: function(ed) {
        var bookmark = $("#bookmark").prop("checked");
        if(bookmark) {
          var modelId = ed.getModel().id;
          modelValues[modelId] = ed.getValue();
          $(chromeTabs.activeTabEl)
            .find(".chrome-tab-title")
              .css("font-style", "normal");
        }
        Shiny.setInputValue("formatR", ed.getValue());
        return null;
      }
    });
  } else if(language === "svg") { /*                                      svg */
    actionRegistration_svgParser = editor.addAction({
      id: "svgParser",
      label: "Parse to JSON",
      precondition: null,
      keybindingContext: null,
      contextMenuGroupId: "navigation",
      contextMenuOrder: 1.5,
      run: function(ed) {
        var svg = ed.getValue();
        var json;
        try {
          json = SVGparse.parse(svg);
          setModel({value: JSON.stringify(json, null, 2), language: "json"});
          var fileName =
            $(chromeTabs.activeTabEl).find(".chrome-tab-title").html();
          var fileSansExt = fileName.split('.').slice(0, -1).join('.');
          var title = (fileSansExt === "" ? fileName : fileSansExt) + ".json";
          addChromeTab({
            title: title,
            icon: "icons/SuperTinyIcons/json.svg",
            language: "json"
          });
        } catch(err) {
          var error =
            err.message.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
              return "&#" + i.charCodeAt(0) + ";";
            });
          flashFunction({
            message: "<pre style='font-weight: bold; color: red;'>" +
              error + "</pre>",
            title: "An error occured!",
            type: "danger",
            icon: "glyphicon glyphicon-ban-circle",
            withTime: false,
            autoClose: false,
            closeTime: 6000,
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
    actionRegistration_svgViewer = editor.addAction({
      id: "svgViewer",
      label: "View (and scale) SVG image",
      precondition: null,
      keybindingContext: null,
      contextMenuGroupId: "navigation",
      contextMenuOrder: 1.5,
      run: function(ed) {
        var svg = ed.getValue();
        try {
          var json = SVGparse.parse(svg);
          Shiny.setInputValue("svg", svg, {priority: "event"});
        } catch(err) {
          var error =
            err.message.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
              return "&#" + i.charCodeAt(0) + ";";
            });
          flashFunction({
            message: "<pre style='font-weight: bold; color: red;'>" +
              error + "</pre>",
            title: "This SVG is not valid!",
            type: "danger",
            icon: "glyphicon glyphicon-ban-circle",
            withTime: false,
            autoClose: false,
            closeTime: 6000,
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
    actionRegistration_svgChecker = editor.addAction({
      id: "svgChecker",
      label: "Check SVG validity",
      precondition: null,
      keybindingContext: null,
      contextMenuGroupId: "navigation",
      contextMenuOrder: 1.5,
      run: function(ed) {
        var svg = ed.getValue();
        try {
          var json = SVGparse.parse(svg);
          flashFunction({
            message: "No problem detected",
            title: "This SVG is valid!",
            type: "success",
            icon: "glyphicon glyphicon-check",
            withTime: true,
            autoClose: true,
            closeTime: 10000,
            animation: true,
            animShow: "rotateInDownLeft",
            animHide: "bounceOutRight",
            position: ["bottom-left", [0, 0.01]],
            speed: "slow"
          });
        } catch(err) {
          var error =
            err.message.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
              return "&#" + i.charCodeAt(0) + ";";
            });
          flashFunction({
            message: "<pre style='font-weight: bold; color: red;'>" +
              error + "</pre>",
            title: "This SVG is not valid!",
            type: "danger",
            icon: "glyphicon glyphicon-ban-circle",
            withTime: false,
            autoClose: false,
            closeTime: 6000,
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
    actionRegistration_prettifier =
      editor.addAction(prettifier("html"));
  } else if(language === "xml") { /*                                       xml */
    actionRegistration_prettifier =
      editor.addAction(prettifier("html"));
  } else if(language === "plaintext" || language === undefined) {/* plaintext */
    actionRegistration_wordWrapper =
      editor.addAction(wordWrapper());
  } else if(language === "typescript") { /*                        typescript */
    actionRegistration_prettifier =
      editor.addAction(prettifier("typescript"));
    actionRegistration_typescript = editor.addAction({
      id: "typescript",
      label: "Compile to JavaScript",
      precondition: null,
      keybindingContext: null,
      contextMenuGroupId: "navigation",
      contextMenuOrder: 1.5,
      run: function(ed) {
        if(navigator.onLine) {
          $.getScript("https://unpkg.com/typescript@latest/lib/typescriptServices.js")
            .done(function(script, textStatus) {
              if(textStatus === "success") {
                var tsCode = ed.getValue();
                try {
                  var jsCode = window.ts.transpile(tsCode);
                  setModel({value: jsCode, language: "javascript"});
                  var fileName = $(chromeTabs.activeTabEl)
                    .find(".chrome-tab-title")
                    .html();
                  var fileSansExt = fileName.split(".").slice(0, -1).join(".");
                  var title = (fileSansExt === "" ? fileName : fileSansExt) + ".js";
                  addChromeTab({
                    title: title,
                    icon: "icons/SuperTinyIcons/javascript.svg",
                    language: "javascript"
                  });
                } catch(err) {
                  var error =
                    err.message.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
                      return "&#" + i.charCodeAt(0) + ";";
                    });
                  flashFunction({
                    message:
                      "<pre style='font-weight: bold; color: red;'>" + error + "</pre>",
                    title: "An error occured!",
                    type: "danger",
                    icon: "glyphicon glyphicon-ban-circle",
                    withTime: false,
                    autoClose: false,
                    closeTime: 6000,
                    animation: true,
                    animShow: "rotateInDownLeft",
                    animHide: "bounceOutRight",
                    position: ["bottom-left", [0, 0.01]],
                    speed: "slow"
                  });
                }
              } else {
                flashFunction({
                  message: "textStatus: " + textStatus,
                  title: "A problem occured!",
                  type: "danger",
                  icon: "glyphicon glyphicon-ban-circle",
                  withTime: true,
                  autoClose: true,
                  closeTime: 7000,
                  animation: true,
                  animShow: "rotateInDownLeft",
                  animHide: "bounceOutRight",
                  position: ["bottom-left", [0, 0.01]],
                  speed: "slow"
                });
              }
            })
            .fail(function(jqxhr, settings, exception) {
              console.log("exception", exception);
              flashFunction({
                message: "I have no idea about this issue.",
                title: "Failed to load <span style='font-family: monospace;'>typescriptServices.js</span>!",
                type: "danger",
                icon: "glyphicon glyphicon-ban-circle",
                withTime: true,
                autoClose: true,
                closeTime: 7000,
                animation: true,
                animShow: "rotateInDownLeft",
                animHide: "bounceOutRight",
                position: ["bottom-left", [0, 0.01]],
                speed: "slow"
              });
            });
        } else {
          flashFunction({
            message: "This feature requires an Internet connection.",
            title: "No Internet connection!",
            type: "danger",
            icon: "freeicon freeicon-wifi-off",
            withTime: true,
            autoClose: true,
            closeTime: 7000,
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
  } else if(language === "yaml") { /*                                    yaml */
    actionRegistration_prettifier =
      editor.addAction(prettifier("yaml"));
  } else if(languages_formatCodeApi.indexOf(language) > -1) {/* formatCodeApi */
    actionRegistration_formatCodeApi =
      editor.addAction(formatCodeApi(language));
  }
}

function setModel(valueAndLanguage) {
  var language0 = valueAndLanguage.language;
  var language = language0 === "svg" ? "xml" : language0;
  var modelInstance = monaco.editor.createModel(
    valueAndLanguage.value,
    language
  );
  modelInstance.updateOptions({
    tabSize: 2,
    indentSize: 2
  });
  modelInstance.onDidChangeContent((event) => {
    $(chromeTabs.activeTabEl)
      .find(".chrome-tab-title")
        .css("font-style", "italic");
  });
  modelInstances.push(modelInstance);
  modelValues[modelInstance.id] = valueAndLanguage.value;
  actionRegistration(language0);
}

function setLanguage(language0) {
  var model = editor.getModel();
  var language = language0 === "svg" ? "xml" : language0;
  monaco.editor.setModelLanguage(model, language);
  actionRegistration(language0);
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

function changeBorders(id) {
  $(`label[for=${id}]`).next().find(".form-control")
    .css("border-bottom-right-radius", 0);
  $(`#${id}`).parent().css("border-bottom-left-radius", 0);
  $(".input-group").css({
    "border-bottom-left-radius": 0,
    "border-bottom-right-radius": 0
  });
}

function setTheme(theme) {
  monaco.editor.setTheme(theme);
}

$(document).on("shiny:connected", function() {
  Shiny.addCustomMessageHandler("modelInstance", setModel);
  Shiny.addCustomMessageHandler("language", setLanguage);
  Shiny.addCustomMessageHandler("value", setValue);
  Shiny.addCustomMessageHandler("clangFormat", setClangFormat);
  Shiny.addCustomMessageHandler("cppCheck", setCppCheck);
  Shiny.addCustomMessageHandler("flashMessage", flashFunction);
  Shiny.addCustomMessageHandler("changeBorders", changeBorders);
  Shiny.addCustomMessageHandler("setTheme", setTheme);
});
