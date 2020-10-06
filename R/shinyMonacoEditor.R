#' Monaco Editor in Shiny
#' @description Launch a Shiny app with the Monaco editor.
#'
#' @param indentSize an integer, at least 2, the number of spaces of the
#'   indentation
#'
#' @importFrom shiny shinyAppDir
#' @export
#' @examples if(interactive()){
#'   shinyMonacoEditor()
#' }
shinyMonacoEditor <- function(indentSize = 2){
  if(!(is.numeric(indentSize) && length(indentSize) == 1L &&
       indentSize >= 2 && floor(indentSize) == indentSize)){
    stop("`indentSize` must be an integer greater or equal to 2.")
  }
  options(monaco.indentSize = indentSize)
  shinyAppDir(
    system.file("shinyApp", package = "shinyMonacoEditor")
  )
}
