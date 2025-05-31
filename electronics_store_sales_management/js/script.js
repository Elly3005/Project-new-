document.addEventListener('DOMContentLoaded', function() {

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('header nav ul li a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Active navigation link highlighting on scroll
    const sections = document.querySelectorAll('section[id]');
    function navHighlighter() {
        let scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100; // Adjusted offset
            let sectionId = current.getAttribute('id');

            const navLink = document.querySelector('header nav ul li a[href*="' + sectionId + '"]');
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }
    window.addEventListener('scroll', navHighlighter);
    navHighlighter(); // Initial call

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('.faq-icon');

            question.classList.toggle('active');

            if (question.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.padding = '15px 20px';
                icon.textContent = '-';
            } else {
                answer.style.maxHeight = '0';
                answer.style.padding = '0 20px';
                icon.textContent = '+';
            }

            // Close other open FAQs
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question && otherQuestion.classList.contains('active')) {
                    otherQuestion.classList.remove('active');
                    otherQuestion.nextElementSibling.style.maxHeight = '0';
                    otherQuestion.nextElementSibling.style.padding = '0 20px';
                    otherQuestion.querySelector('.faq-icon').textContent = '+';
                }
            });
        });
    });

    // Simple form submission alert (can be expanded for actual submission)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Basic validation example
            const name = contactForm.querySelector('input[name="name"]').value;
            const email = contactForm.querySelector('input[name="email"]').value;
            const message = contactForm.querySelector('textarea[name="message"]').value;

            if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
                alert('Please fill in all fields.');
                return;
            }
            alert('Message sent successfully! (This is a demo)');
            contactForm.reset();
        });
    }

// Testimonial Slider
    const testimonialSlider = document.querySelector('.testimonial-slider-container');
    if (testimonialSlider) {
        const slidesContainer = testimonialSlider.querySelector('.testimonial-slides');
        const slides = Array.from(testimonialSlider.querySelectorAll('.testimonial-slide'));
        const prevButton = testimonialSlider.querySelector('.prev-btn');
        const nextButton = testimonialSlider.querySelector('.next-btn');
        const dotsContainer = testimonialSlider.querySelector('.slider-dots');
        let currentIndex = 0;
        let slideInterval;

        function createDots() {
            slides.forEach((_, index) => {
                const dot = document.createElement('span');
                dot.classList.add('slider-dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    goToSlide(index);
                    resetInterval();
                });
                dotsContainer.appendChild(dot);
            });
        }

        function updateDots() {
            const dots = dotsContainer.querySelectorAll('.slider-dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        function goToSlide(index) {
            if (index < 0) {
                index = slides.length - 1;
            } else if (index >= slides.length) {
                index = 0;
            }
            slidesContainer.style.transform = `translateX(-${index * 100}%)`;
            currentIndex = index;
            updateDots();
        }

        function nextSlide() {
            goToSlide(currentIndex + 1);
        }

        function prevSlide() {
            goToSlide(currentIndex - 1);
        }

        function startInterval() {
            slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
        }

        function resetInterval() {
            clearInterval(slideInterval);
            startInterval();
        }

        if (slides.length > 0) {
            createDots();
            goToSlide(0); // Initialize slider to the first slide
            startInterval(); // Start auto-sliding

            nextButton.addEventListener('click', () => {
                nextSlide();
                resetInterval();
            });
            prevButton.addEventListener('click', () => {
                prevSlide();
                resetInterval();
            });
        }
    }
});