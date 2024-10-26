particlesJS("particle", {
  particles: {
    number: {
      value: 15,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: "#ffffff",
    },
    shape: {
      type: "image",
      stroke: {
        width: 0,
        color: "#000000",
      },
      polygon: {
        nb_sides: 5,
      },
      image: {
        src: "./assests/particle.png",
        width: 50,
        height: 50,
      },
    },
    opacity: {
      value: 0.1,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 30,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false,
      },
    },
    line_linked: {
      enable: false,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 6,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "grab",
      },
      onclick: {
        enable: true,
        mode: "push",
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3,
      },
      repulse: {
        distance: 200,
      },
      push: {
        particles_nb: 4,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
  retina_detect: true,
  config_demo: {
    hide_card: false,
    background_color: "#b61924",
    background_image: "",
    background_position: "50% 50%",
    background_repeat: "no-repeat",
    background_size: "cover",
  },
});

// lodaer
document.onreadystatechange = function () {
  document.getElementById("loader").style.display = "none"; // Hide loader
  document.querySelector(".content").style.display = "block"; // Show content
};

// navbar
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");

  // Check if the page is scrolled more than 50px
  if (window.scrollY > 200) {
    navbar.classList.add("scrolled"); // Add new class when scrolled
  } else {
    navbar.classList.remove("scrolled"); // Remove class when at the top
  }
});

const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");

burger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  if (navLinks.classList.contains("active")) {
    burger.classList.replace("fa-bars", "fa-xmark");
  } else {
    burger.classList.replace("fa-xmark", "fa-bars");
  }
});

// video controls
let playbtn = document.getElementById("play-btn");
let isplaying = false;
playbtn.addEventListener("click", () => {
  if (!isplaying) {
    document.getElementById("video").play();
    isplaying = true;
    document.getElementById("icon").classList.replace("fa-play", "fa-pause");
    setTimeout(() => {
      document.getElementById("play-btn").style.opacity = 0;
    }, 2000);
  } else {
    document.getElementById("video").pause();
    isplaying = false;
    document.getElementById("icon").classList.replace("fa-pause", "fa-play");
    setTimeout(() => {
      document.getElementById("play-btn").style.opacity = 0;
    }, 2000);
  }
});
document.getElementById("vid").addEventListener("mouseenter", () => {
  document.getElementById("play-btn").style.opacity = 0.5;
});
document.getElementById("vid").addEventListener("mouseleave", () => {
  document.getElementById("play-btn").style.opacity = 0.5;
});

// SlideShow
let slides = document.querySelectorAll(".slides");
let firstSlide = 0;
let lastSlide = slides.length - 1;
let currentSlide = firstSlide;
function showSlide(n) {
  currentSlide += n;
  if (currentSlide > lastSlide) currentSlide = firstSlide;
  if (currentSlide < firstSlide) currentSlide = lastSlide;
  for (i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
  }
  slides[currentSlide].classList.add("active");
}
showSlide(0);

// categories
jQuery(document).ready(function ($) {
  const $feedbackSlider = $(".feedback-slider");

  if ($feedbackSlider.length) {
    $feedbackSlider.owlCarousel({
      items: 1,
      nav: true,
      dots: true,
      autoplay: false,
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      navText: [
        '<i class="fa fa-long-arrow-left"></i>',
        '<i class="fa fa-long-arrow-right"></i>',
      ],
      responsive: {
        // viewport >= 767px
        767: {
          nav: true,
          dots: false,
        },
      },
    });

    $feedbackSlider.on("translate.owl.carousel", function () {
      $(".feedback-slider-item h3")
        .removeClass("animated fadeIn")
        .css("opacity", "0");

      $(
        ".feedback-slider-item img, .feedback-slider-thumb img, .customer-rating"
      )
        .removeClass("animated zoomIn")
        .css("opacity", "0");
    });

    $feedbackSlider.on("translated.owl.carousel", function () {
      $(".feedback-slider-item h3")
        .addClass("animated fadeIn")
        .css("opacity", "1");

      $(
        ".feedback-slider-item img, .feedback-slider-thumb img, .customer-rating"
      )
        .addClass("animated zoomIn")
        .css("opacity", "1");
    });

    $feedbackSlider.on("changed.owl.carousel", function (property) {
      const current = property.item.index;

      const prevThumb = $(property.target)
        .find(".owl-item")
        .eq(current)
        .prev()
        .find("img")
        .attr("src");

      const nextThumb = $(property.target)
        .find(".owl-item")
        .eq(current)
        .next()
        .find("img")
        .attr("src");

      const prevRating = $(property.target)
        .find(".owl-item")
        .eq(current)
        .prev()
        .find("span")
        .attr("data-rating");

      const nextRating = $(property.target)
        .find(".owl-item")
        .eq(current)
        .next()
        .find("span")
        .attr("data-rating");

      $(".thumb-prev").find("img").attr("src", prevThumb);
      $(".thumb-next").find("img").attr("src", nextThumb);

      $(".thumb-prev")
        .find("span")
        .next()
        .html(prevRating + '<i class="fa fa-star"></i>');

      $(".thumb-next")
        .find("span")
        .next()
        .html(nextRating + '<i class="fa fa-star"></i>');
    });

    $(".thumb-next").on("click", function (e) {
      e.preventDefault();

      $feedbackSlider.trigger("next.owl.carousel", [300]);
    });

    $(".thumb-prev").on("click", function (e) {
      e.preventDefault();

      $feedbackSlider.trigger("prev.owl.carousel", [300]);
    });
  }
}); // end ready func
