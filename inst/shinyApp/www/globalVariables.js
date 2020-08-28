var counter = 0,
  counter_unnamed = 0,
  editor,
  modelInstances = [],
  modelValues = {},
  modelStates = {},
  selectize,
  slider,
  bg_well,
  editorIsDisposed = false,
  clangFormat = false,
  cppCheck = false;

var selectize_render = {
  item: function(item, escape) {
    return "<div class='item'>" + escape(item.label) + "</div>";
  },
  option: function(item, escape) {
    var label = escape(item.label);
    var style = "style='display: inline-block;'";
    var cls = `class='icon-${item.value}'`;
    return `<div class='option'><div ${cls} ${style}></div><div ${style}>${label}</div></div>`;
  }
};
