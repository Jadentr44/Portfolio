$( ".hover" ).hover(function() {
  let parent =  $(this).parent()
  let child = $(this).parent().children().eq(1)

  if(parent.data('link') === 'true'){
    child.css('color',"#F7F4EE")
    child.text(child.attr('id'))
    parent.data('link','false')
  }else{
    child.css('color',"#FF5656")
    child.text($(this).attr('id'))
    parent.data('link','true')
  }
  
})

$( ".skill" ).hover(function() {
  if($('.skillName').text() == ''){

    let skillName = $(this).attr("id")
    $('.skillName').text(skillName)
  }else{
    $('.skillName').text('')
  }
})