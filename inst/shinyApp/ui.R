library(shinythemes)
library(shinyjqui)

languages <- list(
  Abap = "abap",
  ADA = "ada",
  AES = "aes",
  Apex = "apex",
  Azcli = "azcli",
  BAT = "bat",
  C = "c",
  Cameligo = "cameligo",
  Clojure = "clojure",
  Cobol = "cobol",
  CoffeeScript = "coffeescript",
  "C++" = "cpp",
  "C#" = "csharp",
  CSP = "csp",
  CSS = "css",
  D = "d",
  Dart = "dart",
  Docker = "dockerfile",
  Elixir = "elixir",
  Erlang = "erlang",
  Fortran = "fortran",
  "F#" = "fsharp",
  GO = "go",
  GraphQL = "graphql",
  Groovy = "groovy",
  Handlebars = "handlebars",
  Haskell = "haskell",
  HTML = "html",
  INI = "ini",
  Java = "java",
  JavaScript = "javascript",
  JSON = "json",
  Julia = "julia",
  Kotlin = "kotlin",
  Less = "less",
  Lua = "lua",
  Markdown = "markdown",
  MIPS = "mips",
  MSDAX = "msdax",
  MySQL = "mysql",
  "Objective C" = "objective-c",
  OCaml = "ocaml",
  Pascal = "pascal",
  Pascaligo = "pascaligo",
  Perl = "perl",
  PGSQL = "pgsql",
  PHP = "php",
  Text = "plaintext",
  Postiats = "postiats",
  PowerQuery = "powerquery",
  PowerShell = "powershell",
  PUG = "pug",
  Python = "python",
  R = "r",
  Racket = "racket",
  Razor = "razor",
  Redis = "redis",
  Redshift = "redshift",
  RestructuredText = "restructuredtext",
  Ruby = "ruby",
  Rust = "rust",
  SB = "sb",
  SBCL = "sbcl",
  Scala = "scala",
  Scheme = "scheme",
  SCSS = "scss",
  Shell = "shell",
  SOL = "sol",
  SQL = "sql",
  ST = "st",
  SVG = "svg",
  Swift = "swift",
  TCL = "tcl",
  Twig = "twig",
  TypeScript = "typescript",
  "Visual Basic" = "vb",
  XML = "xml",
  YAML = "yaml"
)

tinyCheckbox <- function(id, label){
  tags$div(class = "check-box-container",
           style = "display: inline-block;",
           tags$input(id = id, type = "checkbox",
                      class = "check-box-input"),
           tags$label(`for` = id, class = "check-box",
                      style = "margin-right: 0;"),
           tags$label(`for` = id,
                      tags$span(style = "color: whitesmoke;", label),
                      class = "check-box-label")
  )
}

App <- function(main){
  tagList(
    tags$div(
      id = "show-sidebar-container",
      actionButton(
        "show-sidebar", "Show sidebar",
        class = "btn-sm"
      )
    ),
    fluidRow(
      id = "main-container",
      # column(
      #   width = 1,
      #   fluidRow(
      #     column(
      #       width = 6
      #     ),
      #     column(
      #       width = 6,
      #       id = "show-sidebar-container",
      #       actionButton(
      #         "show-sidebar", "Show sidebar",
      #         class = "btn-sm",
      #         style = "float: right;"
      #       )
      #     )
      #   )
      # ),
      column(
        width = 12,
        id = "main",
        main
      )
    )
  )
}

shinyUI(fluidPage(
  theme = shinytheme("darkly"),
  tags$head(
    tags$script(src = "jquery-easyui/easyloader.js"),
    tags$link(rel = "stylesheet", href = "icons/freeicons/freeicons.css"),
    tags$script(src = "js/globalVariables.js"),
    tags$script(src = "js/docReady.js"),
    tags$script(src = "sass/sass.js"),
    tags$script(src = "svg-parser/svg-parser-bundle.js"),
    tags$script(src = "scale-that-svg/scale-that-svg-bundle.js"),
    tags$script(src = "word-wrap/word-wrap-bundle.js"),
    tags$script(src = "panzoom/panzoom.min.js"),
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
    tags$script(src = "js/customMessageHandlers.js"),
    tags$link(rel = "stylesheet", href = "css/shinyMonacoEditor.css"),
    tags$link(rel = "stylesheet", href = "css/iconsClasses.css"),
    tags$link(
      rel = "stylesheet", `data-name` = "vs/editor/editor.main",
      href = "monaco/vs/editor/editor.main.css"
    ),
    tags$script(src = "terser/bundle.min.js"),
    tags$script(src = "html-minifier-terser/bundle.min.js"),
    tags$script(src = "clean-css/bundle.min.js"),
    tags$script(src = "js/functions.js"),
    tags$script(src = "bootstrap-flash-alert/bootstrap-flash-alert.js"),
    tags$link(rel = "stylesheet", href = "bootstrap-flash-alert/animate.css"),
    tags$script(src = "markdown-it/markdown-it.min.js"),
    tags$script(
      HTML(
        "var executables = {",
        sprintf("  clangFormat: %s,", tolower(Sys.which("clang-format") != "")),
        sprintf("  cppCheck: %s,", tolower(Sys.which("cppcheck") != "")),
        sprintf("  brittany: %s,", tolower(Sys.which("brittany") != "")),
        sprintf("  xmllint: %s", tolower(Sys.which("xmllint") != "")),
        "};",
        sprintf("var tabSize = %d;", getOption("monaco.indentSize", 2))
      )
    )
  ),

  absolutePanel(
    uiOutput("html"),
    top = 0, left = 0, right = 0, bottom = 0
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

  App(
    sidebarLayout(
      sidebarPanel(
        id = "sidebar",
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
              onInitialize = I("function() { selectize = this; }"),
              render = I("selectize_render")
            )
          ),
          tags$hr(),
          sliderInput(
            "wrapWidth",
            label = tags$span(
              "Word wrap - width",
              `data-toggle` = "tooltip",
              `data-placement` = "top",
              title = paste0(
                "Word wrapping is available for languages 'Markdown' and 'Text'."
              )
            ),
            min = 10, max = 120, value = 80, step = 1,
            ticks = FALSE
          ),
          tags$hr(),
          tags$div(
            class = "long-tooltip-container",
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
          ),
          tags$div(
            style = "margin-top: -18px;"
          ),
          tags$hr(),
          tags$div(
            class = "short-tooltip-container",
            actionButton(
              "hide-sidebar", "Hide sidebar", class = "btn-sm btn-block",
              `data-toggle` = "tooltip",
              `data-placement` = "top",
              title = paste0(
                "You can hide this sidebar (to gain some place) and restore it ",
                "later."
              )
            )
          )
        )
      ),
      mainPanel(
        id = "mainPanel",
        tags$div(
          class = "surface",
          tags$div(
            class = "mock-browser",
            tags$div(
              class = "chrome-tabs",
              style = "--tab-content-margin: 9px;",
              tags$div(
                class = "chrome-tabs-content"
              ),
              tags$div(
                class = "chrome-tabs-bottom-bar"
              )
            ),
            tags$div(
              id = "editors",
              class = "mock-browser-content",
              jqui_resizable(
                tags$div(
                  id = "container",
                  class = "editor",
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
              ),
              jqui_resizable(
                tags$div(
                  id = "container2",
                  class = "editor",
                  tags$div(
                    id = "tabs",
                    class = "easyui-tabs"
                  )
                ),
                options = list(handles = "s")
              )
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
    src = "js/chromeTabs.js"
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
    HTML(
      "var require = {",
      "  paths: { 'vs': 'monaco/vs', 'tokenizer': 'monaco-ace-tokenizer' }",
      "};"
    )
  ),
  tags$script(
    src = "monaco/vs/loader.js"
  ),
  tags$script(
    src = "monaco/vs/editor/editor.main.nls.js"
  ),
  tags$script(
    src = "monaco/vs/editor/editor.main.js"
  ),

  tags$script(src = "js/shinyMonacoEditor.js")

))
