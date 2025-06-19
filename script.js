// Initialize GSAP and Plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Load Lottie Player
const lottieScript = document.createElement('script');
lottieScript.src = 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js';
document.head.appendChild(lottieScript);

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    const isDark = body.getAttribute('data-theme') === 'dark';
    body.setAttribute('data-theme', isDark ? 'light' : 'dark');
    themeToggle.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
    gsap.to(body, {
        duration: 0.6,
        backgroundColor: isDark ? '#ffffff' : '#0f172a',
        ease: 'power2.inOut'
    });
});

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', savedTheme);
themeToggle.innerHTML = savedTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';

// Loader
const loader = document.querySelector('.loader-container');
const content = document.querySelector('main');

window.addEventListener('load', () => {
    gsap.to(loader, {
        opacity: 0,
        duration: 0.7,
        delay: 2.5,
        ease: 'power2.inOut',
        onComplete: () => {
            loader.classList.add('hidden');
            content.style.opacity = '1';
            content.style.visibility = 'visible';
        }
    });
});

// Mobile Menu
const mobileMenuBtn = document.createElement('button');
mobileMenuBtn.className = 'mobile-menu-btn';
mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
document.querySelector('.navbar').prepend(mobileMenuBtn);
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    gsap.to(navLinks, {
        duration: 0.4,
        height: navLinks.classList.contains('active') ? 'auto' : 0,
        ease: 'power2.inOut'
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                duration: 1,
                scrollTo: { y: target, offsetY: 80 },
                ease: 'power2.inOut'
            });
            navLinks.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});

// Ripple Effect
function createRipple(e) {
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    e.currentTarget.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
}

document.querySelectorAll('.cta-button, .submit-btn, .solution-link, .case-study-link, .social-icon').forEach(el => {
    el.addEventListener('click', createRipple);
});

// Scroll-Triggered Animations
gsap.utils.toArray('.solution-card, .service-card, .case-study-card, .stat-card').forEach((card, i) => {
    gsap.from(card, {
        y: 80,
        opacity: 0,
        duration: 1,
        delay: i * 0.15,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reset'
        }
    });
});

// Hero Animation
gsap.from('.hero-content', {
    y: 100,
    opacity: 0,
    duration: 1.5,
    ease: 'power3.out',
    delay: 1
});

gsap.from('.hero-lottie', {
    scale: 0,
    opacity: 0,
    duration: 2,
    ease: 'elastic.out(1, 0.4)',
    delay: 1.2
});

// Parallax Effects
gsap.to('.hero-video', {
    yPercent: 20,
    scale: 1.2,
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    }
});

gsap.to('.hero-lottie', {
    yPercent: -10,
    rotation: 10,
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    }
});

gsap.utils.toArray('.solution-card').forEach(card => {
    gsap.to(card, {
        yPercent: -10,
        scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });
});

// Testimonial Slider with Chart.js Graphs
const testimonialItems = document.querySelectorAll('.testimonial-item');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentSlide = 0;

function initCharts() {
    document.querySelectorAll('.testimonial-chart').forEach((canvas, index) => {
        new Chart(canvas, {
            type: 'bar',
            data: {
                labels: ['Before', 'During', 'After'],
                datasets: [{
                    label: 'Performance',
                    data: index === 0 ? [40, 65, 80] : [30, 70, 95],
                    backgroundColor: ['#00d4ff', '#ff007a', '#60a5fa'],
                    borderColor: ['#ff007a', '#00d4ff', '#3b82f6'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                animation: {
                    duration: 1200,
                    easing: 'easeOutQuart'
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    });
}

function showTestimonial(index) {
    testimonialItems.forEach((item, i) => {
        item.classList.toggle('active', i === index);
        gsap.from(item, {
            x: i === index ? 100 : -100,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.inOut',
            delay: i === index ? 0.2 : 0
        });
    });
}

prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + testimonialItems.length) % testimonialItems.length;
    showTestimonial(currentSlide);
});

nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % testimonialItems.length;
    showTestimonial(currentSlide);
});

// Auto-play testimonials
let autoPlayInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % testimonialItems.length;
    showTestimonial(currentSlide);
}, 6000);

document.querySelector('.testimonial-slider').addEventListener('mouseenter', () => {
    clearInterval(autoPlayInterval);
});

document.querySelector('.testimonial-slider').addEventListener('mouseleave', () => {
    autoPlayInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % testimonialItems.length;
        showTestimonial(currentSlide);
    }, 6000);
});

showTestimonial(currentSlide);
initCharts();

// 3D Tilt Effects
VanillaTilt.init(document.querySelectorAll('.solution-card, .service-card, .case-study-card, .stat-card'), {
    max: 20,
    speed: 300,
    glare: true,
    'max-glare': 0.4
});

// Contact Form Animations
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        gsap.to(contactForm, {
            duration: 0.6,
            y: -30,
            ease: 'power2.inOut',
            onComplete: () => {
                contactForm.reset();
                gsap.to(contactForm, {
                    duration: 0.6,
                    y: 0,
                    ease: 'power2.inOut'
                });
                const successMsg = document.createElement('div');
                successMsg.textContent = 'Message sent successfully!';
                successMsg.style.cssText = `
                    position: absolute;
                    top: -40px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: var(--gradient-1);
                    color: white;
                    padding: 12px 24px;
                    border-radius: 25px;
                    font-weight: bold;
                    box-shadow: 0 4px 12px rgba(0, 212, 255, 0.3);
                `;
                contactForm.appendChild(successMsg);
                gsap.to(successMsg, {
                    duration: 0.6,
                    opacity: 1,
                    ease: 'power2.inOut',
                    onComplete: () => {
                        setTimeout(() => {
                            gsap.to(successMsg, {
                                duration: 0.6,
                                opacity: 0,
                                onComplete: () => successMsg.remove()
                            });
                        }, 2500);
                    }
                });
            }
        });
    });

    contactForm.querySelectorAll('input, textarea, select').forEach(input => {
        input.addEventListener('focus', () => {
            gsap.to(input, {
                duration: 0.4,
                borderColor: 'var(--primary-color)',
                boxShadow: '0 0 0 4px rgba(0, 212, 255, 0.2)',
                ease: 'power2.inOut'
            });
        });
        input.addEventListener('blur', () => {
            gsap.to(input, {
                duration: 0.4,
                borderColor: 'var(--border-color)',
                boxShadow: 'none',
                ease: 'power2.inOut'
            });
        });
    });
}

// Stats Animation
gsap.utils.toArray('.stat-card h3').forEach((number, i) => {
    const finalValue = parseInt(number.textContent.replace(/[^0-9]/g, ''));
    gsap.from(number, {
        textContent: 0,
        duration: 2.5,
        ease: 'power2.inOut',
        snap: { textContent: 1 },
        scrollTrigger: {
            trigger: number,
            start: 'top 85%',
            toggleActions: 'play none none reset'
        },
        onUpdate: function() {
            number.textContent = Math.floor(this.targets()[0].textContent) + '+';
        }
    });
});

// Accessibility: Keyboard Navigation
document.querySelectorAll('.cta-button, .submit-btn, .solution-link, .case-study-link, .social-icon, .prev-btn, .next-btn').forEach(el => {
    el.setAttribute('tabindex', '0');
    el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            el.click();
        }
    });
});

// Lottie Animations for Solutions
document.querySelectorAll('.solution-lottie').forEach((el, i) => {
    el.setAttribute('src', [
        'https://assets.lottiefiles.com/packages/lf20_5k8pkazv.json', // AI Brain
        'https://assets.lottiefiles.com/packages/lf20_m3znfk2z.json', // Cloud
        'https://assets.lottiefiles.com/packages/lf20_xj2vpluj.json'  // Shield
    ][i % 3]);
    el.addEventListener('mouseenter', () => {
        el.play();
    });
    el.addEventListener('mouseleave', () => {
        el.stop();
    });
});

// Canvas Animation for Hero
const canvas = document.querySelector('.hero-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function drawSwirl() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) * 0.4;
    const speed = 0.05;
    const time = Date.now() * speed;

    for (let i = 0; i < 5; i++) {
        const angleOffset = (i * Math.PI / 2) + time;
        ctx.beginPath();
        ctx.strokeStyle = `hsl(${200 - i * 40}, 80%, 60%)`;
        ctx.lineWidth = 2;
        for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
            const r = radius * (1 + Math.sin(angle * 3 + time + angleOffset) * 0.3);
            const x = centerX + Math.cos(angle) * r;
            const y = centerY + Math.sin(angle) * r;
            if (angle === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
    }
    requestAnimationFrame(drawSwirl);
}

drawSwirl();

// Log AI Tools Used
console.log('AI Tools Used: Grok 3 (xAI) for code suggestions and enhancements');