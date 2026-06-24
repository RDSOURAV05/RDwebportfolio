document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // THEME TOGGLE
    // ==========================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme choice, default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
    } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
    }

    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        }
    });

    // ==========================================
    // MOBILE NAVIGATION MENU
    // ==========================================
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('open');
        navMenu.classList.toggle('open');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('open');
            navMenu.classList.remove('open');
        });
    });

    // ==========================================
    // SCROLL NAVBAR STICKY
    // ==========================================
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ==========================================
    // TYPEWRITER EFFECT
    // ==========================================
    const typewriterElement = document.getElementById('typewriter');
    const titles = [
        'Artificial Intelligence', 
        'Robotics Systems', 
        'Python & C Applications', 
        'DBMS Integrations'
    ];
    
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeDelay = 100;

    function type() {
        const currentTitle = titles[titleIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typeDelay = 50; // Delete faster
        } else {
            typewriterElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typeDelay = 100;
        }

        // Handle transitions
        if (!isDeleting && charIndex === currentTitle.length) {
            typeDelay = 2000; // Pause at end of text
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typeDelay = 500; // Pause before typing next title
        }

        setTimeout(type, typeDelay);
    }

    if (typewriterElement) {
        type();
    }

    // ==========================================
    // SCROLL REVEAL ANIMATIONS
    // ==========================================
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // If it's the skills section, animate progress bars
                if (entry.target.id === 'skills') {
                    animateSkills();
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Skill meters progress transition
    function animateSkills() {
        const progressBars = document.querySelectorAll('.progress');
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.transform = 'scaleX(0)';
            // Force reflow
            bar.getBoundingClientRect();
            bar.style.transform = 'scaleX(1)';
        });
    }

    // ==========================================
    // ACTIVE NAVIGATION LINK IN-VIEW SYNC
    // ==========================================
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ==========================================
    // PROJECT FILTERING
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from buttons and add to clicked
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('hide');
                    // Small delay to trigger entry animation
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    // Delay setting display none until transitions finish
                    setTimeout(() => {
                        card.classList.add('hide');
                    }, 300);
                }
            });
        });
    });

    // ==========================================
    // CONTACT FORM VALIDATION & SIMULATION
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Clean up status
            formStatus.className = 'form-status';
            formStatus.style.display = 'none';
            formStatus.textContent = '';
            
            let isValid = true;
            
            // Validate inputs
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');
            
            // Name check
            if (!nameInput.value.trim()) {
                setInputError(nameInput, true);
                isValid = false;
            } else {
                setInputError(nameInput, false);
            }
            
            // Email check
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
                setInputError(emailInput, true);
                isValid = false;
            } else {
                setInputError(emailInput, false);
            }
            
            // Subject check
            if (!subjectInput.value.trim()) {
                setInputError(subjectInput, true);
                isValid = false;
            } else {
                setInputError(subjectInput, false);
            }
            
            // Message check
            if (!messageInput.value.trim()) {
                setInputError(messageInput, true);
                isValid = false;
            } else {
                setInputError(messageInput, false);
            }
            
            if (isValid) {
                // Mock submission state
                const submitBtn = contactForm.querySelector('.form-submit');
                const originalBtnContent = submitBtn.innerHTML;
                
                submitBtn.disabled = true;
                submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
                
                // Simulate network latency (1.5 seconds)
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnContent;
                    
                    // Show success status
                    formStatus.classList.add('success');
                    formStatus.textContent = 'Thank you! Your message was sent successfully.';
                    formStatus.style.display = 'block';
                    
                    // Reset inputs
                    contactForm.reset();
                    document.querySelectorAll('.form-group').forEach(grp => grp.classList.remove('invalid'));
                }, 1500);
            }
        });

        // Add blur listeners for realtime validation feedback
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                if (input.id === 'email') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    setInputError(input, !input.value.trim() || !emailRegex.test(input.value.trim()));
                } else {
                    setInputError(input, !input.value.trim());
                }
            });
            
            // Remove error highlight as user types
            input.addEventListener('input', () => {
                setInputError(input, false);
            });
        });
    }

    function setInputError(input, isError) {
        const group = input.parentElement;
        if (isError) {
            group.classList.add('invalid');
        } else {
            group.classList.remove('invalid');
        }
    }
});
