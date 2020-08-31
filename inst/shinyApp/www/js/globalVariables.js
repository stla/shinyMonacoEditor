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
    var label = escape(item.label);
    var div = "class='item' style='display: block;'";
    var display = "display: inline-block;";
    var left = `style='${display} float: left;'`;
    var right_cls = `class='icon-${item.value}' `;
    var right_style = `'${display} float: right; transform: translateX(-25px);'`;
    var right = right_cls + "style=" + right_style;
    return `<div ${div}><div ${left}>${label}</div><div ${right}></div></div>`;
  },
  option: function(item, escape) {
    var label = escape(item.label);
    var div = "class='option'";
    var display = "display: inline-block;";
    var left = `style='${display} float: left;'`;
    var right = `class='icon-${item.value}' style='${display} float: right;'`;
    return `<div ${div}><div ${left}>${label}</div><div ${right}></div></div>`;
  }
};
