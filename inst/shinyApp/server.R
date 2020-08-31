library(styler)
library(formatR)
library(uchardet)

shinyServer(function(input, output, session){

  uploaded <- reactiveVal(FALSE)

  output[["uploaded"]] <- reactive({
    uploaded()
  })
  outputOptions(output, "uploaded", suspendWhenHidden = FALSE)


  observeEvent(input[["file"]], {

    session$sendCustomMessage("changeBorders", "file")

    enc <- suppressWarnings(detect_file_enc(input[["file"]][["datapath"]]))

    if(is.na(enc)){
      flashMessage <- list(
        message = "This file is not of type 'text'.",
        title = "Invalid file!",
        type = "danger",
        icon = "glyphicon glyphicon-ban-circle",
        withTime = FALSE,
        closeTime = 10000,
        animShow = "flash",
        animHide = "backOutDown",
        position = list("center", list(0, 0))
      )
      session$sendCustomMessage("flashMessage", flashMessage)
      return(NULL)
    }
    uploaded(TRUE)

    content <- paste0(
      suppressWarnings(readLines(input[["file"]][["datapath"]])),
      collapse = "\n"
    )

    ext <- tolower(tools::file_ext(input[["file"]][["name"]]))
    language <- switch(
      ext,
      abap = "abap",
      ada = "ada",
      bash = "shell",
      bat = "bat",
      c = "c",
      "c++" = "cpp",
      clj = "clojure",
      cls = "apex",
      cmd = "bat",
      cob = "cobol",
      cobol = "cobol",
      coffee = "coffeescript",
      cp = "cpp",
      cpp = "cpp",
      cs = "csharp",
      css = "css",
      d = "d",
      dart = "dart",
      dockerfile = "dockerfile",
      erl = "erlang",
      ex = "elixir",
      f = "fortran",
      fs = "fsharp",
      graphql = "graphql",
      h = "c",
      handlebars = "handlebars",
      hbs = "handlebars",
      hpp = "cpp",
      hs = "haskell",
      html = "html",
      groovy = "groovy",
      ini = "ini",
      jade = "pug",
      java = "java",
      jl = "julia",
      js = "javascript",
      json = "json",
      jsx = "javascript",
      kt = "kotlin",
      less = "less",
      lua = "lua",
      m = "objective-c",
      md = "markdown",
      ml = "ocaml",
      mysql = "mysql",
      pas = "pascal",
      perl = "perl",
      pgsql = "pgsql",
      php = "php",
      pl = "perl",
      ps1 = "powershell",
      pug = "pug",
      py = "python",
      r = "r",
      razor = "razor",
      rhtml = "html",
      rkt = "racket",
      rmd = "markdown",
      rest = "restructuredtext",
      rs = "rust",
      rst = "restructuredtext",
      ru = "ruby",
      scala = "scala",
      scm = "scheme",
      scss = "scss",
      sh = "shell",
      sql = "sql",
      svg = "svg",
      swift = "swift",
      tcl = "tcl",
      ts = "typescript",
      twig = "twig",
      vb = "vb",
      xml = "xml",
      yaml = "yaml",
      yml = "yaml"
    )
    if(is.null(language)) language <- "plaintext"

    favicon <- if(ext == "jsx"){
      "icons/SuperTinyIcons/react.svg"
    }else if(ext == "haml"){
      "icons/SuperTinyIcons/haml.svg"
    }else{
      switch(
        language,
        c = "icons/freeicons/c.svg",
        clojure = "icons/SuperTinyIcons/clojure.svg",
        coffeescript = "icons/SuperTinyIcons/coffeescript.svg",
        cpp = "icons/freeicons/cpp.svg",
        css = "icons/freeicons/css.svg",
        dart = "icons/seeklogo/dart.svg",
        dockerfile = "icons/SuperTinyIcons/docker.svg",
        erlang = "icons/seeklogo/erlang.svg",
        fsharp = "icons/seeklogo/fsharp.svg",
        haskell = "icons/freeicons/haskell.svg",
        html = "icons/freeicons/html.svg",
        go = "icons/SuperTinyIcons/go.svg",
        java = "icons/SuperTinyIcons/java.svg",
        javascript = "icons/SuperTinyIcons/javascript.svg",
        json = "icons/SuperTinyIcons/json.svg",
        julia = "icons/SuperTinyIcons/julia.svg",
        kotlin = "icons/SuperTinyIcons/kotlin.svg",
        lua = "icons/seeklogo/lua.svg",
        markdown = "icons/SuperTinyIcons/markdown.svg",
        ocaml = "icons/OCaml_Sticker.svg",
        perl = "icons/seeklogo/perl.svg",
        php = "icons/seeklogo/php.svg",
        python = "icons/SuperTinyIcons/python.svg",
        r = "icons/freeicons/r.svg",
        ruby = "icons/SuperTinyIcons/ruby.svg",
        rust = "icons/SuperTinyIcons/rust.svg",
        scala = "icons/seeklogo/scala.svg",
        scss = "icons/SuperTinyIcons/sass.svg",
        svg = "icons/SuperTinyIcons/svg.svg",
        swift = "icons/seeklogo/swift.svg",
        typescript = "icons/freeicons/typescript.svg",
        yaml = "icons/yaml.svg"
      )
    }
    if(is.null(favicon)) favicon <- FALSE

    session$sendCustomMessage(
      "addChromeTab",
      list(
        title = input[["file"]][["name"]],
        icon = favicon,
        language = language
      )
    )

    session$sendCustomMessage(
      "modelInstance",
      list(value = content, language = language)
    )
    updateSelectizeInput(session, "language", selected = language)
  })

  observeEvent(input[["language"]], {
    if(input[["language"]] != ""){
      session$sendCustomMessage("language", input[["language"]])
    }
  }, ignoreInit = TRUE)

  session$sendCustomMessage(
    "clangFormat",
    unname(Sys.which("clang-format") != "")
  )

  observeEvent(input[["clangFormat"]], {
    tmpDir <- tempdir()
    file.copy(
      system.file("clang-format.txt", package = "shinyMonacoEditor"),
      file.path(tmpDir, ".clang-format"),
      overwrite = TRUE
    )
    tmpFile <-
      tempfile(fileext = paste0(".", input[["clangFormat"]][["language"]]))
    writeLines(input[["clangFormat"]][["content"]], tmpFile)
    formatted <- system(paste0("clang-format ", tmpFile), intern = TRUE)
    session$sendCustomMessage("value", paste0(formatted, collapse = "\n"))
  })

  session$sendCustomMessage(
    "cppCheck",
    unname(Sys.which("cppcheck") != "")
  )

  observeEvent(input[["cppCheck"]], {
    tmpDir <- tempdir()
    tmpFile <-
      tempfile(fileext = paste0(".", input[["cppCheck"]][["language"]]))
    writeLines(input[["cppCheck"]][["content"]], tmpFile)
    report <- system2(
      "cppcheck",
      args = c(
        "--quiet",
        sprintf("--language=%s",
                ifelse(input[["cppCheck"]][["language"]] == "c", "c", "c++")),
        "--template='{severity} {line}:{column} -> {message}\n{code}'",
        tmpFile
      ),
      stderr = TRUE, stdout = TRUE)
    session$sendCustomMessage(
      "addChromeTab",
      list(
        title = paste0(input[["cppCheck"]][["title"]], ".check"),
        icon = "icons/cppcheck-gui.svg"
      )
    )
    if(length(report) == 0L){
      report <- "No error found."
    }else{
      report <- paste0(report, collapse = "\n")
    }
    session$sendCustomMessage(
      "modelInstance",
      list(value = report, language = "plaintext")
    )
  })

  observeEvent(input[["styler"]], {
    styled <- paste0(style_text(input[["styler"]]), collapse = "\n")
    session$sendCustomMessage("value", styled)
  })

  observeEvent(input[["formatR"]], {
    formatted <- paste0(tidy_source(
      text = input[["formatR"]],
      indent = 2,
      arrow = TRUE,
      output = FALSE,
      width.cutoff = 80
    )[["text.tidy"]], collapse = "\n")
    session$sendCustomMessage("value", formatted)
  })

  observeEvent(input[["svg"]], {
    showModal(modalDialog(
      tags$div(
        style =
          "width: 50%; margin-left: auto; margin-right: auto; margin-top: 2%;",
        HTML(input[["svg"]])
      ),
      size = "l",
      easyClose = TRUE
    ))
  })

  Modal <- function(BODY, title = NULL){
    script <- HTML(
      "$('#mainPanel,#sidebar').animate({opacity: 0}, function() {",
      "  $('#shiny-modal').show('fade', function() {",
      "    var dialog = document.getElementById('modal-dialog');",
      "    var bottom = dialog.getBoundingClientRect().bottom;",
      "    if(bottom > window.innerHeight)",
      "     $('#toggleHeight').css('visibility', 'visible');",
      "  });",
      "});",
      "$('.modal').css({position: 'relative'});"
    )
    onclick_toggleHeight <- '$("#markdown-it").toggleClass("fiftyVH");'
    onclick_dismiss <- paste0(
      "Shiny.setInputValue('html', null);",
      "$('#mainPanel,#sidebar').animate({opacity: 1});"
    )
    div(
      id = "shiny-modal",
      style = "display: none;",
      class = "modal",
      div(
        id = "modal-dialog",
        class = "modal-dialog",
        style = "width: 98%;",
        div(
          class = "modal-content",
          div(
            class = "modal-header",
            if(!is.null(title)){
              tags$h4(
                class = "modal-title",
                style = "float: left;",
                title
              )
            },
            actionButton(
              "toggleHeight", "Toggle full height",
              style = "float: right; visibility: hidden;",
              onclick = onclick_toggleHeight
            ),
            tags$button(
              style = paste0(
                "position: absolute; top: 0; right: 5px; padding: 0; ",
                "background-color: transparent; border: none; line-height: 1;"
              ),
              type = "button", HTML("&times;"),
              onclick = onclick_dismiss
            )
          ),
          div(
            class = "modal-body",
            BODY
          ),
          div(
            class = "modal-footer",
            actionButton(
              "dismiss",
              "Dismiss",
              onclick = onclick_dismiss
            )
          )
        )
      ),
      tags$script(
        script
      )
    )
  }

  output[["html"]] <- renderUI({
    req(input[["html"]])
    Modal(
      div(HTML(input[["html"]]), id = "markdown-it"),
      title = "Rendered Markdown"
    )
  })

})
