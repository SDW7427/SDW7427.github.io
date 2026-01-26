// Simple initialization
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize language
    initLanguage();
    
    // Trigger animations on page load
    triggerAnimations();
    
    // Language Selector Dropdown
    const languageSelector = document.querySelector('.language-selector');
    const currentLanguage = document.querySelector('.current-language');
    const languageDropdown = document.querySelector('.language-dropdown');
    
    if (languageSelector) {
        // Toggle dropdown on click
        languageSelector.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
        });
        
        // Select language
        const languageItems = document.querySelectorAll('.language-dropdown li');
        languageItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.stopPropagation();
                const selectedLang = this.textContent;
                const langCode = this.getAttribute('data-lang');
                
                // Update current language
                currentLanguage.textContent = selectedLang;
                
                // Remove active class from all items
                languageItems.forEach(li => {
                    li.style.fontWeight = '400';
                    li.style.color = 'var(--text-dark)';
                });
                
                // Highlight selected
                this.style.fontWeight = '700';
                this.style.color = 'var(--primary-color)';
                
                // Close dropdown
                languageSelector.classList.remove('active');
                
                // Change language
                changeLanguage(langCode);
            });
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function() {
            languageSelector.classList.remove('active');
        });
    }

    // App Store / Google Play button click handling
    const appButtons = document.querySelectorAll('.app-btn');
    appButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            showServiceMessage();
        });
    });

    // CTA Button interaction
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            showServiceMessage();
        });
    }

    // Error handling for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Image failed to load - silent handling
        });
    });
});

// Show service unavailable message based on current language
function showServiceMessage() {
    const currentLang = localStorage.getItem('preferred-language') || 'ja';
    
    const messages = {
        'ja': '現在サービス中ではありません。',
        'ko': '현재 서비스 중이 아닙니다.',
        'en': 'Currently not in service.'
    };
    
    alert(messages[currentLang]);
}

// Animation trigger function
function triggerAnimations() {
    // Animate hero image (Section 1) immediately on page load
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        setTimeout(() => {
            heroImage.classList.add('fade-in-up');
        }, 100);
    }
    
    // Setup Intersection Observer for scroll animations
    const isMobile = window.innerWidth <= 768;
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: isMobile ? 0.5 : 0.2 // Mobile: 50% visible, Desktop: 20% visible
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);
    
    // Observe feature images (Sections 2, 3, 4)
    const featureImages = document.querySelectorAll('.feature-image');
    featureImages.forEach(img => {
        observer.observe(img);
    });
    
    // Observe testimonial boxes (Section 5)
    const testimonialBoxes = document.querySelectorAll('.testimonial-box');
    testimonialBoxes.forEach(box => {
        observer.observe(box);
    });
}
