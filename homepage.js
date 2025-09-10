const parallax = document.getElementById("parallax");
const logo = document.querySelector(".logo12");
const cloudLeft = document.getElementById("cloud-left");
const cloudRight = document.getElementById("cloud-right");
const logo1 = document.getElementById("logo1");
const logo2 = document.getElementById("logo2");
const progressImg = document.getElementById("Progressimg");
const backToTop = document.getElementById("backToTop");
const left_col = document.querySelectorAll(".left_col");
const right_col = document.querySelectorAll(".right_col");
let movetop = 0;

const navbarToggle = document.getElementById('navbarToggle');
const fullscreenMenu = document.getElementById('fullscreenMenu');
const closeMenu = document.getElementById('closeMenu');

navbarToggle.addEventListener('click', () => {
  fullscreenMenu.style.display = 'flex';
  document.body.style.overflow = 'hidden';
});

closeMenu.addEventListener('click', () => {
  fullscreenMenu.style.display = 'none';
  document.body.style.overflow = 'auto';
});



function isMobile() {
  return window.innerWidth <= 768;
}

function animateParallax() {
  const scrollTop = parallax.scrollTop;
  const maxScroll = parallax.scrollHeight - parallax.clientHeight;
  let Progressh = (scrollTop / maxScroll) * 100;
  document.getElementById("Progress1").style.height = Progressh + "%";

  let imgTop = (scrollTop / maxScroll) * (parallax.clientHeight - 40);
  progressImg.style.top = `${imgTop}px`;

  if (scrollTop >= 300) {
    logo1.style.display = "block";
    logo2.style.display = "none";
  } else {
    logo2.style.display = "block";
    logo1.style.display = "none";
  }

  if (scrollTop >= 3300) {
    setTimeout(function () {
      left_col[5].style.transition = "1s";
      left_col[5].style.opacity = "1";
    }, 2000);
    setTimeout(function () {
      left_col[6].style.transition = "1.5s";
      left_col[6].style.opacity = "1";
    }, 3000);
  }

  const scrollPercentage = (scrollTop / parallax.clientHeight) * 110;

  const cloudOffset = Math.min(100, scrollPercentage * 2);
  cloudLeft.style.transform = `translateX(${cloudOffset}%)`;
  cloudRight.style.transform = `translateX(-${cloudOffset}%) scaleX(-1)`;

  const base = 1.3;

  function getTranslateOffset() {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 500) {
      return {
        left: -50,
        right: 50
      };
    } else if (screenWidth <= 768) {
      return {
        left: -75,
        right: 75
      };
    } else {
      return {
        left: -150,
        right: 150
      };
    }
  }

  function animateContent() {
    const scrollTop = parallax.scrollTop;
    const maxScroll = parallax.scrollHeight - parallax.clientHeight;
    const scrollPercentage = (scrollTop / parallax.clientHeight) * 110;
    const base = 1.3;
    const translateOffsets = getTranslateOffset();

    left_col.forEach(function (item, index) {
      let ctextOffset = Math.min(0, translateOffsets.left + scrollPercentage * base / (index + 1));
      if (item.classList.contains("more-text")) return;
      item.style.transform = `translateX(${ctextOffset}%)`;

      if (index === 6) {
        item.style.transform = `translateX(${ctextOffset + 33}%)`;
      }
    });

    right_col.forEach(function (item, index) {
      let rightTextOffset = Math.max(0, translateOffsets.right - scrollPercentage * base / ((index + 1)));
      item.style.transform = `translateX(${rightTextOffset}%)`;
    });
  }

  window.addEventListener('resize', animateContent);
  parallax.addEventListener('scroll', animateContent);

  animateContent();


  const glowIntensity = 15 + (scrollPercentage / 100) * 25;
  logo.style.filter = `drop-shadow(0 0 ${glowIntensity}px rgba(255, 215, 0, 0.7))`;

  requestAnimationFrame(animateParallax);
  console.log(movetop);
  console.log(window.innerWidth);

  if ((movetop == 4330 && window.innerWidth >= 768) || (movetop == 1700 && window.innerWidth < 768)) {
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
  handleMove(event.clientY);
});

addEventListener("touchmove", (event) => {
  const touch = event.touches[0];
  handleMove(touch.clientY);
});

function handleMove(clientY) {
  const scrollTop = parallax.scrollTop;

  movetop = scrollTop + clientY;

  if (window.innerWidth < 500) {
    movetop = Math.min(movetop, 1700);
  } else if (window.innerWidth < 768) {
    movetop = Math.min(movetop, 1800);
  }
  else {
    movetop = Math.min(movetop, 4330);
  }

  move.style.top = `${movetop}px`;
}



addEventListener("wheel", (event) => {
  const scrollTop = parallax.scrollTop;

  movetop = scrollTop - innerHeight + event.clientY;

  if (window.innerWidth < 500) {
    movetop = Math.min(movetop, 1700);
  } else if (window.innerWidth < 768) {
    movetop = Math.min(movetop, 1800);
  }
  else {
    movetop = Math.min(movetop, 4330);
  }

  if (scrollTop >= innerHeight) {
    move.style.top = `${movetop}px`;
  } else {
    move.style.top = '0px';
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