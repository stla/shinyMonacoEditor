shinyServer(function(input, output, session){

  uploaded <- reactiveVal(FALSE)

  output[["uploaded"]] <- reactive({
    uploaded()
  })
  outputOptions(output, "uploaded", suspendWhenHidden = FALSE)

  observeEvent(input[["file"]], {
    uploaded(TRUE)

    content <- paste0(
      suppressWarnings(readLines(input[["file"]][["datapath"]])),
      collapse = "\n"
    )
    #    session$sendCustomMessage("value", content)
    ext <- tolower(tools::file_ext(input[["file"]][["name"]]))
    language <- switch(
      ext,
      c = "c",
      cpp = "cpp",
      css = "css",
      html = "html",
      js = "javascript",
      json = "json",
      md = "markdown",
      py = "python",
      r = "r",
      rmd = "markdown",
      scss = "scss",
      sql = "sql",
      svg = "xml",
      xml = "xml",
      yaml = "yaml"
    )
    if(is.null(language)) language <- "plaintext"

    favicon <- if(ext == "svg"){
      "SuperTinyIcons/svg.svg"
    }else{
      switch(
        language,
        css = "freeicons/css.svg",
        html = "freeicons/html.svg",
        go = "SuperTinyIcons/go.svg",
        java = "SuperTinyIcons/java.svg",
        javascript = "SuperTinyIcons/javascript.svg",
        json = "SuperTinyIcons/json.svg",
        markdown = "SuperTinyIcons/markdown.svg",
        php = "SuperTinyIcons/php.svg",
        python = "SuperTinyIcons/python.svg",
        r = "freeicons/r.svg",
        ruby = "SuperTinyIcons/ruby.svg",
        rust = "SuperTinyIcons/rust.svg",
        scss = "SuperTinyIcons/sass.svg"
      )
    }
    if(is.null(favicon)) favicon <- FALSE

    session$sendCustomMessage(
      "addChromeTab",
      list(
        title = input[["file"]][["name"]],
        icon = favicon
      )
    )

    session$sendCustomMessage("modelInstance",
                              list(value = content, language = language))
    #    updateSelectizeInput(session, "language", selected = language)
  })

  observeEvent(input[["language"]], {
    session$sendCustomMessage("language", input[["language"]])
  }, ignoreInit = TRUE)

})
