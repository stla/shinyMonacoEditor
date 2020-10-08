require(["tokenizer/monaco-tokenizer"], function(MonacoAceTokenizer) {
  MonacoAceTokenizer.AVAILABLE_LANGUAGES.forEach((lang) => {
    require(["tokenizer/definitions/" + lang], function(LangDefinition) {
      monaco.languages.register({
        id: lang,
      });
      MonacoAceTokenizer.registerRulesForLanguage(
        lang,
        new LangDefinition.default()
      );
    });
  });
});

monaco.editor.defineTheme("Dark", {
  base: "hc-black",
  inherit: true,
  rules: [
    {
      background: "161920"
    },
    {
      "fontStyle": "bold",
      "token": "keyword"
    }
  ],
  colors: {
    "editorIndentGuide.background": "#ffffff50",
    "editorGutter.background": "#19197040"
  }
});

monaco.editor.defineTheme("AllHallowsEve", {
  "base": "vs-dark",
  "inherit": true,
  "rules": [
    {
      "background": "000000",
      "token": ""
    },
    {
      "foreground": "ffffff",
      "background": "434242",
      "token": "text"
    },
    {
      "foreground": "ffffff",
      "background": "000000",
      "token": "source"
    },
    {
      "foreground": "9933cc",
      "token": "comment"
    },
    {
      "foreground": "3387cc",
      "token": "constant"
    },
    {
      "foreground": "cc7833",
      "token": "keyword"
    },
    {
      "foreground": "d0d0ff",
      "token": "meta.preprocessor.c"
    },
    {
      "fontStyle": "italic",
      "token": "variable.parameter"
    },
    {
      "foreground": "ffffff",
      "background": "9b9b9b",
      "token": "source comment.block"
    },
    {
      "foreground": "66cc33",
      "token": "string"
    },
    {
      "foreground": "aaaaaa",
      "token": "string constant.character.escape"
    },
    {
      "foreground": "000000",
      "background": "cccc33",
      "token": "string.interpolated"
    },
    {
      "foreground": "cccc33",
      "token": "string.regexp"
    },
    {
      "foreground": "cccc33",
      "token": "string.literal"
    },
    {
      "foreground": "555555",
      "token": "string.interpolated constant.character.escape"
    },
    {
      "fontStyle": "underline",
      "token": "entity.name.type"
    },
    {
      "fontStyle": "italic underline",
      "token": "entity.other.inherited-class"
    },
    {
      "fontStyle": "underline",
      "token": "entity.name.tag"
    },
    {
      "foreground": "c83730",
      "token": "support.function"
    },
    {
      "foreground": "FFA500",
      "token": "delimiter"
    },
    {
      "foreground": "FFA500",
      "token": "delimiter.html"
    }
  ],
  "colors": {
    "editor.foreground": "#FFFFFF",
    "editor.background": "#000000",
    "editor.selectionBackground": "#73597EE0",
    "editor.lineHighlightBackground": "#333300",
    "editorCursor.foreground": "#FFFFFF",
    "editorWhitespace.foreground": "#404040",
    "editorIndentGuide.background": "#ffffff50",
    "editorGutter.background": "#19197040"
  }
});

monaco.editor.defineTheme("Merbivore", {
  "base": "vs-dark",
  "inherit": true,
  "rules": [
    {
      "background": "161616",
      "token": ""
    },
    {
      "foreground": "ad2ea4",
      "fontStyle": "italic",
      "token": "comment"
    },
    {
      "foreground": "fc6f09",
      "token": "keyword"
    },
    {
      "foreground": "fc6f09",
      "token": "storage"
    },
    {
      "foreground": "fc83ff",
      "token": "entity.other.inherited-class"
    },
    {
      "foreground": "58c554",
      "token": "constant.numeric"
    },
    {
      "foreground": "1edafb",
      "token": "constant"
    },
    {
      "foreground": "8dff0a",
      "token": "constant.library"
    },
    {
      "foreground": "fc6f09",
      "token": "support.function"
    },
    {
      "foreground": "fdc251",
      "token": "constant.language"
    },
    {
      "foreground": "8dff0a",
      "token": "string"
    },
    {
      "foreground": "1edafb",
      "token": "support.type"
    },
    {
      "foreground": "8dff0a",
      "token": "support.constant"
    },
    {
      "foreground": "fc6f09",
      "token": "meta.tag"
    },
    {
      "foreground": "fc6f09",
      "token": "declaration.tag"
    },
    {
      "foreground": "fc6f09",
      "token": "entity.name.tag"
    },
    {
      "foreground": "ffff89",
      "token": "entity.other.attribute-name"
    },
    {
      "foreground": "ffffff",
      "background": "990000",
      "token": "invalid"
    },
    {
      "foreground": "519f50",
      "token": "constant.character.escaped"
    },
    {
      "foreground": "519f50",
      "token": "constant.character.escape"
    },
    {
      "foreground": "519f50",
      "token": "string source"
    },
    {
      "foreground": "519f50",
      "token": "string source.ruby"
    },
    {
      "foreground": "e6e1dc",
      "background": "144212",
      "token": "markup.inserted"
    },
    {
      "foreground": "e6e1dc",
      "background": "660000",
      "token": "markup.deleted"
    },
    {
      "background": "2f33ab",
      "token": "meta.diff.header"
    },
    {
      "background": "2f33ab",
      "token": "meta.separator.diff"
    },
    {
      "background": "2f33ab",
      "token": "meta.diff.index"
    },
    {
      "background": "2f33ab",
      "token": "meta.diff.range"
    },
    {
      "foreground": "FFD700",
      "token": "delimiter"
    },
    {
      "foreground": "FFD700",
      "token": "delimiter.html"
    }
  ],
  "colors": {
    "editor.foreground": "#E6E1DC",
    "editor.background": "#161616",
    "editor.selectionBackground": "#454545",
    "editor.lineHighlightBackground": "#333435",
    "editorCursor.foreground": "#FFFFFF",
    "editorWhitespace.foreground": "#404040",
    "editorIndentGuide.background": "#ffffff50",
    "editorGutter.background": "#19197040"
  }
});

monaco.editor.defineTheme("VibrantInk", {
  "base": "vs-dark",
  "inherit": true,
  "rules": [
    {
      "background": "000000",
      "token": ""
    },
    {
      "foreground": "ffffff",
      "background": "0f0f0f",
      "token": "text"
    },
    {
      "background": "000000",
      "token": "source.ruby.rails.embedded.html"
    },
    {
      "foreground": "ffffff",
      "background": "101010",
      "token": "text.html.ruby"
    },
    {
      "foreground": "ccff33",
      "token": "constant.numeric.ruby"
    },
    {
      "foreground": "ffffff",
      "background": "000000",
      "token": "source"
    },
    {
      "foreground": "9933cc",
      "token": "comment"
    },
    {
      "foreground": "339999",
      "token": "constant"
    },
    {
      "foreground": "ff6600",
      "token": "keyword"
    },
    {
      "foreground": "edf8f9",
      "token": "keyword.preprocessor"
    },
    {
      "foreground": "ffffff",
      "token": "keyword.preprocessor directive"
    },
    {
      "foreground": "ffcc00",
      "token": "entity.name.function"
    },
    {
      "foreground": "ffcc00",
      "token": "storage.type.function.js"
    },
    {
      "fontStyle": "italic",
      "token": "variable.parameter"
    },
    {
      "foreground": "772cb7",
      "background": "070707",
      "token": "source comment.block"
    },
    {
      "foreground": "ffffff",
      "token": "variable.other"
    },
    {
      "foreground": "999966",
      "token": "support.function.activerecord.rails"
    },
    {
      "foreground": "66ff00",
      "token": "string"
    },
    {
      "foreground": "aaaaaa",
      "token": "string constant.character.escape"
    },
    {
      "foreground": "000000",
      "background": "cccc33",
      "token": "string.interpolated"
    },
    {
      "foreground": "44b4cc",
      "token": "string.regexp"
    },
    {
      "foreground": "cccc33",
      "token": "string.literal"
    },
    {
      "foreground": "555555",
      "token": "string.interpolated constant.character.escape"
    },
    {
      "fontStyle": "underline",
      "token": "entity.name.class"
    },
    {
      "fontStyle": "underline",
      "token": "support.class.js"
    },
    {
      "fontStyle": "italic underline",
      "token": "entity.other.inherited-class"
    },
    {
      "foreground": "ff6600",
      "token": "meta.tag.inline.any.html"
    },
    {
      "foreground": "ff6600",
      "token": "meta.tag.block.any.html"
    },
    {
      "foreground": "99cc99",
      "fontStyle": "italic",
      "token": "entity.other.attribute-name"
    },
    {
      "foreground": "dde93d",
      "token": "keyword.other"
    },
    {
      "foreground": "ff6600",
      "token": "meta.selector.css"
    },
    {
      "foreground": "ff6600",
      "token": "entity.other.attribute-name.pseudo-class.css"
    },
    {
      "foreground": "ff6600",
      "token": "entity.name.tag.wildcard.css"
    },
    {
      "foreground": "ff6600",
      "token": "entity.other.attribute-name.id.css"
    },
    {
      "foreground": "ff6600",
      "token": "entity.other.attribute-name.class.css"
    },
    {
      "foreground": "999966",
      "token": "support.type.property-name.css"
    },
    {
      "foreground": "ffffff",
      "token": "keyword.other.unit.css"
    },
    {
      "foreground": "ffffff",
      "token": "constant.other.rgb-value.css"
    },
    {
      "foreground": "ffffff",
      "token": "constant.numeric.css"
    },
    {
      "foreground": "ffffff",
      "token": "support.function.event-handler.js"
    },
    {
      "foreground": "ffffff",
      "token": "keyword.operator.js"
    },
    {
      "foreground": "cccc66",
      "token": "keyword.control.js"
    },
    {
      "foreground": "ffffff",
      "token": "support.class.prototype.js"
    },
    {
      "foreground": "ff6600",
      "token": "object.property.function.prototype.js"
    },
    {
      "foreground": "FFBF00",
      "token": "delimiter"
    },
    {
      "foreground": "FFBF00",
      "token": "delimiter.html"
    }
  ],
  "colors": {
    "editor.foreground": "#FFFFFF",
    "editor.background": "#000000",
    "editor.selectionBackground": "#35493CE0",
    "editor.lineHighlightBackground": "#333300",
    "editorCursor.foreground": "#FFFFFF",
    "editorWhitespace.foreground": "#404040",
    "editorIndentGuide.background": "#ffffff50",
    "editorGutter.background": "#19197040"
  }
});

monaco.editor.setTheme("Dark");
//monaco.editor.setTheme("hc-black");

editor = monaco.editor.create(document.getElementById("container"), {
  model: null,
	tabSize: tabSize,
	automaticLayout: true
});

var interval = setInterval(function() {
  if(slider) {
    clearInterval(interval);
    setModel({
      value: [
        "// try to hover the 'zzz' argument",
        "function hello(zzz) {",
        " alert('Hello world!');",
        "}",
        "",
        "// right-click on 'hello' and 'Go to Definition'",
        "$('#sayHello').on(\"click\", function(){",
        "      hello();",
        "})",
        "",
        "// right-click and try 'Prettify' and 'Minify'",
        "var json = [",
        "      {array: [0,1,2]}, ",
        "      {f: function(arg){return `Call: f(${arg})`}}",
        "]",
        "",
        "/* ",
        "Before doing a change, you can bookmark the ",
        "current contents to restore it later: use the ",
        "context menu or the keyboard shortcuts.",
        "*/ ",
        "",
        "/*",
        "You can hide the sidebar to gain some space, and ",
        "you can vertically resize the tab.",
        "*/",
        "",
      ].join("\n"),
      language: "javascript",
    });
    editor.setModel(modelInstances[0]);
    $("#container").show("fade", 1000);
    $(".well").show("fade", 2000);
  }
}, 50);

editor.addAction({
  id: "save",
  label: "Save",
  keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S],
  precondition: null,
  keybindingContext: null,
  contextMenuGroupId: "navigation",
  contextMenuOrder: 0,
  run: function(ed) {
    var fileName = $(chromeTabs.activeTabEl).find(".chrome-tab-title").html();
    var unnamed =
      fileName.match(/^unnamed/) !== null && fileName.match(/\./) === null;
    if(unnamed) {
      var language = ed.getModel().getLanguageIdentifier().language;
      var ext = languageExt(language);
      fileName += ext;
    }
    const a = document.createElement("a");
    document.body.append(a);
    a.download = fileName;
    a.href = "data:text/plain;base64," + btoa(ed.getValue());
    a.click();
    a.remove();
    return null;
  }
});

editor.addAction({
  id: "bookmark",
  label: "Bookmark",
  keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_B],
  precondition: null,
  keybindingContext: null,
  contextMenuGroupId: "navigation",
  contextMenuOrder: 1.5,
  run: function(ed) {
    var modelId = ed.getModel().id;
    modelValues[modelId] = ed.getValue();
    $(chromeTabs.activeTabEl)
      .find(".chrome-tab-title")
        .css("font-style", "normal");
    return null;
  }
});

editor.addAction({
  id: "restore",
  label: "Restore",
  keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_R],
  precondition: null,
  keybindingContext: null,
  contextMenuGroupId: "navigation",
  contextMenuOrder: 1.5,
  run: function(ed) {
    var modelId = ed.getModel().id;
    ed.setValue(modelValues[modelId]);
    $(chromeTabs.activeTabEl)
      .find(".chrome-tab-title")
        .css("font-style", "normal");
    return null;
  }
});

editor.addAction({
  id: "theme",
  label: "Change theme",
  precondition: null,
  keybindingContext: null,
  contextMenuGroupId: "navigation",
  contextMenuOrder: 1.5,
  run: function(ed) {
    var theme = ed._themeService.getTheme().themeName;
    Shiny.setInputValue("theme", theme, {priority: "event"});
    return null;
  }
});

editor.addAction({
  id: "newEditor",
  label: "Open in new editor",
  precondition: null,
  keybindingContext: null,
  contextMenuGroupId: "navigation",
  contextMenuOrder: 0,
  run: function(ed) {
    openEditor2();
    return null;
  }
});

editor2 = monaco.editor.create(document.getElementById("container2"), {
  model: null,
	tabSize: tabSize,
	automaticLayout: true
});

editor2.onDidBlurEditorText(function() {
  onLeaveTab();
});

editor2.addAction({
  id: "move",
  label: "Move this editor",
  precondition: null,
  keybindingContext: null,
  contextMenuGroupId: "navigation",
  contextMenuOrder: 0,
  run: function(ed) {
    var display = $("#editors").css("display");
    var h = 0.8 * window.innerHeight;
    editorsHeight = h;
    if(/flex/.test(display)) { // flex, ms-flex, etc
      $("#editors").css("display", "block");
      editorsAreStacked = true;
      $("#container,#container2").css("width", "100%");
      $("#container,#container2").height(h/2);
      $("#container,#container2").resizable("enable");
      $("#editors").resizable("disable");
    } else {
      $("#editors").css("display", "flex");
      editorsAreStacked = false;
      $("#container,#container2").css("width", "calc(50% + 1px)");
      $("#container,#container2").height(h);
      $("#container,#container2").resizable("disable");
      $("#tabs .tabs-header,#tabs .tabs-wrap").css("width", "100%");
      $("#editors").resizable("enable");
    }
    $("#tabs").tabs("resize");
    return null;
  }
});
