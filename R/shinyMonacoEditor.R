#' @importFrom shiny tags
#' @export
#' @noRd
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

#' Title
#'
#' @importFrom shiny shinyAppDir
#' @export
shinyMonacoEditor <- function(){
  shinyAppDir(
    system.file("shinyApp", package = "shinyMonacoEditor")
  )
}
