// Smooth scroll to sections
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Add animation to elements when they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all feature cards and steps
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.feature-card, .step');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // Add click handlers for buttons
    const ctaButton = document.querySelector('.cta .btn-primary');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            showAlert('شكراً لك! قريباً سيتم إعادة التوجيه إلى صفحة التسجيل');
        });
    }

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Press "?" for help
        if (e.key === '?') {
            showHelp();
        }
    });

    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backdropFilter = 'blur(15px)';
            navbar.style.borderBottomColor = 'rgba(0, 212, 255, 0.4)';
        } else {
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.borderBottomColor = 'rgba(0, 212, 255, 0.2)';
        }
    });

    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            hero.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
        });
    }

    // Mobile menu toggle (if needed for future)
    setupMobileMenu();

    // Add form validation
    setupFormHandlers();

    // Add dark mode toggle (optional)
    setupDarkModeToggle();
});

// Show alert function
function showAlert(message) {
    const alert = document.createElement('div');
    alert.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #00D4FF 0%, #8B5BFF 100%);
        color: #0a0e27;
        padding: 15px 25px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 10px 30px rgba(0, 212, 255, 0.3);
    `;
    alert.textContent = message;
    document.body.appendChild(alert);

    setTimeout(() => {
        alert.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => alert.remove(), 300);
    }, 3000);
}

// Setup mobile menu (if navigation becomes too long)
function setupMobileMenu() {
    // This is a placeholder for future mobile menu functionality
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
        console.log('Mobile view detected');
    }
}

// Setup form handlers
function setupFormHandlers() {
    const inputs = document.querySelectorAll('.card-input input');
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const sendBtn = this.nextElementSibling;
                if (sendBtn) {
                    sendBtn.click();
                }
            }
        });
    });

    // Handle send button click
    document.querySelectorAll('.send-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const message = input.value.trim();
            if (message) {
                handleUserMessage(message);
                input.value = '';
            }
        });
    });
}

// Handle user message
function handleUserMessage(message) {
    console.log('User message:', message);
    showAlert(`تم استقبال رسالتك: "${message}"`);
}

// Setup dark mode toggle (future feature)
function setupDarkModeToggle() {
    // Check if user prefers dark mode
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDarkMode) {
        document.body.classList.add('dark-mode');
    }
}

// Add CSS keyframe animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Utility: Get element's position relative to viewport
function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// Utility: Add scroll listener for animations
window.addEventListener('scroll', () => {
    document.querySelectorAll('.feature-card, .step').forEach(el => {
        if (isInViewport(el) && el.style.opacity !== '1') {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
});

// Handle responsive design changes
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    if (width < 768) {
        // Mobile adjustments
        document.querySelectorAll('.step-arrow').forEach(arrow => {
            arrow.textContent = '↓';
        });
    } else {
        // Desktop adjustments
        document.querySelectorAll('.step-arrow').forEach(arrow => {
            arrow.textContent = '→';
        });
    }
});

// Preload images and resources
function preloadResources() {
    const resources = [
        'styles.css',
        'script.js'
    ];
    resources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = resource;
        document.head.appendChild(link);
    });
}

// Initialize on page load
window.addEventListener('load', preloadResources);

// Add tracking for user interactions (optional analytics)
function trackUserInteraction(eventName, eventData) {
    console.log(`Event: ${eventName}`, eventData);
    // This can be extended to send data to an analytics service
}

// Track button clicks
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function() {
        trackUserInteraction('button_click', {
            buttonClass: this.className,
            timestamp: new Date().toISOString()
        });
    });
});

// Prevent console errors in production
window.addEventListener('error', function(e) {
    console.error('Error occurred:', e.error);
});
