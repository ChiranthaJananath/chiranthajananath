/**
 * Professional Portfolio Animations
 * WMCJT Kithulwatta Portfolio
 */

// Configuration for the reveal effect
const revealSettings = {
    threshold: 0.15, // Triggers when 15% of the element is visible
    rootMargin: "0px 0px -50px 0px" // Slight offset to ensure visibility before animation
};

/**
 * Intersection Observer Logic
 * Handles the smooth glide-in effect as the user scrolls
 */
const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Apply the active state to trigger the CSS transition
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            
            // Stop observing once animated to save system resources
            observer.unobserve(entry.target);
        }
    });
}, revealSettings);

/**
 * Initialization on Page Load
 */
document.addEventListener('DOMContentLoaded', () => {
    // Select all major sections and sub-components for a staggered feel
    const elementsToAnimate = document.querySelectorAll(
        'section, .edu-card, .timeline-item, .sentence-list li'
    );
    
    elementsToAnimate.forEach(el => {
        // Set initial hidden state directly through JS to ensure no flash of content
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";
        
        // Start watching the element
        revealOnScroll.observe(el);
    });

    // Optional: Smooth scroll margin adjustment for nav links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70, // Adjusts for sticky header height
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
