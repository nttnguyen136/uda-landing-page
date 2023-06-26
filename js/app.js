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
  const liTag = document.createElement("li");
  const aTag = document.createElement("a");

  aTag.textContent = name;
  aTag.classList.add("menu__link");
  aTag.setAttribute("data-nav", id);

  aTag.addEventListener("click", handleClick);

  liTag.appendChild(aTag);

  return liTag;
}

function handleClick(event) {
  event.preventDefault();

  const target = event.target;
  const dataNav = target.attributes["data-nav"].value;

  if (dataNav) {
    scrollIntoView(dataNav);
  }
}

function scrollIntoView(id) {
  const view = document.getElementById(id);
  view.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
}

function updateActiveSection() {
  const sections = document.querySelectorAll("section");

  // loop through each section
  sections.forEach((section) => {
    const { top, height } = section.getBoundingClientRect();

    if (top > 0 && top <= height) {
      activeClass(section.id);
      section.classList.add("active");
    } else {
      section.classList.remove("active");
    }
  });
}

function scrollEvent(_) {
  // get all sections on the page
  updateActiveSection();
}

function activeClass(data) {
  const menuLinkList = document.getElementsByClassName("menu__link");

  Array.from(menuLinkList).forEach((menu) => {
    const dataNav = menu.attributes["data-nav"].value;

    if (dataNav == data) {
      menu.classList.add("active");
    } else {
      menu.classList.remove("active");
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
  // Update 'active' section the first time
  updateActiveSection();

  // Scroll to anchor ID using scrollTO event
  window.addEventListener("scroll", scrollEvent);
}
/**
 * End Main Functions
 * Begin Events
 *
 */

window.addEventListener("DOMContentLoaded", main());
