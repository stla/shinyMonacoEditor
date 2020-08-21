#' Title
#'
#' @importFrom shiny shinyAppDir
#' @export
shinyMonacoEditor <- function(){
  shinyAppDir(
    system.file("shinyApp", package = "shinyMonacoEditor")
  )
}
