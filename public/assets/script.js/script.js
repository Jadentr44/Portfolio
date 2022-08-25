//animated background

// init
var maxx = document.body.clientWidth;
var maxy = window.innerHeight;
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
for (let i = 0; i < dotCount; i++) {
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
  this.size = Math.random() * 10 + 1;
  this.color = Math.floor(Math.random() * 256);
  
}

// drawing dot
dot.prototype.draw = function() {
  
  // calc polar coord to decart
  var dx = halfx + this.rad_x * Math.cos(this.alpha / 180 * Math.PI);
  var dy = halfy + this.rad_y * Math.sin(this.alpha / 180 * Math.PI);
  // set color
  context.fillStyle = "white";
  // draw dot
  context.fillRect(dx, dy, this.size/2, this.size/2);
  
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





let skillState = false
$( ".skill" ).hover(function() {
  if(!skillState){

    let skillName = $(this).attr("id")
    $('.skillName').text(skillName)
    $('.skillName').removeClass("invisible")
    $('.skillName').addClass("visible")
  }else{
    $('.skillName').addClass("invisible")
    $('.skillName').removeClass("visible")
  }
  skillState = !skillState
})



function floatIn(text,divID,time){
let div = $(`#${divID}`)
let textArr = text.split("")

textArr.forEach((e,i) => {
  setTimeout(() => {
    
    let span = $("<span>")
    span.text(e)
    span.animate({fontSize: "100%" }, time );
    // span.addClass('big')
    // setTimeout(() => {span.removeClass('big')},200)
    div.append(span)
  }, time/2*i)
});


console.log(textArr)
}





floatIn("jaden","gitText",450)
floatIn("Rodriguez","LN-Text",280)
floatIn("JS Developer","emailText",200)





$('#sendEmail').on('click',function(e){
  e.preventDefault();
  let emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(!($('.emailInput').val().match(emailformat)) || !$('#message').val() || !$('#name').val()){
    $('#formError').css('visibility','visible')
    return
  }
  $('#formError').css('visibility','hidden')

  fetch('/sendEmail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({name:$('#name').val(),email:$('.emailInput').val(),message:$('#message').val()}),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      alert('Successful email sent');
      $('#name').val("")
      $('.emailInput').val("")
      $('#message').val("")
      return 
    })
    .catch((error) => {
      alert('Error in sending email', error);
    });
  
})


let projectsInfo = {
  Dart:{
    name:"JavaScript Quiz",
    desc:"a simple game that useses vanila javascript to quiz your javavacript syntax knolage",
    full:"no",
    githubLink:"",
    liveLink:''
  }
}

$('.card').on('click',function(e){
  console.log(e.currentTarget.id)
  let info = projectsInfo[e.currentTarget.id]
  $('#modalTitle').text(info.name)
  $('#modalFull').text(info.full)
  $('#modalDesc').text(info.desc)
  
  $('#myModal').modal('show'); 
})