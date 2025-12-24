window.addEventListener("scroll",() => {
    document.querySelectorAll(".fill").forEach(bar => {
    bar.style.opacity = 1;
    });
});

//Navbar Scroll Shadow
window.addEventListener("scroll", () =>{
    const navbar = document.querySelector(".navbar");
    navbar.classList.toggle("scrolled", window.scrollY > 10);
});

//Mobile Menu Toggle 
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nv-links");

menuToggle.addEventListener("click", () => {
   navLinks.classList.toggle("show");
});

//Active Link On Click
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".nav-link").forEach(l = l.classList.remove("active"));
    link.classList.add("active");
    navLinks.classList.remove("show");
  });
});

//Hero
const text = "Aspiring Software Engineering Student";
let index = 0;

function typeEffect() {
    if(index < text.length) {
        document.getElementById("typing").textContent += text.charAt(index);
        index++;
        setTimeout(typeEffect, 80);
    }
}

window.addEventListener("load", typeEffect)

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  });
});

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.15 }
);

reveals.forEach(section => observer.observe(section));

const heroImg = document.querySelector(".hero-img img");

window.addEventListener("mousemove", e => {
  const x = (window.innerWidth / 2 - e.pageX) / 40;
  const y = (window.innerHeight / 2 - e.pageY) / 40;

  heroImg.style.transform = `translate(${x}px, ${y}px)`;
});

document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
  });
});

const skillCards = document.querySelectorAll(".skill-card");

skillCards.forEach((card, index) => {
  card.style.transitionDelay = `${index * 0.1}s`;
});

document.querySelectorAll(".contact-card").forEach(card => {
  card.addEventListener("click", () => {
    card.style.boxShadow = "0 0 30px rgba(255,122,24,0.4)";
    setTimeout(() => {
      card.style.boxShadow = "";
    }, 300);
  });
});

