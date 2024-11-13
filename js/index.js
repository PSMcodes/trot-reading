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

// swipper
let swiper = new Swiper(".mySwiper", {
  effect: "cards",
  grabCursor: true,
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

// daily readings
let SHEET_ID = "1kyRgLhapYrETeRJBgAa7cGV28nOXtJHyj0_hNsq1vCA";
let SHEET_TITLE = "Sheet1";
let SHEET_RANGE = "A1:C32";

let FULL_URL =
  "https://docs.google.com/spreadsheets/d/" +
  SHEET_ID +
  "/gviz/tq?sheet=" +
  SHEET_TITLE +
  "&range=" +
  SHEET_RANGE;

function formatDate(date) {
  let day = String(date.getDate()).padStart(2, "0"); // Add leading zero if needed
  let month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  let year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

let currentDate = formatDate(new Date());

async function getvalues() {
  try {
    let Response = await fetch(FULL_URL);
    let data = await Response.text();
    data = JSON.parse(data.substr(47).slice(0, -2)).table.rows;
    data.map((ele) => {
      if (ele.c[0].f == currentDate) {
        let title = ele.c[1].v;
        let desc = ele.c[2].v;
        document.getElementById("readingHeader").innerHTML = title;
        document.getElementById("readingContent").innerHTML = desc;
      }
    });
  } catch (error) {
    console.log(error);
  }
}

getvalues();

// form redirect
const form = document.getElementById("contactForm");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent form from submitting
  if (validateForm()) {
    closeModal();
    showThankYouModal();
    saveToDb();
  }
});

function saveToDb() {
  obj = {
    Id: "INCREMENT",
    Name: document.getElementById("name").value,
    Contact: document.getElementById("contact").value,
    Email: document.getElementById("email").value,
    TypeofReading: document.getElementById("tarotType").value,
    Description: document.getElementById("tarotDescription").value,
    MeetingTime: document.getElementById("meeting").value,
  };
  fetch("https://sheetdb.io/api/v1/lvnh6hc1oogvx", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: obj,
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
}

function validateForm() {
  const name = document.getElementById("name").value;
  const contact = document.getElementById("contact").value;
  const email = document.getElementById("email").value;
  const tarotType = document.getElementById("tarotType").value;
  const tarotDescription = document.getElementById("tarotDescription").value;
  const errorMsg = document.getElementById("error-msg");

  // Validate Name
  if (!/^[A-Za-z\s]{3,}$/.test(name)) {
    errorMsg.textContent =
      "Name must be at least 3 characters and contain only letters.";
    return false;
  }

  // Validate Contact Number
  if (!/^\d{10}$/.test(contact)) {
    errorMsg.textContent = "Contact number must be exactly 10 digits.";
    return false;
  }

  // Validate Email
  if (!/^[\w\.-]+@[A-Za-z]+\.[A-Za-z]{2,}$/.test(email)) {
    errorMsg.textContent = "Please enter a valid email address.";
    return false;
  }

  // Validate Tarot Type and Description
  if (tarotType.trim() === "" || tarotDescription.trim() === "") {
    errorMsg.textContent =
      "Please fill in both the type of reading and description fields.";
    return false;
  }

  // Clear error message if all validations pass
  errorMsg.textContent = "";
  return true;
}

function sendWhatsAppMessage() {
  const name = document.getElementById("name").value;
  const contact = document.getElementById("contact").value;
  const email = document.getElementById("email").value;
  const tarotType = document.getElementById("tarotType").value;
  const tarotDescription = document.getElementById("tarotDescription").value;
  const meeting = document.getElementById("meeting").value;

  let url = "https://api.whatsapp.com/send?phone=+919270467341&text=";
  let text = `Hello Neha! 😊 I'd love to book a tarot reading with you. Here are my details:%0A
      Name: ${name}%0A
      Contact Number: ${contact}%0A
      Email Address: ${email}%0A
      Type of Reading: I'm interested in a ${tarotType} reading.%0A
      Description: ${tarotDescription}.%0A
      Date / Time : ${meeting}
      Let me know if you need anything else or if there's anything I should prepare in advance. Thanks so much, and I'm looking forward to the reading! ✨`;

  window.open(url + text, "_blank");
}

function showThankYouModal() {
  document.getElementById("thankYouModal").style.display = "flex";
}

function closeModal2() {
  document.getElementById("thankYouModal").style.display = "none";
}

// security
document.addEventListener("contextmenu", function (event) {
  event.preventDefault();
});
document.addEventListener("keydown", function (event) {
  // Disable F12
  if (event.key === "F12") {
    event.preventDefault();
  }
  // Disable Ctrl+Shift+I
  if (event.ctrlKey && event.shiftKey && event.key === "I") {
    event.preventDefault();
  }
  // Disable Ctrl+U (view source)
  if (event.ctrlKey && (event.key === "U" || event.key === "u")) {
    event.preventDefault();
  }
});

// modal
function openModal() {
  document.getElementById("modalOverlay").style.display = "flex";
}

function closeModal() {
  document.getElementById("modalOverlay").style.display = "none";
}

// get testimonials
async function getTestimonial() {
  let SHEET_ID = "1KaMLJCMKDk5S2aCWhC4X06mNO8AvbutpFFAWUBvCyFo";
  let SHEET_TITLE = "Form Response 2";
  let SHEET_RANGE = "A1:F32";

  let FULL_URL =
    "https://docs.google.com/spreadsheets/d/" +
    SHEET_ID +
    "/gviz/tq?sheet=" +
    SHEET_TITLE +
    "&range=" +
    SHEET_RANGE;
  try {
    let Response = await fetch(FULL_URL);
    let data = await Response.text();
    data = JSON.parse(data.substr(47).slice(0, -2)).table.rows;
    data.map((ele) => {
      console.log(ele);
      let slide = document.createElement("div");
      slide.classList.add("slides");
      slide.innerHTML = `
          <span class="caption">${ele.c[5].v}</span>
          <p class="personName">${ele.c[3].v}</p>
          <p class="stars">
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
          </p>
      `;
      document.querySelector(".slides-container").appendChild(slide);
    });
    showSlide(0);
  } catch (error) {
    console.log(error);
  }
}
getTestimonial();

let firstSlide = 0;
let currentSlide = firstSlide;
function showSlide(n) {
  let slides = document.getElementsByClassName("slides");
  let lastSlide = slides.length - 1;
  currentSlide += n;
  if (currentSlide > lastSlide) currentSlide = firstSlide;
  if (currentSlide < firstSlide) currentSlide = lastSlide;
  for (i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
  }
  slides[currentSlide].classList.add("active");
}
