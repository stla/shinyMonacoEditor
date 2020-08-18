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
      conditionalPanel(
        "output.uploaded",
        selectizeInput(
          "language",
          label = "Language",
          choices = languages,
          options = list(
            placeholder = "Select language...",
            onInitialize = I('function() { this.setValue(""); }')
          )
        )
      )
    ),
    mainPanel(
      tags$div(
        id="container", style="width:100%; height:500px; border:1px solid grey;"
      )
    )
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
