library(styler)
library(formatR)
library(uchardet)

svgFooter <- function(){
  tagList(
    fluidRow(
      column(
        width = 6,
        tags$div(
          class = "scaling-group",
          tags$div(
            class = "scaling",
            tags$input(
              id = "scale", type = "number", class = "form-control input-sm",
              value = 1, min = 0.1, max = NA, step = 0.1
            )
          ),
          tags$div(
            class = "scaling",
            tags$button(
              id = "scaleSVG", "Scale image", class = "btn btn-block btn-sm",
              onclick = 'ScaleSVG($("#scale").val());'
            )
          )
        )
      ),
      column(
        width = 6,
        modalButton("Dismiss")
      )
    ),
    fluidRow(
      column(
        width = 12,
        tags$p(
          style = "text-align: left;",
          tags$span(
            "SVG scaling has some limitations. You can "
          ),
          tags$a(
            href = "https://github.com/elrumordelaluz/scale-that-svg/issues",
            "fill an issue"
          ),
          tags$span(
            " if you encounter a problem."
          )
        )
      )
    )
  )
}

# svgCarousel <- function(svg1, svg2){
#   tags$div(
#     class = "slider-container",
#     tags$div(
#       class = "slider",
#       tags$div(
#         class = "slider__item",
#         HTML(svg1)
#       ),
#       if(!is.null(svg2)){
#         tags$div(
#           class = "slider__item",
#           HTML(svg2)
#         )
#       }
#     ),
#     tags$div(
#       class = "slider__switch slider__switch--prev",
#       `data-ikslider-dir` = "prev",
#       tags$span()
#     ),
#     tags$div(
#       class = "slider__switch slider__switch--next",
#       `data-ikslider-dir` = "next",
#       tags$span()
#     )
#   )
# }

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

    contentLines <- suppressWarnings(readLines(input[["file"]][["datapath"]]))

    if(language == "r"){
      roxygenLines <- grep("^#'", contentLines)
      for(i in roxygenLines){
        if(!grepl(" $", contentLines[i])){
          contentLines[i] <- paste0(contentLines[i], " ")
        }
      }
    }

    content <- paste0(contentLines, collapse = "\n")

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
    tryCatch({
      styled <- paste0(style_text(input[["styler"]]), collapse = "\n")
      session$sendCustomMessage("value", styled)
    }, error = function(e){
      flashMessage <- list(
        message = "An error occured",
        title = "Failed to prettify!",
        type = "danger",
        icon = "glyphicon glyphicon-ban-circle",
        withTime = TRUE,
        closeTime = 10000,
        animShow = "flash",
        animHide = "backOutDown",
        position = list("center", list(0, 0))
      )
      session$sendCustomMessage("flashMessage", flashMessage)
    })
  })

  observeEvent(input[["formatR"]], {
    tryCatch({
      formatted <- paste0(tidy_source(
        text = input[["formatR"]],
        indent = 2,
        arrow = TRUE,
        output = FALSE,
        width.cutoff = 80
      )[["text.tidy"]], collapse = "\n")
      session$sendCustomMessage("value", formatted)
    }, error = function(e){
      flashMessage <- list(
        message = "An error occured",
        title = "Failed to prettify!",
        type = "danger",
        icon = "glyphicon glyphicon-ban-circle",
        withTime = TRUE,
        closeTime = 10000,
        animShow = "flash",
        animHide = "backOutDown",
        position = list("center", list(0, 0))
      )
      session$sendCustomMessage("flashMessage", flashMessage)
    })
  })

  # output[["svg"]] <- renderUI({
  #   req(input[["svg"]])
  #   svgCarousel(input[["svg"]], input[["svgScaled"]])
  # })

  observeEvent(input[["svg"]], {
    showModal(modalDialog(
      tagList(
        tags$div(
          id = "svg",
          HTML(input[["svg"]])
        ),
        tags$script('panzoom(document.getElementById("svg"));')
      ),
      size = "l",
      easyClose = FALSE,
      title = "You can zoom and pan the image.",
      footer = svgFooter()
    ))
  })

  Modal <- function(BODY, title = NULL){
    script <- HTML(
      "$('#mainPanel,#sidebar').animate({opacity: 0}, function() {",
      "  $('#my-modal').show('fade', function() {",
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
      id = "my-modal",
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

  observeEvent(input[["theme"]], {
    showModal(modalDialog(
      selectInput(
        "setTheme",
        NULL,
        choices = list(
          "All Hallows Eve" = "AllHallowsEve",
          "Dark" = "Dark",
          "Merbivore" = "Merbivore",
          "Vibrant Ink" = "VibrantInk"
        ),
        selected = input[["theme"]]
      ),
      title = "Select a theme",
      footer = NULL,
      easyClose = TRUE,
      size = "s"
    ))
  })

  observeEvent(input[["setTheme"]], {
    session$sendCustomMessage("setTheme", input[["setTheme"]])
  })

})
