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
    session$sendCustomMessage("value", content)
    ext <- tools::file_ext(input[["file"]][["name"]])
    language <- switch(
      tolower(ext),
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
      sql = "sql",
      svg = "xml",
      xml = "xml",
      yaml = "yaml"
    )
    if(is.null(language)) language <- "plaintext"
    updateSelectizeInput(session, "language", selected = language)
  })

  observeEvent(input[["language"]], {
    session$sendCustomMessage("language", input[["language"]])
  }, ignoreInit = TRUE)

})
