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
        title = "Invalid file",
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
    #    session$sendCustomMessage("value", content)
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
      "SuperTinyIcons/react.svg"
    }else if(ext == "haml"){
      "SuperTinyIcons/haml.svg"
    }else{
      switch(
        language,
        c = "freeicons/c.svg",
        clojure = "SuperTinyIcons/clojure.svg",
        coffeescript = "SuperTinyIcons/coffeescript.svg",
        cpp = "freeicons/cpp.svg",
        css = "freeicons/css.svg",
        dart = "seeklogo/dart.svg",
        dockerfile = "SuperTinyIcons/docker.svg",
        erlang = "seeklogo/erlang.svg",
        fsharp = "seeklogo/fsharp.svg",
        haskell = "freeicons/haskell.svg",
        html = "freeicons/html.svg",
        go = "SuperTinyIcons/go.svg",
        java = "SuperTinyIcons/java.svg",
        javascript = "SuperTinyIcons/javascript.svg",
        json = "SuperTinyIcons/json.svg",
        julia = "SuperTinyIcons/julia.svg",
        kotlin = "SuperTinyIcons/kotlin.svg",
        lua = "seeklogo/lua.svg",
        markdown = "SuperTinyIcons/markdown.svg",
        ocaml = "OCaml_Sticker.svg",
        perl = "seeklogo/perl.svg",
        php = "seeklogo/php.svg",
        python = "SuperTinyIcons/python.svg",
        r = "freeicons/r.svg",
        ruby = "SuperTinyIcons/ruby.svg",
        rust = "SuperTinyIcons/rust.svg",
        scala = "seeklogo/scala.svg",
        scss = "SuperTinyIcons/sass.svg",
        svg = "SuperTinyIcons/svg.svg",
        swift = "seeklogo/swift.svg",
        typescript = "freeicons/typescript.svg",
        yaml = "yaml.svg"
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

    session$sendCustomMessage("modelInstance",
                              list(value = content, language = language))
    updateSelectizeInput(session, "language", selected = language)
  })

  observeEvent(input[["language"]], {
    print(input[["language"]])
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
      ooverwrite = TRUE
    )
    tmpFile <-
      tempfile(fileext = paste0(".", input[["clangFormat"]][["language"]]))
    writeLines(input[["clangFormat"]][["content"]], tmpFile)
    formatted <- system(paste0("clang-format ", tmpFile), intern = TRUE)
    print(formatted)
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
    print(report)
    session$sendCustomMessage(
      "addChromeTab",
      list(
        title = paste0(input[["cppCheck"]][["title"]], ".check"),
        icon = "cppcheck-gui.svg"
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
      "  $('#shiny-modal').show('fade');",
      "});",
      "$('.modal').css({position: 'relative'})"
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
      # tabindex = "-1",
      # `data-backdrop` = if(!easyClose) "static",
      # `data-keyboard` = if(!easyClose) "false",
      div(
        class = "modal-dialog",
        style = "width: 98%;",
        # class = switch(
        #   size,
        #   s = "modal-sm",
        #   m = NULL,
        #   l = "modal-lg"
        # ),
        div(
          class = "modal-content",
          if(!is.null(title))
            div(
              class = "modal-header",
              tags$h4(
                class = "modal-title",
                style = "float: left;",
                title
              ),
              actionButton(
                "toggleHeight", "Toggle full height",
                style = "float: right;",
                onclick = onclick_toggleHeight
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

  #TODO: bouton dans le header $('#markdown-it').css('height', 'fit-content');

  observeEvent(input[["html"]], {
    # showModal(
    #   modalDialog(
    #     tags$iframe(
    #       srcdoc = HTML(input[["html"]]),
    #       seamless = TRUE,
    #       #sandbox = TRUE,
    #       width = "100%",
    #       height = "500"
    #     ),
    #     size = "l"
    #   )
    # )
    # style <- HTML(
    #   "#markdown-it {",
    #   "  overflow: auto;",
    #   "  padding: 4px;",
    #   "  outline-style: solid;",
    #   "  outline-width: thin;",
    #   "  outline-color: silver;",
    #   "}",
    #   ".modal-dialog {",
    #   "  overflow: hidden auto;",
    #   "}",
    #   ".modal-dialog [class^='modal-'] {",
    #   "  overflow: hidden;",
    #   "}"
    # )

    # modal <- modalDialog(
    #   # tagList(
    #   #   tags$style(
    #   #     style
    #   #   ),
    #         div(HTML(input[["html"]]), id = "markdown-it"),
    #   # ),
    #   title = "",
    #   size = "l",
    #   easyClose = FALSE,
    #   fade = FALSE
    # )
    # modal[["children"]][[1L]][["children"]][[1L]][["children"]][[1]] <-
    #   tags$div(
    #     class = "modal-header",
    #     tags$div(
    #       style = "float: left;",
    #       tags$h4(
    #         class = "modal-title",
    #         "Rendered Markdown"
    #       )
    #     ),
    #     tags$div(
    #       style = "float: right;",
    # actionButton(
    #   "toggleHeight", "Toggle full height",
    #   onclick = '$("#shiny-modal .modal-dialog").toggleClass("hfit eightyVH");'
    # )
    #     )
    #   )
    # modal[["children"]][[3L]] <- tags$script(
    #   HTML('$("#shiny-modal .modal-dialog").addClass("xhfit");$(".modal-body").addClass("xrow");')
    # )
    # showModal(
    #   modal
    # )
    # jqui_resizable(
    #   ".modal-dialog",
    #   options = list(
    #     handles = "e, s",
    #     alsoResize = "#markdown-it"
    #   )
    # )
  })

  output[["html"]] <- renderUI({
    req(input[["html"]])
    Modal(
      div(HTML(input[["html"]]), id = "markdown-it"),
      title = "Rendered Markdown"
    )
  })

  observe(print(input[["expand"]]))

})
