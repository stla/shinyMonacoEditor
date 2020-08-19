function flashFunction(opts) {
  $.alert(opts.message, {
    title: opts.title || null,
    type: opts.type || "info",
    icon: opts.icon || false,
    withTime: opts.withTime || false,
    autoClose: opts.autoClose === false ? false : true,
    closeTime: opts.closeTime || 5000,
    animation: opts.animation || true,
    animShow: opts.animShow || "rotateInDownRight",
    animHide: opts.animHide || "bounceOutLeft",
    position: opts.position || ["bottom-right", [0, 0.01]],
    speed: "slow",
  });
}

function prettify(code, parser) {
  var prettyCode,
    error = null;
  try {
    prettyCode = prettier.format(code, {
      parser: parser,
      plugins: prettierPlugins
    });
    editor.setValue(prettyCode);
  } catch(err) {
    error = err.message;
    flashFunction({
      message: "<pre style='font-weight: bold; color: red;'>" + error + "</pre>",
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
}

function languageExt(language) {
  var ext = "." + language;
  switch(language) {
    case "javascript":
      ext = ".js";
      break;
    case "plaintext":
      ext = ".txt";
      break;
    case "python":
      ext = ".py";
      break;
    case "r":
      ext = ".R";
      break;
  }
  return ext;
}
