// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Typewriter effect
    const typedTextSpan = document.querySelector('.typed-text');
    const texts = ["Computer Science Engineer", "Java Developer", "Python Enthusiast", "Web Developer"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 150;
    let deletingDelay = 75;
    let newTextDelay = 2000;

    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = deletingDelay;
        } else {
            typedTextSpan.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 150;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingDelay = newTextDelay;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }

        setTimeout(type, typingDelay);
    }

    if (typedTextSpan) {
        setTimeout(type, newTextDelay);
    }

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fadeIn');
                
                // Special animation for skill bars
                if (entry.target.classList.contains('skills-content')) {
                    entry.target.classList.add('animate-skill');
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    // Observe all sections
    document.querySelectorAll('.section').forEach((section) => {
        observer.observe(section);
    });

    // Observe other elements that need animations
    document.querySelectorAll('.skills-content, .project-card, .achievement-card').forEach((el) => {
        observer.observe(el);
    });

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Form would normally submit to a backend here
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }

    // Code animation in background
    function createCodeElements() {
        const codeStrings = [
            "function init() { /* ... */ }",
            "const app = new Application();",
            "if (loading) return <Spinner />;",
            "class Developer extends Human { /* ... */ }",
            "export default Portfolio;",
            "const skills = ['Java', 'Python', 'HTML', 'CSS'];",
            "async function fetchData() { /* ... */ }",
            "return { success: true, data };",
            "<div className=\"project\">...</div>",
            "import React from 'react';",
            "git commit -m \"Portfolio update\"",
            "npm install --save dependencies"
        ];
        
        const heroSection = document.querySelector('.hero');
        const aboutSection = document.querySelector('.about');
        
        for (let i = 0; i < 10; i++) {
            const codeEl = document.createElement('div');
            codeEl.classList.add('code-animation');
            codeEl.textContent = codeStrings[Math.floor(Math.random() * codeStrings.length)];
            
            // Random position
            codeEl.style.left = `${Math.random() * 100}%`;
            codeEl.style.top = `${Math.random() * 100}%`;
            codeEl.style.opacity = `${Math.random() * 0.5 + 0.1}`;
            
            // Add to either hero or about section
            if (i < 6 && heroSection) {
                heroSection.appendChild(codeEl);
            } else if (aboutSection) {
                aboutSection.appendChild(codeEl);
            }
        }
    }
    
    // Create animated code elements
    createCodeElements();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});