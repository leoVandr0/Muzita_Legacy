/**
 * Golden Years Care Home - Main JavaScript
 * Handles navigation, animations, sliders, and interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initNavigation();
    initScrollAnimations();
    initTestimonialSlider();
    initConditionAccordions();
    initGalleryLightbox();
    initSmoothScroll();
    initFormValidation();
});

/**
 * Navigation Module
 * Handles mobile menu toggle and active state
 */
function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Toggle hamburger animation
            const spans = menuToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
    
    // Set active nav item based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (currentPage === 'index.html' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

/**
 * Scroll Animations Module
 * Implements fade-in animations on scroll
 */
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optionally unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(el => observer.observe(el));
}

/**
 * Testimonial Slider Module
 * Handles testimonial carousel functionality
 */
function initTestimonialSlider() {
    const slider = document.querySelector('.testimonials-slider');
    if (!slider) return;
    
    const slides = slider.querySelectorAll('.testimonial-card');
    const prevBtn = slider.querySelector('.slider-prev');
    const nextBtn = slider.querySelector('.slider-next');
    const dots = slider.querySelectorAll('.slider-dot');
    
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    
    function showSlide(index) {
        // Handle wrapping
        if (index >= slides.length) currentSlide = 0;
        else if (index < 0) currentSlide = slides.length - 1;
        else currentSlide = index;
        
        // Update slides
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === currentSlide);
        });
        
        // Update dots
        if (dots.length > 0) {
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });
        }
    }
    
    // Event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });
    
    // Auto-advance slides
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 6000);
    
    // Initialize first slide
    showSlide(0);
}

/**
 * Condition Accordions Module
 * Handles expand/collapse for disease/condition cards
 */
function initConditionAccordions() {
    const conditionHeaders = document.querySelectorAll('.condition-header');
    
    conditionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const card = this.parentElement;
            const isActive = card.classList.contains('active');
            
            // Close all other cards (optional - remove for multiple open)
            document.querySelectorAll('.condition-card').forEach(c => {
                c.classList.remove('active');
            });
            
            // Toggle current card
            if (!isActive) {
                card.classList.add('active');
            }
        });
    });
}

/**
 * Gallery Lightbox Module
 * Handles image lightbox functionality
 */
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.lightbox');
    const lightboxClose = document.querySelector('.lightbox-close');
    
    if (!lightbox) return;
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

/**
 * Smooth Scroll Module
 * Handles smooth scrolling for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Form Validation Module
 * Handles contact form validation and submission
 */
function initFormValidation() {
    const form = document.querySelector('.contact-form form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        // Clear previous errors
        form.querySelectorAll('.form-error').forEach(el => el.remove());
        
        requiredFields.forEach(field => {
            const value = field.value.trim();
            
            if (!value) {
                isValid = false;
                showFieldError(field, 'This field is required');
            } else if (field.type === 'email' && !isValidEmail(value)) {
                isValid = false;
                showFieldError(field, 'Please enter a valid email address');
            } else if (field.type === 'tel' && !isValidPhone(value)) {
                isValid = false;
                showFieldError(field, 'Please enter a valid phone number');
            }
        });
        
        if (isValid) {
            // Show success message
            showFormSuccess();
            form.reset();
        }
    });
    
    function showFieldError(field, message) {
        field.style.borderColor = '#E74C3C';
        
        const error = document.createElement('span');
        error.className = 'form-error';
        error.textContent = message;
        error.style.cssText = 'color: #E74C3C; font-size: 14px; display: block; margin-top: 5px;';
        
        field.parentNode.appendChild(error);
        
        // Remove error on input
        field.addEventListener('input', function() {
            this.style.borderColor = '';
            const err = this.parentNode.querySelector('.form-error');
            if (err) err.remove();
        }, { once: true });
    }
    
    function showFormSuccess() {
        const existingSuccess = form.querySelector('.form-success');
        if (existingSuccess) existingSuccess.remove();
        
        const success = document.createElement('div');
        success.className = 'form-success';
        success.textContent = 'Thank you for your message! We will get back to you soon.';
        success.style.cssText = `
            background: #E6D9F2;
            color: #6A0DAD;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            font-weight: 500;
            text-align: center;
        `;
        
        form.insertBefore(success, form.firstChild);
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            success.remove();
        }, 5000);
    }
    
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    function isValidPhone(phone) {
        return /^[\d\s\-\+\(\)]{10,}$/.test(phone);
    }
}

/**
 * Utility: Debounce function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Utility: Throttle function
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Expose utilities globally for potential inline usage
window.GoldenYearsUtils = {
    debounce,
    throttle
};
