 document.addEventListener('DOMContentLoaded', function() {
            AOS.init();
            
            let cartCount = 0;
            const cartCountElement = document.querySelector('.cart-count');
            const cartIcon = document.querySelector('.cart-icon');
            
            if (cartIcon && cartCountElement) {
                cartIcon.addEventListener('click', function(e) {
                    e.preventDefault();
                    cartCount++;
                    cartCountElement.textContent = cartCount;
                    
                    cartIcon.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        cartIcon.style.transform = 'scale(1)';
                    }, 200);
                });
            }
        });

        function updateCountdown() {
            const secondsEl = document.getElementById('seconds');
            const minutesEl = document.getElementById('minutes');
            
            if (!secondsEl || !minutesEl) {
                return;
            }
            
            let seconds = parseInt(secondsEl.textContent);
            let minutes = parseInt(minutesEl.textContent);
            
            seconds--;
            
            if (seconds < 0) {
                seconds = 59;
                minutes--;
                
                if (minutes < 0) {
                    minutes = 0;
                    seconds = 0;
                }
            }
            
            secondsEl.textContent = seconds.toString().padStart(2, '0');
            minutesEl.textContent = minutes.toString().padStart(2, '0');
        }

        setInterval(updateCountdown, 1000);

        document.addEventListener('DOMContentLoaded', function() {
            const carousel = document.getElementById('testimonialCarousel');
            const indicators = document.querySelectorAll('.indicator-dot');
            let currentSlide = 0;
            const totalSlides = 5;

            if (carousel) {
                function nextSlide() {
                    currentSlide = (currentSlide + 1) % totalSlides;
                    updateCarousel();
                }

                function updateCarousel() {
                    const translateX = -currentSlide * 100;
                    carousel.style.transform = `translateX(${translateX}%)`;
                    
                    indicators.forEach((indicator, index) => {
                        indicator.classList.toggle('active', index === currentSlide);
                    });
                }

                indicators.forEach((indicator, index) => {
                    indicator.addEventListener('click', () => {
                        currentSlide = index % totalSlides;
                        updateCarousel();
                    });
                });

                setInterval(nextSlide, 5000);
            }

            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                    }
                });
            }, observerOptions);

            document.querySelectorAll('.testimonial-card').forEach(card => {
                observer.observe(card);
            });
        });

        const newsletterForm = document.getElementById('newsletterForm');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const email = document.getElementById('emailInput').value;
                const successMessage = document.getElementById('successMessage');
                
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailRegex.test(email)) {
                    if (successMessage) {
                        successMessage.style.opacity = '1';
                        
                        document.getElementById('emailInput').value = '';
                        
                        setTimeout(() => {
                            successMessage.style.opacity = '0';
                        }, 3000);
                    }
                    
                    console.log('Newsletter subscription for:', email);
                } else {
                    alert('Please enter a valid email address');
                }
            });
        }

        const scrollToTopBtn = document.getElementById('scrollToTop');
        if (scrollToTopBtn) {
            scrollToTopBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }

        const partnerObserverOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const partnerObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '0.7';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, partnerObserverOptions);

        document.querySelectorAll('.partner-logo').forEach((logo, index) => {
            logo.style.opacity = '0';
            logo.style.transform = 'translateY(30px)';
            logo.style.transition = 'all 0.6s ease';
            partnerObserver.observe(logo);
        });

        document.addEventListener('DOMContentLoaded', function () {
            document.body.addEventListener('click', function (e) {
                var btn = e.target.closest('.vf-qty-btn');
                if (!btn) return;
                var wrapper = btn.closest('.vf-qty');
                if (!wrapper) return;
                var input = wrapper.querySelector('input[type="number"]');
                if (!input) return;

                var current = parseInt(input.value, 10);
                if (isNaN(current) || current < 1) current = 1;

                var action = btn.getAttribute('data-action');
                if (action === 'decrease') {
                    var min = parseInt(input.getAttribute('min') || '1', 10);
                    current = Math.max(min, current - 1);
                } else if (action === 'increase') {
                    current = current + 1;
                }

                input.value = current;
                input.dispatchEvent(new Event('change', { bubbles: true }));
            });
        });

        const playButton = document.querySelector('.about-play-button');
        if (playButton) {
            playButton.addEventListener('click', function() {
                console.log('Play button clicked');
            });
        }

        function animateCountUp(element, target, duration = 2000) {
            let start = 0;
            const increment = target / (duration / 16);
            
            function updateCount() {
                start += increment;
                if (start < target) {
                    element.textContent = Math.floor(start).toLocaleString();
                    requestAnimationFrame(updateCount);
                } else {
                    element.textContent = target.toLocaleString();
                }
            }
            
            updateCount();
        }

        function checkElementInView(element) {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            return rect.top >= 0 && rect.top <= windowHeight * 0.8;
        }

        let statsAnimated = false;

        function initStatsCounters() {
            const statsSection = document.querySelector('.stats-hero-section');
            
            if (!statsSection || statsAnimated) return;
            
            if (checkElementInView(statsSection)) {
                statsAnimated = true;
                
                statsSection.classList.add('stats-animate-in');
                
                const counters = document.querySelectorAll('.stats-animate-number');
                
                counters.forEach((counter, index) => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    
                    setTimeout(() => {
                        animateCountUp(counter, target, 2500);
                    }, index * 200);
                });
            }
        }

        function handleStatsHover() {
            const counterItems = document.querySelectorAll('.stats-counter-item');
            counterItems.forEach(item => {
                item.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-5px) scale(1.05)';
                });
                
                item.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                });
            });
        }

        window.addEventListener('scroll', initStatsCounters);
        window.addEventListener('load', initStatsCounters);

        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(() => {
                initStatsCounters();
                handleStatsHover();
            }, 500);
        });