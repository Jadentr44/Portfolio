$( ".hover" ).hover(function() {
  let parent =  $(this).parent()
  let child = $(this).parent().children().eq(1)

  if(parent.data('link') === 'true'){
    child.css('color',"white")
    child.text(child.attr('id'))
    parent.data('link','false')
  }else{
    child.css('color',"#FF5656")
    child.text($(this).attr('id'))
    parent.data('link','true')
  }
  
})
console.log("saidy was a huge support in this <3")