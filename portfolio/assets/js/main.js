import { translate } from './translate.js';

const menu = document.querySelector("#aside");
const ham = document.querySelector(".ham");

// Hamburger menu toggle
const SHOW_MENU = document.getElementsByClassName('ham');
for (const show of SHOW_MENU) {
    show.addEventListener("click", () => {
        menu.classList.toggle('active');
        ham.classList.toggle('active');
    });
}

// Right aside menu toggle
const SHOW_RIGHT_ASIDE_MENU = document.getElementById("menu-expand-right-aside");
if (SHOW_RIGHT_ASIDE_MENU) {
    SHOW_RIGHT_ASIDE_MENU.addEventListener("click", () => {
        menu.classList.toggle('active');
        ham.classList.toggle('active');
    });
}

// Fenêtre modale de contact
const modal = document.getElementById("section-contact")
const openModalBtn = document.querySelectorAll(".open-modal")
const closeModalBtn = document.getElementById("close-modal-btn")
const main = document.getElementById("main")

if (openModalBtn) {
    openModalBtn.forEach(button => button.addEventListener("click", (e) => {
        e.stopPropagation();
        modal.style.visibility = "visible"
        modal.classList.add("active")
        menu.classList.toggle('active');
        ham.classList.toggle('active');

        if (modal.classList.contains("active")) {
            main.style.opacity = 0.2
        }
    }))
}
if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => {
        modal.style.visibility = "hidden"
        modal.classList.remove("active")
        main.style.opacity = 1
    })
}
if (modal) {
    modal.addEventListener("click", (e) => {
        e.stopPropagation();
    })
}

// Window click listener
globalThis.addEventListener("click", (e) => {
    if (modal.style.visibility === "visible" && modal.classList.contains("active")) {
        if (!modal.contains(e.target) && e.target !== openModalBtn && !openModalBtn.contains(e.target)) {
            modal.style.visibility = "hidden"
            modal.removeAttribute("class", "active")
        }
    }
    if (menu.classList.contains('active') && e.target !== menu && !menu.contains(e.target) && e.target !== ham && !ham.contains(e.target)) {
        menu.classList.remove('active')
        ham.classList.remove('active')
    }
    if (!modal.classList.contains("active")) {
        main.style.opacity = 1
    }
})

// Scroll to target
const scrollToTop = document.getElementById("scroll-to-top");
const scrollToHome = document.getElementById("aside-home");
const scrollToAbout = document.getElementById("aside-about");
const scrollToWorks = document.getElementById("aside-works");
const scrollToExperience = document.getElementById("aside-experiences");
const scrollToSkillset = document.getElementById("aside-skillset");
const mainTitle = document.getElementById("title");
const aboutTitle = document.getElementById("about");
const worksTitle = document.getElementById("works");
const experiencesTitle = document.getElementById("experiences");
const skillsetTitle = document.getElementById("skillset");
if (scrollToTop) {
    scrollToTop.addEventListener("click", (e) => {
        e.preventDefault();
        mainTitle.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
        menu.classList.toggle('active');
        ham.classList.toggle('active');
    })
}
if (scrollToHome) {
    scrollToHome.addEventListener("click", (e) => {
        e.preventDefault();
        mainTitle.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
        menu.classList.toggle('active');
        ham.classList.toggle('active');
    })
}
if (scrollToAbout) {
    scrollToAbout.addEventListener("click", (e) => {
        e.preventDefault();
        aboutTitle.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
        menu.classList.toggle('active');
        ham.classList.toggle('active');
    })
}
if (scrollToWorks) {
    scrollToWorks.addEventListener("click", (e) => {
        e.preventDefault();
        worksTitle.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
        menu.classList.toggle('active');
        ham.classList.toggle('active');
    })
}
if (scrollToExperience) {
    scrollToExperience.addEventListener("click", (e) => {
        e.preventDefault();
        experiencesTitle.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
        menu.classList.toggle('active');
        ham.classList.toggle('active');
    })
}
if (scrollToSkillset) {
    scrollToSkillset.addEventListener("click", (e) => {
        e.preventDefault();
        skillsetTitle.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
        menu.classList.toggle('active');
        ham.classList.toggle('active');
    })
}

// Configuration
let currentSection = 0;
let isScrolling = false;
const sections = document.querySelectorAll('#title, #about, #works, #experiences, #skillset, #section-footer');
const scrollDelay = 700;

// Détecter si on est sur mobile
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;

// Fonction pour naviguer vers une section
function goToSection(index) {
    if (index < 0 || index >= sections.length) return;

    currentSection = index;
    sections[currentSection].scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Gestionnaire d'événement pour la molette (DESKTOP UNIQUEMENT)
function handleWheel(e) {
    e.preventDefault();
    if (isScrolling) return;

    const direction = e.deltaY > 0 ? 1 : -1;
    const newSection = currentSection + direction;

    if (newSection >= 0 && newSection < sections.length) {
        isScrolling = true;
        goToSection(newSection);

        setTimeout(() => {
            isScrolling = false;
        }, scrollDelay);
    }
}

// Fonction pour détecter la section visible
function updateCurrentSection() {
    const viewportHeight = window.innerHeight;
    const scrollTop = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollTop + viewportHeight >= documentHeight - 10) {
        currentSection = sections.length - 1;
        return;
    }

    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= -50 && rect.top <= 50) {
            currentSection = index;
        }
    });
}

// Synchroniser currentSection lors des clics sur la navigation
const navLinks = document.querySelectorAll('aside a, nav a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        setTimeout(updateCurrentSection, 800);
    });
});

globalThis.addEventListener('scroll', updateCurrentSection);

// Attacher l'événement wheel UNIQUEMENT sur desktop
if (!isMobile) {
    globalThis.addEventListener('wheel', handleWheel, { passive: false });
}
// SINON : sur mobile, laisser le scroll TOTALEMENT NATIF (pas de touchstart/touchend)

// Observer pour les animations au scroll
const observerOptions = {
    root: null, // viewport
    rootMargin: '0px',
    threshold: 0.1 // 10% de l'élément visible
};

const animateOnScroll = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
};

const observer = new IntersectionObserver(animateOnScroll);

// Sélectionner tous les éléments à animer
const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
elementsToAnimate.forEach(element => {
    observer.observe(element);
});

// Navigation par touches clavier
globalThis.addEventListener('keydown', (e) => {
    if (isScrolling) return;

    let newSection = currentSection;

    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        newSection++;
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        newSection--;
    } else if (e.key === 'Escape') {
        modal.style.visibility = "hidden";
        modal.removeAttribute("class", "active")
        return;
    }

    if (newSection !== currentSection && newSection >= 0 && newSection < sections.length) {
        isScrolling = true;
        goToSection(newSection);

        setTimeout(() => {
            isScrolling = false;
        }, scrollDelay);
    }
});

///// Section-1 CSS-Slider /////    
// Auto Switching Images for CSS-Slider
// Auto-switching du carousel toutes les 5 secondes
function bannerSwitcher() {
    const next = $('.sec-1-input').filter(':checked').next('.sec-1-input');

    if (next.length) {
        next.prop('checked', true);
    } else {
        $('.sec-1-input').first().prop('checked', true);
    }
}

// Lance l'auto-play
let bannerTimer = setInterval(bannerSwitcher, 15000);

// Reset le timer quand on clique manuellement
$('.controls label').click(function () {
    clearInterval(bannerTimer);
    bannerTimer = setInterval(bannerSwitcher, 15000);
});

// ------- Email submission ------- //
emailjs.init("sVSsUe4ci3vnrDJOt");
const contactForm = document.getElementById("contact-form");

let lastSubmitTime = 0;
const THROTTLE_DELAY = 60000;

if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const now = Date.now();
        const timeSinceLastSubmit = now - lastSubmitTime;

        if (timeSinceLastSubmit < THROTTLE_DELAY) {
            const remainingTime = Math.ceil((THROTTLE_DELAY - timeSinceLastSubmit) / 1000);
            alert(`⏱️ Please wait ${remainingTime} seconds before sending another message.`);
            return;
        }

        const submitButton = document.getElementById("form-button");
        const originalText = submitButton.textContent;

        submitButton.textContent = "Sending...";
        submitButton.disabled = true;

        const formData = {
            from_email: document.getElementById("form-email").value,
            message: document.getElementById("form-message").value,
            from_name: document.getElementById("form-name")?.value || "Anonyme"
        };

        emailjs.send("service_77rss5v", "template_hhbdshv", formData)
            .then(() => {
                lastSubmitTime = Date.now();

                alert("Message envoyé avec succès !");
                contactForm.reset();
                modal.style.visibility = "hidden";
                modal.classList.remove("active");
                main.style.opacity = 1;

                submitButton.textContent = originalText;
                submitButton.disabled = false;
            })
            .catch((error) => {
                alert("Erreur lors de l'envoi : " + error.text);

                submitButton.textContent = originalText;
                submitButton.disabled = false;
            });
    });
}

// Dark mode toggle - gérer les DEUX aside
const themeToggle = document.getElementById("themeToggle");
const themeToggleAside = document.getElementById("themeToggleAside");

function applyTheme(newTheme) {
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    if (newTheme === 'light') {
        document.getElementById("home-logo").setAttribute('src', '/portfolio/img/R-logo-purple-flat.svg');
        document.getElementById("scroll-to-top").setAttribute('src', '/portfolio/img/top-arrow-logo-purple.svg');
        document.getElementById("github-aside").setAttribute('src', '/portfolio/img/github-purple.svg');
        document.getElementById("linkedin-aside").setAttribute('src', '/portfolio/img/linkedin-purple.svg');
        document.getElementById("github-footer").setAttribute('src', '/portfolio/img/github-purple.svg');
        document.getElementById("linkedin-footer").setAttribute('src', '/portfolio/img/linkedin-purple.svg');
        // Vérification de la page pour le logo qui n'apparaît que sur index
        if (window.location.pathname.includes('index')) {
            document.getElementById("bash").setAttribute('src', '/portfolio/img/bash-light.svg');
        }
        document.querySelectorAll(".line").forEach(line => line.style.stroke = "#8C0693");
        document.getElementById("menu-expand-right-aside").setAttribute('src', '/portfolio/img/menu-expand-right-purple.svg');
    } else if (newTheme === 'dark') {
        document.getElementById("home-logo").setAttribute('src', '/portfolio/img/R-logo-pink-flat.svg');
        document.getElementById("scroll-to-top").setAttribute('src', '/portfolio/img/top-arrow-logo.svg');
        document.getElementById("github-aside").setAttribute('src', '/portfolio/img/github.svg');
        document.getElementById("linkedin-aside").setAttribute('src', '/portfolio/img/linkedin.svg');
        document.getElementById("github-footer").setAttribute('src', '/portfolio/img/github.svg');
        document.getElementById("linkedin-footer").setAttribute('src', '/portfolio/img/linkedin.svg');
        // Vérification de la page pour le logo qui n'apparaît que sur index
        if (window.location.pathname.includes('index')) {
            document.getElementById("bash").setAttribute('src', '/portfolio/img/bash_dark.svg');
        }

        document.querySelectorAll(".line").forEach(line => line.style.stroke = "#fa7c91");
        document.getElementById("menu-expand-right-aside").setAttribute('src', '/portfolio/img/menu-expand-right.svg');
    }

    // Synchroniser les deux checkboxes
    const isLight = newTheme === 'light';
    if (themeToggle) themeToggle.checked = isLight;
    if (themeToggleAside) themeToggleAside.checked = isLight;
}

// Événements pour les deux toggles
if (themeToggle) {
    themeToggle.addEventListener("change", () => {
        const newTheme = themeToggle.checked ? 'light' : 'dark';
        applyTheme(newTheme);
    });
}

if (themeToggleAside) {
    themeToggleAside.addEventListener("change", () => {
        const newTheme = themeToggleAside.checked ? 'light' : 'dark';
        applyTheme(newTheme);
    });
}

// Language toggle - même logique
const langToggle = document.getElementById("langToggle");
const langToggleAside = document.getElementById("langToggleAside");

function applyLanguage(newLang) {
    document.documentElement.setAttribute('data-lang', newLang);
    localStorage.setItem('lang', newLang);
    translate(newLang);

    // Synchroniser les deux checkboxes
    const isFr = newLang === 'fr';
    if (langToggle) langToggle.checked = isFr;
    if (langToggleAside) langToggleAside.checked = isFr;
}

if (langToggle) {
    langToggle.addEventListener("change", () => {
        const newLang = langToggle.checked ? 'fr' : 'en';
        applyLanguage(newLang);
    });
}

if (langToggleAside) {
    langToggleAside.addEventListener("change", () => {
        const newLang = langToggleAside.checked ? 'fr' : 'en';
        applyLanguage(newLang);
    });
}

// Initialisation au chargement
const savedTheme = localStorage.getItem('theme') || 'dark';
const savedLang = localStorage.getItem('lang') || 'en';
applyTheme(savedTheme);
applyLanguage(savedLang);