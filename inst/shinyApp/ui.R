library(shinythemes)

languages <- c(
  "abap",
  "aes",
  "apex",
  "azcli",
  "bat",
  "c",
  "cameligo",
  "clojure",
  "coffeescript",
  "cpp",
  "csharp",
  "csp",
  "css",
  "dockerfile",
  "fsharp",
  "go",
  "graphql",
  "handlebars",
  "html",
  "ini",
  "java",
  "javascript",
  "json",
  "kotlin",
  "less",
  "lua",
  "markdown",
  "mips",
  "msdax",
  "mysql",
  "objective-c",
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
  "razor",
  "redis",
  "redshift",
  "restructuredtext",
  "ruby",
  "rust",
  "sb",
  "scheme",
  "scss",
  "shell",
  "sol",
  "sql",
  "st",
  "swift",
  "tcl",
  "twig",
  "typescript",
  "vb",
  "xml",
  "yaml"
)

shinyUI(fluidPage(
  theme = shinytheme("darkly"),
  tags$head(
    tags$script(src = "globalVariables.js"),
    tags$script(src = "docReady.js"),
    tags$script(src = "sass/sass.js"),
    tags$link(rel = "stylesheet", href = "chrome-tabs/chrome-tabs.css"),
    tags$link(rel = "stylesheet", href = "chrome-tabs/chrome-tabs-dark-theme.css"),
    tags$link(rel = "stylesheet", href = "chrome-tabs/mock-browser.css"),
    tags$script(src = "prettier/standalone.js"),
    tags$script(src = "prettier/parser-babel.js"),
    tags$script(src = "prettier/parser-html.js"),
    tags$script(src = "prettier/parser-markdown.js"),
    tags$script(src = "prettier/parser-postcss.js"),
    tags$script(src = "customMessageHandlers.js"),
    tags$link(rel = "stylesheet", href = "shinyMonacoEditor.css"),
    tags$link(
      rel="stylesheet", `data-name`="vs/editor/editor.main",
      href="monaco-editor/min/vs/editor/editor.main.css"
    ),
    tags$script(src = "terser/bundle.min.js"),
    tags$script(src = "html-minifier-terser/bundle.min.js"),
    tags$script(src = "clean-css/bundle.min.js"),
    tags$script(src = "functions.js"),
    tags$script(src = "bootstrap-flash-alert/bootstrap-flash-alert.js"),
    tags$link(rel = "stylesheet", href = "bootstrap-flash-alert/animate.css")
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
      selectizeInput(
        "language",
        label = "Language",
        choices = languages,
        selected = "javascript",
        options = list(
          placeholder = "Select language...",
          onInitialize = I('function() { selectize = this; }')
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
            tags$div(
              id = "container",
              style = "width: 100%; height: 500px; border: 1px solid grey; background-color: black; display: none;",
              div(id = "radials",
                  div(class = "radialred"),
                  div(class = "radialgreen"),
                  div(class = "radialblue")
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
    src = "chromeTabs.js"
  ),


  tags$script(
    HTML("var require = { paths: { 'vs': 'monaco-editor/min/vs' } };")
  ),
  tags$script(
    src="monaco-editor/min/vs/loader.js"
  ),
  tags$script(
    src="monaco-editor/min/vs/editor/editor.main.nls.js"
  ),
  tags$script(
    src="monaco-editor/min/vs/editor/editor.main.js"
  ),
  tags$script(src = "shinyMonacoEditor.js")

))
