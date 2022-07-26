$( ".hover" ).hover(function() {
  let parent =  $(this).parent()
  let child = $(this).parent().children().eq(1)

  if(parent.data('link') === 'true'){
    
    child.text(child.attr('id'))
    parent.data('link','false')
  }else{
    child.text($(this).attr('id'))
    parent.data('link','true')
  }
  
})