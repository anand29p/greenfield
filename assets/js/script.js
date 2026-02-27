/* =============================================
   GREENFIELD INTERNATIONAL ACADEMY — SHARED JS
   ============================================= */

// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
}

// ── Mobile burger menu ──
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('open');
        const spans = burger.querySelectorAll('span');
        spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
        spans[1].style.opacity = isOpen ? '0' : '';
        spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            burger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
        });
    });
}

// ── Scroll Reveal (Intersection Observer) ──
const revealEls = document.querySelectorAll('.animate-reveal');
if (revealEls.length) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => revealObserver.observe(el));
}

// ── Animated Counters (home hero stats) ──
function animateCounter(el, target, duration = 1800) {
    let start = 0;
    const step = target / (duration / 16);
    const tick = () => {
        start += step;
        if (start < target) {
            el.textContent = Math.floor(start).toLocaleString();
            requestAnimationFrame(tick);
        } else {
            el.textContent = target.toLocaleString();
        }
    };
    requestAnimationFrame(tick);
}
const statNums = document.querySelectorAll('.stat__num');
if (statNums.length) {
    let started = false;
    const heroStats = document.querySelector('.hero__stats');
    if (heroStats) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !started) {
                    started = true;
                    statNums.forEach(el => {
                        const target = parseInt(el.dataset.target, 10);
                        setTimeout(() => animateCounter(el, target), 500 + Math.random() * 200);
                    });
                }
            });
        }, { threshold: 0.5 });
        statsObserver.observe(heroStats);
    }
}

// ── Active nav link ──
// Each page already hardcodes class="active" on the correct nav link.
// Only run JS-based detection when no hardcoded active link is present
// (prevents incorrectly stripping the active class under file:// protocol).
function setActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav__links a');
    const alreadyActive = Array.from(navLinks).some(l => l.classList.contains('active'));
    if (alreadyActive) return; // trust the hardcoded active class
    const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
    navLinks.forEach(link => {
        const href = new URL(link.href, window.location.origin).pathname.replace(/\/$/, '') || '/';
        link.classList.toggle('active', href === currentPath);
    });
}
setActiveNavLink();

// ── Contact Form ──
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const original = btn.textContent;
        btn.textContent = '✓ Message Sent!';
        btn.style.background = 'var(--green-500)';
        btn.style.pointerEvents = 'none';
        setTimeout(() => {
            btn.textContent = original;
            btn.style.background = '';
            btn.style.pointerEvents = '';
            form.reset();
        }, 3500);
    });
}

// ── Parallax hero orbs on mouse move ──
window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 18;
    const y = (e.clientY / window.innerHeight - 0.5) * 18;
    document.querySelectorAll('.hero__orb--1,.page-hero__orb').forEach(orb => {
        orb.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
    });
    document.querySelectorAll('.hero__orb--2,.page-hero__orb--gold').forEach(orb => {
        orb.style.transform = `translate(${-x * 0.35}px, ${-y * 0.35}px)`;
    });
}, { passive: true });

// ── Subtle cursor glow ──
const glow = document.createElement('div');
glow.style.cssText = 'position:fixed;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(45,143,78,0.05) 0%,transparent 70%);pointer-events:none;z-index:0;transform:translate(-50%,-50%);transition:opacity .3s;';
document.body.appendChild(glow);
window.addEventListener('mousemove', e => { glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px'; }, { passive: true });
