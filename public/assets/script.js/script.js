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
dot.prototype.draw = function () {
  // calc polar coord to decart
  var dx = halfx + this.rad_x * Math.cos((this.alpha / 180) * Math.PI);
  var dy = halfy + this.rad_y * Math.sin((this.alpha / 180) * Math.PI);
  // set color
  context.fillStyle = "white";
  // draw dot
  context.fillRect(dx, dy, this.size / 2, this.size / 2);
};

// calc new position in polar coord
dot.prototype.move = function () {
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

$(".socialHover").hover(function (e) {
  console.log(e.target);
  let link = e.target.id;
  let text;
  let linkStatus = $(e.target).data("link");

  if (linkStatus) {
    //changing to the original text

    //toggle the state
    $(e.target).data("link", false);

    //changing linkedin back
    if (link === "github") {
      text = $("#gitText");
      text.css("color", "white");
      text.text("Jaden");
    }
    //changing linkedin back
    if (link === "linkedin") {
      text = $("#LN-Text");
      text.css("color", "white");
      text.text("Rodriguez");
    }
    //changing linkedin back
    if (link === "email") {
      text = $("#emailText");
      text.css("color", "white");
      text.text("JS Developer");
    }
  } else {
    //change text to the link name

    //toggle the state
    $(e.target).data("link", true);

    //show moving code when linkedin is hovered
    if (link === "github") {
      text = $("#gitText");
      text.css("color", "rgb(0,0,0,.0)");
      text.text("Github");
    }
    if (link === "linkedin") {
      text = $("#LN-Text");
      text.css("color", "rgb(0,0,0,.0)");
      text.text("Linkedin");
    }
    if (link === "email") {
      text = $("#emailText");
      text.css("color", "rgb(0,0,0,.0)");
      text.text("email");
    }
  }
});

let skillState = false;
$(".skill").hover(function () {
  if (!skillState) {
    let skillName = $(this).attr("id");
    $(".skillName").text(skillName);
    $(".skillName").removeClass("invisible");
    $(".skillName").addClass("visible");
  } else {
    $(".skillName").addClass("invisible");
    $(".skillName").removeClass("visible");
  }
  skillState = !skillState;
});

function floatIn(text, divID, time) {
  let div = $(`#${divID}`);
  let textArr = text.split("");

  textArr.forEach((e, i) => {
    setTimeout(() => {
      let span = $("<span>");
      span.text(e);
      span.animate({ fontSize: "100%" }, time);
      // span.addClass('big')
      // setTimeout(() => {span.removeClass('big')},200)
      div.append(span);
    }, (time / 2) * i);
  });

  console.log(textArr);
}

floatIn("jaden", "gitText", 450);
floatIn("Rodriguez", "LN-Text", 280);
floatIn("JS Developer", "emailText", 200);

// fetch to send email

$("#sendEmail").on("click", function (e) {
  e.preventDefault();
  // regex
  let emailformat = /^\S+@\S+$/;

  // checking if input is not valid
  if (
    !$(".emailInput").val().match(emailformat) ||
    !$("#message").val() ||
    !$("#name").val()
  ) {
    $("#formError").css("visibility", "visible");
    return;
  }

  // hiding 'invalid input' is the input was good
  $("#formError").css("visibility", "hidden");

  let name = $("#name").val();
  let email = $(".emailInput").val();
  let message = $("#message").val();
  console.log(name);
  console.log(email);
  console.log(message);
  //sending post to server to send email
  fetch("/sendEmail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: name, email: email, message: message }),
  })
    .then((res) => res.json())
    .then((data) => {
      // clearing inputs and alerting the email was good
      console.log(data);
      alert("Successful email sent");
      $("#name").val("");
      $(".emailInput").val("");
      $("#message").val("");
      return;
    })
    .catch((error) => {
      // if theres an error alert the bad email and console log the error
      alert("Error in sending email");
      console.log(error);
    });
});

let projectsInfo = {
  Dart: {
    warning:"Warning:API keys are currently not active",
    name: "Dart on The Map",
    desc: "a concept website that allows the user to search a location, and get local data,weather, and a currency converter",
    technologies: "HTML,Bulma,Jquery,local storage",
    role:"set up API's to render information to the page",
    githubLink: "",
    liveLink: "",
  },
  Battle: {
    warning:"Warning: certain browsers and ad blockers cause issues. To test personally, I use chrome on my desktop and phone to connect",
    name: "Battle of The Shadow Tomb",
    desc: "a full stack game that allows 2 players to play a back and forth online pvp game",
    technologies: "HTML,Bootstrap,Javascript,Node.js,Express,MySQL",
    role:"develop server, manage DB, tweak API calls",
    githubLink: "",
    liveLink: "",
  }
};

$(".card").on("click", function (e) {
  let info = projectsInfo[e.currentTarget.id];
  $("#modalTitle").text(info.name);
  $("#modalTechnologies").text(info.technologies);
  $("#modalDesc").text(info.desc);
  $("#modalRole").text(info.role);
  $("#modalWarning").text(info.warning);
  

  $("#myModal").modal("show");
});

let imgSrc = 0




moveRobot()
imgSrc++;
setInterval(function () {
  moveRobot()
   imgSrc++
}, 6000);


function moveRobot(){
  let img = $("#robot")
  let imgWidth = img.get(0).width
  let screenWidth = $(window).width()
  console.log('img width', imgWidth)
     if(imgSrc%2==0){
      img.css("transform" ,"scaleX(1)")
       $("#robot").attr("src", "./img/robot.png");
      img.css("left", -imgWidth).animate({
        "left": screenWidth
      }, 5000);
     }else{
      img.css("transform" ,"scaleX(-1)")
      $("#robot").attr("src", "./img/robot-empty.png")
      img.css("left",screenWidth).animate({
        "left": -imgWidth
      }, 5000);
     }
}