/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */

/**
 * End Global Variables
 * Start Helper Functions
 *
 */
function getAllSection() {
  const sections = document.querySelectorAll("section");
  if (sections) {
    const sectionAtr = Array.from(sections).map((el) => {
      return {
        id: el.id,
        name: el.getAttribute("data-nav"),
      };
    });

    return sectionAtr;
  }
  return [];
}

function createMenuLink(id, name) {
  const liEl = document.createElement("li");
  const aEl = document.createElement("a");

  aEl.textContent = name;
  // aEl.href = `#${id}`;
  aEl.classList.add("menu__link");
  aEl.setAttribute("data-nav", id);

  aEl.addEventListener("click", handleClick);

  liEl.appendChild(aEl);

  return liEl;
}

function handleClick(event) {
  const target = event.target;
  console.log({ target });

  const dataNav = target.attributes["data-nav"].value;

  if (dataNav) {
    scrollIntoView(dataNav);
  }
}

function scrollIntoView(id) {
  const view = document.getElementById(id);
  view.scrollIntoView({
    behavior: "smooth",
  });
}

function scrollEvent(e) {
  // get all sections on the page
  const sections = document.querySelectorAll("section");

  // loop through each section
  sections.forEach((section) => {
    // get px distance from top
    const topDistance = section.getBoundingClientRect().top;

    // if the distance to the top is between 0-100px
    if (topDistance > 0 && topDistance < 100) {
      section.classList.add("active");

      // otherwise, remove the class
    } else {
      section.classList.remove("active");
    }
  });
}
/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

function main() {
  // build the nav
  const allSections = getAllSection();
  const navbarList = document.getElementById("navbar__list");

  allSections.forEach((item) => {
    const liE = createMenuLink(item.id, item.name);
    navbarList.appendChild(liE);
  });

  // Add class 'active' to section when near top of viewport

  window.addEventListener("scroll", scrollEvent);

  // Scroll to anchor ID using scrollTO event
  scrollIntoView("section3");
}
/**
 * End Main Functions
 * Begin Events
 *
 */

window.addEventListener("DOMContentLoaded", main());
// Build menu

// Scroll to section on link click

// Set sections as active
