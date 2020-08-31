#' Monaco Editor in Shiny
#' @description Launch a Shiny app with the Monaco editor.
#'
#' @importFrom shiny shinyAppDir
#' @export
shinyMonacoEditor <- function(){
  shinyAppDir(
    system.file("shinyApp", package = "shinyMonacoEditor")
  )
}
