/**
 * Elite Content Solutions - Main JavaScript File
 * Contains general site functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    setupMobileMenu();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize smooth scrolling for anchor links
    initSmoothScrolling();
    
    // Initialize testimonial slider if it exists
    if (document.querySelector('.testimonial-slider')) {
        initTestimonialSlider();
    }
    
    // Initialize contact form validation if form exists
    if (document.getElementById('contact-form')) {
        initContactFormValidation();
    }
});

/**
 * Mobile Menu Setup
 */
function setupMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Toggle aria-expanded attribute for accessibility
            const isExpanded = navMenu.classList.contains('active');
            mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.mobile-menu-toggle') && !event.target.closest('.nav-menu')) {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    }
}

/**
 * Scroll Animation Initialize
 * Adds animations to elements when they come into view
 */
function initScrollAnimations() {
    const elements = document.querySelectorAll('.scroll-animation');
    
    if (elements.length) {
        // Initial check on page load
        checkElementsInView(elements);
        
        // Check on scroll
        window.addEventListener('scroll', function() {
            checkElementsInView(elements);
        });
    }
}

/**
 * Check if Elements are in Viewport
 */
function checkElementsInView(elements) {
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150; // How much of the element needs to be visible
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

/**
 * Initialize Smooth Scrolling for Anchor Links
 */
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 60; // Adjust for header height
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update URL but don't add to browser history
                history.replaceState(null, null, targetId);
            }
        });
    });
}

/**
 * Initialize Testimonial Slider
 */
function initTestimonialSlider() {
    const slider = document.querySelector('.testimonial-slider');
    const testimonials = slider.querySelectorAll('.testimonial');
    
    if (testimonials.length <= 1) return;
    
    let currentIndex = 0;
    
    // Hide all testimonials except the first one
    testimonials.forEach((testimonial, index) => {
        if (index !== 0) {
            testimonial.style.display = 'none';
        }
    });
    
    // Create navigation dots
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'slider-dots';
    
    testimonials.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.className = index === 0 ? 'dot active' : 'dot';
        dot.dataset.index = index;
        
        dot.addEventListener('click', () => {
            showTestimonial(index);
        });
        
        dotsContainer.appendChild(dot);
    });
    
    slider.appendChild(dotsContainer);
    
    // Add navigation arrows
    const prevButton = document.createElement('button');
    prevButton.className = 'slider-nav prev';
    prevButton.innerHTML = '&lsaquo;';
    prevButton.setAttribute('aria-label', 'Previous testimonial');
    
    const nextButton = document.createElement('button');
    nextButton.className = 'slider-nav next';
    nextButton.innerHTML = '&rsaquo;';
    nextButton.setAttribute('aria-label', 'Next testimonial');
    
    prevButton.addEventListener('click', () => {
        const newIndex = currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1;
        showTestimonial(newIndex);
    });
    
    nextButton.addEventListener('click', () => {
        const newIndex = currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1;
        showTestimonial(newIndex);
    });
    
    slider.appendChild(prevButton);
    slider.appendChild(nextButton);
    
    // Testimonial auto rotation
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pause rotation on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    slider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
    
    function nextSlide() {
        const newIndex = currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1;
        showTestimonial(newIndex);
    }
    
    function showTestimonial(index) {
        // Hide current testimonial
        testimonials[currentIndex].style.display = 'none';
        
        // Show selected testimonial
        testimonials[index].style.display = 'block';
        
        // Update active dot
        dotsContainer.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        // Update current index
        currentIndex = index;
    }
}

/**
 * Initialize Contact Form Validation
 */
function initContactFormValidation() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(event) {
        // Prevent form submission for this demo
        event.preventDefault();
        
        let isValid = true;
        
        // Basic validation for required fields
        const requiredFields = contactForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                highlightErrorField(field);
            } else {
                removeErrorHighlight(field);
            }
        });
        
        // Email validation
        const emailField = contactForm.querySelector('input[type="email"]');
        if (emailField && emailField.value.trim()) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailField.value)) {
                isValid = false;
                highlightErrorField(emailField, 'Please enter a valid email address');
            }
        }
        
        // If form is valid, show success message
        if (isValid) {
            showFormSubmissionMessage('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        }
    });
    
    // Add input event listeners to remove error on typing
    const formFields = contactForm.querySelectorAll('input, textarea, select');
    formFields.forEach(field => {
        field.addEventListener('input', function() {
            removeErrorHighlight(field);
        });
    });
}

/**
 * Highlight Form Field with Error
 */
function highlightErrorField(field, message) {
    field.classList.add('error');
    
    // Add error message if provided
    if (message) {
        let errorMessage = field.nextElementSibling;
        
        // Create error message element if it doesn't exist
        if (!errorMessage || !errorMessage.classList.contains('error-message')) {
            errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            field.parentNode.insertBefore(errorMessage, field.nextSibling);
        }
        
        errorMessage.textContent = message;
    }
}

/**
 * Remove Error Highlight from Form Field
 */
function removeErrorHighlight(field) {
    field.classList.remove('error');
    
    // Remove error message if it exists
    const errorMessage = field.nextElementSibling;
    if (errorMessage && errorMessage.classList.contains('error-message')) {
        errorMessage.remove();
    }
}

/**
 * Show Form Submission Message
 */
function showFormSubmissionMessage(message) {
    const contactForm = document.getElementById('contact-form');
    const formContainer = contactForm.parentElement;
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = 'form-submission-message';
    messageElement.textContent = message;
    
    // Replace form with message
    formContainer.innerHTML = '';
    formContainer.appendChild(messageElement);
}

/**
 * Add active class to current page in navigation
 */
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop();
    
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        
        if (linkPage === currentPage || 
           (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}
