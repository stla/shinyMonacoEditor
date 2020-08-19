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
  value: ["function test(x) {",
		"\tconsole.log('Hello world!');",
		"}"
	].join("\n"),
	language: "javascript"
});
//modelInstances.push(modelInstance);
editor.setModel(modelInstances[0]);
$("#container").show();
