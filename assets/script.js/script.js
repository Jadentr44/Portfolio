//animated background

// init
var maxx = document.body.clientWidth;
var maxy = document.body.clientHeight;
var halfx = maxx / 2;
var halfy = maxy / 2;
var canvas = document.createElement("canvas");
document.body.appendChild(canvas);
canvas.width = maxx;
canvas.height = maxy;
var context = canvas.getContext("2d");
var dotCount = 200;
var dots = [];
// create dots
for (var i = 0; i < dotCount; i++) {
  dots.push(new dot());
}

// dots animation
function render() {
  context.fillStyle = "#000000";
  context.fillRect(0, 0, maxx, maxy);
  for (var i = 0; i < dotCount; i++) {
    dots[i].draw();
    dots[i].move();
  }
  requestAnimationFrame(render);
}

// dots class
// @constructor
function dot() {
  
  this.rad_x = 2 * Math.random() * halfx + 1;
  this.rad_y = 1.2 * Math.random() * halfy + 1;
  this.alpha = Math.random() * 360 + 1;
  this.speed = Math.random() * 100 < 50 ? 1 : -1;
  this.speed *= 0.1;
  this.size = Math.random() * 5 + 1;
  this.color = Math.floor(Math.random() * 256);
  
}

// drawing dot
dot.prototype.draw = function() {
  
  // calc polar coord to decart
  var dx = halfx + this.rad_x * Math.cos(this.alpha / 180 * Math.PI);
  var dy = halfy + this.rad_y * Math.sin(this.alpha / 180 * Math.PI);
  // set color
  context.fillStyle = "rgb(" + this.color + "," + this.color + "," + this.color + ")";
  // draw dot
  context.fillRect(dx, dy, this.size, this.size);
  
};

// calc new position in polar coord
dot.prototype.move = function() {
  
  this.alpha += this.speed;
  // change color
  if (Math.random() * 100 < 50) {
    this.color += 1;
  } else {
    this.color -= 1;
  }
  
};

// start animation
render();
// hover affect on welcome

$('.socialHover').hover(function(e){
  console.log(e.target)
  let link = e.target.id;
  let text;
  let linkStatus = $(e.target).data('link');

  if(linkStatus){
    //changing to the original text

    //toggle the state
    $(e.target).data('link',false)

    //changing linkedin back
    if(link === 'github') {
      text = $('#gitText')
      text.css('color',"white")
      text.text("Jaden")
    }
    //changing linkedin back
    if(link === 'linkedin') {
      text = $('#LN-Text')
      text.css('color',"white")
      text.text("Rodriguez")
    }
    //changing linkedin back
    if(link === 'email') {
      text = $('#emailText')
      text.css('color',"white")
      text.text("JS Developer")
    }
  }else{
    //change text to the link name 

    //toggle the state
    $(e.target).data('link',true)

    //show moving code when linkedin is hovered
    if(link === 'github') {
      text = $('#gitText')
      text.css('color',"rgb(0,0,0,.0)")
      text.text("Github")
    }
    if(link === 'linkedin') {
      text = $('#LN-Text')
      text.css('color',"rgb(0,0,0,.0)")
      text.text("Linkedin")
    }
    if(link === 'email') {
      text = $('#emailText')
      text.css('color',"rgb(0,0,0,.0)")
      text.text("email")
    }

  }
})




$( ".hover" ).hover(function() {
  let parent =  $(this).parent()
  let child = $(this).parent().children().eq(1)

  if(parent.data('link') === 'true'){
    // hover off
    child.css('color',"white")
    child.text(child.attr('id'))
    parent.data('link','false')
  }else{
    // hover on
    child.css('color',"rgb(0,0,0,.0)")
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