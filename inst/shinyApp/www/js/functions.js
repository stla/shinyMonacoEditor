function onLeaveTab() {
  var model = editor2.getModel();
  var modelInstance = monaco.editor.createModel(
    model.getValue(),
    model.getLanguageIdentifier().language
  );
  modelInstance.updateOptions({
    tabSize: 2,
    indentSize: 2
  });
  modelInstances2[model.id] = modelInstance;
}

function openEditor2() {
  if(editorsAreStacked) {
    $("#container,#container2").height(0.4 * window.innerHeight);
  }
  var model = editor.getModel();
  var modelClone = monaco.editor.createModel(
    model.getValue(),
    model.getLanguageIdentifier().language
  );
  modelClone.updateOptions({
    tabSize: 2,
    indentSize: 2
  });
  editor2.setModel(modelClone);
  $("#container2").show();
  editor2isShown = true;
  var title = $(chromeTabs.activeTabEl).find(".chrome-tab-title").html();
  var id = editor2.getModel().id;
  $("#tabs").tabs("add", {
    title: title,
    id: id,
    closable: true
  });
  setTimeout(function() {
    var $li = $("ul.tabs").children().last();
    var index = $li.index();
    $li.css("order", index);
    $li.attr("data-rank", index);
    $("ul.tabs").sortable("refresh");
  }, 0);
  modelInstances2[id] = modelClone;
}

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
      plugins: prettierPlugins,
      trailingComma: "none"
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

function ScaleSVG(scale) {
  scaleSVG(
    editor.getValue(),
    {scale: Math.max(scale,0.1)}
  )
  .then(function(scaledSVG) {
    setModel({value: scaledSVG, language: "svg"});
    var fileName =
      $(chromeTabs.activeTabEl).find(".chrome-tab-title").html();
    var fileSansExt = fileName.split('.').slice(0, -1).join('.');
    var title = (fileSansExt === "" ? fileName : fileSansExt) + "_scaled.svg";
    addChromeTab({
      title: title,
      icon: "icons/SuperTinyIcons/svg.svg",
      language: "svg"
    });
    $("#shiny-modal").modal("hide");
  });
}
