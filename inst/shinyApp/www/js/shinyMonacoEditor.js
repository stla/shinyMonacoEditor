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

monaco.editor.defineTheme("myTheme", {
  base: "hc-black",
  inherit: true,
  rules: [{ background: "161920" }],
  colors: {
    "editorIndentGuide.background": "#ffffff50",
    "editorGutter.background": "#19197040"
  }
});
monaco.editor.setTheme("myTheme");
//monaco.editor.setTheme("hc-black");

editor = monaco.editor.create(document.getElementById("container"), {
  model: null,
	tabSize: 2,
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
