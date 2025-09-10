const parallax = document.getElementById("parallax"); 
const logo = document.querySelector(".logo"); 
const cloudLeft = document.getElementById("cloud-left"); 
const cloudRight = document.getElementById("cloud-right"); 
const logo1 = document.getElementById("logo1"); 
const logo2 = document.getElementById("logo2"); 
const progressImg = document.getElementById("Progressimg"); 
const backToTop = document.getElementById("backToTop"); 
const left_col = document.querySelectorAll(".left_col"); 
const right_col = document.querySelectorAll(".right_col"); 
let movetop = 0; 


function animateParallax() {
  const scrollTop = parallax.scrollTop; 
  const maxScroll = parallax.scrollHeight - parallax.clientHeight; 


  let Progressh = (scrollTop / maxScroll) * 100;


  document.getElementById("Progress1").style.height = Progressh + "%";


  let imgTop = (scrollTop / maxScroll) * (parallax.clientHeight - 40); 
  progressImg.style.top = `${imgTop}px`; 


  if (scrollTop >= 100) {
    logo1.style.display = "block"; 
    logo2.style.display = "none"; 
  } else {
    logo2.style.display = "block"; 
    logo1.style.display = "none"; 
  }

  const scrollPercentage = (scrollTop / parallax.clientHeight) * 200; 

  // cloud
  const cloudOffset = Math.min(100, scrollPercentage * 2); 
  cloudLeft.style.transform = `translateX(${cloudOffset}%)`; 
  cloudRight.style.transform = `translateX(-${cloudOffset}%) scaleX(-1)`; 

  const base=1.3;
  left_col.forEach(function (item,index) {
    const ctextOffset = Math.min(0, -150 + scrollPercentage * base/(index+1)); 
    item.style.transform = `translateX(${ctextOffset}%)`;
  });
  right_col.forEach(function (item,index) {
    const rightTextOffset = Math.max(0, 150 - scrollPercentage * base/((index+1))); 
    item.style.transform = `translateX(${rightTextOffset}%)`;
  });

  const glowIntensity = 15 + (scrollPercentage / 100) * 25; 
  logo.style.filter = `drop-shadow(0 0 ${glowIntensity}px rgba(255, 215, 0, 0.7))`;

  requestAnimationFrame(animateParallax); 


  if (movetop == 4320) {
    document.getElementById("cell1").classList.add("cell1_ani"); 
    document.getElementById("cell2").classList.add("cell2_ani"); 
    document.getElementById("sword").classList.add("sword_move");
    document.getElementById("leaf").classList.add("leaf_ani"); 
  } else {
    document.getElementById("cell1").classList.remove("cell1_ani"); 
    document.getElementById("cell2").classList.remove("cell2_ani"); 
    document.getElementById("sword").classList.remove("sword_move"); 
    document.getElementById("leaf").classList.remove("leaf_ani");
  }
}


cloudLeft.style.transform = "translateX(0%)";
cloudRight.style.transform = "translateX(0%) scaleX(-1)";

left_col.forEach(function (item) {
  item.style.transform = "translateX(-150%)";
});
right_col.forEach(function (item) {
  item.style.transform = "translateX(150%)";
});


parallax.addEventListener("scroll", () => {
  if (parallax.scrollTop === 0) {
    cloudLeft.style.transform = "translateX(0%)";
    cloudRight.style.transform = "translateX(0%) scaleX(-1)";
    left_col.forEach(function (item) {
      item.style.transform = "translateX(-150%)";
    });
    right_col.forEach(function (item) {
      item.style.transform = "translateX(150%)";
    });
  }
});


animateParallax();

backToTop.addEventListener("click", () => {
  parallax.scrollTo({
    top: 0, 
    behavior: "smooth", 
  });
});


const move = document.getElementById("move"); 
const innerHeight = window.innerHeight;

addEventListener("mousemove", (event) => {
  if (parallax.scrollTop >= innerHeight) {

    movetop = parallax.scrollTop - innerHeight + event.pageY; 
    movetop > 4320 ? (movetop = 4320) : (movetop = movetop); 
    move.style.top = movetop + "px";
  } else {
    if (innerHeight < parallax.scrollTop + event.pageY) {
      move.style.top = event.pageY + parallax.scrollTop - innerHeight + "px"; 
    } else {
      move.style.top = 0 + "px"; 
    }
  }
});

addEventListener("wheel", (event) => {
  movetop = parallax.scrollTop - innerHeight + event.pageY; 
  movetop > 4320 ? (movetop = 4320) : (movetop = movetop); 
  if (parallax.scrollTop >= innerHeight) {
    move.style.top = movetop + "px"; 
  } else {
    if (innerHeight < parallax.scrollTop + event.pageY) {
      move.style.top = movetop + "px"; 
    } else {
      move.style.top = 0 + "px"; 
    }
  }
});

function revealFadeIn() {
  var fadeInElements = document.querySelectorAll(".fade-in");
  for (var i = 0; i < fadeInElements.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = fadeInElements[i].getBoundingClientRect().top;
      var elementVisible = 150;
      if (elementTop < windowHeight - elementVisible) {
          fadeInElements[i].classList.add("active");
      } else {
          fadeInElements[i].classList.remove("active");
      }
  }
}

window.addEventListener("scroll", revealFadeIn);

revealFadeIn();

