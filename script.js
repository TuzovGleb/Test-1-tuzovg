// ============================================
// RETRO 80s INTERACTIVE SCRIPT
// ============================================

// === NAVIGATION MENU ===
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scroll with offset for fixed nav
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// === ACTIVE SECTION HIGHLIGHTING ===
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = '';
        link.style.borderColor = '';
        link.style.textShadow = '';
        link.style.background = '';

        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = '#ff00ff';
            link.style.borderColor = '#ff00ff';
            link.style.textShadow = '0 0 10px #ff00ff';
            link.style.background = 'rgba(255, 0, 255, 0.1)';
        }
    });
});

// === TYPING EFFECT ===
const typingElement = document.querySelector('.typing');
if (typingElement) {
    const text = 'C:\\USERS\\VISITOR> LOADING PROFILE...';
    let index = 0;

    typingElement.textContent = '';
    typingElement.style.width = '0';

    function typeWriter() {
        if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        }
    }

    // Start typing after a short delay
    setTimeout(() => {
        typingElement.style.width = 'auto';
        typeWriter();
    }, 500);
}

// === GLITCH EFFECT ON SCROLL ===
const glitchElement = document.querySelector('.glitch');
let isGlitching = false;

window.addEventListener('scroll', () => {
    if (!isGlitching && window.scrollY > 50) {
        isGlitching = true;
        glitchElement.style.animation = 'none';

        setTimeout(() => {
            glitchElement.style.animation = 'glitch-text 5s infinite';
            isGlitching = false;
        }, 100);
    }
});

// === PROJECT CARDS ANIMATION ===
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(50px)';

            setTimeout(() => {
                entry.target.style.transition = 'all 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    observer.observe(card);
});

// === TERMINAL BOXES ANIMATION ===
const terminalBoxes = document.querySelectorAll('.terminal-box');
terminalBoxes.forEach(box => {
    observer.observe(box);
});

// === FORM HANDLING ===
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Simulate form submission
        formStatus.textContent = '> TRANSMITTING DATA...';
        formStatus.className = 'form-status';

        setTimeout(() => {
            formStatus.textContent = '> MESSAGE SENT SUCCESSFULLY!';
            formStatus.className = 'form-status success';

            // Reset form
            contactForm.reset();

            // Clear success message after 5 seconds
            setTimeout(() => {
                formStatus.textContent = '';
                formStatus.className = 'form-status';
            }, 5000);
        }, 2000);
    });

    // Form field focus effects
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.querySelector('label').style.color = '#ff00ff';
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.querySelector('label').style.color = '#ffff00';
            }
        });
    });
}

// === RANDOM PIXEL EFFECTS ===
function createPixelEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const pixel = document.createElement('div');
    pixel.style.position = 'absolute';
    pixel.style.width = '2px';
    pixel.style.height = '2px';
    pixel.style.background = `rgba(${Math.random() > 0.5 ? '0,255,255' : '255,0,255'}, 0.5)`;
    pixel.style.left = Math.random() * 100 + '%';
    pixel.style.top = Math.random() * 100 + '%';
    pixel.style.pointerEvents = 'none';
    pixel.style.boxShadow = `0 0 10px ${Math.random() > 0.5 ? '#00ffff' : '#ff00ff'}`;

    hero.appendChild(pixel);

    setTimeout(() => {
        pixel.style.transition = 'opacity 2s';
        pixel.style.opacity = '0';

        setTimeout(() => {
            pixel.remove();
        }, 2000);
    }, 100);
}

// Create random pixel effects periodically
setInterval(createPixelEffect, 3000);

// === KONAMI CODE EASTER EGG ===
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;

        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    document.body.style.animation = 'rainbow 2s linear infinite';

    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
        document.body.style.animation = '';
        style.remove();
    }, 10000);

    // Show easter egg message
    const message = document.createElement('div');
    message.textContent = '> CHEAT CODE ACTIVATED! MAXIMUM RETRO MODE!';
    message.style.position = 'fixed';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.style.background = 'rgba(0, 0, 0, 0.9)';
    message.style.border = '2px solid #00ff00';
    message.style.padding = '20px';
    message.style.color = '#00ff00';
    message.style.fontFamily = 'Press Start 2P';
    message.style.fontSize = '12px';
    message.style.zIndex = '10000';
    message.style.textAlign = 'center';
    message.style.boxShadow = '0 0 30px rgba(0, 255, 0, 0.5)';

    document.body.appendChild(message);

    setTimeout(() => {
        message.style.transition = 'opacity 1s';
        message.style.opacity = '0';
        setTimeout(() => message.remove(), 1000);
    }, 3000);
}

// === CURSOR TRAIL EFFECT ===
let cursorTrail = [];
const maxTrailLength = 20;

document.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768) { // Only on desktop
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.position = 'fixed';
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';
        trail.style.width = '4px';
        trail.style.height = '4px';
        trail.style.background = Math.random() > 0.5 ? '#00ffff' : '#ff00ff';
        trail.style.pointerEvents = 'none';
        trail.style.zIndex = '9997';
        trail.style.opacity = '0.6';
        trail.style.transition = 'opacity 0.5s';

        document.body.appendChild(trail);
        cursorTrail.push(trail);

        if (cursorTrail.length > maxTrailLength) {
            const oldTrail = cursorTrail.shift();
            oldTrail.style.opacity = '0';
            setTimeout(() => oldTrail.remove(), 500);
        }

        setTimeout(() => {
            trail.style.opacity = '0';
        }, 300);
    }
});

// === LOAD ANIMATION ===
window.addEventListener('load', () => {
    const body = document.body;
    body.style.opacity = '0';

    setTimeout(() => {
        body.style.transition = 'opacity 1s';
        body.style.opacity = '1';
    }, 100);
});

// === RETRO CONSOLE LOG ===
console.log('%c' +
    '████████╗██╗   ██╗███████╗ ██████╗ ██╗   ██╗\n' +
    '╚══██╔══╝██║   ██║╚══███╔╝██╔═══██╗██║   ██║\n' +
    '   ██║   ██║   ██║  ███╔╝ ██║   ██║██║   ██║\n' +
    '   ██║   ██║   ██║ ███╔╝  ██║   ██║╚██╗ ██╔╝\n' +
    '   ██║   ╚██████╔╝███████╗╚██████╔╝ ╚████╔╝ \n' +
    '   ╚═╝    ╚═════╝ ╚══════╝ ╚═════╝   ╚═══╝  \n' +
    '\n> WELCOME TO THE MATRIX... I MEAN, MY WEBSITE!\n' +
    '> Looking for secrets? Try the Konami Code...\n' +
    '> ↑ ↑ ↓ ↓ ← → ← → B A',
    'color: #00ff00; font-family: monospace; font-size: 10px;'
);
