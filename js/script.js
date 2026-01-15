// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Boot sequence
    setTimeout(() => {
        const bootScreen = document.getElementById('boot-screen');
        const mainContent = document.getElementById('main-content');

        bootScreen.style.display = 'none';
        mainContent.classList.remove('hidden');
    }, 5000);

    // Navigation
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.section');

    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');

            // Hide all sections
            sections.forEach(section => {
                section.classList.remove('active');
                section.classList.add('hidden');
            });

            // Show target section
            const target = document.getElementById(targetSection);
            if (target) {
                target.classList.remove('hidden');
                target.classList.add('active');

                // Play click sound effect (simulated)
                playBeep();
            }

            // Highlight active button
            navButtons.forEach(btn => {
                btn.style.backgroundColor = 'var(--secondary-bg)';
                btn.style.color = 'var(--primary-color)';
            });
            this.style.backgroundColor = 'var(--primary-color)';
            this.style.color = 'var(--primary-bg)';
        });
    });

    // Easter Eggs
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-10);

        if (konamiCode.join(',') === konamiSequence.join(',')) {
            activateEasterEgg();
        }
    });

    // Matrix rain easter egg (Ctrl + Shift + M)
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.shiftKey && e.key === 'M') {
            e.preventDefault();
            toggleMatrixRain();
        }
    });

    // Konami code easter egg function
    function activateEasterEgg() {
        const body = document.body;
        body.style.animation = 'rainbow 2s infinite';

        // Create CSS for rainbow effect
        if (!document.getElementById('rainbow-style')) {
            const style = document.createElement('style');
            style.id = 'rainbow-style';
            style.innerHTML = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }

        alert('🎮 KONAMI CODE ACTIVATED! 🎮\n\nYou\'ve unlocked RAINBOW MODE!');

        setTimeout(() => {
            body.style.animation = '';
        }, 10000);
    }

    // Matrix rain effect
    let matrixActive = false;
    let matrixCanvas = null;

    function toggleMatrixRain() {
        if (!matrixActive) {
            createMatrixRain();
            matrixActive = true;
        } else {
            if (matrixCanvas) {
                matrixCanvas.remove();
                matrixCanvas = null;
                matrixActive = false;
            }
        }
    }

    function createMatrixRain() {
        matrixCanvas = document.createElement('canvas');
        matrixCanvas.style.position = 'fixed';
        matrixCanvas.style.top = '0';
        matrixCanvas.style.left = '0';
        matrixCanvas.style.width = '100%';
        matrixCanvas.style.height = '100%';
        matrixCanvas.style.pointerEvents = 'none';
        matrixCanvas.style.zIndex = '9997';
        document.body.appendChild(matrixCanvas);

        const ctx = matrixCanvas.getContext('2d');
        matrixCanvas.width = window.innerWidth;
        matrixCanvas.height = window.innerHeight;

        const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%^&*()';
        const fontSize = 14;
        const columns = matrixCanvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);

        function drawMatrix() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

            ctx.fillStyle = '#00ff00';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        const matrixInterval = setInterval(() => {
            if (!matrixActive) {
                clearInterval(matrixInterval);
            } else {
                drawMatrix();
            }
        }, 33);
    }

    // Simulated beep sound
    function playBeep() {
        // Create audio context for beep sound
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = 800;
            oscillator.type = 'square';

            gainNode.gain.value = 0.1;
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (e) {
            // Audio not supported, silently fail
        }
    }

    // Random glitch effect on header
    setInterval(() => {
        const header = document.querySelector('.glitch');
        if (header && Math.random() > 0.95) {
            header.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
            setTimeout(() => {
                header.style.transform = 'translate(0, 0)';
            }, 100);
        }
    }, 200);

    // Project item hover effect with sound
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            playBeep();
        });

        item.addEventListener('click', function() {
            const stats = this.querySelector('.project-stats');
            if (stats) {
                stats.style.animation = 'blink 0.5s';
                setTimeout(() => {
                    stats.style.animation = '';
                }, 500);
            }
        });
    });

    // Console message
    console.log('%c██████╗ ███████╗████████╗██████╗  ██████╗ ', 'color: #00ff00; font-weight: bold;');
    console.log('%c██╔══██╗██╔════╝╚══██╔══╝██╔══██╗██╔═══██╗', 'color: #00ff00; font-weight: bold;');
    console.log('%c██████╔╝█████╗     ██║   ██████╔╝██║   ██║', 'color: #00ff00; font-weight: bold;');
    console.log('%c██╔══██╗██╔══╝     ██║   ██╔══██╗██║   ██║', 'color: #00ff00; font-weight: bold;');
    console.log('%c██║  ██║███████╗   ██║   ██║  ██║╚██████╔╝', 'color: #00ff00; font-weight: bold;');
    console.log('%c╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ', 'color: #00ff00; font-weight: bold;');
    console.log('%c\nWelcome to the retro zone! 🕹️', 'color: #ffff00; font-size: 16px;');
    console.log('%cEaster eggs:', 'color: #00ff00; font-size: 14px;');
    console.log('%c- Try the Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A', 'color: #00aa00;');
    console.log('%c- Press Ctrl+Shift+M for Matrix mode', 'color: #00aa00;');
    console.log('%c\n Made with ❤️ and много багов', 'color: #00ff00; font-style: italic;');

    // Random CRT flicker intensity
    setInterval(() => {
        const crtOverlay = document.querySelector('.crt-overlay');
        if (crtOverlay && Math.random() > 0.98) {
            crtOverlay.style.opacity = '0.9';
            setTimeout(() => {
                crtOverlay.style.opacity = '0.95';
            }, 50);
        }
    }, 1000);

    // Typing effect for terminal text (optional enhancement)
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.textContent = '';

        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }

        type();
    }

    // Add click counter easter egg
    let clickCount = 0;
    const header = document.querySelector('h1');

    if (header) {
        header.addEventListener('click', function() {
            clickCount++;

            if (clickCount === 10) {
                alert('🎯 Achievement Unlocked!\n\n"Persistent Clicker"\n\nYou clicked the header 10 times!\n\nДевиз программиста: Если оно не работает - нажми еще раз!');
                clickCount = 0;
            }
        });
    }

    // Prevent accidental Ctrl+Alt+Del
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.altKey && e.key === 'Delete') {
            e.preventDefault();
            alert('😄 Nice try!\n\nНо это не Windows 95!\n\nХотя стиль у нас похожий...');
        }
    });

    // Secret command line (type "help" anywhere)
    let commandBuffer = '';
    document.addEventListener('keypress', function(e) {
        if (!e.target.matches('input, textarea')) {
            commandBuffer += e.key;
            commandBuffer = commandBuffer.slice(-10);

            if (commandBuffer.includes('help')) {
                console.clear();
                console.log('%c╔════════════════════════════════════╗', 'color: #00ff00;');
                console.log('%c║     HELP SYSTEM v1.0               ║', 'color: #00ff00;');
                console.log('%c╚════════════════════════════════════╝', 'color: #00ff00;');
                console.log('%c\nAvailable commands:', 'color: #ffff00;');
                console.log('%c- Konami Code: ↑↑↓↓←→←→BA', 'color: #00aa00;');
                console.log('%c- Ctrl+Shift+M: Matrix mode', 'color: #00aa00;');
                console.log('%c- Click header 10 times', 'color: #00aa00;');
                console.log('%c- Type "secret" anywhere', 'color: #00aa00;');
                commandBuffer = '';
            }

            if (commandBuffer.includes('secret')) {
                document.body.style.transform = 'rotate(180deg)';
                alert('🙃 Oops! Everything is upside down!\n\nRefresh to fix... or enjoy the view!');
                commandBuffer = '';
            }
        }
    });
});
