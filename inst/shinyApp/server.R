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
      bash = "shell",
      bat = "bat",
      c = "c",
      "c++" = "cpp",
      clj = "clojure",
      cls = "apex",
      cmd = "bat",
      coffee = "coffeescript",
      cp = "cpp",
      cpp = "cpp",
      cs = "csharp",
      css = "css",
      d = "d",
      dockerfile = "dockerfile",
      fs = "fsharp",
      graphql = "graphql",
      h = "c",
      handlebars = "handlebars",
      hbs = "handlebars",
      hpp = "cpp",
      hs = "haskell",
      html = "html",
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
      rmd = "markdown",
      rest = "restructuredtext",
      rs = "rust",
      rst = "restructuredtext",
      ru = "ruby",
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
        dockerfile = "SuperTinyIcons/docker.svg",
        html = "freeicons/html.svg",
        go = "SuperTinyIcons/go.svg",
        java = "SuperTinyIcons/java.svg",
        javascript = "SuperTinyIcons/javascript.svg",
        json = "SuperTinyIcons/json.svg",
        julia = "SuperTinyIcons/julia.svg",
        kotlin = "SuperTinyIcons/kotlin.svg",
        markdown = "SuperTinyIcons/markdown.svg",
        php = "SuperTinyIcons/php.svg",
        python = "SuperTinyIcons/python.svg",
        r = "freeicons/r.svg",
        ruby = "SuperTinyIcons/ruby.svg",
        rust = "SuperTinyIcons/rust.svg",
        scss = "SuperTinyIcons/sass.svg",
        svg = "SuperTinyIcons/svg.svg",
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
      tags$div(HTML(input[["svg"]])),
      size = "s"
    ))
  })

})
