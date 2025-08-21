// Phone call function
function makePhoneCall() {
    const phoneNumber = 'tel:0120-XXX-XXX'; // Replace with actual phone number
    window.location.href = phoneNumber;
}

// LINE function
function openLine() {
    // Replace with actual LINE URL
    const lineUrl = 'https://line.me/R/ti/p/@XXXXX';
    window.open(lineUrl, '_blank');
}

// Select purchase method
function selectMethod(method) {
    switch(method) {
        case 'line':
            openLine();
            break;
        case 'phone':
            makePhoneCall();
            break;
        case 'delivery':
            // Scroll to contact section or open modal
            alert('宅配買取のお申し込みは、お電話またはLINEからお願いいたします。');
            break;
    }
}

// FAQ toggle function
function toggleFaq(element) {
    const faqItem = element.parentElement;
    faqItem.classList.toggle('active');
}

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add animation on scroll
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
    
    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Add sparkle effect to CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-btn');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            createSparkle(this);
        });
    });
    
    // Create sparkle effect
    function createSparkle(element) {
        const sparkle = document.createElement('span');
        sparkle.classList.add('sparkle');
        sparkle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: #FFF;
            border-radius: 50%;
            animation: sparkleAnim 1s ease-out forwards;
            pointer-events: none;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        element.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
    
    // Add floating animation to price cards
    const priceCards = document.querySelectorAll('.price-card');
    priceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.style.animation = 'float 3s ease-in-out infinite';
    });
    
    // Add lottery-style number animation to prices
    const prices = document.querySelectorAll('.price');
    prices.forEach(price => {
        const originalText = price.textContent;
        price.addEventListener('mouseenter', function() {
            animatePrice(this, originalText);
        });
    });
    
    function animatePrice(element, originalText) {
        let counter = 0;
        const interval = setInterval(() => {
            element.textContent = '¥' + Math.floor(Math.random() * 100000) + '〜';
            counter++;
            if (counter > 10) {
                clearInterval(interval);
                element.textContent = originalText;
            }
        }, 50);
    }
    
    // Add confetti effect to urgency section
    const urgencySection = document.querySelector('.urgency');
    if (urgencySection) {
        createConfetti(urgencySection);
    }
    
    function createConfetti(container) {
        const colors = ['#FF0000', '#FFD700', '#FFA500', '#FF6347'];
        
        for (let i = 0; i < 30; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: absolute;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}%;
                top: -10px;
                opacity: 0.8;
                transform: rotate(${Math.random() * 360}deg);
                animation: confettiFall ${3 + Math.random() * 2}s linear infinite;
                animation-delay: ${Math.random() * 3}s;
            `;
            container.appendChild(confetti);
        }
    }
});

// Add CSS animations via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkleAnim {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: scale(2) rotate(180deg);
            opacity: 0;
        }
    }
    
    @keyframes float {
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-10px);
        }
    }
    
    @keyframes confettiFall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.8;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);