library(shinythemes)
library(shinyjqui)

languages <- c(
  "abap",
  "ada",
  "aes",
  "apex",
  "azcli",
  "bat",
  "c",
  "cameligo",
  "clojure",
  "cobol",
  "coffeescript",
  "cpp",
  "csharp",
  "csp",
  "css",
  "d",
  "dart",
  "dockerfile",
  "elixir",
  "erlang",
  "fortran",
  "fsharp",
  "go",
  "graphql",
  "groovy",
  "handlebars",
  "haskell",
  "html",
  "ini",
  "java",
  "javascript",
  "json",
  "julia",
  "kotlin",
  "less",
  "lua",
  "markdown",
  "mips",
  "msdax",
  "mysql",
  "objective-c",
  "ocaml",
  "pascal",
  "pascaligo",
  "perl",
  "pgsql",
  "php",
  "plaintext",
  "postiats",
  "powerquery",
  "powershell",
  "pug",
  "python",
  "r",
  "racket",
  "razor",
  "redis",
  "redshift",
  "restructuredtext",
  "ruby",
  "rust",
  "sb",
  "sbcl",
  "scala",
  "scheme",
  "scss",
  "shell",
  "sol",
  "sql",
  "st",
  "svg",
  "swift",
  "tcl",
  "twig",
  "typescript",
  "vb",
  "xml",
  "yaml"
)

tinyCheckbox <- function(id, label){
  tags$div(class = "check-box-container",
           style = "display: inline-block;",
           tags$input(id = id, type = "checkbox",
                      class = "check-box-input"),
           tags$label(`for` = id, class = "check-box",
                      style = "margin-right: 0;"),
           tags$label(`for` = id,
                      tags$span(style="color: whitesmoke;", label),
                      class = "check-box-label")
  )
}


shinyUI(fluidPage(
  theme = shinytheme("darkly"),
  tags$head(
    tags$script(src = "globalVariables.js"),
    tags$script(src = "docReady.js"),
    tags$script(src = "sass/sass.js"),
    tags$script(src = "svg-parser/svg-parser-bundle.js"),
    tags$script(src = "word-wrap/word-wrap-bundle.js"),
    tags$link(rel = "stylesheet", href = "chrome-tabs/chrome-tabs.css"),
    tags$link(rel = "stylesheet", href = "chrome-tabs/chrome-tabs-dark-theme.css"),
    tags$link(rel = "stylesheet", href = "chrome-tabs/mock-browser.css"),
    tags$script(src = "prettier/standalone.js"),
    tags$script(src = "prettier/parser-babel.js"),
    tags$script(src = "prettier/parser-html.js"),
    tags$script(src = "prettier/parser-markdown.js"),
    tags$script(src = "prettier/parser-postcss.js"),
    tags$script(src = "prettier/parser-typescript.js"),
    tags$script(src = "prettier/parser-yaml.js"),
    tags$script(src = "customMessageHandlers.js"),
    tags$link(rel = "stylesheet", href = "shinyMonacoEditor.css"),
    tags$link(
      rel="stylesheet", `data-name`="vs/editor/editor.main",
      href="monaco/vs/editor/editor.main.css"
    ),
    tags$script(src = "terser/bundle.min.js"),
    tags$script(src = "html-minifier-terser/bundle.min.js"),
    tags$script(src = "clean-css/bundle.min.js"),
    tags$script(src = "functions.js"),
    tags$script(src = "bootstrap-flash-alert/bootstrap-flash-alert.js"),
    tags$link(rel = "stylesheet", href = "bootstrap-flash-alert/animate.css")
  ),

  tags$div(
    class = "background",
    tags$div(
      id = "stars",
      tags$div(id = "stars1"),
      tags$div(id = "stars2"),
      tags$div(id = "stars3")
    )
  ),

  br(),

  sidebarLayout(
    sidebarPanel(
      tags$div(class = "vscode-logo", title = "VS Code"),
      fileInput(
        "file",
        "Choose a file"
      ),
      tags$label("Or open a new tab"),
      actionButton("newTab", "New tab", class = "btn-block"),
      tags$div(
        id = "options",
        tags$hr(),
        selectizeInput(
          "language",
          label = "Language",
          choices = languages,
          selected = "javascript",
          options = list(
            placeholder = "Select language...",
            onInitialize = I("function() { selectize = this; }")
          )
        ),
        tags$hr(),
        sliderInput(
          "wrapWidth",
          label = "Word wrap - width",
          min = 10, max = 120, value = 80, step = 1,
          ticks = FALSE
        ),
        tags$hr(),
        tags$label(
          "Bookmark",
          `data-toggle` = "tooltip",
          `data-placement` = "top",
          title = paste0(
            "You can bookmark a tab with the context menu or by pressing ",
            "'Ctrl+b', and restore it with the context menu or by pressing ",
            "'Ctrl+r'. The title of a non-bookmarked tab appears in italic. ",
            "A new tab is automatically bookmarked."
          )
        ),
        tags$div(
          tinyCheckbox(
            "bookmark",
            "before prettifying/minifying"
          ),
          tags$div(
            style = "margin-top: -18px;"
          )
        ),
        tinyCheckbox(
          "bookmark2",
          "before wrapping"
        )
      )
    ),
    mainPanel(
      tags$div(
        class = "surface",
        tags$div(
          class = "mock-browser",
          tags$div(
            class = "chrome-tabs",
            style = "--tab-content-margin: 9px",
            tags$div(
              class = "chrome-tabs-content"
            ),
            tags$div(
              class = "chrome-tabs-bottom-bar"
            )
          ),
          tags$div(
            class = "mock-browser-content",
            jqui_resizable(
              tags$div(
                id = "container",
                style = "width: 100%; height: 500px; border: 1px solid grey; background-color: black; display: none;",
                tags$div(
                  class = "background",
                  tags$div(
                    class = "delight"
                  ),
                  tags$div(
                    id = "radials",
                    tags$div(class = "radialred"),
                    tags$div(class = "radialgreen"),
                    tags$div(class = "radialblue")
                  )
                )
              ),
              options = list(handles = "s")
            )
          )
        )
      )
    )
  ),

  tags$script(
    src = "chrome-tabs/draggabilly.pkgd.min.js"
  ),
  tags$script(
    src = "chrome-tabs/chrome-tabs.js"
  ),
  tags$script(
    src = "chromeTabs.js"
  ),

  tags$script(
    src = "monaco-ace-tokenizer/monaco-tokenizer.js"
  ),
  tags$script(
    src = "monaco-ace-tokenizer/definitions/ada.js"
  ),
  tags$script(
    src = "monaco-ace-tokenizer/definitions/cobol.js"
  ),
  tags$script(
    src = "monaco-ace-tokenizer/definitions/d.js"
  ),
  tags$script(
    src = "monaco-ace-tokenizer/definitions/dart.js"
  ),
  tags$script(
    src = "monaco-ace-tokenizer/definitions/elixir.js"
  ),
  tags$script(
    src = "monaco-ace-tokenizer/definitions/erlang.js"
  ),
  tags$script(
    src = "monaco-ace-tokenizer/definitions/fortran.js"
  ),
  tags$script(
    src = "monaco-ace-tokenizer/definitions/groovy.js"
  ),
  tags$script(
    src = "monaco-ace-tokenizer/definitions/haskell.js"
  ),
  tags$script(
    src = "monaco-ace-tokenizer/definitions/julia.js"
  ),
  tags$script(
    src = "monaco-ace-tokenizer/definitions/ocaml.js"
  ),
  tags$script(
    src = "monaco-ace-tokenizer/definitions/racket.js"
  ),
  tags$script(
    src = "monaco-ace-tokenizer/definitions/sbcl.js"
  ),
  tags$script(
    src = "monaco-ace-tokenizer/definitions/scala.js"
  ),

  tags$script(
    HTML("var require = { paths: { 'vs': 'monaco/vs', 'tokenizer': 'monaco-ace-tokenizer' } };")
  ),
  tags$script(
    src="monaco/vs/loader.js"
  ),
  tags$script(
    src="monaco/vs/editor/editor.main.nls.js"
  ),
  tags$script(
    src="monaco/vs/editor/editor.main.js"
  ),

  tags$script(src = "shinyMonacoEditor.js")

))
