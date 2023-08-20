'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector(".header");
const sections = document.querySelectorAll(".section");
const buttons = document.getElementsByTagName("button");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const h1 = document.querySelector("h1");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
const nav = document.querySelector(".nav");
const dotContainer = document.querySelector(".dots");

const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
///////////////////////////////////////

// Modal window
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnsOpenModal.forEach(v => v.addEventListener("click", openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

////////////////////////////////////

/* Selecting elements */

// console.log(sections);


// console.log(buttons);

// console.log(document.getElementsByClassName("btn"));

/* Creating and inserting elements */
const message = document.createElement("div");
message.classList.add("cookie-message");
// message.textContent = "We use cookies for improved functionality and analytics";
message.innerHTML = "We use cookies for improved functionality and analytics. <button class='btn btn--close-cookie'>Got it!</button>";

// header.prepend(message);
header.append(message);

// header.before(message);
// header.after(message);

/* Deleting elements */
document.querySelector(".btn--close-cookie").addEventListener("click", function () {
  message.remove();
});

/* Styling elements */
message.style.backgroundColor = "#37383d";
message.style.width = "120%";

message.style.height = Number.parseFloat(getComputedStyle(message).height) + 40 + "px";

// document.documentElement.style.setProperty("--color-primary", "orangered");

const logo = document.querySelector(".nav__logo");

/* Classes */
logo.classList.add("c", "j");
logo.classList.remove("c", "j");
logo.classList.toggle("c");
logo.classList.contains("c");

btnScrollTo.addEventListener("click", function (e) {
  const s1coords = section1.getBoundingClientRect();

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: "smooth",
  // });

  section1.scrollIntoView({
    behavior: "smooth"
  });
});

// document.querySelectorAll(".nav__link").forEach(function(el) {
//   el.addEventListener("click", function(e) {
//     e.preventDefault();
//     const id = this.getAttribute("href");
//     document.querySelector(id).scrollIntoView({
//       behavior: "smooth",
//     });
//   });
// });



/* 1. Add event listener to the parent element */
/* 2. Determine which element originates the event */
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({
      behavior: "smooth",
    });
  }
});

/* Tabbed components */
tabsContainer.addEventListener("click", function (event) {
  const clicked = event.target.closest(".operations__tab");

  if (!clicked) {
    return;
  }

  // Remove active classes
  tabs.forEach(tab => tab.classList.remove("operations__tab--active"));
  tabsContent.forEach(tabContent => tabContent.classList.remove("operations__content--active"));

  // Activate tab
  clicked.classList.add("operations__tab--active");

  // Activate content area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add("operations__content--active");
});

/* Menu fade animation */
const HandleHover = function (event, opacity) {
  if (event.target.classList.contains("nav__link")) {
    const link = event.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach(sibling => {
      if (sibling !== link) {
        sibling.style.opacity = opacity;
      }
    });

    logo.style.opacity = opacity;
  }
}

nav.addEventListener("mouseover", function (event) {
  HandleHover(event, 0.5);
});

nav.addEventListener("mouseout", function (event) {
  HandleHover(event, 1);
});

/* Sticky menu */
const navHeight = nav.getBoundingClientRect().height;
const callback = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  }
};

const options = {
  root: null, // entire viewport
  threshold: 0,
  // rootMargin: `-${navHeight}px`,
};

const observer = new IntersectionObserver(callback, options);
observer.observe(nav);

/* Hide sections by default */
sections.forEach(function (section) {
  section.classList.add("section--hidden");
});

/* Show sections on scroll */
const ShowSection = function (entries, observer) {
  const [entry] = entries;

  if (entry.isIntersecting) {
    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
  }
};

const sectionObserver = new IntersectionObserver(ShowSection, {
  root: null,
  threshold: 0.2
});

sections.forEach(function (section) {
  sectionObserver.observe(section);
});

/* Lazy load images */
const imgTargets = document.querySelectorAll("img[data-src]");

const LoadImg = function (entries, observer) {
  const [entry] = entries;

  if (entry.isIntersecting) {
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener("load", function () {
      entry.target.classList.remove("lazy-img");
    });

    observer.unobserve(entry.target);
  }
};

const imgObserver = new IntersectionObserver(LoadImg, {
  root: null,
  threshold: 0.15
});

imgTargets.forEach(img => imgObserver.observe(img));

/* Slider */
const InitSlider = function () {
  let curSlide = 0;
  const maxSlide = slides.length;

  const CreateDots = function () {
    slides.forEach(function (element, index) {
      dotContainer.insertAdjacentHTML("beforeend", `<button class="dots__dot" data-slide="${index}"></button>`);
    });
  }

  CreateDots();

  const ActivateDot = function (slide) {
    const dots = document.querySelectorAll(".dots__dot");
    dots.forEach(function (dot) {
      dot.classList.remove("dots__dot--active");
    });
    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add("dots__dot--active");
  }

  const GoToSlide = function (slide) {
    slides.forEach(function (element, index) {
      element.style.transform = `translateX(${100 * (index - slide)}%)`;
    });
    ActivateDot(slide);
  }

  GoToSlide(0);

  const NextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    GoToSlide(curSlide);
  }

  const PrevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    GoToSlide(curSlide);
  }

  btnRight.addEventListener("click", NextSlide);
  btnLeft.addEventListener("click", PrevSlide);

  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
      PrevSlide();
    } else if (event.key === "ArrowRight") {
      NextSlide();
    }
  });

  dotContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("dots__dot")) {
      const slide = event.target.dataset.slide;
      GoToSlide(slide);
    }
  });
}

InitSlider();

