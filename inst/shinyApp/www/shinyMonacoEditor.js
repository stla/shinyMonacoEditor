monaco.editor.defineTheme("myTheme", {
  base: "hc-black",
  inherit: true,
  rules: [{ background: "161920" }],
  colors: {
    "editorIndentGuide.background": "#ffffff90",
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

setModel({
  value: [
    "function test(x) {",
		"\tconsole.log('Hello world!');",
		"}"
	].join("\n"),
	language: "javascript"
});

editor.setModel(modelInstances[0]);

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
    var unnamed = fileName.match(/^unnamed/) !== null && fileName.match(/\./) === null;
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

$("#container").show();
