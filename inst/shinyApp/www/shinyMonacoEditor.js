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
var editor = monaco.editor.create(document.getElementById("container"), {
	value: [
		"function test(x) {",
		"\tconsole.log('Hello world!');",
		"}"
	].join("\n"),
	language: "javascript",
	tabSize: 2,
	automaticLayout: true
});
